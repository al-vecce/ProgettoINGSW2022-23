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
import elementiService from '@/services/elementiService';

export default function AggiungiElemento({categoria, refreshAction}) {
  const [openModal, setOpenModal] = useState(false);
  const [nomeElemento, setNomeElemento] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [ allergens, setAllergens] = useState({
    GLUTINE: false, LATTE:false, SOIA:false, UOVA:false, FRUTTAGUSCIO:false, PESCE:false, MOLLUSCHI:false, CROSTACEI:false, SEDANO:false, LUPINI:false
  })
  const [ ingredienti, setIngrediente ] = useState({1:""});
  const [ elementsRowCounter, setElemRowCounter] = useState(0);

  let counter = 0;

  function onCloseModal() {
    setOpenModal(false);
    setAllergens({
      GLUTINE: false, LATTE:false, SOIA:false, UOVA:false, FRUTTAGUSCIO:false, PESCE:false, MOLLUSCHI:false, CROSTACEI:false, SEDANO:false, LUPINI:false
    });
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

  async function onSubmit(){
    const elementiServ = new elementiService();
    let ingredientiString = "";
    let allergeniString = "LATTE,UOVA,";
    allergeniString = allergeniString.concat(
    (allergens.LATTE ? "LATTE,": ""),
    (allergens.PESCE ? "PESCE,": ""),
    (allergens.CROSTACEI ? "CROSTACEI," : ""),
    (allergens.FRUTTAGUSCIO ? "FRUTTAGUSCIO," : ""),
    (allergens.LUPINI ? "LUPINI," : ""),
    (allergens.GLUTINE ? "GLUTINE," : ""),
    (allergens.MOLLUSCHI ? "MOLLUSCHI," : ""),
    (allergens.SEDANO ? "SEDANO," : ""),
    (allergens.SOIA ? "SOIA," : ""),
    (allergens.UOVA ? "UOVA," : "")
    );

    Object.keys(ingredienti).forEach(([key,index])=>{
      ingredientiString = (`${ingredientiString}${ingredienti[key]},`);
    });

    const data = await elementiServ.putElementoInCategoria([categoria, nomeElemento, 100, ingredientiString, allergeniString, 7, "mario" , "FuocoFatuo," ]);
    setAllergens({
      GLUTINE: false, LATTE:false, SOIA:false, UOVA:false, FRUTTAGUSCIO:false, PESCE:false, MOLLUSCHI:false, CROSTACEI:false, SEDANO:false, LUPINI:false
    });
    setIngrediente({});
    setElemRowCounter(0);
    setNomeElemento('');
    counter = 0;
    setOpenModal(false);
    refreshAction();
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} 
      className='p-4 text-lg text-primary-icon body-font rounded-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] font-quicksand tracking-widest bg-gray-300
      border border-none enabled:hover:bg-gray-300 enabled:hover:text-primary-icon focus:bg-gray-300 focus:border-transparent focus:ring-transparent focus:text-primary-icon'
      style={{width:"3em", height:"3em"}} ><FaPlus className='text-[24px]'/></Button>
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
                {allergens.PESCE ?<Button color='dark' size="sm" pill><FaFishFins/></Button>: null}
                {allergens.LATTE ? <Button color='dark' size="sm" pill><FaCow/></Button>: null}
                {allergens.UOVA ?<Button color='dark' size="sm" pill><FaEgg/></Button>: null}
                {allergens.MOLLUSCHI ? <Button color='dark' size="sm" pill><FaShrimp/></Button>: null}
                {allergens.GLUTINE ? <Button color='dark' size="sm" pill><LuWheat/></Button>: null}
              </>
              </div>
              <SelettoreAllergeni setterAllergeni={setAllergens} allergens={allergens}>
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