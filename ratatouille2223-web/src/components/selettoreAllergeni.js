'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import ButtonAllergen from './buttons/buttonAllergen';
import { FaPlus } from "react-icons/fa";

export default function SelettoreAllergeni({allergens, setterAllergeni}) {
  const [openModal, setOpenModal] = useState(false);
  const [ eggOutline, setEggOutline] = useState(!allergens.egg);
  const [ shrimpOutline, setShrimpOutline] = useState(!allergens.shrimp);
  const [ cowOutline, setCowOutline] = useState(!allergens.cow);
  const [ wheatOutline, setWheatOutline] = useState(!allergens.wheat);
  const [ fishOutline, setFishOutline] = useState(!allergens.fish);
  function onCloseAction(){
    setOpenModal(false);
  }
  function onSubmit(){
    setterAllergeni.setCowAllergen(!cowOutline);
    setterAllergeni.setEggAllergen(!eggOutline);
    setterAllergeni.setFishAllergen(!fishOutline);
    setterAllergeni.setWheatAllergen(!wheatOutline);
    setterAllergeni.setShrimpAllergen(!shrimpOutline);
    setOpenModal(false);
  }
  function changeButtonState(){

  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' size="sm" outline pill><FaPlus /></Button>
      <Modal dismissible size="md" show={openModal} onClose={onCloseAction}>
        <Modal.Header>
        <div className="space-y-6">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                Selettore Allergeni
            </h1>
        </div>
            </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 space-w-6 p-30">
            <div className="flex flex-wrap gap-12">
              {Object.entries(allergens).map(([key,value]) => {
                return(
                <ButtonAllergen type={key} onClickAction={() =>{changeButtonState()}}/>
                );
              })}
            </div>
            <Button color='success' onClick={onSubmit}>Conferma</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}