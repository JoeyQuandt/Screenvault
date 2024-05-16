'use client';

import {
  create,
  type CredentialCreationOptionsJSON,
} from '@github/webauthn-json';

import {
  finishServerPasskeyRegistration,
  startServerPasskeyRegistration,
} from '@/lib/passkey';

import { Button } from '@/components/ui/button';

const RegisterNewPasskey = () => {
  async function registerPasskey() {
    const createOptions = await startServerPasskeyRegistration();
    const credential = await create(
      createOptions as CredentialCreationOptionsJSON,
    );

    await finishServerPasskeyRegistration(credential);
  }
  return (
    <Button onClick={() => registerPasskey()}>Register a new passkey</Button>
  );
};

export default RegisterNewPasskey;
