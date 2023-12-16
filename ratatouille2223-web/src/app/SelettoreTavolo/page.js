'use client'

import React, { useState } from 'react';

import TopSelettoreTavolo from '@/components/topSelettoreTavolo';
import CurrencyInput from 'react-currency-input-field';
import { Button, Radio, Label } from 'flowbite-react';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { tableSelectorService } from '@/services/tableSelectorService';
import { useRouter } from 'next/navigation';


export default function page() {

  const [table, setTable] = useState(1);
  const [ openConto, setOpenConto] = useState("true");
  const currentUser = useCurrentUserData();
  const [errorTavoloConContoGiaAperto, setErrorTavoloConContoGiaAperto] = useState(false);
  const [ errorTavoloSenzaContoAperto, setErrorTavoloSenzaContoAperto] = useState(false);
  const router = useRouter();
  
  const resetErrors = ()=>{
    setErrorTavoloConContoGiaAperto(false);
    setErrorTavoloSenzaContoAperto(false);
  }
  const onMinusClick = () => {
    if(table > 0){
     setTable(table-1);
     resetErrors();
    }
 }
 const onPlusClick = () =>{
   setTable(table+1);
   resetErrors();
 }
  const onClickConferma = ()=>{
    console.log(openConto);
    if(currentUser){
      const tableSelectorServ = new tableSelectorService(currentUser ? currentUser.token : "");
      tableSelectorServ.postTavoloToGetStatus(table).then(res=>{
        if(res){
          switch(openConto){
            case "true":
              if(res.table){
                router.push("/SelettoreTavolo/GestioneOrdinazione?tavolo=" + table);
              }
              else{
                setErrorTavoloConContoGiaAperto(true);
                setErrorTavoloSenzaContoAperto(false);
              }
              break;
            case "false":
              if(res.table){
                setErrorTavoloSenzaContoAperto(true);
                setErrorTavoloConContoGiaAperto(false);
              }
              else{
                router.push("/SelettoreTavolo/GestioneOrdinazione?tavolo=" + table + "&checkID=" + (res.check_id ? res.check_id : ""));
              }
              break;
            default:
              break;
          }
        }
      }).catch(e=>{alert(e);});
    }else{
      alert("Try again!");
    }
  }
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopSelettoreTavolo style={{zIndex: '2'}}/>
      <div className='flex p-20 items-center justify-center' style={{zIndex: '1'}}>
        <div className='w-[1000px] p-20 bg-primary-2 items-center justify-center'>
        {errorTavoloConContoGiaAperto ? <div htmlFor="error" className='text-red-700' > Tavolo con conto già aperto!</div> : null}
        {errorTavoloSenzaContoAperto ? <div htmlFor="error" className='text-red-700' > Questo tavolo non possiede un conto aperto!</div> :null}
        <Button size='sm' color="gray" onClick={(e) => { onPlusClick(); }}><h1>+</h1></Button>
        <CurrencyInput
                    id={"TableInput"}
                    className="text-primary-icon rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                    defaultValue={1}
                    decimalSeparator='.'
                    disableGroupSeparators={true}
                    value={table}
                    allowNegativeValue={false}
                    decimalsLimit={2}
                    onValueChange={(value) => {setTable(value);resetErrors();}}
                    required
                  />
          <Button size='sm' color="gray" onClick={(e) => { onMinusClick();  }}><h1>-</h1></Button>
          <div className='flex p-20 items-center justify-center text-primary-icon'>
          <fieldset onChange={(e)=>{setOpenConto(e.target.value); resetErrors();}} className="flex max-w-md flex-col gap-4">
            <div className="flex items-center gap-2">
              <Radio id="apriconto" name="countries" value="true" defaultChecked />
              <Label htmlFor="united-state">Apri conto</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="modificaconto" name="countries" value="false" />
              <Label htmlFor="united-state">Modifica conto aperto</Label>
            </div>
          </fieldset>
          <div className='flex p-20 items-center justify-center text-primary-icon'>
            <Button size='sm' color="gray" onClick={onClickConferma}><h1>Conferma</h1></Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}