'use client';

import { Pagination } from 'flowbite-react';
import { useState } from 'react';

export default function Pager() {
  const [currentPage, setCurrentPage] = useState(1);

  //const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="navigation"
        currentPage={currentPage}
        totalPages={100}
        //onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}