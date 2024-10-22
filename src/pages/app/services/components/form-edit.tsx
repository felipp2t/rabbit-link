import { Location } from '@/@types/service/service-request';
import { LocationPanel } from '@/components/location-manager';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
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
import { cn } from '@/lib/utils';
import { useServiceStore } from '@/stores/use-service-store';
import { useUserStore } from '@/stores/use-user-store';
import { ArrowRightLeft, House } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { EditServiceSchema } from '../types/edit-service';

export const FormEdit = () => {
  const { service } = useServiceStore();
  const { user } = useUserStore();
  const form = useFormContext<EditServiceSchema>();

  const [locationValue, setLocationValue] = useState<Location>({
    id: service.location.id || user.addresses[0].id,
    city: service.location.city || user.addresses[0].address.city,
    state: service.location.state || user.addresses[0].address.state,
  });

  async function handleUpdateService(service: EditServiceSchema) {
    console.log(service);
  }

  return (
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
                <FormLabel htmlFor='price.minimum'>Preço Mínimo</FormLabel>
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
                <FormLabel htmlFor='price.maximum'>Preço Máximo</FormLabel>
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
                    defaultValue={field.value ?? service.workType}
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
  );
};
