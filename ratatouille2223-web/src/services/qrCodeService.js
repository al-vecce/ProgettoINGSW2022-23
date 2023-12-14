
export default class qrCodeService{

    constructor(token){
        this.token = token;
    }
    
    getQRBusinessInformation = () => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/business-information/qr-generation", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        }
        ).then((res) => res.json());
    postGenerateQRCode = (menuaddr) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/business-information/qr-generation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            menuaddress: menuaddr,
        }),
        }
        ).then((res) => res.json());
    
}
