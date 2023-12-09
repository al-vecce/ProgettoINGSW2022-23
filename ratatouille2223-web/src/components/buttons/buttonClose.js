'use client';

import { Button } from 'flowbite-react';
import { FaXmark } from "react-icons/fa6";


export default function ButtonClose() {
  return (
    <div>
      <Button className='text-lg body-font font-quicksand tracking-widest bg-primary-3
      border border-none enabled:hover:bg-green-700 focus:bg-green-700 focus:border-transparent focus:ring-transparent'>
        <div className="flex flex-row gap-3 items-center">
          <FaXmark/>
          Chiudi
        </div>
      </Button>
    </div>
  );
}