'use client';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FaUserEdit } from "react-icons/fa";
import { useState } from 'react';
import { utenzeService } from '@/services/utenzeService';
import { Select } from 'flowbite-react';
import useCurrentUserData from '@/hooks/useCurrentUserData';


export default function buttonModificaUtente({alertsControl, refreshAction, old_username, old_ruolo, password}) {
  const [openModal, setOpenModal] = useState(false);
  const userData = useCurrentUserData();
  const [username, setUsername] = useState(old_username);
  const [ruolo, setRuolo] = useState(old_ruolo);
  const utenzeServ = new utenzeService(userData ? userData.token : "");

  function onCloseModal() {
    setOpenModal(false);
    setUsername(old_username);
    setRuolo(old_ruolo);
  }
  async function modificaUtente(){
    if(username != ""){
      const res = await utenzeServ.postUtentePerUsername(old_username,username,password, password,ruolo);
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
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} 
      className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
      border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}} ><FaUserEdit className='text-[24px]'/></Button>
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