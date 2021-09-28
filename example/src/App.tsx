import React, { useState } from "react"
import { Pagination, paginationFilter } from "w-pagination"

type AppProps = {
  className?: string
}

type ItemProps = {
  num: number
}

const Item: React.FC<ItemProps> = ({ num }) => <div>test {num}</div>
const total = 150
const lengthPerPage = 10
const num = [...Array(total)].map((_, i) => i + 1)

export const App: React.FC<AppProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  return (
    <>
      <ul>
        {paginationFilter(total, lengthPerPage, currentIndex, num).map((num: number, index: number) => (
          <li key={"li" + index}>
            <Item num={num} />
          </li>
        ))}
      </ul>
      <Pagination
        total={total}
        lengthPerPage={lengthPerPage}
        onChange={setCurrentIndex}
      />
    </>
  )
}

