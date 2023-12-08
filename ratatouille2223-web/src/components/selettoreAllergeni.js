'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { FaEgg } from "react-icons/fa";
import { FaCow } from "react-icons/fa6";
import { FaFishFins } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import { FaShrimp } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa";

export default function SelettoreAllergeni() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' outline pill><FaPlus /></Button>
      <Modal dismissible size="md" show={openModal} onClose={() => setOpenModal(false) }>
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
              <Button color='dark' size="xl" pill><FaEgg/></Button>
              <Button color='teal' size="xl" pill><FaCow/></Button>
              <Button color='blue' size="xl" pill><FaFishFins/></Button>
              <Button color='yellow' size="xl" pill><LuWheat/></Button>
              <Button color='red' size="xl" pill><FaShrimp/></Button>
            </div>
            <Button color='success' onClick={() => setOpenModal(false)}>Conferma</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}