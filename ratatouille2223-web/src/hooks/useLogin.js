'use client';
import loginService from "@/services/loginService";
import { useCookies } from 'next-client-cookies';
export default function useLogin() {
    const cookieStore = useCookies();
    let firstLogin = null;
    const login = async (username,password) =>{
        const logger = new loginService();
        let result;
        const data = await logger.postLogin(username,password);
        if(data){
            console.log(data);
            if(data["JWT Authentication Code"] === "null"){
                result = false;
            }
            else{
                const token = data["JWT Authentication Code"];
                const parsedToken = JSON.parse(atob(token.split('.')[1]));
                const currentUser = parsedToken.upn;
                const currentUserRole = parsedToken.groups;
                cookieStore.set("token", token, "SameSite=Strict");
                cookieStore.set("currentUser", currentUser, "SameSite=Strict");
                cookieStore.set("currentUserRole", currentUserRole, "SameSite=Strict");
                firstLogin = data["firstlogin"];
                result = true;
            }
        }
        else{
            result = false;
            alert("Errore con il server");
        }
        return { result, firstLogin }
    }
    return { login }
}
