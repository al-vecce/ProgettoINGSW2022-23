'use client';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';

import { FaPlus, FaEdit } from "react-icons/fa";
import React from 'react';
import elementiService from '@/services/elementiService';
import CurrencyInput from 'react-currency-input-field';
import useCurrentUserData from '@/hooks/useCurrentUserData';


export default function ModificaElementoOFF({ categoria, refreshAction, codiceElemento, oldPrice, ingredienti, allergens, nomeElemento, oldPriority }) {
  const [openModal, setOpenModal] = useState(false);
  const [prezzo, setPrezzo] = useState(0);
  const [priority, setPriority] = useState(1);
  const [errorProdottoNonRiconosciuto, setErrorProdottoNonRiconosciuto] = useState(false);
  const userData = useCurrentUserData();

  const elementiServ = new elementiService(userData ? userData.token : "");

  function onCloseModal() {
    setOpenModal(false);
    setPriority(oldPriority);
    setPrezzo(oldPrice);
    setErrorProdottoNonRiconosciuto(false);
  }

  async function onSubmit() {
    if (priority && prezzo) {
      let ingredientiString = ingredienti;
      let allergeniString = allergens;

      allergeniString === "" ? allergeniString = "," : null;
      ingredientiString === "" ? ingredientiString = "," : null;

      const data = await elementiServ.postElementoInCategoriaConOFF([categoria, nomeElemento, prezzo, ingredientiString, allergeniString, priority, nomeElemento, ingredientiString, codiceElemento]);
      setPriority(priority);
      setPrezzo(prezzo)
      setOpenModal(false);
      refreshAction();
    }
  }

  return (
    <>
      <Button onClick={() => { setOpenModal(true) }}
        className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
        border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
        style={{ width: "2.3em", height: "2.3em" }} ><FaEdit className='pl-1 pb-0.5 text-[26px]' /></Button>
      <Modal theme={{
        "root": {
          "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
          "show": {
            "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
            "off": "hidden"
          },
          "sizes": {
            "2xl": "max-w-[680px]",
          },
        },
        "content": {
          "base": "relative h-full w-full p-4",
          "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 max-w-[90vh]"
        },
        "body": {
          "base": "p-6 flex-none",
          "popup": "pt-0"
        },
        "header": {
          "base": "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
          "popup": "p-2 border-b-0",
          "title": "text-xl font-medium text-gray-900 dark:text-white",
          "close": {
            "base": "ml-auto flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            "icon": "h-5 w-5"
          }
        },
        "footer": {
          "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
          "popup": "border-t"
        }
      }}
      dismissible show={openModal} size="2xl" onClose={onCloseModal}>
        <div className='flex-none p-4'>
          <Modal.Header>
            <div className="flex flex-wrap gap-14">
              <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Modifica Elemento</h1>
            </div>

          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col overflow-hidden gap-5">

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
              <div className='flex flex-rows flex-nowrap items-stretch justify-between'>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Prezzo" value="Prezzo:" />
                  </div>
                  <CurrencyInput
                    id={"CurrInput" + (categoria ? categoria : "")}
                    className="text-primary-icon rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
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
                <div>
                  <div className="mb-2 block space y-1">
                  <Label htmlFor="Priorità" value="Priorità:" />
                  </div>
                  <CurrencyInput
                    className="text-primary-icon rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                    id={"PriorInput" + (priority ? priority : "")}
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
              </div>
              <div className="mb-2 block space-y-2">
                <Label htmlFor="Allergeni" value="Allergeni" />
                <div className='text-sm '>
                {(allergens && allergens != ',') ? allergens : <Label htmlFor="allrgEmpty" className='text-sm text-gray-400' value="Questo elemento non possiede allergeni." />}
                </div>
              </div>
              <div className="text-left text-gray-900 block items-center justify-start">
                <Label htmlFor="Ingredienti" value="Ingredienti" />
                <div className='text-sm '>
                  {(ingredienti && ingredienti != ',') ? ingredienti : <Label htmlFor="allrgEmpty" className='text-sm text-gray-400' value="Questo elemento non possiede ingredienti." />}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center items-center justify-center">
            <div className="flex justify-center">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}