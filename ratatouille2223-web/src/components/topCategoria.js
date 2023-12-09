'use client';

import { Button } from 'flowbite-react';
import { Navbar } from 'flowbite-react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
export default function TopCategoria() {
  const router = useRouter();
  function goBackToHomepage(){
    router.push("/Homepage");
  }
  return (
    <Navbar className='bg-green-600' fluid rounded>
      <Navbar.Brand>
          <Button onClick={goBackToHomepage} color='gray'>
            <IoIosArrowBack /> 
          </Button>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Menù - Categorie </span>
    </Navbar>
  );
}
