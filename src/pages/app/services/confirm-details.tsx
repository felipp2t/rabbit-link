import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { workTypeMap } from "@/constants/map-work-type";
import { useServiceStore } from "@/context/use-service-store";
import { createService } from "@/http/service/create-service";
import { differenceInDaysFromToday } from "@/utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlignLeft,
  Banknote,
  BookType,
  Briefcase,
  Clock,
  LayoutDashboard,
  MapPin,
} from "lucide-react";

export function ConfirmDetails() {
  const { handlePrevious, service } = useServiceStore();

  const queryClient = useQueryClient();

  const { mutateAsync: createServiceMutation } = useMutation({
    mutationKey: ["create-service"],
    mutationFn: async () => await createService({ service }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-my-services"] }),
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  async function handleCreateService() {
    try {
      await createServiceMutation();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold">
              <LayoutDashboard className="mr-2 size-4" />
              Categorias
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.categories.map((category, index) => (
                <Badge key={index}>{category.name}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center text-lg font-semibold">
              <BookType className="mr-2 size-4" />
              Título
            </h3>
            <p className="text-sm">{service.title}</p>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center text-lg font-semibold">
              <Banknote className="mr-2 size-4" />
              Preço
            </h3>
            {service.price.minimum === service.price.maximum ? (
              <p className="text-sm">
                {formatCurrency(Number(service.price.minimum))}
              </p>
            ) : (
              <p className="text-sm">
                {formatCurrency(Number(service.price.minimum))} até{" "}
                {formatCurrency(Number(service.price.maximum))}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center text-lg font-semibold">
              <AlignLeft className="mr-2 size-4" />
              Descrição
            </h3>
            <p className="text-sm">{service.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center text-lg font-semibold">
              <MapPin className="mr-2 size-4" />
              Localização
            </h3>
            <p className="text-sm">
              {service.location.city}, {service.location.state}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center text-lg font-semibold">
              <Briefcase className="mr-2 size-4" />
              Tipo de Trabalho
            </h3>
            <p className="text-sm">{workTypeMap[service.workType]}</p>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center text-lg font-semibold">
              <Clock className="mr-2 size-4" />
              Prazo de Candidatura
            </h3>
            <p className="text-sm">
              {Number(service.deadline) > 1 ? (
                <span>{service.deadline} dias</span>
              ) : (
                <span>{differenceInDaysFromToday(service.deadline)} dia(s)</span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} variant="outline">
          Voltar
        </Button>

        <Button onClick={handleCreateService}>Publicar Serviço</Button>
      </CardFooter>
    </>
  );
}
