import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { GameStatus, PieceColor } from '@/lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const GameDetails: FC = () => {
  const { state, dispatch } = useContext(ChessContext)
  const { currentTurn, stateHistory } = state

  const rewindHistory = () => {
    dispatch({ type: 'REWIND_HISTORY' })
  }
  const forwardHistory = () => {
    dispatch({ type: 'FORWARD_HISTORY' })
  }

  return (
    <div className="py-6 text-center">
      <div className="w-96 grid grid-cols-3 border border-gray-50 p-4 border-opacity-20 rounded-md">
        <div className="flex items-center justify-center">
          {currentTurn > 0 && (
            <FontAwesomeIcon
              className="w-6 h-6 text-center"
              icon={faArrowLeft}
              onClick={rewindHistory}
            />
          )}
        </div>
        <div>
          <span>Turn: {currentTurn}</span>
          <div>
            ({`${currentTurn % 2 === 0 ? PieceColor.White : PieceColor.Black}`}{' '}
            plays)
          </div>
        </div>
        <div className="flex items-center justify-center">
          {currentTurn < stateHistory.length - 1 && (
            <FontAwesomeIcon
              className="w-6 h-6 text-center"
              icon={faArrowRight}
              onClick={forwardHistory}
            />
          )}
        </div>
      </div>
      <div className={'h-10 mt-4 text-3xl'}>
        {state.gameStatus === GameStatus.CheckMate && (
          <div className="text-red-900">Checkmate</div>
        )}
        {state.gameStatus === GameStatus.Check && (
          <div className="text-red-500">Check</div>
        )}
      </div>
    </div>
  )
}
