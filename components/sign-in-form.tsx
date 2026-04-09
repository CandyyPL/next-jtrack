'use client';

import { CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SignInFormType, SignInFormSchema } from '@/lib/types';

export default function SignInForm() {
  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-4'>
      <CardContent className='space-y-4'>
        <FieldSet>
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder='john.doe@example.com'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type='password'
                  autoComplete='off'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldSet>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <Button
          type='submit'
          className='hover:bg-primary/90 h-12 w-full text-lg'>
          Sign In
        </Button>
        <p className='text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <Link
            href='/sign-up'
            className='text-primary font-medium hover:underline'>
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}
