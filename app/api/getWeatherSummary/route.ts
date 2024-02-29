import { NextResponse } from "next/server"
import openai from "@/openai"

export async function POST(request: Request) {
  const { weatherData } = await request.json()

  const response = await openai.createChatCompletion({
    messages: [
      {
        role: "system",
        content: "Pretend you're a weather news presenter presenting live on television. Be energetic and full of charisma. Introduce yourself as Ronny Rahman and say you are a front-end developer. State the city you are providing a summary for. Then give a summary of today's weather only. Make it easy for the viewer to understand and know what to do in order to prepare for those weather conditions, such as SPF if the UV is high. Use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the date came from your team at the news office and not the user."
      }, {
        role: "user",
        content: `
          Hi, can I get a summary of today's weather. Use the following information to get the weather data: 
          ${JSON.stringify(weatherData)}
        `
      }
    ],
    model: "gpt-3.5-turbo",
    n: 1,
    stream: false,
    temperature: 0.8
  })

  const { data } = response

  return NextResponse.json(data.choices[0].message)
}
