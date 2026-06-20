import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  AIToolsSection,
  AdCreatorSection,
  FooterSection,
  LiveShowcaseSection,
  SocialProofSection,
  TemplatesSection,
  ThumbnailStudioSection,
  TrustBadgesSection,
  VideoEditorSection,
} from "./LandingSections";

// ─── Hero Editor Mockup ──────────────────────────────────────────────────────
function HeroEditorMockup() {
  return (
    <motion.div
      className="w-full max-w-xl relative"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: "rgba(7,11,20,0.90)",
          border: "1px solid rgba(80,200,120,0.22)",
          boxShadow:
            "0 0 60px rgba(0,71,171,0.30), 0 0 100px rgba(80,200,120,0.12), 0 24px 80px rgba(0,0,0,0.6)",
          aspectRatio: "16/10",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,71,171,0.06) 0%, rgba(80,200,120,0.05) 100%)",
          }}
        />
        <iframe
          src="/editor/demo/canvas"
          title="Editor preview"
          className="absolute inset-0 w-full h-full"
          style={{
            border: "none",
            pointerEvents: "none",
          }}
          loading="eager"
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute -top-3 -right-3 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(80,200,120,0.25) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      <div
        className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,71,171,0.20) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
      />
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center px-6"
      style={{ background: "#070B14", overflow: "hidden" }}
      data-ocid="landing.hero_section"
    >
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "5%",
          width: 700,
          height: 600,
          background:
            "radial-gradient(ellipse at center, rgba(80,200,120,0.14) 0%, rgba(0,71,171,0.07) 45%, transparent 70%)",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          right: "0%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(0,71,171,0.12) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-28 pb-20">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 xl:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "rgba(80,200,120,0.10)",
                  border: "1px solid rgba(80,200,120,0.28)",
                  color: "#50c878",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    background: "#50c878",
                    boxShadow: "0 0 6px #50c878",
                  }}
                />
                ✦ The Creative Platform for Creators
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-extrabold leading-none tracking-tight mb-6"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                lineHeight: 1.05,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
            >
              <span style={{ color: "#ffffff" }}>Create Viral Content</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Faster.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="max-w-lg mb-10 text-lg leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              Professional thumbnail design, cinematic video editing, and
              AI-powered creative tools — all in one platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* @ts-ignore */}
              <Link
                to="/thumbnail-studio"
                data-ocid="landing.hero.start_creating_button"
              >
                <motion.span
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white cursor-pointer"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background:
                      "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                    boxShadow:
                      "0 4px 28px rgba(0,71,171,0.45), 0 1px 0 rgba(255,255,255,0.12) inset",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  Start Creating →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Editor mockup */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            <HeroEditorMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0a0e1a 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0e1a" }}
      data-ocid="landing.page"
    >
      <HeroSection />
      <TrustBadgesSection />
      <ThumbnailStudioSection />
      <VideoEditorSection />
      <AdCreatorSection />
      <AIToolsSection />
      <TemplatesSection />
      <LiveShowcaseSection />
      <SocialProofSection />
      <FooterSection />
    </div>
  );
}

export default LandingPage;
