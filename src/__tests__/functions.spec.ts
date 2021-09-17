import { paginationFilter } from "../functions"

describe("paginationFilter", () => {
  it("currentPage = 1の時、resultはitemsをlengthPerPage分だけfilterしたものになる", () => {
    const total = 150
    const lengthPerPage = 10
    const currentPage = 1
    const items = [...Array(total)].map((_, i) => ({
      username: `fake user ${i + 1}`,
      mail: "fake_address@example.com",
    }))
    const result = paginationFilter(total, lengthPerPage, currentPage, items)
    expect(result).toEqual(items.filter((_, index) => index < 10))
  })
})
