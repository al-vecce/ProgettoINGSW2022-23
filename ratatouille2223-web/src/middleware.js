import { NextResponse } from "next/server";
// import type from "next/server";
// import { authRoutes, protectedRoutes } from "./src/router/routes";

const authRoutes = "/";
const protectedRoutes = [
  "/Homepage",
  "/PrimoAccesso",
  "/SelettoreTavolo"
];
const firstAccessRoutes = "/PrimoAccesso";

export default function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const currentUserRole = request.cookies.get("currentUserRole")?.value;
  const token = request.cookies.get("token")?.value;
  const firstaccess = request.cookies.get("firstaccess")?.value;
  if (
    protectedRoutes.some((element)=>request.nextUrl.pathname.includes(element)) &&
    (!currentUser && !currentUserRole && !token  && !firstaccess)
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

  // if (!(request.nextUrl.pathname.includes(firstAccessRoutes)) && currentUser && token && currentUserRole && firstaccess ) {
  //   if(firstaccess === "true"){
  //     return NextResponse.redirect(new URL("/PrimoAccesso", request.url));
  //   }
  // }

  if (request.nextUrl.pathname === authRoutes && currentUser && token && currentUserRole && firstaccess) {
    if(currentUserRole === "ADDETTOSALA"){
      return NextResponse.redirect(new URL("/SelettoreTavolo", request.url));
    }
    else{
      return NextResponse.redirect(new URL("/Homepage", request.url));
    }
  }

}