import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { Piece } from './Piece'
import { useDroppable } from '@dnd-kit/core'
import { isDroppableAndNotInCheckAfterMove } from '@/lib/isDroppable'
import { GameStatus, PieceColor, PieceName } from '@/lib/types'

interface ISquare {
  row: number
  col: number
}

export const Square: FC<ISquare> = ({ row, col }) => {
  const { state } = useContext(ChessContext)
  const { stateHistory, currentTurn, touchedPiece } = state
  const currentState = stateHistory[currentTurn]
  const { board, gameStatus, castlingData } = currentState
  const currentColor =
    currentTurn % 2 === 0 ? PieceColor.White : PieceColor.Black
  const { name, color } = board[row][col] ?? {}

  const isPieceDroppable = isDroppableAndNotInCheckAfterMove(
    touchedPiece,
    { row, col },
    board,
    castlingData
  )
  const isOriginSquare = touchedPiece?.row === row && touchedPiece?.col === col

  const { setNodeRef } = useDroppable({
    id: `square-${row}-${col}`,
    disabled: !isPieceDroppable,
  })

  const isKingInCheck =
    gameStatus === GameStatus.Check &&
    currentColor === color &&
    name === PieceName.King
  const isKingCheckMate =
    gameStatus === GameStatus.CheckMate &&
    currentColor === color &&
    name === PieceName.King

  const getSquareBgColorClass = () => {
    if (isKingCheckMate) return 'bg-red-900'
    if (isKingInCheck) return 'bg-red-500'
    if (isOriginSquare) return 'bg-green-500'
    if (isPieceDroppable) return 'bg-green-500'
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
