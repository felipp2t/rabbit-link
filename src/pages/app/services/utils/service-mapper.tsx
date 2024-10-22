import { ServiceRequest } from '@/@types/service/service-request';
import { ServiceResponse } from '@/@types/service/service-response';
import { mappedWorkTypeMapRequest } from '@/mappers/mapped-work-type-request';
import { separateLocationInCityAndState } from './separate-location-in-city-and-state';
import { separetePriceRange } from './separete-price-range';

interface serviceMapperProps {
  services: ServiceResponse[];
}

export const serviceMapper = ({
  services,
}: serviceMapperProps): ServiceRequest[] => {
  const mappedServices: ServiceRequest[] = services.map(service => {
    return {
      id: service.id,
      categories: service.categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          description: category.description,
          iconName: category.iconName,
        };
      }),
      title: service.title,
      description: service.description,
      price: {
        minimum: separetePriceRange({ price: service.budget })[0],
        maximum: separetePriceRange({ price: service.budget })[1],
      },
      location: {
        id: '',
        city: separateLocationInCityAndState({ location: service.location })[0],
        state: separateLocationInCityAndState({
          location: service.location,
        })[1],
      },
      workType: mappedWorkTypeMapRequest[service.workType] as
        | 'REMOTE'
        | 'ONSITE',
      deadline: service.deadline,
    };
  });

  return mappedServices;
};
