import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from '@fortawesome/free-solid-svg-icons'
import { Board } from '../components/Board'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl my-8">Checkmate, fool!</h1>
      <Board
        data={[
          [
            { type: 'rook', icon: faChessRook, color: 'black' },
            { type: 'knight', icon: faChessKnight, color: 'black' },
            { type: 'bishop', icon: faChessBishop, color: 'black' },
            { type: 'queen', icon: faChessQueen, color: 'black' },
            { type: 'king', icon: faChessKing, color: 'black' },
            { type: 'bishop', icon: faChessBishop, color: 'black' },
            { type: 'knight', icon: faChessKnight, color: 'black' },
            { type: 'rook', icon: faChessRook, color: 'black' },
          ],
          [
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
            { type: 'pawn', icon: faChessPawn, color: 'black' },
          ],
          [{}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}],
          [{}, {}, {}, {}, {}, {}, {}, {}],
          [
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
            { type: 'pawn', icon: faChessPawn, color: 'white' },
          ],
          [
            { type: 'rook', icon: faChessRook, color: 'white' },
            { type: 'knight', icon: faChessKnight, color: 'white' },
            { type: 'bishop', icon: faChessBishop, color: 'white' },
            { type: 'king', icon: faChessKing, color: 'white' },
            { type: 'queen', icon: faChessQueen, color: 'white' },
            { type: 'bishop', icon: faChessBishop, color: 'white' },
            { type: 'knight', icon: faChessKnight, color: 'white' },
            { type: 'rook', icon: faChessRook, color: 'white' },
          ],
        ]}
      />
    </div>
  )
}
