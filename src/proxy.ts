import { neonAuthMiddleware } from '@neondatabase/auth/next/server';

import { authServer } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

const delegate = neonAuthMiddleware({
  loginUrl: '/',
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isWatchlist = pathname.includes('/watchlist');
  const isAccount = pathname.startsWith('/account');

  if (isWatchlist || isAccount) {
    const { data } = await authServer.getSession();
    const isLoggedIn = data && data.user;

    if (!isLoggedIn) {
      if (isWatchlist) {
        return NextResponse.redirect(new URL('/404', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return delegate(request);
}

export const config = {
  matcher: ['/account/:path*', '/:path*/watchlist'],
};
