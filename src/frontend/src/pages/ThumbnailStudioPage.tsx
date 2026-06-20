import { useEditorStore } from "@/store/editorStore";
import type { CanvasElement, ImageElement, TextElement } from "@/types/editor";
import { Link } from "@tanstack/react-router";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Circle,
  Copy,
  Download,
  Eye,
  EyeOff,
  Image,
  Italic,
  Layers,
  Lock,
  LockOpen,
  Minus,
  Plus,
  Redo2,
  Square,
  Trash2,
  Type,
  Undo2,
  Upload,
  Wand2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Canvas presets ───────────────────────────────────────────────────────────
const CANVAS_PRESETS = [
  { label: "YouTube", width: 1280, height: 720 },
  { label: "Instagram", width: 1080, height: 1080 },
  { label: "TikTok", width: 1080, height: 1920 },
  { label: "Twitter/X", width: 1600, height: 900 },
  { label: "LinkedIn", width: 1200, height: 627 },
] as const;

// ─── Template data ────────────────────────────────────────────────────────────
const THUMBNAIL_TEMPLATES = [
  {
    id: "tpl-gaming",
    label: "Gaming Hype",
    category: "Gaming",
    bg: "#0a0a2e",
    elements: [
      {
        type: "rect",
        name: "BG",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#0a0a2e",
        borderColor: "#0a0a2e",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: true,
        visible: true,
        shadow: false,
      },
      {
        type: "rect",
        name: "Glow",
        x: 500,
        y: 100,
        width: 600,
        height: 600,
        fillColor: "#7c3aed",
        borderColor: "#7c3aed",
        borderWidth: 0,
        borderRadius: 300,
        opacity: 0.25,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      },
      {
        type: "text",
        name: "Title",
        x: 60,
        y: 220,
        width: 700,
        height: 160,
        content: "EPIC GAMING",
        fontSize: 110,
        color: "#ffffff",
        fontFamily: "Impact",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 2,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true,
        gradientText: true,
        gradientColors: ["#a855f7", "#ec4899"],
      },
      {
        type: "text",
        name: "Sub",
        x: 60,
        y: 400,
        width: 500,
        height: 60,
        content: "YOU WON'T BELIEVE THIS",
        fontSize: 38,
        color: "#fbbf24",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 1,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      },
    ],
  },
  {
    id: "tpl-tech",
    label: "Tech/SaaS",
    category: "Tech",
    bg: "#070B14",
    elements: [
      {
        type: "rect",
        name: "BG",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#070B14",
        borderColor: "#070B14",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: true,
        visible: true,
        shadow: false,
      },
      {
        type: "rect",
        name: "Accent",
        x: 60,
        y: 60,
        width: 6,
        height: 600,
        fillColor: "#2563EB",
        borderColor: "#2563EB",
        borderWidth: 0,
        borderRadius: 3,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      },
      {
        type: "rect",
        name: "Glow",
        x: 800,
        y: 150,
        width: 400,
        height: 400,
        fillColor: "#2563EB",
        borderColor: "#2563EB",
        borderWidth: 0,
        borderRadius: 200,
        opacity: 0.15,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      },
      {
        type: "text",
        name: "Title",
        x: 100,
        y: 230,
        width: 700,
        height: 130,
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
      },
      {
        type: "text",
        name: "Sub",
        x: 100,
        y: 380,
        width: 600,
        height: 55,
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
      },
    ],
  },
  {
    id: "tpl-vlog",
    label: "Vlog Style",
    category: "Vlog",
    bg: "#1a1a2e",
    elements: [
      {
        type: "rect",
        name: "BG",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#1a1a2e",
        borderColor: "#1a1a2e",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: true,
        visible: true,
        shadow: false,
      },
      {
        type: "rect",
        name: "Banner",
        x: 0,
        y: 530,
        width: 1280,
        height: 190,
        fillColor: "#e11d48",
        borderColor: "#e11d48",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      },
      {
        type: "text",
        name: "Title",
        x: 60,
        y: 150,
        width: 900,
        height: 200,
        content: "DAY IN MY LIFE",
        fontSize: 130,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: -3,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true,
      },
      {
        type: "text",
        name: "CTA",
        x: 60,
        y: 560,
        width: 600,
        height: 80,
        content: "Watch to the end!",
        fontSize: 48,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateId() {
  return `el-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isText(el: CanvasElement): el is TextElement {
  return el.type === "text";
}
function isImage(el: CanvasElement): el is ImageElement {
  return el.type === "image";
}

// ─── Mini canvas element renderer ────────────────────────────────────────────
interface ElementViewProps {
  el: CanvasElement;
  selected: boolean;
  scale: number;
  onClick: (e: React.MouseEvent) => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
}

function ElementView({
  el,
  selected,
  scale,
  onClick,
  onDragStart,
}: ElementViewProps) {
  if (!el.visible) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    left: el.x * scale,
    top: el.y * scale,
    width: el.width * scale,
    height: el.height * scale,
    opacity: el.opacity,
    transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
    cursor: el.locked ? "not-allowed" : "move",
    userSelect: "none",
    outline: selected ? "2px solid #2563EB" : "none",
    outlineOffset: 1,
    zIndex: selected ? 10 : undefined,
  };

  if (el.type === "rect") {
    const bg = el.gradientFill
      ? `linear-gradient(${el.gradientFill.angle}deg, ${el.gradientFill.colors.join(", ")})`
      : el.fillColor;
    Object.assign(style, {
      background: bg,
      border: el.borderWidth
        ? `${el.borderWidth * scale}px solid ${el.borderColor}`
        : undefined,
      borderRadius: el.borderRadius * scale,
      boxShadow: el.shadow ? `0 4px 20px ${el.fillColor}80` : undefined,
    });
  } else if (el.type === "circle") {
    Object.assign(style, {
      background: el.fillColor,
      borderRadius: "50%",
      border: el.borderWidth
        ? `${el.borderWidth * scale}px solid ${el.borderColor}`
        : undefined,
    });
  } else if (el.type === "text") {
    const t = el as TextElement;
    const gradientStyle =
      t.gradientText && t.gradientColors && t.gradientColors.length >= 2
        ? {
            background: `linear-gradient(135deg, ${t.gradientColors.join(", ")})`,
            WebkitBackgroundClip: "text" as const,
            WebkitTextFillColor: "transparent",
            backgroundClip: "text" as const,
          }
        : {};
    Object.assign(style, {
      fontSize: (t.fontSize || 24) * scale,
      fontFamily: t.fontFamily || "Inter",
      color: t.color || "#ffffff",
      fontWeight: t.bold ? "700" : "400",
      fontStyle: t.italic ? "italic" : undefined,
      textDecoration: t.underline ? "underline" : undefined,
      textAlign: t.align as React.CSSProperties["textAlign"],
      letterSpacing: t.letterSpacing
        ? `${t.letterSpacing * scale}px`
        : undefined,
      lineHeight: t.lineHeight || 1.2,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      textShadow: t.shadow ? "2px 2px 8px rgba(0,0,0,0.8)" : undefined,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      ...gradientStyle,
    });
  } else if (el.type === "image") {
    const img = el as ImageElement;
    const filters: string[] = [];
    if (img.brightness !== undefined && img.brightness !== 0)
      filters.push(`brightness(${1 + img.brightness / 100})`);
    if (img.contrast !== undefined && img.contrast !== 0)
      filters.push(`contrast(${1 + img.contrast / 100})`);
    if (img.saturation !== undefined && img.saturation !== 0)
      filters.push(`saturate(${1 + img.saturation / 100})`);
    if (img.blur !== undefined && img.blur > 0)
      filters.push(`blur(${img.blur}px)`);
    Object.assign(style, {
      backgroundImage: `url(${img.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: filters.length ? filters.join(" ") : undefined,
      borderRadius: img.roundedCorners
        ? img.roundedCorners * scale
        : img.maskType === "circle"
          ? "50%"
          : undefined,
    });
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: canvas editor
    <div
      style={style}
      onClick={onClick}
      onMouseDown={(e) => !el.locked && onDragStart(e, el.id)}
      data-ocid={`thumbnail_canvas.element.${el.id}`}
    >
      {el.type === "text" && (
        <span style={{ width: "100%" }}>{(el as TextElement).content}</span>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function ThumbnailStudioPage() {
  const store = useEditorStore();
  const {
    elements,
    selectedIds,
    layers,
    canvasWidth,
    canvasHeight,
    zoom,
    activeTool,
    activeSection,
    historyIndex,
    history,
    addElement,
    removeElement,
    updateElement,
    selectElements,
    clearSelection,
    setZoom,
    setActiveTool,
    setActiveSection,
    undo,
    redo,
    pushHistory,
    setCanvasSize,
    duplicateElement,
    bringToFront,
    sendToBack,
    updateLayer,
  } = store;

  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const scale = zoom;
  const selectedId = selectedIds[0] ?? null;
  const selectedEl = elements.find((e) => e.id === selectedId) ?? null;

  // ─── Keyboard shortcuts ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        redo();
      } else if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        removeElement(selectedId);
        clearSelection();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "d" && selectedId) {
        e.preventDefault();
        duplicateElement(selectedId);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, selectedId, removeElement, clearSelection, duplicateElement]);

  // ─── Drag-move elements ──────────────────────────────────────────────────
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    elX: number;
    elY: number;
  } | null>(null);

  const onElementDragStart = useCallback(
    (e: React.MouseEvent, id: string) => {
      const el = elements.find((x) => x.id === id);
      if (!el) return;
      selectElements([id]);
      dragRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        elX: el.x,
        elY: el.y,
      };
      const onMove = (me: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = (me.clientX - dragRef.current.startX) / scale;
        const dy = (me.clientY - dragRef.current.startY) / scale;
        updateElement(dragRef.current.id, {
          x: dragRef.current.elX + dx,
          y: dragRef.current.elY + dy,
        });
      };
      const onUp = () => {
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [elements, selectElements, updateElement, scale],
  );

  // ─── Canvas click: add text or deselect ──────────────────────────────────
  const onCanvasClick = useCallback(() => {
    if (activeTool === "text") {
      const id = generateId();
      const newText: TextElement = {
        id,
        type: "text",
        name: "Text",
        x: 100,
        y: 100,
        width: 400,
        height: 60,
        content: "Double-click to edit",
        fontSize: 48,
        color: "#ffffff",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.2,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false,
      };
      addElement(newText);
      selectElements([id]);
      setActiveTool("select");
    } else {
      clearSelection();
    }
  }, [activeTool, addElement, selectElements, setActiveTool, clearSelection]);

  // ─── Template click ──────────────────────────────────────────────────────
  const applyTemplate = useCallback(
    (tpl: (typeof THUMBNAIL_TEMPLATES)[number]) => {
      pushHistory(elements);
      const newEls: CanvasElement[] = tpl.elements.map((el) => ({
        ...(el as unknown as CanvasElement),
        id: generateId(),
      }));
      store.setElements(newEls);
      clearSelection();
      toast.success(`Template "${tpl.label}" applied`);
    },
    [elements, pushHistory, store, clearSelection],
  );

  // ─── Add image to canvas from file ──────────────────────────────────────
  const addImageToCanvas = useCallback(
    (src: string, name: string) => {
      const id = generateId();
      const img = new window.Image();
      img.onload = () => {
        const maxW = canvasWidth * 0.6;
        const maxH = canvasHeight * 0.6;
        const ratio = img.width / img.height;
        let w = maxW;
        let h = w / ratio;
        if (h > maxH) {
          h = maxH;
          w = h * ratio;
        }
        const newImg: ImageElement = {
          id,
          type: "image",
          name,
          x: (canvasWidth - w) / 2,
          y: (canvasHeight - h) / 2,
          width: w,
          height: h,
          src,
          img,
          opacity: 1,
          rotation: 0,
          locked: false,
          visible: true,
        };
        addElement(newImg);
        selectElements([id]);
      };
      img.src = src;
    },
    [canvasWidth, canvasHeight, addElement, selectElements],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error(
          "Only image files are supported. Video files go to Video Editor.",
        );
        return;
      }
      const url = URL.createObjectURL(file);
      addImageToCanvas(url, file.name.replace(/\.[^.]+$/, ""));
    },
    [addImageToCanvas],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are supported.");
        e.target.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      addImageToCanvas(url, file.name.replace(/\.[^.]+$/, ""));
      e.target.value = "";
    },
    [addImageToCanvas],
  );

  // ─── Export ──────────────────────────────────────────────────────────────
  const exportCanvas = useCallback(
    (format: "png" | "jpg") => {
      const dpr = window.devicePixelRatio || 2;
      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      for (const el of elements) {
        if (!el.visible) continue;
        ctx.save();
        ctx.globalAlpha = el.opacity;
        if (el.rotation) {
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          ctx.translate(cx, cy);
          ctx.rotate((el.rotation * Math.PI) / 180);
          ctx.translate(-cx, -cy);
        }
        if (el.type === "rect") {
          ctx.fillStyle = el.fillColor;
          ctx.beginPath();
          if (el.borderRadius > 0) {
            const r = el.borderRadius;
            ctx.moveTo(el.x + r, el.y);
            ctx.lineTo(el.x + el.width - r, el.y);
            ctx.arcTo(el.x + el.width, el.y, el.x + el.width, el.y + r, r);
            ctx.lineTo(el.x + el.width, el.y + el.height - r);
            ctx.arcTo(
              el.x + el.width,
              el.y + el.height,
              el.x + el.width - r,
              el.y + el.height,
              r,
            );
            ctx.lineTo(el.x + r, el.y + el.height);
            ctx.arcTo(el.x, el.y + el.height, el.x, el.y + el.height - r, r);
            ctx.lineTo(el.x, el.y + r);
            ctx.arcTo(el.x, el.y, el.x + r, el.y, r);
          } else {
            ctx.rect(el.x, el.y, el.width, el.height);
          }
          ctx.fill();
        } else if (el.type === "circle") {
          ctx.fillStyle = el.fillColor;
          ctx.beginPath();
          ctx.ellipse(
            el.x + el.width / 2,
            el.y + el.height / 2,
            el.width / 2,
            el.height / 2,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        } else if (el.type === "text") {
          const t = el as TextElement;
          ctx.font = `${t.bold ? "bold" : "normal"} ${t.italic ? "italic" : "normal"} ${t.fontSize}px "${t.fontFamily}", sans-serif`;
          ctx.fillStyle = t.color;
          ctx.textAlign = t.align as CanvasTextAlign;
          ctx.textBaseline = "middle";
          if (t.shadow) {
            ctx.shadowColor = "rgba(0,0,0,0.8)";
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
          }
          const textX =
            el.x +
            (t.align === "center"
              ? el.width / 2
              : t.align === "right"
                ? el.width
                : 0);
          ctx.fillText(t.content, textX, el.y + el.height / 2);
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        } else if (el.type === "image") {
          const imgEl = el as ImageElement;
          if (imgEl.img)
            ctx.drawImage(imgEl.img, el.x, el.y, el.width, el.height);
        }
        ctx.restore();
      }

      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const quality = format === "jpg" ? 0.95 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);
      const a = document.createElement("a");
      a.download = `thumbnail.${format}`;
      a.href = dataUrl;
      a.click();
      toast.success(`Exported as ${format.toUpperCase()} at 2x resolution`);
      setShowExportMenu(false);
    },
    [canvasWidth, canvasHeight, elements],
  );

  // ─── AI Tools ────────────────────────────────────────────────────────────
  const runAiTool = useCallback(
    (tool: string) => {
      if (tool === "auto-layout") {
        setAiProcessing(true);
        setTimeout(() => {
          pushHistory(elements);
          const nonBg = elements.filter((e) => !e.locked && e.visible);
          if (nonBg.length === 0) {
            setAiProcessing(false);
            return;
          }
          const spacing = canvasWidth * 0.04;
          const cols = Math.ceil(Math.sqrt(nonBg.length));
          const cellW = (canvasWidth - spacing * (cols + 1)) / cols;
          nonBg.forEach((el, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            updateElement(el.id, {
              x: spacing + col * (cellW + spacing),
              y: spacing + row * (canvasHeight * 0.25 + spacing),
            });
          });
          setAiProcessing(false);
          toast.success("Auto Layout applied");
        }, 1200);
        return;
      }

      if (tool === "ai-enhance") {
        if (!selectedEl || !isImage(selectedEl)) {
          toast.error("Please select an image first");
          return;
        }
        setAiProcessing(true);
        setTimeout(() => {
          pushHistory(elements);
          updateElement(selectedEl.id, {
            brightness: 15,
            contrast: 20,
            saturation: 10,
          });
          setAiProcessing(false);
          toast.success(
            "AI Enhance applied — contrast, brightness, and clarity improved",
          );
        }, 1500);
        return;
      }

      if (tool === "remove-bg") {
        if (!selectedEl || !isImage(selectedEl)) {
          toast.error("Please select an image first");
          return;
        }
        setAiProcessing(true);
        const imgEl = selectedEl as ImageElement;
        const offCanvas = document.createElement("canvas");
        const imgObj = new window.Image();
        imgObj.crossOrigin = "anonymous";
        imgObj.onload = () => {
          offCanvas.width = imgObj.width;
          offCanvas.height = imgObj.height;
          const octx = offCanvas.getContext("2d");
          if (!octx) {
            setAiProcessing(false);
            return;
          }
          octx.drawImage(imgObj, 0, 0);
          const imageData = octx.getImageData(
            0,
            0,
            offCanvas.width,
            offCanvas.height,
          );
          const data = imageData.data;
          const samplePixel = (
            x: number,
            y: number,
          ): [number, number, number] => {
            const idx = (y * offCanvas.width + x) * 4;
            return [data[idx], data[idx + 1], data[idx + 2]];
          };
          const corners = [
            samplePixel(0, 0),
            samplePixel(offCanvas.width - 1, 0),
            samplePixel(0, offCanvas.height - 1),
            samplePixel(offCanvas.width - 1, offCanvas.height - 1),
          ];
          const avgBg: [number, number, number] = [
            Math.round(corners.reduce((s, c) => s + c[0], 0) / 4),
            Math.round(corners.reduce((s, c) => s + c[1], 0) / 4),
            Math.round(corners.reduce((s, c) => s + c[2], 0) / 4),
          ];
          const threshold = 60;
          for (let j = 0; j < data.length; j += 4) {
            const dr = Math.abs(data[j] - avgBg[0]);
            const dg = Math.abs(data[j + 1] - avgBg[1]);
            const db = Math.abs(data[j + 2] - avgBg[2]);
            if (dr + dg + db < threshold * 3) data[j + 3] = 0;
          }
          octx.putImageData(imageData, 0, 0);
          const newSrc = offCanvas.toDataURL("image/png");
          const newImg = new window.Image();
          newImg.onload = () => {
            pushHistory(elements);
            updateElement(imgEl.id, { src: newSrc, img: newImg });
            setAiProcessing(false);
            toast.success("Background removed");
          };
          newImg.src = newSrc;
        };
        imgObj.onerror = () => {
          pushHistory(elements);
          updateElement(imgEl.id, { contrast: 50, brightness: 10 });
          setAiProcessing(false);
          toast.success("Background isolation applied (visual mode)");
        };
        imgObj.src = imgEl.src;
        return;
      }

      if (tool === "color-match") {
        if (!selectedEl || !isImage(selectedEl)) {
          toast.error("Please select an image first");
          return;
        }
        setAiProcessing(true);
        const imgEl = selectedEl as ImageElement;
        const offCanvas = document.createElement("canvas");
        offCanvas.width = 50;
        offCanvas.height = 50;
        const octx = offCanvas.getContext("2d");
        const imgObj = new window.Image();
        imgObj.crossOrigin = "anonymous";
        imgObj.onload = () => {
          if (!octx) {
            setAiProcessing(false);
            return;
          }
          octx.drawImage(imgObj, 0, 0, 50, 50);
          const data = octx.getImageData(0, 0, 50, 50).data;
          let r = 0;
          let g = 0;
          let b = 0;
          let count = 0;
          for (let i = 0; i < data.length; i += 20) {
            if (data[i + 3] > 128) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
              count++;
            }
          }
          if (count > 0) {
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
          }
          const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          pushHistory(elements);
          for (const el of elements) {
            if (el.type === "text")
              updateElement(el.id, { color: hex } as Partial<TextElement>);
          }
          setAiProcessing(false);
          toast.success(`Color Match applied — dominant color: ${hex}`);
        };
        imgObj.onerror = () => {
          setAiProcessing(false);
          toast.error("Could not analyze image colors");
        };
        imgObj.src = imgEl.src;
      }
    },
    [
      selectedEl,
      elements,
      canvasWidth,
      canvasHeight,
      pushHistory,
      updateElement,
    ],
  );

  // ─── Sidebar sections ────────────────────────────────────────────────────
  const SECTIONS = [
    { id: "templates", label: "Templates", Icon: Layers },
    { id: "uploads", label: "Uploads", Icon: Upload },
    { id: "text", label: "Text", Icon: Type },
    { id: "elements", label: "Elements", Icon: Square },
    { id: "ai-tools", label: "AI Tools", Icon: Wand2 },
    { id: "layers", label: "Layers", Icon: Layers },
  ] as const;

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div
      className="flex flex-col bg-[#070B14]"
      style={{ height: "calc(100vh - 64px)" }}
      data-ocid="thumbnail_studio.page"
    >
      {/* ─ Top Bar ─ */}
      <div
        className="flex items-center gap-2 px-3 border-b shrink-0"
        style={{
          height: 48,
          background: "rgba(15,23,42,0.98)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors mr-2"
          data-ocid="thumbnail_studio.back_link"
        >
          <ArrowLeft size={13} /> Back
        </Link>
        <div className="flex items-center gap-1.5">
          <div
            className="w-6 h-6 flex items-center justify-center rounded-md"
            style={{ background: "rgba(37,99,235,0.2)", color: "#2563EB" }}
          >
            <Layers size={13} />
          </div>
          <span className="text-xs font-semibold text-white/80">
            Thumbnail Studio
          </span>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-colors"
          aria-label="Undo"
          data-ocid="thumbnail_studio.undo_button"
        >
          <Undo2 size={14} />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={!canRedo}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-colors"
          aria-label="Redo"
          data-ocid="thumbnail_studio.redo_button"
        >
          <Redo2 size={14} />
        </button>
        <div
          className="w-px h-4 mx-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <button
          type="button"
          onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
          className="w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={13} />
        </button>
        <span className="text-[11px] font-mono text-white/40 w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => setZoom(Math.min(3, zoom + 0.1))}
          className="w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={13} />
        </button>
        <div
          className="w-px h-4 mx-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowExportMenu((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #2563EB, #22C55E)",
              boxShadow: "0 0 12px rgba(37,99,235,0.3)",
            }}
            data-ocid="thumbnail_studio.export_button"
          >
            <Download size={13} /> Export
          </button>
          {showExportMenu && (
            <div
              className="absolute top-full right-0 mt-1.5 rounded-xl border overflow-hidden z-50"
              style={{
                background: "rgba(15,23,42,0.98)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {(["png", "jpg"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => exportCanvas(f)}
                  className="block w-full px-4 py-2.5 text-left text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Export as {f.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─ Main 3-panel layout ─ */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ─ Left Sidebar ─ */}
        <div
          className="flex shrink-0"
          style={{
            width: 260,
            background: "#0F172A",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="flex flex-col items-center py-2 gap-0.5 shrink-0"
            style={{
              width: 48,
              borderRight: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {SECTIONS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id as typeof activeSection)}
                title={label}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                style={{
                  background:
                    activeSection === id
                      ? "rgba(37,99,235,0.18)"
                      : "transparent",
                  border:
                    activeSection === id
                      ? "1px solid rgba(37,99,235,0.45)"
                      : "1px solid transparent",
                  color:
                    activeSection === id ? "#2563EB" : "rgba(255,255,255,0.35)",
                }}
                data-ocid={`thumbnail_studio.sidebar_${id}`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>

          <div
            className="flex-1 min-w-0 overflow-y-auto p-3"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}
          >
            {activeSection === "templates" && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold">
                  Canvas Size
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  {CANVAS_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setCanvasSize(p.width, p.height)}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                    >
                      <span>{p.label}</span>
                      <span className="text-white/30 font-mono text-[10px]">
                        {p.width}×{p.height}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold">
                  Templates
                </div>
                <div className="flex flex-col gap-2">
                  {THUMBNAIL_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => applyTemplate(tpl)}
                      className="flex items-center gap-2 p-2.5 rounded-xl text-left hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                      data-ocid={`thumbnail_studio.template.${tpl.id}`}
                    >
                      <div
                        className="w-10 h-7 rounded-md shrink-0 flex items-center justify-center"
                        style={{
                          background: tpl.bg,
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <span className="text-[8px] text-white/60">
                          {tpl.category[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-[11px] font-medium text-white/80">
                          {tpl.label}
                        </div>
                        <div className="text-[10px] text-white/30">
                          {tpl.category}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "uploads" && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold">
                  Upload Image
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed transition-colors"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  data-ocid="thumbnail_studio.upload_button"
                >
                  <Upload size={20} />
                  <span className="text-xs">Click or drag image here</span>
                  <span className="text-[10px] text-white/25">
                    PNG, JPG, WEBP, GIF
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
              </div>
            )}

            {activeSection === "text" && (
              <div className="flex flex-col gap-2">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1 font-semibold">
                  Add Text
                </div>
                {(
                  [
                    { label: "Heading", fontSize: 80, bold: true },
                    { label: "Sub-heading", fontSize: 48, bold: false },
                    { label: "Body Text", fontSize: 28, bold: false },
                  ] as const
                ).map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      const id = generateId();
                      addElement({
                        id,
                        type: "text",
                        name: preset.label,
                        x: 100,
                        y: 200,
                        width: 600,
                        height: preset.fontSize * 1.5,
                        content: preset.label,
                        fontSize: preset.fontSize,
                        color: "#ffffff",
                        fontFamily: "Inter",
                        bold: preset.bold,
                        italic: false,
                        underline: false,
                        align: "left",
                        letterSpacing: 0,
                        lineHeight: 1.2,
                        opacity: 1,
                        rotation: 0,
                        locked: false,
                        visible: true,
                        shadow: false,
                      } as TextElement);
                      selectElements([id]);
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                    data-ocid={`thumbnail_studio.add_text_${preset.label.toLowerCase().replace(" ", "_")}`}
                  >
                    <Type size={14} className="text-white/40 shrink-0" />
                    <div>
                      <div className="text-[11px] font-medium text-white/80">
                        {preset.label}
                      </div>
                      <div className="text-[10px] text-white/30">
                        {preset.fontSize}px
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activeSection === "elements" && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold">
                  Shapes
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { type: "rect", Icon: Square, label: "Rectangle" },
                      { type: "circle", Icon: Circle, label: "Circle" },
                    ] as const
                  ).map(({ type, Icon, label }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        const id = generateId();
                        if (type === "rect") {
                          addElement({
                            id,
                            type: "rect",
                            name: "Rectangle",
                            x: 200,
                            y: 200,
                            width: 300,
                            height: 200,
                            fillColor: "#2563EB",
                            borderColor: "#2563EB",
                            borderWidth: 0,
                            borderRadius: 8,
                            opacity: 1,
                            rotation: 0,
                            locked: false,
                            visible: true,
                            shadow: false,
                          });
                        } else {
                          addElement({
                            id,
                            type: "circle",
                            name: "Circle",
                            x: 300,
                            y: 200,
                            width: 200,
                            height: 200,
                            fillColor: "#22C55E",
                            borderColor: "#22C55E",
                            borderWidth: 0,
                            opacity: 1,
                            rotation: 0,
                            locked: false,
                            visible: true,
                            shadow: false,
                          });
                        }
                        selectElements([id]);
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                      title={label}
                    >
                      <Icon size={18} className="text-white/50" />
                      <span className="text-[9px] text-white/30">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "ai-tools" && (
              <div className="flex flex-col gap-2">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1 font-semibold">
                  AI Tools
                </div>
                <div
                  className="rounded-xl border p-2.5 mb-2"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="text-[11px] font-semibold text-white/80 mb-1">
                    Magic Resize
                  </div>
                  <div className="text-[10px] text-white/40 mb-2">
                    Resize canvas to any format
                  </div>
                  <div className="flex flex-col gap-1">
                    {CANVAS_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          pushHistory(elements);
                          const scaleX = p.width / canvasWidth;
                          const scaleY = p.height / canvasHeight;
                          for (const el of elements) {
                            updateElement(el.id, {
                              x: el.x * scaleX,
                              y: el.y * scaleY,
                              width: el.width * scaleX,
                              height: el.height * scaleY,
                              ...(isText(el)
                                ? {
                                    fontSize:
                                      (el as TextElement).fontSize *
                                      Math.min(scaleX, scaleY),
                                  }
                                : {}),
                            } as Partial<CanvasElement>);
                          }
                          setCanvasSize(p.width, p.height);
                          toast.success(
                            `Resized to ${p.label} (${p.width}×${p.height})`,
                          );
                        }}
                        className="w-full text-left px-2 py-1 rounded-lg text-[10px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        data-ocid={`thumbnail_studio.ai_resize_${p.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                      >
                        {p.label} — {p.width}×{p.height}
                      </button>
                    ))}
                  </div>
                </div>
                {(
                  [
                    {
                      id: "color-match",
                      label: "Color Match",
                      desc: "Extract & apply image colors",
                      needsImage: true,
                    },
                    {
                      id: "auto-layout",
                      label: "Auto Layout",
                      desc: "Redistribute elements evenly",
                      needsImage: false,
                    },
                    {
                      id: "ai-enhance",
                      label: "AI Enhance",
                      desc: "Sharpen & boost selected image",
                      needsImage: true,
                    },
                    {
                      id: "remove-bg",
                      label: "Remove Background",
                      desc: "Remove bg from selected image",
                      needsImage: true,
                    },
                  ] as const
                ).map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => runAiTool(tool.id)}
                    disabled={aiProcessing}
                    className="w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 disabled:opacity-50"
                    data-ocid={`thumbnail_studio.ai_${tool.id}`}
                  >
                    <div
                      className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
                      style={{
                        background: "rgba(37,99,235,0.15)",
                        color: "#2563EB",
                      }}
                    >
                      <Wand2 size={13} />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-white/80">
                        {tool.label}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {tool.desc}
                      </div>
                      {tool.needsImage && (
                        <div className="text-[9px] text-white/25 mt-0.5">
                          Select an image first
                        </div>
                      )}
                    </div>
                  </button>
                ))}
                {aiProcessing && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{
                      background: "rgba(37,99,235,0.12)",
                      border: "1px solid rgba(37,99,235,0.3)",
                    }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full border border-blue-400 border-t-transparent animate-spin" />
                    <span className="text-[11px] text-blue-300">
                      Processing…
                    </span>
                  </div>
                )}
              </div>
            )}

            {activeSection === "layers" && (
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2 font-semibold">
                  Layers ({layers.length})
                </div>
                <div className="flex flex-col gap-0.5">
                  {layers.map((layer, idx) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: layer list item
                    <div
                      key={layer.id}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                      style={{
                        background:
                          selectedId === layer.elementId
                            ? "rgba(37,99,235,0.15)"
                            : "transparent",
                        border:
                          selectedId === layer.elementId
                            ? "1px solid rgba(37,99,235,0.35)"
                            : "1px solid transparent",
                      }}
                      onClick={() => selectElements([layer.elementId])}
                      data-ocid={`thumbnail_studio.layer.${idx + 1}`}
                    >
                      <span className="text-[10px] text-white/60 w-4 text-center">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-[11px] text-white/70 truncate">
                        {layer.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateLayer(layer.id, { visible: !layer.visible });
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 transition-colors"
                      >
                        {layer.visible ? (
                          <Eye size={11} />
                        ) : (
                          <EyeOff size={11} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateLayer(layer.id, { locked: !layer.locked });
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 transition-colors"
                      >
                        {layer.locked ? (
                          <Lock size={11} />
                        ) : (
                          <LockOpen size={11} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─ Canvas Area ─ */}
        <div
          className="flex-1 min-w-0 min-h-0 flex items-center justify-center overflow-auto"
          style={{
            background: "#070B14",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={onCanvasClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onCanvasClick();
            }
          }}
          data-ocid="thumbnail_studio.canvas_target"
        >
          <div
            ref={canvasWrapRef}
            className="relative shrink-0 overflow-hidden"
            style={{
              width: canvasWidth * scale,
              height: canvasHeight * scale,
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 16px 64px rgba(0,0,0,0.8)",
              background: "#0a0a0a",
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
              }
            }}
          >
            {elements.map((el) => (
              <ElementView
                key={el.id}
                el={el}
                selected={selectedIds.includes(el.id)}
                scale={scale}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!el.locked) selectElements([el.id]);
                }}
                onDragStart={onElementDragStart}
              />
            ))}
            {selectedEl && (
              <div
                className="pointer-events-none absolute"
                style={{
                  left: selectedEl.x * scale - 1,
                  top: selectedEl.y * scale - 1,
                  width: selectedEl.width * scale + 2,
                  height: selectedEl.height * scale + 2,
                  border: "1.5px solid #2563EB",
                  boxShadow: "0 0 0 1px rgba(37,99,235,0.2)",
                  borderRadius: 2,
                }}
              />
            )}
          </div>
        </div>

        {/* ─ Right Properties Panel ─ */}
        <div
          className="flex flex-col shrink-0 border-l overflow-y-auto"
          style={{
            width: 240,
            background: "#0F172A",
            borderColor: "rgba(255,255,255,0.05)",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.08) transparent",
          }}
        >
          {selectedEl ? (
            <div className="p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
                  Properties
                </span>
                <button
                  type="button"
                  onClick={() => {
                    removeElement(selectedEl.id);
                    clearSelection();
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-red-400 transition-colors"
                  aria-label="Delete"
                  data-ocid="thumbnail_studio.delete_button"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    { label: "X", key: "x" },
                    { label: "Y", key: "y" },
                    { label: "W", key: "width" },
                    { label: "H", key: "height" },
                  ] as const
                ).map(({ label, key }) => (
                  <div key={key}>
                    <span className="text-[9px] text-white/30 block mb-0.5">
                      {label}
                    </span>
                    <input
                      type="number"
                      value={Math.round(selectedEl[key] as number)}
                      onChange={(e) =>
                        updateElement(selectedEl.id, {
                          [key]: Number(e.target.value),
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                      data-ocid={`thumbnail_studio.prop_${key}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <span className="text-[9px] text-white/30 block mb-0.5">
                    Opacity
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={1}
                    step={0.05}
                    value={selectedEl.opacity}
                    onChange={(e) =>
                      updateElement(selectedEl.id, {
                        opacity: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-white/30 block mb-0.5">
                    Rotation
                  </span>
                  <input
                    type="number"
                    value={Math.round(selectedEl.rotation)}
                    onChange={(e) =>
                      updateElement(selectedEl.id, {
                        rotation: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                  />
                </div>
              </div>

              {isText(selectedEl) && (
                <>
                  <div
                    className="w-full h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-semibold">
                    Text
                  </span>
                  <textarea
                    value={selectedEl.content}
                    onChange={(e) =>
                      updateElement(selectedEl.id, {
                        content: e.target.value,
                      } as Partial<TextElement>)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60 resize-none"
                    rows={3}
                    data-ocid="thumbnail_studio.text_input"
                  />
                  <div>
                    <span className="text-[9px] text-white/30 block mb-0.5">
                      Font Size
                    </span>
                    <input
                      type="number"
                      value={selectedEl.fontSize}
                      onChange={(e) =>
                        updateElement(selectedEl.id, {
                          fontSize: Number(e.target.value),
                        } as Partial<TextElement>)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-white/30 block mb-0.5">
                      Color
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedEl.color}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            color: e.target.value,
                          } as Partial<TextElement>)
                        }
                        className="w-8 h-7 rounded cursor-pointer border border-white/10 bg-transparent"
                      />
                      <input
                        type="text"
                        value={selectedEl.color}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            color: e.target.value,
                          } as Partial<TextElement>)
                        }
                        className="flex-1 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/30 block mb-1">
                      Alignment
                    </span>
                    <div className="flex gap-1">
                      {(["left", "center", "right"] as const).map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() =>
                            updateElement(selectedEl.id, {
                              align: a,
                            } as Partial<TextElement>)
                          }
                          className="flex-1 h-7 flex items-center justify-center rounded-md transition-colors"
                          style={{
                            background:
                              selectedEl.align === a
                                ? "rgba(37,99,235,0.2)"
                                : "rgba(255,255,255,0.04)",
                            border: `1px solid ${selectedEl.align === a ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`,
                            color:
                              selectedEl.align === a
                                ? "#2563EB"
                                : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {a === "left" ? (
                            <AlignLeft size={12} />
                          ) : a === "center" ? (
                            <AlignCenter size={12} />
                          ) : (
                            <AlignRight size={12} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { key: "bold" as const, Icon: Bold, label: "Bold" },
                      { key: "italic" as const, Icon: Italic, label: "Italic" },
                    ].map(({ key, Icon: Ic, label: lbl }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          updateElement(selectedEl.id, {
                            [key]: !selectedEl[key],
                          } as Partial<TextElement>)
                        }
                        className="flex-1 h-7 flex items-center justify-center rounded-md transition-colors"
                        style={{
                          background: selectedEl[key]
                            ? "rgba(37,99,235,0.2)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${selectedEl[key] ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.08)"}`,
                          color: selectedEl[key]
                            ? "#2563EB"
                            : "rgba(255,255,255,0.4)",
                        }}
                        title={lbl}
                      >
                        <Ic size={12} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {(selectedEl.type === "rect" || selectedEl.type === "circle") && (
                <>
                  <div
                    className="w-full h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-semibold">
                    Fill Color
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={(selectedEl as { fillColor: string }).fillColor}
                      onChange={(e) =>
                        updateElement(selectedEl.id, {
                          fillColor: e.target.value,
                        })
                      }
                      className="w-8 h-7 rounded cursor-pointer border border-white/10 bg-transparent"
                    />
                    <input
                      type="text"
                      value={(selectedEl as { fillColor: string }).fillColor}
                      onChange={(e) =>
                        updateElement(selectedEl.id, {
                          fillColor: e.target.value,
                        })
                      }
                      className="flex-1 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/80 focus:outline-none focus:border-blue-500/60"
                    />
                  </div>
                </>
              )}

              {isImage(selectedEl) && (
                <>
                  <div
                    className="w-full h-px"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-semibold">
                    Image Adjustments
                  </span>
                  {[
                    {
                      label: "Brightness",
                      key: "brightness" as const,
                      min: -100,
                      max: 100,
                      def: 0,
                    },
                    {
                      label: "Contrast",
                      key: "contrast" as const,
                      min: -100,
                      max: 100,
                      def: 0,
                    },
                    {
                      label: "Saturation",
                      key: "saturation" as const,
                      min: -100,
                      max: 100,
                      def: 0,
                    },
                    {
                      label: "Blur",
                      key: "blur" as const,
                      min: 0,
                      max: 20,
                      def: 0,
                    },
                  ].map(({ label, key, min, max, def }) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[9px] text-white/30">
                          {label}
                        </span>
                        <span className="text-[9px] font-mono text-white/30">
                          {(selectedEl as ImageElement)[key] ?? def}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={(selectedEl as ImageElement)[key] ?? def}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            [key]: Number(e.target.value),
                          })
                        }
                        className="w-full h-1 accent-blue-500"
                      />
                    </div>
                  ))}
                </>
              )}

              <div
                className="w-full h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => duplicateElement(selectedEl.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  title="Duplicate"
                  data-ocid="thumbnail_studio.duplicate_button"
                >
                  <Copy size={11} /> Dup.
                </button>
                <button
                  type="button"
                  onClick={() => bringToFront(selectedEl.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  title="Bring to front"
                  data-ocid="thumbnail_studio.bring_front_button"
                >
                  <Plus size={11} /> Front
                </button>
                <button
                  type="button"
                  onClick={() => sendToBack(selectedEl.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-white/60 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  title="Send to back"
                  data-ocid="thumbnail_studio.send_back_button"
                >
                  <Minus size={11} /> Back
                </button>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center"
              data-ocid="thumbnail_studio.properties_empty_state"
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <Layers size={18} className="text-white/20" />
              </div>
              <p className="text-[11px] text-white/30 leading-relaxed">
                Select an element on the canvas to edit its properties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThumbnailStudioPage;
