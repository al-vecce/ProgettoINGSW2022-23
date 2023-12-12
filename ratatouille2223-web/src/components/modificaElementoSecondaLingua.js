'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FaLanguage, FaPlus } from "react-icons/fa";
import React from 'react';

export default function ModificaElementoSecondaLingua({oldNomeElemento, oldIngredienti, setterNomeElemento, setterIngredienti}) {
  const [openModal, setOpenModal] = useState(false);
  const [nomeElemento, setNomeElemento] = useState(oldNomeElemento ? oldNomeElemento : "");
  const [ ingredienti, setIngrediente ] = useState(oldIngredienti ? oldIngredienti : {1:""});
  const [ elementsRowCounter, setElemRowCounter ] = useState(oldIngredienti ? (Object.keys(oldIngredienti).length)-1 : 0);
  let counter = 0;
  function onCloseModal() {
    counter = 0;
    setOpenModal(false);
    setElemRowCounter(oldIngredienti ? (Object.keys(oldIngredienti).length)-1 : 0);
  }

  const addIngredientClick = ()=>{
    setElemRowCounter(elementsRowCounter+1);
    counter = 0;
  }

  const handleIngredienteInput = (e) =>{
    const name = e.target.name;
    const newValue = e.target.value;
    setIngrediente(ingredienti =>({...ingredienti, [name]: newValue}));
  }

  function onClickConferma(){
    counter = 0;
    setterIngredienti(ingredienti);
    setterNomeElemento(nomeElemento);
    setElemRowCounter(oldIngredienti ? (Object.keys(oldIngredienti).length)-1 : 0);
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='white' size='sl'><FaLanguage /></Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <Modal.Header>
          
        <div className="flex flex-wrap gap-14">
          <Button onClick={() => setOpenModal(true)} color='white' size='sl'><FaLanguage /></Button>
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Seconda lingua</h1>
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
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center">
          <div>
            <Label htmlFor="Ingredienti" value="Ingredienti:" />
              <Button color='dark' size="xs" pill onClick={addIngredientClick}><FaPlus/></Button>
              {Array.from({length: elementsRowCounter}).map(() =>{
                counter++;
                return(
                  <React.Fragment key={"Ingrediente"+counter}>
                      <div className="mb-2 block">
                        <TextInput 
                        id={"input"+counter} 
                        type="text"
                        sizing="sm"
                        value={ingredienti[counter]}
                        name={counter}
                        onChange={handleIngredienteInput} />
                      </div>
                </React.Fragment>
                );
              })}
            </div>
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button onClick={onClickConferma} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}