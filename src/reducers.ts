import { Reducer } from "react"
import { ButtonType } from "./constants"

export type PaginationReducerState = number
export type PaginationReducerAction = { type: ButtonType, payload: { pageNumber: number, pageLength: number }}

export const paginationReducer: Reducer<PaginationReducerState, PaginationReducerAction> = (state, action) => {
  const { type, payload } = action
  const { pageNumber, pageLength } = payload
  if (type === "first") {
    return 1
  }
  if (type === "previous") {
    return state === 1 ? 1 : state - 1
  }
  if (type === "next") {
    return state === pageLength ? pageLength : state + 1
  }
  if (type === "number") {
    return pageNumber
  }
  // type === 'last'
  return pageLength
}

