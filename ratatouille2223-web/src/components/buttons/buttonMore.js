'use client';

import { Button } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";

export default function ButtonMore({onClickAction}) {
  const [ state, setState ] = useState(false);
  if(!onClickAction){
    onClickAction = ()=>{};
  }
  return (
    <Button theme={{pill: { 
      off: "rounded-lg", 
      on: "rounded-lg rotate-180"}}}
    className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
    border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
    style={{width:"2.3em", height:"2.3em"}}
    pill={state}
    onClick={()=>{onClickAction();
                  setState(!state);}}>
      <FaAngleDown className='text-xl'/>
    </Button>
  );
}