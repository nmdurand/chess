import { BOARD_SIZE } from './constants'
import { BoardData, LocalizedPieceData, PieceColor, PieceName } from './types'
import { SquareData } from './types'

export const isPathClear = (
  touchedPiece: LocalizedPieceData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { row: fromRow, col: fromCol } = touchedPiece
  const isRowClear =
    row === fromRow && isRowClearBetween(row, fromCol, col, board)
  const isColClear =
    col === fromCol && isColClearBetween(col, fromRow, row, board)
  const isDiagClear =
    Math.abs(row - fromRow) === Math.abs(col - fromCol) &&
    isDiagClearBetween(touchedPiece, { row, col }, board)
  return isRowClear || isColClear || isDiagClear
}

const isRowClearBetween = (
  row: number,
  fromCol: number,
  toCol: number,
  board: BoardData
): boolean => {
  const min = Math.min(fromCol, toCol)
  const max = Math.max(fromCol, toCol)
  for (let i = min + 1; i < max; i++) {
    if (board[row][i]) return false
  }
  return true
}

const isColClearBetween = (
  col: number,
  fromRow: number,
  toRow: number,
  board: BoardData
): boolean => {
  const min = Math.min(fromRow, toRow)
  const max = Math.max(fromRow, toRow)
  for (let i = min + 1; i < max; i++) {
    if (board[i][col]) return false
  }
  return true
}

const isDiagClearBetween = (
  touchedPiece: LocalizedPieceData,
  { row, col }: SquareData,
  board: BoardData
): boolean => {
  const { row: fromRow, col: fromCol } = touchedPiece
  const direction = [
    (row - fromRow) / Math.abs(row - fromRow),
    (col - fromCol) / Math.abs(col - fromCol),
  ]
  for (let i = 1; i < Math.abs(row - fromRow); i++) {
    if (board[fromRow + i * direction[0]][fromCol + i * direction[1]])
      return false
  }
  return true
}

export const updateBoard = ({
  board,
  move,
}: {
  board: BoardData
  move: {
    from: SquareData
    to: SquareData
  }
}): BoardData => {
  const newBoard = JSON.parse(JSON.stringify(board))
  newBoard[move.to.row][move.to.col] = newBoard[move.from.row][move.from.col]
  newBoard[move.from.row][move.from.col] = undefined
  return newBoard
}

export const findKing = (
  color: PieceColor,
  board: BoardData
): SquareData | null => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const piece = board[i][j]
      if (piece?.name === PieceName.King && piece.color === color) {
        return { row: i, col: j }
      }
    }
  }
  console.error('King not found', color, board)
  return null
}
