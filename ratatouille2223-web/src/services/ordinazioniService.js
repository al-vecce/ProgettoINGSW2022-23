
export default class qrCodeService{

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
    postNuovaOrdinazione = (tavolo,ordinazioni) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/review/checks/" + tavolo, {
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
