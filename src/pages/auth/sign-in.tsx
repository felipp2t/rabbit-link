import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleSignIn } from '@/http/auth/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SignInSchema, signInValidation } from './types/sign-in';
import GoogleImage from '/google-icon.png';

export function SignIn() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInValidation),
  });

  const { mutateAsync: signInMutation } = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async (data: SignInSchema) => await handleSignIn(data),
  });

  async function onSubmit(data: SignInSchema) {
    try {
      await signInMutation(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold tracking-tight'>
          Faça Login
        </CardTitle>
        <CardDescription className='text-sm text-muted-foreground'>
          Faça login para acessar sua conta e gerenciar seus serviços.
        </CardDescription>
      </CardHeader>
      <CardContent className='px-6'>
        <Form {...form}>
          <form
            className='flex flex-col gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input {...field} id='email' value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <FormControl>
                    <Input {...field} id='password' value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link to='/auth/esqueceu-senha' className='block text-end text-sm'>
              Esqueceu a senha?
            </Link>

            <Button
              disabled={form.formState.isSubmitting}
              className='w-full py-6'
            >
              {form.formState.isSubmitting ? (
                <div className='flex'>
                  <Loader2 className='animate-spin mr-2' />
                  <p>Entrando</p>
                </div>
              ) : (
                <p>Entrar</p>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant='outline'
          className='flex w-full items-center gap-4 px-4 py-6'
        >
          <Link to={'http://localhost:80/api/oauth2/authorization/google'}>
            <img src={GoogleImage} alt='google-image' />
            Entrar com o google
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
