import { Link } from "@tanstack/react-router";
import {
  Download,
  Grid2X2,
  ImageIcon,
  Mic,
  RefreshCw,
  Send,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Pollinations.ai image generation ─────────────────────────────────────
let quipCounter = 0;

function getImageUrl(prompt: string, seed?: number): string {
  const qualityModifiers =
    ", highly detailed, 8k resolution, professional photography, cinematic lighting";
  const enhancedPrompt = `${prompt}${qualityModifiers}`;
  const encoded = encodeURIComponent(enhancedPrompt);
  const s = seed ?? Date.now();
  return `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&model=flux&nologo=true&enhance=true&seed=${s}`;
}

// ─── Types ─────────────────────────────────────────────────────────────────
type GenerationStage = {
  text: string;
  duration: number;
};

const STAGES: GenerationStage[] = [
  { text: "Analyzing prompt…", duration: 600 },
  { text: "Generating image…", duration: 1000 },
  { text: "Enhancing details…", duration: 800 },
];

type MessageBase = { id: string };
type UserMessage = MessageBase & { type: "user"; prompt: string };
type ThinkingMessage = MessageBase & { type: "thinking" };
type ProgressMessage = MessageBase & {
  type: "progress";
  stage: number;
  stageText: string;
};
type ImageMessage = MessageBase & {
  type: "image";
  prompt: string;
  imageUrl: string;
  variations: string[] | null;
};
type ChatMessage =
  | UserMessage
  | ThinkingMessage
  | ProgressMessage
  | ImageMessage;

const EXAMPLE_PROMPTS = [
  "Cyberpunk city at night",
  "Gaming YouTube thumbnail",
  "Luxury sports car ad",
  "Anime warrior with blue fire",
  "Cinematic neon background",
];

const AI_QUIPS = [
  "Here's your creation. Looking cinematic.",
  "Done. This one turned out beautifully.",
  "Your vision, rendered. Ready to use.",
  "Creation complete. Quite striking.",
  "Generated with precision. Enjoy.",
];

// ─── Sub-components ────────────────────────────────────────────────────────

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
  "disturbing",
];

function isBlockedPrompt(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return BLOCKED_KEYWORDS.some((kw) => lower.includes(kw));
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: "#2563EB" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.9,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ProgressDisplay({
  stage,
  stageText,
}: { stage: number; stageText: string }) {
  const totalStages = 3;
  const progress = ((stage + 1) / totalStages) * 100;
  return (
    <div className="px-4 py-3 min-w-[220px]">
      <motion.p
        key={stageText}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
        className="text-sm mb-2.5"
        style={{
          color: "rgba(255,255,255,0.8)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {stageText}
      </motion.p>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #2563EB, #22C55E)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ImageCard({
  msg,
  onRegenerate,
  onViewFull,
}: {
  msg: ImageMessage;
  onRegenerate: (prompt: string) => void;
  onViewFull: (url: string) => void;
}) {
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 30_000;

  const [imgState, setImgState] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(msg.imageUrl);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep a ref to the latest retryCount so callbacks always see the current value
  const retryCountRef = useRef(0);

  // Start/restart the 30-second load timeout.
  // Uses a ref so the timeout callback always reads the latest retryCountRef.
  const startTimeoutRef = useRef<(() => void) | null>(null);

  startTimeoutRef.current = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      // Timeout expired — treat as a failed load
      if (retryCountRef.current < MAX_RETRIES) {
        const attempt = retryCountRef.current + 1;
        retryCountRef.current = attempt;
        setRetryCount(attempt);
        const bustSrc = `${msg.imageUrl}&t=${Date.now()}&retry=${attempt}`;
        setCurrentSrc(bustSrc);
        startTimeoutRef.current?.();
      } else {
        setImgState("error");
      }
    }, TIMEOUT_MS);
  };

  const startTimeout = useCallback(() => {
    startTimeoutRef.current?.();
  }, []);

  // Kick off the first timeout on mount
  useEffect(() => {
    startTimeout();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTimeout]);

  const handleLoad = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setImgState("loaded");
  }, []);

  const handleError = useCallback(() => {
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

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = msg.imageUrl;
    a.download = `elysian-ai-${Date.now()}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }, [msg.imageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[680px]"
      data-ocid="ai_image.result_card"
    >
      {/* AI quip — only show once loaded */}
      {imgState === "loaded" && (
        <p
          className="text-sm mb-2 ml-1"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {AI_QUIPS[quipCounter++ % AI_QUIPS.length]}
        </p>
      )}

      {/* Image container */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Loading skeleton — shown until onLoad fires */}
        {imgState === "loading" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
            style={{
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(37,99,235,0.15)",
            }}
          >
            {/* Shimmer bar */}
            <div
              className="w-3/4 overflow-hidden rounded-full"
              style={{ height: 3, background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #2563EB, transparent)",
                  width: "40%",
                }}
                animate={{ x: ["-100%", "350%"] }}
                transition={{
                  duration: 1.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
            <p
              className="text-xs"
              style={{
                color: "rgba(255,255,255,0.38)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {retryCount > 0
                ? `Retrying… (attempt ${retryCount}/${MAX_RETRIES})`
                : "Loading image from Elysian AI…"}
            </p>
          </div>
        )}

        {/* Error state — only after all retries exhausted */}
        {imgState === "error" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
            style={{
              background: "rgba(15,23,42,0.85)",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
            data-ocid="ai_image.error_state"
          >
            <span style={{ color: "#f87171", fontSize: 28 }}>⚠</span>
            <p
              className="text-sm text-center px-4"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Generation failed after {MAX_RETRIES} attempts
            </p>
            <p
              className="text-xs text-center px-6"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              "{msg.prompt}"
            </p>
            <motion.button
              type="button"
              onClick={() => onRegenerate(msg.prompt)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.35)",
                color: "#60a5fa",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              data-ocid="ai_image.retry_button"
            >
              <RefreshCw size={12} />
              Try Again
            </motion.button>
          </div>
        )}

        {/* Actual image — always in DOM so it can load */}
        <button
          type="button"
          className="relative w-full h-full overflow-hidden cursor-zoom-in group block"
          onClick={() => imgState === "loaded" && onViewFull(msg.imageUrl)}
          aria-label="View image full size"
          style={{ padding: 0, background: "none", border: "none" }}
          tabIndex={imgState === "loaded" ? 0 : -1}
        >
          <img
            src={currentSrc}
            alt={msg.prompt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ display: imgState === "loading" ? "none" : "block" }}
            loading="lazy"
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
          />
          {imgState === "loaded" && (
            <>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                <ZoomIn size={28} className="text-white drop-shadow-lg" />
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 2px rgba(37,99,235,0.5), 0 0 30px rgba(37,99,235,0.25)",
                }}
              />
            </>
          )}
        </button>
      </div>

      {/* Variations grid */}
      {msg.variations && imgState === "loaded" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mt-2"
        >
          {msg.variations.map((url, vIdx) => (
            <button
              type="button"
              key={url}
              className="relative w-full overflow-hidden rounded-xl cursor-zoom-in group"
              style={{
                aspectRatio: "4/3",
                display: "block",
                padding: 0,
                background: "none",
                border: "none",
              }}
              onClick={() => onViewFull(url)}
              aria-label={`View variation ${vIdx + 1}`}
            >
              <img
                src={url}
                alt={`Variation ${vIdx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1.5px rgba(37,99,235,0.6)" }}
              />
            </button>
          ))}
        </motion.div>
      )}

      {/* Action bar — always show so user can retry/regenerate */}
      <div
        className="mt-2 px-3 py-2 rounded-xl flex flex-col gap-2"
        style={{
          background: "rgba(15,23,42,0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {imgState === "loaded" && (
            <ActionBtn
              icon={Download}
              label="Download"
              onClick={handleDownload}
              ocid="ai_image.download_button"
            />
          )}
          <ActionBtn
            icon={RefreshCw}
            label="Regenerate"
            onClick={() => onRegenerate(msg.prompt)}
            ocid="ai_image.regenerate_button"
          />
          {imgState === "loaded" && (
            <ActionBtn
              icon={Grid2X2}
              label="Variations"
              onClick={() => onRegenerate(`__variations__${msg.prompt}`)}
              ocid="ai_image.variations_button"
            />
          )}
        </div>
        <div
          className="flex items-center gap-2 flex-wrap pt-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Use in:
          </span>
          <UseInBtn label="Thumbnail Studio" to="/thumbnail-studio" />
          <UseInBtn label="Ad Creator" to="/ad-creator" />
          <UseInBtn label="Video Editor" to="/video-editor" />
        </div>
      </div>
    </motion.div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  ocid,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.7)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      data-ocid={ocid}
    >
      <Icon size={13} className="shrink-0" />
      {label}
    </motion.button>
  );
}

function UseInBtn({ label, to }: { label: string; to: string }) {
  return (
    <Link
      to={to as "/thumbnail-studio" | "/ad-creator" | "/video-editor"}
      className="text-xs px-2.5 py-1 rounded-md transition-colors duration-150"
      style={{
        background: "rgba(37,99,235,0.10)",
        border: "1px solid rgba(37,99,235,0.22)",
        color: "#60a5fa",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {label}
    </Link>
  );
}

function Lightbox({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-ocid="ai_image.lightbox"
    >
      <motion.div
        className="relative max-w-[90vw] max-h-[88vh]"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={url}
          alt="Full view"
          className="max-w-full max-h-[88vh] rounded-2xl object-contain"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
          }}
          data-ocid="ai_image.lightbox.close_button"
          aria-label="Close lightbox"
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export function AiImageGeneratorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [promptBlocked, setPromptBlocked] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const msgIdRef = useRef(0);
  const nextId = useCallback(() => String(++msgIdRef.current), []);

  const scrollToBottom = useCallback(() => {
    setTimeout(
      () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  }, []);

  // Check for blocked content whenever input changes
  useEffect(() => {
    setPromptBlocked(isBlockedPrompt(inputValue));
  }, [inputValue]);

  const generate = useCallback(
    async (rawPrompt: string) => {
      if (!rawPrompt.trim() || isGenerating) return;

      // Content moderation check
      if (isBlockedPrompt(rawPrompt)) {
        const { toast } = await import("sonner");
        toast.error(
          "That type of content isn't supported. Please try a different prompt.",
        );
        return;
      }

      const isVariations = rawPrompt.startsWith("__variations__");
      const prompt = isVariations
        ? rawPrompt.replace("__variations__", "")
        : rawPrompt;

      setIsGenerating(true);
      setInputValue("");

      // Add user message (skip for re-generations called internally)
      if (!isVariations) {
        setMessages((prev) => [
          ...prev,
          { id: nextId(), type: "user", prompt } satisfies UserMessage,
        ]);
      }
      scrollToBottom();

      // Thinking phase
      const thinkingId = nextId();
      await new Promise((r) => setTimeout(r, 80));
      setMessages((prev) => [
        ...prev,
        { id: thinkingId, type: "thinking" } satisfies ThinkingMessage,
      ]);
      scrollToBottom();
      await new Promise((r) => setTimeout(r, 600));

      // Progress stages
      const progressId = nextId();
      for (let i = 0; i < STAGES.length; i++) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingId
              ? ({
                  id: progressId,
                  type: "progress",
                  stage: i,
                  stageText: STAGES[i].text,
                } satisfies ProgressMessage)
              : m.id === progressId
                ? ({
                    id: progressId,
                    type: "progress",
                    stage: i,
                    stageText: STAGES[i].text,
                  } satisfies ProgressMessage)
                : m,
          ),
        );
        scrollToBottom();
        await new Promise((r) => setTimeout(r, STAGES[i].duration));
      }

      // Generate image URL(s)
      const imageUrl = getImageUrl(prompt, Date.now());
      let variations: string[] | null = null;
      if (isVariations) {
        const variationModifiers = [
          ", variation 1, different composition",
          ", variation 2, alternate angle",
          ", variation 3, creative reinterpretation",
        ];
        variations = variationModifiers.map((mod, i) =>
          getImageUrl(prompt + mod, Date.now() + i * 7919),
        );
      }

      // Replace progress with image card
      setMessages((prev) =>
        prev.map((m) =>
          m.id === progressId || m.id === thinkingId
            ? ({
                id: progressId,
                type: "image",
                prompt,
                imageUrl,
                variations,
              } satisfies ImageMessage)
            : m,
        ),
      );
      scrollToBottom();
      setIsGenerating(false);
    },
    [isGenerating, scrollToBottom, nextId],
  );

  const handleSend = useCallback(() => {
    if (promptBlocked) return;
    generate(inputValue.trim());
  }, [generate, inputValue, promptBlocked]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: textareaRef is stable
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [inputValue]);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#070B14",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      data-ocid="ai_image.page"
    >
      {/* Animated gradient blobs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "-10%",
            left: "60%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            animation: "float1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "10%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
            animation: "float2 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* Scrollable chat area */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-44">
        {/* Page header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-ocid="ai_image.header"
        >
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22C55E",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Elysian AI · Ready
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Image Generator
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            Describe anything. Elysian AI creates it instantly.
          </p>
        </motion.div>

        {/* Chat messages */}
        <div className="flex flex-col gap-5" data-ocid="ai_image.chat_list">
          {messages.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center gap-6 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              data-ocid="ai_image.empty_state"
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(34,197,94,0.2) 100%)",
                  border: "1px solid rgba(37,99,235,0.25)",
                }}
              >
                <Sparkles size={22} style={{ color: "#60a5fa" }} />
              </div>
              <div className="text-center">
                <p
                  className="text-base font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Elysian AI is ready to create
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Type a description below and I'll generate it for you.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {EXAMPLE_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setInputValue(prompt);
                      textareaRef.current?.focus();
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3.5 py-1.5 rounded-full text-sm transition-colors duration-150"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                    data-ocid={`ai_image.example_prompt.${i + 1}`}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, idx) => (
            <div key={msg.id} data-ocid={`ai_image.message.${idx + 1}`}>
              {msg.type === "user" && (
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="max-w-[70%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #2563EB 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {msg.prompt}
                  </div>
                </motion.div>
              )}
              {msg.type === "thinking" && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="rounded-2xl rounded-tl-sm"
                    style={{
                      background: "rgba(15,23,42,0.7)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              {msg.type === "progress" && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="rounded-2xl rounded-tl-sm"
                    style={{
                      background: "rgba(15,23,42,0.7)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <ProgressDisplay
                        key={msg.stageText}
                        stage={msg.stage}
                        stageText={msg.stageText}
                      />
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
              {msg.type === "image" && (
                <div className="flex justify-start">
                  <ImageCard
                    msg={msg}
                    onRegenerate={generate}
                    onViewFull={setLightboxUrl}
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Fixed bottom input bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-20 px-4 py-4"
        style={{
          background:
            "linear-gradient(to top, rgba(7,11,20,0.98) 0%, rgba(7,11,20,0.8) 60%, transparent 100%)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        data-ocid="ai_image.input_bar"
      >
        <div className="max-w-3xl mx-auto">
          {promptBlocked && (
            <motion.p
              className="text-xs mb-2 text-center"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#f87171" }}
            >
              ⚠ That type of content isn't supported. Please try a different
              prompt.
            </motion.p>
          )}
          <InputBar
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            onKeyDown={handleKeyDown}
            isGenerating={isGenerating}
            textareaRef={textareaRef}
            blocked={promptBlocked}
          />
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxUrl && (
          <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />
        )}
      </AnimatePresence>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 30px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, -35px); }
        }
      `}</style>
    </div>
  );
}

function InputBar({
  value,
  onChange,
  onSend,
  onKeyDown,
  isGenerating,
  textareaRef,
  blocked,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isGenerating: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  blocked: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = blocked
    ? "rgba(239,68,68,0.8)"
    : focused
      ? "rgba(37,99,235,0.55)"
      : "rgba(255,255,255,0.09)";
  const boxShadow = blocked
    ? "0 0 0 3px rgba(239,68,68,0.15), 0 8px 32px rgba(0,0,0,0.4)"
    : focused
      ? "0 0 0 3px rgba(37,99,235,0.12), 0 8px 32px rgba(0,0,0,0.4)"
      : "0 8px 32px rgba(0,0,0,0.35)";
  return (
    <div
      className="flex items-end gap-2 px-3 py-2.5 rounded-2xl transition-all duration-300"
      style={{
        background: "rgba(15,23,42,0.85)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${borderColor}`,
        boxShadow,
      }}
    >
      {/* Left icons */}
      <div className="flex items-center gap-1 pb-0.5">
        <SideIconBtn aria-label="Upload image" ocid="ai_image.upload_button">
          <ImageIcon size={16} />
        </SideIconBtn>
        <SideIconBtn aria-label="Voice input" ocid="ai_image.voice_button">
          <Mic size={16} />
        </SideIconBtn>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Describe any image you want to create…"
          disabled={isGenerating}
          rows={1}
          className="w-full resize-none bg-transparent text-sm outline-none"
          style={{
            color: "rgba(255,255,255,0.88)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.6,
            maxHeight: 120,
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
          data-ocid="ai_image.input"
        />
        {value.length > 100 && (
          <span
            className="absolute bottom-0 right-0 text-[10px]"
            style={{
              color: value.length > 400 ? "#f87171" : "rgba(255,255,255,0.28)",
            }}
          >
            {value.length}
          </span>
        )}
      </div>

      {/* Send button */}
      <motion.button
        type="button"
        onClick={onSend}
        disabled={isGenerating || !value.trim() || blocked}
        whileHover={
          !isGenerating && value.trim() && !blocked ? { scale: 1.06 } : {}
        }
        whileTap={
          !isGenerating && value.trim() && !blocked ? { scale: 0.95 } : {}
        }
        className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-opacity duration-200"
        style={{
          background:
            isGenerating || !value.trim() || blocked
              ? "rgba(37,99,235,0.2)"
              : "linear-gradient(135deg, #2563EB 0%, #22C55E 100%)",
          boxShadow:
            !isGenerating && value.trim() && !blocked
              ? "0 0 16px rgba(37,99,235,0.35)"
              : "none",
          opacity: isGenerating || !value.trim() || blocked ? 0.5 : 1,
          cursor:
            isGenerating || !value.trim() || blocked
              ? "not-allowed"
              : "pointer",
        }}
        aria-label="Generate image"
        data-ocid="ai_image.submit_button"
      >
        {isGenerating ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <RefreshCw size={16} className="text-white" />
          </motion.div>
        ) : (
          <Send size={15} className="text-white" />
        )}
      </motion.button>
    </div>
  );
}

function SideIconBtn({
  children,
  "aria-label": ariaLabel,
  ocid,
}: {
  children: React.ReactNode;
  "aria-label": string;
  ocid: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      className="flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-150"
      style={{
        color: "rgba(255,255,255,0.38)",
        background: "transparent",
      }}
      aria-label={ariaLabel}
      data-ocid={ocid}
    >
      {children}
    </motion.button>
  );
}

export default AiImageGeneratorPage;
