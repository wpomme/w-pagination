import * as React from "react"
import style from "./index.module.css"
import { paginationReducer, PaginationReducerAction } from "./reducer"
import { range } from "remeda"

export type PaginationProps = {
  total: number
  lengthPerPage: number
  onChange: (n: number) => void
}

const buttonType = ["first", "previous", "current", "next", "last", "number"] as const

export type ButtonType = typeof buttonType[number]

type PaginationButtonProps = {
  buttonType: ButtonType
  currentPage: number
  dispatchCurrentPage: React.Dispatch<PaginationReducerAction>
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const PaginationButton: React.FC<PaginationButtonProps> = ({ buttonType, currentPage, dispatchCurrentPage, ...props }) => {
  return (
    <button
      className={style["button"]}
      onClick={() => {
        dispatchCurrentPage({type: buttonType, payload: currentPage})
      }}
      {...props}
    >
      {currentPage}
    </button>
  )
}

const displayLength = 7
const threePointLeader = 0

export const Pagination: React.FC<PaginationProps> = ({ total, lengthPerPage, onChange }) => {
  const [currentPage, dispatchCurrentPage] = React.useReducer(paginationReducer, 1)
  const pageLength = Math.ceil(total / lengthPerPage)
  const [selectableIndex, setSelectableIndex] = React.useState<number[]>([...range(1, displayLength + 1), pageLength])
  React.useEffect(() => {
    onChange(currentPage)
    if (currentPage < displayLength) {
      setSelectableIndex([...range(1, displayLength + 1), threePointLeader, pageLength])
    } else if (currentPage >= displayLength && currentPage <= pageLength - displayLength + 1) {
      setSelectableIndex([1, threePointLeader, ...range(currentPage - 2, currentPage + displayLength - 4), threePointLeader, pageLength])
    } else if (currentPage >= pageLength - displayLength + 1) {
      setSelectableIndex([1, threePointLeader, ...range(pageLength - displayLength + 1, pageLength + 1)])
    }
  }, [currentPage, onChange])
  if (pageLength === 0) {
    return <></>
  }
  return (
    <ol className={style["list"]}>
      {selectableIndex.map((num, index) => {
        if (num === threePointLeader) {
          return (
            <li key={`${num}-${index}`} className={style["li"]}>
              <span>...</span>
            </li>
          )
        }
        return (
          <li key={num} className={style["li"]}>
            <PaginationButton
              buttonType={"number" as ButtonType}
              currentPage={num}
              dispatchCurrentPage={dispatchCurrentPage}
              disabled={num === currentPage}
            />
          </li>
        )
      })}
    </ol>
  )
}
