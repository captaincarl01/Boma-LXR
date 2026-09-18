import { createContext, useContext, useState, useEffect } from "react";

const WISHLIST_STORAGE_KEY = "boma-lxr-wishlist";

const WishlistContext = createContext();

function loadWishlistFromStorage() {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlistFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Storage full or unavailable — wishlist still works for this session
    }
  }, [wishlist]);

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);