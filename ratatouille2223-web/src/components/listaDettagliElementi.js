'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Button } from 'flowbite-react';
import ButtonPDF from './buttons/buttonPDF';
import ButtonMore from './buttons/buttonMore';
import ButtonSecondaLingua from './buttons/buttonSecondaLingua';
import ButtonModificaElemento from './buttons/buttonModificaElemento';
import ButtonConfirmElimina from './buttons/buttonConferma';
import { IoTrashOutline } from "react-icons/io5";
import elementiService from '@/services/elementiService';
import ButtonAllergen from './buttons/buttonAllergen';

import TableHorizontalBar from './tableHorizontalBar';

import { FaTrashAlt  } from "react-icons/fa";

export default function ListaDettagliElementi({key, secondaLingua, ingredienti, allergeni, secondi_ingredienti, updateAction}) {
    const [ elementoDetailsVisibilities, setElementoVisibility] = useState({});
    const [ ingredientsNumber, setIngredientsNumber] = useState(0);

    const splitString = (input) => {
        if(input && input != "null") {
            return (
                input.split(",").map(name => (
                <div className='flex capitalize flex-col flex-wrap block rounded-md bg-gray-200 hover:bg-gray-200 p-2'>
                    <p>{name}</p>
                </div>
                ))
            )
        }
        else {
            return (
                <div className='flex capitalize flex-col flex-wrap block rounded-md bg-gray-200 hover:bg-gray-200 p-2'>
                    <p>Informazioni Assenti</p>
                </div>
            )
        }
    }
    const splitAllergens = (input) => {
        if(input && input != "null") {
            return (
                input.split(",").map(name => (
                    <ButtonAllergen type={name}/>
                ))
            )
        }
        else {
            return (
                <div className='flex capitalize flex-col flex-wrap block rounded-md bg-gray-200 hover:bg-gray-200 p-2'>
                    <p>Informazioni Assenti</p>
                </div>
            )
        }
    }

    console.log(ingredienti.split(","))

    return (
        <React.Fragment key={key}>
            <Table.Row className='bg-gray-200 hover:bg-gray-200 p-5'>
                <Table.Cell colSpan={3}>
                    <div className='font font-quicksand font-normal tracking-widest text-[16px] text-primary-icon
                    pl-10'>
                        Ingredienti
                    </div>
                </Table.Cell>
                <Table.Cell colSpan={2}>
                    <div className='font font-quicksand font-normal tracking-widest text-[16px] text-primary-icon
                    pl-10'>
                        Allergeni
                    </div>
                </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white hover:bg-white'>
                <Table.Cell colSpan={3}>
                    <div className='flex flex-wrap gap-2'>
                        {splitString(ingredienti)}
                    </div>
                </Table.Cell>
                <Table.Cell colSpan={2}>
                    <div className='flex flex-wrap gap-2'>
                        {splitAllergens(allergeni)}
                    </div>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell colSpan={6}>
                    <TableHorizontalBar/>
                </Table.Cell>
            </Table.Row>
        </React.Fragment>
    );
}