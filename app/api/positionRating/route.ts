import { getPositionRatingPrompt, getOpenAICompletion } from '@/lib/openai'
import { PieceColor } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const data = await req.json()
  const { board, currentTurn } = data
  const currentColor =
    currentTurn % 2 === 0 ? PieceColor.White : PieceColor.Black

  const prompt = getPositionRatingPrompt({ board, currentColor })

  const openAIResponse = await getOpenAICompletion(prompt)
  const positionRating = openAIResponse?.choices[0].message.content ?? null

  return NextResponse.json({ data: positionRating }, { status: 200 })
}
