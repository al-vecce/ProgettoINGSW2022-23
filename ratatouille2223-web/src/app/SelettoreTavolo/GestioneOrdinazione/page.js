import React from 'react'

import TopReview from '@/components/topReview'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopReview style={{zIndex: '2'}}/>
      <div className='flex p-4' style={{zIndex: '1'}}>
      </div>
    </div>
  )
}