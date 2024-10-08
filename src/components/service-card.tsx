import { Service } from "@/types/service/service-response";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface ServiceCardProps {
  service: Service;
  userAvatar: string;
  userName: string;
}

export function ServiceCard({
  service,
  userAvatar,
  userName,
}: ServiceCardProps) {
  return (
    <Card className="mx-auto flex h-80 w-72 max-w-md shrink-0 flex-col md:w-80 xl:w-96">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-12 md:size-14 xl:size-16">
          <AvatarImage alt="User profile" src={userAvatar} />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>

        <h2 className="text-base font-bold md:text-lg xl:text-xl">
          {userName}
        </h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {service.description}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" asChild>
          <Link to={`servicos/${service.id}`}>Ver mais</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
