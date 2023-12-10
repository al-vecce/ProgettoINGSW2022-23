import { elementiContoService } from "@/services/elementiContoService";
import useSWR from "swr";

export const useElementiConto = (conto) =>{
    const elementiContoServ = new elementiContoService();
    let c;
    if(conto){
        c = conto;
    }else{
        c = '';
    }
    const { data , error, isLoading } = useSWR(c.toString(), elementiContoServ.getElementiContoOrdinatiPerID);
    return { data , error, isLoading };
}