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

export default function TabellaElementi({name}) {

  const [alertSuccessState, setAlertSuccessState] = useState(false);
  const [ page, setPage ] = useState(0);
  const alertsControl = {setAlertSuccessState};
  const router = useRouter();
  const elementiServ = new elementiService();
  const { data, error, isLoading, mutate } = useSWR({name , page}, elementiServ.getElementiCategoriaOrdinatiPerNome);
  const useUpdateData = () =>{
    mutate({name , page}, elementiServ.getElementiCategoriaOrdinatiPerNome);
  }

  return (
    <div className="overflow-x-auto">
    <Table hoverable>
      <Table.Head>
      <Table.HeadCell>Nome</Table.HeadCell>
        <Table.HeadCell className='px-20'><span className="sr-only"></span></Table.HeadCell>
        <Table.HeadCell><span className="sr-only"></span></Table.HeadCell>
        <Table.HeadCell>Prezzo</Table.HeadCell>
        <Table.HeadCell>Ultima Modifica</Table.HeadCell>
        <Table.HeadCell className='px-0'> 
          <Pager/> 
        </Table.HeadCell>
        <Table.HeadCell> 
          <Button.Group>
            <ButtonRefresh/>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body>
        <ListaElementi categoria={name} data={data} isLoading={isLoading} error={error} updateAction={useUpdateData}/>
      </Table.Body>
    </Table>
    <div className='flex justify-center p-2'>
      <AggiungiElementoButton />
    </div>
  </div>
  )
}
