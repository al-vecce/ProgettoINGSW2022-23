
export class infoAttivitaService{

    constructor(token){
        this.token = token;
    }

    getInfoAttivita = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/business-information" , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json().catch((e)=>{alert(e)}));
    postInfoAttivita = (nomeAttivita, indirizzo, numeroDiTelefono, imageBase64, imageType, imageName, linkMenuQR) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/business-information" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            businessname: nomeAttivita,
            businessphonenumber: numeroDiTelefono,
            businessaddress: indirizzo,
            businesslogoencoded: imageBase64,
            businesslogotype: imageType,
            businesslogoname: imageName,
            linkmenuqr: linkMenuQR,
        }),
        }
        ).then((res) => res.json().catch((e)=>{alert(e)}));

}