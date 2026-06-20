import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { ColorGradingSettings, SidebarSection } from "@/types/videoEditor";
import { DEFAULT_COLOR_GRADING } from "@/types/videoEditor";
import { RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";

// ─── Presets ──────────────────────────────────────────────────────────────────

interface ColorPreset {
  name: string;
  gradient: string;
  values: Partial<ColorGradingSettings>;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "Original",
    gradient: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    values: { ...DEFAULT_COLOR_GRADING },
  },
  {
    name: "Cinematic",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)",
    values: {
      brightness: -10,
      contrast: 20,
      saturation: -15,
      fade: 10,
      temperature: -5,
    },
  },
  {
    name: "Warm",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #dc2626 100%)",
    values: { temperature: 25, saturation: 15, brightness: 5 },
  },
  {
    name: "Cool",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    values: { temperature: -25, saturation: 5, tint: 10 },
  },
  {
    name: "Vintage",
    gradient: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
    values: { saturation: -40, contrast: 20, fade: 25, brightness: -5 },
  },
  {
    name: "B&W",
    gradient: "linear-gradient(135deg, #111827 0%, #6b7280 50%, #f3f4f6 100%)",
    values: { saturation: -100, contrast: 15 },
  },
];

// ─── Video Effect Presets ─────────────────────────────────────────────────────

interface VideoEffect {
  name: string;
  gradient: string;
  values: Partial<ColorGradingSettings>;
}

const VIDEO_EFFECTS: VideoEffect[] = [
  {
    name: "Glitch",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    values: { saturation: 60, contrast: 40, tint: 20 },
  },
  {
    name: "VHS",
    gradient: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
    values: { saturation: -20, contrast: 15, fade: 20, blur: 0.5 },
  },
  {
    name: "RGB Split",
    gradient: "linear-gradient(135deg, #ef4444 0%, #22c55e 50%, #3b82f6 100%)",
    values: { saturation: 80, contrast: 30, temperature: -10 },
  },
  {
    name: "Motion Blur",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    values: { blur: 3, brightness: 5 },
  },
  {
    name: "Film Grain",
    gradient: "linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)",
    values: { saturation: -15, contrast: 25, fade: 12, brightness: -8 },
  },
  {
    name: "Neon Glow",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #ec4899 100%)",
    values: { saturation: 70, contrast: 35, vibrance: 50, temperature: -15 },
  },
];

// ─── Transitions ─────────────────────────────────────────────────────────────

const TRANSITIONS = [
  { name: "Dissolve" },
  { name: "Zoom Blur" },
  { name: "Rotate" },
  { name: "Flash" },
  { name: "Warp" },
  { name: "Swipe" },
];

// ─── Stickers ─────────────────────────────────────────────────────────────────

const STICKERS = [
  "🔥",
  "💥",
  "⚡",
  "✨",
  "🎯",
  "💎",
  "🚀",
  "🎬",
  "📸",
  "🎵",
  "💡",
  "🏆",
];

// ─── Slider component ─────────────────────────────────────────────────────────

function EffectSlider({
  label,
  value,
  min,
  max,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const range = max - min;
  const pct = ((value - min) / range) * 100;
  const isChanged = value !== 0;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-white/50 uppercase tracking-wide font-medium">
          {label}
        </span>
        <span
          className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded min-w-[36px] text-right"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: isChanged ? "#2563EB" : "rgba(255,255,255,0.35)",
          }}
        >
          {value > 0 ? `+${value}` : value}
          {unit}
        </span>
      </div>
      <div
        className="relative h-[3px] rounded-full"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: isChanged
              ? "linear-gradient(90deg, rgba(37,99,235,0.4), #2563EB)"
              : "rgba(255,255,255,0.15)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          style={{ WebkitAppearance: "none" }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg pointer-events-none"
          style={{
            left: `calc(${pct}% - 6px)`,
            background: isChanged
              ? "radial-gradient(circle, #2563EB 40%, #1a1a2e 100%)"
              : "rgba(255,255,255,0.6)",
            boxShadow: isChanged ? "0 0 6px 2px rgba(37,99,235,0.5)" : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30 mb-2">
      {children}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EffectsPanelSection({ section }: { section: SidebarSection }) {
  const { colorGrading, setColorGrading, resetColorGrading } =
    useVideoEditorStore();
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  const set = (key: keyof ColorGradingSettings) => (v: number) =>
    setColorGrading({ [key]: v });

  const handleReset = () => {
    if (resetConfirm) {
      resetColorGrading();
      setActiveEffect(null);
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 2000);
    }
  };

  const applyPreset = (preset: ColorPreset) => {
    resetColorGrading();
    setColorGrading(preset.values);
    setActiveEffect(preset.name);
  };

  const applyVideoEffect = (effect: VideoEffect) => {
    setColorGrading(effect.values);
    setActiveEffect(effect.name);
  };

  // ── Stickers tab ────────────────────────────────────────────────────────────
  if (section === "stickers") {
    return (
      <div className="p-4">
        <SectionHeader>Stickers & Emojis</SectionHeader>
        <div className="grid grid-cols-5 gap-2">
          {STICKERS.map((s) => (
            <button
              key={s}
              type="button"
              className="aspect-square flex items-center justify-center text-2xl rounded-xl transition-all hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              data-ocid={`effects.sticker.${s}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Transitions tab ──────────────────────────────────────────────────────────
  if (section === "transitions") {
    return (
      <div className="p-4">
        <SectionHeader>Transitions</SectionHeader>
        <div className="grid grid-cols-2 gap-2">
          {TRANSITIONS.map((t) => (
            <button
              key={t.name}
              type="button"
              className="flex items-center justify-center p-3 rounded-xl text-[11px] font-medium text-white/60 hover:text-white transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(37,99,235,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(37,99,235,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.06)";
              }}
              data-ocid={`effects.transition.${t.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Effects tab (main) ───────────────────────────────────────────────────────
  return (
    <div className="p-4 space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Preset grid */}
      <div>
        <SectionHeader>Color Presets</SectionHeader>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isActive = activeEffect === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="flex flex-col items-center gap-1.5 group"
                data-ocid={`effects.preset.${preset.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                <div
                  className="w-full h-10 rounded-lg transition-all"
                  style={{
                    background: preset.gradient,
                    border: isActive
                      ? "2px solid #2563EB"
                      : "2px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(37,99,235,0.4)"
                      : undefined,
                  }}
                />
                <span
                  className="text-[9px] font-medium transition-colors"
                  style={{
                    color: isActive ? "#2563EB" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color & Lighting sliders */}
      <div>
        <SectionHeader>Color & Lighting</SectionHeader>
        <div className="space-y-3">
          <EffectSlider
            label="Brightness"
            value={colorGrading.brightness}
            min={-100}
            max={100}
            onChange={set("brightness")}
          />
          <EffectSlider
            label="Contrast"
            value={colorGrading.contrast}
            min={-100}
            max={100}
            onChange={set("contrast")}
          />
          <EffectSlider
            label="Saturation"
            value={colorGrading.saturation}
            min={-100}
            max={100}
            onChange={set("saturation")}
          />
          <EffectSlider
            label="Exposure"
            value={colorGrading.exposure}
            min={-50}
            max={50}
            onChange={set("exposure")}
          />
          <EffectSlider
            label="Highlights"
            value={colorGrading.highlights}
            min={-50}
            max={50}
            onChange={set("highlights")}
          />
          <EffectSlider
            label="Shadows"
            value={colorGrading.shadows}
            min={-50}
            max={50}
            onChange={set("shadows")}
          />
          <EffectSlider
            label="Temperature"
            value={colorGrading.temperature}
            min={-50}
            max={50}
            onChange={set("temperature")}
          />
          <EffectSlider
            label="Tint"
            value={colorGrading.tint}
            min={-50}
            max={50}
            onChange={set("tint")}
          />
          <EffectSlider
            label="Vibrance"
            value={colorGrading.vibrance}
            min={-50}
            max={50}
            onChange={set("vibrance")}
          />
          <EffectSlider
            label="Fade"
            value={colorGrading.fade}
            min={0}
            max={100}
            onChange={set("fade")}
          />
        </div>
      </div>

      {/* Transform sliders */}
      <div>
        <SectionHeader>Transform</SectionHeader>
        <div className="space-y-3">
          <EffectSlider
            label="Blur"
            value={colorGrading.blur}
            min={0}
            max={30}
            unit="px"
            onChange={set("blur")}
          />
          <EffectSlider
            label="Opacity"
            value={colorGrading.opacity}
            min={0}
            max={100}
            unit="%"
            onChange={set("opacity")}
          />
          <EffectSlider
            label="Sharpen"
            value={colorGrading.sharpen}
            min={0}
            max={100}
            onChange={set("sharpen")}
          />
        </div>
      </div>

      {/* Video Effect Presets */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={10} className="text-white/30" />
          <SectionHeader>Video Effects</SectionHeader>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {VIDEO_EFFECTS.map((effect) => {
            const isActive = activeEffect === effect.name;
            return (
              <button
                key={effect.name}
                type="button"
                onClick={() => applyVideoEffect(effect)}
                className="flex flex-col items-center gap-1.5"
                data-ocid={`effects.video-effect.${effect.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="w-full h-10 rounded-lg transition-all"
                  style={{
                    background: effect.gradient,
                    border: isActive
                      ? "2px solid #22C55E"
                      : "2px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(34,197,94,0.4)"
                      : undefined,
                  }}
                />
                <span
                  className="text-[9px] font-medium"
                  style={{
                    color: isActive ? "#22C55E" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {effect.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset button */}
      <button
        type="button"
        onClick={handleReset}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-semibold transition-all"
        style={{
          background: resetConfirm
            ? "rgba(239,68,68,0.15)"
            : "rgba(255,255,255,0.04)",
          border: resetConfirm
            ? "1px solid rgba(239,68,68,0.4)"
            : "1px solid rgba(255,255,255,0.08)",
          color: resetConfirm ? "#ef4444" : "rgba(255,255,255,0.4)",
        }}
        data-ocid="effects.reset_button"
      >
        <RotateCcw size={12} />
        {resetConfirm ? "Confirm Reset?" : "Reset All Effects"}
      </button>
    </div>
  );
}
