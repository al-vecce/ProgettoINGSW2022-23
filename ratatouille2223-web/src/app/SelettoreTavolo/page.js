'use client'

import React, { useState } from 'react';

import TopSelettoreTavolo from '@/components/topSelettoreTavolo';
import CurrencyInput from 'react-currency-input-field';
import { Button, Radio, Label } from 'flowbite-react';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { tableSelectorService } from '@/services/tableSelectorService';
import { useRouter } from 'next/navigation';


import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";


export default function page() {

  const [table, setTable] = useState(1);
  const [openConto, setOpenConto] = useState("true");
  const currentUser = useCurrentUserData();
  const [errorTavoloConContoGiaAperto, setErrorTavoloConContoGiaAperto] = useState(false);
  const [errorTavoloSenzaContoAperto, setErrorTavoloSenzaContoAperto] = useState(false);
  const router = useRouter();

  const resetErrors = () => {
    setErrorTavoloConContoGiaAperto(false);
    setErrorTavoloSenzaContoAperto(false);
  }
  const onMinusClick = () => {
    if (table > 0) {
      setTable(table - 1);
      resetErrors();
    }
  }
  const onPlusClick = () => {
    setTable(table + 1);
    resetErrors();
  }
  const onClickConferma = () => {
    console.log(openConto);
    if (currentUser) {
      const tableSelectorServ = new tableSelectorService(currentUser ? currentUser.token : "");
      tableSelectorServ.postTavoloToGetStatus(table).then(res => {
        if (res) {
          switch (openConto) {
            case "true":
              if (res.table) {
                router.push("/SelettoreTavolo/GestioneOrdinazione?tavolo=" + table);
              }
              else {
                setErrorTavoloConContoGiaAperto(true);
                setErrorTavoloSenzaContoAperto(false);
              }
              break;
            case "false":
              if (res.table) {
                setErrorTavoloSenzaContoAperto(true);
                setErrorTavoloConContoGiaAperto(false);
              }
              else {
                router.push("/SelettoreTavolo/GestioneOrdinazione?tavolo=" + table + "&checkID=" + (res.check_id ? res.check_id : ""));
              }
              break;
            default:
              break;
          }
        }
      }).catch(e => { alert(e); });
    } else {
      alert("Try again!");
    }
  }
  return (
    <div className='flex flex-col min-h-screen min-w-screen bg-white'>
      <TopSelettoreTavolo style={{ zIndex: '50' }} />
      <div className='flex pl-20 pr-20 pt-10 items-center justify-center' style={{ zIndex: '1' }}>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full pb-[40px] text-primary-icon text-center body-font font-quicksand tracking-wide'>
            <h1 className='body-font font-quicksand tracking-wide font-bold text-2xl'>RATATOUILLE 23</h1>
            <h1 className='body-font font-quicksand tracking-wide text-2xl'>Seleziona un Tavolo</h1>
          </div>
          <div className='w-full min-h-[400px] block bg-contain bg-no-repeat bg-center bg-[url("/rullo.svg")]
          scale-[1.2]'>
            <div className='flex flex-col pt-[120px] items-center justify-between scale[2] gap-4'>
              <div className='m-auto'>
              <Button theme={{base: "bg-primary-2",
                              color: "",}} 
                              className="rounded-md border border-none focus:border-transparent focus:ring-transparent justify-stretch" 
                              onClick={(e) => { onPlusClick(); }}><h1>+</h1></Button>
              </div>
              <CurrencyInput
                id={"TableInput"}
                className="w-[20%] text-primary-icon text-center rounded-lg bg-gray-100 border-gray-300 focus:border-black focus:ring-black"
                defaultValue={1}
                decimalSeparator='.'
                disableGroupSeparators={true}
                value={table}
                allowNegativeValue={false}
                decimalsLimit={2}
                onValueChange={(value) => { setTable(value); resetErrors(); }}
                required
              />
              <div>
              <Button theme={{base: "bg-primary-2",
                              color: "",}} 
                              className="rounded-md border border-none focus:border-transparent focus:ring-transparent justify-stretch"
                              onClick={(e) => { onMinusClick(); }}><h1>-</h1></Button>
              </div>
            </div>
          </div>
          <div className='w-full items-center justify-center text-primary-icon'>
            <fieldset onChange={(e) => { setOpenConto(e.target.value); resetErrors(); }} className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-4">
                <Radio className='scale-[1.3] text-primary-2 focus:ring-2 focus:ring-primary-2' 
                id="apriconto" name="countries" value="true" defaultChecked />
                <Label className="body-font font-quicksand tracking-wide text-xl" htmlFor="united-state">Apri conto</Label>
              </div>
              <div className="flex items-center gap-4">
                <Radio className='scale-[1.3] text-primary-2 focus:ring-2 focus:ring-primary-2' id="modificaconto" name="countries" value="false" />
                <Label className="body-font font-quicksand tracking-wide text-xl" htmlFor="united-state">Modifica conto aperto</Label>
              </div>
            </fieldset>
            {errorTavoloConContoGiaAperto ? <div htmlFor="error" className='text-red-700' > Tavolo con conto già aperto!</div> : null}
            {errorTavoloSenzaContoAperto ? <div htmlFor="error" className='text-red-700' > Questo tavolo non possiede un conto aperto!</div> : null}


            <div className='fixed left-0 bottom-0 w-screen h-[120px]'>
              <div className='p-8 flex items-center justify-evenly gap-4' style={{ zIndex: "50" }}>
                <Button theme={{
                  base: "w-[60%] shadow-xl h-[60px] rounded-lg body-font font-quicksand tracking-wide text-[10px] bg-primary-2 text-white font-bold items-center justify-evenly",
                  color: "",
                  inner: { base: "flex flex-rows flex-nowrap justify-evenly" }
                }}
                  className="border border-none focus:border-transparent focus:ring-transparent"
                  onClick={onClickConferma}><h1 className='body-font font-quicksand tracking-wide text-2xl'>CERCA </h1><FaCheck className='text-2xl' /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}