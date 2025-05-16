import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSpecialOfferById } from '../../private/MenuSetup/SpecialOfferMenu/specialOfferHook';
import BuyNowSpecialOfferModal from '../../../components/BuyNowSpecialOfferModal';

function SpecialOffers() {
  let { id } = useParams();
  const { data: specialOfferData, isLoading, error } = useGetSpecialOfferById(id);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    if (specialOfferData?.endDate) {
      const calculateDaysRemaining = () => {
        const endDate = new Date(specialOfferData.endDate);
        const today = new Date();
        endDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        console.log(`End Date: ${endDate}`);
        console.log(`Today: ${today}`);
        console.log(`Time Difference (ms): ${diffTime}`);
        console.log(`Remaining Days: ${diffDays}`);
        
        setDaysRemaining(diffDays);
      };

      calculateDaysRemaining();
      // Update the countdown every day
      const intervalId = setInterval(calculateDaysRemaining, 1000 * 60 * 60 * 24);
      return () => clearInterval(intervalId); // Clean up on component unmount
    }
  }, [specialOfferData]);

  if (isLoading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-lg font-medium text-red-500">Error: {error.message}</p>;

  const handleBuyNow = () => {
    setSelectedItem(specialOfferData);
    setIsBuyNowOpen(true);
  };

  const closeBuyNowModal = () => {
    setIsBuyNowOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Special Offer Header */}
      <header className="bg-primary text-black py-4 px-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold">Special Offer Details</h1>
      </header>

      {/* Special Offer Details */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img
          src={specialOfferData?.image_url}
          alt={specialOfferData?.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{specialOfferData?.title}</h2>
          <p className="text-gray-600 mb-4">{specialOfferData?.description}</p>
          <p className="text-lg font-bold mb-4">
            Discount: {specialOfferData?.discount}%
          </p>
          <p className="text-lg font-bold mb-4">
            Price: ${specialOfferData?.price}
          </p>
          <p className="text-sm text-gray-500">
            Start Date: {new Date(specialOfferData?.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            End Date: {new Date(specialOfferData?.endDate).toLocaleDateString()}
          </p>
          <p className="text-lg text-tertiary font-semibold mb-4">
            {daysRemaining !== null
              ? daysRemaining > 0
                ? `Remaining Days: ${daysRemaining}`
                : 'Offer has ended'
              : 'Calculating remaining days...'}
          </p>
          <button
            onClick={handleBuyNow}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            disabled={daysRemaining <= 0} // Disable if the offer has ended
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Buy Now Modal */}
      {selectedItem && (
        <BuyNowSpecialOfferModal
          isOpen={isBuyNowOpen}
          onClose={closeBuyNowModal}
          item={selectedItem}
        />
      )}
    </div>
  );
}

export default SpecialOffers;
