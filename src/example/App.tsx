import React, { useState } from 'react'
import { Pagination, paginationFilter } from '../'

type AppProps = {
  className?: string
}

type ItemProps = {
  num: number
}

const Item: React.FC<ItemProps> = ({ num }) => <div>test {num}</div>
const total = 100
const lengthPerPage=10
const num = [...Array(total)].map((_, i) => i + 1)

export const App: React.FC<AppProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  return (
    <>
      {paginationFilter(total, lengthPerPage, currentIndex, num).map((num, index) => (
        <li key={'li' + index}>
          <Item num={num} />
        </li>
      ))}
      <Pagination
        total={total}
        lengthPerPage={lengthPerPage}
        onChange={setCurrentIndex}
      />
    </>
  );
}

