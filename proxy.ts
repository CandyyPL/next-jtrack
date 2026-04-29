import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

const PUBLIC_ONLY_ROUTES = ['/demo'];
const PROTECTED_ROUTES = ['/dashboard'];
const SIGN_ROUTES = ['/sign-up', '/sign-in'];

const FORBIDDEN_FALLBACK_ROUTE = '/sign-in';
const ALREADY_LOGGED_FALLBACK_ROUTE = '/dashboard';

export default async function proxy(request: NextRequest) {
  const session = await getSession();

  const isLogged = session?.user ?? false;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isPublicRouteOnly = PUBLIC_ONLY_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isSignRoute = SIGN_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(
      new URL(FORBIDDEN_FALLBACK_ROUTE, request.url)
    );
  }

  if ((isSignRoute && isLogged) || (isPublicRouteOnly && isLogged)) {
    return NextResponse.redirect(
      new URL(ALREADY_LOGGED_FALLBACK_ROUTE, request.url)
    );
  }

  return NextResponse.next();
}
