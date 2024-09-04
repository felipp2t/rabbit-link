import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen place-content-center antialiased bg-background">
      <Outlet />
    </div>
  );
}
