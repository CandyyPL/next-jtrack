import { Application, SortableProps } from '@/lib/types';
import { Card, CardContent } from '@/components/shadcn/card';
import { ExternalLink } from 'lucide-react';

import { CSS } from '@dnd-kit/utilities';

type JobApplicationCardProps = {
  job: Application;
  props: SortableProps;
};

export default function JobApplicationCardSkeleton({
  job,
  props,
}: JobApplicationCardProps) {
  const { attributes, setNodeRef, transform, transition } = props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <Card
        {...attributes}
        ref={setNodeRef}
        style={style}
        className='cursor-grab border-2 border-dashed shadow-sm ring-0 transition-shadow'>
        <CardContent className='p-0 opacity-75'>
          <div className='flex items-stretch px-4'>
            <div className='min-w-0 flex-1'>
              <h3 className='mb-1 text-sm font-semibold text-transparent'>
                {job.position}
              </h3>
              <div className='flex items-center'>
                <p className='text-xs text-transparent'>{job.company}</p>
                {job.salary && (
                  <p className='text-base text-transparent'>{job.salary}</p>
                )}
              </div>
              {job.desc && (
                <p className='my-2 line-clamp-2 text-xs text-transparent'>
                  {job.desc}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className='mb-2 flex flex-wrap gap-1'>
                  {job.tags.split(',').map((tag, key) => (
                    <span
                      key={key}
                      className='rounded-full px-2 py-0.5 text-xs text-transparent'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {job.url && (
                <a
                  target='_blank'
                  href={job.url}
                  className='my-1 inline-flex items-center gap-1 text-xs text-transparent'>
                  <ExternalLink className='size-3 text-transparent' /> Visit
                  Offer
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
