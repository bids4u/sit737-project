import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import ImageUploadComponent from "../../../components/ImageUploadComponent";
import { useBuyNow } from "../../../generalApiCalls/menuHook";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  optionalRequest: yup.string().notRequired(),
});

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [cart, setCart] = useState({ custom: [], fixed: [] });
  const { mutate: buyNow, isLoading: isBuying } = useBuyNow();

  useEffect(() => {
    // Fetch cart from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {
      custom: [],
      fixed: [],
    };
    setCart(savedCart);
  }, []);

  // Group custom items
  const groupCustomItems = (items) => {
    return items.reduce((acc, item) => {
      const { customizable_menu_id } = item;
      if (!acc[customizable_menu_id._id]) {
        acc[customizable_menu_id._id] = {
          menu: customizable_menu_id,
          items: [],
        };
      }
      acc[customizable_menu_id._id].items.push(item);
      return acc;
    }, {});
  };

  const groupedCustomItems = groupCustomItems(cart.custom || []);

  // Handle quantity changes
  const updateQuantity = (itemId, quantity, type) => {
    let updatedItems = type === "custom" ? [...cart.custom] : [...cart.fixed];

    updatedItems = updatedItems.map((item) =>
      item._id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    );

    const updatedCart = { ...cart, [type]: updatedItems };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`Quantity updated for ${itemId}`);
  };

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if(!paymentScreenshot){
      toast.error('Please attach payment screenshot')
      return
    }
    const order = {
      items: (cart.fixed || []).map((item) => ({
        item: item._id,
        quantity: item.quantity,
      })),
      customItems: (cart.custom || []).map((item) => ({
        item: item._id,
        quantity: item.quantity,
      })),
      totalPrice:
        (cart.fixed || []).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ) +
        (cart.custom || []).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      paymentScreenshot, // Adjust if needed
      optionalRequest: data.optionalRequest,
    };

    console.log("Order submitted:", order);

    buyNow(order, {
      onSuccess: () => {
        localStorage.removeItem("cart");
        navigate("/");
      },
      onError: (error) => {
        toast.error(`Error placing order: ${error.message}`);
      },
    });
  };

  return (
    <div className="container mx-auto p-4 flex space-x-8">
      {/* Cart Component */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {/* Display Fixed Items */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Fixed Items</h2>
          {cart.fixed.length === 0 ? (
            <p>No fixed items in the cart.</p>
          ) : (
            <ul>
              {cart.fixed.map((item) => (
                <li
                  key={item._id}
                  className="mb-4 p-4 border rounded-md flex items-center"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>
                      Quantity:
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1, "fixed")
                        }
                        className="px-2 py-1 bg-gray-200 rounded-md"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1, "fixed")
                        }
                        className="px-2 py-1 bg-gray-200 rounded-md"
                      >
                        +
                      </button>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Display Custom Items */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Items</h2>
          {Object.values(groupedCustomItems).length === 0 ? (
            <p>No custom items in the cart.</p>
          ) : (
            Object.values(groupedCustomItems).map((group) => (
              <div key={group.menu._id} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {group.menu.name}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li
                      key={item._id}
                      className="mb-4 p-4 border rounded-md flex items-center"
                    >
                      <img
                        src={item.customizable_menu_id.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-md font-semibold">{item.name}</h4>
                        <p>Price: ${item.price}</p>
                        <p>
                          Quantity:
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1,
                                "custom"
                              )
                            }
                            className="px-2 py-1 bg-gray-200 rounded-md"
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1,
                                "custom"
                              )
                            }
                            className="px-2 py-1 bg-gray-200 rounded-md"
                          >
                            +
                          </button>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Details Form */}
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`form-input mt-1 block w-full ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`form-input mt-1 block w-full ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone")}
              className={`form-input mt-1 block w-full ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              className={`form-input mt-1 block w-full ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>

          {/* Optional Request Field */}
          <div className="form-group">
            <label
              htmlFor="optionalRequest"
              className="block text-sm font-medium text-gray-700"
            >
              Optional Request
            </label>
            <textarea
              id="optionalRequest"
              {...register("optionalRequest")}
              className="form-input mt-1 block w-full"
            />
          </div>

          {/* Payment Screenshot Upload */}
          <div className="form-group">
            <label
              htmlFor="paymentScreenshot"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Screenshot
            </label>
            <ImageUploadComponent
              onUploadSuccess={(url) => setPaymentScreenshot(url)}
            />
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                isBuying ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isBuying}
            >
              {isBuying ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
