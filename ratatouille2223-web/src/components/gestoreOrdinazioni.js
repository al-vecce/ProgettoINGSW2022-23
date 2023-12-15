import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { categorieService } from '@/services/categorieService';
import { useState } from 'react';
import Link from 'next/link';
import elementiService from '@/services/elementiService';
import { Flowbite } from 'flowbite-react';
import { FaChevronLeft } from "react-icons/fa";
import { Footer } from 'flowbite-react';


  const customTheme = {
    base: "",
    button: {
      color: {
        icon: "bg-orange-500 enabled:hover:bg-orange-500 focus:bg-orange-500",
        confirm: "text-white bg-orange-500 enabled:hover:bg-yellow-500 focus:green-300",
      },
    },
  };

  const customTheme2 = {
    root: {
      inner: {
        base: "flex-1 w-2/3 mx-auto tracking-widest",
        fluid: "off",
      },
    },
    toggle: {
      base: "",
      icon: "",
    }
  };

  const customTableTheme = {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      shadow: "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
      wrapper: "relative"
    },
    body: {
      base: "group/body",
      cell: {
        base: "group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg px-6 py-4"
      }
    },
    head: {
      base: "group/head text-lg body-font font-quicksand tracking-widest font-light text-primary-icon",
      cell: {
        "base": "group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg grid-1 bg-gray-200 px-6 py-3"
      }
    },
    row: {
      base: "group/row",
      hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
      striped: "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
    }
  }

export default function gestoreOrdinazioni({tavolo}) {

    const [ ordinazione, setOrdinazione] = useState({});
    const [ descrizioni, setDescrizioni ] = useState({});
    const [ isLoading, setisLoading ] = useState(true);
    const [ showCategories, setShowCategories ] = useState(true);
    const [ categories, setCategories ] = useState(null);
    const [ currentCategory, setCurrentCategory ] = useState(null);
    const [ showReview, setShowReview ] = useState(false); 
    const [ elements, setElements ] = useState(null);
    const [ totaleOrdinazione, setTotaleOrdinazione] = useState(0);
    const userData = useCurrentUserData();

    if(userData && isLoading){
        const categorieServ = new categorieService(userData ? userData.token : "");
        categorieServ.getCategorieUnpaged().then(
            (data)=>{
                setCategories(data.categories);
            }
        ).then(()=>setisLoading(false));
    }
    async function  onClickCategory(category){
        setCurrentCategory(category);
        setShowCategories(false);
        setisLoading(true);
        const elemServ = new elementiService(userData ? userData.token : "");
        await elemServ.getElementiCategoriaUnpaged(category).then((data)=>{
            if(data){
                setElements(data.elements);
            }
        }).then(()=>setisLoading(false));

    }
    function onPlusClick(name,){
        setOrdinazione({...ordinazione, [name]: ordinazione[name] ? ordinazione[name]+1 : 1 })
    }
    function onMinusClick(name){
        if(ordinazione[name]){
            if(ordinazione[name] > 0 )
                setOrdinazione({...ordinazione, [name]: ordinazione[name]-1});
        }
    }
    function onClickBackToCategorie(){
        setShowCategories(true);
        setisLoading(true);
    }
    function onClickRemoveOrdinazione(key){
        delete ordinazione[key]; 
        delete descrizioni[key]; 
        setOrdinazione({...ordinazione } ); 
        setDescrizioni({...descrizioni });
    }
    if(isLoading){
        return(<h1 className='text-primary-icon'>loading...</h1>);
    }
    function categoriesTable(){
        
        if(!categories){
            return(<h1 className='text-primary-icon'>loading...</h1>)
        }
        return(
            <div>
                <div className="">
                    {
                    categories ? categories.map(({
                        name,
                    }) => (
                    <div key={"categoriaButt"+name} className=''>
                        
                        <Button className="scale-100 shadow-xl rounded-none" style={{ width: '23em' }} color="gray" onClick={()=>{onClickCategory(name)}}><h1>{name}</h1></Button>
                        
                    </div>)) 
                    : null
                    }
                </div>
                <div className='flex gap-2 y-2'>
                <Flowbite  theme={{ theme: customTheme }}>
                    <Button className="gap-2 scale-100 shadow-xl rounded-none border border-none focus:border-transparent focus:ring-transparent" style={{ width: '23em' }} color="confirm" onClick={()=>{setShowReview(true)}} >Review</Button>
                </Flowbite>
                </div>
            </div>
        );
    }
    function elementsTable(){
        if(!elements){
            return (<h1 className='text-primary-icon'>loading...</h1>);
        }
        return(
            <div>
                <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                style={{width:"2.5em", height:"2.5em"}} onClick={onClickBackToCategorie} > <FaChevronLeft className='flex text-xl text-primary-icon'/> </Button>
                <div className="flex items-stretch ... flex-col ">
                    {
                        Array.isArray(elements) ? elements.map(({
                        name, price, ingredients, allergens,
                    }) => (
                    <div key={"elemButton" + name} className='scale-95 rounded-none border border-none shadow-sm'>
                        <div className="flex justify-left scale-100 rounded-none border border-none" style={{ width: '23em' }} >
                        <Label className='col-span-2 text-[20px] text-end justify-self-end pr-2' value={name}/>
                        <Label className='col-span-2 text-[20px] text-end justify-self-end pr-2' value={price+"0€"}/>
                        
                        </div>
                        <Label className='col-span-2 text-[10px] text-end justify-self-end pr-2' value={ingredients}/>
                        <div className="flex justify-center scale-100 rounded-none border border-none" style={{ width: '23em' }} >
                        <Button size='sm' color="gray" onClick={()=>{onPlusClick(name)}}><h1>+</h1></Button>
                        <Label className='col-span-2 text-[20px] text-end justify-self-end pr-2 pl-2' value={ ordinazione[name] ? ordinazione[name]: 0}/>
                        <Button size='sm' color="gray" onClick={()=>{onMinusClick(name)}}><h1>-</h1></Button>
                        </div>
                        <div>
                            {ingredients}
                        </div>
                        
                    </div>)) 
                    : null
                    }
                </div>
            </div>
        );
    }
    function orderisEmpty(){
        let result = true;
        Object.keys(ordinazione).forEach(key => {
            if(ordinazione[key] > 0)
                result = false;
        });
        return result;
    }
    function reviewTable(){

        const sendOrder = ()=>{

        }
        console.log(Object.keys(ordinazione));
        return(
            <div>
                <div>
                    <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                style={{width:"2.5em", height:"2.5em"}} onClick={()=>{setShowReview(false)}} > <FaChevronLeft className='flex text-xl text-primary-icon'/> </Button>
                </div>
                <div>
                    {console.log(ordinazione)}
                    { Object.keys(ordinazione).map(key  => {
                        return(
                        <div>
                            <h1 className='text-primary-icon'>
                                {key}:{ordinazione[key]}
                            </h1>
                            <Button onClick={()=>{onClickRemoveOrdinazione(key)}} >X</Button>
                        </div>
                        );
                    })}
                </div>
                <div className='text-primary-icon'>
                    totale:
                </div>
                <Footer container theme={customTableTheme}>
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <Button color='success' onClick={sendOrder} disabled={orderisEmpty()} >Conferma</Button>
                <Link href={"/SelettoreTavolo"} passHref>
                <Button color={"failure"}>Annulla</Button>
                </Link>
                </div>
                </Footer>
            </div>
        )
    }
  return (
    <div>
        { !showReview ? (showCategories ? categoriesTable() : elementsTable()) : reviewTable() }
    </div>
  )
}
