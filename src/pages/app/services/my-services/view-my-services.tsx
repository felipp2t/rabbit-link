import { ServiceForm } from "@/components/service-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useServiceStore } from "@/context/use-service-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Clock, MapPin, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Service } from "../../../../types/service";
import {
  ServiceDetailsSchema,
  ServiceDetailsValidation,
} from "../_types/fill-in-service-details";

export function ViewMyServices() {
  const { selectServiceById } = useServiceStore();

  const form = useForm<ServiceDetailsSchema>({
    resolver: zodResolver(ServiceDetailsValidation),
  });

  function handleSearchService(id: string) {
    const serviceFound: Service | null = selectServiceById(id);

    if (serviceFound) {
      form.reset({
        title: serviceFound.title,
        location: `${serviceFound.location.city}, ${serviceFound.location.state}`,
        availability: serviceFound.availability,
        description: serviceFound.description,
        price: serviceFound.price,
        workType: serviceFound.workType,
      });
    }
  }

  async function handleServiceDelete(title: string) {
    console.log(title);
  }

  const services: Service[] = [
    {
      id: "52822843-b273-50b1-868f-17e476df0800",
      title: "Limpeza",
      description: "Serviço de limpeza de casa",
      price: "100",
      location: {
        id: "ca1c92eb-713b-5c26-a27a-a84b0accff790",
        city: "São Paulo",
        state: "SP",
      },
      availability: {
        segunda: { start: "09:00", end: "17:00" },
      },
      workType: "REMOTO",
      categories: ["limpeza", "Doméstico"],
    },
    {
      id: "42fd0b0b-9d61-5c1b-aad8-856327c020a8",
      title: "Limpeza",
      description: "Serviço de limpeza de casa",
      price: "100",
      location: {
        id: "463cabd1-5f06-50a7-adfc-2bf93dad25cc",
        city: "Rio de Janeiro",
        state: "RJ",
      },
      availability: {
        segunda: { start: "09:00", end: "17:00" },
      },
      workType: "HÍBRIDO",
      categories: ["limpeza", "Doméstico"],
    },

    {
      id: "d922d97f-2a26-570d-a96c-ca4a51a72d5b",
      title: "Limpeza",
      description: "Serviço de limpeza de casa",
      price: "100",
      location: {
        id: "ef1c1f97-bb0c-5e58-9f07-292924d094aa",
        city: "Minas Gerais",
        state: "MG",
      },
      availability: {
        segunda: { start: "09:00", end: "17:00" },
      },
      workType: "PRESENCIAL",
      categories: ["limpeza", "Doméstico"],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meus Serviços Cadastrados</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Serviço
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge>Em andamento</Badge>

              <div className="flex flex-wrap gap-2">
                {service.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <p className="text-2xl font-bold">
                R$ {Number(service.price).toFixed(2)}
              </p>

              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {service.location.city}, {service.location.state}
              </p>

              <p className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                {service.workType!.toUpperCase()}
              </p>

              <p className="flex items-center">
                <div className="flex flex-col gap-2">
                  {Object.entries(service.availability).map(([day, time]) => (
                    <p
                      key={day}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time
                        ? `${day}: ${time.start} - ${time.end}`
                        : `${day}: Indisponível`}
                    </p>
                  ))}
                </div>
              </p>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => handleSearchService(service.id)}
                    variant="outline"
                  >
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edite seu serviço aqui</DialogTitle>
                  </DialogHeader>
                  <ServiceForm service={service} form={form} />
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Excluir</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir esse serviço?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não poderá ser desfeita. Isso deletará
                      permanentemente o serviço dos dados do nosso serviço.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleServiceDelete(service.title)}
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
