import { useState, useEffect } from "react";

// TODO: set this to your real drop end date/time
const DROP_END_DATE = new Date("2026-10-15T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = DROP_END_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

function TimerBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center bg-surface-container-low border border-outline-variant/30 rounded-lg px-space-md py-space-md min-w-[72px] md:min-w-[96px]">
      <span className="font-display-hero text-[1.75rem] md:text-[2.5rem] font-bold text-primary tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-label-code text-[0.625rem] tracking-widest uppercase text-outline mt-space-xs">
        {label}
      </span>
    </div>
  );
}

export default function LimitedDrop() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-space-xl px-gutter-mobile lg:px-margin overflow-hidden bg-surface-container-lowest">
      {/* Background image */}
      <img
        src="/assets/limited.jpeg"
        alt="Boma LXR Monolith limited drop"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        // TODO: replace with real drop campaign photography
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <span className="font-label-caps text-[0.75rem] tracking-[0.35em] uppercase text-primary mb-space-sm">
          Limited Edition
        </span>
        <h2 className="font-display-hero text-[2rem] md:text-[3rem] uppercase text-white font-bold leading-[0.95] mb-space-md">
          Sport GT3 
        </h2>
        <p className="font-body-md text-[0.9375rem] text-white/70 mb-space-lg max-w-xl">
          A limited quantity of 10units, released once.
        </p>

        {timeLeft.ended ? (
          <span className="font-headline-sm text-[1.25rem] text-primary uppercase tracking-wide">
            Drop has ended
          </span>
        ) : (
          <div className="flex items-center gap-space-sm md:gap-space-md mb-space-lg">
            <TimerBlock value={timeLeft.days} label="Days" />
            <TimerBlock value={timeLeft.hours} label="Hours" />
            <TimerBlock value={timeLeft.minutes} label="Mins" />
            <TimerBlock value={timeLeft.seconds} label="Secs" />
          </div>
        )}

        {/* Waitlist form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-center gap-space-sm w-full max-w-md"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full flex-1 px-space-md py-3 bg-surface/90 backdrop-blur-sm text-on-surface placeholder:text-outline font-body-sm text-[0.875rem] border border-outline-variant/40 focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary font-label-caps text-[0.75rem] tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </section>
  );
}