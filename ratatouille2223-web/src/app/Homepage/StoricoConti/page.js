import React from 'react'

import TopStorico from '@/components/topStorico'
import TabelleContiChiusi from '@/components/tabelleContiChiusi'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopStorico style={{zIndex: '2'}}/>
      <div className='flex p-4' style={{zIndex: '1'}}>
        <TabelleContiChiusi/>
      </div>
    </div>
  )
}
