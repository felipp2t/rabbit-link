import { CepSchema } from "@/types/cep";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { cepValidation } from "@/types/cep";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

export interface SearchAddressByCepProps {
  show: boolean;
  handleSearchAddress: (data: CepSchema) => void;
}

export function SearchAddressByCep({
  handleSearchAddress,
  show = false,
}: SearchAddressByCepProps) {
  const form = useForm<CepSchema>({
    resolver: zodResolver(cepValidation),
  });

  return (
    <div className={cn("hidden", show && "block")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearchAddress)}>
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

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Buscando...</span>
                </>
              ) : (
                "Buscar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
