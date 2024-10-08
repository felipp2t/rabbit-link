import { getServices } from "@/http/service/get-services";
import { Service } from "@/types/service/service-response";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./service-card";
import { Skeleton } from "./ui/skeleton";

interface SectionCardProps {
  title: string;
}

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="mx-auto flex h-80 w-72 max-w-md shrink-0 flex-col md:w-80 xl:w-96" />
    </div>
  );
}

export function SectionCards({ title }: SectionCardProps) {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => await getServices(),
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="relative text-2xl font-semibold leading-none tracking-tight before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-20 before:rounded-full before:bg-primary before:content-['']">
        {title}
      </h1>
      <div className="no-scrollbar -ml-8 flex h-[400px] w-full overflow-x-auto pl-8">
        <div className="flex h-full gap-8">
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonDemo key={index} />
              ))}
            </>
          ) : (
            <>
              {services &&
                services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    userAvatar=""
                    userName="Felipe Rossetto"
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
