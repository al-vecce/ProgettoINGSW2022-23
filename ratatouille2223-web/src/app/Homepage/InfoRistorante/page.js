import React from 'react'

import TopInfo from '@/components/topInfo'
import InfoAttivitaForm from '@/components/infoAttivitaForm'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopInfo style={{zIndex: '2'}}/>
      <main className="flex min-h-screen flex-col items-center justify-between 
    bg-cover bg-no-repeat bg-center bg-[url('/mobile-splash.svg')] lg:xl:2xl:3xl:bg-[url('/login-splash.svg')]"
    style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div className='flex-col lg:xl:scale-150' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        
        <InfoAttivitaForm/>
      </div>
    </main>
    </div>
  )
}
