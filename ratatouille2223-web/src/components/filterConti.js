'use client';

import { Button, Select,  Label, Modal, TextInput, ListGroup, Navbar, TableRow, ButtonGroup } from 'flowbite-react';
import { useState } from 'react';
import { RangeSlider } from 'flowbite-react';

import { FaFilter } from "react-icons/fa";

export default function FilterConti() {
  const [openModal, setOpenModal] = useState(false);
  const [NumeroTavolo, setNumeroTavolo] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setNumeroTavolo('');
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className='text-lg text-primary-icon body-font rounded-r-lg font-quicksand tracking-widest bg-white
        border border-none enabled:hover:bg-primary-icon enabled:hover:text-white focus:bg-primary-icon focus:border-transparent focus:ring-transparent focus:text-white'
        style={{width:"2.3em", height:"2.3em"}}>
          <FaFilter className='text-xl'/>
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col flex-nowrap items-center space-y-6">
          <div className="text-primary-icon body-font font-quicksand tracking-widest text-3xl">Filtro Intervallo</div>
            <div hidden="true">
              <div className="mb-2 block">
                <Label htmlFor="NumeroTavolo" value="Numero Tavolo" />
              </div>
              <TextInput
                id="NumeroTavolo"
                placeholder="Numero Tavolo"
                value={NumeroTavolo}
                onChange={(event) => setNumeroTavolo(event.target.value)}
                required
              />
            </div>
            <div hidden="true">
                <div className="mb-1 block">
                    <Label htmlFor="default-range" value="Default" />
                </div>
                <RangeSlider id="default-range" />
            </div>
            <div className="flex flex-row flex-nowrap gap-10 justify-center">
                <div className="flex flex-col flex-nowrap justify-center">
                  <div className="mb-2 block">
                      <div className="text-primary-icon body-font font-quicksand tracking-widest text-lg">Orario Minimo</div>
                  </div>
                  <ButtonGroup className='flex flex-col gap-1 justify-center'>
                    <Label>Ore</Label>
                    <Select id="OreMin" required>
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
                    <Select id="MinutiMin" required>
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
                  </ButtonGroup>
                </div>
                <div className="flex flex-col flex-nowrap justify-center">
                  <div className="mb-2 block">
                  <div className="text-primary-icon body-font font-quicksand tracking-widest text-lg">Orario Massimo</div>
                  </div>
                  <ButtonGroup className="flex flex-col gap-1 justify-center">
                  <Label>Ore</Label>
                  <Select id="OreMax" required>
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
                  <Select id="MinutiMax" required>
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
                  </ButtonGroup>
              </div>
            </div>
            <Button className='text-lg body-font font-quicksand tracking-widest bg-primary-3
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