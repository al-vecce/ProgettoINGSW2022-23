'use client';
import useSWR from 'swr'
import React from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import FilterConti from './filterConti';
import { contiAttiviService } from '@/services/contiAttiviService';
import Pager from './pager';
import ButtonRefresh from './buttons/buttonRefresh';
import { useState } from 'react';
import ListaContiAttivi from './listaContiAttivi';
import 'react-toastify/dist/ReactToastify.css';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { useEffect } from 'react';
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
  const [ oreMin, setOreMin] = useState(null);
  const [ minMin, setMinutesMin] = useState(null);
  const [ oreMax, setOreMax] = useState(null);
  const [ minMax, setMinutesMax] = useState(null);
  const setterFiltroOrari = {setOreMax, setOreMin, setMinutesMax, setMinutesMin};
  const [ ordinamento, setOrdinamento ] = useState("BYID");

  const getDate = ()=>{
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };
  const getYestedayDate = ()=>{
    const yesterday = new Date();
    const month = yesterday.getMonth() + 1;
    const year = yesterday.getFullYear();
    const date = yesterday.getDate()-1;
    return `${year}-${month}-${date}`;
  };

  const dud = "1";
  const userData = useCurrentUserData();
  
  const contiServ = new contiAttiviService(userData ? userData.token : "");
  
  const fetchPagina= !oreMin ? useSWR(dud,contiServ.getNumberOfPagesContiAttivi) : 
              useSWR([ 
              `${getYestedayDate()+"T"+oreMin+":"+minMin+":00"}`, 
              `${getDate()+"T"+oreMax+":"+minMax+":00"}`],
              contiServ.getNumberOfPagesContiAttiviFiltrati);
  
  const fetchConti = !oreMin ? useSWR([(contiCurrentPage-1).toString(), ordinamento], contiServ.getContiAttiviOrdinatiPer) : 
                               useSWR([(contiCurrentPage-1).toString(), ordinamento, 
                                `${getYestedayDate()+"T"+oreMin+":"+minMin+":00"}`, 
                                `${getDate()+"T"+oreMax+":"+minMax+":00"}`], 
                                contiServ.getContiAttiviOrdinatiEFiltrati);

  console.log(fetchConti);

  const useUpdateData = ()=>{
    !oreMin ? fetchPagina.mutate(dud,contiServ.getNumberOfPagesContiAttivi) : fetchPagina.mutate([ 
      `${getYestedayDate()+"T"+oreMin+":"+minMin+":00"}`, 
      `${getDate()+"T"+oreMax+":"+minMax+":00"}`],contiServ.getNumberOfPagesContiAttiviFiltrati)
    if(contiCurrentPage > (fetchPagina ? fetchPagina.data : 0)){
      setContiCurrentPage(1);
    }
    !oreMin ? fetchConti.mutate([(contiCurrentPage-1).toString(), ordinamento], contiServ.getContiAttiviOrdinatiPer) :
    fetchConti.mutate([(contiCurrentPage-1).toString(), ordinamento, `${getDate()+"T"+oreMin+":"+minMin}`, `${getDate()+"T"+oreMax+":"+minMax}`], contiServ.getContiAttiviOrdinatiEFiltrati);
  };
  const refreshAction = () =>{
    setOreMin(null);
    setOreMax(null);
    setMinutesMin(null);
    setMinutesMax(null);
    useUpdateData();
  };
  if(!userData || fetchPagina.isLoading || fetchConti.isLoading){
    return (<h1 className='text-primary-icon'>Loading...</h1>)
  }

  return (
    <div className="overflow-y-auto overflow-x-auto w-screen">
    <Table theme={customTableTheme} hoverable >
      <Table.Head>
      <Table.HeadCell onClick={()=>{setOrdinamento("BYID"); useUpdateData();}} ><div className='w-40'><div className='flex'>Conto <FaSortDown /></div></div></Table.HeadCell>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYTABLE"); useUpdateData();}}><div className='flex'>Tavolo <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYOPENINGDATE"); useUpdateData();}}><div className='flex'>Orario di apertura <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell onClick={()=>{setOrdinamento("BYTOTALCOST"); useUpdateData();}}><div className='flex'>Costo totale <FaSortDown /></div></Table.HeadCell>
        <Table.HeadCell>
          
          <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
            <Pager maxPages={fetchPagina.data} setCurrentPage={setContiCurrentPage} currentPage={contiCurrentPage} isLoading={fetchPagina.isLoading} error={fetchPagina.error} />
            <FilterConti oreMax={oreMax} oreMin={oreMin} minMax={minMax} minMin={minMin} setter={setterFiltroOrari}/>
            <ButtonRefresh onClickAction={refreshAction}/>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <ListaContiAttivi refreshAction={useUpdateData} data={fetchConti.data} isLoading={fetchConti.isLoading} error={fetchConti.error} />
      </Table.Body>
    </Table>
    
  </div>
  )
}
