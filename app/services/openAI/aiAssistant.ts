import OpenAI from "openai"

import { SYSTEM_PROMPT } from "./systemPrompt"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function getProductionInsight(productionOrders: any[]) {
  const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    instructions: SYSTEM_PROMPT,
    input: JSON.stringify(productionOrders),
  })

  return response.output_text
}
