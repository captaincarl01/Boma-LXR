import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function ProductCard({ product, onQuickView }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="group relative bg-surface-container-low border border-outline-variant/20 rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_0_1px_theme(colors.primary),0_20px_40px_-15px_rgba(0,0,0,0.5)]">
      {/* Badges */}
      <div className="absolute top-space-sm left-space-sm z-10 flex flex-col gap-space-xs">
        {product.isNew && (
          <span className="px-space-sm py-1 bg-primary text-on-primary font-label-code text-[0.5625rem] tracking-widest uppercase rounded">
            New
          </span>
        )}
        {product.isLimited && (
          <span className="px-space-sm py-1 bg-surface-container-highest text-primary border border-primary/40 font-label-code text-[0.5625rem] tracking-widest uppercase rounded">
            Limited
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <button
          onClick={() => setIsFavorited((v) => !v)}
          aria-label="Add to wishlist"
          className="absolute top-space-sm right-space-sm z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm hover:bg-surface transition-colors"
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              isFavorited ? "text-primary" : "text-on-surface-variant"
            }`}
            style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            favorite
          </span>
        </button>

       <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-space-xs p-space-sm translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            type="button"
            onClick={() =>
              addToCart({
                ...product,
                image: product.colors?.[0]?.image || product.image,
                selectedSize: product.sizes?.[0],
                selectedColor: product.colors?.[0]?.name,
    })
  }
            className="w-full py-2.5 bg-primary text-on-primary font-label-caps text-[0.6875rem] tracking-[0.15em] uppercase hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </button>
          <button
              onClick={() => onQuickView?.(product)}
            className="w-full py-2.5 bg-surface/90 backdrop-blur-sm text-on-surface font-label-caps text-[0.6875rem] tracking-[0.15em] uppercase hover:bg-surface transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-space-md">
        <span className="font-label-code text-[0.625rem] tracking-widest uppercase text-outline">
          {product.category}
        </span>
        <h3 className="font-headline-sm text-[0.9375rem] text-on-surface mt-space-xs">
          {product.name}
        </h3>
        <span className="font-body-md text-[0.875rem] text-primary mt-space-xs block">
          {formatPrice(product.price)}
        </span>
      </div>
    </div>
  );
}