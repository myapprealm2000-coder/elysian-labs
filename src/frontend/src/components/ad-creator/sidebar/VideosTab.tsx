import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { ShapeCanvasElement } from "@/store/adCreatorStore";
import { Play, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const VIDEOS = [
  {
    id: 1,
    title: "Neon City Drive",
    duration: "0:32",
    gradient: "linear-gradient(135deg,#0f172a,#2563eb)",
  },
  {
    id: 2,
    title: "Abstract Motion",
    duration: "0:18",
    gradient: "linear-gradient(135deg,#1a0533,#7c3aed)",
  },
  {
    id: 3,
    title: "Tech Particles",
    duration: "0:45",
    gradient: "linear-gradient(135deg,#064e3b,#22c55e)",
  },
  {
    id: 4,
    title: "Ocean Waves",
    duration: "1:02",
    gradient: "linear-gradient(135deg,#164e63,#06b6d4)",
  },
  {
    id: 5,
    title: "Mountains",
    duration: "0:55",
    gradient: "linear-gradient(135deg,#1f2937,#374151)",
  },
  {
    id: 6,
    title: "Cityscape",
    duration: "0:38",
    gradient: "linear-gradient(135deg,#1c1c1c,#f97316)",
  },
  {
    id: 7,
    title: "Bokeh Lights",
    duration: "0:24",
    gradient: "linear-gradient(135deg,#2d1b69,#e879f9)",
  },
  {
    id: 8,
    title: "Data Flow",
    duration: "0:41",
    gradient: "linear-gradient(135deg,#0c4a6e,#38bdf8)",
  },
];

export function VideosTab() {
  const [search, setSearch] = useState("");
  const { addElement, canvasSize } = useAdCreatorStore();

  function addVideo(v: (typeof VIDEOS)[number]) {
    // Add as a shape placeholder since we don't have actual video src
    const el: Omit<ShapeCanvasElement, "id"> = {
      type: "shape",
      name: v.title,
      x: canvasSize.width * 0.1,
      y: canvasSize.height * 0.1,
      width: canvasSize.width * 0.8,
      height: canvasSize.height * 0.6,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: v.gradient,
      gradient: v.gradient,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 8,
    };
    addElement(el);
  }

  const shown = VIDEOS.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos…"
          className="w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div className="overflow-y-auto flex-1 pr-1 pb-2 flex flex-col gap-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {shown.map((v, i) => (
          <motion.button
            key={v.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => addVideo(v)}
            className="group flex gap-3 items-center p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-left"
          >
            <div
              className="relative w-16 h-10 rounded-md shrink-0 flex items-center justify-center"
              style={{ background: v.gradient }}
            >
              <Play className="w-4 h-4 text-white/80" />
              <span className="absolute bottom-0.5 right-1 text-[8px] text-white/70">
                {v.duration}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground group-hover:text-blue-300 transition-colors truncate">
                {v.title}
              </p>
              <p className="text-[10px] text-muted-foreground">Stock · HD</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
