'use client'
import Image from 'next/image'
import LoginForm from '@/components/loginform'
import { Container } from 'postcss'

import { Flowbite } from 'flowbite-react';
const customTheme = {
  container: {
    padding: '2rem',
    center: true,
  },
};

export default function Home() {
  return (
    //<main className="flex min-h-screen flex-col items-center justify-between p-24">
    //style="display:flex;justify-content:center;align-items:center;">
    <main className="flex min-h-screen flex-col items-center justify-between 
    bg-cover bg-no-repeat bg-center bg-[url('/mobile-splash.svg')] 
    lg:bg-[url('/login-splash.svg')]
    xl:bg-[url('/login-splash.svg')]
    2xl:bg-[url('/login-splash.svg')]"
    style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className='flex-col lg:scale-150 xl:scale-150' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <img className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' style={{height:'15em'}} src='/logoicon.svg'/>
      <div className="container" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'5em', 
                fontFamily:'arial'}}>
        <h1 className="body-font font-quicksand tracking-widest drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)] font-semibold text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl">RATATOUILLE 23</h1>
      </div>
      <LoginForm/>
      </div>
    </main>
    
  )
}
