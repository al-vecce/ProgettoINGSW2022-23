'use client';

import { Button } from 'flowbite-react';
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ButtonPriorita({onClickDecrease, onClickIncrease}) {
    if(!onClickDecrease){
        onClickDecrease = ()=>{};
    }
    if(!onClickIncrease){
        onClickIncrease = ()=>{};
    }
    return (
        <div>
            <Button theme={{pill: ""}} onClick={onClickDecrease()} 
            className='text-lg text-primary-icon body-font rounded-t-lg font-quicksand tracking-widest bg-white
            border border-none  enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-white focus:border-transparent focus:ring-transparent focus:text-primary-icon'
            style={{width:"2.3em", height:"1.2em"}}
            >
                <FaPlus className=' text-xl'/>
            </Button>
            <Button theme={{pill: ""}} onClick={onClickDecrease()} 
            className='text-lg text-primary-icon body-font rounded-b-lg font-quicksand tracking-widest bg-white
            border border-none  enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-white focus:border-transparent focus:ring-transparent focus:text-primary-icon'
            style={{width:"2.3em", height:"1em"}}
            >
                <FaMinus className=' text-xl'/>
            </Button>
        </div>
    );
}