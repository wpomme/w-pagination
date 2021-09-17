import { paginationReducer } from "../reducers"

describe("test paginationReducer", () => {
  it("paginationReducer returns 1 when buttonType is \"first\"", () => {
    const prevState = 4
    const buttonType = "first"
    const pageLength = 100
    const returnValue = paginationReducer(prevState, { type: buttonType, payload: pageLength })
    expect(returnValue).toBe(1)
  })
  it("paginationReducer returns pageLength when buttonType is \"last\"", () => {
    const prevState = 4
    const buttonType = "last"
    const pageLength = 100
    const returnValue = paginationReducer(prevState, { type: buttonType, payload: pageLength })
    expect(returnValue).toBe(pageLength)
  })
})
