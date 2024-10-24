import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { handleSignUp } from '@/http/auth/sing-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, Dispatch } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { AuthPageProps } from './auth-page';
import { SignUpSchema, signUpValidation } from './types/sign-up';

interface SignUpProps {
  setAuthTab: Dispatch<React.SetStateAction<AuthPageProps>>;
}

export function SignUp({ setAuthTab }: SignUpProps) {
  const form = useForm<SignUpSchema>({
    defaultValues: {
      profilePicture: undefined,
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpValidation),
  });

  function handleChangeFile(
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<SignUpSchema, 'profilePicture'>,
  ) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['png', 'jpg', 'jpeg'];
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        field.value = undefined;
        alert('Invalid file format. Please upload a .png, .jpg or .jpeg file.');
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          field.onChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async function onSubmit(data: SignUpSchema) {
    await handleSignUp({
      email: data.email,
      name: data.name,
      phone: data.phone,
      cpf: data.cpf,
      birthDate: data.birthDate,
      password: data.password,
      confirmPassword: data.confirmPassword,
      profilePicture: data.profilePicture,
    });

    toast({
      title: 'Conta criada com sucesso!',
      description: 'Sua conta foi criada com sucesso. Faça login para acessar.',
      duration: 1000 * 7,
    });

    setAuthTab('sign-in');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastra-se</CardTitle>
        <CardDescription>
          Insira seus dados para criar uma conta e acessar nossos serviços.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-2 gap-x-4 gap-y-4'
          >
            <Controller
              control={form.control}
              name='profilePicture'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='profilePicture'>Foto de perfil</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='profilePicture'
                      type='file'
                      value={field.value?.length ? field.value[0].name : ''}
                      accept='.png,.jpg,.jpeg'
                      onChange={event => handleChangeFile(event, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='name'>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} id='name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input {...field} id='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='phone'>Telefone</FormLabel>
                  <FormControl>
                    <PatternFormat
                      {...field}
                      id='phone'
                      value={field.value}
                      format='(##) #####-####'
                      customInput={Input}
                      onValueChange={values => {
                        field.onChange(values.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='cpf'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='cpf'>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      {...field}
                      id='cpf'
                      format='###.###.###-##'
                      autoComplete='off'
                      customInput={Input}
                      onValueChange={values => {
                        field.onChange(values.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='birthDate'>Data de Nascimento</FormLabel>
                  <FormControl>
                    <PatternFormat
                      {...field}
                      id='birthDate'
                      value={field.value}
                      format='##/##/####'
                      customInput={Input}
                      onValueChange={values => {
                        field.onChange(values.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='password'>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} id='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='confirmPassword'>
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id='confirmPassword' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className='col-span-2 w-full py-6'
              type='submit'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className='flex'>
                  <Loader2 className='animate-spin mr-2' />
                  <p>Entrando</p>
                </div>
              ) : (
                <p>Cadastrar</p>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
