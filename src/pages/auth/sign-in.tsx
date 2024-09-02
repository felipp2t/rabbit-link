import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignInSchema, signInValidation } from "./types/sign-in";
import GoogleImage from "/google-icon.png";

export function SignIn() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInValidation),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Login
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Faça login para acessar sua conta e gerenciar seus serviços.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <Form {...form}>
          <form className="space-y-4">
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input {...field} id="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input {...field} id="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-6 w-full py-6">Entrar</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant="outline"
          className="flex w-full items-center gap-4 px-4 py-6"
        >
          <Link
            to={
              import.meta.env.VITE_BACK_API_URL + "/oauth2/authorization/google"
            }
          >
            <img src={GoogleImage} alt="google-image" />
            Entrar com o google
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
