'use client';

import { Button } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FaAngleDown, FaList } from "react-icons/fa";

export default function ButtonMore({onClickAction, type}) {
  const [ state, setState ] = useState(false);
  if(!onClickAction){
    onClickAction = ()=>{};
  }
  return (
    <div>
      {type ? <Button theme={{pill: { 
        off: "rounded-lg bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent", 
        on: "rounded-lg border-[4px] border-primary-icon bg-white text-primary-icon enabled:hover:bg-gray-200 focus:bg-gray-200 focus:primary-icon focus:ring-transparent"}}}
      className='text-lg shadow-md body-font font-quicksand tracking-widest'
      style={{width:"2.3em", height:"2.3em"}}
      pill={state}
      onClick={()=>{onClickAction();
                    setState(!state);}}>
        <FaList className='text-xl'/>
      </Button> :
      <Button theme={{pill: { 
        off: "rounded-lg", 
        on: "rounded-lg rotate-180"}}}
      className='text-lg shadow-md body-font font-quicksand tracking-widest bg-primary-icon
      border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}
      pill={state}
      onClick={()=>{onClickAction();
                    setState(!state);}}>
        <FaAngleDown className='text-xl'/>
      </Button>}
    </div>
  );
}