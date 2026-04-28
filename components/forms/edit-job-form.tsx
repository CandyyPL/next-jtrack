import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormSchema, JobFormDataType, Application } from '@/lib/types';
import JobForm from '@/components/forms/job-form';

type Props = {
  job: Application;
  closeDialog: () => void;
  columnId: string;
};

export default function EditJobForm({ job, closeDialog, columnId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      company: job.company,
      position: job.position,
      location: job.location,
      salary: job.salary,
      url: job.url,
      tags: job.tags,
      desc: job.desc,
    },
  });

  const onSubmit = async (data: JobFormDataType) => {
    setLoading(true);
    console.log(data);
    // const error = await createApplication(data, columnId);
    //
    // if (error) {
    //   setError(error.details);
    //   setLoading(false);
    //   return;
    // }
    //
    // setLoading(false);
    closeDialog();
  };

  return (
    <JobForm
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      submitButtonText='Save'
    />
  );
}
