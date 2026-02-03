import { authServer } from '@/lib/auth/server';
import Transition from '@/lib/transition';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
};

export default async function Account() {
  const { data: session } = await authServer.getSession();
  return (
    <Transition>
      <h2 className='text-white mb-6'>Account</h2>
      <h2 className='text-white'>{session?.user.name}</h2>
    </Transition>
  );
}
