'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import ButtonClose from './buttonClose';

export default function Confirm({icona, refreshAction, clickConfermaAction, argsConfermaAction, clickAnnullaAction, children}) {
  const [openModal, setOpenModal] = useState(false);

  

  async function confermaAction(){
    await clickConfermaAction(argsConfermaAction); 
    refreshAction(); 
    setOpenModal(false);
  }
  return (
    <>
     <Button onClick={() => setOpenModal(true)}>{icona}</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {children}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confermaAction}>
                Conferma
              </Button>
              <Button color="gray" onClick={() => {setOpenModal(false)}}>
                Annulla
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}