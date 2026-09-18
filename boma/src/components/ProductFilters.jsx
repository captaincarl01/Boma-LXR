import { useState } from "react";
import { CATEGORIES } from "../data/products";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $250", min: 100, max: 250 },
  { label: "$250+", min: 250, max: Infinity },
];

export default function ProductFilters({ filters, onChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeCategory = filters.category;
  const activePriceLabel =
    PRICE_RANGES.find((r) => r.min === filters.priceRange.min && r.max === filters.priceRange.max)
      ?.label || "All Prices";

  return (
    <div className="w-full px-gutter-mobile lg:px-margin py-space-md border-b border-outline-variant/20 sticky top-[116px] z-30 bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-sm">
        {/* Category pills — horizontal scroll on mobile */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs lg:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`whitespace-nowrap px-space-md py-2 font-label-caps text-[0.6875rem] tracking-[0.15em] uppercase border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-on-primary border-primary"
                  : "border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-space-sm relative">
          {/* Price dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-space-xs px-space-md py-2 border border-outline-variant/40 font-label-caps text-[0.6875rem] tracking-[0.15em] uppercase text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
            >
              {activePriceLabel}
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-space-xs w-48 bg-surface border border-outline-variant/30 rounded-md shadow-lg z-40 overflow-hidden">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      onChange({ ...filters, priceRange: { min: range.min, max: range.max } });
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-space-md py-space-sm font-body-sm text-[0.8125rem] hover:bg-surface-container-low transition-colors ${
                      activePriceLabel === range.label ? "text-primary" : "text-on-surface"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New Arrivals toggle */}
          <button
            onClick={() => onChange({ ...filters, newOnly: !filters.newOnly })}
            className={`px-space-md py-2 font-label-caps text-[0.6875rem] tracking-[0.15em] uppercase border transition-colors ${
              filters.newOnly
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            New Arrivals
          </button>

          {/* Limited Drops toggle */}
          <button
            onClick={() => onChange({ ...filters, limitedOnly: !filters.limitedOnly })}
            className={`px-space-md py-2 font-label-caps text-[0.6875rem] tracking-[0.15em] uppercase border transition-colors ${
              filters.limitedOnly
                ? "bg-primary text-on-primary border-primary"
                : "border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            Limited Drops
          </button>
        </div>
      </div>
    </div>
  );
}