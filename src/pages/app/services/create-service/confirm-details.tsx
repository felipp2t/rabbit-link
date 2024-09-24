import { Badge } from "@/components/ui/badge";
import { useServiceStore } from "@/context/use-service-store";
import { Briefcase, MapPin } from "lucide-react";

export function ConfirmDetails() {
  const {
    categoriesSelected,
    service: { title, price, description, location, workType },
  } = useServiceStore();

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {categoriesSelected.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Título</h3>
        <p>{title}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Preço</h3>
        <p>R$ {Number(price).toFixed(2)}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Descrição</h3>
        <p>{description}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Localização</h3>
        <p className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          {location.city}, {location.state}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tipo de Trabalho</h3>
        <p className="flex items-center">
          <Briefcase className="mr-2 h-4 w-4" />
          {workType!.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
