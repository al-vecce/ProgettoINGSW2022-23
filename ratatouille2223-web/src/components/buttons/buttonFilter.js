'use client';

import { Button } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";


export default function ButtonFilter() {
  return (
    <Button className='text-lg text-primary-icon body-font rounded-r-lg font-quicksand tracking-widest bg-white
    border border-none enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-primary-icon focus:border-transparent focus:ring-transparent focus:text-white'
    style={{width:"2.3em", height:"2.3em"}}>
      <FaFilter className='text-xl'/>
    </Button>
  );
  
}