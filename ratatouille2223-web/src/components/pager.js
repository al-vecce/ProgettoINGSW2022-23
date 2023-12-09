'use client';

import { Pagination } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { useState } from 'react';

export default function Pager() {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex flew-col w-48 gap-2 items-center justify-center text-inherit
    bg-white rounded-lg">
      <Button theme={{pill: "rounded-l-lg"}}className='text-inherit bg-trasparent enabled:hover:bg-transparent
      focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}>
        <FaCaretLeft className='text-xl'/>
      </Button>
      {currentPage} di {maxPages}
      <Button theme={{pill: "rounded-l-lg"}}className='text-inherit bg-trasparent enabled:hover:bg-transparent
      focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}>
      <FaCaretRight className='text-xl'/>
      </Button>
    </div>
  );
}
