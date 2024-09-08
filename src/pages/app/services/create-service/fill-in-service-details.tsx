import { ServiceForm } from "@/components/service-form";
import { useServiceStore } from "@/context/use-service-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ServiceDetailsSchema,
  ServiceDetailsValidation,
} from "../_types/fill-in-service-details";

export function FillInServiceDetails() {
  const { service } = useServiceStore();

  const form = useForm<ServiceDetailsSchema>({
    resolver: zodResolver(ServiceDetailsValidation),
    mode: "onChange",
  });

  return (
    <main className="space-y-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Preencha as informações do seu serviço:
      </p>

      <div>
        <ServiceForm form={form} service={service} />
      </div>
    </main>
  );
}
