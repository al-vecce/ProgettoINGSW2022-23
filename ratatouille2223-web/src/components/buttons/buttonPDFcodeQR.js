'use client';

import { Button } from 'flowbite-react';
import { FaRegFilePdf } from "react-icons/fa6";
import { PDFDownloadLink, Document, View, Text, Image, styles, StyleSheet, Page } from '@react-pdf/renderer';
import useSWR from 'swr';
import { elementiContoService } from '@/services/elementiContoService';
import useCurrentUserData from '@/hooks/useCurrentUserData';

export default function ButtonPDFcodeQR({ name, address, phone_number, logo_encoded, qr_encoded }) {
    /*const userData = useCurrentUserData()
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
    };*/

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });

    const MyDoc = () => {
        console.log(logo_encoded.substring(26));
        return (
            <Document title={name + "-business-information"} author={name}>
                <Page size="A4" style={styles.page}>
                <Image
                    src={`data:image/png;base64, '${qr_encoded}'`}
                    style={{height: 150, width: 150}}/>
                </Page>
            </Document>
        );
    }


    return (
        <div>
            <Button className="shadow-xl bg-primary-accent1 rounded-full border border-none enabled:hover:bg-primary-accent2
            focus:border-transparent focus:ring-transparent font-bold text-center items-center justify-center"
                style={{ width: '10em' }}>
                <div className="flex flex-row gap-3 items-center">
                    <PDFDownloadLink document={<MyDoc />} fileName={"test1"}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'STAMPA' : 'STAMPA'
                        }
                    </PDFDownloadLink>
                </div>
            </Button>
            <div>
            </div>
        </div>
    );
}