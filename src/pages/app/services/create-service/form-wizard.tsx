import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useServiceStore } from "@/context/use-service-store";
import { useUserStore } from "@/context/use-user-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ConfirmDetails } from "./confirm-details";
import { FillInServiceDetails } from "./fill-in-service-details";
import { SelectCategories } from "./select-categories";

export function FormWizard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    service: { title, description, location, price, categories },
    step,
    handleNext,
    handlePrevious,
    handleValidationToNextStep,
    setLocation,
  } = useServiceStore();

  const { user } = useUserStore();

  const locationSelected = user.addresses?.find((address) => address.selected);

  useEffect(() => {
    if (locationSelected) {
      setLocation({
        id: locationSelected.id,
        city: locationSelected.address.city,
        state: locationSelected.address.state,
      });
    }
  }, [locationSelected, setLocation]);

  const token = localStorage.getItem("token");

  async function handleSubmit() {
    try {
      setIsSubmitting(true);

      await fetch("https://a34e-201-76-2-12.ngrok-free.app/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          price: Number(price),
          categories,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto mt-36">
      <h1 className="mb-6 text-center text-3xl font-bold text-primary">
        Criar Novo Serviço
      </h1>
      <Card
        className={cn(
          "mx-auto max-w-7xl",
          step === 2 && "max-w-2xl",
          step === 3 && "max-w-2xl",
        )}
      >
        <CardHeader>
          <CardTitle>
            {step === 1 && "Etapa 1: Escolha as Categorias do Seu Serviço"}
            {step === 2 && "Etapa 2: Informações do Serviço"}
            {step === 3 && "Etapa 3: Revisar e Publicar"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && <SelectCategories />}

            {step === 2 && <FillInServiceDetails onlySearch />}

            {step === 3 && <ConfirmDetails />}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline">
              Voltar
            </Button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <Button
                disabled={handleValidationToNextStep()}
                onClick={handleNext}
              >
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                Publicar Serviço
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
