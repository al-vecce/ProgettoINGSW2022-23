'use client';
import { Navbar } from 'flowbite-react';

const customTheme = {
  root: {
    inner: {
      base: "flex-1 w-2/3 mx-auto",
      fluid: "off",
    },
  },
  toggle: {
    base: "",
    icon: "",
  }
};


export default function TopSelettoreTavolo() {
  return (
    <Navbar theme={customTheme} className="flex sticky-top-0 lg:xl:h-24 max-h-32 shadow-lg rounded-b-2xl
    bg-cover bg-center bg-[url('/header-splash.svg')]"
    style={{alignItems:'center'}}>
      <div className='grid grid-cols-3' style={{alignItems:'center'}}>
        <div className='m-2 xl:scale-150 justify-self-start' style={{width:"2.5em", height:"2.5em"}}>
          
        </div>
        <img href="/" className='justify-self-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' style={{height:'3.6em'}} src='/logoicon.svg'/>
      </div>
    </Navbar>
  );
}