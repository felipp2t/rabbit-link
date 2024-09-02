import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Home } from "./pages/app/home";
import { AuthPage } from "./pages/auth/auth-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/auth/sign-in", element: <AuthPage /> }],
  },
]);
