import React from 'react'
import TopUtenze from '@/components/topUtenze'
import TabellaUtenze from '@/components/tabellaUtenze'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopUtenze style={{zIndex: '1'}}/>
      <div className='flex p-4' style={{zIndex: '1'}}>
        <TabellaUtenze/>
      </div>
    </div>
  )
}
