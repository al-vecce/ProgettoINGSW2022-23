import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { categorieService } from '@/services/categorieService';
import { useState } from 'react';
import Link from 'next/link';
import elementiService from '@/services/elementiService';

const cutstomTheme = {

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
                <div className="flex-1 flex-col items-center justify-center">
                    {
                    categories ? categories.map(({
                        name,
                    }) => (
                    <div key={"categoriaButt"+name} className='flex-1 pb-5 items-center justify-center'>
                        <Button color='category' fullSized onClick={()=>{onClickCategory(name)}}><h1>{name}</h1></Button>
                    </div>)) 
                    : null
                    }
                </div>
                <div>
                    <Button onClick={()=>{setShowReview(true)}} >Review</Button>
                </div>
            </div>
        );
    }
    function elementsTable(){
        if(!elements){
            return (<h1 className='text-primary-icon'>loading...</h1>);
        }
        return(
            <div className='flex flex-col items-center justify-center'>
                <Button onClick={onClickBackToCategorie} > Go back</Button>
                <div className="flex items-stretch ... flex-col ">
                    {
                        Array.isArray(elements) ? elements.map(({
                        name, price, ingredients, allergens,
                    }) => (
                    <div key={"elemButton" + name} className=''>
                        <div>
                        <Label value={name}/>
                        <Button color="gray" onClick={()=>{onPlusClick(name)}}><h1>+</h1></Button>
                        <Label value={ordinazione[name] ? ordinazione[name] : 0}/>
                        <Button color="gray" onClick={()=>{onMinusClick(name)}}><h1>-</h1></Button>
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
                    <Button onClick={()=>{setShowReview(false)}} > Go back</Button>
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
                <div className='flex column'>
                <Button onClick={sendOrder} disabled={orderisEmpty()} >Conferma</Button>
                <Link href={"/SelettoreTavolo"} passHref>
                <Button color={"failure"}>Annulla</Button>
                </Link>
                </div>
            </div>
        )
    }
  return (
    <div className='flex-1 flex-col items-center justify-center bg-black'>
        { !showReview ? (showCategories ? categoriesTable() : elementsTable()) : reviewTable() }
    </div>
  )
}
