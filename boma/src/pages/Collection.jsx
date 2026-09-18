import { useState } from "react";
import Header from "../components/Header";
import CollectionHero from "../components/CollectionHero";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SearchModal from "../components/SearchModal";
import QuickViewModal from "../components/QuickViewModal";
// TODO: import QuickViewModal once built

export default function Collection() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: { min: 0, max: Infinity },
    newOnly: false,
    limitedOnly: false,
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Header onCartClick={() => setCartOpen(true)} onSearchClick={() => setSearchOpen(true)} />
      <CollectionHero />
      <ProductFilters filters={filters} onChange={setFilters} />
      <ProductGrid filters={filters} onQuickView={setQuickViewProduct} />
      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}