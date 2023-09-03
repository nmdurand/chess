import { BoardData } from '@/lib/types'
import { BOARD_SIZE } from '@/lib//constants'
import { GameStatus, PieceColor, PieceName, SquareData } from './types'
import { isDroppable, isMenaced } from './isDroppable'

export const isInCheck = (color: PieceColor, board: BoardData): boolean => {
  const kingPosition = findKing(color, board)
  const isKingMenaced = isMenaced(kingPosition, color, board)
  return isKingMenaced
}

const findKing = (color: PieceColor, board: BoardData): SquareData => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
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

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col]
      if (!piece) continue
      if (piece?.color === color) {
        // Check if piece can be moved in a way that the king is not menaced anymore
        for (let targetRow = 0; targetRow < BOARD_SIZE; targetRow++) {
          for (let targetCol = 0; targetCol < BOARD_SIZE; targetCol++) {
            if (
              isDroppable(
                { ...piece, row, col },
                { row: targetRow, col: targetCol },
                board
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

export const checkGameStatus = (
  color: PieceColor,
  board: BoardData
): GameStatus => {
  const isKingMenaced = isInCheck(color, board)
  if (isKingMenaced) {
    const isCheckMateStatus = isCheckMate(color, board)
    if (isCheckMateStatus) {
      return GameStatus.CheckMate
    }
    return GameStatus.Check
  }
  return GameStatus.InProgress
}
