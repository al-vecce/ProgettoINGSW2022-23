import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { menuService } from '@/services/menuService';
import { categorieService } from '@/services/categorieService';
import { useState } from 'react';
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from "react-icons/fa";
import ButtonAllergen from './buttons/buttonAllergen';

export default function MenuBody() {

   
    const [ isLoading, setisLoading ] = useState(true);
    const [ showCategories, setShowCategories ] = useState(true);
    const [ categories, setCategories ] = useState(null);
    const [ currentCategory, setCurrentCategory ] = useState(null);
    const [ showReview, setShowReview ] = useState(false); 
    const [ elements, setElements ] = useState(null);
    const userData = useCurrentUserData();
    const router = useRouter();

    const splitAllergens = (input) => {
        if(input && input != "null") {
            return (
                input.split(",").map(name => (
                    <ButtonAllergen statoIniziale={true} type={name}/>
                ))
            )
        }
        else {
            return (
                <div className='flex capitalize flex-col flex-wrap block rounded-md bg-gray-200 hover:bg-gray-200 p-2'>
                    <p>Informazioni Assenti</p>
                </div>
            )
        }
    }

    const splitString = (input) => {
        if(input && input != "null" && input != ',' && input != ',') {
            if(input.substring(input.length - 1, input.length) == ",") {
                input = input.slice(0, -1);
            }
            return (
                input.split(",").map(name => (
                <div className='flex capitalize flex-col flex-wrap block rounded-md bg-gray-200 hover:bg-gray-200 p-2'>
                    <p>{name}</p>
                </div>
                ))
            )
        }
        else {
            return (
                <div className='flex capitalize flex-col flex-wrap block rounded-md bg-gray-200 hover:bg-gray-200 p-2'>
                    <p>Informazioni Assenti</p>
                </div>
            )
        }
    }

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
                <div className="w-full flex-col items-center justify-stretch">
                {
                        categories ? categories.map(({
                            name,
                        }) => (
                            <div key={"categoriaButt" + name} 
                            className='w-full pb-2 items-center justify-between'>

                                <Button theme={{base: "rounded-md body-font font-quicksand tracking-wide text-[60px] min-h-[80px] bg-gray-200 text-primary-icon font-bold border border-none focus:border-transparent focus:ring-transparent",
                                    color: "",
                                    inner: {base:"flex flex-rows flex-nowrap justify-between"}}}
                                className="justify-stretch" fullSized onClick={() => { onClickCategory(name) }}><p>{name}</p><FaChevronLeft className='justify-self-end text-xl rotate-180'/></Button>

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
                <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                    style={{ width: "2.5em", height: "2.5em" }} onClick={onClickBackToCategorie} > <FaChevronLeft className='flex text-xl text-primary-icon' /> </Button>
                <div className="flex items-stretch ... flex-col ">
                    {   
                        Array.isArray(elements) ? elements.map(({
                        name, price, ingredients, allergens, openfoodfacts,
                    }) => (
                    <div key={"elemButton" + name} className=''>
                        <div className=''>
                        <Label className='col-span-2 text-[20px] text-end justify-self-end pr-2' value={name}/>
                        </div>
                        <div className='text-primary-icon pb-6'>
                        
                        <Label className='flex flex-wrap gap-2'>
                            Ingredienti: {(ingredients && (ingredients != "," || ingredients != "")) ? ingredients : "Nessun ingrediente."}    
                        </Label>
                        <Label className='flex flex-wrap gap-2'>
                            Allergeni:    
                        </Label>
                        <Label className='flex flex-wrap gap-2'>

                            {allergens && allergens != "," && allergens != "" ? (openfoodfacts === "true" ? splitString(allergens) : splitAllergens(allergens)) : "Nessun ingrediente."}    
                        </Label>   
                        <Label>
                            Prezzo: {price + '0€'}    
                        </Label>        
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
