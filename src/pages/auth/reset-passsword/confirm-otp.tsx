import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { confirmOTPSchema, confirmOTPValidation } from "./types/cofirm-otp";

export function ConfirmOTP() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useForm<confirmOTPSchema>({
    defaultValues: { otp: "" },
    resolver: zodResolver(confirmOTPValidation),
  });

  async function handleConfirmOtp({ otp }: confirmOTPSchema) {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

    try {
      await fetch(apiUrl + `/api/forgot-password/verify-otp?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      });

      location.href = `/auth/reset-password?email=${email}`;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex max-w-[400px] flex-col items-center gap-8 md:max-w-[500px]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Confirme sua senha
        </h1>
        <p className="text-sm text-muted-foreground">
          Enviamos um código de uso único para o seu e-mail
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col items-center gap-8"
          onSubmit={form.handleSubmit(handleConfirmOtp)}
        >
          <Controller
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
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
