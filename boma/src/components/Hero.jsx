import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  { src: "/assets/slide (2).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 1" },
  { src: "/assets/slide (3).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/slide (4).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  { src: "/assets/slide (5).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/drop1 (3).jpeg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  { src: "/assets/slide (7).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/slide (8).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  { src: "/assets/slide (9).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/slide (10).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  { src: "/assets/slide (11).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/slide (12).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  { src: "/assets/slide (13).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/slide (14).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  { src: "/assets/slide (15).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 2" },
  { src: "/assets/slide (1).jpg", alt: "Boma LXR — Monolith Collection lookbook shot 3" },
  // TODO: replace with your real hero photography, keep 3–5 slides for a clean rotation
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[55vh] md:h-[65vh] lg:h-[70vh] mt-[116px] overflow-hidden">
      {/* Slideshow images — full width & height of the hero container */}
{SLIDES.map((slide, index) => (
  <div
    key={slide.src}
    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
      index === activeSlide ? "opacity-100" : "opacity-0"
    }`}
  >
    {/* Blurred backdrop fills any empty space */}
    <img
      src={slide.src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
    />
    {/* Full image, never cropped */}
    <img
      src={slide.src}
      alt={slide.alt}
      className="relative w-full h-full object-contain"
    />
  </div>
))}

      {/* Dark luxury overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-gutter-mobile">
        <span className="font-label-caps text-[0.75rem] tracking-[0.35em] uppercase text-primary mb-space-md">
          Boma LXR
        </span>
        <h1 className="font-display-hero text-[2.25rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.95] uppercase text-white font-bold tracking-tight max-w-4xl">
          Luxury Streetwear.
          <br />
          Bold Identity.
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-space-md mt-space-lg">
          
          <Link
            to="/collection"
            className="px-8 py-3 bg-primary text-on-primary font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
          >
            Discover Collection
          </Link>
          
         <Link   to="/collection?filter=new"
            className="px-8 py-3 border border-white/60 text-white font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-space-lg left-1/2 -translate-x-1/2 z-10 flex gap-space-sm">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeSlide ? "w-8 bg-primary" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-space-lg right-gutter-mobile z-10 hidden md:flex flex-col items-center gap-space-xs animate-bounce">
        <span className="font-label-code text-[0.625rem] tracking-widest uppercase text-white/70 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="material-symbols-outlined text-white/70 text-[16px]">arrow_downward</span>
      </div>
    </section>
  );
}