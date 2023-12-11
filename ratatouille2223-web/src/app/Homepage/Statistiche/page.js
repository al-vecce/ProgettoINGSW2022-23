import TopStatistiche from '@/components/topStatistiche'
import React from 'react'
import { Datepicker } from 'flowbite-react'

export default function page() {
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <div className='order-2 flex p-4'>
        
      </div>
      <TopStatistiche className='order-1'/>
      
    </div>
  )
}
