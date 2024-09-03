import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { CepSchema, cepValidation } from "./types/cep";

interface SearchAddressProps {
  handleSearchCep: (data: CepSchema) => void;
}

export function SearchAddress({ handleSearchCep }: SearchAddressProps) {
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
                <Label htmlFor="cep" className="text-right">
                  CEP
                </Label>
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

        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Buscando..." : "Buscar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
