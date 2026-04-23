import { Application, Column } from '@/lib/types';
import JobApplicationCard from '@/components/kanban/job-application/job-application-card';

type SortableJobCardProps = {
  job: Application;
  columns: Column[];
};

export default function SortableJobCard({
  job,
  columns,
}: SortableJobCardProps) {
  return (
    <div>
      <JobApplicationCard
        job={job}
        columns={columns}
      />
    </div>
  );
}
