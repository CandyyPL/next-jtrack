'use client';

import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Activity, useState } from 'react';

enum ImageTab {
  ORGANIZE,
  HIRED,
  BOARDS,
}

export default function HeroImageGallery() {
  const [activeTab, setActiveTab] = useState<ImageTab>(ImageTab.ORGANIZE);

  return (
    <section className='border-t bg-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-8 flex flex-col justify-center gap-2 md:flex-row'>
            <Button
              onClick={() => setActiveTab(ImageTab.ORGANIZE)}
              className={cn(
                'rounded-lg px-6 py-3 text-sm font-medium transition-colors',
                activeTab === ImageTab.ORGANIZE
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}>
              Organize Applications
            </Button>
            <Button
              onClick={() => setActiveTab(ImageTab.HIRED)}
              className={cn(
                'rounded-lg px-6 py-3 text-sm font-medium transition-colors',
                activeTab === ImageTab.HIRED
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}>
              Get Hired
            </Button>
            <Button
              onClick={() => setActiveTab(ImageTab.BOARDS)}
              className={cn(
                'rounded-lg px-6 py-3 text-sm font-medium transition-colors',
                activeTab === ImageTab.BOARDS
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}>
              Manage Boards
            </Button>
          </div>
          <div className='relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-lg'>
            <Activity
              mode={`${activeTab === ImageTab.ORGANIZE ? 'visible' : 'hidden'}`}>
              <Image
                src='/hero-images/hero1.png'
                alt='Organize Applications'
                width={1200}
                height={800}
              />
            </Activity>
            <Activity
              mode={`${activeTab === ImageTab.HIRED ? 'visible' : 'hidden'}`}>
              <Image
                src='/hero-images/hero2.png'
                alt='Organize Applications'
                width={1200}
                height={800}
              />
            </Activity>
            <Activity
              mode={`${activeTab === ImageTab.BOARDS ? 'visible' : 'hidden'}`}>
              <Image
                src='/hero-images/hero3.png'
                alt='Organize Applications'
                width={1200}
                height={800}
              />
            </Activity>
          </div>
        </div>
      </div>
    </section>
  );
}
