import type {
  CanvasElement,
  EditorState,
  Layer,
  RightPanelTab,
  SidebarSection,
  TextElement,
  Tool,
} from "@/types/editor";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const MAX_HISTORY = 20;

// ─── Demo Elements ────────────────────────────────────────────────────────────

const DEMO_ELEMENTS: CanvasElement[] = [
  {
    id: "demo-bg",
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    fillColor: "#0a0f1a",
    borderColor: "#0a0f1a",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: true,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0a0f1a", "#0d1a2e"],
      angle: 135,
    },
  },
  {
    id: "demo-glow",
    type: "circle",
    name: "Glow Accent",
    x: 800,
    y: 100,
    width: 500,
    height: 500,
    fillColor: "#2563EB",
    borderColor: "#2563EB",
    borderWidth: 0,
    opacity: 0.12,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
  },
  {
    id: "demo-accent",
    type: "rect",
    name: "Accent Bar",
    x: 60,
    y: 60,
    width: 6,
    height: 600,
    fillColor: "#22C55E",
    borderColor: "#22C55E",
    borderWidth: 0,
    borderRadius: 3,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
  },
  {
    id: "demo-headline",
    type: "text",
    name: "Headline",
    x: 100,
    y: 220,
    width: 700,
    height: 120,
    content: "ELYSIAN LABS",
    fontSize: 96,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: -2,
    lineHeight: 1.1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true,
    gradientText: true,
    gradientColors: ["#ffffff", "#22C55E"],
  } as TextElement,
  {
    id: "demo-sub",
    type: "text",
    name: "Subtitle",
    x: 100,
    y: 360,
    width: 600,
    height: 60,
    content: "Design. Create. Inspire.",
    fontSize: 36,
    color: "#22C55E",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
  } as TextElement,
  {
    id: "demo-cta-bg",
    type: "rect",
    name: "CTA Button",
    x: 100,
    y: 460,
    width: 260,
    height: 64,
    fillColor: "#2563EB",
    borderColor: "#2563EB",
    borderWidth: 0,
    borderRadius: 32,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true,
  },
  {
    id: "demo-cta-text",
    type: "text",
    name: "CTA Text",
    x: 120,
    y: 482,
    width: 220,
    height: 36,
    content: "Get Started Free",
    fontSize: 22,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
  } as TextElement,
];

// ─── Demo Layers ──────────────────────────────────────────────────────────────

const DEMO_LAYERS: Layer[] = DEMO_ELEMENTS.map((el) => ({
  id: `layer-${el.id}`,
  name: el.name,
  elementId: el.id,
  visible: el.visible,
  locked: el.locked,
  type: el.type,
})).reverse(); // Reverse so top layer appears first

// ─── Store Interface ──────────────────────────────────────────────────────────

interface EditorActions {
  addElement: (el: CanvasElement) => void;
  removeElement: (id: string) => void;
  removeElements: (ids: string[]) => void;
  updateElement: (id: string, patch: Partial<CanvasElement>) => void;
  selectElements: (ids: string[]) => void;
  clearSelection: () => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  undo: () => void;
  redo: () => void;
  pushHistory: (elements: CanvasElement[]) => void;
  setActiveTool: (tool: Tool) => void;
  setActiveSection: (section: SidebarSection) => void;
  setActiveRightTab: (tab: RightPanelTab) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  setCanvasSize: (width: number, height: number) => void;
  setProjectName: (name: string) => void;
  markSaved: () => void;
  setLayers: (layers: Layer[]) => void;
  updateLayer: (id: string, patch: Partial<Layer>) => void;
  duplicateElement: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  setElements: (elements: CanvasElement[]) => void;
}

type StoreState = EditorState & EditorActions;

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: EditorState = {
  elements: DEMO_ELEMENTS,
  selectedIds: [],
  activeLayerId: null,
  layers: DEMO_LAYERS,
  history: [DEMO_ELEMENTS],
  historyIndex: 0,
  canvasWidth: 1280,
  canvasHeight: 720,
  zoom: 0.6,
  pan: { x: 0, y: 0 },
  gridEnabled: false,
  snapEnabled: true,
  activeTool: "select",
  activeSection: "templates",
  activeRightTab: "layers",
  projectName: "Elysian Creator — Untitled",
  lastSaved: null,
  isDirty: false,
};

// ─── Helper: sync layers from elements ────────────────────────────────────────

function syncLayers(elements: CanvasElement[]): Layer[] {
  return [...elements].reverse().map((el) => ({
    id: `layer-${el.id}`,
    name: el.name,
    elementId: el.id,
    visible: el.visible,
    locked: el.locked,
    type: el.type,
  }));
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useEditorStore = create<StoreState>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      addElement: (el) =>
        set((s) => {
          (s.elements as unknown as CanvasElement[]).push(el);
          s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
          (s.history as unknown as CanvasElement[][]).push([
            ...(s.elements as unknown as CanvasElement[]),
          ]);
          s.history = s.history.slice(
            0,
            s.historyIndex + 1,
          ) as unknown as typeof s.history;
          if (s.history.length > MAX_HISTORY) s.history.shift();
          else s.historyIndex++;
          s.isDirty = true;
        }),

      removeElement: (id) =>
        set((s) => {
          s.elements = s.elements.filter(
            (e) => e.id !== id,
          ) as unknown as typeof s.elements;
          s.selectedIds = s.selectedIds.filter((sid) => sid !== id);
          s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
          s.isDirty = true;
        }),

      removeElements: (ids) =>
        set((s) => {
          s.elements = s.elements.filter(
            (e) => !ids.includes(e.id),
          ) as unknown as typeof s.elements;
          s.selectedIds = s.selectedIds.filter((sid) => !ids.includes(sid));
          s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
          s.isDirty = true;
        }),

      updateElement: (id, patch) =>
        set((s) => {
          const idx = s.elements.findIndex((e) => e.id === id);
          if (idx !== -1) {
            Object.assign(s.elements[idx], patch);
            s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
            s.isDirty = true;
          }
        }),

      setElements: (elements) =>
        set((s) => {
          s.elements = elements as unknown as typeof s.elements;
          s.layers = syncLayers(elements);
          s.isDirty = true;
        }),

      selectElements: (ids) =>
        set((s) => {
          s.selectedIds = ids;
          s.activeLayerId = ids.length === 1 ? `layer-${ids[0]}` : null;
        }),

      clearSelection: () =>
        set((s) => {
          s.selectedIds = [];
          s.activeLayerId = null;
        }),

      setZoom: (zoom) =>
        set((s) => {
          s.zoom = Math.max(0.1, Math.min(4, zoom));
        }),

      setPan: (pan) =>
        set((s) => {
          s.pan = pan;
        }),

      pushHistory: (elements) =>
        set((s) => {
          s.history = s.history.slice(
            0,
            s.historyIndex + 1,
          ) as unknown as typeof s.history;
          (s.history as unknown as CanvasElement[][]).push(
            elements.map((e) => ({ ...e })),
          );
          if (s.history.length > MAX_HISTORY) s.history.shift();
          else s.historyIndex++;
        }),

      undo: () =>
        set((s) => {
          if (s.historyIndex > 0) {
            s.historyIndex--;
            s.elements = (
              s.history[s.historyIndex] as unknown as CanvasElement[]
            ).map((e) => ({ ...e })) as unknown as typeof s.elements;
            s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
            s.selectedIds = [];
          }
        }),

      redo: () =>
        set((s) => {
          if (s.historyIndex < s.history.length - 1) {
            s.historyIndex++;
            s.elements = (
              s.history[s.historyIndex] as unknown as CanvasElement[]
            ).map((e) => ({ ...e })) as unknown as typeof s.elements;
            s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
            s.selectedIds = [];
          }
        }),

      setActiveTool: (tool) =>
        set((s) => {
          s.activeTool = tool;
        }),

      setActiveSection: (section) =>
        set((s) => {
          s.activeSection = section;
        }),

      setActiveRightTab: (tab) =>
        set((s) => {
          s.activeRightTab = tab;
        }),

      toggleGrid: () =>
        set((s) => {
          s.gridEnabled = !s.gridEnabled;
        }),

      toggleSnap: () =>
        set((s) => {
          s.snapEnabled = !s.snapEnabled;
        }),

      setCanvasSize: (width, height) =>
        set((s) => {
          s.canvasWidth = width;
          s.canvasHeight = height;
          s.isDirty = true;
        }),

      setProjectName: (name) =>
        set((s) => {
          s.projectName = name;
          s.isDirty = true;
        }),

      markSaved: () =>
        set((s) => {
          s.lastSaved = Date.now();
          s.isDirty = false;
        }),

      setLayers: (layers) =>
        set((s) => {
          s.layers = layers;
          // Reorder elements to match layer order (layers are top-to-bottom)
          const reordered = [...layers]
            .reverse()
            .map((l) =>
              (s.elements as unknown as CanvasElement[]).find(
                (e) => e.id === l.elementId,
              ),
            )
            .filter(Boolean) as CanvasElement[];
          s.elements = reordered as unknown as typeof s.elements;
          s.isDirty = true;
        }),

      updateLayer: (id, patch) =>
        set((s) => {
          const idx = s.layers.findIndex((l) => l.id === id);
          if (idx !== -1) {
            Object.assign(s.layers[idx], patch);
            // Sync visibility/lock back to element
            const layer = s.layers[idx];
            const elIdx = s.elements.findIndex((e) => e.id === layer.elementId);
            if (elIdx !== -1) {
              if (patch.visible !== undefined)
                s.elements[elIdx].visible = patch.visible;
              if (patch.locked !== undefined)
                s.elements[elIdx].locked = patch.locked;
            }
          }
        }),

      duplicateElement: (id) => {
        const { elements } = get();
        const el = elements.find((e) => e.id === id);
        if (!el) return;
        const newEl = {
          ...el,
          id: `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: `${el.name} (copy)`,
          x: el.x + 20,
          y: el.y + 20,
        } as CanvasElement;
        set((s) => {
          (s.elements as unknown as CanvasElement[]).push(newEl);
          s.layers = syncLayers(s.elements as unknown as CanvasElement[]);
          s.selectedIds = [newEl.id];
          s.isDirty = true;
        });
      },

      bringForward: (id) =>
        set((s) => {
          const elems = s.elements as unknown as CanvasElement[];
          const idx = elems.findIndex((e) => e.id === id);
          if (idx < elems.length - 1) {
            const temp = elems[idx];
            elems[idx] = elems[idx + 1];
            elems[idx + 1] = temp;
            s.layers = syncLayers(elems);
          }
        }),

      sendBackward: (id) =>
        set((s) => {
          const elems = s.elements as unknown as CanvasElement[];
          const idx = elems.findIndex((e) => e.id === id);
          if (idx > 0) {
            const temp = elems[idx];
            elems[idx] = elems[idx - 1];
            elems[idx - 1] = temp;
            s.layers = syncLayers(elems);
          }
        }),

      bringToFront: (id) =>
        set((s) => {
          const elems = s.elements as unknown as CanvasElement[];
          const idx = elems.findIndex((e) => e.id === id);
          if (idx !== -1) {
            const [el] = elems.splice(idx, 1);
            elems.push(el);
            s.layers = syncLayers(elems);
          }
        }),

      sendToBack: (id) =>
        set((s) => {
          const elems = s.elements as unknown as CanvasElement[];
          const idx = elems.findIndex((e) => e.id === id);
          if (idx !== -1) {
            const [el] = elems.splice(idx, 1);
            elems.unshift(el);
            s.layers = syncLayers(elems);
          }
        }),
    })),
    {
      name: "elysian-editor-state",
      // Only persist non-ephemeral state (skip image HTMLElement refs)
      partialize: (state) => ({
        projectName: state.projectName,
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        gridEnabled: state.gridEnabled,
        snapEnabled: state.snapEnabled,
        zoom: state.zoom,
        elements: state.elements.map((el) =>
          el.type === "image" ? { ...el, img: null } : el,
        ),
        layers: state.layers,
        lastSaved: state.lastSaved,
      }),
    },
  ),
);
