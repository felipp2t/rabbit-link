import { BlockInTheMDScreen } from '@/components/hidden-and-block/block-lg-screen';
import { ServiceCard } from '@/components/service-card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { UnderlinedTitle } from '@/components/underlined-title';
import { useCarousel } from '@/hooks/use-carousel';
import { getServicesByRegion } from '@/http/service/get-services-by-region';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const OnSiteServices = () => {
  const { setApi, currentIndex } = useCarousel();

  const { data: services, isLoading } = useQuery({
    queryKey: ['get-onsite-services'],
    queryFn: async () => await getServicesByRegion(),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <div className='flex flex-col gap-8'>
      <div className='w-full flex justify-between items-center'>
        <UnderlinedTitle className='md:ml-12'>
          Serviços Presensiais - Sua Região
        </UnderlinedTitle>
        <Link
          to='/'
          className='text-primary flex-shrink-0 text-xs md:text-base md:mr-12 hover:underline'
        >
          ver mais
        </Link>
      </div>

      {isLoading ? (
        <div>
          <p>Carregando...</p>
        </div>
      ) : (
        <div className='md:px-12 relative'>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className='w-full'
            setApi={setApi}
          >
            <CarouselContent>
              {services?.slice(0, 10).map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </CarouselContent>
            <BlockInTheMDScreen>
              <CarouselPrevious />
              <CarouselNext />
            </BlockInTheMDScreen>
          </Carousel>

          <Badge
            variant='outline'
            className='absolute text-sm size-10 flex justify-center right-0 md:-translate-x-full translate-y-4'
          >
            {currentIndex + 1}/{services?.length}
          </Badge>
        </div>
      )}
    </div>
  );
};
