import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useBuyNow } from "../generalApiCalls/menuHook";
import ImageUploadComponent from "./ImageUploadComponent"; // Adjust the path as needed

const BuyNowModal = ({ isOpen, onClose, item }) => {
  const { mutate: buyNow, isLoading: isBuying } = useBuyNow();
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUploadSuccess = (url) => {
    setPaymentScreenshotUrl(url);
  };

  const onSubmit = (data) => {
    if(!paymentScreenshotUrl){
      toast.error('Please add screenshot confirming your payment')
    }
    const orderData = {
      items: [
        {
          item: item._id, // Item IDquantity: 1, // Assuming quantity of 1 for simplicity
        },
      ], // Assuming buying a single item
      totalPrice: item.price,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      paymentScreenshot: paymentScreenshotUrl,
      optionalRequest: data.optionalRequest, // Include optional request data
    };
    buyNow(orderData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        toast.error(`Error placing order: ${error.message}`);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Buy Now</h2>

        {/* Display Item Details */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Item Details</h3>
          <div className="flex items-center mb-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-gray-700">{item.description}</p>
              <p className="text-green-500 font-semibold mt-2">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full p-2 border border-gray-300 rounded-md ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full p-2 border border-gray-300 rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", { required: "Phone is required" })}
              className={`w-full p-2 border border-gray-300 rounded-md ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`w-full p-2 border border-gray-300 rounded-md ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="optionalRequest"
            >
              Optional Request
            </label>
            <textarea
              id="optionalRequest"
              {...register("optionalRequest")}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <ImageUploadComponent onUploadSuccess={handleImageUploadSuccess} />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBuying}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              {isBuying ? "Processing..." : "Confirm Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyNowModal;
