'use client';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';
import SelettoreAllergeni from '../selettoreAllergeni';
import { FaPlus, FaEdit } from "react-icons/fa";
import ModificaElementoSecondaLingua from '../modificaElementoSecondaLingua';
import { FaEgg } from "react-icons/fa";
import { FaCow, FaFishFins, FaShrimp  } from "react-icons/fa6";
import { LuWheat } from "react-icons/lu";
import React from 'react';
import elementiService from '@/services/elementiService';
import CurrencyInput from 'react-currency-input-field';
import ButtonAllergen from './buttonAllergen';

function parseAllergens(oldAllergens){
  const allergens = {
    GLUTINE: false, LATTE:false, SOIA:false, UOVA:false, FRUTTAGUSCIO:false, PESCE:false, MOLLUSCHI:false, CROSTACEI:false, SEDANO:false, LUPINI:false
  }
  let split = oldAllergens.split(",");
  let res = {};
  split.map((element)=>{
    res = {...res, [element]: true}
  })
  Object.entries(allergens).map(([nome,value])=>{
    res = {...res, [nome]: res[nome] ? res[nome] : value}
  })
  return res;
}
function parseIngredients(ingredients){
  let split = ingredients.split(",");
  let res = {};
  split.map((element ,index)=>{
    res = {...res, [index+1]: element};
  })

  return res;
}

export default function ModificaElemento({categoria, refreshAction, oldAllergens, oldPriority, oldIngredients , oldName, oldPrice, oldIngredientiSL, oldNomeSL}) {
  const [ priority, setPriority ] = useState(oldPriority ? oldPriority : "1");
  const [ openModal, setOpenModal ] = useState(false);
  const [ nomeElemento, setNomeElemento ] = useState(oldName? oldName : '');
  const [ prezzo, setPrezzo ] = useState(oldPrice ? oldPrice : 0);
  const [ allergens, setAllergens ] = useState(parseAllergens(oldAllergens))
  const [ ingredienti, setIngrediente ] = useState(parseIngredients(oldIngredients));
  const [ elementsRowCounter, setElemRowCounter ] = useState(oldIngredients ? (oldIngredients.split(",").length)-1 : 0);
  const [ ingredientiSL, setIngredienteSL ] = useState(parseIngredients(oldIngredientiSL));
  const [ nomeElementoSL, setNomeElementoSL ] = useState(oldNomeSL);
  let counter = 0;

  function onCloseModal() {
    setAllergens(parseAllergens(oldAllergens));
    setIngrediente(parseIngredients(oldIngredients));
    setElemRowCounter(oldIngredients ? (oldIngredients.split(",").length)-1 : {1:""});
    setNomeElemento(oldName? oldName : '');
    setIngredienteSL(parseIngredients(oldIngredientiSL));
    setNomeElementoSL(oldNomeSL);
    counter = 0;
    setOpenModal(false);
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

      ingredientiString = ingredientiString.replace(",,", ",");
      ingredientiSLString = ingredientiSLString.replace(",,", ",");

      const data = await elementiServ.postElementoInCategoria([categoria, oldName, nomeElemento, prezzo, ingredientiString, allergeniString, priority, nomeElementoSL , ingredientiSLString ]);
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
      className='text-lg body-font font-quicksand tracking-widest bg-primary-icon
      border border-none enabled:hover:bg-gray-800 focus:bg-gray-800 focus:border-transparent focus:ring-transparent'
      style={{width:"2.3em", height:"2.3em"}}><FaEdit className='pl-1 pb-0.5 text-[26px]'/></Button>
      <Modal dismissible show={openModal} size="xl" onClose={onCloseModal}>
        <Modal.Header>
          
        <div className="flex flex-wrap gap-14">
          <ModificaElementoSecondaLingua oldIngredienti={ingredientiSL} oldNomeElemento={nomeElementoSL} setterIngredienti={setIngredienteSL} setterNomeElemento={setNomeElementoSL} />
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Modifica Elemento</h1>
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
                  value={prezzo}
                  allowNegativeValue={false}
                  decimalSeparator='.'
                  groupSeparator=' '
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
        </Modal.Body>
        <Modal.Footer className="font-medium text-gray-900 dark:text-white text-center">
            <div>
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
                        value={ingredienti[counter]}
                        name={counter}
                        onChange={handleIngredienteInput} />
                      </div>
                </React.Fragment>
                );
              })}
            </div>
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}