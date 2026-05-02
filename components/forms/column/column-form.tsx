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
import { ColumnFormType } from '@/lib/types';
import ColorPicker from '@/components/forms/column/color-picker';
import IconPicker from '@/components/forms/column/icon-picker';
import { colors } from '@/lib/colors';
import { icons } from '@/lib/icons';
import OrderPicker from '@/components/forms/column/order-picker';

type Props = {
  form: UseFormReturn<ColumnFormType>;
  onSubmit: (data: ColumnFormType) => void;
  loading: boolean;
  error: string;
  submitButtonText: string;
};

export default function ColumnForm({
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
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
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
          name='color'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Color</FieldLabel>
              <ColorPicker
                colors={colors}
                {...field}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name='icon'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Icon</FieldLabel>
              <IconPicker
                icons={icons}
                {...field}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name='listOrder'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Order</FieldLabel>
              <OrderPicker
                value={field.value}
                onChange={field.onChange}
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
