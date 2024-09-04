import { Button } from "@/components/ui/button";
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
import {
  ResetPasswordSchema,
  resetPasswordValidation,
} from "./types/reset-password";
import { useSearchParams } from "react-router-dom";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordValidation),
  });

  async function handleResetPassword({
    password,
    confirmPassword,
  }: ResetPasswordSchema) {
    const BASIC_API_URL = import.meta.env.VITE_BACKEND_API_URL;

    try {
      await fetch(
        BASIC_API_URL + `/api/forgot-password/reset-password?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        },
      );

      location.href = "/auth";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex max-w-[400px] flex-col items-center gap-8 md:max-w-[500px]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Redefinir Senha
        </h1>
        <p className="text-sm text-muted-foreground">
          Crie uma nova senha para sua conta. Certifique-se de que a nova senha
          seja segura e fácil de lembrar. Confirme sua senha para concluir o
          processo e garantir que sua conta esteja protegida.
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={form.handleSubmit(handleResetPassword)}
        >
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="password">Senha</FormLabel>
                <FormControl>
                  <Input {...field} id="password" className="w-72" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="confirmPassword">
                  Confirme sua senha
                </FormLabel>
                <FormControl>
                  <Input {...field} id="confirmPassword" className="w-72" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? "Confirmando..." : "Confirmar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
