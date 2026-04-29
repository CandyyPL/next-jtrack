import StartButton from '@/components/main-page/start-button';
import TryButton from '@/components/main-page/try-button';
import { getSession } from '@/lib/auth';
import DashboardButton from '@/components/main-page/dashboard-button';

export default async function MainPageStartButtons() {
  const session = await getSession();

  return (
    <>
      {session?.user ? <DashboardButton /> : <StartButton />}
      {!session?.user && <TryButton />}
    </>
  );
}
