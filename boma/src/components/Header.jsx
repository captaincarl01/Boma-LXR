import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useWishlist } from "../context/WishlistContext";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Collection", path: "/collection" },
  { label: "Lookbook", path: "/#lookbook" },
  { label: "Brand Story", path: "/#brand-story" },
];

export default function Header({ onCartClick, onSearchClick }) {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const { wishlistCount } = useWishlist(); // TODO: replace with real WishlistContext when we build it

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Announcement marquee */}
      <aside className="h-9 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-space-xl text-primary font-label-code text-[0.6875rem] uppercase tracking-widest">
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center gap-space-sm">
              <span className="flex items-center gap-space-sm">
                <span>EXCLUSIVE DROPS AVAILABLE</span>
                <span className="text-outline">//</span>
                <span>ONGOING PROMO FOR NEW CUSTMOERS</span>
              </span>
              <span className="flex items-center gap-space-sm">
                <span>IBADAN // LAGOS // NATION WIDE</span>
                <span className="text-outline">//</span>
                <span>LIMITED QUANTITIES</span>
              </span>
            </span>
          ))}
        </div>
      </aside>

      {/* Sticky nav */}
      <header className="w-full bg-surface/85 backdrop-blur-xl border-b border-outline-variant/20 transition-all duration-300">
        <div className="h-20 w-full px-gutter-mobile lg:px-margin flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-lg">
            <button
              className="lg:hidden text-on-surface hover:text-primary transition-colors p-space-xs"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
            <nav className="hidden lg:flex items-center gap-space-lg font-label-caps text-[0.75rem] uppercase tracking-[0.2em]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-on-surface-variant hover:text-on-surface transition-colors py-space-xs"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="flex items-center gap-space-sm group">
                <img
                    src="/assets/logo.jpg"
                    alt="Boma LXR Logo"
                    className="h-8 w-auto object-contain rounded-full"
                // TODO: replace /assets/logo.png with your real logo file
                />
            <span className="font-headline-sm text-[1.125rem] tracking-[0.25em] font-bold text-on-surface uppercase group-hover:text-primary transition-colors">
                BOMA LXR
            </span>
            </Link>

          <div className="flex items-center gap-space-sm lg:gap-space-md">
            <button
              onClick={onSearchClick}
              className="text-on-surface-variant hover:text-primary transition-colors p-space-xs"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

<div className="relative">
  <button
    type="button"
    onClick={() => setCurrencyDropdownOpen((v) => !v)}
    className="flex items-center gap-1 bg-surface-container-low text-on-surface font-label-code text-[0.625rem] sm:text-[0.6875rem] uppercase px-space-xs sm:px-space-sm py-1 border border-outline-variant/40 rounded cursor-pointer"
  >
    {currency}
    <span className="material-symbols-outlined text-[14px]">expand_more</span>
  </button>

  {currencyDropdownOpen && (
    <>
      {/* Invisible overlay to close dropdown when tapping outside it */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setCurrencyDropdownOpen(false)}
      />

      <div className="absolute right-0 mt-space-xs w-32 bg-surface border border-outline-variant/30 rounded-md shadow-lg z-50 overflow-hidden">
        {[
          { code: "USD", label: "USD ($)" },
          { code: "NGN", label: "NGN (₦)" },
          { code: "GBP", label: "GBP (£)" },
        ].map((opt) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => {
              setCurrency(opt.code);
              setCurrencyDropdownOpen(false);
            }}
            className={`w-full text-left px-space-md py-space-sm font-body-sm text-[0.75rem] hover:bg-surface-container-low transition-colors ${
              currency === opt.code ? "text-primary" : "text-on-surface"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </>
  )}
</div>

            <button
              onClick={toggleTheme}
              className="text-on-surface-variant hover:text-primary transition-colors p-space-xs"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === "dark" ? "dark_mode" : "light_mode"}
              </span>
            </button>

            <button className="relative text-on-surface-variant hover:text-primary transition-colors p-space-xs" aria-label="Wishlist">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-surface-container-highest border border-primary text-primary font-label-code text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative text-on-surface-variant hover:text-primary transition-colors p-space-xs"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-on-primary font-label-code text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
{mobileOpen && (
  <nav className="lg:hidden flex flex-col gap-space-xs px-gutter-mobile pb-space-md font-label-caps text-[0.75rem] uppercase tracking-[0.2em]">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className="text-on-surface-variant hover:text-on-surface py-space-xs border-b border-outline-variant/20"
      >
        {link.label}
      </Link>
    ))}
  </nav>
)}
      </header>
    </div>
  );
}