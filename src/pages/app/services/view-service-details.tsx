import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClockIcon,
  DollarSignIcon,
  MapPinIcon,
  MessageCircleIcon,
  StarIcon,
} from "lucide-react";
import ImagemPerfil from "/imagem-perfil.jpg";

export function Service() {
  const servico = {
    titulo: "Serviço de Faxina Residencial",
    descricao:
      "Ofereço serviço de limpeza completa para residências. Atendo a todos os cômodos, incluindo limpeza de janelas, aspiração, lavagem de pisos e banheiros.",
    preco: 120,
    localizacao: "São Paulo, SP",
    disponibilidade: "Segunda a Sábado, 8h às 17h",
    prestador: {
      nome: "Felipe Rossetto",
      avaliacao: 4.8,
      totalAvaliacoes: 56,
      educação: {
        instituition: "Universidade de São Paulo (USP)",
        course: "Graduação em Administração",
        degree: "Bacharel",
        data_inicio: "2010",
        data_fim: "2014",
      },
    },
    avaliacoes: [
      {
        usuario: "João P.",
        comentario: "Excelente serviço! Minha casa ficou impecável.",
        nota: 5,
      },
      {
        usuario: "Ana R.",
        comentario: "Muito profissional e pontual. Recomendo!",
        nota: 5,
      },
      {
        usuario: "Carlos M.",
        comentario:
          "Bom serviço, mas poderia ter sido mais atenciosa em alguns detalhes.",
        nota: 4,
      },
    ],
  };

  return (
    <main className="container mx-auto px-8 pb-8 mt-36">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-primary">
            {servico.titulo}
          </h1>
          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-muted-foreground">{servico.descricao}</p>
              <div className="mb-2 flex items-center">
                <MapPinIcon className="mr-2 h-5 w-5 text-gray-500" />
                <span>{servico.localizacao}</span>
              </div>
              <div className="mb-2 flex items-center">
                <ClockIcon className="mr-2 h-5 w-5 text-gray-500" />
                <span>{servico.disponibilidade}</span>
              </div>
              <div className="flex items-center">
                <DollarSignIcon className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-xl font-bold">
                  R$ {servico.preco.toFixed(2).replace(".", ",")}/hora
                </span>
              </div>
            </CardContent>
          </Card>

          <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight">
            Avaliações
          </h2>
          {servico.avaliacoes.map((avaliacao, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 font-bold">{avaliacao.usuario}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < avaliacao.nota
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{avaliacao.comentario}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-bold tracking-tight">
              Sobre o Prestador
            </h2>
            <div className="mb-4 flex flex-col gap-2">
              <img
                src={ImagemPerfil}
                alt={servico.prestador.nome}
                className="mr-4 h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="font-bold">{servico.prestador.nome}</h3>
                <div className="flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 text-yellow-400" />
                  <span>{servico.prestador.avaliacao.toFixed(1)}</span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({servico.prestador.totalAvaliacoes} avaliações)
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {servico.descricao}
              </p>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-lg font-bold">Educação</h2>
              <div>
                <p className="text-muted-foreground">
                  {servico.prestador.educação.course} |{" "}
                  {servico.prestador.educação.data_inicio} - {"   "}
                  {servico.prestador.educação.data_fim}
                </p>
                <p className="text-muted-foreground">
                  {servico.prestador.educação.instituition}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  {servico.prestador.educação.course} |{" "}
                  {servico.prestador.educação.data_inicio} - {"   "}
                  {servico.prestador.educação.data_fim}
                </p>
                <p className="text-muted-foreground">
                  {servico.prestador.educação.instituition}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  {servico.prestador.educação.course} |{" "}
                  {servico.prestador.educação.data_inicio} - {"   "}
                  {servico.prestador.educação.data_fim}
                </p>
                <p className="text-muted-foreground">
                  {servico.prestador.educação.instituition}
                </p>
              </div>
            </div>

            <Button className="mt-4 w-full">
              <MessageCircleIcon className="mr-2 h-4 w-4" />
              Contatar Prestador
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
