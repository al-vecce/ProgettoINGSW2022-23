'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FaEdit  } from "react-icons/fa";
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
    if(NomeCategoria != ""){
      const res = await categorieServ.postCategoriaPerNome(nome, NomeCategoria);
      if(res){
        (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
      }
      refreshAction();
      setOpenModal(false);
    }
  }

  return (
    <>
      <Button className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
      border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}
      onClick={() => setOpenModal(true)}>
        <FaEdit className='pl-1 pb-0.5 text-[26px]'/>
      </Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <div className='p-4'>
          <Modal.Header>
            <div className="flex flex-wrap gap-14">
              <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Modifica categoria</h1>
            </div>
          </Modal.Header>
          <Modal.Body>  
            <div className='flex flex-row items-center justify-between'>
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
        </div>
      </Modal>
    </>
  );
}