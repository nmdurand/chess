import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { Piece } from './Piece'
import { useDroppable } from '@dnd-kit/core'
import { isDroppable } from '@/lib/isDroppable'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { state } = useContext(ChessContext)
  const { board, touchedPiece } = state
  const { name, color } = board[row][col] || {}

  const isPieceDroppable = isDroppable(touchedPiece, { row, col }, board)

  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    disabled: !isPieceDroppable,
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
