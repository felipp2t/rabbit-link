import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Home } from "./pages/app/home";
import { AuthPage } from "./pages/auth/auth-page";
import { SendEmail } from "./pages/auth/reset-passsword/send-email";
import { ConfirmOTP } from "./pages/auth/reset-passsword/confirm-otp";
import { ResetPassword } from "./pages/auth/reset-passsword/reset-password";
import { Service } from "./pages/app/service";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/servico/:id", element: <Service /> },
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
