'use client';

import { Button, Select,  Label, Modal, TextInput, ListGroup, Navbar, TableRow, ButtonGroup } from 'flowbite-react';
import { useState } from 'react';
import { RangeSlider } from 'flowbite-react';

export default function FilterConti() {
  const [openModal, setOpenModal] = useState(false);
  const [NumeroTavolo, setNumeroTavolo] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setNumeroTavolo('');
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Filtro intervallo</h3>
            <div>
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
            <div>
                <div className="mb-1 block">
                    <Label htmlFor="default-range" value="Default" />
                </div>
                <RangeSlider id="default-range" />
            </div>
            <div className="relative">
                <div className="mb-2 block">
                    <Label htmlFor="Orario Minimo" value="Orario Minimo" />
                </div>
                <ButtonGroup>
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
                <div className="mb-2 block">
                    <Label htmlFor="Orario Massimo" value="Orario Massimo" />
                </div>
                <ButtonGroup>
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
            <div className="w-full">
              <Button color='success'>Conferma</Button>
            </div>
          </div>
        
        </Modal.Body>
      </Modal>
    </>
  );
}