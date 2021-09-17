import { useState, useReducer, useEffect, Dispatch } from "react"
import { paginationReducer, PaginationReducerAction } from "./reducers"
import { range, map as remedaMap } from "remeda"
import { displayLength, ButtonType } from "./constants"

export type SelectableIndex = {
  buttonType: ButtonType
  index: number | null
}

const convertSelectableIndex = (element: number | string): SelectableIndex => {
  return {
    buttonType: typeof element === "string" ? element as ButtonType : "number" as ButtonType,
    index: typeof element === "number" ? element : null,
  }
}

export const usePagination = (
  onChange: (n: number) => void,
  pageLength: number
): {
  currentPage: number,
  dispatchCurrentPage: Dispatch<PaginationReducerAction>
  selectableIndex: SelectableIndex[],
  setSelectableIndex: (n: SelectableIndex[]) => void,
} => {
  const [currentPage, dispatchCurrentPage] = useReducer(paginationReducer, 1)
  const tmpIndex = ["first", "previous", ...range(1, displayLength + 1), "threePointLeader", pageLength, "next", "last"]
  const [selectableIndex, setSelectableIndex] = useState<SelectableIndex[]>(remedaMap(tmpIndex, convertSelectableIndex))

  useEffect(() => {
    onChange(currentPage)
    if (currentPage < displayLength) {
      const tmpIndex = ["first", "previous", ...range(1, displayLength + 1), "threePointLeader", pageLength, "next", "last"]
      setSelectableIndex(remedaMap(tmpIndex, convertSelectableIndex))
    } else if (currentPage >= displayLength && currentPage <= pageLength - displayLength + 1) {
      const tmpIndex = ["first", "previous", 1, "threePointLeader", ...range(currentPage - 2, currentPage + displayLength - 4), "threePointLeader", pageLength, "next", "last"]
      setSelectableIndex(remedaMap(tmpIndex, convertSelectableIndex))
    } else if (currentPage >= pageLength - displayLength + 1) {
      const tmpIndex = ["first", "previous", 1, "threePointLeader", ...range(pageLength - displayLength + 1, pageLength + 1), "next", "last"]
      setSelectableIndex(remedaMap(tmpIndex, convertSelectableIndex))
    }
  }, [currentPage, onChange])

  return { currentPage, dispatchCurrentPage, selectableIndex, setSelectableIndex }
}

