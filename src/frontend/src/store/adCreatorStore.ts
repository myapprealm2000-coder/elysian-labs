import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimationPreset {
  type:
    | "fade"
    | "slide"
    | "zoom"
    | "bounce"
    | "cinematic"
    | "typewriter"
    | "blurReveal";
  duration: number;
  delay: number;
  easing: string;
}

export interface ImageFilters {
  brightness: number; // 0–200, default 100
  contrast: number; // 0–200, default 100
  saturation: number; // 0–200, default 100
  blur: number; // 0–20px, default 0
  hue: number; // 0–360, default 0
}

export interface ShadowConfig {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export interface GlowConfig {
  color: string;
  intensity: number;
}

export interface OutlineConfig {
  color: string;
  width: number;
}

export type ElementType = "text" | "image" | "shape" | "group";
export type ShapeType = "rect" | "circle" | "triangle" | "blob" | "arrow";
export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion";

interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  name: string;
}

export interface TextCanvasElement extends BaseElement {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  textAlign: "left" | "center" | "right" | "justify";
  lineHeight: number;
  letterSpacing: number;
  gradient: boolean;
  gradientColors: string[];
  shadow: ShadowConfig | null;
  glow: GlowConfig | null;
  outline: OutlineConfig | null;
  animation: AnimationPreset | null;
  blendMode: BlendMode;
}

export interface ImageCanvasElement extends BaseElement {
  type: "image";
  src: string;
  filters: ImageFilters;
  shadow: ShadowConfig | null;
  backgroundRemoved: boolean;
  mask: string | null; // SVG path or preset name
}

export interface ShapeCanvasElement extends BaseElement {
  type: "shape";
  shapeType: ShapeType;
  fill: string;
  gradient: string | null; // CSS gradient string
  stroke: string;
  strokeWidth: number;
  strokeDash: number[];
  glow: GlowConfig | null;
  shadow: ShadowConfig | null;
  cornerRadius: number;
}

export interface GroupCanvasElement extends BaseElement {
  type: "group";
  childIds: string[];
}

export type CanvasElement =
  | TextCanvasElement
  | ImageCanvasElement
  | ShapeCanvasElement
  | GroupCanvasElement;

export interface Layer {
  id: string;
  elementId: string;
  name: string;
  visible: boolean;
  locked: boolean;
  children: Layer[]; // for group layers
}

export interface CanvasSize {
  width: number;
  height: number;
  name: string;
}

export interface Brand {
  logoUrl: string;
  colors: string[];
  fonts: string[];
}

// ─── Presets ────────────────────────────────────────────────────────────────────

export const CANVAS_PRESETS: CanvasSize[] = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "TikTok", width: 1080, height: 1920 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Story", width: 1080, height: 1920 },
  { name: "LinkedIn", width: 1200, height: 627 },
  { name: "Twitter/X Banner", width: 1500, height: 500 },
  { name: "Facebook Ad", width: 1200, height: 628 },
  { name: "Custom", width: 800, height: 600 },
];

// ─── Demo Elements ────────────────────────────────────────────────────────────

const DEMO_ELEMENTS: CanvasElement[] = [
  {
    id: "ad-bg",
    type: "shape",
    name: "Background",
    x: 0,
    y: 0,
    width: 1080,
    height: 1080,
    rotation: 0,
    opacity: 1,
    locked: true,
    visible: true,
    shapeType: "rect",
    fill: "linear-gradient(135deg, #1e1b4b, #312e81, #1e40af)",
    gradient: "linear-gradient(135deg, #1e1b4b, #312e81, #1e40af)",
    stroke: "transparent",
    strokeWidth: 0,
    strokeDash: [],
    glow: null,
    shadow: null,
    cornerRadius: 0,
  } as ShapeCanvasElement,
  {
    id: "ad-headline",
    type: "text",
    name: "Headline",
    x: 340,
    y: 320,
    width: 400,
    height: 90,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    content: "Your Brand Here",
    fontFamily: "Inter",
    fontSize: 72,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 1.2,
    letterSpacing: -1,
    gradient: false,
    gradientColors: ["#ffffff", "#94a3b8"],
    shadow: null,
    glow: null,
    outline: null,
    animation: null,
    blendMode: "normal",
  } as TextCanvasElement,
  {
    id: "ad-subtitle",
    type: "text",
    name: "Subtitle",
    x: 290,
    y: 420,
    width: 500,
    height: 50,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    content: "Create Something Amazing",
    fontFamily: "Inter",
    fontSize: 32,
    fontWeight: "400",
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 1.4,
    letterSpacing: 0,
    gradient: false,
    gradientColors: ["#94a3b8", "#64748b"],
    shadow: null,
    glow: null,
    outline: null,
    animation: null,
    blendMode: "normal",
  } as TextCanvasElement,
  {
    id: "ad-cta",
    type: "shape",
    name: "CTA Button",
    x: 390,
    y: 520,
    width: 300,
    height: 60,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    shapeType: "rect",
    fill: "#2563EB",
    gradient: null,
    stroke: "transparent",
    strokeWidth: 0,
    strokeDash: [],
    glow: { color: "#2563EB", intensity: 0.4 },
    shadow: { x: 0, y: 4, blur: 24, spread: 0, color: "rgba(37,99,235,0.5)" },
    cornerRadius: 30,
  } as ShapeCanvasElement,
];

function makeLayers(elements: CanvasElement[]): Layer[] {
  return [...elements].reverse().map((el) => ({
    id: `layer-${el.id}`,
    elementId: el.id,
    name: el.name,
    visible: el.visible,
    locked: el.locked,
    children: [],
  }));
}

// ─── Store Interface ────────────────────────────────────────────────────────────

const MAX_HISTORY = 50;

export interface AdCreatorState {
  // Canvas
  elements: CanvasElement[];
  layers: Layer[];
  selectedIds: string[];
  canvasSize: CanvasSize;
  zoom: number;
  panX: number;
  panY: number;
  snapEnabled: boolean;
  gridVisible: boolean;
  /** Incremented each time a template is applied — forces canvas key change */
  renderKey: number;
  // History
  history: CanvasElement[][];
  historyIndex: number;
  // UI
  activeTab: string;
  sidebarCollapsed: boolean;
  rightPanelTab: string;
  // Project
  projectTitle: string;
  isSaved: boolean;
  isExporting: boolean;
  showTimeline: boolean;
  // Brand
  brand: Brand;
  // Clipboard
  clipboard: CanvasElement | null;
}

export interface AdCreatorActions {
  addElement: (element: Omit<CanvasElement, "id">) => void;
  /** Atomically replace ALL canvas elements (used by template apply). Resets history, zoom, and pan. */
  setElements: (elements: CanvasElement[], selectFirstId?: string) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  selectElement: (id: string, multiSelect?: boolean) => void;
  deselectAll: () => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, width: number, height: number) => void;
  rotateElement: (id: string, rotation: number) => void;
  reorderLayer: (fromIndex: number, toIndex: number) => void;
  toggleLayerVisibility: (id: string) => void;
  toggleLayerLock: (id: string) => void;
  renameLayer: (id: string, name: string) => void;
  groupLayers: (ids: string[]) => void;
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  setCanvasSize: (size: CanvasSize) => void;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
  setRightPanelTab: (tab: string) => void;
  setProjectTitle: (title: string) => void;
  copyElement: (id: string) => void;
  pasteElement: () => void;
  setBrand: (brand: Partial<Brand>) => void;
  setSnapEnabled: (enabled: boolean) => void;
  toggleTimeline: () => void;
  setIsExporting: (exporting: boolean) => void;
  setGridVisible: (visible: boolean) => void;
  /** Incremented each time a template is applied — forces canvas key change */
  renderKey: number;
}

type AdCreatorStore = AdCreatorState & AdCreatorActions;

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: AdCreatorState = {
  elements: DEMO_ELEMENTS,
  layers: makeLayers(DEMO_ELEMENTS),
  selectedIds: [],
  canvasSize: CANVAS_PRESETS[0], // Instagram Post 1080x1080
  zoom: 0.5,
  panX: 0,
  panY: 0,
  snapEnabled: true,
  gridVisible: false,
  renderKey: 0,
  history: [DEMO_ELEMENTS],
  historyIndex: 0,
  activeTab: "templates",
  sidebarCollapsed: false,
  rightPanelTab: "style",
  projectTitle: "Untitled Ad",
  isSaved: true,
  isExporting: false,
  showTimeline: false,
  brand: {
    logoUrl: "",
    colors: ["#2563EB", "#22C55E", "#ffffff", "#111827"],
    fonts: ["Inter", "Plus Jakarta Sans"],
  },
  clipboard: null,
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

function pushHistory(
  elements: CanvasElement[],
  history: CanvasElement[][],
  historyIndex: number,
): { history: CanvasElement[][]; historyIndex: number } {
  const newHistory = [
    ...history.slice(0, historyIndex + 1),
    elements.map((e) => ({ ...e })),
  ];
  if (newHistory.length > MAX_HISTORY) newHistory.shift();
  return {
    history: newHistory,
    historyIndex: Math.min(historyIndex + 1, MAX_HISTORY - 1),
  };
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAdCreatorStore = create<AdCreatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addElement: (element) => {
        const state = get();
        const id = `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        // Guarantee all required fields are present and valid
        const newEl = {
          ...element,
          id,
          visible: true,
          opacity:
            typeof element.opacity === "number" && element.opacity > 0
              ? element.opacity
              : 1,
          width: element.width > 0 ? element.width : 100,
          height: element.height > 0 ? element.height : 100,
        } as CanvasElement;
        const newElements = [...state.elements, newEl];
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [id],
          isSaved: false,
        });
      },

      setElements: (elements, selectFirstId) => {
        // Sanitize every element: ensure visible, opacity, width, height
        const sanitized: CanvasElement[] = elements.map((el) => ({
          ...el,
          visible: true,
          opacity:
            typeof el.opacity === "number" && el.opacity > 0 ? el.opacity : 1,
          width: el.width > 0 ? el.width : 100,
          height: el.height > 0 ? el.height : 100,
        }));
        // Fallback: if somehow empty, inject a safe default so canvas is never blank
        const safe =
          sanitized.length > 0
            ? sanitized
            : ([
                {
                  id: `el-fallback-${Date.now()}`,
                  type: "shape",
                  name: "Background",
                  x: 0,
                  y: 0,
                  width: 1080,
                  height: 1080,
                  rotation: 0,
                  opacity: 1,
                  locked: false,
                  visible: true,
                  shapeType: "rect",
                  fill: "linear-gradient(135deg,#1e1b4b,#1e40af)",
                  gradient: "linear-gradient(135deg,#1e1b4b,#1e40af)",
                  stroke: "transparent",
                  strokeWidth: 0,
                  strokeDash: [],
                  glow: null,
                  shadow: null,
                  cornerRadius: 0,
                } as CanvasElement,
              ] as CanvasElement[]);
        const { renderKey } = get();
        const nextKey = renderKey + 1;
        console.log(
          "[adCreatorStore] setElements — new renderKey:",
          nextKey,
          "element count:",
          safe.length,
        );
        set({
          elements: safe,
          layers: makeLayers(safe),
          selectedIds: selectFirstId
            ? [selectFirstId]
            : safe[0]
              ? [safe[0].id]
              : [],
          zoom: 0.45,
          panX: 0,
          panY: 0,
          renderKey: nextKey,
          isSaved: false,
          history: [safe.map((e) => ({ ...e }))],
          historyIndex: 0,
        });
      },

      updateElement: (id, updates) => {
        const { elements, layers } = get();
        const idx = elements.findIndex((e) => e.id === id);
        if (idx === -1) return;
        const newElements = elements.map((e) =>
          e.id === id ? ({ ...e, ...updates } as CanvasElement) : e,
        );
        const newLayers = updates.name
          ? layers.map((l) =>
              l.elementId === id ? { ...l, name: updates.name as string } : l,
            )
          : layers;
        set({ elements: newElements, layers: newLayers, isSaved: false });
      },

      deleteElement: (id) => {
        const state = get();
        const newElements = state.elements.filter((e) => e.id !== id);
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          selectedIds: state.selectedIds.filter((sid) => sid !== id),
          layers: makeLayers(newElements),
          isSaved: false,
        });
      },

      duplicateElement: (id) => {
        const state = get();
        const el = state.elements.find((e) => e.id === id);
        if (!el) return;
        const newEl = {
          ...el,
          id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: `${el.name} copy`,
          x: el.x + 24,
          y: el.y + 24,
        } as CanvasElement;
        const newElements = [...state.elements, newEl];
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [newEl.id],
          isSaved: false,
        });
      },

      selectElement: (id, multiSelect = false) => {
        const { selectedIds } = get();
        if (multiSelect) {
          set({
            selectedIds: selectedIds.includes(id)
              ? selectedIds.filter((sid) => sid !== id)
              : [...selectedIds, id],
          });
        } else {
          set({ selectedIds: [id] });
        }
      },

      deselectAll: () => set({ selectedIds: [] }),

      moveElement: (id, x, y) => {
        const { elements } = get();
        set({
          elements: elements.map((e) => (e.id === id ? { ...e, x, y } : e)),
          isSaved: false,
        });
      },

      resizeElement: (id, width, height) => {
        const { elements } = get();
        set({
          elements: elements.map((e) =>
            e.id === id
              ? { ...e, width: Math.max(4, width), height: Math.max(4, height) }
              : e,
          ),
          isSaved: false,
        });
      },

      rotateElement: (id, rotation) => {
        const { elements } = get();
        set({
          elements: elements.map((e) =>
            e.id === id ? { ...e, rotation: rotation % 360 } : e,
          ),
          isSaved: false,
        });
      },

      reorderLayer: (fromIndex, toIndex) => {
        if (fromIndex === toIndex) return;
        const { layers, elements } = get();
        const newLayers = [...layers];
        const [moved] = newLayers.splice(fromIndex, 1);
        newLayers.splice(toIndex, 0, moved);
        const reordered = [...newLayers]
          .reverse()
          .map((l) => elements.find((e) => e.id === l.elementId))
          .filter(Boolean) as CanvasElement[];
        set({ layers: newLayers, elements: reordered, isSaved: false });
      },

      toggleLayerVisibility: (id) => {
        const { layers, elements } = get();
        const layerIdx = layers.findIndex((l) => l.elementId === id);
        if (layerIdx === -1) return;
        const newVisible = !layers[layerIdx].visible;
        set({
          layers: layers.map((l) =>
            l.elementId === id ? { ...l, visible: newVisible } : l,
          ),
          elements: elements.map((e) =>
            e.id === id ? { ...e, visible: newVisible } : e,
          ),
        });
      },

      toggleLayerLock: (id) => {
        const { layers, elements } = get();
        const layerIdx = layers.findIndex((l) => l.elementId === id);
        if (layerIdx === -1) return;
        const newLocked = !layers[layerIdx].locked;
        set({
          layers: layers.map((l) =>
            l.elementId === id ? { ...l, locked: newLocked } : l,
          ),
          elements: elements.map((e) =>
            e.id === id ? { ...e, locked: newLocked } : e,
          ),
        });
      },

      renameLayer: (id, name) => {
        const { layers, elements } = get();
        set({
          layers: layers.map((l) => (l.elementId === id ? { ...l, name } : l)),
          elements: elements.map((e) => (e.id === id ? { ...e, name } : e)),
        });
      },

      groupLayers: (ids) => {
        const { elements } = get();
        const groupId = `group-${Date.now()}`;
        const groupEl: GroupCanvasElement = {
          id: groupId,
          type: "group",
          name: "Group",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          childIds: ids,
        };
        const newElements = [...elements, groupEl];
        set({
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [groupId],
          isSaved: false,
        });
      },

      saveHistory: () => {
        const { elements, history, historyIndex } = get();
        set(pushHistory(elements, history, historyIndex));
      },

      undo: () => {
        const { historyIndex, history } = get();
        if (historyIndex <= 0) return;
        const newIndex = historyIndex - 1;
        const newElements = history[newIndex].map((e) => ({
          ...e,
        })) as CanvasElement[];
        set({
          historyIndex: newIndex,
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [],
        });
      },

      redo: () => {
        const { historyIndex, history } = get();
        if (historyIndex >= history.length - 1) return;
        const newIndex = historyIndex + 1;
        const newElements = history[newIndex].map((e) => ({
          ...e,
        })) as CanvasElement[];
        set({
          historyIndex: newIndex,
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [],
        });
      },

      setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(4.0, zoom)) }),

      setPan: (x, y) => set({ panX: x, panY: y }),

      setCanvasSize: (size) => set({ canvasSize: size, isSaved: false }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      setRightPanelTab: (tab) => set({ rightPanelTab: tab }),

      setProjectTitle: (title) => set({ projectTitle: title, isSaved: false }),

      copyElement: (id) => {
        const { elements } = get();
        const el = elements.find((e) => e.id === id);
        if (el) set({ clipboard: { ...el } });
      },

      pasteElement: () => {
        const state = get();
        const { clipboard } = state;
        if (!clipboard) return;
        const newEl = {
          ...clipboard,
          id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: `${clipboard.name} copy`,
          x: clipboard.x + 24,
          y: clipboard.y + 24,
        } as CanvasElement;
        const newElements = [...state.elements, newEl];
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [newEl.id],
          isSaved: false,
        });
      },

      setBrand: (brand) => {
        const current = get().brand;
        set({ brand: { ...current, ...brand } });
      },

      setSnapEnabled: (enabled) => set({ snapEnabled: enabled }),

      toggleTimeline: () => set((s) => ({ showTimeline: !s.showTimeline })),

      setIsExporting: (exporting) => set({ isExporting: exporting }),

      setGridVisible: (visible) => set({ gridVisible: visible }),
    }),
    {
      name: "elysian-ad-creator-state",
      partialize: (state) => ({
        projectTitle: state.projectTitle,
        canvasSize: state.canvasSize,
        zoom: state.zoom,
        snapEnabled: state.snapEnabled,
        gridVisible: state.gridVisible,
        showTimeline: state.showTimeline,
        brand: state.brand,
        activeTab: state.activeTab,
        sidebarCollapsed: state.sidebarCollapsed,
        rightPanelTab: state.rightPanelTab,
        renderKey: state.renderKey,
        elements: state.elements.filter(
          (el) => el.type !== "image" || (el as ImageCanvasElement).src,
        ),
        layers: state.layers,
      }),
    },
  ),
);
