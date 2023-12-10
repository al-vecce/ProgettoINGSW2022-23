'use client'
import React from 'react'
import TabellaElementi from '@/components/tabellaElementi'
import TopElementi from '@/components/topElementi';

import { useSearchParams } from 'next/navigation';

export default function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")
  return (
    <div className='flex flex-col h-screen w-screen bg-white'>
      <div className='order-2 flex p-4'>
        <TabellaElementi name={name}/>
      </div>
      <TopElementi name={name} className='order-1'/>
    </div>
  )
}
