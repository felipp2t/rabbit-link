import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export interface ConfirmAddressProps {
  location: {
    cep: string;
    city: string;
    neighborhood: string;
    state: string;
    street: string;
  };
  show: boolean;
}

export function ConfirmAddress({
  location,
  show = false,
}: ConfirmAddressProps) {
  const [isHouse, setIsHouse] = useState(true);

  const addressValidation = z.object({
    type: z.enum(["CASA", "APARTAMENTO"]),
    address: z.object({
      cep: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      street: z.string(),
      number: z.coerce.number(),
      apartamentName: z.string().optional(),
      apartamentNumber: z.coerce.number().optional(),
    }),
  });

  type AddressSchema = z.infer<typeof addressValidation>;

  const form = useForm<AddressSchema>({
    defaultValues: {
      type: "CASA",
      address: {
        cep: location.cep,
        state: location.state,
        city: location.city,
        neighborhood: location.neighborhood,
        street: location.street,
        number: Number(),
        apartamentName: undefined,
        apartamentNumber: undefined,
      },
    },
    resolver: zodResolver(addressValidation),
  });

  useEffect(() => {
    form.reset({
      type: "CASA",
      address: {
        cep: location.cep,
        state: location.state,
        city: location.city,
        neighborhood: location.neighborhood,
        street: location.street,
        number: Number(),
        apartamentName: undefined,
        apartamentNumber: undefined,
      },
    });
  }, [location, form]);

  function handleConfirmAddress(data: AddressSchema) {
    console.log(data);
  }

  return (
    <div className={cn("hidden", show && "block")}>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleConfirmAddress)}
        >
          <div className="grid grid-cols-8 gap-x-4 gap-y-6">
            <Controller
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="state" className="">
                      Estado
                    </Label>
                    <Input {...field} id="state" />
                  </div>
                  {form.formState.errors.address?.state && (
                    <span>{form.formState.errors.address.state.message}</span>
                  )}
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="address.neighborhood"
              render={({ field }) => (
                <FormItem className="col-span-4 col-start-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input {...field} id="neighborhood" />
                  </div>
                  {form.formState.errors.address?.neighborhood && (
                    <span>
                      {form.formState.errors.address.neighborhood.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="city" className="">
                      Cidade
                    </Label>
                    <Input {...field} id="city" />
                  </div>
                  {form.formState.errors.address?.city && (
                    <span>{form.formState.errors.address.city.message}</span>
                  )}
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem className="col-span-5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="street" className="">
                      Rua
                    </Label>
                    <Input {...field} id="street" />
                  </div>
                  {form.formState.errors.address?.street && (
                    <span>{form.formState.errors.address.street.message}</span>
                  )}
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="number" className="">
                      Nº
                    </Label>
                    <Input {...field} id="number" />
                  </div>
                  {form.formState.errors.address?.number && (
                    <span>{form.formState.errors.address.number.message}</span>
                  )}
                </FormItem>
              )}
            />

            <RadioGroup
              defaultValue="CASA"
              className="col-span-8"
              onValueChange={(value) => setIsHouse(value === "CASA")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CASA" id="casa" />
                <Label htmlFor="casa">Casa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="APARTAMENTO" id="apartamento" />
                <Label htmlFor="apartamento">Condomínio</Label>
              </div>
              {form.formState.errors.type && (
                <span>{form.formState.errors.type.message}</span>
              )}
            </RadioGroup>

            <Controller
              control={form.control}
              name="address.apartamentName"
              render={({ field }) => (
                <FormItem className="col-span-5">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="address.apartamentName"
                      className={cn("", isHouse && "text-muted-foreground")}
                    >
                      Nome do Condomínio
                    </Label>
                    <Input
                      disabled={isHouse}
                      {...field}
                      id="address.apartamentName"
                    />
                  </div>
                  {form.formState.errors.address?.apartamentName && (
                    <span>
                      {form.formState.errors.address.apartamentName.message}
                    </span>
                  )}
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="address.apartamentNumber"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="address.apartamentNumber"
                      className={cn("", isHouse && "text-muted-foreground")}
                    >
                      Nº
                    </Label>
                    <Input
                      disabled={isHouse}
                      {...field}
                      id="address.apartamentNumber"
                    />
                  </div>
                  {form.formState.errors.address?.apartamentNumber && (
                    <span>
                      {form.formState.errors.address.apartamentNumber.message}
                    </span>
                  )}
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Salvando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
