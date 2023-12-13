'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { categorieService } from '@/services/categorieService';
import useSWR from 'swr';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import CurrencyInput from 'react-currency-input-field';

export default function buttonAggiungiCategoria({alertsControl, refreshAction}) {
  const userData = useCurrentUserData();
  const categorieServ = new categorieService(userData ? userData.token : "");
  const [openModal, setOpenModal] = useState(false);
  const [NomeCategoria, setNomeCategoria] = useState('');
  const [ priority, setPriority ] = useState(1);
  function onCloseModal() {
    setOpenModal(false);
    setPriority(1);
    setNomeCategoria('');
  }
  async function submitChange(event){
    if(NomeCategoria != '' && priority){
      const res = await categorieServ.putCategoriaPerNome(NomeCategoria, priority);
      if(res){
        (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
      }else{
          //errore
      }
      refreshAction();
      setNomeCategoria('');
      setPriority(1);
      setOpenModal(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}
        className='p-4 text-lg text-primary-icon body-font rounded-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] font-quicksand tracking-widest bg-gray-300
        border border-none enabled:hover:bg-gray-400 enabled:hover:text-primary-icon focus:bg-gray-300 focus:border-transparent focus:ring-transparent focus:text-primary-icon'
        style={{width:"3em", height:"3em"}}>
        <FaPlus className='text-[24px]'/>
      </Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <div className='p-4'>
          <Modal.Header>
            <div className="flex flex-wrap gap-14">
              <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Nuova categoria</h1>
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
              <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Priorità" value="Priorità:" />
                  </div>
                  <CurrencyInput
                    id={"PriorityInput"}
                    className="text-primary-icon rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Inserire una priorità"
                    defaultValue={1}
                    disableGroupSeparators={true}
                    value={priority}
                    allowNegativeValue={false}
                    decimalsLimit={0}
                    onValueChange={(value) => setPriority(value)}
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