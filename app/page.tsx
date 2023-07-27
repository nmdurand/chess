'use client'

import { Board } from '@/components/Board'
import { ChessContext, INITIAL_BOARD_DATA } from '../context/context'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl my-8">Checkmate, fool!</h1>
      <ChessContext.Provider value={{ board: INITIAL_BOARD_DATA }}>
        <Board />
      </ChessContext.Provider>
    </div>
  )
}
