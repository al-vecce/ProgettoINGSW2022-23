'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import loginService from '../services/loginService';

import { FaLock, FaUser } from "react-icons/fa";
import { Flowbite } from 'flowbite-react';
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const router = useRouter();

  async function tryLogin(e){
    e.preventDefault();
    const logger = new loginService();
    const data = logger.postLogin(username,password);
    console.log(JSON.stringify(data));
    (data.JWTAuthenticationCode ? console.log("Login success!") : console.log("Error with login!"));
    (data.JWTAuthenticationCode ? router.push('/Homepage') : router.push('/'));

  }

  return (
    <form className="flex gap-7 flex-col" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div class="inline-flex gap-2" role="group">
        <div class="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
        style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <FaUser fill='#393945' />
        </div>
        <TextInput theme={customTextInputTheme} placeholder="Username" id="username" addon="" type="email" onChange={handleUsernameChange} required />
      </div>
      <div class="inline-flex gap-2" role="group">
        <div class="shadow-md px-3 py-2 text-gray-900 bg-white rounded-s-lg"
        style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <FaLock fill='#393945' />
        </div>
        <TextInput theme={customTextInputTheme} placeholder="Password" id="password" addon="" type="password" onChange={handlePasswordChange} required/>
      </div>
      <Flowbite theme={{ theme: customButtonTheme }}>
        <Button className="shadow-xl rounded-full border border-none focus:border-transparent focus:ring-transparent" style={{width:'10em'}} color="confirm" type="submit" onClick={tryLogin}>Submit</Button>
      </Flowbite>
    </form>
  );
}


