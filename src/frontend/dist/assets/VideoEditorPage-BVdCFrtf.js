import { r as reactExports, j as jsxRuntimeExports } from "./vendor-80nuMd8G.js";
import { a as useVideoEditor, u as useVideoEditorStore, E as EditorTopBar, b as EditorLeftSidebar, V as VideoMonitor, c as EditorRightPanel } from "./VideoMonitor-BFM2BvWg.js";
import { A as AnimatePresence, m as motion } from "./motion-DXodcWnX.js";
import { X, h as CircleCheck, D as Download, aP as Youtube, aG as Instagram, y as Share2, F as Film, I as Image, Z as Zap, aL as ZoomIn, a as Scissors, aQ as RotateCcw, aR as RotateCw, T as Trash2, aO as Copy, aS as Snowflake, aT as Clover, a0 as Minus, e as Plus, z as ChevronDown, ae as GripVertical, af as Eye, ag as EyeOff, ah as Lock, V as Video } from "./ui-lib-DG52wkUx.js";
import "./index-De5ctwPQ.js";
import "./react-9ph_Ps2d.js";
const FORMAT_OPTIONS = [
  { id: "mp4", label: "MP4", description: "Best compatibility", popular: true },
  { id: "mov", label: "MOV", description: "Apple ProRes" },
  { id: "gif", label: "GIF", description: "Animated loops" },
  { id: "png-seq", label: "PNG Seq", description: "Frame sequence" }
];
const QUALITY_OPTIONS = [
  {
    id: "720p",
    label: "720p HD",
    sublabel: "1280×720",
    sizeMB: "~28 MB",
    renderTime: "~15s"
  },
  {
    id: "1080p",
    label: "1080p FHD",
    sublabel: "1920×1080",
    sizeMB: "~45 MB",
    renderTime: "~30s",
    recommended: true
  },
  {
    id: "2K",
    label: "2K QHD",
    sublabel: "2560×1440",
    sizeMB: "~90 MB",
    renderTime: "~60s"
  },
  {
    id: "4K",
    label: "4K UHD",
    sublabel: "3840×2160",
    sizeMB: "~180 MB",
    renderTime: "~2min",
    premium: true
  }
];
const FPS_OPTIONS = [
  { fps: 24, label: "24 fps", description: "Cinematic" },
  { fps: 30, label: "30 fps", description: "Standard" },
  { fps: 60, label: "60 fps", description: "Smooth" }
];
const EXPORT_STEPS = [
  "Rendering video track...",
  "Processing audio...",
  "Applying effects...",
  "Encoding video...",
  "Finalizing export..."
];
function CircularProgress({ value }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - value / 100 * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "132",
      height: "132",
      viewBox: "0 0 132 132",
      role: "img",
      "aria-label": "Export progress",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "66",
            cy: "66",
            r,
            fill: "none",
            stroke: "rgba(255,255,255,0.06)",
            strokeWidth: "6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.circle,
          {
            cx: "66",
            cy: "66",
            r,
            fill: "none",
            stroke: "url(#export-grad)",
            strokeWidth: "6",
            strokeLinecap: "round",
            strokeDasharray: circ,
            animate: { strokeDashoffset: offset },
            transition: { duration: 0.4, ease: "easeOut" },
            transform: "rotate(-90 66 66)",
            style: { filter: "drop-shadow(0 0 8px rgba(37,99,235,0.6))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "export-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#2563EB" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#22C55E" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "66",
            y: "62",
            textAnchor: "middle",
            fill: "white",
            fontSize: "20",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            children: Math.round(value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "66",
            y: "78",
            textAnchor: "middle",
            fill: "rgba(255,255,255,0.4)",
            fontSize: "10",
            fontFamily: "Inter, sans-serif",
            children: "%"
          }
        )
      ]
    }
  );
}
function ProExportModal({
  isOpen,
  onClose,
  projectName = "Elysian Project"
}) {
  const [format, setFormat] = reactExports.useState("mp4");
  const [quality, setQuality] = reactExports.useState("1080p");
  const [fps, setFps] = reactExports.useState(30);
  const [hwAccel, setHwAccel] = reactExports.useState(true);
  const [audioBitrate, setAudioBitrate] = reactExports.useState("192 kbps");
  const [colorSpace, setColorSpace] = reactExports.useState("Rec.709");
  const [advancedOpen, setAdvancedOpen] = reactExports.useState(false);
  const [phase, setPhase] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [stepIndex, setStepIndex] = reactExports.useState(0);
  const [timeRemaining, setTimeRemaining] = reactExports.useState(8);
  const intervalRef = reactExports.useRef(null);
  const selectedQualityOption = QUALITY_OPTIONS.find((q) => q.id === quality);
  const startExport = () => {
    setPhase("exporting");
    setProgress(0);
    setStepIndex(0);
    setTimeRemaining(8);
    let pct = 0;
    intervalRef.current = setInterval(() => {
      pct += Math.random() * 2.5 + 0.8;
      const clamped = Math.min(100, pct);
      setProgress(clamped);
      setStepIndex(
        Math.min(
          EXPORT_STEPS.length - 1,
          Math.floor(clamped / 100 * EXPORT_STEPS.length)
        )
      );
      setTimeRemaining((prev) => Math.max(0, prev - 0.15));
      if (clamped >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase("done"), 500);
      }
    }, 120);
  };
  const cancelExport = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("idle");
    setProgress(0);
  };
  const handleClose = () => {
    if (phase === "exporting") return;
    cancelExport();
    setPhase("idle");
    onClose();
  };
  reactExports.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (isOpen) {
      setPhase("idle");
      setProgress(0);
    }
  }, [isOpen]);
  const overlayStyle = {
    background: "rgba(0,0,0,0.82)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)"
  };
  const modalStyle = {
    background: "rgba(10,14,26,0.98)",
    backdropFilter: "blur(40px)",
    WebkitBackdropFilter: "blur(40px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(37,99,235,0.08)",
    fontFamily: "Inter, sans-serif"
  };
  const sectionLabelStyle = {
    fontSize: 9,
    fontWeight: 600,
    color: "rgba(255,255,255,0.28)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 8
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4",
      style: overlayStyle,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => {
        if (e.target === e.currentTarget) handleClose();
      },
      "data-ocid": "pro-export.overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-full sm:w-[580px] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90vh]",
          style: modalStyle,
          initial: { y: 60, opacity: 0, scale: 0.97 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: 60, opacity: 0, scale: 0.97 },
          transition: { type: "spring", damping: 26, stiffness: 320 },
          "data-ocid": "pro-export.modal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-0.5 w-full",
                style: {
                  background: "linear-gradient(90deg, #2563EB, #22C55E, #2563EB)",
                  backgroundSize: "200% 100%"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-5 pb-4 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-semibold text-white/90", children: "Export Video" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mt-0.5", children: projectName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClose,
                  disabled: phase === "exporting",
                  className: "w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-all disabled:opacity-30",
                  "data-ocid": "pro-export.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: phase === "done" ? (
              // ── Success state
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0 },
                  className: "flex flex-col items-center px-6 pb-8 pt-2 gap-5",
                  "data-ocid": "pro-export.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { scale: 0.5, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        transition: {
                          type: "spring",
                          damping: 14,
                          stiffness: 280,
                          delay: 0.1
                        },
                        className: "w-20 h-20 rounded-full flex items-center justify-center",
                        style: {
                          background: "rgba(34,197,94,0.12)",
                          border: "2px solid rgba(34,197,94,0.4)",
                          boxShadow: "0 0 40px rgba(34,197,94,0.2)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 36, style: { color: "#22C55E" } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[18px] font-bold text-white/90", children: "Export Complete!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-white/40 mt-1", children: [
                        projectName,
                        ".",
                        format === "png-seq" ? "zip" : format
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full rounded-2xl p-4 space-y-2",
                        style: {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)"
                        },
                        children: [
                          ["Format", format.toUpperCase()],
                          ["Quality", selectedQualityOption.sublabel],
                          ["Frame Rate", `${fps} fps`],
                          ["File Size", selectedQualityOption.sizeMB]
                        ].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/35", children: k }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/70 font-medium", children: v })
                        ] }, k))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "w-full h-12 rounded-2xl text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]",
                        style: {
                          background: "linear-gradient(135deg, #2563EB, #22C55E)",
                          boxShadow: "0 6px 24px rgba(37,99,235,0.4)"
                        },
                        "data-ocid": "pro-export.download_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
                          " Download File"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPhase("idle"),
                        className: "flex-1 h-10 rounded-xl text-white/50 hover:text-white/80 text-[12px] font-medium transition-all hover:bg-white/[0.06]",
                        style: { border: "1px solid rgba(255,255,255,0.08)" },
                        "data-ocid": "pro-export.export_again",
                        children: "Export Again"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/30", children: "Share to" }),
                      [
                        { Icon: Youtube, color: "#FF0000", label: "YouTube" },
                        {
                          Icon: Instagram,
                          color: "#E1306C",
                          label: "Instagram"
                        },
                        { Icon: Share2, color: "#2563EB", label: "TikTok" }
                      ].map(({ Icon, color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: `Share to ${label}`,
                          className: "w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110",
                          style: {
                            background: `${color}18`,
                            border: `1px solid ${color}40`,
                            color
                          },
                          "data-ocid": `pro-export.share-${label.toLowerCase()}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 })
                        },
                        label
                      ))
                    ] })
                  ]
                },
                "done"
              )
            ) : phase === "exporting" ? (
              // ── Export progress
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "flex flex-col items-center px-6 pb-8 pt-4 gap-5",
                  "data-ocid": "pro-export.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-x-0 top-0 h-40 pointer-events-none",
                        style: {
                          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 100%)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircularProgress, { value: progress }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.p,
                        {
                          initial: { opacity: 0, y: 4 },
                          animate: { opacity: 1, y: 0 },
                          className: "text-[13px] font-medium text-white/80",
                          children: EXPORT_STEPS[stepIndex]
                        },
                        stepIndex
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/30", children: [
                        "Est. ",
                        Math.max(0, Math.round(timeRemaining)),
                        "s remaining"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: EXPORT_STEPS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1 rounded-full transition-all duration-500",
                        style: {
                          width: i === stepIndex ? 24 : 6,
                          background: i <= stepIndex ? "#2563EB" : "rgba(255,255,255,0.1)"
                        }
                      },
                      i
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: cancelExport,
                        className: "h-10 px-6 rounded-xl text-white/40 hover:text-white/70 text-[12px] font-medium transition-all hover:bg-white/[0.06]",
                        style: { border: "1px solid rgba(255,255,255,0.07)" },
                        "data-ocid": "pro-export.cancel_button",
                        children: "Cancel Export"
                      }
                    )
                  ]
                },
                "exporting"
              )
            ) : (
              // ── Idle: configuration
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "px-6 pb-6 space-y-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: sectionLabelStyle, children: "Format" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: FORMAT_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFormat(f.id),
                          className: "relative flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all hover:scale-[1.02]",
                          style: {
                            background: format === f.id ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${format === f.id ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                            boxShadow: format === f.id ? "0 0 16px rgba(37,99,235,0.25)" : void 0
                          },
                          "data-ocid": `pro-export.format-${f.id}`,
                          children: [
                            f.popular && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap",
                                style: {
                                  background: "linear-gradient(90deg,#2563EB,#22C55E)",
                                  color: "#fff"
                                },
                                children: "Popular"
                              }
                            ),
                            f.id === "mp4" || f.id === "mov" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Film,
                              {
                                size: 18,
                                style: {
                                  color: format === f.id ? "#2563EB" : "rgba(255,255,255,0.4)"
                                }
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Image,
                              {
                                size: 18,
                                style: {
                                  color: format === f.id ? "#2563EB" : "rgba(255,255,255,0.4)"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[11px] font-bold",
                                style: {
                                  color: format === f.id ? "#2563EB" : "rgba(255,255,255,0.7)"
                                },
                                children: f.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[9px]",
                                style: { color: "rgba(255,255,255,0.3)" },
                                children: f.description
                              }
                            )
                          ]
                        },
                        f.id
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: sectionLabelStyle, children: "Quality" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: QUALITY_OPTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setQuality(q.id),
                          className: "relative flex flex-col gap-1 px-3 py-3 rounded-xl border transition-all hover:scale-[1.02] text-left",
                          style: {
                            background: quality === q.id ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${quality === q.id ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                            boxShadow: quality === q.id ? "0 0 16px rgba(37,99,235,0.2)" : void 0
                          },
                          "data-ocid": `pro-export.quality-${q.id.toLowerCase()}`,
                          children: [
                            q.recommended && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "absolute top-2 right-2 text-[7px] font-bold px-1.5 py-0.5 rounded-full",
                                style: {
                                  background: "rgba(34,197,94,0.2)",
                                  color: "#22C55E",
                                  border: "1px solid rgba(34,197,94,0.3)"
                                },
                                children: "Recommended"
                              }
                            ),
                            q.premium && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "absolute top-2 right-2 text-[7px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5",
                                style: {
                                  background: "rgba(245,158,11,0.2)",
                                  color: "#f59e0b",
                                  border: "1px solid rgba(245,158,11,0.3)"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 7 }),
                                  " Premium"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[13px] font-bold",
                                style: {
                                  color: quality === q.id ? "#2563EB" : "rgba(255,255,255,0.8)"
                                },
                                children: q.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[10px]",
                                style: { color: "rgba(255,255,255,0.4)" },
                                children: q.sublabel
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  className: "text-[9px]",
                                  style: { color: "rgba(255,255,255,0.3)" },
                                  children: [
                                    q.sizeMB,
                                    " / 1 min"
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-[9px]",
                                  style: { color: "rgba(255,255,255,0.2)" },
                                  children: "·"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-[9px]",
                                  style: { color: "rgba(255,255,255,0.3)" },
                                  children: q.renderTime
                                }
                              )
                            ] })
                          ]
                        },
                        q.id
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: sectionLabelStyle, children: "Frame Rate" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: FPS_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFps(f.fps),
                          className: "flex flex-col items-center gap-0.5 py-3 rounded-xl border transition-all hover:scale-[1.02]",
                          style: {
                            background: fps === f.fps ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${fps === f.fps ? "#2563EB" : "rgba(255,255,255,0.08)"}`
                          },
                          "data-ocid": `pro-export.fps-${f.fps}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[14px] font-bold",
                                style: {
                                  color: fps === f.fps ? "#2563EB" : "rgba(255,255,255,0.8)"
                                },
                                children: f.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[9px]",
                                style: { color: "rgba(255,255,255,0.35)" },
                                children: f.description
                              }
                            )
                          ]
                        },
                        f.fps
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl overflow-hidden",
                        style: { border: "1px solid rgba(255,255,255,0.06)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => setAdvancedOpen((v) => !v),
                              className: "w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors",
                              "data-ocid": "pro-export.advanced_toggle",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-white/40 uppercase tracking-widest", children: "Advanced Options" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  motion.div,
                                  {
                                    animate: { rotate: advancedOpen ? 180 : 0 },
                                    transition: { duration: 0.2 },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "svg",
                                      {
                                        width: "12",
                                        height: "12",
                                        viewBox: "0 0 12 12",
                                        fill: "none",
                                        role: "img",
                                        "aria-label": "Toggle",
                                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "path",
                                          {
                                            d: "M2 4l4 4 4-4",
                                            stroke: "rgba(255,255,255,0.3)",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round"
                                          }
                                        )
                                      }
                                    )
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: advancedOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: "auto", opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: { duration: 0.2 },
                              className: "overflow-hidden",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "px-4 pb-4 space-y-4",
                                  style: {
                                    borderTop: "1px solid rgba(255,255,255,0.06)"
                                  },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 flex items-center justify-between", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-white/70 font-medium", children: "Hardware Acceleration" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mt-0.5", children: "Use GPU for faster encoding" })
                                      ] }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => setHwAccel((v) => !v),
                                          className: "relative w-10 rounded-full transition-all",
                                          style: {
                                            height: 22,
                                            background: hwAccel ? "#2563EB" : "rgba(255,255,255,0.1)",
                                            border: `1px solid ${hwAccel ? "#2563EB" : "rgba(255,255,255,0.12)"}`
                                          },
                                          "data-ocid": "pro-export.hw-accel-toggle",
                                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "span",
                                            {
                                              className: "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all",
                                              style: {
                                                left: hwAccel ? "calc(100% - 18px)" : 2
                                              }
                                            }
                                          )
                                        }
                                      )
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40 mb-2", children: "Audio Bitrate" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["128 kbps", "192 kbps", "320 kbps"].map(
                                        (b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "button",
                                          {
                                            type: "button",
                                            onClick: () => setAudioBitrate(b),
                                            className: "flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all",
                                            style: {
                                              background: audioBitrate === b ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                                              border: `1px solid ${audioBitrate === b ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                                              color: audioBitrate === b ? "#2563EB" : "rgba(255,255,255,0.5)"
                                            },
                                            "data-ocid": `pro-export.audio-bitrate-${b.replace(/\s+/g, "-").toLowerCase()}`,
                                            children: b
                                          },
                                          b
                                        )
                                      ) })
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40 mb-2", children: "Color Space" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["sRGB", "Rec.709", "Rec.2020"].map((cs) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => setColorSpace(cs),
                                          className: "flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all",
                                          style: {
                                            background: colorSpace === cs ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                                            border: `1px solid ${colorSpace === cs ? "#2563EB" : "rgba(255,255,255,0.08)"}`,
                                            color: colorSpace === cs ? "#2563EB" : "rgba(255,255,255,0.5)"
                                          },
                                          "data-ocid": `pro-export.color-space-${cs.toLowerCase().replace(/\./g, "")}`,
                                          children: cs
                                        },
                                        cs
                                      )) })
                                    ] })
                                  ]
                                }
                              )
                            }
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between px-4 py-2.5 rounded-xl",
                          style: {
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/40", children: "Export settings" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-[11px] font-semibold",
                                style: { color: "rgba(255,255,255,0.65)" },
                                children: [
                                  format.toUpperCase(),
                                  " · ",
                                  quality,
                                  " · ",
                                  fps,
                                  "fps"
                                ]
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: startExport,
                          className: "w-full h-13 rounded-2xl text-white text-[14px] font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]",
                          style: {
                            height: 52,
                            background: "linear-gradient(135deg, #2563EB 0%, #22C55E 100%)",
                            boxShadow: "0 8px 32px rgba(37,99,235,0.4), 0 0 0 1px rgba(255,255,255,0.06)"
                          },
                          "data-ocid": "pro-export.export_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 17 }),
                            "Export ",
                            format.toUpperCase()
                          ]
                        }
                      )
                    ] })
                  ]
                },
                "idle"
              )
            ) }) })
          ]
        }
      )
    }
  ) });
}
function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.floor(s % 1 * 10);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${ms}`;
}
function fmtShort(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}s`;
}
const ASPECT_OPTIONS = ["16:9", "9:16", "1:1", "4:5", "21:9"];
const SPEED_PRESETS = [
  { label: "Montage", value: 2 },
  { label: "Hero", value: 1.5 },
  { label: "Bullet", value: 0.25 },
  { label: "Smooth Slow", value: 0.5 }
];
const SPEED_VALUES = [0.1, 0.25, 0.5, 1, 1.5, 2, 4];
function WaveformBars({
  seed = 42,
  count = 28
}) {
  const bars = reactExports.useMemo(() => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const h = 18 + 45 * Math.abs(Math.sin(i * 0.37 + seed * 0.1 + 1.2)) + 25 * Math.abs(Math.sin(i * 0.91 + seed * 0.07 + 0.4));
      out.push(Math.min(92, h));
    }
    return out;
  }, [count, seed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end gap-px overflow-hidden px-1 pb-0.5 pointer-events-none", children: bars.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 rounded-sm",
      style: { height: `${h}%`, background: "oklch(0.65 0.17 150 / 0.45)" }
    },
    i
  )) });
}
function Tooltip({ text, shortcut }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none",
      style: { whiteSpace: "nowrap" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded px-2 py-1 text-[10px] font-medium flex items-center gap-1.5",
          style: {
            background: "oklch(0.18 0.008 240)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 12px oklch(0 0 0 / 0.4)",
            color: "oklch(0.85 0 0)"
          },
          children: [
            text,
            shortcut && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded px-1 text-[9px] font-bold",
                style: {
                  background: "oklch(0.12 0.005 240)",
                  color: "oklch(0.6 0 0)",
                  border: "1px solid rgba(255,255,255,0.08)"
                },
                children: shortcut
              }
            )
          ]
        }
      )
    }
  );
}
function ToolBtn({
  icon: Icon,
  tooltip,
  shortcut,
  active,
  danger,
  disabled,
  onClick,
  dataOcid
}) {
  const [hover, setHover] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        type: "button",
        onClick,
        disabled,
        whileHover: { scale: disabled ? 1 : 1.08 },
        whileTap: { scale: disabled ? 1 : 0.92 },
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        "data-ocid": dataOcid,
        className: "flex items-center justify-center rounded-md transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
        style: {
          width: 30,
          height: 30,
          background: active ? "oklch(0.38 0.18 250 / 0.25)" : hover && !disabled ? "oklch(0.18 0.006 240)" : "transparent",
          border: active ? "1px solid oklch(0.38 0.18 250 / 0.6)" : "1px solid transparent",
          boxShadow: active ? "0 0 8px oklch(0.38 0.18 250 / 0.4)" : "none",
          color: danger ? "oklch(0.65 0.2 25)" : active ? "oklch(0.7 0.2 250)" : "oklch(0.6 0 0)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 })
      }
    ),
    hover && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { text: tooltip, shortcut })
  ] });
}
function ProTimeline({
  duration,
  currentTime,
  clips,
  textOverlays,
  selectedId,
  zoom,
  aspectRatio,
  onSeek,
  onZoom,
  onSelectClip,
  onSelectText,
  onUpdateClip,
  onRemoveClip,
  onDuplicateClip,
  onSplitClip,
  onUndo,
  onSetAspectRatio
}) {
  const rulerRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const [activeTool, setActiveTool] = reactExports.useState("select");
  const [showAspectDropdown, setShowAspectDropdown] = reactExports.useState(false);
  const [showSpeedPopover, setShowSpeedPopover] = reactExports.useState(false);
  const [speedValue, setSpeedValue] = reactExports.useState(1);
  const [snapEnabled, setSnapEnabled] = reactExports.useState(true);
  const [loop, setLoop] = reactExports.useState(false);
  const [tracks, setTracks] = reactExports.useState([
    {
      id: "video",
      type: "video",
      name: "Video 1",
      locked: false,
      visible: true,
      height: 72
    },
    {
      id: "audio",
      type: "audio",
      name: "Audio",
      locked: false,
      visible: true,
      height: 48
    },
    {
      id: "text",
      type: "text",
      name: "Text",
      locked: false,
      visible: true,
      height: 40
    }
  ]);
  const HEADER_W = 52;
  const effDur = Math.max(duration, 30);
  const pxPerSec = reactExports.useMemo(() => {
    var _a;
    const rulerWidth = Math.max(
      600,
      (((_a = scrollRef.current) == null ? void 0 : _a.clientWidth) ?? 600) - HEADER_W
    );
    return rulerWidth / effDur * zoom;
  }, [effDur, zoom]);
  const timeToPx = reactExports.useCallback((t) => t * pxPerSec, [pxPerSec]);
  const pxToTime = reactExports.useCallback(
    (px) => Math.max(0, Math.min(effDur, px / pxPerSec)),
    [effDur, pxPerSec]
  );
  const ticks = reactExports.useMemo(() => {
    const interval = Math.max(0.5, effDur / (20 * zoom));
    const snappedInterval = interval < 1 ? 0.5 : interval < 2 ? 1 : interval < 5 ? 2 : interval < 10 ? 5 : 10;
    const result = [];
    for (let t = 0; t <= effDur + 0.01; t += snappedInterval) result.push(t);
    return result;
  }, [effDur, zoom]);
  const timeFromRulerX = reactExports.useCallback(
    (clientX) => {
      var _a;
      const rect = (_a = rulerRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return 0;
      return pxToTime(clientX - rect.left);
    },
    [pxToTime]
  );
  const handleRulerClick = reactExports.useCallback(
    (e) => onSeek(timeFromRulerX(e.clientX)),
    [timeFromRulerX, onSeek]
  );
  const startPlayheadDrag = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      const onMove = (me) => onSeek(timeFromRulerX(me.clientX));
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [timeFromRulerX, onSeek]
  );
  const startEdgeDrag = reactExports.useCallback(
    (e, clip, edge) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startVal = edge === "trimIn" ? clip.trimIn : clip.trimOut;
      const onMove = (me) => {
        const delta = (me.clientX - startX) / pxPerSec;
        const nv = Math.max(0, Math.min(effDur, startVal + delta));
        if (edge === "trimIn")
          onUpdateClip(clip.id, { trimIn: Math.min(nv, clip.trimOut - 0.1) });
        else
          onUpdateClip(clip.id, { trimOut: Math.max(nv, clip.trimIn + 0.1) });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pxPerSec, effDur, onUpdateClip]
  );
  const startClipDrag = reactExports.useCallback(
    (e, clip) => {
      if (activeTool === "split") return;
      e.stopPropagation();
      const startX = e.clientX;
      const origStart = clip.startTime;
      const origEnd = clip.endTime ?? clip.startTime + clip.duration;
      const dur = origEnd - origStart;
      const onMove = (me) => {
        const delta = (me.clientX - startX) / pxPerSec;
        let newStart = Math.max(0, origStart + delta);
        if (snapEnabled) newStart = Math.round(newStart * 10) / 10;
        onUpdateClip(clip.id, { startTime: newStart, endTime: newStart + dur });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [activeTool, pxPerSec, onUpdateClip, snapEnabled]
  );
  const handleTrackClick = reactExports.useCallback(
    (e, clip) => {
      if (activeTool === "split" && clip) {
        onSplitClip(clip.id);
        return;
      }
      const t = timeFromRulerX(e.clientX);
      if (!clip) onSeek(t);
    },
    [activeTool, timeFromRulerX, onSeek, onSplitClip]
  );
  const handleRippleDelete = reactExports.useCallback(() => {
    if (!selectedId) return;
    const clip = clips.find((c) => c.id === selectedId);
    if (!clip) return;
    const deletedDur = (clip.endTime ?? clip.startTime + clip.duration) - clip.startTime;
    onRemoveClip(clip.id);
    const toShift = clips.filter(
      (c) => c.trackType === clip.trackType && c.startTime > clip.startTime
    );
    for (const c of toShift) {
      onUpdateClip(c.id, {
        startTime: Math.max(0, c.startTime - deletedDur),
        endTime: Math.max(
          deletedDur,
          (c.endTime ?? c.startTime + c.duration) - deletedDur
        )
      });
    }
  }, [selectedId, clips, onRemoveClip, onUpdateClip]);
  const toggleTrackLock = (id) => setTracks(
    (prev) => prev.map((t) => t.id === id ? { ...t, locked: !t.locked } : t)
  );
  const toggleTrackVisible = (id) => setTracks(
    (prev) => prev.map((t) => t.id === id ? { ...t, visible: !t.visible } : t)
  );
  const videoClips = clips.filter((c) => c.trackType === "video");
  const audioClips = clips.filter((c) => c.trackType === "audio");
  const hasSelectedClip = selectedId ? clips.some((c) => c.id === selectedId) : false;
  const playheadX = timeToPx(currentTime);
  const totalWidth = Math.max(800, timeToPx(effDur) + 40);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col select-none font-editor",
      style: {
        height: 268,
        background: "oklch(0.075 0.004 240)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "var(--font-editor, 'Inter', sans-serif)"
      },
      "data-ocid": "pro-timeline",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1 px-3 flex-shrink-0",
            style: {
              height: 40,
              background: "oklch(0.095 0.005 240)",
              borderBottom: "1px solid rgba(255,255,255,0.06)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-0.5 rounded-md p-0.5",
                  style: {
                    background: "oklch(0.115 0.005 240)",
                    border: "1px solid rgba(255,255,255,0.05)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ToolBtn,
                      {
                        icon: ZoomIn,
                        tooltip: "Select",
                        shortcut: "V",
                        active: activeTool === "select",
                        onClick: () => setActiveTool("select"),
                        dataOcid: "timeline-tool-select"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ToolBtn,
                      {
                        icon: Scissors,
                        tooltip: "Split/Razor",
                        shortcut: "S",
                        active: activeTool === "split",
                        onClick: () => setActiveTool(activeTool === "split" ? "select" : "split"),
                        dataOcid: "timeline-tool-split"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-5 mx-1",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: RotateCcw,
                  tooltip: "Undo",
                  shortcut: "Ctrl+Z",
                  onClick: onUndo,
                  dataOcid: "timeline-undo"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: RotateCw,
                  tooltip: "Redo",
                  shortcut: "Ctrl+Y",
                  onClick: () => {
                  },
                  dataOcid: "timeline-redo"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-5 mx-1",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: Trash2,
                  tooltip: "Ripple Delete",
                  shortcut: "Del",
                  danger: true,
                  disabled: !hasSelectedClip,
                  onClick: handleRippleDelete,
                  dataOcid: "timeline-ripple-delete"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: Copy,
                  tooltip: "Duplicate Clip",
                  shortcut: "D",
                  disabled: !hasSelectedClip,
                  onClick: () => {
                    if (selectedId) onDuplicateClip(selectedId);
                  },
                  dataOcid: "timeline-duplicate"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: Snowflake,
                  tooltip: "Freeze Frame",
                  disabled: !hasSelectedClip,
                  onClick: () => {
                  },
                  dataOcid: "timeline-freeze"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: RotateCcw,
                  tooltip: "Reverse Clip",
                  disabled: !hasSelectedClip,
                  onClick: () => {
                  },
                  dataOcid: "timeline-reverse"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToolBtn,
                  {
                    icon: Zap,
                    tooltip: "Speed",
                    active: speedValue !== 1,
                    disabled: !hasSelectedClip,
                    onClick: () => setShowSpeedPopover((v) => !v),
                    dataOcid: "timeline-speed"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSpeedPopover && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 4, scale: 0.95 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: 4, scale: 0.95 },
                    className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 rounded-xl p-3",
                    style: {
                      background: "oklch(0.12 0.006 240)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.5)"
                    },
                    "data-ocid": "timeline-speed-popover",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[10px] font-bold uppercase tracking-widest mb-2",
                          style: { color: "oklch(0.5 0 0)" },
                          children: "Speed"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "range",
                          min: 0,
                          max: SPEED_VALUES.length - 1,
                          step: 1,
                          value: SPEED_VALUES.indexOf(speedValue) >= 0 ? SPEED_VALUES.indexOf(speedValue) : 3,
                          onChange: (e) => setSpeedValue(SPEED_VALUES[Number(e.target.value)]),
                          className: "w-full mb-1",
                          style: { accentColor: "#2563EB" },
                          "data-ocid": "timeline-speed-slider"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "text-center text-xs font-bold mb-3",
                          style: { color: "oklch(0.7 0.18 250)" },
                          children: [
                            speedValue,
                            "x"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1", children: SPEED_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setSpeedValue(p.value),
                          className: "text-[10px] py-1 rounded font-semibold transition-all",
                          style: {
                            background: speedValue === p.value ? "oklch(0.38 0.18 250 / 0.25)" : "oklch(0.15 0.005 240)",
                            border: speedValue === p.value ? "1px solid oklch(0.38 0.18 250 / 0.5)" : "1px solid rgba(255,255,255,0.06)",
                            color: speedValue === p.value ? "oklch(0.7 0.2 250)" : "oklch(0.6 0 0)"
                          },
                          "data-ocid": `timeline-speed-preset-${p.label.toLowerCase().replace(" ", "-")}`,
                          children: p.label
                        },
                        p.label
                      )) })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolBtn,
                {
                  icon: Clover,
                  tooltip: "Transition",
                  onClick: () => {
                  },
                  dataOcid: "timeline-transition"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-5 mx-1",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: () => setSnapEnabled((v) => !v),
                  className: "flex items-center gap-1 px-2 h-7 rounded text-[10px] font-semibold transition-all",
                  style: {
                    background: snapEnabled ? "oklch(0.38 0.18 250 / 0.2)" : "oklch(0.13 0.005 240)",
                    border: snapEnabled ? "1px solid oklch(0.38 0.18 250 / 0.5)" : "1px solid rgba(255,255,255,0.06)",
                    color: snapEnabled ? "oklch(0.7 0.18 250)" : "oklch(0.5 0 0)"
                  },
                  "data-ocid": "timeline-snap-toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px]", children: "⊞" }),
                    " Snap"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1 rounded-md px-2 py-1",
                  style: {
                    background: "oklch(0.115 0.005 240)",
                    border: "1px solid rgba(255,255,255,0.05)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => onZoom(Math.max(0.25, zoom - 0.25)),
                        className: "flex items-center justify-center w-5 h-5 rounded hover:bg-white/5 transition-colors",
                        style: { color: "oklch(0.55 0 0)" },
                        "data-ocid": "timeline-zoom-out",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 11 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-[10px] font-bold w-10 text-center",
                        style: { color: "oklch(0.65 0 0)" },
                        children: [
                          zoom.toFixed(1),
                          "x"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => onZoom(Math.min(8, zoom + 0.25)),
                        className: "flex items-center justify-center w-5 h-5 rounded hover:bg-white/5 transition-colors",
                        style: { color: "oklch(0.55 0 0)" },
                        "data-ocid": "timeline-zoom-in",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 11 })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowAspectDropdown((v) => !v),
                    className: "flex items-center gap-1 px-2.5 h-7 rounded-full text-[10px] font-bold transition-all hover:opacity-80",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.38 0.18 250 / 0.3), oklch(0.65 0.17 150 / 0.2))",
                      border: "1px solid oklch(0.38 0.18 250 / 0.4)",
                      color: "oklch(0.75 0.15 250)"
                    },
                    "data-ocid": "timeline-aspect-ratio-button",
                    children: [
                      aspectRatio,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 10 })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAspectDropdown && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 4, scale: 0.95 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: 4, scale: 0.95 },
                    className: "absolute bottom-full right-0 mb-2 z-50 rounded-xl py-1 min-w-[110px]",
                    style: {
                      background: "oklch(0.12 0.006 240)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.5)"
                    },
                    "data-ocid": "timeline-aspect-dropdown",
                    children: ASPECT_OPTIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          onSetAspectRatio(r);
                          setShowAspectDropdown(false);
                        },
                        className: "w-full text-left px-3 py-1.5 text-xs font-semibold transition-all hover:bg-white/5",
                        style: {
                          color: aspectRatio === r ? "oklch(0.7 0.18 250)" : "oklch(0.6 0 0)"
                        },
                        "data-ocid": `timeline-aspect-${r.replace(":", "-")}`,
                        children: [
                          r === aspectRatio ? "✓ " : "   ",
                          r
                        ]
                      },
                      r
                    ))
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: scrollRef,
            className: "flex-1 overflow-x-auto overflow-y-hidden flex flex-col",
            style: {
              scrollbarWidth: "thin",
              scrollbarColor: "oklch(0.2 0 0) transparent"
            },
            onWheel: (e) => {
              if (e.ctrlKey) {
                e.preventDefault();
                onZoom(
                  Math.max(0.25, Math.min(8, zoom + (e.deltaY < 0 ? 0.25 : -0.25)))
                );
              }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: totalWidth + HEADER_W, position: "relative" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-stretch flex-shrink-0",
                  style: {
                    height: 24,
                    background: "oklch(0.085 0.004 240)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: HEADER_W, flexShrink: 0 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        ref: rulerRef,
                        className: "relative flex-1 cursor-pointer overflow-hidden",
                        style: { width: totalWidth },
                        onClick: handleRulerClick,
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ")
                            handleRulerClick(e);
                        },
                        role: "slider",
                        "aria-label": "Seek ruler",
                        "aria-valuenow": currentTime,
                        "aria-valuemin": 0,
                        "aria-valuemax": effDur,
                        tabIndex: 0,
                        children: [
                          ticks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "absolute top-0 bottom-0 flex flex-col items-center",
                              style: { left: timeToPx(t) },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "w-px h-full",
                                    style: {
                                      background: t % 5 === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"
                                    }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "absolute bottom-0.5 text-[9px] font-mono -translate-x-1/2",
                                    style: { color: "oklch(0.38 0 0)", whiteSpace: "nowrap" },
                                    children: fmtShort(t)
                                  }
                                )
                              ]
                            },
                            t
                          )),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute top-0 bottom-0 w-px z-20 pointer-events-none",
                              style: {
                                left: playheadX,
                                background: "#ef4444",
                                boxShadow: "0 0 6px #ef4444cc"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "absolute top-0 z-30 cursor-grab active:cursor-grabbing",
                              style: { left: playheadX, transform: "translateX(-50%)" },
                              onMouseDown: startPlayheadDrag,
                              "data-ocid": "timeline-playhead-handle",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "flex flex-col items-center",
                                  style: { color: "#ef4444" },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "div",
                                      {
                                        className: "w-2 h-2 rotate-45 mb-[-1px]",
                                        style: { background: "#ef4444" }
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "div",
                                      {
                                        className: "text-[9px] font-bold rounded px-1 -mt-1 whitespace-nowrap",
                                        style: {
                                          background: "#ef4444",
                                          color: "white",
                                          fontSize: 8
                                        },
                                        children: fmt(currentTime)
                                      }
                                    )
                                  ]
                                }
                              )
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              tracks.map((track) => {
                const isVideo = track.type === "video";
                const isAudio = track.type === "audio";
                const isText = track.type === "text";
                const trackClips = isVideo ? videoClips : isAudio ? audioClips : [];
                const trackTextOverlays = isText ? textOverlays : [];
                const trackAccent = isVideo ? "oklch(0.45 0.2 250)" : isAudio ? "oklch(0.55 0.17 150)" : "oklch(0.65 0.18 70)";
                const trackBg = isVideo ? "oklch(0.38 0.18 250 / 0.06)" : isAudio ? "oklch(0.45 0.17 150 / 0.05)" : "oklch(0.55 0.15 70 / 0.05)";
                const clipGradient = isVideo ? "linear-gradient(135deg, oklch(0.28 0.18 260) 0%, oklch(0.35 0.2 280) 100%)" : isAudio ? "linear-gradient(135deg, oklch(0.22 0.12 155) 0%, oklch(0.28 0.15 170) 100%)" : "linear-gradient(135deg, oklch(0.35 0.14 65) 0%, oklch(0.42 0.18 75) 100%)";
                const allItems = [
                  ...trackClips.map((c) => ({
                    id: c.id,
                    start: c.startTime,
                    end: c.endTime,
                    name: c.name,
                    isClip: true,
                    clip: c,
                    text: null
                  })),
                  ...trackTextOverlays.map((t) => ({
                    id: t.id,
                    start: t.startTime,
                    end: t.endTime,
                    name: t.content.slice(0, 24),
                    isClip: false,
                    clip: null,
                    text: t
                  }))
                ];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex border-b",
                    style: {
                      height: track.height,
                      borderColor: "rgba(255,255,255,0.04)",
                      opacity: track.visible ? 1 : 0.35
                    },
                    "data-ocid": `timeline-track-${track.type}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex-shrink-0 flex items-center gap-1 px-1 border-r",
                          style: {
                            width: HEADER_W,
                            background: "oklch(0.09 0.004 240)",
                            borderColor: "rgba(255,255,255,0.05)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              GripVertical,
                              {
                                size: 10,
                                className: "cursor-grab",
                                style: { color: "oklch(0.3 0 0)" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-[9px] font-bold truncate leading-tight",
                                  style: { color: trackAccent },
                                  children: track.name
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => toggleTrackVisible(track.id),
                                    className: "rounded hover:bg-white/5 transition-colors p-0.5",
                                    "aria-label": track.visible ? "Hide track" : "Show track",
                                    "data-ocid": `timeline-track-visibility-${track.type}`,
                                    style: {
                                      color: track.visible ? "oklch(0.55 0 0)" : "oklch(0.35 0 0)"
                                    },
                                    children: track.visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 9 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 9 })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => toggleTrackLock(track.id),
                                    className: "rounded hover:bg-white/5 transition-colors p-0.5",
                                    "aria-label": track.locked ? "Unlock track" : "Lock track",
                                    "data-ocid": `timeline-track-lock-${track.type}`,
                                    style: {
                                      color: track.locked ? "oklch(0.65 0.15 50)" : "oklch(0.35 0 0)"
                                    },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 9 })
                                  }
                                )
                              ] })
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "relative flex-1 overflow-hidden",
                          style: {
                            background: trackBg,
                            cursor: activeTool === "split" ? "crosshair" : "default",
                            width: totalWidth
                          },
                          onClick: (e) => handleTrackClick(e, null),
                          onKeyDown: () => {
                          },
                          "aria-label": `${track.name} track area`,
                          children: [
                            allItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-[9px]",
                                style: { color: "oklch(0.28 0 0)" },
                                children: isVideo ? "Drop video to begin" : isAudio ? "Add audio from sidebar" : "Add text from sidebar"
                              }
                            ) }),
                            allItems.map((item, idx) => {
                              const isSelected = selectedId === item.id;
                              const clipW = Math.max(
                                4,
                                (item.end ?? 0) - timeToPx(item.start)
                              );
                              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                motion.div,
                                {
                                  layout: true,
                                  className: "absolute top-1 bottom-1 rounded-lg group overflow-hidden",
                                  style: {
                                    left: timeToPx(item.start),
                                    width: clipW,
                                    background: clipGradient,
                                    border: isSelected ? `2px solid ${trackAccent}` : "1px solid rgba(255,255,255,0.12)",
                                    boxShadow: isSelected ? `0 0 12px ${trackAccent}55, inset 0 1px 0 rgba(255,255,255,0.08)` : "inset 0 1px 0 rgba(255,255,255,0.06)",
                                    cursor: activeTool === "split" ? "crosshair" : track.locked ? "not-allowed" : "grab"
                                  },
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    if (activeTool === "split" && item.clip) {
                                      onSplitClip(item.id);
                                      return;
                                    }
                                    if (!track.locked) {
                                      if (item.isClip) onSelectClip(item.id);
                                      else onSelectText(item.id);
                                    }
                                  },
                                  onMouseDown: (e) => {
                                    if (!track.locked && item.clip && activeTool === "select") {
                                      startClipDrag(e, item.clip);
                                    }
                                  },
                                  "data-ocid": `timeline-${track.type}-clip.${idx + 1}`,
                                  children: [
                                    isAudio && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      WaveformBars,
                                      {
                                        seed: idx * 7 + 3,
                                        count: Math.max(8, Math.floor(clipW / 6))
                                      }
                                    ),
                                    clipW > 28 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        className: "absolute left-2 top-1 z-10 text-[9px] font-semibold truncate",
                                        style: {
                                          color: isAudio ? "oklch(0.8 0.12 150)" : isText ? "oklch(0.9 0.12 75)" : "oklch(0.8 0.12 260)",
                                          maxWidth: clipW - 20,
                                          textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                                        },
                                        children: isText ? `T  ${item.name}` : item.name
                                      }
                                    ),
                                    clipW > 60 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "span",
                                      {
                                        className: "absolute right-1.5 bottom-0.5 text-[8px] font-mono opacity-60",
                                        style: { color: "rgba(255,255,255,0.7)" },
                                        children: [
                                          ((item.end ?? 0) - item.start).toFixed(1),
                                          "s"
                                        ]
                                      }
                                    ),
                                    item.clip && !track.locked && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "div",
                                        {
                                          className: "absolute top-0 bottom-0 left-0 w-3 cursor-ew-resize z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                          onMouseDown: (e) => item.clip && startEdgeDrag(e, item.clip, "trimIn"),
                                          "data-ocid": `timeline-trimedge-in.${idx + 1}`,
                                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "div",
                                            {
                                              className: "w-0.5 h-5 rounded-full",
                                              style: { background: "rgba(255,255,255,0.6)" }
                                            }
                                          )
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "div",
                                        {
                                          className: "absolute top-0 bottom-0 right-0 w-3 cursor-ew-resize z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                          onMouseDown: (e) => item.clip && startEdgeDrag(e, item.clip, "trimOut"),
                                          "data-ocid": `timeline-trimedge-out.${idx + 1}`,
                                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "div",
                                            {
                                              className: "w-0.5 h-5 rounded-full",
                                              style: { background: "rgba(255,255,255,0.6)" }
                                            }
                                          )
                                        }
                                      )
                                    ] }),
                                    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "div",
                                      {
                                        className: "absolute inset-0 pointer-events-none",
                                        style: { background: "rgba(255,255,255,0.04)" }
                                      }
                                    )
                                  ]
                                },
                                item.id
                              );
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "absolute top-0 bottom-0 w-px z-30 pointer-events-none",
                                style: {
                                  left: playheadX,
                                  background: "#ef4444cc"
                                }
                              }
                            ),
                            activeTool === "split" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "absolute top-0 bottom-0 w-px z-30 pointer-events-none",
                                style: {
                                  left: playheadX,
                                  background: "#ef4444",
                                  boxShadow: "0 0 8px #ef4444",
                                  opacity: 0.9
                                }
                              }
                            )
                          ]
                        }
                      )
                    ]
                  },
                  track.id
                );
              })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-3 flex-shrink-0",
            style: {
              height: 28,
              background: "oklch(0.085 0.004 240)",
              borderTop: "1px solid rgba(255,255,255,0.04)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-[10px] font-mono",
                  style: { color: "oklch(0.4 0 0)" },
                  children: [
                    fmt(currentTime),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.28 0 0)" }, children: [
                      " / ",
                      fmt(duration)
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLoop((v) => !v),
                  className: "text-[10px] font-semibold px-2 h-5 rounded transition-all",
                  style: {
                    background: loop ? "oklch(0.38 0.18 250 / 0.2)" : "transparent",
                    border: loop ? "1px solid oklch(0.38 0.18 250 / 0.4)" : "1px solid transparent",
                    color: loop ? "oklch(0.7 0.18 250)" : "oklch(0.38 0 0)"
                  },
                  "data-ocid": "timeline-loop-toggle",
                  children: "⟳ Loop"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px]", style: { color: "oklch(0.35 0 0)" }, children: "Z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0.25,
                    max: 8,
                    step: 0.25,
                    value: zoom,
                    onChange: (e) => onZoom(Number(e.target.value)),
                    className: "w-24",
                    style: { accentColor: "#2563EB" },
                    "aria-label": "Timeline zoom",
                    "data-ocid": "timeline-zoom-slider"
                  }
                )
              ] })
            ]
          }
        ),
        (showAspectDropdown || showSpeedPopover) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-40",
            onClick: () => {
              setShowAspectDropdown(false);
              setShowSpeedPopover(false);
            },
            onKeyDown: () => {
            },
            role: "presentation"
          }
        )
      ]
    }
  );
}
class VideoEditorErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[VideoEditor] Error boundary caught:", error, info);
  }
  render() {
    var _a;
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-4 p-8",
          style: {
            height: "calc(100vh - 64px)",
            background: "#070B14",
            color: "#fff"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 flex items-center justify-center rounded-2xl",
                style: {
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 22, style: { color: "#ef4444" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-white/80 mb-1", children: "Video Editor encountered an error" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 mb-4 max-w-xs", children: ((_a = this.state.error) == null ? void 0 : _a.message) ?? "Unknown error" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => this.setState({ hasError: false, error: null }),
                  className: "px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90",
                  style: {
                    background: "linear-gradient(135deg, #2563EB, #22C55E)"
                  },
                  children: "Try Again"
                }
              )
            ] })
          ]
        }
      );
    }
    return this.props.children;
  }
}
function VideoEditorInner() {
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  const editor = useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();
  const {
    projectName,
    setProjectName,
    currentTime,
    duration,
    selectedClipId,
    selectedTextId,
    timelineZoom,
    setTimelineZoom,
    aspectRatio,
    setAspectRatio,
    videoClips,
    audioClips,
    textLayers,
    undoStack,
    redoStack,
    exportModalOpen,
    setExportModalOpen,
    undo,
    redo,
    takeSnapshot,
    updateVideoClip,
    removeVideoClip,
    setSelectedClipId,
    setSelectedTextId,
    setSelectedCaptionId,
    saveProject
  } = store;
  const allClips = [
    ...Object.values(videoClips ?? {}).map((c) => ({
      ...c,
      trackType: "video",
      endTime: c.startTime + c.duration - (c.trimIn ?? 0) - (c.trimOut ?? 0)
    })),
    ...Object.values(audioClips ?? {}).map((c) => ({
      id: c.id,
      type: "video",
      trackId: c.trackId,
      trackType: "audio",
      src: c.src,
      name: c.name,
      startTime: c.startTime,
      duration: c.duration,
      trimIn: c.trimIn,
      trimOut: c.trimOut,
      speed: 1,
      volume: c.volume,
      muted: c.muted,
      locked: c.locked,
      hidden: c.hidden,
      filters: {},
      transform: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        flipH: false,
        flipV: false
      },
      aspectRatio: "16:9",
      reversed: false,
      opacity: 1,
      endTime: c.startTime + c.duration - (c.trimIn ?? 0) - (c.trimOut ?? 0)
    }))
  ];
  const textOverlays = Object.values(textLayers ?? {});
  const handleUpdateClip = (id, patch) => {
    if (videoClips == null ? void 0 : videoClips[id])
      updateVideoClip(
        id,
        patch
      );
  };
  const handleSplitClip = (id) => {
    const clip = videoClips == null ? void 0 : videoClips[id];
    if (!clip) return;
    const splitAt = currentTime - clip.startTime;
    if (splitAt <= 0 || splitAt >= clip.duration - (clip.trimIn ?? 0) - (clip.trimOut ?? 0))
      return;
    takeSnapshot();
    const newId = `vclip-${Date.now()}`;
    updateVideoClip(id, {
      trimOut: clip.duration - (clip.trimIn ?? 0) - splitAt
    });
    store.addVideoClip({
      ...clip,
      id: newId,
      startTime: clip.startTime + splitAt,
      trimIn: (clip.trimIn ?? 0) + splitAt,
      trimOut: clip.trimOut ?? clip.duration
    });
  };
  const hasSrc = Object.keys(videoClips ?? {}).length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col",
      style: { height: "calc(100vh - 64px)", background: "#070B14" },
      "data-ocid": "video_editor.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorTopBar,
          {
            projectName,
            onProjectNameChange: setProjectName,
            onUndo: undo,
            onRedo: redo,
            canUndo: ((undoStack == null ? void 0 : undoStack.length) ?? 0) > 0,
            canRedo: ((redoStack == null ? void 0 : redoStack.length) ?? 0) > 0,
            zoom: timelineZoom,
            onSave: saveProject,
            onExport: () => setExportModalOpen(true),
            hasSrc
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditorLeftSidebar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VideoMonitor, { videoRef, audioRef }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProTimeline,
              {
                duration: duration ?? 0,
                currentTime: currentTime ?? 0,
                clips: allClips,
                textOverlays,
                selectedId: selectedClipId ?? selectedTextId ?? null,
                zoom: timelineZoom ?? 2,
                aspectRatio: aspectRatio ?? "16:9",
                onSeek: editor.seekTo,
                onZoom: setTimelineZoom,
                onSelectClip: (id) => {
                  setSelectedClipId(id);
                  setSelectedTextId(null);
                  setSelectedCaptionId(null);
                },
                onSelectText: (id) => {
                  setSelectedTextId(id);
                  setSelectedClipId(null);
                  setSelectedCaptionId(null);
                },
                onUpdateClip: handleUpdateClip,
                onRemoveClip: (id) => {
                  takeSnapshot();
                  removeVideoClip(id);
                },
                onDuplicateClip: (id) => {
                  const clip = videoClips == null ? void 0 : videoClips[id];
                  if (!clip) return;
                  takeSnapshot();
                  store.addVideoClip({
                    ...clip,
                    id: `vclip-${Date.now()}`,
                    startTime: clip.startTime + 0.5
                  });
                },
                onSplitClip: handleSplitClip,
                onUndo: undo,
                onSetAspectRatio: setAspectRatio
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditorRightPanel, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProExportModal,
          {
            isOpen: exportModalOpen ?? false,
            onClose: () => setExportModalOpen(false),
            projectName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, style: { display: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }) })
      ]
    }
  );
}
function VideoEditorPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(VideoEditorErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoEditorInner, {}) });
}
export {
  VideoEditorPage,
  VideoEditorPage as default
};
