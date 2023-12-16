'use client'
import Image from 'next/image'
import PrimoAccessoForm from '@/components/primoAccessoForm';

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
    bg-cover bg-no-repeat bg-center bg-[url('/mobile-splash.svg')] lg:xl:bg-[url('/login-splash.svg')]"
    style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className='flex-col gap-6 lg:xl:scale-150' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <img className='drop-shadow-sm' style={{height:'15em'}} src='/logoicon.svg'/>
        <div className="container flex-col gap-2" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'5em', 
                  fontFamily:'arial'}}>
          <h1 className="body-font font-quicksand drop-shadow-md font-semibold text-5xl">RATATOUILLE 23</h1>
          <h2 className="body-font font-quicksand drop-shadow-md font-semibold text-xl text-center">È il tuo primo accesso: inserisci una nuova password.</h2>
        </div>
        <PrimoAccessoForm/>
      </div>
    </main>
  )
}
