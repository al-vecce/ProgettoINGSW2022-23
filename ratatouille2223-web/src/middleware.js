import { NextResponse } from "next/server";
// import type from "next/server";
// import { authRoutes, protectedRoutes } from "./src/router/routes";

const authRoutes = "/";
const protectedRoutes = [
  "/Homepage",
  "/PrimoAccesso",
  "/SelettoreTavolo"
];
const amministratorRoutes = ["/Homepage/StoricoConti", "/Homepage/Menu"];
const adminRoutes = [ "/Homepage/Utenze" , "/Homepage/InfoRistorante" , "/Homepage/StampaQR", "/Homepage/Statistiche" ];
const addettoSalaRoutes = "/SelettoreTavolo";
const firstAccessRoutes = "PrimoAccesso";
const adminAndAmministratoreRoutes = "/Homepage";

export default function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const currentUserRole = request.cookies.get("currentUserRole")?.value;
  const token = request.cookies.get("token")?.value;
  const firstaccess = request.cookies.get("firstaccess")?.value;
  const currentUserisSet = ()=>{
    if(!currentUser)
      return false;
    if(!currentUserRole)
      return false;
    if(!token)
      return false;
    if(!firstaccess)
      return false;
    return true
  }
  if (
    protectedRoutes.some((element)=>request.nextUrl.pathname.includes(element)) && !currentUserisSet()
) {
    request.cookies.delete("currentUser");
    request.cookies.delete("currentUserRole");
    request.cookies.delete("token");
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("currentUser");
    response.cookies.delete("currentUserRole");
    response.cookies.delete("token");

    return response;
  }

  if (adminRoutes.some((element)=>request.nextUrl.pathname.includes(element)) && currentUserisSet()) {
    if(!(`${currentUserRole}` === "AMMINISTRATORE"))
      return NextResponse.redirect(new URL("/", request.url));
}
  // if (!(request.nextUrl.pathname.includes(firstAccessRoutes)) && currentUserisSet() ) {
  //   if(`${firstaccess}` === "true"){
  //     return NextResponse.redirect(new URL("/PrimoAccesso", request.url));
  //   }
  // }
  if(request.nextUrl.pathname.includes(adminAndAmministratoreRoutes) && currentUserisSet()){
    if(`${currentUserRole}` === "ADDETTOSALA"){
      return NextResponse.redirect(new URL("/SelettoreTavolo", request.url));
    }
  }

  if (request.nextUrl.pathname === authRoutes && currentUserisSet()) {

    if(`${firstaccess}` === "true"){
      return NextResponse.redirect(new URL("/PrimoAccesso", request.url));
    }
    
    if(`${currentUserRole}` === "ADDETTOSALA"){
      return NextResponse.redirect(new URL("/SelettoreTavolo", request.url));
    }
    else{
      return NextResponse.redirect(new URL("/Homepage", request.url));
    }
  }
  
  if (request.nextUrl.pathname.includes(addettoSalaRoutes) && currentUserisSet()) {
  
    if(!(`${currentUserRole}` === "ADDETTOSALA")){
      return NextResponse.redirect(new URL("/", request.url));
    }
    
  }

}