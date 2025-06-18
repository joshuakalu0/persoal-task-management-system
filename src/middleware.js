import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  // const isPublicPath =
  //   pathname === "/" || // Landing page
  //   pathname.startsWith("/auth/") || // Auth pages (login, register)
  //   pathname.startsWith("/_next/") || // Next.js internal routes
  //   pathname.startsWith("/api/auth/") || // Auth API routes
  //   pathname.includes(".") || // Static files
  //   pathname === "/favicon.ico";

  // // Get the token from the cookies
  // const token = request.cookies.get("auth-token")?.value;
  // const verifiedToken = token ? await verifyJWT(token) : null;
  // const isAuthenticated = verifiedToken?.payload && !verifiedToken?.expired;

  // // Protected API routes (all API routes except auth routes)
  // if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
  //   if (!isAuthenticated) {
  //     return new NextResponse(
  //       JSON.stringify({ error: "Authentication required" }),
  //       {
  //         status: 401,
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //   }
  //   return NextResponse.next();
  // }

  // // Redirect authenticated users away from auth pages
  // if (isAuthenticated && pathname.startsWith("/auth/")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // // Redirect unauthenticated users to login page for protected routes
  // if (!isAuthenticated && !isPublicPath) {
  //   const loginUrl = new URL("/auth/login", request.url);
  //   loginUrl.searchParams.set("from", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
// export const config = {
//   matcher: [
//     // Match all paths except static files and images
//     "/((?!_next/static|_next/image|favicon.ico).*)",

//     // Match API routes
//     "/api/:path*",

//     // Match auth routes
//     "/auth/:path*",

//     // Match dashboard routes
//     "/dashboard/:path*",

//     // Match project routes
//     "/projects/:path*",

//     // Match task routes
//     "/tasks/:path*",
//   ],
// };
