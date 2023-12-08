'use client';

import { Button } from 'flowbite-react';
import { FaAngleDown } from "react-icons/fa";

export default function ButtonMore() {
  return (
    <div>
      <Button color='dark'>
        <FaAngleDown />
      </Button>
    </div>
  );
}