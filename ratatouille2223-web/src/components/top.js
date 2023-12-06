
'use client';

import { Button } from 'flowbite-react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import HpSidebar from './hpsidebar';
import { useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';

export default function top() {
  return (
    <Navbar className='bg-green-600' fluid rounded>
      <Navbar.Brand>
      <HpSidebar/>
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
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Homepage</span>
    </Navbar>
  );
}
