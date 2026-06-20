import type { backendInterface } from "../backend.d";
import { TemplateType } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleProjects = [
  {
    id: "proj-001",
    name: "Summer Campaign Thumbnail",
    createdAt: now - BigInt(86400_000_000_000),
    updatedAt: now - BigInt(3600_000_000_000),
    templateType: TemplateType.thumbnail,
    videoFile: undefined,
  },
  {
    id: "proj-002",
    name: "Product Launch Ad",
    createdAt: now - BigInt(172800_000_000_000),
    updatedAt: now - BigInt(7200_000_000_000),
    templateType: TemplateType.ad,
    videoFile: undefined,
  },
  {
    id: "proj-003",
    name: "Brand Story Video Edit",
    createdAt: now - BigInt(259200_000_000_000),
    updatedAt: now - BigInt(10800_000_000_000),
    templateType: TemplateType.blank,
    videoFile: undefined,
  },
];

export const mockBackend: backendInterface = {
  attachVideoFile: async () => true,
  createProject: async (name, templateType) => ({
    id: `proj-${Date.now()}`,
    name,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
    templateType,
    videoFile: undefined,
  }),
  deleteProject: async () => true,
  getProject: async (id) =>
    sampleProjects.find((p) => p.id === id) ?? null,
  listProjects: async () => sampleProjects,
  addLesson: async () => true,
  createCourse: async (title, description, thumbnailUrl) => ({
    id: `course-${Date.now()}`,
    title,
    description,
    thumbnailUrl,
    instructorName: "Aneeshwar R",
    lessons: [],
  }),
  getCourse: async () => null,
  getLessonProgress: async () => [],
  listCourses: async () => [],
  listContactMessages: async () => [],
  markLessonComplete: async () => true,
  submitContact: async () => true,
};
