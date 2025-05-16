import React, { useState, useEffect } from "react";
import { useGetAllMenus } from "../generalApiCalls/menuHook";
import { useGetAllSpecialOffers } from "../pages/private/MenuSetup/SpecialOfferMenu/specialOfferHook";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpecialOfferOpen, setIsSpecialOfferOpen] = useState(false);
  const { data: menus, isLoading, error } = useGetAllMenus();
  const { data: specialOffer, isLoading: specialOfferLoading } =
    useGetAllSpecialOffers();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Function to get cart item count fromlocalStorage
    const getCartItemCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || {
        fixed: [],
        custom: [],
      };
      const fixedCount = cart["fixed"]
        ? cart.fixed.reduce((acc, item) => acc + item.quantity, 0)
        : 0;
      const customCount = cart["custom"]
        ? cart.custom.reduce((acc, item) => acc + item.quantity, 0)
        : 0;
      return fixedCount + customCount;
    };

    // Update cart item count
    setCartItemCount(getCartItemCount());
  }, []); // Empty dependency array means this runs once on

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleSpecialOffer = () => {
    setIsSpecialOfferOpen(!isSpecialOfferOpen);
  };

  return (
    <nav className="bg-accent text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-lg font-bold">Homemade Goodness</h1>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="/"
              className="text-base font-medium hover:text-gray-300 flex items-center space-x-2"
            >
              <span>Home</span>
            </a>
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="text-base font-medium flex items-center space-x-2 hover:text-gray-300"
              >
                <span>Menu</span>
              </button>
              {isMenuOpen && (
                <div className="absolute top-full mt-2 w-64 bg-white text-black rounded-md shadow-lg z-50">
                  {isLoading ? (
                    <p className="px-4 py-2">Loading...</p>
                  ) : error ? (
                    <p className="px-4 py-2">Error loading menus</p>
                  ) : (
                    <ul className="py-1">
                      {menus.map((menu) => (
                        <li
                          key={menu.id}
                          className="hover:bg-gray-100 transition-colors duration-150"
                        >
                          <a
                            href={
                              menu.type === "fixed"
                                ? `/fixed/${menu.id}`
                                : `/customized/${menu.id}`
                            }
                            className="block px-4 py-2 text-base font-medium"
                          >
                            {menu.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleSpecialOffer}
                className="text-base font-medium flex items-center space-x-2 hover:text-gray-300"
              >
                <span>Special offer</span>
              </button>
              {isSpecialOfferOpen && (
                <div className="absolute top-full mt-2 w-64 bg-white text-black rounded-md shadow-lg z-50">
                  {specialOfferLoading ? (
                    <p className="px-4 py-2">Loading...</p>
                  ) : error ? (
                    <p className="px-4 py-2">Error loading menus</p>
                  ) : (
                    <ul className="py-1">
                      {specialOffer.map((menu) => (
                        <li
                          key={menu._id}
                          className="hover:bg-gray-100 transition-colors duration-150"
                        >
                          <a
                            href={`/special-offers/${menu._id}`}
                            className="block px-4 py-2 text-base font-medium"
                          >
                            {menu.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <a
              href="/contact"
              className="text-base font-medium hover:text-gray-300 flex items-center space-x-2"
            >
              <span>Contact</span>
            </a>
            <a
              href="/cart"
              className="flex items-center space-x-1 text-base font-medium hover:text-gray-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l3.6 7.59L8.29 13H20a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8.4l-1.43 3.6A1 1 0 0 1 6 20H4a1 1 0 0 1-1-1v-1.09a1 1 0 0 1 .14-.53L3 13"
                />
                <circle cx="10" cy="20" r="2" />
                <circle cx="16" cy="20" r="2" />
              </svg>
              <span> ({cartItemCount})</span>
            </a>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-accent-dark focus:outline-none focus:bg-accent-dark"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white text-black">
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center space-x-2"
          >
            <span>Home</span>
          </a>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center space-x-2"
            >
              <span>Menu</span>
            </button>
            {isMenuOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white text-black rounded-md shadow-lg z-50">
                {isLoading ? (
                  <p className="px-4 py-2">Loading...</p>
                ) : error ? (
                  <p className="px-4 py-2">Error loading menus</p>
                ) : (
                  <ul className="py-1">
                    {menus.map((menu) => (
                      <li
                        key={menu.id}
                        className="hover:bg-gray-100 transition-colors duration-150"
                      >
                        <a
                          href={
                            menu.type === "fixed"
                              ? `/fixed/${menu.id}`
                              : `/customized/${menu.id}`
                          }
                          className="block px-4 py-2 text-base font-medium"
                        >
                          {menu.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleSpecialOffer}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center space-x-2"
            >
              <span>Special offers</span>
            </button>
            {isSpecialOfferOpen && (
              <div className="absolute top-full mt-2 w-64 bg-white text-black rounded-md shadow-lg z-50">
                {specialOfferLoading ? (
                  <p className="px-4 py-2">Loading...</p>
                ) : error ? (
                  <p className="px-4 py-2">Error loading menus</p>
                ) : (
                  <ul className="py-1">
                    {specialOffer.map((menu) => (
                      <li
                        key={menu._id}
                        className="hover:bg-gray-100 transition-colors duration-150"
                      >
                        <a
                          href={
                            `/special-offers/${menu._id}`
                          }
                          className="block px-4 py-2 text-base font-medium"
                        >
                          {menu.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <a
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center space-x-2"
          >
            <span>Contact</span>
          </a>
          <a
            href="/cart"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 flex items-center space-x-1"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l3.6 7.59L8.29 13H20a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8.4l-1.43 3.6A1 1 0 0 1 6 20H4a1 1 0 0 1-1-1v-1.09a1 1 0 0 1 .14-.53L3 13"
              />
              <circle cx="10" cy="20" r="2" />
              <circle cx="16" cy="20" r="2" />
            </svg>
            <span>Cart ({cartItemCount})</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
