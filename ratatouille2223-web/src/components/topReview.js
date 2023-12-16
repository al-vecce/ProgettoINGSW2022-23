'use client';

import { FaBars } from "react-icons/fa";
import { FaArrowRightFromBracket, FaXmark } from "react-icons/fa6";
import { Button, Label, Modal } from 'flowbite-react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Link from "next/link";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

import { useState } from "react";

import Confirm from "./buttons/buttonConferma";

const customTheme = {
  root: {
    inner: {
      base: "flex-1 w-2/3 mx-auto",
      fluid: "off",
    },
  },
  toggle: {
    base: "",
    icon: "",
  }
};

export default function TopReview() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { logout } = useLogout();
  const onClickLogout = () =>{
    logout();
    router.refresh();
  };
  return (
    <Navbar theme={customTheme} className="flex sticky top-0 justify-between lg:xl:h-24 max-h-32 shadow-lg rounded-b-2xl
    bg-cover bg-center bg-[url('/header-splash.svg')]"
    style={{alignItems:'center', zIndex: '50'}}>
      <div className='grid grid-cols-3' style={{alignItems:'center'}}>
        <div className='m-2 xl:scale-150 justify-self-start' >
        <Button theme={{base: "shadow-xl w-[30%] h-[60px] rounded-md body-font font-quicksand tracking-wide bg-white items-center justify-center font-bold",
                            color: "",
                            inner: {base:"flex flex-rows flex-nowrap justify-between"}}} 
                            className="shadow-xl rounded-md border border-none focus:border-transparent focus:ring-transparent justify-stretch"
                            style={{width:"3em", height:"3em"}}
                            onClick={() => setOpenModal(true)}><FaXmark className='flex bg-white text-xl text-bold text-primary-error'/></Button>
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-primary-icon">
                Annullare l'ordine?
              </h3>
              <div className="flex content-stretch items-stretch justify-center gap-4 drop-shadow-lg">
              <Link href={"/SelettoreTavolo"} passHref >
                <Button color="failure" className='border-4 border-transparent focus:ring-transparent'>
                  Conferma
                </Button>
                </Link>
                <Button color="gray" className='border-4 border-primary-icon focus:ring-transparent' onClick={() => {setOpenModal(false)}}>
                  Annulla
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        </div>
        <img href="/" className='justify-self-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' style={{height:'3.6em'}} src='/logoicon.svg'/>
        <></>
      </div>
    </Navbar>
  );
}