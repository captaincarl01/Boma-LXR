import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedCollection from "../components/FeaturedCollection";
import LimitedDrop from "../components/LimitedDrop";
import BrandStory from "../components/BrandStory";
import LookbookPreview from "../components/LookbookPreview";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import InstagramGrid from "../components/InstagramGrid";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SearchModal from "../components/SearchModal";
import QuickViewModal from "../components/QuickViewModal";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Header onCartClick={() => setCartOpen(true)} onSearchClick={() => setSearchOpen(true)} />
      <Hero />
      <FeaturedCollection onQuickView={setQuickViewProduct} />
      <LimitedDrop />
      <BrandStory />
      <LookbookPreview />
      <WhyChooseUs />
      <Reviews />
      <InstagramGrid />
      <Newsletter />
      <Footer />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}