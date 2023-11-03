'use client'

import {
  BoardData,
  CastlingData,
  GameStatus,
  LocalizedPieceData,
  PieceColor,
  PieceData,
  PieceName,
  SquareData,
} from '@/lib/types'
import { checkGameStatus } from '@/lib/isInCheck'
import React, { FC, ReactNode, useMemo } from 'react'
import { updateBoard, updateCastlingData } from '@/lib/utils'

interface ChessState {
  currentTurn: number
  stateHistory: {
    board: BoardData
    gameStatus: GameStatus
    castlingData: CastlingData
  }[]
  touchedPiece: LocalizedPieceData | null
}

interface ChessContextType {
  state: ChessState
  dispatch: React.Dispatch<BoardAction>
}

export const ChessContext = React.createContext<ChessContextType>({
  state: {
    stateHistory: [
      {
        board: new Array(8).fill(new Array(8)),
        gameStatus: GameStatus.InProgress,
        castlingData: {
          [PieceColor.White]: {
            kingSide: true,
            queenSide: true,
          },
          [PieceColor.Black]: {
            kingSide: true,
            queenSide: true,
          },
        },
      },
    ],
    currentTurn: 0,
    touchedPiece: null,
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

type BoardAction =
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

const contextReducer = (state: ChessState, action: BoardAction): ChessState => {
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
      const { stateHistory, currentTurn } = state
      const currentState = stateHistory[currentTurn]
      const { board, castlingData } = currentState
      const { from, to } = action.payload
      const movedPiece = board[from.row][from.col]

      const newCastlingData = updateCastlingData({
        castlingData,
        movedPiece: { ...(movedPiece as PieceData), ...from },
      })

      const newBoard = updateBoard({
        board,
        move: {
          from,
          to,
        },
      })

      const newTurn = currentTurn + 1
      const newColor = newTurn % 2 === 0 ? PieceColor.White : PieceColor.Black
      const newStatus = checkGameStatus(newColor, newBoard, newCastlingData)

      const result = {
        ...state,
        currentTurn: newTurn,
        stateHistory: [
          ...stateHistory.slice(0, state.currentTurn + 1),
          {
            board: newBoard,
            gameStatus: newStatus,
            castlingData: newCastlingData,
          },
        ],
        touchedPiece: null,
      }
      console.log('New state', result)
      return result
    case 'REWIND_HISTORY':
      const prevTurn = state.currentTurn - 1
      return {
        ...state,
        currentTurn: prevTurn,
      }
    case 'FORWARD_HISTORY':
      const nextTurn = state.currentTurn + 1
      return {
        ...state,
        currentTurn: nextTurn,
      }
    default:
      return state
  }
}

export const ChessProvider: FC<{ children: ReactNode | undefined }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ChessState, BoardAction>
  >(contextReducer, {
    stateHistory: [
      {
        board: INITIAL_BOARD_DATA,
        gameStatus: GameStatus.InProgress,
        castlingData: {
          [PieceColor.White]: {
            kingSide: true,
            queenSide: true,
          },
          [PieceColor.Black]: {
            kingSide: true,
            queenSide: true,
          },
        },
      },
    ],
    currentTurn: 0,
    touchedPiece: null,
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
