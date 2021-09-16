import { ButtonType } from "./presentation"

export const paginationReducer: React.Reducer<number, { buttonType: ButtonType, pageLength: number}> = (state, action) => {
  const { buttonType, pageLength } = action
  if (buttonType === "first") {
    return 1
  }
  if (buttonType === "previous") {
    return state === 1 ? 1 : state - 1
  }
  if (buttonType === "next") {
    return state === pageLength ? pageLength : state + 1
  }
  if (buttonType === "number") {
    return pageLength
  }
  // buttonType === 'last'
  return pageLength
}

