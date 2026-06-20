export type { Project, ProjectId, Timestamp } from "../backend.d";
export { TemplateType } from "../backend.d";

// Course & Lesson types (matching backend)
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  durationMinutes: bigint;
  order: bigint;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  thumbnailUrl: string;
  lessons: Lesson[];
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completedAt?: bigint;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: bigint;
  isRead: boolean;
}
