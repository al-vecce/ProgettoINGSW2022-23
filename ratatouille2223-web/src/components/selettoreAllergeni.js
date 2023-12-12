'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import ButtonAllergen from './buttons/buttonAllergen';
import { FaPlus } from "react-icons/fa";

export default function SelettoreAllergeni({allergens, setAllergens}) {
  const [openModal, setOpenModal] = useState(false);
  const [ allergensLocale, setAllergensLocale] = useState(allergens);
  
  function onCloseAction(){
    setOpenModal(false);
  }
  function onSubmit(){
    setAllergens(allergensLocale);
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' size="sm" outline pill><FaPlus /></Button>
      <Modal dismissible size="md" show={openModal} onClose={onCloseAction}>
        <Modal.Header>
        <div className="space-y-6">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                Selettore Allergeni
            </h1>
        </div>
            </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 space-w-6 p-30">
            <div className="flex flex-wrap gap-12">
              {Object.entries(allergensLocale).map(([nome,value]) => {
                return(
                <ButtonAllergen statoIniziale={allergensLocale[nome]} type={nome} selector={true} onClickAction={()=>{setAllergensLocale({...allergensLocale, [nome]: !allergensLocale[nome]})}} />
                );
              })}
            </div>
            <Button color='success' onClick={onSubmit}>Conferma</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}