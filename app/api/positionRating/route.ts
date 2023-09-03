import { getPositionRatingPrompt, getOpenAICompletion } from '@/lib/openai'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const { board, currentColor } = data

  const prompt = getPositionRatingPrompt({ board, currentColor })

  const openAIResponse = await getOpenAICompletion(prompt)
  const positionRating = openAIResponse?.choices[0].message.content ?? null

  return NextResponse.json({ data: positionRating }, { status: 200 })
}
