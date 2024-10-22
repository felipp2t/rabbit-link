import { ServiceRequest } from '@/@types/service/service-request';

interface createServiceRequest {
  service: ServiceRequest;
}

export async function createService({ service }: createServiceRequest) {
  try {
    const token = localStorage.getItem('token');

    await fetch('http://localhost:80/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: service.title,
        description: service.description,
        budget: `${service.price.minimum}-${service.price.maximum}`,
        deadline: service.deadline,
        workType: service.workType,
        location: `${service.location.city}, ${service.location.state}`,
        categories: service.categories.map(category => category.id),
      }),
    });

    location.href = '/meus-servicos';
  } catch (error) {
    console.error('Error creating service:', error);
  }
}
