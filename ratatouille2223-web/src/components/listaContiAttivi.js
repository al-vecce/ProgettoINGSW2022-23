'use client';

import { Table } from 'flowbite-react';
import React from 'react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Close from './buttons/buttonClose';
import { useState } from 'react';
import TabellaElementi from './tabellaElementiConto';
import { contiAttiviService } from '@/services/contiAttiviService';
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListaContiAttivi({data , error, isLoading, refreshAction}) {

    const [ contoDetailsVisibilities, setContoVisibility] = useState({});

    async function chiudiConto(contoID){
      const contoServ = new contiAttiviService();
      const data = await contoServ.postChiudiContoPerID(contoID);
      if(data && data.result === "true"){
        toast("Chiusura avvenuta con successo.");
      }else{
        toast("Errore, impossibile chiudere il conto.");
      }
    }
  
    if(isLoading) 
      return ( 
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>Caricamento...</Table.Cell>
        </Table.Row>
      );
    if(error){
    return ( 
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>Errore con il caricamento!</Table.Cell>
      </Table.Row>
    )}

    if(!Array.isArray(data.openchecks) && data.openchecks)
      data.openchecks = null;

    return (data.openchecks ? data.openchecks.map(({
      check_id, check_total, opening_date_time, check_table,
    }) => {
      return(
      <React.Fragment key={check_id}>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Conto Num. {check_id}</Table.Cell>
              <Table.Cell>{check_table}</Table.Cell>
              <Table.Cell>{opening_date_time}</Table.Cell>
              <Table.Cell>{check_total} €</Table.Cell>
              <Table.Cell>
                <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
                  <ButtonPDF checkID={check_id} table={check_table} dataAperturaConto={opening_date_time} totale={check_total}/>
                  <Close refreshAction={refreshAction} clickConfermaAction={chiudiConto} argsConfermaAction={check_id} >Chiudere il conto?</Close>
                  <ButtonMore onClickAction={() =>{setContoVisibility({...contoDetailsVisibilities, [check_id]: contoDetailsVisibilities[check_id] ? !contoDetailsVisibilities[check_id] : true})}} />
                </Button.Group>
                </Table.Cell>
        </Table.Row>
          {contoDetailsVisibilities[check_id] ? <TabellaElementi key={check_id} conto={check_id}/> : null}
      </ React.Fragment>
    )}) : 
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <Table.Cell>Nessun risultato!</Table.Cell>
    </Table.Row>);

}