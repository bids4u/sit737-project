const menuItems = [
  {
    label: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    ),
    link: "/private",
  },
  {
    label: "Menu Setup",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 21"
      >
        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
      </svg>
    ),
    subMenu: [
      { label: "Menu Category", link: "/private/menu-setup/menu-category" },
      { label: "Menu Items", link: "/private/menu-setup/menu-items" },
      { label: "Customizable Menu", link: "/private/menu-setup/customizable-menu" },
      { label: "Customizable Menu Item", link: "/private/menu-setup/customizable-menu-item" },
      { label: "Special Offer Menu", link: "/private/menu-setup/special-offer-menu" },
    ],
  },
  {
    label: "Orders",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 2a2 2 0 0 0-2 2v2H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2V4a2 2 0 0 0-2-2H6Zm0 2h12v2H6V4Zm0 4h12v14H6V8Zm2 0v12h2V8H8Zm4 0v12h2V8h-2Z" />
      </svg>
    ),
    link: "/private/orders",
  }
  ,
  {
    label: "Slide Show",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-2-7h4v2h-4zm0-10h4v7h-4z" />
      </svg>
    ),
    link: "/private/slide-show",
  },
  ,
  {
    label: "People Contact",
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-2-7h4v2h-4zm0-10h4v7h-4z" />
      </svg>
    ),
    link: "/private/contact",
  },
  // Additional menu items can be added here
];

export default menuItems;
