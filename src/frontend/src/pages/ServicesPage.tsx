import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Image,
  Layers,
  Megaphone,
  Palette,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Image,
    title: "Thumbnail Design",
    badge: "Popular",
    badgeVariant: "accent" as const,
    description:
      "Click-optimized thumbnails that stop the scroll. Craft visuals that drive 3× more clicks using proven psychological triggers and bold typography.",
    features: [
      "Smart composition templates",
      "Face & text auto-placement",
      "A/B test variants instantly",
      "Platform-specific sizing",
    ],
  },
  {
    icon: Megaphone,
    title: "Ad Creative",
    badge: "High ROI",
    badgeVariant: "emerald" as const,
    description:
      "Performance-first ad creatives built for conversion. From static banners to animated display ads — every pixel engineered to outperform.",
    features: [
      "Direct-response copywriting",
      "Dynamic product integration",
      "Multi-format export (Meta, Google, TikTok)",
      "Brand consistency guardrails",
    ],
  },
  {
    icon: Video,
    title: "Video Editing",
    badge: "Pro",
    badgeVariant: "primary" as const,
    description:
      "Professional-grade video editing with timeline precision. Trim, color grade, add motion graphics, and export in broadcast-quality formats.",
    features: [
      "Multi-track timeline editor",
      "Advanced color grading suite",
      "Motion graphics library",
      "4K export support",
    ],
  },
  {
    icon: Palette,
    title: "Brand Identity",
    badge: "New",
    badgeVariant: "accent" as const,
    description:
      "Cohesive brand systems that scale. We build visual identities that look as premium on a billboard as they do in a story.",
    features: [
      "Logo & mark design",
      "Color palette generation",
      "Typography system",
      "Brand style guide PDF",
    ],
  },
  {
    icon: Layers,
    title: "Social Media Kits",
    badge: "Bundle",
    badgeVariant: "emerald" as const,
    description:
      "Complete social media asset packages ready to post. Stories, reels covers, highlight icons, banners — every format, every platform.",
    features: [
      "Instagram & TikTok assets",
      "YouTube channel art",
      "Twitter/X header & avatar",
      "Resizable master templates",
    ],
  },
  {
    icon: Zap,
    title: "Motion Graphics",
    badge: "Cinematic",
    badgeVariant: "primary" as const,
    description:
      "Animated graphics and transitions that elevate your content. Intros, outros, lower thirds, and custom motion sequences.",
    features: [
      "Custom intro/outro sequences",
      "Animated lower thirds",
      "Kinetic typography",
      "Loop-ready social animations",
    ],
  },
];

const PROCESS = [
  {
    step: "01",
    label: "Brief",
    title: "Discovery Brief",
    desc: "We audit your brand, audience, and goals to understand what success looks like for your campaign.",
    color: "primary",
  },
  {
    step: "02",
    label: "Design",
    title: "Creative Design",
    desc: "Our team crafts pixel-perfect assets aligned to your KPIs, brand voice, and target platform.",
    color: "accent",
  },
  {
    step: "03",
    label: "Review",
    title: "Revision Rounds",
    desc: "Collaborative feedback loops ensure every asset hits the mark before it goes live.",
    color: "emerald",
  },
  {
    step: "04",
    label: "Deliver",
    title: "Launch-Ready",
    desc: "Final assets delivered in all required formats, ready to launch and iterate on performance.",
    color: "primary",
  },
];

// ── Badge helper ──────────────────────────────────────────────────────────────

function ServiceBadge({
  label,
  variant,
}: {
  label: string;
  variant: "accent" | "emerald" | "primary";
}) {
  const styles = {
    accent: "bg-accent/15 text-accent border border-accent/30",
    emerald:
      "bg-[oklch(0.65_0.17_150/0.15)] text-[oklch(0.65_0.17_150)] border border-[oklch(0.65_0.17_150/0.3)]",
    primary: "bg-primary/15 text-primary border border-primary/30",
  };
  return (
    <span
      className={`text-xs font-display font-semibold px-2.5 py-1 rounded-full ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

// ── Decorative floating orbs ──────────────────────────────────────────────────

function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "oklch(0.38 0.15 270)" }}
      />
      <div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "oklch(0.82 0.17 142)" }}
      />
      <div
        className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "oklch(0.65 0.17 150)" }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ── Hero ── */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0d1118 0%, #0a0f1a 50%, #0a1f15 100%)",
        }}
      >
        {/* Subtle green glow top-right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(0,255,0,0.07) 0%, transparent 65%)",
          }}
        />
        <BackgroundOrbs />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-accent/40 text-accent font-body px-4 py-1.5 text-sm"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2 inline" />
              What We Do
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display font-bold text-5xl md:text-7xl tracking-tight text-foreground mb-6 leading-[1.08]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Our{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #0047ab, #00ff00)",
              }}
            >
              Services
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From thumbnail design to full campaign production — every service at
            Elysian Labs is engineered for measurable impact and stunning visual
            results.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="font-display gap-2 bg-primary hover:opacity-90 transition-smooth accent-glow-sm text-primary-foreground"
                data-ocid="services-hero-cta"
              >
                Get a Free Audit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                size="lg"
                variant="outline"
                className="font-display border-border hover:border-accent/50 hover:text-accent transition-smooth"
                data-ocid="services-see-work"
              >
                See Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 px-6 bg-muted/10 section-divider">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-display font-semibold text-sm uppercase tracking-widest mb-3">
              What We Offer
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
              Creative Services That Convert
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-lg">
              Six specialized disciplines working in perfect harmony to elevate
              your brand presence across every platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(
              (
                {
                  icon: Icon,
                  title,
                  badge,
                  badgeVariant,
                  description,
                  features,
                },
                i,
              ) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-effect glass-hover rounded-2xl p-7 flex flex-col gap-5 cursor-pointer group"
                  data-ocid={`service-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/15 border border-primary/30 group-hover:border-accent/40 group-hover:bg-accent/10 transition-smooth">
                      <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-smooth" />
                    </div>
                    <ServiceBadge label={badge} variant={badgeVariant} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2.5">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2 pt-4 border-t border-border">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm font-body text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-display border-border hover:border-accent/50 hover:text-accent transition-smooth mt-1 group-hover:border-accent/40"
                    data-ocid={`service-cta-${title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Process / How It Works ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-display font-semibold text-sm uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
              From Brief to Launch
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-lg">
              A streamlined 4-step process that gets you from idea to
              campaign-ready assets with zero guesswork.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line (hidden on mobile) */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map(({ step, label, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col gap-4 p-6 rounded-2xl glass-effect glass-hover"
                  data-ocid={`process-step-${i + 1}`}
                >
                  {/* Step number bubble */}
                  <div className="relative w-12 h-12 mx-auto lg:mx-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-primary/60 bg-primary/15 font-display font-bold text-lg"
                      style={{ color: "oklch(0.6 0.18 270)" }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-40"
                      style={{ background: "oklch(0.38 0.15 270 / 0.5)" }}
                    />
                  </div>

                  {/* Label pill */}
                  <span className="text-xs font-display font-bold uppercase tracking-widest text-accent">
                    {label}
                  </span>

                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Large dim step number */}
                  <span
                    className="absolute bottom-4 right-5 font-display font-black text-6xl select-none pointer-events-none"
                    style={{ color: "oklch(0.38 0.15 270 / 0.08)" }}
                  >
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        {/* Gradient BG */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, oklch(0.38 0.15 270 / 0.18) 0%, oklch(0.65 0.17 150 / 0.08) 50%, transparent 80%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-accent/40 text-accent font-body px-4 py-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2 inline" />
              Let's Build Together
            </Badge>

            <h2 className="font-display font-black text-4xl md:text-6xl text-foreground mb-6 leading-[1.1]">
              Ready to Start{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.82 0.17 142) 0%, oklch(0.65 0.17 150) 100%)",
                }}
              >
                Your Project?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground font-body mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call and we'll map out exactly what
              your brand needs to stand out and convert.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="font-display gap-2 bg-primary hover:opacity-90 transition-smooth accent-glow text-primary-foreground px-8 py-6 text-base"
                  data-ocid="services-bottom-cta"
                >
                  Start a Project <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-display border-border hover:border-accent/50 hover:text-accent transition-smooth px-8 py-6 text-base"
                  data-ocid="services-learn-more"
                >
                  Meet the Team
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
              {[
                "500+ Projects Delivered",
                "48h Average Turnaround",
                "98% Client Retention",
              ].map((stat) => (
                <div
                  key={stat}
                  className="flex items-center gap-2 text-sm text-muted-foreground font-body"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {stat}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
