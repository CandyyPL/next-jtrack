'use client';

import { CardContent, CardFooter } from '@/components/shadcn/card';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/shadcn/field';
import { Input } from '@/components/shadcn/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/shadcn/button';
import Link from 'next/link';
import { SignInFormType, SignInFormSchema } from '@/lib/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { MoonLoader } from 'react-spinners';

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: SignInFormType) => {
    setError('');

    await signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-4'>
      <CardContent className='space-y-4'>
        {error && (
          <div className='w-full rounded-md bg-red-400/30 p-3 font-medium text-red-500'>
            Error: {error}
          </div>
        )}
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
          className='hover:bg-primary/90 h-12 w-full text-lg'
          disabled={loading}>
          Sign In{' '}
          {loading && (
            <MoonLoader
              size={20}
              color='black'
            />
          )}
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
