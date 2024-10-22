import { BlockInTheMDScreen } from '@/components/hidden-and-block/block-lg-screen';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UnderlinedTitle } from '@/components/underlined-title';
import { useCarousel } from '@/hooks/use-carousel';
import { getServicesByUser } from '@/http/service/get-services-by-user';
import { useServiceStore } from '@/stores/use-service-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AlertDialogForServiceDeletion } from './components/alert-dialog-for-service-deletion';
import { FormEdit } from './components/form-edit';
import { EditServiceSchema, editServiceSchema } from './types/edit-service';
import { serviceMapper } from './utils/service-mapper';

export function ViewMyServices() {
  const { service } = useServiceStore();
  const { setApi } = useCarousel();

  const { data: services } = useQuery({
    queryKey: ['get-service-by-user'],
    queryFn: async () => await getServicesByUser(),
  });

  const form = useForm<EditServiceSchema>({
    resolver: zodResolver(editServiceSchema),
  });

  if (!services) {
    return;
  }

  const servicesMapped = serviceMapper({ services });

  const transformDateISOToLocale = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <main className='flex flex-col gap-4 px-8 mb-20'>
      <div className='flex flex-col gap-24 w-full mt-4'>
        <div className='flex flex-col gap-8'>
          <header className='w-full flex justify-between items-center'>
            <UnderlinedTitle className='md:ml-12'>
              Seus Serviços Cadastrados
            </UnderlinedTitle>
          </header>

          {servicesMapped && servicesMapped.length > 0 && (
            <div className='md:px-12 relative' key={service.id}>
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                setApi={setApi}
                className='w-full'
              >
                <CarouselContent>
                  {servicesMapped?.map(service => (
                    <CarouselItem
                      key={service.id}
                      className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
                    >
                      <Card className='h-[350px] flex flex-col'>
                        <CardHeader className='flex flex-row items-center gap-4'>
                          <Avatar className='size-12 md:size-14 xl:size-16'>
                            <AvatarImage alt='User profile' src='teste' />
                            <AvatarFallback>UN</AvatarFallback>
                          </Avatar>

                          <h2 className='text-base font-bold md:text-lg xl:text-xl'>
                            Felipe Rossetto
                          </h2>
                        </CardHeader>
                        <CardContent className='space-y-2 mb-auto'>
                          <h1 className='font-semibold'>{service.title}</h1>
                          <div className='text-sm space-y-2 flex flex-col text-muted-foreground line-clamp-4'>
                            <p>{service.description}</p>
                            <div className='flex justify-between items-center mt-auto'>
                              <div className='flex'>
                                <span className='font-semibold text-green-600'>
                                  R$ {service.price.minimum} até R${' '}
                                  {service.price.maximum}
                                </span>
                              </div>
                              <p>
                                até {transformDateISOToLocale(service.deadline)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className='mt-auto flex flex-col gap-4'>
                          <div className='flex gap-4 justify-between w-full'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant='outline' className='w-1/2'>
                                  Editar
                                </Button>
                              </DialogTrigger>

                              <DialogContent className='max-w-xl mx-auto'>
                                <DialogHeader>
                                  <DialogTitle>
                                    Edite seu serviço aqui
                                  </DialogTitle>
                                </DialogHeader>

                                <FormProvider {...form}>
                                  <FormEdit />
                                </FormProvider>
                              </DialogContent>
                            </Dialog>

                            <AlertDialogForServiceDeletion />
                          </div>

                          <Button className='w-full'>
                            Ver candidaturas (03)
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <BlockInTheMDScreen>
                  <CarouselPrevious />
                  <CarouselNext />
                </BlockInTheMDScreen>
              </Carousel>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-8'>
          <header className='w-full flex justify-between items-center'>
            <UnderlinedTitle className='md:ml-12'>
              Serviços Que Você Se Candidatou
            </UnderlinedTitle>
          </header>

          {servicesMapped && servicesMapped.length > 0 && (
            <div className='md:px-12 relative' key={service.id}>
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                setApi={setApi}
                className='w-full'
              >
                <CarouselContent>
                  {servicesMapped?.map(service => (
                    <CarouselItem
                      key={service.id}
                      className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
                    >
                      <Card className='h-80 flex flex-col'>
                        <CardHeader className='flex flex-row items-center gap-4'>
                          <Avatar className='size-12 md:size-14 xl:size-16'>
                            <AvatarImage alt='User profile' src='teste' />
                            <AvatarFallback>UN</AvatarFallback>
                          </Avatar>

                          <h2 className='text-base font-bold md:text-lg xl:text-xl'>
                            Felipe Rossetto
                          </h2>
                        </CardHeader>
                        <CardContent className='space-y-2 mb-auto'>
                          <h1 className='font-semibold'>{service.title}</h1>
                          <div className='text-sm space-y-2 flex flex-col text-muted-foreground line-clamp-4'>
                            <p>{service.description}</p>
                            <div className='flex justify-between items-center mt-auto'>
                              <div className='flex'>
                                <span className='font-semibold text-green-600'>
                                  R$ {service.price.minimum} até R${' '}
                                  {service.price.maximum}
                                </span>
                              </div>
                              <p>
                                até {transformDateISOToLocale(service.deadline)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className='flex gap-4'>
                          <Button className='w-1/2' variant='outline' asChild>
                            <Link to={`servicos/${service.id}`}>Ver mais</Link>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant='destructive' className='w-1/2'>
                                Cancelar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Tem certeza que deseja deixar de ser
                                  candidatar?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não poderá ser desfeita. Isso fará
                                  com que a sua candidatura seja removida desse
                                  serviço. Para se candidatar novamente, você
                                  precisará enviar uma nova candidatura para o
                                  mesmo, caso o prazo não tenha ultrapassado do
                                  limite.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction>Confirmar</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <BlockInTheMDScreen>
                  <CarouselPrevious />
                  <CarouselNext />
                </BlockInTheMDScreen>
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
