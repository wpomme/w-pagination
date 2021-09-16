import { ButtonType } from "./presentation"

export type PaginationReducerState = number
export type PaginationReducerAction = { type: ButtonType, payload: PaginationReducerState}

export const paginationReducer: React.Reducer<PaginationReducerState, PaginationReducerAction> = (state, action) => {
  const { type, payload } = action
  if (type === "first") {
    return 1
  }
  if (type === "previous") {
    return state === 1 ? 1 : state - 1
  }
  if (type === "next") {
    return state === payload ? payload : state + 1
  }
  if (type === "number") {
    return payload
  }
  // type === 'last'
  return payload
}

