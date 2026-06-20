import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { ImageCanvasElement } from "@/store/adCreatorStore";
import { Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PLACEHOLDER_IMAGES = [
  {
    id: 1,
    gradient: "linear-gradient(135deg,#1e3a5f,#2563eb)",
    label: "Blue Tech",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg,#064e3b,#22c55e)",
    label: "Nature",
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg,#4c1d95,#7c3aed)",
    label: "Purple",
  },
  { id: 4, gradient: "linear-gradient(135deg,#7f1d1d,#ef4444)", label: "Red" },
  { id: 5, gradient: "linear-gradient(135deg,#164e63,#06b6d4)", label: "Cyan" },
  { id: 6, gradient: "linear-gradient(135deg,#78350f,#f59e0b)", label: "Gold" },
  { id: 7, gradient: "linear-gradient(135deg,#1f2937,#9ca3af)", label: "Gray" },
  { id: 8, gradient: "linear-gradient(135deg,#042f2e,#14b8a6)", label: "Teal" },
  { id: 9, gradient: "linear-gradient(135deg,#2d1b69,#e879f9)", label: "Neon" },
  {
    id: 10,
    gradient: "linear-gradient(135deg,#1c1c1c,#f97316)",
    label: "Fire",
  },
  { id: 11, gradient: "linear-gradient(135deg,#0c4a6e,#38bdf8)", label: "Sky" },
  {
    id: 12,
    gradient: "linear-gradient(135deg,#4a044e,#f0abfc)",
    label: "Pink",
  },
  {
    id: 13,
    gradient: "linear-gradient(135deg,#052e16,#4ade80)",
    label: "Forest",
  },
  {
    id: 14,
    gradient: "linear-gradient(135deg,#1a1a2e,#e2e8f0)",
    label: "Mono",
  },
  {
    id: 15,
    gradient: "linear-gradient(135deg,#27272a,#a1a1aa)",
    label: "Steel",
  },
  {
    id: 16,
    gradient: "linear-gradient(135deg,#0f172a,#312e81)",
    label: "Indigo",
  },
];

const CATEGORIES = [
  "All",
  "Nature",
  "Tech",
  "Fashion",
  "Abstract",
  "Architecture",
];

export function ImagesTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addElement, canvasSize } = useAdCreatorStore();

  function addImage(gradient: string, label: string) {
    // Create a 400x400 canvas and export as data URL for a gradient placeholder
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const grad = ctx.createLinearGradient(0, 0, 400, 400);
    const colors = gradient.match(/#[0-9a-f]{6}/gi) ?? ["#1e3a5f", "#2563eb"];
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1] ?? colors[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 400, 400);
    const src = canvas.toDataURL();
    const el: Omit<ImageCanvasElement, "id"> = {
      type: "image",
      name: label,
      x: canvasSize.width * 0.15,
      y: canvasSize.height * 0.15,
      width: 400,
      height: 400,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      src,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0,
      },
      shadow: null,
      backgroundRemoved: false,
      mask: null,
    };
    addElement(el);
  }

  const shown = PLACEHOLDER_IMAGES.filter((img) =>
    img.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search images…"
          className="w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${
              category === c
                ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {shown.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="group relative rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/40 cursor-pointer transition-all"
            style={{ aspectRatio: "1 / 1" }}
            onClick={() => addImage(img.gradient, img.label)}
          >
            <div
              className="absolute inset-0"
              style={{ background: img.gradient }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-1 left-1.5 text-[9px] text-white/70">
              {img.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
