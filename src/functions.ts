export const paginationFilter = <T extends unknown>(
  total: number,
  lengthPerPage: number,
  currentPage: number,
  items: T[],
): T[] => {
  const pageLength = Math.ceil(total / lengthPerPage)
  if (pageLength === 0) {
    return items
  }
  return items.filter((_, index) => {
    return lengthPerPage * (currentPage - 1) <= index && index < lengthPerPage * currentPage
  })
}

