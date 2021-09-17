/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react"

import { Pagination } from "../"

describe("App", () => {
  test("renders App component", () => {
    const total = 150
    const lengthPerPage = 10
    const onChange = jest.fn()
    render(
      <Pagination
        total={total}
        lengthPerPage={lengthPerPage}
        onChange={onChange}
      />
    )
  })
})
