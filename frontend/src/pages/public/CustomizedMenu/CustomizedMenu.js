import React, { useState } from 'react';
import { useGetCustomizedMenu } from './customizedMenuHook';
import { useParams } from 'react-router-dom';
import CustomizedBuyNowModal from '../../../components/CustomizedBuyNow';
import {addCustoms} from '../../../utils/cartSave'

function CustomizedMenu() {
  let { id } = useParams();
  const { data: menuItems, error, isLoading } = useGetCustomizedMenu(id);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  // Handle item selection
  const handleSelectItem = (item) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((selected) => selected._id === item._id);
      if (isSelected) {
        // Remove item from selection
        return prev.filter((selected) => selected._id !== item._id);
      } else {
        // Add item to selection
        return [...prev, item];
      }
    });
  };

  // Calculate total price
  React.useEffect(() => {
    const newTotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(newTotal);
  }, [selectedItems]);

  // Handle "Buy Now" action
  const handleBuyNow = () => {
    setIsBuyNowOpen(true);

    // Placeholder function for buying selected itemsconsole.log('Buying now', selectedItems);
    // Add your purchase logic here
  };
  const closeBuyNowModal = () => {
    setIsBuyNowOpen(false);
    setSelectedItems([]);
  };

  const addToCart = ()=>{
    console.log('Add to Cart', selectedItems)
    addCustoms(selectedItems)
    setSelectedItems([]);
  }
  if (isLoading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen p-4">
      {/* Main Customizable Menu Heading */}
      <header className="bg-primary text-black py-4 px-6 rounded-md shadow-md mb-6">
        {menuItems && menuItems.length > 0 && (
          <div className="flex items-center">
            <img 
              src={menuItems[0].customizable_menu_id.image_url} 
              alt={menuItems[0].customizable_menu_id.name} 
              className="w-48 h-48 object-cover rounded-md mr-6" // Adjust as needed
            />
            <div>
              <h1 className="text-2xl font-bold">{menuItems[0].customizable_menu_id.name}</h1>
              <p className="text-gray-600">{menuItems[0].customizable_menu_id.description}</p>
              <p className="text-lg font-bold mt-2">Base Price: ${menuItems[0].customizable_menu_id.base_price.toFixed(2)}</p>
            </div>
          </div>
        )}
      </header>
      
      {/* Menu Items */}
      <div className="max-w-4xl mx-auto">
        {menuItems && menuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item._id} className="flex items-start p-4 border border-gray-200 rounded-lg shadow-md bg-white">
                <input
                  type="checkbox"
                  checked={selectedItems.some(selected => selected._id === item._id)}
                  onChange={() => handleSelectItem(item)}
                  className="mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-medium">No options available</p>
        )}
      </div>

      {/* Total Price and Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-md">
        <p className="text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={addToCart}
          disabled={selectedItems.length === 0}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          disabled={selectedItems.length === 0}
        >
          Buy Now
        </button>
      </div>
      <CustomizedBuyNowModal
          isOpen={isBuyNowOpen}
          onClose={closeBuyNowModal}
          totalPrice={totalPrice}
          items={selectedItems}
        />
    </div>
  );
}

export default CustomizedMenu;
