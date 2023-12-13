'use client';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';
import SelettoreAllergeni from '../selettoreAllergeni';
import { FaPlus, FaMinus } from "react-icons/fa";
import ModificaElementoSecondaLingua from '../modificaElementoSecondaLingua';
import { FaEgg } from "react-icons/fa";
import { FaCow, FaFishFins, FaShrimp, FaXmark   } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import React from 'react';
import elementiService from '@/services/elementiService';
import CurrencyInput from 'react-currency-input-field';
import ButtonAllergen from './buttonAllergen';

export default function AggiungiElemento({categoria, refreshAction}) {
  const [ openModal, setOpenModal ] = useState(false);
  const [ nomeElemento, setNomeElemento ] = useState('');
  const [ prezzo, setPrezzo ] = useState(0);
  const [ priority, setPriority ] = useState("1");
  const [ allergens, setAllergens ] = useState({
    GLUTINE: false, LATTE:false, SOIA:false, UOVA:false, FRUTTAGUSCIO:false, PESCE:false, MOLLUSCHI:false, CROSTACEI:false, SEDANO:false, LUPINI:false
  })
  const [ ingredienti, setIngrediente ] = useState({1:""});
  const [ elementsRowCounter, setElemRowCounter ] = useState(0);
  let counter = 0;
  const [ ingredientiSL, setIngredienteSL ] = useState({1:""});
  const [ nomeElementoSL, setNomeElementoSL ] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setAllergens({
      GLUTINE: false, LATTE:false, SOIA:false, UOVA:false, FRUTTAGUSCIO:false, PESCE:false, MOLLUSCHI:false, CROSTACEI:false, SEDANO:false, LUPINI:false
    });
    setIngrediente({});
    setIngredienteSL({1:""});
    setElemRowCounter(0);
    setNomeElemento('');
    setNomeElementoSL("");
    counter = 0;
  }

  const addIngredientClick = ()=>{
    setElemRowCounter(elementsRowCounter+1);
    counter = 0;
  }

  const removeIngredientClick = ()=>{
    if(elementsRowCounter-1 >= 0)
    {setElemRowCounter(elementsRowCounter-1);}
  }

  const handleIngredienteInput = (e) =>{
    const name = e.target.name;
    const newValue = e.target.value;
    setIngrediente(ingredienti =>({...ingredienti, [name]: newValue}));
  }

  async function onSubmit(){
    if(nomeElemento != '' && prezzo && priority){
      const elementiServ = new elementiService();
      let ingredientiString = "";
      let ingredientiSLString = "";
      let allergeniString = "";
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
      allergeniString === "" ? allergeniString="," : null;

      Object.keys(ingredienti).forEach(([key,index])=>{
        ingredientiString = (`${ingredientiString}${ingredienti[key]},`);
      });
      Object.keys(ingredientiSL).forEach(([key,index])=>{
        ingredientiSLString = (`${ingredientiSLString}${ingredientiSL[key]},`);
      });
      ingredientiString === "" ? ingredientiString="," : null;
      ingredientiSLString === "" ? ingredientiSLString="," : null;

      const data = await elementiServ.putElementoInCategoria([categoria, nomeElemento, prezzo, ingredientiString, allergeniString, priority, nomeElementoSL , ingredientiSLString ]);
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
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} 
      className='p-4 text-lg text-primary-icon body-font rounded-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] font-quicksand tracking-widest bg-gray-300
      border border-none enabled:hover:bg-gray-400 enabled:hover:text-primary-icon focus:bg-gray-300 focus:border-transparent focus:ring-transparent focus:text-primary-icon'
      style={{width:"3em", height:"3em"}} ><FaPlus className='text-[24px]'/></Button>
      <Modal theme={{
        "root": {
          "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
          "show": {
            "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
            "off": "hidden"
          },
          "sizes": {
            "2xl": "max-w-[680px]",
          },
        },
        "content": {
          "base": "relative h-full w-full p-4",
          "inner": "relative rounded-lg bg-white shadow dark:bg-gray-700 max-w-[90vh]"
        },
        "body": {
          "base": "p-6 flex-none",
          "popup": "pt-0"
        },
        "header": {
          "base": "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5",
          "popup": "p-2 border-b-0",
          "title": "text-xl font-medium text-gray-900 dark:text-white",
          "close": {
            "base": "ml-auto flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            "icon": "h-5 w-5"
          }
        },
        "footer": {
          "base": "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
          "popup": "border-t"
        }
      }}
      dismissible show={openModal} size="2xl" onClose={onCloseModal}>
        <div className='flex-none p-4'>
          <Modal.Header>
            <div className="flex flex-wrap gap-14 items-center">
              <ModificaElementoSecondaLingua oldIngredienti={ingredientiSL} oldNomeElemento={nomeElementoSL} setterIngredienti={setIngredienteSL} setterNomeElemento={setNomeElementoSL} />
              <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Inserimento Elemento</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col overflow-hidden gap-5">
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
              <div className='flex flex-rows flex-nowrap items-stretch justify-between'>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Prezzo" value="Prezzo:" />
                  </div>
                  <CurrencyInput
                    id={"PriceInput"+( categoria ? categoria: "")}
                    className="text-primary-icon rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Inserire un prezzo"
                    defaultValue={0}
                    decimalSeparator='.'
                    groupSeparator=' '
                    value={prezzo}
                    allowNegativeValue={false}
                    decimalsLimit={2}
                    onValueChange={(value) => setPrezzo(value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Priorità" value="Priorità:" />
                  </div>
                  <CurrencyInput
                    id={"PriorityInput"+( categoria ? categoria: "")}
                    className="text-primary-icon rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                    placeholder="Inserire un prezzo"
                    defaultValue={1}
                    decimalSeparator='.'
                    groupSeparator=' '
                    value={priority}
                    allowNegativeValue={false}
                    decimalsLimit={2}
                    onValueChange={(value) => setPriority(value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col flex-wrap items-stretch justify-between">
                <Label className='pb-2' htmlFor="Allergeni" value="Allergeni:" />
                <div className='flex flex-rows flex-wrap gap-3 items-center justify-start'>
                  <SelettoreAllergeni setAllergens={setAllergens} allergens={allergens}/>
                  {Object.entries(allergens).map(([nome,value])=>{
                    return(
                      allergens[nome] ? <ButtonAllergen statoIniziale={true} type={nome} /> : null
                    );
                    })
                  }
                </div>
              </div>
              <div className="flex flex-col flex-wrap">
                <Label htmlFor="Ingredienti" value="Ingredienti:" />
                <div className='flex flex-rows flex-wrap gap-2 items-center justify-start'>
                  {Array.from({length: elementsRowCounter}).map(() =>{
                    counter++;
                    return(
                      <React.Fragment key={"Ingrediente"+counter}>
                        <div className="flex flex-row gap-1 block">
                          <TextInput
                          id={"input"+counter} 
                          type="text"
                          sizing="sm"
                          value={ingredienti[{counter}]}
                          name={counter}
                          onChange={handleIngredienteInput}
                          style={{ height:"3.2em" }} />
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <Button theme={{pill: { 
                    off: "rounded-full text-white bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-primary-icon focus:border-transparent focus:ring-transparent drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent", 
                    on: "rounded-full text-primary-icon bg-white enabled:hover:bg-gray-200 border border-[3px] border-primary-icon focus:bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent"}}}
                  pill={false}
                  onClick={removeIngredientClick}
                  style={{width:"2.3em", height:"2.3em"}}><FaMinus className='text-lg'></FaMinus></Button>
                  <Button theme={{pill: { 
                    off: "rounded-full text-white bg-primary-icon border border-none enabled:hover:bg-gray-800 focus:bg-primary-icon focus:border-transparent focus:ring-transparent drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent", 
                    on: "rounded-full text-primary-icon bg-white enabled:hover:bg-gray-200 border border-[3px] border-primary-icon focus:bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)] text-lg body-font font-quicksand tracking-widest focus:ring-transparent"}}}
                  pill={false}
                  style={{width:"2.3em", height:"2.3em"}}
                  onClick={addIngredientClick}><FaPlus className='text-xl'/></Button>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center items-center justify-center">
            <div className="flex justify-center p-2">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}