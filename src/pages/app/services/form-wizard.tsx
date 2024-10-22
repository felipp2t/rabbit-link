import { Card } from '@/components/ui/card';
import { UnderlinedTitle } from '@/components/underlined-title';
import { cn } from '@/lib/utils';
import { useServiceStore } from '@/stores/use-service-store';
import { ConfirmDetails } from './confirm-details';
import { FillInServiceDetails } from './fill-in-service-details';
import { SelectCategories } from './select-categories';

export function FormWizard() {
  const token = localStorage.getItem('token');

  if (!token) {
    location.href = '/auth';
  }

  const { step } = useServiceStore();

  return (
    <main className='flex flex-col items-center px-8 mb-20'>
      <div className='flex flex-col gap-8 mt-4'>
        <UnderlinedTitle className=''>Criar Novo Serviço</UnderlinedTitle>
        <Card
          className={cn(
            'mx-auto',
            step === 1 && 'max-w-5xl',
            (step === 2 || step === 3) && 'max-w-2xl',
          )}
        >
          {step === 1 && <SelectCategories />}
          {step === 2 && <FillInServiceDetails />}
          {step === 3 && <ConfirmDetails />}
        </Card>
      </div>
    </main>
  );
}
