'use client'

import React, { useState } from 'react';

import TopSelettoreTavolo from '@/components/topSelettoreTavolo'
import TimePicker from '@/components/timepicker/components/TimePicker';
import MinuteWheel from '@/components/timepicker/components/MinuteWheel';

export default function page() {

  const [value, setValue] = useState('10:00');

  const onChange = (timeValue) => {
     setValue(timeValue);
  }

  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopSelettoreTavolo style={{zIndex: '2'}}/>
      <div className='flex p-20 items-center justify-center' style={{zIndex: '1'}}>
        <div className='w-[1000px] p-20 bg-primary-2 items-center justify-center'>
          <TimePicker></TimePicker>
          <MinuteWheel height={50} setValue={setValue} value={value}/>
          <MinuteWheel height={50} setValue={setValue} value={value}/>
        </div>
        <p className='text-black font-[]'>{value}</p>
      </div>
    </div>
  )
}