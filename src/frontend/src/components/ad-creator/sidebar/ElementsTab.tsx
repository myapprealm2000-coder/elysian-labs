import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { ShapeCanvasElement } from "@/store/adCreatorStore";
import { Search } from "lucide-react";
import {
  Diamond,
  Flame,
  Heart,
  Instagram,
  Linkedin,
  Star,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const GRADIENTS = [
  { label: "Cobalt", value: "linear-gradient(135deg,#1e40af,#2563eb)" },
  { label: "Emerald", value: "linear-gradient(135deg,#065f46,#22c55e)" },
  { label: "Purple", value: "linear-gradient(135deg,#4c1d95,#7c3aed)" },
  { label: "Sunset", value: "linear-gradient(135deg,#92400e,#f59e0b)" },
  { label: "Rose", value: "linear-gradient(135deg,#9f1239,#f43f5e)" },
  { label: "Cyan", value: "linear-gradient(135deg,#164e63,#06b6d4)" },
];

const ICON_LIST = [
  { icon: Twitter, name: "Twitter" },
  { icon: Instagram, name: "Instagram" },
  { icon: Youtube, name: "YouTube" },
  { icon: Linkedin, name: "LinkedIn" },
  { icon: Heart, name: "Heart" },
  { icon: Star, name: "Star" },
  { icon: Zap, name: "Lightning" },
  { icon: Diamond, name: "Diamond" },
  { icon: Flame, name: "Fire" },
];

const SHAPES = [
  { label: "Rectangle", type: "rect" as const },
  { label: "Circle", type: "circle" as const },
  { label: "Blob", type: "blob" as const },
  { label: "Arrow", type: "arrow" as const },
] as const;

const PILLS = ["All", "Shapes", "Icons", "Gradients", "Social"];

export function ElementsTab() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const { addElement, canvasSize } = useAdCreatorStore();

  function addShape(type: ShapeCanvasElement["shapeType"], gradient?: string) {
    const el: Omit<ShapeCanvasElement, "id"> = {
      type: "shape",
      name: type.charAt(0).toUpperCase() + type.slice(1),
      x: canvasSize.width * 0.3,
      y: canvasSize.height * 0.3,
      width: 200,
      height: type === "circle" ? 200 : 120,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: type,
      fill: gradient ?? "#2563EB",
      gradient: gradient ?? null,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: type === "rect" ? 8 : 0,
    };
    addElement(el);
  }

  const showShapes = cat === "All" || cat === "Shapes";
  const showIcons = cat === "All" || cat === "Icons" || cat === "Social";
  const showGrads = cat === "All" || cat === "Gradients";

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search elements…"
          className="w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {PILLS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setCat(p)}
            className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${
              cat === p
                ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto flex-1 pr-1 pb-2 flex flex-col gap-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {showShapes && (
          <section>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              Shapes
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {SHAPES.map((s) => (
                <motion.button
                  key={s.type}
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addShape(s.type)}
                  className="aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 flex items-center justify-center text-[9px] text-muted-foreground hover:text-blue-400 transition-all"
                >
                  {s.label}
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {showIcons && (
          <section>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              Icons
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {ICON_LIST.filter(
                ({ name }) =>
                  name.toLowerCase().includes(search.toLowerCase()) ||
                  search === "",
              ).map(({ icon: Icon, name }) => (
                <motion.button
                  key={name}
                  type="button"
                  aria-label={name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addShape("rect")}
                  className="aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 flex items-center justify-center transition-all group"
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {showGrads && (
          <section>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              Gradients
            </p>
            <div className="grid grid-cols-3 gap-2">
              {GRADIENTS.map((g) => (
                <motion.button
                  key={g.label}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addShape("rect", g.value)}
                  className="h-12 rounded-lg border border-white/10 hover:border-white/30 transition-all"
                  style={{ background: g.value }}
                  aria-label={g.label}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
