import { BoardData } from '@/context/context'
import { PieceColor, PieceData, PieceName, SquareData } from '@/lib/types'
import { isPathClear } from './utils'

export const isDroppable = (
  touchedPiece: (PieceData & SquareData) | null,
  target: SquareData,
  board: BoardData
): boolean => {
  if (!touchedPiece) return false
  const { name: touchedName } = touchedPiece
  switch (touchedName) {
    case PieceName.Pawn:
      return isPawnDroppable(touchedPiece, target, board)
    case PieceName.Rook:
      return isRookDroppable(touchedPiece, target, board)
    case PieceName.Knight:
      return isKnightDroppable(touchedPiece, target, board)
    case PieceName.Bishop:
      return isBishopDroppable(touchedPiece, target, board)
    case PieceName.Queen:
      return isQueenDroppable(touchedPiece, target, board)
    case PieceName.King:
      return isKingDroppable(touchedPiece, target, board)
    default:
      return false
  }
}

const isPawnDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  switch (color) {
    case PieceColor.White:
      return (
        (col === fromCol &&
          (row === fromRow + 1 || (fromRow === 1 && row === 3))) ||
        (Math.abs(col - fromCol) === 1 &&
          row === fromRow + 1 &&
          board[row][col]?.color === PieceColor.Black)
      )
    case PieceColor.Black:
      return (
        (col === fromCol &&
          (row === fromRow - 1 || (fromRow === 6 && row === 4))) ||
        (Math.abs(col - fromCol) === 1 &&
          row === fromRow - 1 &&
          board[row][col]?.color === PieceColor.White)
      )
    default:
      return false
  }
}

const isRookDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized = row === fromRow || col === fromCol
  return (
    isMovementAuthorized &&
    isPathClear(touchedPiece, { row, col }, board) &&
    board[row][col]?.color !== color
  )
}

const isKnightDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    (Math.abs(row - fromRow) === 2 && Math.abs(col - fromCol) === 1) ||
    (Math.abs(row - fromRow) === 1 && Math.abs(col - fromCol) === 2)

  return isMovementAuthorized && board[row][col]?.color !== color
}

const isBishopDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    Math.abs(row - fromRow) === Math.abs(col - fromCol)
  return (
    isMovementAuthorized &&
    isPathClear(touchedPiece, { row, col }, board) &&
    board[row][col]?.color !== color
  )
}

const isQueenDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    row === fromRow ||
    col === fromCol ||
    Math.abs(row - fromRow) === Math.abs(col - fromCol)
  return (
    isMovementAuthorized &&
    isPathClear(touchedPiece, { row, col }, board) &&
    board[row][col]?.color !== color
  )
}

const isKingDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    Math.abs(row - fromRow) <= 1 && Math.abs(col - fromCol) <= 1
  return isMovementAuthorized && board[row][col]?.color !== color
}
