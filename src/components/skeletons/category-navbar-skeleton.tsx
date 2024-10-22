import { Skeleton } from '../ui/skeleton';

export const CategoryMenuSkeleton = () => {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-36 rounded-full' />
    </div>
  );
};
