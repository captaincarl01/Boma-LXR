//TODO:flip this to true once brand instragram account and real posts are ready
const SHOW_INSTRAGRAM_SECTION = false;
const INSTAGRAM_POSTS = [
  { id: 1, src: "/assets/instagram-1.jpg", alt: "Boma LXR Instagram post 1" },
  { id: 2, src: "/assets/instagram-2.jpg", alt: "Boma LXR Instagram post 2" },
  { id: 3, src: "/assets/instagram-3.jpg", alt: "Boma LXR Instagram post 3" },
  { id: 4, src: "/assets/instagram-4.jpg", alt: "Boma LXR Instagram post 4" },
  { id: 5, src: "/assets/instagram-5.jpg", alt: "Boma LXR Instagram post 5" },
  { id: 6, src: "/assets/instagram-6.jpg", alt: "Boma LXR Instagram post 6" },
  // TODO: replace with real Instagram post images, or wire up the Instagram Graph API to pull these live
];

export default function InstagramGrid() {
  if (!SHOW_INSTRAGRAM_SECTION) return null;
  return (
    <section className="w-full px-gutter-mobile lg:px-margin py-space-xl bg-surface-container-lowest">
      <div className="flex flex-col items-center text-center mb-space-lg">
        <span className="font-label-caps text-[0.75rem] tracking-[0.3em] uppercase text-primary">
          Follow Along
        </span>
        <h2 className="font-display-hero text-[1.75rem] md:text-[2.5rem] uppercase text-on-surface font-bold mt-space-xs">
          @BomaLXR
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-space-xs md:gap-space-sm">
        {INSTAGRAM_POSTS.map((post) => (
         <a 
            key={post.id}
            href="https://instagram.com/bomalxr"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={post.src}
              alt={post.alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                photo_camera
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}