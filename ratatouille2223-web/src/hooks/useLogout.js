import { useCookies } from 'next-client-cookies';


export default function useLogout() {
    const cookieStore = useCookies();
    
    const logout = () =>{
        cookieStore.remove("currentUser");
        cookieStore.remove("currentUserRole");
        cookieStore.remove("token");
        cookieStore.remove("firstaccess");
    }

    return { logout };
}
