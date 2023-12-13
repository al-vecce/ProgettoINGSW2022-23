import { elementiContoService } from "@/services/elementiContoService";
import useSWR from "swr";
import useCurrentUserData from "./useCurrentUserData";

export const useElementiConto = (conto) =>{
    const userData = useCurrentUserData();
    const elementiContoServ = new elementiContoService(userData ? userData.token : "");
    let c;
    if(conto){
        c = conto;
    }else{
        c = '';
    }
    const { data , error, isLoading } = useSWR(c.toString(), elementiContoServ.getElementiContoOrdinatiPerID);
    return { data , error, isLoading };
}