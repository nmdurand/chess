import { useCallback, useEffect, useRef } from 'react'

const STOCKFISH_PATH = 'stockfish/stockfish-nnue-16.js'

export function useStockfish(): {
  setHandler: (handler: (event: MessageEvent) => void) => void
  postMessage: (message: string) => void
} {
  const workerRef = useRef<Worker>()

  useEffect(() => {
    // Initializing worker
    workerRef.current = new Worker(STOCKFISH_PATH, { name: 'stockfish' })
  }, [])

  const setHandler = useCallback(
    (handler: (event: MessageEvent) => void) => {
      console.log('Setting handler', workerRef.current)
      if (workerRef.current) {
        workerRef.current.onmessage = handler
      }
    },
    [workerRef.current]
  )

  const postMessage = useCallback((message: string) => {
    workerRef.current?.postMessage(message)
  }, [])

  return { setHandler, postMessage }
}
