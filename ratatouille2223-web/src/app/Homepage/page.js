import React from 'react'
import Top from '@/components/top'
import Tabelleconti from '@/components/tabelleconti'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <Top style={{zIndex: '90'}}/>
      <div className='flex p-4' style={{zIndex: '1'}}>
        <Tabelleconti/>
      </div>
    </div>
  )
}