import { BoardData } from '@/context/context'
import { PieceColor, PieceName, SquareData } from './types'
import { isMenaced } from './isDroppable'

export const isInCheck = (color: PieceColor, board: BoardData): boolean => {
  const kingPosition = findKing(color, board)
  const isKingMenaced = isMenaced(kingPosition, color, board)
  return isKingMenaced
}

const findKing = (color: PieceColor, board: BoardData): SquareData => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j]
      if (piece?.name === PieceName.King && piece.color === color) {
        return { row: i, col: j }
      }
    }
  }
  throw new Error('King not found')
}
