'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import ButtonClose from './buttonClose';

const customButtonTheme = {
  color: {
    delete: "text-lg text-white bg-primary-error border border-transparent enabled:hover:bg-yellow-500 focus:green-300",
  },
  disabled: "cursor-not-allowed",
};

export default function Confirm({icona, colore, refreshAction, clickConfermaAction, argsConfermaAction, clickAnnullaAction, children}) {
  const [openModal, setOpenModal] = useState(false);

  if(colore != null){
    colore = "confirm";
  }

  async function confermaAction(){
    await clickConfermaAction(argsConfermaAction); 
    refreshAction(); 
    setOpenModal(false);
  }
  return (
    <>
     <Button theme={customButtonTheme} className="shadow-xl rounded-lg border border-none focus:border-transparent focus:ring-transparent" 
     color="delete" onClick={() => setOpenModal(true)} style={{width:"2.3em", height:"2.3em"}}>{icona}</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-primary-icon">
              {children}
            </h3>
            <div className="flex content-stretch items-stretch justify-center gap-4 drop-shadow-lg">
              <Button color="failure" onClick={confermaAction}>
                Conferma
              </Button>
              <Button color="gray" className='border-4 border-primary-icon' onClick={() => {setOpenModal(false)}}>
                Annulla
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}