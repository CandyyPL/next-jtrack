import { MoonLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className='flex min-h-[calc(100vh-4rem-7.5rem-1px)] items-center justify-center'>
      <MoonLoader />
    </div>
  );
}
