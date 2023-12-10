'use client'

import { Button } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { FaList } from "react-icons/fa";

export default function ButtonCategoryMore({onClickAction}) {
  return (
    <Button className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
    border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
    style={{width:"2.3em", height:"2.3em"}}
    onClick={onClickAction}>
      <FaList className='text-xl'/>
    </Button>
  );
}