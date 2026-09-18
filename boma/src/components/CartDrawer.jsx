import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeFromCart, updateQuantity, cartTotal, getWhatsAppCheckoutLink, getCartItemId } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-surface flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-space-md py-space-md border-b border-outline-variant/20">
          <h3 className="font-headline-sm text-[1.125rem] uppercase text-on-surface">
            Your Bag ({items.length})
          </h3>
          <button onClick={onClose} aria-label="Close cart" className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-space-md py-space-md flex flex-col gap-space-md">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[40px]">shopping_bag</span>
              <p className="font-body-sm text-[0.875rem] text-on-surface-variant">Your bag is empty.</p>
            </div>
          ) : (
            items.map((item) => {
              const cartItemId = getCartItemId(item);
              const variant = [item.selectedSize, item.selectedColor].filter(Boolean).join(" / ");

              return (
                <div key={cartItemId} className="flex gap-space-sm border-b border-outline-variant/10 pb-space-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md bg-surface-container"
                  />
                  <div className="flex-1 flex flex-col">
                    <span className="font-headline-sm text-[0.875rem] text-on-surface">{item.name}</span>

                    {variant && (
                      <span className="font-label-code text-[0.6875rem] text-outline mt-space-xs">
                        {variant}
                      </span>
                    )}

                    <span className="font-body-sm text-[0.8125rem] text-primary mt-space-xs">
                      {formatPrice(item.price)}
                    </span>

                    <div className="flex items-center gap-space-sm mt-space-sm">
                      <button
                        onClick={() => updateQuantity(cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-outline-variant/40 text-on-surface hover:border-primary transition-colors"
                      >
                        −
                      </button>
                      <span className="font-body-sm text-[0.8125rem] text-on-surface w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-outline-variant/40 text-on-surface hover:border-primary transition-colors"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(cartItemId)}
                        className="ml-auto text-on-surface-variant hover:text-error transition-colors"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="px-space-md py-space-md border-t border-outline-variant/20 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[0.8125rem] uppercase text-on-surface-variant">Total</span>
              <span className="font-headline-sm text-[1.125rem] text-primary">{formatPrice(cartTotal)}</span>
            </div>

            <a
              href={getWhatsAppCheckoutLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-space-sm py-3.5 bg-[#25D366] text-white font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:bg-[#1ebe5a] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Checkout via WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}