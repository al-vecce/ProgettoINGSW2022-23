
export class elementiContoService{

    constructor(token){
        this.token = token;
    }

    getElementiContoOrdinatiPerID = (conto) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage/" + conto + "/orders?mode=BYID", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());

}