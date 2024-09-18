import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleSendEmail } from "@/http/auth/send-email";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SendEmailSchema, sendEmailValidator } from "./types/send-email";

export function SendEmail() {
  const form = useForm<SendEmailSchema>({
    defaultValues: { email: "" },
    resolver: zodResolver(sendEmailValidator),
  });

  async function onSubmit(data: SendEmailSchema) {
    handleSendEmail({
      email: data.email,
    });
  }

  return (
    <div className="flex max-w-[400px] flex-col items-center gap-8 md:max-w-[500px]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Recuperação de Senha
        </h1>
        <p className="text-sm text-muted-foreground">
          Insira seu endereço de e-mail para receber um link de recuperação de
          senha. Verifique sua caixa de entrada e siga as instruções para
          redefinir sua senha e acessar sua conta novamente.
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" className="w-72" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
