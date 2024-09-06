import { Badge } from "@/components/ui/badge";
import { useCreateService } from "@/context/use-create-service";
import { Briefcase, Clock, MapPin } from "lucide-react";

export function ConfirmDetails() {
  const {
    categoriesSelected,
    title,
    price,
    description,
    location,
    workType,
    availability,
  } = useCreateService();

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
          {location}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tipo de Trabalho</h3>
        <p className="flex items-center">
          <Briefcase className="mr-2 h-4 w-4" />
          {workType!.toUpperCase()}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disponibilidade</h3>
        <p className="flex items-center">
          <div className="flex flex-col gap-2">
            {Object.entries(availability).map(([day, time]) => (
              <p key={day} className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {time
                  ? `${day}: ${time.start} - ${time.end}`
                  : `${day}: Indisponível`}
              </p>
            ))}
          </div>
        </p>
      </div>
    </div>
  );
}
