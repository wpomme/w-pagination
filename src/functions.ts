export const paginationFilter = <T extends Object>(
  total: number,
  lengthPerPage: number,
  currentPage: number,
  items: T[],
) => {
  const pageLength = Math.ceil(total / lengthPerPage)
  if (pageLength === 0) {
    return items
  }
  return items.filter((_, index) => {
    return lengthPerPage * (currentPage - 1) <= index && index < lengthPerPage * currentPage
  })
}

