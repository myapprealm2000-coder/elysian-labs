import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProjectTypes "types/projects";
import CourseTypes "types/courses";
import ContactTypes "types/contacts";
import Common "types/common";
import ProjectsMixin "mixins/projects-api";
import CoursesMixin "mixins/courses-api";
import ContactsMixin "mixins/contacts-api";
import CoursesLib "lib/courses";

actor {
  let projects = Map.empty<Common.ProjectId, ProjectTypes.Project>();
  let courses = Map.empty<Common.CourseId, CourseTypes.Course>();
  let progress = List.empty<CourseTypes.LessonProgress>();
  let contacts = Map.empty<Common.ContactMessageId, ContactTypes.ContactMessage>();

  var seeded : Bool = false;

  // Seed 3 real courses with Elysian AI as instructor on first deploy
  if (not seeded) {
    seeded := true;
    let now = Time.now();

    // Course 1: YouTube Thumbnails Masterclass (5 lessons)
    let c1Id = "course-thumbnails-masterclass";
    ignore CoursesLib.createCourse(courses, c1Id, "YouTube Thumbnails Masterclass", "Master the art of creating click-worthy YouTube thumbnails that drive views and grow your channel.", "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800", now);
    ignore CoursesLib.addLesson(courses, c1Id, {
      id = "c1-l1"; courseId = c1Id;
      title = "The Psychology of Click-Through Rate";
      description = "Understand what makes viewers click and how to design thumbnails that trigger curiosity and emotion.";
      videoUrl = ""; durationMinutes = 18; order = 1;
    });
    ignore CoursesLib.addLesson(courses, c1Id, {
      id = "c1-l2"; courseId = c1Id;
      title = "Color Theory for Thumbnails";
      description = "Learn how to use bold, contrasting colors to make your thumbnails pop against YouTube's interface.";
      videoUrl = ""; durationMinutes = 22; order = 2;
    });
    ignore CoursesLib.addLesson(courses, c1Id, {
      id = "c1-l3"; courseId = c1Id;
      title = "Typography That Sells";
      description = "Choosing the right fonts, sizes, and placement to deliver your message at a glance.";
      videoUrl = ""; durationMinutes = 20; order = 3;
    });
    ignore CoursesLib.addLesson(courses, c1Id, {
      id = "c1-l4"; courseId = c1Id;
      title = "Facial Expressions and Emotion";
      description = "Using expressive faces and body language to create an emotional hook in your thumbnail.";
      videoUrl = ""; durationMinutes = 15; order = 4;
    });
    ignore CoursesLib.addLesson(courses, c1Id, {
      id = "c1-l5"; courseId = c1Id;
      title = "A/B Testing Your Thumbnails";
      description = "How to test multiple thumbnail variations and use YouTube analytics to find the winner.";
      videoUrl = ""; durationMinutes = 25; order = 5;
    });

    // Course 2: Ad Creative Design (4 lessons)
    let c2Id = "course-ad-creative-design";
    ignore CoursesLib.createCourse(courses, c2Id, "Ad Creative Design", "Design high-converting ad creatives for social media platforms using proven frameworks and visual strategies.", "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800", now);
    ignore CoursesLib.addLesson(courses, c2Id, {
      id = "c2-l1"; courseId = c2Id;
      title = "Ad Creative Fundamentals";
      description = "Core principles of ad design: hierarchy, contrast, and the visual flow that drives action.";
      videoUrl = ""; durationMinutes = 20; order = 1;
    });
    ignore CoursesLib.addLesson(courses, c2Id, {
      id = "c2-l2"; courseId = c2Id;
      title = "Hook Design — The First 3 Seconds";
      description = "How to design a visual hook that stops the scroll and captures attention immediately.";
      videoUrl = ""; durationMinutes = 18; order = 2;
    });
    ignore CoursesLib.addLesson(courses, c2Id, {
      id = "c2-l3"; courseId = c2Id;
      title = "Platform-Specific Ad Formats";
      description = "Designing for Instagram, Facebook, TikTok, and YouTube Shorts — sizes, aspect ratios, and best practices.";
      videoUrl = ""; durationMinutes = 24; order = 3;
    });
    ignore CoursesLib.addLesson(courses, c2Id, {
      id = "c2-l4"; courseId = c2Id;
      title = "From Brief to Final Creative";
      description = "A full workflow walkthrough — from client brief to final ad creative delivery.";
      videoUrl = ""; durationMinutes = 30; order = 4;
    });

    // Course 3: Video Editing Fundamentals (6 lessons)
    let c3Id = "course-video-editing-fundamentals";
    ignore CoursesLib.createCourse(courses, c3Id, "Video Editing Fundamentals", "Go from raw footage to polished, professional video content. Learn pacing, transitions, color grading, and audio mixing.", "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800", now);
    ignore CoursesLib.addLesson(courses, c3Id, {
      id = "c3-l1"; courseId = c3Id;
      title = "Setting Up Your Edit Suite";
      description = "Organizing your project files, setting up timelines, and configuring your workspace for efficiency.";
      videoUrl = ""; durationMinutes = 15; order = 1;
    });
    ignore CoursesLib.addLesson(courses, c3Id, {
      id = "c3-l2"; courseId = c3Id;
      title = "The Art of Pacing and Rhythm";
      description = "How to cut on beat, control the emotional tempo of your video, and keep viewers engaged.";
      videoUrl = ""; durationMinutes = 22; order = 2;
    });
    ignore CoursesLib.addLesson(courses, c3Id, {
      id = "c3-l3"; courseId = c3Id;
      title = "Transitions That Feel Natural";
      description = "When to use cuts, fades, wipes, and motion-matched transitions — and when to keep it simple.";
      videoUrl = ""; durationMinutes = 18; order = 3;
    });
    ignore CoursesLib.addLesson(courses, c3Id, {
      id = "c3-l4"; courseId = c3Id;
      title = "Color Grading for Mood";
      description = "Using LUTs and manual color correction to create a cinematic look and consistent visual tone.";
      videoUrl = ""; durationMinutes = 28; order = 4;
    });
    ignore CoursesLib.addLesson(courses, c3Id, {
      id = "c3-l5"; courseId = c3Id;
      title = "Audio Mixing Basics";
      description = "Balancing dialogue, music, and sound effects to create a clean, professional audio mix.";
      videoUrl = ""; durationMinutes = 20; order = 5;
    });
    ignore CoursesLib.addLesson(courses, c3Id, {
      id = "c3-l6"; courseId = c3Id;
      title = "Exporting for Every Platform";
      description = "The right export settings for YouTube, Instagram, TikTok, and client deliveries.";
      videoUrl = ""; durationMinutes = 12; order = 6;
    });
  };

  include MixinObjectStorage();
  include ProjectsMixin(projects);
  include CoursesMixin(courses, progress);
  include ContactsMixin(contacts);
};
