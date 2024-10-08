import { Card } from "@/components/ui/card";
import { useServiceStore } from "@/context/use-service-store";
import { cn } from "@/lib/utils";
import { ConfirmDetails } from "./confirm-details";
import { FillInServiceDetails } from "./fill-in-service-details";
import { SelectCategories } from "./select-categories";

export function FormWizard() {
  const token = localStorage.getItem("token");

  if (!token) {
    location.href = "/auth";
  }

  const { step } = useServiceStore();

  return (
    <div className="container mx-auto mt-36">
      <h1 className="mb-6 text-center text-3xl font-bold text-primary">
        Criar Novo Serviço
      </h1>
      <Card
        className={cn(
          "mx-auto",
          step === 1 && "max-w-5xl",
          (step === 2 || step === 3) && "max-w-2xl",
        )}
      >
        {step === 1 && <SelectCategories />}
        {step === 2 && <FillInServiceDetails onlySearch />}
        {step === 3 && <ConfirmDetails />}
      </Card>
    </div>
  );
}
