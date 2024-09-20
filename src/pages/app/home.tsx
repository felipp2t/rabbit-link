import { SectionCards } from "@/components/section-cards";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants/categories";

export function Home() {
  return (
    <main className="pl-8 flex flex-col gap-8">
      <span className="sr-only">Página principal</span>
      <div className="no-scrollbar overflow-x-auto p-4 shadow-sm xl:mt-16">
        <div className="container mx-auto">
          <div className="flex space-x-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center space-x-2 rounded-full px-4 py-2 text-gray-600 transition-all duration-200 ease-in-out hover:bg-primary hover:text-muted"
              >
                <category.icon />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <SectionCards title="Serviços da sua região" />
        <SectionCards title="Pessoas recomendadas da sua região - presencial" />
        <SectionCards title="Serviços da sua região" />
      </div>
    </main>
  );
}
