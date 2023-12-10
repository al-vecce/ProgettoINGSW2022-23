
export class elementiContoService{

    getElementiContoOrdinatiPerID = (conto) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/homepage/" + conto + "/orders?mode=BYID", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());

}