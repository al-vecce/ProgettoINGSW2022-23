import React from 'react'
import Top from '@/components/top'
import Tabelleconti from '@/components/tabelleconti'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <Top className='z-2'/>
      <div className='z-1 flex p-4'>
        <Tabelleconti/>
      </div>
    </div>
  )
}