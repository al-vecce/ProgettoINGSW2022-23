'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLogin from '@/hooks/useLogin';

import { FaLock, FaUser } from "react-icons/fa";
import { Flowbite } from 'flowbite-react';
import { useCookies } from 'next-client-cookies';
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

export default function LoginForm(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ errorCredenzialiErrate, setErrorCredenzialiErrate ] = useState(false);
  const cookieStore = useCookies();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const router = useRouter();
  const { login } = useLogin();

  async function Login(){
    if(username == "" || password == ""){
      alert("Inserire i campi del login!");
    }
    else{
      login(username,password)
        .then((data)=>{
          if(data.result === true){
            cookieStore.set("firstaccess", data.firstLogin, "SameSite=Strict");
            if(data.firstLogin === "true"){
              router.push("/PrimoAccesso");
            }
            else
              router.push("/Homepage");
          }
          else{
            setErrorCredenzialiErrate(true);
          }
        })
        .catch((e)=>alert(e));
    }
  }

  return (
    <>
      {errorCredenzialiErrate ? <Label htmlFor="error" color={"failure"} value="Credenziali errate!" /> : null}
      <div className="flex gap-4 flex-col" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="inline-flex gap-2" role="group">
          <div className="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
          style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FaUser fill='#393945' />
          </div>
          <TextInput theme={customTextInputTheme} placeholder="Username" id="username" onChange={handleUsernameChange} required />
        </div>
        <div className="inline-flex gap-2" role="group">
          <div className="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
          style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FaLock fill='#393945' />
          </div>
          <TextInput theme={customTextInputTheme} placeholder="Password" id="password" type="password" onChange={handlePasswordChange} required/>
        </div>
        <Flowbite theme={{ theme: customButtonTheme }}>
          <Button className="shadow-xl rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{width:'10em'}} color="confirm" type="submit" onClick={Login}>Submit</Button>
        </Flowbite>
        </div>
    </>
  );
}


