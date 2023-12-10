'use client';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import SelettoreAllergeni from '../selettoreAllergeni';
import { FaPlus } from "react-icons/fa";
import ModificaElementoSecondaLingua from '../modificaElementoSecondaLingua';
import { FaEgg } from "react-icons/fa";
import { FaCow, FaFishFins, FaShrimp  } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import React from 'react';
import PriceForm from '../priceForm';

export default function AggiungiElemento() {
  const [openModal, setOpenModal] = useState(false);
  const [nomeElemento, setNomeElemento] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [ allergenEgg, setEggAllergen] = useState(false);
  const [ allergenShrimp, setShrimpAllergen] = useState(false);
  const [ allergenCow, setCowAllergen] = useState(false);
  const [ allergenWheat, setWheatAllergen] = useState(false);
  const [ allergenFish, setFishAllergen] = useState(false);
  const [ ingredienti, setIngrediente ] = useState({1:""});
  const [ elementsRowCounter, setElemRowCounter] = useState(0);

  let counter = 0;

  const setterAllergeni = {setEggAllergen, setShrimpAllergen, setCowAllergen, setWheatAllergen, setFishAllergen};

  const allergens ={
    wheat: allergenWheat,
    egg: allergenEgg,
    cow: allergenCow,
    shrimp: allergenShrimp,
    fish: allergenFish,
  }
  function onCloseModal() {
    setOpenModal(false);
    setCowAllergen(false);
    setEggAllergen(false);
    setFishAllergen(false);
    setShrimpAllergen(false);
    setWheatAllergen(false);
    setIngrediente({});
    setElemRowCounter(0);
    setNomeElemento('');
    counter = 0;
  }

  const addIngredientClick = ()=>{
    setElemRowCounter(elementsRowCounter+1);
    counter = 0;
  }

  const handleIngredienteInput = (e) =>{
    const name = e.target.name;
    const newValue = e.target.value;
    setIngrediente(ingredienti =>({...ingredienti, [name]: newValue}));
  }

  function onSubmit(){
    console.log(ingredienti);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color='gray' outline><FaPlus /></Button>
      <Modal dismissible show={openModal} size="md" onClose={onCloseModal}>
        <Modal.Header>
          
        <div className="flex flex-wrap gap-14">
          <ModificaElementoSecondaLingua />
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Inserimento Elemento</h1>
        </div>
        
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="NomeElemento" value="Nome Elemento" />
              </div>
              <TextInput
                id="NomeElemento"
                placeholder="Nome Elemento"
                value={nomeElemento}
                onChange={(event) => setNomeElemento(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Prezzo" value="Prezzo" />
              </div>
            </div>
            <div className="mb-2 block space-y-2">
              <Label htmlFor="Allergeni" value="Allergeni:" />
              <div className='flex gap-4'>
              <>
                {allergenFish ?<Button color='dark' size="sm" pill><FaFishFins/></Button>: null}
                {allergenCow ? <Button color='dark' size="sm" pill><FaCow/></Button>: null}
                {allergenEgg ?<Button color='dark' size="sm" pill><FaEgg/></Button>: null}
                {allergenShrimp ? <Button color='dark' size="sm" pill><FaShrimp/></Button>: null}
                {allergenWheat ? <Button color='dark' size="sm" pill><LuWheat/></Button>: null}
              </>
              </div>
              <SelettoreAllergeni setterAllergeni={setterAllergeni} allergens={allergens}>
              </SelettoreAllergeni>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center">
          <Label htmlFor="Ingredienti" value="Ingredienti:" />
          <Button color='dark' size="xs" pill onClick={addIngredientClick}><FaPlus/></Button>
            {Array.from({length: elementsRowCounter}).map(() =>{
              counter++;
              return(
                <React.Fragment key={"Ingrediente"+counter}>
                    <div className="mb-2 block">
                      <TextInput 
                      id={"input"+counter} 
                      type="text"
                      sizing="sm"
                      value={ingredienti[{counter}]}
                      name={counter}
                      onChange={handleIngredienteInput} />
                    </div>
              </React.Fragment>
              );
            })}
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}