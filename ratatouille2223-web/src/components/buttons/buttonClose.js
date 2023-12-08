'use client';

import { Button } from 'flowbite-react';
import { IoLockClosedOutline } from "react-icons/io5";


export default function ButtonClose() {
  return (
    <div>
      <Button color='success'>
        <IoLockClosedOutline />
      </Button>
    </div>
  );
}