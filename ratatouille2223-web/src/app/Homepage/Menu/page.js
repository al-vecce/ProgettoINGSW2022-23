import React from 'react'

import TabelleCategorie from '@/components/tabellaCategorie'
import TopCategoria from '@/components/topCategoria'

export default function page() {
  return (
    <div className='flex flex-col h-screen w-screen bg-white'>
      <div className='order-2 flex p-4 '>
        <TabelleCategorie />
      </div>
      <TopCategoria className='order-1'/>
    </div>
  )
}

