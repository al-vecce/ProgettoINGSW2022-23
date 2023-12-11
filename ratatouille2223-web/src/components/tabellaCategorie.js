'use client';
import useSWR from 'swr';
import React from 'react';

import { useRouter } from 'next/navigation';
import { Table, Toast } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useState } from 'react';

import { categorieService } from '@/services/categorieService';
import Pager from './pager';
import ButtonRefresh from './buttons/buttonRefresh';
import ButtonAggiungiCategoria from './buttons/buttonAggiungiCategoria';
import ListaCategorie from './listaCategorie';

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

export default function TabelleCategorie() {

  const [alertSuccessState, setAlertSuccessState] = useState(false);
  const alertsControl = {setAlertSuccessState};
  const router = useRouter();
  const categorieServ = new categorieService();
  const dud = "Tf2Bread.jpg";

  const [ categorieCurrentPage, setCategorieCurrentPage ] = useState(1);
  const [ ordinamento, setOrdinamento ] = useState("BYPRIORITY");

  const fetchCategoria = useSWR([(categorieCurrentPage-1).toString(), ordinamento], categorieServ.getCategorieOrdinatePer)
  const fetchPagineCategoria = useSWR(dud, categorieServ.getNumberOfPagesCategorie)

  const useUpdateData = () =>{
    fetchPagineCategoria.mutate(dud, categorieServ.getNumberOfPagesCategorie);
    if(categorieCurrentPage > fetchPagineCategoria.data.pages){
      setCategorieCurrentPage(1);
    }
    fetchCategoria.mutate(dud, categorieServ.getCategoriePerNome);
  };


  

  /* {(alertSuccessState ? 
        <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Aggiornamento avvenuto con successo.</div>
      </Toast> : null)} */
  return (
    <div className='w-full'>
      <div className="overflow-x-auto">
        <Table theme={customTableTheme} hoverable>
          <Table.Head>
            <Table.HeadCell onClick={()=>{setOrdinamento("BYPRIORITY"); useUpdateData();}}>
              <Button>P</Button>
            </Table.HeadCell>
            <Table.HeadCell onClick={()=>{setOrdinamento("BYNAME"); useUpdateData();}}>
              <div className='flex'>Nome<FaSortDown /></div>
            </Table.HeadCell>
            <Table.HeadCell onClick={()=>{setOrdinamento("BYNUMBEROFELEMENTS"); useUpdateData();}}>
              <div className='flex'>Numero Elementi<FaSortDown /></div>
              </Table.HeadCell>
            <Table.HeadCell onClick={()=>{setOrdinamento("BYAVERAGECOST"); useUpdateData();}}>
              <div className='flex'>Prezzo Medio<FaSortDown /></div>
              </Table.HeadCell>
            <Table.HeadCell onClick={()=>{setOrdinamento("BYLASTMODIFIED"); useUpdateData();}}>
              <div className='flex'>Ultima Modifica<FaSortDown /></div>
              </Table.HeadCell>
            
            <Table.HeadCell> 
              <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
                <Pager maxPages={fetchPagineCategoria.data ? fetchPagineCategoria.data.pages : null} setCurrentPage={setCategorieCurrentPage} currentPage={categorieCurrentPage} isLoading={fetchPagineCategoria.isLoading} error={fetchPagineCategoria.error}/>
                <ButtonRefresh onClickAction={useUpdateData} />
              </Button.Group>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            <ListaCategorie data={fetchCategoria.data} error={fetchCategoria.error} isLoading={fetchCategoria.isLoading} updateAction={useUpdateData} alertsControl={alertsControl}/>
          </Table.Body>
        </Table>
      </div>
      <div className='flex justify-center p-2'>
        <ButtonAggiungiCategoria alertsControl={alertsControl} refreshAction={useUpdateData}/>
      </div>
    </div>
  )
}             