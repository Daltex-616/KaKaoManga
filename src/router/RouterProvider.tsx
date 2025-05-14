import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router-dom";
import { routes } from "./router";

const router = createBrowserRouter(routes);

export function AppRouter() {
  return <ReactRouterProvider router={router} />;
}
