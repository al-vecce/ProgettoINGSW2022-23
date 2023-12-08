'use client';
import useSWR from 'swr'
import React from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import ButtonClose from './buttons/buttonClose';
import Pager from './pager';
import ButtonFilter from './buttons/buttonFilter';
import ButtonRefresh from './buttons/buttonRefresh';
import Confirm from './buttons/buttonConferma';
import { useState } from 'react';
import ListaContiAttivi from './listaContiAttivi';


export default function TabelleConti() {

  const [ contiCurrentPage, setContiCurrentPage ] = useState(0);


  return (
    <div className="overflow-x-auto">
    <Table hoverable >
      <Table.Head>
      <Table.HeadCell>Conto</Table.HeadCell>
        <Table.HeadCell>Tavolo</Table.HeadCell>
        <Table.HeadCell>Orario di apertura</Table.HeadCell>
        <Table.HeadCell>Costo totale</Table.HeadCell>
        <Table.HeadCell> 
          <Pager/> 
        </Table.HeadCell>
        <Table.HeadCell> 
          <Button.Group>
            <ButtonFilter/>
            <ButtonRefresh/>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <ListaContiAttivi page={contiCurrentPage}/>
      </Table.Body>
    </Table>
  </div>
  )
}
