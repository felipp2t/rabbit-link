import { useServiceStore } from "@/context/use-service-store";
import { useUserStore } from "@/context/use-user-store";
import { cn } from "@/lib/utils";
import { ServiceDetailsSchema } from "@/pages/app/services/types/fill-in-service-details";
import { Location, ServiceRequest } from "@/types/service/service-request";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ArrowRightLeft, CalendarIcon, House } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { LocationPanel } from "./location-manager";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
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
  service: ServiceRequest;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      price: {
        minimum: string;
        maximum: string;
      };
      location: {
        id: string;
        city: string;
        state: string;
      };
      workType: "REMOTE" | "ONSITE" | "HYBRID";
      deadline: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;

  handleOnSubmit: (data: ServiceDetailsSchema) => void;
}

export function ServiceForm({
  service,
  form,
  handleOnSubmit,
}: ServiceFormProps) {
  const { user } = useUserStore();

  const { handlePrevious } = useServiceStore();

  const [locationValue, setLocationValue] = useState<Location>({
    id: service.location.id || user.addresses[0].id,
    city: service.location.city || user.addresses[0].address.city,
    state: service.location.state || user.addresses[0].address.state,
  });

  useEffect(() => {
    form.setValue("location", locationValue);
    form.setValue("title", form.getValues("title"));
    form.setValue("description", form.getValues("description"));
    form.setValue("price.maximum", form.getValues("price.maximum"));
    form.setValue("price.minimum", form.getValues("price.minimum"));
    form.setValue("workType", form.getValues("workType"));
    form.setValue("deadline", form.getValues("deadline"));
  }, [locationValue, form]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-4 sm:col-span-2">
                <FormLabel htmlFor="title">Título</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="title"
                    value={field.value ?? service.title}
                    placeholder="título do serviço"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price.minimum"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel htmlFor="price.minimum">Preço Mínimo</FormLabel>
                <FormControl>
                  <NumericFormat
                    {...field}
                    value={field.value ?? service.price.minimum}
                    step="1"
                    min="1"
                    max="10000"
                    allowLeadingZeros
                    customInput={Input}
                    id="price.minimum"
                    defaultValue={field.value ?? service.price.minimum}
                    placeholder="min. 1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price.maximum"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel htmlFor="price.maximum">Preço Máximo</FormLabel>
                <FormControl>
                  <NumericFormat
                    {...field}
                    value={field.value ?? service.price.maximum}
                    step="1"
                    min="1"
                    max="10000"
                    allowLeadingZeros
                    customInput={Input}
                    id="price.maximum"
                    defaultValue={field.value ?? service.price.maximum}
                    placeholder="max. 10.000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              return (
                <FormItem className="col-span-4 sm:col-span-2">
                  <FormLabel htmlFor="location">Localização</FormLabel>
                  <FormControl>
                    <LocationPanel.Root>
                      <div className="flex items-center gap-2">
                        <Input
                          {...field}
                          id="location"
                          value={`${locationValue.city}, ${locationValue.state}`}
                          readOnly
                        />
                        <LocationPanel.Trigger>
                          <Button className="size-9 px-2">
                            <ArrowRightLeft className="size-6" />
                          </Button>
                        </LocationPanel.Trigger>
                        <LocationPanel.Content>
                          <LocationPanel.Header show>
                            <LocationPanel.Title>
                              Selecione um endereço
                            </LocationPanel.Title>
                          </LocationPanel.Header>
                          {user.addresses?.map((address) => (
                            <LocationPanel.AddressCard
                              key={address.id}
                              className={cn(
                                "cursor-pointer",
                                address.id === locationValue.id &&
                                  "ring-2 ring-primary",
                              )}
                              onClick={() =>
                                setLocationValue({
                                  id: address.id,
                                  city: address.address.city,
                                  state: address.address.state,
                                })
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
                            </LocationPanel.AddressCard>
                          ))}
                        </LocationPanel.Content>
                      </div>
                    </LocationPanel.Root>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem className="col-span-4 sm:col-span-2">
                <FormLabel htmlFor="workType">Tipo de Trabalho</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="REMOTE">Remoto</SelectItem>
                        <SelectItem value="ONSITE">Presencial</SelectItem>
                        <SelectItem value="HYBRID">Híbrido</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Prazo para inscrições (max. 7 dias)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          // Exibe a data formatada, convertendo de string ISO para Date
                          format(new Date(field.value), "PPP", { locale: pt })
                        ) : (
                          <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={pt}
                      // Converte a string ISO de volta para Date para a seleção do calendário
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          // Converte a data para ISO string ao selecionar
                          field.onChange(date.toISOString());
                        }
                      }}
                      // Desabilita datas fora do intervalo permitido
                      disabled={(date) =>
                        date < new Date() ||
                        date >
                          new Date(new Date().setDate(new Date().getDate() + 7))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button onClick={handlePrevious} variant="outline" type="button">
            Voltar
          </Button>

          <Button type="submit">Próximo</Button>
        </div>
      </form>
    </Form>
  );
}
