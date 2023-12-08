'use client';

import { Button } from 'flowbite-react';
import { FiRefreshCcw } from "react-icons/fi";


export default function ButtonRefresh({onClickAction}) {
  return (
    <div>
      <Button onClick={onClickAction} color='dark'>
        <FiRefreshCcw />
      </Button>
    </div>
  );
}