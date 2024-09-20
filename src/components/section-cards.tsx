import { ServiceCard } from "./service-card";

interface SectionCardProps {
  title: string;
}

export function SectionCards({ title }: SectionCardProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="relative text-2xl font-semibold leading-none tracking-tight before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-20 before:rounded-full before:bg-primary before:content-['']">
        {title}
      </h1>
      <div className="no-scrollbar -ml-8 flex h-[400px] w-full overflow-x-auto pl-8">
        <div className="flex h-full gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <ServiceCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
