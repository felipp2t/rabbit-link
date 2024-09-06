import { AddZipCodeDialog } from "@/components/add-zip-code-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { daysOfWeek } from "@/constants/days-of-weeks";
import { useCreateService } from "@/context/use-create-service";
import { CepSchema } from "@/types/cep";
import { searchLocationByCEP } from "@/utils/serch-location-by-cep";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRightLeft } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ServiceDetailsSchema,
  ServiceDetailsValidation,
} from "./types/fill-in-service-details";

export function FillInServiceDetails() {
  const {
    title,
    price,
    description,
    workType,
    availability,
    setTitle,
    setPrice,
    setDescription,
    setLocation,
    setWorkType,
    location,
    handleDayToggle,
    handleTimeChange,
  } = useCreateService();

  const form = useForm<ServiceDetailsSchema>({
    resolver: zodResolver(ServiceDetailsValidation),
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      title,
      price,
      description,
      location,
      workType,
      availability,
    });
  }, [title, price, description, location, workType, availability, form]);

  async function handleSearchCep(data: CepSchema) {
    const { state, city } = await searchLocationByCEP(data.cep);

    setLocation(`${city}, ${state}`);
  }

  return (
    <main className="space-y-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Preencha as informações do seu serviço:
      </p>

      <div>
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
                      {location.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <Input className="" value={location} />
                          <DialogTrigger asChild>
                            <Button className="size-9 px-2">
                              <ArrowRightLeft className="size-6" />
                            </Button>
                          </DialogTrigger>
                        </div>
                      ) : (
                        <DialogTrigger className="block w-full" asChild>
                          <Button className="w-full bg-background text-foreground hover:bg-secondary border">
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
                        setWorkType(
                          value as "presencial" | "remoto" | "híbrido",
                        );
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
                <FormItem className="col-span-2 col-start-2">
                  <FormLabel htmlFor="availability">Disponibilidade</FormLabel>
                  <FormControl>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-background text-foreground hover:bg-secondary border">
                          Selecionar Disponibilidade
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Set Your Availability</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {daysOfWeek.map((day) => (
                            <div
                              key={day}
                              className="flex items-center space-x-4"
                            >
                              <Checkbox
                                id={day}
                                checked={!!availability[day]}
                                onCheckedChange={() => handleDayToggle(day)}
                              />
                              <Label htmlFor={day} className="flex-grow">
                                {day}
                              </Label>
                              {availability[day] && (
                                <>
                                  <Input
                                    type="time"
                                    value={availability[day]?.start}
                                    onChange={(e) =>
                                      handleTimeChange(
                                        day,
                                        "start",
                                        e.target.value,
                                      )
                                    }
                                    className="w-24"
                                  />
                                  <span>até</span>
                                  <Input
                                    type="time"
                                    value={availability[day]?.end}
                                    onChange={(e) =>
                                      handleTimeChange(
                                        day,
                                        "end",
                                        e.target.value,
                                      )
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
                            <Button>Salvar</Button>
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
      </div>
    </main>
  );
}
