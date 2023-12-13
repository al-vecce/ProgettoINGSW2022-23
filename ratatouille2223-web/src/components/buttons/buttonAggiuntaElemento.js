'use client';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';
import SelettoreAllergeni from '../selettoreAllergeni';
import { FaPlus } from "react-icons/fa";
import ModificaElementoSecondaLingua from '../modificaElementoSecondaLingua';
import useCurrentUserData from '@/hooks/useCurrentUserData';
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
  const userData = useCurrentUserData();
  const elementiServ = new elementiService(userData ? userData.token : "");

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

  const handleIngredienteInput = (e) =>{
    const name = e.target.name;
    const newValue = e.target.value;
    setIngrediente(ingredienti =>({...ingredienti, [name]: newValue}));
  }

  async function onSubmit(){
    if(nomeElemento != '' && prezzo && priority){
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
      <Modal dismissible show={openModal} size="xl" onClose={onCloseModal}>
        <Modal.Header>
          
        <div className="flex flex-wrap gap-14">
          <ModificaElementoSecondaLingua oldIngredienti={ingredientiSL} oldNomeElemento={nomeElementoSL} setterIngredienti={setIngredienteSL} setterNomeElemento={setNomeElementoSL} />
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
                <Label htmlFor="Prezzo" value="Prezzo:" />
                <CurrencyInput
                  id={"CurrInput"+( categoria ? categoria: "")}
                  className="text-primary-icon"
                  placeholder="Inserire un prezzo"
                  defaultValue={prezzo}
                  decimalSeparator='.'
                  groupSeparator=' '
                  value={prezzo}
                  allowNegativeValue={false}
                  decimalsLimit={2}
                  onValueChange={(value) => setPrezzo(value)}
                  required
                />
              </div>
            </div>
            <div className="mb-2 block space-y-2">
              <Label htmlFor="Allergeni" value="Allergeni:" />
              <div className='flex gap-4'>
              <>
                {Object.entries(allergens).map(([nome,value])=>{
                  return(
                    allergens[nome] ? <ButtonAllergen statoIniziale={true} type={nome} /> : null
                  );
                  })
                }
              </>
              </div>
              <SelettoreAllergeni setAllergens={setAllergens} allergens={allergens}>
              </SelettoreAllergeni>
            </div>
            <div className="mb-2 block space y-1">
            <Label htmlFor="Priorità" value="Priorità:" />
                <CurrencyInput
                  className="text-primary-icon"
                  id={"PriorInput"+( priority ? priority: "")}
                  placeholder="Inserire una priorità"
                  defaultValue={priority}
                  allowNegativeValue={false}
                  disableGroupSeparators={true}
                  value={priority}
                  decimalsLimit={0}
                  onValueChange={(value) => setPriority(value)}
                />
            </div>
          </div>
          <div className='flex-wrap '>
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
            </div>
        </Modal.Body>
        <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center">
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}