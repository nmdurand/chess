import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { PieceColor } from '@/lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const GameDetails: FC = () => {
  const { state, dispatch } = useContext(ChessContext)
  const { currentTurn, boardHistory } = state

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
        <span>Turn: {currentTurn}</span>
        <div className="flex align-center justify-center">
          {currentTurn < boardHistory.length - 1 && (
            <FontAwesomeIcon
              className="w-6 h-6 text-center"
              icon={faArrowRight}
              onClick={forwardHistory}
            />
          )}
        </div>
      </div>
      <div>
        ({`${currentTurn % 2 === 0 ? PieceColor.White : PieceColor.Black}`}{' '}
        play)
      </div>
    </div>
  )
}
