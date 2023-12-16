'use client'
import React from 'react'
import GestoreOrdinazioni from '@/components/gestoreOrdinazioni'
import TopReview from '@/components/topReview'
import { useSearchParams } from 'next/navigation';
export default function page() {
  const searchParams = useSearchParams();
  const tavolo = searchParams.get("tavolo")
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white overscroll-contain'>
      <TopReview className="sticky top-0" style={{zIndex: '50'}}/>
      <div className='relative flex-1 p-[40px] overflow-hidden' style={{zIndex: '0'}}>
        <GestoreOrdinazioni tavolo={tavolo} style={{zIndex: '0'}}/>
      </div>
    </div>
  )
}