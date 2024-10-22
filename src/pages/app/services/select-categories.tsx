import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { iconMap } from '@/mappers/mapped-icon-categories';

import { getCategories } from '@/http/category/get-categories';
import { cn } from '@/lib/utils';
import { useServiceStore } from '@/stores/use-service-store';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';

export function SelectCategories() {
  const { service, addCategory, handleValidationToNextStep, handleNext } =
    useServiceStore();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Etapa 1: Escolha as Categorias do Seu Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <main className='space-y-4'>
          <p className='mb-4 text-sm text-muted-foreground'>
            Selecione uma ou mais categorias que melhor descrevem seu serviço:
          </p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {categories?.map(category => {
              const IconComponent = iconMap[category.iconName];
              if (category.name !== 'início') {
                return (
                  <Card
                    key={category.name}
                    className={cn(
                      'cursor-pointer transition-all',
                      service.categories.includes(category)
                        ? 'border-primary shadow-md'
                        : 'hover:border-gray-300',
                    )}
                    onClick={() => addCategory(category)}
                  >
                    <CardContent className='flex items-start space-x-4 p-4'>
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground',
                          service.categories.includes(category) &&
                            'bg-primary text-primary-foreground',
                        )}
                      >
                        <IconComponent />
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <h3 className='font-semibold capitalize'>
                            {category.name}
                          </h3>
                          <div
                            className={cn(
                              'flex size-6 items-center justify-center rounded-full border-2 border-gray-300',
                              service.categories.includes(category) &&
                                'border-primary bg-primary',
                            )}
                          >
                            <CheckIcon
                              className={cn(
                                'size-4 opacity-0',
                                service.categories.includes(category) &&
                                  'text-primary-foreground opacity-100',
                              )}
                            />
                          </div>
                        </div>
                        <p className='mt-1 text-sm text-muted-foreground'>
                          {category.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </main>
      </CardContent>
      <CardFooter>
        <Button
          className='ml-auto'
          onClick={handleNext}
          disabled={handleValidationToNextStep()}
        >
          Próximo
        </Button>
      </CardFooter>
    </>
  );
}
