import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { CepSchema, cepValidation } from "../../types/cep";

interface SearchAddressProps {
  handleSearchCep: (data: CepSchema) => void;
}

export function SearchAddress({ handleSearchCep }: SearchAddressProps) {
  const form = useForm<CepSchema>({
    resolver: zodResolver(cepValidation),
  });

  return (
    <Add
  );
}
