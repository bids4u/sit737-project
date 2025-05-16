import React from "react";
import { useGetAllMenus, useGetHome } from "../../../generalApiCalls/menuHook";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom"
function Home() {
  const { data: homeData, isLoading } = useGetHome();
  const { data: menus, isLoading: isLoadingMenu, error: errorMenu } = useGetAllMenus();
  const navigate = useNavigate()
  if (isLoading || isLoadingMenu) {
    return <div>Loading...</div>;
  }

  if (errorMenu) {
    return <div>Error loading menus: {errorMenu.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed of the slideshow
  };

  return (
    <div className="bg-gray-100">
      {/* Slideshow Section */}
      <div className="relative">
        <Slider {...settings}>
          {homeData.slideshowImages.map((slide) => (
            <div
              key={slide._id}
              className="relative w-full h-64 sm:h-80 md:h-96"
            >
              <img
                src={slide.image_url}
                alt={slide.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={slide.link}
                  className="text-white text-lg md:text-2xl font-bold px-4 py-2 bg-black bg-opacity-50 rounded-lg shadow-lg hover:bg-opacity-70 transition"
                >
                  {slide.caption}
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Special Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Special Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {homeData.specialOffers.map((offer) => (
            <div
              key={offer._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={offer.image_url}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-lg font-bold text-red-600">
                  Save {offer.discount}%
                </p>
              </div>
              <div className="bg-gray-100 p-4 text-center">
                <button onClick={()=>navigate(`/special-offers/${offer._id}`)}  className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-dark transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menus Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Menus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
              onClick={()=>navigate(menu.type==='fixed'?`/fixed/${menu.id}`:`/customized/${menu.id}`)}
            >
              <h3 className="text-xl font-semibold mb-2">{menu.name}</h3>
              {/* <p className="text-gray-600 mb-4">{menu.type}</p>
              <button className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-accent-dark transition">
                View Details
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
