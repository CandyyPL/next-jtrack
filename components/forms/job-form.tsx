import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/shadcn/field';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';
import { DialogClose, DialogFooter } from '@/components/shadcn/dialog';
import { Button } from '@/components/shadcn/button';
import { MoonLoader } from 'react-spinners';
import { JobFormDataType } from '@/lib/types';

type Props = {
  form: UseFormReturn<JobFormDataType>;
  onSubmit: (data: JobFormDataType) => void;
  loading: boolean;
  error: string;
  submitButtonText: string;
};

export default function JobForm({
  form,
  onSubmit,
  loading,
  error,
  submitButtonText,
}: Props) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {error && (
        <div className='w-full rounded-md bg-red-400/30 p-3 font-medium text-red-500'>
          Error: {error}
        </div>
      )}
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
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
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
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
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
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
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
        </div>
        <DialogFooter className='grid grid-cols-2'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type='submit'
            disabled={loading}>
            {submitButtonText}
            {loading && (
              <MoonLoader
                size={14}
                color='black'
              />
            )}
          </Button>
        </DialogFooter>
      </FieldSet>
    </form>
  );
}
