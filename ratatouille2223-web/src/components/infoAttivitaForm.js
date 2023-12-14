'use client';

import { Button, Label, TextInput, FileInput } from 'flowbite-react';
import { useState } from 'react';
import { Flowbite } from 'flowbite-react';
import { infoAttivitaService } from '@/services/infoAttivitaService';
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
      base: "block w-full shadow-md",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4"
      },
      colors: {
        gray: "bg-gray-50 border-transparent text-gray-900 focus:border-transparent focus:ring-transparent",
        info: "bg-gray-50 border-transparent text-gray-900 focus:border-transparent focus:ring-transparent",
      },
      withAddon: {
        on: "rounded-r-lg",
        off: "rounded-r-lg"
      },
    },
    
  }
};

function parseImage(imageBase64, imageType){
  const imagetype = imageType.split('.')[1];
  console.log(imagetype);
  console.log(`data:image/${imagetype};base64,${imageBase64}`);
  return `data:image/${imagetype};base64,${imageBase64}`;
}

export default  function InfoAttivitaForm(){

    const currentUser = useCurrentUserData();
    const [ isLoading, setisLoading] = useState(true);

    let data;
    if(currentUser && isLoading){
        const dud = "b";
        const infoAttServ = new infoAttivitaService(currentUser ? currentUser.token : "");
        infoAttServ.getInfoAttivita()
            .then((data)=>{
                setNomeAttivita(data.business_name);
                setIndirizzo(data.business_address);
                setNumeroDiTelefono(data.business_phone_number);
                setLogoImage(data.business_logo_encoded);
                setFileBase64(data.business_logo_encoded.split(",")[1]);
                setFileName(data.business_logo_name);
                setFileType(data.business_logo_type);
                setLogoImage(data.business_logo_encoded);
            }).then(()=>{setisLoading(false)});
        
    }
    const [logoImage, setLogoImage] = useState("");
    const [nomeAttivita, setNomeAttivita] = useState(data ? data.business_name : "");
    const [indirizzo, setIndirizzo] = useState("");
    const [ numeroDiTelefono, setNumeroDiTelefono ] = useState("");
    const [ submitButtonVisibility, setSubmitButtonVisibility ] = useState(false);
    const linkMenuQR = "";
    const [ errorUploadFallito, setErrorUpload ] = useState(false);
    const [ uploadSuccesso, setUploadSuccesso] = useState(false);
    const [ fileName, setFileName] = useState("");
    const [ fileType, setFileType] = useState("");
    const [ fileBase64, setFileBase64 ] = useState("");

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

    const handleIndirizzoChange = (e) => {setIndirizzo(e.target.value); setSubmitButtonVisibility(true);};
    const handleNumeroDiTelefonoChange = (e) => {setNumeroDiTelefono(e.target.value); setSubmitButtonVisibility(true);};
    const handleNomeChange = (e)=>{setNomeAttivita(e.target.value); setSubmitButtonVisibility(true);};
    const handleImageInput = async (e) =>{
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
    async function Login(){
      const infoAttServ = new infoAttivitaService(currentUser ? currentUser.token : "");
      
      const data = await infoAttServ.postInfoAttivita(nomeAttivita, indirizzo, numeroDiTelefono, fileBase64, fileType, fileName);
      if(data){
        if(data.result === "true"){
          setUploadSuccesso(true);
          setErrorUpload(false);
        }else{
          setUploadSuccesso(false);
          setErrorUpload(true);
        }
      }else{
        setErrorUpload(true);
        setUploadSuccesso(false);
      }
    }
    if(isLoading){
        return(<div>loading...</div>);
    }

  return (
    <>
      
        <Image className='drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]' width={300} height={400} alt={"Logo img"} style={{height:'15em'}} src={logoImage ? logoImage.includes("data:image") ? logoImage : "/uploadLogoPlaceholder.png" : "/uploadLogoPlaceholder.png"}/>
      {errorUploadFallito ? <Label htmlFor="error" color={"failure"} value="Errore con l'upload!" /> : null}
      {uploadSuccesso ? <Label htmlFor="success" color={"black"} value="Salvato!" /> : null}

       <div>
      <div>
        <Label htmlFor="file-upload-helper-text" value="Upload file"  />
      </div>
      <FileInput id="file-upload-helper-text" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." onChange={handleImageInput} accept="image/*" />
    </div>
      <div className="flex gap-4 flex-col" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="inline-flex gap-2" role="group">
          {/* <div className="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
          style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FaUser fill='#393945' />
          </div> */}
          <Label htmlFor="nomeAttv"  value="Nome attività:" /><TextInput theme={customTextInputTheme} value={nomeAttivita != "null" ? nomeAttivita : ""} placeholder="Nome attività" id="nomeattiv" onChange={handleNomeChange} required />
        </div>
        <div className="inline-flex gap-2" role="group">
          {/* <div className="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
          style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FaLock fill='#393945' />
          </div> */}
          <Label htmlFor="indirizzoatt"  value="Indirizzo attività:" /><TextInput theme={customTextInputTheme} value={indirizzo != "null" ? indirizzo : ""} placeholder="Indirizzo attività" id="indirizzoAttiv" onChange={handleIndirizzoChange} />
        </div>
        <div className="inline-flex gap-2" role="group">
          {/* <div className="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
          style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FaLock fill='#393945' />
          </div> */}
          <Label htmlFor="numeroTelefAtt"  value="Numero telefono attività:" /><TextInput theme={customTextInputTheme} value={numeroDiTelefono != "null" ? numeroDiTelefono : ""} placeholder="Telefono Attività" id="telAttiv" onChange={handleNumeroDiTelefonoChange} />
        </div>
        <div className="inline-flex gap-2" role="group">
          {/* <div className="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
          style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FaLock fill='#393945' />
          </div> */}
          <Label htmlFor="linkmenuatt"  value="Link menu attività:" /><TextInput disabled theme={customTextInputTheme} value={linkMenuQR} placeholder="Link menu attività" id="linkMenuAttiv" />
        </div>
        <Flowbite theme={{ theme: customButtonTheme }}>
          {submitButtonVisibility ? <Button className="shadow-xl rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{width:'10em'}} color="confirm" type="submit" onClick={Login}>Submit</Button> : null}
        </Flowbite>
        </div>
    </>
  );
}


