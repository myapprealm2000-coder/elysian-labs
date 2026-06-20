import { Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ACCENT = "#2563EB";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const CATEGORIES = [
  "TikTok Edits",
  "YouTube Intros",
  "Gaming Montages",
  "Cinematic Reels",
  "Podcast Clips",
  "Shorts Captions",
  "Instagram Reels",
  "Viral Hooks",
];

const TEMPLATES: Record<
  string,
  { id: string; name: string; dur: string; grad: string }[]
> = {
  "TikTok Edits": [
    {
      id: "tt1",
      name: "Trending Dance",
      dur: "0:15",
      grad: "from-pink-800 to-red-900",
    },
    {
      id: "tt2",
      name: "Viral Transition",
      dur: "0:08",
      grad: "from-purple-800 to-blue-900",
    },
    {
      id: "tt3",
      name: "Aesthetic GRWM",
      dur: "0:30",
      grad: "from-rose-800 to-orange-900",
    },
    {
      id: "tt4",
      name: "POV Story",
      dur: "0:22",
      grad: "from-indigo-800 to-cyan-900",
    },
  ],
  "YouTube Intros": [
    {
      id: "yt1",
      name: "Cinematic Reveal",
      dur: "0:10",
      grad: "from-red-900 to-orange-800",
    },
    {
      id: "yt2",
      name: "Neon Logo",
      dur: "0:06",
      grad: "from-blue-800 to-cyan-700",
    },
    {
      id: "yt3",
      name: "Action Montage",
      dur: "0:12",
      grad: "from-zinc-800 to-red-900",
    },
    {
      id: "yt4",
      name: "Tutorial Opener",
      dur: "0:08",
      grad: "from-green-900 to-teal-800",
    },
  ],
  "Gaming Montages": [
    {
      id: "gm1",
      name: "Clutch Highlights",
      dur: "0:45",
      grad: "from-violet-900 to-blue-900",
    },
    {
      id: "gm2",
      name: "Kill Feed Edit",
      dur: "0:30",
      grad: "from-red-900 to-pink-800",
    },
    {
      id: "gm3",
      name: "Cyberpunk Vibes",
      dur: "1:00",
      grad: "from-cyan-900 to-purple-900",
    },
    {
      id: "gm4",
      name: "Speed Run",
      dur: "0:20",
      grad: "from-green-800 to-emerald-900",
    },
  ],
  "Cinematic Reels": [
    {
      id: "cr1",
      name: "Luxury Lifestyle",
      dur: "0:30",
      grad: "from-yellow-900 to-stone-800",
    },
    {
      id: "cr2",
      name: "Travel Story",
      dur: "0:45",
      grad: "from-sky-800 to-teal-900",
    },
    {
      id: "cr3",
      name: "Fashion Film",
      dur: "0:25",
      grad: "from-pink-900 to-fuchsia-800",
    },
    {
      id: "cr4",
      name: "Moody Portrait",
      dur: "0:15",
      grad: "from-slate-800 to-zinc-900",
    },
  ],
  "Podcast Clips": [
    {
      id: "pc1",
      name: "Quote Highlight",
      dur: "0:30",
      grad: "from-slate-700 to-blue-900",
    },
    {
      id: "pc2",
      name: "Split Screen",
      dur: "1:00",
      grad: "from-gray-800 to-slate-900",
    },
    {
      id: "pc3",
      name: "Waveform Style",
      dur: "0:45",
      grad: "from-indigo-800 to-slate-900",
    },
    {
      id: "pc4",
      name: "Talking Head",
      dur: "0:30",
      grad: "from-teal-900 to-gray-800",
    },
  ],
  "Shorts Captions": [
    {
      id: "sc1",
      name: "Bold Subtitles",
      dur: "0:60",
      grad: "from-orange-900 to-red-900",
    },
    {
      id: "sc2",
      name: "Floating Lyrics",
      dur: "0:45",
      grad: "from-purple-900 to-blue-800",
    },
    {
      id: "sc3",
      name: "Auto Captions+",
      dur: "Any",
      grad: "from-green-900 to-cyan-800",
    },
    {
      id: "sc4",
      name: "Story Time",
      dur: "0:60",
      grad: "from-pink-800 to-rose-900",
    },
  ],
  "Instagram Reels": [
    {
      id: "ir1",
      name: "Brand Showcase",
      dur: "0:15",
      grad: "from-fuchsia-900 to-pink-800",
    },
    {
      id: "ir2",
      name: "Collab Reel",
      dur: "0:30",
      grad: "from-amber-800 to-orange-900",
    },
    {
      id: "ir3",
      name: "Product Drop",
      dur: "0:10",
      grad: "from-cyan-900 to-blue-800",
    },
    {
      id: "ir4",
      name: "Mood Board",
      dur: "0:20",
      grad: "from-violet-800 to-indigo-900",
    },
  ],
  "Viral Hooks": [
    {
      id: "vh1",
      name: "Hook + CTA",
      dur: "0:15",
      grad: "from-red-800 to-pink-900",
    },
    {
      id: "vh2",
      name: "Storytime Open",
      dur: "0:20",
      grad: "from-blue-800 to-indigo-900",
    },
    {
      id: "vh3",
      name: "Tutorial Tease",
      dur: "0:10",
      grad: "from-green-800 to-teal-900",
    },
    {
      id: "vh4",
      name: "Reaction Reveal",
      dur: "0:12",
      grad: "from-yellow-800 to-orange-900",
    },
  ],
};

const RECENT = [
  {
    id: "r1",
    name: "Gaming Montage",
    dur: "0:45",
    grad: "from-violet-900 to-blue-900",
  },
  {
    id: "r2",
    name: "TikTok Transition",
    dur: "0:15",
    grad: "from-pink-800 to-purple-900",
  },
];

export function TemplatesPanel() {
  const [activeCategory, setActiveCategory] = useState("TikTok Edits");
  const templates = TEMPLATES[activeCategory] ?? [];

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      data-ocid="templates_panel"
    >
      {/* Recently used */}
      {RECENT.length > 0 && (
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: MUTED }}
          >
            Recently Used
          </p>
          <div className="flex gap-2">
            {RECENT.map((t) => (
              <motion.button
                key={t.id}
                type="button"
                whileHover={{ scale: 1.04 }}
                className={`flex-1 relative h-14 rounded-xl overflow-hidden bg-gradient-to-br ${t.grad}`}
                data-ocid={`templates.recent.${t.id}`}
              >
                <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-end p-2">
                  <p className="text-[10px] font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-[8px]" style={{ color: MUTED }}>
                    {t.dur}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className="px-2.5 py-1 rounded-full text-[10px] font-medium transition-all"
            style={{
              background:
                activeCategory === cat ? ACCENT : "rgba(255,255,255,0.06)",
              color: activeCategory === cat ? "white" : MUTED,
            }}
            data-ocid={`templates.category.${cat.toLowerCase().replace(/\s+/g, "_")}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-2 gap-2">
        {templates.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl overflow-hidden group cursor-pointer"
            style={{ border: `1px solid ${BORDER}` }}
            data-ocid={`templates.card.${t.id}`}
          >
            <div
              className={`w-full aspect-video bg-gradient-to-br ${t.grad} relative`}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white"
                  style={{ background: ACCENT }}
                >
                  Use Template
                </motion.div>
              </div>
            </div>
            <div
              className="px-2 py-1.5 flex items-center justify-between"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              <p className="text-[10px] font-medium text-white truncate">
                {t.name}
              </p>
              <span
                className="flex items-center gap-1 text-[9px] flex-shrink-0"
                style={{ color: MUTED }}
              >
                <Clock className="w-2.5 h-2.5" />
                {t.dur}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
