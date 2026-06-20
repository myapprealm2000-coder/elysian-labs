import { useAdCreatorStore } from "@/store/adCreatorStore";
import type {
  CanvasElement,
  ShapeCanvasElement,
  TextCanvasElement,
} from "@/store/adCreatorStore";
import { CheckCircle } from "lucide-react";
import { Plus, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TEMPLATES = [
  {
    id: "luxury-brand",
    name: "Luxury Brand",
    gradient: "linear-gradient(135deg,#1a0533,#3b0764)",
    accent: "#c084fc",
    tag: "Luxury",
  },
  {
    id: "gaming-promo",
    name: "Gaming Promo",
    gradient: "linear-gradient(135deg,#0f172a,#1e3a5f)",
    accent: "#22d3ee",
    tag: "Gaming",
  },
  {
    id: "skincare-ad",
    name: "Skincare Ad",
    gradient: "linear-gradient(135deg,#fdf2f8,#fce7f3)",
    accent: "#ec4899",
    tag: "Instagram",
  },
  {
    id: "tech-launch",
    name: "Tech Launch",
    gradient: "linear-gradient(135deg,#0f172a,#1e40af)",
    accent: "#60a5fa",
    tag: "Ads",
  },
  {
    id: "yt-thumb",
    name: "YouTube Thumb",
    gradient: "linear-gradient(135deg,#1c1c1c,#dc2626)",
    accent: "#ef4444",
    tag: "YouTube",
  },
  {
    id: "tiktok-ad",
    name: "TikTok Ad",
    gradient: "linear-gradient(135deg,#010101,#2d1b69)",
    accent: "#e879f9",
    tag: "TikTok",
  },
  {
    id: "podcast-cover",
    name: "Podcast Cover",
    gradient: "linear-gradient(135deg,#111827,#064e3b)",
    accent: "#34d399",
    tag: "Podcast",
  },
  {
    id: "product-launch",
    name: "Product Launch",
    gradient: "linear-gradient(135deg,#0c0a09,#292524)",
    accent: "#f97316",
    tag: "Ads",
  },
];

const CATEGORIES = [
  "All",
  "Instagram",
  "YouTube",
  "TikTok",
  "Ads",
  "Gaming",
  "Luxury",
  "Podcast",
];

export function TemplatesTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const { setElements, canvasSize } = useAdCreatorStore();

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = category === "All" || t.tag === category;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function applyTemplate(t: (typeof TEMPLATES)[number]) {
    const cw = canvasSize.width;
    const ch = canvasSize.height;

    // Element IDs — deterministic so history resets cleanly
    const bgId = `tmpl-bg-${t.id}`;
    const headlineId = `tmpl-headline-${t.id}`;
    const subtitleId = `tmpl-subtitle-${t.id}`;
    const ctaId = `tmpl-cta-${t.id}`;
    const ctaTextId = `tmpl-cta-text-${t.id}`;

    // Headline dimensions & centered position
    const headlineW = Math.round(cw * 0.8);
    const headlineH = Math.round(cw * 0.1);
    const headlineX = Math.round((cw - headlineW) / 2);
    const headlineY = Math.round(ch * 0.32);

    // Subtitle
    const subtitleW = Math.round(cw * 0.65);
    const subtitleH = Math.round(cw * 0.05);
    const subtitleX = Math.round((cw - subtitleW) / 2);
    const subtitleY = headlineY + headlineH + Math.round(ch * 0.03);

    // CTA button
    const ctaW = Math.round(cw * 0.32);
    const ctaH = Math.round(ch * 0.07);
    const ctaX = Math.round((cw - ctaW) / 2);
    const ctaY = subtitleY + subtitleH + Math.round(ch * 0.05);

    const bg: CanvasElement = {
      id: bgId,
      type: "shape",
      name: `${t.name} BG`,
      x: 0,
      y: 0,
      width: cw,
      height: ch,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: t.gradient,
      gradient: t.gradient,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 0,
    } as ShapeCanvasElement;

    const headline: CanvasElement = {
      id: headlineId,
      type: "text",
      name: "Headline",
      x: headlineX,
      y: headlineY,
      width: headlineW,
      height: headlineH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: t.name.toUpperCase(),
      fontFamily: "Inter",
      fontSize: Math.max(24, Math.round(cw * 0.065)),
      fontWeight: "800",
      color: t.accent,
      textAlign: "center",
      lineHeight: 1.1,
      letterSpacing: 2,
      gradient: false,
      gradientColors: [t.accent, "#ffffff"],
      shadow: null,
      glow: { color: t.accent, intensity: 0.5 },
      outline: null,
      animation: null,
      blendMode: "normal",
    } as TextCanvasElement;

    const subtitle: CanvasElement = {
      id: subtitleId,
      type: "text",
      name: "Subtitle",
      x: subtitleX,
      y: subtitleY,
      width: subtitleW,
      height: subtitleH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: "Your message goes here",
      fontFamily: "Inter",
      fontSize: Math.max(14, Math.round(cw * 0.027)),
      fontWeight: "400",
      color: "rgba(255,255,255,0.7)",
      textAlign: "center",
      lineHeight: 1.4,
      letterSpacing: 0,
      gradient: false,
      gradientColors: ["#ffffff", "#94a3b8"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
    } as TextCanvasElement;

    const ctaBtn: CanvasElement = {
      id: ctaId,
      type: "shape",
      name: "CTA Button",
      x: ctaX,
      y: ctaY,
      width: ctaW,
      height: ctaH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: t.accent,
      gradient: null,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: { color: t.accent, intensity: 0.4 },
      shadow: { x: 0, y: 4, blur: 24, spread: 0, color: `${t.accent}66` },
      cornerRadius: ctaH / 2,
    } as ShapeCanvasElement;

    const ctaText: CanvasElement = {
      id: ctaTextId,
      type: "text",
      name: "CTA Text",
      x: ctaX,
      y: ctaY,
      width: ctaW,
      height: ctaH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: "Get Started",
      fontFamily: "Inter",
      fontSize: Math.max(12, Math.round(cw * 0.02)),
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "center",
      lineHeight: ctaH / Math.max(12, Math.round(cw * 0.02)),
      letterSpacing: 1,
      gradient: false,
      gradientColors: ["#ffffff", "#ffffff"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
    } as TextCanvasElement;

    const templateElements = [bg, headline, subtitle, ctaBtn, ctaText];
    console.log(
      "[TemplatesTab] applyTemplate:",
      t.id,
      "objects:",
      templateElements,
    );

    // Atomically replace entire canvas with this template's elements
    setElements(templateElements, headlineId);

    // Visual feedback
    setAppliedId(t.id);
    setTimeout(() => setAppliedId(null), 1500);
  }

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates…"
          className="w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      {/* Categories */}
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

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 pb-2 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {filtered.map((t, i) => {
          const isApplied = appliedId === t.id;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`group relative cursor-pointer rounded-lg overflow-hidden border transition-all ${
                isApplied
                  ? "border-blue-500/80 ring-1 ring-blue-500/40"
                  : "border-white/10 hover:border-blue-500/40"
              }`}
              style={{ aspectRatio: "1 / 1" }}
              onClick={() => applyTemplate(t)}
              data-ocid={`templates.item.${i + 1}`}
            >
              <div
                className="absolute inset-0"
                style={{ background: t.gradient }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <span
                  className="text-[9px] font-bold text-center leading-tight"
                  style={{ color: t.accent }}
                >
                  {t.name.toUpperCase()}
                </span>
              </div>
              {/* Applied indicator */}
              <AnimatePresence>
                {isApplied && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(37,99,235,0.75)" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Hover overlay */}
              {!isApplied && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] text-white font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Use
                  </span>
                </div>
              )}
              <span className="absolute top-1.5 right-1.5 text-[8px] bg-black/50 px-1.5 py-0.5 rounded-full text-white/70">
                {t.tag}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
