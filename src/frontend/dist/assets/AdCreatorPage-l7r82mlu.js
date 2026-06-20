const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-De5ctwPQ.js","assets/vendor-80nuMd8G.js","assets/motion-DXodcWnX.js","assets/ui-lib-DG52wkUx.js","assets/index-DAfWXb41.css"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { j as jsxRuntimeExports, r as reactExports } from "./vendor-80nuMd8G.js";
import { p as persist } from "./middleware-3icvfaAY.js";
import { c as create } from "./react-9ph_Ps2d.js";
import { a9 as AlignCenter, aK as ZoomOut, aL as ZoomIn, i as Maximize2, aQ as RotateCcw, aO as Copy, aC as ChevronUp, z as ChevronDown, a4 as BringToFront, a5 as SendToBack, ah as Lock, L as Layers, R as RefreshCw, T as Trash2, J as Type, aM as Square, I as Image$1, a8 as AlignLeft, aa as AlignRight, ac as AlignJustify, b7 as MoveHorizontal, b8 as MoveVertical, b9 as FlipHorizontal2, ba as FlipVertical2, bb as ArrowUp, bc as ArrowDown, W as WandSparkles, S as Sparkles, bd as MessageSquare, be as ImagePlay, ao as ArrowRight, aV as Smile, F as Film, N as Search, bf as QrCode, bg as ChartColumn, b4 as Pause, aJ as Play, e as Plus, U as Upload, aq as Palette, aw as Twitter, aG as Instagram, aP as Youtube, ax as Linkedin, aB as Heart, $ as Star, Z as Zap, bh as Diamond, bi as Flame, ae as GripVertical, af as Eye, ag as EyeOff, ai as LockOpen, bj as CircleCheckBig, a2 as Link, X, d as LayoutTemplate, bk as Hexagon, V as Video, aU as Music, l as Grid3x3, O as ChevronRight, bl as ChevronLeft, u as Undo2, v as Redo2, bm as Expand, b2 as Save, D as Download, y as Share2, h as CircleCheck, o as FileImage, r as FileText, bn as FileVideo, k as Check, bo as Smartphone, bp as Facebook, bq as Monitor } from "./ui-lib-DG52wkUx.js";
import { A as AnimatePresence, m as motion, R as ReorderGroup, a as ReorderItem } from "./motion-DXodcWnX.js";
import { u as ue, a7 as __vitePreload } from "./index-De5ctwPQ.js";
const CANVAS_PRESETS = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "TikTok", width: 1080, height: 1920 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "Story", width: 1080, height: 1920 },
  { name: "LinkedIn", width: 1200, height: 627 },
  { name: "Twitter/X Banner", width: 1500, height: 500 },
  { name: "Facebook Ad", width: 1200, height: 628 },
  { name: "Custom", width: 800, height: 600 }
];
const DEMO_ELEMENTS = [
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
    cornerRadius: 0
  },
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
    blendMode: "normal"
  },
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
    blendMode: "normal"
  },
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
    cornerRadius: 30
  }
];
function makeLayers(elements) {
  return [...elements].reverse().map((el) => ({
    id: `layer-${el.id}`,
    elementId: el.id,
    name: el.name,
    visible: el.visible,
    locked: el.locked,
    children: []
  }));
}
const MAX_HISTORY = 50;
const initialState = {
  elements: DEMO_ELEMENTS,
  layers: makeLayers(DEMO_ELEMENTS),
  selectedIds: [],
  canvasSize: CANVAS_PRESETS[0],
  // Instagram Post 1080x1080
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
    fonts: ["Inter", "Plus Jakarta Sans"]
  },
  clipboard: null
};
function pushHistory(elements, history, historyIndex) {
  const newHistory = [
    ...history.slice(0, historyIndex + 1),
    elements.map((e) => ({ ...e }))
  ];
  if (newHistory.length > MAX_HISTORY) newHistory.shift();
  return {
    history: newHistory,
    historyIndex: Math.min(historyIndex + 1, MAX_HISTORY - 1)
  };
}
const useAdCreatorStore = create()(
  persist(
    (set, get) => ({
      ...initialState,
      addElement: (element) => {
        const state = get();
        const id = `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const newEl = {
          ...element,
          id,
          visible: true,
          opacity: typeof element.opacity === "number" && element.opacity > 0 ? element.opacity : 1,
          width: element.width > 0 ? element.width : 100,
          height: element.height > 0 ? element.height : 100
        };
        const newElements = [...state.elements, newEl];
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [id],
          isSaved: false
        });
      },
      setElements: (elements, selectFirstId) => {
        const sanitized = elements.map((el) => ({
          ...el,
          visible: true,
          opacity: typeof el.opacity === "number" && el.opacity > 0 ? el.opacity : 1,
          width: el.width > 0 ? el.width : 100,
          height: el.height > 0 ? el.height : 100
        }));
        const safe = sanitized.length > 0 ? sanitized : [
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
            cornerRadius: 0
          }
        ];
        const { renderKey } = get();
        const nextKey = renderKey + 1;
        console.log(
          "[adCreatorStore] setElements — new renderKey:",
          nextKey,
          "element count:",
          safe.length
        );
        set({
          elements: safe,
          layers: makeLayers(safe),
          selectedIds: selectFirstId ? [selectFirstId] : safe[0] ? [safe[0].id] : [],
          zoom: 0.45,
          panX: 0,
          panY: 0,
          renderKey: nextKey,
          isSaved: false,
          history: [safe.map((e) => ({ ...e }))],
          historyIndex: 0
        });
      },
      updateElement: (id, updates) => {
        const { elements, layers } = get();
        const idx = elements.findIndex((e) => e.id === id);
        if (idx === -1) return;
        const newElements = elements.map(
          (e) => e.id === id ? { ...e, ...updates } : e
        );
        const newLayers = updates.name ? layers.map(
          (l) => l.elementId === id ? { ...l, name: updates.name } : l
        ) : layers;
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
          isSaved: false
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
          y: el.y + 24
        };
        const newElements = [...state.elements, newEl];
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [newEl.id],
          isSaved: false
        });
      },
      selectElement: (id, multiSelect = false) => {
        const { selectedIds } = get();
        if (multiSelect) {
          set({
            selectedIds: selectedIds.includes(id) ? selectedIds.filter((sid) => sid !== id) : [...selectedIds, id]
          });
        } else {
          set({ selectedIds: [id] });
        }
      },
      deselectAll: () => set({ selectedIds: [] }),
      moveElement: (id, x, y) => {
        const { elements } = get();
        set({
          elements: elements.map((e) => e.id === id ? { ...e, x, y } : e),
          isSaved: false
        });
      },
      resizeElement: (id, width, height) => {
        const { elements } = get();
        set({
          elements: elements.map(
            (e) => e.id === id ? { ...e, width: Math.max(4, width), height: Math.max(4, height) } : e
          ),
          isSaved: false
        });
      },
      rotateElement: (id, rotation) => {
        const { elements } = get();
        set({
          elements: elements.map(
            (e) => e.id === id ? { ...e, rotation: rotation % 360 } : e
          ),
          isSaved: false
        });
      },
      reorderLayer: (fromIndex, toIndex) => {
        if (fromIndex === toIndex) return;
        const { layers, elements } = get();
        const newLayers = [...layers];
        const [moved] = newLayers.splice(fromIndex, 1);
        newLayers.splice(toIndex, 0, moved);
        const reordered = [...newLayers].reverse().map((l) => elements.find((e) => e.id === l.elementId)).filter(Boolean);
        set({ layers: newLayers, elements: reordered, isSaved: false });
      },
      toggleLayerVisibility: (id) => {
        const { layers, elements } = get();
        const layerIdx = layers.findIndex((l) => l.elementId === id);
        if (layerIdx === -1) return;
        const newVisible = !layers[layerIdx].visible;
        set({
          layers: layers.map(
            (l) => l.elementId === id ? { ...l, visible: newVisible } : l
          ),
          elements: elements.map(
            (e) => e.id === id ? { ...e, visible: newVisible } : e
          )
        });
      },
      toggleLayerLock: (id) => {
        const { layers, elements } = get();
        const layerIdx = layers.findIndex((l) => l.elementId === id);
        if (layerIdx === -1) return;
        const newLocked = !layers[layerIdx].locked;
        set({
          layers: layers.map(
            (l) => l.elementId === id ? { ...l, locked: newLocked } : l
          ),
          elements: elements.map(
            (e) => e.id === id ? { ...e, locked: newLocked } : e
          )
        });
      },
      renameLayer: (id, name) => {
        const { layers, elements } = get();
        set({
          layers: layers.map((l) => l.elementId === id ? { ...l, name } : l),
          elements: elements.map((e) => e.id === id ? { ...e, name } : e)
        });
      },
      groupLayers: (ids) => {
        const { elements } = get();
        const groupId = `group-${Date.now()}`;
        const groupEl = {
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
          childIds: ids
        };
        const newElements = [...elements, groupEl];
        set({
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [groupId],
          isSaved: false
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
          ...e
        }));
        set({
          historyIndex: newIndex,
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: []
        });
      },
      redo: () => {
        const { historyIndex, history } = get();
        if (historyIndex >= history.length - 1) return;
        const newIndex = historyIndex + 1;
        const newElements = history[newIndex].map((e) => ({
          ...e
        }));
        set({
          historyIndex: newIndex,
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: []
        });
      },
      setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(4, zoom)) }),
      setPan: (x, y) => set({ panX: x, panY: y }),
      setCanvasSize: (size) => set({ canvasSize: size, isSaved: false }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
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
          y: clipboard.y + 24
        };
        const newElements = [...state.elements, newEl];
        set({
          ...pushHistory(state.elements, state.history, state.historyIndex),
          elements: newElements,
          layers: makeLayers(newElements),
          selectedIds: [newEl.id],
          isSaved: false
        });
      },
      setBrand: (brand) => {
        const current = get().brand;
        set({ brand: { ...current, ...brand } });
      },
      setSnapEnabled: (enabled) => set({ snapEnabled: enabled }),
      toggleTimeline: () => set((s) => ({ showTimeline: !s.showTimeline })),
      setIsExporting: (exporting) => set({ isExporting: exporting }),
      setGridVisible: (visible) => set({ gridVisible: visible })
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
          (el) => el.type !== "image" || el.src
        ),
        layers: state.layers
      })
    }
  )
);
const SNAP_GRID = 8;
const SNAP_THRESHOLD = 5;
const MIN_SIZE = 10;
const ROTATION_HANDLE_OFFSET = 32;
const HANDLE_SIZE = 8;
const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
function snapToGrid(v, grid) {
  return Math.round(v / grid) * grid;
}
function getCursorForHandle(handle) {
  const map = {
    nw: "nw-resize",
    n: "n-resize",
    ne: "ne-resize",
    e: "e-resize",
    se: "se-resize",
    s: "s-resize",
    sw: "sw-resize",
    w: "w-resize"
  };
  return map[handle];
}
function getHandlePos(handle, w, h) {
  const map = {
    nw: { x: 0, y: 0 },
    n: { x: w / 2, y: 0 },
    ne: { x: w, y: 0 },
    e: { x: w, y: h / 2 },
    se: { x: w, y: h },
    s: { x: w / 2, y: h },
    sw: { x: 0, y: h },
    w: { x: 0, y: h / 2 }
  };
  return map[handle];
}
function imgFilters(el) {
  const f = el.filters;
  return [
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturation}%)`,
    `blur(${f.blur}px)`,
    `hue-rotate(${f.hue}deg)`
  ].join(" ");
}
function shadowCss(s) {
  if (!s) return "none";
  return `${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
}
function glowBoxShadow(g, shadow) {
  const parts = [];
  if (shadow) parts.push(shadowCss(shadow));
  if (g) parts.push(`0 0 ${g.intensity * 40}px ${g.color}`);
  return parts.length ? parts.join(", ") : "none";
}
const InlineTextEditor = reactExports.memo(function InlineTextEditor2({
  element,
  zoom,
  onCommit
}) {
  const [value, setValue] = reactExports.useState(element.content);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a, _b;
    (_a = ref.current) == null ? void 0 : _a.focus();
    (_b = ref.current) == null ? void 0 : _b.select();
  }, []);
  const commit = reactExports.useCallback(() => {
    onCommit(value);
  }, [value, onCommit]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      ref,
      value,
      onChange: (e) => setValue(e.target.value),
      onBlur: commit,
      onKeyDown: (e) => {
        e.stopPropagation();
        if (e.key === "Escape") {
          commit();
        }
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          commit();
        }
      },
      onClick: (e) => e.stopPropagation(),
      onPointerDown: (e) => e.stopPropagation(),
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.75)",
        color: element.color,
        fontFamily: element.fontFamily,
        fontSize: element.fontSize / zoom,
        fontWeight: element.fontWeight,
        textAlign: element.textAlign,
        lineHeight: element.lineHeight,
        letterSpacing: element.letterSpacing,
        border: "2px solid #2563EB",
        borderRadius: 4 / zoom,
        padding: `${4 / zoom}px`,
        resize: "none",
        outline: "none",
        zIndex: 9999,
        boxSizing: "border-box",
        cursor: "text"
      }
    }
  );
});
const CanvasElementRenderer = reactExports.memo(function CanvasElementRenderer2({
  element,
  isSelected
}) {
  if (element.type === "text") {
    const el = element;
    const textShadow = el.shadow ? `${el.shadow.x}px ${el.shadow.y}px ${el.shadow.blur}px ${el.shadow.color}` : el.glow ? `0 0 ${el.glow.intensity * 20}px ${el.glow.color}` : void 0;
    const colorStyle = el.gradient ? {
      background: `linear-gradient(135deg, ${el.gradientColors.join(", ")})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    } : { color: el.color };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          fontFamily: el.fontFamily,
          fontSize: el.fontSize,
          fontWeight: el.fontWeight,
          textAlign: el.textAlign,
          lineHeight: el.lineHeight,
          letterSpacing: el.letterSpacing,
          textShadow,
          WebkitTextStroke: el.outline ? `${el.outline.width}px ${el.outline.color}` : void 0,
          cursor: isSelected ? "move" : "pointer",
          userSelect: "none",
          overflow: "hidden",
          wordBreak: "break-word",
          ...colorStyle
        },
        children: el.content
      }
    );
  }
  if (element.type === "image") {
    const el = element;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: el.src,
        alt: el.name,
        draggable: false,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: imgFilters(el),
          cursor: isSelected ? "move" : "pointer",
          userSelect: "none",
          display: "block"
        }
      }
    );
  }
  if (element.type === "shape") {
    const el = element;
    const isCircle = el.shapeType === "circle";
    const isTriangle = el.shapeType === "triangle";
    if (isTriangle) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            width: "100%",
            height: "100%",
            position: "relative",
            cursor: isSelected ? "move" : "pointer"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                background: el.gradient ?? el.fill,
                boxShadow: glowBoxShadow(el.glow, el.shadow)
              }
            }
          )
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          background: el.gradient ?? el.fill,
          border: el.strokeWidth > 0 ? `${el.strokeWidth}px solid ${el.stroke}` : void 0,
          borderRadius: isCircle ? "50%" : el.cornerRadius,
          boxShadow: glowBoxShadow(el.glow, el.shadow),
          cursor: isSelected ? "move" : "pointer"
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        border: "1px dashed rgba(255,255,255,0.2)",
        cursor: "move"
      }
    }
  );
});
function ContextMenu({
  menu,
  onAction,
  onClose
}) {
  const items = [
    { label: "Duplicate", icon: Copy, action: "duplicate" },
    { label: "Bring Forward", icon: ChevronUp, action: "bringForward" },
    { label: "Send Backward", icon: ChevronDown, action: "sendBackward" },
    { label: "Bring to Front", icon: BringToFront, action: "bringToFront" },
    { label: "Send to Back", icon: SendToBack, action: "sendToBack" },
    { label: "Lock", icon: Lock, action: "lock" },
    { label: "Group", icon: Layers, action: "group" },
    { label: "Reset Rotation", icon: RefreshCw, action: "resetRotation" },
    { label: "Delete", icon: Trash2, action: "delete", danger: true }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed z-[200] rounded-xl border border-white/10 py-1.5 min-w-[160px]",
      style: {
        left: menu.x,
        top: menu.y,
        background: "rgba(17,24,39,0.97)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)"
      },
      initial: { opacity: 0, scale: 0.92, y: -4 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.92, y: -4 },
      transition: { duration: 0.12 },
      onMouseLeave: onClose,
      children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: `w-full flex items-center gap-2.5 px-3 py-1.5 text-xs transition-colors ${item.danger ? "text-red-400 hover:bg-red-500/10" : "text-white/70 hover:bg-white/8 hover:text-white"}`,
          onClick: () => {
            onAction(item.action, menu.elementId);
            onClose();
          },
          "data-ocid": `ad_canvas.context_menu.${item.action}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 12 }),
            item.label
          ]
        },
        item.action
      ))
    }
  );
}
function SelectionHandles({
  element,
  zoom,
  onHandleDown,
  onRotateDown
}) {
  const { width: w, height: h } = element;
  const hw = HANDLE_SIZE / zoom;
  const rotHandleY = -ROTATION_HANDLE_OFFSET / zoom;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          inset: -1 / zoom,
          border: `${1.5 / zoom}px solid #2563EB`,
          pointerEvents: "none",
          borderRadius: element.type === "shape" && element.shapeType === "circle" ? "50%" : 2 / zoom
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          position: "absolute",
          bottom: -22 / zoom,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 10 / zoom,
          background: "rgba(37,99,235,0.9)",
          color: "#fff",
          padding: `${2 / zoom}px ${5 / zoom}px`,
          borderRadius: 3 / zoom,
          whiteSpace: "nowrap",
          pointerEvents: "none"
        },
        children: [
          Math.round(element.width),
          " × ",
          Math.round(element.height)
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          left: w / 2 - 0.5 / zoom,
          top: -ROTATION_HANDLE_OFFSET / zoom,
          width: 1 / zoom,
          height: ROTATION_HANDLE_OFFSET / zoom,
          background: "rgba(37,99,235,0.6)",
          pointerEvents: "none"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          left: w / 2 - 12 / zoom / 2,
          top: rotHandleY - 12 / zoom / 2,
          width: 12 / zoom,
          height: 12 / zoom,
          borderRadius: "50%",
          background: "white",
          border: `${1.5 / zoom}px solid #2563EB`,
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          boxShadow: `0 0 ${4 / zoom}px rgba(0,0,0,0.4)`
        },
        onPointerDown: onRotateDown,
        title: "Rotate",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 7 / zoom, color: "#2563EB" })
      }
    ),
    HANDLES.map((dir) => {
      const pos = getHandlePos(dir, w, h);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: pos.x - hw / 2,
            top: pos.y - hw / 2,
            width: hw,
            height: hw,
            background: "white",
            border: `${1.5 / zoom}px solid #2563EB`,
            borderRadius: 1.5 / zoom,
            cursor: getCursorForHandle(dir),
            zIndex: 10,
            boxShadow: `0 0 ${3 / zoom}px rgba(0,0,0,0.3)`
          },
          onPointerDown: (e) => onHandleDown(e, dir)
        },
        dir
      );
    })
  ] });
}
function AdCanvasKeyedWrapper() {
  const renderKey = useAdCreatorStore((s) => s.renderKey);
  console.log("[AdCanvasKeyedWrapper] renderKey:", renderKey);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdCanvas, {}, `canvas-${renderKey}`);
}
function AdCanvas() {
  const elements = useAdCreatorStore((s) => s.elements);
  const selectedIds = useAdCreatorStore((s) => s.selectedIds);
  const canvasSize = useAdCreatorStore((s) => s.canvasSize);
  const zoom = useAdCreatorStore((s) => s.zoom);
  const panX = useAdCreatorStore((s) => s.panX);
  const panY = useAdCreatorStore((s) => s.panY);
  const snapEnabled = useAdCreatorStore((s) => s.snapEnabled);
  const gridVisible = useAdCreatorStore((s) => s.gridVisible);
  const layers = useAdCreatorStore((s) => s.layers);
  const selectElement = useAdCreatorStore((s) => s.selectElement);
  const deselectAll = useAdCreatorStore((s) => s.deselectAll);
  const moveElement = useAdCreatorStore((s) => s.moveElement);
  const resizeElement = useAdCreatorStore((s) => s.resizeElement);
  const rotateElement = useAdCreatorStore((s) => s.rotateElement);
  const duplicateElement = useAdCreatorStore((s) => s.duplicateElement);
  const deleteElement = useAdCreatorStore((s) => s.deleteElement);
  const undo = useAdCreatorStore((s) => s.undo);
  const redo = useAdCreatorStore((s) => s.redo);
  const copyElement = useAdCreatorStore((s) => s.copyElement);
  const pasteElement = useAdCreatorStore((s) => s.pasteElement);
  const setZoom = useAdCreatorStore((s) => s.setZoom);
  const setPan = useAdCreatorStore((s) => s.setPan);
  const saveHistory = useAdCreatorStore((s) => s.saveHistory);
  const reorderLayer = useAdCreatorStore((s) => s.reorderLayer);
  const containerRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const updateElement = useAdCreatorStore((s) => s.updateElement);
  const [editingId, setEditingId] = reactExports.useState(null);
  const dragState = reactExports.useRef({
    type: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    elementId: "",
    handle: null,
    originalPos: [],
    startPan: { x: 0, y: 0 },
    startAngle: 0,
    startRotation: 0,
    elemCenter: { x: 0, y: 0 },
    aspectRatio: 1,
    shiftDown: false
  });
  const [isSpaceDown, setIsSpaceDown] = reactExports.useState(false);
  const [activeCursor, setActiveCursor] = reactExports.useState("default");
  const [guides, setGuides] = reactExports.useState([]);
  const [marquee, setMarquee] = reactExports.useState(null);
  const [contextMenu, setContextMenu] = reactExports.useState(null);
  const [rotationAngle, setRotationAngle] = reactExports.useState(null);
  const clientToCanvas = reactExports.useCallback(
    (clientX, clientY) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width / 2 + panX;
      const cy = rect.height / 2 + panY;
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      return {
        x: (offsetX - cx) / zoom + canvasSize.width / 2,
        y: (offsetY - cy) / zoom + canvasSize.height / 2
      };
    },
    [panX, panY, zoom, canvasSize]
  );
  const computeGuides = reactExports.useCallback(
    (movingId, x, y, w, h) => {
      const newGuides = [];
      const cw = canvasSize.width;
      const ch = canvasSize.height;
      const edges = [x, x + w / 2, x + w, y, y + h / 2, y + h];
      const canvasEdges = [0, cw / 2, cw, 0, ch / 2, ch];
      for (let i = 0; i < canvasEdges.length; i++) {
        const cv = canvasEdges[i];
        const isX = i < 3;
        if (Math.abs(edges[i] - cv) < SNAP_THRESHOLD) {
          newGuides.push({ type: isX ? "x" : "y", value: cv });
        }
      }
      for (const el of elements) {
        if (el.id === movingId || !el.visible) continue;
        const others = [
          el.x,
          el.x + el.width / 2,
          el.x + el.width,
          el.y,
          el.y + el.height / 2,
          el.y + el.height
        ];
        for (let oi = 0; oi < others.length; oi++) {
          const ov = others[oi];
          for (const ev of edges) {
            if (oi < 3 && Math.abs(ev - ov) < SNAP_THRESHOLD)
              newGuides.push({ type: "x", value: ov });
            if (oi >= 3 && Math.abs(edges[oi] - ov) < SNAP_THRESHOLD)
              newGuides.push({ type: "y", value: ov });
          }
        }
      }
      setGuides(newGuides);
    },
    [elements, canvasSize]
  );
  const onElementPointerDown = reactExports.useCallback(
    (e, id) => {
      e.stopPropagation();
      if (e.button !== 0) return;
      const el = elements.find((x) => x.id === id);
      if (!el || el.locked) return;
      if (!selectedIds.includes(id)) {
        selectElement(id, e.ctrlKey || e.metaKey);
      }
      const pos = clientToCanvas(e.clientX, e.clientY);
      const ids = selectedIds.includes(id) ? selectedIds : [id];
      const originalPos = ids.map((sid) => {
        const sel = elements.find((x) => x.id === sid);
        return { x: sel.x, y: sel.y, width: sel.width, height: sel.height };
      });
      dragState.current = {
        ...dragState.current,
        type: "move",
        startX: pos.x,
        startY: pos.y,
        lastX: pos.x,
        lastY: pos.y,
        elementId: id,
        handle: null,
        originalPos,
        shiftDown: e.shiftKey
      };
      saveHistory();
      setActiveCursor("move");
      e.target.setPointerCapture(e.pointerId);
    },
    [elements, selectedIds, selectElement, clientToCanvas, saveHistory]
  );
  const onHandlePointerDown = reactExports.useCallback(
    (e, id, handle) => {
      e.stopPropagation();
      e.preventDefault();
      const el = elements.find((x) => x.id === id);
      if (!el) return;
      const pos = clientToCanvas(e.clientX, e.clientY);
      dragState.current = {
        ...dragState.current,
        type: "resize",
        startX: pos.x,
        startY: pos.y,
        lastX: pos.x,
        lastY: pos.y,
        elementId: id,
        handle,
        originalPos: [{ x: el.x, y: el.y, width: el.width, height: el.height }],
        aspectRatio: el.width / el.height,
        shiftDown: e.shiftKey
      };
      saveHistory();
      setActiveCursor(getCursorForHandle(handle));
      e.target.setPointerCapture(e.pointerId);
    },
    [elements, clientToCanvas, saveHistory]
  );
  const onRotatePointerDown = reactExports.useCallback(
    (e, id) => {
      e.stopPropagation();
      e.preventDefault();
      const el = elements.find((x) => x.id === id);
      if (!el) return;
      const pos = clientToCanvas(e.clientX, e.clientY);
      const cx = el.x + el.width / 2;
      const cy = el.y + el.height / 2;
      const startAngle = Math.atan2(pos.y - cy, pos.x - cx) * (180 / Math.PI);
      dragState.current = {
        ...dragState.current,
        type: "rotate",
        startX: pos.x,
        startY: pos.y,
        lastX: pos.x,
        lastY: pos.y,
        elementId: id,
        handle: null,
        startAngle,
        startRotation: el.rotation,
        elemCenter: { x: cx, y: cy },
        shiftDown: e.shiftKey
      };
      saveHistory();
      setActiveCursor("grab");
      e.target.setPointerCapture(e.pointerId);
    },
    [elements, clientToCanvas, saveHistory]
  );
  const onCanvasPointerDown = reactExports.useCallback(
    (e) => {
      if (e.button !== 0) return;
      if (contextMenu) {
        setContextMenu(null);
        return;
      }
      const pos = clientToCanvas(e.clientX, e.clientY);
      if (isSpaceDown) {
        dragState.current = {
          ...dragState.current,
          type: "pan",
          startX: e.clientX,
          startY: e.clientY,
          lastX: e.clientX,
          lastY: e.clientY,
          startPan: { x: panX, y: panY }
        };
        setActiveCursor("grabbing");
        e.target.setPointerCapture(e.pointerId);
        return;
      }
      deselectAll();
      dragState.current = {
        ...dragState.current,
        type: "marquee",
        startX: pos.x,
        startY: pos.y,
        lastX: pos.x,
        lastY: pos.y
      };
      setMarquee({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
      e.target.setPointerCapture(e.pointerId);
    },
    [isSpaceDown, contextMenu, deselectAll, clientToCanvas, panX, panY]
  );
  const onPointerMove = reactExports.useCallback(
    (e) => {
      const ds = dragState.current;
      if (!ds.type) return;
      if (ds.type === "pan") {
        const dx = e.clientX - ds.startX;
        const dy = e.clientY - ds.startY;
        setPan(ds.startPan.x + dx, ds.startPan.y + dy);
        return;
      }
      if (ds.type === "marquee") {
        const pos = clientToCanvas(e.clientX, e.clientY);
        setMarquee(
          (prev) => prev ? { ...prev, endX: pos.x, endY: pos.y } : null
        );
        return;
      }
      if (ds.type === "move") {
        const pos = clientToCanvas(e.clientX, e.clientY);
        const dx = pos.x - ds.startX;
        const dy = pos.y - ds.startY;
        const movingIds = selectedIds.includes(ds.elementId) ? selectedIds : [ds.elementId];
        movingIds.forEach((id, idx) => {
          const orig = ds.originalPos[idx] ?? ds.originalPos[0];
          let nx = orig.x + dx;
          let ny = orig.y + dy;
          if (snapEnabled) {
            nx = snapToGrid(nx, SNAP_GRID);
            ny = snapToGrid(ny, SNAP_GRID);
          }
          moveElement(id, nx, ny);
          if (id === ds.elementId) {
            const el = elements.find((x) => x.id === id);
            if (el) computeGuides(id, nx, ny, el.width, el.height);
          }
        });
        return;
      }
      if (ds.type === "resize") {
        const pos = clientToCanvas(e.clientX, e.clientY);
        const orig = ds.originalPos[0];
        const id = ds.elementId;
        const handle = ds.handle;
        const dx = pos.x - ds.startX;
        const dy = pos.y - ds.startY;
        let newX = orig.x;
        let newY = orig.y;
        let newW = orig.width;
        let newH = orig.height;
        if (handle.includes("e")) newW = Math.max(MIN_SIZE, orig.width + dx);
        if (handle.includes("s")) newH = Math.max(MIN_SIZE, orig.height + dy);
        if (handle.includes("w")) {
          newW = Math.max(MIN_SIZE, orig.width - dx);
          newX = orig.x + orig.width - newW;
        }
        if (handle.includes("n")) {
          newH = Math.max(MIN_SIZE, orig.height - dy);
          newY = orig.y + orig.height - newH;
        }
        if (e.shiftKey || ds.shiftDown) {
          const ratio = ds.aspectRatio;
          if (handle === "se" || handle === "nw") {
            const maxD = Math.max(Math.abs(dx), Math.abs(dy));
            if (handle === "se") {
              newW = Math.max(MIN_SIZE, orig.width + maxD * Math.sign(dx));
              newH = newW / ratio;
            } else {
              newW = Math.max(MIN_SIZE, orig.width - maxD * Math.sign(dx));
              newH = newW / ratio;
              newX = orig.x + orig.width - newW;
              newY = orig.y + orig.height - newH;
            }
          } else {
            newH = newW / ratio;
          }
        }
        resizeElement(id, newW, newH);
        moveElement(id, newX, newY);
        return;
      }
      if (ds.type === "rotate") {
        const pos = clientToCanvas(e.clientX, e.clientY);
        const { x: cx, y: cy } = ds.elemCenter;
        const angle = Math.atan2(pos.y - cy, pos.x - cx) * (180 / Math.PI);
        let delta = angle - ds.startAngle;
        let newRot = ds.startRotation + delta;
        if (e.shiftKey || ds.shiftDown) {
          newRot = Math.round(newRot / 45) * 45;
        }
        rotateElement(ds.elementId, newRot);
        setRotationAngle(Math.round((newRot % 360 + 360) % 360));
        return;
      }
    },
    [
      selectedIds,
      elements,
      snapEnabled,
      moveElement,
      resizeElement,
      rotateElement,
      computeGuides,
      clientToCanvas,
      setPan
    ]
  );
  const onPointerUp = reactExports.useCallback(
    (_e) => {
      const ds = dragState.current;
      if (ds.type === "marquee" && marquee) {
        const minX = Math.min(marquee.startX, marquee.endX);
        const maxX = Math.max(marquee.startX, marquee.endX);
        const minY = Math.min(marquee.startY, marquee.endY);
        const maxY = Math.max(marquee.startY, marquee.endY);
        if (maxX - minX > 4 || maxY - minY > 4) {
          const enclosed = elements.filter(
            (el) => el.visible && !el.locked && el.x >= minX && el.x + el.width <= maxX && el.y >= minY && el.y + el.height <= maxY
          );
          enclosed.forEach((el, i) => selectElement(el.id, i > 0));
        }
      }
      setGuides([]);
      setMarquee(null);
      setRotationAngle(null);
      setActiveCursor(isSpaceDown ? "grab" : "default");
      dragState.current.type = null;
    },
    [marquee, elements, selectElement, isSpaceDown]
  );
  const onWheel = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const delta = -e.deltaY * 1e-3;
        setZoom(Math.max(0.1, Math.min(4, zoom + delta * zoom)));
      } else {
        setPan(panX - e.deltaX, panY - e.deltaY);
      }
    },
    [zoom, panX, panY, setZoom, setPan]
  );
  reactExports.useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setIsSpaceDown(true);
        setActiveCursor("grab");
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !e.ctrlKey) {
        for (const id of selectedIds) deleteElement(id);
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" && !e.shiftKey) {
          e.preventDefault();
          undo();
        }
        if (e.key === "z" && e.shiftKey || e.key === "y") {
          e.preventDefault();
          redo();
        }
        if (e.key === "c") {
          e.preventDefault();
          for (const id of selectedIds) copyElement(id);
        }
        if (e.key === "v") {
          e.preventDefault();
          pasteElement();
        }
        if (e.key === "d") {
          e.preventDefault();
          for (const id of selectedIds) duplicateElement(id);
        }
        if (e.key === "a") {
          e.preventDefault();
          const visibleIds = elements.filter((x) => x.visible && !x.locked).map((x) => x.id);
          visibleIds.forEach((id, i) => selectElement(id, i > 0));
        }
      }
      if (e.key === "Escape") deselectAll();
      const nudge = e.shiftKey ? 10 : 1;
      const dx = e.key === "ArrowRight" ? nudge : e.key === "ArrowLeft" ? -nudge : 0;
      const dy = e.key === "ArrowDown" ? nudge : e.key === "ArrowUp" ? -nudge : 0;
      if ((dx || dy) && selectedIds.length) {
        e.preventDefault();
        for (const id of selectedIds) {
          const el = elements.find((x) => x.id === id);
          if (el && !el.locked) moveElement(id, el.x + dx, el.y + dy);
        }
      }
      if (e.key === "]" || e.key === "[") {
        if (selectedIds.length) {
          const id = selectedIds[0];
          const layerIdx = layers.findIndex((l) => l.elementId === id);
          if (e.key === "]" && layerIdx > 0)
            reorderLayer(layerIdx, layerIdx - 1);
          if (e.key === "[" && layerIdx < layers.length - 1)
            reorderLayer(layerIdx, layerIdx + 1);
        }
      }
    };
    const onKeyUp = (e) => {
      if (e.code === "Space") {
        setIsSpaceDown(false);
        setActiveCursor("default");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [
    selectedIds,
    elements,
    layers,
    undo,
    redo,
    deleteElement,
    copyElement,
    pasteElement,
    duplicateElement,
    deselectAll,
    selectElement,
    moveElement,
    reorderLayer
  ]);
  const handleContextAction = reactExports.useCallback(
    (action, id) => {
      switch (action) {
        case "duplicate":
          duplicateElement(id);
          break;
        case "delete":
          deleteElement(id);
          break;
        case "resetRotation":
          rotateElement(id, 0);
          break;
        case "lock": {
          const el = elements.find((x) => x.id === id);
          if (el)
            useAdCreatorStore.getState().updateElement(id, { locked: !el.locked });
          break;
        }
        case "bringToFront": {
          const li = layers.findIndex((l) => l.elementId === id);
          if (li > 0) reorderLayer(li, 0);
          break;
        }
        case "sendToBack": {
          const li = layers.findIndex((l) => l.elementId === id);
          if (li < layers.length - 1) reorderLayer(li, layers.length - 1);
          break;
        }
        case "bringForward": {
          const li = layers.findIndex((l) => l.elementId === id);
          if (li > 0) reorderLayer(li, li - 1);
          break;
        }
        case "sendBackward": {
          const li = layers.findIndex((l) => l.elementId === id);
          if (li < layers.length - 1) reorderLayer(li, li + 1);
          break;
        }
      }
    },
    [
      elements,
      layers,
      duplicateElement,
      deleteElement,
      rotateElement,
      reorderLayer
    ]
  );
  const onElementContextMenu = reactExports.useCallback(
    (e, id) => {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ x: e.clientX, y: e.clientY, elementId: id });
    },
    []
  );
  const fitToScreen = reactExports.useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const padX = 80;
    const padY = 80;
    const fz = Math.min(
      (rect.width - padX * 2) / canvasSize.width,
      (rect.height - padY * 2) / canvasSize.height
    );
    setZoom(Math.max(0.1, Math.min(4, fz)));
    setPan(0, 0);
  }, [canvasSize, setZoom, setPan]);
  const canvasTransform = reactExports.useMemo(() => {
    return `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`;
  }, [panX, panY, zoom]);
  const visibleElements = reactExports.useMemo(
    () => elements.filter((el) => el.visible),
    [elements]
  );
  const isEmpty = elements.length === 0;
  const commitTextEdit = reactExports.useCallback(
    (id, text) => {
      updateElement(id, { content: text });
      setEditingId(null);
    },
    [updateElement]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative flex-1 overflow-hidden select-none",
      style: {
        background: "#070B14",
        cursor: isSpaceDown ? activeCursor : activeCursor === "default" ? void 0 : activeCursor,
        backgroundImage: gridVisible ? "radial-gradient(circle, #1e293b 1px, transparent 1px)" : "radial-gradient(circle, rgba(30,41,59,0.6) 1px, transparent 1px)",
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        backgroundPosition: `calc(50% + ${panX}px) calc(50% + ${panY}px)`
      },
      onPointerDown: onCanvasPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onWheel,
      onContextMenu: (e) => e.preventDefault(),
      "data-ocid": "ad_canvas",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: canvasRef,
            style: {
              position: "absolute",
              left: "50%",
              top: "50%",
              width: canvasSize.width,
              height: canvasSize.height,
              transform: canvasTransform,
              transformOrigin: "center center",
              background: "white",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(37,99,235,0.08)",
              transition: dragState.current.type ? void 0 : "transform 0.15s ease",
              overflow: "hidden"
            },
            "data-ocid": "ad_canvas.surface",
            children: [
              visibleElements.map((element, _elIdx) => {
                const isSelected = selectedIds.includes(element.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-element-id": element.id,
                    style: {
                      position: "absolute",
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      opacity: element.opacity,
                      transform: `rotate(${element.rotation}deg)`,
                      transformOrigin: "center center",
                      willChange: "transform",
                      cursor: element.locked ? "not-allowed" : isSelected ? "move" : "pointer",
                      zIndex: isSelected ? 100 : visibleElements.length - _elIdx
                    },
                    onPointerDown: (e) => !element.locked && editingId !== element.id && onElementPointerDown(e, element.id),
                    onDoubleClick: (e) => {
                      e.stopPropagation();
                      if (element.type === "text" && !element.locked) {
                        setEditingId(element.id);
                        selectElement(element.id);
                      }
                    },
                    onContextMenu: (e) => onElementContextMenu(e, element.id),
                    "data-ocid": `ad_canvas.element.${element.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CanvasElementRenderer,
                        {
                          element,
                          isSelected
                        }
                      ),
                      editingId === element.id && element.type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        InlineTextEditor,
                        {
                          element,
                          zoom,
                          onCommit: (text) => commitTextEdit(element.id, text)
                        }
                      ),
                      isSelected && !element.locked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectionHandles,
                        {
                          element,
                          zoom,
                          onHandleDown: (e, handle) => onHandlePointerDown(e, element.id, handle),
                          onRotateDown: (e) => onRotatePointerDown(e, element.id)
                        }
                      )
                    ]
                  },
                  element.id
                );
              }),
              guides.map(
                (g, _i) => g.type === "x" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: g.value,
                      top: 0,
                      width: 1 / zoom,
                      height: canvasSize.height,
                      background: "rgba(37,99,235,0.8)",
                      pointerEvents: "none",
                      zIndex: 999
                    }
                  },
                  `gx-${g.value}`
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: 0,
                      top: g.value,
                      width: canvasSize.width,
                      height: 1 / zoom,
                      background: "rgba(37,99,235,0.8)",
                      pointerEvents: "none",
                      zIndex: 999
                    }
                  },
                  `gy-${g.value}`
                )
              ),
              marquee && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    left: Math.min(marquee.startX, marquee.endX),
                    top: Math.min(marquee.startY, marquee.endY),
                    width: Math.abs(marquee.endX - marquee.startX),
                    height: Math.abs(marquee.endY - marquee.startY),
                    border: `${1 / zoom}px dashed #2563EB`,
                    background: "rgba(37,99,235,0.07)",
                    pointerEvents: "none",
                    zIndex: 1e3
                  }
                }
              ),
              isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 12,
                    color: "rgba(0,0,0,0.25)",
                    pointerEvents: "none"
                  },
                  "data-ocid": "ad_canvas.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlignCenter, { size: 40, style: { opacity: 0.3 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, fontFamily: "Inter, sans-serif" }, children: "Click to add elements, or use the left panel" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-3 right-3 z-30 flex items-center gap-2 pointer-events-none",
            "data-ocid": "ad_canvas.debug_overlay",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono border border-white/10",
                style: {
                  background: "rgba(17,24,39,0.85)",
                  backdropFilter: "blur(8px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30", children: "■" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/50", children: [
                    elements.length,
                    " el"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/50", children: [
                    layers.length,
                    " layers"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/50", children: [
                    Math.round(zoom * 100),
                    "%"
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: rotationAngle !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50",
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-3 py-1.5 rounded-lg text-sm font-bold text-white",
                style: {
                  background: "rgba(37,99,235,0.95)",
                  backdropFilter: "blur(8px)"
                },
                children: [
                  rotationAngle,
                  "°"
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute bottom-4 left-4 flex items-center gap-1.5 z-30",
            "data-ocid": "ad_canvas.zoom_controls",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(Math.max(0.1, zoom - 0.1)),
                  className: "w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all",
                  style: {
                    background: "rgba(17,24,39,0.9)",
                    backdropFilter: "blur(12px)"
                  },
                  title: "Zoom out",
                  "data-ocid": "ad_canvas.zoom_out_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { size: 13 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(Math.min(4, zoom + 0.1)),
                  className: "w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all",
                  style: {
                    background: "rgba(17,24,39,0.9)",
                    backdropFilter: "blur(12px)"
                  },
                  title: "Zoom in",
                  "data-ocid": "ad_canvas.zoom_in_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 13 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-2.5 py-1 rounded-lg border border-white/10 text-white/70 text-xs font-mono min-w-[52px] text-center",
                  style: {
                    background: "rgba(17,24,39,0.9)",
                    backdropFilter: "blur(12px)"
                  },
                  children: [
                    Math.round(zoom * 100),
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: fitToScreen,
                  className: "w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all",
                  style: {
                    background: "rgba(17,24,39,0.9)",
                    backdropFilter: "blur(12px)"
                  },
                  title: "Fit to screen",
                  "data-ocid": "ad_canvas.fit_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { size: 13 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(1),
                  className: "px-2 h-7 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs",
                  style: {
                    background: "rgba(17,24,39,0.9)",
                    backdropFilter: "blur(12px)"
                  },
                  title: "Reset zoom",
                  "data-ocid": "ad_canvas.reset_zoom_button",
                  children: "1:1"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-2.5 py-1 rounded-lg border border-white/10 text-white/40 text-[11px] font-mono",
            style: {
              background: "rgba(17,24,39,0.9)",
              backdropFilter: "blur(12px)"
            },
            children: [
              canvasSize.width,
              " × ",
              canvasSize.height,
              " · ",
              canvasSize.name
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-3 py-1.5 rounded-lg border border-white/8 text-white/25 text-[10px]",
            style: {
              background: "rgba(17,24,39,0.7)",
              backdropFilter: "blur(8px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Space + drag to pan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-3 bg-white/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ctrl+scroll to zoom" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-3 bg-white/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Del to remove" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-3 bg-white/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shift+resize = aspect ratio" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: contextMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContextMenu,
          {
            menu: contextMenu,
            onAction: handleContextAction,
            onClose: () => setContextMenu(null)
          }
        ) })
      ]
    }
  );
}
class AdErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleReload", () => {
      window.location.reload();
    });
    __publicField(this, "handleReset", () => {
      this.setState({ hasError: false, error: null });
    });
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-4 p-8 rounded-2xl",
          style: {
            background: "rgba(17,24,39,0.95)",
            border: "1px solid rgba(239,68,68,0.3)",
            minHeight: 200
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-full flex items-center justify-center",
                style: { background: "rgba(239,68,68,0.15)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 text-2xl", children: "⚠" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm", children: this.props.name ? `${this.props.name} crashed` : "Something went wrong" }),
              false
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: this.handleReset,
                  className: "px-4 py-2 rounded-lg text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors",
                  children: "Try Again"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: this.handleReload,
                  className: "px-4 py-2 rounded-lg text-xs font-semibold text-white",
                  style: {
                    background: "linear-gradient(135deg,#2563eb,#4f46e5)"
                  },
                  children: "Reload Ad Studio"
                }
              )
            ] })
          ]
        }
      );
    }
    return this.props.children;
  }
}
const FONTS = [
  "Inter",
  "Plus Jakarta Sans",
  "Roboto",
  "Montserrat",
  "Oswald",
  "Playfair Display",
  "Space Grotesk",
  "Bebas Neue"
];
const FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const BLEND_MODES = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion"
];
const PALETTE_SWATCHES = [
  "#2563EB",
  "#22C55E",
  "#ffffff",
  "#000000",
  "#111827",
  "#6366f1",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316"
];
const SHORTCUTS = [
  { keys: "T", desc: "Add text" },
  { keys: "S", desc: "Add shape" },
  { keys: "Del", desc: "Delete element" },
  { keys: "Ctrl+D", desc: "Duplicate" },
  { keys: "Ctrl+Z", desc: "Undo" },
  { keys: "Ctrl+Shift+Z", desc: "Redo" },
  { keys: "[  ]", desc: "Z-order" }
];
const inputCls = "w-full h-7 px-2 rounded border border-border text-xs text-foreground bg-input focus:outline-none focus:border-primary/60 transition-smooth";
const labelCls = "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider";
function Row({
  label,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col gap-1 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: label }),
    children
  ] });
}
function StyledSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  accentColor = "#2563EB"
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
      className: "w-full h-1.5 rounded-full cursor-pointer",
      style: { accentColor }
    }
  );
}
function ColorSwatch({
  color,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: "w-6 h-6 rounded-full transition-smooth hover:scale-110 border-2",
      style: {
        background: color,
        borderColor: active ? "#2563EB" : "transparent",
        boxShadow: active ? `0 0 6px ${color}` : "none"
      },
      "aria-label": color
    }
  );
}
function ColorField({
  value,
  onChange,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "color",
          value,
          onChange: (e) => onChange(e.target.value),
          className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
          "aria-label": label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-7 h-7 rounded-lg border border-border cursor-pointer transition-smooth hover:scale-105",
          style: { background: value }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground flex-1", children: value })
  ] });
}
function SegmentButton({
  options,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 p-0.5 rounded-lg bg-muted border border-border", children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(opt.value),
      className: [
        "flex-1 py-1 text-[10px] font-semibold rounded-md transition-smooth",
        value === opt.value ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
      ].join(" "),
      children: opt.label
    },
    opt.value
  )) });
}
function TabBar({
  tabs,
  active,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-border px-2 pt-1", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onChange(tab),
      className: [
        "px-3 py-2 text-[11px] font-semibold capitalize transition-smooth relative",
        active === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      ].join(" "),
      children: [
        tab,
        active === tab && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            layoutId: "tab-underline",
            className: "absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          }
        )
      ]
    },
    tab
  )) });
}
function CollapsibleSection({
  title,
  defaultOpen = true,
  children
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 first:border-t-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "w-full flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { rotate: open ? 0 : -90 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-muted-foreground" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 pt-1 flex flex-col gap-3", children })
      },
      "content"
    ) })
  ] });
}
function ToggleRow({
  label,
  checked,
  onChange,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(!checked),
          className: [
            "w-9 h-5 rounded-full transition-smooth relative",
            checked ? "bg-primary" : "bg-muted border border-border"
          ].join(" "),
          role: "switch",
          "aria-checked": checked,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              animate: { x: checked ? 16 : 2 },
              transition: { type: "spring", stiffness: 500, damping: 30 },
              className: "absolute top-0.5 w-4 h-4 bg-foreground rounded-full shadow"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: checked && children && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.2 },
        className: "overflow-hidden flex flex-col gap-2",
        children
      }
    ) })
  ] });
}
function EmptyPanel({
  onAddText,
  onAddShape,
  onAddImage,
  canvasSize
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "flex flex-col h-full overflow-y-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 px-4 border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-2xl flex items-center justify-center mb-3",
              style: { background: "oklch(0.14 0.006 240)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center leading-relaxed", children: "Select an element to edit its properties" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1", children: "Or add a new element below" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${labelCls} block mb-2`, children: "Quick Add" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [
            {
              icon: Type,
              label: "Text",
              action: onAddText,
              ocid: "panel-add-text"
            },
            {
              icon: Square,
              label: "Shape",
              action: onAddShape,
              ocid: "panel-add-shape"
            },
            {
              icon: Image$1,
              label: "Image",
              action: onAddImage,
              ocid: "panel-add-image"
            }
          ].map(({ icon: Icon, label, action, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.97 },
              onClick: action,
              "data-ocid": ocid,
              className: "flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/40 transition-smooth text-muted-foreground hover:text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold", children: label })
              ]
            },
            label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${labelCls} block mb-2`, children: "Canvas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-lg p-2.5 text-xs",
              style: { background: "oklch(0.11 0.005 240)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium text-right", children: canvasSize.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono text-right", children: [
                  canvasSize.width,
                  " × ",
                  canvasSize.height
                ] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${labelCls} block mb-2`, children: "Keyboard Shortcuts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: SHORTCUTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: s.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "text-[9px] px-1.5 py-0.5 rounded font-mono bg-muted border border-border text-muted-foreground", children: s.keys })
          ] }, s.keys)) })
        ] })
      ]
    }
  );
}
function PositionTab({ el }) {
  const updateElement = useAdCreatorStore((s) => s.updateElement);
  const elements = useAdCreatorStore((s) => s.elements);
  const canvasSize = useAdCreatorStore((s) => s.canvasSize);
  const [lockAspect, setLockAspect] = reactExports.useState(false);
  const aspectRef = reactExports.useRef(el.width / el.height);
  const update = reactExports.useCallback(
    (patch) => updateElement(el.id, patch),
    [el.id, updateElement]
  );
  const handleWidth = (w) => {
    if (lockAspect) {
      update({ width: w, height: Math.round(w / aspectRef.current) });
    } else {
      update({ width: w });
    }
  };
  const handleHeight = (h) => {
    if (lockAspect) {
      update({ height: h, width: Math.round(h * aspectRef.current) });
    } else {
      update({ height: h });
    }
  };
  const idx = elements.findIndex((e) => e.id === el.id);
  const bringToFront = () => {
    const rest = elements.filter((e) => e.id !== el.id);
    useAdCreatorStore.setState({ elements: [...rest, el] });
  };
  const sendToBack = () => {
    const rest = elements.filter((e) => e.id !== el.id);
    useAdCreatorStore.setState({ elements: [el, ...rest] });
  };
  const bringForward = () => {
    if (idx >= elements.length - 1) return;
    const arr = [...elements];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    useAdCreatorStore.setState({ elements: arr });
  };
  const sendBackward = () => {
    if (idx <= 0) return;
    const arr = [...elements];
    [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
    useAdCreatorStore.setState({ elements: arr });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 px-3 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "X (px)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: Math.round(el.x),
          onChange: (e) => update({ x: Number(e.target.value) }),
          className: inputCls,
          "data-ocid": "pos-x-input"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Y (px)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: Math.round(el.y),
          onChange: (e) => update({ y: Number(e.target.value) }),
          className: inputCls,
          "data-ocid": "pos-y-input"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Width", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: Math.round(el.width),
          min: 4,
          onChange: (e) => handleWidth(Number(e.target.value)),
          className: inputCls,
          "data-ocid": "pos-width-input"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Height", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          value: Math.round(el.height),
          min: 4,
          onChange: (e) => handleHeight(Number(e.target.value)),
          className: inputCls,
          "data-ocid": "pos-height-input"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: lockAspect,
          onChange: (e) => {
            setLockAspect(e.target.checked);
            aspectRef.current = el.width / el.height;
          },
          className: "sr-only",
          "data-ocid": "pos-lock-aspect"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-4 h-4 rounded border flex items-center justify-center transition-smooth ${lockAspect ? "bg-primary border-primary" : "border-border"}`,
          children: lockAspect && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 text-primary-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Lock aspect ratio" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Rotation — ${Math.round(el.rotation)}°`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StyledSlider,
        {
          min: 0,
          max: 360,
          value: el.rotation,
          onChange: (v) => update({ rotation: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          min: 0,
          max: 360,
          value: Math.round(el.rotation),
          onChange: (e) => update({ rotation: Number(e.target.value) }),
          className: "w-14 h-7 px-1 rounded border border-border text-xs text-foreground bg-input text-center focus:outline-none",
          "data-ocid": "pos-rotation-input"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => update({ x: Math.round((canvasSize.width - el.width) / 2) }),
          className: "flex items-center justify-center gap-1.5 h-7 rounded-lg border border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
          "data-ocid": "pos-center-h",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MoveHorizontal, { className: "w-3 h-3" }),
            " Center H"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => update({ y: Math.round((canvasSize.height - el.height) / 2) }),
          className: "flex items-center justify-center gap-1.5 h-7 rounded-lg border border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
          "data-ocid": "pos-center-v",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MoveVertical, { className: "w-3 h-3" }),
            " Center V"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
      {
        label: "Flip H",
        icon: FlipHorizontal2,
        ocid: "pos-flip-h",
        action: () => {
          const s = el;
          updateElement(el.id, {
            scaleX: s.scaleX === -1 ? 1 : -1
          });
        }
      },
      {
        label: "Flip V",
        icon: FlipVertical2,
        ocid: "pos-flip-v",
        action: () => {
          const s = el;
          updateElement(el.id, {
            scaleY: s.scaleY === -1 ? 1 : -1
          });
        }
      }
    ].map(({ label, icon: Icon, ocid, action }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        onClick: action,
        className: "flex items-center justify-center gap-1.5 h-7 rounded-lg border border-border text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
        "data-ocid": ocid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
          " ",
          label
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Layer Order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: [
      {
        label: "Front",
        icon: BringToFront,
        action: bringToFront,
        ocid: "pos-bring-front"
      },
      {
        label: "Fwd",
        icon: ArrowUp,
        action: bringForward,
        ocid: "pos-bring-fwd"
      },
      {
        label: "Bwd",
        icon: ArrowDown,
        action: sendBackward,
        ocid: "pos-send-bwd"
      },
      {
        label: "Back",
        icon: SendToBack,
        action: sendToBack,
        ocid: "pos-send-back"
      }
    ].map(({ label, icon: Icon, action, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        onClick: action,
        className: "flex flex-col items-center gap-1 py-1.5 rounded-lg border border-border text-[9px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth",
        "data-ocid": ocid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
          label
        ]
      },
      label
    )) }) })
  ] });
}
function ShadowControls({
  shadow,
  onChange
}) {
  const on = shadow !== null;
  const s = shadow ?? { x: 0, y: 4, blur: 12, spread: 0, color: "#000000" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ToggleRow,
    {
      label: "Shadow",
      checked: on,
      onChange: (v) => onChange(v ? s : null),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["x", "y", "blur", "spread"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Row,
          {
            label: key === "x" ? "X Offset" : key === "y" ? "Y Offset" : key === "blur" ? "Blur" : "Spread",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: s[key],
                onChange: (e) => onChange({ ...s, [key]: Number(e.target.value) }),
                className: inputCls
              }
            )
          },
          key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ColorField,
          {
            value: s.color,
            onChange: (c) => onChange({ ...s, color: c }),
            label: "Shadow color"
          }
        ) })
      ]
    }
  );
}
function TextStyleTab({ el }) {
  const update = (patch) => useAdCreatorStore.getState().updateElement(el.id, patch);
  const alignIcons = [
    { value: "left", icon: AlignLeft },
    { value: "center", icon: AlignCenter },
    { value: "right", icon: AlignRight },
    { value: "justify", icon: AlignJustify }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-y-auto", "data-ocid": "text-style-tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Typography", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Font Family", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: el.fontFamily,
          onChange: (e) => update({ fontFamily: e.target.value }),
          className: inputCls,
          "data-ocid": "text-font-family",
          children: FONTS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, style: { fontFamily: f }, children: f }, f))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Font Size — ${el.fontSize}px`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StyledSlider,
          {
            min: 8,
            max: 200,
            value: el.fontSize,
            onChange: (v) => update({ fontSize: v })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 8,
            max: 200,
            value: el.fontSize,
            onChange: (e) => update({ fontSize: Number(e.target.value) }),
            className: "w-14 h-7 px-1 rounded border border-border text-xs text-foreground bg-input text-center focus:outline-none",
            "data-ocid": "text-font-size"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Font Weight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 flex-wrap", children: FONT_WEIGHTS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => update({ fontWeight: String(w) }),
          className: [
            "px-1.5 py-1 rounded text-[9px] font-bold transition-smooth border",
            el.fontWeight === String(w) ? "bg-primary/20 text-primary border-primary/50" : "border-border text-muted-foreground hover:text-foreground bg-muted"
          ].join(" "),
          "data-ocid": `text-weight-${w}`,
          children: w
        },
        w
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Alignment", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: alignIcons.map(({ value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => update({ textAlign: value }),
          className: [
            "flex-1 h-8 flex items-center justify-center rounded transition-smooth border",
            el.textAlign === value ? "bg-primary/20 text-primary border-primary/50" : "border-border text-muted-foreground hover:text-foreground bg-muted"
          ].join(" "),
          "aria-label": `Align ${value}`,
          "data-ocid": `text-align-${value}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
        },
        value
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Line Height — ${el.lineHeight.toFixed(1)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StyledSlider,
        {
          min: 0.8,
          max: 3,
          step: 0.1,
          value: el.lineHeight,
          onChange: (v) => update({ lineHeight: v })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Letter Spacing — ${el.letterSpacing}px`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StyledSlider,
        {
          min: -5,
          max: 20,
          step: 0.5,
          value: el.letterSpacing,
          onChange: (v) => update({ letterSpacing: v })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Color", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ColorField,
        {
          value: el.color,
          onChange: (c) => update({ color: c }),
          label: "Text color"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: PALETTE_SWATCHES.map((sw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ColorSwatch,
        {
          color: sw,
          active: el.color === sw,
          onClick: () => update({ color: sw })
        },
        sw
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        ToggleRow,
        {
          label: "Gradient",
          checked: el.gradient,
          onChange: (v) => update({ gradient: v }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SegmentButton,
              {
                options: [
                  { label: "Linear", value: "linear" },
                  { label: "Radial", value: "radial" }
                ],
                value: "linear",
                onChange: () => {
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Stop 1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorField,
                {
                  value: el.gradientColors[0] ?? "#ffffff",
                  onChange: (c) => {
                    const cols = [...el.gradientColors];
                    cols[0] = c;
                    update({ gradientColors: cols });
                  },
                  label: "Gradient stop 1"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Stop 2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorField,
                {
                  value: el.gradientColors[1] ?? "#2563EB",
                  onChange: (c) => {
                    const cols = [...el.gradientColors];
                    cols[1] = c;
                    update({ gradientColors: cols });
                  },
                  label: "Gradient stop 2"
                }
              ) })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Effects", defaultOpen: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShadowControls,
        {
          shadow: el.shadow,
          onChange: (s) => update({ shadow: s })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToggleRow,
        {
          label: "Glow",
          checked: el.glow !== null,
          onChange: (v) => update({ glow: v ? { color: "#2563EB", intensity: 0.5 } : null }),
          children: el.glow && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorField,
              {
                value: el.glow.color,
                onChange: (c) => update({ glow: { ...el.glow, color: c } }),
                label: "Glow color"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Row,
              {
                label: `Intensity — ${Math.round(el.glow.intensity * 100)}%`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StyledSlider,
                  {
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: el.glow.intensity,
                    onChange: (v) => update({ glow: { ...el.glow, intensity: v } }),
                    accentColor: "#22C55E"
                  }
                )
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToggleRow,
        {
          label: "Outline",
          checked: el.outline !== null,
          onChange: (v) => update({ outline: v ? { color: "#ffffff", width: 2 } : null }),
          children: el.outline && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Width — ${el.outline.width}px`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StyledSlider,
              {
                min: 0,
                max: 20,
                value: el.outline.width,
                onChange: (v) => update({ outline: { ...el.outline, width: v } })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorField,
              {
                value: el.outline.color,
                onChange: (c) => update({ outline: { ...el.outline, color: c } }),
                label: "Outline color"
              }
            ) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Appearance", defaultOpen: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Opacity — ${Math.round(el.opacity * 100)}%`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        StyledSlider,
        {
          min: 0,
          max: 1,
          step: 0.01,
          value: el.opacity,
          onChange: (v) => update({ opacity: v })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Blend Mode", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: el.blendMode,
          onChange: (e) => update({ blendMode: e.target.value }),
          className: inputCls,
          "data-ocid": "text-blend-mode",
          children: BLEND_MODES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, className: "capitalize", children: m.replace("-", " ") }, m))
        }
      ) })
    ] })
  ] });
}
function TextAnimateTab({ el }) {
  const update = (patch) => useAdCreatorStore.getState().updateElement(el.id, patch);
  const ANIMATION_TYPES = [
    "fade",
    "slide",
    "zoom",
    "bounce",
    "cinematic",
    "typewriter",
    "blurReveal"
  ];
  const current = el.animation;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-3 py-3 gap-3", "data-ocid": "text-animate-tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: labelCls, children: "Animation Preset" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: ANIMATION_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        type: "button",
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        onClick: () => update({
          animation: (current == null ? void 0 : current.type) === type ? null : { type, duration: 0.5, delay: 0, easing: "ease-out" }
        }),
        className: [
          "py-2 px-2 rounded-xl border text-[10px] font-semibold capitalize transition-smooth",
          (current == null ? void 0 : current.type) === type ? "border-primary/60 bg-primary/20 text-primary" : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground bg-muted/30"
        ].join(" "),
        "data-ocid": `text-anim-${type}`,
        children: type
      },
      type
    )) }),
    current && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "flex flex-col gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Duration — ${current.duration.toFixed(1)}s`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StyledSlider,
            {
              min: 0.1,
              max: 3,
              step: 0.1,
              value: current.duration,
              onChange: (v) => update({ animation: { ...current, duration: v } })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Delay — ${current.delay.toFixed(1)}s`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StyledSlider,
            {
              min: 0,
              max: 3,
              step: 0.1,
              value: current.delay,
              onChange: (v) => update({ animation: { ...current, delay: v } })
            }
          ) })
        ]
      }
    )
  ] });
}
function ImageAdjustTab({ el }) {
  const update = (patch) => useAdCreatorStore.getState().updateElement(el.id, patch);
  const f = el.filters;
  const resetFilters = () => update({
    filters: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      hue: 0
    }
  });
  const filterSliders = [
    {
      key: "brightness",
      label: "Brightness",
      min: 0,
      max: 200,
      default: 100
    },
    {
      key: "contrast",
      label: "Contrast",
      min: 0,
      max: 200,
      default: 100
    },
    {
      key: "saturation",
      label: "Saturation",
      min: 0,
      max: 200,
      default: 100
    },
    { key: "hue", label: "Hue Rotate", min: 0, max: 360, default: 0 },
    {
      key: "blur",
      label: "Blur",
      min: 0,
      max: 20,
      default: 0,
      step: 0.5
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-3 py-3 gap-3", "data-ocid": "image-adjust-tab", children: [
    filterSliders.map(({ key, label, min, max, default: def, step }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Row,
      {
        label: `${label} — ${f[key]}${key === "blur" ? "px" : key === "hue" ? "°" : "%"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StyledSlider,
          {
            min,
            max,
            step: step ?? 1,
            value: f[key],
            onChange: (v) => update({ filters: { ...f, [key]: v } }),
            accentColor: f[key] !== def ? "#2563EB" : "#374151"
          }
        )
      },
      key
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        onClick: resetFilters,
        className: "flex items-center justify-center gap-2 h-8 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth mt-1",
        "data-ocid": "image-reset-filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
          " Reset Filters"
        ]
      }
    )
  ] });
}
function ImageEffectsTab({ el }) {
  const update = (patch) => useAdCreatorStore.getState().updateElement(el.id, patch);
  const [removing, setRemoving] = reactExports.useState(false);
  const [enhancing, setEnhancing] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const handleRemoveBg = async () => {
    if (!el.src) {
      ue.error("Please select an image first.");
      return;
    }
    setRemoving(true);
    console.log("[RemoveBG] Selected element:", el);
    try {
      let sampleCorner = function(cx, cy) {
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;
        for (let dy = 0; dy < 5; dy++) {
          for (let dx = 0; dx < 5; dx++) {
            const px = Math.min(cx + dx, w - 1);
            const py = Math.min(cy + dy, h - 1);
            const i = (py * w + px) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        return [r / count, g / count, b / count];
      }, colorDist = function(i) {
        const dr = data[i] - bgR;
        const dg = data[i + 1] - bgG;
        const db = data[i + 2] - bgB;
        return Math.sqrt(dr * dr + dg * dg + db * db);
      }, enqueue = function(x, y) {
        if (x < 0 || x >= w || y < 0 || y >= h) return;
        const idx = y * w + x;
        if (visited[idx]) return;
        visited[idx] = 1;
        if (colorDist(idx * 4) < tolerance) queue.push(idx);
      };
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = el.src;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;
      const corners = [
        sampleCorner(0, 0),
        sampleCorner(w - 5, 0),
        sampleCorner(0, h - 5),
        sampleCorner(w - 5, h - 5)
      ];
      const bgR = corners.reduce((s, c) => s + c[0], 0) / 4;
      const bgG = corners.reduce((s, c) => s + c[1], 0) / 4;
      const bgB = corners.reduce((s, c) => s + c[2], 0) / 4;
      console.log("[RemoveBG] Detected background color:", bgR, bgG, bgB);
      const tolerance = 60;
      const visited = new Uint8Array(w * h);
      const queue = [];
      enqueue(0, 0);
      enqueue(w - 1, 0);
      enqueue(0, h - 1);
      enqueue(w - 1, h - 1);
      while (queue.length > 0) {
        const idx = queue.pop();
        data[idx * 4 + 3] = 0;
        const x = idx % w;
        const y = Math.floor(idx / w);
        enqueue(x + 1, y);
        enqueue(x - 1, y);
        enqueue(x, y + 1);
        enqueue(x, y - 1);
      }
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          if (data[i * 4 + 3] === 0) continue;
          const neighbors = [
            data[((y - 1) * w + x) * 4 + 3],
            data[((y + 1) * w + x) * 4 + 3],
            data[(y * w + (x - 1)) * 4 + 3],
            data[(y * w + (x + 1)) * 4 + 3]
          ];
          const hasTransparentNeighbor = neighbors.some((a) => a === 0);
          if (hasTransparentNeighbor) {
            data[i * 4 + 3] = 128;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const blob = await new Promise(
        (resolve) => canvas.toBlob(resolve, "image/png")
      );
      if (!blob) throw new Error("PNG export failed");
      const url = URL.createObjectURL(blob);
      console.log("[RemoveBG] Generated transparent PNG URL:", url);
      update({
        src: url,
        backgroundRemoved: true,
        // Reset any old fake-filter artifacts
        filters: { ...el.filters, contrast: 100, saturation: 100 }
      });
      ue.success("Background removed successfully.");
    } catch (err) {
      console.error("[RemoveBG] Error:", err);
      ue.error("Background removal failed. Try another image.");
    } finally {
      setRemoving(false);
    }
  };
  const handleEnhance = async () => {
    setEnhancing(true);
    await new Promise((r) => setTimeout(r, 1500));
    update({
      filters: {
        ...el.filters,
        brightness: Math.min(el.filters.brightness + 10, 200),
        contrast: Math.min(el.filters.contrast + 15, 200),
        saturation: Math.min(el.filters.saturation + 10, 200)
      }
    });
    setEnhancing(false);
  };
  const handleReplace = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    update({ src: url });
  };
  const MASK_SHAPES = ["circle", "rectangle", "star"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col px-3 py-3 gap-3",
      "data-ocid": "image-effects-tab",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShadowControls,
          {
            shadow: el.shadow,
            onChange: (s) => update({ shadow: s })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: handleRemoveBg,
            disabled: removing,
            className: "flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-xs font-semibold transition-smooth hover:border-primary/40 relative overflow-hidden",
            style: { background: removing ? "oklch(0.14 0.006 240)" : void 0 },
            "data-ocid": "image-remove-bg",
            children: removing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-0 bg-primary/10",
                  animate: { x: ["-100%", "100%"] },
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.2,
                    ease: "linear"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4 text-primary animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Removing Background…" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Remove Background (AI)" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: handleEnhance,
            disabled: enhancing,
            className: "flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-xs font-semibold transition-smooth hover:border-accent/40 relative overflow-hidden",
            "data-ocid": "image-ai-enhance",
            children: enhancing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-0 bg-accent/10",
                  animate: { x: ["-100%", "100%"] },
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                    ease: "linear"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Enhancing…" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Enhance Image Quality" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            accept: "image/*",
            onChange: handleReplace,
            className: "hidden"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: () => {
              var _a;
              return (_a = fileRef.current) == null ? void 0 : _a.click();
            },
            className: "flex items-center justify-center gap-2 h-10 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border/80 transition-smooth",
            "data-ocid": "image-replace",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-4 h-4" }),
              " Replace Image"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { title: "Mask Shape", defaultOpen: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: MASK_SHAPES.map((shape) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.03 },
            whileTap: { scale: 0.97 },
            onClick: () => update({ mask: el.mask === shape ? null : shape }),
            className: [
              "py-2 rounded-xl border text-[10px] font-semibold capitalize transition-smooth",
              el.mask === shape ? "border-primary/60 bg-primary/20 text-primary" : "border-border text-muted-foreground hover:text-foreground bg-muted/30"
            ].join(" "),
            "data-ocid": `image-mask-${shape}`,
            children: shape
          },
          shape
        )) }) })
      ]
    }
  );
}
function ShapeFillTab({ el }) {
  const update = (patch) => useAdCreatorStore.getState().updateElement(el.id, patch);
  const fillType = el.gradient ? "gradient" : el.fill === "none" ? "none" : "solid";
  const [gradAngle, setGradAngle] = reactExports.useState(135);
  const [gradStops, setGradStops] = reactExports.useState(["#2563EB", "#22C55E"]);
  const applyGradient = (angle, stops) => {
    update({ gradient: `linear-gradient(${angle}deg, ${stops.join(", ")})` });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-y-auto", "data-ocid": "shape-fill-tab", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Fill", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SegmentButton,
        {
          options: [
            { label: "Solid", value: "solid" },
            { label: "Gradient", value: "gradient" },
            { label: "None", value: "none" }
          ],
          value: fillType,
          onChange: (v) => {
            if (v === "solid")
              update({ fill: el.fill || "#2563EB", gradient: null });
            else if (v === "gradient") {
              update({
                fill: "transparent",
                gradient: `linear-gradient(${gradAngle}deg, ${gradStops.join(", ")})`
              });
            } else update({ fill: "none", gradient: null });
          }
        }
      ),
      fillType === "solid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "flex flex-col gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorField,
              {
                value: el.fill,
                onChange: (c) => update({ fill: c }),
                label: "Fill color"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: PALETTE_SWATCHES.map((sw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorSwatch,
              {
                color: sw,
                active: el.fill === sw,
                onClick: () => update({ fill: sw })
              },
              sw
            )) })
          ]
        }
      ),
      fillType === "gradient" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "flex flex-col gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Angle — ${gradAngle}°`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StyledSlider,
              {
                min: 0,
                max: 360,
                value: gradAngle,
                onChange: (v) => {
                  setGradAngle(v);
                  applyGradient(v, gradStops);
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Stop 1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorField,
                {
                  value: gradStops[0],
                  onChange: (c) => {
                    const s = [c, gradStops[1]];
                    setGradStops(s);
                    applyGradient(gradAngle, s);
                  },
                  label: "Gradient stop 1"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Stop 2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorField,
                {
                  value: gradStops[1],
                  onChange: (c) => {
                    const s = [gradStops[0], c];
                    setGradStops(s);
                    applyGradient(gradAngle, s);
                  },
                  label: "Gradient stop 2"
                }
              ) })
            ] })
          ]
        }
      )
    ] }),
    el.shapeType === "rect" && /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { title: "Shape", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Corner Radius — ${el.cornerRadius}px`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StyledSlider,
      {
        min: 0,
        max: 100,
        value: el.cornerRadius,
        onChange: (v) => update({ cornerRadius: v })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleSection, { title: "Effects", defaultOpen: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShadowControls,
        {
          shadow: el.shadow,
          onChange: (s) => update({ shadow: s })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToggleRow,
        {
          label: "Glow",
          checked: el.glow !== null,
          onChange: (v) => update({ glow: v ? { color: "#2563EB", intensity: 0.5 } : null }),
          children: el.glow && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ColorField,
              {
                value: el.glow.color,
                onChange: (c) => update({ glow: { ...el.glow, color: c } }),
                label: "Glow color"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Row,
              {
                label: `Intensity — ${Math.round(el.glow.intensity * 100)}%`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StyledSlider,
                  {
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: el.glow.intensity,
                    onChange: (v) => update({ glow: { ...el.glow, intensity: v } }),
                    accentColor: "#22C55E"
                  }
                )
              }
            )
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { title: "Appearance", defaultOpen: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Opacity — ${Math.round(el.opacity * 100)}%`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      StyledSlider,
      {
        min: 0,
        max: 1,
        step: 0.01,
        value: el.opacity,
        onChange: (v) => update({ opacity: v })
      }
    ) }) })
  ] });
}
function ShapeStrokeTab({ el }) {
  const update = (patch) => useAdCreatorStore.getState().updateElement(el.id, patch);
  const hasStroke = el.strokeWidth > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col px-3 py-3 gap-3", "data-ocid": "shape-stroke-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ToggleRow,
    {
      label: "Stroke",
      checked: hasStroke,
      onChange: (v) => update({ strokeWidth: v ? 2 : 0 }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: `Width — ${el.strokeWidth}px`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StyledSlider,
          {
            min: 0,
            max: 20,
            value: el.strokeWidth,
            onChange: (v) => update({ strokeWidth: v })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ColorField,
          {
            value: el.stroke || "#ffffff",
            onChange: (c) => update({ stroke: c }),
            label: "Stroke color"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SegmentButton,
          {
            options: [
              { label: "Solid", value: "solid" },
              { label: "Dashed", value: "dashed" },
              { label: "Dotted", value: "dotted" }
            ],
            value: el.strokeDash.length === 0 ? "solid" : el.strokeDash[0] === 2 ? "dotted" : "dashed",
            onChange: (v) => {
              if (v === "solid") update({ strokeDash: [] });
              else if (v === "dashed") update({ strokeDash: [8, 4] });
              else update({ strokeDash: [2, 4] });
            }
          }
        ) }),
        el.strokeDash.length > 0 && el.strokeDash[0] !== 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Dash Length", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StyledSlider,
          {
            min: 2,
            max: 32,
            value: el.strokeDash[0] ?? 8,
            onChange: (v) => update({ strokeDash: [v, el.strokeDash[1] ?? 4] })
          }
        ) })
      ]
    }
  ) });
}
function AdPropertiesPanel() {
  const elements = useAdCreatorStore((s) => s.elements);
  const selectedIds = useAdCreatorStore((s) => s.selectedIds);
  const canvasSize = useAdCreatorStore((s) => s.canvasSize);
  const addElement = useAdCreatorStore((s) => s.addElement);
  const setRightPanelTab = useAdCreatorStore((s) => s.setRightPanelTab);
  const rightPanelTab = useAdCreatorStore((s) => s.rightPanelTab);
  const selectedEl = reactExports.useMemo(
    () => selectedIds.length === 1 ? elements.find((e) => e.id === selectedIds[0]) ?? null : null,
    [elements, selectedIds]
  );
  const getTabs = (el) => {
    if (!el) return [];
    if (el.type === "text") return ["Style", "Animate", "Position"];
    if (el.type === "image") return ["Adjust", "Effects", "Position"];
    if (el.type === "shape") return ["Fill", "Stroke", "Position"];
    return ["Position"];
  };
  const tabs = getTabs(selectedEl);
  const activeTab = tabs.includes(rightPanelTab) ? rightPanelTab : tabs[0] ?? "";
  const prevTypeRef = reactExports.useRef(null);
  const elType = (selectedEl == null ? void 0 : selectedEl.type) ?? null;
  const firstTab = tabs[0] ?? "";
  reactExports.useEffect(() => {
    if (elType !== prevTypeRef.current) {
      prevTypeRef.current = elType;
      if (firstTab && rightPanelTab !== firstTab) {
        setRightPanelTab(firstTab);
      }
    }
  }, [elType, firstTab, rightPanelTab, setRightPanelTab]);
  const handleAddText = reactExports.useCallback(() => {
    addElement({
      type: "text",
      name: "Text",
      x: 100,
      y: 100,
      width: 300,
      height: 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: "New Text",
      fontFamily: "Inter",
      fontSize: 48,
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "left",
      lineHeight: 1.2,
      letterSpacing: 0,
      gradient: false,
      gradientColors: ["#ffffff", "#2563EB"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal"
    });
  }, [addElement]);
  const handleAddShape = reactExports.useCallback(() => {
    addElement({
      type: "shape",
      name: "Shape",
      x: 200,
      y: 200,
      width: 200,
      height: 200,
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
      glow: null,
      shadow: null,
      cornerRadius: 12
    });
  }, [addElement]);
  const handleAddImage = reactExports.useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      addElement({
        type: "image",
        name: "Image",
        x: 100,
        y: 100,
        width: 400,
        height: 300,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        src: url,
        filters: {
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0,
          hue: 0
        },
        shadow: null,
        backgroundRemoved: false,
        mask: null
      });
    };
  }, [addElement]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-[320px] flex-shrink-0 flex flex-col h-full border-l border-border relative",
      style: {
        background: "oklch(0.105 0.006 240)",
        boxShadow: "var(--shadow-glass-md)"
      },
      "data-ocid": "ad-properties-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-3 py-2.5 border-b border-border",
            style: { background: "oklch(0.11 0.006 240)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground tracking-wide", children: selectedEl ? selectedEl.type === "text" ? "Text Properties" : selectedEl.type === "image" ? "Image Properties" : selectedEl.type === "shape" ? "Shape Properties" : "Properties" : "Properties" }),
              selectedEl && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground", children: selectedEl.name })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden flex flex-col min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !selectedEl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.2 },
            className: "flex-1 overflow-y-auto",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyPanel,
              {
                onAddText: handleAddText,
                onAddShape: handleAddShape,
                onAddImage: handleAddImage,
                canvasSize
              }
            )
          },
          "empty"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.2 },
            className: "flex-1 flex flex-col min-h-0",
            children: [
              tabs.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                TabBar,
                {
                  tabs,
                  active: activeTab,
                  onChange: setRightPanelTab
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 8 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -8 },
                  transition: { duration: 0.18 },
                  children: [
                    selectedEl.type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      activeTab === "Style" && /* @__PURE__ */ jsxRuntimeExports.jsx(TextStyleTab, { el: selectedEl }),
                      activeTab === "Animate" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TextAnimateTab,
                        {
                          el: selectedEl
                        }
                      ),
                      activeTab === "Position" && /* @__PURE__ */ jsxRuntimeExports.jsx(PositionTab, { el: selectedEl })
                    ] }),
                    selectedEl.type === "image" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      activeTab === "Adjust" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ImageAdjustTab,
                        {
                          el: selectedEl
                        }
                      ),
                      activeTab === "Effects" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ImageEffectsTab,
                        {
                          el: selectedEl
                        }
                      ),
                      activeTab === "Position" && /* @__PURE__ */ jsxRuntimeExports.jsx(PositionTab, { el: selectedEl })
                    ] }),
                    selectedEl.type === "shape" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      activeTab === "Fill" && /* @__PURE__ */ jsxRuntimeExports.jsx(ShapeFillTab, { el: selectedEl }),
                      activeTab === "Stroke" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ShapeStrokeTab,
                        {
                          el: selectedEl
                        }
                      ),
                      activeTab === "Position" && /* @__PURE__ */ jsxRuntimeExports.jsx(PositionTab, { el: selectedEl })
                    ] }),
                    selectedEl.type === "group" && /* @__PURE__ */ jsxRuntimeExports.jsx(PositionTab, { el: selectedEl })
                  ]
                },
                activeTab + selectedEl.id
              ) }) })
            ]
          },
          selectedEl.type
        ) }) })
      ]
    }
  );
}
const TOOLS = [
  {
    key: "magic-design",
    icon: WandSparkles,
    label: "Magic Design",
    desc: "Generate complete ad layouts from a prompt",
    color: "#2563EB",
    bg: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30"
  },
  {
    key: "copywriter",
    icon: MessageSquare,
    label: "AI Copywriter",
    desc: "Generate headlines, CTAs, and ad copy",
    color: "#22C55E",
    bg: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30"
  },
  {
    key: "image-gen",
    icon: ImagePlay,
    label: "AI Image Gen",
    desc: "Create visuals from text prompts",
    color: "#a78bfa",
    bg: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/30"
  },
  {
    key: "magic-resize",
    icon: Maximize2,
    label: "Magic Resize",
    desc: "Convert to any format instantly",
    color: "#f97316",
    bg: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30"
  },
  {
    key: "auto-layout",
    icon: AlignCenter,
    label: "Auto Layout",
    desc: "AI-powered spacing and alignment",
    color: "#06b6d4",
    bg: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30"
  }
];
function AiToolsTab(props) {
  const handlers = {
    "magic-design": props.onOpenMagicDesign,
    copywriter: props.onOpenAiCopywriter,
    "image-gen": props.onOpenAiImageGen,
    "magic-resize": props.onOpenMagicResize,
    "auto-layout": props.onOpenAutoLayout
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5 overflow-y-auto h-full pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: TOOLS.map((tool, i) => {
    const Icon = tool.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        type: "button",
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98 },
        onClick: handlers[tool.key],
        "data-ocid": `ai-tool.${tool.key}`,
        className: `w-full text-left p-3 rounded-xl bg-gradient-to-br ${tool.bg} border ${tool.border} hover:shadow-lg transition-all group`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              style: {
                background: `${tool.color}20`,
                border: `1px solid ${tool.color}40`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", style: { color: tool.color } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground group-hover:text-white transition-colors", children: tool.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 leading-relaxed", children: tool.desc })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" })
        ] })
      },
      tool.key
    );
  }) });
}
const APPS = [
  {
    icon: Image$1,
    name: "Unsplash Photos",
    desc: "Millions of free images",
    color: "#1a1a1a"
  },
  {
    icon: Smile,
    name: "Giphy",
    desc: "Animated GIF library",
    color: "#00ff88"
  },
  { icon: Film, name: "Pexels", desc: "Free stock videos", color: "#05a081" },
  {
    icon: Search,
    name: "Google Fonts",
    desc: "1,000+ web fonts",
    color: "#4285f4"
  },
  {
    icon: QrCode,
    name: "QR Generator",
    desc: "Create custom QR codes",
    color: "#6366f1"
  },
  {
    icon: ChartColumn,
    name: "Chart Builder",
    desc: "Data visualizations",
    color: "#f59e0b"
  }
];
function AppsTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "App Integrations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Extend your creative toolkit" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: APPS.map((app, i) => {
      const Icon = app.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.06 },
          className: "flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all relative group cursor-default",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 opacity-60",
                style: {
                  background: `${app.color}20`,
                  border: `1px solid ${app.color}30`
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", style: { color: app.color } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground truncate", children: app.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: app.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[9px] bg-white/10 text-muted-foreground px-2 py-0.5 rounded-full", children: "Soon" })
          ]
        },
        app.name
      );
    }) })
  ] });
}
const TRACKS = [
  {
    id: 1,
    name: "Energetic Beat",
    duration: "2:34",
    genre: "Hip-Hop",
    bpm: 128
  },
  {
    id: 2,
    name: "Cinematic Drama",
    duration: "3:12",
    genre: "Cinematic",
    bpm: 90
  },
  { id: 3, name: "Lo-Fi Chill", duration: "2:48", genre: "Lo-Fi", bpm: 78 },
  {
    id: 4,
    name: "Electronic Pulse",
    duration: "3:05",
    genre: "Electronic",
    bpm: 140
  },
  {
    id: 5,
    name: "Epic Trailer",
    duration: "1:58",
    genre: "Cinematic",
    bpm: 110
  },
  { id: 6, name: "Upbeat Pop", duration: "2:22", genre: "Pop", bpm: 120 }
];
const CATEGORIES$2 = [
  "All",
  "Hip-Hop",
  "Cinematic",
  "Lo-Fi",
  "Electronic",
  "Ambient"
];
function AudioTab() {
  const [search, setSearch] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  const [playing, setPlaying] = reactExports.useState(null);
  const shown = TRACKS.filter((t) => {
    const matchCat = cat === "All" || t.genre === cat;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search tracks…",
          className: "w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-none pb-1", children: CATEGORIES$2.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setCat(c),
        className: `shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${cat === c ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"}`,
        children: c
      },
      c
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1 pr-1 pb-2 flex flex-col gap-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: shown.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        className: "flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": playing === t.id ? "Pause" : "Play",
              onClick: () => setPlaying((p) => p === t.id ? null : t.id),
              className: "w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center hover:bg-blue-500/30 transition-colors shrink-0",
              children: playing === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3 text-blue-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 text-blue-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-0.5 h-3", children: [4, 7, 3, 8, 5, 9, 4, 6, 3, 7, 5, 4].map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "w-0.5 rounded-full",
                  style: {
                    background: playing === t.id ? "#2563eb" : "#4b5563"
                  },
                  animate: playing === t.id ? {
                    height: [h * 1.2, h * 0.5, h * 1.2],
                    transition: {
                      duration: 0.5 + idx * 0.05,
                      repeat: Number.POSITIVE_INFINITY
                    }
                  } : { height: h }
                },
                `wf-${idx}-${h}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: t.duration }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-white/10 px-1.5 py-0.5 rounded-full text-muted-foreground", children: t.genre })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Add track",
              className: "w-6 h-6 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 flex items-center justify-center transition-all shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-muted-foreground" })
            }
          )
        ]
      },
      t.id
    )) })
  ] });
}
function BrandHubTab() {
  const { brand, setBrand } = useAdCreatorStore();
  const logoRef = reactExports.useRef(null);
  function handleLogoUpload(files) {
    if (!(files == null ? void 0 : files[0])) return;
    const url = URL.createObjectURL(files[0]);
    setBrand({ logoUrl: url });
  }
  function addColor() {
    const input = document.createElement("input");
    input.type = "color";
    input.value = "#2563eb";
    input.click();
    input.addEventListener("change", () => {
      setBrand({ colors: [...brand.colors, input.value] });
    });
  }
  function removeColor(idx) {
    setBrand({ colors: brand.colors.filter((_, i) => i !== idx) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 overflow-y-auto h-full pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Logo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "h-20 w-full rounded-xl border border-dashed border-white/20 hover:border-blue-500/40 flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden",
          onClick: () => {
            var _a;
            return (_a = logoRef.current) == null ? void 0 : _a.click();
          },
          children: [
            brand.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: brand.logoUrl,
                alt: "Brand logo",
                className: "max-h-16 max-w-full object-contain"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Upload Logo" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: logoRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => handleLogoUpload(e.target.files)
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Brand Colors" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        brand.colors.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            "aria-label": c,
            onClick: () => removeColor(i),
            className: "w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/50 transition-all relative group",
            style: { background: c }
          },
          c
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "aria-label": "Add color",
            whileHover: { scale: 1.1 },
            onClick: addColor,
            className: "w-8 h-8 rounded-full border-2 border-dashed border-white/30 hover:border-blue-500/60 flex items-center justify-center transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 text-muted-foreground" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Brand Fonts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: brand.fonts.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-foreground",
                style: { fontFamily: f },
                children: f
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: i === 0 ? "Display" : "Body" })
          ]
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-3.5 h-3.5" }),
          "Apply Brand Kit"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: "Brand Consistency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Auto-apply to new elements" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-5 bg-blue-500/20 border border-blue-500/40 rounded-full relative cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0.5 top-0.5 w-4 h-4 bg-blue-400 rounded-full" }) })
    ] })
  ] });
}
const GRADIENTS = [
  { label: "Cobalt", value: "linear-gradient(135deg,#1e40af,#2563eb)" },
  { label: "Emerald", value: "linear-gradient(135deg,#065f46,#22c55e)" },
  { label: "Purple", value: "linear-gradient(135deg,#4c1d95,#7c3aed)" },
  { label: "Sunset", value: "linear-gradient(135deg,#92400e,#f59e0b)" },
  { label: "Rose", value: "linear-gradient(135deg,#9f1239,#f43f5e)" },
  { label: "Cyan", value: "linear-gradient(135deg,#164e63,#06b6d4)" }
];
const ICON_LIST = [
  { icon: Twitter, name: "Twitter" },
  { icon: Instagram, name: "Instagram" },
  { icon: Youtube, name: "YouTube" },
  { icon: Linkedin, name: "LinkedIn" },
  { icon: Heart, name: "Heart" },
  { icon: Star, name: "Star" },
  { icon: Zap, name: "Lightning" },
  { icon: Diamond, name: "Diamond" },
  { icon: Flame, name: "Fire" }
];
const SHAPES = [
  { label: "Rectangle", type: "rect" },
  { label: "Circle", type: "circle" },
  { label: "Blob", type: "blob" },
  { label: "Arrow", type: "arrow" }
];
const PILLS = ["All", "Shapes", "Icons", "Gradients", "Social"];
function ElementsTab() {
  const [search, setSearch] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  const { addElement, canvasSize } = useAdCreatorStore();
  function addShape(type, gradient) {
    const el = {
      type: "shape",
      name: type.charAt(0).toUpperCase() + type.slice(1),
      x: canvasSize.width * 0.3,
      y: canvasSize.height * 0.3,
      width: 200,
      height: type === "circle" ? 200 : 120,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: type,
      fill: gradient ?? "#2563EB",
      gradient: gradient ?? null,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: type === "rect" ? 8 : 0
    };
    addElement(el);
  }
  const showShapes = cat === "All" || cat === "Shapes";
  const showIcons = cat === "All" || cat === "Icons" || cat === "Social";
  const showGrads = cat === "All" || cat === "Gradients";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search elements…",
          className: "w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-none pb-1", children: PILLS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setCat(p),
        className: `shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${cat === p ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"}`,
        children: p
      },
      p
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto flex-1 pr-1 pb-2 flex flex-col gap-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: [
      showShapes && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Shapes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: SHAPES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.06 },
            whileTap: { scale: 0.95 },
            onClick: () => addShape(s.type),
            className: "aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 flex items-center justify-center text-[9px] text-muted-foreground hover:text-blue-400 transition-all",
            children: s.label
          },
          s.type
        )) })
      ] }),
      showIcons && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Icons" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: ICON_LIST.filter(
          ({ name }) => name.toLowerCase().includes(search.toLowerCase()) || search === ""
        ).map(({ icon: Icon, name }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "aria-label": name,
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            onClick: () => addShape("rect"),
            className: "aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 flex items-center justify-center transition-all group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-colors" })
          },
          name
        )) })
      ] }),
      showGrads && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Gradients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: GRADIENTS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            onClick: () => addShape("rect", g.value),
            className: "h-12 rounded-lg border border-white/10 hover:border-white/30 transition-all",
            style: { background: g.value },
            "aria-label": g.label
          },
          g.label
        )) })
      ] })
    ] })
  ] });
}
const PLACEHOLDER_IMAGES = [
  {
    id: 1,
    gradient: "linear-gradient(135deg,#1e3a5f,#2563eb)",
    label: "Blue Tech"
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg,#064e3b,#22c55e)",
    label: "Nature"
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg,#4c1d95,#7c3aed)",
    label: "Purple"
  },
  { id: 4, gradient: "linear-gradient(135deg,#7f1d1d,#ef4444)", label: "Red" },
  { id: 5, gradient: "linear-gradient(135deg,#164e63,#06b6d4)", label: "Cyan" },
  { id: 6, gradient: "linear-gradient(135deg,#78350f,#f59e0b)", label: "Gold" },
  { id: 7, gradient: "linear-gradient(135deg,#1f2937,#9ca3af)", label: "Gray" },
  { id: 8, gradient: "linear-gradient(135deg,#042f2e,#14b8a6)", label: "Teal" },
  { id: 9, gradient: "linear-gradient(135deg,#2d1b69,#e879f9)", label: "Neon" },
  {
    id: 10,
    gradient: "linear-gradient(135deg,#1c1c1c,#f97316)",
    label: "Fire"
  },
  { id: 11, gradient: "linear-gradient(135deg,#0c4a6e,#38bdf8)", label: "Sky" },
  {
    id: 12,
    gradient: "linear-gradient(135deg,#4a044e,#f0abfc)",
    label: "Pink"
  },
  {
    id: 13,
    gradient: "linear-gradient(135deg,#052e16,#4ade80)",
    label: "Forest"
  },
  {
    id: 14,
    gradient: "linear-gradient(135deg,#1a1a2e,#e2e8f0)",
    label: "Mono"
  },
  {
    id: 15,
    gradient: "linear-gradient(135deg,#27272a,#a1a1aa)",
    label: "Steel"
  },
  {
    id: 16,
    gradient: "linear-gradient(135deg,#0f172a,#312e81)",
    label: "Indigo"
  }
];
const CATEGORIES$1 = [
  "All",
  "Nature",
  "Tech",
  "Fashion",
  "Abstract",
  "Architecture"
];
function ImagesTab() {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const { addElement, canvasSize } = useAdCreatorStore();
  function addImage(gradient, label) {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const grad = ctx.createLinearGradient(0, 0, 400, 400);
    const colors = gradient.match(/#[0-9a-f]{6}/gi) ?? ["#1e3a5f", "#2563eb"];
    grad.addColorStop(0, colors[0]);
    grad.addColorStop(1, colors[1] ?? colors[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 400, 400);
    const src = canvas.toDataURL();
    const el = {
      type: "image",
      name: label,
      x: canvasSize.width * 0.15,
      y: canvasSize.height * 0.15,
      width: 400,
      height: 400,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      src,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0
      },
      shadow: null,
      backgroundRemoved: false,
      mask: null
    };
    addElement(el);
  }
  const shown = PLACEHOLDER_IMAGES.filter(
    (img) => img.label.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search images…",
          className: "w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-none pb-1", children: CATEGORIES$1.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setCategory(c),
        className: `shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${category === c ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"}`,
        children: c
      },
      c
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: shown.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.03 },
        className: "group relative rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/40 cursor-pointer transition-all",
        style: { aspectRatio: "1 / 1" },
        onClick: () => addImage(img.gradient, img.label),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0",
              style: { background: img.gradient }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-1.5 text-[9px] text-white/70", children: img.label })
        ]
      },
      img.id
    )) })
  ] });
}
const TYPE_COLORS = {
  text: "#2563EB",
  image: "#22C55E",
  shape: "#a78bfa",
  group: "#f97316"
};
const TYPE_ICONS = {
  text: Type,
  image: Image$1,
  shape: Square,
  group: Layers
};
function LayersTab() {
  const {
    layers,
    elements,
    selectedIds,
    selectElement,
    toggleLayerVisibility,
    toggleLayerLock,
    renameLayer,
    deleteElement,
    groupLayers
  } = useAdCreatorStore();
  const [renamingId, setRenamingId] = reactExports.useState(null);
  const [renameValue, setRenameValue] = reactExports.useState("");
  function startRename(elementId, current) {
    setRenamingId(elementId);
    setRenameValue(current);
  }
  function commitRename(elementId) {
    if (renameValue.trim()) renameLayer(elementId, renameValue.trim());
    setRenamingId(null);
  }
  function getElementType(elementId) {
    var _a;
    return ((_a = elements.find((e) => e.id === elementId)) == null ? void 0 : _a.type) ?? "shape";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: [
        layers.length,
        " layer",
        layers.length !== 1 ? "s" : ""
      ] }),
      selectedIds.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => groupLayers(selectedIds),
          className: "text-[10px] text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 transition-colors",
          children: "Group"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1 pr-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: layers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-8 h-8 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No layers yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "Add elements to the canvas" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReorderGroup,
      {
        axis: "y",
        values: layers,
        onReorder: () => {
        },
        className: "flex flex-col gap-1",
        children: layers.map((layer, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LayerRow,
          {
            layer,
            index: idx,
            isSelected: selectedIds.includes(layer.elementId),
            isRenaming: renamingId === layer.elementId,
            renameValue,
            elementType: getElementType(layer.elementId),
            onSelect: () => selectElement(layer.elementId),
            onVisibilityToggle: () => toggleLayerVisibility(layer.elementId),
            onLockToggle: () => toggleLayerLock(layer.elementId),
            onStartRename: () => startRename(layer.elementId, layer.name),
            onRenameChange: setRenameValue,
            onCommitRename: () => commitRename(layer.elementId),
            onDelete: () => deleteElement(layer.elementId)
          },
          layer.id
        ))
      }
    ) }) })
  ] });
}
const LayerRow = reactExports.memo(function LayerRow2({
  layer,
  index,
  isSelected,
  isRenaming,
  renameValue,
  elementType,
  onSelect,
  onVisibilityToggle,
  onLockToggle,
  onStartRename,
  onRenameChange,
  onCommitRename,
  onDelete
}) {
  const Icon = TYPE_ICONS[elementType] ?? Square;
  const color = TYPE_COLORS[elementType] ?? "#94a3b8";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ReorderItem, { value: layer, id: layer.id, as: "div", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -4 },
      transition: { delay: index * 0.02 },
      onClick: onSelect,
      "data-ocid": `layer.item.${index + 1}`,
      className: `group flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${isSelected ? "bg-blue-500/15 border border-blue-500/30" : "hover:bg-white/5 border border-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground shrink-0 cursor-grab" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": layer.visible ? "Hide layer" : "Show layer",
            onClick: (e) => {
              e.stopPropagation();
              onVisibilityToggle();
            },
            className: "w-5 h-5 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity",
            children: layer.visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": layer.locked ? "Unlock layer" : "Lock layer",
            onClick: (e) => {
              e.stopPropagation();
              onLockToggle();
            },
            className: "w-5 h-5 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity",
            children: layer.locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-amber-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-3 h-3 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 shrink-0", style: { color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: isRenaming ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: (el) => el == null ? void 0 : el.focus(),
            value: renameValue,
            onChange: (e) => onRenameChange(e.target.value),
            onBlur: onCommitRename,
            onKeyDown: (e) => {
              if (e.key === "Enter") onCommitRename();
              if (e.key === "Escape") onCommitRename();
              e.stopPropagation();
            },
            onClick: (e) => e.stopPropagation(),
            className: "w-full bg-[#0d1117] border border-blue-500/50 rounded px-1 py-0.5 text-[10px] text-foreground focus:outline-none"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[11px] truncate block",
            style: { color: isSelected ? "#e2e8f0" : "#94a3b8" },
            onDoubleClick: (e) => {
              e.stopPropagation();
              onStartRename();
            },
            children: layer.name
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Delete layer",
            onClick: (e) => {
              e.stopPropagation();
              onDelete();
            },
            className: "w-5 h-5 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 hover:text-red-400 text-muted-foreground transition-all",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
          }
        )
      ]
    }
  ) });
});
const TEMPLATES = [
  {
    id: "luxury-brand",
    name: "Luxury Brand",
    gradient: "linear-gradient(135deg,#1a0533,#3b0764)",
    accent: "#c084fc",
    tag: "Luxury"
  },
  {
    id: "gaming-promo",
    name: "Gaming Promo",
    gradient: "linear-gradient(135deg,#0f172a,#1e3a5f)",
    accent: "#22d3ee",
    tag: "Gaming"
  },
  {
    id: "skincare-ad",
    name: "Skincare Ad",
    gradient: "linear-gradient(135deg,#fdf2f8,#fce7f3)",
    accent: "#ec4899",
    tag: "Instagram"
  },
  {
    id: "tech-launch",
    name: "Tech Launch",
    gradient: "linear-gradient(135deg,#0f172a,#1e40af)",
    accent: "#60a5fa",
    tag: "Ads"
  },
  {
    id: "yt-thumb",
    name: "YouTube Thumb",
    gradient: "linear-gradient(135deg,#1c1c1c,#dc2626)",
    accent: "#ef4444",
    tag: "YouTube"
  },
  {
    id: "tiktok-ad",
    name: "TikTok Ad",
    gradient: "linear-gradient(135deg,#010101,#2d1b69)",
    accent: "#e879f9",
    tag: "TikTok"
  },
  {
    id: "podcast-cover",
    name: "Podcast Cover",
    gradient: "linear-gradient(135deg,#111827,#064e3b)",
    accent: "#34d399",
    tag: "Podcast"
  },
  {
    id: "product-launch",
    name: "Product Launch",
    gradient: "linear-gradient(135deg,#0c0a09,#292524)",
    accent: "#f97316",
    tag: "Ads"
  }
];
const CATEGORIES = [
  "All",
  "Instagram",
  "YouTube",
  "TikTok",
  "Ads",
  "Gaming",
  "Luxury",
  "Podcast"
];
function TemplatesTab() {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const [appliedId, setAppliedId] = reactExports.useState(null);
  const { setElements, canvasSize } = useAdCreatorStore();
  const filtered = TEMPLATES.filter((t) => {
    const matchCat = category === "All" || t.tag === category;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  function applyTemplate(t) {
    const cw = canvasSize.width;
    const ch = canvasSize.height;
    const bgId = `tmpl-bg-${t.id}`;
    const headlineId = `tmpl-headline-${t.id}`;
    const subtitleId = `tmpl-subtitle-${t.id}`;
    const ctaId = `tmpl-cta-${t.id}`;
    const ctaTextId = `tmpl-cta-text-${t.id}`;
    const headlineW = Math.round(cw * 0.8);
    const headlineH = Math.round(cw * 0.1);
    const headlineX = Math.round((cw - headlineW) / 2);
    const headlineY = Math.round(ch * 0.32);
    const subtitleW = Math.round(cw * 0.65);
    const subtitleH = Math.round(cw * 0.05);
    const subtitleX = Math.round((cw - subtitleW) / 2);
    const subtitleY = headlineY + headlineH + Math.round(ch * 0.03);
    const ctaW = Math.round(cw * 0.32);
    const ctaH = Math.round(ch * 0.07);
    const ctaX = Math.round((cw - ctaW) / 2);
    const ctaY = subtitleY + subtitleH + Math.round(ch * 0.05);
    const bg = {
      id: bgId,
      type: "shape",
      name: `${t.name} BG`,
      x: 0,
      y: 0,
      width: cw,
      height: ch,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: t.gradient,
      gradient: t.gradient,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 0
    };
    const headline = {
      id: headlineId,
      type: "text",
      name: "Headline",
      x: headlineX,
      y: headlineY,
      width: headlineW,
      height: headlineH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: t.name.toUpperCase(),
      fontFamily: "Inter",
      fontSize: Math.max(24, Math.round(cw * 0.065)),
      fontWeight: "800",
      color: t.accent,
      textAlign: "center",
      lineHeight: 1.1,
      letterSpacing: 2,
      gradient: false,
      gradientColors: [t.accent, "#ffffff"],
      shadow: null,
      glow: { color: t.accent, intensity: 0.5 },
      outline: null,
      animation: null,
      blendMode: "normal"
    };
    const subtitle = {
      id: subtitleId,
      type: "text",
      name: "Subtitle",
      x: subtitleX,
      y: subtitleY,
      width: subtitleW,
      height: subtitleH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: "Your message goes here",
      fontFamily: "Inter",
      fontSize: Math.max(14, Math.round(cw * 0.027)),
      fontWeight: "400",
      color: "rgba(255,255,255,0.7)",
      textAlign: "center",
      lineHeight: 1.4,
      letterSpacing: 0,
      gradient: false,
      gradientColors: ["#ffffff", "#94a3b8"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal"
    };
    const ctaBtn = {
      id: ctaId,
      type: "shape",
      name: "CTA Button",
      x: ctaX,
      y: ctaY,
      width: ctaW,
      height: ctaH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: t.accent,
      gradient: null,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: { color: t.accent, intensity: 0.4 },
      shadow: { x: 0, y: 4, blur: 24, spread: 0, color: `${t.accent}66` },
      cornerRadius: ctaH / 2
    };
    const ctaText = {
      id: ctaTextId,
      type: "text",
      name: "CTA Text",
      x: ctaX,
      y: ctaY,
      width: ctaW,
      height: ctaH,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: "Get Started",
      fontFamily: "Inter",
      fontSize: Math.max(12, Math.round(cw * 0.02)),
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "center",
      lineHeight: ctaH / Math.max(12, Math.round(cw * 0.02)),
      letterSpacing: 1,
      gradient: false,
      gradientColors: ["#ffffff", "#ffffff"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal"
    };
    const templateElements = [bg, headline, subtitle, ctaBtn, ctaText];
    console.log(
      "[TemplatesTab] applyTemplate:",
      t.id,
      "objects:",
      templateElements
    );
    setElements(templateElements, headlineId);
    setAppliedId(t.id);
    setTimeout(() => setAppliedId(null), 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search templates…",
          className: "w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-none pb-1", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setCategory(c),
        className: `shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-all ${category === c ? "bg-blue-500/20 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"}`,
        children: c
      },
      c
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 overflow-y-auto pr-1 pb-2 flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: filtered.map((t, i) => {
      const isApplied = appliedId === t.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.04 },
          className: `group relative cursor-pointer rounded-lg overflow-hidden border transition-all ${isApplied ? "border-blue-500/80 ring-1 ring-blue-500/40" : "border-white/10 hover:border-blue-500/40"}`,
          style: { aspectRatio: "1 / 1" },
          onClick: () => applyTemplate(t),
          "data-ocid": `templates.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: { background: t.gradient }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[9px] font-bold text-center leading-tight",
                style: { color: t.accent },
                children: t.name.toUpperCase()
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isApplied && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 flex items-center justify-center",
                style: { background: "rgba(37,99,235,0.75)" },
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.8 },
                transition: { duration: 0.18 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-white" })
              }
            ) }),
            !isApplied && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-white font-medium flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
              " Use"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 text-[8px] bg-black/50 px-1.5 py-0.5 rounded-full text-white/70", children: t.tag })
          ]
        },
        t.id
      );
    }) })
  ] });
}
const TEXT_STYLES = [
  {
    name: "Neon Glow",
    preview: "NEON GLOW",
    color: "#ffffff",
    glow: { color: "#2563EB", intensity: 0.8 },
    fontSize: 42,
    weight: "700"
  },
  {
    name: "Cinematic Title",
    preview: "Cinematic",
    color: "#f8fafc",
    glow: null,
    fontSize: 52,
    weight: "900"
  },
  {
    name: "Minimal Clean",
    preview: "Minimal",
    color: "#94a3b8",
    glow: null,
    fontSize: 36,
    weight: "300"
  },
  {
    name: "Bold Impact",
    preview: "IMPACT",
    color: "#ffffff",
    glow: null,
    fontSize: 60,
    weight: "900"
  },
  {
    name: "Script Elegant",
    preview: "Elegant",
    color: "#e2e8f0",
    glow: null,
    fontSize: 44,
    weight: "400"
  }
];
const FONT_PAIRS = [
  { display: "Inter", body: "Plus Jakarta Sans", label: "Modern SaaS" },
  { display: "Montserrat", body: "Open Sans", label: "Corporate" },
  { display: "Playfair Display", body: "Lato", label: "Editorial" },
  { display: "Space Grotesk", body: "DM Sans", label: "Tech" }
];
function TextTab() {
  const { addElement, canvasSize } = useAdCreatorStore();
  function addText(content, fontSize, weight, label, style) {
    const el = {
      type: "text",
      name: label,
      x: canvasSize.width * 0.2,
      y: canvasSize.height * 0.4,
      width: canvasSize.width * 0.6,
      height: fontSize * 1.6,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content,
      fontFamily: "Inter",
      fontSize,
      fontWeight: weight,
      color: "#ffffff",
      textAlign: "center",
      lineHeight: 1.2,
      letterSpacing: 0,
      gradient: false,
      gradientColors: ["#ffffff", "#94a3b8"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal",
      ...style
    };
    addElement(el);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 overflow-y-auto h-full pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Add Text" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => addText("Add a heading", 64, "800", "Heading"),
            className: "w-full text-left px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground group-hover:text-blue-300 transition-colors", children: "Add a heading" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => addText("Add a subheading", 40, "600", "Subheading"),
            className: "w-full text-left px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground group-hover:text-blue-300 transition-colors", children: "Add a subheading" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => addText("Add body text here", 24, "400", "Body Text"),
            className: "w-full text-left px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground group-hover:text-blue-300 transition-colors", children: "Add body text" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Text Styles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: TEXT_STYLES.map((ts, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.05 },
          onClick: () => addText(ts.preview, ts.fontSize, ts.weight, ts.name, {
            color: ts.color,
            glow: ts.glow ?? null
          }),
          className: "w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: { fontWeight: ts.weight, color: ts.color, fontSize: 13 },
                className: "truncate",
                children: ts.preview
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "w-3 h-3 text-muted-foreground shrink-0" })
          ]
        },
        ts.name
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: "Font Pairings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: FONT_PAIRS.map((fp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25 + i * 0.05 },
          onClick: () => addText(fp.display, 48, "700", fp.display),
          className: "w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-foreground", children: fp.display }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground", children: [
              fp.body,
              " · ",
              fp.label
            ] })
          ]
        },
        fp.label
      )) })
    ] })
  ] });
}
function UploadsTab() {
  const [files, setFiles] = reactExports.useState([]);
  const [dragging, setDragging] = reactExports.useState(false);
  const [urlInput, setUrlInput] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  const { addElement, canvasSize } = useAdCreatorStore();
  const ALLOWED_IMAGE_TYPES = /* @__PURE__ */ new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml"
  ]);
  function handleFiles(raw) {
    if (!raw) return;
    const added = [];
    let rejected = 0;
    for (const f of Array.from(raw)) {
      const isImage = ALLOWED_IMAGE_TYPES.has(f.type);
      const isVideo = f.type.startsWith("video/");
      if (!isImage && !isVideo) {
        rejected++;
        continue;
      }
      const url = URL.createObjectURL(f);
      const type = isVideo ? "video" : "image";
      added.push({
        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        name: f.name,
        url,
        type
      });
    }
    if (rejected > 0) {
      __vitePreload(async () => {
        const { toast } = await import("./index-De5ctwPQ.js").then((n) => n.a8);
        return { toast };
      }, true ? __vite__mapDeps([0,1,2,3,4]) : void 0).then(
        ({ toast }) => toast.error(
          "Only image files are supported (JPG, PNG, WebP, GIF, SVG)"
        )
      );
    }
    setFiles((prev) => [...prev, ...added]);
  }
  function addToCanvas(file) {
    if (file.type !== "image") return;
    const el = {
      type: "image",
      name: file.name,
      x: canvasSize.width * 0.2,
      y: canvasSize.height * 0.2,
      width: 400,
      height: 400,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      src: file.url,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0
      },
      shadow: null,
      backgroundRemoved: false,
      mask: null
    };
    addElement(el);
  }
  function addFromUrl() {
    if (!urlInput.trim()) return;
    const file = {
      id: `url-${Date.now()}`,
      name: urlInput.split("/").pop() ?? "Image",
      url: urlInput.trim(),
      type: "image"
    };
    setFiles((prev) => [...prev, file]);
    setUrlInput("");
    addToCanvas(file);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        onDragEnter: () => setDragging(true),
        onDragLeave: () => setDragging(false),
        onDragOver: (e) => e.preventDefault(),
        onDrop: (e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        },
        animate: {
          borderColor: dragging ? "rgba(37,99,235,0.7)" : "rgba(255,255,255,0.1)"
        },
        className: "relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-500/40 transition-colors",
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: dragging ? 1.2 : 1 },
              className: "w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-blue-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: dragging ? "Drop to upload" : "Drop files or click to upload" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "Images & Videos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/*",
              multiple: true,
              className: "hidden",
              onChange: (e) => handleFiles(e.target.files)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: urlInput,
            onChange: (e) => setUrlInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && addFromUrl(),
            placeholder: "Paste image URL…",
            className: "w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: addFromUrl,
          className: "px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-xs text-blue-400 transition-all",
          children: "Add"
        }
      )
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto flex-1 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-2", children: [
        "Uploads (",
        files.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: files.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "group relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer",
          onClick: () => addToCanvas(f),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: f.url,
                alt: f.name,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Remove",
                onClick: (e) => {
                  e.stopPropagation();
                  setFiles((prev) => prev.filter((u) => u.id !== f.id));
                },
                className: "absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5 text-white" })
              }
            )
          ]
        },
        f.id
      )) })
    ] })
  ] });
}
const VIDEOS = [
  {
    id: 1,
    title: "Neon City Drive",
    duration: "0:32",
    gradient: "linear-gradient(135deg,#0f172a,#2563eb)"
  },
  {
    id: 2,
    title: "Abstract Motion",
    duration: "0:18",
    gradient: "linear-gradient(135deg,#1a0533,#7c3aed)"
  },
  {
    id: 3,
    title: "Tech Particles",
    duration: "0:45",
    gradient: "linear-gradient(135deg,#064e3b,#22c55e)"
  },
  {
    id: 4,
    title: "Ocean Waves",
    duration: "1:02",
    gradient: "linear-gradient(135deg,#164e63,#06b6d4)"
  },
  {
    id: 5,
    title: "Mountains",
    duration: "0:55",
    gradient: "linear-gradient(135deg,#1f2937,#374151)"
  },
  {
    id: 6,
    title: "Cityscape",
    duration: "0:38",
    gradient: "linear-gradient(135deg,#1c1c1c,#f97316)"
  },
  {
    id: 7,
    title: "Bokeh Lights",
    duration: "0:24",
    gradient: "linear-gradient(135deg,#2d1b69,#e879f9)"
  },
  {
    id: 8,
    title: "Data Flow",
    duration: "0:41",
    gradient: "linear-gradient(135deg,#0c4a6e,#38bdf8)"
  }
];
function VideosTab() {
  const [search, setSearch] = reactExports.useState("");
  const { addElement, canvasSize } = useAdCreatorStore();
  function addVideo(v) {
    const el = {
      type: "shape",
      name: v.title,
      x: canvasSize.width * 0.1,
      y: canvasSize.height * 0.1,
      width: canvasSize.width * 0.8,
      height: canvasSize.height * 0.6,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      shapeType: "rect",
      fill: v.gradient,
      gradient: v.gradient,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 8
    };
    addElement(el);
  }
  const shown = VIDEOS.filter(
    (v) => v.title.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search videos…",
          className: "w-full pl-8 pr-3 py-2 bg-[#0d1117] border border-white/10 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1 pr-1 pb-2 flex flex-col gap-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", children: shown.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.04 },
        onClick: () => addVideo(v),
        className: "group flex gap-3 items-center p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all text-left",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative w-16 h-10 rounded-md shrink-0 flex items-center justify-center",
              style: { background: v.gradient },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-white/80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0.5 right-1 text-[8px] text-white/70", children: v.duration })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground group-hover:text-blue-300 transition-colors truncate", children: v.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Stock · HD" })
          ] })
        ]
      },
      v.id
    )) })
  ] });
}
const TABS = [
  { id: "templates", label: "Templates", Icon: LayoutTemplate },
  { id: "text", label: "Text", Icon: Type },
  { id: "elements", label: "Elements", Icon: Hexagon },
  { id: "uploads", label: "Uploads", Icon: Upload },
  { id: "images", label: "Images", Icon: Image$1 },
  { id: "videos", label: "Videos", Icon: Video },
  { id: "audio", label: "Audio", Icon: Music },
  { id: "brand", label: "Brand Hub", Icon: Palette },
  { id: "ai", label: "AI Tools", Icon: Sparkles },
  { id: "apps", label: "Apps", Icon: Grid3x3 },
  { id: "layers", label: "Layers", Icon: Layers }
];
function AdSidebar({
  onOpenMagicDesign,
  onOpenAiCopywriter,
  onOpenAiImageGen,
  onOpenMagicResize,
  onOpenAutoLayout
}) {
  var _a;
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebar } = useAdCreatorStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.aside,
    {
      animate: { width: sidebarCollapsed ? 60 : 280 },
      transition: { type: "spring", stiffness: 400, damping: 40 },
      className: "relative flex h-full shrink-0 overflow-hidden",
      style: {
        background: "rgba(17,24,39,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.05)"
      },
      "data-ocid": "ad-sidebar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[60px] shrink-0 flex flex-col h-full border-r border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col flex-1 overflow-y-auto scrollbar-none py-2 gap-0.5", children: TABS.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-label": tab.label,
                "data-ocid": `sidebar.tab.${tab.id}`,
                onClick: () => {
                  setActiveTab(tab.id);
                  if (sidebarCollapsed) toggleSidebar();
                },
                className: "relative flex flex-col items-center justify-center gap-0.5 h-14 w-full transition-all group",
                children: [
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      layoutId: "tab-active-ring",
                      className: "absolute inset-x-2 inset-y-1 rounded-xl",
                      style: {
                        background: "rgba(37,99,235,0.18)",
                        boxShadow: "0 0 12px rgba(37,99,235,0.35)"
                      },
                      transition: { type: "spring", stiffness: 400, damping: 35 }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: `relative w-[18px] h-[18px] transition-colors ${isActive ? "text-blue-400" : "text-muted-foreground group-hover:text-foreground"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `relative text-[8px] leading-none font-medium transition-colors ${isActive ? "text-blue-400" : "text-muted-foreground group-hover:text-foreground"}`,
                      children: tab.label.split(" ")[0]
                    }
                  )
                ]
              },
              tab.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar",
              "data-ocid": "sidebar.collapse_button",
              onClick: toggleSidebar,
              className: "h-10 w-full flex items-center justify-center border-t border-white/5 hover:bg-white/5 transition-colors",
              children: sidebarCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: !sidebarCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -10 },
            transition: { duration: 0.18 },
            className: "flex flex-col flex-1 overflow-hidden",
            style: { width: 220 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-3 border-b border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-foreground", children: ((_a = TABS.find((t) => t.id === activeTab)) == null ? void 0 : _a.label) ?? "" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden px-3 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -6 },
                  transition: { duration: 0.16 },
                  className: "h-full",
                  children: [
                    activeTab === "templates" && /* @__PURE__ */ jsxRuntimeExports.jsx(TemplatesTab, {}),
                    activeTab === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(TextTab, {}),
                    activeTab === "elements" && /* @__PURE__ */ jsxRuntimeExports.jsx(ElementsTab, {}),
                    activeTab === "uploads" && /* @__PURE__ */ jsxRuntimeExports.jsx(UploadsTab, {}),
                    activeTab === "images" && /* @__PURE__ */ jsxRuntimeExports.jsx(ImagesTab, {}),
                    activeTab === "videos" && /* @__PURE__ */ jsxRuntimeExports.jsx(VideosTab, {}),
                    activeTab === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsx(AudioTab, {}),
                    activeTab === "brand" && /* @__PURE__ */ jsxRuntimeExports.jsx(BrandHubTab, {}),
                    activeTab === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AiToolsTab,
                      {
                        onOpenMagicDesign,
                        onOpenAiCopywriter,
                        onOpenAiImageGen,
                        onOpenMagicResize,
                        onOpenAutoLayout
                      }
                    ),
                    activeTab === "apps" && /* @__PURE__ */ jsxRuntimeExports.jsx(AppsTab, {}),
                    activeTab === "layers" && /* @__PURE__ */ jsxRuntimeExports.jsx(LayersTab, {})
                  ]
                },
                activeTab
              ) }) })
            ]
          },
          "content"
        ) })
      ]
    }
  );
}
function Tooltip({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 4, scale: 0.92 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 4, scale: 0.92 },
      transition: { duration: 0.12 },
      className: "absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "px-2 py-1 rounded-md text-[11px] text-white/80 whitespace-nowrap",
          style: {
            background: "rgba(15,23,42,0.97)",
            border: "1px solid rgba(255,255,255,0.08)"
          },
          children: label
        }
      )
    }
  );
}
function IconBtn({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  "data-ocid": ocid
}) {
  const [hover, setHover] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        type: "button",
        onClick,
        disabled,
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        whileHover: disabled ? {} : { scale: 1.07 },
        whileTap: disabled ? {} : { scale: 0.93 },
        "data-ocid": ocid,
        className: `relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10 text-white/70 hover:text-white"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hover && !disabled && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label }) })
  ] });
}
function Divider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10 mx-1" });
}
function AdTopBar({
  onMagicDesign,
  onMagicResize,
  onExport
}) {
  const {
    projectTitle,
    setProjectTitle,
    undo,
    redo,
    history,
    historyIndex,
    isSaved,
    canvasSize,
    setCanvasSize
  } = useAdCreatorStore();
  const [editingTitle, setEditingTitle] = reactExports.useState(false);
  const [titleDraft, setTitleDraft] = reactExports.useState(projectTitle);
  const [resizeOpen, setResizeOpen] = reactExports.useState(false);
  const [exportOpen, setExportOpen] = reactExports.useState(false);
  const [saveConfirm, setSaveConfirm] = reactExports.useState(false);
  const [shareConfirm, setShareConfirm] = reactExports.useState(false);
  const titleRef = reactExports.useRef(null);
  const resizeRef = reactExports.useRef(null);
  const exportRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!editingTitle) setTitleDraft(projectTitle);
  }, [projectTitle, editingTitle]);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (resizeRef.current && !resizeRef.current.contains(e.target))
        setResizeOpen(false);
      if (exportRef.current && !exportRef.current.contains(e.target))
        setExportOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  reactExports.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === "y" || e.key === "z" && e.shiftKey)) {
        e.preventDefault();
        redo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);
  function commitTitle() {
    const trimmed = titleDraft.trim() || "Untitled Ad";
    setProjectTitle(trimmed);
    setTitleDraft(trimmed);
    setEditingTitle(false);
  }
  function handleSave() {
    useAdCreatorStore.setState({ isSaved: true });
    setSaveConfirm(true);
    ue.success("Project saved", { duration: 2e3 });
    setTimeout(() => setSaveConfirm(false), 2200);
  }
  function handleShare() {
    const url = `${window.location.origin}/ad-creator?project=${encodeURIComponent(projectTitle)}`;
    navigator.clipboard.writeText(url).catch(() => {
    });
    setShareConfirm(true);
    ue.success("Link copied!", { duration: 2500 });
    setTimeout(() => setShareConfirm(false), 2600);
  }
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  const EXPORT_FORMATS = [
    { fmt: "PNG", desc: "Best for web" },
    { fmt: "JPG", desc: "Compressed" },
    { fmt: "SVG", desc: "Vector" },
    { fmt: "MP4", desc: "Video ads" },
    { fmt: "PDF", desc: "Print-ready" }
  ];
  const EXPORT_QUALITIES = ["720p", "1080p", "4K"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative z-40 flex items-center h-14 px-3 gap-1",
      style: {
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.3)"
      },
      "data-ocid": "ad_creator.topbar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.a,
            {
              href: "/",
              whileHover: { scale: 1.06, x: -1 },
              whileTap: { scale: 0.94 },
              className: "flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors",
              "data-ocid": "ad_creator.topbar.back_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mr-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-6 h-6 rounded flex items-center justify-center text-[11px] font-black text-white",
                style: { background: "linear-gradient(135deg,#2563EB,#3b82f6)" },
                children: "E"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs hidden sm:block", children: "Ad Creator" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20 text-xs", children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
            editingTitle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.input,
              {
                ref: titleRef,
                autoFocus: true,
                value: titleDraft,
                onChange: (e) => setTitleDraft(e.target.value),
                onBlur: commitTitle,
                onKeyDown: (e) => {
                  if (e.key === "Enter") commitTitle();
                  if (e.key === "Escape") {
                    setTitleDraft(projectTitle);
                    setEditingTitle(false);
                  }
                },
                initial: { scale: 0.97 },
                animate: { scale: 1 },
                className: "text-sm font-medium text-white bg-transparent outline-none rounded-md px-2 py-0.5 min-w-0 max-w-[180px]",
                style: {
                  border: "1px solid rgba(37,99,235,0.5)",
                  background: "rgba(37,99,235,0.08)"
                },
                "data-ocid": "ad_creator.topbar.title_input"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                onClick: () => setEditingTitle(true),
                whileHover: { scale: 1.02 },
                className: "text-sm font-medium text-white/80 hover:text-white px-2 py-0.5 rounded-md hover:bg-white/8 transition-colors truncate max-w-[180px]",
                "data-ocid": "ad_creator.topbar.title_button",
                children: projectTitle
              }
            ),
            !isSaved && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                className: "w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0",
                title: "Unsaved changes"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconBtn,
            {
              icon: Undo2,
              label: "Undo (Ctrl+Z)",
              onClick: undo,
              disabled: !canUndo,
              "data-ocid": "ad_creator.topbar.undo_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconBtn,
            {
              icon: Redo2,
              label: "Redo (Ctrl+Y)",
              onClick: redo,
              disabled: !canRedo,
              "data-ocid": "ad_creator.topbar.redo_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: resizeRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                onClick: () => {
                  setResizeOpen((o) => !o);
                  setExportOpen(false);
                },
                whileHover: { scale: 1.03 },
                whileTap: { scale: 0.96 },
                className: "flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors",
                "data-ocid": "ad_creator.topbar.resize_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Expand, { size: 13 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block max-w-[90px] truncate", children: canvasSize.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      size: 11,
                      className: `transition-transform ${resizeOpen ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: resizeOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -6, scale: 0.96 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -6, scale: 0.96 },
                transition: { duration: 0.15 },
                className: "absolute top-full mt-2 left-0 z-50 rounded-xl overflow-hidden w-60 shadow-2xl",
                style: {
                  background: "rgba(15,23,42,0.98)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)"
                },
                "data-ocid": "ad_creator.topbar.resize_dropdown",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5", children: CANVAS_PRESETS.map((preset) => {
                  const ar = (preset.width / preset.height).toFixed(2);
                  const active = canvasSize.name === preset.name;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      onClick: () => {
                        if (preset.name === "Custom") {
                          onMagicResize();
                        } else {
                          setCanvasSize(preset);
                          onMagicResize();
                        }
                        setResizeOpen(false);
                      },
                      whileHover: { x: 2 },
                      className: `w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${active ? "bg-blue-600/20 text-blue-300" : "text-white/70 hover:bg-white/8 hover:text-white"}`,
                      "data-ocid": `ad_creator.topbar.resize_option.${preset.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: preset.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/40 mt-0.5", children: [
                            preset.width,
                            " × ",
                            preset.height
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "rounded border border-white/20 bg-white/5 flex-shrink-0",
                            style: {
                              width: Math.round(28 * Math.min(1, Number(ar))),
                              height: Math.round(28 / Math.max(1, Number(ar)))
                            }
                          }
                        )
                      ]
                    },
                    preset.name
                  );
                }) })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: onMagicDesign,
              whileHover: { scale: 1.04 },
              whileTap: { scale: 0.95 },
              className: "flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold text-white relative overflow-hidden",
              style: {
                background: "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(139,92,246,0.25))",
                border: "1px solid rgba(37,99,235,0.4)"
              },
              "data-ocid": "ad_creator.topbar.ai_generate_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute inset-0 rounded-lg",
                    animate: {
                      boxShadow: [
                        "0 0 0 0 rgba(37,99,235,0)",
                        "0 0 12px 2px rgba(37,99,235,0.35)",
                        "0 0 0 0 rgba(37,99,235,0)"
                      ]
                    },
                    transition: {
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13, className: "text-blue-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Generate" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-1 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: handleSave,
              whileHover: { scale: 1.04 },
              whileTap: { scale: 0.94 },
              className: "flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors",
              "data-ocid": "ad_creator.topbar.save_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 13 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: saveConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -4 },
                    className: "text-emerald-400",
                    children: "Saved ✓"
                  },
                  "saved"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -4 },
                    children: "Save"
                  },
                  "save"
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: exportRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                onClick: () => {
                  setExportOpen((o) => !o);
                  setResizeOpen(false);
                },
                whileHover: { scale: 1.04 },
                whileTap: { scale: 0.94 },
                className: "flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold text-white transition-colors",
                style: { background: "linear-gradient(135deg,#1d4ed8,#2563eb)" },
                "data-ocid": "ad_creator.topbar.export_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                  "Export",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      size: 11,
                      className: `transition-transform ${exportOpen ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: exportOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -6, scale: 0.96 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -6, scale: 0.96 },
                transition: { duration: 0.15 },
                className: "absolute top-full mt-2 right-0 z-50 rounded-xl overflow-hidden w-52 shadow-2xl",
                style: {
                  background: "rgba(15,23,42,0.98)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)"
                },
                "data-ocid": "ad_creator.topbar.export_dropdown",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-1.5 text-[10px] text-white/30 uppercase tracking-wider", children: "Format" }),
                  EXPORT_FORMATS.map(({ fmt, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-3 pt-1 text-[10px] text-white/50 font-medium", children: [
                      fmt,
                      " — ",
                      desc
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 px-3 pb-1", children: EXPORT_QUALITIES.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.button,
                      {
                        type: "button",
                        onClick: () => {
                          onExport(fmt, q);
                          setExportOpen(false);
                        },
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        className: "flex-1 py-1 rounded-md text-[10px] font-medium text-white/60 hover:text-white hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/40 transition-all",
                        "data-ocid": `ad_creator.topbar.export_option.${fmt.toLowerCase()}_${q.toLowerCase()}`,
                        children: q
                      },
                      q
                    )) })
                  ] }, fmt))
                ] })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: handleShare,
              whileHover: { scale: 1.06 },
              whileTap: { scale: 0.93 },
              className: "flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors",
              "data-ocid": "ad_creator.topbar.share_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: shareConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { scale: 0.7 },
                  animate: { scale: 1 },
                  exit: { scale: 0.7 },
                  className: "text-[10px] text-emerald-400 font-medium",
                  children: "✓"
                },
                "copied"
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { scale: 0.7 },
                  animate: { scale: 1 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 })
                },
                "share"
              ) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { scale: 1.08 },
              className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white cursor-pointer select-none flex-shrink-0",
              style: { background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" },
              title: "Elysian Labs",
              "data-ocid": "ad_creator.topbar.avatar",
              children: "EL"
            }
          ) })
        ] })
      ]
    }
  );
}
const TONES = [
  "Viral",
  "Luxury",
  "Minimal",
  "Aggressive",
  "Professional",
  "Cinematic"
];
const CONTENT_TYPES = [
  { id: "headline", label: "Headline" },
  { id: "tagline", label: "Tagline" },
  { id: "cta", label: "CTA Button" },
  { id: "description", label: "Description" },
  { id: "hook", label: "Hook" },
  { id: "adcopy", label: "Ad Copy" }
];
const COPY_BANK = {
  Viral: {
    headline: [
      "You WON'T Believe This!",
      "EVERYONE Is Talking About This",
      "This Changes EVERYTHING 🔥"
    ],
    tagline: ["Go viral or go home", "The internet can't stop sharing this"],
    cta: ["GET IT NOW!", "CLAIM YOURS!", "DON'T MISS OUT!"],
    description: [
      "The thing people are losing their minds over is finally here. Don't be the last one to know about it."
    ],
    hook: [
      "🔥 I tried this for 7 days and here's what happened...",
      "🔥 Nobody told me this worked THAT fast"
    ],
    adcopy: [
      "STOP scrolling! This limited offer expires TONIGHT. Click the link before it's gone FOREVER."
    ]
  },
  Luxury: {
    headline: [
      "Crafted for the Discerning Few",
      "The Art of Effortless Excellence",
      "Where Refinement Meets Vision"
    ],
    tagline: ["Luxury redefined", "Timeless elegance, curated for you"],
    cta: ["Explore Collection", "Request Access", "Discover More"],
    description: [
      "An experience reserved for those who appreciate the finest things. Meticulously curated, impeccably delivered."
    ],
    hook: [
      "🔥 The world's most sought-after brands choose this",
      "🔥 What the ultra-wealthy already know"
    ],
    adcopy: [
      "For those who settle for nothing less than extraordinary. Join an exclusive circle of connoisseurs."
    ]
  },
  Minimal: {
    headline: ["Less. Better.", "Simply Perfect", "The One Thing You Need"],
    tagline: ["Pure simplicity", "Nothing extra, everything essential"],
    cta: ["Learn more", "Start now", "See it"],
    description: [
      "Stripped of the unnecessary. Built for clarity and purpose."
    ],
    hook: ["🔥 One product. Infinite impact.", "🔥 The quiet revolution"],
    adcopy: ["No gimmicks. No noise. Just results."]
  },
  Aggressive: {
    headline: [
      "Dominate Your Market",
      "Crush the Competition",
      "Win or Go Home"
    ],
    tagline: ["Built for champions", "No excuses, only results"],
    cta: ["Start Winning", "Take Control", "Dominate Now"],
    description: [
      "While others hesitate, you act. While they talk, you execute. This is for those who refuse to lose."
    ],
    hook: [
      "🔥 Your competitors don't want you to see this",
      "🔥 Warning: this will make your rivals nervous"
    ],
    adcopy: [
      "Stop waiting for permission. Take what's yours. The market rewards the bold."
    ]
  },
  Professional: {
    headline: [
      "Trusted by Industry Leaders",
      "Enterprise-Grade Performance",
      "Proven Results at Scale"
    ],
    tagline: ["Delivering measurable ROI", "The professional's choice"],
    cta: ["Schedule a Demo", "Get Quote", "Contact Sales"],
    description: [
      "Designed for professionals who demand reliability, precision, and results you can report to stakeholders."
    ],
    hook: [
      "🔥 How top-performing teams achieve 3× output",
      "🔥 The workflow Fortune 500 companies swear by"
    ],
    adcopy: [
      "Join thousands of leading organizations who rely on our platform for mission-critical workflows."
    ]
  },
  Cinematic: {
    headline: [
      "A Story Worth Telling",
      "Scenes That Stay With You",
      "The Frame That Changes Everything"
    ],
    tagline: ["Where vision becomes reality", "Every frame, a masterpiece"],
    cta: ["Begin Your Story", "Enter the World", "See the Vision"],
    description: [
      "Some moments are too powerful for ordinary tools. This is where your most ambitious creative vision takes form."
    ],
    hook: [
      "🔥 The cinematic toolkit used by award-winning creators",
      "🔥 Scenes this powerful deserve the right tools"
    ],
    adcopy: [
      "Your story deserves to be told in the most powerful way possible. Let's create something unforgettable."
    ]
  }
};
function AiCopywriterModal({ open, onClose }) {
  const [product, setProduct] = reactExports.useState("");
  const [tone, setTone] = reactExports.useState("Professional");
  const [types, setTypes] = reactExports.useState(
    /* @__PURE__ */ new Set(["headline", "cta", "hook"])
  );
  const [phase, setPhase] = reactExports.useState("form");
  const [revealIdx, setRevealIdx] = reactExports.useState(0);
  const [copied, setCopied] = reactExports.useState(null);
  const { addElement, canvasSize } = useAdCreatorStore();
  const loadingTimerRef = reactExports.useRef(null);
  const revealIntervalRef = reactExports.useRef(null);
  const mountedRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!open) {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current);
        revealIntervalRef.current = null;
      }
      setPhase("form");
      setRevealIdx(0);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (phase !== "loading") return;
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    loadingTimerRef.current = setTimeout(() => {
      if (mountedRef.current) setPhase("results");
    }, 1500);
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    };
  }, [phase]);
  reactExports.useEffect(() => {
    if (phase !== "results") return;
    if (revealIntervalRef.current) clearInterval(revealIntervalRef.current);
    let i = 0;
    revealIntervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      i++;
      setRevealIdx(i);
      if (i > 20) {
        if (revealIntervalRef.current) {
          clearInterval(revealIntervalRef.current);
          revealIntervalRef.current = null;
        }
      }
    }, 80);
    return () => {
      if (revealIntervalRef.current) {
        clearInterval(revealIntervalRef.current);
        revealIntervalRef.current = null;
      }
    };
  }, [phase]);
  function toggleType(t) {
    setTypes((prev) => {
      const n = new Set(prev);
      n.has(t) ? n.delete(t) : n.add(t);
      return n;
    });
  }
  function handleCopy(text) {
    navigator.clipboard.writeText(text).catch(() => {
    });
    setCopied(text);
    setTimeout(() => setCopied(null), 1800);
  }
  function handleInsert(text, type) {
    const isHeadline = type === "headline";
    addElement({
      type: "text",
      name: type.charAt(0).toUpperCase() + type.slice(1),
      x: 60,
      y: isHeadline ? 300 : 420,
      width: canvasSize.width - 120,
      height: isHeadline ? 120 : 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: text,
      fontFamily: "Inter",
      fontSize: isHeadline ? 64 : 32,
      fontWeight: isHeadline ? "700" : "400",
      color: "#ffffff",
      textAlign: "center",
      lineHeight: 1.2,
      letterSpacing: isHeadline ? -1 : 0,
      gradient: false,
      gradientColors: ["#ffffff", "#94a3b8"],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal"
    });
    onClose();
  }
  const bank = COPY_BANK[tone];
  const activeTypes = CONTENT_TYPES.filter((ct) => types.has(ct.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: {
        background: "oklch(0 0 0 / 0.75)",
        backdropFilter: "blur(8px)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => e.target === e.currentTarget && onClose(),
      "data-ocid": "ai_copywriter.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg max-h-[90vh] flex flex-col",
          style: {
            background: "oklch(0.11 0.006 240 / 0.97)",
            border: "1px solid oklch(0.25 0 0 / 0.4)"
          },
          initial: { scale: 0.94, y: 24, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.94, y: 24, opacity: 0 },
          transition: { type: "spring", damping: 22, stiffness: 280 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4 flex-shrink-0",
                style: { borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, #059669, #10b981)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 16, className: "text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-lg font-editor", children: "AI Copywriter" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth",
                      "data-ocid": "ai_copywriter.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 overflow-y-auto flex-1 space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
              phase === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "space-y-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "What are you promoting?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          className: "w-full editor-input-glass",
                          placeholder: "e.g. Gaming headset, skincare brand, SaaS startup...",
                          value: product,
                          onChange: (e) => setProduct(e.target.value),
                          "data-ocid": "ai_copywriter.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "Tone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: TONES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setTone(t),
                          className: "px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth",
                          style: tone === t ? {
                            background: "linear-gradient(135deg, #059669, #10b981)",
                            color: "#fff"
                          } : {
                            background: "oklch(0.16 0 0 / 0.5)",
                            color: "oklch(0.7 0 0)",
                            border: "1px solid oklch(0.22 0 0 / 0.5)"
                          },
                          children: t
                        },
                        t
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "Content Types" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: CONTENT_TYPES.map((ct) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => toggleType(ct.id),
                          className: "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-editor transition-smooth",
                          style: types.has(ct.id) ? {
                            background: "oklch(0.38 0.15 270 / 0.2)",
                            color: "#93c5fd",
                            border: "1px solid #2563eb"
                          } : {
                            background: "oklch(0.14 0 0 / 0.5)",
                            color: "oklch(0.6 0 0)",
                            border: "1px solid oklch(0.22 0 0 / 0.4)"
                          },
                          "data-ocid": "ai_copywriter.checkbox",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0",
                                style: {
                                  background: types.has(ct.id) ? "#2563eb" : "oklch(0.2 0 0)"
                                },
                                children: types.has(ct.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: { fontSize: "9px" },
                                    className: "text-white",
                                    children: "✓"
                                  }
                                )
                              }
                            ),
                            ct.label
                          ]
                        },
                        ct.id
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPhase("loading"),
                        disabled: types.size === 0,
                        className: "w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40",
                        style: {
                          background: "linear-gradient(135deg, #059669, #10b981)",
                          boxShadow: "0 0 24px #05966944"
                        },
                        "data-ocid": "ai_copywriter.submit_button",
                        children: "Generate Copy"
                      }
                    )
                  ]
                },
                "form"
              ),
              phase === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "flex flex-col items-center gap-4 py-12",
                  "data-ocid": "ai_copywriter.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "w-2.5 h-2.5 rounded-full",
                        style: { background: "#10b981" },
                        animate: { y: [0, -10, 0] },
                        transition: {
                          duration: 0.7,
                          delay: i * 0.15,
                          repeat: Number.POSITIVE_INFINITY
                        }
                      },
                      i
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 font-editor text-sm", children: "Writing your copy..." })
                  ]
                },
                "loading"
              ),
              phase === "results" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/60 font-editor", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: tone }),
                        " tone",
                        product && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          " ",
                          "for",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: product })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setPhase("loading"),
                          className: "flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-editor transition-smooth",
                          "data-ocid": "ai_copywriter.secondary_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                            " Regenerate"
                          ]
                        }
                      )
                    ] }),
                    activeTypes.map((ct, ctIdx) => {
                      const copies = bank[ct.id] ?? [];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: ct.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: copies.map((text, idx) => {
                          const globalIdx = ctIdx * 5 + idx;
                          const shown = revealIdx > globalIdx;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.div,
                            {
                              initial: { opacity: 0, x: -10 },
                              animate: shown ? { opacity: 1, x: 0 } : {},
                              className: "flex items-start gap-3 p-3 rounded-xl group",
                              style: {
                                background: "oklch(0.14 0 0 / 0.6)",
                                border: "1px solid oklch(0.22 0 0 / 0.4)"
                              },
                              "data-ocid": `ai_copywriter.item.${globalIdx + 1}`,
                              children: [
                                ct.id === "cta" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "px-4 py-1.5 rounded-full text-sm font-semibold font-editor",
                                    style: {
                                      background: "#2563eb",
                                      color: "#fff"
                                    },
                                    children: text
                                  }
                                ) }) : ct.id === "headline" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 font-bold text-white font-editor text-base", children: text }) : ct.id === "tagline" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-white/80 font-editor italic", children: text }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-white/70 font-editor text-sm leading-relaxed", children: text }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-smooth", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => handleCopy(text),
                                      className: "w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth",
                                      "data-ocid": "ai_copywriter.button",
                                      children: copied === text ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "10px" }, children: "✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 })
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => handleInsert(text, ct.id),
                                      className: "w-7 h-7 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-400/10 transition-smooth",
                                      "data-ocid": "ai_copywriter.button",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                                    }
                                  )
                                ] })
                              ]
                            },
                            `${ct.id}-${text.slice(0, 12)}`
                          );
                        }) })
                      ] }, ct.id);
                    })
                  ]
                },
                "results"
              )
            ] }) })
          ]
        }
      )
    },
    "ai-copy-overlay"
  ) });
}
const STYLES$1 = [
  "Realistic",
  "Anime",
  "Cinematic",
  "3D Render",
  "Minimalist",
  "Neon",
  "Watercolor"
];
const RATIOS = ["1:1", "16:9", "9:16", "4:3"];
const RATIO_DIMS = {
  "1:1": [512, 512],
  "16:9": [912, 512],
  "9:16": [512, 912],
  "4:3": [680, 512]
};
const GEN_STAGES = [
  "Analyzing prompt...",
  "Creating composition...",
  "Rendering lighting...",
  "Adding details..."
];
function buildUrl(prompt, style, ratio, seed) {
  const [w, h] = RATIO_DIMS[ratio];
  const styled = `${prompt}, ${style.toLowerCase()} style, high quality, detailed`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(styled)}?width=${w}&height=${h}&seed=${seed}&nologo=true&enhance=true`;
}
function AiImageGenModal({ open, onClose }) {
  const [prompt, setPrompt] = reactExports.useState("");
  const [style, setStyle] = reactExports.useState("Cinematic");
  const [ratio, setRatio] = reactExports.useState("1:1");
  const [phase, setPhase] = reactExports.useState("form");
  const [stageIdx, setStageIdx] = reactExports.useState(0);
  const [images, setImages] = reactExports.useState([]);
  const { addElement, canvasSize } = useAdCreatorStore();
  const intervalRef = reactExports.useRef(null);
  const timeoutRef = reactExports.useRef(null);
  const mountedRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!open) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [open]);
  const generate = reactExports.useCallback(
    (currentPrompt, currentStyle, currentRatio) => {
      if (!currentPrompt.trim()) return;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const seeds = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 999999)
      );
      const newImages = seeds.map((seed) => ({
        url: buildUrl(currentPrompt, currentStyle, currentRatio, seed),
        seed,
        status: "loading"
      }));
      setImages(newImages);
      setStageIdx(0);
      setPhase("loading");
      let idx = 0;
      intervalRef.current = setInterval(() => {
        if (!mountedRef.current) return;
        idx++;
        setStageIdx(Math.min(idx, GEN_STAGES.length - 1));
        if (idx >= GEN_STAGES.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) setPhase("results");
          }, 400);
        }
      }, 600);
    },
    []
  );
  function regenerateOne(idx) {
    const newSeed = Math.floor(Math.random() * 999999);
    const newUrl = buildUrl(prompt, style, ratio, newSeed);
    setImages(
      (prev) => prev.map(
        (img, i) => i === idx ? { url: newUrl, seed: newSeed, status: "loading" } : img
      )
    );
  }
  function handleImageLoad(idx) {
    setImages(
      (prev) => prev.map((img, i) => i === idx ? { ...img, status: "ready" } : img)
    );
  }
  function handleImageError(idx) {
    setImages(
      (prev) => prev.map((img, i) => i === idx ? { ...img, status: "error" } : img)
    );
  }
  function handleAddToCanvas(img) {
    const [w2, h2] = RATIO_DIMS[ratio];
    const scale = Math.min(
      canvasSize.width * 0.6 / w2,
      canvasSize.height * 0.6 / h2
    );
    addElement({
      type: "image",
      name: "AI Generated Image",
      src: img.url,
      x: (canvasSize.width - w2 * scale) / 2,
      y: (canvasSize.height - h2 * scale) / 2,
      width: w2 * scale,
      height: h2 * scale,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      filters: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        hue: 0
      },
      shadow: null,
      backgroundRemoved: false,
      mask: null
    });
    onClose();
  }
  function handleDownload(img) {
    const a = document.createElement("a");
    a.href = img.url;
    a.download = `ai-image-${img.seed}.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }
  const [w, h] = RATIO_DIMS[ratio];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: {
        background: "oklch(0 0 0 / 0.75)",
        backdropFilter: "blur(8px)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => e.target === e.currentTarget && onClose(),
      "data-ocid": "ai_image_gen.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg max-h-[90vh] flex flex-col",
          style: {
            background: "oklch(0.11 0.006 240 / 0.97)",
            border: "1px solid oklch(0.25 0 0 / 0.4)"
          },
          initial: { scale: 0.94, y: 24, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.94, y: 24, opacity: 0 },
          transition: { type: "spring", damping: 22, stiffness: 280 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4 flex-shrink-0",
                style: { borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, #7c3aed, #a855f7)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlay, { size: 16, className: "text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-lg font-editor", children: "AI Image Generator" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth",
                      "data-ocid": "ai_image_gen.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 overflow-y-auto flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    className: "w-full editor-input-glass text-sm",
                    placeholder: "Describe the image you want...",
                    value: prompt,
                    onChange: (e) => setPrompt(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && generate(prompt, style, ratio),
                    "data-ocid": "ai_image_gen.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: STYLES$1.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStyle(s),
                    className: "px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth",
                    style: style === s ? {
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      color: "#fff"
                    } : {
                      background: "oklch(0.16 0 0 / 0.5)",
                      color: "oklch(0.7 0 0)",
                      border: "1px solid oklch(0.22 0 0 / 0.5)"
                    },
                    children: s
                  },
                  s
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40 font-editor", children: "Ratio:" }),
                  RATIOS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setRatio(r),
                      className: "px-3 py-1 rounded-lg text-xs font-medium font-editor transition-smooth",
                      style: ratio === r ? {
                        background: "oklch(0.38 0.15 270 / 0.3)",
                        color: "#93c5fd",
                        border: "1px solid #2563eb"
                      } : {
                        background: "oklch(0.14 0 0 / 0.5)",
                        color: "oklch(0.6 0 0)",
                        border: "1px solid oklch(0.22 0 0 / 0.4)"
                      },
                      "data-ocid": "ai_image_gen.radio",
                      children: r
                    },
                    r
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-editor ml-auto",
                      style: { color: "oklch(0.4 0 0)" },
                      children: [
                        w,
                        "×",
                        h
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => generate(prompt, style, ratio),
                    disabled: !prompt.trim(),
                    className: "w-full py-3 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40",
                    style: {
                      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                      boxShadow: "0 0 20px #7c3aed44"
                    },
                    "data-ocid": "ai_image_gen.primary_button",
                    children: "Generate 4 Images"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                phase === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    className: "space-y-4",
                    "data-ocid": "ai_image_gen.loading_state",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "w-2 h-2 rounded-full",
                          style: { background: "#a855f7" },
                          animate: {
                            scale: [1, 1.6, 1],
                            opacity: [0.4, 1, 0.4]
                          },
                          transition: {
                            duration: 1,
                            delay: i * 0.18,
                            repeat: Number.POSITIVE_INFINITY
                          }
                        },
                        i
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 font-editor text-sm", children: GEN_STAGES[stageIdx] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-full h-1 rounded-full",
                          style: { background: "oklch(0.18 0 0)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              className: "h-full rounded-full",
                              style: {
                                background: "linear-gradient(90deg, #7c3aed, #a855f7)"
                              },
                              animate: {
                                width: `${(stageIdx + 1) / GEN_STAGES.length * 100}%`
                              },
                              transition: { duration: 0.5 }
                            }
                          )
                        }
                      )
                    ] })
                  },
                  "loading"
                ),
                phase === "results" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/50 font-editor", children: [
                          images.length,
                          " images generated"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => generate(prompt, style, ratio),
                            className: "flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-editor transition-smooth",
                            "data-ocid": "ai_image_gen.secondary_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                              " Regenerate All"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, scale: 0.95 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { delay: idx * 0.08 },
                          className: "relative rounded-xl overflow-hidden group",
                          style: {
                            aspectRatio: `${w}/${h}`,
                            background: "oklch(0.14 0 0)"
                          },
                          "data-ocid": `ai_image_gen.item.${idx + 1}`,
                          children: [
                            img.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-500",
                                style: { animation: "spin 1s linear infinite" }
                              }
                            ) }),
                            img.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-editor", children: "Failed to load" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => regenerateOne(idx),
                                  className: "text-purple-400 text-xs font-editor hover:underline",
                                  children: "Retry"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: img.url,
                                alt: `Generated ${idx + 1}`,
                                className: "w-full h-full object-cover",
                                style: {
                                  display: img.status === "loading" ? "none" : "block"
                                },
                                onLoad: () => handleImageLoad(idx),
                                onError: () => handleImageError(idx)
                              }
                            ),
                            img.status === "ready" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-2",
                                style: { background: "oklch(0 0 0 / 0.65)" },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => handleAddToCanvas(img),
                                      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-editor transition-smooth",
                                      style: {
                                        background: "#7c3aed",
                                        color: "#fff"
                                      },
                                      "data-ocid": "ai_image_gen.button",
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
                                        " Add to Canvas"
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => handleDownload(img),
                                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-smooth",
                                      "data-ocid": "ai_image_gen.button",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 })
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => regenerateOne(idx),
                                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-smooth",
                                      "data-ocid": "ai_image_gen.button",
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 })
                                    }
                                  )
                                ] })
                              }
                            )
                          ]
                        },
                        `${img.seed}-${idx}`
                      )) })
                    ]
                  },
                  "results"
                )
              ] })
            ] })
          ]
        }
      )
    },
    "ai-img-overlay"
  ) });
}
const LAYOUT_MODES = [
  {
    id: "horizontal",
    label: "Horizontal",
    desc: "Elements in a row",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 justify-center", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-4 h-5 rounded",
        style: { background: "#2563eb" }
      },
      i
    )) })
  },
  {
    id: "vertical",
    label: "Vertical",
    desc: "Elements in a column",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1 justify-center", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-10 h-3 rounded",
        style: { background: "#2563eb" }
      },
      i
    )) })
  },
  {
    id: "grid",
    label: "Grid",
    desc: "Elements in grid",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-4 h-4 rounded",
        style: { background: "#2563eb" }
      },
      i
    )) })
  }
];
function AutoLayoutModal({ open, onClose }) {
  const { elements, selectedIds, moveElement } = useAdCreatorStore();
  const [mode, setMode] = reactExports.useState("horizontal");
  const [spacing, setSpacing] = reactExports.useState(20);
  const [padding, setPadding] = reactExports.useState(16);
  const [alignment, setAlignment] = reactExports.useState("center");
  const [gridCols, setGridCols] = reactExports.useState(2);
  const selected = elements.filter((el) => selectedIds.includes(el.id));
  const hasEnough = selected.length >= 2;
  function applyLayout() {
    if (!hasEnough) return;
    const sorted = [...selected].sort((a, b) => a.x - b.x || a.y - b.y);
    if (mode === "horizontal") {
      let cx = padding;
      for (const el of sorted) {
        let y = el.y;
        if (alignment === "start") y = padding;
        else if (alignment === "center")
          y = sorted.reduce((acc, e) => acc + e.height, 0) / sorted.length / 2;
        else y = sorted[0].y + sorted[0].height - el.height;
        moveElement(el.id, cx, y);
        cx += el.width + spacing;
      }
    } else if (mode === "vertical") {
      let cy = padding;
      for (const el of sorted) {
        let x = el.x;
        if (alignment === "start") x = padding;
        else if (alignment === "center")
          x = Math.max(
            0,
            (sorted.reduce((acc, e) => Math.max(acc, e.x + e.width), 0) - el.width) / 2
          );
        else
          x = sorted.reduce((acc, e) => Math.max(acc, e.x + e.width), 0) - el.width;
        moveElement(el.id, x, cy);
        cy += el.height + spacing;
      }
    } else {
      const cols = Math.max(1, gridCols);
      sorted.forEach((el, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const maxW = sorted.reduce((acc, e) => Math.max(acc, e.width), 0);
        const maxH = sorted.reduce((acc, e) => Math.max(acc, e.height), 0);
        moveElement(
          el.id,
          padding + col * (maxW + spacing),
          padding + row * (maxH + spacing)
        );
      });
    }
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: {
        background: "oklch(0 0 0 / 0.75)",
        backdropFilter: "blur(8px)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => e.target === e.currentTarget && onClose(),
      "data-ocid": "auto_layout.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-glass-lg",
          style: {
            background: "oklch(0.11 0.006 240 / 0.97)",
            border: "1px solid oklch(0.25 0 0 / 0.4)"
          },
          initial: { scale: 0.94, y: 24, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.94, y: 24, opacity: 0 },
          transition: { type: "spring", damping: 22, stiffness: 280 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4",
                style: { borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, #0891b2, #06b6d4)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignCenter, { size: 16, className: "text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-lg font-editor", children: "Auto Layout" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth",
                      "data-ocid": "auto_layout.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-5", children: !hasEnough ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "flex flex-col items-center gap-3 py-10",
                "data-ocid": "auto_layout.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-2xl flex items-center justify-center",
                      style: { background: "oklch(0.16 0 0)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignCenter, { size: 24, className: "text-white/30" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 font-editor text-sm text-center", children: "Select 2 or more elements on the canvas to use Auto Layout" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/30 font-editor text-xs text-center", children: [
                    "Currently selected: ",
                    selectedIds.length,
                    " element",
                    selectedIds.length !== 1 ? "s" : ""
                  ] })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/50 font-editor", children: [
                selected.length,
                " elements selected"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "Layout Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: LAYOUT_MODES.map((lm) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.03 },
                    whileTap: { scale: 0.97 },
                    onClick: () => setMode(lm.id),
                    className: "flex flex-col items-center gap-2 p-4 rounded-xl transition-smooth",
                    style: mode === lm.id ? {
                      background: "oklch(0.38 0.15 270 / 0.2)",
                      border: "1px solid #2563eb",
                      boxShadow: "0 0 12px #2563eb44"
                    } : {
                      background: "oklch(0.14 0 0 / 0.5)",
                      border: "1px solid oklch(0.22 0 0 / 0.4)"
                    },
                    "data-ocid": "auto_layout.radio",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 flex items-center justify-center", children: lm.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-semibold font-editor", children: lm.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-editor text-white/40",
                            style: { fontSize: "10px" },
                            children: lm.desc
                          }
                        )
                      ] })
                    ]
                  },
                  lm.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mode === "grid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  className: "overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "Columns" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setGridCols(n),
                        className: "w-10 h-10 rounded-lg text-sm font-semibold font-editor transition-smooth",
                        style: gridCols === n ? { background: "#2563eb", color: "#fff" } : {
                          background: "oklch(0.16 0 0)",
                          color: "oklch(0.7 0 0)"
                        },
                        children: n
                      },
                      n
                    )) })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor", children: "Spacing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/70 font-editor", children: [
                    spacing,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: spacing,
                    onChange: (e) => setSpacing(Number.parseInt(e.target.value)),
                    className: "w-full h-1.5 rounded-full appearance-none cursor-pointer",
                    style: {
                      background: `linear-gradient(to right, #2563eb ${spacing}%, oklch(0.22 0 0) ${spacing}%)`
                    },
                    "data-ocid": "auto_layout.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor", children: "Group Padding" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/70 font-editor", children: [
                    padding,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 80,
                    value: padding,
                    onChange: (e) => setPadding(Number.parseInt(e.target.value)),
                    className: "w-full h-1.5 rounded-full appearance-none cursor-pointer",
                    style: {
                      background: `linear-gradient(to right, #2563eb ${padding / 80 * 100}%, oklch(0.22 0 0) ${padding / 80 * 100}%)`
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "Cross-Axis Alignment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["start", "center", "end"].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAlignment(a),
                    className: "flex-1 py-2 rounded-lg text-xs font-medium font-editor capitalize transition-smooth",
                    style: alignment === a ? {
                      background: "oklch(0.38 0.15 270 / 0.3)",
                      color: "#93c5fd",
                      border: "1px solid #2563eb"
                    } : {
                      background: "oklch(0.14 0 0 / 0.5)",
                      color: "oklch(0.6 0 0)",
                      border: "1px solid oklch(0.22 0 0 / 0.4)"
                    },
                    "data-ocid": "auto_layout.toggle",
                    children: a
                  },
                  a
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: applyLayout,
                  className: "w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth",
                  style: {
                    background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                    boxShadow: "0 0 24px #0891b244"
                  },
                  "data-ocid": "auto_layout.confirm_button",
                  children: "Apply Layout"
                }
              )
            ] }) })
          ]
        }
      )
    },
    "auto-layout-overlay"
  ) });
}
const FORMATS = [
  { id: "PNG", label: "PNG", desc: "Best for web", icon: FileImage },
  { id: "JPG", label: "JPG", desc: "Compressed", icon: FileImage },
  { id: "SVG", label: "SVG", desc: "Vector", icon: FileText },
  { id: "MP4", label: "MP4", desc: "Video ads", icon: FileVideo },
  { id: "PDF", label: "PDF", desc: "Print-ready", icon: FileText }
];
const QUALITIES = [
  { id: "720p", scale: "2×", size: "~0.6 MB" },
  { id: "1080p", scale: "3×", size: "~1.4 MB" },
  { id: "4K", scale: "4×", size: "~4.0 MB" }
];
const PROGRESS_STAGES = [
  "Preparing canvas…",
  "Rendering layers…",
  "Optimizing assets…",
  "Finalizing export…"
];
function normalize(val, fallback) {
  return val ?? fallback;
}
function ExportModal({
  onClose,
  initialFormat,
  initialQuality
}) {
  const [format, setFormat] = reactExports.useState(
    normalize(initialFormat, "PNG")
  );
  const [quality, setQuality] = reactExports.useState(
    normalize(initialQuality, "1080p")
  );
  const [transparentBg, setTransparentBg] = reactExports.useState(false);
  const [includeAnim, setIncludeAnim] = reactExports.useState(true);
  const [exporting, setExporting] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [stage, setStage] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  async function downloadFile() {
    const filename = `elysian-labs-export.${format.toLowerCase()}`;
    let mimeType;
    let content;
    if (format === "PNG" || format === "JPG") {
      try {
        const { elements, canvasSize } = useAdCreatorStore.getState();
        const scale = quality === "4K" ? 4 : quality === "1080p" ? 3 : 2;
        const canvas = document.createElement("canvas");
        canvas.width = canvasSize.width * scale;
        canvas.height = canvasSize.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");
        ctx.scale(scale, scale);
        const sortedElements = [...elements].filter((e) => e.visible);
        const drawElement = async (el) => {
          ctx.save();
          ctx.globalAlpha = el.opacity;
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          ctx.translate(cx, cy);
          ctx.rotate(el.rotation * Math.PI / 180);
          ctx.translate(-el.width / 2, -el.height / 2);
          if (el.type === "shape") {
            const shape = el;
            const fill = shape.fill;
            if (fill.startsWith("linear-gradient") || fill.startsWith("radial-gradient")) {
              const stops = fill.match(/#[0-9a-fA-F]{3,8}/g) ?? [
                "#1e1b4b",
                "#1e40af"
              ];
              const grad = ctx.createLinearGradient(0, 0, el.width, el.height);
              stops.forEach(
                (c, i) => grad.addColorStop(i / Math.max(1, stops.length - 1), c)
              );
              ctx.fillStyle = grad;
            } else {
              ctx.fillStyle = fill;
            }
            if (shape.cornerRadius > 0) {
              const r = Math.min(
                shape.cornerRadius,
                el.width / 2,
                el.height / 2
              );
              ctx.beginPath();
              ctx.roundRect(0, 0, el.width, el.height, r);
              ctx.fill();
            } else {
              ctx.fillRect(0, 0, el.width, el.height);
            }
            if (shape.strokeWidth > 0 && shape.stroke && shape.stroke !== "transparent") {
              ctx.strokeStyle = shape.stroke;
              ctx.lineWidth = shape.strokeWidth;
              ctx.strokeRect(0, 0, el.width, el.height);
            }
          } else if (el.type === "text") {
            const text = el;
            ctx.font = `${text.fontWeight} ${text.fontSize}px ${text.fontFamily}, sans-serif`;
            ctx.fillStyle = text.color;
            ctx.textAlign = text.textAlign === "justify" ? "left" : text.textAlign;
            ctx.textBaseline = "top";
            if (text.shadow) {
              ctx.shadowColor = text.shadow.color;
              ctx.shadowBlur = text.shadow.blur;
              ctx.shadowOffsetX = text.shadow.x;
              ctx.shadowOffsetY = text.shadow.y;
            }
            const lines = text.content.split("\n");
            const lineH = text.fontSize * text.lineHeight;
            lines.forEach((line, i) => {
              const xPos = text.textAlign === "center" ? el.width / 2 : text.textAlign === "right" ? el.width : 0;
              ctx.fillText(line, xPos, i * lineH);
            });
          } else if (el.type === "image") {
            const img = el;
            await new Promise((resolve) => {
              const image = new Image();
              image.crossOrigin = "anonymous";
              image.onload = () => {
                const {
                  brightness = 100,
                  contrast = 100,
                  saturation = 100,
                  blur: blurVal = 0
                } = img.filters;
                const filters = [];
                if (brightness !== 100)
                  filters.push(`brightness(${brightness}%)`);
                if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
                if (saturation !== 100)
                  filters.push(`saturate(${saturation}%)`);
                if (blurVal > 0) filters.push(`blur(${blurVal}px)`);
                if (filters.length) ctx.filter = filters.join(" ");
                ctx.drawImage(image, 0, 0, el.width, el.height);
                ctx.filter = "none";
                resolve();
              };
              image.onerror = () => resolve();
              image.src = img.src;
            });
          }
          ctx.restore();
        };
        for (const el of sortedElements) {
          await drawElement(el);
        }
        const imgType = format === "JPG" ? "image/jpeg" : "image/png";
        const transparent = format === "PNG" ? void 0 : 0.95;
        canvas.toBlob(
          (blob2) => {
            if (!blob2) return;
            const url2 = URL.createObjectURL(blob2);
            const a2 = document.createElement("a");
            a2.href = url2;
            a2.download = filename;
            a2.click();
            setTimeout(() => URL.revokeObjectURL(url2), 2e3);
          },
          imgType,
          transparent
        );
      } catch (err) {
        console.error("[ExportModal] export error:", err);
      }
      return;
    }
    if (format === "SVG") {
      mimeType = "image/svg+xml";
      content = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="50%" stop-color="#1e40af"/><stop offset="100%" stop-color="#312e81"/></linearGradient></defs><rect width="1200" height="675" fill="url(#bg)"/><text x="600" y="320" font-family="Inter, sans-serif" font-size="48" font-weight="bold" fill="rgba(255,255,255,0.9)" text-anchor="middle">Elysian Labs — Your Brand Here</text><text x="600" y="385" font-family="Inter, sans-serif" font-size="26" fill="rgba(255,255,255,0.5)" text-anchor="middle">Create Something Amazing</text></svg>`;
    } else if (format === "MP4") {
      mimeType = "video/mp4";
      content = `Elysian Labs MP4 Export
Resolution: ${quality}
This is a placeholder export file.`;
    } else {
      mimeType = "application/pdf";
      content = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n217\n%%EOF";
    }
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  const supportsQuality = format === "PNG" || format === "JPG" || format === "MP4";
  const supportsTransparent = format === "PNG" || format === "SVG";
  const supportsAnim = format === "MP4";
  function startExport() {
    setExporting(true);
    setProgress(0);
    setStage(0);
    let p = 0;
    let s = 0;
    const interval = setInterval(() => {
      p += Math.random() * 4 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setStage(3);
        setTimeout(() => setDone(true), 400);
        return;
      }
      const newStage = Math.min(3, Math.floor(p / 100 * 4));
      if (newStage !== s) s = newStage;
      setStage(s);
      setProgress(Math.round(p));
    }, 55);
  }
  const selectedQuality = QUALITIES.find((q) => q.id === quality) ?? QUALITIES[1];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: { background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      "data-ocid": "ad_creator.export_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, y: 24, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.88, y: 24, opacity: 0 },
          transition: { type: "spring", stiffness: 320, damping: 28 },
          onClick: (e) => e.stopPropagation(),
          className: "relative w-[480px] max-w-[96vw] rounded-2xl overflow-hidden",
          style: {
            background: "rgba(13,18,30,0.98)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 48px rgba(37,99,235,0.1)",
            backdropFilter: "blur(24px)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4",
                style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: {
                          background: "rgba(37,99,235,0.15)",
                          border: "1px solid rgba(37,99,235,0.25)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14, className: "text-blue-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Export Your Design" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40", children: "Choose format and quality" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "button",
                      onClick: onClose,
                      whileHover: { scale: 1.1, rotate: 90 },
                      whileTap: { scale: 0.9 },
                      className: "w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors",
                      "data-ocid": "ad_creator.export_modal.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: done ? (
              // ── Success state ────────────────────────────────────────
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.88 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.88 },
                  transition: { type: "spring", stiffness: 300, damping: 22 },
                  className: "text-center py-6",
                  "data-ocid": "ad_creator.export_modal.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
                        style: {
                          background: "rgba(34,197,94,0.15)",
                          border: "1.5px solid rgba(34,197,94,0.35)"
                        },
                        animate: {
                          boxShadow: [
                            "0 0 0 0 rgba(34,197,94,0.4)",
                            "0 0 0 14px rgba(34,197,94,0)"
                          ]
                        },
                        transition: { duration: 1, repeat: 2 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 26, className: "text-emerald-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold mb-1", children: "Export Complete!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/40 text-sm mb-6", children: [
                      format,
                      " · ",
                      quality,
                      " · ",
                      selectedQuality.size,
                      " estimated"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          type: "button",
                          whileHover: { scale: 1.04 },
                          whileTap: { scale: 0.96 },
                          onClick: downloadFile,
                          className: "px-5 py-2.5 rounded-xl text-white font-semibold text-sm",
                          style: {
                            background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                            boxShadow: "0 0 20px rgba(37,99,235,0.4)"
                          },
                          "data-ocid": "ad_creator.export_modal.confirm_button",
                          children: "Download File"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          type: "button",
                          whileHover: { scale: 1.04 },
                          whileTap: { scale: 0.96 },
                          onClick: () => {
                            setDone(false);
                            setExporting(false);
                            setProgress(0);
                          },
                          className: "px-5 py-2.5 rounded-xl text-white/70 text-sm border border-white/10 hover:border-white/20 hover:text-white transition-colors",
                          "data-ocid": "ad_creator.export_modal.cancel_button",
                          children: "Export Another"
                        }
                      )
                    ] })
                  ]
                },
                "success"
              )
            ) : exporting ? (
              // ── Progress state ───────────────────────────────────────
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -12 },
                  className: "py-4",
                  "data-ocid": "ad_creator.export_modal.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full h-28 rounded-xl mb-6 overflow-hidden",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "h-full",
                            style: {
                              background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.12) 40%, rgba(139,92,246,0.12) 60%, transparent 100%)",
                              backgroundSize: "200% 100%"
                            },
                            animate: { backgroundPosition: ["200% 0", "-200% 0"] },
                            transition: {
                              duration: 1.8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear"
                            }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.p,
                        {
                          initial: { opacity: 0, x: -8 },
                          animate: { opacity: 1, x: 0 },
                          className: "text-sm text-white/80",
                          children: PROGRESS_STAGES[stage]
                        },
                        stage
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-blue-400", children: [
                        progress,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-2 rounded-full overflow-hidden",
                        style: { background: "rgba(255,255,255,0.06)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "h-full rounded-full",
                            style: {
                              background: "linear-gradient(90deg,#1d4ed8,#3b82f6,#818cf8)",
                              width: `${progress}%`
                            },
                            transition: { ease: "easeOut" }
                          }
                        )
                      }
                    )
                  ]
                },
                "progress"
              )
            ) : (
              // ── Selector state ───────────────────────────────────────
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "w-full h-24 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden",
                        style: {
                          background: "linear-gradient(135deg,#1e1b4b,#312e81,#1e40af)",
                          border: "1px solid rgba(255,255,255,0.08)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-sm", children: "Your Brand Here" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[11px] mt-0.5", children: "Create Something Amazing" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute bottom-3 right-3 text-[10px] text-white/40 px-2 py-0.5 rounded",
                              style: { background: "rgba(0,0,0,0.4)" },
                              children: "Preview"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40 uppercase tracking-wider mb-2", children: "Format" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 mb-5", children: FORMATS.map(({ id, label, desc, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        onClick: () => setFormat(id),
                        whileHover: { scale: 1.04, y: -1 },
                        whileTap: { scale: 0.96 },
                        className: "flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all",
                        style: {
                          background: format === id ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)",
                          borderColor: format === id ? "rgba(37,99,235,0.6)" : "rgba(255,255,255,0.07)",
                          boxShadow: format === id ? "0 0 12px rgba(37,99,235,0.25)" : "none"
                        },
                        "data-ocid": `ad_creator.export_modal.format_${id.toLowerCase()}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              size: 16,
                              className: format === id ? "text-blue-400" : "text-white/40"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-[11px] font-semibold ${format === id ? "text-blue-300" : "text-white/60"}`,
                              children: label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30 leading-tight text-center", children: desc })
                        ]
                      },
                      id
                    )) }),
                    supportsQuality && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40 uppercase tracking-wider mb-2", children: "Quality" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-5", children: QUALITIES.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.button,
                        {
                          type: "button",
                          onClick: () => setQuality(q.id),
                          whileHover: { scale: 1.03 },
                          whileTap: { scale: 0.96 },
                          className: "flex flex-col items-center gap-0.5 py-2.5 rounded-xl border transition-all",
                          style: {
                            background: quality === q.id ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
                            borderColor: quality === q.id ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"
                          },
                          "data-ocid": `ad_creator.export_modal.quality_${q.id.toLowerCase()}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `text-xs font-bold ${quality === q.id ? "text-blue-300" : "text-white/70"}`,
                                children: q.id
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/30", children: [
                              q.scale,
                              " · ",
                              q.size
                            ] })
                          ]
                        },
                        q.id
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mb-6", children: [
                      supportsTransparent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/60", children: "Transparent background" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.button,
                          {
                            type: "button",
                            role: "switch",
                            "aria-checked": transparentBg,
                            "aria-label": "Transparent background",
                            onClick: () => setTransparentBg((v) => !v),
                            className: `relative w-10 h-5 rounded-full transition-colors cursor-pointer ${transparentBg ? "bg-blue-600" : "bg-white/15"}`,
                            "data-ocid": "ad_creator.export_modal.transparent_toggle",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                className: "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow",
                                animate: {
                                  left: transparentBg ? "calc(100% - 18px)" : "2px"
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
                      ] }),
                      supportsAnim && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/60", children: "Include animations" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.button,
                          {
                            type: "button",
                            role: "switch",
                            "aria-checked": includeAnim,
                            "aria-label": "Include animations",
                            onClick: () => setIncludeAnim((v) => !v),
                            className: `relative w-10 h-5 rounded-full transition-colors cursor-pointer ${includeAnim ? "bg-blue-600" : "bg-white/15"}`,
                            "data-ocid": "ad_creator.export_modal.animation_toggle",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                className: "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow",
                                animate: {
                                  left: includeAnim ? "calc(100% - 18px)" : "2px"
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
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        onClick: startExport,
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.97 },
                        className: "w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2",
                        style: {
                          background: "linear-gradient(135deg,#1d4ed8,#2563eb,#3b82f6)",
                          boxShadow: "0 0 24px rgba(37,99,235,0.35)"
                        },
                        "data-ocid": "ad_creator.export_modal.confirm_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
                          "Export Now"
                        ]
                      }
                    )
                  ]
                },
                "selector"
              )
            ) }) })
          ]
        }
      )
    }
  );
}
const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "LinkedIn",
  "Twitter"
];
const STYLES = ["Luxury", "Modern", "Bold", "Minimal", "Cinematic", "Playful"];
const STAGES = [
  { label: "Analyzing prompt...", pct: 20 },
  { label: "Designing layout...", pct: 40 },
  { label: "Selecting typography...", pct: 60 },
  { label: "Applying styles...", pct: 80 },
  { label: "Generating variations...", pct: 100 }
];
const DESIGN_VARIANTS = [
  {
    id: 1,
    label: "Dark Luxury",
    bg: "linear-gradient(135deg, #0a0010 0%, #1a0030 50%, #0d0020 100%)",
    accent: "#c084fc",
    headline: "Premium Collection",
    sub: "Elevate your aesthetic",
    cta: "Shop Now",
    tag: "Luxury",
    platform: "Instagram"
  },
  {
    id: 2,
    label: "Neon Gaming",
    bg: "linear-gradient(135deg, #050510 0%, #0a0a1a 100%)",
    accent: "#00fff7",
    headline: "LEVEL UP",
    sub: "Your Game. Your Rules.",
    cta: "Play Now",
    tag: "Gaming",
    platform: "TikTok"
  },
  {
    id: 3,
    label: "Minimal Clean",
    bg: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    accent: "#212529",
    headline: "Less is More",
    sub: "Pure simplicity, maximum impact",
    cta: "Discover",
    tag: "Minimal",
    platform: "LinkedIn"
  },
  {
    id: 4,
    label: "Gradient Bold",
    bg: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
    accent: "#ffffff",
    headline: "Bold. Brave. Beautiful.",
    sub: "Make your mark today",
    cta: "Get Started",
    tag: "Bold",
    platform: "Facebook"
  },
  {
    id: 5,
    label: "Cinematic",
    bg: "linear-gradient(135deg, #0c0c0c 0%, #1a1a14 50%, #0d0d08 100%)",
    accent: "#d97706",
    headline: "A Story Unfolds",
    sub: "Cinematic storytelling",
    cta: "Watch Now",
    tag: "Cinematic",
    platform: "YouTube"
  },
  {
    id: 6,
    label: "Vibrant Social",
    bg: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    accent: "#ffffff",
    headline: "GO VIRAL TODAY!",
    sub: "The content that converts",
    cta: "Try Free",
    tag: "Viral",
    platform: "TikTok"
  },
  {
    id: 7,
    label: "Tech Modern",
    bg: "linear-gradient(135deg, #020817 0%, #0f172a 100%)",
    accent: "#2563eb",
    headline: "Future Forward",
    sub: "Technology meets creativity",
    cta: "Explore",
    tag: "Modern",
    platform: "Twitter"
  },
  {
    id: 8,
    label: "Warm Lifestyle",
    bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
    accent: "#92400e",
    headline: "Live Your Best Life",
    sub: "Warm moments, big memories",
    cta: "Join Us",
    tag: "Lifestyle",
    platform: "Instagram"
  }
];
function MagicDesignModal({ open, onClose }) {
  var _a, _b, _c;
  const [step, setStep] = reactExports.useState("input");
  const [prompt, setPrompt] = reactExports.useState("");
  const [platform, setPlatform] = reactExports.useState("Instagram");
  const [style, setStyle] = reactExports.useState("Luxury");
  const [stageIdx, setStageIdx] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState(1);
  const { addElement, setCanvasSize } = useAdCreatorStore();
  const intervalRef = reactExports.useRef(null);
  const timeoutRef = reactExports.useRef(null);
  const mountedRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!open) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setStep("input");
      setStageIdx(0);
      setProgress(0);
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (step !== "loading") return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(STAGES[0].pct);
    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      setStageIdx((prev) => {
        const next = prev + 1;
        if (!mountedRef.current) return prev;
        setProgress(STAGES[Math.min(next, STAGES.length - 1)].pct);
        if (next >= STAGES.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          timeoutRef.current = setTimeout(() => {
            if (mountedRef.current) setStep("results");
          }, 300);
          return prev;
        }
        return next;
      });
    }, 500);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [step]);
  function handleGenerate() {
    if (!prompt.trim()) return;
    setStageIdx(0);
    setProgress(0);
    setStep("loading");
  }
  function handleApply() {
    const design = DESIGN_VARIANTS.find((d) => d.id === selected);
    if (!design) return;
    setCanvasSize({
      name: design.platform === "YouTube" ? "YouTube Thumbnail" : "Instagram Post",
      width: 1080,
      height: 1080
    });
    addElement({
      type: "shape",
      name: "AI Background",
      x: 0,
      y: 0,
      width: 1080,
      height: 1080,
      rotation: 0,
      opacity: 1,
      locked: true,
      visible: true,
      shapeType: "rect",
      fill: design.bg,
      gradient: design.bg,
      stroke: "transparent",
      strokeWidth: 0,
      strokeDash: [],
      glow: null,
      shadow: null,
      cornerRadius: 0
    });
    addElement({
      type: "text",
      name: "AI Headline",
      x: 100,
      y: 380,
      width: 880,
      height: 120,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: design.headline,
      fontFamily: "Inter",
      fontSize: 80,
      fontWeight: "700",
      color: design.accent,
      textAlign: "center",
      lineHeight: 1.1,
      letterSpacing: -2,
      gradient: false,
      gradientColors: [design.accent, design.accent],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal"
    });
    addElement({
      type: "text",
      name: "AI Subtitle",
      x: 150,
      y: 510,
      width: 780,
      height: 60,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      content: design.sub,
      fontFamily: "Inter",
      fontSize: 36,
      fontWeight: "400",
      color: design.accent,
      textAlign: "center",
      lineHeight: 1.4,
      letterSpacing: 0,
      gradient: false,
      gradientColors: [design.accent, design.accent],
      shadow: null,
      glow: null,
      outline: null,
      animation: null,
      blendMode: "normal"
    });
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: {
        background: "oklch(0 0 0 / 0.75)",
        backdropFilter: "blur(8px)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => e.target === e.currentTarget && onClose(),
      "data-ocid": "magic_design.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg",
          style: {
            background: "oklch(0.11 0.006 240 / 0.97)",
            border: "1px solid oklch(0.25 0 0 / 0.4)"
          },
          initial: { scale: 0.94, y: 24, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.94, y: 24, opacity: 0 },
          transition: { type: "spring", damping: 22, stiffness: 280 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4",
                style: { borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, #4f46e5, #7c3aed)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { size: 16, className: "text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-lg font-editor", children: "Magic Design" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth",
                      "data-ocid": "magic_design.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
              step === "input" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  className: "space-y-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        className: "w-full h-24 editor-input-glass rounded-xl resize-none p-4 text-sm placeholder-white/30",
                        placeholder: "Describe your ad... (e.g., Luxury skincare Instagram ad with gold accents)",
                        value: prompt,
                        onChange: (e) => setPrompt(e.target.value),
                        "data-ocid": "magic_design.textarea"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest mb-2 font-editor", children: "Platform" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PLATFORMS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setPlatform(p),
                          className: "px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth",
                          style: platform === p ? {
                            background: "#2563eb",
                            color: "#fff",
                            boxShadow: "0 0 14px #2563eb66"
                          } : {
                            background: "oklch(0.16 0 0 / 0.5)",
                            color: "oklch(0.7 0 0)",
                            border: "1px solid oklch(0.22 0 0 / 0.5)"
                          },
                          children: p
                        },
                        p
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest mb-2 font-editor", children: "Style" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: STYLES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setStyle(s),
                          className: "px-3 py-1.5 rounded-lg text-xs font-medium font-editor transition-smooth",
                          style: style === s ? {
                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "#fff"
                          } : {
                            background: "oklch(0.16 0 0 / 0.5)",
                            color: "oklch(0.7 0 0)",
                            border: "1px solid oklch(0.22 0 0 / 0.5)"
                          },
                          children: s
                        },
                        s
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleGenerate,
                        disabled: !prompt.trim(),
                        className: "w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40",
                        style: {
                          background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                          boxShadow: "0 0 24px #2563eb55"
                        },
                        "data-ocid": "magic_design.primary_button",
                        children: "Generate Designs"
                      }
                    )
                  ]
                },
                "input"
              ),
              step === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "py-8 space-y-6",
                  "data-ocid": "magic_design.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute inset-0 rounded-full",
                            style: {
                              background: "conic-gradient(#2563eb, #7c3aed, #2563eb)",
                              animation: "spin 2s linear infinite"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute inset-1 rounded-full",
                            style: { background: "oklch(0.11 0.006 240)" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          WandSparkles,
                          {
                            size: 24,
                            className: "absolute inset-0 m-auto text-purple-400"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium font-editor", children: (_a = STAGES[stageIdx]) == null ? void 0 : _a.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/40 text-sm mt-1 font-editor", children: [
                          (_b = STAGES[stageIdx]) == null ? void 0 : _b.pct,
                          "%"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full h-2 rounded-full",
                        style: { background: "oklch(0.18 0 0)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            className: "h-full rounded-full",
                            style: {
                              background: "linear-gradient(90deg, #2563eb, #7c3aed)"
                            },
                            animate: { width: `${progress}%` },
                            transition: { duration: 0.45, ease: "easeOut" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: STAGES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-2 h-2 rounded-full transition-smooth",
                              style: {
                                background: i <= stageIdx ? "#2563eb" : "oklch(0.25 0 0)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs text-center font-editor",
                              style: {
                                color: i <= stageIdx ? "#93c5fd" : "oklch(0.4 0 0)"
                              },
                              children: s.label.split("...")[0]
                            }
                          )
                        ]
                      },
                      s.label
                    )) })
                  ]
                },
                "loading"
              ),
              step === "results" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/60 font-editor", children: [
                        "8 designs generated for",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: platform }),
                        " ·",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-400", children: style })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleGenerate,
                          className: "flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-editor transition-smooth",
                          "data-ocid": "magic_design.secondary_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                            " Regenerate"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: DESIGN_VARIANTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        onClick: () => setSelected(d.id),
                        whileHover: { scale: 1.04, y: -2 },
                        whileTap: { scale: 0.97 },
                        className: "relative rounded-xl overflow-hidden cursor-pointer transition-smooth",
                        style: {
                          aspectRatio: "1",
                          background: d.bg,
                          border: selected === d.id ? "2px solid #2563eb" : "2px solid transparent",
                          boxShadow: selected === d.id ? "0 0 20px #2563eb55" : "none"
                        },
                        "data-ocid": `magic_design.item.${d.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center p-2 gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-center font-bold font-editor leading-tight",
                                style: { color: d.accent, fontSize: "9px" },
                                children: d.headline
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-center font-editor leading-tight opacity-70",
                                style: { color: d.accent, fontSize: "6px" },
                                children: d.sub
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "mt-1 px-2 py-0.5 rounded-full text-center font-editor font-semibold",
                                style: {
                                  background: d.accent,
                                  color: d.bg === "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" ? "#fff" : "#0a0a0a",
                                  fontSize: "5px"
                                },
                                children: d.cta
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1 left-1 right-1 flex items-center justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-white/60 font-editor",
                                style: { fontSize: "5px" },
                                children: d.platform
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "px-1 rounded font-editor",
                                style: {
                                  background: "oklch(0 0 0 / 0.5)",
                                  color: d.accent,
                                  fontSize: "5px"
                                },
                                children: d.tag
                              }
                            )
                          ] }),
                          selected === d.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center",
                              style: { background: "#2563eb" },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, className: "text-white" })
                            }
                          )
                        ]
                      },
                      d.id
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-center text-xs font-editor",
                        style: { color: "oklch(0.5 0 0)" },
                        children: [
                          (_c = DESIGN_VARIANTS.find((d) => d.id === selected)) == null ? void 0 : _c.label,
                          " ",
                          "selected"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleApply,
                        className: "w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth",
                        style: {
                          background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                          boxShadow: "0 0 24px #2563eb55"
                        },
                        "data-ocid": "magic_design.confirm_button",
                        children: "Apply Design"
                      }
                    )
                  ]
                },
                "results"
              )
            ] }) })
          ]
        }
      )
    },
    "magic-design-overlay"
  ) });
}
const EXTENDED_PRESETS = [
  {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 14 }),
    ratio: "1:1",
    color: "#e1306c"
  },
  {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 14 }),
    ratio: "9:16",
    color: "#e1306c"
  },
  {
    name: "TikTok",
    width: 1080,
    height: 1920,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 14 }),
    ratio: "9:16",
    color: "#69c9d0"
  },
  {
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { size: 14 }),
    ratio: "16:9",
    color: "#ff0000"
  },
  {
    name: "Facebook Ad",
    width: 1200,
    height: 628,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 14 }),
    ratio: "1.91:1",
    color: "#1877f2"
  },
  {
    name: "LinkedIn",
    width: 1200,
    height: 627,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: 14 }),
    ratio: "1.91:1",
    color: "#0077b5"
  },
  {
    name: "Twitter/X Banner",
    width: 1500,
    height: 500,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { size: 14 }),
    ratio: "3:1",
    color: "#1da1f2"
  },
  {
    name: "Pinterest",
    width: 1e3,
    height: 1500,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { size: 14 }),
    ratio: "2:3",
    color: "#bd081c"
  }
];
const SCALE_METHODS = [
  {
    id: "fit",
    label: "Scale & Fit",
    desc: "Fit all elements inside new bounds"
  },
  {
    id: "fill",
    label: "Scale & Fill",
    desc: "Fill new bounds, may crop edges"
  },
  {
    id: "keep",
    label: "Keep Proportions",
    desc: "Elements keep original scale"
  }
];
function RatioDiagram({ w, h }) {
  const maxD = 28;
  const ratio = w / h;
  const dw = ratio >= 1 ? maxD : maxD * ratio;
  const dh = ratio < 1 ? maxD : maxD / ratio;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-sm",
      style: {
        width: dw,
        height: dh,
        background: "oklch(0.38 0.15 270 / 0.4)",
        border: "1px solid oklch(0.38 0.15 270 / 0.7)"
      }
    }
  ) });
}
function MagicResizeModal({ open, onClose }) {
  const { canvasSize, setCanvasSize, elements, moveElement, resizeElement } = useAdCreatorStore();
  const [selected, setSelected] = reactExports.useState(canvasSize.name);
  const [scaleMethod, setScaleMethod] = reactExports.useState("fit");
  const [customW, setCustomW] = reactExports.useState("800");
  const [customH, setCustomH] = reactExports.useState("600");
  const [showCustom, setShowCustom] = reactExports.useState(false);
  const selectedPreset = EXTENDED_PRESETS.find((p) => p.name === selected) ?? (showCustom ? {
    name: "Custom",
    width: Number.parseInt(customW) || 800,
    height: Number.parseInt(customH) || 600
  } : null);
  function handleResize() {
    const newSize = showCustom ? {
      name: "Custom",
      width: Number.parseInt(customW) || 800,
      height: Number.parseInt(customH) || 600
    } : selectedPreset;
    if (!newSize) return;
    const oldW = canvasSize.width;
    const oldH = canvasSize.height;
    const newW = newSize.width;
    const newH = newSize.height;
    const scaleX = newW / oldW;
    const scaleY = newH / oldH;
    for (const el of elements) {
      if (scaleMethod === "fit" || scaleMethod === "fill") {
        const sx = scaleMethod === "fit" ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
        moveElement(el.id, Math.round(el.x * sx), Math.round(el.y * sx));
        resizeElement(
          el.id,
          Math.round(el.width * sx),
          Math.round(el.height * sx)
        );
      } else {
        moveElement(
          el.id,
          Math.round(el.x * scaleX),
          Math.round(el.y * scaleY)
        );
      }
    }
    setCanvasSize(newSize);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: {
        background: "oklch(0 0 0 / 0.75)",
        backdropFilter: "blur(8px)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => e.target === e.currentTarget && onClose(),
      "data-ocid": "magic_resize.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg",
          style: {
            background: "oklch(0.11 0.006 240 / 0.97)",
            border: "1px solid oklch(0.25 0 0 / 0.4)"
          },
          initial: { scale: 0.94, y: 24, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.94, y: 24, opacity: 0 },
          transition: { type: "spring", damping: 22, stiffness: 280 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 py-4",
                style: { borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: {
                          background: "linear-gradient(135deg, #2563eb, #4f46e5)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { size: 16, className: "text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-lg font-editor", children: "Magic Resize" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "px-3 py-1 rounded-full text-xs font-editor",
                        style: {
                          background: "oklch(0.38 0.15 270 / 0.2)",
                          color: "#93c5fd",
                          border: "1px solid oklch(0.38 0.15 270 / 0.3)"
                        },
                        children: [
                          canvasSize.width,
                          " × ",
                          canvasSize.height
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        className: "w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth",
                        "data-ocid": "magic_resize.close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
                EXTENDED_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.03 },
                    whileTap: { scale: 0.97 },
                    onClick: () => {
                      setSelected(preset.name);
                      setShowCustom(false);
                    },
                    className: "relative flex items-center gap-3 p-3 rounded-xl transition-smooth text-left",
                    style: {
                      background: selected === preset.name ? "oklch(0.38 0.15 270 / 0.15)" : "oklch(0.14 0 0 / 0.5)",
                      border: selected === preset.name ? "1px solid #2563eb" : "1px solid oklch(0.22 0 0 / 0.4)",
                      boxShadow: selected === preset.name ? "0 0 12px #2563eb44" : "none"
                    },
                    "data-ocid": `magic_resize.item.${EXTENDED_PRESETS.indexOf(preset) + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RatioDiagram, { w: preset.width, h: preset.height }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-semibold font-editor truncate", children: preset.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "font-editor",
                            style: { fontSize: "10px", color: "oklch(0.5 0 0)" },
                            children: [
                              preset.width,
                              "×",
                              preset.height
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "inline-block px-1.5 py-0.5 rounded font-editor",
                            style: {
                              background: "oklch(0.18 0 0)",
                              color: preset.color,
                              fontSize: "9px"
                            },
                            children: preset.ratio
                          }
                        )
                      ] }),
                      selected === preset.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                          style: { background: "#2563eb" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, className: "text-white" })
                        }
                      )
                    ]
                  },
                  preset.name
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    whileHover: { scale: 1.03 },
                    whileTap: { scale: 0.97 },
                    onClick: () => {
                      setShowCustom(true);
                      setSelected("");
                    },
                    className: "flex items-center gap-3 p-3 rounded-xl transition-smooth text-left",
                    style: {
                      background: showCustom ? "oklch(0.38 0.15 270 / 0.15)" : "oklch(0.14 0 0 / 0.5)",
                      border: showCustom ? "1px solid #2563eb" : "1px solid oklch(0.22 0 0 / 0.4)"
                    },
                    "data-ocid": "magic_resize.item.9",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-5 h-4 rounded-sm border-2",
                          style: {
                            borderColor: showCustom ? "#2563eb" : "oklch(0.4 0 0)"
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-semibold font-editor", children: "Custom" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-editor",
                            style: { fontSize: "10px", color: "oklch(0.5 0 0)" },
                            children: "Set your own size"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showCustom && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "mresize_w",
                          className: "block text-xs text-white/40 font-editor mb-1",
                          children: "Width (px)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "mresize_w",
                          type: "number",
                          className: "w-full editor-input-glass",
                          value: customW,
                          onChange: (e) => setCustomW(e.target.value),
                          "data-ocid": "magic_resize.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "mresize_h",
                          className: "block text-xs text-white/40 font-editor mb-1",
                          children: "Height (px)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "mresize_h",
                          type: "number",
                          className: "w-full editor-input-glass",
                          value: customH,
                          onChange: (e) => setCustomH(e.target.value)
                        }
                      )
                    ] })
                  ] })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-editor mb-2", children: "Scale Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: SCALE_METHODS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setScaleMethod(m.id),
                    className: "flex-1 py-2.5 px-3 rounded-xl text-xs font-editor transition-smooth text-center",
                    style: scaleMethod === m.id ? {
                      background: "oklch(0.38 0.15 270 / 0.3)",
                      color: "#93c5fd",
                      border: "1px solid #2563eb"
                    } : {
                      background: "oklch(0.14 0 0 / 0.5)",
                      color: "oklch(0.6 0 0)",
                      border: "1px solid oklch(0.22 0 0 / 0.4)"
                    },
                    "data-ocid": "magic_resize.toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: m.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "mt-0.5 opacity-60",
                          style: { fontSize: "10px" },
                          children: m.desc
                        }
                      )
                    ]
                  },
                  m.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleResize,
                  disabled: !selected && !showCustom,
                  className: "w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40",
                  style: {
                    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                    boxShadow: "0 0 24px #2563eb55"
                  },
                  "data-ocid": "magic_resize.confirm_button",
                  children: "Resize Now"
                }
              )
            ] })
          ]
        }
      )
    },
    "magic-resize-overlay"
  ) });
}
function AdCreatorPage() {
  const undo = useAdCreatorStore((s) => s.undo);
  const redo = useAdCreatorStore((s) => s.redo);
  const deselectAll = useAdCreatorStore((s) => s.deselectAll);
  const [showMagicDesign, setShowMagicDesign] = reactExports.useState(false);
  const [showMagicResize, setShowMagicResize] = reactExports.useState(false);
  const [showAiCopywriter, setShowAiCopywriter] = reactExports.useState(false);
  const [showAiImageGen, setShowAiImageGen] = reactExports.useState(false);
  const [showAutoLayout, setShowAutoLayout] = reactExports.useState(false);
  const [showExport, setShowExport] = reactExports.useState(false);
  const [exportFormat, setExportFormat] = reactExports.useState("");
  const [exportQuality, setExportQuality] = reactExports.useState("");
  const [isReady, setIsReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const id = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(id);
  }, []);
  reactExports.useEffect(() => {
    document.title = "Ad Creator — Elysian Labs";
  }, []);
  reactExports.useEffect(() => {
    const handleKeydown = (e) => {
      const tag = e.target.tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable;
      if (e.ctrlKey && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        undo();
        return;
      }
      if (e.ctrlKey && e.shiftKey && e.key === "z" || e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
        return;
      }
      if (e.ctrlKey && e.key === "a" && !isInput) {
        e.preventDefault();
        const store = useAdCreatorStore.getState();
        for (const el of store.elements) {
          store.selectElement(el.id, true);
        }
        return;
      }
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        setShowExport(true);
        return;
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !isInput) {
        e.preventDefault();
        const store = useAdCreatorStore.getState();
        for (const id of store.selectedIds) {
          store.deleteElement(id);
        }
        return;
      }
      if (e.key === "Escape") {
        setShowMagicDesign((v) => {
          if (v) return false;
          deselectAll();
          return v;
        });
        setShowMagicResize((v) => v ? false : v);
        setShowAiCopywriter((v) => v ? false : v);
        setShowAiImageGen((v) => v ? false : v);
        setShowAutoLayout((v) => v ? false : v);
        setShowExport((v) => v ? false : v);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [undo, redo, deselectAll]);
  const handleExport = (format, quality) => {
    setExportFormat(format);
    setExportQuality(quality);
    setShowExport(true);
  };
  if (!isReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-screen",
        style: { background: "#070B14" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500",
            style: { animation: "spin 1s linear infinite" }
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdErrorBoundary, { name: "Ad Studio", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "ad_creator.page",
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, ease: "easeOut" },
      className: "flex flex-col h-screen overflow-hidden",
      style: { background: "#070B14" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdErrorBoundary, { name: "Top Bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          AdTopBar,
          {
            onMagicDesign: () => setShowMagicDesign(true),
            onMagicResize: () => setShowMagicResize(true),
            onExport: handleExport
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdErrorBoundary, { name: "Sidebar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AdSidebar,
            {
              onOpenMagicDesign: () => setShowMagicDesign(true),
              onOpenAiCopywriter: () => setShowAiCopywriter(true),
              onOpenAiImageGen: () => setShowAiImageGen(true),
              onOpenMagicResize: () => setShowMagicResize(true),
              onOpenAutoLayout: () => setShowAutoLayout(true)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdErrorBoundary, { name: "Canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdCanvasKeyedWrapper, {}) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "hidden md:block w-80 shrink-0 overflow-y-auto",
              style: {
                background: "rgba(17,24,39,0.95)",
                borderLeft: "1px solid rgba(255,255,255,0.06)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdErrorBoundary, { name: "Properties Panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdPropertiesPanel, {}) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          showMagicDesign && /* @__PURE__ */ jsxRuntimeExports.jsx(
            MagicDesignModal,
            {
              open: showMagicDesign,
              onClose: () => setShowMagicDesign(false)
            },
            "magic-design-modal"
          ),
          showMagicResize && /* @__PURE__ */ jsxRuntimeExports.jsx(
            MagicResizeModal,
            {
              open: showMagicResize,
              onClose: () => setShowMagicResize(false)
            },
            "magic-resize-modal"
          ),
          showAiCopywriter && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AiCopywriterModal,
            {
              open: showAiCopywriter,
              onClose: () => setShowAiCopywriter(false)
            },
            "ai-copywriter-modal"
          ),
          showAiImageGen && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AiImageGenModal,
            {
              open: showAiImageGen,
              onClose: () => setShowAiImageGen(false)
            },
            "ai-image-gen-modal"
          ),
          showAutoLayout && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AutoLayoutModal,
            {
              open: showAutoLayout,
              onClose: () => setShowAutoLayout(false)
            },
            "auto-layout-modal"
          ),
          showExport && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ExportModal,
            {
              onClose: () => setShowExport(false),
              initialFormat: exportFormat || void 0,
              initialQuality: exportQuality || void 0
            },
            "export-modal"
          )
        ] })
      ]
    }
  ) });
}
export {
  AdCreatorPage as default
};
