import { daysOfWeek } from "@/constants/days-of-weeks";
import { useServiceStore } from "@/context/use-service-store";
import { CepSchema } from "@/types/cep";
import { Availability, Service } from "@/types/service";
import { searchLocationByCEP } from "@/utils/serch-location-by-cep";
import { ArrowRightLeft } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";
import { AddZipCodeDialog } from "./add-zip-code-dialog";
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
  service: Service;
  form: UseFormReturn<
    {
      title: string;
      description: string;
      price: string;
      location: string;
      workType: "remoto" | "presencial" | "híbrido";
      availability: Availability;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}

export function ServiceForm({ service, form }: ServiceFormProps) {
  const {
    setTitle,
    setPrice,
    setDescription,
    setLocation,
    setWorkType,
    handleDayToggle,
    handleTimeChange,
  } = useServiceStore();

  async function handleSearchCep(data: CepSchema) {
    const { state, city } = await searchLocationByCEP(data.cep);

    setLocation(`${city}, ${state}`);
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
              <FormLabel htmlFor="location">Localização</FormLabel>
              <FormControl>
                <Dialog>
                  {service.location.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <Input value={service.location} />
                      <DialogTrigger asChild>
                        <Button className="size-9 px-2">
                          <ArrowRightLeft className="size-6" />
                        </Button>
                      </DialogTrigger>
                    </div>
                  ) : (
                    <DialogTrigger className="block w-full" asChild>
                      <Button className="w-full border bg-background text-foreground hover:bg-secondary">
                        Selecionar Localização
                      </Button>
                    </DialogTrigger>
                  )}
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Adicione a localizão do serviço.
                      </DialogTitle>
                    </DialogHeader>

                    <AddZipCodeDialog
                      handleSearchCep={handleSearchCep}
                      isClose
                    />
                  </DialogContent>
                </Dialog>
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
                    setWorkType(value as "presencial" | "remoto" | "híbrido");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="remoto">Remoto</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="híbrido">Híbrido</SelectItem>
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
