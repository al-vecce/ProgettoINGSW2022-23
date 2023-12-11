'use client';

import { Button, Select,  Label, Modal, TextInput, ButtonGroup } from 'flowbite-react';
import { useState } from 'react';
import { RangeSlider } from 'flowbite-react';
import { Datepicker } from 'flowbite-react';

import { FaFilter } from "react-icons/fa";

export default function FilterContiChiusi({oreMinOld, minMinOld, oreMaxOld, minMaxOld, minDate, maxDate, setter}) {

  const [openModal, setOpenModal] = useState(false);
  const today = new Date();
  
  const [ oreMin, setOreMin] = useState(oreMinOld ? oreMinOld : "00");
  const [ minMin, setMinutesMin] = useState(minMinOld ? minMinOld : "00");
  const [ oreMax, setOreMax] = useState(oreMaxOld ? oreMaxOld : "00");
  const [ minMax, setMinutesMax] = useState(minMaxOld ? minMaxOld : "00");

  const [ minData, setMinData ] = useState(minDate ? minDate : today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString());
  const [ maxData, setMaxData ] = useState(maxDate ? maxDate : today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString());

  function onCloseModal() {
    setOpenModal(false);
  }

  function onSubmitForm(){
    setter.setMinutesMax(minMax);
    setter.setMinutesMin(minMin);
    setter.setOreMax(oreMax);
    setter.setOreMin(oreMin);
    setter.setMinData(minData);
    setter.setMaxData(maxData);
    setOpenModal(false);
  }

  const startingDate = new Date();

  const handleMinDateChange = (date) => {
    const temp = JSON.stringify(date).split('T');
    const temp2 = temp[0].replace('"','');
    setMinData(temp2);
  };
  const handleMaxDateChange = (date) => {
    const temp = JSON.stringify(date).split('T');
    const temp2 = temp[0].replace('"','');
    setMaxData(temp2);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className='text-lg text-primary-icon body-font rounded-r-lg font-quicksand tracking-widest bg-white
        border border-none enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-primary-icon focus:border-transparent focus:ring-transparent focus:text-white'
        style={{width:"2.3em", height:"2.3em"}}>
          <FaFilter className='text-xl'/>
      </Button>
      <Modal className="w-full h-full" show={openModal} onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col flex-nowrap items-center space-y-6">
          <div className="text-primary-icon body-font font-quicksand tracking-widest text-3xl">Filtro Intervallo</div>
            <div className="flex flex-row flex-nowrap gap-10 justify-center p-4">
                <div className="flex flex-col flex-nowrap justify-center">
                  <div className="mb-2 block">
                      <div className="text-primary-icon body-font font-quicksand tracking-widest text-lg">Orario Minimo</div>
                  </div>
                  <div className='flex flex-col gap-1 justify-center'>
                  <Datepicker 
                  language="it-IT" labelTodayButton="Oggi" labelClearButton="Annulla" weekStart={2}
                  onSelectedDateChanged={handleMinDateChange}
                  theme={{
                    popup: { root: { base: "sticky"},
                    footer:{button:{
                        today:"bg-primary-2 hover:bg-primary-3 enabled:focus:ring-transparent",
                        clear:"border border-gray-300 bg-white text-gray-900 enabled:focus:ring-transparent hover:bg-gray-100 "}}},
                        views: {
                        days:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        months:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        years:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        decades:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        }}}/>
                    <Label>Ore</Label>
                    <Select id="OreMin" 
                      value={oreMin}
                      onChange={(e)=>setOreMin(e.target.value)}
                    required>
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                    </Select>
                    <Label>Minuti</Label>
                    <Select id="MinutiMin"
                      value={minMin}
                      onChange={(e)=>setMinutesMin(e.target.value)}
                    required>
                        <option>00</option>
                        <option>05</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>55</option>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col flex-nowrap justify-center">
                  <div className="mb-2 block">
                  <div className="text-primary-icon body-font font-quicksand tracking-widest text-lg">Orario Massimo</div>
                  </div>
                  <div className="flex flex-col gap-1 justify-center">
                  <Datepicker 
                  language="it-IT" labelTodayButton="Oggi" labelClearButton="Annulla" weekStart={2}
                  onSelectedDateChanged={handleMaxDateChange}
                  theme={{
                    popup: { root: { base: "sticky"},
                    footer:{button:{
                        today:"bg-primary-2 hover:bg-primary-3 enabled:focus:ring-transparent",
                        clear:"border border-gray-300 bg-white text-gray-900 enabled:focus:ring-transparent hover:bg-gray-100 "}}},
                        views: {
                        days:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        months:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        years:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        decades:{items:{item:{
                            selected:"bg-primary-2 text-white hover:bg-primary-3"
                        }}},
                        }}}/>
                  <Label>Ore</Label>
                  <Select id="OreMax" 
                    value={oreMax}
                    onChange={(e)=>setOreMax(e.target.value)}
                  required>
                      <option>00</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                  </Select>
                  <Label>Minuti</Label>
                  <Select id="MinutiMax" 
                    value={minMax}
                    onChange={(e)=>setMinutesMax(e.target.value)}
                  required>
                      <option>00</option>
                      <option>05</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                      <option>25</option>
                      <option>30</option>
                      <option>35</option>
                      <option>40</option>
                      <option>45</option>
                      <option>50</option>
                      <option>55</option>
                  </Select>
                  </div>
              </div>
            </div>
            <Button onClick={onSubmitForm} className='text-lg body-font font-quicksand tracking-widest bg-primary-3
              border border-none enabled:hover:bg-green-700 focus:bg-green-700 focus:border-transparent 
              focus:ring-transparent drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]'>
                Conferma
            </Button>
          </div>
        
        </Modal.Body>
      </Modal>
    </>
  );
}