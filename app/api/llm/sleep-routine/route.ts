import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        routine: "⚠️ Configure OPENAI_API_KEY no .env.local"
      })
    }

    const body = await request.json()
    const { sleepQuality, screenTimeHours, wakeUpFeeling } = body

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em higiene do sono e bem-estar digital. Crie uma rotina de desligamento personalizada (5-7 passos) para ajudar o usuário a reduzir o uso de telas antes de dormir. A rotina deve ser prática, específica e incluir horários sugeridos."
          },
          {
            role: "user",
            content: `Crie uma rotina de desligamento para: qualidade ${sleepQuality}, ${screenTimeHours}h de tela, acorda ${wakeUpFeeling}`
          }
        ],
        max_tokens: 400,
        temperature: 0.7
      })
    })

    const data = await response.json()
    return NextResponse.json({
      routine: data.choices[0]?.message?.content.replace(/\*\*/g, "").replace(/\*/g, "")
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ routine: "Erro ao gerar rotina" }, { status: 500 })
  }
}