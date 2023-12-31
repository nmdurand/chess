import { BoardData, CastlingData } from '@/lib/types'
import { BOARD_SIZE } from '@/lib/constants'
import { GameStatus, PieceColor } from './types'
import { isDroppableAndNotInCheckAfterMove, isMenaced } from './isDroppable'
import { findKing, updateBoard } from './utils'

export const isInCheck = (
  color: PieceColor,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  const kingPosition = findKing(color, board)
  if (!kingPosition) return false // This should not happen
  return isMenaced(kingPosition, color, board, castlingData)
}

export const isCheckMate = (
  color: PieceColor,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  const kingPosition = findKing(color, board)
  if (!kingPosition) return false
  const isKingMenaced = isMenaced(kingPosition, color, board, castlingData)
  if (!isKingMenaced) return false

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const piece = board[row][col]
      if (!piece) continue
      if (piece?.color === color) {
        // Check if any piece can be moved in a way that the king is not menaced anymore
        for (let targetRow = 0; targetRow < BOARD_SIZE; targetRow++) {
          for (let targetCol = 0; targetCol < BOARD_SIZE; targetCol++) {
            if (
              isDroppableAndNotInCheckAfterMove(
                { ...piece, row, col },
                { row: targetRow, col: targetCol },
                board,
                castlingData
              )
            ) {
              const newBoard = updateBoard({
                board,
                move: {
                  from: { row, col },
                  to: { row: targetRow, col: targetCol },
                },
              })
              const isKingMenaced = isInCheck(color, newBoard, castlingData)
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
  board: BoardData,
  castlingData: CastlingData
): GameStatus => {
  const isKingMenaced = isInCheck(color, board, castlingData)
  if (isKingMenaced) {
    const isCheckMateStatus = isCheckMate(color, board, castlingData)
    if (isCheckMateStatus) {
      return GameStatus.CheckMate
    }
    return GameStatus.Check
  }
  return GameStatus.InProgress
}
