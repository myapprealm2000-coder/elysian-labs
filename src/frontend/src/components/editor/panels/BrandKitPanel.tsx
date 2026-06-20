import { Droplets, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const BRAND_COLORS = [
  { hex: "#0047AB", label: "Cobalt" },
  { hex: "#00FF00", label: "Cyber Lime" },
  { hex: "#50C878", label: "Emerald" },
  { hex: "#101820", label: "Matte Black" },
];

const BRAND_FONTS = [
  {
    name: "Plus Jakarta Sans",
    sample: "Aa Bb Cc",
    style: { fontFamily: "Plus Jakarta Sans, sans-serif" },
  },
  {
    name: "Inter",
    sample: "Aa Bb Cc",
    style: { fontFamily: "Inter, sans-serif" },
  },
];

const BRAND_PRESETS = [
  {
    id: "default",
    label: "Elysian Default",
    grad: "from-blue-900 to-emerald-900",
  },
  { id: "dark", label: "Dark Mode", grad: "from-zinc-900 to-slate-900" },
  { id: "neon", label: "Neon Night", grad: "from-cyan-900 to-purple-900" },
];

export function BrandKitPanel() {
  const [customColors, setCustomColors] = useState<
    { hex: string; label: string }[]
  >([]);
  const [newColor, setNewColor] = useState("#ffffff");
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  const [activePreset, setActivePreset] = useState("default");

  const addColor = () => {
    setCustomColors((prev) => [...prev, { hex: newColor, label: "Custom" }]);
  };

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      data-ocid="brand_kit_panel"
    >
      {/* Logo & Identity */}
      <div
        className="p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ color: MUTED }}
        >
          Brand Identity
        </p>
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0047ab, #50c878)" }}
          >
            <span className="text-2xl font-black text-white">E</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Elysian Labs</p>
            <p className="text-[10px]" style={{ color: MUTED }}>
              Creative Platform
            </p>
            <p
              className="text-[9px] mt-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              elysian.ai
            </p>
          </div>
        </div>
      </div>

      {/* Brand colors */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Brand Colors
        </p>
        <div className="grid grid-cols-4 gap-2">
          {BRAND_COLORS.map((c) => (
            <motion.button
              key={c.hex}
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 group"
              data-ocid={`brand.color.${c.label.toLowerCase().replace(/\s/g, "_")}`}
            >
              <div
                className="w-full aspect-square rounded-xl border-2 border-transparent group-hover:border-white/30 transition-all"
                style={{ background: c.hex }}
              />
              <span className="text-[9px] text-center" style={{ color: MUTED }}>
                {c.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Custom Colors
        </p>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {customColors.map((c, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable color slots
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-full aspect-square rounded-xl"
                style={{ background: c.hex }}
              />
              <span className="text-[9px]" style={{ color: MUTED }}>
                Custom
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                data-ocid="brand.custom_color_picker"
              />
            </div>
            <button
              type="button"
              onClick={addColor}
              className="flex items-center gap-1 text-[9px] font-medium transition-all hover:text-white"
              style={{ color: MUTED }}
              data-ocid="brand.add_color_button"
            >
              <Plus className="w-2.5 h-2.5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Brand fonts */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Brand Fonts
        </p>
        <div className="flex flex-col gap-2">
          {BRAND_FONTS.map((font) => (
            <div
              key={font.name}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <div>
                <p
                  className="text-xs font-medium text-white"
                  style={font.style}
                >
                  {font.sample}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>
                  {font.name}
                </p>
              </div>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all hover:brightness-110"
                style={{ background: `${ACCENT}20`, color: ACCENT }}
                data-ocid={`brand.font.${font.name.toLowerCase().replace(/\s/g, "_")}`}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div
        className="flex items-center justify-between p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" style={{ color: ACCENT }} />
          <div>
            <p className="text-xs font-semibold text-white">
              Elysian Watermark
            </p>
            <p className="text-[10px]" style={{ color: MUTED }}>
              Add logo to exported videos
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setWatermarkEnabled(!watermarkEnabled)}
          className="relative rounded-full"
          style={{
            background: watermarkEnabled ? ACCENT : "rgba(255,255,255,0.12)",
            width: 40,
            height: 22,
          }}
          data-ocid="brand.watermark_toggle"
        >
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
            animate={{ left: watermarkEnabled ? "calc(100% - 18px)" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      {/* Brand presets */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Brand Presets
        </p>
        <div className="flex flex-col gap-2">
          {BRAND_PRESETS.map((preset) => (
            <motion.button
              key={preset.id}
              type="button"
              whileHover={{ x: 3 }}
              onClick={() => setActivePreset(preset.id)}
              className="flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{
                background:
                  activePreset === preset.id
                    ? `${ACCENT}15`
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${activePreset === preset.id ? ACCENT : BORDER}`,
              }}
              data-ocid={`brand.preset.${preset.id}`}
            >
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${preset.grad}`}
              />
              <span
                className="text-xs font-medium"
                style={{ color: activePreset === preset.id ? "white" : MUTED }}
              >
                {preset.label}
              </span>
              {activePreset === preset.id && (
                <span
                  className="ml-auto text-[9px] font-bold"
                  style={{ color: GREEN }}
                >
                  ACTIVE
                </span>
              )}
            </motion.button>
          ))}
          <button
            type="button"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-xl border-2 border-dashed text-xs font-medium transition-all hover:border-blue-500/60"
            style={{ borderColor: BORDER, color: MUTED }}
            data-ocid="brand.save_preset_button"
          >
            <Plus className="w-3.5 h-3.5" />
            Save Current Style as Preset
          </button>
        </div>
      </div>
    </div>
  );
}
