'use server';

import { supabase } from '@/lib/supabase';

export async function deleteUser(userId: string) {
  await supabase.from('user').delete().eq('id', userId);
  await supabase.from('account').delete().eq('userId', userId);
}
