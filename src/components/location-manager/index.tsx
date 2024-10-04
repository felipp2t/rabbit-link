import { AddressCard } from "./card/address-card";
import { CardContent } from "./card/card-content";
import { CardOptions } from "./card/card-options";
import { CardStreetNumber } from "./card/card-street-number";
import { CardType } from "./card/card-type";
import { Content } from "./content";
import { Description } from "./description";
import { Footer } from "./footer";
import { Header } from "./header";
import { Root } from "./root";
import { StepButton } from "./step-button";
import { ConfirmAddress } from "./steps/confirm-address";
import { SearchAddressByCep } from "./steps/search-address-by-cep";
import { SelectAddress } from "./steps/select-address";
import { Title } from "./title";

import { Trigger } from "./trigger";

export const LocationPanel = {
  Root,
  Trigger,
  Content,
  Header,
  Title,
  Description,
  SelectAddress,
  SearchAddressByCep,
  ConfirmAddress,
  StepButton,
  AddressCard,
  CardType,
  CardContent,
  CardStreetNumber,
  CardOptions,
  Footer,
};
