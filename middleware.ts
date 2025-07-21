// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;

  // Redirect to login if accessing protected routes without auth
  if (pathname.startsWith('/protected') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect to profile if logged in and trying to access auth pages
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/protected/profile', request.url));
  }

  return NextResponse.next();
}