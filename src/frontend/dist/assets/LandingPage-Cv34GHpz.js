import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { u as useInView, m as motion, A as AnimatePresence } from "./motion-DXodcWnX.js";
import { Z as Zap, V as Video, S as Sparkles, B as Bot, L as Layers, I as Image, a as Scissors, b as Mic, W as WandSparkles } from "./ui-lib-DG52wkUx.js";
const GLASS = {
  background: "rgba(16,24,32,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20
};
const GRADIENT_TEXT = {
  background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};
const SECTION_LABEL = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 14px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  background: "rgba(80,200,120,0.10)",
  border: "1px solid rgba(80,200,120,0.25)",
  color: "#50c878"
};
const floatAnimate = { y: [0, -10, 0] };
const floatTransition = {
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut"
};
const TRUST_ITEMS = [
  { icon: Zap, label: "Built for Modern Creators" },
  { icon: Video, label: "Designed for Cinematic Storytelling" },
  { icon: Sparkles, label: "Optimized for Viral Content" },
  { icon: Bot, label: "AI-Powered Creative Workflows" }
];
function TrustBadgesSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-16",
      "data-ocid": "landing.trust_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4", children: TRUST_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { delay: i * 0.1, duration: 0.5 },
          whileHover: { y: -4, scale: 1.02 },
          className: "flex flex-col items-center text-center gap-3 p-5",
          style: GLASS,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center w-10 h-10 rounded-xl",
                style: {
                  background: "linear-gradient(135deg, rgba(0,71,171,0.25) 0%, rgba(80,200,120,0.25) 100%)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-5 h-5", style: { color: "#50c878" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-semibold leading-snug",
                style: {
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                },
                children: item.label
              }
            )
          ]
        },
        item.label
      )) })
    }
  );
}
function LiveEditorEmbed({ src, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full rounded-2xl overflow-hidden",
      style: {
        background: "rgba(7,11,20,0.8)",
        border: "1px solid rgba(80,200,120,0.20)",
        boxShadow: "0 0 40px rgba(0,71,171,0.25), 0 0 80px rgba(80,200,120,0.10)",
        aspectRatio: "16/9"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none z-10",
            style: {
              background: "linear-gradient(135deg, rgba(0,71,171,0.08) 0%, rgba(80,200,120,0.06) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src,
            title: label,
            className: "absolute inset-0 w-full h-full",
            style: {
              border: "none",
              pointerEvents: "none",
              transform: "scale(1)",
              transformOrigin: "top left"
            },
            loading: "lazy",
            "aria-label": label
          }
        )
      ]
    }
  );
}
function ThumbnailStudioSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-24",
      style: { background: "rgba(255,255,255,0.015)" },
      "data-ocid": "landing.thumbnail_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            animate: inView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: SECTION_LABEL, children: "✦ Thumbnail Studio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "mt-5 mb-5 font-extrabold leading-tight",
                  style: {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#ffffff"
                  },
                  children: [
                    "Design Thumbnails",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: GRADIENT_TEXT, children: "That Get Clicked." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mb-8 text-base leading-relaxed",
                  style: {
                    color: "rgba(255,255,255,0.58)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: "Create scroll-stopping thumbnails for YouTube, TikTok, and gaming channels. AI-powered templates, smart text placement, glow effects, and one-click exports — all built in."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/thumbnail-studio", "data-ocid": "landing.thumbnail.cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: "inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer",
                  style: {
                    background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                    boxShadow: "0 4px 24px rgba(0,71,171,0.35)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.97 },
                  children: "Open Thumbnail Studio →"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            animate: inView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 0.6, delay: 0.15 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: floatAnimate, transition: floatTransition, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              LiveEditorEmbed,
              {
                src: "/editor/demo/canvas",
                label: "Thumbnail Studio preview"
              }
            ) })
          }
        )
      ] })
    }
  );
}
function VideoEditorSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-24",
      "data-ocid": "landing.video_editor_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            animate: inView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 0.6 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: floatAnimate, transition: floatTransition, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveEditorEmbed, { src: "/editor/demo", label: "Video Editor preview" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 30 },
            animate: inView ? { opacity: 1, x: 0 } : {},
            transition: { duration: 0.6, delay: 0.15 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: SECTION_LABEL, children: "✦ Video Editor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "mt-5 mb-5 font-extrabold leading-tight",
                  style: {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#ffffff"
                  },
                  children: [
                    "Edit Videos ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: GRADIENT_TEXT, children: "Like a Pro." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mb-8 text-base leading-relaxed",
                  style: {
                    color: "rgba(255,255,255,0.58)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: "A CapCut-style multi-track timeline editor with AI captions, cinematic color grading, transitions, and effects. Upload, edit, and export high-quality video — no downloads needed."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/video-editor", "data-ocid": "landing.video_editor.cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: "inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer",
                  style: {
                    background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                    boxShadow: "0 4px 24px rgba(0,71,171,0.35)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.97 },
                  children: "Open Video Editor →"
                }
              ) })
            ]
          }
        )
      ] })
    }
  );
}
const AD_LABEL_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 14px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  background: "rgba(37,99,235,0.12)",
  border: "1px solid rgba(37,99,235,0.30)",
  color: "#60a5fa"
};
const AD_GRADIENT_TEXT = {
  background: "linear-gradient(90deg, #2563EB 0%, #60a5fa 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};
const FORMAT_CHIPS = [
  { label: "Instagram Ads", color: "#e1306c" },
  { label: "TikTok Ads", color: "#69c9d0" },
  { label: "YouTube Ads", color: "#ff0000" },
  { label: "Meta Ads", color: "#0047ab" },
  { label: "Google Display", color: "#34a853" },
  { label: "Story Ads", color: "#833ab4" },
  { label: "Shorts Ads", color: "#ff6b35" },
  { label: "Product Ads", color: "#f59e0b" },
  { label: "Carousel Ads", color: "#06b6d4" }
];
const AD_FEATURES = [
  {
    icon: Sparkles,
    name: "AI Ad Generation",
    desc: "Describe your product. Get stunning, conversion-ready ads in seconds.",
    color: "#2563EB"
  },
  {
    icon: Layers,
    name: "Multi-Platform Formats",
    desc: "Instagram, TikTok, YouTube, Meta — optimized for every platform automatically.",
    color: "#60a5fa"
  },
  {
    icon: Zap,
    name: "Real-Time Analytics",
    desc: "Live performance metrics, CTR insights, and AI recommendations built in.",
    color: "#818cf8"
  }
];
function AdStudioMockup({ inView }) {
  const [aiVisible, setAiVisible] = reactExports.useState(false);
  const [ctr, setCtr] = reactExports.useState(0);
  const [reach, setReach] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setAiVisible((v) => !v), 2500);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame++;
      setCtr(
        Math.min(3.2, Number.parseFloat((3.2 * frame / total).toFixed(1)))
      );
      setReach(Math.min(142, Math.round(142 * frame / total)));
      if (frame >= total) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      animate: { y: [0, -6, 0] },
      transition: {
        duration: 4.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      },
      className: "relative rounded-2xl overflow-hidden select-none",
      style: {
        background: "rgba(15,23,42,0.96)",
        border: "1px solid rgba(37,99,235,0.25)",
        boxShadow: "0 0 50px rgba(37,99,235,0.20), 0 0 100px rgba(37,99,235,0.08), 0 24px 64px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 rounded-2xl pointer-events-none",
            animate: { opacity: [0.3, 0.7, 0.3] },
            transition: {
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            style: { boxShadow: "inset 0 0 0 1px rgba(37,99,235,0.45)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-4 py-2.5",
            style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
            children: [
              ["#ff5f57", "#febc2e", "#28c840"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: { background: c }
                },
                c
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "ml-auto text-xs font-semibold",
                  style: {
                    color: "rgba(255,255,255,0.30)",
                    fontFamily: "Inter, sans-serif"
                  },
                  children: "Ad Creator Studio"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", style: { minHeight: 200 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col items-center gap-3 py-4 px-2.5",
              style: { borderRight: "1px solid rgba(255,255,255,0.06)", width: 44 },
              children: [
                { color: "#2563EB" },
                { color: "#60a5fa" },
                { color: "#818cf8" },
                { color: "#34d399" },
                { color: "rgba(255,255,255,0.18)" }
              ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded-lg",
                  style: {
                    background: i === 0 ? `linear-gradient(135deg, ${item.color}, #3b82f6)` : item.color,
                    boxShadow: i === 0 ? `0 0 10px ${item.color}70` : "none"
                  }
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex-1 rounded-xl px-3 py-2",
                  style: {
                    background: "rgba(37,99,235,0.12)",
                    border: "1px solid rgba(37,99,235,0.25)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: {
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "Inter, sans-serif"
                        },
                        children: "CTR"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-bold text-sm",
                        style: { color: "#60a5fa", fontFamily: "Inter, sans-serif" },
                        children: [
                          ctr.toFixed(1),
                          "%"
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex-1 rounded-xl px-3 py-2",
                  style: {
                    background: "rgba(129,140,248,0.10)",
                    border: "1px solid rgba(129,140,248,0.22)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: {
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "Inter, sans-serif"
                        },
                        children: "Reach"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-bold text-sm",
                        style: { color: "#a5b4fc", fontFamily: "Inter, sans-serif" },
                        children: [
                          reach,
                          "K"
                        ]
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative rounded-xl overflow-hidden flex items-center justify-center",
                style: {
                  background: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 50%, #0f172a 100%)",
                  border: "1px solid rgba(37,99,235,0.30)",
                  aspectRatio: "4/3"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute inset-0 pointer-events-none",
                      animate: { opacity: [0.3, 0.6, 0.3] },
                      transition: {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      },
                      style: {
                        background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(37,99,235,0.30) 0%, transparent 70%)"
                      },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-black tracking-widest uppercase mb-1",
                        style: {
                          color: "rgba(255,255,255,0.50)",
                          fontFamily: "Inter, sans-serif"
                        },
                        children: "Limited Offer"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-black text-white",
                        style: {
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
                          textShadow: "0 0 20px rgba(37,99,235,0.8)"
                        },
                        children: "SHOP NOW"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: {
                          color: "rgba(255,255,255,0.55)",
                          fontFamily: "Inter, sans-serif"
                        },
                        children: "Elysian Premium Collection"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mt-2 inline-block px-4 py-1.5 rounded-full text-xs font-bold",
                        style: {
                          background: "linear-gradient(90deg, #2563EB, #60a5fa)",
                          color: "#fff"
                        },
                        children: "Get 40% Off →"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: aiVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.92 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.92 },
                      transition: { duration: 0.35 },
                      className: "absolute inset-0 flex flex-col items-center justify-center rounded-xl",
                      style: {
                        background: "rgba(7,11,20,0.82)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(37,99,235,0.35)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "w-6 h-6 rounded-full mb-2",
                            animate: { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] },
                            transition: {
                              duration: 1.2,
                              repeat: Number.POSITIVE_INFINITY
                            },
                            style: {
                              background: "radial-gradient(circle, #2563EB, #1d4ed8)",
                              boxShadow: "0 0 16px #2563EB"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs font-semibold",
                            style: {
                              color: "#60a5fa",
                              fontFamily: "Inter, sans-serif"
                            },
                            children: "AI Generating…"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "mt-2 w-24 h-1 rounded-full overflow-hidden",
                            style: { background: "rgba(255,255,255,0.10)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                className: "h-full rounded-full",
                                animate: { width: ["0%", "100%", "0%"] },
                                transition: {
                                  duration: 2.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut"
                                },
                                style: {
                                  background: "linear-gradient(90deg, #2563EB, #60a5fa)"
                                }
                              }
                            )
                          }
                        )
                      ]
                    },
                    "ai-overlay"
                  ) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-3 py-4 px-3",
              style: { borderLeft: "1px solid rgba(255,255,255,0.06)", width: 72 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs",
                    style: {
                      color: "rgba(255,255,255,0.30)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.1em"
                    },
                    children: "STYLE"
                  }
                ),
                [
                  { label: "Color", val: "72%", color: "#2563EB" },
                  { label: "Size", val: "55%", color: "#60a5fa" },
                  { label: "Blur", val: "38%", color: "#818cf8" }
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mb-1",
                      style: {
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: 9
                      },
                      children: s.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1.5 rounded-full",
                      style: { background: "rgba(255,255,255,0.08)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full",
                          style: {
                            width: s.val,
                            background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`
                          }
                        }
                      )
                    }
                  )
                ] }, s.label)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-1.5", children: ["#2563EB", "#ec4899"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-5 h-5 rounded-full",
                    style: { background: c, boxShadow: `0 0 6px ${c}80` }
                  },
                  c
                )) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AdCreatorSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-24 overflow-hidden",
      style: { background: "rgba(255,255,255,0.015)" },
      "data-ocid": "landing.ad_creator_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-14",
              initial: { opacity: 0, y: 20 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.55 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: AD_LABEL_STYLE, children: "⚡ AI-Powered Advertising" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    className: "mt-5 mb-4 font-extrabold leading-tight",
                    style: {
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "#ffffff"
                    },
                    children: [
                      "Ad Creative ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: AD_GRADIENT_TEXT, children: "Studio" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base max-w-xl mx-auto mb-6",
                    style: {
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      lineHeight: 1.7
                    },
                    children: "Design high-converting ads with AI generation, performance analytics, and professional creative workflows."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/ad-creator", "data-ocid": "landing.ad_creator.cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    className: "inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer",
                    style: {
                      background: "linear-gradient(90deg, #1d4ed8 0%, #2563EB 100%)",
                      boxShadow: "0 4px 24px rgba(37,99,235,0.40)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    whileHover: {
                      scale: 1.04,
                      boxShadow: "0 6px 32px rgba(37,99,235,0.55)"
                    },
                    whileTap: { scale: 0.97 },
                    children: "Open Ad Studio →"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -30 },
                animate: inView ? { opacity: 1, x: 0 } : {},
                transition: { duration: 0.6, delay: 0.1 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdStudioMockup, { inView })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "flex flex-col gap-5",
                initial: { opacity: 0, x: 30 },
                animate: inView ? { opacity: 1, x: 0 } : {},
                transition: { duration: 0.6, delay: 0.2 },
                children: AD_FEATURES.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: inView ? { opacity: 1, y: 0 } : {},
                    transition: { delay: 0.3 + i * 0.12, duration: 0.5 },
                    whileHover: { y: -4, scale: 1.02 },
                    className: "flex items-start gap-4 p-5 rounded-2xl",
                    style: {
                      background: "rgba(16,24,40,0.72)",
                      backdropFilter: "blur(16px)",
                      border: `1px solid ${feat.color}22`,
                      boxShadow: `0 4px 20px ${feat.color}10`
                    },
                    "data-ocid": `landing.ad_feature.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0",
                          style: {
                            background: `linear-gradient(135deg, ${feat.color}25, ${feat.color}40)`,
                            border: `1px solid ${feat.color}40`,
                            boxShadow: `0 0 16px ${feat.color}20`
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            feat.icon,
                            {
                              className: "w-5 h-5",
                              style: { color: feat.color }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-bold text-sm mb-1",
                            style: {
                              color: "#fff",
                              fontFamily: "'Plus Jakarta Sans', sans-serif"
                            },
                            children: feat.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm leading-relaxed",
                            style: {
                              color: "rgba(255,255,255,0.50)",
                              fontFamily: "'Plus Jakarta Sans', sans-serif"
                            },
                            children: feat.desc
                          }
                        )
                      ] })
                    ]
                  },
                  feat.name
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "mt-14 overflow-hidden",
              initial: { opacity: 0 },
              animate: inView ? { opacity: 1 } : {},
              transition: { duration: 0.6, delay: 0.5 },
              "data-ocid": "landing.ad_creator.format_row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
            @keyframes adMarquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          ` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      animation: "adMarquee 22s linear infinite",
                      width: "max-content"
                    },
                    children: [...FORMAT_CHIPS, ...FORMAT_CHIPS].map((chip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0",
                        style: {
                          background: `${chip.color}12`,
                          border: `1px solid ${chip.color}30`,
                          color: "rgba(255,255,255,0.72)",
                          marginRight: 10,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          whiteSpace: "nowrap"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-2 h-2 rounded-full flex-shrink-0",
                              style: {
                                background: chip.color,
                                boxShadow: `0 0 6px ${chip.color}`
                              }
                            }
                          ),
                          chip.label
                        ]
                      },
                      i
                    ))
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
const AI_TOOLS = [
  {
    icon: Bot,
    name: "AI Captions",
    desc: "Auto-generate subtitles from speech in real-time.",
    color: "#50c878"
  },
  {
    icon: Image,
    name: "AI Thumbnail Generator",
    desc: "Create click-worthy thumbnails instantly with AI.",
    color: "#0047ab"
  },
  {
    icon: Zap,
    name: "AI Hook Generator",
    desc: "Generate viral opening hooks for any niche.",
    color: "#f59e0b"
  },
  {
    icon: Scissors,
    name: "AI Background Removal",
    desc: "Remove backgrounds in one click, no green screen.",
    color: "#50c878"
  },
  {
    icon: Mic,
    name: "AI Voiceover",
    desc: "Add professional AI narration in multiple voices.",
    color: "#0078d4"
  }
];
function AIToolsSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-24",
      style: { background: "rgba(7,11,20,0.6)" },
      "data-ocid": "landing.ai_tools_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-14",
            initial: { opacity: 0, y: 20 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: SECTION_LABEL, children: "✦ AI Tools" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "mt-5 font-extrabold",
                  style: {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    color: "#ffffff"
                  },
                  children: [
                    "Supercharge Your ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: GRADIENT_TEXT, children: "Creative Flow." })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5", children: AI_TOOLS.map((tool, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { delay: i * 0.1, duration: 0.5 },
            whileHover: { y: -6, scale: 1.03 },
            className: "group flex flex-col gap-4 p-6 rounded-2xl cursor-pointer",
            style: GLASS,
            "data-ocid": `landing.ai_tool.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-11 h-11 flex items-center justify-center rounded-xl",
                  style: {
                    background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}35)`,
                    border: `1px solid ${tool.color}40`,
                    boxShadow: `0 0 16px ${tool.color}20`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(tool.icon, { className: "w-5 h-5", style: { color: tool.color } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-sm mb-1",
                    style: {
                      color: "#fff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    children: tool.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs leading-relaxed",
                    style: { color: "rgba(255,255,255,0.50)" },
                    children: tool.desc
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "hidden group-hover:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full self-start transition-all",
                  style: {
                    background: `${tool.color}20`,
                    border: `1px solid ${tool.color}40`,
                    color: tool.color
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full animate-pulse",
                        style: { background: tool.color }
                      }
                    ),
                    "Processing…"
                  ]
                }
              )
            ]
          },
          tool.name
        )) })
      ] })
    }
  );
}
const TEMPLATE_CATEGORIES = [
  "YouTube",
  "TikTok",
  "Shorts",
  "Gaming",
  "Ads",
  "Podcast",
  "Instagram"
];
const TEMPLATE_CARDS = {
  YouTube: [
    { title: "Gaming Channel Thumbnail", gradient: "135deg, #0047ab, #50c878" },
    { title: "Vlog Intro Card", gradient: "135deg, #7c3aed, #0047ab" },
    { title: "Tech Review Thumb", gradient: "135deg, #0047ab, #06b6d4" },
    { title: "Reaction Clip Cover", gradient: "135deg, #50c878, #f59e0b" },
    { title: "Tutorial Banner", gradient: "135deg, #dc2626, #0047ab" },
    { title: "Shorts Cover", gradient: "135deg, #50c878, #0047ab" }
  ],
  TikTok: [
    { title: "Viral Hook Card", gradient: "135deg, #69c9d0, #ee1d52" },
    { title: "Dance Cover", gradient: "135deg, #ee1d52, #69c9d0" },
    { title: "Trending Sound Cover", gradient: "135deg, #7c3aed, #ee1d52" },
    { title: "POV Story Card", gradient: "135deg, #f59e0b, #ee1d52" },
    { title: "Duet Template", gradient: "135deg, #69c9d0, #0047ab" },
    { title: "GRWM Cover", gradient: "135deg, #ec4899, #69c9d0" }
  ],
  Shorts: [
    { title: "Quick Tips Card", gradient: "135deg, #50c878, #0047ab" },
    { title: "60s Challenge Cover", gradient: "135deg, #f59e0b, #50c878" },
    { title: "Storytime Thumb", gradient: "135deg, #0047ab, #7c3aed" },
    { title: "Reaction Shorts", gradient: "135deg, #dc2626, #f59e0b" },
    { title: "News Short", gradient: "135deg, #06b6d4, #0047ab" },
    { title: "Motivation Short", gradient: "135deg, #50c878, #f59e0b" }
  ],
  Gaming: [
    { title: "FPS Highlight Reel", gradient: "135deg, #0047ab, #50c878" },
    { title: "Battle Royale Cover", gradient: "135deg, #dc2626, #f59e0b" },
    { title: "Speedrun Thumb", gradient: "135deg, #50c878, #0047ab" },
    { title: "Let's Play Intro", gradient: "135deg, #7c3aed, #50c878" },
    { title: "Ranked Game Card", gradient: "135deg, #f59e0b, #dc2626" },
    { title: "Montage Cover", gradient: "135deg, #06b6d4, #7c3aed" }
  ],
  Ads: [
    { title: "Product Launch Ad", gradient: "135deg, #0047ab, #06b6d4" },
    { title: "E-commerce Banner", gradient: "135deg, #50c878, #0047ab" },
    { title: "Flash Sale Card", gradient: "135deg, #dc2626, #f59e0b" },
    { title: "Brand Awareness Ad", gradient: "135deg, #7c3aed, #0047ab" },
    { title: "App Promo Reel", gradient: "135deg, #06b6d4, #50c878" },
    { title: "Retargeting Ad", gradient: "135deg, #f59e0b, #7c3aed" }
  ],
  Podcast: [
    { title: "Episode Thumbnail", gradient: "135deg, #0047ab, #7c3aed" },
    { title: "Interview Cover", gradient: "135deg, #50c878, #06b6d4" },
    { title: "Podcast Promo Card", gradient: "135deg, #f59e0b, #0047ab" },
    { title: "Season Launch Art", gradient: "135deg, #7c3aed, #50c878" },
    { title: "Guest Spotlight", gradient: "135deg, #06b6d4, #0047ab" },
    { title: "Shorts Clip Cover", gradient: "135deg, #50c878, #f59e0b" }
  ],
  Instagram: [
    { title: "Reel Cover", gradient: "135deg, #e1306c, #f77737" },
    { title: "Story Template", gradient: "135deg, #833ab4, #e1306c" },
    { title: "Carousel Slide 1", gradient: "135deg, #405de6, #833ab4" },
    { title: "Quote Graphic", gradient: "135deg, #f77737, #fcaf45" },
    { title: "Product Showcase", gradient: "135deg, #e1306c, #405de6" },
    { title: "Highlight Cover", gradient: "135deg, #833ab4, #f77737" }
  ]
};
function TemplatesSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = reactExports.useState("YouTube");
  const cards = TEMPLATE_CARDS[active] ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-24",
      "data-ocid": "landing.templates_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-12",
            initial: { opacity: 0, y: 20 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: SECTION_LABEL, children: "✦ Templates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "mt-5 font-extrabold",
                  style: {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    color: "#ffffff"
                  },
                  children: [
                    "Templates for ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: GRADIENT_TEXT, children: "Every Format." })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap justify-center gap-2 mb-10",
            "data-ocid": "landing.templates.tabs",
            children: TEMPLATE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                onClick: () => setActive(cat),
                whileHover: { scale: 1.04 },
                whileTap: { scale: 0.97 },
                className: "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                style: {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: active === cat ? "linear-gradient(90deg, #0047ab, #50c878)" : "rgba(255,255,255,0.06)",
                  color: active === cat ? "#fff" : "rgba(255,255,255,0.60)",
                  border: active === cat ? "1px solid transparent" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: active === cat ? "0 2px 14px rgba(0,71,171,0.30)" : "none"
                },
                "data-ocid": `landing.templates.tab.${cat.toLowerCase()}`,
                children: cat
              },
              cat
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-2 md:grid-cols-3 gap-5",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35 },
            children: cards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: i * 0.05 },
                whileHover: { scale: 1.04, y: -4 },
                className: "group relative overflow-hidden rounded-2xl cursor-pointer",
                style: {
                  background: `linear-gradient(${card.gradient})`,
                  aspectRatio: "16/9",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
                },
                "data-ocid": `landing.template.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "absolute inset-0 flex flex-col justify-end p-4",
                      style: {
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-bold text-white truncate",
                            style: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
                            children: card.title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs mt-0.5",
                            style: { color: "rgba(255,255,255,0.6)" },
                            children: active
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "px-4 py-2 rounded-xl text-xs font-semibold text-white",
                      style: {
                        background: "rgba(0,0,0,0.75)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.2)"
                      },
                      children: "Use Template"
                    }
                  ) })
                ]
              },
              card.title
            ))
          },
          active
        )
      ] })
    }
  );
}
function LiveShowcaseSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tracks = [
    {
      label: "Video",
      color: "#0047ab",
      clips: [
        { left: "2%", width: "32%" },
        { left: "36%", width: "24%" },
        { left: "62%", width: "35%" }
      ]
    },
    {
      label: "Audio",
      color: "#50c878",
      clips: [{ left: "2%", width: "95%" }]
    },
    {
      label: "Text",
      color: "#f59e0b",
      clips: [
        { left: "5%", width: "20%" },
        { left: "50%", width: "18%" }
      ]
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-28",
      style: { background: "rgba(7,11,20,0.8)" },
      "data-ocid": "landing.live_showcase_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(0,71,171,0.18) 0%, transparent 70%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-14",
              initial: { opacity: 0, y: 20 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.55 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: SECTION_LABEL, children: "✦ Live Editor Showcase" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    className: "mt-5 font-extrabold",
                    style: {
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      color: "#ffffff"
                    },
                    children: [
                      "A Studio Built for",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: GRADIENT_TEXT, children: "Next-Gen Creators." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-4 text-base max-w-xl mx-auto",
                    style: {
                      color: "rgba(255,255,255,0.50)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    children: "Cinematic timelines, AI tools, and real-time exports — all in one premium interface."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.65, delay: 0.15 },
              className: "relative rounded-3xl overflow-hidden",
              style: {
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 60px rgba(0,71,171,0.28), 0 0 120px rgba(80,200,120,0.10), 0 32px 80px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between px-5 py-3",
                    style: { borderBottom: "1px solid rgba(255,255,255,0.07)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: ["#ff5f57", "#febc2e", "#28c840"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-3 h-3 rounded-full",
                          style: { background: c }
                        },
                        c
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-semibold",
                          style: {
                            color: "rgba(255,255,255,0.35)",
                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                          },
                          children: "Elysian Labs — Video Editor"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "px-3 py-1 rounded-lg text-xs font-semibold",
                          style: {
                            background: "linear-gradient(90deg, #0047ab, #50c878)",
                            color: "#fff",
                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                          },
                          children: "Export"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "relative rounded-2xl overflow-hidden flex items-center justify-center",
                      style: {
                        background: "#070B14",
                        border: "1px solid rgba(255,255,255,0.06)",
                        aspectRatio: "16/6"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "absolute inset-0 pointer-events-none",
                            animate: { opacity: [0.4, 0.7, 0.4] },
                            transition: {
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut"
                            },
                            style: {
                              background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,71,171,0.22) 0%, transparent 70%)"
                            },
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.p,
                            {
                              className: "font-extrabold text-white",
                              style: {
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: "clamp(1rem, 3vw, 1.8rem)",
                                textShadow: "0 0 30px rgba(80,200,120,0.6)"
                              },
                              animate: { opacity: [0.7, 1, 0.7] },
                              transition: {
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY
                              },
                              children: "Create Viral Content Faster."
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.p,
                            {
                              className: "text-xs mt-2",
                              style: {
                                color: "rgba(80,200,120,0.7)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontWeight: 600,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase"
                              },
                              animate: { opacity: [0.5, 0.9, 0.5] },
                              transition: {
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 0.5
                              },
                              children: "● Text overlay — 00:02.4 – 00:07.1"
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-2xl p-4 space-y-3",
                      style: {
                        background: "rgba(7,11,20,0.8)",
                        border: "1px solid rgba(255,255,255,0.06)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex items-center gap-1 px-1",
                            style: { height: 18 },
                            children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-xs flex-1 text-center",
                                style: {
                                  color: "rgba(255,255,255,0.20)",
                                  fontFamily: "monospace"
                                },
                                children: `00:${String(i * 5).padStart(2, "0")}`
                              },
                              i
                            ))
                          }
                        ),
                        tracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-12 text-xs font-semibold flex-shrink-0 text-right",
                              style: {
                                color: "rgba(255,255,255,0.35)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                              },
                              children: track.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", style: { height: 28 }, children: [
                            track.clips.map((clip, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "absolute top-0 bottom-0 rounded-lg",
                                style: {
                                  left: clip.left,
                                  width: clip.width,
                                  background: `linear-gradient(90deg, ${track.color}60, ${track.color}30)`,
                                  border: `1px solid ${track.color}50`
                                }
                              },
                              ci
                            )),
                            track.label === "Audio" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center px-2 gap-px overflow-hidden rounded-lg pointer-events-none", children: Array.from({ length: 60 }).map((_, wi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                className: "flex-shrink-0 rounded-full",
                                style: { width: 2, background: `${track.color}90` },
                                animate: {
                                  height: [
                                    4 + Math.random() * 14,
                                    4 + Math.random() * 14,
                                    4 + Math.random() * 14
                                  ]
                                },
                                transition: {
                                  duration: 0.6 + Math.random() * 0.8,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                  delay: wi * 0.03
                                }
                              },
                              wi
                            )) })
                          ] })
                        ] }, track.label))
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const TESTIMONIALS = [
  {
    quote: "Elysian Labs replaced three apps I was paying for. The thumbnail creator alone saves me an hour every upload.",
    name: "Jordan Mercer",
    role: "YouTube Creator — 380K subs",
    color: "#50c878"
  },
  {
    quote: "The CapCut-style editor is genuinely premium. I've tried everything and this is the first free tool that doesn't feel free.",
    name: "Sasha Nguyen",
    role: "TikTok Content Creator",
    color: "#0047ab"
  },
  {
    quote: "AI captions, hook generator, background removal — it's like having a production team in the browser.",
    name: "Demi Okonkwo",
    role: "Shorts & Reels Creator",
    color: "#f59e0b"
  }
];
function SocialProofSection() {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "relative z-10 px-6 py-24",
      style: { background: "rgba(255,255,255,0.012)" },
      "data-ocid": "landing.social_proof_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-12",
            initial: { opacity: 0, y: 20 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: SECTION_LABEL, children: "✦ Creators Love It" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h2",
                {
                  className: "mt-5 font-extrabold",
                  style: {
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    color: "#ffffff"
                  },
                  children: [
                    "Built for Modern ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: GRADIENT_TEXT, children: "Creators." })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { delay: i * 0.12, duration: 0.55 },
            whileHover: { y: -6, scale: 1.02 },
            className: "flex flex-col gap-4 p-7 rounded-2xl",
            style: {
              ...GLASS,
              background: `linear-gradient(135deg, rgba(16,24,32,0.92) 0%, ${t.color}12 100%)`,
              border: `1px solid ${t.color}22`,
              boxShadow: `0 4px 28px ${t.color}14`
            },
            "data-ocid": `landing.testimonial.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-sm leading-relaxed",
                  style: {
                    color: "rgba(255,255,255,0.72)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: [
                    "“",
                    t.quote,
                    "”"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0",
                    style: {
                      background: `linear-gradient(135deg, ${t.color}30, ${t.color}60)`,
                      color: t.color,
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    children: t.name[0]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-semibold",
                      style: {
                        color: "#fff",
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      },
                      children: t.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs",
                      style: { color: "rgba(255,255,255,0.40)" },
                      children: t.role
                    }
                  )
                ] })
              ] })
            ]
          },
          t.name
        )) })
      ] })
    }
  );
}
const FOOTER_LINKS = {
  Product: [
    { label: "Thumbnail Studio", to: "/thumbnail-studio" },
    { label: "Video Editor", to: "/video-editor" },
    { label: "Ad Creator", to: "/ad-creator" },
    { label: "AI Tools", to: "/ai-tools" },
    { label: "Templates", to: "/templates" }
  ],
  Resources: [
    { label: "Courses", to: "/courses" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" }
  ]
};
function FooterSection() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "elysian-labs";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "footer",
    {
      className: "relative z-10 px-6 pt-16 pb-10",
      style: {
        background: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)"
      },
      "data-ocid": "landing.footer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-px",
            style: {
              background: "linear-gradient(90deg, transparent, #0047ab, #50c878, transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-10 mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-6 h-6", style: { color: "#50c878" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#fff"
                    },
                    children: "Elysian Labs"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm leading-relaxed",
                  style: {
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: "The creative platform for modern creators."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-bold uppercase tracking-wider mb-4",
                  style: { color: "rgba(255,255,255,0.35)" },
                  children: "Product"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5", children: FOOTER_LINKS.Product.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  className: "text-sm hover:text-white transition-colors duration-150",
                  style: {
                    color: "rgba(255,255,255,0.50)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: l.label
                }
              ) }, l.label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-bold uppercase tracking-wider mb-4",
                  style: { color: "rgba(255,255,255,0.35)" },
                  children: "Resources"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5", children: FOOTER_LINKS.Resources.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  className: "text-sm hover:text-white transition-colors duration-150",
                  style: {
                    color: "rgba(255,255,255,0.50)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: l.label
                }
              ) }, l.label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-bold uppercase tracking-wider mb-4",
                  style: { color: "rgba(255,255,255,0.35)" },
                  children: "Follow Us"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: ["Twitter/X", "Instagram", "YouTube", "TikTok"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/",
                  className: "text-sm px-3 py-1.5 rounded-xl transition-all duration-150",
                  style: {
                    color: "rgba(255,255,255,0.55)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  },
                  children: s
                },
                s
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-8",
              style: { borderTop: "1px solid rgba(255,255,255,0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs",
                    style: {
                      color: "rgba(255,255,255,0.30)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    children: [
                      "© ",
                      year,
                      " Elysian Labs. All rights reserved."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs",
                    style: {
                      color: "rgba(255,255,255,0.25)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    children: [
                      "Built with love using",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`,
                          className: "hover:text-white transition-colors",
                          style: { color: "rgba(80,200,120,0.6)" },
                          target: "_blank",
                          rel: "noopener noreferrer",
                          children: "caffeine.ai"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
function HeroEditorMockup() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "w-full max-w-xl relative",
      animate: { y: [0, -10, 0] },
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl overflow-hidden relative",
            style: {
              background: "rgba(7,11,20,0.90)",
              border: "1px solid rgba(80,200,120,0.22)",
              boxShadow: "0 0 60px rgba(0,71,171,0.30), 0 0 100px rgba(80,200,120,0.12), 0 24px 80px rgba(0,0,0,0.6)",
              aspectRatio: "16/10"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none z-10",
                  style: {
                    background: "linear-gradient(135deg, rgba(0,71,171,0.06) 0%, rgba(80,200,120,0.05) 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: "/editor/demo/canvas",
                  title: "Editor preview",
                  className: "absolute inset-0 w-full h-full",
                  style: {
                    border: "none",
                    pointerEvents: "none"
                  },
                  loading: "eager",
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-3 -right-3 w-24 h-24 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, rgba(80,200,120,0.25) 0%, transparent 70%)",
              filter: "blur(12px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -bottom-4 -left-4 w-32 h-32 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, rgba(0,71,171,0.20) 0%, transparent 70%)",
              filter: "blur(16px)"
            }
          }
        )
      ]
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-screen flex items-center px-6",
      style: { background: "#070B14", overflow: "hidden" },
      "data-ocid": "landing.hero_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute pointer-events-none",
            style: {
              bottom: "-10%",
              left: "5%",
              width: 700,
              height: 600,
              background: "radial-gradient(ellipse at center, rgba(80,200,120,0.14) 0%, rgba(0,71,171,0.07) 45%, transparent 70%)",
              filter: "blur(2px)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute pointer-events-none",
            style: {
              top: "10%",
              right: "0%",
              width: 500,
              height: 500,
              background: "radial-gradient(ellipse at center, rgba(0,71,171,0.12) 0%, transparent 65%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[3fr_2fr] gap-12 xl:gap-20 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 36 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "mb-7",
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.1, duration: 0.5 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase",
                        style: {
                          background: "rgba(80,200,120,0.10)",
                          border: "1px solid rgba(80,200,120,0.28)",
                          color: "#50c878",
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-1.5 h-1.5 rounded-full animate-pulse",
                              style: {
                                background: "#50c878",
                                boxShadow: "0 0 6px #50c878"
                              }
                            }
                          ),
                          "✦ The Creative Platform for Creators"
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.h1,
                  {
                    className: "font-extrabold leading-none tracking-tight mb-6",
                    style: {
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                      lineHeight: 1.05
                    },
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2, duration: 0.65 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#ffffff" }, children: "Create Viral Content" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                          },
                          children: "Faster."
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    className: "max-w-lg mb-10 text-lg leading-relaxed",
                    style: {
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    },
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.35, duration: 0.55 },
                    children: "Professional thumbnail design, cinematic video editing, and AI-powered creative tools — all in one platform."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "flex flex-wrap items-center gap-4",
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5, duration: 0.5 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/thumbnail-studio",
                        "data-ocid": "landing.hero.start_creating_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.span,
                          {
                            className: "inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white cursor-pointer",
                            style: {
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                              boxShadow: "0 4px 28px rgba(0,71,171,0.45), 0 1px 0 rgba(255,255,255,0.12) inset"
                            },
                            whileHover: { scale: 1.04 },
                            whileTap: { scale: 0.97 },
                            transition: { duration: 0.15 },
                            children: "Start Creating →"
                          }
                        )
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "hidden lg:flex justify-center",
              initial: { opacity: 0, x: 40 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.3, duration: 0.7, ease: "easeOut" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroEditorMockup, {})
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 right-0 h-36 pointer-events-none",
            style: {
              background: "linear-gradient(to top, #0a0e1a 0%, transparent 100%)"
            },
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "#0a0e1a" },
      "data-ocid": "landing.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadgesSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbnailStudioSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(VideoEditorSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdCreatorSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AIToolsSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TemplatesSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveShowcaseSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SocialProofSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FooterSection, {})
      ]
    }
  );
}
export {
  LandingPage,
  LandingPage as default
};
