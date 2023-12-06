
export default class loginService{
    
    async postLogin(username,password){
        const url = process.env.NEXT_PUBLIC_APIHOSTNAME + "/login";

        let data = null;
        try{
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            }
            );
        data = await response.json();
        }catch(error){
            console.error(error);
        };

        if(data != null){
            console.log(data["JWT Authentication Code"]);
            return {
                JWTAuthenticationCode : data["JWT Authentication Code"],
                firstlogin : data.firstlogin,
            };
        }
        return data;
    }
    
}
