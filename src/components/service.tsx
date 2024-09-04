import { ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

export function Service() {
  return (
    <Card className="flex h-96 w-64 flex-shrink-0 select-none flex-col md:h-[410px] md:w-72">
      <CardHeader className="p-0">
        <img
          className="rounded-t-lg"
          src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
          alt="imagem_header"
        />
      </CardHeader>
      <CardContent className="flex h-full flex-grow flex-col justify-between rounded-b-lg pb-4 pt-2">
        <h4 className="py-2 text-muted-foreground">Felipe Rossetto</h4>

        <Separator />

        <p className="my-2 line-clamp-4 text-sm md:line-clamp-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          distinctio sint enim doloribus animi iure qui nisi necessitatibus
          quisquam ex? af dsf sd fsd f ds fds sdfa
        </p>

        <div className="flex justify-between">
          <div className="flex items-center gap-2 py-2">
            <Star className="size-6 text-primary" />
            <span className="text-muted-foreground">5.0</span>
          </div>
          <Button
            variant="ghost"
            className="flex w-36 gap-2 font-semibold transition-all duration-200 ease-out hover:translate-x-2 md:w-40"
          >
            Ver mais
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
