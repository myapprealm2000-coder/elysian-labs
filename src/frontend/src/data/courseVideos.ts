/**
 * Frontend-side video URL overrides for course lessons.
 * All backend lesson videoUrl fields are empty strings — this map provides
 * a local video file for each lesson by ID.
 * Keys match the backend lesson ID format: c{courseNum}-l{lessonNum}
 * Using a single local MP4 for all lessons to guarantee playback.
 *
 * IMPORTANT: The local MP4 is served directly from the ICP assets canister.
 * preload="none" is required — ICP certified asset fetches can fail on
 * range/metadata requests before the user clicks play.
 */

/** Cloudinary-hosted course video — streams directly via HTML5 <video>. */
export const FALLBACK_VIDEO =
  "https://res.cloudinary.com/dwcg2egng/video/upload/v1777626203/elysianlabs_q2hdcw.mp4";

const LOCAL_VIDEO = FALLBACK_VIDEO;

export const courseVideos: Record<string, string> = {
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
  "c3-l6": LOCAL_VIDEO,
};
