'use client'
import React from 'react'
import TabellaElementi from '@/components/tabellaElementi'
import TopElementi from '@/components/topElementi';

import { useSearchParams } from 'next/navigation';

export default function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopElementi name={name} style={{zIndex: '2'}}/>
      <div className='flex p-4' style={{zIndex: '1'}}>
        <TabellaElementi name={name}/>
      </div>
    </div>
  )
}
