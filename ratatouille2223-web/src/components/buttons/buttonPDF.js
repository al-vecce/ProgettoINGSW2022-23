'use client';

import { Button } from 'flowbite-react';
import { FaRegFilePdf } from "react-icons/fa6";

export default function ButtonPDF() {
  return (
    <div>
      <Button color='warning'> 
        <FaRegFilePdf /> 
      </Button>
    </div>
  );
}