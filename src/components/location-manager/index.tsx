import { AddressCard } from "./card/address-card";
import { CardContent } from "./card/card-content";
import { CardOptions } from "./card/card-options";
import { CardStreetNumber } from "./card/card-street-number";
import { CardType } from "./card/card-type";
import { Content } from "./content";
import { Footer } from "./footer";
import { Header } from "./header";
import { Root } from "./root";
import { StepButton } from "./step-button";
import { ConfirmAddress } from "./steps/confirm-address";
import { SearchAddressByCep } from "./steps/search-address-by-cep";
import { SelectAddress } from "./steps/select-address";
import { TitleConfirmAddress } from "./titles/title-confirm-address";
import { TitleSearchAddress } from "./titles/title-search-address";
import { TitleSelectAddress } from "./titles/title-select";
import { TitleWithoutContent } from "./titles/title-without-content";
import { Trigger } from "./trigger";

export const LocationPanel = {
  Root,
  Trigger,
  Content,
  Header,
  TitleWithoutContent,
  TitleSelectAddress,
  TitleSearchAddress,
  TitleConfirmAddress,
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
