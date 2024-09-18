import { useUserStore } from "@/context/use-user-store";
import {
  ArrowLeftFromLine,
  CircleUserRound,
  SlidersHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function UserDropdown() {
  const { user } = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative flex h-8 w-full items-center justify-between space-x-2 !px-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              {user.profilePicture
                ? user.profilePicture
                : user.name.substring(0, 1)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-1 flex-col space-y-1 text-left">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="font-semibold">
            <CircleUserRound className="mr-2 size-4 text-neutral-800" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">
            <SlidersHorizontal className="mr-2 size-4 text-neutral-800" />
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold">
          <ArrowLeftFromLine className="mr-2 size-4 text-neutral-800" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
