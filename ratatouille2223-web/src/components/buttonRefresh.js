'use client';

import { Button } from 'flowbite-react';
import { FiRefreshCcw } from "react-icons/fi";


export default function ButtonRefresh() {
  return (
    <div>
      <Button color='dark'>
        <FiRefreshCcw />
      </Button>
    </div>
  );
}