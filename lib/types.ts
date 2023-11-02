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

export type PieceData = {
  name: PieceName
  color: PieceColor
}

export type BoardData = (PieceData | undefined)[][]

export type SquareData = {
  row: number
  col: number
}

export type LocalizedPieceData = PieceData & SquareData

export enum GameStatus {
  InProgress = 'inProgress',
  Check = 'check',
  CheckMate = 'checkMate',
}

export type CastleData = {
  [PieceColor.White]: {
    kingSide: boolean
    queenSide: boolean
  }
  [PieceColor.Black]: {
    kingSide: boolean
    queenSide: boolean
  }
}
