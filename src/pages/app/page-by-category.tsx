import { CategoriesParams } from '@/@types/categories-without-accent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { UnderlinedTitle } from '@/components/underlined-title';
import { getCategories } from '@/http/category/get-categories';
import { getServicesByCategory } from '@/http/service/get-services-by-category';
import { categoryMap } from '@/mappers/mapped-name-categories';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const PageFilteredByCategory = () => {
  const { category } = useParams<CategoriesParams>();

  const { data: categories } = useQuery({
    queryKey: ['get-categories', category],
    queryFn: async () => await getCategories(),
  });

  const categoryFound = categories?.find(
    cat => cat.name === categoryMap[category!],
  );

  const { data: servicesByCategories } = useQuery({
    queryKey: ['get-services-by-category', categoryFound?.id],
    queryFn: async () =>
      await getServicesByCategory({ categoryId: categoryFound!.id }),
    staleTime: 1000 * 60 * 15,
    enabled: !!categoryFound,
  });

  if (!categories) {
    return null;
  }

  if (!category) {
    return null;
  }

  console.log(servicesByCategories);

  return (
    <main className='flex flex-col gap-10 px-8 mt-8'>
      <UnderlinedTitle>
        Serviços - <span className='capitalize'>{categoryFound?.name}</span>
      </UnderlinedTitle>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap gap-8'>
        {servicesByCategories?.map(service => (
          <Card className='w-full max-w-sm mx-auto' key={service.id}>
            <CardContent className='pt-6 flex flex-col items-center'>
              <Avatar className='w-24 h-24'>
                <AvatarImage
                  src='/placeholder.svg?height=96&width=96'
                  alt='Foto de perfil'
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <h2 className='mt-4 text-2xl font-bold'>João Paulo</h2>
              <p className='text-muted-foreground'>Designer Gráfico</p>
              <p className='mt-4 text-center'>
                Especialista em design de logotipos e identidade visual para
                pequenas e médias empresas. Com mais de 5 anos de experiência no
                mercado.
              </p>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button>Ver mais detalhes</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};
