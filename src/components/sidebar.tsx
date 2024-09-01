import { CalendarPlus, Home, Layers, Rabbit, Search } from "lucide-react";
import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <Navigation.Root className="">
      <Navigation.Header>
        <Navigation.Logo>
          <Rabbit className="size-6" />
        </Navigation.Logo>
      </Navigation.Header>
      <Navigation.Main>
        <Navigation.Nav>
          <Navigation.NavHeader>
            <Navigation.NavHeaderTitle>Navegação</Navigation.NavHeaderTitle>
          </Navigation.NavHeader>
          <Navigation.NavMain>
            <Navigation.NavLink to="/">
              <Home className="size-4" />
              <Navigation.NavLinkTitle>Início</Navigation.NavLinkTitle>
            </Navigation.NavLink>

            <Navigation.NavLink to="/procurar">
              <Search className="size-4" />
              <Navigation.NavLinkTitle>Procurar</Navigation.NavLinkTitle>
            </Navigation.NavLink>

            <Navigation.NavLink to="/servicos">
              <Layers className="size-4" />
              <Navigation.NavLinkTitle>Serviços</Navigation.NavLinkTitle>
            </Navigation.NavLink>

            <Navigation.NavLink to="/criar-servico">
              <CalendarPlus className="size-4" />
              <Navigation.NavLinkTitle>Criar serviço</Navigation.NavLinkTitle>
            </Navigation.NavLink>
          </Navigation.NavMain>
        </Navigation.Nav>
      </Navigation.Main>
    </Navigation.Root>
  );
}
