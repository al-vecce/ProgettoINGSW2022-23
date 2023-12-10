'use client';
import React, { Suspense, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonMore from './buttons/buttonMore';
import ButtonModificaCategoria from './buttons/buttonModificaCategoria';
import ButtonConfirmElimina from './buttons/buttonConferma';
import { IoTrashOutline } from "react-icons/io5";
import { categorieService } from '@/services/categorieService';
import { useRouter } from 'next/navigation';

export default function listaCategorie({alertsControl, data, error, isLoading, updateAction}) {
    const router = useRouter();
    function goToElement(){
        router
    }
    async function deleteCategoria(args){
        const nome = args;
        const categorieServ = new categorieService();
        const res = await categorieServ.deleteCategoriaPerNome(nome);
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
    
    if(!Array.isArray(data.categories) && data.categories)
        data.categories = null;

    return (
        <React.Fragment>
        {data.categories ? 
        data.categories.map(({
            name, last_modified, average_cost, element_number,
        }) => (
            <React.Fragment key={name}>
            <Table.Row key={name} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell >{name}</Table.Cell>
                    <Table.Cell>{element_number}</Table.Cell>
                    <Table.Cell>{average_cost}</Table.Cell>
                    <Table.Cell>{last_modified}</Table.Cell>
                    <Table.Cell><span className="sr-only"></span></Table.Cell>
                    <Table.Cell>
                    <Button.Group className='gap-3'>
                        <ButtonMore onClickAction={()=>{router.push("/Homepage/Menu/Categoria?name=" + name);}} />
                        <ButtonModificaCategoria refreshAction={updateAction} alertsControl={alertsControl} nome={name}/>
                        <ButtonConfirmElimina refreshAction={updateAction} argsConfermaAction={name} clickConfermaAction={deleteCategoria} icona={<IoTrashOutline />}>
                            Vuoi eliminare la seguente categoria e tutti gli elementi all'interno?
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