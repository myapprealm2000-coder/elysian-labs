import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FALLBACK_VIDEO, courseVideos } from "@/data/courseVideos";
import {
  useCourse,
  useLessonProgress,
  useMarkLessonComplete,
} from "@/hooks/useCourses";
import type { Lesson } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function VideoPlayer({
  lessonId,
}: {
  lessonId: string;
}) {
  // courseVideos map is the sole source of truth — fallback ensures we ALWAYS have a valid local URL
  const videoUrl = courseVideos[lessonId] ?? FALLBACK_VIDEO;
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Elysian AI badge */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5" style={{ color: "#50c878" }} />
        <span
          className="text-xs font-body font-semibold uppercase tracking-widest"
          style={{ color: "#50c878" }}
        >
          Taught by Elysian AI
        </span>
      </div>

      {/* HTML5 video player — premium dark shell */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "#050810",
          border: "1px solid rgba(80,200,120,0.18)",
          boxShadow:
            "0 0 40px rgba(0,71,171,0.18), 0 0 80px rgba(80,200,120,0.06)",
        }}
      >
        {/* Native HTML5 video — Cloudinary URL, no iframe, no overlay */}
        <video
          key={lessonId}
          src={videoUrl}
          controls
          playsInline
          preload="none"
          className="w-full h-full object-contain"
          style={{ display: "block" }}
          onError={(e) => {
            const target = e.currentTarget as HTMLVideoElement;
            console.error(
              "[CourseVideo] Failed to load video:",
              videoUrl,
              "networkState:",
              target.networkState,
              "error:",
              target.error?.message ?? "unknown",
            );
            setVideoError(true);
          }}
        >
          <track kind="captions" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Error message — shown below the player, never replaces it */}
      {videoError && (
        <div className="flex flex-col items-center gap-2 text-center py-3">
          <p className="text-muted-foreground font-body text-sm">
            Unable to load video. Please check your connection and try again.
          </p>
          <Button
            size="sm"
            onClick={() => setVideoError(false)}
            style={{
              background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
              color: "#fff",
              border: "none",
            }}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}

// Stable anonymous user id in localStorage with UUID-style generation
function getOrCreateUserId(): string {
  const KEY = "elysian_user_id";
  const existing = localStorage.getItem(KEY);
  if (existing) return existing;
  // Generate UUID v4
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
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
  isMarking,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  isActive: boolean;
  onSelect: () => void;
  onMarkComplete: () => void;
  isMarking: boolean;
}) {
  return (
    <button
      type="button"
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 border text-left group/row ${
        isCompleted
          ? "border-transparent bg-accent/5"
          : isActive
            ? "border-blue-900/50 bg-blue-950/20"
            : "border-transparent hover:border-border hover:bg-card/60"
      }`}
      onClick={onSelect}
      data-ocid={`lesson-row-${lesson.id}`}
      aria-pressed={isActive}
    >
      {/* Number/check indicator */}
      <div
        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-display font-bold transition-all duration-200"
        style={{
          background: isCompleted
            ? "linear-gradient(135deg, #50c878 0%, #0047ab 100%)"
            : isActive
              ? "rgba(0,71,171,0.25)"
              : "rgba(255,255,255,0.05)",
          color: isCompleted
            ? "#fff"
            : isActive
              ? "#60a5fa"
              : "rgba(255,255,255,0.4)",
        }}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <span>{Number(lesson.order)}</span>
        )}
      </div>

      {/* Lesson info */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-display font-semibold truncate transition-colors duration-200 ${
            isCompleted
              ? "text-accent"
              : isActive
                ? "text-foreground"
                : "text-foreground/80 group-hover/row:text-foreground"
          }`}
        >
          {lesson.title}
        </p>
        <p className="text-xs text-muted-foreground font-body flex items-center gap-1 mt-0.5">
          <Clock className="w-3 h-3" />
          {Number(lesson.durationMinutes)}m
        </p>
      </div>

      {/* Mark complete button — shown on active lesson if not already done */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isActive && !isCompleted && (
          <Button
            size="sm"
            className="text-xs px-3 py-1 h-7"
            style={{
              background: "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
              color: "#fff",
              border: "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMarkComplete();
            }}
            disabled={isMarking}
            data-ocid={`lesson-complete-btn-${lesson.id}`}
          >
            {isMarking ? "Saving…" : "Mark done"}
          </Button>
        )}
        {isCompleted && (
          <span className="text-xs font-body" style={{ color: "#50c878" }}>
            Done
          </span>
        )}
      </div>
    </button>
  );
}

export function CourseDetailPage() {
  const { courseId } = useParams({ from: "/courses/$courseId" as never });
  const { data: course, isLoading } = useCourse(courseId);
  const userId = getOrCreateUserId();
  const { data: progress } = useLessonProgress(userId);
  const { mutate: markComplete, isPending: isMarking } =
    useMarkLessonComplete();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const completedIds = new Set((progress ?? []).map((p) => p.lessonId));

  const sortedLessons = course
    ? [...course.lessons].sort((a, b) => Number(a.order) - Number(b.order))
    : [];

  const activeLesson =
    sortedLessons.find((l) => l.id === activeLessonId) ??
    sortedLessons[0] ??
    null;

  const handleMarkComplete = (lessonId: string) => {
    markComplete(
      { lessonId, userId },
      {
        onSuccess: () => toast.success("Lesson marked as complete! 🎉"),
        onError: () => toast.error("Could not save progress. Try again."),
      },
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Not found
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <BookOpen
            className="w-16 h-16 mx-auto mb-6"
            style={{ color: "rgba(80,200,120,0.3)" }}
          />
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Course not found
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            This course may have been removed or doesn't exist.
          </p>
          <Button asChild variant="outline">
            <Link to="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const completedCount = sortedLessons.filter((l) =>
    completedIds.has(l.id),
  ).length;
  const totalLessons = sortedLessons.length;
  const progressPct =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const totalMinutes = sortedLessons.reduce(
    (acc, l) => acc + Number(l.durationMinutes),
    0,
  );
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const totalDurationText =
    totalHours > 0
      ? `${totalHours}h ${totalMins > 0 ? `${totalMins}m` : ""}`
      : `${totalMins}m`;

  const isCourseComplete = totalLessons > 0 && completedCount === totalLessons;

  return (
    <div className="min-h-screen">
      {/* Course header */}
      <section
        className="relative py-10 px-6 border-b border-border overflow-hidden"
        style={{ background: "oklch(0.10 0.005 220)" }}
      >
        {/* Glow accent */}
        <div
          className="absolute top-0 right-0 w-96 h-48 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(0,71,171,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6"
            data-ocid="course-back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            All Courses
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <Badge
                variant="outline"
                className="mb-3 font-body"
                style={{
                  borderColor: "rgba(0,255,0,0.3)",
                  color: "#00ff00",
                  background: "rgba(0,255,0,0.06)",
                }}
              >
                Free Course
              </Badge>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3 leading-tight">
                {course.title}
              </h1>
              <p className="text-muted-foreground font-body text-sm mb-4 leading-relaxed max-w-2xl">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm font-body text-muted-foreground">
                <span>
                  By{" "}
                  <span style={{ color: "#50c878" }}>
                    {course.instructorName}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
                </span>
                {totalMinutes > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {totalDurationText} total
                  </span>
                )}
              </div>
            </div>

            {/* Progress panel */}
            {totalLessons > 0 && (
              <div
                className="flex flex-col gap-3 rounded-xl p-4 min-w-[180px]"
                style={{
                  background: "oklch(0.13 0.006 230)",
                  border: "1px solid oklch(0.22 0.004 240)",
                }}
              >
                {isCourseComplete ? (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Trophy className="w-7 h-7" style={{ color: "#00ff00" }} />
                    <p
                      className="text-sm font-display font-bold"
                      style={{ color: "#00ff00" }}
                    >
                      Completed!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-body">
                        Your progress
                      </span>
                      <span
                        className="text-xs font-display font-bold"
                        style={{ color: "#50c878" }}
                      >
                        {progressPct}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progressPct}%`,
                          background:
                            "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground font-body text-center">
                      {completedCount} / {totalLessons} done
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          {totalLessons === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 text-center gap-6"
              data-ocid="no-lessons-state"
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
                  Lessons coming soon
                </h2>
                <p className="text-muted-foreground font-body max-w-sm">
                  Elysian AI is preparing course content. Check back soon!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video player + lesson info */}
              <motion.div
                className="lg:col-span-2 flex flex-col gap-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
              >
                {/* Video player */}
                <div data-ocid="lesson-video-player">
                  {activeLesson && <VideoPlayer lessonId={activeLesson.id} />}
                </div>

                {/* Active lesson details */}
                {activeLesson && (
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="font-display font-bold text-xl text-foreground leading-tight">
                        {activeLesson.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground flex-shrink-0 mt-1">
                        <Clock className="w-3.5 h-3.5" />
                        {Number(activeLesson.durationMinutes)}m
                      </div>
                    </div>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {activeLesson.description}
                    </p>
                    {/* Mark complete button below lesson info */}
                    {!completedIds.has(activeLesson.id) && (
                      <Button
                        className="mt-4"
                        onClick={() => handleMarkComplete(activeLesson.id)}
                        disabled={isMarking}
                        style={{
                          background:
                            "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
                          color: "#fff",
                          border: "none",
                        }}
                        data-ocid={`video-complete-btn-${activeLesson.id}`}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {isMarking ? "Saving…" : "Mark Lesson Complete"}
                      </Button>
                    )}
                    {completedIds.has(activeLesson.id) && (
                      <div
                        className="mt-4 inline-flex items-center gap-2 text-sm font-body font-semibold"
                        style={{ color: "#50c878" }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Lesson complete!
                      </div>
                    )}
                  </div>
                )}

                {/* About this course */}
                <div
                  className="rounded-xl p-5 border border-border"
                  style={{ background: "oklch(0.11 0.005 220)" }}
                >
                  <h3 className="font-display font-semibold text-sm text-foreground mb-2">
                    About this course
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </motion.div>

              {/* Lesson list sidebar */}
              <motion.div
                className="flex flex-col gap-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                data-ocid="lesson-list"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-widest">
                    Course Lessons
                  </h3>
                  <span className="text-xs text-muted-foreground font-body">
                    {completedCount}/{totalLessons}
                  </span>
                </div>

                {/* Mini progress bar in sidebar */}
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPct}%`,
                      background:
                        "linear-gradient(90deg, #50c878 0%, #0047ab 100%)",
                    }}
                  />
                </div>

                {sortedLessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={completedIds.has(lesson.id)}
                    isActive={activeLesson?.id === lesson.id}
                    onSelect={() => setActiveLessonId(lesson.id)}
                    onMarkComplete={() => handleMarkComplete(lesson.id)}
                    isMarking={isMarking}
                  />
                ))}

                {/* Certificate CTA when complete */}
                {isCourseComplete && (
                  <motion.div
                    className="mt-4 rounded-xl p-4 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,255,0,0.08) 0%, rgba(0,71,171,0.08) 100%)",
                      border: "1px solid rgba(0,255,0,0.2)",
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Trophy
                      className="w-8 h-8 mx-auto mb-2"
                      style={{ color: "#00ff00" }}
                    />
                    <p
                      className="font-display font-bold text-sm"
                      style={{ color: "#00ff00" }}
                    >
                      Course Complete!
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-1">
                      You've finished all lessons.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
