import * as React from "react"
import style from "./index.module.css"
import { PaginationReducerAction } from "./reducer"
import { calcPageLength } from "./functions"
import { threePointLeader } from "./constants"
import { usePagination } from "./hooks"

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

export const Pagination: React.FC<PaginationProps> = ({ total, lengthPerPage, onChange }) => {
  const pageLength = calcPageLength(total, lengthPerPage)
  const { currentPage, dispatchCurrentPage, selectableIndex } = usePagination(onChange, pageLength)
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
