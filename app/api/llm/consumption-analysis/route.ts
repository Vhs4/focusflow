import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Validate auth token
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        analysis: "Análise de consumo não disponível no momento.",
        insights: [
          "Configure sua chave da OpenAI para análises personalizadas",
          "Continue registrando suas sessões de foco",
          "Mantenha uma rotina consistente",
        ],
      })
    }

    // Parse request body to get user session data
    const body = await request.json().catch(() => ({}))
    const { sessions = [], stats = {}, behaviorData = {} } = body

    // Build context from user data
    const userContext = `
Dados do usuário:
- Total de sessões: ${stats.totalSessions || 0}
- Total de minutos: ${stats.totalMinutes || 0}
- Taxa de conclusão: ${stats.completionRate || 0}%
- Sequência atual: ${stats.streak || 0} dias
- Sessões recentes: ${sessions.length}

Comportamento de consumo:
- Velocidade de vídeos: ${behaviorData.videoSpeed || 'normal'}
- Pula conteúdo: ${behaviorData.contentSkipping || 'às vezes'}
- Multitarefa: ${behaviorData.multitasking || 'raramente'}
${behaviorData.notes ? `- Observações: ${behaviorData.notes}` : ''}
    `.trim()

    const systemMessage = `Você é um analista de comportamento digital especializado em bem-estar e psicologia da atenção.
Analise profundamente o padrão de uso de telas, sessões de foco E comportamento de consumo de mídia do usuário.
Foque especialmente no "Ritmo de Consumo" e sinais de impaciência digital (acelerar vídeos, pular conteúdo, multitarefa).

IMPORTANTE - Formato OBRIGATÓRIO da resposta:

[ANÁLISE]
Escreva 2-3 frases completas analisando o ritmo de consumo do usuário, identificando padrões de impaciência digital e o impacto na qualidade de atenção. Seja específico sobre os comportamentos observados.

[INSIGHTS]
- Insight prático 1: Explique uma ação específica para "Detox de Velocidade"
- Insight prático 2: Sugira um desafio concreto relacionado ao consumo consciente
- Insight prático 3: Recomende uma mudança de hábito com benefícios claros

Seja empático, motivacional e DETALHADO em cada ponto. E escreva baseado em você contar isso para os pais de uma criança / adolescente`

    const userMessage = sessions.length > 0 || behaviorData.videoSpeed
      ? `${userContext}\n\nAnálise Solicitada:
Baseado nos meus dados, identifique padrões de impaciência digital e forneça uma análise detalhada do meu ritmo de consumo. 
Sugira um plano de "Detox de Velocidade" personalizado com 3 ações específicas que eu possa começar hoje.

Seja detalhado e específico nos insights - cada um deve ter pelo menos uma frase completa explicando O QUÊ fazer e POR QUÊ.`
      : `Baseado no perfil inicial, analise potenciais riscos de impaciência digital e forneça 3 recomendações detalhadas para desenvolver um consumo de mídia mais consciente e saudável.`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("OpenAI API error:", errorData)
      throw new Error("Failed to generate analysis")
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ""

    // Parse the response into analysis and insights
    const lines = content.split("\n").filter((line) => line.trim())

    // Find [ANÁLISE] and [INSIGHTS] sections
    let analysis = ""
    let insightLines: string[] = []

    let currentSection = ""
    for (const line of lines) {
      const trimmedLine = line.trim()

      if (trimmedLine.includes("[ANÁLISE]") || trimmedLine.includes("ANÁLISE") || trimmedLine.includes("Análise")) {
        currentSection = "analysis"
        continue
      }

      if (trimmedLine.includes("[INSIGHTS]") || trimmedLine.includes("INSIGHTS") || trimmedLine.includes("Insights")) {
        currentSection = "insights"
        continue
      }

      if (currentSection === "analysis" && trimmedLine && !trimmedLine.startsWith("-")) {
        analysis += (analysis ? " " : "") + trimmedLine
      }

      if (currentSection === "insights" && trimmedLine.startsWith("-")) {
        insightLines.push(trimmedLine.replace(/^[-•*]\s*/, ""))
      }
    }

    // Fallback: if parsing failed, use the old method
    if (!analysis || insightLines.length === 0) {
      analysis = lines[0]?.replace(/^[-•*\d.)\s]+/, "") || "Análise em progresso..."
      insightLines = lines
        .slice(1)
        .filter((line) => /^[-•*\d]/.test(line.trim()))
        .map((line) => line.replace(/^[-•*\d.)\s]+/, "").trim())
        .filter((insight) => insight.length > 0)
    }

    const insights = insightLines.slice(0, 3)

    // Ensure we always have 3 insights
    const defaultInsights = [
      "Comece assistindo vídeos em velocidade normal por 3 dias consecutivos para treinar sua atenção plena e observar como sua compreensão e retenção melhoram",
      "Experimente o desafio 'Um Conteúdo por Vez': pause notificações e dedique 25 minutos focados apenas em uma tarefa ou vídeo, sem distrações paralelas",
      "Crie uma 'lista de espera' para conteúdos: ao invés de consumir imediatamente, anote o que quer ver e revise depois, reduzindo o consumo por impulso",
    ]

    const finalInsights = [
      ...insights,
      ...defaultInsights.slice(insights.length),
    ].slice(0, 3)

    return NextResponse.json({
      analysis,
      insights: finalInsights
    })

  } catch (error) {
    console.error("Error generating consumption analysis:", error)

    return NextResponse.json({
      analysis: "Seu comportamento indica sinais de impaciência digital. O hábito de acelerar vídeos e fazer multitarefa pode estar fragmentando sua capacidade de atenção profunda, reduzindo a qualidade da absorção de conteúdo e aumentando a ansiedade por estímulos constantes.",
      insights: [
        "Inicie um 'Detox de Velocidade' assistindo vídeos em velocidade normal por 7 dias - você notará melhor compreensão e menor cansaço mental",
        "Pratique o consumo monotarefa: escolha um conteúdo e dê atenção total, sem checar outras telas ou apps simultaneamente",
        "Estabeleça 'janelas de consumo consciente': defina horários específicos para consumir conteúdo, evitando o scroll infinito e impulsivo",
      ],
    })
  }
}