import { Application, ColumnWithApplication, SortableProps } from '@/lib/types';
import { Card, CardContent } from '@/components/shadcn/card';
import {
  Dot,
  Edit2,
  ExternalLink,
  MoreVertical,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { Button } from '@/components/shadcn/button';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useColumns } from '@/lib/hooks/useColumns';
import { deleteApplication } from '@/lib/actions/delete-application';
import EditJobDialog from '@/components/dialogs/edit-job-dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type JobApplicationCardProps = {
  job: Application;
  columns: ColumnWithApplication[];
  props: SortableProps;
};

export default function JobApplicationCard({
  job,
  columns,
  props,
}: JobApplicationCardProps) {
  const { handleMoveJob, handleDeleteJob, isApplicationUpdated } = useColumns();
  const [disabled, setDisabled] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteJob = async (jobId: string) => {
    setDisabled(true);
    handleDeleteJob(jobId);
    await deleteApplication(jobId);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        {...attributes}
        style={style}
        className={`cursor-grab shadow-sm transition-shadow hover:shadow-lg ${disabled && 'pointer-events-none bg-gray-100'}`}>
        <CardContent className='p-0'>
          <div className='flex items-stretch px-4'>
            <div
              {...listeners}
              className='min-w-0 flex-1'>
              <h3 className='mb-1 text-sm font-semibold'>{job.position}</h3>
              <div className='flex items-center'>
                <p className='text-muted-foreground text-xs'>{job.company}</p>
                {job.salary && (
                  <>
                    <Dot className='text-muted-foreground' />
                    <p className='text-muted-foreground text-base'>
                      {job.salary}
                    </p>
                  </>
                )}
              </div>
              {job.desc && (
                <p className='text-muted-foreground my-2 line-clamp-2 text-xs'>
                  {job.desc}
                </p>
              )}
              {job.tags && job.tags.length > 0 && (
                <div className='mb-2 flex flex-wrap gap-1'>
                  {job.tags.split(',').map((tag, key) => (
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
            <div className='flex flex-col items-center justify-between'>
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
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => setEditDialogOpen(true)}>
                    <Edit2 className='mr-2 size-4' /> Edit
                  </DropdownMenuItem>
                  {columns
                    ?.filter((col) => col.id !== job.columnId)
                    .map((col) => (
                      <DropdownMenuItem
                        key={col.id}
                        className='cursor-pointer'
                        onClick={() => handleMoveJob(job, col.id, -1)}>
                        Move to {col.name}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem
                    className='text-destructive cursor-pointer'
                    onClick={() => deleteJob(job.id)}>
                    <Trash2 className='mr-2 size-4' /> Delete
                    {/* TODO: add delete confirm dialog */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {isApplicationUpdated(job.id) && (
                <HoverCard
                  openDelay={10}
                  closeDelay={100}>
                  <HoverCardTrigger
                    asChild
                    className='cursor-default'>
                    <TriangleAlert className='text-red-400' />
                  </HoverCardTrigger>
                  <HoverCardContent className='flex w-56 justify-center bg-red-50'>
                    <p className='text-sm font-medium'>
                      Remember to save changes!
                    </p>
                  </HoverCardContent>
                </HoverCard>
              )}
              <EditJobDialog
                job={job}
                open={editDialogOpen}
                setOpen={setEditDialogOpen}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
