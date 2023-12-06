'use client';

import { Button } from 'flowbite-react';
import { FaAngleDown } from "react-icons/fa";

export default function ButtonMore({onClickAction}) {
  return (
    <div>
      <Button color='dark' onClick={onClickAction}>
        <FaAngleDown />
      </Button>
    </div>
  );
}