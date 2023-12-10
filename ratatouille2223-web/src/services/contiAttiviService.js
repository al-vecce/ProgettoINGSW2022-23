
export class contiAttiviService{

    getContiAttiviOrdinatiPer = ([page,ordinamento]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage?mode="+ ordinamento + "&page=" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getContiAttiviOrdinatiEFiltrati = ([page,ordinamento, filterStart, filterEnd]) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + 
        "/homepage/filter?mode="+ ordinamento+ "&filterstart=" +filterStart+ "&filterend=" + filterEnd+ "&page=" + page, 
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    getNumberOfPagesContiAttivi = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage/pages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());

}