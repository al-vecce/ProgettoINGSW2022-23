import React from 'react'
import { Button, ButtonGroup, Label, TextInput } from 'flowbite-react'
import useCurrentUserData from '@/hooks/useCurrentUserData';
import { categorieService } from '@/services/categorieService';
import { useState } from 'react';
import Link from 'next/link';
import elementiService from '@/services/elementiService';
import ordinazioniService from '@/services/ordinazioniService';
import ButtonConferma from '@/components/buttons/buttonConferma'
import { useRouter } from 'next/navigation';

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

export default function gestoreOrdinazioni({ tavolo, checkID }) {

    const [ordinazione, setOrdinazione] = useState({});
    const [descrizioni, setDescrizioni] = useState({});
    const [prezzi, setPrezzi] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [showCategories, setShowCategories] = useState(true);
    const [categories, setCategories] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const [elements, setElements] = useState(null);
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
    if (isLoading) {
        return (<h1 className='text-primary-icon'>loading...</h1>);
    }
    function categoriesTable() {

        if (!categories) {
            return (<h1 className='text-primary-icon'>loading...</h1>)
        }
        return (
            <div>
                <div className="">
                    {
                        categories ? categories.map(({
                            name,
                        }) => (
                            <div key={"categoriaButt" + name} className=''>

                                <Button className="scale-100 shadow-xl rounded-none" style={{ width: '23em' }} color="gray" onClick={() => { onClickCategory(name) }}><h1>{name}</h1></Button>

                            </div>))
                            : null
                    }
                </div>
                <div className='flex gap-2 y-2'>
                    <Flowbite theme={{ theme: customTheme }}>
                        <Button className="gap-2 scale-100 shadow-xl rounded-none border border-none focus:border-transparent focus:ring-transparent" style={{ width: '23em' }} color="confirm" onClick={() => { setShowReview(true) }} >Review</Button>
                    </Flowbite>
                </div>
            </div>
        );
    }
    function elementsTable() {
        if (!elements) {
            return (<h1 className='text-primary-icon'>loading...</h1>);
        }
        return (
            <div>
                <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                    style={{ width: "2.5em", height: "2.5em" }} onClick={onClickBackToCategorie} > <FaChevronLeft className='flex text-xl text-primary-icon' /> </Button>
                <div className="flex items-stretch ... flex-col ">
                    {
                        Array.isArray(elements) ? elements.map(({
                            name, price, ingredients, allergens,
                        }) => (
                            <div key={"elemButton" + name} className='scale-100 rounded-none border border-none shadow-sm'>
                                <div className="flex justify-left scale-100 rounded-none border border-none" style={{ width: '23em' }} >
                                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2' value={name} />
                                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2' value={price + "0€"} />

                                </div>
                                <Label className='col-span-2 text-[10px] text-end justify-self-end pr-2' value={ingredients} />
                                <div className="flex justify-center scale-100 rounded-none border border-none" style={{ width: '23em' }} >
                                    <Button size='sm' color="gray" onClick={() => { onPlusClick(name, price) }}><h1>+</h1></Button>
                                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2 pl-2 py-2' value={ordinazione[name] ? ordinazione[name] : 0} />
                                    <Button size='sm' color="gray" onClick={() => { onMinusClick(name) }}><h1>-</h1></Button>
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
            if (!checkID) {
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
                await ordinazioniServ.postNuovaOrdinazione(tavolo ? tavolo : -1, ordinazioneCompleta, checkID)
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
            <div>
                <div>
                    <Button className="shadow-lg rounded-md bg-white border border-none enabled:hover:bg-gray-200 focus:border-transparent focus:ring-transparent"
                        style={{ width: "2.5em", height: "2.5em" }} onClick={() => { setShowReview(false) }} > <FaChevronLeft className='flex text-xl text-primary-icon' /> </Button>
                </div>
                <div>
                    {Object.keys(ordinazione).map(key => {
                        return (
                            <div className='scale-95 rounded-none border border-none shadow-sm'>
                                <h1 className='text-primary-icon'>
                                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2 pl-2'>{key}:{ordinazione[key]} {'Prezzo:' + prezzi[key] + '0€'} </Label>
                                </h1>
                                <div className="flex justify-center scale-100 rounded-none border border-none" style={{ width: '23em' }}>
                                    <Button size='sm' color="gray" onClick={() => { onPlusClick(key, prezzi[key]) }}><h1>+</h1></Button>
                                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2 pl-2 py-2' value={ordinazione[key] ? ordinazione[key] : 0} />
                                    <Button size='sm' color="gray" onClick={() => { onMinusClick(key) }}><h1>-</h1></Button>

                                    <TextInput value={descrizioni[key] ? descrizioni[key] : ""}
                                        id="Descriz"
                                        placeholder="Descrizione"
                                        onChange={(event) => setDescrizioni({ ...descrizioni, [key]: event.target.value })} />
                                    <Button size='sm' color="gray" onClick={() => { onClickRemoveOrdinazione(key) }} >X</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='text-primary-icon'>
                    <Label className='col-span-2 text-[15px] text-end justify-self-end pr-2 pl-4'>Totale: {getTotale() + '€'}</Label>
                </div>
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <ButtonGroup className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                        <Button color='success' onClick={sendOrder} disabled={orderisEmpty()} >Conferma</Button>
                        <ButtonConferma icona='Annulla' clickConfermaAction={() => { router.push("/SelettoreTavolo") }}> Annullare l'ordine? </ButtonConferma>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
    if(!tavolo){
        return (
        <div>
            <div className='text-red-700 text-center'>
                Nessun tavolo selezionato!
            </div>
            <Link href={"/SelettoreTavolo"} passHref>
                <Button>Back to selettore tavolo</Button>
            </Link>
        </div>)
    }
    return (
        <div>
            {!showReview ? (showCategories ? categoriesTable() : elementsTable()) : reviewTable()}
        </div>
    )
}
