'use client'

import { Board } from '@/components/Board'
import { GameDetails } from '@/components/GameDetails'
import { ChessProvider } from '../context/context'

export default function Home() {
  return (
    <div className="flex flex-col items-center container mx-auto">
      <ChessProvider>
        <GameDetails />
        <Board />
      </ChessProvider>
    </div>
  )
}
