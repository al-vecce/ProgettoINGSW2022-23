'use client'

import GraphGroup from '@/components/graphGroup';
import TopStatistiche from '@/components/topStatistiche'
import React, { Component } from "react";

export default function page() {
  return (
    <div className='flex flex-col min-h-screen gap-4 bg-white'>
      <TopStatistiche/>
      <div className='flex-1'>
        <GraphGroup/>
      </div>
    </div>
  )
}