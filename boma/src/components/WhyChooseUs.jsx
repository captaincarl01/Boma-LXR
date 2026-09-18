const FEATURES = [
  {
    id: 1,
    icon: "texture",
    title: "Premium Fabric",
    description: "Sourced from mills that meet our standard for weight, drape, and durability — nothing runs to production without passing that bar.",
  },
  {
    id: 2,
    icon: "hourglass_top",
    title: "Limited Drops",
    description: "Every collection is produced in small, fixed quantities. Once a drop sells out, it doesn't come back.",
  },
  {
    id: 3,
    icon: "verified",
    title: "Luxury Quality",
    description: "Cut, sewn, and finished to a standard that holds up next to any international streetwear house.",
  },
  {
    id: 4,
    icon: "bolt",
    title: "Streetwear Identity",
    description: "Rooted in Lagos culture and built for the street — not a diluted version of someone else's aesthetic.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full px-gutter-mobile lg:px-margin py-space-xl bg-surface-container-lowest">
      <div className="flex flex-col items-center text-center mb-space-lg">
        <span className="font-label-caps text-[0.75rem] tracking-[0.3em] uppercase text-primary">
          The Standard
        </span>
        <h2 className="font-display-hero text-[1.75rem] md:text-[2.5rem] uppercase text-on-surface font-bold mt-space-xs">
          Why Choose Boma LXR
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {FEATURES.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center p-space-lg bg-surface-container-low border border-outline-variant/20 rounded-lg hover:border-primary/50 transition-colors duration-300"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 border border-primary/30 mb-space-md">
              <span className="material-symbols-outlined text-primary text-[26px]">
                {feature.icon}
              </span>
            </div>
            <h3 className="font-headline-sm text-[1rem] text-on-surface uppercase tracking-wide mb-space-xs">
              {feature.title}
            </h3>
            <p className="font-body-sm text-[0.8125rem] text-on-surface-variant leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}