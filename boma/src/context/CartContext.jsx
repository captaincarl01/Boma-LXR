import { createContext, useContext, useState, useEffect } from "react";

// TODO: replace with your real WhatsApp business number, format: countrycode + number, no + or spaces
const WHATSAPP_NUMBER = "2348181261072";
const CART_STORAGE_KEY = "boma-lxr-cart";

const CartContext = createContext();

// Builds a unique key so the same product in a different size/color is a separate cart line
function getCartItemId(item) {
  return `${item.id}-${item.selectedSize || "none"}-${item.selectedColor || "none"}`;
}

// Reads whatever was saved last time, or starts empty if nothing's there / storage fails
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCartFromStorage);

  // Every time items changes, save it — covers add/remove/quantity update automatically
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — cart still works for this session, just won't persist
    }
  }, [items]);

  const addToCart = (product) => {
    const cartItemId = getCartItemId(product);

    setItems((prev) => {
      const existing = prev.find((item) => getCartItemId(item) === cartItemId);
      if (existing) {
        return prev.map((item) =>
          getCartItemId(item) === cartItemId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter((item) => getCartItemId(item) !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return removeFromCart(cartItemId);
    setItems((prev) =>
      prev.map((item) =>
        getCartItemId(item) === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getWhatsAppCheckoutLink = () => {
    const lines = items.map((item) => {
      const variant = [item.selectedSize, item.selectedColor].filter(Boolean).join(" / ");
      const variantText = variant ? ` (${variant})` : "";
      return `• ${item.name}${variantText} (x${item.quantity}) — $${(item.price * item.quantity).toFixed(2)}`;
    });
    const message = [
      "Hi Boma LXR, I'd like to order:",
      "",
      ...lines,
      "",
      `Total: $${cartTotal.toFixed(2)}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        getWhatsAppCheckoutLink,
        getCartItemId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);