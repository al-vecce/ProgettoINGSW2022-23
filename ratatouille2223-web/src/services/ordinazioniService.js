
export default class ordinazioniService{

    constructor(token){
        this.token = token;
    }
    
    putNuovaOrdinazione = (tavolo,ordinazioni) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/review/checks", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            table: tavolo,
            orders: ordinazioni
        }),
        }
        ).then((res) => res.json());
    postNuovaOrdinazione = (tavolo,ordinazioni, checkID) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/review/checks/" + checkID, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            orders: ordinazioni
        }),
        }
        ).then((res) => res.json());
    
}
