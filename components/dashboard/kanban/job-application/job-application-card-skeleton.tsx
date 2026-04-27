import { Application } from '@/lib/types';
import { Card, CardContent } from '@/components/shadcn/card';
import { Dot, ExternalLink } from 'lucide-react';

type JobApplicationCardProps = {
  job: Application | null;
};

export default function JobApplicationCardSkeleton({
  job,
}: JobApplicationCardProps) {
  const parseJobTags = (tags: string) => {
    return tags.split(',');
  };

  return (
    <>
      <Card className='group cursor-grabbing shadow-sm'>
        <CardContent className='px-4'>
          <div className='min-w-0 flex-1'>
            <h3 className='mb-1 text-sm font-semibold'>{job?.position}</h3>
            <span>Order: {job?.listOrder}</span>
            <div className='flex items-center'>
              <p className='text-muted-foreground text-xs'>{job?.company}</p>
              <Dot className='text-muted-foreground' />
              <p className='text-muted-foreground text-base'>{job?.salary}</p>
            </div>
            {job?.desc && (
              <p className='text-muted-foreground my-2 line-clamp-2 text-xs'>
                {job?.desc}
              </p>
            )}
            {job?.tags && job?.tags.length > 0 && (
              <div className='mb-2 flex flex-wrap gap-1'>
                {parseJobTags(job?.tags).map((tag, idx) => (
                  <span
                    key={idx}
                    className='rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700'>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {job?.url && (
              <a
                target='_blank'
                href={job?.url}
                className='text-primary my-1 inline-flex items-center gap-1 text-xs hover:underline'>
                <ExternalLink className='size-3' /> Visit Offer
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
