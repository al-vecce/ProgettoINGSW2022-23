'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import ButtonAllergen from './buttons/buttonAllergen';
import { FaList } from "react-icons/fa";

export default function SelettoreAllergeni({allergens, setAllergens}) {
  const [openModal, setOpenModal] = useState(false);
  const [ allergensLocale, setAllergensLocale] = useState(allergens);
  
  function onCloseAction(){
    setOpenModal(false);
  }
  function onSubmit(){
    setAllergens(allergensLocale);
    setOpenModal(false);
  }

  return (
    <div>
      <Button
      theme={{pill: { 
        off: "rounded-full text-white bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-primary-icon focus:border-transparent focus:ring-transparent drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent", 
        on: "rounded-full text-primary-icon bg-white enabled:hover:bg-gray-200 border border-[3px] border-primary-icon focus:bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent"}}}
      pill={false}
      style={{width:"2.3em", height:"2.3em"}}
      onClick={() => setOpenModal(true)}><FaList className='text-xl'/></Button>
      <Modal dismissible size="md" show={openModal} onClose={onCloseAction}>
        <div className='p-4'>
          <Modal.Header>
          <div className="space-y-6">
              <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                  Selettore Allergeni
              </h1>
          </div>
              </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col items-center justify-center gap-7">
              <div className="flex flex-wrap gap-5 items-center justify-center">
                {Object.entries(allergensLocale).map(([nome,value]) => {
                  return(
                  <ButtonAllergen statoIniziale={allergensLocale[nome]} type={nome} selector={true} onClickAction={()=>{setAllergensLocale({...allergensLocale, [nome]: !allergensLocale[nome]})}} />
                  );
                })}
              </div>
              <Button color='success' onClick={onSubmit}>Conferma</Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}