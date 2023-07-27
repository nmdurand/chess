'use client'

import React from 'react'

export enum PlayerColor {
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
  color: PlayerColor
}

interface ChessContextType {
  board: (PieceData | undefined)[][]
}

export const ChessContext = React.createContext<ChessContextType>({
  board: new Array(8).fill(new Array(8)),
})

export const INITIAL_BOARD_DATA = [
  [
    { name: PieceName.Rook, color: PlayerColor.White },
    { name: PieceName.Knight, color: PlayerColor.White },
    { name: PieceName.Bishop, color: PlayerColor.White },
    { name: PieceName.Queen, color: PlayerColor.White },
    { name: PieceName.King, color: PlayerColor.White },
    { name: PieceName.Bishop, color: PlayerColor.White },
    { name: PieceName.Knight, color: PlayerColor.White },
    { name: PieceName.Rook, color: PlayerColor.White },
  ],
  [
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
    { name: PieceName.Pawn, color: PlayerColor.White },
  ],
  [],
  [],
  [],
  [],
  [
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
    { name: PieceName.Pawn, color: PlayerColor.Black },
  ],
  [
    { name: PieceName.Rook, color: PlayerColor.Black },
    { name: PieceName.Knight, color: PlayerColor.Black },
    { name: PieceName.Bishop, color: PlayerColor.Black },
    { name: PieceName.Queen, color: PlayerColor.Black },
    { name: PieceName.King, color: PlayerColor.Black },
    { name: PieceName.Bishop, color: PlayerColor.Black },
    { name: PieceName.Knight, color: PlayerColor.Black },
    { name: PieceName.Rook, color: PlayerColor.Black },
  ],
]
