'use client';

import { Button } from 'flowbite-react';

import { FaWheatAwn, FaCow, FaEgg, FaFish, FaShrimp  } from "react-icons/fa6";
import { GiPeas, GiPeanut, GiNautilusShell,GiCrab  } from "react-icons/gi";
import { LuShrub, LuBean  } from "react-icons/lu";

export default function ButtonAllergen({type, onClickAction}) {
  if(type == null || type == 'null'){
  }
  if(!onClickAction){
    onClickAction = ()=>{};
  }
  switch(type) {
    case "GLUTINE":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-yellow-400 enabled:hover:bg-yellow-500 focus:bg-yellow-400 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <FaWheatAwn className='text-2xl'/>
          </Button>
        </div>
      );
    case "LATTE":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-cyan-500 enabled:hover:bg-cyan-600 focus:bg-cyan-500 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <FaCow className='text-3xl'/>
          </Button>
        </div>
      );
    case "SOIA":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-green-500 enabled:hover:bg-green-600 focus:bg-green-500 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <GiPeas className='text-3xl'/>
          </Button>
        </div>  
      );
    case "UOVA":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-yellow-300 enabled:hover:bg-yellow-400 focus:bg-yellow-300 focus:border-transparent focus:ring-transparent contrast-[0.9] saturate-[0.2]'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <FaEgg className='text-3xl'/>
          </Button>
        </div>
      );
    case "FRUTTAGUSCIO":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-rose-500 enabled:hover:bg-rose-600 focus:bg-rose-500 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <GiPeanut className='text-3xl'/>
          </Button>
        </div>
      );
    case "PESCE":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-blue-500 enabled:hover:bg-blue-600 focus:bg-blue-500 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <FaFish  className='text-3xl'/>
          </Button>
        </div>
      );
    case "MOLLUSCHI":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-violet-900 enabled:hover:bg-violet-950 focus:bg-violet-900 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <GiNautilusShell  className='text-3xl'/>
          </Button>
        </div>
      );
    case "CROSTACEI":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-red-600 enabled:hover:bg-red-700 focus:bg-red-600 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <FaShrimp className='text-3xl'/>
          </Button>
        </div>
      );
    case "SEDANO":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-lime-700 enabled:hover:bg-green-800 focus:bg-green-700 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <LuShrub className='text-3xl'/>
          </Button>
        </div>
      );
    case "LUPINI":
      return (
        <div>
          <Button pill={true} className='drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest
          border border-none bg-orange-500 enabled:hover:bg-orange-600 focus:bg-orange-500 focus:border-transparent focus:ring-transparent'
          style={{width:"2.3em", height:"2.3em"}}
          onClick={onClickAction()}>
            <LuBean  className='text-3xl'/>
          </Button>
        </div>
      );
  }
}