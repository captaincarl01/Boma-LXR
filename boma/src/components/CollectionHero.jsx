import { useState, useEffect } from "react";

const COLLECTION_SLIDES = [
  { src: "/assets/col1.jpeg", alt: "Boma LXR Collection banner 1" },
  { src: "/assets/col2.jpeg", alt: "Boma LXR Collection banner 2" },
  { src: "/assets/col3.jpeg", alt: "Boma LXR Collection banner 3" },
  { src: "/assets/col4.jpeg", alt: "Boma LXR Collection banner 4" },
  { src: "/assets/col5.jpeg", alt: "Boma LXR Collection banner 5" },
  // TODO: replace with real collection/campaign photography, 2–4 slides is enough for a banner
];

export default function CollectionHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % COLLECTION_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[35vh] md:h-[45vh] mt-[116px] overflow-hidden">
      {COLLECTION_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
          />
          <img
            src={slide.src}
            alt={slide.alt}
            className="relative w-full h-full object-contain"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-gutter-mobile">
        <span className="font-label-caps text-[0.75rem] tracking-[0.35em] uppercase text-primary mb-space-sm">
          Shop All
        </span>
        <h1 className="font-display-hero text-[2rem] md:text-[3rem] uppercase text-white font-bold leading-[0.95] mb-space-sm">
          Boma LXR Collection
        </h1>
        <p className="font-body-md text-[0.9375rem] text-white/80 max-w-xl mx-auto">
          Explore premium streetwear crafted for bold identities.
        </p>
      </div>
    </section>
  );
}