import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query";

export function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storageKey="rabbitlink-theme" defaultTheme="light">
          <Helmet titleTemplate="%s | rabbit.link" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
