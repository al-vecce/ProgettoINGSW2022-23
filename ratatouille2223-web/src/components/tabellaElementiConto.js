'use client';
import React from 'react';
import { useElementiConto } from '@/hooks/useElementiConto';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Confirm from './buttons/buttonConferma';

import { FaSortDown } from "react-icons/fa";

export default function TabellaElementiConto({conto}) {
  const listaElementi = useElementiConto(conto);
  let data = listaElementi.data;
  const isLoading = listaElementi.isLoading;
  const error = listaElementi.error;


  if(data && !Array.isArray(data.orders)){
    if(!Array.isArray(data.orders)){
      data.orders = null;
    }
  }
  
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
    </Table.Row>)
  }
  return (
    <React.Fragment>
      {data.orders ? 
      <Table.Row className="hover:bg-white">
            <Table.Cell><div className='flex'>Elemento <FaSortDown /></div></Table.Cell>
            <Table.Cell><div className='flex'>Quantità <FaSortDown /></div></Table.Cell>
            <Table.Cell><div className='flex'>Costo Singolo <FaSortDown /></div></Table.Cell>
            <Table.Cell><div className='flex'>Costo Complessivo <FaSortDown /></div></Table.Cell>
      </Table.Row> : <div/>}
      {data.orders ? 
      data.orders.map(({
        order_id, order_total, quantity, current_price, element_name,
      }) => (
        <React.Fragment key={order_id}>
          <Table.Row key={order_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{element_name}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>{current_price}</Table.Cell>
                <Table.Cell>{order_total}</Table.Cell>
          </Table.Row>
        </React.Fragment>
      )) : 
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>Nessun risultato!</Table.Cell>
      </Table.Row>
      }
    </React.Fragment>
  );
}