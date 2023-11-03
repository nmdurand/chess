import {
  BoardData,
  CastlingData,
  LocalizedPieceData,
  PieceColor,
  PieceName,
  SquareData,
} from '@/lib/types'
import { isPathClear, updateBoard, updateCastlingData } from './utils'
import { isInCheck } from './isInCheck'

export const isDroppable = (
  touchedPiece: LocalizedPieceData | null,
  target: SquareData,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  if (!touchedPiece) return false
  const { name: touchedName } = touchedPiece
  switch (touchedName) {
    case PieceName.Pawn:
      return canPawnReachTarget(touchedPiece, target, board)
    case PieceName.Rook:
      return canRookReachTarget(touchedPiece, target, board)
    case PieceName.Knight:
      return canKnightReachTarget(touchedPiece, target, board)
    case PieceName.Bishop:
      return canBishopReachTarget(touchedPiece, target, board)
    case PieceName.Queen:
      return canQueenReachTarget(touchedPiece, target, board)
    case PieceName.King:
      return canKingReachTarget(touchedPiece, target, board, castlingData)
    default:
      return false
  }
}

export const isDroppableAndNotInCheckAfterMove = (
  touchedPiece: LocalizedPieceData | null,
  target: SquareData,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  return (
    isDroppable(touchedPiece, target, board, castlingData) &&
    !isInCheckAfterMove(touchedPiece, target, board, castlingData)
  )
}

export const isInCheckAfterMove = (
  touchedPiece: LocalizedPieceData | null,
  target: SquareData,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  if (!touchedPiece) return false
  const newBoard = updateBoard({
    board,
    move: {
      from: touchedPiece,
      to: target,
    },
  })
  const newCastlingData = updateCastlingData({
    castlingData,
    movedPiece: {
      ...touchedPiece,
      ...target,
    },
  })
  return isInCheck(touchedPiece.color, newBoard, newCastlingData)
}

export const isMenaced = (
  square: SquareData,
  color: PieceColor,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const attackingPiece = board[i][j]
      if (
        (i !== square.row || j !== square.col) &&
        attackingPiece &&
        attackingPiece.color !== color &&
        isDroppable(
          { ...attackingPiece, row: i, col: j },
          square,
          board,
          castlingData
        )
      ) {
        return true
      }
    }
  }
  return false
}

const canPawnReachTarget = (
  touchedPiece: LocalizedPieceData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  switch (color) {
    case PieceColor.Black:
      const isMovementAuthorized_black =
        col === fromCol &&
        ((row === fromRow + 1 && !board[row][col]) ||
          (fromRow === 1 && row === 3 && !board[3][col]))
      const isCaptureAuthorized_black =
        Math.abs(col - fromCol) === 1 &&
        row === fromRow + 1 &&
        board[row][col]?.color === PieceColor.White

      return isMovementAuthorized_black || isCaptureAuthorized_black
    case PieceColor.White:
      const isMovementAuthorized_white =
        col === fromCol &&
        ((row === fromRow - 1 && !board[row][col]) ||
          (fromRow === 6 && row === 4 && !board[4][col]))
      const isCaptureAuthorized_white =
        Math.abs(col - fromCol) === 1 &&
        row === fromRow - 1 &&
        board[row][col]?.color === PieceColor.Black

      return isMovementAuthorized_white || isCaptureAuthorized_white
    default:
      return false
  }
}

const canRookReachTarget = (
  touchedPiece: LocalizedPieceData,
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

const canKnightReachTarget = (
  touchedPiece: LocalizedPieceData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    (Math.abs(row - fromRow) === 2 && Math.abs(col - fromCol) === 1) ||
    (Math.abs(row - fromRow) === 1 && Math.abs(col - fromCol) === 2)

  return isMovementAuthorized && board[row][col]?.color !== color
}

const canBishopReachTarget = (
  touchedPiece: LocalizedPieceData,
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

const canQueenReachTarget = (
  touchedPiece: LocalizedPieceData,
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

const canKingReachTarget = (
  touchedPiece: LocalizedPieceData,
  { row, col }: SquareData,
  board: BoardData,
  castlingData: CastlingData
): boolean => {
  const { color, row: fromRow, col: fromCol } = touchedPiece
  const isMovementAuthorized =
    Math.abs(row - fromRow) <= 1 && Math.abs(col - fromCol) <= 1
  const isCastlingKingSideAuthorized =
    castlingData[color].kingSide &&
    col === 6 &&
    row === fromRow &&
    (board[row][5] === null || board[row][5] === undefined) &&
    (board[row][6] === null || board[row][6] === undefined) &&
    !isMenaced({ row, col: 5 }, color, board, castlingData) &&
    !isMenaced({ row, col: 6 }, color, board, castlingData)
  const isCastlingQueenSideAuthorized =
    castlingData[color].queenSide &&
    col === 2 &&
    row === fromRow &&
    (board[row][3] === null || board[row][3] === undefined) &&
    (board[row][2] === null || board[row][2] === undefined) &&
    (board[row][1] === null || board[row][1] === undefined) &&
    !isMenaced({ row, col: 3 }, color, board, castlingData) &&
    !isMenaced({ row, col: 2 }, color, board, castlingData) &&
    !isMenaced({ row, col: 1 }, color, board, castlingData)
  return (
    (isMovementAuthorized && board[row][col]?.color !== color) ||
    isCastlingKingSideAuthorized ||
    isCastlingQueenSideAuthorized
  )
}
