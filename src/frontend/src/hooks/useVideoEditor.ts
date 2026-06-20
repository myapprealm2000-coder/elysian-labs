import {
  type AudioClip,
  type CaptionLayer,
  type CaptionPreset,
  type ColorGradingSettings,
  DEFAULT_COLOR_GRADING,
  type TextLayer,
  type TransitionType,
} from "@/types/videoEditor";
export type { TransitionType } from "@/types/videoEditor";

// ─── Backward-compat re-exports (legacy components import these from here) ────────
// These allow existing imports like:
//   import type { TextOverlay, VideoEditorState } from '@/hooks/useVideoEditor'
// to continue compiling without changing every downstream file.

/** @deprecated Use TextLayer from @/types/videoEditor.
 * This type retains the legacy flat API (fontFamily, bold, etc.) for backward compatibility.
 */
export interface TextOverlay {
  id: string;
  type: "text";
  trackId: string;
  content: string;
  startTime: number;
  endTime: number;
  // Legacy flat position API
  x?: number;
  y?: number;
  width?: number;
  // Legacy flat style API
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  textAlign?: "left" | "center" | "right";
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  preset?: string;
  animation?: string;
  shadow?: string;
  glow?: string;
  rotation?: number;
  locked?: boolean;
  hidden?: boolean;
  // New nested style also available
  style?: import("@/types/videoEditor").TextLayerStyle;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
}

/** @deprecated Use EditorState from @/types/videoEditor */
export type VideoEditorState = import("@/types/videoEditor").EditorState;

export type SpeedValue = 0.1 | 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2 | 4;
export type FilterType = "none" | "warm" | "cool" | "vintage" | "bw" | "vivid";
export type PresetType = "youtube" | "glow" | "bold" | "custom";
export type TextAlign = "left" | "center" | "right";

/** @deprecated Use VideoClip from @/types/videoEditor */
export type Clip = import("@/types/videoEditor").VideoClip;

export const FONTS = [
  "Inter",
  "Plus Jakarta Sans",
  "Poppins",
  "Bebas Neue",
  "Anton",
  "Montserrat",
  "Oswald",
  "Impact",
  "Arial Black",
  "Georgia",
];

export const PRESET_STYLES: Record<
  Exclude<PresetType, "custom">,
  Partial<TextOverlay>
> = {
  youtube: {
    fontFamily: "Impact",
    fontSize: 64,
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
    bold: true,
    italic: false,
    underline: false,
    backgroundColor: "transparent",
    opacity: 1,
    preset: "youtube",
  },
  glow: {
    fontFamily: "Plus Jakarta Sans",
    fontSize: 48,
    color: "#50c878",
    fontWeight: "400",
    textAlign: "center",
    bold: false,
    italic: false,
    underline: false,
    backgroundColor: "transparent",
    opacity: 1,
    preset: "glow",
  },
  bold: {
    fontFamily: "Impact",
    fontSize: 96,
    color: "#ffffff",
    fontWeight: "900",
    textAlign: "center",
    bold: true,
    italic: false,
    underline: false,
    backgroundColor: "transparent",
    opacity: 1,
    preset: "bold",
  },
};

import { useVideoEditorStore } from "@/store/videoEditorStore";
import { useCallback, useEffect, useMemo, useRef } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatTime(seconds: number, includeMs = false): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (includeMs) {
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Convert ColorGradingSettings into a CSS filter string. */
export function computeFilterString(grading: ColorGradingSettings): string {
  const filters: string[] = [];

  // Brightness: base + exposure bonus
  const brightnessFactor =
    1 + (grading.brightness + grading.exposure * 0.5) / 100;
  if (Math.abs(brightnessFactor - 1) > 0.001) {
    filters.push(`brightness(${brightnessFactor.toFixed(3)})`);
  }

  // Contrast (also uses highlights/shadows as subtle contrast modifier)
  const contrastFactor =
    1 +
    (grading.contrast + grading.highlights * 0.2 - grading.shadows * 0.2) / 100;
  if (Math.abs(contrastFactor - 1) > 0.001) {
    filters.push(`contrast(${contrastFactor.toFixed(3)})`);
  }

  // Saturation + vibrance boost
  const saturationFactor =
    1 + (grading.saturation + grading.vibrance * 0.5) / 100;
  if (Math.abs(saturationFactor - 1) > 0.001) {
    filters.push(`saturate(${saturationFactor.toFixed(3)})`);
  }

  // Temperature: warm (sepia + hue-rotate) or cool (hue-rotate)
  if (Math.abs(grading.temperature) > 0.5) {
    if (grading.temperature > 0) {
      // Warm: slight sepia + hue shift
      filters.push(`sepia(${(grading.temperature * 0.3).toFixed(3)})`);
      filters.push(`hue-rotate(${(-grading.temperature * 0.8).toFixed(1)}deg)`);
    } else {
      // Cool: inverse hue shift
      filters.push(`hue-rotate(${(-grading.temperature * 1.2).toFixed(1)}deg)`);
    }
  }

  // Tint: subtle hue offset
  if (Math.abs(grading.tint) > 0.5) {
    filters.push(`hue-rotate(${(grading.tint * 0.5).toFixed(1)}deg)`);
  }

  // Blur
  if (grading.blur > 0) {
    filters.push(`blur(${grading.blur.toFixed(1)}px)`);
  }

  // Fade: subtle brightness lift (crushes blacks)
  if (grading.fade > 0) {
    filters.push(`brightness(${(1 + grading.fade * 0.003).toFixed(3)})`);
    filters.push(`contrast(${(1 - grading.fade * 0.004).toFixed(3)})`);
  }

  // Sharpen simulation via contrast boost
  if (grading.sharpen > 0) {
    filters.push(`contrast(${(1 + grading.sharpen * 0.005).toFixed(3)})`);
  }

  return filters.join(" ");
}

/** Compute CSS transform string from videoTransform state. */
function computeTransformString(
  rotation: number,
  flipH: boolean,
  flipV: boolean,
): string {
  const parts: string[] = [];
  if (rotation !== 0) parts.push(`rotate(${rotation}deg)`);
  const scaleX = flipH ? -1 : 1;
  const scaleY = flipV ? -1 : 1;
  if (scaleX !== 1 || scaleY !== 1) parts.push(`scale(${scaleX}, ${scaleY})`);
  return parts.join(" ") || "none";
}

// ─── Default text layer text track ID (must match store default) ────────────────────

const DEFAULT_VIDEO_TRACK_ID = "track-video-1";
const DEFAULT_AUDIO_TRACK_ID = "track-audio-1";
const DEFAULT_TEXT_TRACK_ID = "track-text-1";

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useVideoEditor(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  audioRef?: React.RefObject<HTMLAudioElement | null>,
) {
  const store = useVideoEditorStore();
  const rafRef = useRef<number | null>(null);

  // ─── RAF playback loop ───────────────────────────────────────────────

  const startRafLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    const tick = () => {
      const v = videoRef.current;
      if (!v) return;
      const t = v.currentTime;
      const storeTime = useVideoEditorStore.getState().currentTime;
      if (Math.abs(t - storeTime) > 0.005) {
        useVideoEditorStore.getState().setCurrentTime(t);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [videoRef]);

  const stopRafLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => () => stopRafLoop(), [stopRafLoop]);

  // ─── Apply CSS filters to video element ─────────────────────────────────

  const applyFiltersToVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const { colorGrading, videoTransform } = useVideoEditorStore.getState();
    v.style.filter = computeFilterString(colorGrading);
    v.style.opacity = String(colorGrading.opacity / 100);
    v.style.transform = computeTransformString(
      videoTransform.rotation,
      videoTransform.flipH,
      videoTransform.flipV,
    );
  }, [videoRef]);

  // Reapply filters whenever color grading or transform changes
  useEffect(() => {
    const unsub = useVideoEditorStore.subscribe(() => applyFiltersToVideo());
    return unsub;
  }, [applyFiltersToVideo]);

  // ─── Playback controls ───────────────────────────────────────────────

  const play = useCallback(async () => {
    const v = videoRef.current;
    if (!v || v.src === "" || v.readyState < 2) return;
    try {
      await v.play();
      store.setIsPlaying(true);
      startRafLoop();
    } catch {
      // Autoplay blocked or no source — ignore
    }
  }, [videoRef, store, startRafLoop]);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    store.setIsPlaying(false);
    stopRafLoop();
    // Sync final time
    store.setCurrentTime(v.currentTime);
  }, [videoRef, store, stopRafLoop]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void play();
    } else {
      pause();
    }
  }, [videoRef, play, pause]);

  const seekTo = useCallback(
    (time: number) => {
      const v = videoRef.current;
      if (!v) return;
      const clamped = Math.max(0, Math.min(store.duration, time));
      v.currentTime = clamped;
      store.setCurrentTime(clamped);
    },
    [videoRef, store],
  );

  const stepFrame = useCallback(
    (frames: number) => {
      seekTo(store.currentTime + frames / 30);
    },
    [seekTo, store.currentTime],
  );

  const rewind = useCallback(() => seekTo(0), [seekTo]);

  const setSpeed = useCallback(
    (speed: number) => {
      const v = videoRef.current;
      if (v) v.playbackRate = speed;
      store.setPlaybackSpeed(speed);
    },
    [videoRef, store],
  );

  const setVolume = useCallback(
    (vol: number) => {
      const v = videoRef.current;
      if (v) v.volume = Math.max(0, Math.min(1, vol));
      store.setVolume(vol);
    },
    [videoRef, store],
  );

  const setMuted = useCallback(
    (muted: boolean) => {
      const v = videoRef.current;
      if (v) v.muted = muted;
      store.setMuted(muted);
    },
    [videoRef, store],
  );

  const toggleFullscreen = useCallback(
    (containerRef: React.RefObject<HTMLElement | null>) => {
      const el = containerRef.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        void el.requestFullscreen();
      } else {
        void document.exitFullscreen();
      }
    },
    [],
  );

  // ─── Video events ──────────────────────────────────────────────────

  const onVideoLoaded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    store.setDuration(v.duration);
    store.setCurrentTime(0);
    // Apply current filters to newly loaded video
    applyFiltersToVideo();
    // Update video clip duration if one exists
    const { videoClips } = useVideoEditorStore.getState();
    for (const clip of Object.values(videoClips)) {
      if (clip.src === v.src || clip.src === "") {
        useVideoEditorStore.getState().updateVideoClip(clip.id, {
          duration: v.duration,
          trimOut: v.duration,
        });
        break;
      }
    }
  }, [videoRef, store, applyFiltersToVideo]);

  const onVideoEnded = useCallback(() => {
    store.setIsPlaying(false);
    stopRafLoop();
    store.setCurrentTime(store.duration);
  }, [store, stopRafLoop]);

  // ─── Transform controls ──────────────────────────────────────────────

  const setRotation = useCallback(
    (deg: number) => {
      store.setVideoTransform({ rotation: deg });
    },
    [store],
  );

  const flipHorizontal = useCallback(() => {
    const { videoTransform } = useVideoEditorStore.getState();
    store.setVideoTransform({ flipH: !videoTransform.flipH });
  }, [store]);

  const flipVertical = useCallback(() => {
    const { videoTransform } = useVideoEditorStore.getState();
    store.setVideoTransform({ flipV: !videoTransform.flipV });
  }, [store]);

  // ─── Clip file import ────────────────────────────────────────────────

  const addVideoFromFile = useCallback(
    (file: File) => {
      const src = URL.createObjectURL(file);
      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";
      tempVideo.src = src;
      tempVideo.onloadedmetadata = () => {
        const dur = tempVideo.duration || 0;
        const id = makeId("vclip");
        store.takeSnapshot();
        store.addVideoClip({
          id,
          type: "video",
          trackId: DEFAULT_VIDEO_TRACK_ID,
          src,
          name: file.name.replace(/\.[^.]+$/, ""),
          startTime: 0,
          duration: dur,
          trimIn: 0,
          trimOut: dur,
          speed: 1,
          volume: 1,
          muted: false,
          locked: false,
          hidden: false,
          filters: { ...DEFAULT_COLOR_GRADING },
          transform: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            flipH: false,
            flipV: false,
          },
          aspectRatio: "16:9",
          reversed: false,
          opacity: 1,
        });
        store.setDuration(dur);
        store.setSelectedClipId(id);
        // Load into video element
        if (videoRef.current) {
          videoRef.current.src = src;
          videoRef.current.load();
        }
      };
    },
    [store, videoRef],
  );

  const addAudioFromFile = useCallback(
    (file: File) => {
      const src = URL.createObjectURL(file);
      const tempAudio = document.createElement("audio");
      tempAudio.preload = "metadata";
      tempAudio.src = src;
      tempAudio.onloadedmetadata = () => {
        const dur = tempAudio.duration || 0;
        const id = makeId("aclip");
        store.takeSnapshot();
        const clip: AudioClip = {
          id,
          type: "audio",
          trackId: DEFAULT_AUDIO_TRACK_ID,
          src,
          name: file.name.replace(/\.[^.]+$/, ""),
          startTime: 0,
          duration: dur,
          trimIn: 0,
          trimOut: dur,
          volume: 1,
          muted: false,
          locked: false,
          hidden: false,
          fadeIn: 0,
          fadeOut: 0,
        };
        store.addAudioClip(clip);
        if (audioRef?.current) {
          audioRef.current.src = src;
          audioRef.current.load();
        }
      };
    },
    [store, audioRef],
  );

  // ─── Clip operations ─────────────────────────────────────────────────

  const splitClipAtPlayhead = useCallback(
    (clipId: string) => {
      const { videoClips, currentTime } = useVideoEditorStore.getState();
      const clip = videoClips[clipId];
      if (!clip) return;
      const splitPoint = currentTime - clip.startTime;
      if (
        splitPoint <= clip.trimIn ||
        splitPoint >= clip.duration - clip.trimOut
      )
        return;
      store.takeSnapshot();
      // First half: trim out from split point
      store.updateVideoClip(clipId, { trimOut: clip.duration - splitPoint });
      // Second half: new clip starting at playhead
      const newId = makeId("vclip");
      store.addVideoClip({
        ...clip,
        id: newId,
        name: `${clip.name} (2)`,
        startTime: currentTime,
        trimIn: splitPoint,
        trimOut: 0,
      });
    },
    [store],
  );

  const deleteClip = useCallback(
    (id: string, type: "video" | "audio" | "text" | "caption") => {
      store.takeSnapshot();
      if (type === "video") store.removeVideoClip(id);
      else if (type === "audio") store.removeAudioClip(id);
      else if (type === "text") store.removeTextLayer(id);
      else if (type === "caption") store.removeCaptionLayer(id);
    },
    [store],
  );

  const duplicateClip = useCallback(
    (id: string, type: "video" | "audio" | "text" | "caption") => {
      const state = useVideoEditorStore.getState();
      store.takeSnapshot();
      if (type === "video") {
        const clip = state.videoClips[id];
        if (clip) {
          store.addVideoClip({
            ...clip,
            id: makeId("vclip"),
            name: `${clip.name} (copy)`,
            startTime: clip.startTime + 0.5,
          });
        }
      } else if (type === "audio") {
        const clip = state.audioClips[id];
        if (clip) {
          store.addAudioClip({
            ...clip,
            id: makeId("aclip"),
            name: `${clip.name} (copy)`,
            startTime: clip.startTime + 0.5,
          });
        }
      } else if (type === "text") {
        const layer = state.textLayers[id];
        if (layer) {
          store.addTextLayer({
            ...layer,
            id: makeId("text"),
            content: `${layer.content} (copy)`,
            position: { x: layer.position.x + 2, y: layer.position.y + 2 },
          });
        }
      } else if (type === "caption") {
        const layer = state.captionLayers[id];
        if (layer) {
          store.addCaptionLayer({ ...layer, id: makeId("cap") });
        }
      }
    },
    [store],
  );

  const trimClipIn = useCallback(
    (id: string, newTrimIn: number) => {
      store.updateVideoClip(id, { trimIn: Math.max(0, newTrimIn) });
    },
    [store],
  );

  const trimClipOut = useCallback(
    (id: string, newTrimOut: number) => {
      store.updateVideoClip(id, { trimOut: Math.max(0, newTrimOut) });
    },
    [store],
  );

  const moveClipOnTimeline = useCallback(
    (id: string, newStartTime: number, snapInterval = 0) => {
      let snapped = Math.max(0, newStartTime);
      if (snapInterval > 0) {
        snapped = Math.round(snapped / snapInterval) * snapInterval;
      }
      store.updateVideoClip(id, { startTime: snapped });
    },
    [store],
  );

  const moveClipToTrack = useCallback(
    (id: string, targetTrackId: string) => {
      store.updateVideoClip(id, { trackId: targetTrackId });
    },
    [store],
  );

  // ─── Text layer management ───────────────────────────────────────────

  const addTextLayer = useCallback(
    (content = "Your text here") => {
      const { currentTime, duration } = useVideoEditorStore.getState();
      const id = makeId("text");
      const layer: TextLayer = {
        id,
        type: "text",
        trackId: DEFAULT_TEXT_TRACK_ID,
        content,
        startTime: currentTime,
        endTime:
          duration > 0 ? Math.min(currentTime + 5, duration) : currentTime + 5,
        position: { x: 50, y: 50 },
        size: { width: 60, height: 15 },
        rotation: 0,
        locked: false,
        hidden: false,
        style: {
          fontFamily: "Inter",
          fontSize: 48,
          fontWeight: "700",
          color: "#ffffff",
          opacity: 1,
          textAlign: "center",
          letterSpacing: 0,
          lineHeight: 1.2,
          animation: "none",
        },
      };
      store.takeSnapshot();
      store.addTextLayer(layer);
      store.setSelectedTextId(id);
      return id;
    },
    [store],
  );

  const updateTextLayer = useCallback(
    (id: string, updates: Partial<TextLayer>) => {
      store.updateTextLayer(id, updates);
    },
    [store],
  );

  const deleteTextLayer = useCallback(
    (id: string) => {
      store.takeSnapshot();
      store.removeTextLayer(id);
    },
    [store],
  );

  const duplicateTextLayer = useCallback(
    (id: string) => duplicateClip(id, "text"),
    [duplicateClip],
  );

  // ─── Caption management ─────────────────────────────────────────────

  const addCaptionLayer = useCallback(
    (preset: CaptionPreset = "tiktok") => {
      const { currentTime, duration } = useVideoEditorStore.getState();
      const id = makeId("cap");
      const presetStyles: Record<
        CaptionPreset,
        Partial<CaptionLayer["style"]>
      > = {
        tiktok: {
          fontFamily: "Inter",
          fontSize: 32,
          color: "#ffffff",
          background: { color: "#000000", borderRadius: 4, padding: 8 },
        },
        cinematic: {
          fontFamily: "Georgia",
          fontSize: 28,
          color: "#f5f0e0",
          glow: { color: "#ffffff", intensity: 0.3 },
        },
        minimal: { fontFamily: "Inter", fontSize: 24, color: "#ffffff" },
        glow: {
          fontFamily: "Inter",
          fontSize: 34,
          color: "#00ff00",
          glow: { color: "#00ff00", intensity: 0.6 },
        },
        custom: { fontFamily: "Inter", fontSize: 28, color: "#ffffff" },
      };
      const layer: CaptionLayer = {
        id,
        type: "caption",
        trackId: DEFAULT_TEXT_TRACK_ID,
        content: "Caption text here",
        startTime: currentTime,
        endTime:
          duration > 0 ? Math.min(currentTime + 3, duration) : currentTime + 3,
        position: { x: 50, y: 80 },
        size: { width: 80, height: 10 },
        preset,
        style: {
          fontFamily: "Inter",
          fontSize: 28,
          color: "#ffffff",
          ...presetStyles[preset],
        },
      };
      store.takeSnapshot();
      store.addCaptionLayer(layer);
      store.setSelectedCaptionId(id);
      return id;
    },
    [store],
  );

  const updateCaptionLayer = useCallback(
    (id: string, updates: Partial<CaptionLayer>) => {
      store.updateCaptionLayer(id, updates);
    },
    [store],
  );

  const deleteCaptionLayer = useCallback(
    (id: string) => {
      store.takeSnapshot();
      store.removeCaptionLayer(id);
    },
    [store],
  );

  // ─── Transitions ──────────────────────────────────────────────────────────

  const applyTransition = useCallback(
    (clipId: string, transition: TransitionType, duration: number) => {
      store.updateVideoClip(clipId, {
        transition: {
          type: transition,
          duration,
          easing: store.transitionEasing,
        },
      });
    },
    [store],
  );

  const removeTransition = useCallback(
    (clipId: string) => {
      store.updateVideoClip(clipId, {
        transition: { type: "none", duration: 0.5, easing: "ease-in-out" },
      });
    },
    [store],
  );

  // ─── Export ───────────────────────────────────────────────────────────────

  const exportFrame = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const { colorGrading } = useVideoEditorStore.getState();
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth || 1920;
    canvas.height = v.videoHeight || 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.filter = computeFilterString(colorGrading);
    ctx.globalAlpha = colorGrading.opacity / 100;
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `frame-${Math.floor(v.currentTime * 1000)}ms.png`;
    a.click();
  }, [videoRef]);

  const startMockExport = useCallback(
    (format: string, quality: string) => {
      const durationsByQuality: Record<string, number> = {
        "720p": 5000,
        "1080p": 8000,
        "2K": 12000,
        "4K": 18000,
      };
      const totalMs = durationsByQuality[quality] ?? 8000;
      const stepMs = 150;
      const increment = (stepMs / totalMs) * 100;
      let progress = 0;
      store.setExportProgress(0);

      const interval = setInterval(() => {
        progress = Math.min(100, progress + increment + Math.random() * 0.5);
        store.setExportProgress(Math.floor(progress));
        if (progress >= 100) {
          clearInterval(interval);
          // Small delay then clear progress (caller shows success modal)
          setTimeout(() => store.setExportProgress(null), 500);
          console.log(
            `[Export] ${format.toUpperCase()} ${quality} export complete`,
          );
        }
      }, stepMs);
    },
    [store],
  );

  // ─── Project save/load ─────────────────────────────────────────────────

  const saveProject = useCallback(() => {
    store.saveProject();
  }, [store]);

  const loadProject = useCallback(
    (projectId: string) => {
      store.loadProject(projectId);
    },
    [store],
  );

  // Autosave every 30 seconds if dirty
  useEffect(() => {
    const id = setInterval(() => {
      const { isDirty } = useVideoEditorStore.getState();
      if (isDirty) {
        store.setAutosaveStatus("saving");
        store.saveProject();
      }
    }, 30_000);
    return () => clearInterval(id);
  }, [store]);

  // ─── Keyboard shortcuts ───────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "Escape") {
        store.setSelectedClipId(null);
        store.setSelectedTextId(null);
        store.setSelectedCaptionId(null);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        stepFrame(-1);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        stepFrame(1);
      } else if (
        (e.key === "z" || e.key === "Z") &&
        (e.ctrlKey || e.metaKey) &&
        !e.shiftKey
      ) {
        e.preventDefault();
        store.undo();
      } else if (
        (e.key === "z" || e.key === "Z") &&
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey
      ) {
        e.preventDefault();
        store.redo();
      } else if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        store.saveProject();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, stepFrame, store]);

  // ─── Computed / memoised values ─────────────────────────────────────────

  const filterStyle = useMemo(
    () => computeFilterString(store.colorGrading),
    [store.colorGrading],
  );

  const transformStyle = useMemo(
    () =>
      computeTransformString(
        store.videoTransform.rotation,
        store.videoTransform.flipH,
        store.videoTransform.flipV,
      ),
    [store.videoTransform],
  );

  const visibleTextLayers = useMemo(
    () =>
      Object.values(store.textLayers).filter(
        (l) =>
          !l.hidden &&
          store.currentTime >= l.startTime &&
          store.currentTime <= l.endTime,
      ),
    [store.textLayers, store.currentTime],
  );

  const visibleCaptionLayers = useMemo(
    () =>
      Object.values(store.captionLayers).filter(
        (l) =>
          store.currentTime >= l.startTime && store.currentTime <= l.endTime,
      ),
    [store.captionLayers, store.currentTime],
  );

  const currentTimeFormatted = useMemo(
    () => formatTime(store.currentTime, true),
    [store.currentTime],
  );

  const videoDurationFormatted = useMemo(
    () => formatTime(store.duration),
    [store.duration],
  );

  // ─── Return ──────────────────────────────────────────────────────────────────

  return {
    // Refs
    videoRef,
    audioRef,

    // Playback
    play,
    pause,
    togglePlay,
    seekTo,
    stepFrame,
    rewind,
    setSpeed,
    setVolume,
    setMuted,
    toggleFullscreen,

    // Video events
    onVideoLoaded,
    onVideoEnded,

    // Transform
    setRotation,
    flipHorizontal,
    flipVertical,

    // Clip management
    addVideoFromFile,
    addAudioFromFile,
    splitClipAtPlayhead,
    deleteClip,
    duplicateClip,
    trimClipIn,
    trimClipOut,
    moveClipOnTimeline,
    moveClipToTrack,

    // Text layers
    addTextLayer,
    updateTextLayer,
    deleteTextLayer,
    duplicateTextLayer,

    // Captions
    addCaptionLayer,
    updateCaptionLayer,
    deleteCaptionLayer,

    // Transitions
    applyTransition,
    removeTransition,

    // Export
    exportFrame,
    startMockExport,

    // Project
    saveProject,
    loadProject,

    // Computed values
    filterStyle,
    transformStyle,
    visibleTextLayers,
    visibleCaptionLayers,
    currentTimeFormatted,
    videoDurationFormatted,
  };
}
