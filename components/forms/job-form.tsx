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
import { JobFormDataType } from '@/lib/types';
import { useColumns } from '@/lib/hooks/useColumns';
import { Lock } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

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
  const { isAuthenticated } = useColumns();

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
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. $100k - $150k'
                    disabled={!isAuthenticated()}
                  />
                  {!isAuthenticated() && (
                    <InputGroupAddon align='inline-end'>
                      <HoverCard
                        openDelay={10}
                        closeDelay={100}>
                        <HoverCardTrigger
                          asChild
                          className='cursor-default'>
                          <Lock />
                        </HoverCardTrigger>
                        <HoverCardContent className='flex w-48 justify-center'>
                          <p className='text-sm font-medium'>
                            Create account to unlock!
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </InputGroupAddon>
                  )}
                </InputGroup>
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
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder='https://...'
                    disabled={!isAuthenticated()}
                  />
                  {!isAuthenticated() && (
                    <InputGroupAddon align='inline-end'>
                      <HoverCard
                        openDelay={10}
                        closeDelay={100}>
                        <HoverCardTrigger
                          asChild
                          className='cursor-default'>
                          <Lock />
                        </HoverCardTrigger>
                        <HoverCardContent className='flex w-48 justify-center'>
                          <p className='text-sm font-medium'>
                            Create account to unlock!
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </InputGroupAddon>
                  )}
                </InputGroup>
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
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder='Web Dev, Embedded, Security, etc.'
                    disabled={!isAuthenticated()}
                  />
                  {!isAuthenticated() && (
                    <InputGroupAddon align='inline-end'>
                      <HoverCard
                        openDelay={10}
                        closeDelay={100}>
                        <HoverCardTrigger
                          asChild
                          className='cursor-default'>
                          <Lock />
                        </HoverCardTrigger>
                        <HoverCardContent className='flex w-48 justify-center'>
                          <p className='text-sm font-medium'>
                            Create account to unlock!
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </InputGroupAddon>
                  )}
                </InputGroup>
              </Field>
            )}
          />
          <Controller
            name='desc'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder='Brief description of the job...'
                    className='h-26 resize-none'
                    maxLength={200}
                    disabled={!isAuthenticated()}
                  />
                  {!isAuthenticated() && (
                    <InputGroupAddon align='inline-end'>
                      <HoverCard
                        openDelay={10}
                        closeDelay={100}>
                        <HoverCardTrigger
                          asChild
                          className='cursor-default'>
                          <Lock />
                        </HoverCardTrigger>
                        <HoverCardContent className='flex w-48 justify-center'>
                          <p className='text-sm font-medium'>
                            Create account to unlock!
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </InputGroupAddon>
                  )}
                </InputGroup>
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
