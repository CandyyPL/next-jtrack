'use client';

import { Application, Column } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, ExternalLink, MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type JobApplicationCardProps = {
  job: Application;
  columns: Column[];
};

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  const parseJobTags = (tags: string) => {
    const arr = tags.split(',');
    return arr;
  };

  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div>
              <h3>{job.position}</h3>
              <p>{job.company}</p>
              {job.desc && <p>{job.desc}</p>}
              {job.tags &&
                parseJobTags(job.tags).map((tag, key) => (
                  <span key={key}>{tag}</span>
                ))}
              {job.url && (
                <a
                  target='_blank'
                  href={job.url}>
                  <ExternalLink /> Visit Offer
                </a>
              )}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'>
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-fit'>
                  <DropdownMenuItem>
                    <Edit2 /> Edit
                  </DropdownMenuItem>
                  {columns
                    ?.filter((col) => col.id !== job.columnId)
                    .map((col) => (
                      <DropdownMenuItem key={col.id}>
                        Move to {col.name}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem>
                    <Trash2 /> Delete
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
