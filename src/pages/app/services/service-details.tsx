import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Briefcase,
  Calendar,
  MapPin,
  MessageCircle,
  Undo2,
} from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { getServiceById } from '@/http/service/get-service-by-id';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileAvatar from '/imagem-perfil.jpg';

import { createChat } from '@/http/chat/create-chat';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { UUID } from 'node:crypto';

dayjs.locale(ptBR);

export function SkeletonDemo() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='mx-auto flex h-80 w-72 max-w-md shrink-0 flex-col md:w-80 xl:w-96' />
    </div>
  );
}

const transformDate = (dateISO: string) => dayjs(dateISO).format('D [de] MMMM');

export function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const { data: service, isLoading } = useQuery({
    queryKey: ['serviceById', id],
    queryFn: async () => {
      if (id) {
        return await getServiceById({ id });
      }
    },
    enabled: !!id,
  });

  const { mutateAsync: createChatMutation } = useMutation({
    mutationKey: ['create-chat'],
    mutationFn: async ({ userId, token }: { userId: UUID; token: string }) => {
      return await createChat({ userId, token });
    },

    onSuccess: () => navigate('/conversas'),
  });

  async function initializeChatSession(userId: UUID) {
    if (!token) {
      return null;
    }

    await createChatMutation({ userId, token });
  }

  if (!id) {
    return <h1>Id não encontrado</h1>;
  }

  const publishedDate = dayjs(service?.createdAt).format(
    'D [de] MMMM [de] YYYY',
  );

  return (
    <>
      {isLoading ? (
        <>
          <SkeletonDemo />
        </>
      ) : (
        <>
          {service && (
            <div className='container mx-auto mt-28 px-4 pb-8'>
              <Card className='mx-auto max-w-3xl'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-4'>
                      <Undo2
                        className='size-7 text-primary'
                        onClick={() => navigate(-1)}
                      />
                      <CardTitle className='text-3xl font-bold'>
                        {service.title}
                      </CardTitle>
                    </div>
                    <Badge className='px-3 py-1 text-md'>
                      {service.workType}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex flex-col items-center gap-6 sm:flex-row'>
                    <div className='relative size-32 overflow-hidden rounded-full'>
                      <img
                        src={ProfileAvatar}
                        alt='cliente'
                        className='size-32'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3 className='mb-2 text-xl font-semibold'>
                        Felipe Rossetto
                      </h3>
                      <p className='line-clamp-2 text-muted-foreground'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Labore quae doloribus inventore iusto
                        exercitationem assumenda maxime voluptatum et quasi
                        molestias?
                      </p>
                      <Button
                        variant='outline'
                        className='mt-4'
                        onClick={() =>
                          initializeChatSession(service.providerId)
                        }
                      >
                        <MessageCircle className='mr-2 size-4' />
                        Conversar com o Cliente
                      </Button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 sm:flex-row sm:justify-between'>
                    <div className='flex items-center'>
                      <p className='text-muted-foreground'>
                        <span className='text-primary'>$</span>{' '}
                        {service.budget.split('-')[0]} até{' '}
                        <span className='text-primary'>$</span>{' '}
                        {service.budget.split('-')[1]}
                      </p>
                    </div>
                    <div className='flex items-center text-primary'>
                      <MapPin className='mr-2 size-5' />
                      <p className='text-muted-foreground'>
                        {service.location}
                      </p>
                    </div>
                    <div className='flex items-center'>
                      <Calendar className='mr-2 size-5 text-primary' />
                      <p className='text-muted-foreground'>
                        <span className='text-sm'>Data limite:</span> <br />{' '}
                        {transformDate(service.deadline)}
                      </p>
                      {}
                    </div>
                  </div>
                  <div className='rounded-lg bg-muted p-4'>
                    <h3 className='mb-2 font-semibold'>
                      Descrição do Serviço:
                    </h3>
                    {service.description}
                  </div>
                </CardContent>
                <CardFooter className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                  <p className='text-sm text-muted-foreground'>
                    Publicado em: {publishedDate}
                  </p>
                  <Button
                    size='lg'
                    onClick={() =>
                      alert('Funcionalidade de candidatura a ser implementada')
                    }
                  >
                    <Briefcase className='mr-2 size-4' />
                    Candidatar-se ao Projeto
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
}
