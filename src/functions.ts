import { SelectableIndex } from "./hooks"

export const calcPageLength = (total: number, lengthPerPage: number): number => {
  //total >= 0, lengthPerPage > 0
  if (lengthPerPage === 0) {
    return 0
  }
  return Math.ceil(total / lengthPerPage)
}

export const paginationFilter = <T extends unknown>(
  total: number,
  lengthPerPage: number,
  currentPage: number,
  items: T[],
): T[] => {
  const pageLength = calcPageLength(total, lengthPerPage)
  if (pageLength === 0) {
    return items
  }
  return items.filter((_, index) => {
    return lengthPerPage * (currentPage - 1) <= index && index < lengthPerPage * currentPage
  })
}

export const isDisabledButton = (element: SelectableIndex, currentPage: number, pageLength: number): boolean => {
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
  if (buttonType === "threePointLeader") {
    return true
  }
  return false
}
