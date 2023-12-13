
export default class elementiService{
    getElementiCategoriaOrdinatiPerNome = ([nome, ordinamento, elementiCurrentPage]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ nome +"?mode="+ ordinamento +"&page=" + elementiCurrentPage, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getNumberOfPagesElementi = ([nome]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+nome+"/pages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    deleteElementoPerNome = (nomeCategoria, nomeElemento) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + nomeCategoria + "/" + nomeElemento, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"

        },
        }
        ).then((res) => res.json());
    putElementoInCategoria = ([categoria, nomeNuovoElemento, prezzo, ingredienti, allergeni, priority, second_name, second_ingredients]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ categoria + "/"+ nomeNuovoElemento, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: prezzo,
            ingredients: ingredienti,
            allergens: allergeni,
            second_name: second_name,
            second_ingredients: second_ingredients,
            openfoodfacts: false,
            openfoodfacts_identifier: "",
            priority: priority,
        })
        }
        ).then((res) => res.json());
    putElementoInCategoriaConOFF = ([categoria, nomeNuovoElemento, prezzo, ingredienti, allergeni, priority, second_name, second_ingredients, openfoodfacts_identifier]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ categoria + "/"+ nomeNuovoElemento, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: prezzo,
            ingredients: ingredienti,
            allergens: allergeni,
            second_name: second_name,
            second_ingredients: second_ingredients,
            openfoodfacts: true,
            openfoodfacts_identifier: openfoodfacts_identifier,
            priority: priority,
        })
        }
        ).then((res) => res.json());
    postElementoInCategoria = ([categoria, oldNomeElemento, nuovoNomeElemento, prezzo, ingredienti, allergeni, priority, second_name, second_ingredients]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ categoria + "/"+ oldNomeElemento, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nuovoNomeElemento,
            price: prezzo,
            ingredients: ingredienti,
            allergens: allergeni,
            second_name: second_name,
            second_ingredients: second_ingredients,
            openfoodfacts: false,
            openfoodfacts_identifier: "",
            priority: priority,
        })
        }
        ).then((res) => res.json());
    postElementoInCategoriaConOFF = ([categoria, nomeNuovoElemento, prezzo, ingredienti, allergeni, priority, second_name, second_ingredients, openfoodfacts_identifier]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ categoria + "/"+ nomeNuovoElemento, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: prezzo,
            name:nomeNuovoElemento,
            ingredients: ingredienti,
            allergens: allergeni,
            second_name: second_name,
            second_ingredients: second_ingredients,
            openfoodfacts: true,
            openfoodfacts_identifier: openfoodfacts_identifier,
            priority: priority,
        })
        }
        ).then((res) => res.json());
}
