const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-De5ctwPQ.js","assets/vendor-80nuMd8G.js","assets/motion-DXodcWnX.js","assets/ui-lib-DG52wkUx.js","assets/index-DAfWXb41.css"])))=>i.map(i=>d[i]);
import { a7 as __vitePreload } from "./index-De5ctwPQ.js";
import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { m as motion, A as AnimatePresence } from "./motion-DXodcWnX.js";
import { S as Sparkles, R as RefreshCw, aL as ZoomIn, D as Download, bs as Grid2x2, I as Image, b as Mic, aH as Send, X } from "./ui-lib-DG52wkUx.js";
let quipCounter = 0;
function getImageUrl(prompt, seed) {
  const qualityModifiers = ", highly detailed, 8k resolution, professional photography, cinematic lighting";
  const enhancedPrompt = `${prompt}${qualityModifiers}`;
  const encoded = encodeURIComponent(enhancedPrompt);
  const s = seed ?? Date.now();
  return `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&model=flux&nologo=true&enhance=true&seed=${s}`;
}
const STAGES = [
  { text: "Analyzing prompt…", duration: 600 },
  { text: "Generating image…", duration: 1e3 },
  { text: "Enhancing details…", duration: 800 }
];
const EXAMPLE_PROMPTS = [
  "Cyberpunk city at night",
  "Gaming YouTube thumbnail",
  "Luxury sports car ad",
  "Anime warrior with blue fire",
  "Cinematic neon background"
];
const AI_QUIPS = [
  "Here's your creation. Looking cinematic.",
  "Done. This one turned out beautifully.",
  "Your vision, rendered. Ready to use.",
  "Creation complete. Quite striking.",
  "Generated with precision. Enjoy."
];
const BLOCKED_KEYWORDS = [
  "nsfw",
  "nude",
  "naked",
  "explicit",
  "pornography",
  "porn",
  "sexual",
  "xxx",
  "adult content",
  "erotic",
  "hentai",
  "gore",
  "violence",
  "graphic",
  "disturbing"
];
function isBlockedPrompt(prompt) {
  const lower = prompt.toLowerCase();
  return BLOCKED_KEYWORDS.some((kw) => lower.includes(kw));
}
function TypingDots() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 px-4 py-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "w-2 h-2 rounded-full",
      style: { background: "#2563EB" },
      animate: { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] },
      transition: {
        duration: 0.9,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    },
    i
  )) });
}
function ProgressDisplay({
  stage,
  stageText
}) {
  const totalStages = 3;
  const progress = (stage + 1) / totalStages * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 min-w-[220px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.25 },
        className: "text-sm mb-2.5",
        style: {
          color: "rgba(255,255,255,0.8)",
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        },
        children: stageText
      },
      stageText
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-1 rounded-full overflow-hidden",
        style: { background: "rgba(255,255,255,0.08)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full",
            style: { background: "linear-gradient(90deg, #2563EB, #22C55E)" },
            animate: { width: `${progress}%` },
            transition: { duration: 0.4, ease: "easeOut" }
          }
        )
      }
    )
  ] });
}
function ImageCard({
  msg,
  onRegenerate,
  onViewFull
}) {
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 3e4;
  const [imgState, setImgState] = reactExports.useState(
    "loading"
  );
  const [retryCount, setRetryCount] = reactExports.useState(0);
  const [currentSrc, setCurrentSrc] = reactExports.useState(msg.imageUrl);
  const timeoutRef = reactExports.useRef(null);
  const retryCountRef = reactExports.useRef(0);
  const startTimeoutRef = reactExports.useRef(null);
  startTimeoutRef.current = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      var _a;
      if (retryCountRef.current < MAX_RETRIES) {
        const attempt = retryCountRef.current + 1;
        retryCountRef.current = attempt;
        setRetryCount(attempt);
        const bustSrc = `${msg.imageUrl}&t=${Date.now()}&retry=${attempt}`;
        setCurrentSrc(bustSrc);
        (_a = startTimeoutRef.current) == null ? void 0 : _a.call(startTimeoutRef);
      } else {
        setImgState("error");
      }
    }, TIMEOUT_MS);
  };
  const startTimeout = reactExports.useCallback(() => {
    var _a;
    (_a = startTimeoutRef.current) == null ? void 0 : _a.call(startTimeoutRef);
  }, []);
  reactExports.useEffect(() => {
    startTimeout();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTimeout]);
  const handleLoad = reactExports.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setImgState("loaded");
  }, []);
  const handleError = reactExports.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const attempt = retryCountRef.current + 1;
    if (attempt <= MAX_RETRIES) {
      retryCountRef.current = attempt;
      setRetryCount(attempt);
      const bustSrc = `${msg.imageUrl}&t=${Date.now()}&retry=${attempt}`;
      setCurrentSrc(bustSrc);
      startTimeout();
    } else {
      setImgState("error");
    }
  }, [msg.imageUrl, startTimeout]);
  const handleDownload = reactExports.useCallback(() => {
    const a = document.createElement("a");
    a.href = msg.imageUrl;
    a.download = `elysian-ai-${Date.now()}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }, [msg.imageUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 12 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      className: "w-full max-w-[680px]",
      "data-ocid": "ai_image.result_card",
      children: [
        imgState === "loaded" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm mb-2 ml-1",
            style: {
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            },
            children: AI_QUIPS[quipCounter++ % AI_QUIPS.length]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full overflow-hidden rounded-2xl",
            style: { aspectRatio: "16/9" },
            children: [
              imgState === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl",
                  style: {
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(37,99,235,0.15)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-3/4 overflow-hidden rounded-full",
                        style: { height: 3, background: "rgba(255,255,255,0.06)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "h-full rounded-full",
                            style: {
                              background: "linear-gradient(90deg, transparent, #2563EB, transparent)",
                              width: "40%"
                            },
                            animate: { x: ["-100%", "350%"] },
                            transition: {
                              duration: 1.6,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut"
                            }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs",
                        style: {
                          color: "rgba(255,255,255,0.38)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        },
                        children: retryCount > 0 ? `Retrying… (attempt ${retryCount}/${MAX_RETRIES})` : "Loading image from Elysian AI…"
                      }
                    )
                  ]
                }
              ),
              imgState === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl",
                  style: {
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(239,68,68,0.25)"
                  },
                  "data-ocid": "ai_image.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#f87171", fontSize: 28 }, children: "⚠" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-sm text-center px-4",
                        style: {
                          color: "rgba(255,255,255,0.55)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        },
                        children: [
                          "Generation failed after ",
                          MAX_RETRIES,
                          " attempts"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs text-center px-6",
                        style: {
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        },
                        children: [
                          '"',
                          msg.prompt,
                          '"'
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        onClick: () => onRegenerate(msg.prompt),
                        whileHover: { scale: 1.04 },
                        whileTap: { scale: 0.97 },
                        className: "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium",
                        style: {
                          background: "rgba(37,99,235,0.15)",
                          border: "1px solid rgba(37,99,235,0.35)",
                          color: "#60a5fa",
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        },
                        "data-ocid": "ai_image.retry_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                          "Try Again"
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
                  className: "relative w-full h-full overflow-hidden cursor-zoom-in group block",
                  onClick: () => imgState === "loaded" && onViewFull(msg.imageUrl),
                  "aria-label": "View image full size",
                  style: { padding: 0, background: "none", border: "none" },
                  tabIndex: imgState === "loaded" ? 0 : -1,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: currentSrc,
                        alt: msg.prompt,
                        className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]",
                        style: { display: imgState === "loading" ? "none" : "block" },
                        loading: "lazy",
                        decoding: "async",
                        onLoad: handleLoad,
                        onError: handleError
                      }
                    ),
                    imgState === "loaded" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
                          style: { background: "rgba(0,0,0,0.35)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 28, className: "text-white drop-shadow-lg" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                          style: {
                            boxShadow: "inset 0 0 0 2px rgba(37,99,235,0.5), 0 0 30px rgba(37,99,235,0.25)"
                          }
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        msg.variations && imgState === "loaded" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "grid grid-cols-4 gap-2 mt-2",
            children: msg.variations.map((url, vIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "relative w-full overflow-hidden rounded-xl cursor-zoom-in group",
                style: {
                  aspectRatio: "4/3",
                  display: "block",
                  padding: 0,
                  background: "none",
                  border: "none"
                },
                onClick: () => onViewFull(url),
                "aria-label": `View variation ${vIdx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: url,
                      alt: `Variation ${vIdx + 1}`,
                      className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]",
                      loading: "lazy",
                      decoding: "async"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
                      style: { boxShadow: "inset 0 0 0 1.5px rgba(37,99,235,0.6)" }
                    }
                  )
                ]
              },
              url
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-2 px-3 py-2 rounded-xl flex flex-col gap-2",
            style: {
              background: "rgba(15,23,42,0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                imgState === "loaded" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActionBtn,
                  {
                    icon: Download,
                    label: "Download",
                    onClick: handleDownload,
                    ocid: "ai_image.download_button"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActionBtn,
                  {
                    icon: RefreshCw,
                    label: "Regenerate",
                    onClick: () => onRegenerate(msg.prompt),
                    ocid: "ai_image.regenerate_button"
                  }
                ),
                imgState === "loaded" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActionBtn,
                  {
                    icon: Grid2x2,
                    label: "Variations",
                    onClick: () => onRegenerate(`__variations__${msg.prompt}`),
                    ocid: "ai_image.variations_button"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 flex-wrap pt-1",
                  style: { borderTop: "1px solid rgba(255,255,255,0.05)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs",
                        style: {
                          color: "rgba(255,255,255,0.35)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif"
                        },
                        children: "Use in:"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UseInBtn, { label: "Thumbnail Studio", to: "/thumbnail-studio" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UseInBtn, { label: "Ad Creator", to: "/ad-creator" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UseInBtn, { label: "Video Editor", to: "/video-editor" })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function ActionBtn({
  icon: Icon,
  label,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      onClick,
      whileHover: { scale: 1.04, y: -1 },
      whileTap: { scale: 0.97 },
      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200",
      style: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.7)",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      },
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13, className: "shrink-0" }),
        label
      ]
    }
  );
}
function UseInBtn({ label, to }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      className: "text-xs px-2.5 py-1 rounded-md transition-colors duration-150",
      style: {
        background: "rgba(37,99,235,0.10)",
        border: "1px solid rgba(37,99,235,0.22)",
        color: "#60a5fa",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      },
      children: label
    }
  );
}
function Lightbox({ url, onClose }) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[200] flex items-center justify-center",
      style: { background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      "data-ocid": "ai_image.lightbox",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative max-w-[90vw] max-h-[88vh]",
          initial: { scale: 0.92, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.92, opacity: 0 },
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: url,
                alt: "Full view",
                className: "max-w-full max-h-[88vh] rounded-2xl object-contain",
                style: { boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150",
                style: {
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff"
                },
                "data-ocid": "ai_image.lightbox.close_button",
                "aria-label": "Close lightbox",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
              }
            )
          ]
        }
      )
    }
  );
}
function AiImageGeneratorPage() {
  const [messages, setMessages] = reactExports.useState([]);
  const [inputValue, setInputValue] = reactExports.useState("");
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [lightboxUrl, setLightboxUrl] = reactExports.useState(null);
  const [promptBlocked, setPromptBlocked] = reactExports.useState(false);
  const chatEndRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  const msgIdRef = reactExports.useRef(0);
  const nextId = reactExports.useCallback(() => String(++msgIdRef.current), []);
  const scrollToBottom = reactExports.useCallback(() => {
    setTimeout(
      () => {
        var _a;
        return (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      },
      50
    );
  }, []);
  reactExports.useEffect(() => {
    setPromptBlocked(isBlockedPrompt(inputValue));
  }, [inputValue]);
  const generate = reactExports.useCallback(
    async (rawPrompt) => {
      if (!rawPrompt.trim() || isGenerating) return;
      if (isBlockedPrompt(rawPrompt)) {
        const { toast } = await __vitePreload(async () => {
          const { toast: toast2 } = await import("./index-De5ctwPQ.js").then((n) => n.a8);
          return { toast: toast2 };
        }, true ? __vite__mapDeps([0,1,2,3,4]) : void 0);
        toast.error(
          "That type of content isn't supported. Please try a different prompt."
        );
        return;
      }
      const isVariations = rawPrompt.startsWith("__variations__");
      const prompt = isVariations ? rawPrompt.replace("__variations__", "") : rawPrompt;
      setIsGenerating(true);
      setInputValue("");
      if (!isVariations) {
        setMessages((prev) => [
          ...prev,
          { id: nextId(), type: "user", prompt }
        ]);
      }
      scrollToBottom();
      const thinkingId = nextId();
      await new Promise((r) => setTimeout(r, 80));
      setMessages((prev) => [
        ...prev,
        { id: thinkingId, type: "thinking" }
      ]);
      scrollToBottom();
      await new Promise((r) => setTimeout(r, 600));
      const progressId = nextId();
      for (let i = 0; i < STAGES.length; i++) {
        setMessages(
          (prev) => prev.map(
            (m) => m.id === thinkingId ? {
              id: progressId,
              type: "progress",
              stage: i,
              stageText: STAGES[i].text
            } : m.id === progressId ? {
              id: progressId,
              type: "progress",
              stage: i,
              stageText: STAGES[i].text
            } : m
          )
        );
        scrollToBottom();
        await new Promise((r) => setTimeout(r, STAGES[i].duration));
      }
      const imageUrl = getImageUrl(prompt, Date.now());
      let variations = null;
      if (isVariations) {
        const variationModifiers = [
          ", variation 1, different composition",
          ", variation 2, alternate angle",
          ", variation 3, creative reinterpretation"
        ];
        variations = variationModifiers.map(
          (mod, i) => getImageUrl(prompt + mod, Date.now() + i * 7919)
        );
      }
      setMessages(
        (prev) => prev.map(
          (m) => m.id === progressId || m.id === thinkingId ? {
            id: progressId,
            type: "image",
            prompt,
            imageUrl,
            variations
          } : m
        )
      );
      scrollToBottom();
      setIsGenerating(false);
    },
    [isGenerating, scrollToBottom, nextId]
  );
  const handleSend = reactExports.useCallback(() => {
    if (promptBlocked) return;
    generate(inputValue.trim());
  }, [generate, inputValue, promptBlocked]);
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );
  reactExports.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [inputValue]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen",
      style: {
        background: "#070B14",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      },
      "data-ocid": "ai_image.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed inset-0 pointer-events-none overflow-hidden",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute rounded-full",
                  style: {
                    width: 600,
                    height: 600,
                    top: "-10%",
                    left: "60%",
                    background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
                    animation: "float1 18s ease-in-out infinite"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute rounded-full",
                  style: {
                    width: 500,
                    height: 500,
                    bottom: "10%",
                    left: "-5%",
                    background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
                    animation: "float2 22s ease-in-out infinite"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-44", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-10",
              initial: { opacity: 0, y: -16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              "data-ocid": "ai_image.header",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3",
                    style: {
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      color: "#22C55E"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" }),
                      "Elysian AI · Ready"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-3xl md:text-4xl font-bold mb-2 tracking-tight",
                    style: {
                      background: "linear-gradient(135deg, #60a5fa 0%, #34d399 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "AI Image Generator"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.45)" }, children: "Describe anything. Elysian AI creates it instantly." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", "data-ocid": "ai_image.chat_list", children: [
            messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col items-center justify-center gap-6 py-12",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.15 },
                "data-ocid": "ai_image.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center justify-center w-14 h-14 rounded-2xl",
                      style: {
                        background: "linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(34,197,94,0.2) 100%)",
                        border: "1px solid rgba(37,99,235,0.25)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 22, style: { color: "#60a5fa" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-base font-semibold mb-1",
                        style: { color: "rgba(255,255,255,0.8)" },
                        children: "Elysian AI is ready to create"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm",
                        style: { color: "rgba(255,255,255,0.38)" },
                        children: "Type a description below and I'll generate it for you."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: EXAMPLE_PROMPTS.map((prompt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "button",
                      onClick: () => {
                        var _a;
                        setInputValue(prompt);
                        (_a = textareaRef.current) == null ? void 0 : _a.focus();
                      },
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.35, delay: 0.2 + i * 0.07 },
                      whileHover: { scale: 1.03, y: -1 },
                      whileTap: { scale: 0.97 },
                      className: "px-3.5 py-1.5 rounded-full text-sm transition-colors duration-150",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      },
                      "data-ocid": `ai_image.example_prompt.${i + 1}`,
                      children: prompt
                    },
                    prompt
                  )) })
                ]
              }
            ),
            messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `ai_image.message.${idx + 1}`, children: [
              msg.type === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "flex justify-end",
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm",
                      style: {
                        background: "linear-gradient(135deg, #1d4ed8 0%, #2563EB 100%)",
                        color: "#fff",
                        boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      },
                      children: msg.prompt
                    }
                  )
                }
              ),
              msg.type === "thinking" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "flex justify-start",
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-2xl rounded-tl-sm",
                      style: {
                        background: "rgba(15,23,42,0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.07)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypingDots, {})
                    }
                  )
                }
              ),
              msg.type === "progress" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "flex justify-start",
                  initial: { opacity: 0, x: -12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.3 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-2xl rounded-tl-sm",
                      style: {
                        background: "rgba(15,23,42,0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.07)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ProgressDisplay,
                        {
                          stage: msg.stage,
                          stageText: msg.stageText
                        },
                        msg.stageText
                      ) })
                    }
                  )
                }
              ),
              msg.type === "image" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageCard,
                {
                  msg,
                  onRegenerate: generate,
                  onViewFull: setLightboxUrl
                }
              ) })
            ] }, msg.id)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "fixed bottom-0 left-0 right-0 z-20 px-4 py-4",
            style: {
              background: "linear-gradient(to top, rgba(7,11,20,0.98) 0%, rgba(7,11,20,0.8) 60%, transparent 100%)",
              backdropFilter: "blur(12px)"
            },
            initial: { y: 24, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5, delay: 0.2 },
            "data-ocid": "ai_image.input_bar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
              promptBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  className: "text-xs mb-2 text-center",
                  initial: { opacity: 0, y: 4 },
                  animate: { opacity: 1, y: 0 },
                  style: { color: "#f87171" },
                  children: "⚠ That type of content isn't supported. Please try a different prompt."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputBar,
                {
                  value: inputValue,
                  onChange: setInputValue,
                  onSend: handleSend,
                  onKeyDown: handleKeyDown,
                  isGenerating,
                  textareaRef,
                  blocked: promptBlocked
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbox, { url: lightboxUrl, onClose: () => setLightboxUrl(null) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 30px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, -35px); }
        }
      ` })
      ]
    }
  );
}
function InputBar({
  value,
  onChange,
  onSend,
  onKeyDown,
  isGenerating,
  textareaRef,
  blocked
}) {
  const [focused, setFocused] = reactExports.useState(false);
  const borderColor = blocked ? "rgba(239,68,68,0.8)" : focused ? "rgba(37,99,235,0.55)" : "rgba(255,255,255,0.09)";
  const boxShadow = blocked ? "0 0 0 3px rgba(239,68,68,0.15), 0 8px 32px rgba(0,0,0,0.4)" : focused ? "0 0 0 3px rgba(37,99,235,0.12), 0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.35)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-end gap-2 px-3 py-2.5 rounded-2xl transition-all duration-300",
      style: {
        background: "rgba(15,23,42,0.85)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${borderColor}`,
        boxShadow
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SideIconBtn, { "aria-label": "Upload image", ocid: "ai_image.upload_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SideIconBtn, { "aria-label": "Voice input", ocid: "ai_image.voice_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 16 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              ref: textareaRef,
              value,
              onChange: (e) => onChange(e.target.value),
              onKeyDown,
              onFocus: () => setFocused(true),
              onBlur: () => setFocused(false),
              placeholder: "Describe any image you want to create…",
              disabled: isGenerating,
              rows: 1,
              className: "w-full resize-none bg-transparent text-sm outline-none",
              style: {
                color: "rgba(255,255,255,0.88)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.6,
                maxHeight: 120,
                paddingTop: "4px",
                paddingBottom: "4px"
              },
              "data-ocid": "ai_image.input"
            }
          ),
          value.length > 100 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute bottom-0 right-0 text-[10px]",
              style: {
                color: value.length > 400 ? "#f87171" : "rgba(255,255,255,0.28)"
              },
              children: value.length
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: onSend,
            disabled: isGenerating || !value.trim() || blocked,
            whileHover: !isGenerating && value.trim() && !blocked ? { scale: 1.06 } : {},
            whileTap: !isGenerating && value.trim() && !blocked ? { scale: 0.95 } : {},
            className: "flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-opacity duration-200",
            style: {
              background: isGenerating || !value.trim() || blocked ? "rgba(37,99,235,0.2)" : "linear-gradient(135deg, #2563EB 0%, #22C55E 100%)",
              boxShadow: !isGenerating && value.trim() && !blocked ? "0 0 16px rgba(37,99,235,0.35)" : "none",
              opacity: isGenerating || !value.trim() || blocked ? 0.5 : 1,
              cursor: isGenerating || !value.trim() || blocked ? "not-allowed" : "pointer"
            },
            "aria-label": "Generate image",
            "data-ocid": "ai_image.submit_button",
            children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { rotate: 360 },
                transition: {
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, className: "text-white" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 15, className: "text-white" })
          }
        )
      ]
    }
  );
}
function SideIconBtn({
  children,
  "aria-label": ariaLabel,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.93 },
      className: "flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-150",
      style: {
        color: "rgba(255,255,255,0.38)",
        background: "transparent"
      },
      "aria-label": ariaLabel,
      "data-ocid": ocid,
      children
    }
  );
}
export {
  AiImageGeneratorPage,
  AiImageGeneratorPage as default
};
