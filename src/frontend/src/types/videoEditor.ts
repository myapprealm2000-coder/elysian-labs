// ─── Video Editor Types ────────────────────────────────────────────────────────

// ─── Primitive types ─────────────────────────────────────────────────────────

export type TransitionType =
  | "none"
  | "fade"
  | "fade-in"
  | "fade-out"
  | "dissolve"
  | "zoom"
  | "blur"
  | "swipe"
  | "slide-left"
  | "slide-right"
  | "flash"
  | "rotate"
  | "wipe"
  | "scale";

export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:5" | "21:9";

export type TextAnimationPreset =
  | "none"
  | "fade-in"
  | "slide-in"
  | "bounce"
  | "zoom"
  | "typewriter"
  | "blur-reveal";

export type CaptionPreset =
  | "tiktok"
  | "cinematic"
  | "minimal"
  | "glow"
  | "custom";

// SidebarSection as both a const object (for runtime value usage) and a type.
// The const object mimics the old enum API so existing files don't break.
export const SidebarSection = {
  Media: "media",
  Audio: "audio",
  Text: "text",
  Effects: "effects",
  Transitions: "transitions",
  Stickers: "stickers",
  Filters: "filters",
  AITools: "ai",
  Captions: "captions",
  Templates: "templates",
  BrandKit: "brand",
  Settings: "settings",
} as const;

export type SidebarSection =
  (typeof SidebarSection)[keyof typeof SidebarSection];

export type SpeedPreset = "montage" | "hero" | "bullet" | "slowmo" | "normal";

export type BlendMode =
  | "normal"
  | "overlay"
  | "screen"
  | "darken"
  | "multiply"
  | "soft-light"
  | "color-burn";

export type MaskType = "circle" | "rectangle" | "split" | "freedraw";

export type AIToolStatus = "idle" | "loading" | "success" | "error";

// ─── Color Grading ────────────────────────────────────────────────────────────

export interface ColorGradingSettings {
  brightness: number; // -100 to +100 (0 = no change)
  contrast: number; // -100 to +100 (0 = no change)
  saturation: number; // -100 to +100 (0 = no change)
  blur: number; // 0 to 30 (px)
  opacity: number; // 0 to 100 (100 = full)
  exposure: number; // -50 to +50
  highlights: number; // -50 to +50
  shadows: number; // -50 to +50
  temperature: number; // -50 to +50
  tint: number; // -50 to +50
  vibrance: number; // -50 to +50
  sharpen: number; // 0 to 100
  fade: number; // 0 to 100
}

export const DEFAULT_COLOR_GRADING: ColorGradingSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  opacity: 100,
  exposure: 0,
  highlights: 0,
  shadows: 0,
  temperature: 0,
  tint: 0,
  vibrance: 0,
  sharpen: 0,
  fade: 0,
};

// ─── Clips ────────────────────────────────────────────────────────────────────

export interface VideoClip {
  id: string;
  type: "video";
  trackId: string;
  src: string; // object URL or static path
  name: string;
  startTime: number; // position on timeline in seconds
  duration: number; // total duration of the clip
  trimIn: number; // trim from start in seconds
  trimOut: number; // trim from end in seconds
  speed: number; // playback speed multiplier (1.0 = normal)
  volume: number; // 0-1
  muted: boolean;
  locked: boolean;
  hidden: boolean;
  transition?: { type: TransitionType; duration: number; easing: string };
  filters: ColorGradingSettings;
  transform: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    flipH: boolean;
    flipV: boolean;
  };
  /** @deprecated Use filters instead */
  filter?: string;
  /** @deprecated Use startTime + duration - trimIn - trimOut */
  endTime?: number;
  /** @deprecated Use type field instead */
  trackType?: "video" | "audio" | "text";
  aspectRatio: AspectRatio;
  reversed: boolean;
  frozenAt?: number;
  opacity: number;
}

export interface AudioClip {
  id: string;
  type: "audio";
  trackId: string;
  src: string;
  name: string;
  startTime: number;
  duration: number;
  trimIn: number;
  trimOut: number;
  volume: number;
  muted: boolean;
  locked: boolean;
  hidden: boolean;
  fadeIn: number; // fade duration in seconds
  fadeOut: number;
  waveformData?: number[]; // normalized 0-1 amplitude data
}

export interface TextLayerStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string; // '300' | '400' | '600' | '700' | '900'
  color: string;
  opacity: number;
  textAlign: "left" | "center" | "right";
  letterSpacing: number;
  lineHeight: number;
  textShadow?: {
    offsetX: number;
    offsetY: number;
    blur: number;
    color: string;
  };
  glow?: { color: string; intensity: number; spread: number };
  gradient?: {
    enabled: boolean;
    fromColor: string;
    toColor: string;
    direction: string;
  };
  background?: {
    enabled: boolean;
    color: string;
    borderRadius: number;
    padding: number;
  };
  animation?: TextAnimationPreset;
}

export interface TextLayer {
  id: string;
  type: "text";
  trackId: string;
  content: string;
  startTime: number;
  endTime: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  locked: boolean;
  hidden: boolean;
  style: TextLayerStyle;
  // ── Backward-compat flat fields for legacy components ──
  /** @deprecated use position.x */
  x?: number;
  /** @deprecated use position.y */
  y?: number;
  /** @deprecated use size.width */
  width?: number;
  /** @deprecated use style.fontFamily */
  fontFamily?: string;
  /** @deprecated use style.fontSize */
  fontSize?: number;
  /** @deprecated use style.fontWeight === '700' */
  bold?: boolean;
  /** @deprecated */
  italic?: boolean;
  /** @deprecated */
  underline?: boolean;
  /** @deprecated use style.textAlign */
  textAlign?: "left" | "center" | "right";
  /** @deprecated use style.color */
  color?: string;
  /** @deprecated use style.opacity */
  opacity?: number;
  backgroundColor?: string;
  preset?: string;
  shadow?: string;
  glow?: string;
}

export interface CaptionLayer {
  id: string;
  type: "caption";
  trackId: string;
  content: string;
  startTime: number;
  endTime: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  preset: CaptionPreset;
  style: {
    fontFamily: string;
    fontSize: number;
    color: string;
    background?: { color: string; borderRadius: number; padding: number };
    glow?: { color: string; intensity: number };
    animation?: string;
  };
}

// ─── Tracks ───────────────────────────────────────────────────────────────────

export interface Track {
  id: string;
  type: "video" | "audio" | "text";
  name: string;
  locked: boolean;
  hidden: boolean;
  muted?: boolean;
  height: number;
  clips: string[]; // clip IDs
}

// ─── AI Tool State ────────────────────────────────────────────────────────────

export interface AIToolState {
  loading: boolean;
  done: boolean;
  result?: string;
  progress?: number; // 0-100
  error?: string;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export interface ExportSettings {
  format: "mp4" | "mov" | "gif" | "png-sequence";
  quality: "720p" | "1080p" | "2K" | "4K";
  fps: 24 | 30 | 60;
  estimatedSizeMB: number;
}

// ─── Undo/Redo Snapshot ───────────────────────────────────────────────────────

export interface EditorSnapshot {
  timestamp: number;
  videoClips: Record<string, VideoClip>;
  audioClips: Record<string, AudioClip>;
  textLayers: Record<string, TextLayer>;
  captionLayers: Record<string, CaptionLayer>;
  tracks: Record<string, Track>;
  trackOrder: string[];
}

// ─── Full Editor State ────────────────────────────────────────────────────────

export interface EditorState {
  projectName: string;
  projectId: string;
  tracks: Record<string, Track>;
  trackOrder: string[];
  videoClips: Record<string, VideoClip>;
  audioClips: Record<string, AudioClip>;
  textLayers: Record<string, TextLayer>;
  captionLayers: Record<string, CaptionLayer>;

  // Playback
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackSpeed: number;
  volume: number;
  isMuted: boolean;

  // Selection
  selectedClipId: string | null;
  selectedTextId: string | null;
  selectedCaptionId: string | null;

  // UI
  activeSidebarSection: SidebarSection;
  timelineZoom: number; // 1.0 to 8.0
  aspectRatio: AspectRatio;

  // Color & effects
  colorGrading: ColorGradingSettings;
  videoTransform: {
    rotation: number;
    flipH: boolean;
    flipV: boolean;
    cropX: number;
    cropY: number;
    cropW: number;
    cropH: number;
  };

  // Transitions
  activeTransition: TransitionType;
  transitionDuration: number;
  transitionEasing: string;

  // History
  undoStack: EditorSnapshot[];
  redoStack: EditorSnapshot[];

  // Persistence
  isDirty: boolean;
  lastSavedAt: number | null;

  // Export
  exportProgress: number | null;
  exportModalOpen: boolean;

  // AI
  aiToolStates: Record<string, AIToolState>;

  // Autosave status
  autosaveStatus: "idle" | "saving" | "saved";

  // ─── Backward-compat flat API (used by legacy components) ───
  /** @deprecated Use Object.values(videoClips)[0]?.src */
  src?: string | null;
  /** @deprecated */
  audioSrc?: string | null;
  /** @deprecated Use Object.values(videoClips) */
  clips?: VideoClip[];
  /** @deprecated Use Object.values(textLayers) */
  textOverlays?: TextLayer[];
  /** @deprecated Use selectedClipId/selectedTextId */
  selectedItem?: { type: string; id: string } | null;
  /** @deprecated */
  uploadProgress?: number | null;
  /** @deprecated */
  activeEffectTab?: string;
  /** @deprecated Use timelineZoom */
  zoom?: number;
}

// ─── Default Editor State ─────────────────────────────────────────────────────

const VIDEO_TRACK_ID = "track-video-1";
const AUDIO_TRACK_ID = "track-audio-1";
const TEXT_TRACK_ID = "track-text-1";

export const DEFAULT_EDITOR_STATE: EditorState = {
  projectName: "Untitled Project",
  projectId: "default",
  tracks: {
    [VIDEO_TRACK_ID]: {
      id: VIDEO_TRACK_ID,
      type: "video",
      name: "Video 1",
      locked: false,
      hidden: false,
      muted: false,
      height: 72,
      clips: [],
    },
    [AUDIO_TRACK_ID]: {
      id: AUDIO_TRACK_ID,
      type: "audio",
      name: "Audio 1",
      locked: false,
      hidden: false,
      muted: false,
      height: 56,
      clips: [],
    },
    [TEXT_TRACK_ID]: {
      id: TEXT_TRACK_ID,
      type: "text",
      name: "Text",
      locked: false,
      hidden: false,
      height: 48,
      clips: [],
    },
  },
  trackOrder: [VIDEO_TRACK_ID, AUDIO_TRACK_ID, TEXT_TRACK_ID],
  videoClips: {},
  audioClips: {},
  textLayers: {},
  captionLayers: {},
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  playbackSpeed: 1,
  volume: 1,
  isMuted: false,
  selectedClipId: null,
  selectedTextId: null,
  selectedCaptionId: null,
  activeSidebarSection: "media",
  timelineZoom: 2,
  aspectRatio: "16:9",
  colorGrading: DEFAULT_COLOR_GRADING,
  videoTransform: {
    rotation: 0,
    flipH: false,
    flipV: false,
    cropX: 0,
    cropY: 0,
    cropW: 100,
    cropH: 100,
  },
  activeTransition: "none",
  transitionDuration: 0.5,
  transitionEasing: "ease-in-out",
  undoStack: [],
  redoStack: [],
  isDirty: false,
  lastSavedAt: null,
  exportProgress: null,
  exportModalOpen: false,
  aiToolStates: {},
  autosaveStatus: "idle",
};
