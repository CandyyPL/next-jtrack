import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/shadcn/field';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/shadcn/input';
import { DialogClose, DialogFooter } from '@/components/shadcn/dialog';
import { Button } from '@/components/shadcn/button';
import { MoonLoader } from 'react-spinners';
import { BoardFormType } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  form: UseFormReturn<BoardFormType>;
  onSubmit: (data: BoardFormType) => void;
  loading: boolean;
  error: string;
};

export default function BoardForm({ form, onSubmit, loading, error }: Props) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {error && (
        <div className='w-full rounded-md bg-red-400/30 p-3 font-medium text-red-500'>
          Error: {error}
        </div>
      )}
      <FieldSet>
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
          name='desc'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder='Short description of the board...'
                className='h-26 resize-none'
                maxLength={100}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
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
            Save
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
