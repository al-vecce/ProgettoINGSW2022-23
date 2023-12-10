'use client';

import { Button } from 'flowbite-react';
import { FaXmark } from "react-icons/fa6";
import { useState } from 'react';
import { Modal } from 'flowbite-react';


export default function ButtonClose({icona, refreshAction, clickConfermaAction, argsConfermaAction, clickAnnullaAction, children}) {
  
  const [openModal, setOpenModal] = useState(false);

  

  async function confermaAction(){
    await clickConfermaAction(argsConfermaAction); 
    refreshAction(); 
    setOpenModal(false);
  }
  
  return (
    <div>
      <Button  onClick={() => setOpenModal(true)} className='text-lg body-font font-quicksand tracking-widest bg-primary-3
      border border-none enabled:hover:bg-green-700 focus:bg-green-700 focus:border-transparent focus:ring-transparent'>
        <div className="flex flex-row gap-3 items-center">
          <FaXmark/>
          Chiudi
        </div>
      </Button>
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
    </div>
  );
}