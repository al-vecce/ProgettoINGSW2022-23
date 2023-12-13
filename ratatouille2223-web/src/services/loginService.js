import useCurrentUserData from "@/hooks/useCurrentUserData";

function getUserData(){
    return userData = useCurrentUserData();
}

export default class loginService{

    constructor(token){
        this.token = token;
    }
    
    postLogin = (username,password) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        }
        ).then((res) => res.json());
    postPrimoAccessoCambioPassword = (username,password,passwordConfirmation) => fetch(process.env.NEXT_PUBLIC_APIHOSTNAME + "/login/first-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
        },
        body: JSON.stringify({
            username: username,
            password: password,
            confirmation: passwordConfirmation,
        }),
        }
        ).then((res) => res.json())
        .catch((e)=>{alert(e)});
    
}
