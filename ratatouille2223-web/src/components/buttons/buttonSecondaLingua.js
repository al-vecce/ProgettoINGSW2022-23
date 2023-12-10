'use client';

import { Button } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FaLanguage } from "react-icons/fa";

export default function ButtonSecondaLingua({onClickAction}) {
    const [ state, setState ] = useState(false);
    if(!onClickAction){
        onClickAction = ()=>{};
    }
    return (
        <div>
            <Button theme={{pill: { 
                off: "rounded-lg bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent", 
                on: "rounded-lg text-lg body-font text-primary-icon font-quicksand tracking-widest bg-gray-100 border border-4 border-primary-icon enabled:hover:bg-gray-300 enabled:hover:border-primary-icon focus-bg-gray-100 focus:border-gray-800 focus:border-primary-icon focus:ring-transparent"}}}
            className='text-lg body-font font-quicksand tracking-widest' 
            style={{width:"2.3em", height:"2.3em"}} 
            pill={state}
            onClick={()=>{onClickAction();
                          setState(!state);}}>
                <FaLanguage className='text-2xl'/>
            </Button>
        </div>
    );
}

/*
{inputstate && <Button className='text-lg body-font text-primary-icon font-quicksand tracking-widest bg-gray-100 border border-4 border-primary-icon enabled:hover:bg-gray-300 enabled:hover:border-primary-icon focus-bg-gray-100 focus:border-gray-800 focus:border-primary-icon focus:ring-transparent' style={{width:"2.3em", height:"2.3em"}} 
            onClick={statemethod(false)}>
                <FaLanguage className='text-3xl'/>
            </Button>}
*/