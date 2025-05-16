import Private from "../pages/private/Private";
import Dashboard from "../pages/private/Dashboard/Dashboard";
import MenuSetup from "../pages/private/MenuSetup/MenuSetup";
import MenuItems from "../pages/private/MenuSetup/MenuItems/MenuItems";
import MenuCategory from "../pages/private/MenuSetup/MenuCategory/MenuCategory";
import CustomizableMenu from "../pages/private/MenuSetup/CustomizableMenu/CustomizableMenu";
import CustomizableMenuItem from "../pages/private/MenuSetup/CustomizableMenuItem/CustomizableMenuItem";
import Order from "../pages/private/Order/Order";
import SpecialOfferMenu from "../pages/private/MenuSetup/SpecialOfferMenu/SpecialOfferMenu";
import SlideShowSetup from "../pages/private/SlideShowSetup/SlideShowSetup";
import PeopleContact from "../pages/private/PeopleContact/PeopleContact"

const privateRoutes = [
  {
    path: "/private",
    element: <Private />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path:'orders',
        element: <Order/>
      },
      {
        path:'slide-show',
        element: <SlideShowSetup/>
      },
      {
        path:'contact',
        element: <PeopleContact/>
      },
      {
        path: "menu-setup",
        element: <MenuSetup/>,
        children:[
          {
            path: "menu-category",
            element: <MenuCategory/>
          },
          {
            path: "menu-items",
            element: <MenuItems/>
          },
          {
            path: "customizable-menu",
            element: <CustomizableMenu/>
          },
          {
            path:"customizable-menu-item",
            element: <CustomizableMenuItem/>
          },
          {
            path:"special-offer-menu",
            element: <SpecialOfferMenu/>
          }
        ]
      }
    ],
  },
];

export default privateRoutes;
