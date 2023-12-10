'use client';

import { Button } from 'flowbite-react';
import { FaArrowsRotate } from "react-icons/fa6";


export default function ButtonRefresh({onClickAction}) {
  return (
    <Button onClick={onClickAction} 
    className='text-lg text-primary-icon body-font rounded-r-lg font-quicksand tracking-widest bg-white
    border border-none  enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-primary-icon focus:border-transparent focus:ring-transparent focus:text-white'
    style={{width:"2.3em", height:"2.3em"}}
    >
      <FaArrowsRotate className='enabled:hover:animate-spin text-xl'/>
    </Button>
  );
}