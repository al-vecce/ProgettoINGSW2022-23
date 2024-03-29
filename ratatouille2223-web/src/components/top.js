
'use client';

import { FaBars } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Button, Label } from 'flowbite-react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import HpSidebar from './hpsidebar';
import { useState, useEffect } from 'react';
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import useCurrentUserData from "@/hooks/useCurrentUserData";
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


export default function top() {
  const [showSidebar, setSidebarshow] = useState(false);
  const router = useRouter();
  const { logout } = useLogout();
  const [isAdmin, setisAdmin] = useState(false);
  const userData = useCurrentUserData()

  const onClickShowSidebar = ()=>{
    if(userData){
      if(`${userData.currentUserRole}` === "AMMINISTRATORE"){
        setisAdmin(true);
      }
      setSidebarshow(showSidebar => !showSidebar)
    }
  }

  const onClickLogout = () =>{
    logout();
    router.refresh();
  };
  return (
    <Navbar theme={customTheme} className="flex sticky-top-0 justify-between lg:xl:h-24 max-h-32 shadow-lg rounded-b-2xl
    bg-cover bg-center bg-[url('/header-splash.svg')]"
    style={{zIndex: '88', alignItems:'center'}}>
      
      <div className='w-full flex justify-between' style={{alignItems:'center'}}>
        <div className='m-2 xl:scale-150' style={{width:"2.5em", height:"2.5em"}}>
          {!showSidebar && <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                style={{width:"2.5em", height:"2.5em"}}
                onClick={onClickShowSidebar}>
            <FaBars className='flex text-lg text-primary-icon'/>
          </Button>}
        </div>
        <div className="body-font font-quicksand text-white drop-shadow-lg font-semibold tracking-widest uppercase text-2xl xl:text-4xl">Homepage</div>
        <div className='m-2'>
          <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar className="xl:scale-150" alt="User settings" img="/Logo.png" rounded />
              }
            >
              <Dropdown.Item  className="text-primary-error mr-5"><FaArrowRightFromBracket className='flex text-lg mr-5'/><Label onClick={onClickLogout} >Disconnessione</Label></Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {showSidebar ? <div className="box w-screen h-screen backdrop backdrop-opacity-100 backdrop-brightness-[0.70] absolute top-0 left-0" onClick={onClickShowSidebar}/> : null}
      {showSidebar ? <HpSidebar isAdmin={isAdmin}/> : null}
    </Navbar>
  );
}

//<Navbar.Toggle/>
//<FaBars className='flex text-lg text-primary-icon'/>