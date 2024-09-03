import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface ConfirmAddressProps {
  location: {
    cep: string;
    city: string;
    neighborhood: string;
    service: string;
    state: string;
    street: string;
  };
}

export function ConfirmAddress({ location }: ConfirmAddressProps) {
  const [isHouse, setIsHouse] = useState(true);

  const addressValidation = z.object({
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.string(),
    condominium: z
      .object({
        name: z.string(),
        number: z.string(),
      })
      .optional(),
  });

  type addressSchema = z.infer<typeof addressValidation>;

  const form = useForm<addressSchema>({
    defaultValues: {
      state: location.state,
      city: location.city,
      neighborhood: location.neighborhood,
      street: location.street,
      number: "",
      condominium: {
        name: "",
        number: "",
      },
    },
    resolver: zodResolver(addressValidation),
  });

  async function handleConfirmAddress(data: addressSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-8 items-center gap-x-4 gap-y-6"
        onSubmit={form.handleSubmit(handleConfirmAddress)}
      >
        <Controller
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="state" className="">
                  Estado
                </Label>
                <Input {...field} id="state" />
              </div>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem className="col-span-4 col-start-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="neighborhood" className="">
                  Bairro
                </Label>
                <Input {...field} id="neighborhood" />
              </div>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="city" className="">
                  Cidade
                </Label>
                <Input {...field} id="city" />
              </div>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className="col-span-5">
              <div className="flex items-center gap-2">
                <Label htmlFor="street" className="">
                  Rua
                </Label>
                <Input {...field} id="street" />
              </div>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="number" className="">
                  Nº
                </Label>
                <Input {...field} id="number" />
              </div>
            </FormItem>
          )}
        />

        <RadioGroup
          defaultValue="house"
          className="col-span-8"
          onValueChange={(value) => setIsHouse(value === "house")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="house" id="house" />
            <Label htmlFor="house">Casa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="condominium" id="condominium" />
            <Label htmlFor="condominium">Condomínio</Label>
          </div>
        </RadioGroup>

        <Controller
          control={form.control}
          name="condominium.name"
          render={({ field }) => (
            <FormItem className="col-span-5">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="condominium.name"
                  className={cn("", isHouse && "text-muted-foreground")}
                >
                  Nome do Condomínio
                </Label>
                <Input disabled={isHouse} {...field} id="condominium.name" />
              </div>
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="condominium.number"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="condominium.number"
                  className={cn("", isHouse && "text-muted-foreground")}
                >
                  Nº
                </Label>
                <Input disabled={isHouse} {...field} id="condominium.number" />
              </div>
            </FormItem>
          )}
        />
      </form>

      <DialogFooter>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Salvando..." : "Confirmar"}
        </Button>
      </DialogFooter>
    </Form>
  );
}
