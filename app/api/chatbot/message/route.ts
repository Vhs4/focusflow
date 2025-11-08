import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        response:
          "⚠️ Configure a variável OPENAI_API_KEY no arquivo .env.local antes de usar o chatbot.",
      })
    }

    const systemMessage = `Você é um assistente de apoio cognitivo especializado em foco e produtividade.
Seu objetivo é ajudar jovens adultos (18-25 anos) a melhorar a concentração e reduzir o uso de telas.
Responda de forma curta, prática e motivacional, utilizando técnicas como Pomodoro, mindfulness, gestão do tempo e respiração 4-7-8.
Não substitua profissionais de saúde mental.`

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
          { role: "user", content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erro da OpenAI: ${errorText}`)
    }

    const data = await response.json()
    let botResponse = data.choices[0]?.message?.content || "Sem resposta gerada pela OpenAI."

    botResponse = botResponse.replace(/\*\*/g, "").replace(/\*/g, "").trim()

    return NextResponse.json({ response: botResponse })
  } catch (error) {
    console.error("Erro ao gerar resposta da OpenAI:", error)
    return NextResponse.json(
      {
        response:
          "Desculpe, houve uma falha ao se comunicar com a OpenAI. Tente novamente em alguns instantes.",
      },
      { status: 500 }
    )
  }
}
