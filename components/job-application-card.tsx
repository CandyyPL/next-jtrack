'use client';

import { Application, Column } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Dot, Edit2, ExternalLink, MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { deleteApplication } from '@/lib/actions/delete-application';
import { useState } from 'react';

type JobApplicationCardProps = {
  job: Application;
  columns: Column[];
};

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  const [isDeleting, setDeleting] = useState(false);

  const parseJobTags = (tags: string) => {
    const arr = tags.split(',');
    return arr;
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteApplication(job.id);
  };

  return (
    <>
      <Card
        className={`group cursor-pointer shadow-sm transition-shadow hover:shadow-lg ${isDeleting && 'pointer-events-none bg-pink-50'}`}>
        <CardContent className='px-4'>
          <div className='flex items-start justify-between gap-2'>
            <div className='min-w-0 flex-1'>
              <h3 className='mb-1 text-sm font-semibold'>{job.position}</h3>
              <div className='flex items-center'>
                <p className='text-muted-foreground text-xs'>{job.company}</p>
                <Dot className='text-muted-foreground' />
                <p className='text-muted-foreground text-base'>{job.salary}</p>
              </div>
              {job.desc && (
                <p className='text-muted-foreground my-2 line-clamp-2 text-xs'>
                  {job.desc}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className='mb-2 flex flex-wrap gap-1'>
                  {parseJobTags(job.tags).map((tag, key) => (
                    <span
                      key={key}
                      className='rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700'>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {job.url && (
                <a
                  target='_blank'
                  href={job.url}
                  className='text-primary my-1 inline-flex items-center gap-1 text-xs hover:underline'>
                  <ExternalLink className='size-3' /> Visit Offer
                </a>
              )}
            </div>
            <div className='flex items-start gap-1'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-8'>
                    <MoreVertical className='size-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-fit'>
                  <DropdownMenuItem className='cursor-pointer'>
                    <Edit2 className='mr-2 size-4' /> Edit
                  </DropdownMenuItem>
                  {columns
                    ?.filter((col) => col.id !== job.columnId)
                    .map((col) => (
                      <DropdownMenuItem
                        key={col.id}
                        className='cursor-pointer'>
                        Move to {col.name}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem
                    className='text-destructive cursor-pointer'
                    onClick={() => handleDelete()}>
                    <Trash2 className='mr-2 size-4' /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
