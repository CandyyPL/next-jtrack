import { betterAuth } from 'better-auth';
import { headers } from 'next/headers';
import { Pool } from 'pg';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.SUPABASE_DB_URL!,
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
