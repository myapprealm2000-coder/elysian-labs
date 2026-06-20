import type { Course } from "@/types";

export const STATIC_COURSES: Course[] = [
  {
    id: "c1",
    title: "Thumbnails Masterclass",
    description:
      "Learn how to create eye-catching, high-converting thumbnails that stand out. From composition and color theory to typography and brand identity — master every element of a great thumbnail.",
    instructorName: "Elysian AI",
    thumbnailUrl: "",
    lessons: [
      {
        id: "c1-l1",
        courseId: "c1",
        title: "Introduction to Thumbnail Design",
        description:
          "Understand what makes a thumbnail instantly clickable. We cover the psychology of visual attention and first impressions.",
        videoUrl: "",
        durationMinutes: BigInt(12),
        order: BigInt(1),
      },
      {
        id: "c1-l2",
        courseId: "c1",
        title: "Color Theory for Thumbnails",
        description:
          "Discover how to use contrast, saturation, and color harmony to make your thumbnails pop on any platform.",
        videoUrl: "",
        durationMinutes: BigInt(15),
        order: BigInt(2),
      },
      {
        id: "c1-l3",
        courseId: "c1",
        title: "Typography & Text Hierarchy",
        description:
          "Choose the right fonts and arrange text so viewers absorb your message in under a second.",
        videoUrl: "",
        durationMinutes: BigInt(14),
        order: BigInt(3),
      },
      {
        id: "c1-l4",
        courseId: "c1",
        title: "Composition & Layout Principles",
        description:
          "Apply rule-of-thirds, negative space, and focal points to guide the viewer's eye exactly where you want.",
        videoUrl: "",
        durationMinutes: BigInt(18),
        order: BigInt(4),
      },
      {
        id: "c1-l5",
        courseId: "c1",
        title: "Exporting & Platform Optimization",
        description:
          "Learn the ideal dimensions, file formats, and compression settings for YouTube, social media, and streaming platforms.",
        videoUrl: "",
        durationMinutes: BigInt(10),
        order: BigInt(5),
      },
    ],
  },
  {
    id: "c2",
    title: "Ad Creative Design",
    description:
      "Create scroll-stopping ad creatives that convert. Understand ad anatomy, audience psychology, and the visual language of high-performing ads across all major platforms.",
    instructorName: "Elysian AI",
    thumbnailUrl: "",
    lessons: [
      {
        id: "c2-l1",
        courseId: "c2",
        title: "Anatomy of a High-Converting Ad",
        description:
          "Break down what separates a forgettable ad from one that drives action — from hook to CTA.",
        videoUrl: "",
        durationMinutes: BigInt(13),
        order: BigInt(1),
      },
      {
        id: "c2-l2",
        courseId: "c2",
        title: "Understanding Your Audience",
        description:
          "Build audience personas and tailor your visual language to speak directly to their desires and pain points.",
        videoUrl: "",
        durationMinutes: BigInt(16),
        order: BigInt(2),
      },
      {
        id: "c2-l3",
        courseId: "c2",
        title: "Static Ad Design Fundamentals",
        description:
          "Design striking static ads using hierarchy, brand consistency, and persuasive visual elements.",
        videoUrl: "",
        durationMinutes: BigInt(20),
        order: BigInt(3),
      },
      {
        id: "c2-l4",
        courseId: "c2",
        title: "Motion & Video Ad Concepts",
        description:
          "Introduce motion to your ad strategy — learn storyboarding, pacing, and motion design basics.",
        videoUrl: "",
        durationMinutes: BigInt(22),
        order: BigInt(4),
      },
      {
        id: "c2-l5",
        courseId: "c2",
        title: "Testing & Iterating Creatives",
        description:
          "Use A/B testing, performance metrics, and creative fatigue signals to keep your ads fresh and effective.",
        videoUrl: "",
        durationMinutes: BigInt(14),
        order: BigInt(5),
      },
    ],
  },
  {
    id: "c3",
    title: "Video Editing Fundamentals",
    description:
      "Go from raw footage to polished video. Learn the core techniques professional editors use — cutting, pacing, color grading, sound design, and delivering final exports.",
    instructorName: "Elysian AI",
    thumbnailUrl: "",
    lessons: [
      {
        id: "c3-l1",
        courseId: "c3",
        title: "The Editor's Mindset",
        description:
          "Think like an editor. Understand story structure, pacing instincts, and how every cut serves the narrative.",
        videoUrl: "",
        durationMinutes: BigInt(11),
        order: BigInt(1),
      },
      {
        id: "c3-l2",
        courseId: "c3",
        title: "Timeline Basics & Cut Techniques",
        description:
          "Master the timeline, learn cut types (hard cut, J/L cut, jump cut), and build smooth sequences.",
        videoUrl: "",
        durationMinutes: BigInt(17),
        order: BigInt(2),
      },
      {
        id: "c3-l3",
        courseId: "c3",
        title: "Color Grading Essentials",
        description:
          "Use color correction and grading to set mood, match shots, and give your video a cinematic look.",
        videoUrl: "",
        durationMinutes: BigInt(19),
        order: BigInt(3),
      },
      {
        id: "c3-l4",
        courseId: "c3",
        title: "Sound Design & Music",
        description:
          "Balance dialogue, background music, and sound effects to create an immersive audio experience.",
        videoUrl: "",
        durationMinutes: BigInt(15),
        order: BigInt(4),
      },
      {
        id: "c3-l5",
        courseId: "c3",
        title: "Export Settings & Delivery",
        description:
          "Choose the right codecs, bitrates, and formats for every platform — from YouTube to Instagram to broadcast.",
        videoUrl: "",
        durationMinutes: BigInt(12),
        order: BigInt(5),
      },
    ],
  },
];

export function getStaticCourse(id: string): Course | undefined {
  return STATIC_COURSES.find((c) => c.id === id);
}
