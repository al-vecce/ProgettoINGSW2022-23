'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FaLanguage, FaPlus, FaMinus } from "react-icons/fa";
import React from 'react';

export default function ModificaElementoSecondaLingua({ oldNomeElemento, oldIngredienti, setterNomeElemento, setterIngredienti }) {
  const [openModal, setOpenModal] = useState(false);
  const [nomeElemento, setNomeElemento] = useState(oldNomeElemento ? oldNomeElemento : "");
  const [ingredienti, setIngrediente] = useState(oldIngredienti ? oldIngredienti : { 1: "" });
  const [elementsRowCounter, setElemRowCounter] = useState(oldIngredienti ? (Object.keys(oldIngredienti).length) - 1 : 0);
  let counter = 0;
  function onCloseModal() {
    counter = 0;
    setOpenModal(false);
    setElemRowCounter(oldIngredienti ? (Object.keys(oldIngredienti).length) - 1 : 0);
  }

  const addIngredientClick = () => {
    setElemRowCounter(elementsRowCounter + 1);
    counter = 0;
  }
  const removeIngredientClick = ()=>{
    if(elementsRowCounter-1 >= 0)
    {setElemRowCounter(elementsRowCounter-1);}
  }

  const handleIngredienteInput = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setIngrediente(ingredienti => ({ ...ingredienti, [name]: newValue }));
  }

  function onClickConferma() {
    counter = 0;
    setterIngredienti(ingredienti);
    setterNomeElemento(nomeElemento);
    setElemRowCounter(oldIngredienti ? (Object.keys(oldIngredienti).length) - 1 : 0);
    setOpenModal(false);
  }

  return (
    <>
      <Button theme={{
        pill: {
          off: "rounded-lg bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-primary-icon focus:border-transparent focus:ring-transparent",
          on: ""
        }
      }}
        className='text-lg body-font font-quicksand tracking-widest'
        style={{ width: "2.3em", height: "2.3em" }}
        onClick={() => setOpenModal(true)} ><FaLanguage className='text-2xl' /></Button>
      <Modal dismissible show={openModal} size="xl" onClose={onCloseModal}>
        <div className='flex-none p-4'>
          <Modal.Header>
            <div className="flex flex-wrap gap-14">
              <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Seconda lingua</h1>
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
                  placeholder="Nome Elemento in Seconda Lingua"
                  value={nomeElemento}
                  onChange={(event) => setNomeElemento(event.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col flex-wrap gap-2">
                <Label htmlFor="Ingredienti" value="Ingredienti:" />
                <div className='flex flex-rows flex-wrap gap-2 items-center justify-start'>
                {Array.from({ length: elementsRowCounter }).map(() => {
                  counter++;
                  return (
                    <React.Fragment key={"Ingrediente" + counter}>
                      <div className="flex flex-row gap-1 block">
                        <TextInput
                          id={"input" + counter}
                          type="text"
                          sizing="sm"
                          value={ingredienti[counter]}
                          name={counter}
                          onChange={handleIngredienteInput} />
                      </div>
                    </React.Fragment>
                  );
                })}
                <Button theme={{pill: { 
                    off: "rounded-full text-white bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-primary-icon focus:border-transparent focus:ring-transparent drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent", 
                    on: "rounded-full text-primary-icon bg-white enabled:hover:bg-gray-200 border border-[3px] border-primary-icon focus:bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent"}}}
                  pill={false}
                  onClick={removeIngredientClick}
                  style={{width:"2.3em", height:"2.3em"}}><FaMinus className='text-lg'></FaMinus></Button>
                  <Button theme={{pill: { 
                    off: "rounded-full text-white bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-primary-icon focus:border-transparent focus:ring-transparent drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent", 
                    on: "rounded-full text-primary-icon bg-white enabled:hover:bg-gray-200 border border-[3px] border-primary-icon focus:bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent"}}}
                  pill={false}
                  style={{width:"2.3em", height:"2.3em"}}
                  onClick={addIngredientClick}><FaPlus className='text-xl'/></Button>
              </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center">
            <div className="flex justify-center p-2">
              <Button onClick={onClickConferma} color='success'>Conferma</Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}