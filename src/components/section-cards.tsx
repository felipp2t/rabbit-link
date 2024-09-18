import { ServiceCard } from "./service-card";

interface SectionCardProps {
  title: string;
}

export function SectionCards({ title }: SectionCardProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="relative text-2xl font-semibold leading-none tracking-tight before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-20 before:rounded-full before:bg-primary before:content-['']">
        {title}
      </h1>
      <div className="no-scrollbar flex h-[400px] w-full overflow-x-auto">
        <div className="flex h-full gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <ServiceCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}