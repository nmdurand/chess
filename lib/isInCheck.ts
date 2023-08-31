import { BoardData } from '@/context/context'
import { PieceColor, PieceName, SquareData } from './types'
import { isDroppable, isMenaced } from './isDroppable'

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

export const isCheckMate = (color: PieceColor, board: BoardData): boolean => {
  const kingPosition = findKing(color, board)
  const isKingMenaced = isMenaced(kingPosition, color, board)
  if (!isKingMenaced) return false

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const piece = board[row][col]
      if (!piece) continue
      if (piece?.color === color) {
        // Check if piece can be moved in a way that the king is not menaced anymore
        for (let targetRow = 0; targetRow < board.length; targetRow++) {
          for (
            let targetCol = 0;
            targetCol < board[targetRow].length;
            targetCol++
          ) {
            if (
              isDroppable(
                { ...piece, row, col },
                { row: targetRow, col: targetCol },
                board,
                true
              )
            ) {
              const newBoard = board.map((row) => row.map((col) => col))
              newBoard[targetRow][targetCol] = newBoard[row][col]
              newBoard[row][col] = undefined
              const isKingMenaced = isInCheck(color, newBoard)
              if (!isKingMenaced) return false
            }
          }
        }
      }
    }
  }
  return true
}
