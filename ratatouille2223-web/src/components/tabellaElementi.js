'use client';

import React from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonMore from './buttons/buttonMore';
import Pager from './pager';
import ButtonRefresh from './buttons/buttonRefresh';
import ButtonConfermaDelete from './buttons/buttonConferma';
import AggiungiElementoButton from './buttons/buttonAggiuntaElemento';
import { FaLanguage } from "react-icons/fa";
import TopElementi from './topElementi';
import { IoTrashOutline } from "react-icons/io5";
import useSWR from 'swr';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import elementiService from '@/services/elementiService';
import ListaElementi from './listaElementi';

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

export default function TabellaElementi({name}) {

  const [alertSuccessState, setAlertSuccessState] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ ordinamento, setOrdinamento ] = useState("BYPRIORITY");
  const alertsControl = {setAlertSuccessState};
  const router = useRouter();
  const elementiServ = new elementiService();
  const fetchElementi = useSWR([name, ordinamento, (page-1).toString()], elementiServ.getElementiCategoriaOrdinatiPerNome);
  const fetchPagineElementi = useSWR([name], elementiServ.getNumberOfPagesElementi);
  
  const useUpdateData = () =>{
    fetchPagineElementi.mutate([name], elementiServ.getNumberOfPagesElementi);
    if(page > fetchPagineElementi.data.pages){
      setCategorieCurrentPage(1);
    }
    fetchElementi.mutate({name , page}, elementiServ.getElementiCategoriaOrdinatiPerNome);
  }

  return (
    <div className='w-full'>
      <div className="overflow-x-auto">
      <Table theme={customTableTheme} hoverable>
        <Table.Head>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYPRIORITY"); useUpdateData();}}>
          <Button>P</Button>
        </Table.HeadCell>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYNAME"); useUpdateData();}}>
            <div className='w-80'><div className='flex'>Nome<FaSortDown /></div></div>
          </Table.HeadCell>
          <Table.HeadCell onClick={()=>{setOrdinamento("BYPRICE"); useUpdateData();}}>
            <div className='flex'>Prezzo<FaSortDown /></div>
          </Table.HeadCell>
          <Table.HeadCell onClick={()=>{setOrdinamento("BYLASTMODIFIED"); useUpdateData();}}>
            <div className='flex'>Ultima Modifica<FaSortDown /></div>
          </Table.HeadCell>
          <Table.HeadCell> 
            <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                  justify-end'>
              <Pager maxPages={fetchPagineElementi.data ? fetchPagineElementi.data.pages : null} setCurrentPage={setPage} currentPage={page} isLoading={fetchPagineElementi.isLoading} error={fetchPagineElementi.error}/>
              <ButtonRefresh onClickAction={useUpdateData}/>
            </Button.Group>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          <ListaElementi categoria={name} data={fetchElementi.data} isLoading={fetchElementi.isLoading} error={fetchElementi.error} updateAction={useUpdateData}/>
        </Table.Body>
      </Table>
    </div>
    <div className='flex justify-center p-2 gap-5'>
        <AggiungiElementoButton />
        <AggiungiElementoButton /> 
        <p className='text-black'>OPENFOOD</p>
      </div>
  </div>
  )
}
