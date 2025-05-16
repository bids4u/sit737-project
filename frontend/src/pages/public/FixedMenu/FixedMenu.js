import React, { useState } from 'react';
import { useGetFixedMenu } from './fixedMenuHook';
import { useParams } from 'react-router-dom';
import BuyNowModal from '../../../components/BuyNowModal';
import { addFixedItem } from '../../../utils/cartSave';

function FixedMenu() {
  let { id } = useParams();
  const { data: fixedMenu, error, isLoading } = useGetFixedMenu(id);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-500">Error: {error.message}</p>;

  const handleAddToCart = (item) => {
    console.log('Add to Cart:', item);
    addFixedItem(item)
  };

  const handleBuyNow = (item) => {
    setSelectedItem(item);
    setIsBuyNowOpen(true);
  };

  const closeBuyNowModal = () => {
    setIsBuyNowOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Main Menu Heading */}
      <header className="bg-primary text-black py-4 px-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold">{fixedMenu && fixedMenu.length > 0 ? fixedMenu[0]['menu_category_id']['name'] : 'No data to show'}</h1>
      </header>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto">
        {fixedMenu && fixedMenu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixedMenu.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-medium">No items available</p>
        )}
      </div>

      {/* Buy Now Modal */}
      {selectedItem && (
        <BuyNowModal
          isOpen={isBuyNowOpen}
          onClose={closeBuyNowModal}
          item={selectedItem}
        />
      )}
    </div>
  );
}

export default FixedMenu;
