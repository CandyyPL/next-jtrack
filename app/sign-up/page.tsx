import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import SignUpForm from '@/components/forms/sign-up-form';

export default function SignUp() {
  return (
    <div className='flex min-h-[calc(100vh-4rem-1px)] items-center justify-center p-4'>
      <Card className='w-full max-w-md border-gray-200 shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-black'>
            Sign Up
          </CardTitle>
          <CardDescription className='text-gray-600'>
            Create an account to start tracking your job applications.
          </CardDescription>
        </CardHeader>
        <SignUpForm />
      </Card>
    </div>
  );
}
