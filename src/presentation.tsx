import * as React from 'react'
import style from './index.module.css'
import { paginationReducer } from './reducer'
import { range } from 'remeda'

export type PaginationProps = {
  total: number
  lengthPerPage: number
  onChange: (n: number) => void
}

const buttonType = ['first', 'prev', 'current', 'next', 'last'] as const

export type ButtonType = typeof buttonType[number]

type PaginationButtonProps = {
  buttonType: ButtonType
  pageLength: number
  dispatchCurrentPage: React.Dispatch<{buttonType: ButtonType, pageLength: number}>
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ buttonType, pageLength, dispatchCurrentPage }) => {
  return (
    <button
      className={style['button']}
      onClick={() => {
        dispatchCurrentPage({buttonType, pageLength})
      }}
    >
      {buttonType}
    </button>
  );
}

const displayLength = 5

// Presentation.tsxとcomponent.tsxに分離する
export const Pagination: React.FC<PaginationProps> = ({ total, lengthPerPage, onChange }) => {
  const [currentPage, dispatchCurrentPage] = React.useReducer(paginationReducer, 1)
  const pageLength = Math.ceil(total / lengthPerPage)
  const [selectableIndex, setSelectableIndex] = React.useState<number[]>([...range(1, displayLength + 1), pageLength])
  React.useEffect(() => {
    onChange(currentPage)
    if (currentPage < displayLength) {
      setSelectableIndex([...range(1, displayLength + 1), pageLength])
    } else if (currentPage >= displayLength && currentPage <= pageLength - displayLength + 1) {
      setSelectableIndex([1, ...range(currentPage - 2, currentPage + displayLength - 2), pageLength])
    } else if (currentPage >= pageLength - displayLength + 1) {
      setSelectableIndex([1, ...range(pageLength - displayLength + 1, pageLength + 1)])
    }
  }, [currentPage, onChange])
  console.log(selectableIndex)
  if (pageLength === 0) {
    return <></>
  }
  return (
    <ol className={style['list']}>
      {buttonType.map((buttonType) => {
        if (buttonType === 'current') {
          return <li key={buttonType} className={style['current']}>{currentPage} / {pageLength}</li>
        }
        return (
          <li key={buttonType} className={style['li']}>
            <PaginationButton
              buttonType={buttonType as ButtonType}
              pageLength={pageLength}
              dispatchCurrentPage={dispatchCurrentPage}
            />
          </li>
        )
      })}
    </ol>
  );
};
