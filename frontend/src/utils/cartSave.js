import { toast } from "react-toastify";

export const addFixedItem = (item) => {
  // Retrieve the cart from localStorage and parse it
  const cart = JSON.parse(localStorage.getItem("cart")) || { fixed: [] };

  // Check if the cart has a "fixed" array
  let fixed = cart.fixed || [];

  // Find if the item already exists in the cart
  const itemFound = fixed.find((el) => el._id === item._id);

  const timestamp = new Date().toISOString(); // Get the current timestamp
  if (itemFound) {
    // Update the quantity and timestamp of the found item
    fixed = fixed.map((el) =>
      el._id === item._id
        ? { ...el, quantity: el.quantity + 1, lastUpdated: timestamp }
        : el
    );
  } else {
    // Add new item with quantity 1 and timestamp
    fixed.push({ ...item, quantity: 1, lastUpdated: timestamp });
  }

  // Update the cart object
  cart.fixed = fixed;

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Notify success
  toast.success("Added to cart");
};

export const removeFixedItem = (itemId) => {
  // Retrieve the cart from localStorage and parse it
  const cart = JSON.parse(localStorage.getItem("cart")) || { fixed: [] };

  // Check if the cart has a "fixed" array
  let fixed = cart.fixed || [];

  // Remove the item with the given itemId from the cart
  fixed = fixed.filter((el) => el._id !== itemId);

  // Update the cart object
  cart.fixed = fixed;

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Notify success
  toast.success("Removed from cart");
};

export const addCustomItem = (item) => {
  // Retrieve the cart from localStorage and parse it
  const cart = JSON.parse(localStorage.getItem("cart")) || { custom: [] };

  // Check if the cart has a "custom" array
  let custom = cart.custom || [];

  // Find if the item already exists in the cart
  const itemFound = custom.find((el) => el._id === item._id);

  const timestamp = new Date().toISOString(); // Get the current timestamp
  if (itemFound) {
    // Update the quantity and timestamp of the found item
    custom = custom.map((el) =>
      el._id === item._id
        ? { ...el, quantity: el.quantity + 1, lastUpdated: timestamp }
        : el
    );
  } else {
    // Add new item with quantity 1 and timestamp
    custom.push({ ...item, quantity: 1, lastUpdated: timestamp });
  }

  // Update the cart object
  cart.custom = custom;

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  
};

// Decrease Fixed Item Quantity
export const decreaseFixedItem = (itemId) => {
  // Retrieve the cart from localStorage and parse it
  const cart = JSON.parse(localStorage.getItem("cart")) || { fixed: [] };

  // Check if the cart has a "fixed" array
  let fixed = cart.fixed || [];

  // Find if the item exists in the cart
  const itemFound = fixed.find((el) => el._id === itemId);

  if (itemFound && itemFound.quantity > 1) {
    // Decrease the quantity and update the timestamp
    fixed = fixed.map((el) =>
      el._id === itemId
        ? { ...el, quantity: el.quantity - 1, lastUpdated: new Date().toISOString() }
        : el
    );
  } else {
    // Remove the item if its quantity is 1 or less
    fixed = fixed.filter((el) => el._id !== itemId);
  }

  // Update the cart object
  cart.fixed = fixed;

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Notify success
  toast.success("Updated cart");
};

export const removeCustomItem = (itemId) => {
  // Retrieve the cart from localStorage and parse it
  const cart = JSON.parse(localStorage.getItem("cart")) || { custom: [] };

  // Check if the cart has a "custom" array
  let custom = cart.custom || [];

  // Remove the item with the given itemId from the cart
  custom = custom.filter((el) => el._id !== itemId);

  // Update the cart object
  cart.custom = custom;

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Notify success
  toast.success("Removed from cart");
};

// Decrease Custom Item Quantity
export const decreaseCustomItem = (itemId) => {
  // Retrieve the cart from localStorage and parse it
  const cart = JSON.parse(localStorage.getItem("cart")) || { custom: [] };

  // Check if the cart has a "custom" array
  let custom = cart.custom || [];

  // Find if the item exists in the cart
  const itemFound = custom.find((el) => el._id === itemId);

  if (itemFound && itemFound.quantity > 1) {
    // Decrease the quantity and update the timestamp
    custom = custom.map((el) =>
      el._id === itemId
        ? { ...el, quantity: el.quantity - 1, lastUpdated: new Date().toISOString() }
        : el
    );
  } else {
    // Remove the item if its quantity is 1 or less
    custom = custom.filter((el) => el._id !== itemId);
  }

  // Update the cart object
  cart.custom = custom;

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Notify success
  toast.success("Updated cart");
};


export const addCustoms = (items) => {
  items.forEach((el) => {
    addCustomItem(el);
  }
);
  // Notify success
  toast.success("Added to cart");
};


