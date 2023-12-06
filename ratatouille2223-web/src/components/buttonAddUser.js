
'use client';

import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useState } from 'react';

export default function ButtonAddUser() {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setUsername('');
  }
  function addUser(formEvent){
    formEvent.preventDefault();
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Aggiungi Utente</Button>
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nuovo utente</h3>
            <form className="flex max-w-md flex-col gap-4">
                <div className="mb-2 block">
                    <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                </div>
                <TextInput id="password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="flex justify-between">
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="categoria" value="Categoria" />
                        </div>
                        <Select id="categoria" required>
                                <option>AddettoSala</option>
                                <option>Amministratore</option>
                                <option>Supervisore</option>
                        </Select>
                    </div>
                </div>
                <div className="w-full">
                <Button onClick={addUser(formData)} type="submit">Create</Button>
                </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
