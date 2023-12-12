import React from 'react'

import TabelleCategorie from '@/components/tabellaCategorie'
import TopCategoria from '@/components/topCategoria'

export default function page() {
  return (
    <div className='flex flex-col h-screen w-screen bg-white'>
      <TopCategoria style={{zIndex: '2'}}/>
      <div className='flex p-4' style={{zIndex: '1'}}>
        <TabelleCategorie />
      </div>
    </div>
  )
}

