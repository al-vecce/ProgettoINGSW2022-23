'use client';

import { Button } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import { IoMdClose } from "react-icons/io";

export default function TopElementi() {
  return (
    <Navbar className='bg-green-600' fluid rounded>
      <Navbar.Brand>
      <Button color='gray'> <IoMdClose /> </Button>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Menù - Nome Categorie</span>
    </Navbar>
  );
}