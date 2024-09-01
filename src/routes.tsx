import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layout/app";
import { App } from "./app";

export const router = createBrowserRouter([
  { path: "/", 
    element: <AppLayout />,
    children: [
      { path: "/", element: <App />}
    ]
 },
]);
