import React from 'react'
import Top2 from '@/components/top'
import Tabelleconti from '@/components/tabelleconti'

export default function page() {
  return (
    <div><h1>Conti Attivi</h1>
      <Top2/>
      <Tabelleconti/>
    </div>
  )
}