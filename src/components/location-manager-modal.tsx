import { LocationPanel } from "@/components/location-manager";
import { useUserStore } from "@/context/use-user-store";
import { cn } from "@/lib/utils";
import { CepSchema } from "@/types/cep";
import { searchLocationByCEP } from "@/utils/serch-location-by-cep";
import { ChevronLeft, EllipsisVertical, House } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function LocationManagerModal() {
  const [step, setStep] = useState(1);
  const [addressFounded, setAddressFounded] = useState({
    cep: "",
    city: "",
    neighborhood: "",
    service: "",
    state: "",
    street: "",
  });

  const { user, updateAddresses } = useUserStore();

  function verifyHasAnyAddress() {
    return (user.addresses ?? []).length > 0;
  }

  async function handleSearchAddress(data: CepSchema) {
    const location = await searchLocationByCEP(data.cep);
    setAddressFounded({
      ...location,
      street: location.street.replace("Rua ", ""),
    });

    setStep((prev) => prev + 1);
  }

  function handleChangeAddressLikeDefault(addressId: string) {
    const updatedAddresses = user.addresses?.map((address) => ({
      ...address,
      selected: address.id === addressId,
    }))
    
    updateAddresses(updatedAddresses)
  }

  return (
    <LocationPanel.Content>
      <LocationPanel.Header>
        <LocationPanel.TitleWithoutContent
          show={!verifyHasAnyAddress() && step === 1}
        >
          Parece que você não tem endereço cadastrado
        </LocationPanel.TitleWithoutContent>

        <LocationPanel.TitleSelectAddress show={verifyHasAnyAddress() && step === 1}>
          Selecione um endereço
        </LocationPanel.TitleSelectAddress>

        <LocationPanel.TitleSearchAddress show={verifyHasAnyAddress() && step === 2}>
          <div className="flex items-center gap-4">
            <ChevronLeft
              className="size-6 cursor-pointer text-primary"
              onClick={() => setStep((prev) => prev - 1)}
            />
            <h2>Adicionar endereço</h2>
          </div>
        </LocationPanel.TitleSearchAddress>

        <LocationPanel.TitleConfirmAddress
          show={verifyHasAnyAddress() && step === 3}
        >
          <div className="flex items-center gap-4">
            <ChevronLeft
              className="size-6 cursor-pointer text-primary"
              onClick={() => setStep((prev) => prev - 1)}
            />
            <h2>Confirme o endereço</h2>
          </div>
        </LocationPanel.TitleConfirmAddress>
      </LocationPanel.Header>

      <LocationPanel.SelectAddress show={verifyHasAnyAddress() && step === 1}>
        {user.addresses?.map((address) => (
          <LocationPanel.AddressCard
            key={address.id}
            className={cn("", address.selected && "ring-2 ring-primary")}
            onClick={() => handleChangeAddressLikeDefault(address.id)}
          >
            <House className="size-6" />
            <LocationPanel.CardContent>
              <LocationPanel.CardType>{address.type}</LocationPanel.CardType>
              <LocationPanel.CardStreetNumber>
                <span>
                  {address.address.street}, {address.address.state}
                </span>
              </LocationPanel.CardStreetNumber>
            </LocationPanel.CardContent>
            <Button className="group grid size-8 place-content-center self-start bg-transparent p-0 text-muted-foreground hover:bg-transparent">
              <EllipsisVertical className="size-6 self-start group-hover:text-muted" />
            </Button>
          </LocationPanel.AddressCard>
        ))}

        <LocationPanel.Footer>
          <Button
            className="semibold"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Adicione um novo endereço
          </Button>
        </LocationPanel.Footer>
      </LocationPanel.SelectAddress>

      <LocationPanel.SearchAddressByCep
        handleSearchAddress={handleSearchAddress}
        show={verifyHasAnyAddress() && step === 2}
      />

      <LocationPanel.ConfirmAddress
        location={addressFounded}
        show={verifyHasAnyAddress() && step === 3}
      />

      <LocationPanel.Footer
        className={cn(
          "hidden",
          !verifyHasAnyAddress() && step === 1 && "block",
        )}
      >
        <Button
          className="semibold"
          onClick={() => setStep((prev) => prev + 1)}
        >
          Adicione um endereço
        </Button>
      </LocationPanel.Footer>
    </LocationPanel.Content>
  );
}
