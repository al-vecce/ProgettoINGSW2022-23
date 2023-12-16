'use client'
import React from 'react'
import GestoreOrdinazioni from '@/components/gestoreOrdinazioni'
import TopReview from '@/components/topReview'
import { useSearchParams } from 'next/navigation';
export default function page() {
  const searchParams = useSearchParams();
  const tavolo = searchParams.get("tavolo")
  const checkID = searchParams.get("checkID")
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
        <TopReview style={{zIndex: '2'}}/>
      <div className='flex-1 p-[60px]' style={{zIndex: '1'}}>
        <GestoreOrdinazioni tavolo={tavolo} checkID={checkID}/>
      </div>
    </div>
  )
}