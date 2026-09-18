import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Reset selections whenever a new product opens
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || null);
      setSelectedColor(product.colors?.[0] || null);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
  addToCart({
    ...product,
    image: selectedColor?.image || product.image,
    selectedSize,
    selectedColor: selectedColor?.name,
    quantity,
  });
  onClose();
};
  return (
    <div
      className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center px-gutter-mobile"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-outline-variant/30 rounded-lg grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full aspect-[3/4] md:aspect-auto bg-surface-container">
          <img
            src={selectedColor?.image || product.image}
            alt={`${product.name} — ${selectedColor?.name || ""}`}
            className="w-full h-full object-cover"
         />
          <button
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute top-space-sm right-space-sm w-8 h-8 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm hover:bg-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface">close</span>
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col p-space-lg">
          <span className="font-label-code text-[0.625rem] tracking-widest uppercase text-outline">
            {product.category}
          </span>
          <h2 className="font-headline-sm text-[1.375rem] text-on-surface mt-space-xs">
            {product.name}
          </h2>
          <span className="font-body-md text-[1.125rem] text-primary mt-space-sm block">
            {formatPrice(product.price)}
          </span>

          <p className="font-body-sm text-[0.8125rem] text-on-surface-variant leading-relaxed mt-space-md">
            {product.description}
          </p>

          {/* Color selection */}
          {product.colors?.length > 0 && (
            <div className="mt-space-lg">
              <span className="font-label-caps text-[0.6875rem] tracking-widest uppercase text-on-surface-variant">
                Color: {selectedColor?.name}
              </span>
              <div className="flex items-center gap-space-sm mt-space-sm">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name
                        ? "border-primary scale-110"
                        : "border-outline-variant/40"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selection */}
          {product.sizes?.length > 0 && (
            <div className="mt-space-lg">
              <span className="font-label-caps text-[0.6875rem] tracking-widest uppercase text-on-surface-variant">
                Size
              </span>
              <div className="flex flex-wrap gap-space-xs mt-space-sm">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-space-md py-2 border font-label-caps text-[0.75rem] uppercase transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-space-lg">
            <span className="font-label-caps text-[0.6875rem] tracking-widest uppercase text-on-surface-variant">
              Quantity
            </span>
            <div className="flex items-center gap-space-sm mt-space-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center border border-outline-variant/40 text-on-surface hover:border-primary transition-colors"
              >
                −
              </button>
              <span className="font-body-sm text-[0.875rem] text-on-surface w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center border border-outline-variant/40 text-on-surface hover:border-primary transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-space-lg py-3.5 bg-primary text-on-primary font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}