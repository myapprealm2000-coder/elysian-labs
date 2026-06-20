import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { ColorGradingSettings } from "@/types/videoEditor";

type GradingKey = keyof ColorGradingSettings;

const SLIDERS: { key: GradingKey; label: string; min: number; max: number }[] =
  [
    { key: "exposure", label: "Exposure", min: -100, max: 100 },
    { key: "contrast", label: "Contrast", min: -100, max: 100 },
    { key: "saturation", label: "Saturation", min: -100, max: 100 },
    { key: "highlights", label: "Highlights", min: -100, max: 100 },
    { key: "shadows", label: "Shadows", min: -100, max: 100 },
    { key: "temperature", label: "Temperature", min: -100, max: 100 },
    { key: "tint", label: "Tint", min: -100, max: 100 },
    { key: "vibrance", label: "Vibrance", min: -100, max: 100 },
    { key: "sharpen", label: "Sharpen", min: 0, max: 100 },
    { key: "fade", label: "Fade", min: 0, max: 100 },
  ];

export function ColorGradingSection() {
  const { colorGrading, setColorGrading } = useVideoEditorStore();

  return (
    <div className="p-4 flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">
        Color Grading
      </p>
      {SLIDERS.map(({ key, label, min, max }) => (
        <div key={key}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white/50">{label}</span>
            <span
              className="text-[10px] font-mono"
              style={{
                color:
                  colorGrading[key] !== 0 ? "#2563EB" : "rgba(255,255,255,0.3)",
              }}
            >
              {colorGrading[key] > 0 ? "+" : ""}
              {colorGrading[key]}
            </span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={colorGrading[key]}
            onChange={(e) => setColorGrading({ [key]: Number(e.target.value) })}
            className="w-full h-1 accent-[#2563EB] cursor-pointer"
          />
        </div>
      ))}

      {/* Reset */}
      <button
        type="button"
        onClick={() =>
          setColorGrading({
            exposure: 0,
            contrast: 0,
            saturation: 0,
            highlights: 0,
            shadows: 0,
            temperature: 0,
            tint: 0,
            sharpen: 0,
            fade: 0,
            vibrance: 0,
          })
        }
        className="mt-1 py-2 rounded-lg text-[11px] font-medium text-white/40 hover:text-white/70 transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        Reset to Default
      </button>
    </div>
  );
}
