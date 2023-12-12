
export default class loginService{

    
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
    
}
