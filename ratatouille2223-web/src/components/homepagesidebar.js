'use client';

import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiUser, HiBookOpen, HiClipboard, HiInformationCircle, HiPrinter } from 'react-icons/hi';

export default function HomepageSidebar() {
  return (
    <Sidebar aria-label="HomepageSidebar">
      <Sidebar.Logo href="/Homepage" img="/logoicon.svg" imgAlt="ratatouille logo">
        RATATOUILLE 23
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/Homepage/StoricoConti" icon={HiBookOpen}>
            Storico Conti
          </Sidebar.Item>
          <Sidebar.Item href="/Homepage/Menu" icon={HiClipboard}>
            Menu
          </Sidebar.Item>
          <Sidebar.Item href="/Homepage/Utenze" icon={HiUser}>
            Utenze
          </Sidebar.Item>
          <Sidebar.Item href="/Homepage/InfoRistorante" icon={HiInformationCircle}>
            Info ristorante
          </Sidebar.Item>
          <Sidebar.Item href="/Homepage/StampaQR" icon={HiPrinter}>
            StampaQR
          </Sidebar.Item>
          <Sidebar.Item href="/Homepage/Statistiche" icon={HiChartPie}>
            Statistiche
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
