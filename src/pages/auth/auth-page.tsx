import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export function AuthPage() {
  return (
    <div className="flex flex-col gap-6">
      <Helmet title="Login" />

      <Tabs
        defaultValue="sign-in"
        className="flex w-[400px] flex-col items-center"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up" className="w-[600px]">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
