import { Pause, Play, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TRACKS = [
  {
    id: 1,
    name: "Energetic Beat",
    duration: "2:34",
    genre: "Hip-Hop",
    bpm: 128,
  },
  {
    id: 2,
    name: "Cinematic Drama",
    duration: "3:12",
    genre: "Cinematic",
    bpm: 90,
  },
  { id: 3, name: "Lo-Fi Chill", duration: "2:48", genre: "Lo-Fi", bpm: 78 },
  {
    id: 4,
    name: "Electronic Pulse",
    duration: "3:05",
    genre: "Electronic",
    bpm: 140,
  },
  {
    id: 5,
    name: "Epic Trailer",
    duration: "1:58",
    genre: "Cinematic",
    bpm: 110,
  },
  { id: 6, name: "Upbeat Pop", duration: "2:22", genre: "Pop", bpm: 120 },
];

const CATEGORIES = [
  "All",
  "Hip-Hop",
  "Cinematic",
  "Lo-Fi",
  "Electronic",
  "Ambient",
];

export function AudioTab() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [playing, setPlaying] = useState<number | null>(null);

  const shown = TRACKS.filter((t) => {
    const matchCat = cat === "All" || t.genre === cat;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tracks…"
          className="w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${
              cat === c
                ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto flex-1 pr-1 pb-2 flex flex-col gap-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {shown.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all"
          >
            <button
              type="button"
              aria-label={playing === t.id ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => (p === t.id ? null : t.id))}
              className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center hover:bg-blue-500/30 transition-colors shrink-0"
            >
              {playing === t.id ? (
                <Pause className="w-3 h-3 text-blue-400" />
              ) : (
                <Play className="w-3 h-3 text-blue-400" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {t.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {/* Simulated waveform */}
                <div className="flex items-end gap-0.5 h-3">
                  {[4, 7, 3, 8, 5, 9, 4, 6, 3, 7, 5, 4].map((h, idx) => (
                    <motion.div
                      key={`wf-${idx}-${h}`}
                      className="w-0.5 rounded-full"
                      style={{
                        background: playing === t.id ? "#2563eb" : "#4b5563",
                      }}
                      animate={
                        playing === t.id
                          ? {
                              height: [h * 1.2, h * 0.5, h * 1.2],
                              transition: {
                                duration: 0.5 + idx * 0.05,
                                repeat: Number.POSITIVE_INFINITY,
                              },
                            }
                          : { height: h }
                      }
                    />
                  ))}
                </div>
                <span className="text-[9px] text-muted-foreground">
                  {t.duration}
                </span>
                <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded-full text-muted-foreground">
                  {t.genre}
                </span>
              </div>
            </div>

            <button
              type="button"
              aria-label="Add track"
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 flex items-center justify-center transition-all shrink-0"
            >
              <Plus className="w-3 h-3 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
