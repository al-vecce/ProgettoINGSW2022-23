'use client';
import React, { Suspense, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonModificaUtente from './buttons/buttonModificaUtente';
import ButtonConfirmElimina from './buttons/buttonConferma';
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { utenzeService } from '@/services/utenzeService';

export default function ListaUtenti({alertsControl, data, error, isLoading, updateAction}) {
    const router = useRouter();
    const utenzeServ = new utenzeService();
    async function deleteUtente(args){
        const username = args;
        const res = await utenzeServ.deleteUtentePerUsername(username);
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
    
    if(!Array.isArray(data.employees) && data.employees)
        data.employees = null;

    return (
        <React.Fragment>
        {data.employees ? 
        data.employees.map(({
            username, last_modified, employee_role
        }) => (
            <React.Fragment key={username}>
            <Table.Row key={username} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell >{username}</Table.Cell>
                    <Table.Cell>{employee_role}</Table.Cell>
                    <Table.Cell>{last_modified}</Table.Cell>
                    <Table.Cell />
                    <Table.Cell>
                    <Button.Group className='gap-3'>
                        <ButtonModificaUtente old_username={username} old_ruolo={employee_role} refreshAction={updateAction} alertsControl={alertsControl} nome={username}/>
                        <ButtonConfirmElimina refreshAction={updateAction} argsConfermaAction={username} clickConfermaAction={deleteUtente} icona={<IoTrashOutline />}>
                            Vuoi eliminare il seguente utente?
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