import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { useWebsiteSettings } from '@/lib/settings';

export default function AnnouncementBar() {
  const settings = useWebsiteSettings();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || settings.announcement_enabled === false) return null;

  const rawMessage = settings.announcement_message || '“Thus far the Lord has helped us” (1 Samuel 7:12) — Welcome to Rehema Mission Rwanda · Kicukiro, Kigali';
  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div className="relative bg-amber-50 text-slate-800 overflow-hidden border-b border-amber-200/80 py-2.5 select-none group">
      {/* Soft warm light shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-amber-200/30 to-amber-100/40 animate-[shimmer_7s_ease-in-out_infinite] bg-[length:200%_100%]" />

      {/* Vignette fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-amber-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-amber-50 to-transparent z-10 pointer-events-none" />

      {/* Continuous Marquee Ribbon */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center whitespace-nowrap cursor-pointer">
          {items.map((i) => (
            <div key={i} className="flex items-center gap-6 md:gap-10 px-4 md:px-8">
              <span className="inline-flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 animate-pulse" />
                <span className="font-serif italic text-amber-900 text-xs sm:text-sm font-semibold tracking-wide">
                  Ebenezer:
                </span>
                <span className="text-xs sm:text-sm tracking-[0.08em] font-medium text-slate-700">
                  {rawMessage.replace(/^[“"]?Thus far the Lord has helped us[”"]?\s*\(1 Samuel 7:12\)\s*—?\s*/i, '').trim() || rawMessage}
                </span>
              </span>
              <span className="text-amber-400 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-amber-200/50 text-amber-900 hover:bg-amber-200 transition-all"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
