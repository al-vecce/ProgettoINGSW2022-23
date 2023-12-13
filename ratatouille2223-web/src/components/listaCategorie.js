'use client';
import React, { Suspense, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonCategoryMore from './buttons/buttonCategoryMore';
import ButtonModificaCategoria from './buttons/buttonModificaCategoria';
import ButtonConfirmElimina from './buttons/buttonConferma';
import { categorieService } from '@/services/categorieService';
import { useRouter } from 'next/navigation';

import { FaTrashAlt  } from "react-icons/fa";

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
            priority, name, last_modified, average_cost, element_number,
        }) => (
            <React.Fragment key={name}>
            <Table.Row key={name} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{priority}</Table.Cell>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{element_number}</Table.Cell>
                    <Table.Cell>{average_cost} €</Table.Cell>
                    <Table.Cell>{last_modified}</Table.Cell>
                    <Table.Cell>
                    <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                        justify-end'>
                        <ButtonCategoryMore onClickAction={()=>{router.push("/Homepage/Menu/Categoria?name=" + name);}} />
                        <ButtonModificaCategoria refreshAction={updateAction} alertsControl={alertsControl} nome={name}/>
                        <ButtonConfirmElimina refreshAction={updateAction} argsConfermaAction={name} clickConfermaAction={deleteCategoria} icona={<FaTrashAlt className='text-xl'/>}>
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