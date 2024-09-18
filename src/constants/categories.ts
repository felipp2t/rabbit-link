import { v4 as uuidv4 } from "uuid";

import {
  BadgeDollarSign,
  Bolt,
  BookOpen,
  Briefcase,
  Brush,
  Calculator,
  Camera,
  Dumbbell,
  Gavel,
  HardHat,
  Heart,
  Home,
  LampFloor,
  Languages,
  LucideProps,
  Megaphone,
  Monitor,
  Music,
  Scissors,
  Scroll,
  Shirt,
  Truck,
  User,
  Utensils,
  Wrench,
} from "lucide-react";
import React from "react";

type Category = {
  id: string;
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export const categories: Category[] = [
  {
    id: uuidv4(),
    name: "início",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.",
    icon: Home,
  },
  {
    id: uuidv4(),
    name: "domésticos",
    description:
      "Serviços relacionados a cuidados e manutenções em casa, como limpeza e organização.",
    icon: LampFloor,
  },
  {
    id: uuidv4(),
    name: "elétrico",
    description:
      "Serviços de instalação e manutenção elétrica para residências e empresas.",
    icon: Bolt,
  },
  {
    id: uuidv4(),
    name: "manutenção",
    description:
      "Serviços gerais de reparo e manutenção em diversos tipos de imóveis.",
    icon: Wrench,
  },
  {
    id: uuidv4(),
    name: "administração",
    description:
      "Serviços administrativos, como gestão de projetos e suporte ao cliente.",
    icon: Briefcase,
  },
  {
    id: uuidv4(),
    name: "consultoria",
    description:
      "Consultoria em diversas áreas para ajudar a melhorar processos e estratégias.",
    icon: User,
  },
  {
    id: uuidv4(),
    name: "contabilidade",
    description:
      "Serviços contábeis para gestão financeira, planejamento fiscal e mais.",
    icon: Calculator,
  },
  {
    id: uuidv4(),
    name: "design",
    description:
      "Serviços de design gráfico, web design, criação de logotipos e muito mais.",
    icon: Brush,
  },
  {
    id: uuidv4(),
    name: "engenharia",
    description:
      "Serviços de engenharia civil, mecânica, elétrica e outros ramos da engenharia.",
    icon: HardHat,
  },
  {
    id: uuidv4(),
    name: "jurídico",
    description:
      "Serviços legais, como consultoria jurídica e representação em processos.",
    icon: Gavel,
  },
  {
    id: uuidv4(),
    name: "marketing",
    description:
      "Serviços de marketing digital, criação de campanhas publicitárias e branding.",
    icon: Megaphone,
  },
  {
    id: uuidv4(),
    name: "saúde",
    description:
      "Serviços de cuidados com a saúde, como atendimento médico, fisioterapia e mais.",
    icon: Heart,
  },
  {
    id: uuidv4(),
    name: "tecnologia",
    description:
      "Serviços de TI, desenvolvimento de software, suporte técnico e mais.",
    icon: Monitor,
  },
  {
    id: uuidv4(),
    name: "transporte",
    description:
      "Serviços de transporte e logística, incluindo entregas e mudanças.",
    icon: Truck,
  },
  {
    id: uuidv4(),
    name: "vendas",
    description:
      "Serviços relacionados a vendas, desde vendedores a representantes comerciais.",
    icon: BadgeDollarSign,
  },
  {
    id: uuidv4(),
    name: "fotografia",
    description:
      "Serviços de fotografia para eventos, retratos, produtos e mais.",
    icon: Camera,
  },
  {
    id: uuidv4(),
    name: "música",
    description:
      "Serviços musicais, como aulas de instrumentos, produção musical e mais.",
    icon: Music,
  },
  {
    id: uuidv4(),
    name: "educação",
    description:
      "Serviços educacionais, como tutoria, ensino e formação acadêmica.",
    icon: BookOpen,
  },
  {
    id: uuidv4(),
    name: "idiomas",
    description: "Serviços de ensino de idiomas, tradução e interpretação.",
    icon: Languages,
  },
  {
    id: uuidv4(),
    name: "esportes",
    description:
      "Serviços relacionados a esportes, como treinamentos, personal trainers e mais.",
    icon: Dumbbell,
  },
  {
    id: uuidv4(),
    name: "culinária",
    description:
      "Serviços culinários, como chefs particulares, aulas de culinária e mais.",
    icon: Utensils,
  },
  {
    id: uuidv4(),
    name: "beleza",
    description:
      "Serviços de beleza, como cabeleireiros, maquiadores e estética em geral.",
    icon: Scissors,
  },
  {
    id: uuidv4(),
    name: "moda",
    description:
      "Serviços de moda, como consultoria de estilo, design de roupas e mais.",
    icon: Shirt,
  },
  {
    id: uuidv4(),
    name: "artesanato",
    description:
      "Serviços de artesanato, incluindo criação de itens personalizados e decoração.",
    icon: Scroll,
  },
];
