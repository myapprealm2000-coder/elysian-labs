import { motion } from "motion/react";
import { useState } from "react";

const ACCENT = "#2563EB";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const FILTERS = [
  {
    id: "movie",
    label: "Movie",
    grad: "from-amber-800 to-yellow-900",
    tint: "rgba(255,200,100,0.15)",
  },
  {
    id: "retro",
    label: "Retro",
    grad: "from-yellow-800 to-orange-900",
    tint: "rgba(200,160,80,0.2)",
  },
  {
    id: "nature",
    label: "Nature",
    grad: "from-green-800 to-emerald-900",
    tint: "rgba(60,180,80,0.15)",
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    grad: "from-purple-800 to-cyan-900",
    tint: "rgba(180,60,255,0.2)",
  },
  {
    id: "anime",
    label: "Anime",
    grad: "from-pink-700 to-indigo-900",
    tint: "rgba(240,100,180,0.15)",
  },
  {
    id: "luxury",
    label: "Luxury",
    grad: "from-zinc-900 to-yellow-900",
    tint: "rgba(180,140,60,0.2)",
  },
  {
    id: "gaming",
    label: "Gaming",
    grad: "from-blue-900 to-red-900",
    tint: "rgba(40,120,255,0.15)",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    grad: "from-teal-900 to-slate-900",
    tint: "rgba(20,140,140,0.15)",
  },
];

export function FiltersPanel() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(70);
  const [applyToAll, setApplyToAll] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      data-ocid="filters_panel"
    >
      {/* Apply scope toggle */}
      <div
        className="flex items-center justify-between p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div>
          <p className="text-xs font-semibold text-white">Apply to All Clips</p>
          <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>
            Apply filter to entire video
          </p>
        </div>
        <button
          type="button"
          onClick={() => setApplyToAll(!applyToAll)}
          className="relative rounded-full transition-all"
          style={{
            background: applyToAll ? ACCENT : "rgba(255,255,255,0.12)",
            width: 40,
            height: 22,
          }}
          data-ocid="filters.apply_to_all_toggle"
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
            animate={{ left: applyToAll ? "calc(100% - 18px)" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      {/* Intensity slider — shows when a filter is active */}
      {activeFilter && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-3 rounded-xl"
          style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}40` }}
        >
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium text-white">Filter Intensity</span>
            <span style={{ color: MUTED }}>{intensity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
            style={{ accentColor: ACCENT }}
            data-ocid="filters.intensity_slider"
          />
        </motion.div>
      )}

      {/* Filter grid */}
      <p
        className="text-[10px] font-bold uppercase tracking-widest"
        style={{ color: MUTED }}
      >
        Cinematic Filters
      </p>
      <div className="grid grid-cols-2 gap-2">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.id;
          const isHovered = hoveredFilter === f.id;
          return (
            <motion.button
              key={f.id}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(isActive ? null : f.id)}
              onHoverStart={() => setHoveredFilter(f.id)}
              onHoverEnd={() => setHoveredFilter(null)}
              className="relative rounded-xl overflow-hidden group"
              style={{
                border: `1px solid ${isActive ? ACCENT : BORDER}`,
                boxShadow: isActive ? `0 0 16px ${ACCENT}50` : "none",
              }}
              data-ocid={`filters.card.${f.id}`}
            >
              <div
                className={`w-full aspect-video bg-gradient-to-br ${f.grad} relative`}
              >
                {/* Tint overlay simulating filter */}
                <div
                  className="absolute inset-0"
                  style={{ background: f.tint }}
                />
                {/* Intensity preview overlay on hover */}
                {isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[10px] font-bold text-white"
                      style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}
                    >
                      {intensity}%
                    </span>
                  </div>
                )}
              </div>
              <div
                className="px-2 py-1.5 flex items-center justify-between"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <span
                  className="text-[10px] font-medium"
                  style={{ color: isActive ? "white" : MUTED }}
                >
                  {f.label}
                </span>
                {isActive && (
                  <span
                    className="text-[8px] px-1.5 py-0.5 rounded"
                    style={{ background: ACCENT, color: "white" }}
                  >
                    ON
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
