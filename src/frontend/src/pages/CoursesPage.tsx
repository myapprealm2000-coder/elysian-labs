import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourses } from "@/hooks/useCourses";
import type { Course } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Play, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

// Derive a category tag from course title/description
function getCourseCategory(course: Course): {
  label: string;
  color: string;
  bg: string;
} {
  const text = `${course.title} ${course.description}`.toLowerCase();
  if (text.includes("thumbnail") || text.includes("design")) {
    return {
      label: "Thumbnail Design",
      color: "#50c878",
      bg: "rgba(80,200,120,0.08)",
    };
  }
  if (
    text.includes("ad") ||
    text.includes("advertisement") ||
    text.includes("creative")
  ) {
    return {
      label: "Ad Creative",
      color: "#0047ab",
      bg: "rgba(0,71,171,0.12)",
    };
  }
  if (text.includes("video") || text.includes("edit")) {
    return {
      label: "Video Editing",
      color: "#00ff00",
      bg: "rgba(0,255,0,0.06)",
    };
  }
  return {
    label: "Creative Skills",
    color: "#50c878",
    bg: "rgba(80,200,120,0.08)",
  };
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const lessonCount = course.lessons.length;
  const totalMinutes = course.lessons.reduce(
    (acc, l) => acc + Number(l.durationMinutes),
    0,
  );
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationText =
    hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ""}` : `${mins}m`;
  const category = getCourseCategory(course);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Link
        to="/courses/$courseId"
        params={{ courseId: course.id }}
        className="group block h-full"
        data-ocid={`course-card-${course.id}`}
      >
        <div
          className="rounded-2xl overflow-hidden border border-border transition-all duration-300 h-full flex flex-col hover:border-blue-900/60"
          style={{
            background: "oklch(0.11 0.005 220)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 28px rgba(0,71,171,0.22), 0 0 48px rgba(0,71,171,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          {/* Thumbnail */}
          <div className="relative overflow-hidden aspect-video bg-muted">
            {course.thumbnailUrl ? (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #0a1f35 0%, #0d1a0a 100%)",
                }}
              >
                <BookOpen
                  className="w-12 h-12"
                  style={{ color: "rgba(80,200,120,0.35)" }}
                />
              </div>
            )}
            {/* Category badge over thumbnail */}
            <div className="absolute top-3 left-3">
              <Badge
                className="text-xs font-body font-semibold px-2.5 py-0.5 backdrop-blur-sm"
                style={{
                  background: category.bg,
                  color: category.color,
                  border: `1px solid ${category.color}40`,
                }}
              >
                {category.label}
              </Badge>
            </div>
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #50c878 0%, #0047ab 100%)",
                  boxShadow: "0 0 24px rgba(80,200,120,0.5)",
                }}
              >
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="font-display font-bold text-lg text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1">
              {course.description}
            </p>
            <div className="flex items-center gap-1.5 text-sm font-body text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{course.instructorName}</span>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-border flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {lessonCount} lesson{lessonCount !== 1 ? "s" : ""}
                </span>
              </div>
              {totalMinutes > 0 && (
                <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{durationText}</span>
                </div>
              )}
              <Badge
                variant="outline"
                className="ml-auto text-xs font-body px-2 py-0.5"
                style={{
                  borderColor: "rgba(0,255,0,0.25)",
                  color: "#00ff00",
                  background: "rgba(0,255,0,0.06)",
                }}
              >
                Free
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CourseSkeletons() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden border border-border"
          style={{ background: "oklch(0.11 0.005 220)" }}
        >
          <Skeleton className="aspect-video w-full" />
          <div className="p-5 flex flex-col gap-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
}

const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  { label: "Thumbnail Design", value: "Thumbnail Design" },
  { label: "Ad Creative", value: "Ad Creative" },
  { label: "Video Editing", value: "Video Editing" },
];

export function CoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const [activeFilter, setActiveFilter] = React.useState("all");

  const filteredCourses =
    courses?.filter((c) => {
      if (activeFilter === "all") return true;
      return getCourseCategory(c).label === activeFilter;
    }) ?? [];

  const hasCourses = !isLoading && courses && courses.length > 0;
  const isEmpty = !isLoading && (!courses || courses.length === 0);
  const noFilterResults = hasCourses && filteredCourses.length === 0;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0d1118 0%, #0a0f1a 50%, #0a1f15 100%)",
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(0,255,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 0% 100%, rgba(0,71,171,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-5 font-body px-3 py-1 inline-flex items-center gap-1.5"
              style={{
                borderColor: "rgba(0,255,0,0.3)",
                color: "#00ff00",
                background: "rgba(0,255,0,0.06)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Free AI-Powered Courses
            </Badge>
          </motion.div>
          <motion.h1
            className="font-display font-bold text-5xl md:text-6xl tracking-tight text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Master Creative{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #50c878, #0047ab)",
              }}
            >
              Skills
            </span>{" "}
            for Free
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Learn thumbnail design, video editing, and ad creation from Elysian
            AI — our intelligent course guide built to teach you creative
            skills. All courses are completely free.
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span style={{ color: "#50c878" }}>Thumbnail Design</span>
            {" · "}
            <span style={{ color: "#0047ab" }}>Ad Creatives</span>
            {" · "}
            <span style={{ color: "#00ff00" }}>Video Editing</span>
          </motion.p>
        </div>
      </section>

      {/* Filters + Courses grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Category filters */}
          {!isEmpty && (
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              data-ocid="course-filters"
            >
              {CATEGORY_FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveFilter(f.value)}
                  className="px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200"
                  style={
                    activeFilter === f.value
                      ? {
                          background:
                            "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                          color: "#fff",
                          border: "1px solid transparent",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.55)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }
                  }
                  data-ocid={`filter-${f.value}`}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>
          )}

          {isEmpty && (
            <motion.div
              className="flex flex-col items-center justify-center py-24 text-center gap-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              data-ocid="courses-empty-state"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #50c87820 0%, #0047ab20 100%)",
                  border: "1px solid rgba(80,200,120,0.2)",
                }}
              >
                <BookOpen className="w-9 h-9" style={{ color: "#50c878" }} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                  Courses Coming Soon
                </h2>
                <p className="text-muted-foreground font-body max-w-sm">
                  Elysian AI is preparing the first batch of free creative
                  courses. Check back soon!
                </p>
              </div>
              <Button
                asChild
                style={{
                  background:
                    "linear-gradient(90deg, #0047ab 0%, #50c878 100%)",
                  color: "#fff",
                }}
              >
                <Link to="/contact">Get Notified</Link>
              </Button>
            </motion.div>
          )}

          {noFilterResults && (
            <motion.div
              className="flex flex-col items-center justify-center py-16 text-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              data-ocid="filter-empty-state"
            >
              <p className="text-muted-foreground font-body">
                No courses in this category yet.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveFilter("all")}
              >
                Show all courses
              </Button>
            </motion.div>
          )}

          {(isLoading || (hasCourses && filteredCourses.length > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <CourseSkeletons />
              ) : (
                filteredCourses.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// React import at bottom removed — already imported at top
