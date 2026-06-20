import {
  type AIToolState,
  type AspectRatio,
  type AudioClip,
  type CaptionLayer,
  type ColorGradingSettings,
  DEFAULT_COLOR_GRADING,
  DEFAULT_EDITOR_STATE,
  type EditorSnapshot,
  type EditorState,
  type SidebarSection,
  type TextLayer,
  type Track,
  type TransitionType,
  type VideoClip,
} from "@/types/videoEditor";
import { create } from "zustand";

// ─── Store Actions Interface ────────────────────────────────────────────────────

interface EditorActions {
  // Playback
  setCurrentTime: (t: number) => void;
  setIsPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  setMuted: (v: boolean) => void;
  setPlaybackSpeed: (v: number) => void;
  setDuration: (d: number) => void;

  // UI
  setActiveSidebarSection: (s: SidebarSection) => void;
  setSelectedClipId: (id: string | null) => void;
  setSelectedTextId: (id: string | null) => void;
  setSelectedCaptionId: (id: string | null) => void;
  setTimelineZoom: (z: number) => void;
  setAspectRatio: (r: AspectRatio) => void;

  // Color grading
  setColorGrading: (settings: Partial<ColorGradingSettings>) => void;
  resetColorGrading: () => void;

  // Video transform
  setVideoTransform: (t: Partial<EditorState["videoTransform"]>) => void;

  // Transitions
  setActiveTransition: (t: TransitionType) => void;
  setTransitionDuration: (d: number) => void;
  setTransitionEasing: (e: string) => void;

  // Export
  setExportProgress: (p: number | null) => void;
  setExportModalOpen: (v: boolean) => void;

  // AI tools
  setAIToolState: (tool: string, state: AIToolState) => void;
  startAITool: (name: string, durationMs: number) => void;
  resetAITool: (name: string) => void;

  // Video clips
  addVideoClip: (clip: VideoClip) => void;
  updateVideoClip: (id: string, updates: Partial<VideoClip>) => void;
  removeVideoClip: (id: string) => void;

  // Audio clips
  addAudioClip: (clip: AudioClip) => void;
  updateAudioClip: (id: string, updates: Partial<AudioClip>) => void;
  removeAudioClip: (id: string) => void;

  // Text layers
  addTextLayer: (layer: TextLayer) => void;
  updateTextLayer: (id: string, updates: Partial<TextLayer>) => void;
  removeTextLayer: (id: string) => void;

  // Caption layers
  addCaptionLayer: (layer: CaptionLayer) => void;
  updateCaptionLayer: (id: string, updates: Partial<CaptionLayer>) => void;
  removeCaptionLayer: (id: string) => void;

  // Tracks
  addTrack: (track: Track) => void;
  updateTrack: (id: string, updates: Partial<Track>) => void;
  removeTrack: (id: string) => void;
  reorderTracks: (from: number, to: number) => void;

  // Project
  setProjectName: (name: string) => void;
  setIsDirty: (v: boolean) => void;

  // History
  takeSnapshot: () => void;
  undo: () => void;
  redo: () => void;

  // Persistence
  saveProject: () => void;
  loadProject: (projectId: string) => void;

  // Autosave
  setAutosaveStatus: (status: "idle" | "saving" | "saved") => void;
}

type VideoEditorStore = EditorState & EditorActions;

// ─── Helper ──────────────────────────────────────────────────────────────────────

function captureSnapshot(state: EditorState): EditorSnapshot {
  return {
    timestamp: Date.now(),
    videoClips: { ...state.videoClips },
    audioClips: { ...state.audioClips },
    textLayers: { ...state.textLayers },
    captionLayers: { ...state.captionLayers },
    tracks: { ...state.tracks },
    trackOrder: [...state.trackOrder],
  };
}

function applySnapshot(
  _state: EditorState,
  snap: EditorSnapshot,
): Partial<EditorState> {
  return {
    videoClips: snap.videoClips,
    audioClips: snap.audioClips,
    textLayers: snap.textLayers,
    captionLayers: snap.captionLayers,
    tracks: snap.tracks,
    trackOrder: snap.trackOrder,
    isDirty: true,
  };
}

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useVideoEditorStore = create<VideoEditorStore>((set, get) => ({
  // Spread defaults — projectId will be overridden per project
  ...DEFAULT_EDITOR_STATE,

  // ─── Playback ──────────────────────────────────────────────────────────
  setCurrentTime: (t) => set({ currentTime: t }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) }),
  setMuted: (v) => set({ isMuted: v }),
  setPlaybackSpeed: (v) => set({ playbackSpeed: v }),
  setDuration: (d) => set({ duration: d }),

  // ─── UI ──────────────────────────────────────────────────────────────────
  setActiveSidebarSection: (s: SidebarSection) =>
    set({ activeSidebarSection: s }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),
  setSelectedTextId: (id) => set({ selectedTextId: id }),
  setSelectedCaptionId: (id) => set({ selectedCaptionId: id }),
  setTimelineZoom: (z) => set({ timelineZoom: Math.max(1, Math.min(8, z)) }),
  setAspectRatio: (r) => set({ aspectRatio: r }),

  // ─── Color grading ───────────────────────────────────────────────────
  setColorGrading: (settings) =>
    set((state) => ({
      colorGrading: { ...state.colorGrading, ...settings },
      isDirty: true,
    })),
  resetColorGrading: () =>
    set({ colorGrading: DEFAULT_COLOR_GRADING, isDirty: true }),

  // ─── Video transform ──────────────────────────────────────────────────
  setVideoTransform: (t) =>
    set((state) => ({
      videoTransform: { ...state.videoTransform, ...t },
      isDirty: true,
    })),

  // ─── Transitions ────────────────────────────────────────────────────────
  setActiveTransition: (t) => set({ activeTransition: t }),
  setTransitionDuration: (d) => set({ transitionDuration: d }),
  setTransitionEasing: (e) => set({ transitionEasing: e }),

  // ─── Export ─────────────────────────────────────────────────────────────
  setExportProgress: (p) => set({ exportProgress: p }),
  setExportModalOpen: (v) => set({ exportModalOpen: v }),

  // ─── AI tools ────────────────────────────────────────────────────────────
  setAIToolState: (tool, state) =>
    set((s) => ({ aiToolStates: { ...s.aiToolStates, [tool]: state } })),

  startAITool: (name, durationMs) => {
    set((s) => ({
      aiToolStates: {
        ...s.aiToolStates,
        [name]: { loading: true, done: false, progress: 0 },
      },
    }));

    const stepMs = 100;
    const increment = (stepMs / durationMs) * 100;
    let progress = 0;

    const interval = setInterval(() => {
      progress = Math.min(100, progress + increment);
      const current = get().aiToolStates[name];
      if (!current?.loading) {
        clearInterval(interval);
        return;
      }
      if (progress >= 100) {
        clearInterval(interval);
        const mockResults: Record<string, string> = {
          captions: "8 captions generated (97% accuracy)",
          "background-removal": "Background removed (99.2% confidence)",
          "script-to-video": "6 clips generated, 45s cinematic reel",
          upscale: "Upscaled to 4K (400% enhancement)",
          "hook-generator": "5 viral hooks generated",
          retouch: "4 enhancements applied",
          "auto-reframe": "Subject centered (94% confidence)",
          "text-to-speech": "12.4s narration generated",
          "noise-reduction": "85% noise reduction applied",
          "auto-captions": "8 sentences, 124 words (96% accuracy)",
        };
        set((s) => ({
          aiToolStates: {
            ...s.aiToolStates,
            [name]: {
              loading: false,
              done: true,
              progress: 100,
              result: mockResults[name] ?? `${name} completed`,
            },
          },
        }));
      } else {
        set((s) => ({
          aiToolStates: {
            ...s.aiToolStates,
            [name]: { ...s.aiToolStates[name], progress },
          },
        }));
      }
    }, stepMs);
  },

  resetAITool: (name) =>
    set((s) => ({
      aiToolStates: {
        ...s.aiToolStates,
        [name]: { loading: false, done: false, progress: 0 },
      },
    })),

  // ─── Video clips ─────────────────────────────────────────────────────────
  addVideoClip: (clip) =>
    set((s) => ({
      videoClips: { ...s.videoClips, [clip.id]: clip },
      tracks: {
        ...s.tracks,
        [clip.trackId]: {
          ...s.tracks[clip.trackId],
          clips: [...(s.tracks[clip.trackId]?.clips ?? []), clip.id],
        },
      },
      isDirty: true,
    })),

  updateVideoClip: (id, updates) =>
    set((s) => ({
      videoClips: s.videoClips[id]
        ? { ...s.videoClips, [id]: { ...s.videoClips[id], ...updates } }
        : s.videoClips,
      isDirty: true,
    })),

  removeVideoClip: (id) =>
    set((s) => {
      const clip = s.videoClips[id];
      if (!clip) return {};
      const { [id]: _removed, ...rest } = s.videoClips;
      return {
        videoClips: rest,
        tracks: {
          ...s.tracks,
          [clip.trackId]: {
            ...s.tracks[clip.trackId],
            clips: s.tracks[clip.trackId]?.clips.filter((c) => c !== id) ?? [],
          },
        },
        selectedClipId: s.selectedClipId === id ? null : s.selectedClipId,
        isDirty: true,
      };
    }),

  // ─── Audio clips ─────────────────────────────────────────────────────────
  addAudioClip: (clip) =>
    set((s) => ({
      audioClips: { ...s.audioClips, [clip.id]: clip },
      tracks: {
        ...s.tracks,
        [clip.trackId]: {
          ...s.tracks[clip.trackId],
          clips: [...(s.tracks[clip.trackId]?.clips ?? []), clip.id],
        },
      },
      isDirty: true,
    })),

  updateAudioClip: (id, updates) =>
    set((s) => ({
      audioClips: s.audioClips[id]
        ? { ...s.audioClips, [id]: { ...s.audioClips[id], ...updates } }
        : s.audioClips,
      isDirty: true,
    })),

  removeAudioClip: (id) =>
    set((s) => {
      const clip = s.audioClips[id];
      if (!clip) return {};
      const { [id]: _removed, ...rest } = s.audioClips;
      return {
        audioClips: rest,
        tracks: {
          ...s.tracks,
          [clip.trackId]: {
            ...s.tracks[clip.trackId],
            clips: s.tracks[clip.trackId]?.clips.filter((c) => c !== id) ?? [],
          },
        },
        isDirty: true,
      };
    }),

  // ─── Text layers ─────────────────────────────────────────────────────────
  addTextLayer: (layer) =>
    set((s) => ({
      textLayers: { ...s.textLayers, [layer.id]: layer },
      tracks: {
        ...s.tracks,
        [layer.trackId]: {
          ...s.tracks[layer.trackId],
          clips: [...(s.tracks[layer.trackId]?.clips ?? []), layer.id],
        },
      },
      isDirty: true,
    })),

  updateTextLayer: (id, updates) =>
    set((s) => ({
      textLayers: s.textLayers[id]
        ? { ...s.textLayers, [id]: { ...s.textLayers[id], ...updates } }
        : s.textLayers,
      isDirty: true,
    })),

  removeTextLayer: (id) =>
    set((s) => {
      const layer = s.textLayers[id];
      if (!layer) return {};
      const { [id]: _removed, ...rest } = s.textLayers;
      return {
        textLayers: rest,
        tracks: {
          ...s.tracks,
          [layer.trackId]: {
            ...s.tracks[layer.trackId],
            clips: s.tracks[layer.trackId]?.clips.filter((c) => c !== id) ?? [],
          },
        },
        selectedTextId: s.selectedTextId === id ? null : s.selectedTextId,
        isDirty: true,
      };
    }),

  // ─── Caption layers ──────────────────────────────────────────────────────
  addCaptionLayer: (layer) =>
    set((s) => ({
      captionLayers: { ...s.captionLayers, [layer.id]: layer },
      isDirty: true,
    })),

  updateCaptionLayer: (id, updates) =>
    set((s) => ({
      captionLayers: s.captionLayers[id]
        ? { ...s.captionLayers, [id]: { ...s.captionLayers[id], ...updates } }
        : s.captionLayers,
      isDirty: true,
    })),

  removeCaptionLayer: (id) =>
    set((s) => {
      const { [id]: _removed, ...rest } = s.captionLayers;
      return {
        captionLayers: rest,
        selectedCaptionId:
          s.selectedCaptionId === id ? null : s.selectedCaptionId,
        isDirty: true,
      };
    }),

  // ─── Tracks ─────────────────────────────────────────────────────────────────
  addTrack: (track) =>
    set((s) => ({
      tracks: { ...s.tracks, [track.id]: track },
      trackOrder: [...s.trackOrder, track.id],
    })),

  updateTrack: (id, updates) =>
    set((s) => ({
      tracks: s.tracks[id]
        ? { ...s.tracks, [id]: { ...s.tracks[id], ...updates } }
        : s.tracks,
    })),

  removeTrack: (id) =>
    set((s) => {
      const { [id]: _removed, ...rest } = s.tracks;
      return { tracks: rest, trackOrder: s.trackOrder.filter((t) => t !== id) };
    }),

  reorderTracks: (from, to) =>
    set((s) => {
      const order = [...s.trackOrder];
      const [moved] = order.splice(from, 1);
      order.splice(to, 0, moved);
      return { trackOrder: order };
    }),

  // ─── Project ──────────────────────────────────────────────────────────────
  setProjectName: (name) => set({ projectName: name, isDirty: true }),
  setIsDirty: (v) => set({ isDirty: v }),

  // ─── History ────────────────────────────────────────────────────────────
  takeSnapshot: () =>
    set((s) => ({
      undoStack: [...s.undoStack.slice(-29), captureSnapshot(s)],
      redoStack: [],
    })),

  undo: () =>
    set((s) => {
      if (s.undoStack.length === 0) return {};
      const snap = s.undoStack[s.undoStack.length - 1];
      const currentSnap = captureSnapshot(s);
      return {
        ...applySnapshot(s, snap),
        undoStack: s.undoStack.slice(0, -1),
        redoStack: [...s.redoStack.slice(-29), currentSnap],
      };
    }),

  redo: () =>
    set((s) => {
      if (s.redoStack.length === 0) return {};
      const snap = s.redoStack[s.redoStack.length - 1];
      const currentSnap = captureSnapshot(s);
      return {
        ...applySnapshot(s, snap),
        redoStack: s.redoStack.slice(0, -1),
        undoStack: [...s.undoStack.slice(-29), currentSnap],
      };
    }),

  // ─── Persistence ──────────────────────────────────────────────────────────
  saveProject: () => {
    const s = get();
    const key = `elysian-editor-${s.projectId}`;
    const payload = {
      projectName: s.projectName,
      projectId: s.projectId,
      tracks: s.tracks,
      trackOrder: s.trackOrder,
      videoClips: s.videoClips,
      audioClips: s.audioClips,
      textLayers: s.textLayers,
      captionLayers: s.captionLayers,
      colorGrading: s.colorGrading,
      videoTransform: s.videoTransform,
      aspectRatio: s.aspectRatio,
      duration: s.duration,
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
      set({ isDirty: false, lastSavedAt: Date.now(), autosaveStatus: "saved" });
    } catch {
      // Storage full or unavailable — fail silently
    }
  },

  loadProject: (projectId: string) => {
    const key = `elysian-editor-${projectId}`;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw) as Partial<EditorState>;
      set({
        ...data,
        projectId,
        isDirty: false,
        isPlaying: false,
        currentTime: 0,
        undoStack: [],
        redoStack: [],
        autosaveStatus: "saved",
        lastSavedAt: Date.now(),
      });
    } catch {
      // Malformed data — ignore
    }
  },

  // ─── Autosave ───────────────────────────────────────────────────────────
  setAutosaveStatus: (status) => set({ autosaveStatus: status }),
}));
