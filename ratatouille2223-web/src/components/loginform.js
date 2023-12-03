'use client';

import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginForm(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const router = useRouter();
  let data = null

  async function tryLogin(e){
    e.preventDefault();
    const url = "http://localhost:8080/login"
    try{
      const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
      }
      )
    data = await response.json();
    }catch(error){
      console.error(error);
    };
    (data ? console.log("Login success!") : console.log("Error with login!"));
    (data ? router.push('/Homepage') : router.push('/'));
    console.log(data);
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

