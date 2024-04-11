'use client';

import { signInWithPasskey } from '@teamhanko/passkeys-next-auth-provider/client';

import { Button } from '@/components/ui/button';

const SignInWithPasskey = () => {
  return (
    <Button
      onClick={() =>
        signInWithPasskey({
          tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
          callbackUrl: `${window.location.origin}/`,
        })
      }
      className='mt-4'
    >
      Sign In With PassKey
    </Button>
  );
};

export default SignInWithPasskey;
