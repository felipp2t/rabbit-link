import { SectionCards } from "@/components/section-cards";

export function Home() {
  return (
    <main>
      <span className="sr-only">Página principal</span>
      <SectionCards title="Serviços da sua região" />
      <SectionCards title="Pessoas recomendadas da sua região - presencial" />
      <SectionCards title="Serviços da sua região" />
    </main>
  );
}
