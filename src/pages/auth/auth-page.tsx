import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SignIn } from './sign-in';
import { SignUp } from './sign-up';

export type AuthPageProps = 'sign-in' | 'sign-up';

export function AuthPage() {
  const [authTab, setAuthTab] = useState<AuthPageProps>('sign-in');
  return (
    <div className='flex flex-col gap-6'>
      <Helmet title='Login' />

      <Tabs defaultValue={authTab} className='flex w-96 flex-col items-center'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='sign-in'>Entrar</TabsTrigger>
          <TabsTrigger value='sign-up'>Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value='sign-in'>
          <SignIn />
        </TabsContent>
        <TabsContent value='sign-up' className='w-[600px]'>
          <SignUp setAuthTab={setAuthTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
