import { createActor } from "@/backend";
import { STATIC_COURSES, getStaticCourse } from "@/data/staticCourses";
import type { Course, LessonProgress } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const COURSES_KEY = ["courses"] as const;

export function useCourses() {
  const { actor } = useActor(createActor);
  return useQuery<Course[]>({
    queryKey: COURSES_KEY,
    queryFn: async () => {
      if (!actor) return STATIC_COURSES;
      try {
        const result = await actor.listCourses();
        // If backend returns empty or invalid data, fall back to static
        if (!result || !Array.isArray(result) || result.length === 0) {
          return STATIC_COURSES;
        }
        return result as Course[];
      } catch {
        return STATIC_COURSES;
      }
    },
    // Always enabled — fall back to static data if actor isn't ready
    enabled: true,
    // Never treat a failure as an error — always return static data
    retry: false,
    // Return static courses immediately as placeholder while actor loads
    placeholderData: STATIC_COURSES,
  });
}

export function useCourse(id: string) {
  const { actor } = useActor(createActor);
  return useQuery<Course | null>({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!actor || !id) return getStaticCourse(id) ?? null;
      try {
        const result = await actor.getCourse(id);
        if (!result) return getStaticCourse(id) ?? null;
        return result as Course;
      } catch {
        return getStaticCourse(id) ?? null;
      }
    },
    enabled: !!id,
    retry: false,
    placeholderData: getStaticCourse(id) ?? null,
  });
}

export function useLessonProgress(userId: string) {
  const { actor } = useActor(createActor);
  return useQuery<LessonProgress[]>({
    queryKey: ["lessonProgress", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      try {
        const results = await actor.getLessonProgress(userId);
        return results.map((p) => ({
          userId: p.userId,
          lessonId: p.lessonId,
          completedAt: p.completedAt,
        }));
      } catch {
        return [];
      }
    },
    enabled: !!userId,
    retry: false,
  });
}

export function useMarkLessonComplete() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { lessonId: string; userId: string }>({
    mutationFn: async ({ lessonId, userId }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markLessonComplete(lessonId, userId);
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["lessonProgress", userId] });
    },
  });
}
