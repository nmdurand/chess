import { FC, useContext } from 'react'
import { ChessContext, PieceColor } from '@/context/context'

export const GameDetails: FC = () => {
  const { context } = useContext(ChessContext)
  return (
    <div className="py-6 text-center">
      <div>Turn: {context.currentTurn}</div>
      <div>
        (
        {`${
          context.currentTurn % 2 === 0 ? PieceColor.White : PieceColor.Black
        }`}{' '}
        play)
      </div>
    </div>
  )
}
