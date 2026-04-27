import { useSortable } from '@dnd-kit/sortable';
import { Application, ColumnWithApplication } from '@/lib/types';
import JobApplicationCardSkeleton from '@/components/dashboard/kanban/job-application/job-application-card-skeleton';
import JobApplicationCard from '@/components/dashboard/kanban/job-application/job-application-card';

type JobApplicationCardProps = {
  job: Application;
  columns: ColumnWithApplication[];
};

export default function JobApplicationCardWrapper({
  job,
  columns,
}: JobApplicationCardProps) {
  const { isDragging, ...props } = useSortable({ id: job.id });

  return isDragging ? (
    <JobApplicationCardSkeleton
      job={job}
      props={props}
    />
  ) : (
    <JobApplicationCard
      job={job}
      columns={columns}
      props={props}
    />
  );
}
