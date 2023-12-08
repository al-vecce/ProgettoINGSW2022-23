'use client';

import { Button } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
export default function TopCategoria() {
  return (
    <Navbar className='bg-green-600' fluid rounded>
      <Navbar.Brand>
        <Link href={process.env.NEXT_PUBLIC_NEXTJSAPPHOSTNAME + "/Homepage"}>
          <Button  color='gray'> 
            <IoIosArrowBack /> 
          </Button>
      </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Menù - Categorie </span>
    </Navbar>
  );
}
