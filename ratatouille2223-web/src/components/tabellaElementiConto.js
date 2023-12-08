'use client';
import React from 'react';
import { useElementiConto } from '@/hooks/useElementiConto';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Confirm from './buttons/buttonConferma';

export default function TabellaElementiConto({conto}) {
  const listaElementi = useElementiConto(conto);
  let data = listaElementi.data;
  const isLoading = listaElementi.isLoading;
  const error = listaElementi.error;

  if(!data){
    data = null;
    data = {orders : null}
  }
  if(!Array.isArray(data.orders)){
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
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>Nome</Table.Cell>
            <Table.Cell>Quantità</Table.Cell>
            <Table.Cell>Costo</Table.Cell>
            <Table.Cell>Costo</Table.Cell>
      </Table.Row>
      {data.orders ? 
      data.orders.map(({
        order_id, order_total, quantity, current_price,
      }) => (
        <React.Fragment key={order_id}>
          <Table.Row key={order_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell >{order_id}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>{current_price}</Table.Cell>
                <Table.Cell>{order_total}</Table.Cell>
                <Table.Cell><span className="sr-only"></span></Table.Cell>
                <Table.Cell>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  <Button.Group>
                    <ButtonPDF/>
                    <Confirm/>
                    <ButtonMore /> 
                  </Button.Group>
                  </a>
                  </Table.Cell>
          </Table.Row>
        </React.Fragment>
      )) : 
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>Errore con il caricamento!</Table.Cell>
      </Table.Row>
      }
    </React.Fragment>
  );
}