import { motion } from "motion/react";
import { useState } from "react";

const ACCENT = "#2563EB";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const VIDEO_EFFECTS = [
  {
    id: "glitch",
    label: "Glitch",
    grad: "from-red-700 via-transparent to-blue-700",
  },
  { id: "vhs", label: "VHS", grad: "from-green-800 to-gray-700" },
  {
    id: "rgb-split",
    label: "RGB Split",
    grad: "from-red-800 via-transparent to-blue-800",
  },
  {
    id: "motion-blur",
    label: "Motion Blur",
    grad: "from-slate-700 to-blue-900",
  },
  { id: "sparkles", label: "Sparkles", grad: "from-yellow-700 to-indigo-900" },
  {
    id: "film-grain",
    label: "Film Grain",
    grad: "from-amber-900 to-stone-800",
  },
  {
    id: "camera-shake",
    label: "Camera Shake",
    grad: "from-orange-900 to-zinc-800",
  },
  {
    id: "cinematic-blur",
    label: "Cinematic Blur",
    grad: "from-slate-900 to-cyan-900",
  },
  {
    id: "light-leaks",
    label: "Light Leaks",
    grad: "from-orange-600 to-yellow-900",
  },
  { id: "neon-glow", label: "Neon Glow", grad: "from-cyan-800 to-blue-900" },
  { id: "chromatic", label: "Chromatic", grad: "from-red-900 to-purple-900" },
];

const BODY_EFFECTS = [
  { id: "aura", label: "Aura", grad: "from-purple-800 to-pink-900" },
  { id: "lightning", label: "Lightning", grad: "from-yellow-600 to-blue-900" },
  {
    id: "clone-trail",
    label: "Clone Trail",
    grad: "from-cyan-900 to-slate-800",
  },
  {
    id: "motion-echo",
    label: "Motion Echo",
    grad: "from-indigo-900 to-purple-900",
  },
];

type TabId = "video" | "body" | "chroma";

export function EffectsPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("video");
  const [activeEffects, setActiveEffects] = useState<Set<string>>(new Set());
  const [chromaEnabled, setChromaEnabled] = useState(false);
  const [keyColor, setKeyColor] = useState("#00ff00");
  const [feathering, setFeathering] = useState(30);
  const [spill, setSpill] = useState(20);

  const toggleEffect = (id: string) => {
    setActiveEffects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const TABS: { id: TabId; label: string }[] = [
    { id: "video", label: "Video Effects" },
    { id: "body", label: "Body Effects" },
    { id: "chroma", label: "Chroma Key" },
  ];

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      data-ocid="effects_panel"
    >
      {/* Tabs */}
      <div
        className="flex border-b flex-shrink-0"
        style={{ borderColor: BORDER, background: "rgba(0,0,0,0.2)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-all"
            style={{
              color: activeTab === tab.id ? "white" : MUTED,
              borderBottom:
                activeTab === tab.id
                  ? `2px solid ${ACCENT}`
                  : "2px solid transparent",
            }}
            data-ocid={`effects.tab.${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "video" && (
          <div className="grid grid-cols-2 gap-2">
            {VIDEO_EFFECTS.map((fx) => (
              <motion.button
                key={fx.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleEffect(fx.id)}
                className="relative rounded-xl overflow-hidden group"
                style={{
                  border: `1px solid ${activeEffects.has(fx.id) ? ACCENT : BORDER}`,
                  boxShadow: activeEffects.has(fx.id)
                    ? `0 0 12px ${ACCENT}50`
                    : "none",
                }}
                data-ocid={`effects.video.${fx.id}`}
              >
                <div
                  className={`w-full aspect-video bg-gradient-to-br ${fx.grad}`}
                />
                <div
                  className="px-2 py-1.5"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <p
                    className="text-[10px] font-medium"
                    style={{
                      color: activeEffects.has(fx.id) ? "white" : MUTED,
                    }}
                  >
                    {fx.label}
                  </p>
                </div>
                {activeEffects.has(fx.id) && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-[8px] text-white">✓</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === "body" && (
          <div className="grid grid-cols-2 gap-2">
            {BODY_EFFECTS.map((fx) => (
              <motion.button
                key={fx.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggleEffect(fx.id)}
                className="relative rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${activeEffects.has(fx.id) ? ACCENT : BORDER}`,
                  boxShadow: activeEffects.has(fx.id)
                    ? `0 0 14px ${ACCENT}50`
                    : "none",
                }}
                data-ocid={`effects.body.${fx.id}`}
              >
                <motion.div
                  className={`w-full aspect-video bg-gradient-to-br ${fx.grad}`}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <div
                  className="px-2 py-1.5"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <p
                    className="text-[10px] font-medium"
                    style={{
                      color: activeEffects.has(fx.id) ? "white" : MUTED,
                    }}
                  >
                    {fx.label}
                  </p>
                </div>
                {activeEffects.has(fx.id) && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-[8px] text-white">✓</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {activeTab === "chroma" && (
          <div className="flex flex-col gap-4">
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <div>
                <p className="text-xs font-semibold text-white">Chroma Key</p>
                <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>
                  Remove background by color
                </p>
              </div>
              <button
                type="button"
                onClick={() => setChromaEnabled(!chromaEnabled)}
                className="w-10 h-5.5 rounded-full relative transition-all"
                style={{
                  background: chromaEnabled ? ACCENT : "rgba(255,255,255,0.12)",
                  width: 40,
                  height: 22,
                }}
                data-ocid="effects.chroma_toggle"
              >
                <motion.div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                  animate={{
                    left: chromaEnabled ? "calc(100% - 18px)" : "2px",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <div
              className="flex flex-col gap-3 p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDER}`,
                opacity: chromaEnabled ? 1 : 0.4,
              }}
            >
              <div>
                <p className="text-[10px] font-medium mb-2 text-white">
                  Key Color
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={keyColor}
                    onChange={(e) => setKeyColor(e.target.value)}
                    disabled={!chromaEnabled}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                    data-ocid="effects.chroma_color_picker"
                  />
                  <span className="text-xs font-mono text-white">
                    {keyColor.toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1.5">
                  <span style={{ color: MUTED }}>Edge Feathering</span>
                  <span style={{ color: MUTED }}>{feathering}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={feathering}
                  onChange={(e) => setFeathering(Number(e.target.value))}
                  disabled={!chromaEnabled}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{ accentColor: ACCENT }}
                  data-ocid="effects.chroma_feathering_slider"
                />
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1.5">
                  <span style={{ color: MUTED }}>Spill Suppression</span>
                  <span style={{ color: MUTED }}>{spill}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={spill}
                  onChange={(e) => setSpill(Number(e.target.value))}
                  disabled={!chromaEnabled}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{ accentColor: ACCENT }}
                  data-ocid="effects.chroma_spill_slider"
                />
              </div>
              <button
                type="button"
                disabled={!chromaEnabled}
                className="w-full py-2 rounded-lg text-xs font-semibold text-white"
                style={{ background: ACCENT, opacity: chromaEnabled ? 1 : 0.5 }}
                data-ocid="effects.chroma_preview_button"
              >
                Preview Cutout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
