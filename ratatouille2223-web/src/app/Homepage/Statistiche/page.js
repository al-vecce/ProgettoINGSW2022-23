'use client'

import GraphGroup from '@/components/graphGroup';
import TopStatistiche from '@/components/topStatistiche'
import React, { Component } from "react";

export default function page() {
  return (
    <div className='flex flex-col min-h-screen gap-4 bg-white'>
      <TopStatistiche style={{zIndex: '1'}}/>
      <div style={{zIndex: '2'}}>
        <GraphGroup/>
      </div>
    </div>
  )
}