'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import loginService from '@/services/loginService';
import { Flowbite } from 'flowbite-react';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { useCookies } from 'next-client-cookies';
import useLogout from '@/hooks/useLogout';

const customTheme = {
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
        on: "rounded-lg",
        off: "rounded-lg"
      },
    },
    
  }
};

export default function PrimoAccessoForm(){

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [ errorCredenzialiErrate, setErrorCredenzialiErrate ] = useState(false);
  const [ errorCriterioCredenzialeSbagliato, setErrorCriterioCredenzialiSbagliato ] = useState(false);
  const cookieStore = useCookies();
  const { logout } = useLogout();

  const handlePasswordConfirmationChange = (e) => setPasswordConfirmation(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const userData = useCurrentUserData();
  const router = useRouter();

  async function onSubmit(){
    if(password != "" && passwordConfirmation != "" && password === passwordConfirmation){
      const logger = new loginService(userData.token);
      if(userData.currentUser && userData.currentUserRole){
        const data = await logger.postPrimoAccessoCambioPassword(userData.currentUser,password,passwordConfirmation);
        if(data){
          if(data.result === "true"){
            logout();
            router.push("/");
          }
          else{
            setErrorCredenzialiErrate(false);
            setErrorCriterioCredenzialiSbagliato(true);
          }
        }
        else{
          alert("Errore con il server!");
        }
      }
      else{
        router.push("/");
      }
    }
    else{
      setErrorCredenzialiErrate(true);
      setErrorCriterioCredenzialiSbagliato(false);

    }
  }

  return (
    <div className="flex gap-7 flex-col" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      {errorCredenzialiErrate ? <Label htmlFor="error" color={"failure"} value="Password non uguali o vuote!" /> : null}
      {errorCriterioCredenzialeSbagliato ? <div htmlFor="error" className='text-red-700' >La nuova password deve contenere:<br/>Un carattere speciale(esempio: '!' '$')<br/> Una lettere maiuscola<br/> Un numero<br/> Non deve essere uguale a quella precedente e deve essere lunga almeno 8 caratteri </div> : null}
      <div className="inline-flex gap-2" role="group">
        <TextInput theme={customTextInputTheme} placeholder="Password" id="password" addon="" type="password" onChange={handlePasswordChange} required />
      </div>
      <div className="inline-flex gap-2" role="group">
        <TextInput theme={customTextInputTheme} placeholder="Conferma" id="conferma" addon="" type="password" onChange={handlePasswordConfirmationChange} required/>
      </div>
      <Flowbite theme={{ theme: customTheme }}>
        <Button className="shadow-xl rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{width:'10em'}} color="confirm" type="submit" onClick={onSubmit}>Submit</Button>
      </Flowbite>
    </div>
  );
}