import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className='bg-white'>
      <main className='flex-1'>
        <section className='container mx-auto px-4 py-32'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='mb-6 text-3xl font-bold text-black'>
              A better way to track your job applications.
            </h1>
            <p className='text-muted-foreground mb-10 text-xl'>
              Capture, organize and manage your job search in one place.
            </p>
            <div className='flex flex-col items-center gap-4'>
              <Button
                size='lg'
                className='h-12 px-8 text-lg font-medium'>
                Start for free <ArrowRight className='ml-2' />
              </Button>
              <p className='text-muted-foreground text-sm'>
                Free forever. No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
