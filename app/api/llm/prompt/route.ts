import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json()

    // Get OpenAI API key from environment
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      // Return a default prompt if no API key is configured
      return NextResponse.json({
        prompt: "Qual é o seu objetivo principal para esta sessão de foco?",
      })
    }

    const timeOfDay = context?.timeOfDay || new Date().getHours()
    const userLevel = context?.userLevel || "Iniciante"

    // Create contextual system message
    const systemMessage = `Você é um assistente de produtividade focado em bem-estar digital. 
Gere uma pergunta de reflexão curta (1-2 frases) para ajudar o usuário a definir sua intenção antes de uma sessão de foco Pomodoro.
A pergunta deve ser motivacional, específica e adequada ao contexto.
Hora do dia: ${timeOfDay}h
Nível do usuário: ${userLevel}`

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
          { role: "user", content: "Gere uma pergunta de reflexão para iniciar uma sessão de foco." },
        ],
        max_tokens: 100,
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate prompt")
    }

    const data = await response.json()
    const prompt = data.choices[0]?.message?.content || "Qual é o seu objetivo para esta sessão?"

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error("Error generating prompt:", error)

    // Fallback prompts
    const fallbackPrompts = [
      "Qual é a tarefa mais importante que você precisa completar agora?",
      "O que você quer ter realizado ao final desta sessão?",
      "Qual resultado específico você busca nestes próximos minutos?",
      "Que progresso você quer fazer no seu projeto principal?",
      "Qual é o próximo passo mais importante do seu trabalho?",
    ]

    const randomPrompt = fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)]

    return NextResponse.json({ prompt: randomPrompt })
  }
}
