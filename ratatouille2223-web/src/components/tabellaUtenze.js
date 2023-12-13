'use client';
import React from 'react';
import { Label, Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonRefresh from './buttons/buttonRefresh';
import ButtonAddUser from './buttons/buttonAddUser';
import { useRouter } from 'next/navigation';
import ListaUtenti from './listaUtenti';
import { useState } from 'react';
import useSWR from 'swr';
import { utenzeService } from '@/services/utenzeService';
import Pager from './pager';
import useCurrentUserData from '@/hooks/useCurrentUserData';


import { FaSortDown } from "react-icons/fa";
const customTableTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg -z-10",
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

export default function TabellaUtenze() {
  const [alertSuccessState, setAlertSuccessState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const alertsControl = {setAlertSuccessState};
  const router = useRouter();
  const userData = useCurrentUserData();
  const utenzeServ = new utenzeService(userData ? userData.token : "");
  const dud = "Tf2Bread.jpg";

  const [ ordinamento, setOrdinamento ] = useState("BYUSERNAME");

  const fetchUtenti = useSWR([(currentPage-1).toString(), ordinamento], utenzeServ.getUtentiOrdinatiPer)
  const fetchPagineUtenti = useSWR(dud, utenzeServ.getNumberOfPages)


  const useUpdateData = () =>{
    fetchPagineUtenti.mutate(dud, utenzeServ.getNumberOfPages);
    if(currentPage > (fetchPagineUtenti.data ? fetchPagineUtenti.data.pages : 0)){
      setCurrentPage(1);
    }
    fetchUtenti.mutate(dud, utenzeServ.getUtentiOrdinatiPer);
  };

  return (
    <div className="overflow-y-auto overflow-x-auto w-screen">
      <Table theme={customTableTheme} hoverable>
      <Table.Head>
      <Table.HeadCell onClick={()=>{setOrdinamento("BYUSERNAME"); useUpdateData();}}><div className='w-40'><div className='flex'>Nome<FaSortDown /></div></div></Table.HeadCell>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYEMPLOYEEROLE"); useUpdateData();}}><div className='w-40'><div className='flex'>Categoria<FaSortDown /></div></div></Table.HeadCell>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYLASTMODIFIED"); useUpdateData();}}><div className='w-40'><div className='flex'>Ultima Modifica<FaSortDown /></div></div></Table.HeadCell>
        <Table.HeadCell>
          <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
            <Pager maxPages={fetchPagineUtenti.data ? fetchPagineUtenti.data : null} setCurrentPage={setCurrentPage} currentPage={currentPage} isLoading={fetchPagineUtenti.isLoading} error={fetchPagineUtenti.error}/>
            <ButtonRefresh onClickAction={useUpdateData}/>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <ListaUtenti updateAction={useUpdateData} alertsControl={alertsControl} data={fetchUtenti.data} error={fetchUtenti.error} isLoading={fetchUtenti.isLoading}/>
      </Table.Body>
    </Table>
      <div className='flex justify-center p-2'>
        <ButtonAddUser alertsControl={alertsControl} refreshAction={useUpdateData}></ButtonAddUser>
      </div>
    </div>
  )
}
