interface separetePriceRangeProps {
  price: string;
}

export const separetePriceRange = ({ price }: separetePriceRangeProps) => {
  return price ? price.split('-') : ['', ''];
};
