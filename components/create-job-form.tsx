import { useState } from 'react';
import { Field, FieldLabel, FieldSet } from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormSchema, JobFormDataType } from '@/lib/types';
import { createApplication } from '@/lib/actions/create-application';

type Props = {
  closeDialog: () => void;
  columnId: string;
};

export default function CreateJobForm({ closeDialog, columnId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      notes: '',
    },
  });

  const onSubmit = async (data: JobFormDataType) => {
    await createApplication(data, columnId);
    closeDialog();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            name='company'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Company*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
          <Controller
            name='position'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Position*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            name='location'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
          <Controller
            name='salary'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Salary</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='e.g. $100k - $150k'
                />
              </Field>
            )}
          />
        </div>
        <div className='space-y-4'>
          <Controller
            name='url'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Offer Website</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='https://...'
                />
              </Field>
            )}
          />
          <Controller
            name='tags'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='Web Dev, Embedded, Security, etc.'
                />
              </Field>
            )}
          />
          <Controller
            name='desc'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='Brief description of the job...'
                  className='h-26 resize-none'
                  maxLength={200}
                />
              </Field>
            )}
          />
          <Controller
            name='notes'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='Any additional information'
                  className='h-16 resize-none'
                  maxLength={100}
                />
              </Field>
            )}
          />
        </div>
        <DialogFooter className='grid grid-cols-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => closeDialog()}>
            Cancel
          </Button>
          <Button type='submit'>Add Application</Button>
        </DialogFooter>
      </FieldSet>
    </form>
  );
}
