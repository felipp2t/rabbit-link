import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ChangeEvent } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { SignUpSchema, signUpValidation } from "./types/sign-up";

export function SignUp() {
  const form = useForm<SignUpSchema>({
    defaultValues: {
      profilePicture: "",
      email: "",
      name: "",
      cpf: "",
      birthDate: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpValidation),
  });

  function handleChangeFile(
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<SignUpSchema, "profilePicture">,
  ) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const validExtensions = ["png", "jpg", "jpeg"];
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        field.value = undefined;
        alert("Invalid file format. Please upload a .png, .jpg or .jpeg file.");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          field.onChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async function handleSignUp(data: SignUpSchema) {
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="grid grid-cols-2 gap-x-4 gap-y-4"
          >
            <Controller
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="profilePicture">Foto de perfil</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="profilePicture"
                      type="file"
                      value={field.value?.length ? field.value[0].name : ""}
                      accept=".png,.jpg,.jpeg"
                      onChange={(event) => handleChangeFile(event, field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <FormControl>
                    <PatternFormat
                      {...field}
                      id="phone"
                      value={field.value}
                      format="(##) #####-####"
                      customInput={Input}
                      onValueChange={(values) => {
                        field.onChange(values.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      {...field}
                      id="cpf"
                      format="###.###.###-##"
                      autoComplete="off"
                      customInput={Input}
                      onValueChange={(values) => {
                        field.onChange(values.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="birthDate">Data de Nascimento</FormLabel>
                  <FormControl>
                    <PatternFormat
                      {...field}
                      id="birthDate"
                      value={field.value}
                      format="##/##/####"
                      customInput={Input}
                      onValueChange={(values) => {
                        field.onChange(values.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <FormControl>
                    <Input {...field} id="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id="confirmPassword" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="col-span-2 w-full py-6" type="submit">
              Cadastrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
