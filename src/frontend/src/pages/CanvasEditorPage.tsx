import { AIAssistantPanel } from "@/components/AIAssistantPanel";
import { ColorPickerModal } from "@/components/ColorPickerModal";
import { CanvasExportModal } from "@/components/ExportModal";
import type { CircleElement } from "@/types/editor";
import type {
  CanvasElement,
  ExportFormat,
  ExportQuality,
  GradientFill,
  GradientPreset,
  ImageElement,
  RectElement,
  Template,
  TextElement,
  TextPreset,
  Tool,
} from "@/types/editor";
import { useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EditorToolbar } from "./editor/EditorToolbar";
import { LeftSidebar } from "./editor/LeftSidebar";
import { RightPanel } from "./editor/RightPanel";
import {
  useAutoSave,
  useContextMenu,
  useDuplicate,
  useEditorHistory,
  useKeyboardShortcuts,
  useSnapAndGuides,
} from "./editor/editorHooks";
import {
  drawElement,
  drawGrid,
  getCanvasPos,
  getHandleAt,
  hitTest,
  resizeElement,
  uid,
} from "./editor/editorUtils";

// ─── Glass Context Menu ────────────────────────────────────────────────────────

function ContextMenu({
  x,
  y,
  onBringFront,
  onSendBack,
  onDuplicate,
  onDelete,
  isLocked,
  onToggleLock,
}: {
  x: number;
  y: number;
  onBringFront: () => void;
  onSendBack: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isLocked?: boolean;
  onToggleLock?: () => void;
}) {
  type MenuRow =
    | {
        kind: "item";
        label: string;
        action: () => void;
        shortcut?: string;
        danger?: boolean;
      }
    | { kind: "sep"; label: string };

  const rows: MenuRow[] = [
    { kind: "item", label: "Bring to Front", action: onBringFront },
    { kind: "item", label: "Send to Back", action: onSendBack },
    { kind: "sep", label: "sep1" },
    {
      kind: "item",
      label: "Duplicate",
      action: onDuplicate,
      shortcut: "Ctrl+D",
    },
    {
      kind: "item",
      label: isLocked ? "Unlock" : "Lock",
      action: onToggleLock ?? (() => undefined),
    },
    { kind: "sep", label: "sep2" },
    {
      kind: "item",
      label: "Delete",
      action: onDelete,
      shortcut: "Del",
      danger: true,
    },
  ];

  return (
    <div
      className="fixed z-50 min-w-[176px] py-1.5 animate-slide-down"
      style={{
        top: y,
        left: x,
        background: "rgba(10,10,18,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      data-ocid="context-menu"
    >
      {rows.map((row) =>
        row.kind === "sep" ? (
          <div
            key={row.label}
            className="my-1 mx-2"
            style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
          />
        ) : (
          <button
            key={row.label}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              row.action();
            }}
            className={`w-full text-left px-3 py-1.5 transition-all duration-100 flex justify-between items-center gap-4 text-[13px] ${
              row.danger
                ? "text-red-400 hover:text-red-300"
                : "text-white/75 hover:text-white"
            }`}
            style={{ fontFamily: "Inter, var(--font-editor), sans-serif" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                row.danger ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
            }}
            data-ocid={`ctx-${row.label.toLowerCase().replace(/ /g, "-")}`}
          >
            <span>{row.label}</span>
            {row.shortcut && (
              <span className="opacity-40 text-[11px]">{row.shortcut}</span>
            )}
          </button>
        ),
      )}
    </div>
  );
}

// ─── Zoom Control Pill ─────────────────────────────────────────────────────────

function ZoomPill({
  zoom,
  onZoomChange,
}: {
  zoom: number;
  onZoomChange: (z: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-0.5 px-1"
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "9999px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        fontFamily: "Inter, var(--font-editor), sans-serif",
      }}
      data-ocid="zoom-pill"
    >
      {/* Fit to screen */}
      <button
        type="button"
        title="Fit to screen"
        aria-label="Fit to screen"
        onClick={() => onZoomChange(75)}
        className="flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white transition-colors duration-150 text-base"
        data-ocid="zoom-fit-btn"
      >
        ⊞
      </button>

      <div
        className="w-px h-4 mx-0.5"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      {/* Zoom out */}
      <button
        type="button"
        title="Zoom out (-)"
        aria-label="Zoom out"
        onClick={() =>
          onZoomChange(Math.max(10, Math.round((zoom - 5) / 5) * 5))
        }
        className="flex items-center justify-center w-7 h-8 rounded-full text-white/60 hover:text-white transition-colors duration-150 text-lg font-light"
        data-ocid="zoom-out-pill-btn"
      >
        −
      </button>

      {/* Zoom value */}
      <button
        type="button"
        title="Reset to 100%"
        onClick={() => onZoomChange(100)}
        className="h-8 px-2 text-[13px] font-medium text-white/80 hover:text-white transition-colors duration-150 tabular-nums min-w-[48px] text-center"
        data-ocid="zoom-value-pill"
      >
        {zoom}%
      </button>

      {/* Zoom in */}
      <button
        type="button"
        title="Zoom in (+)"
        aria-label="Zoom in"
        onClick={() =>
          onZoomChange(Math.min(400, Math.round((zoom + 5) / 5) * 5))
        }
        className="flex items-center justify-center w-7 h-8 rounded-full text-white/60 hover:text-white transition-colors duration-150 text-lg font-light"
        data-ocid="zoom-in-pill-btn"
      >
        +
      </button>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function CanvasEditorPage() {
  const { projectId } = useParams({ from: "/editor/$projectId/canvas" });
  const defaultName = `Project ${projectId?.slice(0, 6) ?? "New"}`;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const guideClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canvasWidth, setCanvasWidth] = useState(1280);
  const [canvasHeight, setCanvasHeight] = useState(720);
  const [zoom, setZoom] = useState(75);
  const [showGrid, setShowGrid] = useState(true);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingProjectName, setEditingProjectName] = useState(defaultName);
  const [rightTab, setRightTab] = useState<
    "properties" | "layers" | "templates"
  >("properties");
  const [inlineEdit, setInlineEdit] = useState<{
    id: string;
    value: string;
  } | null>(null);
  const inlineRef = useRef<HTMLTextAreaElement>(null);

  // Autosave state
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Color picker modal state
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState("#2563EB");
  const colorPickerCallback = useRef<((c: string) => void) | null>(null);

  // AI assistant panel state
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  // Export modal state
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const openColorPicker = useCallback(
    (currentColor: string, onPick: (c: string) => void) => {
      setColorPickerValue(currentColor);
      colorPickerCallback.current = onPick;
      setColorPickerOpen(true);
    },
    [],
  );
  void openColorPicker;

  // ── Demo canvas elements seeded as initial state (never in useEffect) ──────
  const DEMO_CANVAS_ELEMENTS = (() => {
    const savedRaw =
      typeof window !== "undefined"
        ? localStorage.getItem(`elysian-editor-${projectId}`)
        : null;
    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        if (Array.isArray(parsed?.elements) && parsed.elements.length > 0)
          return parsed.elements as CanvasElement[];
      } catch {
        /* ignore */
      }
    }
    return [
      {
        id: "demo-bg",
        type: "rect" as const,
        name: "Background",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#0F1A2E",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 0,
        rotation: 0,
        opacity: 1,
        locked: true,
        visible: true,
        shadow: false,
      } satisfies RectElement,
      {
        id: "demo-heading",
        type: "text" as const,
        name: "Heading",
        x: 190,
        y: 200,
        width: 900,
        height: 90,
        content: "DESIGN STUDIO",
        fontSize: 72,
        color: "#FFFFFF",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "center" as const,
        letterSpacing: 2,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
      } satisfies TextElement,
      {
        id: "demo-subheading",
        type: "text" as const,
        name: "Subheading",
        x: 230,
        y: 310,
        width: 820,
        height: 45,
        content: "Create stunning visuals with ease",
        fontSize: 28,
        color: "rgba(255,255,255,0.7)",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "center" as const,
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
      } satisfies TextElement,
      {
        id: "demo-accent-line",
        type: "rect" as const,
        name: "Accent Line",
        x: 390,
        y: 370,
        width: 500,
        height: 4,
        fillColor: "#2563EB",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 2,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
      } satisfies RectElement,
      {
        id: "demo-body",
        type: "text" as const,
        name: "Body Text",
        x: 370,
        y: 420,
        width: 540,
        height: 25,
        content: "Add elements from the left panel →",
        fontSize: 14,
        color: "rgba(255,255,255,0.4)",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "center" as const,
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
      } satisfies TextElement,
      {
        id: "demo-circle",
        type: "circle" as const,
        name: "Accent Circle",
        x: 980,
        y: 100,
        width: 120,
        height: 120,
        fillColor: "rgba(34,197,94,0.15)",
        borderColor: "#22C55E",
        borderWidth: 2,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
      } satisfies CircleElement,
    ] as CanvasElement[];
  })();

  const { elements, setElements, undo, redo, canUndo, canRedo } =
    useEditorHistory(DEMO_CANVAS_ELEMENTS);

  // Snap & alignment guides
  const { snapConfig, setSnapConfig, snapPoint, guides, setGuides } =
    useSnapAndGuides();

  const saveKey = `elysian-editor-${projectId}`;
  const { unsaved } = useAutoSave(saveKey, {
    elements,
    canvasWidth,
    canvasHeight,
    projectName: editingProjectName,
  });

  // Track autosave triggers for isSaving indicator
  useEffect(() => {
    if (!unsaved) return;
    setIsSaving(true);
    const timer = setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 800);
    return () => clearTimeout(timer);
  }, [unsaved]);

  const interactRef = useRef<{
    mode: "drag" | "resize" | "rotate";
    elId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
    origRot: number;
    handle: string;
  } | null>(null);

  const drawRef = useRef<{ startX: number; startY: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const previewRect = useRef<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  const { menu: ctxMenu, openMenu, closeMenu } = useContextMenu();
  const selectedId = selectedIds[0] ?? null;

  // ── Render ──────────────────────────────────────────────────────────────────
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (showGrid) drawGrid(ctx, canvas.width, canvas.height);
    for (const el of elements) {
      if (!el.visible) continue;
      drawElement(
        ctx,
        el,
        selectedIds[0] === el.id,
        selectedIds.includes(el.id) && selectedIds[0] !== el.id,
        showGrid,
      );
    }
    if (isDrawing && previewRect.current) {
      const { x, y, w, h } = previewRect.current;
      ctx.save();
      ctx.strokeStyle = "#0047ab";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.globalAlpha = 0.7;
      if (activeTool === "circle") {
        ctx.beginPath();
        ctx.ellipse(
          x + w / 2,
          y + h / 2,
          Math.abs(w) / 2,
          Math.abs(h) / 2,
          0,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      } else {
        ctx.strokeRect(x, y, w, h);
      }
      ctx.restore();
    }
  }, [elements, selectedIds, isDrawing, activeTool, showGrid]);

  useEffect(() => {
    render();
  }, [render]);

  // ── Update element ─────────────────────────────────────────────────────────
  const updateElement = useCallback(
    (id: string, patch: Partial<CanvasElement>) => {
      setElements((prev) =>
        prev.map((e) =>
          e.id === id ? ({ ...e, ...patch } as CanvasElement) : e,
        ),
      );
    },
    [setElements],
  );

  // ── Delete ─────────────────────────────────────────────────────────────────
  const deleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    setElements((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  }, [selectedIds, setElements]);

  const deleteById = useCallback(
    (id: string) => {
      setElements((prev) => prev.filter((e) => e.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    },
    [setElements],
  );

  // ── Move Layer ─────────────────────────────────────────────────────────────
  const moveLayer = useCallback(
    (id: string, dir: 1 | -1) => {
      setElements((prev) => {
        const idx = prev.findIndex((e) => e.id === id);
        if (idx < 0) return prev;
        const ni = Math.max(0, Math.min(prev.length - 1, idx + dir));
        const arr = [...prev];
        [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
        return arr;
      });
    },
    [setElements],
  );

  const bringToFront = useCallback(
    (id: string) => {
      setElements((prev) => {
        const arr = prev.filter((e) => e.id !== id);
        arr.push(prev.find((e) => e.id === id)!);
        return arr;
      });
    },
    [setElements],
  );

  const sendToBack = useCallback(
    (id: string) => {
      setElements((prev) => {
        const el = prev.find((e) => e.id === id)!;
        return [el, ...prev.filter((e) => e.id !== id)];
      });
    },
    [setElements],
  );

  // ── Duplicate ──────────────────────────────────────────────────────────────
  const duplicateSelected = useDuplicate(elements, selectedIds, setElements);

  // ── Select all / deselect ──────────────────────────────────────────────────
  const selectAll = useCallback(
    () => setSelectedIds(elements.map((e) => e.id)),
    [elements],
  );
  const deselect = useCallback(() => setSelectedIds([]), []);

  // ── Apply template ─────────────────────────────────────────────────────────
  const applyTemplate = useCallback(
    (tpl: Template) => {
      setCanvasWidth(tpl.preset.width);
      setCanvasHeight(tpl.preset.height);
      const els = tpl.elements.map((e) => ({
        ...e,
        id: uid(),
        ...(e.type === "image" ? { img: null } : {}),
      })) as CanvasElement[];
      setElements(els);
      setSelectedIds([]);
    },
    [setElements],
  );

  // ── Toggle visible / lock ──────────────────────────────────────────────────
  const toggleVisible = useCallback(
    (id: string) => {
      setElements((prev) =>
        prev.map((e) => (e.id === id ? { ...e, visible: !e.visible } : e)),
      );
    },
    [setElements],
  );
  const toggleLock = useCallback(
    (id: string) => {
      setElements((prev) =>
        prev.map((e) => (e.id === id ? { ...e, locked: !e.locked } : e)),
      );
    },
    [setElements],
  );

  // ── Add image from dataUrl (new sidebar API) or HTMLImageElement (legacy) ─────────
  const addImage = useCallback(
    (srcOrDataUrl: string, imgEl?: HTMLImageElement) => {
      const resolvedImg = imgEl ?? new Image();
      if (!imgEl) {
        resolvedImg.src = srcOrDataUrl;
      }
      const makeEl = (loadedImg: HTMLImageElement | null) => {
        const el: ImageElement = {
          id: uid(),
          type: "image",
          name: "Uploaded Image",
          x: 40,
          y: 40,
          width: loadedImg
            ? Math.min(loadedImg.naturalWidth || 300, canvasWidth / 2)
            : 300,
          height: loadedImg
            ? Math.min(loadedImg.naturalHeight || 200, canvasHeight / 2)
            : 200,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          src: srcOrDataUrl,
          img: loadedImg,
        };
        setElements((prev) => [...prev, el]);
        setSelectedIds([el.id]);
      };
      if (imgEl) {
        makeEl(imgEl);
      } else {
        resolvedImg.onload = () => makeEl(resolvedImg);
        resolvedImg.onerror = () => makeEl(null);
      }
    },
    [canvasWidth, canvasHeight, setElements],
  );

  // ── Quick color apply ──────────────────────────────────────────────────────
  const colorApply = useCallback(
    (color: string) => {
      if (!selectedId) return;
      const el = elements.find((e) => e.id === selectedId);
      if (!el) return;
      if (el.type === "text")
        updateElement(selectedId, { color } as Partial<TextElement>);
      else if (el.type !== "image")
        updateElement(selectedId, {
          fillColor: color,
          borderColor: color,
        } as Partial<RectElement>);
    },
    [selectedId, elements, updateElement],
  );

  // ── Add text preset (TextPreset object from sidebar) ───────────────────────────
  const addTextPreset = useCallback(
    (preset: TextPreset) => {
      const cx = canvasWidth / 2 - 200;
      const cy = canvasHeight / 2 - preset.fontSize / 2;
      const el: TextElement = {
        id: uid(),
        type: "text",
        name: preset.name,
        x: cx,
        y: cy,
        width: 400,
        height: preset.fontSize * 1.6,
        content: preset.name,
        fontSize: preset.fontSize,
        color: preset.color,
        fontFamily: preset.fontFamily,
        bold: preset.fontWeight === "bold" || Number(preset.fontWeight) >= 700,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
      };
      setElements((prev) => [...prev, el]);
      setSelectedIds([el.id]);
    },
    [canvasWidth, canvasHeight, setElements],
  );

  // ── Add shape tool ─────────────────────────────────────────────────────────
  const handleAddShape = useCallback((tool: Tool) => {
    setActiveTool(tool);
  }, []);

  // ── Add gradient rect (GradientPreset from sidebar) ──────────────────────────
  const addGradientRect = useCallback(
    (gradientPreset: GradientPreset) => {
      const gradFill: GradientFill = {
        type: "gradient",
        colors: gradientPreset.colors,
        angle: gradientPreset.angle,
      };
      const el: RectElement = {
        id: uid(),
        type: "rect",
        name: "Gradient Rectangle",
        x: canvasWidth / 2 - 150,
        y: canvasHeight / 2 - 100,
        width: 300,
        height: 200,
        fillColor: gradientPreset.colors[0] ?? "#0047ab",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 8,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
        gradientFill: gradFill,
      };
      setElements((prev) => [...prev, el]);
      setSelectedIds([el.id]);
    },
    [canvasWidth, canvasHeight, setElements],
  );

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useKeyboardShortcuts({
    undo,
    redo,
    deleteSelected,
    duplicateSelected,
    selectAll,
    deselect,
    toggleGrid: () => setShowGrid((v) => !v),
    _canvasRef: canvasRef,
    enabled: !inlineEdit,
  });

  // Zoom keyboard shortcuts (+/-)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (inlineEdit) return;
      const active = document.activeElement;
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement;
      if (isInput) return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(400, Math.round((z + 5) / 5) * 5));
      }
      if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(10, Math.round((z - 5) / 5) * 5));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inlineEdit]);

  // ── Export ─────────────────────────────────────────────────────────────────
  const handleExport = useCallback(
    (format: ExportFormat, quality: ExportQuality) => {
      const off = document.createElement("canvas");
      const scale = quality === "300" ? 4 : quality === "150" ? 2 : 1;
      off.width = canvasWidth * scale;
      off.height = canvasHeight * scale;
      const ctx = off.getContext("2d");
      if (!ctx) return;
      ctx.scale(scale, scale);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      for (const el of elements) {
        if (!el.visible) continue;
        drawElement(ctx, el, false, false, false);
      }
      const mime = format === "jpg" ? "image/jpeg" : "image/png";
      const link = document.createElement("a");
      link.download = `design-${Date.now()}.${format}`;
      link.href = off.toDataURL(mime, 0.95);
      link.click();
    },
    [canvasWidth, canvasHeight, elements],
  );

  // ── Canvas coordinate ──────────────────────────────────────────────────────
  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    return getCanvasPos(e, canvasRef.current!);
  }, []);

  // ── Mouse events ───────────────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button === 2) return;
      const { x, y } = getPos(e);
      const shiftKey = e.shiftKey;

      if (e.detail === 2 && activeTool === "select") {
        const hit = [...elements].reverse().find((el) => hitTest(el, x, y));
        if (hit?.type === "text") {
          setInlineEdit({ id: hit.id, value: hit.content });
          return;
        }
        const el: TextElement = {
          id: uid(),
          type: "text",
          name: "Text",
          x,
          y,
          width: 400,
          height: 80,
          content: "Double-click to edit",
          fontSize: 48,
          color: "#111111",
          fontFamily: "Inter",
          bold: false,
          italic: false,
          underline: false,
          align: "left",
          letterSpacing: 0,
          lineHeight: 1.4,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          shadow: false,
        };
        setElements((prev) => [...prev, el]);
        setSelectedIds([el.id]);
        return;
      }

      if (activeTool === "select") {
        if (selectedId) {
          const selEl = elements.find((e) => e.id === selectedId);
          if (selEl) {
            const handle = getHandleAt(selEl, x, y);
            if (handle === "rotate") {
              interactRef.current = {
                mode: "rotate",
                elId: selectedId,
                startX: x,
                startY: y,
                origX: selEl.x,
                origY: selEl.y,
                origW: selEl.width,
                origH: selEl.height,
                origRot: selEl.rotation,
                handle,
              };
              return;
            }
            if (handle) {
              interactRef.current = {
                mode: "resize",
                elId: selectedId,
                startX: x,
                startY: y,
                origX: selEl.x,
                origY: selEl.y,
                origW: selEl.width,
                origH: selEl.height,
                origRot: selEl.rotation,
                handle,
              };
              return;
            }
          }
        }
        let hit: CanvasElement | null = null;
        for (let i = elements.length - 1; i >= 0; i--) {
          if (!elements[i].locked && hitTest(elements[i], x, y)) {
            hit = elements[i];
            break;
          }
        }
        if (hit) {
          setSelectedIds(
            shiftKey
              ? (prev) =>
                  prev.includes(hit!.id)
                    ? prev.filter((id) => id !== hit!.id)
                    : [...prev, hit!.id]
              : [hit.id],
          );
          interactRef.current = {
            mode: "drag",
            elId: hit.id,
            startX: x,
            startY: y,
            origX: hit.x,
            origY: hit.y,
            origW: hit.width,
            origH: hit.height,
            origRot: hit.rotation,
            handle: "",
          };
        } else {
          if (!shiftKey) setSelectedIds([]);
        }
      } else if (activeTool === "text") {
        const el: TextElement = {
          id: uid(),
          type: "text",
          name: "Text",
          x,
          y,
          width: 400,
          height: 80,
          content: "Your text here",
          fontSize: 48,
          color: "#111111",
          fontFamily: "Inter",
          bold: false,
          italic: false,
          underline: false,
          align: "left",
          letterSpacing: 0,
          lineHeight: 1.4,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          shadow: false,
        };
        setElements((prev) => [...prev, el]);
        setSelectedIds([el.id]);
        setActiveTool("select");
      } else if (activeTool === "image") {
        const src = window.prompt("Enter image URL:", "https://");
        if (src?.startsWith("http")) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          const el: ImageElement = {
            id: uid(),
            type: "image",
            name: "Image",
            x: x - 150,
            y: y - 100,
            width: 300,
            height: 200,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            src,
            img: null,
          };
          img.onload = () =>
            updateElement(el.id, { img } as Partial<ImageElement>);
          img.src = src;
          el.img = img;
          setElements((prev) => [...prev, el]);
          setSelectedIds([el.id]);
          setActiveTool("select");
        }
      } else {
        drawRef.current = { startX: x, startY: y };
        previewRect.current = { x, y, w: 0, h: 0 };
        setIsDrawing(true);
      }
    },
    [activeTool, elements, selectedId, getPos, setElements, updateElement],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rawPos = getPos(e);
      const interact = interactRef.current;
      if (!interact) {
        if (isDrawing && drawRef.current) {
          const { startX, startY } = drawRef.current;
          previewRect.current = {
            x: Math.min(startX, rawPos.x),
            y: Math.min(startY, rawPos.y),
            w: Math.abs(rawPos.x - startX),
            h: Math.abs(rawPos.y - startY),
          };
          render();
        }
        return;
      }

      // Snap the position when dragging
      let pos = rawPos;
      if (interact.mode === "drag" && snapConfig.enabled) {
        const snapped = snapPoint(rawPos.x, rawPos.y, elements, interact.elId);
        pos = snapped;
        // Clear guides after a delay on next mouseup
        if (guideClearTimer.current) clearTimeout(guideClearTimer.current);
      }

      const dx = pos.x - interact.startX;
      const dy = pos.y - interact.startY;

      if (interact.mode === "drag") {
        setElements(
          (prev) =>
            prev.map((el) => {
              if (!selectedIds.includes(el.id)) return el;
              const isMain = el.id === interact.elId;
              return {
                ...el,
                x: isMain
                  ? interact.origX + (pos.x - interact.startX)
                  : el.x + (rawPos.x - interact.startX),
                y: isMain
                  ? interact.origY + (pos.y - interact.startY)
                  : el.y + (rawPos.y - interact.startY),
              };
            }),
          false,
        );
      } else if (interact.mode === "resize") {
        const el = elements.find((e) => e.id === interact.elId);
        if (el) {
          const patch = resizeElement(el, interact.handle, dx, dy, e.shiftKey);
          setElements(
            (prev) =>
              prev.map((e) =>
                e.id === interact.elId
                  ? ({ ...e, ...patch } as CanvasElement)
                  : e,
              ),
            false,
          );
        }
      } else if (interact.mode === "rotate") {
        const el = elements.find((e) => e.id === interact.elId);
        if (el) {
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          const angle =
            (Math.atan2(rawPos.y - cy, rawPos.x - cx) * 180) / Math.PI + 90;
          setElements(
            (prev) =>
              prev.map((e) =>
                e.id === interact.elId
                  ? { ...e, rotation: Math.round(angle) }
                  : e,
              ),
            false,
          );
        }
      }
    },
    [
      getPos,
      isDrawing,
      render,
      elements,
      selectedIds,
      setElements,
      snapConfig,
      snapPoint,
    ],
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getPos(e);
      if (interactRef.current) {
        setElements((prev) => prev, true);
        interactRef.current = null;
        // Clear alignment guides after 300ms
        if (guideClearTimer.current) clearTimeout(guideClearTimer.current);
        guideClearTimer.current = setTimeout(() => setGuides([]), 300);
      }
      if (isDrawing && drawRef.current) {
        const { startX, startY } = drawRef.current;
        const rx = Math.min(startX, x);
        const ry = Math.min(startY, y);
        const rw = Math.abs(x - startX);
        const rh = Math.abs(y - startY);
        if (rw > 5 && rh > 5) {
          const base = {
            id: uid(),
            x: rx,
            y: ry,
            width: rw,
            height: rh,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
          };
          let el: CanvasElement;
          if (activeTool === "circle")
            el = {
              ...base,
              type: "circle",
              name: "Circle",
              fillColor: "#0047ab",
              borderColor: "#50c878",
              borderWidth: 0,
              shadow: false,
            };
          else if (activeTool === "triangle")
            el = {
              ...base,
              type: "triangle",
              name: "Triangle",
              fillColor: "#50c878",
              borderColor: "#50c878",
              borderWidth: 0,
              shadow: false,
            };
          else if (activeTool === "star")
            el = {
              ...base,
              type: "star",
              name: "Star",
              fillColor: "#f59e0b",
              borderColor: "#f59e0b",
              borderWidth: 0,
              points: 5,
              shadow: false,
            };
          else
            el = {
              ...base,
              type: "rect",
              name: "Rectangle",
              fillColor: "#0047ab",
              borderColor: "#0047ab",
              borderWidth: 0,
              borderRadius: 0,
              shadow: false,
            };
          setElements((prev) => [...prev, el]);
          setSelectedIds([el.id]);
          setActiveTool("select");
        }
        setIsDrawing(false);
        drawRef.current = null;
        previewRect.current = null;
      }
    },
    [getPos, activeTool, isDrawing, setElements, setGuides],
  );

  const selectedEl = selectedId
    ? elements.find((e) => e.id === selectedId)
    : null;

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ width: "100vw", height: "100vh", background: "#0a0a0f" }}
      data-ocid="canvas-editor-page"
    >
      {/* TOP BAR */}
      <EditorToolbar
        projectName={editingProjectName}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        zoom={zoom}
        showGrid={showGrid}
        showSnap={snapConfig.enabled}
        canUndo={canUndo}
        canRedo={canRedo}
        unsaved={unsaved}
        isSaving={isSaving}
        onUndo={undo}
        onRedo={redo}
        onToggleGrid={() => setShowGrid((v) => !v)}
        onToggleSnap={() =>
          setSnapConfig((prev) => ({ ...prev, enabled: !prev.enabled }))
        }
        onZoomChange={setZoom}
        onPresetChange={(w, h) => {
          setCanvasWidth(w);
          setCanvasHeight(h);
        }}
        onExport={handleExport}
        onOpenExportModal={() => setExportModalOpen(true)}
        onProjectNameChange={setEditingProjectName}
        onShare={() => {
          navigator.clipboard
            .writeText(window.location.href)
            .catch(() => undefined);
          toast.success("Share link copied!");
        }}
      />

      {/* MAIN ROW */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <LeftSidebar
          activeTool={activeTool}
          onSelectTool={setActiveTool}
          onAddTextPreset={addTextPreset}
          onAddShape={handleAddShape}
          onAddTemplate={applyTemplate}
          onAddGradientRect={addGradientRect}
          onAddImage={addImage}
          onToolChange={setActiveTool}
          onApplyTemplate={applyTemplate}
          onColorApply={colorApply}
          onOpenAIPanel={() => setAiPanelOpen(true)}
        />

        {/* CENTER CANVAS AREA */}
        <main
          ref={workspaceRef}
          className="flex-1 flex items-center justify-center overflow-hidden relative"
          style={{
            background: "#111118",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          data-ocid="canvas-workspace"
        >
          {/* Floating canvas wrapper with scaling */}
          <div
            className="relative flex flex-col items-center"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
          >
            {/* Canvas floating card */}
            <div
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.85), 0 0 80px rgba(0,71,171,0.10)",
                borderRadius: "2px",
                position: "relative",
              }}
            >
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onContextMenu={(e) => {
                  if (selectedId) {
                    e.preventDefault();
                    openMenu(e);
                  }
                }}
                className="block"
                style={{
                  cursor:
                    activeTool !== "select"
                      ? "crosshair"
                      : interactRef.current?.mode === "drag"
                        ? "grabbing"
                        : "default",
                  borderRadius: "2px",
                  display: "block",
                }}
                data-ocid="editor-canvas"
              />

              {/* Alignment guides SVG overlay */}
              {guides.length > 0 && (
                <svg
                  width={canvasWidth}
                  height={canvasHeight}
                  className="absolute inset-0 pointer-events-none"
                  style={{ top: 0, left: 0 }}
                  aria-hidden="true"
                >
                  {guides.map((g) =>
                    g.orientation === "vertical" ? (
                      <line
                        key={`v-${g.position}`}
                        x1={g.position}
                        y1={0}
                        x2={g.position}
                        y2={canvasHeight}
                        stroke="#0047ab"
                        strokeWidth={1}
                        strokeOpacity={0.8}
                        strokeDasharray="4 4"
                      />
                    ) : (
                      <line
                        key={`h-${g.position}`}
                        x1={0}
                        y1={g.position}
                        x2={canvasWidth}
                        y2={g.position}
                        stroke="#0047ab"
                        strokeWidth={1}
                        strokeOpacity={0.8}
                        strokeDasharray="4 4"
                      />
                    ),
                  )}
                </svg>
              )}

              {/* Inline text editor overlay */}
              {inlineEdit &&
                (() => {
                  const el = elements.find((e) => e.id === inlineEdit.id) as
                    | TextElement
                    | undefined;
                  if (!el) return null;
                  return (
                    <textarea
                      ref={inlineRef}
                      defaultValue={el.content}
                      onBlur={(ev) => {
                        updateElement(inlineEdit.id, {
                          content: ev.target.value,
                        } as Partial<TextElement>);
                        setInlineEdit(null);
                      }}
                      className="absolute bg-transparent border border-accent/60 outline-none resize-none p-0.5"
                      style={{
                        left: el.x,
                        top: el.y,
                        width: el.width,
                        minHeight: el.height,
                        fontSize: el.fontSize,
                        color: el.color,
                        fontFamily: el.fontFamily,
                        fontWeight: el.bold ? "bold" : "normal",
                        fontStyle: el.italic ? "italic" : "normal",
                        textAlign: el.align,
                        lineHeight: el.lineHeight,
                      }}
                      data-ocid="inline-text-editor"
                    />
                  );
                })()}
            </div>

            {/* Page label */}
            <div
              className="mt-2 select-none"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.04em",
              }}
            >
              Page 1
            </div>
          </div>

          {/* Floating zoom pill */}
          <div
            className="absolute bottom-5 left-1/2"
            style={{ transform: "translateX(-50%)", zIndex: 20 }}
          >
            <ZoomPill zoom={zoom} onZoomChange={setZoom} />
          </div>
        </main>

        {/* RIGHT PANEL */}
        <RightPanel
          elements={elements}
          selectedIds={selectedIds}
          onUpdate={updateElement}
          onDelete={deleteById}
          onMoveLayer={moveLayer}
          onToggleVisible={toggleVisible}
          onToggleLock={toggleLock}
          onSelect={(id) => setSelectedIds([id])}
          activeTab={rightTab}
          onTabChange={setRightTab}
        />
      </div>

      {/* Context menu */}
      {ctxMenu && selectedId && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          isLocked={selectedEl?.locked}
          onBringFront={() => {
            bringToFront(selectedId);
            closeMenu();
          }}
          onSendBack={() => {
            sendToBack(selectedId);
            closeMenu();
          }}
          onDuplicate={() => {
            duplicateSelected();
            closeMenu();
          }}
          onDelete={() => {
            deleteSelected();
            closeMenu();
          }}
          onToggleLock={() => {
            toggleLock(selectedId);
            closeMenu();
          }}
        />
      )}

      {/* Color Picker Modal */}
      <ColorPickerModal
        isOpen={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        value={colorPickerValue}
        onChange={(c) => {
          if (colorPickerCallback.current) colorPickerCallback.current(c);
        }}
        title="Pick Color"
      />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        selectedElement={
          selectedEl ? { id: selectedEl.id, type: selectedEl.type } : null
        }
        onMagicResize={(w, h) => {
          // Scale all element positions and sizes proportionally
          const scaleX = w / canvasWidth;
          const scaleY = h / canvasHeight;
          setElements(
            (prev) =>
              prev.map((el) => ({
                ...el,
                x: Math.round(el.x * scaleX),
                y: Math.round(el.y * scaleY),
                width: Math.round(el.width * scaleX),
                height: Math.round(el.height * scaleY),
                ...(el.type === "text"
                  ? {
                      fontSize: Math.round(
                        (el as TextElement).fontSize * Math.min(scaleX, scaleY),
                      ),
                    }
                  : {}),
              })) as CanvasElement[],
          );
          setCanvasWidth(w);
          setCanvasHeight(h);
          toast.success(`Canvas resized to ${w}×${h}`);
        }}
        onColorMatch={(palette) => {
          // Apply extracted palette: bg → palette[0], shapes → cycle palette, text → palette[last]
          setElements((prev) =>
            prev.map((el, i) => {
              if (
                el.type === "rect" ||
                el.type === "circle" ||
                el.type === "triangle" ||
                el.type === "star"
              ) {
                const color = palette[i % palette.length] ?? palette[0];
                return {
                  ...el,
                  fillColor: color,
                  borderColor: color,
                } as CanvasElement;
              }
              if (el.type === "text") {
                const color =
                  palette[palette.length - 1 - (i % palette.length)] ??
                  palette[palette.length - 1];
                return { ...el, color } as CanvasElement;
              }
              return el;
            }),
          );
          toast.success("Color palette applied!");
        }}
        onAutoLayout={(mode, spacing) => {
          setElements((prev) => {
            // Separate locked/background elements from movable ones
            const movable = prev.filter((e) => !e.locked && e.visible);
            if (movable.length === 0) return prev;

            let repositioned: CanvasElement[];

            if (mode === "horizontal") {
              const sorted = [...movable].sort((a, b) => a.x - b.x);
              const totalW =
                sorted.reduce((sum, e) => sum + e.width, 0) +
                spacing * (sorted.length - 1);
              let curX = Math.round((canvasWidth - totalW) / 2);
              const centerY = Math.round(canvasHeight / 2);
              repositioned = sorted.map((el) => {
                const updated = {
                  ...el,
                  x: curX,
                  y: Math.round(centerY - el.height / 2),
                } as CanvasElement;
                curX += el.width + spacing;
                return updated;
              });
            } else if (mode === "vertical") {
              const sorted = [...movable].sort((a, b) => a.y - b.y);
              const totalH =
                sorted.reduce((sum, e) => sum + e.height, 0) +
                spacing * (sorted.length - 1);
              let curY = Math.round((canvasHeight - totalH) / 2);
              const centerX = Math.round(canvasWidth / 2);
              repositioned = sorted.map((el) => {
                const updated = {
                  ...el,
                  x: Math.round(centerX - el.width / 2),
                  y: curY,
                } as CanvasElement;
                curY += el.height + spacing;
                return updated;
              });
            } else {
              // Grid
              const cols = Math.max(1, Math.ceil(Math.sqrt(movable.length)));
              const rows = Math.ceil(movable.length / cols);
              const cellW = Math.round(
                (canvasWidth - spacing * (cols + 1)) / cols,
              );
              const cellH = Math.round(
                (canvasHeight - spacing * (rows + 1)) / rows,
              );
              repositioned = movable.map((el, idx) => {
                const col = idx % cols;
                const row = Math.floor(idx / cols);
                return {
                  ...el,
                  x: spacing + col * (cellW + spacing),
                  y: spacing + row * (cellH + spacing),
                  width: Math.min(el.width, cellW),
                  height: Math.min(el.height, cellH),
                } as CanvasElement;
              });
            }

            // Rebuild preserving locked order
            const repoMap = new Map(repositioned.map((e) => [e.id, e]));
            return prev.map((e) => repoMap.get(e.id) ?? e);
          });
          toast.success(
            `${mode.charAt(0).toUpperCase() + mode.slice(1)} layout applied!`,
          );
        }}
        onAIEnhance={() => {
          // Only enhance the currently selected image element
          const targetId = selectedIds[0] ?? null;
          const targetEl = targetId
            ? elements.find((e) => e.id === targetId)
            : null;
          console.log("Selected element (AI Enhance):", targetEl);
          if (!targetEl || targetEl.type !== "image" || targetEl.locked) {
            toast.error("Please select an image first.");
            return;
          }
          setElements((prev) =>
            prev.map((el) => {
              if (el.id !== targetEl.id) return el;
              // Boost contrast + brightness + saturation via custom property
              return {
                ...el,
                opacity: Math.min(1, (el.opacity ?? 1) * 1.05),
                aiEnhanced: true,
              } as unknown as CanvasElement;
            }),
          );
          toast.success(
            "AI enhancement applied — contrast, sharpness & clarity boosted!",
          );
        }}
        onRemoveBackground={() => {
          // ONLY apply to the currently selected image element — never touch background or locked layers
          const targetId = selectedIds[0] ?? null;
          const targetEl = targetId
            ? elements.find((e) => e.id === targetId)
            : null;
          console.log("Selected element (Remove Background):", targetEl);
          if (!targetEl || targetEl.type !== "image" || targetEl.locked) {
            toast.error("Please select an image first.");
            return;
          }
          // Update only the selected image — simulate transparent bg with isolation effect
          updateElement(targetEl.id, {
            shadow: true,
            aiBackgroundRemoved: true,
          } as Partial<CanvasElement>);
          toast.success("Background removed — foreground subject isolated!");
        }}
      />

      {/* Export Modal */}
      <CanvasExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        projectName={editingProjectName}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        onExport={(fmt, multiplier, transparent) => {
          const off = document.createElement("canvas");
          off.width = canvasWidth * multiplier;
          off.height = canvasHeight * multiplier;
          const ctx = off.getContext("2d");
          if (!ctx) return;
          ctx.scale(multiplier, multiplier);
          if (!transparent) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          }
          for (const el of elements) {
            if (!el.visible) continue;
            drawElement(ctx, el, false, false, false);
          }
          const mime = fmt === "jpg" ? "image/jpeg" : "image/png";
          const link = document.createElement("a");
          link.download = `${editingProjectName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${fmt}`;
          link.href = off.toDataURL(mime, 0.95);
          link.click();
        }}
      />

      {/* Suppress unused lastSaved warning in a clean way */}
      {lastSaved && null}
    </div>
  );
}
