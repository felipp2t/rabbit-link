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
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleSignIn } from "@/http/auth/sign-in-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignInSchema, signInValidation } from "./types/sign-in";
import GoogleImage from "/google-icon.png";

export function SignIn() {
  const { handleSubmit, control, formState } = useForm<SignInSchema>({
    resolver: zodResolver(signInValidation),
  });

  async function onSubmit(data: SignInSchema) {
    handleSignIn({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Faça Login
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Faça login para acessar sua conta e gerenciar seus serviços.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
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
            control={control}
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

          <Link to="/auth/esqueceu-senha" className="block text-end text-sm">
            Esqueceu a senha?
          </Link>

          <Button disabled={formState.isSubmitting} className="w-full py-6">
            Entrar
          </Button>
        </form>
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
