import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your email provider / backend endpoint
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="w-full px-gutter-mobile lg:px-margin py-space-xl">
      <div className="flex flex-col items-center text-center max-w-lg mx-auto">
        <span className="font-label-caps text-[0.75rem] tracking-[0.3em] uppercase text-primary mb-space-sm">
          Stay Informed
        </span>
        <h2 className="font-display-hero text-[1.5rem] md:text-[2rem] uppercase text-on-surface font-bold mb-space-sm">
          Join the List
        </h2>
        <p className="font-body-sm text-[0.875rem] text-on-surface-variant mb-space-lg">
          Early access to drops, restocks, and archive releases — straight to your inbox.
        </p>

        {submitted ? (
          <span className="font-label-caps text-[0.8125rem] text-primary uppercase tracking-wide">
            You're on the list.
          </span>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-space-sm w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full flex-1 px-space-md py-3 bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-[0.875rem] border border-outline-variant/40 focus:border-primary focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}