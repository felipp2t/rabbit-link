import { ServiceCard } from "./service-card";

interface SectionCardProps {
  title: string;
}

export function SectionCards({ title }: SectionCardProps) {
  return (
    <div className="no-scrollbar flex h-[500px] w-full flex-col gap-6 overflow-x-auto">
      <h1 className="relative text-2xl font-semibold leading-none tracking-tight before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-20 before:rounded-full before:bg-primary before:content-['']">
        {title}
      </h1>
      <div className="flex h-full gap-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <ServiceCard key={i} />
        ))}
      </div>
    </div>
  );
}
