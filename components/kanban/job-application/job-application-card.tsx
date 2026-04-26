import { Application, Column } from '@/lib/types';
import { Card, CardContent } from '@/components/shadcn/card';
import { Dot, Edit2, ExternalLink, MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { Button } from '@/components/shadcn/button';
import { deleteApplication } from '@/lib/actions/delete-application';
import { useState } from 'react';
import { updateApplication } from '@/lib/actions/update-application';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type JobApplicationCardProps = {
  job: Application;
  columns: Column[];
};

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  const [disabled, setDisabled] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const parseJobTags = (tags: string) => {
    const arr = tags.split(',');
    return arr;
  };

  const handleDelete = async () => {
    setDisabled(true);
    await deleteApplication(job.id);
  };

  const handleMove = async (tagetColumnId: string) => {
    setDisabled(true);
    await updateApplication(job.id, {
      columnId: tagetColumnId,
    });
    setDisabled(false);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        {...attributes}
        style={style}
        className={`group cursor-grab shadow-sm transition-shadow hover:shadow-lg ${disabled && 'pointer-events-none bg-gray-100'} ${isDragging ? 'cursor-grabbing opacity-40' : null}`}>
        <CardContent className='px-4'>
          <div className='flex items-start justify-between gap-2'>
            <div
              {...listeners}
              className='min-w-0 flex-1'>
              <h3 className='mb-1 text-sm font-semibold'>{job.position}</h3>
              <span>Order: {job.listOrder}</span>
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
            <div className='flex gap-1'>
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
                        className='cursor-pointer'
                        onClick={() => handleMove(col.id)}>
                        Move to {col.name}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem
                    className='text-destructive cursor-pointer'
                    onClick={() => handleDelete()}>
                    <Trash2 className='mr-2 size-4' /> Delete
                    {/* TODO: add delete confirm dialog */}
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
