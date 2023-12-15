'use client';

import { Svg } from '@react-pdf/renderer';

import { Button } from 'flowbite-react';
import { FaRegFilePdf } from "react-icons/fa6";
import { PDFDownloadLink, Document, View, Text, Image, styles, StyleSheet, Page, PDFViewer, Font } from '@react-pdf/renderer';
import useSWR from 'swr';
import { elementiContoService } from '@/services/elementiContoService';
import useCurrentUserData from '@/hooks/useCurrentUserData';

export default function ButtonPDFcodeQR({ name, address, phone_number, logo_encoded, qr_encoded }) {
    const myStyles = StyleSheet.create({
        page: {
            flexDirection: 'col',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
        },
        image: {
            backgroundColor: '#000',
            margin: 10,
            maxHeight: '60%',
            maxWidth: '80%',
            borderColor: '#000',
            borderTopLeftRadius: '20pt',
            borderTopRightRadius: '20pt',
            borderBottomLeftRadius: '20pt',
            borderBottomRightRadius: '20pt',
        },
        header: {
            margin: 8,
            marginTop: '50pt',
            padding: 8,
            fontWeight: 'bold',
            fontSize: '40pt',
            letterSpacing: '4pt',
        },
        base: {
            margin: 2,
            padding: 2,
            fontSize: '20pt',
            letterSpacing: '4pt',
        },
        section: {
          margin: 15,
          border: 1,
          flexDirection: 'col',
          alignItems: 'center',
          borderWidth: '5pt',
          borderColor: '#000',
          borderTopLeftRadius: '20pt',
          borderTopRightRadius: '20pt',
          borderBottomLeftRadius: '20pt',
          borderBottomRightRadius: '20pt',
        }
      });

    const MyDoc = () => {
        return (
            <Document title={name + "-business-information"} author={name} >
                <Page size="A4" style={myStyles.page}>
                    <View style={myStyles.section}>
                        <Text style={myStyles.header}>
                            {name}
                        </Text>
                        <Image src={`data:image/png;base64, '${qr_encoded}'`}
                        style={myStyles.image}/>
                        <Text style={myStyles.base}>
                            +39 {phone_number}
                        </Text>
                        <Text style={myStyles.base}>
                            {address}
                        </Text>
                    </View>
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
                    <PDFDownloadLink document={<MyDoc />} fileName={name + "-qrcode-menu"}>
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