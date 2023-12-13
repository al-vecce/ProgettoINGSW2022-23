
export class contiAttiviService{

    constructor(token){
        this.token = token;
    }

    getContiAttiviOrdinatiPer = ([page,ordinamento]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage?mode="+ ordinamento + "&page=" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getContiAttiviOrdinatiEFiltrati = ([page,ordinamento, filterStart, filterEnd]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + 
        "/homepage/filter?mode="+ ordinamento+ "&filterstart=" +filterStart+ "&filterend=" + filterEnd+ "&page=" + page, 
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getNumberOfPagesContiAttivi = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage/pages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    getNumberOfPagesContiAttiviFiltrati = ([filterStart, filterEnd]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage/pages?filterstart=" +filterStart+ "&filterend=" + filterEnd, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    postChiudiContoPerID = (contoID) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage/" + contoID , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());

}