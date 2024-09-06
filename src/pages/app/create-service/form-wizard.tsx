import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateService } from "@/context/use-create-service";
import { cn } from "@/lib/utils";
import { ConfirmDetails } from "./confirm-details";
import { FillInServiceDetails } from "./fill-in-service-details";
import { SelectCategories } from "./select-categories";

async function handleSubmit() {}

export function FormWizard() {
  const { step, handleNext, handlePrevious, handleValidationToNextStep } =
    useCreateService();

  return (
    <div className="container mx-auto py-8">
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

            {step === 2 && <FillInServiceDetails />}

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
              <Button onClick={handleSubmit}>Publicar Serviço</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
