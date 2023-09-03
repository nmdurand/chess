import OpenAI from 'openai'
import { boardToFEN } from './FEN'
import { BoardData, PieceColor } from './types'

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
})

export const getPositionRatingPrompt = ({
  board,
  currentColor,
}: {
  board: BoardData
  currentColor: PieceColor
}) => {
  const fenBoard = boardToFEN(board, currentColor)
  return `FEN: "${fenBoard}"

  Use the FEN and algebraic letter notation to compute the current board position.
  Each piece must be in its correct location according to the FEN position.
  Check each square to ensure it is the correct piece and that each square has a piece if the FEN dictates it should.
  Coordinates start bottom left a1 with the white player on the bottom and black at the top.

  Evaluate the balance of the game with an integer between 0 and 1000;
  0 means that black has won the game;
  1000 means that white has won the game;
  500 means that the position is perfectly even between the two players.
  Your response must only include this integer.`
}

export const getOpenAICompletion = async (prompt: string) => {
  return await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  })
}
