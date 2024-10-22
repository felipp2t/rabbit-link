import { Location } from '@/@types/service/service-request';
import { LocationPanel } from '@/components/location-manager';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useServiceStore } from '@/stores/use-service-store';
import { useUserStore } from '@/stores/use-user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ArrowRightLeft, CalendarIcon, House, Info } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import {
  ServiceDetailsSchema,
  serviceDetailsSchema,
} from './types/fill-in-service-details';

export function FillInServiceDetails() {
  const {
    setTitle,
    setDescription,
    setLocation,
    setWorkType,
    setDeadline,
    setMinimumPrice,
    setMaximunPrice,
    service,
    setStep,
    handlePrevious,
  } = useServiceStore();
  const { user } = useUserStore();
  const [locationValue, setLocationValue] = useState<Location>({
    id: service.location.id || user.addresses[0].id,
    city: service.location.city || user.addresses[0].address.city,
    state: service.location.state || user.addresses[0].address.state,
  });

  const form = useForm<ServiceDetailsSchema>({
    defaultValues: service,
    resolver: zodResolver(serviceDetailsSchema),
  });

  async function onSubmit(data: ServiceDetailsSchema) {
    console.log(data);
    setTitle(data.title);
    setDescription(data.description);
    setLocation({
      id: data.location.id,
      city: data.location.city,
      state: data.location.state,
    });
    setWorkType(data.workType);
    setDeadline(data.deadline.split('T')[0]);
    setMinimumPrice(data.price.minimum);
    setMaximunPrice(data.price.maximum);

    if (await form.trigger()) {
      setStep(3);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Etapa 2: Informações do Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <main className='space-y-4'>
          <p className='mb-4 text-sm text-muted-foreground'>
            Preencha as informações do seu serviço:
          </p>

          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
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
                          defaultValue={field.value ?? service.price.minimum}
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
                          defaultValue={field.value ?? service.price.maximum}
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
                      <FormLabel htmlFor='description'>Descrição</FormLabel>
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
                        <FormLabel htmlFor='location'>Localização</FormLabel>
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
                      <FormLabel htmlFor='workType'>Tipo de Trabalho</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Selectione o tipo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='REMOTE'>Remoto</SelectItem>
                              <SelectItem value='ONSITE'>Presencial</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='deadline'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <div className='flex justify-between'>
                        <FormLabel>Prazo para inscrições</FormLabel>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Info className='size-4 cursor-pointer text-primary mr-2' />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cuidado!</AlertDialogTitle>
                              <AlertDialogDescription>
                                Quando você criar um serviço, ele vai ficar
                                visível para os candidatos por um período que
                                você definir.
                                <br />
                                <br />
                                A data de candidatura não poderá ser
                                alterada novamente. Certifique-se de que a data
                                está correta.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Entendi</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), 'PPP', {
                                  locale: pt,
                                })
                              ) : (
                                <span>Escolha uma data</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            locale={pt}
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={date => {
                              if (date) {
                                field.onChange(date.toISOString());
                              }
                            }}
                            disabled={date =>
                              date < new Date() ||
                              date >
                                new Date(
                                  new Date().setDate(new Date().getDate() + 7),
                                )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>

            <div className='flex items-center justify-between'>
              <Button onClick={handlePrevious} variant='outline' type='button'>
                Voltar
              </Button>

              <Button type='submit'>Próximo</Button>
            </div>
          </Form>
        </main>
      </CardContent>
    </>
  );
}
