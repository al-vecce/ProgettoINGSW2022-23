
export class categorieService{

    getCategorieOrdinatePerNome = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories?mode=BYNAME", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    postCategoriaPerNome = (vecchioNome, nuovoNome) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + vecchioNome, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nuovoNome,
        })
        }
        ).then((res) => res.json());
    putCategoriaPerNome = (nome) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + nome, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nome,
        })
        }
        ).then((res) => res.json());
    deleteCategoriaPerNome = (nome) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/editor/categories/" + nome, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            name: nome,
        })
        }
        ).then((res) => res.json());

}