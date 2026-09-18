export default function BrandStory() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
{/* Image side */}
<div className="relative w-full h-[50vh] lg:h-auto min-h-[400px] overflow-hidden">
  <img
    src="/assets/story.jpeg"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
  />
  <img
    src="/assets/story.jpeg"
    alt="Boma LXR brand story — lifestyle shot"
    className="relative w-full h-full object-contain"
  />
</div>

      {/* Copy side */}
      <div className="flex flex-col justify-center px-gutter-mobile lg:px-margin py-space-xl bg-surface-container-lowest">
        <span className="font-label-caps text-[0.75rem] tracking-[0.35em] uppercase text-primary mb-space-sm">
          Our Story
        </span>
        <h2 className="font-display-hero text-[1.75rem] md:text-[2.5rem] uppercase text-on-surface font-bold leading-[0.95] mb-space-lg max-w-lg">
          Born in Ibadan.
          <br />
          Built for the World.
        </h2>

        <p className="font-body-md text-[0.9375rem] text-on-surface-variant leading-relaxed mb-space-md max-w-lg">
          Boma LXR started as a rejection of the idea that luxury streetwear
          had to look outside Africa for its identity. Every silhouette we
          cut, every fabric we choose, carries the weight of Lagos — its
          pace, its color, its confidence — reworked into something that
          holds its own on any street in the world.
        </p>

        <p className="font-body-md text-[0.9375rem] text-on-surface-variant leading-relaxed mb-space-lg max-w-lg">
          We don't chase trends. We build pieces meant to outlast them —
          premium fabric sourcing, small-batch production, and a refusal to
          compromise on how a garment is finished. This is modern African
          fashion identity, worn without apology.
        </p>

        
        <a  href="/brand-story"
          className="w-fit px-8 py-3 border border-outline-variant text-on-surface font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-colors"
        >
          Read Our Full Story
        </a>
      </div>
    </section>
  );
}