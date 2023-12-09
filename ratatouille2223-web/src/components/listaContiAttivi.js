'use client';

import { Table } from 'flowbite-react';
import useSWR from 'swr'
import React from 'react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Close from './buttons/buttonClose';
import {contiAttiviService, getContiAttiviOrdinatiPerTavolo} from '@/services/contiAttiviService';
import { useState } from 'react';
import TabellaElementi from './tabellaElementiConto';
import { useElementiConto } from '@/hooks/useElementiConto';
import { Accordion } from 'flowbite-react';

export default function ListaContiAttivi({page}) {

    const contiServ = new contiAttiviService();
    const { data , error, isLoading } = useSWR(page.toString(), contiServ.getContiAttiviOrdinatiPerTavolo);
    const [ contoDetailsVisibility, setContoDetailsVisibility] = useState(false);
  
    const changeContoDetailsVisibility = () =>{setContoDetailsVisibility(contoDetailsVisibility => !contoDetailsVisibility)}
    if(isLoading) 
      return ( 
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>Caricamento...</Table.Cell>
        </Table.Row>
      );
    if(!data || error){
    return ( 
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>Errore con il caricamento!</Table.Cell>
      </Table.Row>
    )}else{
    return (data.openchecks ? data.openchecks.map(({
      check_id, check_total, opening_date_time, check_table,
    }) => (
      <React.Fragment key={check_id}>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Conto Num. {check_id}</Table.Cell>
              <Table.Cell>{check_table}</Table.Cell>
              <Table.Cell>{opening_date_time}</Table.Cell>
              <Table.Cell>{check_total}</Table.Cell>
              <Table.Cell>
                <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
                  <ButtonPDF/>
                  <Close />
                  <ButtonMore onClickAction={changeContoDetailsVisibility} /> 
                </Button.Group>
                </Table.Cell>
        </Table.Row>
          {contoDetailsVisibility ? <TabellaElementi key={check_id} conto={check_id}/> : null}
      </ React.Fragment>
    )) : 
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <Table.Cell>Errore con il caricamento!</Table.Cell>
    </Table.Row>);
    }
}