import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const protectedPaths = ['/form'];

  // Check if the current request is for a protected path
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const token = req.cookies.get('crossmint-jwt');

    // If no token, redirect the user to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow the request to proceed if token exists or it's not a protected route
  return NextResponse.next();
}
