import { FC, useContext } from 'react'
import { Square } from './Square'
import { DndContext } from '@dnd-kit/core'
import { ChessContext } from '@/context/context'

const ROW_COL_REGEX = /-(\d+)-(\d+)/

export const Board: FC = () => {
  const { dispatch } = useContext(ChessContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    const { current } = event?.active?.data
    const { name, color, id } = current
    const [, rawRow, rawCol] = id.match(ROW_COL_REGEX)
    const row = parseInt(rawRow, 10)
    const col = parseInt(rawCol, 10)
    dispatch({
      type: 'TOUCH_PIECE',
      payload: {
        name,
        color,
        row,
        col,
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) {
      dispatch({
        type: 'UNTOUCH_PIECE',
      })
      return
    }
    if (active.id !== over.id) {
      const [, fromRow, fromCol] = active.id.match(ROW_COL_REGEX)
      const [, toRow, toCol] = over.id.match(ROW_COL_REGEX)
      dispatch({
        type: 'MOVE_PIECE',
        payload: {
          from: { row: fromRow, col: fromCol },
          to: { row: toRow, col: toCol },
        },
      })
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id={'dnd-context'}
    >
      <div className="flex flex-col">
        {Array.from(Array(8).keys()).map((i) => (
          <div className="flex" key={`row-${i}`}>
            {Array.from(Array(8).keys()).map((j) => (
              <Square key={`square-${i}-${j}`} row={i} col={j} />
            ))}
          </div>
        ))}
      </div>
    </DndContext>
  )
}
