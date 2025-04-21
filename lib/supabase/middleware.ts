import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "./server"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = await createClient()

  // Get the current session
  const { data: session, error } = await supabase.auth.getSession()

  const isAuthRoute = ["/login"].includes(request.nextUrl.pathname)
  const isProtectedRoute = request.nextUrl.pathname !== "/" && !isAuthRoute
  const isAuthenticated = !!session?.session

  // Allow unauthenticated users to access the landing page "/"
  if (!isAuthenticated && request.nextUrl.pathname === "/") {
    return response
  }

  // Redirect authenticated users away from login/register
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/companies", request.url))
  }

  // Redirect unauthenticated users trying to access protected routes (excluding "/")
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}
