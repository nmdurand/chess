'use client'

import { PieceColor, PieceData, PieceName, SquareData } from '@/lib/types'
import { isInCheck } from '@/lib/isInCheck'
import React, { FC, ReactNode } from 'react'

export type BoardData = (PieceData | undefined)[][]

interface ChessContextType {
  state: {
    board: BoardData
    boardHistory: BoardData[]
    currentTurn: number
    touchedPiece: (PieceData & SquareData) | null
    isInCheck: PieceColor | null
  }
  dispatch: React.Dispatch<BoardActionType>
}

export const ChessContext = React.createContext<ChessContextType>({
  state: {
    board: new Array(8).fill(new Array(8)),
    boardHistory: [],
    currentTurn: 0,
    touchedPiece: null,
    isInCheck: null,
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
      type: 'MOVE_PIECE'
      payload: {
        from: { row: number; col: number }
        to: { row: number; col: number }
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
    boardHistory: BoardData[]
    currentTurn: number
    touchedPiece: (PieceData & SquareData) | null
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
    case 'MOVE_PIECE':
      const { board, boardHistory } = state
      const newBoard = JSON.parse(JSON.stringify(board))
      const { from, to } = action.payload
      newBoard[to.row][to.col] = newBoard[from.row][from.col]
      newBoard[from.row][from.col] = undefined

      let newIsInCheck = null
      const isWhiteInCheck = isInCheck(PieceColor.White, newBoard)
      if (isWhiteInCheck) {
        newIsInCheck = PieceColor.White
      }
      const isBlackInCheck = isInCheck(PieceColor.Black, newBoard)
      if (isBlackInCheck) {
        newIsInCheck = PieceColor.White
      }

      return {
        board: newBoard,
        isInCheck: newIsInCheck,
        boardHistory: [
          ...boardHistory.slice(0, state.currentTurn + 1),
          newBoard,
        ],
        currentTurn: state.currentTurn + 1,
        touchedPiece: null,
      }
    case 'REWIND_HISTORY':
      const prevBoard = state.boardHistory[state.currentTurn - 1]
      return {
        ...state,
        board: prevBoard,
        currentTurn: state.currentTurn - 1,
      }
    case 'FORWARD_HISTORY':
      if (state.currentTurn === state.boardHistory.length - 1) {
        return state
      }
      const nextBoard = state.boardHistory[state.currentTurn + 1]
      return {
        ...state,
        board: nextBoard,
        currentTurn: state.currentTurn + 1,
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
    boardHistory: [INITIAL_BOARD_DATA],
    currentTurn: 0,
    touchedPiece: null,
  })

  return (
    <ChessContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ChessContext.Provider>
  )
}
