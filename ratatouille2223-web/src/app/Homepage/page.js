import React from 'react'
import Top from '@/components/top'
import Tabelleconti from '@/components/tabelleconti'

export default function page() {
  return (
    <div className='flex flex-col h-screen w-screen bg-white'>
      <div className='order-2 flex p-4'>
        <Tabelleconti/>
      </div>
      <Top className='order-1'/>
    </div>
  )
}