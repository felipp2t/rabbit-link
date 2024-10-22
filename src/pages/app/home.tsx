import { FilterMenu } from '@/components/category-menu';

import { OnSiteServices } from './services-sections/onsite-services';
import { RemoteServices } from './services-sections/remote-services';
import { ServicesFiltredByRegion } from './services-sections/services-by-region';

export function Home() {
  return (
    <main className='flex flex-col gap-4 px-8 mb-20'>
      <span className='sr-only'>Página principal</span>
      <FilterMenu />

      <div className='flex flex-col gap-24 w-full mt-4'>
        <ServicesFiltredByRegion />
        <RemoteServices />
        <OnSiteServices />
      </div>
    </main>
  );
}
