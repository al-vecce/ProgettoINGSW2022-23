import React from 'react'
import TopUtenze from '@/components/topUtenze'
import TabellaUtenze from '@/components/tabellaUtenze'

export default function page() {
  return (
    <div className='flex flex-col h-screen w-screen bg-white'>
      <div className='order-2 flex p-4'>
        <TabellaUtenze/>
      </div>
      <TopUtenze className='order-1'/>
    </div>
  )
}
