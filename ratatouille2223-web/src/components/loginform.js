'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import loginService from '@/services/loginService';

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
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput id="username" onChange={handleUsernameChange} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput id="password" type="password" onChange={handlePasswordChange} required />
      </div>
      <Button type="submit" onClick={tryLogin}>Submit</Button>
    </form>
  );
}

