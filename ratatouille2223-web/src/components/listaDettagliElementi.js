'use client';
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import ButtonAllergen from './buttons/buttonAllergen';
import TableHorizontalBar from './tableHorizontalBar';


export default function ListaDettagliElementi({key, secondaLingua, ingredienti, allergeni, secondi_ingredienti, openfoodfacts, updateAction}) {
    const [ elementoDetailsVisibilities, setElementoVisibility] = useState({});
    const [ ingredientsNumber, setIngredientsNumber] = useState(0);

    const splitString = (input) => {
        if(input && input != "null" && input != ',' && input != ',') {
            if(input.substring(input.length - 1, input.length) == ",") {
                input = input.slice(0, -1);
            }
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
                    <ButtonAllergen statoIniziale={true} type={name}/>
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
                        {!secondaLingua && splitString(ingredienti)}
                        {secondaLingua && splitString(secondi_ingredienti)}
                    </div>
                </Table.Cell>
                <Table.Cell colSpan={2}>
                    <div className='flex flex-wrap gap-2'>
                        {openfoodfacts && splitAllergens(allergeni)}
                        {!openfoodfacts && splitString(allergeni)}
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