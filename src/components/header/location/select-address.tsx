import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import cep from "cep-promise";
import {
  ChevronDown,
  ChevronLeft,
  EllipsisVertical,
  House,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { ConfirmAddress } from "./confirm-address";
import { SearchAddress } from "./search-address";
import { CepSchema } from "./types/cep";

export function SelectAddress() {
  const [isSelectAddress, setIsSelectAddress] = useState(true);
  const [isSearchAddressModal, setIsSearchAddressModal] = useState(false);
  const [isConfirmAddress, setIsConfirmAddress] = useState(false);
  const [address, setAddress] = useState({
    cep: "",
    city: "",
    neighborhood: "",
    service: "",
    state: "",
    street: "",
  });

  async function handleSearchCep(data: CepSchema) {
    const location = await cep(data.cep);
    setIsSearchAddressModal(false);
    setIsConfirmAddress(true);

    console.log(location);
    setAddress({ ...location, street: location.street.replace("Rua", "") });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="hover: flex cursor-pointer items-center gap-2 text-secondary-foreground">
            <p className="text-sm">R. Argemiro Frutuoso, 402</p>
            <ChevronDown className="size-6" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSelectAddress && "Selecione um endereço"}
              {isSearchAddressModal && "Adicionar endereço"}
              {isConfirmAddress && (
                <div className="flex items-center gap-4">
                  <ChevronLeft
                    className="size-6 cursor-pointer text-primary"
                    onClick={() => {
                      setIsSearchAddressModal(true);
                      setIsConfirmAddress(false);
                    }}
                  />
                  <h2>Confirme o endereço</h2>
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              Adicione um endereço para atender os serviços presenciais.
            </DialogDescription>
          </DialogHeader>
          {isSelectAddress && (
            <>
              <Card className="ring-2 ring-primary">
                <form className="h-20 w-full p-4">
                  <div className="flex h-full items-center gap-6">
                    <House className="size-6" />
                    <div className="pointer-events-none flex-grow select-none">
                      <h4 className="font-medium">Casa</h4>
                      <p className="text-sm text-muted-foreground">
                        R. Argemiro Frutuoso, 385 Apartamento
                      </p>
                    </div>
                    <Button className="group grid size-8 place-content-center self-start bg-transparent p-0 text-muted-foreground hover:bg-transparent">
                      <EllipsisVertical className="size-6 self-start group-hover:text-muted" />
                    </Button>
                  </div>
                </form>
              </Card>

              <Card>
                <form className="h-20 w-full p-4">
                  <div className="flex h-full items-center gap-6">
                    <House className="size-6" />
                    <div className="pointer-events-none flex-grow select-none">
                      <h4 className="font-medium">Apartamento</h4>
                      <p className="text-sm text-muted-foreground">
                        R. Argemiro Frutuoso, 385 Apartamento
                      </p>
                    </div>
                    <Button className="group grid size-8 place-content-center self-start bg-transparent p-0 text-muted-foreground hover:bg-transparent">
                      <EllipsisVertical className="size-6 self-start group-hover:text-muted" />
                    </Button>
                  </div>
                </form>
              </Card>

              <DialogFooter>
                <Button
                  onClick={() => {
                    setIsSelectAddress(false);
                    setIsSearchAddressModal(true);
                  }}
                >
                  Adicionar endereço
                </Button>
              </DialogFooter>
            </>
          )}

          {isSearchAddressModal && (
            <SearchAddress handleSearchCep={handleSearchCep} />
          )}

          {isConfirmAddress && <ConfirmAddress location={address} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
