'use client';

import { Button } from 'flowbite-react';
import { IoTrashOutline } from "react-icons/io5";


export default function ButtonDelete() {
  return (
    <div>
      <Button color='success'>
        <IoTrashOutline />
      </Button>
    </div>
  );
}