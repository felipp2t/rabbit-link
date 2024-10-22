import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface UnderlinedTitleProps {
  children: ReactNode;
  className?: string;
}

export function UnderlinedTitle({ children, className }: UnderlinedTitleProps) {
  return (
    <h1
      className={cn(
        "relative max-w-60 xl:max-w-full text-lg xl:text-2xl font-semibold leading-none tracking-tight before:absolute before:-bottom-3 before:left-0 before:h-1 before:w-20 before:rounded-full before:bg-primary before:content-['']",
        className,
      )}
    >
      {children}
    </h1>
  );
}
