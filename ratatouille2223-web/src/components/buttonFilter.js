'use client';

import { Button } from 'flowbite-react';
import { FaFilter } from "react-icons/fa";


export default function ButtonFilter() {
  return (
    <div>
      <Button color='dark'>
        <FaFilter />
      </Button>
    </div>
  );
}