const REVIEWS = [
  {
    id: 1,
    name: "Hamzy.",
    location: "Ibadan, Nigeria",
    rating: 5,
    text: "The Monolith hoodie is easily the best piece in my wardrobe right now. Fabric weight is unreal and the fit is exactly true to size.",
    avatar: "/assets/review-avatar-1.jpg",
  },
  {
    id: 2,
    name: "Josmah.",
    location: "Ejigbo, Nigeria",
    rating: 5,
    text: "First Nigerian streetwear brand I've ordered internationally and it didn't disappoint. Shipping was fast, packaging felt genuinely premium.",
    avatar: "/assets/review-avatar-2.jpg",
  },
  {
    id: 3,
    name: "Oja.",
    location: "Oyo, Nigeria",
    rating: 5,
    text: "Copped the bomber from Drop 03 and it sold out within hours. Glad I didn't sleep on it — quality is on par with brands twice the price.",
    avatar: "/assets/review-avatar-3.jpg",
  },
  // TODO: replace with real customer reviews, or fetch from your backend/CMS
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[16px] text-primary"
          style={i < rating ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="relative w-full px-gutter-mobile lg:px-margin py-space-xl overflow-hidden">
      {/* Ambient background image */}
      <img
        src="/assets/reviews-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        // TODO: optional ambient background photo, or remove this img entirely
      />

      <div className="relative z-10 flex flex-col items-center text-center mb-space-lg">
        <span className="font-label-caps text-[0.75rem] tracking-[0.3em] uppercase text-primary">
          Word on the Street
        </span>
        <h2 className="font-display-hero text-[1.75rem] md:text-[2.5rem] uppercase text-on-surface font-bold mt-space-xs">
          Customer Reviews
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="flex flex-col p-space-lg rounded-lg border border-outline-variant/20 bg-surface-container-low/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          >
            <StarRating rating={review.rating} />
            <p className="font-body-md text-[0.875rem] text-on-surface-variant leading-relaxed mt-space-md mb-space-lg">
              "{review.text}"
            </p>
            <div className="flex items-center gap-space-sm mt-auto">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
                // TODO: replace with real customer avatar, or use a generated initial-avatar
              />
              <div className="flex flex-col text-left">
                <span className="font-headline-sm text-[0.8125rem] text-on-surface">
                  {review.name}
                </span>
                <span className="font-label-code text-[0.6875rem] text-outline">
                  {review.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}