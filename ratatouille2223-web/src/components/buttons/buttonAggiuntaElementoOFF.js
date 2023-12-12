'use client';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';

import { FaPlus } from "react-icons/fa";
import React from 'react';
import elementiService from '@/services/elementiService';
import CurrencyInput from 'react-currency-input-field';
import { openFoodFactsService } from '@/services/openFoodFactsService';

export default function AggiungiElementoOFF({categoria, refreshAction}) {
  const [ openModal, setOpenModal ] = useState(false);
  const [ openFrontModal, setOpenFrontModal ] = useState(false);
  const [ codiceElemento, setCodiceElemento ] = useState();
  const [ nomeElemento, setNomeElemento ] = useState('');
  const [ prezzo, setPrezzo ] = useState(0);
  const [ priority, setPriority ] = useState(1);
  const [ allergens, setAllergens ] = useState(",")
  const [ ingredienti, setIngrediente ] = useState(",");
  const [ errorProdottoNonRiconosciuto, setErrorProdottoNonRiconosciuto ] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setOpenFrontModal(false);
    setAllergens(",");
    setCodiceElemento();
    setPriority(1);
    setPrezzo();
    setIngrediente(",");
    setErrorProdottoNonRiconosciuto(false);
    setNomeElemento('');
  }

  async function onSubmitFrontForm(){
    if(codiceElemento){
        const offServ = new openFoodFactsService();
        let data = null;
        try{ data = await offServ.getElementoPerCodiceABarre(codiceElemento);}
        catch(error){
            console.error("Network error con richiesta di fetch per elemento OFF\n errore:" + error.toString());
        }
        if(data){
            if(data.status === 1){
                setOpenModal(true);
                if(data.product){
                    let allergeniString = data.product.allergens ? data.product.allergens : "";
                    let ingredientiString = data.product.ingredients_text_with_allergens_it ? data.product.ingredients_text_with_allergens_it : ",";
                    let allergeniFromIngredients = ingredientiString.match(/"<span class=\."\.*"<\/span>"/g)
                    if(allergeniFromIngredients === null)
                        allergeniFromIngredients = "";
                    allergeniString = allergeniString.concat(allergeniFromIngredients);
                    if(allergeniString === "")
                        allergeniString = ",";
                    ingredientiString = ingredientiString.replaceAll("</span>","");
                    ingredientiString = ingredientiString.replaceAll("<span class=\"allergen\">","");
                    allergeniString = allergeniString.replaceAll("</span>","");
                    allergeniString = allergeniString.replaceAll("<span class=\"allergen\">","");
                    setIngrediente(ingredientiString);
                    setAllergens(allergeniString);
                    setNomeElemento(data.product.product_name_it ? data.product.product_name_it : (data.product.product_name ? data.product.product_name : "Prodotto senza nome!"));

                }else{
                    setIngrediente("Nessun dato presente!,")
                    setAllergens("Nessun dato presente!,");
                    setNomeElemento("Nessun dato presente!")
                }
                setOpenFrontModal(false);
                setErrorProdottoNonRiconosciuto(false);
            }else{
                setErrorProdottoNonRiconosciuto(true);
            }
        }
    }
    else{
        setErrorProdottoNonRiconosciuto(true);
    }
  }

  async function onSubmit(){
    const elementiServ = new elementiService();
    let ingredientiString = ingredienti;
    let allergeniString = allergens;

    allergeniString === "" ? allergeniString="," : null;
    ingredientiString === "" ? ingredientiString="," : null;



    const data = await elementiServ.putElementoInCategoriaConOFF([categoria, nomeElemento, prezzo, ingredientiString, allergeniString, priority, nomeElemento , ingredientiString, codiceElemento ]);
    setIngrediente(",");
    setAllergens(",");
    setNomeElemento("");
    setPrezzo();
    setPriority(1);
    setCodiceElemento();
    setErrorProdottoNonRiconosciuto(false);
    setOpenModal(false);
    setOpenFrontModal(false);
    refreshAction();
  }

  return (
    <>
      <Button onClick={() => {setOpenFrontModal(true)}} 
      className='p-4 text-lg text-primary-icon body-font rounded-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] font-quicksand tracking-widest bg-gray-300
      border border-none enabled:hover:bg-gray-300 enabled:hover:text-primary-icon focus:bg-gray-300 focus:border-transparent focus:ring-transparent focus:text-primary-icon'
      style={{width:"3em", height:"3em"}} ><FaPlus className='text-[24px]'/></Button>
      <Modal show={openModal} size="xl" onClose={onCloseModal}>
        <Modal.Header>
        <div className="flex flex-wrap gap-14">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Nuovo Elemento</h1>
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
                disabled={true}
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
            <div className="mb-2 text-center text-gray-900 block space-y-2">
              <Label htmlFor="Allergeni" className='text-lg' value="Allergeni" />
              <div className='text-sm '>
                {allergens ? (allergens === "," ? <Label htmlFor="allrgEmpty" className='text-sm text-gray-400' value="Questo elemento non possiede allergeni" /> : allergens) : ""}
              </div>
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
            <div >
            <Label htmlFor="Ingredienti" className='text-lg' value="Ingredienti" />
                <div className='text-sm '>
                {ingredienti ? ingredienti : ""}
                </div>
            </div>
        </Modal.Footer>
        <div className="flex justify-center p-2">
              <Button onClick={onSubmit} color='success'>Conferma</Button>
        </div>
      </Modal>
      <Modal dismissible show={openFrontModal} size="xl" onClose={onCloseModal}>
        <Modal.Header>
        <div className="flex flex-wrap gap-14">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white text-center">Inserimento Elemento</h1>
        </div>
        </Modal.Header>
        <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="NomeElemento" value="Inserire numero codice a barre" />
              </div>
              <div className='space-x-2'>
              <CurrencyInput
                  className="text-primary-icon"
                  id={"CodiceInput"}
                  placeholder="Inserire il codice a barre"
                  allowNegativeValue={false}
                  value={ codiceElemento }
                  decimalsLimit={0}
                  disableGroupSeparators={true}
                  onValueChange={(value) => setCodiceElemento(value)}
                  required
                />
                {errorProdottoNonRiconosciuto ? <Label htmlFor="error" color={"failure"} value="Prodotto non riconosciuto" /> : null}
                </div>
            </div>
        </Modal.Body>
        <div className="flex justify-center p-2">
              <Button onClick={()=>{onSubmitFrontForm()}} color='success'>Conferma</Button>
        </div>
      </Modal>
    </>
  );
}