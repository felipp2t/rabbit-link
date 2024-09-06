import { CepSchema, cepValidation } from "@/types/cep";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { Form, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

interface AddZipCodeDialogProps {
  handleSearchCep: (data: CepSchema) => void;
  isClose?: boolean;
}

export function AddZipCodeDialog({
  handleSearchCep,
  isClose = false,
}: AddZipCodeDialogProps) {
  const form = useForm<CepSchema>({
    resolver: zodResolver(cepValidation),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearchCep)}>
        <Controller
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem className="grid gap-4 py-4">
              <div className="grid grid-cols-6 items-center gap-4">
                <FormLabel htmlFor="cep" className="text-right">
                  CEP
                </FormLabel>
                <PatternFormat
                  {...field}
                  id="cep"
                  format="#####-###"
                  customInput={Input}
                  className="col-span-5"
                />
              </div>
            </FormItem>
          )}
        />

        {isClose ? (
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Buscando..." : "Buscar"}
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Buscando..." : "Buscar"}
            </Button>
          </DialogFooter>
        )}
      </form>
    </Form>
  );
}
