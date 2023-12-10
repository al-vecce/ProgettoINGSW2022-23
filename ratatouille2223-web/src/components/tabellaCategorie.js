'use client';
import useSWR from 'swr';
import React from 'react';
import { Table, Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import Pager from './pager';
import ButtonRefresh from './buttons/buttonRefresh';
import { useState } from 'react';
import { categorieService } from '@/services/categorieService';
import ButtonAggiungiCategoria from './buttons/buttonAggiungiCategoria';

import ListaCategorie from './listaCategorie';
import { useRouter } from 'next/navigation';

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
  const { data, error, isLoading, mutate } = useSWR(dud, categorieServ.getCategorieOrdinatePerNome);
  const useUpdateData = () =>{
      mutate(dud, categorieServ.getCategoriePerNome);
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
          <Table.HeadCell><div className='flex'>Nome<FaSortDown /></div></Table.HeadCell>
            <Table.HeadCell><div className='flex'>Numero Elementi<FaSortDown /></div></Table.HeadCell>
            <Table.HeadCell><div className='flex'>Prezzo Medio<FaSortDown /></div></Table.HeadCell>
            <Table.HeadCell><div className='flex'>Ultima Modifica<FaSortDown /></div></Table.HeadCell>
            <Table.HeadCell> 
              <Pager/> 
            </Table.HeadCell>
            <Table.HeadCell> 
              <Button.Group>
                <ButtonRefresh onClickAction={useUpdateData} />
              </Button.Group>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            <ListaCategorie data={data} error={error} isLoading={isLoading} updateAction={useUpdateData} alertsControl={alertsControl}/>
          </Table.Body>
        </Table>
      </div>
      <div className='flex justify-center p-2'>
        <ButtonAggiungiCategoria alertsControl={alertsControl} refreshAction={useUpdateData}/>
      </div>
    </div>
  )
}