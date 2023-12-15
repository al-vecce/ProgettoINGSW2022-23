'use client';

import { Button, Label, TextInput, FileInput } from 'flowbite-react';
import { useState } from 'react';
import { Flowbite } from 'flowbite-react';
import { infoAttivitaService } from '@/services/infoAttivitaService';

import { FaUser, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

import Image from 'next/image';
import useCurrentUserData from '@/hooks/useCurrentUserData';
const customButtonTheme = {
  base: "rounded-none",
  button: {
    color: {
      icon: "bg-orange-500 border border-transparent enabled:hover:bg-orange-500 focus:bg-orange-500",
      confirm: "text-white bg-orange-500 border border-transparent enabled:hover:bg-yellow-500 focus:green-300",
    },
    disabled: "cursor-not-allowed",
  },
};
const customTextInputTheme = {
  base: "flex",
  field: {
    base: "relative w-full",
    input: {
      base: "block w-full",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4"
      },
      colors: {
        gray: "bg-gray-200 border-transparent text-gray-900 focus:border-transparent focus:ring-transparent",
        info: "bg-gray-200 border-transparent text-gray-900 focus:border-transparent focus:ring-transparent",
      },
      withAddon: {
        on: "rounded-l-sm",
        off: "rounded-l-sm"
      },
    },

  }
};

function parseImage(imageBase64, imageType) {
  const imagetype = imageType.split('.')[1];
  console.log(imagetype);
  console.log(`data:image/${imagetype};base64,${imageBase64}`);
  return `data:image/${imagetype};base64,${imageBase64}`;
}

export default function InfoAttivitaForm() {

  const currentUser = useCurrentUserData();
  const [isLoading, setisLoading] = useState(true);

  let data;
  if (currentUser && isLoading) {
    const dud = "b";
    const infoAttServ = new infoAttivitaService(currentUser ? currentUser.token : "");
    infoAttServ.getInfoAttivita()
      .then((data) => {
        setNomeAttivita(data.business_name);
        setIndirizzo(data.business_address);
        setNumeroDiTelefono(data.business_phone_number);
        setLogoImage(data.business_logo_encoded);
        setFileBase64(data.business_logo_encoded.split(",")[1]);
        setFileName(data.business_logo_name);
        setFileType(data.business_logo_type);
        setLogoImage(data.business_logo_encoded);
      }).then(() => { setisLoading(false) });

  }
  const [logoImage, setLogoImage] = useState("");
  const [nomeAttivita, setNomeAttivita] = useState(data ? data.business_name : "");
  const [indirizzo, setIndirizzo] = useState("");
  const [numeroDiTelefono, setNumeroDiTelefono] = useState("");
  const [submitButtonVisibility, setSubmitButtonVisibility] = useState(false);
  const linkMenuQR = "";
  const [errorUploadFallito, setErrorUpload] = useState(false);
  const [uploadSuccesso, setUploadSuccesso] = useState(false);
  const [errorNomeAttivitaAssente, setErrorNomeAttivitaAssente] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileBase64, setFileBase64] = useState("");

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleIndirizzoChange = (e) => { setIndirizzo(e.target.value); setSubmitButtonVisibility(true); };
  const handleNumeroDiTelefonoChange = (e) => { setNumeroDiTelefono(e.target.value); setSubmitButtonVisibility(true); };
  const handleNomeChange = (e) => { setNomeAttivita(e.target.value); setSubmitButtonVisibility(true); };
  const handleImageInput = async (e) => {
    setSubmitButtonVisibility(true);
    const file = e.target.files[0];
    const path = require('path');
    const filename = path.parse(file.name).name;
    const result = await toBase64(file);
    const fileExt = path.parse(file.name).ext;
    const base64 = result.split(",")[1];
    console.log(result);
    setFileName(filename);
    setFileType(fileExt);
    setFileBase64(base64);
    setLogoImage(result);
  }
  async function Login() {
    const infoAttServ = new infoAttivitaService(currentUser ? currentUser.token : "");
    if (nomeAttivita) {
      const data = await infoAttServ.postInfoAttivita(nomeAttivita, indirizzo, numeroDiTelefono, fileBase64, fileType, fileName);
      if (data) {
        if (data.result === "true") {
          setUploadSuccesso(true);
          setErrorNomeAttivitaAssente(false);
          setErrorUpload(false);
        } else {
          setUploadSuccesso(false);
          setErrorNomeAttivitaAssente(false);
          setErrorUpload(true);
        }
      } else {
        setErrorUpload(true);
        setErrorNomeAttivitaAssente(false);
        setUploadSuccesso(false);
      }
    }
    else {
      setErrorNomeAttivitaAssente(true);
    }

  }
  if (isLoading) {
    return (<div>loading...</div>);
  }

  return (
    <div className='block flex flex-col flex-wrap gap-[55px] items-center justify-center font-body font-quicksand tracking-widest rounded-lg items-center justify-center p-10'>
      <img className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] max-h-[400px] max-w-[400px]' alt={"Logo img"} style={{ height: '15em' }} src={logoImage ? logoImage.includes("data:image") ? logoImage : "/logo-placeholder.svg" : "/logo-placeholder.svg"} />
      <div className='items-center justify-center text-center'>
        <div>
          <Label htmlFor="file-upload-helper-text"/>
        </div>
        {errorUploadFallito ? <Label htmlFor="error" color={"failure"} value="Errore con l'upload!" /> : null}
        {uploadSuccesso ? <Label htmlFor="success" color={"black"} value="Salvato!" /> : null}
        {errorNomeAttivitaAssente ? <Label htmlFor="error" color={"failure"} value="Il nome attività non può essere nullo!" /> : null}
        <FileInput className='pt-5 scale-125' id="file-upload-helper-text" helperText="SVG, PNG, JPG (Suggerito. 400x400px)." onChange={handleImageInput} accept="image/*" />
      </div>
      <div className="grid scale-125 grid-rows-3 grid-cols-7 items-center justify-between flex-wrap gap-y-4">
          <Label  className='col-span-2 text-[20px] text-end justify-self-end pr-2' htmlFor="nomeAttv" value="Nome attività:" />
          <TextInput className='col-span-4' theme={customTextInputTheme} value={nomeAttivita != "null" ? nomeAttivita : ""} placeholder="Nome attività" id="nomeattiv" onChange={handleNomeChange} required />
          <div className="col-span-1 justify-self-start pl-2"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className='text-white bg-primary-icon rounded-r-md p-2'>
                <FaUser style={{ width:'1.2em', height:'1.2em' }} className='text-xl' />
              </div>
          </div>
          <Label  className='col-span-2 text-[20px] text-end justify-self-end pr-2' htmlFor="indirizzoatt" value="Indirizzo attività:" />
          <TextInput className='col-span-4' theme={customTextInputTheme} value={indirizzo != "null" ? indirizzo : ""} placeholder="Indirizzo attività" id="indirizzoAttiv" onChange={handleIndirizzoChange} />
          <div className="col-span-1 justify-self-start pl-2"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className='text-white bg-primary-icon rounded-r-md p-2'>
                <FaMapMarkerAlt style={{ width:'1.2em', height:'1.2em' }} className='text-xl' />
              </div>
          </div>
          <Label className='col-span-2 text-[20px] text-end justify-self-end pr-2' htmlFor="numeroTelefAtt" value="Numero telefono attività:" />
          <TextInput className='col-span-4' theme={customTextInputTheme} value={numeroDiTelefono != "null" ? numeroDiTelefono : ""} placeholder="Telefono Attività" id="telAttiv" onChange={handleNumeroDiTelefonoChange} />
          <div className="col-span-1 justify-self-start pl-2 justify-start"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className='text-white bg-primary-icon rounded-r-md p-2'>
                <FaPhone style={{ width:'1.2em', height:'1.2em' }} className='text-xl' />
              </div>
          </div>
      </div>
      <Flowbite  theme={{ theme: customButtonTheme }}>
          {submitButtonVisibility ? <Button className="scale-150 shadow-xl rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{ width: '10em' }} color="confirm" type="submit" onClick={Login}>Submit</Button> : 
          <Button disabled className="scale-150 shadow-xl disabled:contrast-[1] disabled:saturate-[0.7] rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{ width: '10em' }} color="confirm" type="submit" onClick={Login}>Submit</Button>}
      </Flowbite>
    </div>
  );
}

/*
<div >
          <Label htmlFor="indirizzoatt" value="Indirizzo attività:" />
          <TextInput theme={customTextInputTheme} value={indirizzo != "null" ? indirizzo : ""} placeholder="Indirizzo attività" id="indirizzoAttiv" onChange={handleIndirizzoChange} />
          <div className="text-white bg-primary-icon rounded-r-md p-2"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FaMapMarkerAlt className='text-xl' />
          </div>
          <div>
            <Label htmlFor="numeroTelefAtt" value="Numero telefono attività:" />
            <TextInput theme={customTextInputTheme} value={numeroDiTelefono != "null" ? numeroDiTelefono : ""} placeholder="Telefono Attività" id="telAttiv" onChange={handleNumeroDiTelefonoChange} />
            <div className="text-white bg-primary-icon rounded-r-md p-2"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaPhone className='text-xl' />
            </div>
          </div>
          <Flowbite theme={{ theme: customButtonTheme }}>
            {submitButtonVisibility ? <Button className="shadow-xl rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{ width: '10em' }} color="confirm" type="submit" onClick={Login}>Submit</Button> : null}
          </Flowbite>
        </div>
*/