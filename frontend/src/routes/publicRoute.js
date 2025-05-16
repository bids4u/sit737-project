import { Navigate } from "react-router-dom";
import Home from "../pages/public/home/Home";
import Login from "../pages/public/login/Login";
import Public from "../pages/public/Public";
import FixedMenu from "../pages/public/FixedMenu/FixedMenu";
import CustomizedMenu from "../pages/public/CustomizedMenu/CustomizedMenu";
import Cart from "../pages/public/Cart/Cart";
import SpecialOffers from "../pages/public/SpecialOffers/SpecialOffers";
import Contact from "../pages/public/Contact/Contact";

const publicRoutes = [
    { 
      path: "/", 
      element: <Public/>,
      children:[
        {
          path:'',
          element: <Home/>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path:'fixed/:id',
          element: <FixedMenu/>
        },
        {
          path: 'customized/:id',
          element: <CustomizedMenu/>
        },
        {
          path: 'cart',
          element: <Cart/>
        },
        {
          path:'special-offers/:id',
          element: <SpecialOffers/>
        },
        {
          path: 'contact',
          element: <Contact/>
        },
      ]
     },
    // { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ];
  
  export default publicRoutes