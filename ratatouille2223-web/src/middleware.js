import { NextResponse } from "next/server";
// import type from "next/server";
// import { authRoutes, protectedRoutes } from "./src/router/routes";

const authRoutes = "/Login"
const protectedRoutes = [
  "/Homepage",
  "/FirstLogin",
  "/SelettoreTavolo"
]

export default function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const currentUserRole = request.cookies.get("currentUserRole")?.value;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}