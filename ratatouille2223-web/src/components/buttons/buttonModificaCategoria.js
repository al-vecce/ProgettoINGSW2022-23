'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { categorieService } from '@/services/categorieService';
import useSWR from 'swr';


export default function ModificaCategoria({nome, alertsControl, refreshAction}) {
  const categorieServ = new categorieService();
  const [openModal, setOpenModal] = useState(false);
  const [NomeCategoria, setNomeCategoria] = (nome ? useState(nome) : useState(''));
  function onCloseModal() {
    setOpenModal(false);
    (nome ? setNomeCategoria(nome) : setNomeCategoria(''));
  }
  async function submitChange(event){
    const res = await categorieServ.postCategoriaPerNome(nome, NomeCategoria);
    if(res){
      (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
    }
    refreshAction();
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' outline><FaPlus /></Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <Modal.Header>
          
        <div className="flex flex-wrap gap-14">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Modifica categoria</h1>
        </div>
        
        </Modal.Header>
        <Modal.Body>  
            <div>
              <div className="mb-2 block">
                <Label htmlFor="NomeCategoria" value="Nome Categoria" />
              </div>
              <TextInput
                id="NomeCategoria"
                placeholder="Nome Categoria"
                value={NomeCategoria}
                onChange={(event) => setNomeCategoria(event.target.value)}
                required
              />
            </div>
        </Modal.Body>
        <div className="flex justify-center p-2">
              <Button onClick={submitChange} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}