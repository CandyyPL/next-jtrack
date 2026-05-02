import DemoDashboard from '@/components/dashboard/demo/demo-dashboard';
import { userAgent } from 'next/server';
import { headers } from 'next/headers';
import MobileHydrator from '@/components/mobile-hydrator';

export default async function DemoDashboardWrapper() {
  const { device } = userAgent({ headers: await headers() });
  const isMobile = device.type === 'mobile' || device.type === 'tablet';

  return (
    <>
      <MobileHydrator isMobile={isMobile} />
      <DemoDashboard />
    </>
  );
}
