'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPriorita from './buttons/buttonPriorita';
import ButtonMore from './buttons/buttonMore';
import ButtonSecondaLingua from './buttons/buttonSecondaLingua';
import ButtonConfirmElimina from './buttons/buttonConferma';
import elementiService from '@/services/elementiService';
import ListaDettagliElementi from './listaDettagliElementi';
import { toast, ToastContainer } from 'react-toastify';
import TableHorizontalBar from './tableHorizontalBar';
import ButtonModificaElemento from './buttons/buttonModificaElemento';
import ButtonModificaElementoOFF from './buttons/buttonModificaElementoOFF';

import { FaTrashAlt  } from "react-icons/fa";

export default function ListaElementi({alertsControl, data, error, isLoading, updateAction, categoria}) {
    const [ secondaLingua, setSecondaLingua ] = useState({});
    const [ elementoDetailsVisibilities, setElementoVisibility] = useState({});
    const [ elementoPriority, setElementoPriority] = useState({});
    
    async function deleteElemento(args){
        const nomeElemento = args;
        const elementiServ = new elementiService();
        const res = await elementiServ.deleteElementoPerNome(categoria,nomeElemento);
        if(res){
            (res.result == "true" ? toast("Eliminazione avvenuta con successo!") : null);
        }
    }
    {/*async function updatePriority({category, name, priority}){
        const elementiServ = new elementiService();
        const res = await elementiServ.postUpdatePriority([category, name, priority]);
        if(res){
            (res.result == "true" ? toast("Priorità modificata con successo!") : null);
        }
    }*/}
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
            priority, name, last_modified, price, ingredients, allergens, second_name, second_ingredients, openfoodfacts, openfoodfacts_identifier
        }) => (
            <React.Fragment key={name}>
                <ToastContainer />
            <Table.Row key={name} className="text-[15px] bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                        {/*<ButtonPriorita 
                            onClickDecrease={()=>{updatePriority(categoria, name, priority-1);}}
        onClickIncrease={()=>{}}/>*/}
                        {priority}
                    </Table.Cell>
                    <Table.Cell >
                        {secondaLingua[name] && (second_name != "null" && second_name != "") ? second_name : name}
                    </Table.Cell>
                    <Table.Cell>{price}</Table.Cell>
                    <Table.Cell>{last_modified}</Table.Cell>
                    <Table.Cell>
                    <Button.Group className='flex flex-row items-center gap-2 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]
                        justify-end'>
                        <ButtonSecondaLingua onClickAction={() =>{setSecondaLingua({...secondaLingua, [name]: secondaLingua[name] ? !secondaLingua[name] : true})}}/>
                        <ButtonMore type={true} onClickAction={() =>{setElementoVisibility({...elementoDetailsVisibilities, [name]: elementoDetailsVisibilities[name] ? !elementoDetailsVisibilities[name] : true})}}/>
                        { openfoodfacts === "true" ? 
                        <ButtonModificaElementoOFF 
                            categoria={categoria}
                            oldPrice={price}
                            oldPriority={priority}
                            ingredienti={ingredients}
                            allergens={allergens}
                            codiceElemento={openfoodfacts_identifier}
                            nomeElemento={name}
                            refreshAction={updateAction}
                        /> 
                        :
                        <ButtonModificaElemento 
                            refreshAction={updateAction}
                            categoria={categoria}
                            oldName={name} 
                            oldPrice={price} 
                            oldAllergens={allergens ? allergens : null } 
                            oldIngredients={ingredients}
                            oldNomeSL={second_name}
                            oldIngredientiSL={second_ingredients}
                            oldPriority={priority}
                        />
                        }
                        <ButtonConfirmElimina refreshAction={updateAction}  argsConfermaAction={name} clickConfermaAction={deleteElemento} icona={<FaTrashAlt className='text-xl'/>}>
                            Eliminare l'elemento selezionato?
                        </ButtonConfirmElimina>
                    </Button.Group>
                    </Table.Cell>
            </Table.Row>
            {!elementoDetailsVisibilities[name] ? <Table.Cell colSpan={6}><TableHorizontalBar/></Table.Cell> : null }
            {elementoDetailsVisibilities[name] ? <ListaDettagliElementi key={name} secondaLingua={secondaLingua[name]} ingredienti={ingredients} allergeni={allergens} secondi_ingredienti={second_ingredients}/> : null}
            </React.Fragment>
        )) : 
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>Errore con il caricamento!</Table.Cell>
        </Table.Row>
        }
        </React.Fragment>
    );
}
/*
<Table.Cell onClick={()=>{setOrdinamento("BYNAME"); useUpdateData();}}>
                        {secondaLingua && (second_name != "null") ? second_name : name}
                    </Table.Cell>
                    <Table.Cell onClick={()=>{setOrdinamento("BYPRICE"); useUpdateData();}}>{price}</Table.Cell>
                    <Table.Cell onClick={()=>{setOrdinamento("BYNAME"); useUpdateData();}}>{last_modified}</Table.Cell>
                    <Table.Cell>
*/