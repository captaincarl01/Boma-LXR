import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";



export default function FeaturedCollection({ onQuickView }) {
  return (
    <section className="w-full px-gutter-mobile lg:px-margin py-space-xl">
      <div className="flex items-end justify-between mb-space-lg">
        <div>
          <span className="font-label-caps text-[0.75rem] tracking-[0.3em] uppercase text-primary">
            Curated
          </span>
          <h2 className="font-display-hero text-[1.75rem] md:text-[2.5rem] uppercase text-on-surface font-bold mt-space-xs">
            Featured Collection
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        {PRODUCTS.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
        ))}
      </div>

      <div className="flex justify-center mt-space-xl">
        <Link
          
          to="/collection"
          className="px-10 py-3.5 border border-outline-variant text-on-surface font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-colors"
        >
          View Full Collection
        </Link>
      </div>
    </section>
  );
}