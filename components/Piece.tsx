import { FC } from 'react'
import { PieceData, PieceName } from '@/context/context'
import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ICON_NAMES = {
  [PieceName.King]: faChessKing,
  [PieceName.Queen]: faChessQueen,
  [PieceName.Bishop]: faChessBishop,
  [PieceName.Knight]: faChessKnight,
  [PieceName.Rook]: faChessRook,
  [PieceName.Pawn]: faChessPawn,
}

export const Piece: FC<PieceData> = ({ name, color }) => {
  return (
    <FontAwesomeIcon
      icon={ICON_NAMES[name]}
      inverse
      className={`w-10 h-10 ${color === 'black' ? 'text-black' : 'text-white'}`}
    />
  )
}
