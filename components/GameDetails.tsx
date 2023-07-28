import { FC, useContext } from 'react'
import { ChessContext, PieceColor } from '@/context/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const GameDetails: FC = () => {
  const { context, dispatch } = useContext(ChessContext)
  const { currentTurn } = context

  const rewindHistory = () => {
    dispatch({ type: 'REWIND_HISTORY' })
  }
  const forwardHistory = () => {
    dispatch({ type: 'FORWARD_HISTORY' })
  }

  return (
    <div className="py-6 text-center">
      <div className="w-80 grid grid-cols-3">
        <div className="flex align-center justify-center">
          {currentTurn > 0 && (
            <FontAwesomeIcon
              className="w-6 h-6 text-center"
              icon={faArrowLeft}
              onClick={rewindHistory}
            />
          )}
        </div>
        <span>Turn: {context.currentTurn}</span>
        <div className="flex align-center justify-center">
          {currentTurn < context.boardHistory.length - 1 && (
            <FontAwesomeIcon
              className="w-6 h-6 text-center"
              icon={faArrowRight}
              onClick={forwardHistory}
            />
          )}
        </div>
      </div>
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
