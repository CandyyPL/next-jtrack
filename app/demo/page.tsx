import DemoDashboardWrapper from '@/components/dashboard/demo-dashboard-wrapper';
import { Suspense } from 'react';
import Loader from '@/components/dashboard/loader';

export default async function Demo() {
  return (
    <Suspense fallback={<Loader />}>
      <DemoDashboardWrapper />
    </Suspense>
  );
}
