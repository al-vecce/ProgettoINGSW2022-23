'use client'
import React from 'react'
import TabellaElementi from '@/components/tabellaElementi'
import { useSearchParams } from 'next/navigation';
export default function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")
  return (
    <div>
    <TabellaElementi name={name}/>
    </div>
  )
}
