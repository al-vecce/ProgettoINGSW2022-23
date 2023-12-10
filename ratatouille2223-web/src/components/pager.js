'use client';

import { Pagination } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { useState } from 'react';

export default function Pager({setCurrentPage, currentPage, maxPages, isLoading, error}) {


  function clickIncrementPage(){
      if((currentPage + 1 ) <= maxPages ){
        setCurrentPage(currentPage+1);
      }
  }
  function clickDecrementPage(){
    if((currentPage - 1 ) > 0 ){
      setCurrentPage(currentPage-1);
    }
}

  return (
    <div className="flex flew-col w-48 gap-2 items-center justify-center text-inherit
    bg-white rounded-lg">
      <Button onClick={clickDecrementPage} theme={{pill: "rounded-l-lg"}}className='text-inherit bg-trasparent enabled:hover:bg-transparent
      focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}>
        <FaCaretLeft className='text-xl'/>
      </Button>
      {currentPage} di {maxPages}
      <Button onClick={clickIncrementPage} theme={{pill: "rounded-l-lg"}}className='text-inherit bg-trasparent enabled:hover:bg-transparent
      focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}>
      <FaCaretRight className='text-xl'/>
      </Button>
    </div>
  );
}
