import { ServiceForm } from "@/components/service-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServiceStore } from "@/context/use-service-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ServiceDetailsSchema,
  ServiceDetailsValidation,
} from "./types/fill-in-service-details";

interface FillInServiceDetailsProps {
  onlySearch?: boolean;
}

export function FillInServiceDetails({
  onlySearch = false,
}: FillInServiceDetailsProps) {
  const {
    setTitle,
    setDescription,
    setLocation,
    setWorkType,
    setDeadline,
    setMinimumPrice,
    setMaximunPrice,
    service,
    setStep,
  } = useServiceStore();

  const form = useForm<ServiceDetailsSchema>({
    defaultValues: service,
    resolver: zodResolver(ServiceDetailsValidation),
  });

  async function handleOnSubmit(data: ServiceDetailsSchema) {
    console.log(data);
    setTitle(data.title);
    setDescription(data.description);
    setLocation({
      id: data.location.id,
      city: data.location.city,
      state: data.location.state,
    });
    setWorkType(data.workType);
    setDeadline(data.deadline.split("T")[0]);
    setMinimumPrice(data.price.minimum);
    setMaximunPrice(data.price.maximum);

    if (await form.trigger()) {
      setStep(3);
    }
  }



  return (
    <>
      <CardHeader>
        <CardTitle>Etapa 2: Informações do Serviço</CardTitle>
      </CardHeader>
      <CardContent>
        <main className="space-y-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Preencha as informações do seu serviço:
          </p>

          <div>
            <ServiceForm
              form={form}
              service={service}
              onlySearch={onlySearch}
              handleOnSubmit={handleOnSubmit}
            />
          </div>
        </main>
      </CardContent>
    </>
  );
}
