import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { B as Badge } from "./badge-W0ZOSlWS.js";
import { B as Button } from "./button-Dx5YDvtJ.js";
import { m as motion, A as AnimatePresence } from "./motion-DXodcWnX.js";
import { ar as TrendingUp, as as Users, $ as Star, at as Award, ao as ArrowRight, au as ExternalLink } from "./ui-lib-DG52wkUx.js";
const CATEGORIES = [
  "All",
  "Thumbnails",
  "Ad Campaigns",
  "Video Edits",
  "Brand Identity"
];
const PROJECTS = [
  {
    id: 1,
    title: "Elysian Labs Brand Refresh",
    category: "Brand Identity",
    client: "Elysian Labs",
    result: "Launch coverage in 12 design publications",
    description: "Complete identity overhaul for our own creative studio — geometric logo system, custom type hierarchy, OKLCH-based dark palette, and a 60-page brand book used across all touchpoints from pitch decks to product UI.",
    extraDetail: "This flagship project became our most-referenced portfolio piece, directly resulting in 3 enterprise inquiries within the first month of reveal.",
    featured: true,
    gradient: "linear-gradient(135deg, oklch(0.28 0.18 270) 0%, oklch(0.15 0.10 270) 60%, oklch(0.10 0.05 142) 100%)",
    accentGradient: "oklch(0.82 0.29 142)",
    icon: "✦"
  },
  {
    id: 2,
    title: "NovaTech Product Launch",
    category: "Ad Campaigns",
    client: "NovaTech Inc.",
    result: "+340% CTR vs. baseline",
    description: "Full-funnel ad creative suite for a SaaS product launch — 48 assets across Meta, Google, and LinkedIn delivered in 5 days with motion variants and A/B copy splits.",
    gradient: "linear-gradient(135deg, oklch(0.22 0.12 270) 0%, oklch(0.32 0.18 285) 100%)",
    accentGradient: "oklch(0.38 0.15 270)",
    icon: "⬡"
  },
  {
    id: 3,
    title: "PulseFit Thumbnail System",
    category: "Thumbnails",
    client: "PulseFit YouTube",
    result: "2.8× avg. view rate increase",
    description: "Complete thumbnail system for a 1.2M subscriber fitness channel. 60 custom thumbnails with A/B variants over 90 days, resulting in channel-wide engagement lift.",
    gradient: "linear-gradient(135deg, oklch(0.22 0.13 150) 0%, oklch(0.32 0.17 160) 100%)",
    accentGradient: "oklch(0.65 0.17 150)",
    icon: "▲"
  },
  {
    id: 4,
    title: "Arcane Studios Showreel",
    category: "Video Edits",
    client: "Arcane Studios",
    result: "Screened at 3 film festivals",
    description: "Cinematic showreel edit and color grade for an indie VFX studio. 4-minute piece assembled from 12 hours of raw footage with custom motion graphics and sound design.",
    gradient: "linear-gradient(135deg, oklch(0.28 0.12 50) 0%, oklch(0.38 0.14 60) 100%)",
    accentGradient: "oklch(0.55 0.16 50)",
    icon: "◈"
  },
  {
    id: 5,
    title: "Drift Collective Identity",
    category: "Brand Identity",
    client: "Drift Collective",
    result: "Featured in Brand New Awards 2024",
    description: "End-to-end brand identity for a streetwear collective — logo, type system, color palette, packaging mockups, and a 40-page brand bible.",
    gradient: "linear-gradient(135deg, oklch(0.18 0.08 270) 0%, oklch(0.28 0.15 250) 100%)",
    accentGradient: "oklch(0.48 0.18 255)",
    icon: "◆"
  },
  {
    id: 6,
    title: "Meridian Finance Ads",
    category: "Ad Campaigns",
    client: "Meridian Finance",
    result: "42% lower cost-per-lead",
    description: "Performance creatives for a fintech app's paid acquisition — motion ads and static variants for iOS/Android App Store optimized with iterative creative testing.",
    gradient: "linear-gradient(135deg, oklch(0.20 0.12 200) 0%, oklch(0.30 0.15 215) 100%)",
    accentGradient: "oklch(0.50 0.17 205)",
    icon: "◎"
  },
  {
    id: 7,
    title: "CosmicEats Food Docs",
    category: "Video Edits",
    client: "CosmicEats",
    result: "1.4M organic views in 30 days",
    description: "Series of 8 short-form food documentary edits optimized for TikTok and Instagram Reels. Hook-first storytelling with bespoke motion typography that doubled save rate.",
    gradient: "linear-gradient(135deg, oklch(0.28 0.14 30) 0%, oklch(0.20 0.10 50) 100%)",
    accentGradient: "oklch(0.58 0.18 35)",
    icon: "●"
  },
  {
    id: 8,
    title: "Apex Gaming Thumbnails",
    category: "Thumbnails",
    client: "Apex Gaming",
    result: "CTR up from 4.1% to 11.3%",
    description: "Monthly thumbnail retainer for a top-100 gaming creator. Custom asset library, brand-consistent style guide, and weekly delivery SLA.",
    gradient: "linear-gradient(135deg, oklch(0.20 0.15 290) 0%, oklch(0.30 0.18 300) 100%)",
    accentGradient: "oklch(0.55 0.22 290)",
    icon: "⬟"
  },
  {
    id: 9,
    title: "Luminary SaaS Rebrand",
    category: "Brand Identity",
    client: "Luminary SaaS",
    result: "Enterprise pilot deals closed post-rebrand",
    description: "Investor-facing brand refresh for a B2B SaaS — clean geometric mark, product UI tokens, pitch deck template, and full digital brand guidelines delivered ahead of Series A.",
    gradient: "linear-gradient(135deg, oklch(0.18 0.08 160) 0%, oklch(0.28 0.14 155) 100%)",
    accentGradient: "oklch(0.50 0.18 155)",
    icon: "◇"
  }
];
const STATS = [
  { value: "500+", label: "Projects Delivered", icon: TrendingUp },
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "3+", label: "Years Experience", icon: Star },
  { value: "100%", label: "Satisfaction", icon: Award }
];
const categoryMap = {
  All: null,
  Thumbnails: "Thumbnails",
  "Ad Campaigns": "Ad Campaigns",
  "Video Edits": "Video Edits",
  "Brand Identity": "Brand Identity"
};
function ProjectsPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === categoryMap[activeCategory]);
  const featured = PROJECTS.find((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);
  const showFeatured = activeCategory === "All" && featured;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-28 px-6 overflow-hidden",
        style: {
          background: "linear-gradient(145deg, #0d1118 0%, #0a0f1a 50%, #0a1f15 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(0,255,0,0.07) 0%, transparent 65%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                backgroundImage: "linear-gradient(rgba(0,255,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.025) 1px, transparent 1px)",
                backgroundSize: "48px 48px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto text-center relative z-10 max-w-4xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-5 border-accent/40 text-accent font-body px-4 py-1.5 text-xs tracking-widest uppercase",
                    children: "Our Portfolio"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                className: "font-display font-bold text-5xl md:text-7xl tracking-tight text-foreground mb-6 leading-tight",
                children: [
                  "Our",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-transparent bg-clip-text",
                      style: {
                        backgroundImage: "linear-gradient(90deg, #0047ab, #00ff00)"
                      },
                      children: "Projects"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed",
                children: "From viral thumbnails to full brand identities — a curated look at the work that defines Elysian Labs."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-6 border-y border-border/60 bg-card/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8", children: STATS.map(({ value, label, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.1 },
        className: "text-center group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-lg flex items-center justify-center",
              style: {
                background: "oklch(0.38 0.15 270 / 0.15)",
                border: "1px solid oklch(0.38 0.15 270 / 0.25)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: "w-4 h-4",
                  style: { color: "oklch(0.82 0.17 142)" }
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "font-display font-bold text-4xl mb-1 text-transparent bg-clip-text",
              style: {
                backgroundImage: "linear-gradient(135deg, oklch(0.82 0.17 142) 0%, oklch(0.38 0.15 270) 100%)"
              },
              children: value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-body", children: label })
        ]
      },
      label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "fieldset",
        {
          className: "flex items-center gap-2 flex-wrap mb-14 justify-center border-0 p-0 m-0",
          "aria-label": "Filter projects by category",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter projects by category" }),
            CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  onClick: () => setActiveCategory(cat),
                  whileTap: { scale: 0.95 },
                  className: `relative px-5 py-2 rounded-full text-sm font-body font-medium transition-smooth border overflow-hidden ${isActive ? "border-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"}`,
                  style: isActive ? {
                    background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.32 0.18 280) 100%)",
                    boxShadow: "0 0 16px oklch(0.38 0.15 270 / 0.35)"
                  } : {},
                  "data-ocid": `projects-filter-${cat.toLowerCase().replace(/[\s]/g, "-")}`,
                  children: cat
                },
                cat
              );
            })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: showFeatured && featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.5 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedCard, { project: featured })
        },
        "featured"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: regular.map((project, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, scale: 0.95 },
              transition: { duration: 0.45, delay: i * 0.08 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project })
            },
            project.id
          )) })
        },
        activeCategory
      ),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground font-body", children: "No projects in this category yet." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 px-6 relative overflow-hidden bg-card/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.38 0.15 270 / 0.10) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto text-center relative z-10 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-5 border-accent/40 text-accent font-body px-4 py-1.5 text-xs tracking-widest uppercase",
                children: "Next Steps"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-5xl text-foreground mb-5 leading-tight", children: "Have a Project in Mind?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-10 text-lg leading-relaxed", children: "Let's talk about your brand, your goals, and how Elysian Labs can craft visuals that convert." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "font-display gap-2 w-full sm:w-auto",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.32 0.18 285) 100%)",
                    boxShadow: "0 0 24px oklch(0.38 0.15 270 / 0.4)"
                  },
                  "data-ocid": "projects-cta-contact",
                  children: [
                    "Start a Project ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "font-display gap-2 w-full sm:w-auto border-border hover:border-accent/40",
                  "data-ocid": "projects-cta-services",
                  children: "View Services"
                }
              ) })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
function FeaturedCard({ project }) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-2xl overflow-hidden cursor-pointer group",
      style: {
        border: `1px solid ${hovered ? "oklch(0.82 0.29 142 / 0.45)" : "oklch(0.22 0 0 / 0.6)"}`,
        boxShadow: hovered ? "0 0 40px oklch(0.82 0.29 142 / 0.3), 0 20px 60px oklch(0 0 0 / 0.5)" : "0 8px 32px oklch(0 0 0 / 0.4)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)"
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      "data-ocid": "project-featured",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-48 md:h-64 flex items-center justify-center overflow-hidden",
            style: { background: project.gradient },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    backgroundImage: "linear-gradient(oklch(1 0 0 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.03) 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "relative z-10 text-6xl select-none",
                  style: {
                    textShadow: `0 0 40px ${project.accentGradient}`,
                    color: project.accentGradient,
                    transform: hovered ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)"
                  },
                  children: project.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-display font-semibold tracking-wide",
                  style: {
                    background: "oklch(0.82 0.29 142 / 0.15)",
                    border: "1px solid oklch(0.82 0.29 142 / 0.4)",
                    color: "oklch(0.82 0.29 142)"
                  },
                  children: "✦ Featured Project"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex flex-col items-center justify-center px-8 text-center",
                  style: {
                    background: "oklch(0.08 0 0 / 0.75)",
                    backdropFilter: "blur(4px)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s ease"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground/90 max-w-xl leading-relaxed", children: project.extraDetail })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "absolute top-4 right-4 w-4 h-4 text-foreground/40 group-hover:text-foreground transition-smooth" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-6 md:p-8 grid md:grid-cols-2 gap-6",
            style: { background: "oklch(0.11 0 0 / 0.9)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs border-accent/30 text-accent",
                      children: project.category
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: project.client })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl md:text-3xl text-foreground leading-tight mb-3", children: project.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: project.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "p-4 rounded-xl",
                    style: {
                      background: "oklch(0.65 0.17 150 / 0.08)",
                      border: "1px solid oklch(0.65 0.17 150 / 0.2)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-body text-muted-foreground mb-1 uppercase tracking-wider", children: "Outcome" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-display font-semibold text-lg",
                          style: { color: "oklch(0.65 0.17 150)" },
                          children: project.result
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full mt-4 font-display gap-2 transition-smooth",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.32 0.18 285) 100%)"
                    },
                    "data-ocid": "featured-project-cta",
                    children: [
                      "View Case Study ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                ) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ProjectCard({ project }) {
  const [hovered, setHovered] = reactExports.useState(false);
  const isShort = project.description.length < 130;
  const isTall = project.description.length > 200;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-xl overflow-hidden flex flex-col group cursor-pointer",
      style: {
        border: `1px solid ${hovered ? "oklch(0.82 0.29 142 / 0.4)" : "oklch(0.22 0 0 / 0.5)"}`,
        background: "oklch(0.12 0 0 / 0.85)",
        boxShadow: hovered ? "0 0 28px oklch(0.82 0.29 142 / 0.25), 0 12px 40px oklch(0 0 0 / 0.5)" : "0 4px 20px oklch(0 0 0 / 0.3)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        backdropFilter: "blur(12px)",
        minHeight: isShort ? 320 : isTall ? 420 : 370
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      "data-ocid": `project-card-${project.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex items-center justify-center overflow-hidden flex-shrink-0",
            style: {
              height: isShort ? 130 : isTall ? 160 : 145,
              background: project.gradient
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    backgroundImage: "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "relative z-10 text-4xl select-none",
                  style: {
                    color: project.accentGradient,
                    textShadow: `0 0 30px ${project.accentGradient}`,
                    transform: hovered ? "scale(1.15) rotate(5deg)" : "scale(1) rotate(0deg)",
                    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)"
                  },
                  children: project.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "absolute top-3 right-3 w-3.5 h-3.5 text-foreground/30 group-hover:text-foreground/70 transition-smooth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center px-6 text-center",
                  style: {
                    background: "oklch(0.06 0 0 / 0.80)",
                    backdropFilter: "blur(6px)",
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.3s ease"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-display font-semibold uppercase tracking-widest",
                      style: { color: project.accentGradient },
                      children: project.client
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-tight text-base", children: project.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-accent/25 text-accent whitespace-nowrap flex-shrink-0",
                children: project.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed flex-1", children: project.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 border-t border-border/60 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-display font-semibold",
                style: { color: "oklch(0.65 0.17 150)" },
                children: project.result
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "text-xs font-body text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth",
                "data-ocid": `project-case-study-${project.id}`,
                children: [
                  "Case Study ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProjectsPage
};
