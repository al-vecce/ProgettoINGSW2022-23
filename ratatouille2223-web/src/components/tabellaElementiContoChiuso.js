'use client';
import React from 'react';
import { useElementiConto } from '@/hooks/useElementiConto';
import { Table } from 'flowbite-react';
import useSWR from 'swr';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { FaSortDown } from "react-icons/fa";
import { contiChiusiService } from '@/services/contiChiusiService';

export default function TabellaElementiContoChiuso({conto}) {

    const userData = useCurrentUserData();
    const elementiContoServ = new contiChiusiService(userData ? userData.token : "");
    let c;
    if(conto){
        c = conto;
    }else{
        c = '';
    }
    const listaElementi = useSWR(c.toString(), elementiContoServ.getElementiContoOrdinatiPerID);

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
      <Table.Row className="bg-gray-200 hover:bg-gray-200 p-5">
            <Table.Cell colSpan={2}><div className='flex'>Nome dell'elemento <FaSortDown /></div></Table.Cell>
            <Table.Cell><div className='flex'>Quantità <FaSortDown /></div></Table.Cell>
            <Table.Cell><div className='flex'>Costo Singolo <FaSortDown /></div></Table.Cell>
            <Table.Cell><div className='flex'>Costo Complessivo <FaSortDown /></div></Table.Cell>
            <Table.Cell></Table.Cell>
      </Table.Row> : <div/>}
      {data.orders ? 
      data.orders.map(({
        order_id, order_total, quantity, current_price, element_name,
      }) => (
        <React.Fragment key={order_id}>
          <Table.Row key={order_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={2}>{element_name}</Table.Cell>
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