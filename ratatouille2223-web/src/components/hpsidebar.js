'use client';

import { Dropdown } from 'flowbite-react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiUser, HiBookOpen, HiClipboard, HiInformationCircle, HiPrinter } from 'react-icons/hi';
import { CgDetailsMore } from 'react-icons/cg';
import { Avatar } from 'flowbite-react';

export default function HpSidebar() {
  return ( 
    <Dropdown arrowIcon={false} placement="left start" size="lg" >
    <Sidebar aria-label="HomepageSidebar">
      <Sidebar.Logo href="/Homepage" img="/logo.png" imgAlt="ratatouille logo">
        RATATOUILLE 23
      </Sidebar.Logo>
      <Sidebar.Items className="p-20 -4px">
        <Sidebar.ItemGroup>
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
    </Sidebar>
    </Dropdown>
  );
}
