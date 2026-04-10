import { createAuthClient } from 'better-auth/react';

export const clientAuth = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signUp, signIn, signOut, useSession } = clientAuth;
