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

export interface SquareData {
  row: number
  col: number
}

export enum GameStatus {
  InProgress = 'inProgress',
  Check = 'check',
  CheckMate = 'checkMate',
}
