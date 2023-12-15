import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { menuService } from '@/services/menuService';
import { categorieService } from '@/services/categorieService';
import { useState } from 'react';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { useRouter } from 'next/navigation';


export default function MenuBody() {

   
    const [ isLoading, setisLoading ] = useState(true);
    const [ showCategories, setShowCategories ] = useState(true);
    const [ categories, setCategories ] = useState(null);
    const [ currentCategory, setCurrentCategory ] = useState(null);
    const [ showReview, setShowReview ] = useState(false); 
    const [ elements, setElements ] = useState(null);
    const userData = useCurrentUserData();
    const router = useRouter();
    let menuServ = new menuService(userData ? userData.token : "");
    if(isLoading){
        menuServ = new menuService(userData ? userData.token : "");
        menuServ.getMenuCategories().then(
            (data)=>{
                setCategories(data.categories);
            }
        ).then(()=>setisLoading(false));
    }
    async function  onClickCategory(category){
        setCurrentCategory(category);
        setShowCategories(false);
        setisLoading(true);
        await menuServ.getMenuCategoryElements(category).then((data)=>{
            if(data){
                setElements(data.elements);
            }
        }).then(()=>setisLoading(false));

    }
   
    function onClickBackToCategorie(){
        setShowCategories(true);
        setisLoading(true);
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
                <div className="flex items-stretch ... flex-col ">
                    {
                    categories ? categories.map(({
                        name,
                    }) => (
                    <div key={"categoriaButt"+name} className=''>
                        <Button color="gray" onClick={()=>{onClickCategory(name)}}><h1>{name}</h1></Button>
                    </div>)) 
                    : null
                    }
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
                <Button onClick={onClickBackToCategorie} > Go back</Button>
                <div className="flex items-stretch ... flex-col ">
                    {
                        Array.isArray(elements) ? elements.map(({
                        name, price, ingredients, allergens,
                    }) => (
                    <div key={"elemButton" + name} className=''>
                        <div>
                        <Label value={name}/>
                        </div>
                        <div className='text-primary-icon'>
                            prezzo: {price} ingredienti : {ingredients} allergeni : {allergens}
                        </div>
                        
                    </div>)) 
                    : null
                    }
                </div>
            </div>
        );
    }
   
  return (
    <div>
        { !showReview ? (showCategories ? categoriesTable() : elementsTable()) : reviewTable() }
    </div>
  )
}
