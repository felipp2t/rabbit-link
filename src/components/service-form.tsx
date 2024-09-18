import { LocationManagerModal } from "@/components/location-manager-modal";
import { daysOfWeek } from "@/constants/days-of-weeks";
import { useServiceStore } from "@/context/use-service-store";
import { useUserStore } from "@/context/use-user-store";
import { cn } from "@/lib/utils";
import { Availability, Location, Service } from "@/types/service";
import { ArrowRightLeft, EllipsisVertical, House } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { LocationPanel } from "./location-manager";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ServiceFormProps {
  onlySearch?: boolean;
  service: Service;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      price: string;
      location: string;
      workType: "REMOTO" | "PRESENCIAL" | "HÍBRIDO";
      availability: Availability;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}

export function ServiceForm({ service, form }: ServiceFormProps) {
  const {
    service: { location },
  } = useServiceStore();
  const { user } = useUserStore();

  const locationDefault = user.addresses.find(({ selected }) => selected);
  const locationDefaultFormatted = {
    id: locationDefault?.id ?? "",
    city: locationDefault?.address.city ?? "",
    state: locationDefault?.address.state ?? "",
  };

  const [locationValue, setLocationValue] = useState<Location>(
    location || locationDefaultFormatted,
  );

  useEffect(() => {
    if (service.id) {
      setLocationValue({
        id: service.location.city,
        city: service.location.city,
        state: service.location.state,
      });
    }
  }, [service]);

  const {
    setTitle,
    setPrice,
    setDescription,
    setWorkType,
    setLocation,
    handleDayToggle,
    handleTimeChange,
  } = useServiceStore();

  function handleSelectAddressToService(addressId: string) {
    const addressFound = user.addresses.find(({ id }) => id === addressId);
    if (addressFound) {
      const addressSeleted: Location = {
        id: addressFound.id,
        city: addressFound.address.city,
        state: addressFound.address.state,
      };

      setLocationValue(addressSeleted);
      setLocation(addressSeleted);
    }
  }

  return (
    <Form {...form}>
      <form className="grid grid-cols-4 gap-4">
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="title">Título</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="title"
                  value={field.value ?? service.title}
                  placeholder="título do serviço"
                  onChange={(e) => {
                    field.onChange(e);
                    setTitle(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="price">Preço</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="price"
                  value={field.value ?? service.price}
                  placeholder="preço do serviço"
                  onChange={(e) => {
                    field.onChange(e);
                    setPrice(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? service.description}
                  placeholder="descrição do serviço"
                  onChange={(e) => {
                    field.onChange(e);
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="location"
          render={() => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="location">
                {service.location.city.length > 0 ? (
                  <span>Localização</span>
                ) : (
                  <span>Você ainda não possui uma localização.</span>
                )}
              </FormLabel>
              <FormControl>
                <LocationPanel.Root>
                  {service.location.city.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={`${locationValue.city}, ${locationValue.state}`}
                      />
                      <LocationPanel.Trigger>
                        <Button className="size-9 px-2">
                          <ArrowRightLeft className="size-6" />
                        </Button>
                      </LocationPanel.Trigger>
                      <LocationPanel.Content>
                        <LocationPanel.Header>
                          <LocationPanel.TitleSelectAddress show>
                            Selecione um endereço
                          </LocationPanel.TitleSelectAddress>
                        </LocationPanel.Header>
                        {user.addresses?.map((address) => (
                          <LocationPanel.AddressCard
                            key={address.id}
                            className={cn(
                              "",
                              address.id === locationValue.id &&
                                "ring-2 ring-primary",
                            )}
                            onClick={() =>
                              handleSelectAddressToService(address.id)
                            }
                          >
                            <House className="size-6" />
                            <LocationPanel.CardContent>
                              <LocationPanel.CardType>
                                {address.type}
                              </LocationPanel.CardType>
                              <LocationPanel.CardStreetNumber>
                                <span>
                                  {address.address.street},{" "}
                                  {address.address.state}
                                </span>
                              </LocationPanel.CardStreetNumber>
                            </LocationPanel.CardContent>
                            <Button className="group grid size-8 place-content-center self-start bg-transparent p-0 text-muted-foreground hover:bg-transparent">
                              <EllipsisVertical className="size-6 self-start group-hover:text-muted" />
                            </Button>
                          </LocationPanel.AddressCard>
                        ))}
                      </LocationPanel.Content>
                    </div>
                  ) : (
                    <>
                      <LocationPanel.Trigger>
                        <Button className="w-full border bg-background text-foreground hover:bg-secondary">
                          Selecionar Localização
                        </Button>
                      </LocationPanel.Trigger>
                      <LocationManagerModal />
                    </>
                  )}
                </LocationPanel.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="workType">Tipo de Trabalho</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => {
                    setWorkType(value as "PRESENCIAL" | "REMOTO" | "HÍBRIDO");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="REMOTO">Remoto</SelectItem>
                      <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                      <SelectItem value="HÍBRIDO">Híbrido</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="availability"
          render={() => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="availability">Disponibilidade</FormLabel>
              <FormControl>
                <Dialog>
                  {Object.keys(service.availability).length > 0 ? (
                    <div className="flex flex-col space-y-4">
                      <ul className="list-disc space-y-1 pl-5">
                        {Object.entries(service.availability)
                          .filter(([, time]) => time && time.start && time.end)
                          .sort(
                            ([dayA], [dayB]) =>
                              daysOfWeek.indexOf(dayA) -
                              daysOfWeek.indexOf(dayB),
                          )
                          .map(
                            ([day, time]: [
                              string,
                              { start: string; end: string } | null,
                            ]) => (
                              <li key={day}>
                                {day}: {time?.start} - {time?.end}
                              </li>
                            ),
                          )}
                      </ul>
                      <DialogTrigger asChild>
                        <Button className="w-full border bg-background text-foreground hover:bg-secondary">
                          Mudar disponibilidade
                        </Button>
                      </DialogTrigger>
                    </div>
                  ) : (
                    <DialogTrigger asChild>
                      <Button className="w-full border bg-background text-foreground hover:bg-secondary">
                        Selecionar Disponibilidade
                      </Button>
                    </DialogTrigger>
                  )}
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Set Your Availability</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="flex items-center space-x-4">
                          <Checkbox
                            id={day}
                            checked={!!service.availability[day]}
                            onCheckedChange={() => handleDayToggle(day)}
                          />
                          <Label htmlFor={day} className="flex-grow">
                            {day}
                          </Label>
                          {service.availability[day] && (
                            <>
                              <Input
                                type="time"
                                value={service.availability[day]?.start}
                                onChange={(e) =>
                                  handleTimeChange(day, "start", e.target.value)
                                }
                                className="w-24"
                              />
                              <span>até</span>
                              <Input
                                type="time"
                                value={service.availability[day]?.end}
                                onChange={(e) =>
                                  handleTimeChange(day, "end", e.target.value)
                                }
                                className="w-24"
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Fechar</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
