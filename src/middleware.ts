import { NextResponse } from 'next/server';

export async function middleware(request: any) {
  const cookies = request.cookies;

  // Get the 'next-auth.session-token' value
  const sessionToken = cookies?.get('next-auth.session-token')?.value;

  if (sessionToken && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!sessionToken && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
