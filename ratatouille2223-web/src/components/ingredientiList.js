'use client';

import { Table } from 'flowbite-react';
import useSWR from 'swr'
import React from 'react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import Confirm from './buttons/buttonConferma';
import {contiAttiviService, getContiAttiviOrdinatiPerTavolo} from '@/services/contiAttiviService';
import { useState } from 'react';
import useCurrentUserData from '@/hooks/useCurrentUserData';

export default function ListaIngredienti({elemNumber}) {
    const userData = useCurrentUserData();
    const contiServ = new contiAttiviService(userData ? userData.token : "");
    const [ contoDetailsVisibility, setContoDetailsVisibility] = useState(false);

    const changeContoDetailsVisibility = () =>{setContoDetailsVisibility(contoDetailsVisibility => !contoDetailsVisibility)}
   
    return (data.openchecks ? data.openchecks.map(({
      check_id, check_total, opening_date_time, check_table,
    }) => (
      <React.Fragment key={check_id}>
        <Label htmlFor="Ingredienti" value={"Ingrediente " + (elemNumber ? elemNumber+1 : 1) + ":" } />
          <div className="mb-2 block">
            <TextInput type="text" sizing="sm" />
          </div>
      </ React.Fragment>
    )) : 
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <Table.Cell>Errore con il caricamento!</Table.Cell>
    </Table.Row>);
}