import { FC, useContext } from 'react'
import { ChessContext } from '@/context/context'
import { PieceColor, PieceData, PieceName } from '@/lib/types'
import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDraggable } from '@dnd-kit/core'

const ICON_NAMES = {
  [PieceName.King]: faChessKing,
  [PieceName.Queen]: faChessQueen,
  [PieceName.Bishop]: faChessBishop,
  [PieceName.Knight]: faChessKnight,
  [PieceName.Rook]: faChessRook,
  [PieceName.Pawn]: faChessPawn,
}

type IPiece = PieceData & { id: string }

export const Piece: FC<IPiece> = ({ name, color, id }) => {
  const { state } = useContext(ChessContext)
  const { currentTurn } = state

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    disabled:
      (color === PieceColor.White && currentTurn % 2 === 1) ||
      (color === PieceColor.Black && currentTurn % 2 === 0),
    id: id,
    data: { name, color, id },
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <FontAwesomeIcon
        icon={ICON_NAMES[name]}
        inverse
        className={`flex w-10 h-10 ${
          color === PieceColor.Black ? 'text-black' : 'text-white'
        }`}
      />
    </div>
  )
}
