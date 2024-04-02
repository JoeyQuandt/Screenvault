import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/auth/login',
    '/auth/signup',
    '/movies',
    '/tv',
    '/bookmark',
    '/details/tv/:slug',
    '/details/movie/:slug',
  ],
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
