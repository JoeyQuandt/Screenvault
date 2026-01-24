'use server';

import { authServer } from '@/lib/auth/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signUpWithEmail(
  _prevState: {
    error?: string;
    success?: boolean;
    message?: string;
    needsOtp?: boolean;
    email?: string;
  } | null,
  formData: FormData,
) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email address must be provided.' };
  }

  const { error, data } = await authServer.signUp.email({
    email,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    return { error: error.message || 'Failed to create account' };
  }

  if (data?.user && !data.user.emailVerified) {
    return {
      success: true,
      needsOtp: true,
      email: data.user.email,
      message:
        'Account created! Please enter the verification code to continue.',
    };
  }

  revalidatePath('/'), redirect('/');
}
