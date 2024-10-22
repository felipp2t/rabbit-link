import { type CarouselApi } from '@/components/ui/carousel';
import { useCallback, useEffect, useState } from 'react';

export const useCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const onSelect = useCallback(
    (selectedIndex: number) => {
      if (api) {
        api.scrollTo(selectedIndex);
      }
    },
    [api],
  );

  return {
    api,
    setApi,
    currentIndex,
    onSelect,
  };
};
