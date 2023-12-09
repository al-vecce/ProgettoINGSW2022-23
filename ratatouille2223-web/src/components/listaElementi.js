'use client';
import React, { useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import ButtonModificaCategoria from './buttons/buttonModificaCategoria';
import ButtonConfirmElimina from './buttons/buttonConferma';
import { IoTrashOutline } from "react-icons/io5";
import { FaLanguage } from "react-icons/fa";
import elementiService from '@/services/elementiService';

export default function ListaElementi({alertsControl, data, error, isLoading, updateAction, categoria}) {

    async function deleteElemento(args){
        const nomeElemento = args;
        const elementiServ = new elementiService();
        const res = await elementiServ.deleteElementoPerNome(categoria,nomeElemento);
        if(res){
            (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
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
    
    if(!Array.isArray(data.elements) && data.elements)
        data.elements = null;

    return (
        <React.Fragment>
        {data.elements ? 
        data.elements.map(({
            name, last_modified, price
        }) => (
            <React.Fragment key={name}>
            <Table.Row key={name} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell >{name}</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{price}</Table.Cell>
                    <Table.Cell>{last_modified}</Table.Cell>
                    <Table.Cell><span className="sr-only"></span></Table.Cell>
                    <Table.Cell>
                    <Button.Group className='gap-3'>
                        <Button> 
                            <FaLanguage /> 
                        </Button>
                        <ButtonMore/>
                        <ButtonModificaCategoria refreshAction={updateAction} alertsControl={alertsControl} nome={name}/>
                        <ButtonConfirmElimina refreshAction={updateAction} argsConfermaAction={name} clickConfermaAction={deleteElemento} icona={<IoTrashOutline />}>
                            Eliminare l'elemento selezionato?
                        </ButtonConfirmElimina>
                    </Button.Group>
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