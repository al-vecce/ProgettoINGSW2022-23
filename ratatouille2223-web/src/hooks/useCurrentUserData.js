import { useEffect, useState } from "react";
import { useCookies } from 'next-client-cookies';

export default function useCurrentUserData() {
    const cookieStore = useCookies();
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        const currentUser = cookieStore.get("currentUser");
        const currentUserRole = cookieStore.get("currentUserRole");
        const token = cookieStore.get("token");
        if(currentUser && currentUserRole){
            setUserData({
                currentUser: currentUser,
                currentUserRole: currentUserRole,
                token: token
            })
        }
    }, []);
    
    return userData;
}
