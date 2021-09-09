import * as React from 'react'
import style from './index.module.css'
import { paginationReducer } from './reducer'

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
  setCurrentPage: React.Dispatch<{buttonType: ButtonType, pageLength: number}>
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ buttonType, pageLength, setCurrentPage }) => {
  return (
    <button
      className={style['button']}
      onClick={() => {
        setCurrentPage({buttonType, pageLength})
      }}
    >
      {buttonType}
    </button>
  );
}

// Presentation.tsxとcomponent.tsxに分離する
export const Pagination: React.FC<PaginationProps> = ({ total, lengthPerPage, onChange }) => {
  const [currentPage, setCurrentPage] = React.useReducer(paginationReducer, 1)
  React.useEffect(() => {
    onChange(currentPage)
  }, [currentPage, onChange])
  const pageLength = Math.ceil(total / lengthPerPage)
  if (pageLength === 0) {
    return <></>
  }
  return (
    <ol className={style['list']}>
      {buttonType.map((buttonType) => {
        if (buttonType === 'current') {
          return <li className={style['current']}>{currentPage} / {pageLength}</li>
        }
        return (
          <li className={style['li']}>
            <PaginationButton
              buttonType={buttonType as ButtonType}
              pageLength={pageLength}
              setCurrentPage={setCurrentPage}
            />
          </li>
        )
      })}
    </ol>
  );
};
