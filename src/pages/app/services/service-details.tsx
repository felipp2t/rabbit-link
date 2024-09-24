import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  DollarSign,
  MapPin,
  MessageCircle,
} from "lucide-react";

import ProfileAvatar from "/imagem-perfil.jpg";

export function ServiceDetails() {
  return (
    <div className="container mx-auto mt-28 px-4 pb-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                Desenvolvimento de Site E-commerce
              </CardTitle>
              <p className="mt-2 text-muted-foreground">
                Preciso de um site de vendas para minha loja de roupas
              </p>
            </div>
            <Badge variant="secondary" className="px-3 py-1 text-lg">
              Remoto
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative h-32 w-32 overflow-hidden rounded-full">
              <img src={ProfileAvatar} alt="cliente" className="size-32" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold">Felipe Rossetto</h3>
              <p className="text-muted-foreground line-clamp-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
                quae doloribus inventore iusto exercitationem assumenda maxime
                voluptatum et quasi molestias?
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  alert("Funcionalidade de chat a ser implementada")
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Conversar com o Cliente
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-xl font-semibold">R$ 5.000 - R$ 8.000</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>São Paulo, SP (Trabalho Remoto)</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Prazo: 2 meses</span>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-semibold">Detalhes do Projeto:</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>Design responsivo para desktop e mobile</li>
              <li>Integração com sistema de pagamento</li>
              <li>Catálogo de produtos com filtros de busca</li>
              <li>Área de administração para gerenciar pedidos e estoque</li>
              <li>
                SEO otimizado para melhor visibilidade nos mecanismos de busca
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Publicado em: 15 de junho de 2023
          </p>
          <Button
            size="lg"
            onClick={() =>
              alert("Funcionalidade de candidatura a ser implementada")
            }
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Candidatar-se ao Projeto
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
