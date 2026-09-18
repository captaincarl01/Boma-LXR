import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  Shop: ["All Products", "New Arrivals", "Limited Drops", "Hoodies", "Jackets"],
  Brand: ["Our Story", "Lookbook", "Sustainability", "Careers"],
  Support: ["Contact Us", "Shipping & Returns", "Size Guide", "FAQs"],
};

const SOCIAL_LINKS = [
  { label: "Instagram", icon: "photo_camera", href: "https://instagram.com/bomalxr" },
  { label: "TikTok", icon: "music_note", href: "https://tiktok.com/@bomalxr" },
  { label: "WhatsApp", icon: "chat", href: "https://wa.me/2348181261072" },
  // TODO: replace with real social/contact links
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 px-gutter-mobile lg:px-margin pt-space-xl pb-space-lg">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-xl">
        {/* Logo + blurb */}
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" 
                className="flex items-center gap-space-sm mb-space-md">
            <img
              src="/assets/logo.jpg"
              alt="Boma LXR Logo"
              className="h-7 w-auto object-contain"
              // TODO: replace /assets/logo.png with your real logo file
            />
            <span className="font-headline-sm text-[1rem] tracking-[0.25em] font-bold text-on-surface uppercase">
              BOMA LXR
            </span>
          </Link>
          <p className="font-body-sm text-[0.8125rem] text-on-surface-variant leading-relaxed max-w-xs">
            Luxury Nigerian streetwear. Born in Ibadan, built for the world.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="flex flex-col">
            <h4 className="font-label-caps text-[0.75rem] tracking-[0.2em] uppercase text-on-surface mb-space-sm">
              {heading}
            </h4>
            <ul className="flex flex-col gap-space-xs">
              {links.map((link) => (
                <li key={link}>
                  
                <a    href="#"
                    className="font-body-sm text-[0.8125rem] text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-lg border-t border-outline-variant/20">
        <span className="font-body-sm text-[0.75rem] text-outline">
          © {year} Boma LXR. All rights reserved.
        </span>

        <div className="flex items-center gap-space-md">
          {SOCIAL_LINKS.map((social) => (
            
            <a  key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}