import { ServiceResponse } from '@/@types/service/service-response';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { CarouselItem } from './ui/carousel';

interface ServiceCardProps {
  service: ServiceResponse;
}

const transformDateISOToLocale = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

export const ServiceCard = ({ service }: ServiceCardProps) => {

  return (
    <CarouselItem
      key={service.id}
      className='basis-1/2 md:basis-1/3 lg:basis-1/4'
    >
      <Card className='h-[350px] xl:h-80 flex flex-col relative'>
        <CardHeader className='flex flex-row items-center gap-4 px-5'>
          <Avatar className='size-12 md:size-14 xl:size-16 select-none'>
            <AvatarImage alt='User profile' src='teste' />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <h2 className='text-base font-bold md:text-lg xl:text-xl select-none'>
            Felipe Rossetto
          </h2>
        </CardHeader>
        <CardContent className='space-y-2 px-5'>
          <h1 className='font-semibold select-none'>{service.title}</h1>
          <div className='text-sm space-y-2 text-muted-foreground'>
            <p className='select-none line-clamp-2 xl:line-clamp-3'>
              {service.description}
            </p>
            <div className='flex flex-col gap-1 xl:flex-row xl:items-center xl:justify-between'>
              <div className='flex'>
                <span className='font-semibold text-primary select-none'>
                  R$ {service.budget.split('-')[0]} até R${' '}
                  {service.budget.split('-')[1]}
                </span>
              </div>
              <p className='select-none'>
                até {transformDateISOToLocale(service.deadline)}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='mt-auto'>
          <Button className='w-full select-none font-semibold' asChild>
            <Link to={`servicos/${service.id}`}>Ver mais</Link>
          </Button>
        </CardFooter>
        
      </Card>
    </CarouselItem>
  );
};
