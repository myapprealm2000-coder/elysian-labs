// Landing page section components for Elysian Labs
import { Link } from "@tanstack/react-router";
import {
  Bot,
  Image as ImageIcon,
  Layers,
  Mic,
  Scissors,
  Sparkles,
  Video,
  Wand2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Shared styles ─────────────────────────────────────────────────────────
const GLASS = {
  background: "rgba(16,24,32,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 20,
} as const;

const GRADIENT_TEXT: React.CSSProperties = {
  background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const SECTION_LABEL: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 14px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  background: "rgba(80,200,120,0.10)",
  border: "1px solid rgba(80,200,120,0.25)",
  color: "#50c878",
};

// Floating animation applied directly on motion elements
const floatAnimate = { y: [0, -10, 0] };
const floatTransition = {
  duration: 4,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut" as const,
};

// ─── Section: Trust Badges ──────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: Zap, label: "Built for Modern Creators" },
  { icon: Video, label: "Designed for Cinematic Storytelling" },
  { icon: Sparkles, label: "Optimized for Viral Content" },
  { icon: Bot, label: "AI-Powered Creative Workflows" },
];

export function TrustBadgesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-16"
      data-ocid="landing.trust_section"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {TRUST_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex flex-col items-center text-center gap-3 p-5"
            style={GLASS}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,71,171,0.25) 0%, rgba(80,200,120,0.25) 100%)",
              }}
            >
              <item.icon className="w-5 h-5" style={{ color: "#50c878" }} />
            </div>
            <p
              className="text-sm font-semibold leading-snug"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Shared: Live Editor Embed ───────────────────────────────────────────────
function LiveEditorEmbed({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: "rgba(7,11,20,0.8)",
        border: "1px solid rgba(80,200,120,0.20)",
        boxShadow:
          "0 0 40px rgba(0,71,171,0.25), 0 0 80px rgba(80,200,120,0.10)",
        aspectRatio: "16/9",
      }}
    >
      {/* Glow border effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,71,171,0.08) 0%, rgba(80,200,120,0.06) 100%)",
        }}
      />
      <iframe
        src={src}
        title={label}
        className="absolute inset-0 w-full h-full"
        style={{
          border: "none",
          pointerEvents: "none",
          transform: "scale(1)",
          transformOrigin: "top left",
        }}
        loading="lazy"
        aria-label={label}
      />
    </div>
  );
}

// ─── Section: Thumbnail Studio ──────────────────────────────────────────────
export function ThumbnailStudioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24"
      style={{ background: "rgba(255,255,255,0.015)" }}
      data-ocid="landing.thumbnail_section"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span style={SECTION_LABEL}>✦ Thumbnail Studio</span>
          <h2
            className="mt-5 mb-5 font-extrabold leading-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#ffffff",
            }}
          >
            Design Thumbnails{" "}
            <span style={GRADIENT_TEXT}>That Get Clicked.</span>
          </h2>
          <p
            className="mb-8 text-base leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.58)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Create scroll-stopping thumbnails for YouTube, TikTok, and gaming
            channels. AI-powered templates, smart text placement, glow effects,
            and one-click exports — all built in.
          </p>
          {/* @ts-ignore */}
          <Link to="/thumbnail-studio" data-ocid="landing.thumbnail.cta_button">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                boxShadow: "0 4px 24px rgba(0,71,171,0.35)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Open Thumbnail Studio →
            </motion.span>
          </Link>
        </motion.div>

        {/* Live embed */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.div animate={floatAnimate} transition={floatTransition}>
            <LiveEditorEmbed
              src="/editor/demo/canvas"
              label="Thumbnail Studio preview"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Video Editor ──────────────────────────────────────────────────
export function VideoEditorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24"
      data-ocid="landing.video_editor_section"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Live embed (left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div animate={floatAnimate} transition={floatTransition}>
            <LiveEditorEmbed src="/editor/demo" label="Video Editor preview" />
          </motion.div>
        </motion.div>

        {/* Text (right) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span style={SECTION_LABEL}>✦ Video Editor</span>
          <h2
            className="mt-5 mb-5 font-extrabold leading-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#ffffff",
            }}
          >
            Edit Videos <span style={GRADIENT_TEXT}>Like a Pro.</span>
          </h2>
          <p
            className="mb-8 text-base leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.58)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            A CapCut-style multi-track timeline editor with AI captions,
            cinematic color grading, transitions, and effects. Upload, edit, and
            export high-quality video — no downloads needed.
          </p>
          {/* @ts-ignore */}
          <Link to="/video-editor" data-ocid="landing.video_editor.cta_button">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                boxShadow: "0 4px 24px rgba(0,71,171,0.35)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Open Video Editor →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Ad Creator ────────────────────────────────────────────────────
const AD_LABEL_STYLE: React.CSSProperties = {
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
  color: "#60a5fa",
};

const AD_GRADIENT_TEXT: React.CSSProperties = {
  background: "linear-gradient(90deg, #2563EB 0%, #60a5fa 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
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
  { label: "Carousel Ads", color: "#06b6d4" },
];

const AD_FEATURES = [
  {
    icon: Sparkles,
    name: "AI Ad Generation",
    desc: "Describe your product. Get stunning, conversion-ready ads in seconds.",
    color: "#2563EB",
  },
  {
    icon: Layers,
    name: "Multi-Platform Formats",
    desc: "Instagram, TikTok, YouTube, Meta — optimized for every platform automatically.",
    color: "#60a5fa",
  },
  {
    icon: Zap,
    name: "Real-Time Analytics",
    desc: "Live performance metrics, CTR insights, and AI recommendations built in.",
    color: "#818cf8",
  },
];

function AdStudioMockup({ inView }: { inView: boolean }) {
  const [aiVisible, setAiVisible] = useState(false);
  const [ctr, setCtr] = useState(0);
  const [reach, setReach] = useState(0);

  // AI overlay cycles every 2.5s
  useEffect(() => {
    const id = setInterval(() => setAiVisible((v) => !v), 2500);
    return () => clearInterval(id);
  }, []);

  // Count-up on inView
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame++;
      setCtr(
        Math.min(3.2, Number.parseFloat(((3.2 * frame) / total).toFixed(1))),
      );
      setReach(Math.min(142, Math.round((142 * frame) / total)));
      if (frame >= total) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        background: "rgba(15,23,42,0.96)",
        border: "1px solid rgba(37,99,235,0.25)",
        boxShadow:
          "0 0 50px rgba(37,99,235,0.20), 0 0 100px rgba(37,99,235,0.08), 0 24px 64px rgba(0,0,0,0.6)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Pulsing glow border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(37,99,235,0.45)" }}
        aria-hidden="true"
      />

      {/* Top chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: c }}
          />
        ))}
        <span
          className="ml-auto text-xs font-semibold"
          style={{
            color: "rgba(255,255,255,0.30)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Ad Creator Studio
        </span>
      </div>

      <div className="flex" style={{ minHeight: 200 }}>
        {/* Left icon sidebar */}
        <div
          className="flex flex-col items-center gap-3 py-4 px-2.5"
          style={{ borderRight: "1px solid rgba(255,255,255,0.06)", width: 44 }}
        >
          {[
            { color: "#2563EB" },
            { color: "#60a5fa" },
            { color: "#818cf8" },
            { color: "#34d399" },
            { color: "rgba(255,255,255,0.18)" },
          ].map((item, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey:
              key={i}
              className="w-6 h-6 rounded-lg"
              style={{
                background:
                  i === 0
                    ? `linear-gradient(135deg, ${item.color}, #3b82f6)`
                    : item.color,
                boxShadow: i === 0 ? `0 0 10px ${item.color}70` : "none",
              }}
            />
          ))}
        </div>

        {/* Center canvas */}
        <div className="relative flex-1 p-3">
          {/* Floating metric cards */}
          <div className="flex gap-2 mb-3">
            <div
              className="flex-1 rounded-xl px-3 py-2"
              style={{
                background: "rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.25)",
              }}
            >
              <p
                className="text-xs"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                CTR
              </p>
              <p
                className="font-bold text-sm"
                style={{ color: "#60a5fa", fontFamily: "Inter, sans-serif" }}
              >
                {ctr.toFixed(1)}%
              </p>
            </div>
            <div
              className="flex-1 rounded-xl px-3 py-2"
              style={{
                background: "rgba(129,140,248,0.10)",
                border: "1px solid rgba(129,140,248,0.22)",
              }}
            >
              <p
                className="text-xs"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Reach
              </p>
              <p
                className="font-bold text-sm"
                style={{ color: "#a5b4fc", fontFamily: "Inter, sans-serif" }}
              >
                {reach}K
              </p>
            </div>
          </div>

          {/* Ad canvas preview */}
          <div
            className="relative rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 50%, #0f172a 100%)",
              border: "1px solid rgba(37,99,235,0.30)",
              aspectRatio: "4/3",
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(37,99,235,0.30) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 text-center px-4">
              <p
                className="text-xs font-black tracking-widest uppercase mb-1"
                style={{
                  color: "rgba(255,255,255,0.50)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Limited Offer
              </p>
              <p
                className="font-black text-white"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
                  textShadow: "0 0 20px rgba(37,99,235,0.8)",
                }}
              >
                SHOP NOW
              </p>
              <p
                className="text-xs mt-1"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Elysian Premium Collection
              </p>
              <div
                className="mt-2 inline-block px-4 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "linear-gradient(90deg, #2563EB, #60a5fa)",
                  color: "#fff",
                }}
              >
                Get 40% Off →
              </div>
            </div>

            {/* AI overlay */}
            <AnimatePresence>
              {aiVisible && (
                <motion.div
                  key="ai-overlay"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(7,11,20,0.82)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(37,99,235,0.35)",
                  }}
                >
                  <motion.div
                    className="w-6 h-6 rounded-full mb-2"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 1.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    style={{
                      background: "radial-gradient(circle, #2563EB, #1d4ed8)",
                      boxShadow: "0 0 16px #2563EB",
                    }}
                  />
                  <p
                    className="text-xs font-semibold"
                    style={{
                      color: "#60a5fa",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    AI Generating…
                  </p>
                  <div
                    className="mt-2 w-24 h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.10)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: "linear-gradient(90deg, #2563EB, #60a5fa)",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right properties panel */}
        <div
          className="flex flex-col gap-3 py-4 px-3"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", width: 72 }}
        >
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.30)",
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.1em",
            }}
          >
            STYLE
          </p>
          {[
            { label: "Color", val: "72%", color: "#2563EB" },
            { label: "Size", val: "55%", color: "#60a5fa" },
            { label: "Blur", val: "38%", color: "#818cf8" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-xs mb-1"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 9,
                }}
              >
                {s.label}
              </p>
              <div
                className="h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: s.val,
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}80)`,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="mt-1 flex gap-1.5">
            {["#2563EB", "#ec4899"].map((c) => (
              <div
                key={c}
                className="w-5 h-5 rounded-full"
                style={{ background: c, boxShadow: `0 0 6px ${c}80` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AdCreatorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.015)" }}
      data-ocid="landing.ad_creator_section"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span style={AD_LABEL_STYLE}>⚡ AI-Powered Advertising</span>
          <h2
            className="mt-5 mb-4 font-extrabold leading-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#ffffff",
            }}
          >
            Ad Creative <span style={AD_GRADIENT_TEXT}>Studio</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto mb-6"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 1.7,
            }}
          >
            Design high-converting ads with AI generation, performance
            analytics, and professional creative workflows.
          </p>
          {/* @ts-ignore */}
          <Link to="/ad-creator" data-ocid="landing.ad_creator.cta_button">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #1d4ed8 0%, #2563EB 100%)",
                boxShadow: "0 4px 24px rgba(37,99,235,0.40)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 6px 32px rgba(37,99,235,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Open Ad Studio →
            </motion.span>
          </Link>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: studio mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AdStudioMockup inView={inView} />
          </motion.div>

          {/* Right: feature cards */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {AD_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{
                  background: "rgba(16,24,40,0.72)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${feat.color}22`,
                  boxShadow: `0 4px 20px ${feat.color}10`,
                }}
                data-ocid={`landing.ad_feature.item.${i + 1}`}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${feat.color}25, ${feat.color}40)`,
                    border: `1px solid ${feat.color}40`,
                    boxShadow: `0 0 16px ${feat.color}20`,
                  }}
                >
                  <feat.icon
                    className="w-5 h-5"
                    style={{ color: feat.color }}
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="font-bold text-sm mb-1"
                    style={{
                      color: "#fff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {feat.name}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.50)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Format chips marquee */}
        <motion.div
          className="mt-14 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          data-ocid="landing.ad_creator.format_row"
        >
          <style>{`
            @keyframes adMarquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `}</style>
          <div
            style={{
              display: "flex",
              animation: "adMarquee 22s linear infinite",
              width: "max-content",
            }}
          >
            {[...FORMAT_CHIPS, ...FORMAT_CHIPS].map((chip, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey:
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0"
                style={{
                  background: `${chip.color}12`,
                  border: `1px solid ${chip.color}30`,
                  color: "rgba(255,255,255,0.72)",
                  marginRight: 10,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: chip.color,
                    boxShadow: `0 0 6px ${chip.color}`,
                  }}
                />
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: AI Tools ──────────────────────────────────────────────────────
const AI_TOOLS = [
  {
    icon: Bot,
    name: "AI Captions",
    desc: "Auto-generate subtitles from speech in real-time.",
    color: "#50c878",
  },
  {
    icon: ImageIcon,
    name: "AI Thumbnail Generator",
    desc: "Create click-worthy thumbnails instantly with AI.",
    color: "#0047ab",
  },
  {
    icon: Zap,
    name: "AI Hook Generator",
    desc: "Generate viral opening hooks for any niche.",
    color: "#f59e0b",
  },
  {
    icon: Scissors,
    name: "AI Background Removal",
    desc: "Remove backgrounds in one click, no green screen.",
    color: "#50c878",
  },
  {
    icon: Mic,
    name: "AI Voiceover",
    desc: "Add professional AI narration in multiple voices.",
    color: "#0078d4",
  },
];

export function AIToolsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24"
      style={{ background: "rgba(7,11,20,0.6)" }}
      data-ocid="landing.ai_tools_section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={SECTION_LABEL}>✦ AI Tools</span>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#ffffff",
            }}
          >
            Supercharge Your <span style={GRADIENT_TEXT}>Creative Flow.</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {AI_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group flex flex-col gap-4 p-6 rounded-2xl cursor-pointer"
              style={GLASS}
              data-ocid={`landing.ai_tool.item.${i + 1}`}
            >
              <div
                className="w-11 h-11 flex items-center justify-center rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}35)`,
                  border: `1px solid ${tool.color}40`,
                  boxShadow: `0 0 16px ${tool.color}20`,
                }}
              >
                <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
              </div>
              <div>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{
                    color: "#fff",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {tool.name}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {tool.desc}
                </p>
              </div>
              <span
                className="hidden group-hover:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full self-start transition-all"
                style={{
                  background: `${tool.color}20`,
                  border: `1px solid ${tool.color}40`,
                  color: tool.color,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: tool.color }}
                />
                Processing…
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Templates ─────────────────────────────────────────────────────
const TEMPLATE_CATEGORIES = [
  "YouTube",
  "TikTok",
  "Shorts",
  "Gaming",
  "Ads",
  "Podcast",
  "Instagram",
];

const TEMPLATE_CARDS: Record<
  string,
  Array<{ title: string; gradient: string }>
> = {
  YouTube: [
    { title: "Gaming Channel Thumbnail", gradient: "135deg, #0047ab, #50c878" },
    { title: "Vlog Intro Card", gradient: "135deg, #7c3aed, #0047ab" },
    { title: "Tech Review Thumb", gradient: "135deg, #0047ab, #06b6d4" },
    { title: "Reaction Clip Cover", gradient: "135deg, #50c878, #f59e0b" },
    { title: "Tutorial Banner", gradient: "135deg, #dc2626, #0047ab" },
    { title: "Shorts Cover", gradient: "135deg, #50c878, #0047ab" },
  ],
  TikTok: [
    { title: "Viral Hook Card", gradient: "135deg, #69c9d0, #ee1d52" },
    { title: "Dance Cover", gradient: "135deg, #ee1d52, #69c9d0" },
    { title: "Trending Sound Cover", gradient: "135deg, #7c3aed, #ee1d52" },
    { title: "POV Story Card", gradient: "135deg, #f59e0b, #ee1d52" },
    { title: "Duet Template", gradient: "135deg, #69c9d0, #0047ab" },
    { title: "GRWM Cover", gradient: "135deg, #ec4899, #69c9d0" },
  ],
  Shorts: [
    { title: "Quick Tips Card", gradient: "135deg, #50c878, #0047ab" },
    { title: "60s Challenge Cover", gradient: "135deg, #f59e0b, #50c878" },
    { title: "Storytime Thumb", gradient: "135deg, #0047ab, #7c3aed" },
    { title: "Reaction Shorts", gradient: "135deg, #dc2626, #f59e0b" },
    { title: "News Short", gradient: "135deg, #06b6d4, #0047ab" },
    { title: "Motivation Short", gradient: "135deg, #50c878, #f59e0b" },
  ],
  Gaming: [
    { title: "FPS Highlight Reel", gradient: "135deg, #0047ab, #50c878" },
    { title: "Battle Royale Cover", gradient: "135deg, #dc2626, #f59e0b" },
    { title: "Speedrun Thumb", gradient: "135deg, #50c878, #0047ab" },
    { title: "Let's Play Intro", gradient: "135deg, #7c3aed, #50c878" },
    { title: "Ranked Game Card", gradient: "135deg, #f59e0b, #dc2626" },
    { title: "Montage Cover", gradient: "135deg, #06b6d4, #7c3aed" },
  ],
  Ads: [
    { title: "Product Launch Ad", gradient: "135deg, #0047ab, #06b6d4" },
    { title: "E-commerce Banner", gradient: "135deg, #50c878, #0047ab" },
    { title: "Flash Sale Card", gradient: "135deg, #dc2626, #f59e0b" },
    { title: "Brand Awareness Ad", gradient: "135deg, #7c3aed, #0047ab" },
    { title: "App Promo Reel", gradient: "135deg, #06b6d4, #50c878" },
    { title: "Retargeting Ad", gradient: "135deg, #f59e0b, #7c3aed" },
  ],
  Podcast: [
    { title: "Episode Thumbnail", gradient: "135deg, #0047ab, #7c3aed" },
    { title: "Interview Cover", gradient: "135deg, #50c878, #06b6d4" },
    { title: "Podcast Promo Card", gradient: "135deg, #f59e0b, #0047ab" },
    { title: "Season Launch Art", gradient: "135deg, #7c3aed, #50c878" },
    { title: "Guest Spotlight", gradient: "135deg, #06b6d4, #0047ab" },
    { title: "Shorts Clip Cover", gradient: "135deg, #50c878, #f59e0b" },
  ],
  Instagram: [
    { title: "Reel Cover", gradient: "135deg, #e1306c, #f77737" },
    { title: "Story Template", gradient: "135deg, #833ab4, #e1306c" },
    { title: "Carousel Slide 1", gradient: "135deg, #405de6, #833ab4" },
    { title: "Quote Graphic", gradient: "135deg, #f77737, #fcaf45" },
    { title: "Product Showcase", gradient: "135deg, #e1306c, #405de6" },
    { title: "Highlight Cover", gradient: "135deg, #833ab4, #f77737" },
  ],
};

export function TemplatesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("YouTube");
  const cards = TEMPLATE_CARDS[active] ?? [];

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24"
      data-ocid="landing.templates_section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={SECTION_LABEL}>✦ Templates</span>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#ffffff",
            }}
          >
            Templates for <span style={GRADIENT_TEXT}>Every Format.</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-ocid="landing.templates.tabs"
        >
          {TEMPLATE_CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background:
                  active === cat
                    ? "linear-gradient(90deg, #0047ab, #50c878)"
                    : "rgba(255,255,255,0.06)",
                color: active === cat ? "#fff" : "rgba(255,255,255,0.60)",
                border:
                  active === cat
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  active === cat ? "0 2px 14px rgba(0,71,171,0.30)" : "none",
              }}
              data-ocid={`landing.templates.tab.${cat.toLowerCase()}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Template grid */}
        <motion.div
          key={active}
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                background: `linear-gradient(${card.gradient})`,
                aspectRatio: "16/9",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
              data-ocid={`landing.template.item.${i + 1}`}
            >
              <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                }}
              >
                <p
                  className="text-sm font-bold text-white truncate"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {card.title}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {active}
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Use Template
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Live Editor Showcase ────────────────────────────────────────────
export function LiveShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const tracks = [
    {
      label: "Video",
      color: "#0047ab",
      clips: [
        { left: "2%", width: "32%" },
        { left: "36%", width: "24%" },
        { left: "62%", width: "35%" },
      ],
    },
    {
      label: "Audio",
      color: "#50c878",
      clips: [{ left: "2%", width: "95%" }],
    },
    {
      label: "Text",
      color: "#f59e0b",
      clips: [
        { left: "5%", width: "20%" },
        { left: "50%", width: "18%" },
      ],
    },
  ];

  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-28"
      style={{ background: "rgba(7,11,20,0.8)" }}
      data-ocid="landing.live_showcase_section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(0,71,171,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span style={SECTION_LABEL}>✦ Live Editor Showcase</span>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#ffffff",
            }}
          >
            A Studio Built for{" "}
            <span style={GRADIENT_TEXT}>Next-Gen Creators.</span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.50)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Cinematic timelines, AI tools, and real-time exports — all in one
            premium interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 60px rgba(0,71,171,0.28), 0 0 120px rgba(80,200,120,0.10), 0 32px 80px rgba(0,0,0,0.7)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span
                  key={c}
                  className="w-3 h-3 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span
              className="text-xs font-semibold"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Elysian Labs — Video Editor
            </span>
            <span
              className="px-3 py-1 rounded-lg text-xs font-semibold"
              style={{
                background: "linear-gradient(90deg, #0047ab, #50c878)",
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Export
            </span>
          </div>

          <div className="p-5 space-y-5">
            {/* Canvas preview */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: "#070B14",
                border: "1px solid rgba(255,255,255,0.06)",
                aspectRatio: "16/6",
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,71,171,0.22) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 text-center px-4">
                <motion.p
                  className="font-extrabold text-white"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1rem, 3vw, 1.8rem)",
                    textShadow: "0 0 30px rgba(80,200,120,0.6)",
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  Create Viral Content Faster.
                </motion.p>
                <motion.p
                  className="text-xs mt-2"
                  style={{
                    color: "rgba(80,200,120,0.7)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                >
                  ● Text overlay — 00:02.4 – 00:07.1
                </motion.p>
              </div>
            </div>

            {/* Timeline */}
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{
                background: "rgba(7,11,20,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="flex items-center gap-1 px-1"
                style={{ height: 18 }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey:
                    key={i}
                    className="text-xs flex-1 text-center"
                    style={{
                      color: "rgba(255,255,255,0.20)",
                      fontFamily: "monospace",
                    }}
                  >
                    {`00:${String(i * 5).padStart(2, "0")}`}
                  </span>
                ))}
              </div>
              {tracks.map((track) => (
                <div key={track.label} className="flex items-center gap-3">
                  <span
                    className="w-12 text-xs font-semibold flex-shrink-0 text-right"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {track.label}
                  </span>
                  <div className="relative flex-1" style={{ height: 28 }}>
                    {track.clips.map((clip, ci) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey:
                        key={ci}
                        className="absolute top-0 bottom-0 rounded-lg"
                        style={{
                          left: clip.left,
                          width: clip.width,
                          background: `linear-gradient(90deg, ${track.color}60, ${track.color}30)`,
                          border: `1px solid ${track.color}50`,
                        }}
                      />
                    ))}
                    {track.label === "Audio" && (
                      <div className="absolute inset-0 flex items-center px-2 gap-px overflow-hidden rounded-lg pointer-events-none">
                        {Array.from({ length: 60 }).map((_, wi) => (
                          <motion.div
                            // biome-ignore lint/suspicious/noArrayIndexKey:
                            key={wi}
                            className="flex-shrink-0 rounded-full"
                            style={{ width: 2, background: `${track.color}90` }}
                            animate={{
                              height: [
                                4 + Math.random() * 14,
                                4 + Math.random() * 14,
                                4 + Math.random() * 14,
                              ],
                            }}
                            transition={{
                              duration: 0.6 + Math.random() * 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                              delay: wi * 0.03,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Social Proof ──────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "Elysian Labs replaced three apps I was paying for. The thumbnail creator alone saves me an hour every upload.",
    name: "Jordan Mercer",
    role: "YouTube Creator — 380K subs",
    color: "#50c878",
  },
  {
    quote:
      "The CapCut-style editor is genuinely premium. I've tried everything and this is the first free tool that doesn't feel free.",
    name: "Sasha Nguyen",
    role: "TikTok Content Creator",
    color: "#0047ab",
  },
  {
    quote:
      "AI captions, hook generator, background removal — it's like having a production team in the browser.",
    name: "Demi Okonkwo",
    role: "Shorts & Reels Creator",
    color: "#f59e0b",
  },
];

export function SocialProofSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      ref={ref}
      className="relative z-10 px-6 py-24"
      style={{ background: "rgba(255,255,255,0.012)" }}
      data-ocid="landing.social_proof_section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span style={SECTION_LABEL}>✦ Creators Love It</span>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#ffffff",
            }}
          >
            Built for Modern <span style={GRADIENT_TEXT}>Creators.</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="flex flex-col gap-4 p-7 rounded-2xl"
              style={{
                ...GLASS,
                background: `linear-gradient(135deg, rgba(16,24,32,0.92) 0%, ${t.color}12 100%)`,
                border: `1px solid ${t.color}22`,
                boxShadow: `0 4px 28px ${t.color}14`,
              }}
              data-ocid={`landing.testimonial.item.${i + 1}`}
            >
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                &#8220;{t.quote}&#8221;
              </p>
              <div className="mt-auto flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}30, ${t.color}60)`,
                    color: t.color,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: "#fff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Footer ────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Product: [
    { label: "Thumbnail Studio", to: "/thumbnail-studio" },
    { label: "Video Editor", to: "/video-editor" },
    { label: "Ad Creator", to: "/ad-creator" },
    { label: "AI Tools", to: "/ai-tools" },
    { label: "Templates", to: "/templates" },
  ],
  Resources: [
    { label: "Courses", to: "/courses" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
};

export function FooterSection() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "elysian-labs";
  return (
    <footer
      className="relative z-10 px-6 pt-16 pb-10"
      style={{
        background: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      data-ocid="landing.footer"
    >
      {/* Gradient top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0047ab, #50c878, transparent)",
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Wand2 className="w-6 h-6" style={{ color: "#50c878" }} />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Elysian Labs
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              The creative platform for modern creators.
            </p>
          </div>

          {/* Product */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Product
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.Product.map((l) => (
                <li key={l.label}>
                  {/* @ts-ignore */}
                  <Link
                    to={l.to}
                    className="text-sm hover:text-white transition-colors duration-150"
                    style={{
                      color: "rgba(255,255,255,0.50)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Resources
            </p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.Resources.map((l) => (
                <li key={l.label}>
                  {/* @ts-ignore */}
                  <Link
                    to={l.to}
                    className="text-sm hover:text-white transition-colors duration-150"
                    style={{
                      color: "rgba(255,255,255,0.50)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Follow Us
            </p>
            <div className="flex flex-wrap gap-3">
              {["Twitter/X", "Instagram", "YouTube", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="/"
                  className="text-sm px-3 py-1.5 rounded-xl transition-all duration-150"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.30)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            © {year} Elysian Labs. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              className="hover:text-white transition-colors"
              style={{ color: "rgba(80,200,120,0.6)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
