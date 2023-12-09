'use client';

import { Pagination } from 'flowbite-react';
import { useState } from 'react';

export default function Pager({funzionePerCambiarePagina}) {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {funzionePerCambiarePagina(page)};

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="navigation"
        currentPage={currentPage}
        totalPages={10}
        onPageChange={onPageChange}
        showIcons
      ></Pagination>
    </div>
  );
}