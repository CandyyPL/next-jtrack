import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignInForm from '@/components/sign-in-form';

export default function SignIn() {
  return (
    <div className='flex min-h-[calc(100vh-4rem-1px)] items-center justify-center p-4'>
      <Card className='w-full max-w-md border-gray-200 shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-black'>
            Sign In
          </CardTitle>
          <CardDescription className='text-gray-600'>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <SignInForm />
      </Card>
    </div>
  );
}
