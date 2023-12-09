
export class utenzeService{

    getUtentiOrdinatiPerUsername = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees?mode=BYUSERNAME", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        }
        ).then((res) => res.json());
    postUtentePerUsername = (targetUsername, username, password, ruolo) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"
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
            "Content-Type": "application/json"

        },
        body: JSON.stringify({
            username: username,
        })
        }
        ).then((res) => res.json());

}