import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/constants/categories";
import { useCreateService } from "@/context/use-create-service";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export function SelectCategories() {
  const { addCategory, categoriesSelected } = useCreateService();

  return (
    <main className="space-y-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Selecione uma ou mais categorias que melhor descrevem seu serviço:
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          if (category.name !== "início") {
            return (
              <Card
                key={category.name}
                className={cn(
                  "cursor-pointer transition-all",
                  categoriesSelected.includes(category.name)
                    ? "border-primary shadow-md"
                    : "hover:border-gray-300",
                )}
                onClick={() => addCategory(category.name)}
              >
                <CardContent className="flex items-start space-x-4 p-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground",
                      categoriesSelected.includes(category.name) &&
                        "bg-primary text-primary-foreground",
                    )}
                  >
                    <category.icon className="size-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold capitalize">
                        {category.name}
                      </h3>
                      <div
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full border-2 border-gray-300",
                          categoriesSelected.includes(category.name) &&
                            "border-primary bg-primary",
                        )}
                      >
                        <CheckIcon
                          className={cn(
                            "size-4 opacity-0",
                            categoriesSelected.includes(category.name) &&
                              "text-primary-foreground opacity-100",
                          )}
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </div>
    </main>
  );
}
