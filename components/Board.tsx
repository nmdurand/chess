import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface SquareData {
  type?: string
  icon?: IconDefinition
  color?: 'black' | 'white'
}
interface BoardData {
  data: SquareData[][]
}

export const Board: FC<BoardData> = ({ data }) => {
  return (
    <div className="flex flex-col">
      {data.map((row, i) => (
        <div className="flex" key={i}>
          {row.map(({ icon, color }, j) => (
            <div
              key={`square-${i}-${j}`}
              className={`w-16 h-16 flex items-center justify-center border border-black ${
                (i + j) % 2 === 0 ? 'bg-amber-100' : 'bg-slate-600'
              }`}
            >
              {icon && (
                <FontAwesomeIcon
                  icon={icon}
                  inverse
                  className={`w-12 h-12 p-2 ${
                    color === 'black'
                      ? 'text-black bg-white rounded-full'
                      : 'text-white bg-black rounded-full'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
