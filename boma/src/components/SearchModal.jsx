import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCurrency } from "../context/CurrencyContext";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const { formatPrice } = useCurrency();

  const results = query.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-gutter-mobile">
      <div className="w-full max-w-xl bg-surface border border-outline-variant/30 rounded-lg overflow-hidden">
        <div className="flex items-center gap-space-sm px-space-md py-space-md border-b border-outline-variant/20">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-on-surface placeholder:text-outline font-body-md text-[0.9375rem] focus:outline-none"
          />
          <button onClick={onClose} aria-label="Close search" className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <p className="px-space-md py-space-lg text-center font-body-sm text-[0.875rem] text-on-surface-variant">
              No products found for "{query}"
            </p>
          )}

          {results.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center gap-space-sm px-space-md py-space-sm hover:bg-surface-container-low transition-colors"
            >
              <img src={product.image} alt={product.name} className="w-12 h-14 object-cover rounded-md bg-surface-container" />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[0.875rem] text-on-surface">{product.name}</span>
                <span className="font-body-sm text-[0.8125rem] text-primary">{formatPrice(product.price)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}