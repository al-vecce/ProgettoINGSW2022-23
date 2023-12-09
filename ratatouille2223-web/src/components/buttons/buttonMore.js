'use client';

import { Button } from 'flowbite-react';
import { redirect } from 'next/navigation';
import { FaAngleDown } from "react-icons/fa";

export default function ButtonMore({onClickAction}) {
  return (
      <Button onClick={onClickAction} color='dark'>
        <FaAngleDown />
      </Button>
  );
}