import { ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

export function ServiceCard() {
  return (
    <Card className="mx-auto flex h-80 w-72 md:w-80 xl:w-full max-w-md shrink-0 flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-12 md:size-14 xl:size-16">
          <AvatarImage
            alt="User profile"
            src="/placeholder.svg?height=64&width=64"
          />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h2 className="text-base md:text-lg xl:text-xl font-bold">User Name</h2>
          <p className="text-sm text-muted-foreground">Professional Title</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quia dolores explicabo omnis sint facere laboriosam facilis hic eum
          minus?
        </p>
        <div className="flex items-center gap-0.5">
          <Star className="size-4 xl:size-5 fill-yellow-400 text-yellow-400" />
          <Star className="size-4 xl:size-5 fill-yellow-400 text-yellow-400" />
          <Star className="size-4 xl:size-5 fill-yellow-400 text-yellow-400" />
          <Star className="size-4 xl:size-5 fill-yellow-400 text-yellow-400" />
          <Star className="size-4 xl:size-5  text-yellow-400" />
          <span className="ml-2 text-sm font-medium">4.0</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" asChild>
          <Link to="/servico/123">Ver mais</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
