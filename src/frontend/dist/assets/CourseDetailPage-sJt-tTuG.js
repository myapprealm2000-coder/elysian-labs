import { i as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./vendor-80nuMd8G.js";
import { B as Badge } from "./badge-W0ZOSlWS.js";
import { B as Button } from "./button-Dx5YDvtJ.js";
import { S as Skeleton } from "./skeleton-DBZTzHkA.js";
import { a as useCourse, b as useLessonProgress, c as useMarkLessonComplete } from "./useCourses-CW0Ulned.js";
import { u as ue } from "./index-De5ctwPQ.js";
import { aI as BookOpen, s as ArrowLeft, x as Clock, ay as Trophy, h as CircleCheck, S as Sparkles } from "./ui-lib-DG52wkUx.js";
import { m as motion } from "./motion-DXodcWnX.js";
import "./backend-CD8jDaiY.js";
const FALLBACK_VIDEO = "https://res.cloudinary.com/dwcg2egng/video/upload/v1777626203/elysianlabs_q2hdcw.mp4";
const LOCAL_VIDEO = FALLBACK_VIDEO;
const courseVideos = {
  // Course 1: Thumbnails Masterclass (5 lessons)
  "c1-l1": LOCAL_VIDEO,
  "c1-l2": LOCAL_VIDEO,
  "c1-l3": LOCAL_VIDEO,
  "c1-l4": LOCAL_VIDEO,
  "c1-l5": LOCAL_VIDEO,
  // Course 2: Ad Creative Design (4 lessons)
  "c2-l1": LOCAL_VIDEO,
  "c2-l2": LOCAL_VIDEO,
  "c2-l3": LOCAL_VIDEO,
  "c2-l4": LOCAL_VIDEO,
  // Course 3: Video Editing Fundamentals (6 lessons)
  "c3-l1": LOCAL_VIDEO,
  "c3-l2": LOCAL_VIDEO,
  "c3-l3": LOCAL_VIDEO,
  "c3-l4": LOCAL_VIDEO,
  "c3-l5": LOCAL_VIDEO,
  "c3-l6": LOCAL_VIDEO
};
function VideoPlayer({
  lessonId
}) {
  const videoUrl = courseVideos[lessonId] ?? FALLBACK_VIDEO;
  const [videoError, setVideoError] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5", style: { color: "#50c878" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-body font-semibold uppercase tracking-widest",
          style: { color: "#50c878" },
          children: "Taught by Elysian AI"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl overflow-hidden",
        style: {
          aspectRatio: "16/9",
          background: "#050810",
          border: "1px solid rgba(80,200,120,0.18)",
          boxShadow: "0 0 40px rgba(0,71,171,0.18), 0 0 80px rgba(80,200,120,0.06)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "video",
          {
            src: videoUrl,
            controls: true,
            playsInline: true,
            preload: "none",
            className: "w-full h-full object-contain",
            style: { display: "block" },
            onError: (e) => {
              var _a;
              const target = e.currentTarget;
              console.error(
                "[CourseVideo] Failed to load video:",
                videoUrl,
                "networkState:",
                target.networkState,
                "error:",
                ((_a = target.error) == null ? void 0 : _a.message) ?? "unknown"
              );
              setVideoError(true);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" }),
              "Your browser does not support HTML5 video."
            ]
          },
          lessonId
        )
      }
    ),
    videoError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-center py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Unable to load video. Please check your connection and try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: () => setVideoError(false),
          style: {
            background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
            color: "#fff",
            border: "none"
          },
          children: "Retry"
        }
      )
    ] })
  ] });
}
function getOrCreateUserId() {
  const KEY = "elysian_user_id";
  const existing = localStorage.getItem(KEY);
  if (existing) return existing;
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
  localStorage.setItem(KEY, uuid);
  return uuid;
}
function LessonRow({
  lesson,
  isCompleted,
  isActive,
  onSelect,
  onMarkComplete,
  isMarking
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `w-full flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 border text-left group/row ${isCompleted ? "border-transparent bg-accent/5" : isActive ? "border-blue-900/50 bg-blue-950/20" : "border-transparent hover:border-border hover:bg-card/60"}`,
      onClick: onSelect,
      "data-ocid": `lesson-row-${lesson.id}`,
      "aria-pressed": isActive,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-display font-bold transition-all duration-200",
            style: {
              background: isCompleted ? "linear-gradient(135deg, #50c878 0%, #0047ab 100%)" : isActive ? "rgba(0,71,171,0.25)" : "rgba(255,255,255,0.05)",
              color: isCompleted ? "#fff" : isActive ? "#60a5fa" : "rgba(255,255,255,0.4)"
            },
            children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Number(lesson.order) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-sm font-display font-semibold truncate transition-colors duration-200 ${isCompleted ? "text-accent" : isActive ? "text-foreground" : "text-foreground/80 group-hover/row:text-foreground"}`,
              children: lesson.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body flex items-center gap-1 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            Number(lesson.durationMinutes),
            "m"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          isActive && !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "text-xs px-3 py-1 h-7",
              style: {
                background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
                color: "#fff",
                border: "none"
              },
              onClick: (e) => {
                e.stopPropagation();
                onMarkComplete();
              },
              disabled: isMarking,
              "data-ocid": `lesson-complete-btn-${lesson.id}`,
              children: isMarking ? "Saving…" : "Mark done"
            }
          ),
          isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body", style: { color: "#50c878" }, children: "Done" })
        ] })
      ]
    }
  );
}
function CourseDetailPage() {
  const { courseId } = useParams({ from: "/courses/$courseId" });
  const { data: course, isLoading } = useCourse(courseId);
  const userId = getOrCreateUserId();
  const { data: progress } = useLessonProgress(userId);
  const { mutate: markComplete, isPending: isMarking } = useMarkLessonComplete();
  const [activeLessonId, setActiveLessonId] = reactExports.useState(null);
  const completedIds = new Set((progress ?? []).map((p) => p.lessonId));
  const sortedLessons = course ? [...course.lessons].sort((a, b) => Number(a.order) - Number(b.order)) : [];
  const activeLesson = sortedLessons.find((l) => l.id === activeLessonId) ?? sortedLessons[0] ?? null;
  const handleMarkComplete = (lessonId) => {
    markComplete(
      { lessonId, userId },
      {
        onSuccess: () => ue.success("Lesson marked as complete! 🎉"),
        onError: () => ue.error("Could not save progress. Try again.")
      }
    );
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) })
      ] })
    ] }) }) });
  }
  if (!course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BookOpen,
        {
          className: "w-16 h-16 mx-auto mb-6",
          style: { color: "rgba(80,200,120,0.3)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Course not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-6", children: "This course may have been removed or doesn't exist." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Back to Courses"
      ] }) })
    ] }) });
  }
  const completedCount = sortedLessons.filter(
    (l) => completedIds.has(l.id)
  ).length;
  const totalLessons = sortedLessons.length;
  const progressPct = totalLessons > 0 ? Math.round(completedCount / totalLessons * 100) : 0;
  const totalMinutes = sortedLessons.reduce(
    (acc, l) => acc + Number(l.durationMinutes),
    0
  );
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const totalDurationText = totalHours > 0 ? `${totalHours}h ${totalMins > 0 ? `${totalMins}m` : ""}` : `${totalMins}m`;
  const isCourseComplete = totalLessons > 0 && completedCount === totalLessons;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-10 px-6 border-b border-border overflow-hidden",
        style: { background: "oklch(0.10 0.005 220)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 right-0 w-96 h-48 pointer-events-none",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(0,71,171,0.12) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/courses",
                className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6",
                "data-ocid": "course-back-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  "All Courses"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-3 font-body",
                    style: {
                      borderColor: "rgba(0,255,0,0.3)",
                      color: "#00ff00",
                      background: "rgba(0,255,0,0.06)"
                    },
                    children: "Free Course"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3 leading-tight", children: course.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-4 leading-relaxed max-w-2xl", children: course.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm font-body text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "By",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#50c878" }, children: course.instructorName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                    totalLessons,
                    " lesson",
                    totalLessons !== 1 ? "s" : ""
                  ] }),
                  totalMinutes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                    totalDurationText,
                    " total"
                  ] })
                ] })
              ] }),
              totalLessons > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-3 rounded-xl p-4 min-w-[180px]",
                  style: {
                    background: "oklch(0.13 0.006 230)",
                    border: "1px solid oklch(0.22 0.004 240)"
                  },
                  children: isCourseComplete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-7 h-7", style: { color: "#00ff00" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm font-display font-bold",
                        style: { color: "#00ff00" },
                        children: "Completed!"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "Your progress" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs font-display font-bold",
                          style: { color: "#50c878" },
                          children: [
                            progressPct,
                            "%"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-all duration-700",
                        style: {
                          width: `${progressPct}%`,
                          background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)"
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body text-center", children: [
                      completedCount,
                      " / ",
                      totalLessons,
                      " done"
                    ] })
                  ] })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-6xl", children: totalLessons === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center gap-6",
        "data-ocid": "no-lessons-state",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Lessons coming soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm", children: "Elysian AI is preparing course content. Check back soon!" })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "lg:col-span-2 flex flex-col gap-5",
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "lesson-video-player", children: activeLesson && /* @__PURE__ */ jsxRuntimeExports.jsx(VideoPlayer, { lessonId: activeLesson.id }) }),
            activeLesson && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground leading-tight", children: activeLesson.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-body text-muted-foreground flex-shrink-0 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  Number(activeLesson.durationMinutes),
                  "m"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm leading-relaxed", children: activeLesson.description }),
              !completedIds.has(activeLesson.id) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "mt-4",
                  onClick: () => handleMarkComplete(activeLesson.id),
                  disabled: isMarking,
                  style: {
                    background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
                    color: "#fff",
                    border: "none"
                  },
                  "data-ocid": `video-complete-btn-${activeLesson.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                    isMarking ? "Saving…" : "Mark Lesson Complete"
                  ]
                }
              ),
              completedIds.has(activeLesson.id) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mt-4 inline-flex items-center gap-2 text-sm font-body font-semibold",
                  style: { color: "#50c878" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                    "Lesson complete!"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-5 border border-border",
                style: { background: "oklch(0.11 0.005 220)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-2", children: "About this course" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm leading-relaxed", children: course.description })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col gap-1",
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45, delay: 0.1 },
          "data-ocid": "lesson-list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest", children: "Course Lessons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-body", children: [
                completedCount,
                "/",
                totalLessons
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 rounded-full bg-muted overflow-hidden mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-700",
                style: {
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)"
                }
              }
            ) }),
            sortedLessons.map((lesson) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              LessonRow,
              {
                lesson,
                isCompleted: completedIds.has(lesson.id),
                isActive: (activeLesson == null ? void 0 : activeLesson.id) === lesson.id,
                onSelect: () => setActiveLessonId(lesson.id),
                onMarkComplete: () => handleMarkComplete(lesson.id),
                isMarking
              },
              lesson.id
            )),
            isCourseComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "mt-4 rounded-xl p-4 text-center",
                style: {
                  background: "linear-gradient(135deg, rgba(0,255,0,0.08) 0%, rgba(0,71,171,0.08) 100%)",
                  border: "1px solid rgba(0,255,0,0.2)"
                },
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.4 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trophy,
                    {
                      className: "w-8 h-8 mx-auto mb-2",
                      style: { color: "#00ff00" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-bold text-sm",
                      style: { color: "#00ff00" },
                      children: "Course Complete!"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1", children: "You've finished all lessons." })
                ]
              }
            )
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  CourseDetailPage
};
