'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { getUser } from '@/http/user/get-user';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import {
  Check,
  ChevronsUpDown,
  FileText,
  Mail,
  Phone,
  Upload,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import {
  EditProfileInfoSchema,
  editProfileInfoSchema,
} from './types/user-profile-edit';

export function UserProfileEdit() {
  const [name] = useState('John Doe');
  const [avatar, setAvatar] = useState('/placeholder.svg?height=200&width=200');

  const token = localStorage.getItem('token');

  const { data: userFound } = useQuery({
    queryKey: ['get-user-by-token', token],
    queryFn: async () => await getUser(),
    staleTime: 1000 * 60 * 15,
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];

  const form = useForm<EditProfileInfoSchema>({
    defaultValues: {
      profilePicture: userFound?.profilePicture ?? '',
      name: userFound?.name ?? '',
      email: userFound?.email ?? '',
      phone: userFound?.phone ?? '',
      profession: userFound?.profession ?? '',
      description: userFound?.description ?? '',
    },
    resolver: zodResolver(editProfileInfoSchema),
  });

  const onSubmit = (data: EditProfileInfoSchema) => {
    console.log(data);
  };

  return (
    <div className='container mx-auto w-2/3 space-y-6 px-8 mt-8'>
      <Tabs defaultValue='edit' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='edit'>Edite seu Perfil</TabsTrigger>
          <TabsTrigger value='preview'>Prévia</TabsTrigger>
        </TabsList>
        <TabsContent value='edit'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl font-bold'>
                Edite seu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
                >
                  <FormField
                    control={form.control}
                    name='profilePicture'
                    render={({ field }) => (
                      <FormItem className='flex items-center space-x-4'>
                        <Avatar className='size-24'>
                          <AvatarImage src={avatar} alt={name} />
                          <AvatarFallback>
                            {name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Label htmlFor='avatar' className='cursor-pointer'>
                            <div className='flex items-center space-x-2 text-sm text-primary'>
                              <Upload size={16} />
                              <span>Mudar foto de perfil</span>
                            </div>
                          </Label>
                          <FormControl>
                            <Input
                              {...field}
                              id='avatar'
                              type='file'
                              accept='image/*'
                              className='hidden'
                              value={userFound?.profilePicture ?? field.value}
                              onChange={handleAvatarChange}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <Label htmlFor='name'>Nome</Label>
                          <div className='relative'>
                            <User className='absolute left-3 top-3 size-4 text-muted-foreground' />
                            <FormControl>
                              <Input
                                {...field}
                                id='name'
                                value={userFound?.name ?? field.value}
                                className='pl-10'
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <Label htmlFor='email'>E-mail</Label>
                          <div className='relative'>
                            <Mail className='absolute left-3 top-3 size-4 text-muted-foreground' />
                            <FormControl>
                              <Input
                                {...field}
                                id='email'
                                type='email'
                                disabled
                                value={userFound?.email ?? field.value}
                                className='pl-10'
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <Label htmlFor='phone'>Telefone</Label>
                          <div className='relative'>
                            <Phone className='absolute left-3 top-3 size-4 text-muted-foreground' />
                            <FormControl>
                              <PatternFormat
                                {...field}
                                id='phone'
                                customInput={Input}
                                format='(##) #####-####'
                                value={userFound?.phone ?? field.value}
                                className='pl-10'
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='profession'
                      render={({ field }) => (
                        <FormItem className='flex flex-col justify-end space-y-2'>
                          <Label>Profissão</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant='outline'
                                className='w-60 justify-between'
                              >
                                {field.value
                                  ? frameworks.find(
                                      framework =>
                                        framework.value === field.value,
                                    )?.label
                                  : 'Selecione uma profissão'}
                                <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-[200px] p-0'>
                              <Command>
                                <CommandInput placeholder='Search framework...' />
                                <CommandList>
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {frameworks.map(framework => (
                                      <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={currentValue => {
                                          field.onChange(
                                            currentValue === field.value
                                              ? ''
                                              : currentValue,
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            'mr-2 size-4',
                                            field.value === framework.value
                                              ? 'opacity-100'
                                              : 'opacity-0',
                                          )}
                                        />
                                        {framework.label}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Dialog>
                      <DialogTrigger asChild>
                        <div className='flex flex-col gap-2'>
                          <Label>Educações</Label>
                          <Button variant='outline' className='col-span-1'>
                            Gerenciar suas Formações
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicione uma Eduação</DialogTitle>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <Label htmlFor='description'>Descrição</Label>
                        <div className='relative'>
                          <FileText className='absolute left-3 top-3 size-4 text-muted-foreground' />
                          <FormControl>
                            <Textarea
                              {...field}
                              id='description'
                              placeholder='Conte-nos um pouco sobre você'
                              value={userFound?.description ?? field.value}
                              className='min-w-24 pl-10'
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full'>
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='preview'>
          {/* <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-muted-foreground">{occupation}</p>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>Joined {joinDate}</span>
                </div>
                <p className="max-w-md text-center">{bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Github className="size-4" />
                    </Button>
                  </a>
                  <a
                    href={`https://twitter.com/${twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Twitter className="size-4" />
                    </Button>
                  </a>
                  <a
                    href={`https://linkedin.com/in/${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Linkedin className="size-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
