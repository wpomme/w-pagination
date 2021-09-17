import React, { useState, useReducer, Dispatch } from "react"
import { paginationReducer, PaginationReducerAction } from "./reducers"
import { range } from "remeda"
import { displayLength, threePointLeader } from "./constants"

export const usePagination = (
  onChange: (n: number) => void,
  pageLength: number
): {
  currentPage: number,
  dispatchCurrentPage: Dispatch<PaginationReducerAction>
  selectableIndex: number[],
  setSelectableIndex: (n: number[]) => void,
} => {
  const [currentPage, dispatchCurrentPage] = useReducer(paginationReducer, 1)
  const [selectableIndex, setSelectableIndex] = useState<number[]>([...range(1, displayLength + 1), pageLength])
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
  return { currentPage, dispatchCurrentPage, selectableIndex, setSelectableIndex }
}

