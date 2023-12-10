'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { utenzeService } from '@/services/utenzeService';
import { Select } from 'flowbite-react';

export default function buttonModificaUtente({alertsControl, refreshAction, old_username, old_ruolo}) {
  const utenzeServ = new utenzeService();
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState(old_username);
  const [ruolo, setRuolo] = useState(old_ruolo);

  function onCloseModal() {
    setOpenModal(false);
    setUsername(old_username);
    setRuolo(old_ruolo);
  }
  async function modificaUtente(){
    const res = await utenzeServ.postUtentePerUsername(old_username,username, ruolo);
    if(res){
      (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
    }else{
        //errore
    }
    refreshAction();
    setUsername('');
    setRuolo('ADDETTOSALA');
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' outline><FaPlus /></Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <Modal.Header>
        <div className="flex flex-wrap gap-14">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Modifica utente</h1>
        </div>
        </Modal.Header>
        <Modal.Body>  
              <div className='space-y-4'>
                <div className="mb-2 block">
                  <Label htmlFor="Username" value="Username" />
                </div>
                <TextInput
                  id="Username"
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <div className="mb-2 block">
                    <Label htmlFor="Ruolo" value="Ruolo" />
                  </div>
                <Select id="ruolo" value={ruolo} onChange={(event) => setRuolo(event.target.value)} required>
                                  <option>ADDETTOSALA</option>
                                  <option>AMMINISTRATORE</option>
                                  <option>SUPERVISORE</option>
                  </Select>
              </div>
        </Modal.Body>
        <div className="flex justify-center p-2">
              <Button onClick={modificaUtente} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}