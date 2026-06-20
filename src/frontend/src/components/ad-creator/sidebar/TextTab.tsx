import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { TextCanvasElement } from "@/store/adCreatorStore";
import { Type } from "lucide-react";
import { motion } from "motion/react";

const TEXT_STYLES = [
  {
    name: "Neon Glow",
    preview: "NEON GLOW",
    color: "#ffffff",
    glow: { color: "#2563EB", intensity: 0.8 },
    fontSize: 42,
    weight: "700",
  },
  {
    name: "Cinematic Title",
    preview: "Cinematic",
    color: "#f8fafc",
    glow: null,
    fontSize: 52,
    weight: "900",
  },
  {
    name: "Minimal Clean",
    preview: "Minimal",
    color: "#94a3b8",
    glow: null,
    fontSize: 36,
    weight: "300",
  },
  {
    name: "Bold Impact",
    preview: "IMPACT",
    color: "#ffffff",
    glow: null,
    fontSize: 60,
    weight: "900",
  },
  {
    name: "Script Elegant",
    preview: "Elegant",
    color: "#e2e8f0",
    glow: null,
    fontSize: 44,
    weight: "400",
  },
];

const FONT_PAIRS = [
  { display: "Inter", body: "Plus Jakarta Sans", label: "Modern SaaS" },
  { display: "Montserrat", body: "Open Sans", label: "Corporate" },
  { display: "Playfair Display", body: "Lato", label: "Editorial" },
  { display: "Space Grotesk", body: "DM Sans", label: "Tech" },
];

export function TextTab() {
  const { addElement, canvasSize } = useAdCreatorStore();

  function addText(
    content: string,
    fontSize: number,
    weight: string,
    label: string,
    style?: Partial<TextCanvasElement>,
  ) {
    const el: Omit<TextCanvasElement, "id"> = {
      type: "text",
      name: label,
      x: canvasSize.width * 0.2,
      y: canvasSize.height * 0.4,
      width: canvasSize.width * 0.6,
      height: fontSize * 1.6,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content,
      fontFamily: "Inter",
      fontSize,
      fontWeight: weight,
      color: "#ffffff",
      textAlign: "center",
      lineHeight: 1.2,
      letterSpacing: 0,
      gradient: false,
      gradientColors: ["#ffffff", "#94a3b8"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
      ...style,
    };
    addElement(el);
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-full pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {/* Add Text Buttons */}
      <section>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
          Add Text
        </p>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => addText("Add a heading", 64, "800", "Heading")}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
          >
            <span className="text-base font-bold text-foreground group-hover:text-blue-300 transition-colors">
              Add a heading
            </span>
          </button>
          <button
            type="button"
            onClick={() => addText("Add a subheading", 40, "600", "Subheading")}
            className="w-full text-left px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
          >
            <span className="text-sm font-semibold text-foreground group-hover:text-blue-300 transition-colors">
              Add a subheading
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              addText("Add body text here", 24, "400", "Body Text")
            }
            className="w-full text-left px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
          >
            <span className="text-xs text-foreground group-hover:text-blue-300 transition-colors">
              Add body text
            </span>
          </button>
        </div>
      </section>

      {/* Text Styles */}
      <section>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
          Text Styles
        </p>
        <div className="flex flex-col gap-1.5">
          {TEXT_STYLES.map((ts, i) => (
            <motion.button
              key={ts.name}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() =>
                addText(ts.preview, ts.fontSize, ts.weight, ts.name, {
                  color: ts.color,
                  glow: ts.glow ?? null,
                })
              }
              className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all flex items-center justify-between"
            >
              <span
                style={{ fontWeight: ts.weight, color: ts.color, fontSize: 13 }}
                className="truncate"
              >
                {ts.preview}
              </span>
              <Type className="w-3 h-3 text-muted-foreground shrink-0" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Font Pairs */}
      <section>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
          Font Pairings
        </p>
        <div className="flex flex-col gap-1.5">
          {FONT_PAIRS.map((fp, i) => (
            <motion.button
              key={fp.label}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              onClick={() => addText(fp.display, 48, "700", fp.display)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all"
            >
              <p className="text-[11px] font-semibold text-foreground">
                {fp.display}
              </p>
              <p className="text-[9px] text-muted-foreground">
                {fp.body} · {fp.label}
              </p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
