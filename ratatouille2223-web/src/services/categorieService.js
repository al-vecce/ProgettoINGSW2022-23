import useCurrentUserData from "@/hooks/useCurrentUserData";

export class categorieService{

    constructor(token){
        this.token = (token ? token : "");
    }

    getCategorieOrdinatePer = ([page,ordinamento]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories?mode="+ ordinamento + "&page=" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getCategorieUnpaged = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories?mode=UNPAGED&page=0", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());    
    getNumberOfPagesCategorie = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/pages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    postCategoriaPerNome = (vecchioNome, nuovoNome, priority) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + vecchioNome, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            name: nuovoNome,
            priority: priority,
        })
        }
        ).then((res) => res.json());
    putCategoriaPerNome = (nome, priority) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + nome, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            priority: priority,
        })
        }
        ).then((res) => res.json());
    deleteCategoriaPerNome = (nome) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + nome, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`

        },
        body: JSON.stringify({
            name: nome,
        })
        }
        ).then((res) => res.json());

}