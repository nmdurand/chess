import { FC, useContext } from 'react'
import { ChessContext, PieceColor, PieceName } from '@/context/context'
import { Piece } from './Piece'
import { useDroppable } from '@dnd-kit/core'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { state } = useContext(ChessContext)
  const { board, touchedPiece } = state
  const { name, color } = board[row][col] || {}

  const isDroppable = (() => {
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
  })()

  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    disabled: !isDroppable,
  })

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center border border-black ${
        isOver
          ? 'bg-green-400'
          : (row + col) % 2 === 0
          ? 'bg-zinc-400'
          : 'bg-slate-600'
      }`}
      ref={setNodeRef}
    >
      {name && color && (
        <Piece name={name} color={color} id={`square-${row}-${col}`} />
      )}
    </div>
  )
}
