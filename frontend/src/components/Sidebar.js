import { useState } from "react";
import menuItems from "../utils/menuItems";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const renderMenu = (items) => {
    return items.map((item, index) => (
      <li key={index}>
        {item.subMenu ? (
          <>
            <button
              type="button"
              onClick={() => toggleDropdown(index)}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {item.icon}
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {item.label}
              </span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul
              className={`py-2 space-y-2 ${
                openDropdown === index ? "" : "hidden"
              }`}
            >
              {item.subMenu.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <Link
                    to={subItem.link}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Link
            to={item.link}
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            {item.icon}
            <span className="ms-3">{item.label}</span>
          </Link>
        )}
      </li>
    ));
  };

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {renderMenu(menuItems)}
        </ul>
      </div>
    </aside>
  );
}
