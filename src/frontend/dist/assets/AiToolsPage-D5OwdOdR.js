import { j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { B as Button } from "./button-Dx5YDvtJ.js";
import { u as ue } from "./index-De5ctwPQ.js";
import { m as motion } from "./motion-DXodcWnX.js";
import { Z as Zap, I as Image, ar as TrendingUp, a as Scissors, b as Mic, F as Film, br as CircleArrowUp, ao as ArrowRight } from "./ui-lib-DG52wkUx.js";
const AI_TOOLS = [
  {
    id: "captions",
    name: "AI Captions",
    description: "Auto-generate subtitles from any video with pinpoint timing and multiple language support.",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: "thumbnail",
    name: "AI Thumbnail Generator",
    description: "Create click-worthy thumbnails instantly — just describe your idea and watch it come to life.",
    icon: Image,
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: "hook",
    name: "AI Hook Generator",
    description: "Generate viral opening hooks for your content that stop scrollers and boost watch time.",
    icon: TrendingUp,
    gradient: "from-pink-500 to-red-500"
  },
  {
    id: "bg-removal",
    name: "AI Background Removal",
    description: "Remove backgrounds with one click — no green screen, no manual masking required.",
    icon: Scissors,
    gradient: "from-green-500 to-emerald-400"
  },
  {
    id: "voiceover",
    name: "AI Voiceover",
    description: "Add professional AI narration to your videos in multiple voices, languages, and styles.",
    icon: Mic,
    gradient: "from-violet-500 to-purple-400"
  },
  {
    id: "script",
    name: "AI Script to Video",
    description: "Turn scripts into full video timelines — auto-select clips, captions, and music to match.",
    icon: Film,
    gradient: "from-indigo-500 to-blue-400"
  },
  {
    id: "upscaling",
    name: "AI Upscaling",
    description: "Enhance video quality up to 4K using AI-powered detail reconstruction and noise reduction.",
    icon: CircleArrowUp,
    gradient: "from-teal-500 to-cyan-400"
  }
];
function handleTryTool(name) {
  ue.info(`${name} — coming soon!`, {
    description: "This feature will be integrated directly into the Video Editor and Thumbnail Studio.",
    duration: 4e3
  });
}
function AiToolsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "ai_tools.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "text-center mb-14",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect mb-5 text-xs font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "text-primary" }),
            "Powered by Elysian AI"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight", children: "AI Tools" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto", children: "Supercharge your creative workflow with AI — from auto-captions to full video generation." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-16",
        "data-ocid": "ai_tools.list",
        children: AI_TOOLS.map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: i * 0.07 },
            className: "glass-panel rounded-xl p-5 border border-border hover:border-primary/40 group transition-smooth",
            "data-ocid": `ai_tools.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} shrink-0 shadow-glass-sm`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(tool.icon, { size: 18, className: "text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: tool.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: tool.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "h-7 text-xs border-primary/30 text-primary hover:bg-primary/10",
                    onClick: () => handleTryTool(tool.name),
                    "data-ocid": `ai_tools.try_button.${i + 1}`,
                    children: "Try It"
                  }
                )
              ] })
            ] })
          },
          tool.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.5 },
        className: "rounded-2xl glass-panel border border-primary/20 p-8 text-center",
        "data-ocid": "ai_tools.cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Access AI tools inside the editors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-md mx-auto", children: "All AI features are being built directly into the Video Editor and Thumbnail Studio — no separate app needed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/video-editor", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "gap-2 bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30",
                "data-ocid": "ai_tools.video_editor_button",
                children: [
                  "Open Video Editor",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/thumbnail-studio", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "gap-2 border-accent/40 text-accent hover:bg-accent/10",
                "data-ocid": "ai_tools.thumbnail_studio_button",
                children: [
                  "Open Thumbnail Studio",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 })
                ]
              }
            ) })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  AiToolsPage,
  AiToolsPage as default
};
