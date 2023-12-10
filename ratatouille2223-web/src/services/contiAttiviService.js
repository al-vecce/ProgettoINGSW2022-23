
export class contiAttiviService{

    getContiAttiviOrdinatiPerTavolo = (page) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage?mode=BYTABLE&page=" + page, {
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