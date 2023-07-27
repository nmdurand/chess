import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { Piece } from './Piece'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { board } = useContext(ChessContext)

  const { name, color } = board[row][col] || {}

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center border border-black ${
        (row + col) % 2 === 0 ? 'bg-zinc-400' : 'bg-slate-600'
      }`}
    >
      {name && color && <Piece name={name} color={color} />}
    </div>
  )
}
