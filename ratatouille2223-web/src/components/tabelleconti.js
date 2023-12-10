'use client';
import useSWR from 'swr'
import React from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import FilterConti from './filterConti';
import { contiAttiviService } from '@/services/contiAttiviService';
import Pager from './pager';
import ButtonFilter from './buttons/buttonFilter';
import ButtonRefresh from './buttons/buttonRefresh';
import Confirm from './buttons/buttonConferma';
import { useState } from 'react';
import ListaContiAttivi from './listaContiAttivi';

import { FaSortDown } from "react-icons/fa";

const customTableTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative"
  },
  body: {
    base: "group/body",
    cell: {
      base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4"
    }
  },
  head: {
    base: "group/head text-lg body-font font-quicksand tracking-widest font-light text-primary-icon",
    cell: {
      "base": "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg grid-1 bg-gray-200 px-6 py-3"
    }
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped: "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
  }
}

export default function TabelleConti() {

  const [ contiCurrentPage, setContiCurrentPage ] = useState(1);
  const [showFilter, setFilter] = useState(false);
  const dud = "bread";
  const contiServ = new contiAttiviService();
  const fetchConti = useSWR((contiCurrentPage-1).toString(), contiServ.getContiAttiviOrdinatiPerTavolo);
  const fetchPagina = useSWR(dud, contiServ.getNumberOfPagesContiAttivi);

  const useUpdateData = ()=>{
    fetchPagina.mutate(dud, contiServ.getNumberOfPagesContiAttivi);
    if(contiCurrentPage > fetchPagina.data){
      setContiCurrentPage(1);
    }
    fetchConti.mutate((contiCurrentPage-1).toString(), contiServ.getContiAttiviOrdinatiPerTavolo);
  };

  return (
    <div className="overflow-y-auto overflow-x-auto w-screen">
    <Table theme={customTableTheme} hoverable >
      <Table.Head>
      <Table.HeadCell><div className='flex'>Conto <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell><div className='flex'>Tavolo <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell><div className='flex'>Orario di apertura <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell><div className='flex'>Costo totale <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell> 
          <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
            <Pager maxPages={fetchPagina.data} setCurrentPage={setContiCurrentPage} currentPage={contiCurrentPage} isLoading={fetchPagina.isLoading} error={fetchPagina.error} /> 
            <Button.Group className='flex flex-row items-center gap-1 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.1.5)]
                justify-end'>
              {showFilter ? <div/> : <FilterConti/>}
              <ButtonRefresh/>
            </Button.Group>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <ListaContiAttivi data={fetchConti.data} isLoading={fetchConti.isLoading} error={fetchConti.error} />
      </Table.Body>
    </Table>
    
  </div>
  )
}
