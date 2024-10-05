import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Replace } from "@/helpers/replace";
import { createAddress } from "@/http/address/create-address";
import { updateAddress } from "@/http/address/update-address";
import { cn } from "@/lib/utils";
import { AddressRequest } from "@/types/address/address-request";
import {
  AddressSchema,
  addressValidation,
} from "@/types/address/address-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ConfirmAddressProps {
  addressDetails: Replace<
    AddressRequest,
    { id?: string; type?: "HOUSE" | "APARTMENT" }
  >;
  show: boolean;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export const ConfirmAddress = React.memo(
  ({ addressDetails, show = false, setStep }: ConfirmAddressProps) => {
    const [isHouse, setIsHouse] = useState(addressDetails.type === "HOUSE");

    const form = useForm<AddressSchema>({
      defaultValues: {
        type: addressDetails.type ?? "HOUSE",
        address: {
          cep: addressDetails.address.cep,
          state: addressDetails.address.state,
          city: addressDetails.address.city,
          neighborhood: addressDetails.address.neighborhood,
          street: addressDetails.address.street,
          number: addressDetails.address.number,
        },
        apartmentName: addressDetails.apartmentName ?? "",
        apartmentNumber: addressDetails.apartmentNumber ?? 0,
      },
      resolver: zodResolver(addressValidation),
    });

    useEffect(() => {
      form.reset({
        type: addressDetails.type,
        address: {
          cep: addressDetails.address.cep,
          state: addressDetails.address.state,
          city: addressDetails.address.city,
          neighborhood: addressDetails.address.neighborhood,
          street: addressDetails.address.street,
          number: addressDetails.address.number,
        },
        apartmentName: addressDetails.apartmentName ?? "",
        apartmentNumber: addressDetails.apartmentNumber ?? 0,
      });
      setIsHouse(addressDetails.type === "HOUSE");
    }, [addressDetails, form]);

    const queryClient = useQueryClient();

    const { mutateAsync: createAddressMutation } = useMutation({
      mutationKey: ["create-address"],
      mutationFn: async (data: AddressSchema) => await createAddress(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-addresses"] });
      },
    });

    interface UpdateAddressMutation {
      address: AddressSchema;
      addressId: string;
    }

    const { mutateAsync: updateAddressMutation } = useMutation({
      mutationKey: ["update-address"],
      mutationFn: async ({ address, addressId }: UpdateAddressMutation) =>
        await updateAddress({ address, addressId }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-addresses"] });
      },
    });

    const handleCreateAddress = async (data: AddressSchema) =>
      await createAddressMutation(data);

    const handleUpdateAddress = async ({
      address,
      addressId,
    }: UpdateAddressMutation) =>
      await updateAddressMutation({ address, addressId });

    async function handleConfirmAddress(data: AddressSchema) {
      try {
        if (addressDetails.id) {
          await handleUpdateAddress({
            address: data,
            addressId: addressDetails.id,
          });
          setStep(1);
          return;
        }

        await handleCreateAddress(data);
        setStep(1);
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <div className={cn("hidden", show && "block")}>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleConfirmAddress)}
          >
            <div className="grid grid-cols-8 gap-x-4 gap-y-6">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="col-span-8">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="street">Rua</Label>
                      <FormControl>
                        <Input {...field} id="street" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.neighborhood"
                render={({ field }) => (
                  <FormItem className="col-span-4 col-start-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <FormControl>
                        <Input {...field} id="neighborhood" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="city">Cidade</Label>
                      <FormControl>
                        <Input {...field} id="city" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="state">Estado</Label>
                      <FormControl>
                        <Input {...field} id="state" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="number">Nº</Label>
                      <FormControl>
                        <Input {...field} id="number" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    className="col-span-8"
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsHouse(value === "HOUSE");
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HOUSE" id="HOUSE" />
                      <Label htmlFor="HOUSE">Casa</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="APARTMENT" id="APARTMENT" />
                      <Label htmlFor="APARTMENT">Apartamento</Label>
                    </div>
                    <FormMessage />
                  </RadioGroup>
                )}
              />

              <FormField
                control={form.control}
                name="apartmentName"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="apartmentName"
                        className={cn("", isHouse && "text-muted-foreground")}
                      >
                        Nome do Condomínio
                      </Label>
                      <FormControl>
                        <Input
                          id="apartmentName"
                          disabled={isHouse}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apartmentNumber"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="apartmentNumber"
                        className={cn("", isHouse && "text-muted-foreground")}
                      >
                        Nº
                      </Label>
                      <FormControl>
                        <Input
                          disabled={isHouse}
                          {...field}
                          id="apartmentNumber"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className={cn("text-gray-500")}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    <p>"Salvando..."</p>
                  </>
                ) : (
                  "Confirmar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    );
  },
);
