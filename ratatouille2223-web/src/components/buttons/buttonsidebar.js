'use client';

import { Button } from 'flowbite-react';
import { CgDetailsMore } from 'react-icons/cg';

export default function Buttonsidebar() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>
        <CgDetailsMore className="mr-0 h-5 w-5" />
      </Button>
    </div>
  );
}