'use client';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';

import { FaPlus, FaEdit } from "react-icons/fa";
import React from 'react';
import elementiService from '@/services/elementiService';
import CurrencyInput from 'react-currency-input-field';
import ButtonAllergen from './buttonAllergen';
import { openFoodFactsService } from '@/services/openFoodFactsService';
import { toast, ToastContainer } from 'react-toastify';

export default function ModificaElementoOFF({categoria, refreshAction, codiceElemento, oldPrice, ingredienti, allergens, nomeElemento, oldPriority}) {
  const [ openModal, setOpenModal ] = useState(false);
  const [ prezzo, setPrezzo ] = useState(0);
  const [ priority, setPriority ] = useState(1);
  const [ errorProdottoNonRiconosciuto, setErrorProdottoNonRiconosciuto ] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setPriority(oldPriority);
    setPrezzo(oldPrice);
    setErrorProdottoNonRiconosciuto(false);
  }

  async function onSubmit(){
    const elementiServ = new elementiService();
    let ingredientiString = ingredienti;
    let allergeniString = allergens;

    allergeniString === "" ? allergeniString="," : null;
    ingredientiString === "" ? ingredientiString="," : null;

    const data = await elementiServ.postElementoInCategoriaConOFF([categoria, nomeElemento, prezzo, ingredientiString, allergeniString, priority, nomeElemento , ingredientiString, codiceElemento ]);
    setPriority(priority);
    setPrezzo(prezzo)
    setOpenModal(false);
    refreshAction();
  }

  return (
    <>
      <Button onClick={() => {setOpenModal(true)}} 
      className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
      border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}} ><FaEdit className='pl-1 pb-0.5 text-[26px]'/></Button>
      <Modal dismissible show={openModal} size="xl" onClose={onCloseModal}>
        <Modal.Header>
        <div className="flex flex-wrap gap-14">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Modifica Elemento</h1>
        </div>
        
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="NomeElemento" value="Nome Elemento" />
              </div>
              <TextInput
                id="NomeElemento"
                placeholder="Nome Elemento"
                value={nomeElemento}
                onChange={(event) => setNomeElemento(event.target.value)}
                required
                disabled={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Prezzo" value="Prezzo:" />
                <CurrencyInput
                  id={"CurrInput"+( categoria ? categoria: "")}
                  className="text-primary-icon"
                  placeholder="Inserire un prezzo"
                  defaultValue={prezzo}
                  decimalSeparator='.'
                  groupSeparator=' '
                  value={prezzo}
                  allowNegativeValue={false}
                  decimalsLimit={2}
                  onValueChange={(value) => setPrezzo(value)}
                  required
                />
              </div>
            </div>
            <div className="mb-2 text-center text-gray-900 block space-y-2">
              <Label htmlFor="Allergeni" className='text-lg' value="Allergeni" />
              <div className='text-sm '>
                {allergens ? (allergens === "," ? <Label htmlFor="allrgEmpty" className='text-sm text-gray-400' value="Questo elemento non possiede allergeni" /> : allergens) : ""}
              </div>
            </div>
            <div className="mb-2 block space y-1">
            <Label htmlFor="Priorità" value="Priorità:" />
                <CurrencyInput
                  className="text-primary-icon"
                  id={"PriorInput"+( priority ? priority: "")}
                  placeholder="Inserire una priorità"
                  defaultValue={priority}
                  allowNegativeValue={false}
                  disableGroupSeparators={true}
                  value={priority}
                  decimalsLimit={0}
                  onValueChange={(value) => setPriority(value)}
                />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center">
            <div >
            <Label htmlFor="Ingredienti" className='text-lg' value="Ingredienti" />
                <div className='text-sm '>
                {ingredienti ? ingredienti : ""}
                </div>
            </div>
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}