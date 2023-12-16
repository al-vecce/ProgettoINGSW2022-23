'use client'
import React from 'react'
import GestoreOrdinazioni from '@/components/gestoreOrdinazioni'
import TopMenu from '@/components/topMenu'
import { useSearchParams } from 'next/navigation';
import MenuBody from '@/components/menuBody';
export default function page() {
  const searchParams = useSearchParams();
  const tavolo = searchParams.get("tavolo")
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
        <TopMenu style={{zIndex: '2'}}/>
      <div className='relative flex-1 p-[40px] overflow-hidden'>
        <MenuBody/>
      </div>
    </div>
  )
}