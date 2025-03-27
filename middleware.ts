import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    const response = await updateSession(request);

    // Allow authentication-related routes to proceed without restriction
    const publicRoutes = ["/auth/login", "/auth/register", "/auth/callbackurl"];
    if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return response;
    }

    // Exclude API routes completely
    // if (request.nextUrl.pathname.startsWith("/api/")) {
    //     return response;
    // }

    // Ensure user session exists before proceeding
    const userCookie = request.cookies.get("user");
    if (!userCookie) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|auth/login|auth/register|auth/callbackurl|!api/|$|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};