import { R as React, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { B as Badge } from "./badge-W0ZOSlWS.js";
import { B as Button } from "./button-Dx5YDvtJ.js";
import { S as Skeleton } from "./skeleton-DBZTzHkA.js";
import { u as useCourses } from "./useCourses-CW0Ulned.js";
import { m as motion } from "./motion-DXodcWnX.js";
import { S as Sparkles, aI as BookOpen, aJ as Play, as as Users, x as Clock } from "./ui-lib-DG52wkUx.js";
import "./backend-CD8jDaiY.js";
import "./index-De5ctwPQ.js";
function getCourseCategory(course) {
  const text = `${course.title} ${course.description}`.toLowerCase();
  if (text.includes("thumbnail") || text.includes("design")) {
    return {
      label: "Thumbnail Design",
      color: "#50c878",
      bg: "rgba(80,200,120,0.08)"
    };
  }
  if (text.includes("ad") || text.includes("advertisement") || text.includes("creative")) {
    return {
      label: "Ad Creative",
      color: "#0047ab",
      bg: "rgba(0,71,171,0.12)"
    };
  }
  if (text.includes("video") || text.includes("edit")) {
    return {
      label: "Video Editing",
      color: "#00ff00",
      bg: "rgba(0,255,0,0.06)"
    };
  }
  return {
    label: "Creative Skills",
    color: "#50c878",
    bg: "rgba(80,200,120,0.08)"
  };
}
function CourseCard({ course, index }) {
  const lessonCount = course.lessons.length;
  const totalMinutes = course.lessons.reduce(
    (acc, l) => acc + Number(l.durationMinutes),
    0
  );
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationText = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}` : `${mins}m`;
  const category = getCourseCategory(course);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.08 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/courses/$courseId",
          params: { courseId: course.id },
          className: "group block h-full",
          "data-ocid": `course-card-${course.id}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden border border-border transition-all duration-300 h-full flex flex-col hover:border-blue-900/60",
              style: {
                background: "oklch(0.11 0.005 220)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.boxShadow = "0 0 28px rgba(0,71,171,0.22), 0 0 48px rgba(0,71,171,0.1)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.boxShadow = "none";
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-video bg-muted", children: [
                  course.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: course.thumbnailUrl,
                      alt: course.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full h-full flex items-center justify-center",
                      style: {
                        background: "linear-gradient(135deg, #0a1f35 0%, #0d1a0a 100%)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        BookOpen,
                        {
                          className: "w-12 h-12",
                          style: { color: "rgba(80,200,120,0.35)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "text-xs font-body font-semibold px-2.5 py-0.5 backdrop-blur-sm",
                      style: {
                        background: category.bg,
                        color: category.color,
                        border: `1px solid ${category.color}40`
                      },
                      children: category.label
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-full flex items-center justify-center",
                      style: {
                        background: "linear-gradient(135deg, #50c878 0%, #0047ab 100%)",
                        boxShadow: "0 0 24px rgba(80,200,120,0.5)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-white ml-0.5" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2", children: course.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1", children: course.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-body text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: course.instructorName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-border flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-body text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        lessonCount,
                        " lesson",
                        lessonCount !== 1 ? "s" : ""
                      ] })
                    ] }),
                    totalMinutes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-body text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: durationText })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "ml-auto text-xs font-body px-2 py-0.5",
                        style: {
                          borderColor: "rgba(0,255,0,0.25)",
                          color: "#00ff00",
                          background: "rgba(0,255,0,0.06)"
                        },
                        children: "Free"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        }
      )
    }
  );
}
function CourseSkeletons() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden border border-border",
      style: { background: "oklch(0.11 0.005 220)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ] })
      ]
    },
    i
  )) });
}
const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  { label: "Thumbnail Design", value: "Thumbnail Design" },
  { label: "Ad Creative", value: "Ad Creative" },
  { label: "Video Editing", value: "Video Editing" }
];
function CoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const [activeFilter, setActiveFilter] = React.useState("all");
  const filteredCourses = (courses == null ? void 0 : courses.filter((c) => {
    if (activeFilter === "all") return true;
    return getCourseCategory(c).label === activeFilter;
  })) ?? [];
  const hasCourses = !isLoading && courses && courses.length > 0;
  const isEmpty = !isLoading && (!courses || courses.length === 0);
  const noFilterResults = hasCourses && filteredCourses.length === 0;
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
              className: "absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse 50% 50% at 0% 100%, rgba(0,71,171,0.08) 0%, transparent 65%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto text-center relative z-10 max-w-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-5 font-body px-3 py-1 inline-flex items-center gap-1.5",
                    style: {
                      borderColor: "rgba(0,255,0,0.3)",
                      color: "#00ff00",
                      background: "rgba(0,255,0,0.06)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                      "Free AI-Powered Courses"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                className: "font-display font-bold text-5xl md:text-6xl tracking-tight text-foreground mb-6 leading-tight",
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.1 },
                children: [
                  "Master Creative",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-transparent bg-clip-text",
                      style: {
                        backgroundImage: "linear-gradient(90deg, #50c878, #0047ab)"
                      },
                      children: "Skills"
                    }
                  ),
                  " ",
                  "for Free"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-4",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
                children: "Learn thumbnail design, video editing, and ad creation from Elysian AI — our intelligent course guide built to teach you creative skills. All courses are completely free."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                className: "text-sm text-muted-foreground font-body",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5, delay: 0.3 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#50c878" }, children: "Thumbnail Design" }),
                  " · ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#0047ab" }, children: "Ad Creatives" }),
                  " · ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00ff00" }, children: "Video Editing" })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl", children: [
      !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "flex flex-wrap gap-2 mb-8",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          "data-ocid": "course-filters",
          children: CATEGORY_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveFilter(f.value),
              className: "px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200",
              style: activeFilter === f.value ? {
                background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                color: "#fff",
                border: "1px solid transparent"
              } : {
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.1)"
              },
              "data-ocid": `filter-${f.value}`,
              children: f.label
            },
            f.value
          ))
        }
      ),
      isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col items-center justify-center py-24 text-center gap-6",
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          "data-ocid": "courses-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-20 rounded-2xl flex items-center justify-center",
                style: {
                  background: "linear-gradient(135deg, #50c87820 0%, #0047ab20 100%)",
                  border: "1px solid rgba(80,200,120,0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-9 h-9", style: { color: "#50c878" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Courses Coming Soon" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm", children: "Elysian AI is preparing the first batch of free creative courses. Check back soon!" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                style: {
                  background: "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                  color: "#fff"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get Notified" })
              }
            )
          ]
        }
      ),
      noFilterResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col items-center justify-center py-16 text-center gap-4",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3 },
          "data-ocid": "filter-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "No courses in this category yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setActiveFilter("all"),
                children: "Show all courses"
              }
            )
          ]
        }
      ),
      (isLoading || hasCourses && filteredCourses.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CourseSkeletons, {}) : filteredCourses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course, index: i }, course.id)) })
    ] }) })
  ] });
}
export {
  CoursesPage
};
