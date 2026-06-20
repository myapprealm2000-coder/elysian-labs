import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export type ContactMessageId = string;
export type LessonId = string;
export interface Course {
    id: CourseId;
    title: string;
    thumbnailUrl: string;
    description: string;
    lessons: Array<Lesson>;
    instructorName: string;
}
export interface ContactMessage {
    id: ContactMessageId;
    name: string;
    createdAt: Timestamp;
    isRead: boolean;
    email: string;
    message: string;
}
export interface Lesson {
    id: LessonId;
    title: string;
    order: bigint;
    description: string;
    durationMinutes: bigint;
    videoUrl: string;
    courseId: CourseId;
}
export type ProjectId = string;
export type CourseId = string;
export interface Project {
    id: ProjectId;
    name: string;
    createdAt: Timestamp;
    videoFile?: ExternalBlob;
    templateType: TemplateType;
    updatedAt: Timestamp;
}
export interface LessonProgress {
    lessonId: LessonId;
    completedAt?: Timestamp;
    userId: string;
}
export enum TemplateType {
    ad = "ad",
    thumbnail = "thumbnail",
    blank = "blank"
}
export interface backendInterface {
    addLesson(courseId: CourseId, lessonId: LessonId, title: string, description: string, videoUrl: string, durationMinutes: bigint, order: bigint): Promise<boolean>;
    attachVideoFile(id: ProjectId, videoFile: ExternalBlob): Promise<boolean>;
    createCourse(title: string, description: string, thumbnailUrl: string): Promise<Course>;
    createProject(name: string, templateType: TemplateType): Promise<Project>;
    deleteProject(id: ProjectId): Promise<boolean>;
    getCourse(id: CourseId): Promise<Course | null>;
    getLessonProgress(userId: string): Promise<Array<LessonProgress>>;
    getProject(id: ProjectId): Promise<Project | null>;
    listContactMessages(): Promise<Array<ContactMessage>>;
    listCourses(): Promise<Array<Course>>;
    listProjects(): Promise<Array<Project>>;
    markLessonComplete(lessonId: LessonId, userId: string): Promise<boolean>;
    submitContact(name: string, email: string, message: string): Promise<boolean>;
}
