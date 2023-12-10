'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import SelettoreAllergeni from './selettoreAllergeni';
import { FaLanguage } from "react-icons/fa";

export default function ModificaElementoSecondaLingua() {
  const [openModal, setOpenModal] = useState(false);
  const [nomeElemento, setNomeElemento] = useState('');
  const [prezzo, setPrezzo] = useState('');


  function onCloseModal() {
    setOpenModal(false);
    setNomeElemento('');
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
          <Label htmlFor="Ingredienti" value="Ingredienti:" />
        <div>
        <TextInput id="small" type="text" sizing="sm" />
        </div>
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}