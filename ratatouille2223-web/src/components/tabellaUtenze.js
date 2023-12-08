'use client';
import React from 'react';
import { Table } from 'flowbite-react';
import Pager from './pager';
import { Button } from 'flowbite-react';
import ButtonFilter from './buttons/buttonFilter';
import ButtonRefresh from './buttons/buttonRefresh';
import ButtonAddUser from './buttons/buttonAddUser';

export default function TabellaUtenze() {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
      <Table.Head>
      <Table.HeadCell>Nome</Table.HeadCell>
        <Table.HeadCell>Categoria</Table.HeadCell>
        <Table.HeadCell>Ultima Modifica</Table.HeadCell>
        <Table.HeadCell> 
          <Pager/> 
        </Table.HeadCell>
        <Table.HeadCell> 
          <Button.Group>
            <ButtonFilter/>
            <ButtonRefresh/>
          </Button.Group>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row>
            <Table.Cell/>
            <Table.Cell/>
            <Table.Cell>
                <ButtonAddUser></ButtonAddUser>
            </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </div>
  )
}
