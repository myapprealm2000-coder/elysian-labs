import { j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { B as Badge } from "./badge-W0ZOSlWS.js";
import { B as Button } from "./button-Dx5YDvtJ.js";
import { m as motion } from "./motion-DXodcWnX.js";
import { S as Sparkles, ao as ArrowRight, I as Image, ap as Megaphone, V as Video, aq as Palette, L as Layers, Z as Zap, h as CircleCheck } from "./ui-lib-DG52wkUx.js";
const SERVICES = [
  {
    icon: Image,
    title: "Thumbnail Design",
    badge: "Popular",
    badgeVariant: "accent",
    description: "Click-optimized thumbnails that stop the scroll. Craft visuals that drive 3× more clicks using proven psychological triggers and bold typography.",
    features: [
      "Smart composition templates",
      "Face & text auto-placement",
      "A/B test variants instantly",
      "Platform-specific sizing"
    ]
  },
  {
    icon: Megaphone,
    title: "Ad Creative",
    badge: "High ROI",
    badgeVariant: "emerald",
    description: "Performance-first ad creatives built for conversion. From static banners to animated display ads — every pixel engineered to outperform.",
    features: [
      "Direct-response copywriting",
      "Dynamic product integration",
      "Multi-format export (Meta, Google, TikTok)",
      "Brand consistency guardrails"
    ]
  },
  {
    icon: Video,
    title: "Video Editing",
    badge: "Pro",
    badgeVariant: "primary",
    description: "Professional-grade video editing with timeline precision. Trim, color grade, add motion graphics, and export in broadcast-quality formats.",
    features: [
      "Multi-track timeline editor",
      "Advanced color grading suite",
      "Motion graphics library",
      "4K export support"
    ]
  },
  {
    icon: Palette,
    title: "Brand Identity",
    badge: "New",
    badgeVariant: "accent",
    description: "Cohesive brand systems that scale. We build visual identities that look as premium on a billboard as they do in a story.",
    features: [
      "Logo & mark design",
      "Color palette generation",
      "Typography system",
      "Brand style guide PDF"
    ]
  },
  {
    icon: Layers,
    title: "Social Media Kits",
    badge: "Bundle",
    badgeVariant: "emerald",
    description: "Complete social media asset packages ready to post. Stories, reels covers, highlight icons, banners — every format, every platform.",
    features: [
      "Instagram & TikTok assets",
      "YouTube channel art",
      "Twitter/X header & avatar",
      "Resizable master templates"
    ]
  },
  {
    icon: Zap,
    title: "Motion Graphics",
    badge: "Cinematic",
    badgeVariant: "primary",
    description: "Animated graphics and transitions that elevate your content. Intros, outros, lower thirds, and custom motion sequences.",
    features: [
      "Custom intro/outro sequences",
      "Animated lower thirds",
      "Kinetic typography",
      "Loop-ready social animations"
    ]
  }
];
const PROCESS = [
  {
    step: "01",
    label: "Brief",
    title: "Discovery Brief",
    desc: "We audit your brand, audience, and goals to understand what success looks like for your campaign.",
    color: "primary"
  },
  {
    step: "02",
    label: "Design",
    title: "Creative Design",
    desc: "Our team crafts pixel-perfect assets aligned to your KPIs, brand voice, and target platform.",
    color: "accent"
  },
  {
    step: "03",
    label: "Review",
    title: "Revision Rounds",
    desc: "Collaborative feedback loops ensure every asset hits the mark before it goes live.",
    color: "emerald"
  },
  {
    step: "04",
    label: "Deliver",
    title: "Launch-Ready",
    desc: "Final assets delivered in all required formats, ready to launch and iterate on performance.",
    color: "primary"
  }
];
function ServiceBadge({
  label,
  variant
}) {
  const styles = {
    accent: "bg-accent/15 text-accent border border-accent/30",
    emerald: "bg-[oklch(0.65_0.17_150/0.15)] text-[oklch(0.65_0.17_150)] border border-[oklch(0.65_0.17_150/0.3)]",
    primary: "bg-primary/15 text-primary border border-primary/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-xs font-display font-semibold px-2.5 py-1 rounded-full ${styles[variant]}`,
      children: label
    }
  );
}
function BackgroundOrbs() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl",
        style: { background: "oklch(0.38 0.15 270)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl",
        style: { background: "oklch(0.82 0.17 142)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute -bottom-20 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl",
        style: { background: "oklch(0.65 0.17 150)" }
      }
    )
  ] });
}
function ServicesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundOrbs, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none opacity-[0.03]",
              style: {
                backgroundImage: "linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)",
                backgroundSize: "48px 48px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto text-center relative z-10 max-w-4xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-5 border-accent/40 text-accent font-body px-4 py-1.5 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 mr-2 inline" }),
                      "What We Do"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                className: "font-display font-bold text-5xl md:text-7xl tracking-tight text-foreground mb-6 leading-[1.08]",
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.1 },
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
                      children: "Services"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed mb-10",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
                children: "From thumbnail design to full campaign production — every service at Elysian Labs is engineered for measurable impact and stunning visual results."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex items-center justify-center gap-4 flex-wrap",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.45, delay: 0.3 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "font-display gap-2 bg-primary hover:opacity-90 transition-smooth accent-glow-sm text-primary-foreground",
                      "data-ocid": "services-hero-cta",
                      children: [
                        "Get a Free Audit ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/projects", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "font-display border-border hover:border-accent/50 hover:text-accent transition-smooth",
                      "data-ocid": "services-see-work",
                      children: "See Our Work"
                    }
                  ) })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6 bg-muted/10 section-divider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-16",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-display font-semibold text-sm uppercase tracking-widest mb-3", children: "What We Offer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-5xl text-foreground mb-4", children: "Creative Services That Convert" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto text-lg", children: "Six specialized disciplines working in perfect harmony to elevate your brand presence across every platform." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: SERVICES.map(
        ({
          icon: Icon,
          title,
          badge,
          badgeVariant,
          description,
          features
        }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.08 },
            whileHover: { scale: 1.02, y: -4 },
            className: "glass-effect glass-hover rounded-2xl p-7 flex flex-col gap-5 cursor-pointer group",
            "data-ocid": `service-card-${title.toLowerCase().replace(/\s+/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center bg-primary/15 border border-primary/30 group-hover:border-accent/40 group-hover:bg-accent/10 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary group-hover:text-accent transition-smooth" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceBadge, { label: badge, variant: badgeVariant })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-2.5", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2 pt-4 border-t border-border", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2 text-sm font-body text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                    f
                  ]
                },
                f
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full font-display border-border hover:border-accent/50 hover:text-accent transition-smooth mt-1 group-hover:border-accent/40",
                  "data-ocid": `service-cta-${title.toLowerCase().replace(/\s+/g, "-")}`,
                  children: [
                    "Learn More ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-2" })
                  ]
                }
              )
            ]
          },
          title
        )
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 px-6 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none opacity-[0.025]",
          style: {
            backgroundImage: "radial-gradient(circle, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-16",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-display font-semibold text-sm uppercase tracking-widest mb-3", children: "How It Works" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-5xl text-foreground mb-4", children: "From Brief to Launch" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto text-lg", children: "A streamlined 4-step process that gets you from idea to campaign-ready assets with zero guesswork." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: PROCESS.map(({ step, label, title, desc }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.1 },
              className: "relative flex flex-col gap-4 p-6 rounded-2xl glass-effect glass-hover",
              "data-ocid": `process-step-${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-12 h-12 mx-auto lg:mx-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-full flex items-center justify-center border-2 border-primary/60 bg-primary/15 font-display font-bold text-lg",
                      style: { color: "oklch(0.6 0.18 270)" },
                      children: i + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-full blur-md opacity-40",
                      style: { background: "oklch(0.38 0.15 270 / 0.5)" }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-bold uppercase tracking-widest text-accent", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-1.5", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: desc })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute bottom-4 right-5 font-display font-black text-6xl select-none pointer-events-none",
                    style: { color: "oklch(0.38 0.15 270 / 0.08)" },
                    children: step
                  }
                )
              ]
            },
            step
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-28 px-6 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: "radial-gradient(ellipse 100% 80% at 50% 50%, oklch(0.38 0.15 270 / 0.18) 0%, oklch(0.65 0.17 150 / 0.08) 50%, transparent 80%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none opacity-[0.03]",
          style: {
            backgroundImage: "linear-gradient(oklch(0.98 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-3xl text-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "mb-5 border-accent/40 text-accent font-body px-4 py-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 mr-2 inline" }),
                  "Let's Build Together"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-4xl md:text-6xl text-foreground mb-6 leading-[1.1]", children: [
              "Ready to Start",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-transparent bg-clip-text",
                  style: {
                    backgroundImage: "linear-gradient(135deg, oklch(0.82 0.17 142) 0%, oklch(0.65 0.17 150) 100%)"
                  },
                  children: "Your Project?"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground font-body mb-10 max-w-xl mx-auto leading-relaxed", children: "Book a free 30-minute strategy call and we'll map out exactly what your brand needs to stand out and convert." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "font-display gap-2 bg-primary hover:opacity-90 transition-smooth accent-glow text-primary-foreground px-8 py-6 text-base",
                  "data-ocid": "services-bottom-cta",
                  children: [
                    "Start a Project ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "font-display border-border hover:border-accent/50 hover:text-accent transition-smooth px-8 py-6 text-base",
                  "data-ocid": "services-learn-more",
                  children: "Meet the Team"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-8 mt-12 flex-wrap", children: [
              "500+ Projects Delivered",
              "48h Average Turnaround",
              "98% Client Retention"
            ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-sm text-muted-foreground font-body",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent" }),
                  stat
                ]
              },
              stat
            )) })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  ServicesPage
};
