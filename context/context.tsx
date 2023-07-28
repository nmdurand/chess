'use client'

import React, { FC, ReactNode, useState } from 'react'

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
  board: BoardData
  currentTurn: number
  movingPiece: PieceData | null
  dispatch: React.Dispatch<BoardActionType>
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>
  setMovingPiece: React.Dispatch<React.SetStateAction<PieceData | null>>
}

export const ChessContext = React.createContext<ChessContextType>({
  board: new Array(8).fill(new Array(8)),
  currentTurn: 0,
  movingPiece: null,
  dispatch: () => {},
  setCurrentTurn: () => {},
  setMovingPiece: () => {},
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

type BoardActionType = {
  type: 'MOVE_PIECE'
  payload: {
    from: { row: number; col: number }
    to: { row: number; col: number }
  }
}

const boardReducer = (board: BoardData, action: BoardActionType) => {
  switch (action.type) {
    case 'MOVE_PIECE':
      const newBoard = [...board]
      const { from, to } = action.payload
      newBoard[to.row][to.col] = newBoard[from.row][from.col]
      newBoard[from.row][from.col] = undefined
      return newBoard
    default:
      return board
  }
}

export const ChessProvider: FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const [board, dispatch] = React.useReducer(boardReducer, INITIAL_BOARD_DATA)
  const [currentTurn, setCurrentTurn] = useState(0)
  const [movingPiece, setMovingPiece] = useState<PieceData | null>(null)

  return (
    <ChessContext.Provider
      value={{
        board,
        currentTurn,
        movingPiece,
        dispatch,
        setCurrentTurn,
        setMovingPiece,
      }}
    >
      {children}
    </ChessContext.Provider>
  )
}
