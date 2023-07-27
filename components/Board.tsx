import { FC } from 'react'
import { Square } from './Square'

export const Board: FC = () => {
  return (
    <div className="flex flex-col">
      {Array.from(Array(8).keys()).map((i) => (
        <div className="flex" key={`row-${i}`}>
          {Array.from(Array(8).keys()).map((j) => (
            <Square key={`${i}-${j}`} row={i} col={j} />
          ))}
        </div>
      ))}
    </div>
  )
}
