import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Column, ColumnFormSchema, ColumnFormType } from '@/lib/types';
import ColumnForm from '@/components/forms/column-form';
import { useColumns } from '@/lib/hooks/useColumns';

type Props = {
  column: Column;
  closeDialog: () => void;
};

export default function EditColumnForm({ column, closeDialog }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { handleUpdateColumn } = useColumns();

  const form = useForm({
    resolver: zodResolver(ColumnFormSchema),
    defaultValues: {
      name: column.name,
      color: column.color,
      listOrder: column.listOrder,
      icon: column.icon,
    },
  });

  const onSubmit = async (data: ColumnFormType) => {
    setLoading(true);

    handleUpdateColumn(column.id, data);

    setLoading(false);
    closeDialog();
  };

  return (
    <ColumnForm
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      submitButtonText='Save'
    />
  );
}
