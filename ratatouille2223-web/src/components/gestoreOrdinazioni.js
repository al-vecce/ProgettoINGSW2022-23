import React from 'react'
import { Button, ButtonGroup, Label, TextInput } from 'flowbite-react'
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { categorieService } from '@/services/categorieService';
import { useState } from 'react';
import Link from 'next/link';
import elementiService from '@/services/elementiService';
import ordinazioniService from '@/services/ordinazioniService';
import ButtonConferma2 from '@/components/buttons/buttonConferma2'
import { useRouter } from 'next/navigation';

import { Flowbite } from 'flowbite-react';
import { FaChevronLeft, FaMinus, FaPlus } from "react-icons/fa";
import { Footer } from 'flowbite-react';

import { FaFilePen } from "react-icons/fa6";

const customTheme = {
    base: "",
    button: {
        color: {
            icon: "bg-orange-500 enabled:hover:bg-orange-500 focus:bg-orange-500",
            confirm: "text-white bg-orange-500 enabled:hover:bg-yellow-500 focus:green-300",
        },
    },
};

export default function gestoreOrdinazioni({ tavolo, isContoAlreadyOpen }) {

    const [ordinazione, setOrdinazione] = useState({});
    const [descrizioni, setDescrizioni] = useState({});
    const [prezzi, setPrezzi] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [showCategories, setShowCategories] = useState(true);
    const [categories, setCategories] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const [elements, setElements] = useState(null);
    const [descriptionVisibility, setDescriptionVisibility] = useState(false);
    const [totaleOrdinazione, setTotaleOrdinazione] = useState(0);
    const userData = useCurrentUserData();
    const router = useRouter();

    if (userData && isLoading) {
        const categorieServ = new categorieService(userData ? userData.token : "");
        categorieServ.getCategorieUnpaged().then(
            (data) => {
                setCategories(data.categories);
            }
        ).then(() => setisLoading(false));
    }
    async function onClickCategory(category) {
        setCurrentCategory(category);
        setShowCategories(false);
        setisLoading(true);
        const elemServ = new elementiService(userData ? userData.token : "");
        await elemServ.getElementiCategoriaUnpaged(category).then((data) => {
            if (data) {
                setElements(data.elements);
            }
        }).then(() => setisLoading(false));

    }
    function onPlusClick(name, prezzo) {
        setOrdinazione({ ...ordinazione, [name]: ordinazione[name] ? ordinazione[name] + 1 : 1 })
        setPrezzi({ ...prezzi, [name]: prezzo })
    }
    function onMinusClick(name) {
        if (ordinazione[name]) {
            if (ordinazione[name] === 1) {
                delete ordinazione[name];
                setOrdinazione({ ...ordinazione });
                return;
            }
            if (ordinazione[name] > 0) {
                setOrdinazione({ ...ordinazione, [name]: ordinazione[name] - 1 });
            }
        }
    }
    function onClickBackToCategorie() {
        setShowCategories(true);
        setisLoading(true);
    }
    function onClickRemoveOrdinazione(key) {
        delete ordinazione[key];
        delete descrizioni[key];
        setOrdinazione({ ...ordinazione });
        setDescrizioni({ ...descrizioni });
    }
    function hideDescription(key) {
        setDescriptionVisibility({ ...descriptionVisibility, [key]: !descriptionVisibility[key] });
    }
    if (isLoading) {
        return (<h1 className='text-primary-icon'>loading...</h1>);
    }
    function categoriesTable() {

        if (!categories) {
            return (<h1 className='text-primary-icon'>loading...</h1>)
        }
        return (
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
                <div className='fixed left-0 bottom-0 w-screen h-[120px]'>
                    <div className='p-10 flex items-center justify-items-center'>
                        <Button theme={{base: "w-full h-[60px] rounded-md body-font font-quicksand tracking-wide text-[10px] bg-primary-accent1 text-white font-bold",
                            color: "",
                            inner: {base:"flex flex-rows flex-nowrap justify-between"}}} 
                            className="shadow-xl rounded-md border border-none focus:border-transparent focus:ring-transparent justify-stretch" onClick={() => { setShowReview(true) }} ><p>Review</p><FaChevronLeft className='justify-self-end text-xl rotate-180'/></Button>
                    </div>
                </div>
            </div>
        );
    }
    function elementsTable() {
        if (!elements) {
            return (<h1 className='text-primary-icon'>loading...</h1>);
        }
        return (
            <div className='w-full flex-col items-center justify-stretch gap-5'>
                <div className='pb-5'>
                    <Button className="shadow-lg rounded-md border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                        style={{ width: "2.5em", height: "2.5em" }} color="gray" onClick={onClickBackToCategorie} > <FaChevronLeft className='flex text-xl text-primary-icon' /> </Button>
                </div>
                <div className="flex flex-col items-center justify-stretch gap-2">
                    {
                        Array.isArray(elements) ? elements.map(({
                            name, price, ingredients, allergens,
                        }) => (
                            <div className='w-full gap-5'>
                            <div className='pb-3 items-start'>
                                <hr className='horizontal-line' 
                                    style={{
                                        background: "#D9D9D9",
                                        height: "2px",
                                        border: "none",
                                        }}
                                    />
                            </div>
                            <div key={"elemButton" + name} className='w-full grid grid-rows-3 grid-cols-3 bg-gray-200 rounded-md p-5 gap-4'>
                                <div className='col-span-2 text-[15px] text-start justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>{name}</div>
                                <div className='col-span-1 text-[15px] text-center justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>{price + "0€"}</div>
                                <div className='col-span-3 text-[12px] style-italics text-start justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>{ingredients}</div>
                                <div className='col-span-2 text-[15px] text-start justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>
                                    <div className="flex flex-rows flex-nowrap items-center justify-between">
                                    <Button theme={{ base: "rounded-l-md bg-primary-icon justify-self-start text-white",
                                            color: "",
                                            pill: ""
                                        }} style={{width:"2.5em", height:"2.5em"}} onClick={() => { onMinusClick(name) }}><FaMinus className='text-2xl'/></Button>
                                        
                                        <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2 pl-2 py-2' value={ordinazione[name] ? ordinazione[name] : 0} />
                                        <Button theme={{ base: "rounded-r-md bg-primary-icon justify-self-start text-white",
                                            color: "",
                                            pill: ""
                                        }} style={{width:"2.5em", height:"2.5em"}} onClick={() => { onPlusClick(name, price) }}><FaPlus className='text-2xl'/></Button> 
                                    </div>
                                </div>
                                <div className='col-span-1 text-[15px] text-center items-center justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>{ordinazione[name] ? (price * ordinazione[name]) + "€" :  "0€"}</div>
                                
                            </div>
                            </div>))
                            : null
                    }
                </div>
            </div>
        );
    }
    function orderisEmpty() {
        let result = true;
        Object.keys(ordinazione).forEach(key => {
            if (ordinazione[key] > 0)
                result = false;
        });
        return result;
    }
    function reviewTable() {
        const getTotale = () => {
            let totale = 0;
            Object.keys(ordinazione).forEach(key => {
                totale += ordinazione[key] * prezzi[key];
            })
            return totale;
        }
        const sendOrder = async () => {
            let ordinazioneCompleta = [];
            Object.keys(ordinazione).forEach(key => {
                ordinazioneCompleta.push({
                    "element_name": key,
                    "quantity": ordinazione[key] ? ordinazione[key] : 0,
                    "current_price": prezzi[key] ? prezzi[key] : 0,
                    "description": descrizioni[key] ? (descrizioni[key] === "" ? " " : descrizioni[key]) : " "
                });
            })
            console.log(ordinazioneCompleta);
            const ordinazioniServ = new ordinazioniService(userData ? userData.token : "");
            if (isContoAlreadyOpen ? isContoAlreadyOpen : true) {
                await ordinazioniServ.putNuovaOrdinazione(tavolo ? tavolo : -1, ordinazioneCompleta)
                    .then(res => {
                        if (res) {
                            if (res.result.includes("true")) {
                                alert("ordinazione completata con successo");
                            }
                            else
                                alert("ordinazione fallita");
                        } else
                            alert("ordinazione fallita");
                    })
                    .catch(e => { alert(e); })
            }
            else {
                await ordinazioniServ.postNuovaOrdinazione(tavolo ? tavolo : -1, ordinazioneCompleta)
                    .then(res => {
                        if (res) {
                            if (res.result.includes("true")) {
                                alert("ordinazione completata con successo");
                            }
                            else
                                alert("ordinazione fallita");
                        } else
                            alert("ordinazione fallita");
                    })
                    .catch(e => { alert(e); })
            }

        }
        console.log(Object.keys(ordinazione));
        return (
            <div className='w-full h-full flex-col items-center justify-stretch gap-5'>
                <div className='pb-5'>
                    <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                        style={{ width: "2.5em", height: "2.5em" }} onClick={() => { setShowReview(false) }} > <FaChevronLeft className='flex text-xl text-primary-icon' /> </Button>
                </div>
                <div>
                    {console.log(ordinazione)}
                    {Object.keys(ordinazione).map(key => {
                        return (
                            <div className='w-full gap-5'>
                            <div className='pb-3 items-start'>
                                <hr className='horizontal-line' 
                                    style={{
                                        background: "#D9D9D9",
                                        height: "2px",
                                        border: "none",
                                        }}
                                    />
                            </div>
                            <div className='w-full grid grid-rows-3 grid-cols-3 bg-gray-200 rounded-md p-5 gap-4'>

                                <div className='col-span-2 text-[15px] text-start justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>{key}  </div>
                                <Button theme={{ base: "col-span-1 rounded-md bg-primary-icon items-center justify-between text-primary-icon bg-white",
                                            color: "",
                                            pill: "",
                                        }} onClick={() => { hideDescription(key) }}><p>Note</p><FaFilePen className='text-xl'/></Button>
                                <div className="col-span-3" hidden={descriptionVisibility[key]}><TextInput value={descrizioni[key] ? descrizioni[key] : ""}
                                        id="Descriz"
                                        placeholder="Descrizione"
                                        onChange={(event) => setDescrizioni({ ...descrizioni, [key]: event.target.value })} />
                                </div>
                                <div className='col-span-2 text-[15px] text-start justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>
                                    <div className="flex flex-rows flex-nowrap items-center justify-between">
                                    <Button theme={{ base: "rounded-l-md bg-primary-icon justify-self-start text-white",
                                            color: "",
                                            pill: ""
                                        }} style={{width:"2.5em", height:"2.5em"}} onClick={() => { onMinusClick(key) }}><FaMinus className='text-2xl'/></Button>
                                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2 pl-2 py-2' value={ordinazione[key] ? ordinazione[key] : 0} />
                                    <Button theme={{ base: "rounded-r-md bg-primary-icon justify-self-start text-white",
                                            color: "",
                                            pill: ""
                                        }} style={{width:"2.5em", height:"2.5em"}} onClick={() => { onPlusClick(key, prezzi[key]) }}><FaPlus className='text-2xl'/></Button>
                                    </div>
                                </div>
                                <div className='col-span-1 text-[15px] text-center justify-self-stretch bg-white rounded-md pr-2 items-center justify-center text-primary-icon p-2'>{ordinazione[key] ? ordinazione[key] * prezzi[key] + "€" : '0€'}</div>
                                {/*<Button theme={{ base: "col-span-1 rounded-md bg-primary-icon items-center justify-between text-primary-icon bg-primary-error",
                                            color: "",
                                            pill: "",
                                        }} onClick={() => { onClickRemoveOrdinazione(key) }} >X</Button>*/}
                            </div>
                            </div>
                        );
                    })}
                </div>
                <div className='fixed left-0 bottom-0 w-screen h-[120px]'>
                    <div className='p-8 flex items-center justify-evenly gap-4' style={{zIndex: "50"}}>
                        <Button theme={{base: "shadow-xl w-[30%] h-[60px] rounded-md body-font font-quicksand tracking-wide text-[10px] bg-primary-2 text-white font-bold items-center justify-center",
                            color: "",
                            inner: {base:"flex flex-rows flex-nowrap justify-between"}}} 
                            className="shadow-xl rounded-md border border-none focus:border-transparent focus:ring-transparent justify-stretch" onClick={sendOrder} disabled={orderisEmpty()} ><p>Conferma</p></Button>
                        <ButtonConferma2 icona='Annulla' clickConfermaAction={() => { router.push("/SelettoreTavolo") }}> Annullare l'ordine? </ButtonConferma2>
                        <div className='w-[40%] h-[60px] text-primary-icon block bg-primary-accent1 rounded-md p-4 shadow-xl'>
                            <Label className=' text-[15px] text-white text-center'>Totale: {getTotale() + '€'}</Label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {!showReview ? (showCategories ? categoriesTable() : elementsTable()) : reviewTable()}
        </div>
    )
}
