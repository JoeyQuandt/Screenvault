import NextAuth from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';

// @ts-expect-error this is not generated in the API that is why this commented
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
