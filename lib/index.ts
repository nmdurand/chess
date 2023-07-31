import { PieceColor, PieceData, PieceName, SquareData } from '@/lib/types'

export const isDroppable = (
  touchedPiece: (PieceData & SquareData) | null,
  { row, col }: SquareData
) => {
  if (!touchedPiece) return false
  const {
    name: touchedName,
    color: touchedColor,
    row: fromRow,
    col: fromCol,
  } = touchedPiece
  switch (touchedName) {
    case PieceName.Pawn:
      return (
        (touchedColor === PieceColor.White &&
          col === fromCol &&
          (row === fromRow + 1 || (fromRow === 1 && row === 3))) ||
        (touchedColor === PieceColor.Black &&
          col === fromCol &&
          (row === fromRow - 1 || (fromRow === 6 && row === 4)))
      )
    case PieceName.Rook:
      return row === fromRow || col === fromCol
    case PieceName.Knight:
      return (
        (Math.abs(row - fromRow) === 2 && Math.abs(col - fromCol) === 1) ||
        (Math.abs(row - fromRow) === 1 && Math.abs(col - fromCol) === 2)
      )
    case PieceName.Bishop:
      return Math.abs(row - fromRow) === Math.abs(col - fromCol)
    case PieceName.Queen:
      return (
        row === fromRow ||
        col === fromCol ||
        Math.abs(row - fromRow) === Math.abs(col - fromCol)
      )
    case PieceName.King:
      return Math.abs(row - fromRow) <= 1 && Math.abs(col - fromCol) <= 1
    default:
      return false
  }
}
