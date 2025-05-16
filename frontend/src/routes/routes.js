import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import privateRoutes from "./privateRoute";
import publicRoutes from "./publicRoute";

const Routes = () => {
  
  const { isAuthenticated } = useAuth();

  const routes = createBrowserRouter(
    //  isAuthenticated?[...publicRoutes,...privateRoutes]:publicRoutes
    [...publicRoutes,...isAuthenticated?privateRoutes:[]]
  );

  return (
      <RouterProvider router={routes} />
  );
};

export default Routes;
