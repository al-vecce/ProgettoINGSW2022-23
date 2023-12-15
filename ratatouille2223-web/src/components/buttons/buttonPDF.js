'use client';

import { Button } from 'flowbite-react';
import { FaRegFilePdf } from "react-icons/fa6";
import { PDFDownloadLink, Document, View, Text, styles, StyleSheet, Page, PDFViewer } from '@react-pdf/renderer';
import useSWR from 'swr';
import { elementiContoService } from '@/services/elementiContoService';
import useCurrentUserData from '@/hooks/useCurrentUserData';

export default function ButtonPDF({ checkID, table, dataAperturaConto, dataChisuraConto, totale }) {
  const userData = useCurrentUserData()
  const elemServ = new elementiContoService(userData ? userData.token : "");
  const { data, isLoading, error } = useSWR(checkID, elemServ.getElementiContoOrdinatiPerID,);
  const today = new Date();
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}${month}${date}`;
  };
  const getDateForClosingTime = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };

  const myStyles = StyleSheet.create({
    page: {
      flexDirection: 'col',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    header: {
      fontFamily: 'Courier',
      fontSize: '40',
      fontWeight: 'bold',
    },
    base: {
      fontSize: '15pt',
      letterSpacing: '1pt',
    },
    right: {
      textAlign: 'right',
      fontSize: '15pt',
      letterSpacing: '1pt',
    },
    subscript: {
      margin: 2,
      padding: 2,
      fontSize: '16pt',
      letterSpacing: '1pt',
    },
    section: {
      margin: 15,
      flexDirection: 'col',
      alignItems: 'center',
    },
    table: {
      margin: 15,
      width: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid #EEE',
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: 'none',
    },
    bold: {
      fontWeight: 'bold',
    },
    row1: {
      width: '5%',
    },
    row2: {
      width: '54%',
    },
    row3: {
      width: '13%',
    },
    row4: {
      width: '13%',
    },
    row5: {
      width: '13%',
    },
    row6: {
      width: '5%',
    },
  });

  const MyDoc = () => {
    return (
      <Document title={"test"}>
      <Page size="A4" style={myStyles.page}>
          <View style={myStyles.section}>
              <View style={{ textAlign: 'center', flexDirection: 'col',
                            alignItems: 'center', padding: '10pt'}}>
                <Text style={myStyles.header}>
                  {checkID ? "CONTO NUMERO " + checkID : "CONTO PRIVO DI NUMERO"}
                </Text>
                <Text style={myStyles.subscript}>
                  {table ? "Serve il tavolo n." + table : ""}
                </Text>
              </View>
              <Text style={myStyles.subscript}>
                  -------------------------------------------------------------------------------------
              </Text>
              <Text style={myStyles.header}>
                  QUESTO PDF NON È UN DOCUMENTO COMMERCIALE
              </Text>
              <Text style={myStyles.header}>
                  DI VENDITA O PRESTAZIONE
              </Text>
              <View style={myStyles.table}>
                <View style={[myStyles.row, myStyles.bold, myStyles.base]}>
                <Text style={myStyles.row1}></Text>
                <Text style={myStyles.row2}>DESCRIZIONE</Text>
                <Text style={[myStyles.row3, myStyles.right]}>Quantità</Text>
                <Text style={[myStyles.row4, myStyles.right]}>Prezzo</Text>
                <Text style={[myStyles.row5, myStyles.right]}>Totale</Text>
                <Text style={myStyles.row6}></Text>
              </View>
              {data && data.orders && Array.isArray(data.orders) ? data.orders.map(({order_id, element_name, quantity, current_price, description, order_total}) => (
              <View key={order_id} style={myStyles.row} wrap={false}>
                <Text style={myStyles.row1}></Text>
                <Text style={myStyles.row2}>{element_name}</Text>
                <Text style={[myStyles.row3, myStyles.right]}>{quantity}</Text>
                <Text style={[myStyles.row4, myStyles.right]}>{current_price}€</Text>
                <Text style={[myStyles.row5, myStyles.right]}>{quantity * current_price}€</Text>
                <Text style={myStyles.row6}></Text>
              </View>
              )) : null}
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: '40pt',
                fontSize: '28',
                fontWeight: 'bold',
                letterSpacing: '0pt'
              }}>
                <Text style={myStyles.row1}></Text>
                <Text style={[myStyles.row2, {textAlign: 'left', width: '64%'}]}>TOTALE COMPLESSIVO</Text>
                <Text style={[myStyles.row3, {textAlign: 'right', width: '5%'}]}></Text>
                <Text style={[myStyles.row3, {textAlign: 'right', width: '5%'}]}></Text>
                <Text style={[myStyles.row3, {textAlign: 'right'}]}>{totale ? totale + "€" : "Assente"}</Text>
                <Text style={myStyles.row6}></Text>
              </View>
              <View style={{ textAlign: 'center', flexDirection: 'col',
                            alignItems: 'center', padding: '10pt'}}>
                <Text style={myStyles.subscript}>
                  -------------------------------------------------------------------------------------
                </Text>
                <Text>{dataAperturaConto ? "Data di apertura del conto: " + dataAperturaConto : ""}</Text>
                <Text>{dataChisuraConto ? "Data di chiusura del conto: " + dataChisuraConto : ""}</Text>
              </View>
            </View>
          </View>
      </Page>
      </Document>
    );
  }
  return (
    <div>
      <Button className='text-lg shadow-md body-font font-quicksand tracking-widest bg-primary-accent1
      border border-none enabled:hover:bg-orange-500 focus:bg-orange-500 focus:border-transparent focus:ring-transparent'>
        <div className="flex flex-row gap-3 items-center">
          <FaRegFilePdf />
          <PDFDownloadLink document={<MyDoc />} fileName={getDate() + `checkID${checkID ? checkID : ""}table${table ? table : ""}`}>
            {({ blob, url, loading, error }) =>
              loading ? 'PDF' : 'PDF'
            }
          </PDFDownloadLink>
        </div>
      </Button>
      <div>
      </div>
    </div>
  );
}