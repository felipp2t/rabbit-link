import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { ChatPage } from "./pages/app/chat/chat-page";
import { Home } from "./pages/app/home";
import { FormWizard } from "./pages/app/services/form-wizard";
import { ServiceDetails } from "./pages/app/services/service-details";
import { ViewMyServices } from "./pages/app/services/view-my-services";
import { UserProfileEdit } from "./pages/app/user/user-profile-edit";
import { AuthPage } from "./pages/auth/auth-page";
import { ConfirmOTP } from "./pages/auth/reset-passsword/confirm-otp";
import { ResetPassword } from "./pages/auth/reset-passsword/reset-password";
import { SendEmail } from "./pages/auth/reset-passsword/send-email";
import { PageFilteredByCategory } from "./pages/app/page-by-category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categorias/:category", element: <PageFilteredByCategory /> },
      { path: "/servicos/:id", element: <ServiceDetails /> },
      { path: "/criar-servico", element: <FormWizard /> },
      { path: "/meus-servicos", element: <ViewMyServices /> },
      { path: "/editar-perfil", element: <UserProfileEdit /> },
      { path: "/conversas", element: <ChatPage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/auth", element: <AuthPage /> },
      { path: "/auth/esqueceu-senha", element: <SendEmail /> },
      { path: "/auth/confirm-otp", element: <ConfirmOTP /> },
      { path: "/auth/reset-password", element: <ResetPassword /> },
    ],
  },
]);
