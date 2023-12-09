'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { FaEgg } from "react-icons/fa";
import { FaCow } from "react-icons/fa6";
import { FaFishFins } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import { FaShrimp } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa";

export default function SelettoreAllergeni({allergens}) {
  const [openModal, setOpenModal] = useState(false);
  const [ eggOutline, setEggOutline] = useState(!allergens.egg);
  const [ shrimpOutline, setShrimpOutline] = useState(!allergens.shrimp);
  const [ cowOutline, setCowOutline] = useState(!allergens.cow);
  const [ wheatOutline, setWheatOutline] = useState(!allergens.wheat);
  const [ fishOutline, setFishOutline] = useState(!allergens.fish);

  const onEggClick = ()=>{
    setEggOutline(!eggOutline)
  }
  const onShrimpClick = ()=>{
    setShrimpOutline(!shrimpOutline)
  }
  const onCowClick = ()=>{
    setCowOutline(!cowOutline)
  }
  const onWheatClick = ()=>{
    setWheatOutline(!wheatOutline)
  }
  const onFishClick = ()=>{
    setFishOutline(!fishOutline)
  }
  function onCloseAction(){
    setOpenModal(false);
  }
  function onSubmit(){
    allergens.cow = !cowOutline;
    allergens.egg = !eggOutline;
    allergens.fish = !fishOutline;
    allergens.wheat = !wheatOutline;
    allergens.shrimp = !shrimpOutline;
  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' outline pill><FaPlus /></Button>
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
              <Button onClick={onEggClick} color='dark' size="xl" outline={eggOutline} pill><FaEgg/></Button>
              <Button onClick={onCowClick} color='dark' size="xl" outline={cowOutline} pill><FaCow/></Button>
              <Button onClick={onFishClick} color='dark' size="xl" outline={fishOutline} pill><FaFishFins/></Button>
              <Button onClick={onWheatClick} color='dark' size="xl" outline={wheatOutline} pill><LuWheat/></Button>
              <Button onClick={onShrimpClick} color='dark' size="xl" outline={shrimpOutline} pill><FaShrimp/></Button>
            </div>
            <Button color='success' onClick={() => setOpenModal(false)}>Conferma</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}