import HeroImageGallery from '@/components/main-page/hero-image-gallery';
import { Briefcase, CheckCircle2, TrendingUp } from 'lucide-react';
import MainPageStartButtons from '@/components/main-page/main-page-start-buttons';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className='bg-white'>
      <main className='flex-1'>
        <section className='container mx-auto px-4 py-32'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='mb-6 text-4xl font-bold text-black md:text-5xl lg:text-6xl'>
              A better way to track your job applications.
            </h1>
            <p className='text-muted-foreground mb-10 text-base md:text-lg lg:text-xl'>
              Capture, organize and manage your job search in one place.
            </p>
            <div className='flex flex-col items-center gap-4'>
              <Suspense>
                <MainPageStartButtons />
              </Suspense>
              <p className='text-muted-foreground text-sm'>
                Free forever. No credit card required.
              </p>
            </div>
          </div>
        </section>
        <HeroImageGallery />
        <section className='border-t py-24'>
          <div className='container mx-auto px-4'>
            <div className='grid gap-12 md:grid-cols-3'>
              <div className='flex flex-col'>
                <h3 className='mb-4 flex items-center gap-2 text-2xl font-semibold text-black'>
                  <div className='bg-primary/10 inline-flex h-12 w-12 items-center justify-center rounded-lg'>
                    <Briefcase className='text-primary size-6' />
                  </div>
                  Organize Applications
                </h3>
                <p className='text-muted-foreground'>
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>
              <div className='flex flex-col'>
                <h3 className='mb-4 flex items-center gap-2 text-2xl font-semibold text-black'>
                  <div className='bg-primary/10 inline-flex h-12 w-12 items-center justify-center rounded-lg'>
                    <TrendingUp className='text-primary size-6' />
                  </div>
                  Track Progress
                </h3>
                <p className='text-muted-foreground'>
                  Monitor your application status from applied to interview
                  offer with visual Kanban boards.
                </p>
              </div>
              <div className='flex flex-col'>
                <h3 className='mb-4 flex items-center gap-2 text-2xl font-semibold text-black'>
                  <div className='bg-primary/10 inline-flex h-12 w-12 items-center justify-center rounded-lg'>
                    <CheckCircle2 className='text-primary size-6' />
                  </div>
                  Stay Organized
                </h3>
                <p className='text-muted-foreground'>
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
