
export class menuService{

    constructor(token){
        this.token = token;
    }

    getMenuCategories = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getMenuCategoryElements = (categoria) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/categories/" + categoria, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getMenuBusinessInfo = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/menu/categories/business", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());

}