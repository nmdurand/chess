import { FC, useContext } from 'react'
import { ChessContext, PieceColor } from '@/context/context'
import { Piece } from './Piece'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { board, dispatch } = useContext(ChessContext)

  const { name, color } = board[row][col] || {}

  return (
    <div
      className={`w-16 h-16 flex items-center justify-center border border-black ${
        (row + col) % 2 === 0 ? 'bg-zinc-400' : 'bg-slate-600'
      }`}
      onClick={() => {
        dispatch({
          type: 'MOVE_PIECE',
          payload: {
            from: { row, col },
            to: { row: row + (color === PieceColor.White ? 1 : -1), col: col },
          },
        })
      }}
    >
      {name && color && <Piece name={name} color={color} />}
    </div>
  )
}
