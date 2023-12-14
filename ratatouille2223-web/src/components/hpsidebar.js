'use client';

import { Button, Dropdown, Label } from 'flowbite-react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiUser, HiBookOpen, HiClipboard, HiInformationCircle, HiPrinter } from 'react-icons/hi';
import { CgDetailsMore } from 'react-icons/cg';
import { Avatar } from 'flowbite-react';

import { FaCalendarMinus, FaUserAlt, FaInfo } from "react-icons/fa";
import { FaNoteSticky, FaQrcode, FaChartLine } from "react-icons/fa6";
const sidebarButtonTheme = {
  base: "",
  inner: {
    base: "flex flex-row gap-4 items-center transition-all duration-200",
  }
}

export default function HpSidebar() {
  return ( 
    //<div className="box w-screen h-screen backdrop backdrop-opacity-100 backdrop-brightness-[0.70] absolute top-0 left-0">
        <div className="box w-64 h-screen sticky-left-0  rounded-r-[50px] shadow-lg bg-cover
        bg-[url('/sidebar-splash.svg')] absolute top-0 left-0" style={{zIndex: '90'}}>
            <div className='body-font font-quicksand drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] text-center tracking-widest uppercase text-[20.5px] pt-6 pr-4'>Ratatouille 23</div>
            <div className='flex flex-row flex-no-wrap pl-5 pr-5 pt-1 gap-1' style={{justifyContent:'center', alignItems:'center'}}>
              <img className='w-[50px] h-[50px] drop-shadow-sm' src='/logoicon.svg'/>
              {/*<div className='flex flex-col flex-wrap p-2 gap-2 font-light'>
                <div className='tracking-widest text-[12px]'>Nome Ristorante</div>
                <div className='tracking-widest text-[9px] italic'>Indirizzo Ristorante</div>
              </div>*/}
            </div>
            <div className='flex flex-col flex-no-wrap p-3 gap-4 body-font font-quicksand tracking-widest'>
              <Button theme={sidebarButtonTheme} href="/Homepage/StoricoConti" className='bg-transparent hover:bg-primary-1 hover:text-primary-2 focus:ring-transparent text-left'>
                <FaCalendarMinus className='scale-150'/>
                <p>Storico Conti</p>
              </Button>
              <Button theme={sidebarButtonTheme} href="/Homepage/Menu" className='bg-transparent hover:bg-primary-1 hover:text-primary-2 focus:ring-transparent text-left'>
                <FaNoteSticky className='scale-150'/>
                <p>Menù</p>
              </Button>

              <div className='body-font font-quicksand text-center tracking-widest text-[18px]'>- Amministratore -</div>
              
              <Button theme={sidebarButtonTheme} href="/Homepage/Utenze" className='bg-transparent hover:bg-primary-1 hover:text-primary-2 focus:ring-transparent text-left'>
                <FaUserAlt className='scale-150'/>
                <p>Utenze</p>
              </Button>
              <Button theme={sidebarButtonTheme} href="/Homepage/InfoRistorante" className='bg-transparent hover:bg-primary-1 hover:text-primary-2 focus:ring-transparent text-left'>
                <FaInfo  className='scale-150'/>
                <p>Info Ristorante</p>
              </Button>
              <Button theme={sidebarButtonTheme} href="/Homepage/StampaQR" className='bg-transparent hover:bg-primary-1 hover:text-primary-2 focus:ring-transparent text-left'>
                <FaQrcode className='scale-150'/>
                <p>Stampa QR</p>
              </Button>
              <Button theme={sidebarButtonTheme} href="/Homepage/Statistiche" className='bg-transparent hover:bg-primary-1 hover:text-primary-2 focus:ring-transparent text-left'>
                <FaChartLine  className='scale-150'/>
                <p>Statistiche</p>
              </Button>
            </div>
        </div>
    //</div>
    /*<Sidebar aria-label="HomepageSidebar" >
      <Sidebar.Logo href="/Homepage" img="/logo.png" imgAlt="ratatouille logo">
        RATATOUILLE 23
      </Sidebar.Logo>
      <Sidebar.Items className="p-20 -4px">
        <Sidebar.ItemGroup className='items-center justify-start'>
          <Sidebar.Item href="/Homepage/StoricoConti" icon={HiBookOpen}>
            Storico Conti
          <Sidebar.Item/>
          </Sidebar.Item>
          <Sidebar.Item href="/Homepage/Menu" icon={HiClipboard}>
            Menu
          </Sidebar.Item>
          <Sidebar.Item/>
          <Sidebar.Item href="/Homepage/Utenze" icon={HiUser}>
            Utenze
          </Sidebar.Item>
          <Sidebar.Item/>
          <Sidebar.Item href="/Homepage/InfoRistorante" icon={HiInformationCircle}>
            Info ristorante
          </Sidebar.Item>
          <Sidebar.Item/>
          <Sidebar.Item href="/Homepage/StampaQR" icon={HiPrinter}>
            StampaQR
          </Sidebar.Item>
          <Sidebar.Item/>
          <Sidebar.Item href="/Homepage/Statistiche" icon={HiChartPie}>
            Statistiche
          </Sidebar.Item>
          <Sidebar.Item/>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>*/
    //</Dropdown>
  );
}
