import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { B as Button } from "./button-Dx5YDvtJ.js";
import { m as motion, A as AnimatePresence } from "./motion-DXodcWnX.js";
import { d as LayoutTemplate, ao as ArrowRight } from "./ui-lib-DG52wkUx.js";
const CATEGORIES = [
  "All",
  "YouTube",
  "TikTok",
  "Shorts",
  "Gaming",
  "Ads",
  "Podcast",
  "Instagram"
];
const BADGE_COLORS = {
  YouTube: "bg-red-500/20 text-red-400 border-red-500/30",
  TikTok: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  Shorts: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Gaming: "bg-green-500/20 text-green-400 border-green-500/30",
  Ads: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Podcast: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Instagram: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};
const TEMPLATES = [
  {
    id: "yt-1",
    title: "Viral YouTube Thumbnail",
    category: "YouTube",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#e53e3e 100%)",
    description: "Bold red energy for maximum CTR"
  },
  {
    id: "yt-2",
    title: "YouTube Reaction Thumbnail",
    category: "YouTube",
    gradient: "linear-gradient(135deg,#0d1117 0%,#f59e0b 100%)",
    description: "Expressive face-forward layout"
  },
  {
    id: "yt-3",
    title: "YouTube Tutorial Thumbnail",
    category: "YouTube",
    gradient: "linear-gradient(135deg,#064e3b 0%,#10b981 100%)",
    description: "Clean instructional design"
  },
  {
    id: "tt-1",
    title: "TikTok Hook Caption",
    category: "TikTok",
    gradient: "linear-gradient(135deg,#1a0028 0%,#ec4899 100%)",
    description: "Scroll-stopping vertical layout"
  },
  {
    id: "tt-2",
    title: "TikTok Dance Cover",
    category: "TikTok",
    gradient: "linear-gradient(135deg,#18181b 0%,#a855f7 100%)",
    description: "Vibrant and energetic style"
  },
  {
    id: "sh-1",
    title: "Shorts Intro Card",
    category: "Shorts",
    gradient: "linear-gradient(135deg,#1c1917 0%,#f97316 100%)",
    description: "9:16 punchy opener"
  },
  {
    id: "sh-2",
    title: "Shorts CTA End Card",
    category: "Shorts",
    gradient: "linear-gradient(135deg,#0f172a 0%,#38bdf8 100%)",
    description: "Subscribe push end screen"
  },
  {
    id: "gm-1",
    title: "Gaming Thumbnail — FPS",
    category: "Gaming",
    gradient: "linear-gradient(135deg,#030712 0%,#22c55e 100%)",
    description: "High-contrast battle royale style"
  },
  {
    id: "gm-2",
    title: "Gaming Thumbnail — RPG",
    category: "Gaming",
    gradient: "linear-gradient(135deg,#1e1b4b 0%,#818cf8 100%)",
    description: "Epic fantasy atmosphere"
  },
  {
    id: "gm-3",
    title: "Gaming Countdown Stream",
    category: "Gaming",
    gradient: "linear-gradient(135deg,#18181b 0%,#dc2626 100%)",
    description: "Pre-stream hype graphic"
  },
  {
    id: "ad-1",
    title: "Meta Product Ad",
    category: "Ads",
    gradient: "linear-gradient(135deg,#0f172a 0%,#3b82f6 100%)",
    description: "Conversion-focused product highlight"
  },
  {
    id: "ad-2",
    title: "Promo Story Ad",
    category: "Ads",
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#8b5cf6 100%)",
    description: "Story-format limited offer"
  },
  {
    id: "pc-1",
    title: "Podcast Cover Art",
    category: "Podcast",
    gradient: "linear-gradient(135deg,#0a0a0a 0%,#7c3aed 100%)",
    description: "Bold minimalist podcast branding"
  },
  {
    id: "pc-2",
    title: "Podcast Episode Thumbnail",
    category: "Podcast",
    gradient: "linear-gradient(135deg,#1c1917 0%,#d97706 100%)",
    description: "Warm conversational tone"
  },
  {
    id: "ig-1",
    title: "Instagram Post — Quote",
    category: "Instagram",
    gradient: "linear-gradient(135deg,#2d1b69 0%,#ec4899 100%)",
    description: "Aesthetic text-first layout"
  },
  {
    id: "ig-2",
    title: "Instagram Story Promo",
    category: "Instagram",
    gradient: "linear-gradient(135deg,#0f172a 0%,#f43f5e 100%)",
    description: "Swipe-up story offer"
  }
];
function TemplatesPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = activeCategory === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "templates.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "text-center mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect mb-5 text-xs font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { size: 12, className: "text-accent" }),
            "Template Library"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: "Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: "Start with a professional template, make it yours in minutes." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-wrap gap-2 justify-center mb-10",
        "data-ocid": "templates.filter_tabs",
        role: "tablist",
        "aria-label": "Template categories",
        children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeCategory === cat,
            onClick: () => setActiveCategory(cat),
            className: `px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border ${activeCategory === cat ? "bg-accent/20 border-accent/50 text-accent" : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-border"}`,
            "data-ocid": `templates.tab.${cat.toLowerCase()}`,
            children: cat
          },
          cat
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.25 },
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        "data-ocid": "templates.list",
        children: filtered.map((tpl, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.3, delay: i * 0.04 },
            className: "group rounded-xl overflow-hidden border border-border glass-panel hover:border-accent/40 transition-smooth",
            "data-ocid": `templates.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-32 relative overflow-hidden",
                  style: { background: tpl.gradient },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/thumbnail-studio", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "text-xs h-7 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90",
                      "data-ocid": `templates.use_button.${i + 1}`,
                      children: [
                        "Use Template",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                      ]
                    }
                  ) }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-foreground truncate mb-1", children: tpl.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate flex-1", children: tpl.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-block shrink-0 text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${BADGE_COLORS[tpl.category]}`,
                      children: tpl.category
                    }
                  )
                ] })
              ] })
            ]
          },
          tpl.id
        ))
      },
      activeCategory
    ) }),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "templates.empty_state",
        children: "No templates in this category yet."
      }
    )
  ] }) });
}
export {
  TemplatesPage,
  TemplatesPage as default
};
