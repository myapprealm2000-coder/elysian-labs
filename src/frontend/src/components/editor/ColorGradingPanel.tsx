import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { ColorGradingSettings } from "@/types/videoEditor";
import { ChevronDown, ChevronUp, RotateCcw, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CinematicPreset {
  name: string;
  gradient: string;
  values: Partial<ColorGradingSettings>;
}

interface HslColor {
  hue: number;
  saturation: number;
  luminance: number;
}

type HslColorName = "Red" | "Yellow" | "Green" | "Cyan" | "Blue" | "Magenta";
type CurveChannel = "RGB" | "Red" | "Green" | "Blue";
type LutPreset =
  | "None"
  | "Kodak"
  | "Fuji"
  | "Cinematic"
  | "Vintage"
  | "VSCO"
  | "Modern";

// ─── Constants ─────────────────────────────────────────────────────────────────

const CINEMATIC_PRESETS: CinematicPreset[] = [
  {
    name: "Film Noir",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    values: {
      contrast: 45,
      saturation: -60,
      shadows: -20,
      highlights: -15,
      fade: 15,
    },
  },
  {
    name: "Golden Hour",
    gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #e85d04 100%)",
    values: {
      exposure: 15,
      contrast: 20,
      saturation: 30,
      temperature: 40,
      highlights: 20,
    },
  },
  {
    name: "Cyberpunk",
    gradient: "linear-gradient(135deg, #00f5ff 0%, #7b2ff7 50%, #f72585 100%)",
    values: {
      saturation: 60,
      contrast: 35,
      vibrance: 50,
      temperature: -25,
      tint: 20,
    },
  },
  {
    name: "Teal & Orange",
    gradient: "linear-gradient(135deg, #0d7377 0%, #14a085 50%, #e07b39 100%)",
    values: {
      saturation: 25,
      contrast: 30,
      temperature: 20,
      vibrance: 35,
      shadows: -10,
    },
  },
  {
    name: "Bleach Bypass",
    gradient: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 50%, #bdc3c7 100%)",
    values: {
      saturation: -45,
      contrast: 55,
      fade: 25,
      highlights: -20,
      sharpen: 30,
    },
  },
];

const HSL_COLORS: { name: HslColorName; glow: string }[] = [
  { name: "Red", glow: "#ef4444" },
  { name: "Yellow", glow: "#eab308" },
  { name: "Green", glow: "#22c55e" },
  { name: "Cyan", glow: "#06b6d4" },
  { name: "Blue", glow: "#3b82f6" },
  { name: "Magenta", glow: "#d946ef" },
];

const CURVE_COLORS: Record<CurveChannel, string> = {
  RGB: "#ffffff",
  Red: "#ef4444",
  Green: "#22c55e",
  Blue: "#3b82f6",
};

const LUT_OPTIONS: LutPreset[] = [
  "None",
  "Kodak",
  "Fuji",
  "Cinematic",
  "Vintage",
  "VSCO",
  "Modern",
];

// ─── Shared Slider ─────────────────────────────────────────────────────────────

function GradingSlider({
  label,
  value,
  min,
  max,
  onChange,
  accentColor = "#2563EB",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  accentColor?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-white/50 uppercase tracking-wide font-medium">
          {label}
        </span>
        <span
          className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: value !== 0 ? accentColor : "rgba(255,255,255,0.45)",
          }}
        >
          {value > 0 ? `+${value}` : value}
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
            background: `linear-gradient(90deg, rgba(37,99,235,0.4), ${accentColor})`,
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
            background: `radial-gradient(circle, ${accentColor} 40%, #1a1a2e 100%)`,
            boxShadow: `0 0 6px 2px ${accentColor}60`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Curves Editor ─────────────────────────────────────────────────────────────

interface CurvePoint {
  x: number;
  y: number;
}

function CurvesEditor({ channel }: { channel: CurveChannel }) {
  const size = 180;
  const [points, setPoints] = useState<CurvePoint[]>([
    { x: 0, y: size },
    { x: size * 0.33, y: size * 0.65 },
    { x: size * 0.66, y: size * 0.35 },
    { x: size, y: 0 },
  ]);
  const [dragging, setDragging] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const color = CURVE_COLORS[channel];

  const getRelativePos = useCallback(
    (e: React.MouseEvent): { x: number; y: number } => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: Math.max(
          0,
          Math.min(size, (e.clientX - rect.left) * (size / rect.width)),
        ),
        y: Math.max(
          0,
          Math.min(size, (e.clientY - rect.top) * (size / rect.height)),
        ),
      };
    },
    [],
  );

  const cubicPath = () => {
    const p = points;
    if (p.length < 2) return "";
    let d = `M ${p[0].x} ${p[0].y}`;
    for (let i = 0; i < p.length - 1; i++) {
      const cp1x = p[i].x + (p[i + 1].x - p[i].x) / 3;
      const cp1y = p[i].y;
      const cp2x = p[i + 1].x - (p[i + 1].x - p[i].x) / 3;
      const cp2y = p[i + 1].y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p[i + 1].x} ${p[i + 1].y}`;
    }
    return d;
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Color curve editor"
        style={{ cursor: dragging !== null ? "grabbing" : "crosshair" }}
        onMouseMove={(e) => {
          if (dragging === null) return;
          const pos = getRelativePos(e);
          setPoints((prev) => prev.map((p, i) => (i === dragging ? pos : p)));
        }}
        onMouseUp={() => setDragging(null)}
        onMouseLeave={() => setDragging(null)}
      >
        {/* Grid */}
        {[0.25, 0.5, 0.75].map((v) => (
          <g key={v}>
            <line
              x1={v * size}
              y1={0}
              x2={v * size}
              y2={size}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <line
              x1={0}
              y1={v * size}
              x2={size}
              y2={v * size}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </g>
        ))}
        {/* Diagonal baseline */}
        <line
          x1={0}
          y1={size}
          x2={size}
          y2={0}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Curve */}
        <path
          d={cubicPath()}
          stroke={color}
          strokeWidth="2"
          fill="none"
          style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
        />
        {/* Glow fill */}
        <path
          d={`${cubicPath()} L ${size} ${size} L 0 ${size} Z`}
          fill={`${color}08`}
        />
        {/* Control points */}
        {points.map((p, i) => (
          <circle
            // biome-ignore lint/suspicious/noArrayIndexKey: stable positional points
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill={color}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1.5"
            style={{ cursor: "grab", filter: `drop-shadow(0 0 4px ${color})` }}
            onMouseDown={(e) => {
              e.preventDefault();
              setDragging(i);
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Color Wheel ───────────────────────────────────────────────────────────────

function ColorWheel({ label }: { label: string }) {
  const [dot, setDot] = useState({ x: 50, y: 50 });
  const wheelRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveDot = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const x = Math.max(
      5,
      Math.min(95, ((e.clientX - rect.left) / rect.width) * 100),
    );
    const y = Math.max(
      5,
      Math.min(95, ((e.clientY - rect.top) / rect.height) * 100),
    );
    setDot({ x, y });
  }, []);

  const offsetX = Math.round(dot.x - 50);
  const offsetY = Math.round(dot.y - 50);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        ref={wheelRef}
        className="relative w-[68px] h-[68px] rounded-full overflow-hidden cursor-crosshair select-none"
        style={{
          background:
            "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.4)",
        }}
        onMouseDown={() => {
          dragging.current = true;
        }}
        onMouseMove={moveDot}
        onMouseUp={() => {
          dragging.current = false;
        }}
        onMouseLeave={() => {
          dragging.current = false;
        }}
      >
        {/* White center gradient overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
          }}
        />
        {/* Dot indicator */}
        <div
          className="absolute w-3 h-3 rounded-full border-2 border-white shadow-lg -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            background: "rgba(0,0,0,0.6)",
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      </div>
      <span className="text-[9px] text-white/40 font-medium">{label}</span>
      <span
        className="text-[9px] font-mono"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {offsetX > 0 ? `+${offsetX}` : offsetX},
        {offsetY > 0 ? `+${offsetY}` : offsetY}
      </span>
    </div>
  );
}

// ─── Collapsible Section ─────────────────────────────────────────────────────────

function CollapsibleSection({
  label,
  open,
  onToggle,
  ocid,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  ocid: string;
  children: React.ReactNode;
}) {
  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
  };
  return (
    <div className="rounded-xl overflow-hidden" style={sectionStyle}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
        onClick={onToggle}
        data-ocid={ocid}
      >
        <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
          {label}
        </p>
        {open ? (
          <ChevronUp size={12} className="text-white/30" />
        ) : (
          <ChevronDown size={12} className="text-white/30" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function ColorGradingPanel() {
  const { colorGrading, setColorGrading } = useVideoEditorStore();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [activeHsl, setActiveHsl] = useState<HslColorName>("Red");
  const [hslValues, setHslValues] = useState<Record<HslColorName, HslColor>>({
    Red: { hue: 0, saturation: 0, luminance: 0 },
    Yellow: { hue: 0, saturation: 0, luminance: 0 },
    Green: { hue: 0, saturation: 0, luminance: 0 },
    Cyan: { hue: 0, saturation: 0, luminance: 0 },
    Blue: { hue: 0, saturation: 0, luminance: 0 },
    Magenta: { hue: 0, saturation: 0, luminance: 0 },
  });
  const [hslExpanded, setHslExpanded] = useState(false);
  const [curvesExpanded, setCurvesExpanded] = useState(false);
  const [lutPreset, setLutPreset] = useState<LutPreset>("None");
  const [lutIntensity, setLutIntensity] = useState(100);
  const [curveChannel, setCurveChannel] = useState<CurveChannel>("RGB");

  // Section collapse state — all open by default
  const [basicOpen, setBasicOpen] = useState(true);
  const [toneOpen, setToneOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [detailOpen, setDetailOpen] = useState(true);

  const updateHsl = (color: HslColorName, field: keyof HslColor, v: number) => {
    setHslValues((prev) => ({
      ...prev,
      [color]: { ...prev[color], [field]: v },
    }));
  };

  const set = (key: keyof ColorGradingSettings) => (v: number) =>
    setColorGrading({ [key]: v });

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "rgba(15,23,42,0.96)",
      }}
    >
      <div className="p-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-semibold text-white/80 uppercase tracking-widest">
            Color Grading
          </h3>
          <button
            type="button"
            onClick={() => {
              setColorGrading({
                brightness: 0,
                contrast: 0,
                saturation: 0,
                opacity: 100,
                exposure: 0,
                highlights: 0,
                shadows: 0,
                fade: 0,
                temperature: 0,
                tint: 0,
                vibrance: 0,
                blur: 0,
                sharpen: 0,
              });
            }}
            className="flex items-center gap-1 text-[10px] text-white/35 hover:text-white/70 transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.06]"
            data-ocid="color-grading.reset_button"
          >
            <RotateCcw size={10} />
            Reset All
          </button>
        </div>

        {/* Cinematic Presets */}
        <div
          className="rounded-xl p-3 space-y-2"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
            Cinematic Presets
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CINEMATIC_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setSelectedPreset(preset.name);
                  setColorGrading({
                    ...preset.values,
                  } as Partial<ColorGradingSettings>);
                }}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
                data-ocid={`color-grading.preset.${preset.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="w-[64px] h-[44px] rounded-lg transition-all"
                  style={{
                    background: preset.gradient,
                    border:
                      selectedPreset === preset.name
                        ? "2px solid #2563EB"
                        : "2px solid rgba(255,255,255,0.08)",
                    boxShadow:
                      selectedPreset === preset.name
                        ? "0 0 12px rgba(37,99,235,0.5)"
                        : undefined,
                  }}
                />
                <span
                  className="text-[9px] font-medium transition-colors"
                  style={{
                    color:
                      selectedPreset === preset.name
                        ? "#2563EB"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Basic section */}
        <CollapsibleSection
          label="Basic"
          open={basicOpen}
          onToggle={() => setBasicOpen((v) => !v)}
          ocid="color-grading.basic_toggle"
        >
          <GradingSlider
            label="Brightness"
            value={colorGrading.brightness}
            min={-100}
            max={100}
            onChange={set("brightness")}
          />
          <GradingSlider
            label="Contrast"
            value={colorGrading.contrast}
            min={-100}
            max={100}
            onChange={set("contrast")}
          />
          <GradingSlider
            label="Saturation"
            value={colorGrading.saturation}
            min={-100}
            max={100}
            onChange={set("saturation")}
          />
          <GradingSlider
            label="Opacity"
            value={colorGrading.opacity}
            min={0}
            max={100}
            onChange={set("opacity")}
          />
        </CollapsibleSection>

        {/* Tone section */}
        <CollapsibleSection
          label="Tone"
          open={toneOpen}
          onToggle={() => setToneOpen((v) => !v)}
          ocid="color-grading.tone_toggle"
        >
          <GradingSlider
            label="Exposure"
            value={colorGrading.exposure}
            min={-50}
            max={50}
            onChange={set("exposure")}
          />
          <GradingSlider
            label="Highlights"
            value={colorGrading.highlights}
            min={-50}
            max={50}
            onChange={set("highlights")}
          />
          <GradingSlider
            label="Shadows"
            value={colorGrading.shadows}
            min={-50}
            max={50}
            onChange={set("shadows")}
          />
          <GradingSlider
            label="Fade"
            value={colorGrading.fade}
            min={0}
            max={100}
            onChange={set("fade")}
          />
        </CollapsibleSection>

        {/* Color section */}
        <CollapsibleSection
          label="Color"
          open={colorOpen}
          onToggle={() => setColorOpen((v) => !v)}
          ocid="color-grading.color_toggle"
        >
          <GradingSlider
            label="Temperature"
            value={colorGrading.temperature}
            min={-50}
            max={50}
            onChange={set("temperature")}
          />
          <GradingSlider
            label="Tint"
            value={colorGrading.tint}
            min={-50}
            max={50}
            onChange={set("tint")}
          />
          <GradingSlider
            label="Vibrance"
            value={colorGrading.vibrance}
            min={-50}
            max={50}
            onChange={set("vibrance")}
          />
        </CollapsibleSection>

        {/* Detail section */}
        <CollapsibleSection
          label="Detail"
          open={detailOpen}
          onToggle={() => setDetailOpen((v) => !v)}
          ocid="color-grading.detail_toggle"
        >
          <GradingSlider
            label="Blur"
            value={colorGrading.blur}
            min={0}
            max={30}
            onChange={set("blur")}
          />
          <GradingSlider
            label="Sharpen"
            value={colorGrading.sharpen}
            min={0}
            max={100}
            onChange={set("sharpen")}
          />
        </CollapsibleSection>

        {/* HSL Panel */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
            onClick={() => setHslExpanded((v) => !v)}
            data-ocid="color-grading.hsl_toggle"
          >
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
              HSL / Color
            </p>
            {hslExpanded ? (
              <ChevronUp size={12} className="text-white/30" />
            ) : (
              <ChevronDown size={12} className="text-white/30" />
            )}
          </button>
          <AnimatePresence>
            {hslExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-3 space-y-3">
                  <div className="flex gap-1">
                    {HSL_COLORS.map(({ name, glow }) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setActiveHsl(name)}
                        className="flex-1 py-1 rounded-lg text-[9px] font-semibold transition-all"
                        style={{
                          background:
                            activeHsl === name
                              ? `${glow}22`
                              : "rgba(255,255,255,0.03)",
                          border: `1px solid ${
                            activeHsl === name ? glow : "rgba(255,255,255,0.08)"
                          }`,
                          color:
                            activeHsl === name ? glow : "rgba(255,255,255,0.4)",
                          boxShadow:
                            activeHsl === name
                              ? `0 0 8px ${glow}40`
                              : undefined,
                        }}
                        data-ocid={`color-grading.hsl-tab.${name.toLowerCase()}`}
                      >
                        {name.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                  <GradingSlider
                    label="Hue"
                    value={hslValues[activeHsl].hue}
                    min={-180}
                    max={180}
                    onChange={(v) => updateHsl(activeHsl, "hue", v)}
                    accentColor={
                      HSL_COLORS.find((c) => c.name === activeHsl)?.glow ??
                      "#2563EB"
                    }
                  />
                  <GradingSlider
                    label="Saturation"
                    value={hslValues[activeHsl].saturation}
                    min={-100}
                    max={100}
                    onChange={(v) => updateHsl(activeHsl, "saturation", v)}
                    accentColor={
                      HSL_COLORS.find((c) => c.name === activeHsl)?.glow ??
                      "#2563EB"
                    }
                  />
                  <GradingSlider
                    label="Luminance"
                    value={hslValues[activeHsl].luminance}
                    min={-100}
                    max={100}
                    onChange={(v) => updateHsl(activeHsl, "luminance", v)}
                    accentColor={
                      HSL_COLORS.find((c) => c.name === activeHsl)?.glow ??
                      "#2563EB"
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LUT Presets */}
        <div
          className="rounded-xl p-3 space-y-2.5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
            LUT Presets
          </p>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <select
                value={lutPreset}
                onChange={(e) => setLutPreset(e.target.value as LutPreset)}
                className="w-full h-8 rounded-lg px-2 text-[11px] text-white/70 appearance-none cursor-pointer outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                data-ocid="color-grading.lut_select"
              >
                {LUT_OPTIONS.map((lut) => (
                  <option
                    key={lut}
                    value={lut}
                    style={{ background: "#0F172A" }}
                  >
                    {lut}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={10}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-[10px] text-white/50 hover:text-white/80 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              data-ocid="color-grading.import_lut"
              onClick={() => document.getElementById("lut-file-input")?.click()}
            >
              <Upload size={10} /> Import
            </button>
            <input
              id="lut-file-input"
              type="file"
              accept=".cube,.3dl"
              className="hidden"
            />
          </div>
          <GradingSlider
            label="LUT Intensity"
            value={lutIntensity}
            min={0}
            max={100}
            onChange={setLutIntensity}
          />
        </div>

        {/* Curves Editor */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.04] transition-colors"
            onClick={() => setCurvesExpanded((v) => !v)}
            data-ocid="color-grading.curves_toggle"
          >
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
              Curves
            </p>
            {curvesExpanded ? (
              <ChevronUp size={12} className="text-white/30" />
            ) : (
              <ChevronDown size={12} className="text-white/30" />
            )}
          </button>
          <AnimatePresence>
            {curvesExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-3 space-y-2">
                  <div className="flex gap-1">
                    {(["RGB", "Red", "Green", "Blue"] as CurveChannel[]).map(
                      (ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setCurveChannel(ch)}
                          className="flex-1 py-1 rounded-lg text-[9px] font-semibold transition-all"
                          style={{
                            background:
                              curveChannel === ch
                                ? `${CURVE_COLORS[ch]}22`
                                : "rgba(255,255,255,0.03)",
                            border: `1px solid ${
                              curveChannel === ch
                                ? CURVE_COLORS[ch]
                                : "rgba(255,255,255,0.08)"
                            }`,
                            color:
                              curveChannel === ch
                                ? CURVE_COLORS[ch]
                                : "rgba(255,255,255,0.4)",
                          }}
                          data-ocid={`color-grading.curve-tab.${ch.toLowerCase()}`}
                        >
                          {ch}
                        </button>
                      ),
                    )}
                  </div>
                  <CurvesEditor channel={curveChannel} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RGB Color Wheels */}
        <div
          className="rounded-xl p-3 space-y-2"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">
            Color Wheels
          </p>
          <div className="flex justify-around py-1">
            <ColorWheel label="Shadows" />
            <ColorWheel label="Midtones" />
            <ColorWheel label="Highlights" />
          </div>
        </div>
      </div>
    </div>
  );
}
