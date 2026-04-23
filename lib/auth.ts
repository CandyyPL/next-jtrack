import { betterAuth } from 'better-auth';
import { headers } from 'next/headers';
import { Pool } from 'pg';
import { initUserBoards } from '@/lib/actions/init-user-board';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.SUPABASE_DB_URL!,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id != null) {
            await initUserBoards(user.id);
          }
        },
      },
    },
  },
});

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
