'use client'

import { Board } from '@/components/Board'
import { GameDetails } from '@/components/GameDetails'
import { ChessProvider } from '../context/context'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl my-8">Checkmate, fool!</h1>
      <ChessProvider>
        <GameDetails />
        <Board />
      </ChessProvider>
    </div>
  )
}
