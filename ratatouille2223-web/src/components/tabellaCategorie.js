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
import TopCategoria from './topCategoria';
import ListaCategorie from './listaCategorie';
import { useRouter } from 'next/navigation';
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
    <div className="overflow-x-auto">
        <TopCategoria/>
    <Table hoverable>
      <Table.Head>
      <Table.HeadCell>Nome</Table.HeadCell>
        <Table.HeadCell>Numero Elementi</Table.HeadCell>
        <Table.HeadCell>Costo Medio</Table.HeadCell>
        <Table.HeadCell>Ultima Modifica</Table.HeadCell>
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
    <div className='flex justify-center p-2'>
    <ButtonAggiungiCategoria alertsControl={alertsControl} refreshAction={useUpdateData}/>
    </div>
    
  </div>
  )
}