'use client';

import { Button } from 'flowbite-react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';

export default function TopUtenze() {
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
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="/Logo.png" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">name</span>
          </Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Utenze</span>
    </Navbar>
  );
}
