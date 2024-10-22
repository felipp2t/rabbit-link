import { Location, ServiceRequest } from '@/@types/service/service-request';
import { BlockInTheMDScreen } from '@/components/hidden-and-block/block-lg-screen';
import { LocationPanel } from '@/components/location-manager';
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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UnderlinedTitle } from '@/components/underlined-title';
import { useCarousel } from '@/hooks/use-carousel';
import { getServicesByUser } from '@/http/service/get-services-by-user';
import { cn } from '@/lib/utils';
import { mappedWorkTypeMapRequest } from '@/mappers/mapped-work-type-request';
import { useServiceStore } from '@/stores/use-service-store';
import { useUserStore } from '@/stores/use-user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightLeft, House } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { EditServiceSchema, editServiceSchema } from './types/edit-service';

export function ViewMyServices() {
  const { service } = useServiceStore();
  const { user } = useUserStore();
  const { setApi, currentIndex } = useCarousel();
  const [locationValue, setLocationValue] = useState<Location>({
    id: service.location.id || user.addresses[0].id,
    city: service.location.city || user.addresses[0].address.city,
    state: service.location.state || user.addresses[0].address.state,
  });

  const { data: services } = useQuery({
    queryKey: ['get-service-by-user'],
    queryFn: async () => await getServicesByUser(),
  });

  const form = useForm<EditServiceSchema>({
    resolver: zodResolver(editServiceSchema),
  });

  const splitPriceInService = (price: string) => {
    return price ? price.split('-') : ['', ''];
  };

  const splitLocationInService = (location: string) => {
    return location ? location.split(', ') : ['', ''];
  };

  if (!services) {
    return;
  }

  const servicesMapped: ServiceRequest[] = services?.map(service => {
    const minimumSplitted = splitPriceInService(service.budget)[0];
    const maximumSplitted = splitPriceInService(service.budget)[1];
    const locationSplitted = splitLocationInService(service.location);
    const mapppedWorkType = mappedWorkTypeMapRequest[service.workType] as
      | 'REMOTE'
      | 'ONSITE';
    return {
      id: service.id,
      categories: service.categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          description: category.description,
          iconName: category.iconName,
        };
      }),
      title: service.title,
      description: service.description,
      price: {
        minimum: minimumSplitted,
        maximum: maximumSplitted,
      },
      location: {
        id: '',
        city: locationSplitted[0],
        state: locationSplitted[1],
      },
      workType: mapppedWorkType,
      deadline: service.deadline,
    };
  });

  const transformDateISOToLocale = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  async function handleServiceDelete(title: string) {
    console.log(title);
  }

  async function handleUpdateService(service: EditServiceSchema) {
    console.log(service);
  }

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

                                <Form {...form}>
                                  <form
                                    className='space-y-6'
                                    onSubmit={form.handleSubmit(
                                      handleUpdateService,
                                    )}
                                  >
                                    <div className='grid grid-cols-4 gap-4'>
                                      <FormField
                                        control={form.control}
                                        name='title'
                                        render={({ field }) => (
                                          <FormItem className='col-span-4 sm:col-span-2'>
                                            <FormLabel htmlFor='title'>
                                              Título
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                id='title'
                                                value={
                                                  field.value ?? service.title
                                                }
                                                placeholder='título do serviço'
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name='price.minimum'
                                        render={({ field }) => (
                                          <FormItem className='col-span-2 sm:col-span-1'>
                                            <FormLabel htmlFor='price.minimum'>
                                              Preço Mínimo
                                            </FormLabel>
                                            <FormControl>
                                              <NumericFormat
                                                {...field}
                                                value={
                                                  field.value ??
                                                  service.price.minimum
                                                }
                                                step='1'
                                                min='1'
                                                max='10000'
                                                allowLeadingZeros
                                                customInput={Input}
                                                id='price.minimum'
                                                defaultValue={
                                                  field.value ??
                                                  service.price.minimum
                                                }
                                                placeholder='min. 1'
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name='price.maximum'
                                        render={({ field }) => (
                                          <FormItem className='col-span-2 sm:col-span-1'>
                                            <FormLabel htmlFor='price.maximum'>
                                              Preço Máximo
                                            </FormLabel>
                                            <FormControl>
                                              <NumericFormat
                                                {...field}
                                                value={
                                                  field.value ??
                                                  service.price.maximum
                                                }
                                                step='1'
                                                min='1'
                                                max='10000'
                                                allowLeadingZeros
                                                customInput={Input}
                                                id='price.maximum'
                                                defaultValue={
                                                  field.value ??
                                                  service.price.maximum
                                                }
                                                placeholder='max. 10.000'
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name='description'
                                        render={({ field }) => (
                                          <FormItem className='col-span-4'>
                                            <FormLabel htmlFor='description'>
                                              Descrição
                                            </FormLabel>
                                            <FormControl>
                                              <Textarea
                                                {...field}
                                                value={
                                                  field.value ??
                                                  service.description
                                                }
                                                placeholder='descrição do serviço'
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name='location'
                                        render={({ field }) => {
                                          return (
                                            <FormItem className='col-span-4 sm:col-span-2'>
                                              <FormLabel htmlFor='location'>
                                                Localização
                                              </FormLabel>
                                              <FormControl>
                                                <LocationPanel.Root>
                                                  <div className='flex items-center gap-2'>
                                                    <Input
                                                      {...field}
                                                      id='location'
                                                      value={`${locationValue.city}, ${locationValue.state}`}
                                                      readOnly
                                                    />
                                                    <LocationPanel.Trigger>
                                                      <Button className='size-9 px-2'>
                                                        <ArrowRightLeft className='size-6' />
                                                      </Button>
                                                    </LocationPanel.Trigger>
                                                    <LocationPanel.Content>
                                                      <LocationPanel.Header
                                                        show
                                                      >
                                                        <LocationPanel.Title>
                                                          Selecione um endereço
                                                        </LocationPanel.Title>
                                                      </LocationPanel.Header>
                                                      {user.addresses?.map(
                                                        address => (
                                                          <LocationPanel.AddressCard
                                                            key={address.id}
                                                            className={cn(
                                                              'cursor-pointer',
                                                              address.id ===
                                                                locationValue.id &&
                                                                'ring-2 ring-primary',
                                                            )}
                                                            onClick={() =>
                                                              setLocationValue({
                                                                id: address.id,
                                                                city: address
                                                                  .address.city,
                                                                state:
                                                                  address
                                                                    .address
                                                                    .state,
                                                              })
                                                            }
                                                          >
                                                            <House className='size-6' />
                                                            <LocationPanel.CardContent>
                                                              <LocationPanel.CardType>
                                                                {address.type}
                                                              </LocationPanel.CardType>
                                                              <LocationPanel.CardStreetNumber>
                                                                <span>
                                                                  {
                                                                    address
                                                                      .address
                                                                      .street
                                                                  }
                                                                  ,{' '}
                                                                  {
                                                                    address
                                                                      .address
                                                                      .state
                                                                  }
                                                                </span>
                                                              </LocationPanel.CardStreetNumber>
                                                            </LocationPanel.CardContent>
                                                          </LocationPanel.AddressCard>
                                                        ),
                                                      )}
                                                    </LocationPanel.Content>
                                                  </div>
                                                </LocationPanel.Root>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          );
                                        }}
                                      />

                                      <FormField
                                        control={form.control}
                                        name='workType'
                                        render={({ field }) => (
                                          <FormItem className='col-span-4 sm:col-span-2'>
                                            <FormLabel htmlFor='workType'>
                                              Tipo de Trabalho
                                            </FormLabel>
                                            <FormControl>
                                              <Select
                                                {...field}
                                                onValueChange={field.onChange}
                                                defaultValue={
                                                  field.value ??
                                                  service.workType
                                                }
                                              >
                                                <SelectTrigger>
                                                  <SelectValue placeholder='Selectione o tipo' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectGroup>
                                                    <SelectItem value='REMOTE'>
                                                      Remoto
                                                    </SelectItem>
                                                    <SelectItem value='ONSITE'>
                                                      Presencial
                                                    </SelectItem>
                                                  </SelectGroup>
                                                </SelectContent>
                                              </Select>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                  </form>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant='outline'>
                                        Cancelar
                                      </Button>
                                    </DialogClose>
                                    <Button type='submit' className='w-20'>
                                      Editar
                                    </Button>
                                  </DialogFooter>
                                </Form>
                              </DialogContent>
                            </Dialog>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant='destructive' className='w-1/2'>
                                  Excluir
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Tem certeza que deseja excluir esse serviço?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Essa ação não poderá ser desfeita. Isso
                                    deletará permanentemente o serviço dos dados
                                    do nosso serviço.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleServiceDelete(service.title)
                                    }
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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

        {/*
  serviços em candidatura
 */}
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

      {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
         {servicesMapped?.map(service => (
          <Card key={service.id} className='flex flex-col'>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription className='line-clamp-2'>
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Badge>Em andamento</Badge>

              <div className='flex flex-wrap gap-2'>
                {service.categories.map(category => (
                  <Badge key={category.id} variant='secondary'>
                    {category.name}
                  </Badge>
                ))}
              </div>
              <p className='text-xl font-bold xl:text-2xl'>
                R$ {service.price.minimum} até R$ {service.price.maximum}
              </p>

              <p className='flex items-center text-sm xl:text-base'>
                <MapPin className='mr-2 size-4' />
                {service.location.city}, {service.location.state}
              </p>

              <p className='flex items-center text-sm xl:text-base'>
                <Briefcase className='mr-2 size-4' />
                {mappedWorkTypeMapResponse[service.workType]}
              </p>
            </CardContent>
            <CardFooter className='mt-auto flex justify-between'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline'>Editar</Button>
                </DialogTrigger>

                <DialogContent className='max-w-xl mx-auto'>
                  <DialogHeader>
                    <DialogTitle>Edite seu serviço aqui</DialogTitle>
                  </DialogHeader>

                  <Form {...form}>
                    <form
                      className='space-y-6'
                      onSubmit={form.handleSubmit(handleUpdateService)}
                    >
                      <div className='grid grid-cols-4 gap-4'>
                        <FormField
                          control={form.control}
                          name='title'
                          render={({ field }) => (
                            <FormItem className='col-span-4 sm:col-span-2'>
                              <FormLabel htmlFor='title'>Título</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id='title'
                                  value={field.value ?? service.title}
                                  placeholder='título do serviço'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='price.minimum'
                          render={({ field }) => (
                            <FormItem className='col-span-2 sm:col-span-1'>
                              <FormLabel htmlFor='price.minimum'>
                                Preço Mínimo
                              </FormLabel>
                              <FormControl>
                                <NumericFormat
                                  {...field}
                                  value={field.value ?? service.price.minimum}
                                  step='1'
                                  min='1'
                                  max='10000'
                                  allowLeadingZeros
                                  customInput={Input}
                                  id='price.minimum'
                                  defaultValue={
                                    field.value ?? service.price.minimum
                                  }
                                  placeholder='min. 1'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='price.maximum'
                          render={({ field }) => (
                            <FormItem className='col-span-2 sm:col-span-1'>
                              <FormLabel htmlFor='price.maximum'>
                                Preço Máximo
                              </FormLabel>
                              <FormControl>
                                <NumericFormat
                                  {...field}
                                  value={field.value ?? service.price.maximum}
                                  step='1'
                                  min='1'
                                  max='10000'
                                  allowLeadingZeros
                                  customInput={Input}
                                  id='price.maximum'
                                  defaultValue={
                                    field.value ?? service.price.maximum
                                  }
                                  placeholder='max. 10.000'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='description'
                          render={({ field }) => (
                            <FormItem className='col-span-4'>
                              <FormLabel htmlFor='description'>
                                Descrição
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  value={field.value ?? service.description}
                                  placeholder='descrição do serviço'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='location'
                          render={({ field }) => {
                            return (
                              <FormItem className='col-span-4 sm:col-span-2'>
                                <FormLabel htmlFor='location'>
                                  Localização
                                </FormLabel>
                                <FormControl>
                                  <LocationPanel.Root>
                                    <div className='flex items-center gap-2'>
                                      <Input
                                        {...field}
                                        id='location'
                                        value={`${locationValue.city}, ${locationValue.state}`}
                                        readOnly
                                      />
                                      <LocationPanel.Trigger>
                                        <Button className='size-9 px-2'>
                                          <ArrowRightLeft className='size-6' />
                                        </Button>
                                      </LocationPanel.Trigger>
                                      <LocationPanel.Content>
                                        <LocationPanel.Header show>
                                          <LocationPanel.Title>
                                            Selecione um endereço
                                          </LocationPanel.Title>
                                        </LocationPanel.Header>
                                        {user.addresses?.map(address => (
                                          <LocationPanel.AddressCard
                                            key={address.id}
                                            className={cn(
                                              'cursor-pointer',
                                              address.id === locationValue.id &&
                                                'ring-2 ring-primary',
                                            )}
                                            onClick={() =>
                                              setLocationValue({
                                                id: address.id,
                                                city: address.address.city,
                                                state: address.address.state,
                                              })
                                            }
                                          >
                                            <House className='size-6' />
                                            <LocationPanel.CardContent>
                                              <LocationPanel.CardType>
                                                {address.type}
                                              </LocationPanel.CardType>
                                              <LocationPanel.CardStreetNumber>
                                                <span>
                                                  {address.address.street},{' '}
                                                  {address.address.state}
                                                </span>
                                              </LocationPanel.CardStreetNumber>
                                            </LocationPanel.CardContent>
                                          </LocationPanel.AddressCard>
                                        ))}
                                      </LocationPanel.Content>
                                    </div>
                                  </LocationPanel.Root>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />

                        <FormField
                          control={form.control}
                          name='workType'
                          render={({ field }) => (
                            <FormItem className='col-span-4 sm:col-span-2'>
                              <FormLabel htmlFor='workType'>
                                Tipo de Trabalho
                              </FormLabel>
                              <FormControl>
                                <Select
                                  {...field}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value ?? service.workType}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder='Selectione o tipo' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value='REMOTE'>
                                        Remoto
                                      </SelectItem>
                                      <SelectItem value='ONSITE'>
                                        Presencial
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                      </DialogClose>
                      <Button type='submit' className='w-20'>
                        Editar
                      </Button>
                    </DialogFooter>
                  </Form>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive'>Excluir</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir esse serviço?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não poderá ser desfeita. Isso deletará
                      permanentemente o serviço dos dados do nosso serviço.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleServiceDelete(service.title)}
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))} */}
    </main>
  );
}
