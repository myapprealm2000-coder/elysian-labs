import {
  type CanvasElement,
  type ImageCanvasElement,
  type ShapeCanvasElement,
  type TextCanvasElement,
  useAdCreatorStore,
} from "@/store/adCreatorStore";
import {
  AlignCenter,
  BringToFront,
  ChevronDown,
  ChevronUp,
  Copy,
  Layers,
  Lock,
  Maximize2,
  RefreshCw,
  RotateCcw,
  SendToBack,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const SNAP_GRID = 8;
const SNAP_THRESHOLD = 5;
const MIN_SIZE = 10;
const ROTATION_HANDLE_OFFSET = 32;
const HANDLE_SIZE = 8;

type HandleDir = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";
const HANDLES: HandleDir[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];

interface Guide {
  type: "x" | "y";
  value: number;
}

interface ContextMenuState {
  x: number;
  y: number;
  elementId: string;
}

interface Marquee {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function snapToGrid(v: number, grid: number) {
  return Math.round(v / grid) * grid;
}

function getCursorForHandle(handle: HandleDir): string {
  const map: Record<HandleDir, string> = {
    nw: "nw-resize",
    n: "n-resize",
    ne: "ne-resize",
    e: "e-resize",
    se: "se-resize",
    s: "s-resize",
    sw: "sw-resize",
    w: "w-resize",
  };
  return map[handle];
}

function getHandlePos(
  handle: HandleDir,
  w: number,
  h: number,
): { x: number; y: number } {
  const map: Record<HandleDir, { x: number; y: number }> = {
    nw: { x: 0, y: 0 },
    n: { x: w / 2, y: 0 },
    ne: { x: w, y: 0 },
    e: { x: w, y: h / 2 },
    se: { x: w, y: h },
    s: { x: w / 2, y: h },
    sw: { x: 0, y: h },
    w: { x: 0, y: h / 2 },
  };
  return map[handle];
}

function imgFilters(el: ImageCanvasElement): string {
  const f = el.filters;
  return [
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturation}%)`,
    `blur(${f.blur}px)`,
    `hue-rotate(${f.hue}deg)`,
  ].join(" ");
}

function shadowCss(
  s: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
  } | null,
): string {
  if (!s) return "none";
  return `${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
}

function glowBoxShadow(
  g: { color: string; intensity: number } | null,
  shadow: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
  } | null,
): string {
  const parts: string[] = [];
  if (shadow) parts.push(shadowCss(shadow));
  if (g) parts.push(`0 0 ${g.intensity * 40}px ${g.color}`);
  return parts.length ? parts.join(", ") : "none";
}

// ─── Inline text editor overlay ─────────────────────────────────────────────
const InlineTextEditor = memo(function InlineTextEditor({
  element,
  zoom,
  onCommit,
}: {
  element: import("@/store/adCreatorStore").TextCanvasElement;
  zoom: number;
  onCommit: (text: string) => void;
}) {
  const [value, setValue] = useState(element.content);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const commit = useCallback(() => {
    onCommit(value);
  }, [value, onCommit]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Escape") {
          commit();
        }
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          commit();
        }
      }}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
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
        cursor: "text",
      }}
    />
  );
});

// ─── Element Renderer ─────────────────────────────────────────────────────────
const CanvasElementRenderer = memo(function CanvasElementRenderer({
  element,
  isSelected,
}: {
  element: CanvasElement;
  isSelected: boolean;
}) {
  if (element.type === "text") {
    const el = element as TextCanvasElement;
    const textShadow = el.shadow
      ? `${el.shadow.x}px ${el.shadow.y}px ${el.shadow.blur}px ${el.shadow.color}`
      : el.glow
        ? `0 0 ${el.glow.intensity * 20}px ${el.glow.color}`
        : undefined;
    const colorStyle = el.gradient
      ? {
          background: `linear-gradient(135deg, ${el.gradientColors.join(", ")})`,
          WebkitBackgroundClip: "text" as const,
          WebkitTextFillColor: "transparent" as const,
          backgroundClip: "text" as const,
        }
      : { color: el.color };
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          fontFamily: el.fontFamily,
          fontSize: el.fontSize,
          fontWeight: el.fontWeight,
          textAlign: el.textAlign,
          lineHeight: el.lineHeight,
          letterSpacing: el.letterSpacing,
          textShadow,
          WebkitTextStroke: el.outline
            ? `${el.outline.width}px ${el.outline.color}`
            : undefined,
          cursor: isSelected ? "move" : "pointer",
          userSelect: "none",
          overflow: "hidden",
          wordBreak: "break-word",
          ...colorStyle,
        }}
      >
        {el.content}
      </div>
    );
  }

  if (element.type === "image") {
    const el = element as ImageCanvasElement;
    return (
      <img
        src={el.src}
        alt={el.name}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: imgFilters(el),
          cursor: isSelected ? "move" : "pointer",
          userSelect: "none",
          display: "block",
        }}
      />
    );
  }

  if (element.type === "shape") {
    const el = element as ShapeCanvasElement;
    const isCircle = el.shapeType === "circle";
    const isTriangle = el.shapeType === "triangle";
    if (isTriangle) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            cursor: isSelected ? "move" : "pointer",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: el.gradient ?? el.fill,
              boxShadow: glowBoxShadow(el.glow, el.shadow),
            }}
          />
        </div>
      );
    }
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: el.gradient ?? el.fill,
          border:
            el.strokeWidth > 0
              ? `${el.strokeWidth}px solid ${el.stroke}`
              : undefined,
          borderRadius: isCircle ? "50%" : el.cornerRadius,
          boxShadow: glowBoxShadow(el.glow, el.shadow),
          cursor: isSelected ? "move" : "pointer",
        }}
      />
    );
  }

  // group
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px dashed rgba(255,255,255,0.2)",
        cursor: "move",
      }}
    />
  );
});

// ─── Context Menu ─────────────────────────────────────────────────────────────
function ContextMenu({
  menu,
  onAction,
  onClose,
}: {
  menu: ContextMenuState;
  onAction: (action: string, id: string) => void;
  onClose: () => void;
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
    { label: "Delete", icon: Trash2, action: "delete", danger: true },
  ];

  return (
    <motion.div
      className="fixed z-[200] rounded-xl border border-white/10 py-1.5 min-w-[160px]"
      style={{
        left: menu.x,
        top: menu.y,
        background: "rgba(17,24,39,0.97)",
        backdropFilter: "blur(20px)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      initial={{ opacity: 0, scale: 0.92, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -4 }}
      transition={{ duration: 0.12 }}
      onMouseLeave={onClose}
    >
      {items.map((item) => (
        <button
          type="button"
          key={item.action}
          className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs transition-colors ${
            item.danger
              ? "text-red-400 hover:bg-red-500/10"
              : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
          onClick={() => {
            onAction(item.action, menu.elementId);
            onClose();
          }}
          data-ocid={`ad_canvas.context_menu.${item.action}`}
        >
          <item.icon size={12} />
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}

// ─── Selection Handles ────────────────────────────────────────────────────────
function SelectionHandles({
  element,
  zoom,
  onHandleDown,
  onRotateDown,
}: {
  element: CanvasElement;
  zoom: number;
  onHandleDown: (e: React.PointerEvent, handle: HandleDir) => void;
  onRotateDown: (e: React.PointerEvent) => void;
}) {
  const { width: w, height: h } = element;
  const hw = HANDLE_SIZE / zoom;
  const rotHandleY = -ROTATION_HANDLE_OFFSET / zoom;

  return (
    <>
      {/* Selection border */}
      <div
        style={{
          position: "absolute",
          inset: -1 / zoom,
          border: `${1.5 / zoom}px solid #2563EB`,
          pointerEvents: "none",
          borderRadius:
            element.type === "shape" &&
            (element as ShapeCanvasElement).shapeType === "circle"
              ? "50%"
              : 2 / zoom,
        }}
      />
      {/* Dimension badge */}
      <div
        style={{
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
          pointerEvents: "none",
        }}
      >
        {Math.round(element.width)} × {Math.round(element.height)}
      </div>
      {/* Rotation handle line */}
      <div
        style={{
          position: "absolute",
          left: w / 2 - 0.5 / zoom,
          top: -ROTATION_HANDLE_OFFSET / zoom,
          width: 1 / zoom,
          height: ROTATION_HANDLE_OFFSET / zoom,
          background: "rgba(37,99,235,0.6)",
          pointerEvents: "none",
        }}
      />
      {/* Rotation handle */}
      <div
        style={{
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
          boxShadow: `0 0 ${4 / zoom}px rgba(0,0,0,0.4)`,
        }}
        onPointerDown={onRotateDown}
        title="Rotate"
      >
        <RotateCcw size={7 / zoom} color="#2563EB" />
      </div>
      {/* Resize handles */}
      {HANDLES.map((dir) => {
        const pos = getHandlePos(dir, w, h);
        return (
          <div
            key={dir}
            style={{
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
              boxShadow: `0 0 ${3 / zoom}px rgba(0,0,0,0.3)`,
            }}
            onPointerDown={(e) => onHandleDown(e, dir)}
          />
        );
      })}
    </>
  );
}

// ─── Keyed wrapper: re-mounts AdCanvas when renderKey changes (template apply) ─
export function AdCanvasKeyedWrapper() {
  const renderKey = useAdCreatorStore((s) => s.renderKey);
  console.log("[AdCanvasKeyedWrapper] renderKey:", renderKey);
  return <AdCanvas key={`canvas-${renderKey}`} />;
}

// ─── Main Canvas ──────────────────────────────────────────────────────────────
export function AdCanvas() {
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

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const updateElement = useAdCreatorStore((s) => s.updateElement);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Interaction state (refs to avoid stale closures)
  const dragState = useRef<{
    type: "move" | "resize" | "rotate" | "pan" | "marquee" | null;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    elementId: string;
    handle: HandleDir | null;
    originalPos: { x: number; y: number; width: number; height: number }[];
    startPan: { x: number; y: number };
    startAngle: number;
    startRotation: number;
    elemCenter: { x: number; y: number };
    aspectRatio: number;
    shiftDown: boolean;
  }>({
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
    shiftDown: false,
  });

  const [isSpaceDown, setIsSpaceDown] = useState(false);
  const [activeCursor, setActiveCursor] = useState("default");
  const [guides, setGuides] = useState<Guide[]>([]);
  const [marquee, setMarquee] = useState<Marquee | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number | null>(null);

  // ── Utility: canvas coords from client coords ──────────────────────────────
  const clientToCanvas = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width / 2 + panX;
      const cy = rect.height / 2 + panY;
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      return {
        x: (offsetX - cx) / zoom + canvasSize.width / 2,
        y: (offsetY - cy) / zoom + canvasSize.height / 2,
      };
    },
    [panX, panY, zoom, canvasSize],
  );

  // ── Snap guides computation ────────────────────────────────────────────────
  const computeGuides = useCallback(
    (movingId: string, x: number, y: number, w: number, h: number) => {
      const newGuides: Guide[] = [];
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
          el.y + el.height,
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
    [elements, canvasSize],
  );

  // ── Element pointer down (start drag/move) ─────────────────────────────────
  const onElementPointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
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
        const sel = elements.find((x) => x.id === sid)!;
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
        shiftDown: e.shiftKey,
      };
      saveHistory();
      setActiveCursor("move");
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [elements, selectedIds, selectElement, clientToCanvas, saveHistory],
  );

  // ── Handle pointer down (resize) ───────────────────────────────────────────
  const onHandlePointerDown = useCallback(
    (e: React.PointerEvent, id: string, handle: HandleDir) => {
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
        shiftDown: e.shiftKey,
      };
      saveHistory();
      setActiveCursor(getCursorForHandle(handle));
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [elements, clientToCanvas, saveHistory],
  );

  // ── Rotation pointer down ──────────────────────────────────────────────────
  const onRotatePointerDown = useCallback(
    (e: React.PointerEvent, id: string) => {
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
        shiftDown: e.shiftKey,
      };
      saveHistory();
      setActiveCursor("grab");
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [elements, clientToCanvas, saveHistory],
  );

  // ── Canvas pointer down (pan or marquee) ───────────────────────────────────
  const onCanvasPointerDown = useCallback(
    (e: React.PointerEvent) => {
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
          startPan: { x: panX, y: panY },
        };
        setActiveCursor("grabbing");
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        return;
      }

      deselectAll();
      dragState.current = {
        ...dragState.current,
        type: "marquee",
        startX: pos.x,
        startY: pos.y,
        lastX: pos.x,
        lastY: pos.y,
      };
      setMarquee({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [isSpaceDown, contextMenu, deselectAll, clientToCanvas, panX, panY],
  );

  // ── Pointer move ───────────────────────────────────────────────────────────
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
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
        setMarquee((prev) =>
          prev ? { ...prev, endX: pos.x, endY: pos.y } : null,
        );
        return;
      }

      if (ds.type === "move") {
        const pos = clientToCanvas(e.clientX, e.clientY);
        const dx = pos.x - ds.startX;
        const dy = pos.y - ds.startY;
        const movingIds = selectedIds.includes(ds.elementId)
          ? selectedIds
          : [ds.elementId];

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
        const handle = ds.handle!;
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
        setRotationAngle(Math.round(((newRot % 360) + 360) % 360));
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
      setPan,
    ],
  );

  // ── Pointer up ─────────────────────────────────────────────────────────────
  const onPointerUp = useCallback(
    (_e: React.PointerEvent) => {
      const ds = dragState.current;

      if (ds.type === "marquee" && marquee) {
        const minX = Math.min(marquee.startX, marquee.endX);
        const maxX = Math.max(marquee.startX, marquee.endX);
        const minY = Math.min(marquee.startY, marquee.endY);
        const maxY = Math.max(marquee.startY, marquee.endY);
        if (maxX - minX > 4 || maxY - minY > 4) {
          const enclosed = elements.filter(
            (el) =>
              el.visible &&
              !el.locked &&
              el.x >= minX &&
              el.x + el.width <= maxX &&
              el.y >= minY &&
              el.y + el.height <= maxY,
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
    [marquee, elements, selectElement, isSpaceDown],
  );

  // ── Wheel zoom / pan ───────────────────────────────────────────────────────
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const delta = -e.deltaY * 0.001;
        setZoom(Math.max(0.1, Math.min(4, zoom + delta * zoom)));
      } else {
        setPan(panX - e.deltaX, panY - e.deltaY);
      }
    },
    [zoom, panX, panY, setZoom, setPan],
  );

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
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
        if ((e.key === "z" && e.shiftKey) || e.key === "y") {
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
          const visibleIds = elements
            .filter((x) => x.visible && !x.locked)
            .map((x) => x.id);
          visibleIds.forEach((id, i) => selectElement(id, i > 0));
        }
      }
      if (e.key === "Escape") deselectAll();

      // Arrow nudge
      const nudge = e.shiftKey ? 10 : 1;
      const dx =
        e.key === "ArrowRight" ? nudge : e.key === "ArrowLeft" ? -nudge : 0;
      const dy =
        e.key === "ArrowDown" ? nudge : e.key === "ArrowUp" ? -nudge : 0;
      if ((dx || dy) && selectedIds.length) {
        e.preventDefault();
        for (const id of selectedIds) {
          const el = elements.find((x) => x.id === id);
          if (el && !el.locked) moveElement(id, el.x + dx, el.y + dy);
        }
      }

      // Layer order
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
    const onKeyUp = (e: KeyboardEvent) => {
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
    reorderLayer,
  ]);

  // ── Context menu actions ───────────────────────────────────────────────────
  const handleContextAction = useCallback(
    (action: string, id: string) => {
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
            useAdCreatorStore
              .getState()
              .updateElement(id, { locked: !el.locked });
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
      reorderLayer,
    ],
  );

  // ── Right-click context menu ───────────────────────────────────────────────
  const onElementContextMenu = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();
      setContextMenu({ x: e.clientX, y: e.clientY, elementId: id });
    },
    [],
  );

  // ── Fit to screen ─────────────────────────────────────────────────────────
  const fitToScreen = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const padX = 80;
    const padY = 80;
    const fz = Math.min(
      (rect.width - padX * 2) / canvasSize.width,
      (rect.height - padY * 2) / canvasSize.height,
    );
    setZoom(Math.max(0.1, Math.min(4, fz)));
    setPan(0, 0);
  }, [canvasSize, setZoom, setPan]);

  // Canvas transform
  const canvasTransform = useMemo(() => {
    return `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${zoom})`;
  }, [panX, panY, zoom]);

  // Visible elements (sorted by z-order = elements array order)
  const visibleElements = useMemo(
    () => elements.filter((el) => el.visible),
    [elements],
  );

  const isEmpty = elements.length === 0;

  // Commit inline text edit
  const commitTextEdit = useCallback(
    (id: string, text: string) => {
      updateElement(id, { content: text } as Partial<CanvasElement>);
      setEditingId(null);
    },
    [updateElement],
  );

  return (
    <div
      ref={containerRef}
      className="relative flex-1 overflow-hidden select-none"
      style={{
        background: "#070B14",
        cursor: isSpaceDown
          ? activeCursor
          : activeCursor === "default"
            ? undefined
            : activeCursor,
        backgroundImage: gridVisible
          ? "radial-gradient(circle, #1e293b 1px, transparent 1px)"
          : "radial-gradient(circle, rgba(30,41,59,0.6) 1px, transparent 1px)",
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        backgroundPosition: `calc(50% + ${panX}px) calc(50% + ${panY}px)`,
      }}
      onPointerDown={onCanvasPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      onContextMenu={(e) => e.preventDefault()}
      data-ocid="ad_canvas"
    >
      {/* Canvas surface */}
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: canvasSize.width,
          height: canvasSize.height,
          transform: canvasTransform,
          transformOrigin: "center center",
          background: "white",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(37,99,235,0.08)",
          transition: dragState.current.type
            ? undefined
            : "transform 0.15s ease",
          overflow: "hidden",
        }}
        data-ocid="ad_canvas.surface"
      >
        {/* Elements — rendered directly without AnimatePresence opacity:0 initial to avoid stuck-invisible bug */}
        {visibleElements.map((element, _elIdx) => {
          const isSelected = selectedIds.includes(element.id);
          return (
            <div
              key={element.id}
              data-element-id={element.id}
              style={{
                position: "absolute",
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                opacity: element.opacity,
                transform: `rotate(${element.rotation}deg)`,
                transformOrigin: "center center",
                willChange: "transform",
                cursor: element.locked
                  ? "not-allowed"
                  : isSelected
                    ? "move"
                    : "pointer",
                zIndex: isSelected ? 100 : visibleElements.length - _elIdx,
              }}
              onPointerDown={(e) =>
                !element.locked &&
                editingId !== element.id &&
                onElementPointerDown(e, element.id)
              }
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (element.type === "text" && !element.locked) {
                  setEditingId(element.id);
                  selectElement(element.id);
                }
              }}
              onContextMenu={(e) => onElementContextMenu(e, element.id)}
              data-ocid={`ad_canvas.element.${element.id}`}
            >
              <CanvasElementRenderer
                element={element}
                isSelected={isSelected}
              />
              {editingId === element.id && element.type === "text" && (
                <InlineTextEditor
                  element={element as TextCanvasElement}
                  zoom={zoom}
                  onCommit={(text) => commitTextEdit(element.id, text)}
                />
              )}

              {/* Selection handles */}
              {isSelected && !element.locked && (
                <SelectionHandles
                  element={element}
                  zoom={zoom}
                  onHandleDown={(e, handle) =>
                    onHandlePointerDown(e, element.id, handle)
                  }
                  onRotateDown={(e) => onRotatePointerDown(e, element.id)}
                />
              )}
            </div>
          );
        })}

        {/* Snap guides (inside canvas surface) */}
        {guides.map((g, _i) =>
          g.type === "x" ? (
            <div
              key={`gx-${g.value}`}
              style={{
                position: "absolute",
                left: g.value,
                top: 0,
                width: 1 / zoom,
                height: canvasSize.height,
                background: "rgba(37,99,235,0.8)",
                pointerEvents: "none",
                zIndex: 999,
              }}
            />
          ) : (
            <div
              key={`gy-${g.value}`}
              style={{
                position: "absolute",
                left: 0,
                top: g.value,
                width: canvasSize.width,
                height: 1 / zoom,
                background: "rgba(37,99,235,0.8)",
                pointerEvents: "none",
                zIndex: 999,
              }}
            />
          ),
        )}

        {/* Marquee selection */}
        {marquee && (
          <div
            style={{
              position: "absolute",
              left: Math.min(marquee.startX, marquee.endX),
              top: Math.min(marquee.startY, marquee.endY),
              width: Math.abs(marquee.endX - marquee.startX),
              height: Math.abs(marquee.endY - marquee.startY),
              border: `${1 / zoom}px dashed #2563EB`,
              background: "rgba(37,99,235,0.07)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          />
        )}

        {/* Empty state */}
        {isEmpty && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
              color: "rgba(0,0,0,0.25)",
              pointerEvents: "none",
            }}
            data-ocid="ad_canvas.empty_state"
          >
            <AlignCenter size={40} style={{ opacity: 0.3 }} />
            <p style={{ fontSize: 14, fontFamily: "Inter, sans-serif" }}>
              Click to add elements, or use the left panel
            </p>
          </div>
        )}
      </div>

      {/* Debug overlay — element count + layer count */}
      <div
        className="absolute top-3 right-3 z-30 flex items-center gap-2 pointer-events-none"
        data-ocid="ad_canvas.debug_overlay"
      >
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono border border-white/10"
          style={{
            background: "rgba(17,24,39,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="text-white/30">■</span>
          <span className="text-white/50">{elements.length} el</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">{layers.length} layers</span>
          <span className="text-white/20">·</span>
          <span className="text-white/50">{Math.round(zoom * 100)}%</span>
        </div>
      </div>
      <AnimatePresence>
        {rotationAngle !== null && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div
              className="px-3 py-1.5 rounded-lg text-sm font-bold text-white"
              style={{
                background: "rgba(37,99,235,0.95)",
                backdropFilter: "blur(8px)",
              }}
            >
              {rotationAngle}°
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom controls — bottom left */}
      <div
        className="absolute bottom-4 left-4 flex items-center gap-1.5 z-30"
        data-ocid="ad_canvas.zoom_controls"
      >
        <button
          type="button"
          onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
          className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          style={{
            background: "rgba(17,24,39,0.9)",
            backdropFilter: "blur(12px)",
          }}
          title="Zoom out"
          data-ocid="ad_canvas.zoom_out_button"
        >
          <ZoomOut size={13} />
        </button>
        <button
          type="button"
          onClick={() => setZoom(Math.min(4, zoom + 0.1))}
          className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          style={{
            background: "rgba(17,24,39,0.9)",
            backdropFilter: "blur(12px)",
          }}
          title="Zoom in"
          data-ocid="ad_canvas.zoom_in_button"
        >
          <ZoomIn size={13} />
        </button>
        <div
          className="px-2.5 py-1 rounded-lg border border-white/10 text-white/70 text-xs font-mono min-w-[52px] text-center"
          style={{
            background: "rgba(17,24,39,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          {Math.round(zoom * 100)}%
        </div>
        <button
          type="button"
          onClick={fitToScreen}
          className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          style={{
            background: "rgba(17,24,39,0.9)",
            backdropFilter: "blur(12px)",
          }}
          title="Fit to screen"
          data-ocid="ad_canvas.fit_button"
        >
          <Maximize2 size={13} />
        </button>
        <button
          type="button"
          onClick={() => setZoom(1)}
          className="px-2 h-7 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs"
          style={{
            background: "rgba(17,24,39,0.9)",
            backdropFilter: "blur(12px)",
          }}
          title="Reset zoom"
          data-ocid="ad_canvas.reset_zoom_button"
        >
          1:1
        </button>
      </div>

      {/* Canvas size badge — bottom right */}
      <div className="absolute bottom-4 right-4 z-30">
        <div
          className="px-2.5 py-1 rounded-lg border border-white/10 text-white/40 text-[11px] font-mono"
          style={{
            background: "rgba(17,24,39,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          {canvasSize.width} × {canvasSize.height} · {canvasSize.name}
        </div>
      </div>

      {/* Keyboard hints — bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg border border-white/8 text-white/25 text-[10px]"
          style={{
            background: "rgba(17,24,39,0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span>Space + drag to pan</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Ctrl+scroll to zoom</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Del to remove</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Shift+resize = aspect ratio</span>
        </div>
      </div>

      {/* Context menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            menu={contextMenu}
            onAction={handleContextAction}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
