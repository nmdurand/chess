import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { Piece } from './Piece'
import { useDroppable } from '@dnd-kit/core'
import { isDroppable, isMenaced } from '@/lib/isDroppable'
import { PieceColor, PieceName } from '@/lib/types'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { state } = useContext(ChessContext)
  const { board, touchedPiece } = state
  const { name, color } = board[row][col] ?? {}

  const isPieceDroppable = isDroppable(touchedPiece, { row, col }, board)

  const { isOver, setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    disabled: !isPieceDroppable,
  })

  const isInCheck =
    name === PieceName.King &&
    isMenaced({ row, col }, color as PieceColor, board)

  const getSquareBgColorClass = () => {
    if (isInCheck) return 'bg-red-500'
    if (isOver) return 'bg-green-400'
    if ((row + col) % 2 === 0) return 'bg-zinc-400'
    return 'bg-slate-600'
  }

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center border border-black ${getSquareBgColorClass()}`}
      ref={setNodeRef}
    >
      {name && color && (
        <Piece name={name} color={color} id={`square-${row}-${col}`} />
      )}
    </div>
  )
}
