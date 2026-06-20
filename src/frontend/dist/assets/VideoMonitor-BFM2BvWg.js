import { r as reactExports, j as jsxRuntimeExports } from "./vendor-80nuMd8G.js";
import { F as Film, aU as Music, J as Type, S as Sparkles, L as Layers, aV as Smile, aW as SlidersVertical, W as WandSparkles, aX as Captions, d as LayoutTemplate, $ as Star, H as Settings, c as LoaderCircle, k as Check, O as ChevronRight, U as Upload, aY as Music2, aZ as VolumeX, a_ as Volume2, T as Trash2, a$ as Volume, e as Plus, aQ as RotateCcw, z as ChevronDown, ae as GripVertical, aO as Copy, ah as Lock, ai as LockOpen, ag as EyeOff, af as Eye, a8 as AlignLeft, a9 as AlignCenter, aa as AlignRight, ac as AlignJustify, X, ao as ArrowRight, b0 as Activity, aL as ZoomIn, h as CircleCheck, b1 as MousePointerClick, a6 as FlipHorizontal, a7 as FlipVertical, Y as Crop, u as Undo2, v as Redo2, b2 as Save, D as Download, aJ as Play, b3 as SkipBack, b4 as Pause, b5 as SkipForward, b6 as Minimize2, i as Maximize2 } from "./ui-lib-DG52wkUx.js";
import { m as motion, A as AnimatePresence } from "./motion-DXodcWnX.js";
import { u as ue } from "./index-De5ctwPQ.js";
import { c as create } from "./react-9ph_Ps2d.js";
const SidebarSection = {
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
  Settings: "settings"
};
const DEFAULT_COLOR_GRADING = {
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
  fade: 0
};
const VIDEO_TRACK_ID = "track-video-1";
const AUDIO_TRACK_ID = "track-audio-1";
const TEXT_TRACK_ID$1 = "track-text-1";
const DEFAULT_EDITOR_STATE = {
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
      clips: []
    },
    [AUDIO_TRACK_ID]: {
      id: AUDIO_TRACK_ID,
      type: "audio",
      name: "Audio 1",
      locked: false,
      hidden: false,
      muted: false,
      height: 56,
      clips: []
    },
    [TEXT_TRACK_ID$1]: {
      id: TEXT_TRACK_ID$1,
      type: "text",
      name: "Text",
      locked: false,
      hidden: false,
      height: 48,
      clips: []
    }
  },
  trackOrder: [VIDEO_TRACK_ID, AUDIO_TRACK_ID, TEXT_TRACK_ID$1],
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
    cropH: 100
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
  autosaveStatus: "idle"
};
function captureSnapshot(state) {
  return {
    timestamp: Date.now(),
    videoClips: { ...state.videoClips },
    audioClips: { ...state.audioClips },
    textLayers: { ...state.textLayers },
    captionLayers: { ...state.captionLayers },
    tracks: { ...state.tracks },
    trackOrder: [...state.trackOrder]
  };
}
function applySnapshot(_state, snap) {
  return {
    videoClips: snap.videoClips,
    audioClips: snap.audioClips,
    textLayers: snap.textLayers,
    captionLayers: snap.captionLayers,
    tracks: snap.tracks,
    trackOrder: snap.trackOrder,
    isDirty: true
  };
}
const useVideoEditorStore = create((set, get) => ({
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
  setActiveSidebarSection: (s) => set({ activeSidebarSection: s }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),
  setSelectedTextId: (id) => set({ selectedTextId: id }),
  setSelectedCaptionId: (id) => set({ selectedCaptionId: id }),
  setTimelineZoom: (z) => set({ timelineZoom: Math.max(1, Math.min(8, z)) }),
  setAspectRatio: (r) => set({ aspectRatio: r }),
  // ─── Color grading ───────────────────────────────────────────────────
  setColorGrading: (settings) => set((state) => ({
    colorGrading: { ...state.colorGrading, ...settings },
    isDirty: true
  })),
  resetColorGrading: () => set({ colorGrading: DEFAULT_COLOR_GRADING, isDirty: true }),
  // ─── Video transform ──────────────────────────────────────────────────
  setVideoTransform: (t) => set((state) => ({
    videoTransform: { ...state.videoTransform, ...t },
    isDirty: true
  })),
  // ─── Transitions ────────────────────────────────────────────────────────
  setActiveTransition: (t) => set({ activeTransition: t }),
  setTransitionDuration: (d) => set({ transitionDuration: d }),
  setTransitionEasing: (e) => set({ transitionEasing: e }),
  // ─── Export ─────────────────────────────────────────────────────────────
  setExportProgress: (p) => set({ exportProgress: p }),
  setExportModalOpen: (v) => set({ exportModalOpen: v }),
  // ─── AI tools ────────────────────────────────────────────────────────────
  setAIToolState: (tool, state) => set((s) => ({ aiToolStates: { ...s.aiToolStates, [tool]: state } })),
  startAITool: (name, durationMs) => {
    set((s) => ({
      aiToolStates: {
        ...s.aiToolStates,
        [name]: { loading: true, done: false, progress: 0 }
      }
    }));
    const stepMs = 100;
    const increment = stepMs / durationMs * 100;
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(100, progress + increment);
      const current = get().aiToolStates[name];
      if (!(current == null ? void 0 : current.loading)) {
        clearInterval(interval);
        return;
      }
      if (progress >= 100) {
        clearInterval(interval);
        const mockResults = {
          captions: "8 captions generated (97% accuracy)",
          "background-removal": "Background removed (99.2% confidence)",
          "script-to-video": "6 clips generated, 45s cinematic reel",
          upscale: "Upscaled to 4K (400% enhancement)",
          "hook-generator": "5 viral hooks generated",
          retouch: "4 enhancements applied",
          "auto-reframe": "Subject centered (94% confidence)",
          "text-to-speech": "12.4s narration generated",
          "noise-reduction": "85% noise reduction applied",
          "auto-captions": "8 sentences, 124 words (96% accuracy)"
        };
        set((s) => ({
          aiToolStates: {
            ...s.aiToolStates,
            [name]: {
              loading: false,
              done: true,
              progress: 100,
              result: mockResults[name] ?? `${name} completed`
            }
          }
        }));
      } else {
        set((s) => ({
          aiToolStates: {
            ...s.aiToolStates,
            [name]: { ...s.aiToolStates[name], progress }
          }
        }));
      }
    }, stepMs);
  },
  resetAITool: (name) => set((s) => ({
    aiToolStates: {
      ...s.aiToolStates,
      [name]: { loading: false, done: false, progress: 0 }
    }
  })),
  // ─── Video clips ─────────────────────────────────────────────────────────
  addVideoClip: (clip) => set((s) => {
    var _a;
    return {
      videoClips: { ...s.videoClips, [clip.id]: clip },
      tracks: {
        ...s.tracks,
        [clip.trackId]: {
          ...s.tracks[clip.trackId],
          clips: [...((_a = s.tracks[clip.trackId]) == null ? void 0 : _a.clips) ?? [], clip.id]
        }
      },
      isDirty: true
    };
  }),
  updateVideoClip: (id, updates) => set((s) => ({
    videoClips: s.videoClips[id] ? { ...s.videoClips, [id]: { ...s.videoClips[id], ...updates } } : s.videoClips,
    isDirty: true
  })),
  removeVideoClip: (id) => set((s) => {
    var _a;
    const clip = s.videoClips[id];
    if (!clip) return {};
    const { [id]: _removed, ...rest } = s.videoClips;
    return {
      videoClips: rest,
      tracks: {
        ...s.tracks,
        [clip.trackId]: {
          ...s.tracks[clip.trackId],
          clips: ((_a = s.tracks[clip.trackId]) == null ? void 0 : _a.clips.filter((c) => c !== id)) ?? []
        }
      },
      selectedClipId: s.selectedClipId === id ? null : s.selectedClipId,
      isDirty: true
    };
  }),
  // ─── Audio clips ─────────────────────────────────────────────────────────
  addAudioClip: (clip) => set((s) => {
    var _a;
    return {
      audioClips: { ...s.audioClips, [clip.id]: clip },
      tracks: {
        ...s.tracks,
        [clip.trackId]: {
          ...s.tracks[clip.trackId],
          clips: [...((_a = s.tracks[clip.trackId]) == null ? void 0 : _a.clips) ?? [], clip.id]
        }
      },
      isDirty: true
    };
  }),
  updateAudioClip: (id, updates) => set((s) => ({
    audioClips: s.audioClips[id] ? { ...s.audioClips, [id]: { ...s.audioClips[id], ...updates } } : s.audioClips,
    isDirty: true
  })),
  removeAudioClip: (id) => set((s) => {
    var _a;
    const clip = s.audioClips[id];
    if (!clip) return {};
    const { [id]: _removed, ...rest } = s.audioClips;
    return {
      audioClips: rest,
      tracks: {
        ...s.tracks,
        [clip.trackId]: {
          ...s.tracks[clip.trackId],
          clips: ((_a = s.tracks[clip.trackId]) == null ? void 0 : _a.clips.filter((c) => c !== id)) ?? []
        }
      },
      isDirty: true
    };
  }),
  // ─── Text layers ─────────────────────────────────────────────────────────
  addTextLayer: (layer) => set((s) => {
    var _a;
    return {
      textLayers: { ...s.textLayers, [layer.id]: layer },
      tracks: {
        ...s.tracks,
        [layer.trackId]: {
          ...s.tracks[layer.trackId],
          clips: [...((_a = s.tracks[layer.trackId]) == null ? void 0 : _a.clips) ?? [], layer.id]
        }
      },
      isDirty: true
    };
  }),
  updateTextLayer: (id, updates) => set((s) => ({
    textLayers: s.textLayers[id] ? { ...s.textLayers, [id]: { ...s.textLayers[id], ...updates } } : s.textLayers,
    isDirty: true
  })),
  removeTextLayer: (id) => set((s) => {
    var _a;
    const layer = s.textLayers[id];
    if (!layer) return {};
    const { [id]: _removed, ...rest } = s.textLayers;
    return {
      textLayers: rest,
      tracks: {
        ...s.tracks,
        [layer.trackId]: {
          ...s.tracks[layer.trackId],
          clips: ((_a = s.tracks[layer.trackId]) == null ? void 0 : _a.clips.filter((c) => c !== id)) ?? []
        }
      },
      selectedTextId: s.selectedTextId === id ? null : s.selectedTextId,
      isDirty: true
    };
  }),
  // ─── Caption layers ──────────────────────────────────────────────────────
  addCaptionLayer: (layer) => set((s) => ({
    captionLayers: { ...s.captionLayers, [layer.id]: layer },
    isDirty: true
  })),
  updateCaptionLayer: (id, updates) => set((s) => ({
    captionLayers: s.captionLayers[id] ? { ...s.captionLayers, [id]: { ...s.captionLayers[id], ...updates } } : s.captionLayers,
    isDirty: true
  })),
  removeCaptionLayer: (id) => set((s) => {
    const { [id]: _removed, ...rest } = s.captionLayers;
    return {
      captionLayers: rest,
      selectedCaptionId: s.selectedCaptionId === id ? null : s.selectedCaptionId,
      isDirty: true
    };
  }),
  // ─── Tracks ─────────────────────────────────────────────────────────────────
  addTrack: (track) => set((s) => ({
    tracks: { ...s.tracks, [track.id]: track },
    trackOrder: [...s.trackOrder, track.id]
  })),
  updateTrack: (id, updates) => set((s) => ({
    tracks: s.tracks[id] ? { ...s.tracks, [id]: { ...s.tracks[id], ...updates } } : s.tracks
  })),
  removeTrack: (id) => set((s) => {
    const { [id]: _removed, ...rest } = s.tracks;
    return { tracks: rest, trackOrder: s.trackOrder.filter((t) => t !== id) };
  }),
  reorderTracks: (from, to) => set((s) => {
    const order = [...s.trackOrder];
    const [moved] = order.splice(from, 1);
    order.splice(to, 0, moved);
    return { trackOrder: order };
  }),
  // ─── Project ──────────────────────────────────────────────────────────────
  setProjectName: (name) => set({ projectName: name, isDirty: true }),
  setIsDirty: (v) => set({ isDirty: v }),
  // ─── History ────────────────────────────────────────────────────────────
  takeSnapshot: () => set((s) => ({
    undoStack: [...s.undoStack.slice(-29), captureSnapshot(s)],
    redoStack: []
  })),
  undo: () => set((s) => {
    if (s.undoStack.length === 0) return {};
    const snap = s.undoStack[s.undoStack.length - 1];
    const currentSnap = captureSnapshot(s);
    return {
      ...applySnapshot(s, snap),
      undoStack: s.undoStack.slice(0, -1),
      redoStack: [...s.redoStack.slice(-29), currentSnap]
    };
  }),
  redo: () => set((s) => {
    if (s.redoStack.length === 0) return {};
    const snap = s.redoStack[s.redoStack.length - 1];
    const currentSnap = captureSnapshot(s);
    return {
      ...applySnapshot(s, snap),
      redoStack: s.redoStack.slice(0, -1),
      undoStack: [...s.undoStack.slice(-29), currentSnap]
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
      duration: s.duration
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
      set({ isDirty: false, lastSavedAt: Date.now(), autosaveStatus: "saved" });
    } catch {
    }
  },
  loadProject: (projectId) => {
    const key = `elysian-editor-${projectId}`;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw);
      set({
        ...data,
        projectId,
        isDirty: false,
        isPlaying: false,
        currentTime: 0,
        undoStack: [],
        redoStack: [],
        autosaveStatus: "saved",
        lastSavedAt: Date.now()
      });
    } catch {
    }
  },
  // ─── Autosave ───────────────────────────────────────────────────────────
  setAutosaveStatus: (status) => set({ autosaveStatus: status })
}));
const SECTIONS = [
  { id: SidebarSection.Media, label: "Media", shortcut: "M", Icon: Film },
  { id: SidebarSection.Audio, label: "Audio", shortcut: "A", Icon: Music },
  { id: SidebarSection.Text, label: "Text", shortcut: "T", Icon: Type },
  {
    id: SidebarSection.Effects,
    label: "Effects",
    shortcut: "E",
    Icon: Sparkles
  },
  {
    id: SidebarSection.Transitions,
    label: "Transitions",
    shortcut: "X",
    Icon: Layers
  },
  {
    id: SidebarSection.Stickers,
    label: "Stickers",
    shortcut: "S",
    Icon: Smile
  },
  {
    id: SidebarSection.Filters,
    label: "Filters",
    shortcut: "F",
    Icon: SlidersVertical
  },
  { id: SidebarSection.AITools, label: "AI Tools", shortcut: "I", Icon: WandSparkles },
  {
    id: SidebarSection.Captions,
    label: "Captions",
    shortcut: "C",
    Icon: Captions
  },
  {
    id: SidebarSection.Templates,
    label: "Templates",
    shortcut: "P",
    Icon: LayoutTemplate
  },
  {
    id: SidebarSection.BrandKit,
    label: "Brand Kit",
    shortcut: "B",
    Icon: Star
  },
  {
    id: SidebarSection.Settings,
    label: "Settings",
    shortcut: ",",
    Icon: Settings
  }
];
function EditorLeftSidebar() {
  const { activeSidebarSection, setActiveSidebarSection } = useVideoEditorStore();
  const [hoveredId, setHoveredId] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "aside",
    {
      className: "flex flex-col items-center flex-shrink-0 py-2 gap-0.5 font-['Inter',sans-serif]",
      style: {
        width: 56,
        background: "#0F172A",
        borderRight: "1px solid rgba(255,255,255,0.05)"
      },
      "data-ocid": "editor-left-sidebar",
      children: SECTIONS.map(({ id, label, shortcut, Icon }) => {
        const isActive = activeSidebarSection === id;
        const isHovered = hoveredId === id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full flex justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: () => setActiveSidebarSection(id),
              onMouseEnter: () => setHoveredId(id),
              onMouseLeave: () => setHoveredId(null),
              whileHover: { scale: 1.08 },
              whileTap: { scale: 0.94 },
              className: "w-11 h-11 flex items-center justify-center rounded-xl transition-all relative",
              style: {
                background: isActive ? "rgba(37,99,235,0.18)" : isHovered ? "rgba(255,255,255,0.06)" : "transparent",
                border: isActive ? "1px solid rgba(37,99,235,0.45)" : "1px solid transparent",
                boxShadow: isActive ? "0 0 14px rgba(37,99,235,0.3)" : "none",
                color: isActive ? "#2563EB" : isHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)"
              },
              "data-ocid": `editor-sidebar-${id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isHovered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -6 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -6 },
              transition: { duration: 0.12 },
              className: "absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 pointer-events-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg whitespace-nowrap",
                    style: {
                      background: "rgba(15,23,42,0.98)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-medium text-white", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-mono px-1.5 py-0.5 rounded",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.4)"
                          },
                          children: shortcut
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent",
                    style: { borderRightColor: "rgba(15,23,42,0.98)" }
                  }
                )
              ]
            }
          ) })
        ] }, id);
      })
    }
  );
}
function makeId$1(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function formatTime(seconds, includeMs = false) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (includeMs) {
    const ms = Math.floor(seconds % 1 * 100);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function computeFilterString(grading) {
  const filters = [];
  const brightnessFactor = 1 + (grading.brightness + grading.exposure * 0.5) / 100;
  if (Math.abs(brightnessFactor - 1) > 1e-3) {
    filters.push(`brightness(${brightnessFactor.toFixed(3)})`);
  }
  const contrastFactor = 1 + (grading.contrast + grading.highlights * 0.2 - grading.shadows * 0.2) / 100;
  if (Math.abs(contrastFactor - 1) > 1e-3) {
    filters.push(`contrast(${contrastFactor.toFixed(3)})`);
  }
  const saturationFactor = 1 + (grading.saturation + grading.vibrance * 0.5) / 100;
  if (Math.abs(saturationFactor - 1) > 1e-3) {
    filters.push(`saturate(${saturationFactor.toFixed(3)})`);
  }
  if (Math.abs(grading.temperature) > 0.5) {
    if (grading.temperature > 0) {
      filters.push(`sepia(${(grading.temperature * 0.3).toFixed(3)})`);
      filters.push(`hue-rotate(${(-grading.temperature * 0.8).toFixed(1)}deg)`);
    } else {
      filters.push(`hue-rotate(${(-grading.temperature * 1.2).toFixed(1)}deg)`);
    }
  }
  if (Math.abs(grading.tint) > 0.5) {
    filters.push(`hue-rotate(${(grading.tint * 0.5).toFixed(1)}deg)`);
  }
  if (grading.blur > 0) {
    filters.push(`blur(${grading.blur.toFixed(1)}px)`);
  }
  if (grading.fade > 0) {
    filters.push(`brightness(${(1 + grading.fade * 3e-3).toFixed(3)})`);
    filters.push(`contrast(${(1 - grading.fade * 4e-3).toFixed(3)})`);
  }
  if (grading.sharpen > 0) {
    filters.push(`contrast(${(1 + grading.sharpen * 5e-3).toFixed(3)})`);
  }
  return filters.join(" ");
}
function computeTransformString(rotation, flipH, flipV) {
  const parts = [];
  if (rotation !== 0) parts.push(`rotate(${rotation}deg)`);
  const scaleX = flipH ? -1 : 1;
  const scaleY = flipV ? -1 : 1;
  if (scaleX !== 1 || scaleY !== 1) parts.push(`scale(${scaleX}, ${scaleY})`);
  return parts.join(" ") || "none";
}
const DEFAULT_VIDEO_TRACK_ID = "track-video-1";
const DEFAULT_AUDIO_TRACK_ID = "track-audio-1";
const DEFAULT_TEXT_TRACK_ID = "track-text-1";
function useVideoEditor(videoRef, audioRef) {
  const store = useVideoEditorStore();
  const rafRef = reactExports.useRef(null);
  const startRafLoop = reactExports.useCallback(() => {
    if (rafRef.current !== null) return;
    const tick = () => {
      const v = videoRef.current;
      if (!v) return;
      const t = v.currentTime;
      const storeTime = useVideoEditorStore.getState().currentTime;
      if (Math.abs(t - storeTime) > 5e-3) {
        useVideoEditorStore.getState().setCurrentTime(t);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [videoRef]);
  const stopRafLoop = reactExports.useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => () => stopRafLoop(), [stopRafLoop]);
  const applyFiltersToVideo = reactExports.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const { colorGrading, videoTransform } = useVideoEditorStore.getState();
    v.style.filter = computeFilterString(colorGrading);
    v.style.opacity = String(colorGrading.opacity / 100);
    v.style.transform = computeTransformString(
      videoTransform.rotation,
      videoTransform.flipH,
      videoTransform.flipV
    );
  }, [videoRef]);
  reactExports.useEffect(() => {
    const unsub = useVideoEditorStore.subscribe(() => applyFiltersToVideo());
    return unsub;
  }, [applyFiltersToVideo]);
  const play = reactExports.useCallback(async () => {
    const v = videoRef.current;
    if (!v || v.src === "" || v.readyState < 2) return;
    try {
      await v.play();
      store.setIsPlaying(true);
      startRafLoop();
    } catch {
    }
  }, [videoRef, store, startRafLoop]);
  const pause = reactExports.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    store.setIsPlaying(false);
    stopRafLoop();
    store.setCurrentTime(v.currentTime);
  }, [videoRef, store, stopRafLoop]);
  const togglePlay = reactExports.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void play();
    } else {
      pause();
    }
  }, [videoRef, play, pause]);
  const seekTo = reactExports.useCallback(
    (time) => {
      const v = videoRef.current;
      if (!v) return;
      const clamped = Math.max(0, Math.min(store.duration, time));
      v.currentTime = clamped;
      store.setCurrentTime(clamped);
    },
    [videoRef, store]
  );
  const stepFrame = reactExports.useCallback(
    (frames) => {
      seekTo(store.currentTime + frames / 30);
    },
    [seekTo, store.currentTime]
  );
  const rewind = reactExports.useCallback(() => seekTo(0), [seekTo]);
  const setSpeed = reactExports.useCallback(
    (speed) => {
      const v = videoRef.current;
      if (v) v.playbackRate = speed;
      store.setPlaybackSpeed(speed);
    },
    [videoRef, store]
  );
  const setVolume = reactExports.useCallback(
    (vol) => {
      const v = videoRef.current;
      if (v) v.volume = Math.max(0, Math.min(1, vol));
      store.setVolume(vol);
    },
    [videoRef, store]
  );
  const setMuted = reactExports.useCallback(
    (muted) => {
      const v = videoRef.current;
      if (v) v.muted = muted;
      store.setMuted(muted);
    },
    [videoRef, store]
  );
  const toggleFullscreen = reactExports.useCallback(
    (containerRef) => {
      const el = containerRef.current;
      if (!el) return;
      if (!document.fullscreenElement) {
        void el.requestFullscreen();
      } else {
        void document.exitFullscreen();
      }
    },
    []
  );
  const onVideoLoaded = reactExports.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    store.setDuration(v.duration);
    store.setCurrentTime(0);
    applyFiltersToVideo();
    const { videoClips } = useVideoEditorStore.getState();
    for (const clip of Object.values(videoClips)) {
      if (clip.src === v.src || clip.src === "") {
        useVideoEditorStore.getState().updateVideoClip(clip.id, {
          duration: v.duration,
          trimOut: v.duration
        });
        break;
      }
    }
  }, [videoRef, store, applyFiltersToVideo]);
  const onVideoEnded = reactExports.useCallback(() => {
    store.setIsPlaying(false);
    stopRafLoop();
    store.setCurrentTime(store.duration);
  }, [store, stopRafLoop]);
  const setRotation = reactExports.useCallback(
    (deg) => {
      store.setVideoTransform({ rotation: deg });
    },
    [store]
  );
  const flipHorizontal = reactExports.useCallback(() => {
    const { videoTransform } = useVideoEditorStore.getState();
    store.setVideoTransform({ flipH: !videoTransform.flipH });
  }, [store]);
  const flipVertical = reactExports.useCallback(() => {
    const { videoTransform } = useVideoEditorStore.getState();
    store.setVideoTransform({ flipV: !videoTransform.flipV });
  }, [store]);
  const addVideoFromFile = reactExports.useCallback(
    (file) => {
      const src = URL.createObjectURL(file);
      const tempVideo = document.createElement("video");
      tempVideo.preload = "metadata";
      tempVideo.src = src;
      tempVideo.onloadedmetadata = () => {
        const dur = tempVideo.duration || 0;
        const id = makeId$1("vclip");
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
            flipV: false
          },
          aspectRatio: "16:9",
          reversed: false,
          opacity: 1
        });
        store.setDuration(dur);
        store.setSelectedClipId(id);
        if (videoRef.current) {
          videoRef.current.src = src;
          videoRef.current.load();
        }
      };
    },
    [store, videoRef]
  );
  const addAudioFromFile = reactExports.useCallback(
    (file) => {
      const src = URL.createObjectURL(file);
      const tempAudio = document.createElement("audio");
      tempAudio.preload = "metadata";
      tempAudio.src = src;
      tempAudio.onloadedmetadata = () => {
        const dur = tempAudio.duration || 0;
        const id = makeId$1("aclip");
        store.takeSnapshot();
        const clip = {
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
          fadeOut: 0
        };
        store.addAudioClip(clip);
        if (audioRef == null ? void 0 : audioRef.current) {
          audioRef.current.src = src;
          audioRef.current.load();
        }
      };
    },
    [store, audioRef]
  );
  const splitClipAtPlayhead = reactExports.useCallback(
    (clipId) => {
      const { videoClips, currentTime } = useVideoEditorStore.getState();
      const clip = videoClips[clipId];
      if (!clip) return;
      const splitPoint = currentTime - clip.startTime;
      if (splitPoint <= clip.trimIn || splitPoint >= clip.duration - clip.trimOut)
        return;
      store.takeSnapshot();
      store.updateVideoClip(clipId, { trimOut: clip.duration - splitPoint });
      const newId = makeId$1("vclip");
      store.addVideoClip({
        ...clip,
        id: newId,
        name: `${clip.name} (2)`,
        startTime: currentTime,
        trimIn: splitPoint,
        trimOut: 0
      });
    },
    [store]
  );
  const deleteClip = reactExports.useCallback(
    (id, type) => {
      store.takeSnapshot();
      if (type === "video") store.removeVideoClip(id);
      else if (type === "audio") store.removeAudioClip(id);
      else if (type === "text") store.removeTextLayer(id);
      else if (type === "caption") store.removeCaptionLayer(id);
    },
    [store]
  );
  const duplicateClip = reactExports.useCallback(
    (id, type) => {
      const state = useVideoEditorStore.getState();
      store.takeSnapshot();
      if (type === "video") {
        const clip = state.videoClips[id];
        if (clip) {
          store.addVideoClip({
            ...clip,
            id: makeId$1("vclip"),
            name: `${clip.name} (copy)`,
            startTime: clip.startTime + 0.5
          });
        }
      } else if (type === "audio") {
        const clip = state.audioClips[id];
        if (clip) {
          store.addAudioClip({
            ...clip,
            id: makeId$1("aclip"),
            name: `${clip.name} (copy)`,
            startTime: clip.startTime + 0.5
          });
        }
      } else if (type === "text") {
        const layer = state.textLayers[id];
        if (layer) {
          store.addTextLayer({
            ...layer,
            id: makeId$1("text"),
            content: `${layer.content} (copy)`,
            position: { x: layer.position.x + 2, y: layer.position.y + 2 }
          });
        }
      } else if (type === "caption") {
        const layer = state.captionLayers[id];
        if (layer) {
          store.addCaptionLayer({ ...layer, id: makeId$1("cap") });
        }
      }
    },
    [store]
  );
  const trimClipIn = reactExports.useCallback(
    (id, newTrimIn) => {
      store.updateVideoClip(id, { trimIn: Math.max(0, newTrimIn) });
    },
    [store]
  );
  const trimClipOut = reactExports.useCallback(
    (id, newTrimOut) => {
      store.updateVideoClip(id, { trimOut: Math.max(0, newTrimOut) });
    },
    [store]
  );
  const moveClipOnTimeline = reactExports.useCallback(
    (id, newStartTime, snapInterval = 0) => {
      let snapped = Math.max(0, newStartTime);
      if (snapInterval > 0) {
        snapped = Math.round(snapped / snapInterval) * snapInterval;
      }
      store.updateVideoClip(id, { startTime: snapped });
    },
    [store]
  );
  const moveClipToTrack = reactExports.useCallback(
    (id, targetTrackId) => {
      store.updateVideoClip(id, { trackId: targetTrackId });
    },
    [store]
  );
  const addTextLayer = reactExports.useCallback(
    (content = "Your text here") => {
      const { currentTime, duration } = useVideoEditorStore.getState();
      const id = makeId$1("text");
      const layer = {
        id,
        type: "text",
        trackId: DEFAULT_TEXT_TRACK_ID,
        content,
        startTime: currentTime,
        endTime: duration > 0 ? Math.min(currentTime + 5, duration) : currentTime + 5,
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
          animation: "none"
        }
      };
      store.takeSnapshot();
      store.addTextLayer(layer);
      store.setSelectedTextId(id);
      return id;
    },
    [store]
  );
  const updateTextLayer = reactExports.useCallback(
    (id, updates) => {
      store.updateTextLayer(id, updates);
    },
    [store]
  );
  const deleteTextLayer = reactExports.useCallback(
    (id) => {
      store.takeSnapshot();
      store.removeTextLayer(id);
    },
    [store]
  );
  const duplicateTextLayer = reactExports.useCallback(
    (id) => duplicateClip(id, "text"),
    [duplicateClip]
  );
  const addCaptionLayer = reactExports.useCallback(
    (preset = "tiktok") => {
      const { currentTime, duration } = useVideoEditorStore.getState();
      const id = makeId$1("cap");
      const presetStyles = {
        tiktok: {
          fontFamily: "Inter",
          fontSize: 32,
          color: "#ffffff",
          background: { color: "#000000", borderRadius: 4, padding: 8 }
        },
        cinematic: {
          fontFamily: "Georgia",
          fontSize: 28,
          color: "#f5f0e0",
          glow: { color: "#ffffff", intensity: 0.3 }
        },
        minimal: { fontFamily: "Inter", fontSize: 24, color: "#ffffff" },
        glow: {
          fontFamily: "Inter",
          fontSize: 34,
          color: "#00ff00",
          glow: { color: "#00ff00", intensity: 0.6 }
        },
        custom: { fontFamily: "Inter", fontSize: 28, color: "#ffffff" }
      };
      const layer = {
        id,
        type: "caption",
        trackId: DEFAULT_TEXT_TRACK_ID,
        content: "Caption text here",
        startTime: currentTime,
        endTime: duration > 0 ? Math.min(currentTime + 3, duration) : currentTime + 3,
        position: { x: 50, y: 80 },
        size: { width: 80, height: 10 },
        preset,
        style: {
          fontFamily: "Inter",
          fontSize: 28,
          color: "#ffffff",
          ...presetStyles[preset]
        }
      };
      store.takeSnapshot();
      store.addCaptionLayer(layer);
      store.setSelectedCaptionId(id);
      return id;
    },
    [store]
  );
  const updateCaptionLayer = reactExports.useCallback(
    (id, updates) => {
      store.updateCaptionLayer(id, updates);
    },
    [store]
  );
  const deleteCaptionLayer = reactExports.useCallback(
    (id) => {
      store.takeSnapshot();
      store.removeCaptionLayer(id);
    },
    [store]
  );
  const applyTransition = reactExports.useCallback(
    (clipId, transition, duration) => {
      store.updateVideoClip(clipId, {
        transition: {
          type: transition,
          duration,
          easing: store.transitionEasing
        }
      });
    },
    [store]
  );
  const removeTransition = reactExports.useCallback(
    (clipId) => {
      store.updateVideoClip(clipId, {
        transition: { type: "none", duration: 0.5, easing: "ease-in-out" }
      });
    },
    [store]
  );
  const exportFrame = reactExports.useCallback(() => {
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
    a.download = `frame-${Math.floor(v.currentTime * 1e3)}ms.png`;
    a.click();
  }, [videoRef]);
  const startMockExport = reactExports.useCallback(
    (format, quality) => {
      const durationsByQuality = {
        "720p": 5e3,
        "1080p": 8e3,
        "2K": 12e3,
        "4K": 18e3
      };
      const totalMs = durationsByQuality[quality] ?? 8e3;
      const stepMs = 150;
      const increment = stepMs / totalMs * 100;
      let progress = 0;
      store.setExportProgress(0);
      const interval = setInterval(() => {
        progress = Math.min(100, progress + increment + Math.random() * 0.5);
        store.setExportProgress(Math.floor(progress));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => store.setExportProgress(null), 500);
          console.log(
            `[Export] ${format.toUpperCase()} ${quality} export complete`
          );
        }
      }, stepMs);
    },
    [store]
  );
  const saveProject = reactExports.useCallback(() => {
    store.saveProject();
  }, [store]);
  const loadProject = reactExports.useCallback(
    (projectId) => {
      store.loadProject(projectId);
    },
    [store]
  );
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      const { isDirty } = useVideoEditorStore.getState();
      if (isDirty) {
        store.setAutosaveStatus("saving");
        store.saveProject();
      }
    }, 3e4);
    return () => clearInterval(id);
  }, [store]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      var _a;
      const tag = (_a = e.target) == null ? void 0 : _a.tagName;
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
      } else if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault();
        store.undo();
      } else if ((e.key === "z" || e.key === "Z") && (e.ctrlKey || e.metaKey) && e.shiftKey) {
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
  const filterStyle = reactExports.useMemo(
    () => computeFilterString(store.colorGrading),
    [store.colorGrading]
  );
  const transformStyle = reactExports.useMemo(
    () => computeTransformString(
      store.videoTransform.rotation,
      store.videoTransform.flipH,
      store.videoTransform.flipV
    ),
    [store.videoTransform]
  );
  const visibleTextLayers = reactExports.useMemo(
    () => Object.values(store.textLayers).filter(
      (l) => !l.hidden && store.currentTime >= l.startTime && store.currentTime <= l.endTime
    ),
    [store.textLayers, store.currentTime]
  );
  const visibleCaptionLayers = reactExports.useMemo(
    () => Object.values(store.captionLayers).filter(
      (l) => store.currentTime >= l.startTime && store.currentTime <= l.endTime
    ),
    [store.captionLayers, store.currentTime]
  );
  const currentTimeFormatted = reactExports.useMemo(
    () => formatTime(store.currentTime, true),
    [store.currentTime]
  );
  const videoDurationFormatted = reactExports.useMemo(
    () => formatTime(store.duration),
    [store.duration]
  );
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
    videoDurationFormatted
  };
}
const AI_TOOLS = [
  {
    id: "captions",
    name: "Auto Captions",
    description: "Speech-to-text, 12+ languages",
    duration: 4e3,
    color: "#2563EB"
  },
  {
    id: "background-removal",
    name: "Background Removal",
    description: "One-click AI cutout",
    duration: 3e3,
    color: "#22C55E"
  },
  {
    id: "upscale",
    name: "AI Upscaler",
    description: "Enhance up to 4K quality",
    duration: 4e3,
    color: "#a855f7"
  },
  {
    id: "hook-generator",
    name: "Hook Generator",
    description: "Viral opening captions",
    duration: 3e3,
    color: "#f59e0b"
  },
  {
    id: "retouch",
    name: "AI Retouch",
    description: "Skin & face enhancement",
    duration: 3500,
    color: "#ec4899"
  },
  {
    id: "auto-reframe",
    name: "Auto Reframe",
    description: "Keep subject centered",
    duration: 2500,
    color: "#06b6d4"
  }
];
function AIToolsPanelSection() {
  const { aiToolStates, startAITool, resetAITool } = useVideoEditorStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/25", children: "AI-Powered Tools" }),
    AI_TOOLS.map((tool) => {
      const toolState = aiToolStates[tool.id];
      const isLoading = (toolState == null ? void 0 : toolState.loading) ?? false;
      const isDone = (toolState == null ? void 0 : toolState.done) ?? false;
      const status = isLoading ? "loading" : isDone ? "success" : "idle";
      const isError = false;
      const progress = (toolState == null ? void 0 : toolState.progress) ?? 0;
      const result = toolState == null ? void 0 : toolState.result;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 transition-all",
          style: {
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${status === "success" ? `${tool.color}40` : status === "loading" ? `${tool.color}25` : "rgba(255,255,255,0.06)"}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5",
                  style: {
                    background: `${tool.color}18`,
                    color: tool.color
                  },
                  children: status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { rotate: 360 },
                      transition: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.9,
                        ease: "linear"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4" })
                    }
                  ) : status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold text-white/85", children: tool.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/35 mt-0.5", children: tool.description }),
                status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: "auto" },
                    className: "mt-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-1 rounded-full overflow-hidden",
                          style: { background: "rgba(255,255,255,0.08)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "h-full rounded-full",
                              style: { background: tool.color },
                              initial: { width: 0 },
                              animate: { width: `${progress}%` },
                              transition: { ease: "easeOut" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "text-[10px] mt-1",
                          style: { color: tool.color },
                          children: [
                            "Processing… ",
                            Math.round(progress),
                            "%"
                          ]
                        }
                      )
                    ]
                  }
                ),
                status === "success" && !!result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    className: "mt-2 p-2 rounded-lg",
                    style: {
                      background: `${tool.color}10`,
                      border: `1px solid ${tool.color}25`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[10px] font-medium",
                          style: { color: tool.color },
                          children: "Done!"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/50 mt-0.5", children: result })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-2.5", children: status === "idle" || isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => startAITool(tool.id, tool.duration),
                className: "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all",
                style: {
                  background: `${tool.color}20`,
                  border: `1px solid ${tool.color}35`,
                  color: tool.color
                },
                "data-ocid": `editor-ai-tool-${tool.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-3 h-3" }),
                  "Run",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                ]
              }
            ) : status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => resetAITool(tool.id),
                className: "flex-1 py-1.5 rounded-lg text-[10px] font-medium text-white/30 hover:text-white/60 transition-all",
                style: {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)"
                },
                children: "Reset"
              }
            ) : null })
          ]
        },
        tool.id
      );
    })
  ] });
}
function formatDuration(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function WaveformBars({
  data,
  isPlaying
}) {
  const bars = 40;
  const heights = Array.from({ length: bars }, (_, i) => {
    if (data && data[i] !== void 0) return data[i];
    return 0.3 + 0.5 * Math.abs(Math.sin(i * 0.5)) + 0.1 * Math.abs(Math.sin(i * 1.3));
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-[1.5px] h-8", children: heights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 rounded-full",
      style: {
        height: `${Math.max(4, Math.min(100, h * 100))}%`,
        background: isPlaying && i % 3 === Math.floor(Date.now() / 120) % 3 ? "#22C55E" : "linear-gradient(180deg, #22C55E 0%, #16a34a 100%)",
        opacity: 0.7 + h * 0.3,
        animation: isPlaying ? `waveOsc ${0.3 + i % 5 * 0.08}s ease-in-out infinite alternate` : void 0
      }
    },
    i
  )) });
}
function AudioClipCard({
  clip,
  isPlaying,
  onUpdate,
  onRemove
}) {
  const volPct = Math.round(clip.volume * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-3 space-y-3",
      style: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)"
      },
      "data-ocid": `audio.clip.${clip.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/80 truncate", children: clip.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/35 mt-0.5", children: formatDuration(clip.duration) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onUpdate({ muted: !clip.muted }),
                className: "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                style: {
                  background: clip.muted ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
                  border: clip.muted ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  color: clip.muted ? "#ef4444" : "rgba(255,255,255,0.4)"
                },
                "data-ocid": `audio.mute_button.${clip.id}`,
                "aria-label": clip.muted ? "Unmute" : "Mute",
                children: clip.muted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 11 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onRemove,
                className: "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                style: {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.3)"
                },
                "aria-label": "Delete clip",
                "data-ocid": `audio.delete_button.${clip.id}`,
                onMouseEnter: (e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.color = "#ef4444";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WaveformBars, { data: clip.waveformData, isPlaying }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Volume, { size: 9, className: "text-white/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 uppercase tracking-wide", children: "Volume" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono", style: { color: "#22C55E" }, children: [
              volPct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative h-[3px] rounded-full",
              style: { background: "rgba(255,255,255,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute h-full rounded-full",
                    style: {
                      width: `${Math.min(100, volPct / 200 * 100)}%`,
                      background: "linear-gradient(90deg, rgba(34,197,94,0.4), #22C55E)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 200,
                    value: volPct,
                    onChange: (e) => onUpdate({ volume: Number(e.target.value) / 100 }),
                    className: "absolute inset-0 w-full opacity-0 cursor-pointer h-full",
                    style: { WebkitAppearance: "none" },
                    "data-ocid": `audio.volume_input.${clip.id}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none",
                    style: {
                      left: `calc(${Math.min(100, volPct / 200 * 100)}% - 6px)`,
                      background: "radial-gradient(circle, #22C55E 40%, #14532d 100%)",
                      boxShadow: "0 0 6px 2px rgba(34,197,94,0.4)"
                    }
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 uppercase tracking-wide", children: "Fade In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-white/40", children: [
              clip.fadeIn.toFixed(1),
              "s"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative h-[3px] rounded-full",
              style: { background: "rgba(255,255,255,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute h-full rounded-full",
                    style: {
                      width: `${clip.duration > 0 ? clip.fadeIn / clip.duration * 100 : 0}%`,
                      background: "rgba(37,99,235,0.5)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: Math.max(0.1, clip.duration),
                    step: 0.1,
                    value: clip.fadeIn,
                    onChange: (e) => onUpdate({ fadeIn: Number(e.target.value) }),
                    className: "absolute inset-0 w-full opacity-0 cursor-pointer h-full",
                    style: { WebkitAppearance: "none" },
                    "data-ocid": `audio.fadein_input.${clip.id}`
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 uppercase tracking-wide", children: "Fade Out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-white/40", children: [
              clip.fadeOut.toFixed(1),
              "s"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative h-[3px] rounded-full",
              style: { background: "rgba(255,255,255,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute h-full rounded-full",
                    style: {
                      width: `${clip.duration > 0 ? clip.fadeOut / clip.duration * 100 : 0}%`,
                      background: "rgba(37,99,235,0.5)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: Math.max(0.1, clip.duration),
                    step: 0.1,
                    value: clip.fadeOut,
                    onChange: (e) => onUpdate({ fadeOut: Number(e.target.value) }),
                    className: "absolute inset-0 w-full opacity-0 cursor-pointer h-full",
                    style: { WebkitAppearance: "none" },
                    "data-ocid": `audio.fadeout_input.${clip.id}`
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
const LIBRARY_TRACKS = [
  {
    name: "Cinematic Rise",
    duration: "2:34",
    genre: "Orchestral",
    category: "Cinematic"
  },
  {
    name: "Lo-Fi Chill Waves",
    duration: "3:12",
    genre: "Lo-Fi",
    category: "Lo-Fi"
  },
  {
    name: "Epic Drum Roll",
    duration: "1:58",
    genre: "Action",
    category: "Hip-Hop"
  },
  {
    name: "Neon City Nights",
    duration: "2:47",
    genre: "Electronic",
    category: "Pop"
  },
  {
    name: "Hip-Hop Groove",
    duration: "3:05",
    genre: "Hip-Hop",
    category: "Hip-Hop"
  },
  {
    name: "Ambient Glow",
    duration: "4:20",
    genre: "Ambient",
    category: "Lo-Fi"
  }
];
const LIBRARY_CATEGORIES = ["Trending", "Hip-Hop", "Pop", "Cinematic", "Lo-Fi"];
function AudioPanelSection() {
  const store = useVideoEditorStore();
  const audioClips = Object.values(store.audioClips);
  const isPlaying = store.isPlaying;
  const masterVolume = Math.round(store.volume * 100);
  const [activeCategory, setActiveCategory] = reactExports.useState("Trending");
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [addedTracks, setAddedTracks] = reactExports.useState(/* @__PURE__ */ new Set());
  const fileInputRef = reactExports.useRef(null);
  const handleFile = reactExports.useCallback(
    (file) => {
      const src = URL.createObjectURL(file);
      const tempAudio = document.createElement("audio");
      tempAudio.preload = "metadata";
      tempAudio.src = src;
      tempAudio.onloadedmetadata = () => {
        const dur = tempAudio.duration || 0;
        const id = makeId("aclip");
        store.addAudioClip({
          id,
          type: "audio",
          trackId: "track-audio-1",
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
          fadeOut: 0
        });
      };
    },
    [store]
  );
  const onDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file == null ? void 0 : file.type.startsWith("audio/")) handleFile(file);
    },
    [handleFile]
  );
  const handleLibraryAdd = (name) => {
    setAddedTracks((prev) => /* @__PURE__ */ new Set([...prev, name]));
    setTimeout(() => {
      setAddedTracks((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }, 2e3);
  };
  const filteredTracks = activeCategory === "Trending" ? LIBRARY_TRACKS : LIBRARY_TRACKS.filter((t) => t.category === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", style: { fontFamily: "Inter, sans-serif" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-3 space-y-2",
        style: {
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/30", children: "Master Volume" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[10px] font-mono",
                style: {
                  color: masterVolume > 0 ? "#22C55E" : "rgba(255,255,255,0.3)"
                },
                children: [
                  masterVolume,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative h-[3px] rounded-full",
              style: { background: "rgba(255,255,255,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute h-full rounded-full",
                    style: {
                      width: `${masterVolume}%`,
                      background: "linear-gradient(90deg, rgba(34,197,94,0.4), #22C55E)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: masterVolume,
                    onChange: (e) => store.setVolume(Number(e.target.value) / 100),
                    className: "absolute inset-0 w-full opacity-0 cursor-pointer h-full",
                    style: { WebkitAppearance: "none" },
                    "data-ocid": "audio.master_volume"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none",
                    style: {
                      left: `calc(${masterVolume}% - 6px)`,
                      background: "radial-gradient(circle, #22C55E 40%, #14532d 100%)",
                      boxShadow: "0 0 6px 2px rgba(34,197,94,0.4)"
                    }
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop,
        className: "rounded-xl p-3 cursor-pointer transition-all w-full text-left",
        style: {
          border: isDragging ? "1.5px dashed #22C55E" : "1.5px dashed rgba(255,255,255,0.1)",
          background: isDragging ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.02)"
        },
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        "aria-label": "Upload audio file",
        "data-ocid": "audio.upload_dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Upload,
              {
                className: "w-4 h-4",
                style: { color: isDragging ? "#22C55E" : "rgba(255,255,255,0.35)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[11px] font-medium",
                  style: {
                    color: isDragging ? "#22C55E" : "rgba(255,255,255,0.5)"
                  },
                  children: isDragging ? "Drop audio here" : "Upload audio / music"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/25 mt-0.5", children: "MP3, WAV, AAC, OGG" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "audio/*",
              className: "hidden",
              onChange: (e) => {
                var _a;
                const f = (_a = e.target.files) == null ? void 0 : _a[0];
                if (f) handleFile(f);
                e.target.value = "";
              },
              "data-ocid": "audio.upload_input"
            }
          )
        ]
      }
    ),
    audioClips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/30", children: [
        "Audio Tracks (",
        audioClips.length,
        ")"
      ] }),
      audioClips.map((clip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AudioClipCard,
        {
          clip,
          isPlaying,
          onUpdate: (updates) => store.updateAudioClip(clip.id, updates),
          onRemove: () => store.removeAudioClip(clip.id)
        },
        clip.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/30 mb-2", children: "Music Library (Demo)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-3 flex-wrap", children: LIBRARY_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(cat),
          className: "px-2 py-1 rounded-lg text-[10px] font-medium transition-all",
          style: {
            background: activeCategory === cat ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.05)",
            border: activeCategory === cat ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.07)",
            color: activeCategory === cat ? "#2563EB" : "rgba(255,255,255,0.45)"
          },
          "data-ocid": `audio.category.${cat.toLowerCase()}`,
          children: cat
        },
        cat
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredTracks.map((track, i) => {
        const added = addedTracks.has(track.name);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-2.5 rounded-xl transition-all",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            },
            "data-ocid": `audio.library-track.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                  style: {
                    background: "rgba(37,99,235,0.12)",
                    color: "#2563EB"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/75 truncate", children: track.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/30", children: [
                  track.genre,
                  " · ",
                  track.duration
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleLibraryAdd(track.name),
                  className: "flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all",
                  style: {
                    background: added ? "rgba(34,197,94,0.15)" : "rgba(37,99,235,0.15)",
                    border: added ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(37,99,235,0.25)",
                    color: added ? "#22C55E" : "#2563EB"
                  },
                  "data-ocid": `audio.library-add.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { size: 10 }),
                    added ? "Added!" : "+ Add"
                  ]
                }
              )
            ]
          },
          i
        );
      }) })
    ] })
  ] });
}
const ACCENT$1 = "#2563EB";
const GREEN$1 = "#22C55E";
const BORDER$1 = "rgba(255,255,255,0.06)";
const MUTED$1 = "rgba(255,255,255,0.4)";
const PRESET_CARDS = [
  {
    id: "tiktok",
    label: "TikTok",
    previewStyle: {
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 11,
      padding: "3px 7px",
      borderRadius: 4
    }
  },
  {
    id: "cinematic",
    label: "Cinematic",
    previewStyle: {
      color: "#f5f0e0",
      fontFamily: "Georgia, serif",
      fontStyle: "italic",
      fontSize: 10,
      letterSpacing: "0.06em"
    }
  },
  {
    id: "minimal",
    label: "Minimal",
    previewStyle: {
      color: "rgba(255,255,255,0.88)",
      fontFamily: "Inter",
      fontSize: 10
    }
  },
  {
    id: "glow",
    label: "Glow",
    previewStyle: {
      color: GREEN$1,
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 11,
      textShadow: `0 0 10px ${GREEN$1}`
    }
  }
];
const PRESET_DEFAULTS = {
  tiktok: {
    fontFamily: "Inter",
    fontSize: 22,
    color: "#ffffff",
    background: { color: "rgba(0,0,0,0.80)", borderRadius: 4, padding: 8 }
  },
  cinematic: { fontFamily: "Georgia, serif", fontSize: 16, color: "#f5f0e0" },
  minimal: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)"
  },
  glow: {
    fontFamily: "Inter",
    fontSize: 20,
    color: "#ffffff",
    glow: { color: GREEN$1, intensity: 80 }
  },
  custom: { fontFamily: "Inter", fontSize: 18, color: "#ffffff" }
};
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1);
  return `${String(m).padStart(2, "0")}:${sec.padStart(4, "0")}`;
}
function CaptionsPanel() {
  const store = useVideoEditorStore();
  const videoRef = reactExports.useRef(null);
  const editor = useVideoEditor(videoRef);
  const captionList = Object.values(store.captionLayers).sort(
    (a, b) => a.startTime - b.startTime
  );
  const selected = store.selectedCaptionId ? store.captionLayers[store.selectedCaptionId] : null;
  const handleAdd = () => editor.addCaptionLayer("tiktok");
  const handleDelete = (id) => editor.deleteCaptionLayer(id);
  const handleSelect = (id) => store.setSelectedCaptionId(store.selectedCaptionId === id ? null : id);
  const update = (id, patch) => store.updateCaptionLayer(id, patch);
  const updateStyle = (id, stylePatch) => {
    const cap = store.captionLayers[id];
    if (!cap) return;
    store.updateCaptionLayer(id, { style: { ...cap.style, ...stylePatch } });
  };
  const applyPreset = (id, preset) => {
    update(id, {
      preset,
      style: {
        fontFamily: "Inter",
        fontSize: 18,
        color: "#ffffff",
        ...PRESET_DEFAULTS[preset]
      }
    });
  };
  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: MUTED$1,
    marginBottom: 8
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-3 p-3 overflow-y-auto h-full font-['Inter',sans-serif]",
      style: { scrollbarWidth: "none" },
      "data-ocid": "captions_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-white/60", children: [
            captionList.length,
            " caption",
            captionList.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleAdd,
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all hover:brightness-110 active:scale-95",
              style: { background: ACCENT$1 },
              "data-ocid": "captions.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                "Add Caption"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: captionList.map((cap, i) => {
          const isSelected = store.selectedCaptionId === cap.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              layout: true,
              initial: { opacity: 0, y: -6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -6, scale: 0.96 },
              transition: { duration: 0.15 },
              className: "rounded-xl cursor-pointer transition-all",
              style: {
                background: isSelected ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${isSelected ? "rgba(37,99,235,0.4)" : BORDER$1}`
              },
              "data-ocid": `captions.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-2 px-3 py-2.5 w-full text-left",
                  onClick: () => handleSelect(cap.id),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Type,
                      {
                        size: 12,
                        style: {
                          color: isSelected ? ACCENT$1 : "rgba(255,255,255,0.3)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-white/80 truncate", children: cap.content || "(empty)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-mono", style: { color: MUTED$1 }, children: [
                        fmtTime(cap.startTime),
                        " → ",
                        fmtTime(cap.endTime)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[9px] px-1.5 py-0.5 rounded-md font-bold capitalize flex-shrink-0",
                        style: {
                          background: cap.preset === "glow" ? "rgba(34,197,94,0.12)" : "rgba(37,99,235,0.12)",
                          color: cap.preset === "glow" ? GREEN$1 : ACCENT$1
                        },
                        children: cap.preset
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => {
                          e.stopPropagation();
                          handleDelete(cap.id);
                        },
                        className: "w-6 h-6 flex items-center justify-center rounded-lg flex-shrink-0 transition-all hover:bg-red-500/20",
                        "data-ocid": `captions.delete_button.${i + 1}`,
                        "aria-label": "Delete caption",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11, style: { color: "#ef4444" } })
                      }
                    )
                  ]
                }
              )
            },
            cap.id
          );
        }) }),
        captionList.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2 py-10 rounded-xl",
            style: {
              background: "rgba(255,255,255,0.02)",
              border: `1px dashed ${BORDER$1}`
            },
            "data-ocid": "captions.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { size: 20, style: { color: "rgba(255,255,255,0.15)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px]", style: { color: MUTED$1 }, children: "No captions yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px]", style: { color: "rgba(255,255,255,0.2)" }, children: "Click “Add Caption” or use AI Captions" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            "data-ocid": "captions.editor-panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-3 space-y-4",
                style: {
                  background: "rgba(37,99,235,0.04)",
                  border: "1px solid rgba(37,99,235,0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...labelStyle, marginBottom: 0 }, children: "Edit Caption" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        className: "text-[10px]",
                        htmlFor: "captions-text-input",
                        style: { color: MUTED$1 },
                        children: "Text"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "captions-text-input",
                        value: selected.content,
                        onChange: (e) => update(selected.id, { content: e.target.value }),
                        rows: 2,
                        className: "w-full mt-1.5 px-3 py-2 rounded-xl text-[12px] text-white resize-none outline-none transition-all",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${BORDER$1}`,
                          fontFamily: "Inter, sans-serif"
                        },
                        placeholder: "Caption text...",
                        "data-ocid": "captions.text-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mb-1.5", style: { color: MUTED$1 }, children: "Timing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mt-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/30 mb-1", children: "Start (s)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "number",
                            min: 0,
                            step: 0.1,
                            value: selected.startTime.toFixed(1),
                            onChange: (e) => update(selected.id, {
                              startTime: Number(e.target.value)
                            }),
                            className: "w-full px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-white outline-none",
                            style: {
                              background: "rgba(255,255,255,0.06)",
                              border: `1px solid ${BORDER$1}`
                            },
                            "data-ocid": "captions.start-time"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/30 mb-1", children: "End (s)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "number",
                            min: 0,
                            step: 0.1,
                            value: selected.endTime.toFixed(1),
                            onChange: (e) => update(selected.id, { endTime: Number(e.target.value) }),
                            className: "w-full px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-white outline-none",
                            style: {
                              background: "rgba(255,255,255,0.06)",
                              border: `1px solid ${BORDER$1}`
                            },
                            "data-ocid": "captions.end-time"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-[9px] mt-1",
                        style: { color: "rgba(255,255,255,0.25)" },
                        children: [
                          "Duration:",
                          " ",
                          Math.max(0, selected.endTime - selected.startTime).toFixed(
                            1
                          ),
                          "s"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mb-1.5", style: { color: MUTED$1 }, children: "Preset Style" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mt-1.5", children: PRESET_CARDS.map((pc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => applyPreset(selected.id, pc.id),
                        className: "flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl transition-all hover:scale-[1.02]",
                        style: {
                          background: selected.preset === pc.id ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${selected.preset === pc.id ? "rgba(37,99,235,0.4)" : BORDER$1}`
                        },
                        "data-ocid": `captions.preset.${pc.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: pc.previewStyle, children: "Aa" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-[10px] font-semibold",
                              style: {
                                color: selected.preset === pc.id ? ACCENT$1 : "rgba(255,255,255,0.7)"
                              },
                              children: pc.label
                            }
                          )
                        ]
                      },
                      pc.id
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mb-2", style: { color: MUTED$1 }, children: "Style Controls" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40", children: "Font Size" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-white/50", children: [
                          selected.style.fontSize,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "range",
                          min: 10,
                          max: 60,
                          value: selected.style.fontSize,
                          onChange: (e) => updateStyle(selected.id, {
                            fontSize: Number(e.target.value)
                          }),
                          className: "w-full h-1.5 rounded-full cursor-pointer",
                          style: { accentColor: ACCENT$1 },
                          "data-ocid": "captions.font-size-slider"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40", children: "Text Color" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "color",
                          value: selected.style.color,
                          onChange: (e) => updateStyle(selected.id, { color: e.target.value }),
                          className: "w-8 h-6 rounded cursor-pointer",
                          style: { border: `1px solid ${BORDER$1}` },
                          "data-ocid": "captions.color-picker"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40", children: "Background" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            const hasBg = !!selected.style.background;
                            updateStyle(selected.id, {
                              background: hasBg ? void 0 : {
                                color: "rgba(0,0,0,0.75)",
                                borderRadius: 4,
                                padding: 6
                              }
                            });
                          },
                          className: "relative rounded-full transition-all",
                          style: {
                            background: selected.style.background ? ACCENT$1 : "rgba(255,255,255,0.12)",
                            width: 36,
                            height: 20
                          },
                          "data-ocid": "captions.bg-toggle",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow",
                              animate: {
                                left: selected.style.background ? "calc(100% - 16px)" : "2px"
                              },
                              transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                              }
                            }
                          )
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          },
          selected.id
        ) })
      ]
    }
  );
}
const SLIDERS = [
  { key: "exposure", label: "Exposure", min: -100, max: 100 },
  { key: "contrast", label: "Contrast", min: -100, max: 100 },
  { key: "saturation", label: "Saturation", min: -100, max: 100 },
  { key: "highlights", label: "Highlights", min: -100, max: 100 },
  { key: "shadows", label: "Shadows", min: -100, max: 100 },
  { key: "temperature", label: "Temperature", min: -100, max: 100 },
  { key: "tint", label: "Tint", min: -100, max: 100 },
  { key: "vibrance", label: "Vibrance", min: -100, max: 100 },
  { key: "sharpen", label: "Sharpen", min: 0, max: 100 },
  { key: "fade", label: "Fade", min: 0, max: 100 }
];
function ColorGradingSection() {
  const { colorGrading, setColorGrading } = useVideoEditorStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/25", children: "Color Grading" }),
    SLIDERS.map(({ key, label, min, max }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-[10px] font-mono",
            style: {
              color: colorGrading[key] !== 0 ? "#2563EB" : "rgba(255,255,255,0.3)"
            },
            children: [
              colorGrading[key] > 0 ? "+" : "",
              colorGrading[key]
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min,
          max,
          value: colorGrading[key],
          onChange: (e) => setColorGrading({ [key]: Number(e.target.value) }),
          className: "w-full h-1 accent-[#2563EB] cursor-pointer"
        }
      )
    ] }, key)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setColorGrading({
          exposure: 0,
          contrast: 0,
          saturation: 0,
          highlights: 0,
          shadows: 0,
          temperature: 0,
          tint: 0,
          sharpen: 0,
          fade: 0,
          vibrance: 0
        }),
        className: "mt-1 py-2 rounded-lg text-[11px] font-medium text-white/40 hover:text-white/70 transition-all",
        style: {
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)"
        },
        children: "Reset to Default"
      }
    )
  ] });
}
const COLOR_PRESETS = [
  {
    name: "Original",
    gradient: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    values: { ...DEFAULT_COLOR_GRADING }
  },
  {
    name: "Cinematic",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)",
    values: {
      brightness: -10,
      contrast: 20,
      saturation: -15,
      fade: 10,
      temperature: -5
    }
  },
  {
    name: "Warm",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #dc2626 100%)",
    values: { temperature: 25, saturation: 15, brightness: 5 }
  },
  {
    name: "Cool",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    values: { temperature: -25, saturation: 5, tint: 10 }
  },
  {
    name: "Vintage",
    gradient: "linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)",
    values: { saturation: -40, contrast: 20, fade: 25, brightness: -5 }
  },
  {
    name: "B&W",
    gradient: "linear-gradient(135deg, #111827 0%, #6b7280 50%, #f3f4f6 100%)",
    values: { saturation: -100, contrast: 15 }
  }
];
const VIDEO_EFFECTS = [
  {
    name: "Glitch",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    values: { saturation: 60, contrast: 40, tint: 20 }
  },
  {
    name: "VHS",
    gradient: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
    values: { saturation: -20, contrast: 15, fade: 20, blur: 0.5 }
  },
  {
    name: "RGB Split",
    gradient: "linear-gradient(135deg, #ef4444 0%, #22c55e 50%, #3b82f6 100%)",
    values: { saturation: 80, contrast: 30, temperature: -10 }
  },
  {
    name: "Motion Blur",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    values: { blur: 3, brightness: 5 }
  },
  {
    name: "Film Grain",
    gradient: "linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)",
    values: { saturation: -15, contrast: 25, fade: 12, brightness: -8 }
  },
  {
    name: "Neon Glow",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #ec4899 100%)",
    values: { saturation: 70, contrast: 35, vibrance: 50, temperature: -15 }
  }
];
const TRANSITIONS$1 = [
  { name: "Dissolve" },
  { name: "Zoom Blur" },
  { name: "Rotate" },
  { name: "Flash" },
  { name: "Warp" },
  { name: "Swipe" }
];
const STICKERS = [
  "🔥",
  "💥",
  "⚡",
  "✨",
  "🎯",
  "💎",
  "🚀",
  "🎬",
  "📸",
  "🎵",
  "💡",
  "🏆"
];
function EffectSlider({
  label,
  value,
  min,
  max,
  unit = "",
  onChange
}) {
  const range = max - min;
  const pct = (value - min) / range * 100;
  const isChanged = value !== 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 uppercase tracking-wide font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded min-w-[36px] text-right",
          style: {
            background: "rgba(255,255,255,0.06)",
            color: isChanged ? "#2563EB" : "rgba(255,255,255,0.35)"
          },
          children: [
            value > 0 ? `+${value}` : value,
            unit
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative h-[3px] rounded-full",
        style: { background: "rgba(255,255,255,0.08)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute h-full rounded-full",
              style: {
                width: `${pct}%`,
                background: isChanged ? "linear-gradient(90deg, rgba(37,99,235,0.4), #2563EB)" : "rgba(255,255,255,0.15)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min,
              max,
              value,
              onChange: (e) => onChange(Number(e.target.value)),
              className: "absolute inset-0 w-full opacity-0 cursor-pointer h-full",
              style: { WebkitAppearance: "none" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg pointer-events-none",
              style: {
                left: `calc(${pct}% - 6px)`,
                background: isChanged ? "radial-gradient(circle, #2563EB 40%, #1a1a2e 100%)" : "rgba(255,255,255,0.6)",
                boxShadow: isChanged ? "0 0 6px 2px rgba(37,99,235,0.5)" : "none"
              }
            }
          )
        ]
      }
    )
  ] });
}
function SectionHeader$1({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/30 mb-2", children });
}
function EffectsPanelSection({ section }) {
  const { colorGrading, setColorGrading, resetColorGrading } = useVideoEditorStore();
  const [activeEffect, setActiveEffect] = reactExports.useState(null);
  const [resetConfirm, setResetConfirm] = reactExports.useState(false);
  const set = (key) => (v) => setColorGrading({ [key]: v });
  const handleReset = () => {
    if (resetConfirm) {
      resetColorGrading();
      setActiveEffect(null);
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 2e3);
    }
  };
  const applyPreset = (preset) => {
    resetColorGrading();
    setColorGrading(preset.values);
    setActiveEffect(preset.name);
  };
  const applyVideoEffect = (effect) => {
    setColorGrading(effect.values);
    setActiveEffect(effect.name);
  };
  if (section === "stickers") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader$1, { children: "Stickers & Emojis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: STICKERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "aspect-square flex items-center justify-center text-2xl rounded-xl transition-all hover:scale-110",
          style: {
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)"
          },
          "data-ocid": `effects.sticker.${s}`,
          children: s
        },
        s
      )) })
    ] });
  }
  if (section === "transitions") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader$1, { children: "Transitions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: TRANSITIONS$1.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "flex items-center justify-center p-3 rounded-xl text-[11px] font-medium text-white/60 hover:text-white transition-all",
          style: {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.background = "rgba(37,99,235,0.1)";
            e.currentTarget.style.borderColor = "rgba(37,99,235,0.25)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          },
          "data-ocid": `effects.transition.${t.name.toLowerCase().replace(/\s+/g, "-")}`,
          children: t.name
        },
        t.name
      )) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-5", style: { fontFamily: "Inter, sans-serif" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader$1, { children: "Color Presets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: COLOR_PRESETS.map((preset) => {
        const isActive = activeEffect === preset.name;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => applyPreset(preset),
            className: "flex flex-col items-center gap-1.5 group",
            "data-ocid": `effects.preset.${preset.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full h-10 rounded-lg transition-all",
                  style: {
                    background: preset.gradient,
                    border: isActive ? "2px solid #2563EB" : "2px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? "0 0 10px rgba(37,99,235,0.4)" : void 0
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-medium transition-colors",
                  style: {
                    color: isActive ? "#2563EB" : "rgba(255,255,255,0.4)"
                  },
                  children: preset.name
                }
              )
            ]
          },
          preset.name
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader$1, { children: "Color & Lighting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Brightness",
            value: colorGrading.brightness,
            min: -100,
            max: 100,
            onChange: set("brightness")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Contrast",
            value: colorGrading.contrast,
            min: -100,
            max: 100,
            onChange: set("contrast")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Saturation",
            value: colorGrading.saturation,
            min: -100,
            max: 100,
            onChange: set("saturation")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Exposure",
            value: colorGrading.exposure,
            min: -50,
            max: 50,
            onChange: set("exposure")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Highlights",
            value: colorGrading.highlights,
            min: -50,
            max: 50,
            onChange: set("highlights")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Shadows",
            value: colorGrading.shadows,
            min: -50,
            max: 50,
            onChange: set("shadows")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Temperature",
            value: colorGrading.temperature,
            min: -50,
            max: 50,
            onChange: set("temperature")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Tint",
            value: colorGrading.tint,
            min: -50,
            max: 50,
            onChange: set("tint")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Vibrance",
            value: colorGrading.vibrance,
            min: -50,
            max: 50,
            onChange: set("vibrance")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Fade",
            value: colorGrading.fade,
            min: 0,
            max: 100,
            onChange: set("fade")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader$1, { children: "Transform" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Blur",
            value: colorGrading.blur,
            min: 0,
            max: 30,
            unit: "px",
            onChange: set("blur")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Opacity",
            value: colorGrading.opacity,
            min: 0,
            max: 100,
            unit: "%",
            onChange: set("opacity")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EffectSlider,
          {
            label: "Sharpen",
            value: colorGrading.sharpen,
            min: 0,
            max: 100,
            onChange: set("sharpen")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 10, className: "text-white/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader$1, { children: "Video Effects" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: VIDEO_EFFECTS.map((effect) => {
        const isActive = activeEffect === effect.name;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => applyVideoEffect(effect),
            className: "flex flex-col items-center gap-1.5",
            "data-ocid": `effects.video-effect.${effect.name.toLowerCase().replace(/\s+/g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-full h-10 rounded-lg transition-all",
                  style: {
                    background: effect.gradient,
                    border: isActive ? "2px solid #22C55E" : "2px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? "0 0 10px rgba(34,197,94,0.4)" : void 0
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-medium",
                  style: {
                    color: isActive ? "#22C55E" : "rgba(255,255,255,0.4)"
                  },
                  children: effect.name
                }
              )
            ]
          },
          effect.name
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleReset,
        className: "w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-semibold transition-all",
        style: {
          background: resetConfirm ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)",
          border: resetConfirm ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.08)",
          color: resetConfirm ? "#ef4444" : "rgba(255,255,255,0.4)"
        },
        "data-ocid": "effects.reset_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 12 }),
          resetConfirm ? "Confirm Reset?" : "Reset All Effects"
        ]
      }
    )
  ] });
}
const PLACEHOLDER_CONTENT = {
  [SidebarSection.Captions]: [
    "Upload a video and run Auto Captions from AI Tools to generate subtitles.",
    "Captions appear here and sync to the timeline automatically."
  ],
  [SidebarSection.Templates]: [
    "YouTube Thumbnail",
    "TikTok Cover",
    "Instagram Post",
    "Gaming Montage",
    "Podcast Clip",
    "Cinematic Reel",
    "Viral Hook",
    "Course Intro"
  ],
  [SidebarSection.BrandKit]: [
    "Upload your logo, set brand colors, and save your font preferences.",
    "Brand assets auto-apply to new text layers."
  ],
  [SidebarSection.Settings]: [
    "Auto-save: Every 30s",
    "Timeline snap: On",
    "Preview quality: 1080p",
    "Hardware acceleration: On"
  ]
};
function GenericPanelSection({
  section,
  label
}) {
  const items = PLACEHOLDER_CONTENT[section] ?? [];
  if (section === SidebarSection.Templates) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/25 mb-3", children: "Templates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: items.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "aspect-video flex items-center justify-center rounded-xl text-[10px] font-semibold text-center px-2 transition-all",
          style: {
            background: "rgba(37,99,235,0.06)",
            border: "1px solid rgba(37,99,235,0.15)",
            color: "rgba(255,255,255,0.6)"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.background = "rgba(37,99,235,0.12)";
            e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.background = "rgba(37,99,235,0.06)";
            e.currentTarget.style.borderColor = "rgba(37,99,235,0.15)";
          },
          children: name
        },
        name
      )) })
    ] });
  }
  if (section === SidebarSection.Settings) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/25", children: label }),
      items.map((item) => {
        const [key, value] = item.split(": ");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-2 border-b",
            style: { borderColor: "rgba(255,255,255,0.05)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-white/60", children: key }),
              value && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] font-medium px-2 py-0.5 rounded",
                  style: {
                    background: "rgba(34,197,94,0.1)",
                    color: "#22C55E"
                  },
                  children: value
                }
              )
            ]
          },
          item
        );
      })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/25", children: label }),
    items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-white/45 leading-relaxed", children: item }, item))
  ] });
}
const KIND_COLORS = {
  video: "#3b82f6",
  audio: "#22c55e",
  text: "#a78bfa",
  caption: "#f59e0b"
};
const KIND_BG = {
  video: "rgba(59,130,246,0.15)",
  audio: "rgba(34,197,94,0.15)",
  text: "rgba(167,139,250,0.15)",
  caption: "rgba(245,158,11,0.15)"
};
const KIND_LABELS = {
  video: "Video Layers",
  audio: "Audio Layers",
  text: "Text Layers",
  caption: "Captions"
};
const KIND_ORDER = ["video", "audio", "text", "caption"];
function KindIcon({ kind, size = 12 }) {
  const color = KIND_COLORS[kind];
  const style = { color, width: size, height: size };
  if (kind === "video") return /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { style });
  if (kind === "audio") return /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { style });
  if (kind === "text") return /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { style });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { style });
}
function InlineRename({ value, onCommit }) {
  const [draft, setDraft] = reactExports.useState(value);
  const commit = reactExports.useCallback(
    () => onCommit(draft.trim() || value),
    [draft, value, onCommit]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      value: draft,
      onChange: (e) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") onCommit(value);
        e.stopPropagation();
      },
      className: "flex-1 min-w-0 text-[11px] bg-transparent border-b outline-none text-white/90 py-px",
      style: { borderColor: "rgba(37,99,235,0.6)" }
    }
  );
}
function LayerRow({
  layer,
  isSelected,
  isDragOver,
  onSelect,
  onToggleHide,
  onToggleLock,
  onRename,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragOver,
  onDrop
}) {
  const [renaming, setRenaming] = reactExports.useState(false);
  const [hovered, setHovered] = reactExports.useState(false);
  const color = KIND_COLORS[layer.kind];
  const handleCommit = reactExports.useCallback(
    (name) => {
      setRenaming(false);
      onRename(name);
    },
    [onRename]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      draggable: true,
      onDragStart,
      onDragOver,
      onDrop,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer select-none transition-all",
      style: {
        background: isSelected ? `${KIND_BG[layer.kind]}` : hovered ? "rgba(255,255,255,0.04)" : "transparent",
        border: isSelected ? `1px solid ${color}60` : isDragOver ? "1px solid rgba(37,99,235,0.5)" : "1px solid transparent",
        boxShadow: isSelected ? `0 0 10px ${color}20` : "none",
        opacity: layer.hidden ? 0.4 : 1
      },
      "data-ocid": `layers.row.${layer.id}`,
      children: [
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 rounded-r",
            style: { background: color }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/20 hover:text-white/50 cursor-grab flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-3 h-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-5 h-5 rounded flex items-center justify-center flex-shrink-0",
            style: { background: KIND_BG[layer.kind] },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { kind: layer.kind, size: 11 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "flex-1 min-w-0 text-left",
            onClick: onSelect,
            children: renaming ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineRename, { value: layer.name, onCommit: handleCommit }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "block truncate text-[11px] font-medium cursor-text",
                style: {
                  color: layer.hidden ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.85)"
                },
                onDoubleClick: (e) => {
                  e.stopPropagation();
                  setRenaming(true);
                },
                children: layer.name
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-0.5 flex-shrink-0",
            style: { opacity: hovered || isSelected ? 1 : 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onDuplicate();
                  },
                  className: "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all",
                  title: "Duplicate",
                  "data-ocid": `layers.duplicate_button.${layer.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-2.5 h-2.5 text-white/40 hover:text-white/70" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onDelete();
                  },
                  className: "w-5 h-5 flex items-center justify-center rounded hover:bg-red-500/20 transition-all",
                  title: "Delete",
                  "data-ocid": `layers.delete_button.${layer.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-2.5 h-2.5 text-white/30 hover:text-red-400" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onToggleLock();
            },
            className: "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all flex-shrink-0",
            title: layer.locked ? "Unlock layer" : "Lock layer",
            "data-ocid": `layers.lock_button.${layer.id}`,
            children: layer.locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3", style: { color } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-3 h-3 text-white/25" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onToggleHide();
            },
            className: "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all flex-shrink-0",
            title: layer.hidden ? "Show layer" : "Hide layer",
            "data-ocid": `layers.visibility_button.${layer.id}`,
            children: layer.hidden ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3 text-white/25" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 text-white/50" })
          }
        )
      ]
    }
  );
}
function LayerGroup({
  kind,
  layers,
  collapsed,
  onToggleCollapse,
  children
}) {
  const color = KIND_COLORS[kind];
  const label = KIND_LABELS[kind];
  const count = layers.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onToggleCollapse,
        className: "w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/4 transition-all mb-1",
        "data-ocid": `layers.section.${kind}`,
        children: [
          collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-white/25" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-white/25" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { kind, size: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[9px] font-semibold uppercase tracking-wider",
              style: { color: "rgba(255,255,255,0.4)" },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full",
              style: { background: `${color}20`, color },
              children: count
            }
          )
        ]
      }
    ),
    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children })
  ] });
}
function LayersPanelSection() {
  const store = useVideoEditorStore();
  const dragIdRef = reactExports.useRef(null);
  const [dragOverId, setDragOverId] = reactExports.useState(null);
  const [collapsed, setCollapsed] = reactExports.useState({
    video: false,
    audio: false,
    text: false,
    caption: false
  });
  const byKind = {
    video: Object.values(store.videoClips).sort((a, b) => a.startTime - b.startTime).map((c) => ({
      id: c.id,
      kind: "video",
      name: c.name,
      startTime: c.startTime,
      hidden: c.hidden,
      locked: c.locked
    })),
    audio: Object.values(store.audioClips).sort((a, b) => a.startTime - b.startTime).map((c) => ({
      id: c.id,
      kind: "audio",
      name: c.name,
      startTime: c.startTime,
      hidden: c.hidden,
      locked: c.locked
    })),
    text: Object.values(store.textLayers).sort((a, b) => a.startTime - b.startTime).map((t) => ({
      id: t.id,
      kind: "text",
      name: t.content.slice(0, 20) || "Text Layer",
      startTime: t.startTime,
      hidden: t.hidden,
      locked: t.locked
    })),
    caption: Object.values(store.captionLayers).sort((a, b) => a.startTime - b.startTime).map((c) => ({
      id: c.id,
      kind: "caption",
      name: c.content.slice(0, 20) || "Caption",
      startTime: c.startTime,
      hidden: false,
      locked: false
    }))
  };
  const totalLayers = Object.values(byKind).reduce(
    (s, arr) => s + arr.length,
    0
  );
  const isSelected = (id, kind) => {
    if (kind === "video" || kind === "audio")
      return store.selectedClipId === id;
    if (kind === "text") return store.selectedTextId === id;
    return store.selectedCaptionId === id;
  };
  const handleSelect = (id, kind) => {
    if (kind === "video" || kind === "audio") {
      store.setSelectedClipId(id);
    } else if (kind === "text") {
      store.setSelectedTextId(id);
    } else {
      store.setSelectedCaptionId(id);
    }
  };
  const handleToggleHide = (id, kind, current) => {
    if (kind === "video") store.updateVideoClip(id, { hidden: !current });
    else if (kind === "audio") store.updateAudioClip(id, { hidden: !current });
    else if (kind === "text") store.updateTextLayer(id, { hidden: !current });
  };
  const handleToggleLock = (id, kind, current) => {
    if (kind === "video") store.updateVideoClip(id, { locked: !current });
    else if (kind === "audio") store.updateAudioClip(id, { locked: !current });
    else if (kind === "text") store.updateTextLayer(id, { locked: !current });
  };
  const handleRename = (id, kind, name) => {
    if (kind === "video") store.updateVideoClip(id, { name });
    else if (kind === "audio") store.updateAudioClip(id, { name });
  };
  const handleDelete = (id, kind) => {
    if (kind === "video") store.removeVideoClip(id);
    else if (kind === "audio") store.removeAudioClip(id);
    else if (kind === "text") store.removeTextLayer(id);
    else store.removeCaptionLayer(id);
  };
  const handleDuplicate = (id, kind) => {
    var _a, _b;
    const newId = `${id}-copy-${Date.now()}`;
    if (kind === "video") {
      const clip = store.videoClips[id];
      if (clip)
        store.addVideoClip({
          ...clip,
          id: newId,
          name: `${clip.name} (Copy)`,
          startTime: clip.startTime + 0.5
        });
    } else if (kind === "audio") {
      const clip = store.audioClips[id];
      if (clip)
        store.addAudioClip({
          ...clip,
          id: newId,
          name: `${clip.name} (Copy)`,
          startTime: clip.startTime + 0.5
        });
    } else if (kind === "text") {
      const layer = store.textLayers[id];
      if (layer)
        store.addTextLayer({
          ...layer,
          id: newId,
          position: {
            x: (((_a = layer.position) == null ? void 0 : _a.x) ?? 50) + 3,
            y: (((_b = layer.position) == null ? void 0 : _b.y) ?? 50) + 3
          }
        });
    } else if (kind === "caption") {
      const layer = store.captionLayers[id];
      if (layer)
        store.addCaptionLayer({
          ...layer,
          id: newId,
          startTime: layer.startTime + 0.5
        });
    }
  };
  const handleDragStart = (id) => (e) => {
    dragIdRef.current = id;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (id) => (e) => {
    e.preventDefault();
    setDragOverId(id);
  };
  const handleDrop = () => {
    setDragOverId(null);
    dragIdRef.current = null;
  };
  const toggleCollapse = (kind) => setCollapsed((prev) => ({ ...prev, [kind]: !prev[kind] }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full overflow-y-auto p-3",
      style: {
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.08) transparent",
        fontFamily: "Inter, sans-serif"
      },
      "data-ocid": "layers_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/30", children: "Layers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-semibold px-2 py-0.5 rounded-full",
              style: { background: "rgba(37,99,235,0.15)", color: "#3b82f6" },
              children: totalLayers
            }
          )
        ] }),
        totalLayers === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 flex flex-col items-center justify-center gap-2 text-center py-10",
            "data-ocid": "layers.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center",
                  style: {
                    background: "rgba(37,99,235,0.08)",
                    border: "1px dashed rgba(37,99,235,0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Film,
                    {
                      className: "w-5 h-5",
                      style: { color: "rgba(37,99,235,0.5)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/30 leading-tight", children: [
                "No layers yet",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/20", children: "Upload a video to get started" })
              ] })
            ]
          }
        ),
        KIND_ORDER.map((kind) => {
          const layers = byKind[kind];
          if (layers.length === 0) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            LayerGroup,
            {
              kind,
              layers,
              collapsed: collapsed[kind],
              onToggleCollapse: () => toggleCollapse(kind),
              children: layers.map((layer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                LayerRow,
                {
                  layer,
                  isSelected: isSelected(layer.id, layer.kind),
                  isDragOver: dragOverId === layer.id,
                  onSelect: () => handleSelect(layer.id, layer.kind),
                  onToggleHide: () => handleToggleHide(layer.id, layer.kind, layer.hidden),
                  onToggleLock: () => handleToggleLock(layer.id, layer.kind, layer.locked),
                  onRename: (name) => handleRename(layer.id, layer.kind, name),
                  onDelete: () => handleDelete(layer.id, layer.kind),
                  onDuplicate: () => handleDuplicate(layer.id, layer.kind),
                  onDragStart: handleDragStart(layer.id),
                  onDragOver: handleDragOver(layer.id),
                  onDrop: handleDrop
                },
                layer.id
              ))
            },
            kind
          );
        })
      ]
    }
  );
}
function MediaPanelSection({
  videoSrc,
  onLoadFile
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: "flex flex-col items-center justify-center gap-3 p-6 rounded-xl cursor-pointer transition-all group",
        style: {
          border: "1.5px dashed rgba(37,99,235,0.3)",
          background: "rgba(37,99,235,0.04)"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)";
          e.currentTarget.style.background = "rgba(37,99,235,0.08)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
          e.currentTarget.style.background = "rgba(37,99,235,0.04)";
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 flex items-center justify-center rounded-xl",
              style: { background: "rgba(37,99,235,0.15)", color: "#2563EB" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold text-white/70", children: "Upload Video" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mt-0.5", children: "MP4, MOV, WebM up to 2GB" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "video/*",
              className: "hidden",
              onChange: (e) => {
                var _a;
                const f = (_a = e.target.files) == null ? void 0 : _a[0];
                if (f) onLoadFile(f);
              },
              "data-ocid": "editor-media-upload"
            }
          )
        ]
      }
    ),
    videoSrc && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-3 rounded-xl",
        style: {
          background: "rgba(34,197,94,0.06)",
          border: "1px solid rgba(34,197,94,0.2)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 flex items-center justify-center rounded-lg",
              style: { background: "rgba(34,197,94,0.15)", color: "#22C55E" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold text-white/80 truncate", children: "Video loaded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30", children: "Ready to edit" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/25 mb-2", children: "Stock footage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["Nature", "City", "Abstract", "Business"].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "aspect-video rounded-lg flex items-center justify-center text-[10px] font-medium",
          style: {
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.3)",
            border: "1px solid rgba(255,255,255,0.06)"
          },
          children: name
        },
        name
      )) })
    ] })
  ] });
}
const PRESET_FONTS = [
  "Inter",
  "Poppins",
  "Bebas Neue",
  "Anton",
  "Montserrat",
  "Oswald",
  "Plus Jakarta Sans"
];
const TEXT_TRACK_ID = "track-text-1";
const ANIMATION_PRESETS = [
  { id: "none", label: "None", Icon: X },
  { id: "fade-in", label: "Fade In", Icon: Eye },
  { id: "slide-in", label: "Slide In", Icon: ArrowRight },
  { id: "bounce", label: "Bounce", Icon: Activity },
  { id: "zoom", label: "Zoom", Icon: ZoomIn },
  { id: "typewriter", label: "Typewriter", Icon: Type },
  { id: "blur-reveal", label: "Blur Reveal", Icon: Sparkles }
];
const STYLE_PRESETS = [
  {
    id: "youtube",
    label: "YouTube",
    preview: "#FFF",
    style: {
      fontFamily: "Anton",
      fontSize: 64,
      fontWeight: "900",
      color: "#ffffff",
      textShadow: { offsetX: 3, offsetY: 3, blur: 8, color: "#000000" },
      letterSpacing: 0.02,
      opacity: 1
    }
  },
  {
    id: "glow",
    label: "Glow",
    preview: "#22C55E",
    style: {
      fontFamily: "Montserrat",
      fontSize: 48,
      fontWeight: "700",
      color: "#22C55E",
      glow: { color: "#22C55E", intensity: 80, spread: 20 },
      opacity: 1
    }
  },
  {
    id: "cinematic",
    label: "Cinematic",
    preview: "#E2E8F0",
    style: {
      fontFamily: "Plus Jakarta Sans",
      fontSize: 36,
      fontWeight: "300",
      color: "#e2e8f0",
      letterSpacing: 0.3,
      textShadow: {
        offsetX: 0,
        offsetY: 2,
        blur: 12,
        color: "rgba(0,0,0,0.6)"
      },
      opacity: 1
    }
  },
  {
    id: "tiktok",
    label: "TikTok",
    preview: "#fff",
    style: {
      fontFamily: "Inter",
      fontSize: 40,
      fontWeight: "700",
      color: "#ffffff",
      background: {
        enabled: true,
        color: "#000000",
        borderRadius: 6,
        padding: 10
      },
      opacity: 1
    }
  },
  {
    id: "minimal",
    label: "Minimal",
    preview: "#94A3B8",
    style: {
      fontFamily: "Inter",
      fontSize: 24,
      fontWeight: "400",
      color: "#94a3b8",
      letterSpacing: 0.02,
      opacity: 0.9
    }
  }
];
function SectionHeader({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2", children: label });
}
function ControlRow({
  label,
  right,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40", children: label }),
      right && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50", children: right })
    ] }),
    children
  ] });
}
function Toggle({
  enabled,
  onToggle,
  label,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onToggle,
        "data-ocid": dataOcid,
        className: "relative w-9 h-5 rounded-full transition-all flex-shrink-0",
        style: {
          background: enabled ? "#2563EB" : "rgba(255,255,255,0.1)"
        },
        "aria-pressed": enabled,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
            style: { left: enabled ? "calc(100% - 18px)" : "2px" }
          }
        )
      }
    )
  ] });
}
function ColorInput({ value, onChange, dataOcid }) {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = ref.current) == null ? void 0 : _a.click();
        },
        "data-ocid": dataOcid,
        className: "w-7 h-7 rounded-md border border-white/10 flex-shrink-0 cursor-pointer",
        style: { background: value },
        "aria-label": "Pick color"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        type: "color",
        value,
        onChange: (e) => onChange(e.target.value),
        className: "sr-only",
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => {
          const v = e.target.value;
          if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
        },
        maxLength: 7,
        className: "flex-1 px-2 py-1 rounded-md text-[11px] font-mono text-white/70 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50",
        style: {
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)"
        }
      }
    )
  ] });
}
function StyledSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "range",
      min,
      max,
      step,
      value,
      onChange: (e) => onChange(Number(e.target.value)),
      "data-ocid": dataOcid,
      className: "w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#2563EB]",
      style: { accentColor: "#2563EB" }
    }
  );
}
function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "number",
      value,
      min,
      max,
      step,
      onChange: (e) => onChange(Number(e.target.value)),
      "data-ocid": dataOcid,
      className: "w-full px-2 py-1.5 rounded-lg text-[11px] text-white/80 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50",
      style: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)"
      }
    }
  );
}
const INPUT_BASE = "px-2.5 py-1.5 rounded-lg text-[12px] text-white/90 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50 w-full";
const INPUT_STYLE = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)"
};
function TextPanelSection() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const textLayers = useVideoEditorStore((s2) => Object.values(s2.textLayers));
  const selectedTextId = useVideoEditorStore((s2) => s2.selectedTextId);
  const duration = useVideoEditorStore((s2) => s2.duration);
  const addTextLayer = useVideoEditorStore((s2) => s2.addTextLayer);
  const updateTextLayer = useVideoEditorStore((s2) => s2.updateTextLayer);
  const removeTextLayer = useVideoEditorStore((s2) => s2.removeTextLayer);
  const setSelectedTextId = useVideoEditorStore((s2) => s2.setSelectedTextId);
  const [showShadow, setShowShadow] = reactExports.useState(false);
  const [showGlow, setShowGlow] = reactExports.useState(false);
  const [showGradient, setShowGradient] = reactExports.useState(false);
  const selected = textLayers.find((t) => t.id === selectedTextId) ?? null;
  const s = selected == null ? void 0 : selected.style;
  const updateStyle = (patch) => {
    if (!selected) return;
    updateTextLayer(selected.id, {
      style: { ...selected.style, ...patch }
    });
  };
  const handleAddText = () => {
    const id = `text-${Date.now()}`;
    const layer = {
      id,
      type: "text",
      trackId: TEXT_TRACK_ID,
      content: "New Text",
      startTime: 0,
      endTime: Math.max(duration, 5),
      position: { x: 50, y: 50 },
      size: { width: 300, height: 60 },
      rotation: 0,
      locked: false,
      hidden: false,
      style: {
        fontFamily: "Inter",
        fontSize: 40,
        fontWeight: "700",
        color: "#ffffff",
        opacity: 1,
        textAlign: "center",
        letterSpacing: 0,
        lineHeight: 1.2,
        animation: "none"
      }
    };
    addTextLayer(layer);
    setSelectedTextId(id);
  };
  const handleDuplicate = (layer) => {
    const id = `text-${Date.now()}`;
    addTextLayer({
      ...layer,
      id,
      position: { x: layer.position.x + 20, y: layer.position.y + 20 }
    });
    setSelectedTextId(id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-0 text-white",
      style: { fontFamily: "Inter, sans-serif" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleAddText,
            "data-ocid": "editor.text.add_button",
            className: "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[12px] font-semibold text-white transition-all hover:scale-[1.02] active:scale-95",
            style: {
              background: "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(34,197,94,0.12))",
              border: "1px solid rgba(37,99,235,0.35)",
              boxShadow: "0 2px 12px rgba(37,99,235,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Text"
            ]
          }
        ) }),
        textLayers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Layers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: textLayers.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedTextId(t.id),
              "data-ocid": `editor.text.item.${i + 1}`,
              className: "flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-all w-full text-left",
              style: {
                background: selectedTextId === t.id ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selectedTextId === t.id ? "rgba(37,99,235,0.35)" : "rgba(255,255,255,0.05)"}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Type,
                  {
                    className: "w-3.5 h-3.5 flex-shrink-0",
                    style: {
                      color: selectedTextId === t.id ? "#2563EB" : "rgba(255,255,255,0.35)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-[11px] font-medium text-white/70 truncate", children: (t.content || "Empty").slice(0, 30) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/25 flex-shrink-0", children: [
                  t.startTime.toFixed(1),
                  "s"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      handleDuplicate(t);
                    },
                    className: "w-5 h-5 flex items-center justify-center rounded text-white/20 hover:text-blue-400 transition-colors",
                    "aria-label": "Duplicate layer",
                    "data-ocid": `editor.text.duplicate_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      removeTextLayer(t.id);
                    },
                    className: "w-5 h-5 flex items-center justify-center rounded text-white/20 hover:text-red-400 transition-colors",
                    "aria-label": "Delete layer",
                    "data-ocid": `editor.text.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            t.id
          )) })
        ] }),
        textLayers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "editor.text.empty_state",
            className: "mx-3 mb-2 p-4 rounded-xl text-center",
            style: {
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.08)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "w-6 h-6 text-white/20 mx-auto mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/25", children: "No text layers yet" })
            ]
          }
        ),
        selected && s && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mx-3 mb-3 h-px",
              style: { background: "rgba(255,255,255,0.06)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "text-content-input",
                type: "text",
                value: selected.content,
                onChange: (e) => updateTextLayer(selected.id, { content: e.target.value }),
                className: INPUT_BASE,
                style: INPUT_STYLE,
                "data-ocid": "editor.text.content_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Timing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 block", children: "Start (s)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NumberInput,
                  {
                    value: selected.startTime,
                    onChange: (v) => updateTextLayer(selected.id, { startTime: v }),
                    min: 0,
                    step: 0.1,
                    dataOcid: "editor.text.start_time_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 block", children: "End (s)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NumberInput,
                  {
                    value: selected.endTime,
                    onChange: (v) => updateTextLayer(selected.id, { endTime: v }),
                    min: 0,
                    step: 0.1,
                    dataOcid: "editor.text.end_time_input"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Typography" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 block", children: "Font Family" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: s.fontFamily ?? "Inter",
                    onChange: (e) => updateStyle({ fontFamily: e.target.value }),
                    className: INPUT_BASE,
                    style: { ...INPUT_STYLE, color: "rgba(255,255,255,0.8)" },
                    "data-ocid": "editor.text.font_family_select",
                    children: PRESET_FONTS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, style: { background: "#0F172A" }, children: f }, f))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ControlRow, { label: "Font Size", right: `${s.fontSize ?? 40}px`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StyledSlider,
                  {
                    min: 8,
                    max: 120,
                    value: s.fontSize ?? 40,
                    onChange: (v) => updateStyle({ fontSize: v }),
                    dataOcid: "editor.text.font_size_slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    value: s.fontSize ?? 40,
                    min: 8,
                    max: 120,
                    onChange: (e) => updateStyle({ fontSize: Number(e.target.value) }),
                    className: "w-14 px-1.5 py-1 rounded text-[11px] text-white/80 text-center focus:outline-none",
                    style: INPUT_STYLE
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 block", children: "Font Weight" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: ["300", "400", "700", "900"].map((w) => {
                  const labels = {
                    "300": "Light",
                    "400": "Normal",
                    "700": "Bold",
                    "900": "Extra"
                  };
                  const active = (s.fontWeight ?? "700") === w;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateStyle({ fontWeight: w }),
                      "data-ocid": `editor.text.font_weight_${w}`,
                      className: "py-1.5 rounded-lg text-[10px] font-medium transition-all",
                      style: {
                        background: active ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                        color: active ? "#60a5fa" : "rgba(255,255,255,0.4)"
                      },
                      children: labels[w]
                    },
                    w
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 block", children: "Alignment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: [
                  { v: "left", Icon: AlignLeft },
                  { v: "center", Icon: AlignCenter },
                  { v: "right", Icon: AlignRight },
                  { v: "justify", Icon: AlignJustify }
                ].map(({ v, Icon }) => {
                  const active = (s.textAlign ?? "center") === v;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateStyle({
                        textAlign: v
                      }),
                      "data-ocid": `editor.text.align_${v}`,
                      className: "flex items-center justify-center py-1.5 rounded-lg transition-all",
                      style: {
                        background: active ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                        color: active ? "#60a5fa" : "rgba(255,255,255,0.35)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
                    },
                    v
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlRow,
                {
                  label: "Letter Spacing",
                  right: `${(s.letterSpacing ?? 0).toFixed(1)}em`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StyledSlider,
                    {
                      min: -2,
                      max: 5,
                      step: 0.1,
                      value: s.letterSpacing ?? 0,
                      onChange: (v) => updateStyle({ letterSpacing: v }),
                      dataOcid: "editor.text.letter_spacing_slider"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlRow,
                {
                  label: "Line Height",
                  right: (s.lineHeight ?? 1.2).toFixed(1),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StyledSlider,
                    {
                      min: 1,
                      max: 2.5,
                      step: 0.1,
                      value: s.lineHeight ?? 1.2,
                      onChange: (v) => updateStyle({ lineHeight: v }),
                      dataOcid: "editor.text.line_height_slider"
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Color" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 mb-1 block", children: "Text Color" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ColorInput,
                  {
                    value: s.color ?? "#ffffff",
                    onChange: (v) => updateStyle({ color: v }),
                    dataOcid: "editor.text.color_swatch"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlRow,
                {
                  label: "Opacity",
                  right: `${Math.round((s.opacity ?? 1) * 100)}%`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StyledSlider,
                    {
                      min: 0,
                      max: 100,
                      value: Math.round((s.opacity ?? 1) * 100),
                      onChange: (v) => updateStyle({ opacity: v / 100 }),
                      dataOcid: "editor.text.opacity_slider"
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Effects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Toggle,
                {
                  label: "Text Shadow",
                  enabled: showShadow || !!s.textShadow,
                  onToggle: () => {
                    const next = !(showShadow || !!s.textShadow);
                    setShowShadow(next);
                    if (!next) updateStyle({ textShadow: void 0 });
                    else if (!s.textShadow)
                      updateStyle({
                        textShadow: {
                          offsetX: 2,
                          offsetY: 2,
                          blur: 8,
                          color: "#000000"
                        }
                      });
                  },
                  dataOcid: "editor.text.shadow_toggle"
                }
              ),
              (showShadow || !!s.textShadow) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-2.5 rounded-lg flex flex-col gap-2",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "Offset X" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          NumberInput,
                          {
                            value: ((_a = s.textShadow) == null ? void 0 : _a.offsetX) ?? 2,
                            onChange: (v) => updateStyle({
                              textShadow: {
                                ...s.textShadow ?? {
                                  offsetX: 2,
                                  offsetY: 2,
                                  blur: 8,
                                  color: "#000000"
                                },
                                offsetX: v
                              }
                            }),
                            min: -20,
                            max: 20,
                            dataOcid: "editor.text.shadow_offset_x"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "Offset Y" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          NumberInput,
                          {
                            value: ((_b = s.textShadow) == null ? void 0 : _b.offsetY) ?? 2,
                            onChange: (v) => updateStyle({
                              textShadow: {
                                ...s.textShadow ?? {
                                  offsetX: 2,
                                  offsetY: 2,
                                  blur: 8,
                                  color: "#000000"
                                },
                                offsetY: v
                              }
                            }),
                            min: -20,
                            max: 20,
                            dataOcid: "editor.text.shadow_offset_y"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "Blur" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          NumberInput,
                          {
                            value: ((_c = s.textShadow) == null ? void 0 : _c.blur) ?? 8,
                            onChange: (v) => updateStyle({
                              textShadow: {
                                ...s.textShadow ?? {
                                  offsetX: 2,
                                  offsetY: 2,
                                  blur: 8,
                                  color: "#000000"
                                },
                                blur: v
                              }
                            }),
                            min: 0,
                            max: 30,
                            dataOcid: "editor.text.shadow_blur"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "Shadow Color" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ColorInput,
                        {
                          value: ((_d = s.textShadow) == null ? void 0 : _d.color) ?? "#000000",
                          onChange: (v) => updateStyle({
                            textShadow: {
                              ...s.textShadow ?? {
                                offsetX: 2,
                                offsetY: 2,
                                blur: 8,
                                color: v
                              },
                              color: v
                            }
                          }),
                          dataOcid: "editor.text.shadow_color"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Toggle,
                {
                  label: "Glow Effect",
                  enabled: showGlow || !!s.glow,
                  onToggle: () => {
                    const next = !(showGlow || !!s.glow);
                    setShowGlow(next);
                    if (!next) updateStyle({ glow: void 0 });
                    else if (!s.glow)
                      updateStyle({
                        glow: { color: "#2563EB", intensity: 60, spread: 15 }
                      });
                  },
                  dataOcid: "editor.text.glow_toggle"
                }
              ),
              (showGlow || !!s.glow) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-2.5 rounded-lg flex flex-col gap-2",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ControlRow,
                      {
                        label: "Intensity",
                        right: `${((_e = s.glow) == null ? void 0 : _e.intensity) ?? 60}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          StyledSlider,
                          {
                            min: 0,
                            max: 100,
                            value: ((_f = s.glow) == null ? void 0 : _f.intensity) ?? 60,
                            onChange: (v) => updateStyle({
                              glow: {
                                ...s.glow ?? {
                                  color: "#2563EB",
                                  intensity: v,
                                  spread: 15
                                },
                                intensity: v
                              }
                            }),
                            dataOcid: "editor.text.glow_intensity"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ControlRow, { label: "Spread", right: `${((_g = s.glow) == null ? void 0 : _g.spread) ?? 15}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StyledSlider,
                      {
                        min: 0,
                        max: 30,
                        value: ((_h = s.glow) == null ? void 0 : _h.spread) ?? 15,
                        onChange: (v) => updateStyle({
                          glow: {
                            ...s.glow ?? {
                              color: "#2563EB",
                              intensity: 60,
                              spread: v
                            },
                            spread: v
                          }
                        }),
                        dataOcid: "editor.text.glow_spread"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "Glow Color" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ColorInput,
                        {
                          value: ((_i = s.glow) == null ? void 0 : _i.color) ?? "#2563EB",
                          onChange: (v) => updateStyle({
                            glow: {
                              ...s.glow ?? {
                                color: v,
                                intensity: 60,
                                spread: 15
                              },
                              color: v
                            }
                          }),
                          dataOcid: "editor.text.glow_color"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Toggle,
                {
                  label: "Gradient Text",
                  enabled: showGradient || !!((_j = s.gradient) == null ? void 0 : _j.enabled),
                  onToggle: () => {
                    var _a2, _b2, _c2, _d2;
                    const next = !(showGradient || !!((_a2 = s.gradient) == null ? void 0 : _a2.enabled));
                    setShowGradient(next);
                    updateStyle({
                      gradient: {
                        enabled: next,
                        fromColor: ((_b2 = s.gradient) == null ? void 0 : _b2.fromColor) ?? "#2563EB",
                        toColor: ((_c2 = s.gradient) == null ? void 0 : _c2.toColor) ?? "#22C55E",
                        direction: ((_d2 = s.gradient) == null ? void 0 : _d2.direction) ?? "horizontal"
                      }
                    });
                  },
                  dataOcid: "editor.text.gradient_toggle"
                }
              ),
              (showGradient || !!((_k = s.gradient) == null ? void 0 : _k.enabled)) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-2.5 rounded-lg flex flex-col gap-2",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "From" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ColorInput,
                          {
                            value: ((_l = s.gradient) == null ? void 0 : _l.fromColor) ?? "#2563EB",
                            onChange: (v) => updateStyle({
                              gradient: {
                                ...s.gradient ?? {
                                  enabled: true,
                                  fromColor: v,
                                  toColor: "#22C55E",
                                  direction: "horizontal"
                                },
                                fromColor: v
                              }
                            }),
                            dataOcid: "editor.text.gradient_from"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "To" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ColorInput,
                          {
                            value: ((_m = s.gradient) == null ? void 0 : _m.toColor) ?? "#22C55E",
                            onChange: (v) => updateStyle({
                              gradient: {
                                ...s.gradient ?? {
                                  enabled: true,
                                  fromColor: "#2563EB",
                                  toColor: v,
                                  direction: "horizontal"
                                },
                                toColor: v
                              }
                            }),
                            dataOcid: "editor.text.gradient_to"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/35 block mb-1", children: "Direction" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1", children: ["horizontal", "vertical", "diagonal"].map(
                        (d) => {
                          var _a2;
                          const active = (((_a2 = s.gradient) == null ? void 0 : _a2.direction) ?? "horizontal") === d;
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => updateStyle({
                                gradient: {
                                  ...s.gradient ?? {
                                    enabled: true,
                                    fromColor: "#2563EB",
                                    toColor: "#22C55E",
                                    direction: d
                                  },
                                  direction: d
                                }
                              }),
                              "data-ocid": `editor.text.gradient_dir_${d}`,
                              className: "py-1 rounded text-[10px] capitalize transition-all",
                              style: {
                                background: active ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.04)",
                                border: `1px solid ${active ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.07)"}`,
                                color: active ? "#60a5fa" : "rgba(255,255,255,0.4)"
                              },
                              children: d
                            },
                            d
                          );
                        }
                      ) })
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Animations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: ANIMATION_PRESETS.map(({ id, label, Icon }) => {
              const active = (s.animation ?? "none") === id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => updateStyle({ animation: id }),
                  "data-ocid": `editor.text.animation_${id}`,
                  className: "flex flex-col items-center gap-1 py-2 rounded-lg text-[9px] font-medium capitalize transition-all",
                  style: {
                    background: active ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.06)"}`,
                    color: active ? "#60a5fa" : "rgba(255,255,255,0.35)",
                    boxShadow: active ? "0 0 8px rgba(37,99,235,0.3)" : "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                    label
                  ]
                },
                id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "Style Presets" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: STYLE_PRESETS.map(
              ({ id, label, preview, style: presetStyle }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (!selected) return;
                    updateTextLayer(selected.id, {
                      style: { ...selected.style, ...presetStyle }
                    });
                  },
                  "data-ocid": `editor.text.preset_${id}`,
                  className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:scale-[1.01] active:scale-[0.99]",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-6 h-6 rounded-md flex-shrink-0",
                        style: { background: preview }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[12px] font-semibold",
                        style: { color: preview },
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/25 ml-auto", children: [
                      id === "youtube" && "Impact + shadow",
                      id === "glow" && "Neon glow",
                      id === "cinematic" && "Wide spacing",
                      id === "tiktok" && "Black bg box",
                      id === "minimal" && "Clean & subtle"
                    ] })
                  ]
                },
                id
              )
            ) })
          ] })
        ] })
      ]
    }
  );
}
const KEYFRAMES = `
@keyframes tr-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes tr-zoom { from { transform: scale(0.75); opacity: 0.3; } to { transform: scale(1); opacity: 1; } }
@keyframes tr-blur { from { filter: blur(18px); opacity: 0; } to { filter: blur(0px); opacity: 1; } }
@keyframes tr-swipe { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
@keyframes tr-flash { 0% { opacity: 1; } 20% { opacity: 1; background: #ffffff; } 40% { opacity: 1; background: #ffffff; } 100% { opacity: 1; background: transparent; } }
@keyframes tr-rotate { from { transform: rotate(90deg) scale(0.8); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }
@keyframes tr-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
@keyframes tr-dissolve { 0% { opacity: 0; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
`;
let _injected = false;
function ensureKeyframes() {
  if (_injected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
  _injected = true;
}
const TRANSITIONS = [
  {
    id: "none",
    label: "None",
    icon: "✕",
    animKey: "",
    previewGradient: "linear-gradient(135deg,#1e293b,#0f172a)"
  },
  {
    id: "fade",
    label: "Fade",
    icon: "🌀",
    animKey: "tr-fade",
    previewGradient: "linear-gradient(135deg,#1e3a5f,#2563eb40)"
  },
  {
    id: "dissolve",
    label: "Dissolve",
    icon: "✨",
    animKey: "tr-dissolve",
    previewGradient: "linear-gradient(135deg,#3730a3,#6d28d9)"
  },
  {
    id: "zoom",
    label: "Zoom",
    icon: "🔍",
    animKey: "tr-zoom",
    previewGradient: "linear-gradient(135deg,#065f46,#059669)"
  },
  {
    id: "blur",
    label: "Blur",
    icon: "🌫",
    animKey: "tr-blur",
    previewGradient: "linear-gradient(135deg,#1e1b4b,#4338ca)"
  },
  {
    id: "swipe",
    label: "Swipe",
    icon: "👊",
    animKey: "tr-swipe",
    previewGradient: "linear-gradient(135deg,#7c2d12,#ea580c)"
  },
  {
    id: "flash",
    label: "Flash",
    icon: "⚡",
    animKey: "tr-flash",
    previewGradient: "linear-gradient(135deg,#78350f,#fbbf24)"
  },
  {
    id: "rotate",
    label: "Rotate",
    icon: "🔄",
    animKey: "tr-rotate",
    previewGradient: "linear-gradient(135deg,#4a044e,#a21caf)"
  },
  {
    id: "wipe",
    label: "Wipe",
    icon: "🌟",
    animKey: "tr-wipe",
    previewGradient: "linear-gradient(135deg,#0c4a6e,#0891b2)"
  }
];
const EASING_OPTIONS = [
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  "spring"
];
function TransitionPreviewBox({
  transition,
  duration,
  easing
}) {
  const [animKey, setAnimKey] = reactExports.useState(0);
  const cssEasing = easing === "spring" ? "cubic-bezier(0.175,0.885,0.32,1.275)" : easing;
  const replay = reactExports.useCallback(() => setAnimKey((k) => k + 1), []);
  if (!transition || transition.id === "none") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full rounded-xl flex items-center justify-center",
        style: {
          height: 80,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/20", children: "No transition selected" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "relative w-full rounded-xl overflow-hidden group",
      style: {
        height: 80,
        background: "rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)"
      },
      onClick: replay,
      title: "Click to replay",
      "data-ocid": "transitions.preview_box",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: transition.previewGradient,
              animation: transition.animKey ? `${transition.animKey} ${duration}s ${cssEasing} forwards` : void 0
            }
          },
          animKey
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end justify-end p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 group-hover:text-white/50 transition-colors", children: "Click to replay" }) })
      ]
    }
  );
}
function TransitionsPanel() {
  ensureKeyframes();
  const store = useVideoEditorStore();
  const {
    activeTransition,
    transitionDuration,
    transitionEasing,
    selectedClipId,
    setActiveTransition,
    setTransitionDuration,
    setTransitionEasing,
    updateVideoClip
  } = store;
  const [hoveredId, setHoveredId] = reactExports.useState(null);
  const [justApplied, setJustApplied] = reactExports.useState(false);
  const activeDef = TRANSITIONS.find((t) => t.id === activeTransition) ?? null;
  const hoveredDef = hoveredId ? TRANSITIONS.find((t) => t.id === hoveredId) ?? null : null;
  const previewDef = hoveredDef ?? activeDef;
  const canApply = !!selectedClipId && activeTransition !== "none";
  const handleApply = reactExports.useCallback(() => {
    if (!selectedClipId) return;
    updateVideoClip(selectedClipId, {
      transition: {
        type: activeTransition,
        duration: transitionDuration,
        easing: transitionEasing
      }
    });
    setJustApplied(true);
    ue.success(`${(activeDef == null ? void 0 : activeDef.label) ?? "Transition"} applied`);
    setTimeout(() => setJustApplied(false), 2e3);
  }, [
    selectedClipId,
    activeTransition,
    transitionDuration,
    transitionEasing,
    updateVideoClip,
    activeDef
  ]);
  const easing = transitionEasing;
  const validEasing = EASING_OPTIONS.includes(easing) ? easing : "ease-in-out";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-4 p-3 overflow-y-auto h-full",
      style: {
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.08) transparent",
        fontFamily: "Inter, sans-serif"
      },
      "data-ocid": "transitions_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2", children: "Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TransitionPreviewBox,
            {
              transition: previewDef,
              duration: transitionDuration,
              easing: validEasing
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2", children: "Select Transition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: TRANSITIONS.map((tr) => {
            const isActive = activeTransition === tr.id;
            const isHovered = hoveredId === tr.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                whileTap: { scale: 0.94 },
                onClick: () => setActiveTransition(tr.id),
                onHoverStart: () => setHoveredId(tr.id),
                onHoverEnd: () => setHoveredId(null),
                className: "relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all",
                style: {
                  background: isActive ? "rgba(37,99,235,0.18)" : isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  border: isActive ? "1px solid #2563EB" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isActive ? "0 0 12px rgba(37,99,235,0.35)" : "none"
                },
                "data-ocid": `transitions.card.${tr.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "w-full rounded-lg overflow-hidden",
                      style: { height: 28, background: "rgba(255,255,255,0.04)" },
                      children: [
                        isHovered && tr.id !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              width: "100%",
                              height: "100%",
                              background: tr.previewGradient,
                              animation: tr.animKey ? `${tr.animKey} 0.7s ease-out forwards` : void 0
                            }
                          }
                        ),
                        tr.id === "none" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] text-white/25", children: tr.icon }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[9px] font-semibold text-center leading-tight",
                      style: {
                        color: isActive ? "#93c5fd" : "rgba(255,255,255,0.45)"
                      },
                      children: tr.label
                    }
                  ),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center",
                      style: { background: "#2563EB" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] text-white font-bold", children: "\\u2713" })
                    }
                  )
                ]
              },
              tr.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 rounded-xl",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-white/70", children: "Duration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                    style: { background: "rgba(37,99,235,0.2)", color: "#93c5fd" },
                    children: [
                      transitionDuration.toFixed(1),
                      "s"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative h-1.5 rounded-full mb-2",
                  style: { background: "rgba(255,255,255,0.08)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute h-full rounded-full",
                        style: {
                          width: `${(transitionDuration - 0.1) / 1.9 * 100}%`,
                          background: "linear-gradient(90deg, rgba(37,99,235,0.6), #2563EB)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        min: 0.1,
                        max: 2,
                        step: 0.1,
                        value: transitionDuration,
                        onChange: (e) => setTransitionDuration(Number(e.target.value)),
                        className: "absolute inset-0 w-full opacity-0 cursor-pointer",
                        style: { height: "100%" },
                        "data-ocid": "transitions.duration_slider"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none",
                        style: {
                          left: `calc(${(transitionDuration - 0.1) / 1.9 * 100}% - 6px)`,
                          background: "radial-gradient(circle, #2563EB 40%, #1a1a2e 100%)",
                          boxShadow: "0 0 6px 2px rgba(37,99,235,0.5)"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[9px] text-white/25", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0.1s" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2.0s" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 rounded-xl",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-white/70 mb-2", children: "Easing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1", children: EASING_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTransitionEasing(opt),
                  className: "py-1.5 rounded-lg text-[9px] font-semibold transition-all",
                  style: {
                    background: validEasing === opt ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                    border: validEasing === opt ? "1px solid rgba(37,99,235,0.5)" : "1px solid transparent",
                    color: validEasing === opt ? "#93c5fd" : "rgba(255,255,255,0.4)"
                  },
                  "data-ocid": `transitions.easing.${opt}`,
                  children: opt
                },
                opt
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: justApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
              className: "flex items-center justify-center gap-2 py-2.5 rounded-xl",
              style: {
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.35)"
              },
              "data-ocid": "transitions.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4", style: { color: "#22c55e" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-semibold",
                    style: { color: "#4ade80" },
                    children: "Transition applied"
                  }
                )
              ]
            },
            "success"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              whileTap: { scale: canApply ? 0.97 : 1 },
              onClick: handleApply,
              disabled: !canApply,
              className: "w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all flex items-center justify-center gap-2",
              style: {
                background: canApply ? "linear-gradient(135deg, #2563EB, #1d4ed8)" : "rgba(255,255,255,0.05)",
                color: canApply ? "#fff" : "rgba(255,255,255,0.25)",
                cursor: canApply ? "pointer" : "not-allowed",
                boxShadow: canApply ? "0 4px 16px rgba(37,99,235,0.3)" : "none",
                border: canApply ? "none" : "1px solid rgba(255,255,255,0.06)"
              },
              "data-ocid": "transitions.apply_button",
              children: canApply ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-3.5 h-3.5" }),
                "Apply to Selected Clip"
              ] }) : "Select a clip first"
            },
            "apply"
          ) }),
          selectedClipId && activeTransition !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-white/25 text-center mt-1.5", children: [
            "Will apply ",
            activeDef == null ? void 0 : activeDef.label,
            " · ",
            transitionDuration.toFixed(1),
            "s ·",
            " ",
            validEasing
          ] })
        ] })
      ]
    }
  );
}
const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";
const ASPECT_RATIOS$1 = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "9:16", label: "9:16", w: 9, h: 16 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "4:5", label: "4:5", w: 4, h: 5 },
  { id: "21:9", label: "21:9", w: 21, h: 9 }
];
const SPEED_PRESETS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const ROTATION_PRESETS = [0, 90, 180, 270];
function CropModal({ onApply, onCancel, initial }) {
  const [crop, setCrop] = reactExports.useState(initial);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: { background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "crop-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "rounded-2xl overflow-hidden w-[420px]",
          style: {
            background: "#0F172A",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.7)"
          },
          initial: { scale: 0.95, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.95, opacity: 0 },
          transition: { type: "spring", damping: 24, stiffness: 300 },
          "data-ocid": "crop-modal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-5 py-4 border-b",
                style: { borderColor: BORDER },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-semibold text-white/90", children: "Crop Region" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onCancel,
                      className: "text-white/30 hover:text-white/70 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative mx-auto rounded-lg overflow-hidden mb-5",
                  style: {
                    width: 280,
                    height: 158,
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,0.08)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0",
                        style: { background: "rgba(0,0,0,0.6)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "absolute border-2 box-border",
                        style: {
                          left: `${crop.cropX}%`,
                          top: `${crop.cropY}%`,
                          width: `${crop.cropW}%`,
                          height: `${crop.cropH}%`,
                          borderColor: ACCENT,
                          background: "rgba(37,99,235,0.08)"
                        },
                        animate: {
                          left: `${crop.cropX}%`,
                          top: `${crop.cropY}%`,
                          width: `${crop.cropW}%`,
                          height: `${crop.cropH}%`
                        },
                        transition: { duration: 0.15 },
                        children: ["tl", "tr", "bl", "br"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute w-3 h-3 rounded-full",
                            style: {
                              background: ACCENT,
                              boxShadow: `0 0 6px ${ACCENT}`,
                              ...h === "tl" ? { top: -5, left: -5 } : {},
                              ...h === "tr" ? { top: -5, right: -5 } : {},
                              ...h === "bl" ? { bottom: -5, left: -5 } : {},
                              ...h === "br" ? { bottom: -5, right: -5 } : {}
                            }
                          },
                          h
                        ))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "absolute inset-0 pointer-events-none",
                        style: { opacity: 0.15 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute",
                              style: {
                                left: "33.3%",
                                top: 0,
                                bottom: 0,
                                width: 1,
                                background: "white"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute",
                              style: {
                                left: "66.6%",
                                top: 0,
                                bottom: 0,
                                width: 1,
                                background: "white"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute",
                              style: {
                                top: "33.3%",
                                left: 0,
                                right: 0,
                                height: 1,
                                background: "white"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute",
                              style: {
                                top: "66.6%",
                                left: 0,
                                right: 0,
                                height: 1,
                                background: "white"
                              }
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-4", children: ["cropX", "cropY", "cropW", "cropH"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 uppercase tracking-wide", children: key === "cropX" ? "X Offset" : key === "cropY" ? "Y Offset" : key === "cropW" ? "Width" : "Height" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-white/50", children: [
                    crop[key],
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: key === "cropX" || key === "cropY" ? 50 : 20,
                    "max-crop": key === "cropW" || key === "cropH" ? 100 : 50,
                    value: crop[key],
                    onChange: (e) => setCrop((prev) => ({
                      ...prev,
                      [key]: Number(e.target.value)
                    })),
                    className: "w-full h-1.5 rounded-full cursor-pointer",
                    style: { accentColor: ACCENT },
                    "data-ocid": `crop-slider-${key}`
                  }
                )
              ] }, key)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    className: "flex-1 h-9 rounded-xl text-sm text-white/60 transition-all hover:text-white/90",
                    style: {
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${BORDER}`
                    },
                    "data-ocid": "crop-cancel",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onApply(crop.cropX, crop.cropY, crop.cropW, crop.cropH),
                    className: "flex-1 h-9 rounded-xl text-sm text-white font-semibold transition-all hover:opacity-90",
                    style: {
                      background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`
                    },
                    "data-ocid": "crop-apply",
                    children: "Apply Crop"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function VideoControlsPanel() {
  const videoRef = reactExports.useRef(null);
  const editor = useVideoEditor(videoRef);
  const store = useVideoEditorStore();
  const { videoTransform, aspectRatio, playbackSpeed } = store;
  const [cropOpen, setCropOpen] = reactExports.useState(false);
  const handleRotation = reactExports.useCallback(
    (deg) => store.setVideoTransform({ rotation: deg }),
    [store]
  );
  const handleFlipH = reactExports.useCallback(
    () => store.setVideoTransform({ flipH: !videoTransform.flipH }),
    [store, videoTransform.flipH]
  );
  const handleFlipV = reactExports.useCallback(
    () => store.setVideoTransform({ flipV: !videoTransform.flipV }),
    [store, videoTransform.flipV]
  );
  const handleSpeed = reactExports.useCallback((v) => editor.setSpeed(v), [editor]);
  const handleCropApply = reactExports.useCallback(
    (cropX, cropY, cropW, cropH) => {
      store.setVideoTransform({ cropX, cropY, cropW, cropH });
      setCropOpen(false);
    },
    [store]
  );
  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: MUTED,
    marginBottom: 8
  };
  const sectionStyle = {
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.02)",
    border: `1px solid ${BORDER}`,
    marginBottom: 10
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-3 overflow-y-auto h-full font-['Inter',sans-serif]",
      style: { scrollbarWidth: "none" },
      "data-ocid": "video-controls-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: labelStyle, children: "Rotation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: ROTATION_PRESETS.map((deg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleRotation(deg),
              className: "flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-semibold transition-all hover:scale-[1.04]",
              style: {
                background: videoTransform.rotation === deg ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${videoTransform.rotation === deg ? ACCENT : BORDER}`,
                color: videoTransform.rotation === deg ? ACCENT : "rgba(255,255,255,0.65)"
              },
              "data-ocid": `vc.rotation.${deg}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RotateCcw,
                  {
                    size: 14,
                    style: {
                      transform: `rotate(${deg}deg)`,
                      transition: "transform 0.25s"
                    }
                  }
                ),
                deg,
                "°"
              ]
            },
            deg
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: labelStyle, children: "Flip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleFlipH,
                className: "flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold transition-all hover:scale-[1.02]",
                style: {
                  background: videoTransform.flipH ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${videoTransform.flipH ? ACCENT : BORDER}`,
                  color: videoTransform.flipH ? ACCENT : "rgba(255,255,255,0.65)"
                },
                "data-ocid": "vc.flip-h",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlipHorizontal, { size: 14 }),
                  "Horizontal"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleFlipV,
                className: "flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold transition-all hover:scale-[1.02]",
                style: {
                  background: videoTransform.flipV ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${videoTransform.flipV ? ACCENT : BORDER}`,
                  color: videoTransform.flipV ? ACCENT : "rgba(255,255,255,0.65)"
                },
                "data-ocid": "vc.flip-v",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlipVertical, { size: 14 }),
                  "Vertical"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: labelStyle, children: "Aspect Ratio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: ASPECT_RATIOS$1.map(({ id, label, w, h }) => {
            const active = aspectRatio === id;
            const maxSize = 28;
            const scale = Math.min(maxSize / w, maxSize / h);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => store.setAspectRatio(id),
                className: "flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-[9px] font-bold transition-all hover:scale-[1.04]",
                style: {
                  background: active ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? ACCENT : BORDER}`,
                  color: active ? ACCENT : "rgba(255,255,255,0.55)"
                },
                "data-ocid": `vc.ratio.${id.replace(":", "-")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: w * scale,
                        height: h * scale,
                        border: `1.5px solid ${active ? ACCENT : "rgba(255,255,255,0.3)"}`,
                        borderRadius: 2,
                        background: active ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.05)"
                      }
                    }
                  ),
                  label
                ]
              },
              id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...labelStyle, marginBottom: 0 }, children: "Playback Speed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] font-bold px-2 py-0.5 rounded-md",
                style: { background: "rgba(34,197,94,0.12)", color: GREEN },
                children: [
                  playbackSpeed,
                  "x"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: 0.25,
              max: 2,
              step: 0.25,
              value: playbackSpeed,
              onChange: (e) => handleSpeed(Number(e.target.value)),
              className: "w-full h-1.5 rounded-full cursor-pointer mb-3",
              style: { accentColor: ACCENT },
              "data-ocid": "vc.speed-slider"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-1", children: SPEED_PRESETS.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleSpeed(v),
              className: "py-1.5 rounded-lg text-[9px] font-bold transition-all hover:scale-105",
              style: {
                background: playbackSpeed === v ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${playbackSpeed === v ? ACCENT : BORDER}`,
                color: playbackSpeed === v ? ACCENT : "rgba(255,255,255,0.5)"
              },
              "data-ocid": `vc.speed-preset.${v}`,
              children: [
                v,
                "x"
              ]
            },
            v
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: sectionStyle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: labelStyle, children: "Crop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-[10px]",
              style: { color: "rgba(255,255,255,0.35)" },
              children: [
                "Region:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-white/50", children: [
                  videoTransform.cropX,
                  ",",
                  videoTransform.cropY,
                  " /",
                  " ",
                  videoTransform.cropW,
                  "×",
                  videoTransform.cropH
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setCropOpen(true),
              className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-semibold transition-all hover:scale-[1.01] hover:brightness-110",
              style: {
                background: "rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.3)",
                color: ACCENT
              },
              "data-ocid": "vc.enter-crop",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crop, { size: 14 }),
                "Enter Crop Mode"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: cropOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CropModal,
          {
            initial: videoTransform,
            onApply: handleCropApply,
            onCancel: () => setCropOpen(false)
          }
        ) })
      ]
    }
  );
}
const SECTION_ICONS = {
  [SidebarSection.Media]: Film,
  [SidebarSection.Audio]: Music,
  [SidebarSection.Text]: Type,
  [SidebarSection.Effects]: Sparkles,
  [SidebarSection.Transitions]: Layers,
  [SidebarSection.Stickers]: Smile,
  [SidebarSection.Filters]: SlidersVertical,
  [SidebarSection.AITools]: WandSparkles,
  [SidebarSection.Captions]: Captions,
  [SidebarSection.Templates]: LayoutTemplate,
  [SidebarSection.BrandKit]: Star,
  [SidebarSection.Settings]: Layers
};
const SECTION_LABELS = {
  [SidebarSection.Media]: "Media",
  [SidebarSection.Audio]: "Audio",
  [SidebarSection.Text]: "Text",
  [SidebarSection.Effects]: "Effects",
  [SidebarSection.Transitions]: "Transitions",
  [SidebarSection.Stickers]: "Stickers",
  [SidebarSection.Filters]: "Color Grading",
  [SidebarSection.AITools]: "AI Tools",
  [SidebarSection.Captions]: "Captions",
  [SidebarSection.Templates]: "Templates",
  [SidebarSection.BrandKit]: "Brand Kit",
  [SidebarSection.Settings]: "Layers"
};
function EditorRightPanel() {
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  const editor = useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();
  const { activeSidebarSection } = useVideoEditorStore();
  const Icon = SECTION_ICONS[activeSidebarSection];
  const label = SECTION_LABELS[activeSidebarSection];
  function renderContent() {
    var _a;
    switch (activeSidebarSection) {
      case SidebarSection.Media:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          MediaPanelSection,
          {
            videoSrc: ((_a = Object.values(store.videoClips)[0]) == null ? void 0 : _a.src) ?? null,
            onLoadFile: editor.addVideoFromFile
          }
        );
      case SidebarSection.Audio:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AudioPanelSection, {});
      case SidebarSection.Text:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TextPanelSection, {});
      case SidebarSection.Effects:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(VideoControlsPanel, {});
      case SidebarSection.Stickers:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(EffectsPanelSection, { section: activeSidebarSection });
      case SidebarSection.Transitions:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionsPanel, {});
      case SidebarSection.Filters:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ColorGradingSection, {});
      case SidebarSection.AITools:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AIToolsPanelSection, {});
      case SidebarSection.Captions:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CaptionsPanel, {});
      case SidebarSection.Settings:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(LayersPanelSection, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(GenericPanelSection, { section: activeSidebarSection, label });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: "flex flex-col flex-shrink-0 border-l font-['Inter',sans-serif]",
      style: {
        width: 300,
        background: "#0F172A",
        borderColor: "rgba(255,255,255,0.05)"
      },
      "data-ocid": "editor-right-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 px-4 py-3 border-b flex-shrink-0",
            style: {
              borderColor: "rgba(255,255,255,0.05)",
              background: "rgba(7,11,20,0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 flex items-center justify-center rounded-md",
                  style: {
                    background: "rgba(37,99,235,0.15)",
                    color: "#2563EB"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-white/80", children: label })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 16 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -16 },
            transition: { duration: 0.15, ease: "easeOut" },
            className: "h-full overflow-y-auto",
            style: {
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent"
            },
            children: renderContent()
          },
          activeSidebarSection
        ) }) })
      ]
    }
  );
}
const ASPECT_RATIOS = ["16:9", "9:16", "1:1", "4:5", "21:9"];
function EditorTopBar({
  projectName,
  onProjectNameChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onSave,
  // onExport is handled internally via setExportModalOpen
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onExport: _onExport,
  hasSrc
}) {
  const { autosaveStatus, aspectRatio, setAspectRatio, setExportModalOpen } = useVideoEditorStore();
  const [editingName, setEditingName] = reactExports.useState(false);
  const [ratioOpen, setRatioOpen] = reactExports.useState(false);
  const nameInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    if (editingName) (_a = nameInputRef.current) == null ? void 0 : _a.select();
  }, [editingName]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "flex items-center gap-1.5 px-3 flex-shrink-0 border-b z-30 font-['Inter',sans-serif]",
      style: {
        height: 48,
        background: "linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(7,11,20,0.98) 100%)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)"
      },
      "data-ocid": "editor-topbar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          editingName ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: nameInputRef,
              type: "text",
              value: projectName,
              onChange: (e) => onProjectNameChange(e.target.value),
              onBlur: () => setEditingName(false),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === "Escape")
                  setEditingName(false);
              },
              className: "text-sm font-semibold text-white bg-white/10 border border-[#2563EB]/60 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#2563EB] w-48 transition-all",
              "data-ocid": "editor-topbar-name-input"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setEditingName(true),
              className: "text-sm font-semibold text-white/90 hover:text-white truncate max-w-[180px] hover:bg-white/5 px-2.5 py-1 rounded-lg transition-all cursor-text",
              title: "Click to rename",
              "data-ocid": "editor-topbar-name",
              children: projectName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            autosaveStatus === "saving" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                className: "flex items-center gap-1 text-[11px] text-white/40",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { rotate: 360 },
                      transition: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.8,
                        ease: "linear"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving" })
                ]
              },
              "saving"
            ),
            autosaveStatus === "saved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                className: "flex items-center gap-1 text-[11px] text-[#22C55E]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saved" })
                ]
              },
              "saved"
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px h-5 mx-1",
            style: { background: "rgba(255,255,255,0.06)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onUndo,
              disabled: !canUndo,
              className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 disabled:opacity-25 transition-all",
              title: "Undo (Ctrl+Z)",
              "aria-label": "Undo",
              "data-ocid": "editor-topbar-undo",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onRedo,
              disabled: !canRedo,
              className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 disabled:opacity-25 transition-all",
              title: "Redo (Ctrl+Shift+Z)",
              "aria-label": "Redo",
              "data-ocid": "editor-topbar-redo",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px h-5 mx-1",
            style: { background: "rgba(255,255,255,0.06)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-white/40 w-10 text-center", children: [
          Math.round(zoom * 100),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px h-5 mx-1",
            style: { background: "rgba(255,255,255,0.06)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setRatioOpen((o) => !o),
              className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/8 border border-white/8 hover:border-white/15 transition-all",
              "data-ocid": "editor-topbar-aspect-ratio",
              children: [
                aspectRatio,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: ratioOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              transition: { duration: 0.12 },
              className: "absolute top-full mt-1.5 left-0 rounded-xl border overflow-hidden z-50",
              style: {
                background: "rgba(15,23,42,0.98)",
                borderColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
              },
              children: ASPECT_RATIOS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setAspectRatio(r);
                    setRatioOpen(false);
                  },
                  className: "w-full px-4 py-2 text-left text-[12px] font-medium transition-all",
                  style: {
                    color: r === aspectRatio ? "#2563EB" : "rgba(255,255,255,0.75)",
                    background: r === aspectRatio ? "rgba(37,99,235,0.12)" : "transparent"
                  },
                  children: r
                },
                r
              ))
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onSave,
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all",
            "data-ocid": "editor-topbar-save",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
              "Save"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExportModalOpen(true),
            disabled: !hasSrc,
            className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold text-white disabled:opacity-30 transition-all",
            style: {
              background: hasSrc ? "linear-gradient(135deg, #2563EB, #22C55E)" : "rgba(255,255,255,0.05)",
              boxShadow: hasSrc ? "0 0 16px rgba(37,99,235,0.35), 0 0 40px rgba(34,197,94,0.12)" : "none"
            },
            "data-ocid": "editor-topbar-export",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Export"
            ]
          }
        )
      ]
    }
  );
}
const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
function TextOverlay({
  layer,
  isSelected,
  containerRef,
  onSelect,
  onUpdate
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [editContent, setEditContent] = reactExports.useState(layer.content);
  const editRef = reactExports.useRef(null);
  const dragStart = reactExports.useRef(null);
  const resizeStart = reactExports.useRef(null);
  const s = layer.style;
  const posX = ((_a = layer.position) == null ? void 0 : _a.x) ?? 50;
  const posY = ((_b = layer.position) == null ? void 0 : _b.y) ?? 50;
  const width = ((_c = layer.size) == null ? void 0 : _c.width) ?? 60;
  const height = ((_d = layer.size) == null ? void 0 : _d.height) ?? 15;
  const rotation = layer.rotation ?? 0;
  const textShadow = (s == null ? void 0 : s.textShadow) ? `${s.textShadow.offsetX}px ${s.textShadow.offsetY}px ${s.textShadow.blur}px ${s.textShadow.color}` : (s == null ? void 0 : s.glow) ? `0 0 ${s.glow.spread ?? 12}px ${s.glow.color}, 0 0 ${(s.glow.spread ?? 12) * 2}px ${s.glow.color}40` : void 0;
  const gradientStyle = ((_e = s == null ? void 0 : s.gradient) == null ? void 0 : _e.enabled) ? {
    background: `linear-gradient(${s.gradient.direction ?? "to right"}, ${s.gradient.fromColor}, ${s.gradient.toColor})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  } : {};
  const onMouseDownDrag = reactExports.useCallback(
    (e) => {
      if (isEditing) return;
      e.stopPropagation();
      onSelect(layer.id);
      dragStart.current = { mx: e.clientX, my: e.clientY, ox: posX, oy: posY };
      const onMove = (me) => {
        const c = containerRef.current;
        if (!c || !dragStart.current) return;
        const rect = c.getBoundingClientRect();
        const dx = (me.clientX - dragStart.current.mx) / rect.width * 100;
        const dy = (me.clientY - dragStart.current.my) / rect.height * 100;
        onUpdate(layer.id, {
          position: {
            x: Math.max(2, Math.min(98, dragStart.current.ox + dx)),
            y: Math.max(2, Math.min(98, dragStart.current.oy + dy))
          }
        });
      };
      const onUp = () => {
        dragStart.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [isEditing, posX, posY, layer.id, onSelect, onUpdate, containerRef]
  );
  const onResizeMouseDown = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      resizeStart.current = {
        mx: e.clientX,
        my: e.clientY,
        ow: width,
        oh: height
      };
      const onMove = (me) => {
        const c = containerRef.current;
        if (!c || !resizeStart.current) return;
        const rect = c.getBoundingClientRect();
        const dw = (me.clientX - resizeStart.current.mx) / rect.width * 100;
        const dh = (me.clientY - resizeStart.current.my) / rect.height * 100;
        onUpdate(layer.id, {
          size: {
            width: Math.max(10, resizeStart.current.ow + dw),
            height: Math.max(5, resizeStart.current.oh + dh)
          }
        });
      };
      const onUp = () => {
        resizeStart.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [width, height, layer.id, onUpdate, containerRef]
  );
  const onRotateMouseDown = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const cx = rect.left + posX / 100 * rect.width;
      const cy = rect.top + posY / 100 * rect.height;
      const onMove = (me) => {
        const angle = Math.atan2(me.clientY - cy, me.clientX - cx) * (180 / Math.PI) + 90;
        onUpdate(layer.id, { rotation: angle });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [posX, posY, layer.id, onUpdate, containerRef]
  );
  const onDoubleClick = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      setEditContent(layer.content);
      setIsEditing(true);
      setTimeout(() => {
        var _a2;
        return (_a2 = editRef.current) == null ? void 0 : _a2.focus();
      }, 20);
    },
    [layer.content]
  );
  const commitEdit = reactExports.useCallback(() => {
    setIsEditing(false);
    if (editContent !== layer.content)
      onUpdate(layer.id, { content: editContent });
  }, [editContent, layer.id, layer.content, onUpdate]);
  const animClass = (s == null ? void 0 : s.animation) === "fade-in" ? "animate-[fadeIn_0.5s_ease-in]" : (s == null ? void 0 : s.animation) === "slide-in" ? "animate-[slideInUp_0.5s_ease-out]" : (s == null ? void 0 : s.animation) === "bounce" ? "animate-bounce" : (s == null ? void 0 : s.animation) === "zoom" ? "animate-[scaleIn_0.3s_ease-out]" : "";
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: canvas overlay
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `absolute select-none ${animClass}`,
        style: {
          left: `${posX}%`,
          top: `${posY}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          width: `${width}%`,
          cursor: isEditing ? "text" : "move",
          userSelect: "none",
          zIndex: isSelected ? 20 : 10
        },
        onClick: (e) => {
          e.stopPropagation();
          onSelect(layer.id);
        },
        onDoubleClick,
        onMouseDown: onMouseDownDrag,
        "data-ocid": `editor-text-overlay.${layer.id}`,
        children: [
          isSelected && !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none rounded",
              style: {
                border: "1.5px dashed rgba(37,99,235,0.8)",
                boxShadow: "0 0 0 1px rgba(37,99,235,0.15)"
              }
            }
          ),
          isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              ref: editRef,
              value: editContent,
              onChange: (e) => setEditContent(e.target.value),
              onBlur: commitEdit,
              onKeyDown: (e) => {
                if (e.key === "Escape") commitEdit();
                e.stopPropagation();
              },
              className: "w-full bg-black/40 rounded border border-blue-500/60 text-white resize-none outline-none p-1",
              style: {
                fontFamily: (s == null ? void 0 : s.fontFamily) ?? "Inter",
                fontSize: `${((s == null ? void 0 : s.fontSize) ?? 32) * 0.06}vw`,
                fontWeight: (s == null ? void 0 : s.fontWeight) ?? "400",
                color: (s == null ? void 0 : s.color) ?? "#ffffff",
                textAlign: (s == null ? void 0 : s.textAlign) ?? "center",
                lineHeight: (s == null ? void 0 : s.lineHeight) ?? 1.2,
                minHeight: "2em"
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-1 py-0.5",
              style: {
                fontFamily: (s == null ? void 0 : s.fontFamily) ?? "Inter",
                fontSize: `${((s == null ? void 0 : s.fontSize) ?? 32) * 0.06}vw`,
                fontWeight: (s == null ? void 0 : s.fontWeight) ?? "400",
                color: (s == null ? void 0 : s.color) ?? "#ffffff",
                textAlign: (s == null ? void 0 : s.textAlign) ?? "center",
                opacity: (s == null ? void 0 : s.opacity) ?? 1,
                textShadow,
                letterSpacing: (s == null ? void 0 : s.letterSpacing) ? `${s.letterSpacing}em` : void 0,
                lineHeight: (s == null ? void 0 : s.lineHeight) ?? 1.2,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                background: ((_f = s == null ? void 0 : s.background) == null ? void 0 : _f.enabled) ? s.background.color : "transparent",
                borderRadius: ((_g = s == null ? void 0 : s.background) == null ? void 0 : _g.enabled) ? s.background.borderRadius : void 0,
                padding: ((_h = s == null ? void 0 : s.background) == null ? void 0 : _h.enabled) ? `${s.background.padding}px` : "2px 4px",
                ...gradientStyle
              },
              children: layer.content
            }
          ),
          isSelected && !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute w-4 h-4 rounded-full border-2 border-blue-400 bg-[#070B14] cursor-grab",
                style: { top: "-28px", left: "50%", transform: "translateX(-50%)" },
                onMouseDown: onRotateMouseDown,
                title: "Rotate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute w-px bg-blue-400/40 pointer-events-none",
                style: {
                  height: "20px",
                  top: "-22px",
                  left: "50%",
                  transform: "translateX(-50%)"
                }
              }
            ),
            [
              { top: -4, left: -4 },
              { top: -4, right: -4 },
              { bottom: -4, left: -4 },
              { bottom: -4, right: -4 }
            ].map((hs, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute w-2.5 h-2.5 rounded-sm border-2 border-blue-400 bg-[#070B14]",
                style: { ...hs, cursor: i === 3 ? "se-resize" : "pointer" },
                onMouseDown: i === 3 ? onResizeMouseDown : void 0
              },
              i
            ))
          ] })
        ]
      }
    )
  );
}
function CaptionOverlay({
  layer,
  isSelected,
  containerRef,
  onSelect,
  onUpdate
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const dragStart = reactExports.useRef(null);
  const posX = ((_a = layer.position) == null ? void 0 : _a.x) ?? 50;
  const posY = ((_b = layer.position) == null ? void 0 : _b.y) ?? 80;
  const onMouseDown = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      onSelect(layer.id);
      dragStart.current = { mx: e.clientX, my: e.clientY, ox: posX, oy: posY };
      const onMove = (me) => {
        const c = containerRef.current;
        if (!c || !dragStart.current) return;
        const rect = c.getBoundingClientRect();
        onUpdate(layer.id, {
          position: {
            x: Math.max(
              2,
              Math.min(
                98,
                dragStart.current.ox + (me.clientX - dragStart.current.mx) / rect.width * 100
              )
            ),
            y: Math.max(
              2,
              Math.min(
                98,
                dragStart.current.oy + (me.clientY - dragStart.current.my) / rect.height * 100
              )
            )
          }
        });
      };
      const onUp = () => {
        dragStart.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [posX, posY, layer.id, onSelect, onUpdate, containerRef]
  );
  const presetStyles = {
    tiktok: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 32) * 0.055}vw`,
      fontWeight: "700",
      color: layer.style.color ?? "#ffffff",
      background: ((_c = layer.style.background) == null ? void 0 : _c.color) ?? "rgba(0,0,0,0.85)",
      borderRadius: `${((_d = layer.style.background) == null ? void 0 : _d.borderRadius) ?? 4}px`,
      padding: `${((_e = layer.style.background) == null ? void 0 : _e.padding) ?? 8}px ${(((_f = layer.style.background) == null ? void 0 : _f.padding) ?? 8) * 2}px`,
      textAlign: "center"
    },
    cinematic: {
      fontFamily: layer.style.fontFamily ?? "Georgia, serif",
      fontSize: `${(layer.style.fontSize ?? 28) * 0.055}vw`,
      fontWeight: "400",
      color: layer.style.color ?? "#f5f0e0",
      textShadow: "0 0 20px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.8)",
      fontStyle: "italic",
      letterSpacing: "0.04em"
    },
    minimal: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 24) * 0.055}vw`,
      color: layer.style.color ?? "#ffffff",
      textAlign: "center"
    },
    glow: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 34) * 0.055}vw`,
      fontWeight: "700",
      color: layer.style.color ?? "#00ff88",
      textShadow: `0 0 12px ${((_g = layer.style.glow) == null ? void 0 : _g.color) ?? "#00ff88"}, 0 0 24px ${((_h = layer.style.glow) == null ? void 0 : _h.color) ?? "#00ff88"}, 0 0 48px ${((_i = layer.style.glow) == null ? void 0 : _i.color) ?? "#00ff88"}60`
    },
    custom: {
      fontFamily: layer.style.fontFamily ?? "Inter",
      fontSize: `${(layer.style.fontSize ?? 28) * 0.055}vw`,
      color: layer.style.color ?? "#ffffff"
    }
  };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: canvas overlay
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute select-none cursor-move",
        style: {
          left: `${posX}%`,
          top: `${posY}%`,
          transform: "translate(-50%, -50%)",
          maxWidth: `${((_j = layer.size) == null ? void 0 : _j.width) ?? 80}%`,
          zIndex: isSelected ? 20 : 10,
          ...presetStyles[layer.preset] ?? presetStyles.minimal
        },
        onClick: (e) => {
          e.stopPropagation();
          onSelect(layer.id);
        },
        onMouseDown,
        "data-ocid": `editor-caption-overlay.${layer.id}`,
        children: [
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none rounded",
              style: { border: "1.5px dashed rgba(34,197,94,0.7)" }
            }
          ),
          layer.content
        ]
      }
    )
  );
}
function VideoMonitor({ videoRef, audioRef }) {
  var _a;
  const editor = useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();
  const containerRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const [isDraggingOver, setIsDraggingOver] = reactExports.useState(false);
  const [showSafeArea, setShowSafeArea] = reactExports.useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = reactExports.useState(false);
  const [previewZoom, setPreviewZoom] = reactExports.useState("fit");
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [transitionClass, setTransitionClass] = reactExports.useState("");
  const transitionTimerRef = reactExports.useRef(null);
  const videoSrc = ((_a = Object.values(store.videoClips)[0]) == null ? void 0 : _a.src) ?? null;
  reactExports.useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);
  const onDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);
  const onDragLeave = reactExports.useCallback(() => setIsDraggingOver(false), []);
  const onDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDraggingOver(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (file.type.startsWith("video/")) editor.addVideoFromFile(file);
      else if (file.type.startsWith("audio/")) editor.addAudioFromFile(file);
    },
    [editor]
  );
  const onFileChange = reactExports.useCallback(
    (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      if (!file) return;
      if (file.type.startsWith("video/")) editor.addVideoFromFile(file);
      else if (file.type.startsWith("audio/")) editor.addAudioFromFile(file);
      e.target.value = "";
    },
    [editor]
  );
  reactExports.useEffect(() => {
    if (!store.selectedClipId) return;
    const clip = store.videoClips[store.selectedClipId];
    if (!(clip == null ? void 0 : clip.transition) || clip.transition.type === "none") return;
    const clipEnd = clip.startTime + clip.duration - (clip.trimIn ?? 0) - (clip.trimOut ?? 0);
    const triggerAt = clipEnd - clip.transition.duration;
    if (store.currentTime >= triggerAt && store.currentTime <= clipEnd && store.isPlaying) {
      const cssClass = `tr-anim-${clip.transition.type}`;
      setTransitionClass(cssClass);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(
        () => {
          setTransitionClass("");
        },
        clip.transition.duration * 1e3 + 50
      );
    }
  }, [
    store.currentTime,
    store.selectedClipId,
    store.videoClips,
    store.isPlaying
  ]);
  reactExports.useEffect(
    () => () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    },
    []
  );
  const onCanvasClick = reactExports.useCallback(() => {
    store.setSelectedTextId(null);
    store.setSelectedCaptionId(null);
  }, [store]);
  const toggleMute = reactExports.useCallback(
    () => editor.setMuted(!store.isMuted),
    [editor, store.isMuted]
  );
  const handleVolumeChange = reactExports.useCallback(
    (e) => {
      const v = Number(e.target.value) / 100;
      editor.setVolume(v);
      if (v > 0 && store.isMuted) editor.setMuted(false);
    },
    [editor, store.isMuted]
  );
  const objectFit = previewZoom === "fill" ? "cover" : previewZoom === "100" ? "none" : "contain";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "flex-1 min-h-0 flex flex-col items-center justify-center relative overflow-hidden",
      style: { background: "#070B14", fontFamily: "'Inter', sans-serif" },
      onDrop,
      onDragOver,
      onDragLeave,
      "data-ocid": "editor-video-monitor",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isDraggingOver && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 z-50 flex items-center justify-center pointer-events-none",
            style: {
              background: "rgba(37,99,235,0.08)",
              border: "2px solid rgba(37,99,235,0.5)",
              backdropFilter: "blur(2px)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Upload,
                {
                  className: "w-12 h-12 mx-auto mb-2",
                  style: { color: "#3b82f6" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-base", children: "Drop to add to timeline" })
            ] })
          },
          "drag-overlay"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 w-full flex items-center justify-center py-3 px-3", children: videoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center w-full h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: canvasRef,
              className: "relative overflow-hidden rounded-xl flex-shrink-0",
              style: {
                aspectRatio: store.aspectRatio.replace(":", " / "),
                maxHeight: "calc(100vh - 260px)",
                maxWidth: "100%",
                height: "100%",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 0 60px rgba(37,99,235,0.1), 0 24px 80px rgba(0,0,0,0.7)",
                background: "#000"
              },
              onClick: onCanvasClick,
              onKeyDown: (e) => e.key === "Enter" && onCanvasClick(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "video",
                  {
                    ref: videoRef,
                    src: videoSrc,
                    className: `absolute inset-0 w-full h-full ${transitionClass}`,
                    style: { objectFit, display: "block" },
                    onLoadedMetadata: editor.onVideoLoaded,
                    onEnded: editor.onVideoEnded,
                    preload: "metadata",
                    playsInline: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions", label: "Captions" })
                  }
                ),
                showSafeArea && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute pointer-events-none",
                      style: {
                        inset: "5%",
                        border: "1px dashed rgba(255,255,255,0.15)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute pointer-events-none",
                      style: {
                        inset: "10%",
                        border: "1px dashed rgba(255,255,255,0.08)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-white/10 absolute" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-8 bg-white/10 absolute" })
                  ] })
                ] }),
                editor.visibleTextLayers.map((layer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TextOverlay,
                  {
                    layer,
                    isSelected: store.selectedTextId === layer.id,
                    containerRef: canvasRef,
                    onSelect: store.setSelectedTextId,
                    onUpdate: editor.updateTextLayer
                  },
                  layer.id
                )),
                editor.visibleCaptionLayers.map((layer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CaptionOverlay,
                  {
                    layer,
                    isSelected: store.selectedCaptionId === layer.id,
                    containerRef: canvasRef,
                    onSelect: store.setSelectedCaptionId,
                    onUpdate: editor.updateCaptionLayer
                  },
                  layer.id
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      setShowSafeArea((v) => !v);
                    },
                    className: "text-[10px] font-bold px-2 py-0.5 rounded transition-all",
                    style: {
                      background: showSafeArea ? "rgba(37,99,235,0.25)" : "rgba(0,0,0,0.55)",
                      color: showSafeArea ? "#60a5fa" : "rgba(255,255,255,0.3)",
                      border: `1px solid ${showSafeArea ? "rgba(37,99,235,0.4)" : "rgba(255,255,255,0.08)"}`,
                      backdropFilter: "blur(8px)"
                    },
                    "data-ocid": "editor-safe-area-toggle",
                    children: "Safe"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-2 right-2 z-30 text-[10px] font-bold px-2 py-0.5 rounded",
                    style: {
                      background: "rgba(37,99,235,0.15)",
                      color: "#3b82f6",
                      border: "1px solid rgba(37,99,235,0.25)",
                      backdropFilter: "blur(8px)"
                    },
                    children: store.aspectRatio
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-1 left-3 text-[10px] font-mono",
              style: { color: "rgba(255,255,255,0.25)" },
              children: editor.currentTimeFormatted
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.35 },
            className: "flex flex-col items-center gap-5 text-center",
            style: { maxWidth: 320 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-24 h-24 rounded-2xl flex items-center justify-center",
                  style: {
                    background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(34,197,94,0.06))",
                    border: "1.5px dashed rgba(37,99,235,0.35)",
                    boxShadow: "0 0 40px rgba(37,99,235,0.08)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Upload,
                    {
                      className: "w-10 h-10",
                      style: { color: "rgba(37,99,235,0.7)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[15px] font-semibold mb-1",
                    style: { color: "rgba(255,255,255,0.6)" },
                    children: "Drop video here to start editing"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[12px]",
                    style: { color: "rgba(255,255,255,0.25)" },
                    children: "Supports MP4, MOV, WebM and more"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-semibold cursor-pointer transition-all hover:opacity-90",
                  style: {
                    background: "rgba(37,99,235,0.15)",
                    border: "1px solid rgba(37,99,235,0.35)",
                    color: "#60a5fa"
                  },
                  "data-ocid": "editor-upload-button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                    "Browse files",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "file",
                        accept: "video/*,audio/*",
                        className: "hidden",
                        onChange: onFileChange
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) }),
        videoSrc && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-full px-3 pb-3", style: { zIndex: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 px-3 py-2 rounded-xl",
            style: {
              background: "rgba(15,23,42,0.96)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: editor.rewind,
                  className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all",
                  "aria-label": "Skip to start",
                  "data-ocid": "editor-skip-back-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipBack, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: editor.togglePlay,
                  className: "w-9 h-9 flex items-center justify-center rounded-xl transition-all",
                  style: {
                    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                    boxShadow: store.isPlaying ? "0 0 16px rgba(37,99,235,0.6)" : "0 0 8px rgba(37,99,235,0.3)",
                    color: "white"
                  },
                  "aria-label": store.isPlaying ? "Pause" : "Play",
                  "data-ocid": "editor-monitor-play-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: store.isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0.7, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      exit: { scale: 0.7, opacity: 0 },
                      transition: { duration: 0.1 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4" })
                    },
                    "pause"
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0.7, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      exit: { scale: 0.7, opacity: 0 },
                      transition: { duration: 0.1 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 ml-0.5" })
                    },
                    "play"
                  ) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.stepFrame(30),
                  className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all",
                  "aria-label": "Skip forward",
                  "data-ocid": "editor-skip-forward-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4 mx-0.5",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-[11px] font-mono tabular-nums",
                  style: { color: "rgba(255,255,255,0.7)", minWidth: 96 },
                  children: [
                    editor.currentTimeFormatted,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.25)" }, children: " / " }),
                    editor.videoDurationFormatted
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: toggleMute,
                    className: "w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white/70 transition-all",
                    "aria-label": store.isMuted ? "Unmute" : "Mute",
                    "data-ocid": "editor-volume-mute-btn",
                    children: store.isMuted || store.volume === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: store.isMuted ? 0 : Math.round(store.volume * 100),
                    onChange: handleVolumeChange,
                    className: "w-20 cursor-pointer",
                    style: { accentColor: "#2563EB", height: 3 },
                    "aria-label": "Volume",
                    "data-ocid": "editor-volume-slider"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-px h-4 mx-0.5",
                  style: { background: "rgba(255,255,255,0.08)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowSpeedMenu((v) => !v),
                    className: "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all hover:bg-white/5",
                    style: {
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    "data-ocid": "editor-speed-btn",
                    children: [
                      store.playbackSpeed,
                      "x"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSpeedMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 4, scale: 0.95 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: 4, scale: 0.95 },
                    transition: { duration: 0.12 },
                    className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 py-1.5 rounded-xl overflow-hidden",
                    style: {
                      background: "#0F172A",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                      minWidth: 70,
                      zIndex: 100
                    },
                    "data-ocid": "editor-speed-menu",
                    children: SPEED_OPTIONS.map((spd) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "w-full px-3 py-1.5 text-[11px] font-semibold text-left transition-colors hover:bg-white/5",
                        style: {
                          color: store.playbackSpeed === spd ? "#3b82f6" : "rgba(255,255,255,0.5)",
                          background: store.playbackSpeed === spd ? "rgba(37,99,235,0.1)" : "transparent"
                        },
                        onClick: () => {
                          editor.setSpeed(spd);
                          setShowSpeedMenu(false);
                        },
                        "data-ocid": `editor-speed-option-${spd}`,
                        children: [
                          spd,
                          "x"
                        ]
                      },
                      spd
                    ))
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-0 rounded-lg overflow-hidden",
                  style: { border: "1px solid rgba(255,255,255,0.08)" },
                  children: ["fit", "fill", "100"].map((z) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPreviewZoom(z),
                      className: "px-2 py-1 text-[10px] font-bold transition-all",
                      style: {
                        background: previewZoom === z ? "rgba(37,99,235,0.2)" : "transparent",
                        color: previewZoom === z ? "#3b82f6" : "rgba(255,255,255,0.3)"
                      },
                      "data-ocid": `editor-zoom-${z}`,
                      children: z === "100" ? "100%" : z.charAt(0).toUpperCase() + z.slice(1)
                    },
                    z
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => editor.toggleFullscreen(
                    containerRef
                  ),
                  className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all",
                  "aria-label": isFullscreen ? "Exit fullscreen" : "Fullscreen",
                  "data-ocid": "editor-fullscreen-btn",
                  children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "video/*,audio/*",
            className: "hidden",
            onChange: onFileChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, preload: "metadata", className: "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions", label: "Audio" }) })
      ]
    }
  );
}
export {
  EditorTopBar as E,
  VideoMonitor as V,
  useVideoEditor as a,
  EditorLeftSidebar as b,
  EditorRightPanel as c,
  useVideoEditorStore as u
};
