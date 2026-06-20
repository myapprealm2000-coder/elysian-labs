import { r as reactExports, j as jsxRuntimeExports, s as shimExports, L as Link } from "./vendor-80nuMd8G.js";
import { P as Primitive, u as useCallbackRef, a as useLayoutEffect2 } from "./index-_B4ftgzD.js";
import { c as cn, B as Button } from "./button-Dx5YDvtJ.js";
import { B as Badge } from "./badge-W0ZOSlWS.js";
import { m as motion } from "./motion-DXodcWnX.js";
import { av as Target, af as Eye, aw as Twitter, ax as Linkedin, ay as Trophy, az as Lightbulb, aq as Palette, aA as Rocket, $ as Star, aB as Heart, Z as Zap, ao as ArrowRight } from "./ui-lib-DG52wkUx.js";
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
const TEAM = [
  {
    name: "Aneeshwar R",
    role: "Creative Director & Founder",
    bio: "Visionary behind Elysian Labs. 5 years as a youth entrepreneur building creative platforms and designing for global brands. Obsessed with the intersection of strategy, aesthetics, and cinematic storytelling.",
    initials: "AR",
    gradient: "from-[oklch(0.38_0.15_270)] to-[oklch(0.28_0.12_270)]",
    glowColor: "oklch(0.38 0.15 270)",
    twitter: "#",
    linkedin: "#"
  },
  {
    name: "Marcus Webb",
    role: "Lead Designer",
    bio: "Award-winning motion designer and video editor. Built his reel editing for Netflix originals and Spotify campaigns. Cuts to music, lives in silence.",
    initials: "MW",
    gradient: "from-[oklch(0.65_0.17_150)] to-[oklch(0.45_0.14_150)]",
    glowColor: "oklch(0.65 0.17 150)",
    twitter: "#",
    linkedin: "#"
  },
  {
    name: "Priya Nair",
    role: "Video Specialist",
    bio: "Data-obsessed creative strategist with $50M+ in managed ad spend. Bridges the gap between beautiful design and bottom-line ROI.",
    initials: "PN",
    gradient: "from-[oklch(0.82_0.17_142)] to-[oklch(0.62_0.14_142)]",
    glowColor: "oklch(0.82 0.17 142)",
    twitter: "#",
    linkedin: "#"
  },
  {
    name: "Jordan Kim",
    role: "Brand Strategist",
    bio: "Crafts brand systems that scale from startup to enterprise. Featured in Communication Arts, Behance Curated, and Typewolf.",
    initials: "JK",
    gradient: "from-[oklch(0.72_0.15_50)] to-[oklch(0.52_0.12_50)]",
    glowColor: "oklch(0.72 0.15 50)",
    twitter: "#",
    linkedin: "#"
  }
];
const VALUES = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "We hold every deliverable to the highest standard — no exceptions, no shortcuts."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly experiment with new tools and approaches to stay ahead of the curve."
  },
  {
    icon: Palette,
    title: "Creativity",
    description: "We push boundaries, challenge conventions, and bring fresh thinking to every brief."
  },
  {
    icon: Rocket,
    title: "Speed",
    description: "We move fast without sacrificing quality — agile workflows, rapid iterations."
  },
  {
    icon: Star,
    title: "Quality",
    description: "Every pixel, every cut, every word is crafted with precision and purpose."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We genuinely love what we do, and that enthusiasm shows in everything we create."
  }
];
const MILESTONES = [
  {
    year: "2021",
    label: "Founded",
    event: "Elysian Labs was born with a bold mission — make professional creative tools accessible to every creator.",
    side: "left"
  },
  {
    year: "2022",
    label: "First 100 Clients",
    event: "Reached our first 100 clients across SaaS, DTC, and entertainment — proof that great design drives real results.",
    side: "right"
  },
  {
    year: "2023",
    label: "500 Projects",
    event: "Crossed 500 completed projects milestone. Named Top 50 Creative Agencies by Clutch. Expanded to 20+ creatives globally.",
    side: "left"
  },
  {
    year: "2024",
    label: "Platform Launch",
    event: "Launched our AI-assisted creative platform with thumbnail, ad, and video editing tools — empowering creators at scale.",
    side: "right"
  }
];
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" }
  })
};
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" }
  })
};
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" }
  })
};
function AboutPage() {
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
                    className: "mb-5 border-accent/40 text-accent font-body px-4 py-1",
                    children: "About Elysian Labs"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                className: "font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 leading-tight",
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                children: [
                  "Empowering Creators With",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-transparent bg-clip-text",
                      style: {
                        backgroundImage: "linear-gradient(90deg, #0047ab, #00ff00)"
                      },
                      children: "Professional Tools"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                children: "We started Elysian Labs with one belief: every creator deserves access to studio-grade creative tools. We build the platform that makes professional thumbnails, ads, and videos possible for everyone — not just the few."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-14",
          variants: fadeUp,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Mission & Vision" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto", children: "Two pillars that shape every decision we make." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "glass-effect glass-hover rounded-2xl p-8 flex flex-col gap-4",
            variants: fadeLeft,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            "data-ocid": "about-mission-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-xl flex items-center justify-center",
                  style: {
                    background: "oklch(0.38 0.15 270 / 0.15)",
                    border: "1px solid oklch(0.38 0.15 270 / 0.35)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Target,
                    {
                      className: "w-6 h-6",
                      style: { color: "oklch(0.65 0.17 150)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Our Mission" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body leading-relaxed", children: "Create accessible, pro-level creative tools that empower every creator — regardless of budget or technical background — to produce work that rivals world-class studios. We democratize creativity without compromising quality." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "glass-effect glass-hover rounded-2xl p-8 flex flex-col gap-4",
            variants: fadeRight,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            "data-ocid": "about-vision-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-xl flex items-center justify-center",
                  style: {
                    background: "oklch(0.82 0.17 142 / 0.12)",
                    border: "1px solid oklch(0.82 0.17 142 / 0.3)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Eye,
                    {
                      className: "w-6 h-6",
                      style: { color: "oklch(0.82 0.17 142)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Our Vision" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body leading-relaxed", children: "A world where every creator's content stands out. We envision a future where Elysian Labs is the creative backbone of the internet — the platform that powers the thumbnails, ads, and videos that define culture and drive commerce." })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-14",
          variants: fadeUp,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Meet Our Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto", children: "A tight-knit crew of designers, editors, and strategists who live and breathe creative work." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: TEAM.map(
        ({ name, role, bio, initials, glowColor, twitter, linkedin }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "glass-effect glass-hover rounded-2xl p-6 flex flex-col gap-5",
            style: {
              border: `1px solid ${glowColor}30`
            },
            variants: fadeUp,
            custom: i * 0.1,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            "data-ocid": `team-card-${name.toLowerCase().replace(/[\s.]/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "relative p-[2px] rounded-full",
                    style: {
                      background: `linear-gradient(135deg, ${glowColor}, oklch(0.12 0 0))`,
                      boxShadow: `0 0 16px ${glowColor}40`
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-14 h-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AvatarFallback,
                      {
                        className: "font-display font-bold text-base",
                        style: {
                          background: `linear-gradient(135deg, ${glowColor}30, oklch(0.1 0 0))`,
                          color: glowColor
                        },
                        children: initials
                      }
                    ) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-tight", children: name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-body mt-0.5",
                      style: { color: glowColor },
                      children: role
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed flex-1", children: bio }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: twitter,
                    "aria-label": `${name} on Twitter`,
                    className: "w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:border-accent/40",
                    style: {
                      background: "oklch(0.15 0 0 / 0.6)",
                      border: "1px solid oklch(0.22 0 0)"
                    },
                    "data-ocid": `team-twitter-${name.toLowerCase().replace(/\s/g, "-")}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-3.5 h-3.5 text-muted-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: linkedin,
                    "aria-label": `${name} on LinkedIn`,
                    className: "w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:border-primary/40",
                    style: {
                      background: "oklch(0.15 0 0 / 0.6)",
                      border: "1px solid oklch(0.22 0 0)"
                    },
                    "data-ocid": `team-linkedin-${name.toLowerCase().replace(/\s/g, "-")}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-3.5 h-3.5 text-muted-foreground" })
                  }
                )
              ] })
            ]
          },
          name
        )
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-14",
          variants: fadeUp,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Company Values" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto", children: "Six principles that guide every decision, every brief, every pixel." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: VALUES.map(({ icon: Icon, title, description }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "glass-effect glass-hover rounded-xl p-6 flex flex-col gap-3 group",
          variants: fadeUp,
          custom: i * 0.08,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          "data-ocid": `value-card-${title.toLowerCase().replace(/\s/g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-lg flex items-center justify-center transition-smooth group-hover:scale-110",
                style: {
                  background: "oklch(0.38 0.15 270 / 0.15)",
                  border: "1px solid oklch(0.38 0.15 270 / 0.3)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: "w-5 h-5",
                    style: { color: "oklch(0.82 0.17 142)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: description })
          ]
        },
        title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-16",
          variants: fadeUp,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Our Journey" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto", children: "From a bold idea to a global creative platform." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block",
            style: {
              background: "linear-gradient(to bottom, transparent, oklch(0.38 0.15 270 / 0.6) 20%, oklch(0.38 0.15 270 / 0.6) 80%, transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-12", children: MILESTONES.map(({ year, label, event, side }, i) => {
          const isLeft = side === "left";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative flex items-center gap-0 md:gap-6",
              variants: isLeft ? fadeLeft : fadeRight,
              custom: i * 0.1,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              "data-ocid": `timeline-${year}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex-1 ${isLeft ? "md:text-right md:pr-10" : "hidden md:block"}`,
                    children: isLeft && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-effect rounded-xl p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 md:justify-end", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-sm px-2 py-0.5 rounded",
                            style: {
                              background: "oklch(0.38 0.15 270 / 0.2)",
                              color: "oklch(0.65 0.17 150)",
                              border: "1px solid oklch(0.38 0.15 270 / 0.4)"
                            },
                            children: year
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: label })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: event })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-shrink-0 hidden md:flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-5 h-5 rounded-full border-2",
                    style: {
                      background: "oklch(0.08 0 0)",
                      borderColor: "oklch(0.38 0.15 270)",
                      boxShadow: "0 0 14px oklch(0.38 0.15 270 / 0.7)"
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `flex-1 ${!isLeft ? "md:pl-10" : "hidden md:block"}`,
                    children: !isLeft && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-effect rounded-xl p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-sm px-2 py-0.5 rounded",
                            style: {
                              background: "oklch(0.38 0.15 270 / 0.2)",
                              color: "oklch(0.65 0.17 150)",
                              border: "1px solid oklch(0.38 0.15 270 / 0.4)"
                            },
                            children: year
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: label })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: event })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mt-1 w-4 h-4 rounded-full flex-shrink-0 border-2",
                      style: {
                        background: "oklch(0.08 0 0)",
                        borderColor: "oklch(0.38 0.15 270)",
                        boxShadow: "0 0 10px oklch(0.38 0.15 270 / 0.6)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-effect rounded-xl p-4 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-bold text-xs px-2 py-0.5 rounded",
                          style: {
                            background: "oklch(0.38 0.15 270 / 0.2)",
                            color: "oklch(0.65 0.17 150)",
                            border: "1px solid oklch(0.38 0.15 270 / 0.4)"
                          },
                          children: year
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: label })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: event })
                  ] })
                ] }) })
              ]
            },
            year
          );
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 px-6 bg-muted/20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.38 0.15 270 / 0.1) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "container mx-auto text-center relative z-10 max-w-2xl",
          variants: fadeUp,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Zap,
              {
                className: "w-10 h-10 mx-auto mb-5",
                style: { color: "oklch(0.82 0.17 142)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Join Our Creative Community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8 text-lg leading-relaxed", children: "Whether you're a brand, a creator, or a collaborator — there's a place for you here. Let's make something extraordinary together." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "font-display gap-2 bg-primary hover:opacity-90 transition-smooth accent-glow-sm",
                  "data-ocid": "about-cta-contact",
                  children: [
                    "Get In Touch ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "font-display border-border hover:border-accent/40 hover:text-accent transition-smooth",
                  "data-ocid": "about-cta-services",
                  children: "Explore Services"
                }
              ) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  AboutPage
};
