'use client';

import { Table } from 'flowbite-react';
import React from 'react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Confirm from './buttons/buttonConferma';
import { useState } from 'react';
import TabellaElementi from './tabellaElementiContoChiuso';
import { FaTrashAlt } from "react-icons/fa";
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contiChiusiService } from '@/services/contiChiusiService';
import useCurrentUserData from '@/hooks/useCurrentUserData';


export default function ListaContiChiusi({data , error, isLoading, refreshAction}) {

    const [ contoDetailsVisibilities, setContoVisibility] = useState({});
    const userData = useCurrentUserData();
    const contoServ = new contiChiusiService(userData ? userData.token : "");

    async function eliminaConto(contoID){
      const data = await contoServ.deleteClosedCheckById(contoID);
      if(data && data.result === "true"){
        toast("Eliminazione avvenuta con successo");
      }else{
        toast("Errore, impossibile eliminare il conto.");
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

    if(!Array.isArray(data.closedchecks) && data.closedchecks)
      data.closedchecks = null;

    return (data.closedchecks ? data.closedchecks.map(({
      check_id, check_total, opening_date_time, closing_date_time, check_table,
    }) => {
      return(
      <React.Fragment key={check_id}>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Conto Num. {check_id}</Table.Cell>
              <Table.Cell>{check_table}</Table.Cell>
              <Table.Cell>{opening_date_time}</Table.Cell>
              <Table.Cell>{closing_date_time}</Table.Cell>
              <Table.Cell>{check_total} €</Table.Cell>
              <Table.Cell>
                <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                justify-end'>
                  <ButtonPDF checkID={check_id} table={check_table} dataAperturaConto={opening_date_time} dataChisuraConto={closing_date_time} totale={check_total}/>
                  <Confirm refreshAction={refreshAction} clickConfermaAction={eliminaConto} argsConfermaAction={check_id} icona={<FaTrashAlt className='text-xl'/>} >
                    Vuoi eliminare il seguente conto chiuso, con annesse tutte le ordinazioni registrate?
                  </Confirm>
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