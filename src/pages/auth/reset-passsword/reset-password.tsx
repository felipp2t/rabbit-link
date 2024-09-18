import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleResetPassword } from "@/http/auth/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
  ResetPasswordSchema,
  resetPasswordValidation,
} from "./types/reset-password";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const { control, handleSubmit, formState } = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordValidation),
  });

  async function onSubmit(data: ResetPasswordSchema) {
    if (!email) return;

    handleResetPassword({
      email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
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

      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
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
          control={control}
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

        <Button disabled={formState.isSubmitting} className="w-full">
          {formState.isSubmitting ? "Confirmando..." : "Confirmar"}
        </Button>
      </form>
    </div>
  );
}
