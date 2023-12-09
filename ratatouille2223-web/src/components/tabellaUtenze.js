'use client';
import React from 'react';
import { Label, Table } from 'flowbite-react';
import Pager from './pager';
import { Button } from 'flowbite-react';
import { Pagination } from 'flowbite-react';
import ButtonRefresh from './buttons/buttonRefresh';
import ButtonAddUser from './buttons/buttonAddUser';
import { useRouter } from 'next/navigation';
import ListaUtenti from './listaUtenti';
import { useState } from 'react';
import useSWR from 'swr';
import { utenzeService } from '@/services/utenzeService';

export default function TabellaUtenze() {
  const [alertSuccessState, setAlertSuccessState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const alertsControl = {setAlertSuccessState};
  const router = useRouter();
  const utenzeServ = new utenzeService();
  const dud = "Tf2Bread.jpg";
  const { data, error, isLoading, mutate } = useSWR(dud, utenzeServ.getUtentiOrdinatiPerUsername);
  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const useUpdateData = ()=>{
      mutate(dud, utenzeServ.getUtentiOrdinatiPerUsername);
  };
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
      <Table.Head>
      <Table.HeadCell>Nome</Table.HeadCell>
        <Table.HeadCell>Categoria</Table.HeadCell>
        <Table.HeadCell>Ultima Modifica </Table.HeadCell>
        <Table.HeadCell> 
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={10}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </Table.HeadCell>
        <Table.HeadCell>
          <Button.Group>
            <ButtonRefresh onClickAction={useUpdateData}/>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <ListaUtenti updateAction={useUpdateData} alertsControl={alertsControl} data={data} error={error} isLoading={isLoading}/>
      </Table.Body>
    </Table>
      <div className='flex justify-center p-2'>
        <ButtonAddUser alertsControl={alertsControl} refreshAction={useUpdateData}></ButtonAddUser>
      </div>
    </div>
  )
}
