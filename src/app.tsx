import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="rabbitlink-theme" defaultTheme="light">
        <Helmet titleTemplate="%s | rabbit.link" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
