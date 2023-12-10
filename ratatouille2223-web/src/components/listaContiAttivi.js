'use client';

import { Table } from 'flowbite-react';
import React from 'react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Close from './buttons/buttonClose';
import { useState } from 'react';
import TabellaElementi from './tabellaElementiConto';


export default function ListaContiAttivi({data , error, isLoading}) {

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
    )}

    if(!Array.isArray(data.openchecks) && data.openchecks)
      data.openchecks = null;

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