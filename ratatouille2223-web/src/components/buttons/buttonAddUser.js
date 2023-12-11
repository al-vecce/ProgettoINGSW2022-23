'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';
import { utenzeService } from '@/services/utenzeService';
import { Select } from 'flowbite-react';

export default function buttonAddUser({alertsControl, refreshAction}) {
  const utenzeServ = new utenzeService();
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ruolo, setRuolo] = useState('ADDETTOSALA');
  function onCloseModal() {
    setOpenModal(false);
    setUsername('');
    setRuolo('ADDETTOSALA');
    setPassword('');
  }
  async function aggiungiUtente(){
    const res = await utenzeServ.putUtentePerUsername(username,password,ruolo);
    if(res){
      (res.result == "true" ? alertsControl.setAlertSuccessState(true) : null);
    }else{
        //errore
    }
    refreshAction();
    setUsername('');
    setPassword('');
    setRuolo('ADDETTOSALA');
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}
      className='p-4 text-lg text-primary-icon body-font rounded-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] font-quicksand tracking-widest bg-gray-300
      border border-none enabled:hover:bg-gray-300 enabled:hover:text-primary-icon focus:bg-gray-300 focus:border-transparent focus:ring-transparent focus:text-primary-icon'
      style={{width:"3em", height:"3em"}}>
      <FaPlus className='text-[24px]'/></Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <Modal.Header>
          
        <div className="flex flex-wrap gap-14">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Nuovo utente</h1>
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
                  <Label htmlFor="Password" value="Password" />
                </div>
                <TextInput
                  id="Password"
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
              <Button onClick={aggiungiUtente} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}