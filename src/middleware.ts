import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const protectedPaths = ['/form'];

  // Check if the current request is for a protected path
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const token = req.cookies.get('crossmint-jwt');

    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}
