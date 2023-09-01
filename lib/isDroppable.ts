import { BoardData } from '@/context/context'
import { PieceColor, PieceData, PieceName, SquareData } from '@/lib/types'
import { isPathClear } from './utils'
import { isInCheck } from './isInCheck'

export const isDroppable = (
  touchedPiece: (PieceData & SquareData) | null,
  target: SquareData,
  board: BoardData,
  isMenaceCheck = false
): boolean => {
  if (!touchedPiece) return false
  const { name: touchedName } = touchedPiece
  switch (touchedName) {
    case PieceName.Pawn:
      return (
        isPawnDroppable(touchedPiece, target, board, isMenaceCheck) &&
        !isInCheckAfterMove(touchedPiece, target, board)
      )
    case PieceName.Rook:
      return (
        isRookDroppable(touchedPiece, target, board) &&
        !isInCheckAfterMove(touchedPiece, target, board)
      )
    case PieceName.Knight:
      return (
        isKnightDroppable(touchedPiece, target, board) &&
        !isInCheckAfterMove(touchedPiece, target, board)
      )
    case PieceName.Bishop:
      return (
        isBishopDroppable(touchedPiece, target, board) &&
        !isInCheckAfterMove(touchedPiece, target, board)
      )
    case PieceName.Queen:
      return (
        isQueenDroppable(touchedPiece, target, board) &&
        !isInCheckAfterMove(touchedPiece, target, board)
      )
    case PieceName.King:
      return (
        isKingDroppable(touchedPiece, target, board, isMenaceCheck) &&
        !isInCheckAfterMove(touchedPiece, target, board)
      )
    default:
      return false
  }
}

export const isInCheckAfterMove = (
  touchedPiece: PieceData & SquareData,
  target: SquareData,
  board: BoardData
): boolean => {
  const newBoard = board.map((row) => row.map((col) => col))
  newBoard[target.row][target.col] =
    newBoard[touchedPiece.row][touchedPiece.col]
  newBoard[touchedPiece.row][touchedPiece.col] = undefined
  return isInCheck(touchedPiece.color, newBoard)
}

export const isMenaced = (
  target: SquareData,
  color: PieceColor,
  board: BoardData
): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const attackingPiece = board[i][j]
      const isMenaceCheck = true
      if (
        (i !== target.row || j !== target.col) &&
        attackingPiece &&
        attackingPiece.color !== color &&
        isDroppable(
          { ...attackingPiece, row: i, col: j },
          target,
          board,
          isMenaceCheck
        )
      ) {
        return true
      }
    }
  }
  return false
}

const isPawnDroppable = (
  touchedPiece: PieceData & SquareData,
  { row, col }: SquareData,
  board: BoardData,
  isMenaceCheck = false
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  switch (color) {
    case PieceColor.Black:
      const isMovementAuthorized_black =
        !isMenaceCheck &&
        col === fromCol &&
        ((row === fromRow + 1 && !board[row][col]) ||
          (fromRow === 1 && row === 3 && !board[3][col]))
      const isCaptureAuthorized_black =
        Math.abs(col - fromCol) === 1 &&
        row === fromRow + 1 &&
        (isMenaceCheck || board[row][col]?.color === PieceColor.White)

      return isMovementAuthorized_black || isCaptureAuthorized_black
    case PieceColor.White:
      const isMovementAuthorized_white =
        !isMenaceCheck &&
        col === fromCol &&
        ((row === fromRow - 1 && !board[row][col]) ||
          (fromRow === 6 && row === 4 && !board[4][col]))
      const isCaptureAuthorized_white =
        Math.abs(col - fromCol) === 1 &&
        row === fromRow - 1 &&
        (isMenaceCheck || board[row][col]?.color === PieceColor.Black)

      return isMovementAuthorized_white || isCaptureAuthorized_white
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
  board: BoardData,
  isMenaceCheck = false
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    Math.abs(row - fromRow) <= 1 && Math.abs(col - fromCol) <= 1
  if (isMovementAuthorized) {
    if (isMenaceCheck) return board[row][col]?.color !== color
    else {
      const isTargetSquareMenaced = isMenaced({ row, col }, color, board)
      return !isTargetSquareMenaced && board[row][col]?.color !== color
    }
  }
  return false
}
