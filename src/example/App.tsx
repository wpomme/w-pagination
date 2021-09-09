import React, { useState } from 'react'
import { Pagination, paginationFilter } from '../'

type AppProps = {
  className?: string
}

type ItemProps = {
  num: number
}

const Item: React.FC<ItemProps> = ({ num }) => <div>test {num}</div>
const num = [...Array(100)].map((i) => i)

export const App: React.FC<AppProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  return (
    <>
      {paginationFilter(100, 10, currentIndex, num).map((num, index) => (
        <li key={'li' + index}>
          <Item {...num} />
        </li>
      ))}
      <Pagination
        total={100}
        lengthPerPage={10}
        onChange={setCurrentIndex}
      />
    </>
  );
}

