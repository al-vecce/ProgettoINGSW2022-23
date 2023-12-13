
export class utenzeService{

    constructor(token){
        this.token = token;
    }

    getUtentiOrdinatiPer = ([page,ordinamento]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees?mode="+ordinamento+"&page=" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getNumberOfPages = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees/pages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    postUtentePerUsername = (targetUsername, username, password, ruolo) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            username: username,
            oldusername: targetUsername,
            employeerole: ruolo,
            password: password,
        })
        }
        ).then((res) => res.json());
    putUtentePerUsername = (username, password, ruolo) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            username: username,
            password: password,
            employeerole: ruolo,

        })
        }
        ).then((res) => res.json());
    deleteUtentePerUsername = (username) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`

        },
        body: JSON.stringify({
            username: username,
        })
        }
        ).then((res) => res.json());

}