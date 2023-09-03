import { PieceColor, PieceName, BoardData } from './types'
import { BOARD_SIZE } from '@/lib/constants'

export const nameToFEN = (name: PieceName) => {
  switch (name) {
    case PieceName.Pawn:
      return 'p'
    case PieceName.Rook:
      return 'r'
    case PieceName.Knight:
      return 'n'
    case PieceName.Bishop:
      return 'b'
    case PieceName.Queen:
      return 'q'
    case PieceName.King:
      return 'k'
  }
}

export const boardToFEN = (
  board: BoardData,
  currentActiveColor: PieceColor
) => {
  let fen = ''
  for (let i = 0; i < BOARD_SIZE; i++) {
    let empty = 0
    for (let j = 0; j < BOARD_SIZE; j++) {
      const piece = board[i][j]
      if (!piece) {
        empty++
      } else {
        const pieceName = nameToFEN(piece.name)
        if (empty > 0) {
          fen += empty
          empty = 0
        }
        fen +=
          piece.color === PieceColor.White
            ? pieceName.toUpperCase()
            : pieceName.toLowerCase()
      }
    }
    if (empty > 0) {
      fen += empty
    }
    if (i < BOARD_SIZE - 1) {
      fen += '/'
    }
  }
  fen += ` ${currentActiveColor === PieceColor.White ? 'w' : 'b'}`
  return fen
}
