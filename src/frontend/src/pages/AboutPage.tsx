import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  Heart,
  Lightbulb,
  Linkedin,
  Palette,
  Rocket,
  Star,
  Target,
  Trophy,
  Twitter,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ────────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Aneeshwar R",
    role: "Creative Director & Founder",
    bio: "Visionary behind Elysian Labs. 5 years as a youth entrepreneur building creative platforms and designing for global brands. Obsessed with the intersection of strategy, aesthetics, and cinematic storytelling.",
    initials: "AR",
    gradient: "from-[oklch(0.38_0.15_270)] to-[oklch(0.28_0.12_270)]",
    glowColor: "oklch(0.38 0.15 270)",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Marcus Webb",
    role: "Lead Designer",
    bio: "Award-winning motion designer and video editor. Built his reel editing for Netflix originals and Spotify campaigns. Cuts to music, lives in silence.",
    initials: "MW",
    gradient: "from-[oklch(0.65_0.17_150)] to-[oklch(0.45_0.14_150)]",
    glowColor: "oklch(0.65 0.17 150)",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Priya Nair",
    role: "Video Specialist",
    bio: "Data-obsessed creative strategist with $50M+ in managed ad spend. Bridges the gap between beautiful design and bottom-line ROI.",
    initials: "PN",
    gradient: "from-[oklch(0.82_0.17_142)] to-[oklch(0.62_0.14_142)]",
    glowColor: "oklch(0.82 0.17 142)",
    twitter: "#",
    linkedin: "#",
  },
  {
    name: "Jordan Kim",
    role: "Brand Strategist",
    bio: "Crafts brand systems that scale from startup to enterprise. Featured in Communication Arts, Behance Curated, and Typewolf.",
    initials: "JK",
    gradient: "from-[oklch(0.72_0.15_50)] to-[oklch(0.52_0.12_50)]",
    glowColor: "oklch(0.72 0.15 50)",
    twitter: "#",
    linkedin: "#",
  },
];

const VALUES = [
  {
    icon: Trophy,
    title: "Excellence",
    description:
      "We hold every deliverable to the highest standard — no exceptions, no shortcuts.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly experiment with new tools and approaches to stay ahead of the curve.",
  },
  {
    icon: Palette,
    title: "Creativity",
    description:
      "We push boundaries, challenge conventions, and bring fresh thinking to every brief.",
  },
  {
    icon: Rocket,
    title: "Speed",
    description:
      "We move fast without sacrificing quality — agile workflows, rapid iterations.",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "Every pixel, every cut, every word is crafted with precision and purpose.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We genuinely love what we do, and that enthusiasm shows in everything we create.",
  },
];

const MILESTONES = [
  {
    year: "2021",
    label: "Founded",
    event:
      "Elysian Labs was born with a bold mission — make professional creative tools accessible to every creator.",
    side: "left",
  },
  {
    year: "2022",
    label: "First 100 Clients",
    event:
      "Reached our first 100 clients across SaaS, DTC, and entertainment — proof that great design drives real results.",
    side: "right",
  },
  {
    year: "2023",
    label: "500 Projects",
    event:
      "Crossed 500 completed projects milestone. Named Top 50 Creative Agencies by Clutch. Expanded to 20+ creatives globally.",
    side: "left",
  },
  {
    year: "2024",
    label: "Platform Launch",
    event:
      "Launched our AI-assisted creative platform with thumbnail, ad, and video editing tools — empowering creators at scale.",
    side: "right",
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
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
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-accent/40 text-accent font-body px-4 py-1"
            >
              About Elysian Labs
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Empowering Creators With{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #0047ab, #00ff00)",
              }}
            >
              Professional Tools
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We started Elysian Labs with one belief: every creator deserves
            access to studio-grade creative tools. We build the platform that
            makes professional thumbnails, ads, and videos possible for everyone
            — not just the few.
          </motion.p>
        </div>
      </section>

      {/* ── Mission / Vision ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Mission &amp; Vision
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Two pillars that shape every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <motion.div
              className="glass-effect glass-hover rounded-2xl p-8 flex flex-col gap-4"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-ocid="about-mission-card"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "oklch(0.38 0.15 270 / 0.15)",
                  border: "1px solid oklch(0.38 0.15 270 / 0.35)",
                }}
              >
                <Target
                  className="w-6 h-6"
                  style={{ color: "oklch(0.65 0.17 150)" }}
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Our Mission
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Create accessible, pro-level creative tools that empower every
                  creator — regardless of budget or technical background — to
                  produce work that rivals world-class studios. We democratize
                  creativity without compromising quality.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="glass-effect glass-hover rounded-2xl p-8 flex flex-col gap-4"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-ocid="about-vision-card"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "oklch(0.82 0.17 142 / 0.12)",
                  border: "1px solid oklch(0.82 0.17 142 / 0.3)",
                }}
              >
                <Eye
                  className="w-6 h-6"
                  style={{ color: "oklch(0.82 0.17 142)" }}
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Our Vision
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  A world where every creator's content stands out. We envision
                  a future where Elysian Labs is the creative backbone of the
                  internet — the platform that powers the thumbnails, ads, and
                  videos that define culture and drive commerce.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              A tight-knit crew of designers, editors, and strategists who live
              and breathe creative work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.map(
              (
                { name, role, bio, initials, glowColor, twitter, linkedin },
                i,
              ) => (
                <motion.div
                  key={name}
                  className="glass-effect glass-hover rounded-2xl p-6 flex flex-col gap-5"
                  style={{
                    border: `1px solid ${glowColor}30`,
                  }}
                  variants={fadeUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  data-ocid={`team-card-${name.toLowerCase().replace(/[\s.]/g, "-")}`}
                >
                  {/* Avatar + name row */}
                  <div className="flex items-center gap-4">
                    <div
                      className="relative p-[2px] rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${glowColor}, oklch(0.12 0 0))`,
                        boxShadow: `0 0 16px ${glowColor}40`,
                      }}
                    >
                      <Avatar className="w-14 h-14">
                        <AvatarFallback
                          className="font-display font-bold text-base"
                          style={{
                            background: `linear-gradient(135deg, ${glowColor}30, oklch(0.1 0 0))`,
                            color: glowColor,
                          }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-foreground leading-tight">
                        {name}
                      </h3>
                      <p
                        className="text-sm font-body mt-0.5"
                        style={{ color: glowColor }}
                      >
                        {role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1">
                    {bio}
                  </p>

                  {/* Social icons */}
                  <div className="flex gap-2">
                    <a
                      href={twitter}
                      aria-label={`${name} on Twitter`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:border-accent/40"
                      style={{
                        background: "oklch(0.15 0 0 / 0.6)",
                        border: "1px solid oklch(0.22 0 0)",
                      }}
                      data-ocid={`team-twitter-${name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <Twitter className="w-3.5 h-3.5 text-muted-foreground" />
                    </a>
                    <a
                      href={linkedin}
                      aria-label={`${name} on LinkedIn`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:border-primary/40"
                      style={{
                        background: "oklch(0.15 0 0 / 0.6)",
                        border: "1px solid oklch(0.22 0 0)",
                      }}
                      data-ocid={`team-linkedin-${name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
                    </a>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Company Values
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Six principles that guide every decision, every brief, every
              pixel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                className="glass-effect glass-hover rounded-xl p-6 flex flex-col gap-3 group"
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                data-ocid={`value-card-${title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-smooth group-hover:scale-110"
                  style={{
                    background: "oklch(0.38 0.15 270 / 0.15)",
                    border: "1px solid oklch(0.38 0.15 270 / 0.3)",
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.82 0.17 142)" }}
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Our Journey
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              From a bold idea to a global creative platform.
            </p>
          </motion.div>

          {/* Timeline container */}
          <div className="relative">
            {/* Center vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, oklch(0.38 0.15 270 / 0.6) 20%, oklch(0.38 0.15 270 / 0.6) 80%, transparent)",
              }}
            />

            <div className="flex flex-col gap-12">
              {MILESTONES.map(({ year, label, event, side }, i) => {
                const isLeft = side === "left";
                return (
                  <motion.div
                    key={year}
                    className="relative flex items-center gap-0 md:gap-6"
                    variants={isLeft ? fadeLeft : fadeRight}
                    custom={i * 0.1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    data-ocid={`timeline-${year}`}
                  >
                    {/* Left content (or spacer) */}
                    <div
                      className={`flex-1 ${isLeft ? "md:text-right md:pr-10" : "hidden md:block"}`}
                    >
                      {isLeft && (
                        <div className="glass-effect rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-2 md:justify-end">
                            <span
                              className="font-display font-bold text-sm px-2 py-0.5 rounded"
                              style={{
                                background: "oklch(0.38 0.15 270 / 0.2)",
                                color: "oklch(0.65 0.17 150)",
                                border: "1px solid oklch(0.38 0.15 270 / 0.4)",
                              }}
                            >
                              {year}
                            </span>
                            <span className="font-display font-semibold text-foreground text-sm">
                              {label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            {event}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="relative z-10 flex-shrink-0 hidden md:flex items-center justify-center">
                      <div
                        className="w-5 h-5 rounded-full border-2"
                        style={{
                          background: "oklch(0.08 0 0)",
                          borderColor: "oklch(0.38 0.15 270)",
                          boxShadow: "0 0 14px oklch(0.38 0.15 270 / 0.7)",
                        }}
                      />
                    </div>

                    {/* Right content (or spacer) */}
                    <div
                      className={`flex-1 ${!isLeft ? "md:pl-10" : "hidden md:block"}`}
                    >
                      {!isLeft && (
                        <div className="glass-effect rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="font-display font-bold text-sm px-2 py-0.5 rounded"
                              style={{
                                background: "oklch(0.38 0.15 270 / 0.2)",
                                color: "oklch(0.65 0.17 150)",
                                border: "1px solid oklch(0.38 0.15 270 / 0.4)",
                              }}
                            >
                              {year}
                            </span>
                            <span className="font-display font-semibold text-foreground text-sm">
                              {label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            {event}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mobile fallback — single column */}
                    <div className="flex-1 md:hidden">
                      <div className="flex items-start gap-4">
                        <div
                          className="mt-1 w-4 h-4 rounded-full flex-shrink-0 border-2"
                          style={{
                            background: "oklch(0.08 0 0)",
                            borderColor: "oklch(0.38 0.15 270)",
                            boxShadow: "0 0 10px oklch(0.38 0.15 270 / 0.6)",
                          }}
                        />
                        <div className="glass-effect rounded-xl p-4 flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className="font-display font-bold text-xs px-2 py-0.5 rounded"
                              style={{
                                background: "oklch(0.38 0.15 270 / 0.2)",
                                color: "oklch(0.65 0.17 150)",
                                border: "1px solid oklch(0.38 0.15 270 / 0.4)",
                              }}
                            >
                              {year}
                            </span>
                            <span className="font-display font-semibold text-foreground text-sm">
                              {label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            {event}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-muted/20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.38 0.15 270 / 0.1) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="container mx-auto text-center relative z-10 max-w-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Zap
            className="w-10 h-10 mx-auto mb-5"
            style={{ color: "oklch(0.82 0.17 142)" }}
          />
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Join Our Creative Community
          </h2>
          <p className="text-muted-foreground font-body mb-8 text-lg leading-relaxed">
            Whether you're a brand, a creator, or a collaborator — there's a
            place for you here. Let's make something extraordinary together.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contact">
              <Button
                size="lg"
                className="font-display gap-2 bg-primary hover:opacity-90 transition-smooth accent-glow-sm"
                data-ocid="about-cta-contact"
              >
                Get In Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="font-display border-border hover:border-accent/40 hover:text-accent transition-smooth"
                data-ocid="about-cta-services"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
