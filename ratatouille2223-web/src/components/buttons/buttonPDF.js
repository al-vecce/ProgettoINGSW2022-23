'use client';

import { Button } from 'flowbite-react';
import { FaRegFilePdf } from "react-icons/fa6";

export default function ButtonPDF() {
  return (
    <div>
      <Button className='text-lg body-font font-quicksand tracking-widest bg-primary-accent1
      border border-none enabled:hover:bg-orange-500 focus:bg-orange-500 focus:border-transparent focus:ring-transparent'>
        <div className="flex flex-row gap-3 items-center">
          <FaRegFilePdf/>
          PDF
        </div>
      </Button>
    </div>
  );
}