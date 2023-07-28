import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { Piece } from './Piece'
import { useDroppable } from '@dnd-kit/core'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { context } = useContext(ChessContext)
  const { board } = context
  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
  })
  const { name, color } = board[row][col] || {}

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
