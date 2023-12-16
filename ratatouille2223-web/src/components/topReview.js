'use client';

import { FaBars } from "react-icons/fa";
import { FaArrowRightFromBracket, FaXmark } from "react-icons/fa6";
import { Button, Label } from 'flowbite-react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Link from "next/link";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

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
        <div className='m-2 xl:scale-150 justify-self-start' style={{width:"2.5em", height:"2.5em"}}>
        <Link href={"/SelettoreTavolo"} passHref >
          <Confirm icona={<FaXmark className='flex text-xl text-bold text-white'/>}>  Annullare l'ordine? </Confirm>
        </Link>
        </div>
        <img href="/" className='justify-self-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' style={{height:'3.6em'}} src='/logoicon.svg'/>
        <></>
      </div>
    </Navbar>
  );
}