'use client'

import {
  BoardData,
  GameStatus,
  PieceColor,
  PieceData,
  PieceName,
  SquareData,
} from '@/lib/types'
import { checkGameStatus } from '@/lib/isInCheck'
import React, { FC, ReactNode, useMemo } from 'react'
import { updateBoard } from '@/lib/utils'

interface ChessContextType {
  state: {
    board: BoardData
    currentTurn: number
    currentColor: PieceColor
    gameStatus: GameStatus
    kingsPositions: {
      [PieceColor.White]: SquareData
      [PieceColor.Black]: SquareData
    }
    stateHistory: {
      board: BoardData
      currentTurn: number
      currentColor: PieceColor
      gameStatus: GameStatus
      kingsPositions: {
        [PieceColor.White]: SquareData
        [PieceColor.Black]: SquareData
      }
    }[]
    touchedPiece: (PieceData & SquareData) | null
  }
  dispatch: React.Dispatch<BoardActionType>
}

export const ChessContext = React.createContext<ChessContextType>({
  state: {
    board: new Array(8).fill(new Array(8)),
    stateHistory: [],
    currentTurn: 0,
    touchedPiece: null,
    gameStatus: GameStatus.InProgress,
    currentColor: PieceColor.White,
    kingsPositions: {
      [PieceColor.White]: { row: 7, col: 4 },
      [PieceColor.Black]: { row: 0, col: 4 },
    },
  },
  dispatch: () => {},
})

export const INITIAL_BOARD_DATA = [
  [
    { name: PieceName.Rook, color: PieceColor.Black },
    { name: PieceName.Knight, color: PieceColor.Black },
    { name: PieceName.Bishop, color: PieceColor.Black },
    { name: PieceName.Queen, color: PieceColor.Black },
    { name: PieceName.King, color: PieceColor.Black },
    { name: PieceName.Bishop, color: PieceColor.Black },
    { name: PieceName.Knight, color: PieceColor.Black },
    { name: PieceName.Rook, color: PieceColor.Black },
  ],
  [
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
    { name: PieceName.Pawn, color: PieceColor.Black },
  ],
  [],
  [],
  [],
  [],
  [
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
    { name: PieceName.Pawn, color: PieceColor.White },
  ],
  [
    { name: PieceName.Rook, color: PieceColor.White },
    { name: PieceName.Knight, color: PieceColor.White },
    { name: PieceName.Bishop, color: PieceColor.White },
    { name: PieceName.Queen, color: PieceColor.White },
    { name: PieceName.King, color: PieceColor.White },
    { name: PieceName.Bishop, color: PieceColor.White },
    { name: PieceName.Knight, color: PieceColor.White },
    { name: PieceName.Rook, color: PieceColor.White },
  ],
]

type BoardActionType =
  | {
      type: 'TOUCH_PIECE'
      payload: {
        name: PieceName
        color: PieceColor
        row: number
        col: number
      }
    }
  | {
      type: 'UNTOUCH_PIECE'
    }
  | {
      type: 'MOVE_PIECE'
      payload: {
        from: SquareData
        to: SquareData
      }
    }
  | {
      type: 'REWIND_HISTORY'
    }
  | {
      type: 'FORWARD_HISTORY'
    }

const contextReducer = (
  state: {
    board: BoardData
    stateHistory: {
      board: BoardData
      currentTurn: number
      currentColor: PieceColor
      gameStatus: GameStatus
      kingsPositions: {
        [PieceColor.White]: SquareData
        [PieceColor.Black]: SquareData
      }
    }[]
    currentTurn: number
    touchedPiece: (PieceData & SquareData) | null
    gameStatus: GameStatus
    currentColor: PieceColor
    kingsPositions: {
      [PieceColor.White]: SquareData
      [PieceColor.Black]: SquareData
    }
  },
  action: BoardActionType
) => {
  switch (action.type) {
    case 'TOUCH_PIECE':
      const pieceAndSquareData = action.payload
      return {
        ...state,
        touchedPiece: pieceAndSquareData,
      }
    case 'UNTOUCH_PIECE':
      return {
        ...state,
        touchedPiece: null,
      }
    case 'MOVE_PIECE':
      const { board, stateHistory, currentColor, currentTurn } = state
      const { from, to } = action.payload
      const newBoard = updateBoard({
        board,
        move: {
          from,
          to,
        },
      })

      const newKingsPositions = state.kingsPositions
      if (newBoard[to.row][to.col]?.name === PieceName.King) {
        newKingsPositions[currentColor] = to
      }
      const newColor =
        currentColor === PieceColor.White ? PieceColor.Black : PieceColor.White
      const newStatus = checkGameStatus(newColor, newBoard)
      const newTurn = currentTurn + 1

      const newState = {
        board: newBoard,
        currentTurn: newTurn,
        currentColor: newColor,
        gameStatus: newStatus,
        kingsPositions: newKingsPositions,
      }
      // fetch('/api/positionRating', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     board: newBoard,
      //     currentColor: newColor,
      //   }),
      // }).then(async (res) => {
      //   const { data: positionRating } = await res.json()
      //   console.log('>>>>>>', positionRating)
      // })

      return {
        ...newState,
        stateHistory: [
          ...stateHistory.slice(0, state.currentTurn + 1),
          newState,
        ],
        touchedPiece: null,
      }
    case 'REWIND_HISTORY':
      const prevTurn = state.currentTurn - 1
      return {
        ...state,
        ...state.stateHistory[prevTurn],
      }
    case 'FORWARD_HISTORY':
      const nextTurn = state.currentTurn + 1
      return {
        ...state,
        ...state.stateHistory[nextTurn],
      }
    default:
      return state
  }
}

export const ChessProvider: FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(contextReducer, {
    board: INITIAL_BOARD_DATA,
    stateHistory: [
      {
        board: INITIAL_BOARD_DATA,
        currentTurn: 0,
        currentColor: PieceColor.White,
        gameStatus: GameStatus.InProgress,
        kingsPositions: {
          [PieceColor.White]: { row: 7, col: 4 },
          [PieceColor.Black]: { row: 0, col: 4 },
        },
      },
    ],
    currentTurn: 0,
    touchedPiece: null,
    gameStatus: GameStatus.InProgress,
    currentColor: PieceColor.White,
    kingsPositions: {
      [PieceColor.White]: { row: 7, col: 4 },
      [PieceColor.Black]: { row: 0, col: 4 },
    },
  })

  const globalContextValue = useMemo(
    () => ({
      dispatch,
      state,
    }),
    [dispatch, state]
  )

  return (
    <ChessContext.Provider value={globalContextValue}>
      {children}
    </ChessContext.Provider>
  )
}
