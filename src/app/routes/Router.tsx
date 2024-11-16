import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../../config/routesConfig";
import { useAuth } from "../hooks/useAuth";

const Router = () => {
  const { getLocalStorage } = useAuth();

  const auth = getLocalStorage("auth");
  // console.log("auth: ", auth);

  const router = createBrowserRouter(
    auth && auth.isAuthenticated ? ROUTES.PROTECTED : ROUTES.PUBLIC
  );

  return <RouterProvider router={router} />;
};

export { Router };
