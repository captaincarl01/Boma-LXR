const LOOKBOOK_IMAGES = [
  { id: 1, src: "/assets/oma (10).jpeg", alt: "Monolith lookbook — look 01", size: "large" },
  { id: 2, src: "/assets/oma (11).jpeg", alt: "Monolith lookbook — look 02", size: "small" },
  { id: 3, src: "/assets/oma (16).jpeg", alt: "Monolith lookbook — look 03", size: "small" },
  { id: 4, src: "/assets/oma (13).jpeg", alt: "Monolith lookbook — look 04", size: "small" },
  { id: 5, src: "/assets/oma (14).jpeg", alt: "Monolith lookbook — look 05", size: "large" },
  { id: 6, src: "/assets/oma (15).jpeg", alt: "Monolith lookbook — look 06", size: "small" },
  // TODO: replace with real lookbook photography — keep the large/small pattern for the masonry rhythm
];

function LookbookImage({ image }) {
  const isLarge = image.size === "large";

  return (
    <div
      className={`group relative overflow-hidden rounded-lg cursor-pointer ${
        isLarge ? "row-span-2 aspect-[3/4]" : "aspect-square"
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="material-symbols-outlined text-white text-[28px]">zoom_in</span>
      </div>
    </div>
  );
}

export default function LookbookPreview() {
  return (
    <section className="w-full px-gutter-mobile lg:px-margin py-space-xl">
      <div className="flex flex-col items-center text-center mb-space-lg">
        <span className="font-label-caps text-[0.75rem] tracking-[0.3em] uppercase text-primary">
          Editorial
        </span>
        <h2 className="font-display-hero text-[1.75rem] md:text-[2.5rem] uppercase text-on-surface font-bold mt-space-xs">
          Lookbook
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-space-sm md:gap-space-md">
        {LOOKBOOK_IMAGES.map((image) => (
          <LookbookImage key={image.id} image={image} />
        ))}
      </div>

      <div className="flex justify-center mt-space-lg">
        
        <a  href="/lookbook"
          className="px-10 py-3.5 border border-outline-variant text-on-surface font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-colors"
        >
          View Lookbook
        </a>
      </div>
    </section>
  );
}