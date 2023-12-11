'use client';

import { Button } from 'flowbite-react';
import { FaRegFilePdf } from "react-icons/fa6";
import { PDFDownloadLink, Document,View,Text,styles, Page } from '@react-pdf/renderer';
import useSWR from 'swr';
import { elementiContoService } from '@/services/elementiContoService';

export default function ButtonPDF({checkID, table, dataAperturaConto, dataChisuraConto, totale}) {

  const elemServ = new elementiContoService();
  const {data , isLoading, error} = useSWR(checkID, elemServ.getElementiContoOrdinatiPerID,);
  const today = new Date();
  const getDate = ()=>{
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}${month}${date}`;
  };
  const getDateForClosingTime = ()=>{
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };
  const MyDoc = () => {
    return(
    <Document title={getDate() + today.getHours + ":" + today.getMinutes + checkID}>
      <Page> 
        <View >
          <Text>{dataAperturaConto ? "Data di apertura del conto: " + dataAperturaConto : null}</Text>
          <Text>{dataChisuraConto ? "Data di chiusura del conto: " + dataChisuraConto : null}</Text>
          <Text>{totale ? "Totale: " + totale : null}</Text>
          <Text>Data di Stampa: {getDateForClosingTime() + today.getHours() + ":" + today.getMinutes()}</Text>
            {data && data.orders && Array.isArray(data.orders) ? data.orders.map(({order_id, element_name, quantity, current_price, description, order_total})=>{
              console.log(order_id);
              return(
              <Text>
                {order_id}
                {element_name}
                {quantity}
                {current_price}
                {order_total}
                {description}
              </Text>
              );
            }): null}
        </View>
      </Page>
    </Document>
  );}
  

  return (
    <div>
      <Button  className='text-lg shadow-md body-font font-quicksand tracking-widest bg-primary-accent1
      border border-none enabled:hover:bg-orange-500 focus:bg-orange-500 focus:border-transparent focus:ring-transparent'>
        <div className="flex flex-row gap-3 items-center">
          <FaRegFilePdf/>
          <PDFDownloadLink document={<MyDoc />} fileName={getDate()+ `checkID${checkID ? checkID : ""}table${table ? table : ""}`}>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading PDF...' : 'PDF'
        }
      </PDFDownloadLink>
        </div>
      </Button>
      <div>
    </div>
    </div>
  );
}