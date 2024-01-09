import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore routes starting with /api and /_next
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  // Get the session token from cookies
  let token = request.cookies.get("next-auth.session-token")?.value;

  // Define routes that are allowed without authentication
  const allowedRoutes = ["/", "/login"];
  const notAllowedRoutes = ["/admin"];

  // Check if the route is allowed without authentication
  const isRouteAllowed = allowedRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const isRouteNotAllowed = notAllowedRoutes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Redirect to login if no token and the route is not allowed
  if (!token && isRouteNotAllowed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to /admin/ if the route starts with /admin and the user is authenticated
  if (pathname.startsWith("/admin/") && token) {
    return NextResponse.next();
  }

  // For any other route, allow access
  return NextResponse.next();
}
