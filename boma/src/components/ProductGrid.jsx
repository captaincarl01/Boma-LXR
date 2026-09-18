import { PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";

function filterProducts(products, filters) {
  return products.filter((product) => {
    const matchesCategory = filters.category === "All" || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
    const matchesNew = !filters.newOnly || product.isNew;
    const matchesLimited = !filters.limitedOnly || product.isLimited;
    return matchesCategory && matchesPrice && matchesNew && matchesLimited;
  });
}

export default function ProductGrid({ filters, onQuickView }) {
  const filtered = filterProducts(PRODUCTS, filters);

  return (
    <section className="w-full px-gutter-mobile lg:px-margin py-space-xl">
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center text-center py-space-xl gap-space-sm">
          <span className="material-symbols-outlined text-outline text-[40px]">search_off</span>
          <p className="font-body-md text-[0.9375rem] text-on-surface-variant">
            No products match your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      )}
    </section>
  );
}