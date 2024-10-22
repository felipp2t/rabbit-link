interface separateLocationInCityAndStateProps {
  location: string;
}

export const separateLocationInCityAndState = ({
  location,
}: separateLocationInCityAndStateProps) => {
  return location ? location.split(', ') : ['', ''];
};
