import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnFormSchema, ColumnFormType } from '@/lib/types';
import ColumnForm from '@/components/forms/column/column-form';
import { useColumns } from '@/lib/hooks/useColumns';
import { createColumn } from '@/lib/actions/create-column';

type Props = {
  boardId: string;
  closeDialog: () => void;
};

export default function CreateColumnForm({ boardId, closeDialog }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { columns } = useColumns();

  const form = useForm({
    resolver: zodResolver(ColumnFormSchema),
    defaultValues: {
      name: '',
      color: '',
      listOrder: columns.length,
      icon: '',
    },
  });

  const onSubmit = async (data: ColumnFormType) => {
    setLoading(true);

    await createColumn(boardId, data);

    setLoading(false);
    closeDialog();
  };

  return (
    <ColumnForm
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      submitButtonText='Add Column'
      isNew={true}
    />
  );
}
