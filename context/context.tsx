'use client'

import React, { FC, ReactNode } from 'react'

export enum PieceColor {
  Black = 'black',
  White = 'white',
}

export enum PieceName {
  Pawn = 'pawn',
  Rook = 'rook',
  Knight = 'knight',
  Bishop = 'bishop',
  Queen = 'queen',
  King = 'king',
}

export interface PieceData {
  name: PieceName
  color: PieceColor
}

type BoardData = (PieceData | undefined)[][]

interface ChessContextType {
  context: {
    board: BoardData
    boardHistory: BoardData[]
    currentTurn: number
    touchedPiece: PieceData | null
  }
  dispatch: React.Dispatch<BoardActionType>
}

export const ChessContext = React.createContext<ChessContextType>({
  context: {
    board: new Array(8).fill(new Array(8)),
    boardHistory: [],
    currentTurn: 0,
    touchedPiece: null,
  },
  dispatch: () => {},
})

export const INITIAL_BOARD_DATA = [
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
  [],
  [],
  [],
  [],
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
]

type BoardActionType =
  | {
      type: 'TOUCH_PIECE'
      payload: {
        piece: PieceData | null
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
  context: {
    board: BoardData
    boardHistory: BoardData[]
    currentTurn: number
    touchedPiece: PieceData | null
  },
  action: BoardActionType
) => {
  switch (action.type) {
    case 'TOUCH_PIECE':
      const piece = action.payload.piece
      return {
        ...context,
        touchedPiece: piece,
      }
    case 'MOVE_PIECE':
      const { board, boardHistory } = context
      const newBoard = JSON.parse(JSON.stringify(board))
      const { from, to } = action.payload
      newBoard[to.row][to.col] = newBoard[from.row][from.col]
      newBoard[from.row][from.col] = undefined
      return {
        board: newBoard,
        boardHistory: [
          ...boardHistory.slice(0, context.currentTurn + 1),
          newBoard,
        ],
        currentTurn: context.currentTurn + 1,
        touchedPiece: null,
      }
    case 'REWIND_HISTORY':
      const prevBoard = context.boardHistory[context.currentTurn - 1]
      return {
        ...context,
        board: prevBoard,
        currentTurn: context.currentTurn - 1,
      }
    case 'FORWARD_HISTORY':
      if (context.currentTurn === context.boardHistory.length - 1) {
        return context
      }
      const nextBoard = context.boardHistory[context.currentTurn + 1]
      return {
        ...context,
        board: nextBoard,
        currentTurn: context.currentTurn + 1,
      }
    default:
      return context
  }
}

export const ChessProvider: FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const [context, dispatch] = React.useReducer(contextReducer, {
    board: INITIAL_BOARD_DATA,
    boardHistory: [INITIAL_BOARD_DATA],
    currentTurn: 0,
    touchedPiece: null,
  })

  return (
    <ChessContext.Provider
      value={{
        context,
        dispatch,
      }}
    >
      {children}
    </ChessContext.Provider>
  )
}
