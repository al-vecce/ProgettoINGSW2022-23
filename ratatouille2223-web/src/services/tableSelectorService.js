
export class tableSelectorService{

    constructor(token){
        this.token = token;
    }

    postTavoloToGetStatus = (tavolo) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/table-selector/" + tavolo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());

}