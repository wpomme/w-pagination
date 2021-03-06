import * as React from "react"
import style from "./index.module.css"
import { PaginationReducerAction } from "./reducers"
import { calcPageLength, isDisabledButton } from "./functions"
import { usePagination, SelectableIndex } from "./hooks"
import { ButtonType } from "./constants"

export type PaginationProps = {
  total: number
  lengthPerPage: number
  onChange: (n: number) => void
}

type PaginationButtonProps = {
  buttonType: ButtonType
  pageNumber: number
  selectableIndex: SelectableIndex,
  pageLength: number,
  currentPage: number,
  dispatchCurrentPage: React.Dispatch<PaginationReducerAction>
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const buttonText: { [k: string]: string } = {
  first: "≪",
  previous: "<",
  next: ">",
  last: "≫",
  threePointLeader: "...",
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  buttonType,
  pageNumber,
  selectableIndex,
  pageLength,
  currentPage,
  dispatchCurrentPage,
  ...props
}) => {
  return (
    <button
      className={style["button"]}
      onClick={() => {
        dispatchCurrentPage({type: buttonType, payload: { pageNumber: pageNumber, pageLength: pageLength }})
      }}
      disabled={isDisabledButton(selectableIndex, currentPage, pageLength)}
      {...props}
    >
      {buttonType === "number" ? pageNumber : buttonText[buttonType]}
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
      {selectableIndex.map((element, index) => {
        return (
          <li key={`${element.buttonType}-${index}`} className={style["li"]}>
            <PaginationButton
              buttonType={element.buttonType}
              pageNumber={element.index == null ? 0 : element.index}
              pageLength={pageLength}
              currentPage={currentPage}
              selectableIndex={element}
              dispatchCurrentPage={dispatchCurrentPage}
            />
          </li>
        )
      })}
    </ol>
  )
}
