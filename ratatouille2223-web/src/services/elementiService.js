
export default class elementiService{
    getElementiCategoriaOrdinatiPerNome = ([nome, ordinamento, elementiCurrentPage]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/"+ nome +"?mode="+ ordinamento +"&page=" + elementiCurrentPage, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getNumberOfPagesElementi = ([nome]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/pages", {
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
}
