import { getCategories } from '@/http/category/get-categories';
import { iconMap } from '@/mappers/mapped-icon-categories';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const removeAccent = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const FilterMenu = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <div className='w-full mt-2'>
      <NavigationMenu>
        <NavigationMenuList className='space-x-4'>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='-ml-4 md:ml-8'>Categorias</NavigationMenuTrigger>
            <NavigationMenuContent>
              {isLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[500px] overflow-y-auto'>
                  {categories?.map(category => {
                    const IconComponent = iconMap[category.iconName];
                    return (
                      <Link
                        to={`/categorias/${removeAccent(category.name)}`}
                        key={category.id}
                      >
                        <li className='space-y-2 border px-4 py-2 rounded-md hover:bg-muted'>
                          <div className='flex items-center gap-4'>
                            <div className='p-1.5 text-xs bg-muted rounded-full'>
                              <IconComponent />
                            </div>
                            <h1 className='capitalize'>{category.name}</h1>
                          </div>
                          <p className='text-xs text-muted-foreground line-clamp-2'>
                            {category.description}
                          </p>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Áreas</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] max-h-[500px] overflow-y-auto'>
                {categories?.map(category => {
                  const IconComponent = iconMap[category.iconName];
                  return (
                    <Link
                      to={`/categorias/${removeAccent(category.name)}`}
                      key={category.id}
                    >
                      <li className='space-y-2 border px-4 py-2 rounded-md hover:bg-muted'>
                        <div className='flex items-center gap-4'>
                          <div className='p-1.5 text-xs bg-muted rounded-full'>
                            <IconComponent />
                          </div>
                          <h1 className='capitalize'>{category.name}</h1>
                        </div>
                        <p className='text-xs text-muted-foreground line-clamp-2'>
                          {category.description}
                        </p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
