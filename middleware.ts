import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;

  // 1. Always allow auth callback route
  if (pathname.startsWith('/auth/callback')) {
    return NextResponse.next();
  }

  // 2. Allow static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // 3. Redirect to profile if logged in and trying to access auth pages (except callback)
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/protected/profile', request.url));
  }

  // 4. Redirect to login if accessing protected routes without auth
  if (pathname.startsWith('/protected') && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}