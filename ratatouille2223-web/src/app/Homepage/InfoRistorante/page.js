import React from 'react'

import TopInfo from '@/components/topInfo'
import InfoAttivitaForm from '@/components/infoAttivitaForm'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopInfo style={{zIndex: '2'}}/>
      <div className='flex p-4 items-center justify-center' style={{zIndex: '1'}}>
        <InfoAttivitaForm/>
      </div>
    </div>
  )
}
