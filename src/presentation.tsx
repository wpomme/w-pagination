import * as React from "react"
import style from "./index.module.css"
import { PaginationReducerAction } from "./reducers"
import { calcPageLength } from "./functions"
import { usePagination, SelectableIndex } from "./hooks"

export const buttonType = ["first", "previous", "current", "next", "last", "number", "threePointLeader"] as const

export type ButtonType = typeof buttonType[number]

export type PaginationProps = {
  total: number
  lengthPerPage: number
  onChange: (n: number) => void
}

type PaginationButtonProps = {
  buttonType: ButtonType
  payload: number
  dispatchCurrentPage: React.Dispatch<PaginationReducerAction>
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const PaginationButton: React.FC<PaginationButtonProps> = ({ buttonType, payload, dispatchCurrentPage, ...props }) => {
  return (
    <button
      className={style["button"]}
      onClick={() => {
        dispatchCurrentPage({type: buttonType, payload: payload})
      }}
      {...props}
    >
      {buttonType === "number" ? payload : buttonType}
    </button>
  )
}

const isDisabledButton = (element: SelectableIndex, currentPage: number, pageLength: number): boolean => {
  const { index, buttonType } = element
  if (index === currentPage) {
    return true
  }
  if ((buttonType === "first" || buttonType === "previous") && currentPage === 1) {
    return true
  }
  if ((buttonType === "next" || buttonType === "last") && currentPage === pageLength) {
    return true
  }
  return false
}

export const Pagination: React.FC<PaginationProps> = ({ total, lengthPerPage, onChange }) => {
  const pageLength = calcPageLength(total, lengthPerPage)
  const { currentPage, dispatchCurrentPage, selectableIndex } = usePagination(onChange, pageLength)
  if (pageLength === 0) {
    return <></>
  }
  console.log(selectableIndex)
  return (
    <ol className={style["list"]}>
      {selectableIndex.map((element, index) => {
        if (element.buttonType === "threePointLeader") {
          return (
            <li key={`${element}-${index}`} className={style["li"]}>
              <span>...</span>
            </li>
          )
        }
        return (
          <li key={`${element.buttonType}-${element.index}`} className={style["li"]}>
            <PaginationButton
              buttonType={element.buttonType}
              payload={element.index == null ? 0 : element.index}
              dispatchCurrentPage={dispatchCurrentPage}
              disabled={isDisabledButton(element, currentPage, pageLength)}
            />
          </li>
        )
      })}
    </ol>
  )
}
