import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormSchema, JobFormDataType } from '@/lib/types';
import { createApplication } from '@/lib/actions/create-application';
import JobForm from '@/components/forms/job-form';
import { useColumns } from '@/lib/hooks/useColumns';

type Props = {
  closeDialog: () => void;
  columnId: string;
};

export default function CreateJobForm({ closeDialog, columnId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, handleAddJob } = useColumns();

  const form = useForm({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      company: '',
      position: '',
      location: '',
      salary: '',
      url: '',
      tags: '',
      desc: '',
    },
  });

  const onSubmit = async (data: JobFormDataType) => {
    setLoading(true);
    if (!isAuthenticated()) {
      const job = {
        ...data,
        id: Date.now().toString(),
        columnId,
        listOrder: 0,
      };
      handleAddJob(job, columnId);
    } else {
      const error = await createApplication(data, columnId);

      if (error) {
        setError(error.details);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    closeDialog();
  };

  return (
    <JobForm
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      submitButtonText='Add Application'
    />
  );
}
