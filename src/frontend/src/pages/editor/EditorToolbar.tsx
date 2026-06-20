import type { ExportFormat, ExportQuality } from "@/types/editor";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Clock,
  Download,
  Grid3X3,
  Loader2,
  Magnet,
  Pencil,
  Redo2,
  Share2,
  Undo2,
} from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { CANVAS_PRESETS } from "./editorConstants";

interface EditorToolbarProps {
  projectName: string;
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  showGrid: boolean;
  showSnap: boolean;
  canUndo: boolean;
  canRedo: boolean;
  unsaved: boolean;
  isSaving: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onToggleGrid: () => void;
  onToggleSnap: () => void;
  onZoomChange: (z: number) => void;
  onPresetChange: (w: number, h: number) => void;
  onExport: (format: ExportFormat, quality: ExportQuality) => void;
  onProjectNameChange: (name: string) => void;
  onShare: () => void;
  onOpenExportModal?: () => void;
}

const EXPORT_OPTIONS: {
  format: ExportFormat;
  quality: ExportQuality;
  label: string;
}[] = [
  { format: "png", quality: "72", label: "PNG (72 DPI)" },
  { format: "png", quality: "150", label: "PNG (150 DPI)" },
  { format: "png", quality: "300", label: "PNG (300 DPI)" },
  { format: "jpg", quality: "72", label: "JPG (72 DPI)" },
  { format: "jpg", quality: "150", label: "JPG (150 DPI)" },
  { format: "jpg", quality: "300", label: "JPG (300 DPI)" },
];

export const EditorToolbar = memo(function EditorToolbar({
  projectName,
  canvasWidth,
  canvasHeight,
  zoom,
  showGrid,
  showSnap,
  canUndo,
  canRedo,
  unsaved,
  isSaving,
  onUndo,
  onRedo,
  onToggleGrid,
  onToggleSnap,
  onZoomChange,
  onPresetChange,
  onExport,
  onProjectNameChange,
  onShare,
  onOpenExportModal,
}: EditorToolbarProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("png");
  const [exportQuality, setExportQuality] = useState<ExportQuality>("150");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(projectName);
  const [hoveredExport, setHoveredExport] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Sync name if prop changes externally
  useEffect(() => {
    setNameValue(projectName);
  }, [projectName]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editingName && nameRef.current) {
      nameRef.current.focus();
      nameRef.current.select();
    }
  }, [editingName]);

  // Close export dropdown on outside click
  useEffect(() => {
    if (!exportOpen) return;
    const handler = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [exportOpen]);

  const commitName = (val: string) => {
    const trimmed = val.trim() || "Untitled Design";
    setNameValue(trimmed);
    onProjectNameChange(trimmed);
    setEditingName(false);
  };

  const handleZoomReset = () => onZoomChange(100);

  const selectedExportLabel = `${exportFormat.toUpperCase()} (${exportQuality} DPI)`;

  return (
    <header
      className="h-14 flex items-center justify-between flex-shrink-0 z-20 px-3 gap-2"
      style={{
        background: "oklch(0.10 0 0 / 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid oklch(0.25 0 0 / 0.4)",
        boxShadow:
          "0 1px 0 oklch(0.38 0.15 270 / 0.08), 0 4px 24px oklch(0 0 0 / 0.4)",
      }}
      data-ocid="editor-toolbar"
    >
      {/* ── LEFT ── */}
      <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
        {/* Back button */}
        <Link to="/dashboard">
          <button
            type="button"
            title="Back to Dashboard"
            className="flex items-center justify-center w-8 h-8 rounded-lg font-editor text-xs text-white/60 transition-all duration-150 ease-out hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"
            data-ocid="editor-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>

        {/* Vertical divider */}
        <div className="w-px h-5 bg-white/10 mx-0.5" />

        {/* Project name */}
        <div className="relative group flex items-center gap-1.5 min-w-0">
          {editingName ? (
            <input
              ref={nameRef}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={() => commitName(nameValue)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitName(nameValue);
                if (e.key === "Escape") {
                  setNameValue(projectName);
                  setEditingName(false);
                }
              }}
              className="editor-input-glass text-sm font-medium w-44 py-1 px-2 h-8"
              style={{ fontSize: "14px" }}
              data-ocid="editor-name-input"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditingName(true)}
              title="Click to rename project"
              className="flex items-center gap-1.5 h-8 px-2 rounded-lg text-sm font-medium text-white/90 transition-all duration-150 hover:bg-white/8 hover:text-white group"
              style={{ fontFamily: "var(--font-editor)", fontSize: "14px" }}
              data-ocid="editor-project-name"
            >
              <span className="truncate max-w-[160px]">{nameValue}</span>
              <Pencil className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-all duration-150 flex-shrink-0" />
            </button>
          )}
        </div>

        {/* Canvas dimensions */}
        <span
          className="text-[11px] font-editor text-white/30 hidden lg:block flex-shrink-0 ml-1"
          style={{ fontFamily: "var(--font-editor)" }}
        >
          {canvasWidth}×{canvasHeight}
        </span>

        {/* Canvas preset selector */}
        <select
          value={`${canvasWidth}x${canvasHeight}`}
          onChange={(e) => {
            const preset = CANVAS_PRESETS.find(
              (p) => `${p.width}x${p.height}` === e.target.value,
            );
            if (preset) onPresetChange(preset.width, preset.height);
          }}
          className="hidden xl:block h-8 px-2 rounded-lg text-[11px] font-editor text-white/60 transition-all duration-150 cursor-pointer focus:outline-none hover:text-white"
          style={{
            fontFamily: "var(--font-editor)",
            background: "oklch(0.16 0 0 / 0.6)",
            border: "1px solid oklch(0.25 0 0 / 0.4)",
          }}
          data-ocid="canvas-preset-select"
        >
          {CANVAS_PRESETS.map((p) => (
            <option key={p.label} value={`${p.width}x${p.height}`}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── CENTER ── */}
      <div className="flex items-center gap-1">
        {/* Undo */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${
            canUndo
              ? "text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"
              : "text-white/20 cursor-not-allowed opacity-40"
          }`}
          data-ocid="editor-undo-btn"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${
            canRedo
              ? "text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"
              : "text-white/20 cursor-not-allowed opacity-40"
          }`}
          data-ocid="editor-redo-btn"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Grid toggle */}
        <button
          type="button"
          onClick={onToggleGrid}
          title="Toggle Grid (Ctrl+G)"
          aria-label="Toggle grid"
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${
            showGrid
              ? "text-white bg-white/15 ring-1 ring-white/20"
              : "text-white/50 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"
          }`}
          style={
            showGrid ? { boxShadow: "0 0 12px oklch(0.38 0.15 270 / 0.5)" } : {}
          }
          data-ocid="editor-grid-toggle"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>

        {/* Snap toggle */}
        <button
          type="button"
          onClick={onToggleSnap}
          title="Toggle Snap"
          aria-label="Toggle snap to grid"
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${
            showSnap
              ? "text-white bg-white/15 ring-1 ring-white/20"
              : "text-white/50 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"
          }`}
          style={
            showSnap ? { boxShadow: "0 0 12px oklch(0.38 0.15 270 / 0.5)" } : {}
          }
          data-ocid="editor-snap-toggle"
        >
          <Magnet className="w-4 h-4" />
        </button>

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Zoom controls */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onZoomChange(Math.max(10, zoom - 25))}
            title="Zoom out"
            aria-label="Zoom out"
            className="flex items-center justify-center w-7 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 text-base font-medium leading-none"
            style={{ fontFamily: "var(--font-editor)" }}
            data-ocid="editor-zoom-out"
          >
            −
          </button>

          <button
            type="button"
            onClick={handleZoomReset}
            title="Reset to 100%"
            className="flex items-center justify-center h-8 px-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 tabular-nums"
            style={{
              fontFamily: "var(--font-editor)",
              fontSize: "12px",
              minWidth: "44px",
            }}
            data-ocid="editor-zoom-value"
          >
            {zoom}%
          </button>

          <button
            type="button"
            onClick={() => onZoomChange(Math.min(400, zoom + 25))}
            title="Zoom in"
            aria-label="Zoom in"
            className="flex items-center justify-center w-7 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 text-base font-medium leading-none"
            style={{ fontFamily: "var(--font-editor)" }}
            data-ocid="editor-zoom-in"
          >
            +
          </button>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Autosave indicator */}
        <div
          className="flex items-center gap-1.5 px-2 h-8 rounded-lg"
          style={{ fontFamily: "var(--font-editor)", fontSize: "12px" }}
          data-ocid="editor-autosave-indicator"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3 h-3 text-white/50 animate-spin" />
              <span className="text-white/50 hidden sm:block">Saving…</span>
            </>
          ) : unsaved ? (
            <>
              <Clock className="w-3 h-3 text-amber-400/80" />
              <span className="text-amber-400/80 hidden sm:block">Unsaved</span>
            </>
          ) : (
            <>
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                style={{ boxShadow: "0 0 6px oklch(0.82 0.17 142 / 0.8)" }}
              />
              <span className="text-white/40 hidden sm:block">Saved</span>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10" />

        {/* Share button */}
        <button
          type="button"
          onClick={onShare}
          title="Share"
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-white/70 transition-all duration-150 hover:text-white group"
          style={{
            fontFamily: "var(--font-editor)",
            fontSize: "13px",
            background: "oklch(0.18 0 0 / 0.5)",
            border: "1px solid oklch(0.28 0 0 / 0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.55 0.14 270))";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.18 0 0 / 0.5)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.28 0 0 / 0.4)";
            (e.currentTarget as HTMLButtonElement).style.color = "";
          }}
          data-ocid="editor-share-btn"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Share</span>
        </button>

        {/* Export split button */}
        <div className="relative" ref={exportRef}>
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ boxShadow: "0 2px 12px oklch(0.38 0.15 270 / 0.35)" }}
          >
            {/* Primary export action */}
            <button
              type="button"
              onClick={() => {
                if (onOpenExportModal) {
                  onOpenExportModal();
                } else {
                  onExport(exportFormat, exportQuality);
                }
              }}
              className="flex items-center gap-1.5 h-8 px-3 text-white font-semibold transition-all duration-150 hover:brightness-110"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.55 0.15 160) 100%)",
                fontFamily: "var(--font-editor)",
                fontSize: "13px",
              }}
              data-ocid="editor-export-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Export</span>
              <span className="text-white/70 text-[11px] hidden md:block">
                {selectedExportLabel}
              </span>
            </button>

            {/* Dropdown chevron */}
            <button
              type="button"
              onClick={() => setExportOpen((v) => !v)}
              aria-label="Export options"
              className="flex items-center justify-center w-7 h-8 text-white/80 transition-all duration-150 hover:bg-white/15"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.42 0.15 270) 0%, oklch(0.58 0.15 160) 100%)",
                borderLeft: "1px solid oklch(1 0 0 / 0.15)",
              }}
              data-ocid="editor-export-dropdown-btn"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  exportOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Export dropdown menu */}
          {exportOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50"
              style={{
                background: "oklch(0.12 0 0 / 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid oklch(0.25 0 0 / 0.5)",
                boxShadow:
                  "0 16px 48px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(0.38 0.15 270 / 0.1)",
              }}
              data-ocid="export-options-panel"
            >
              <div className="py-1.5">
                {EXPORT_OPTIONS.map((opt) => {
                  const key = `${opt.format}-${opt.quality}`;
                  const isSelected =
                    exportFormat === opt.format &&
                    exportQuality === opt.quality;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setExportFormat(opt.format);
                        setExportQuality(opt.quality);
                        onExport(opt.format, opt.quality);
                        setExportOpen(false);
                      }}
                      onMouseEnter={() => setHoveredExport(key)}
                      onMouseLeave={() => setHoveredExport(null)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left transition-all duration-100"
                      style={{
                        fontFamily: "var(--font-editor)",
                        fontSize: "13px",
                        color: isSelected ? "white" : "oklch(0.75 0 0)",
                        background: isSelected
                          ? "oklch(0.38 0.15 270 / 0.2)"
                          : hoveredExport === key
                            ? "oklch(0.18 0 0 / 0.8)"
                            : "transparent",
                      }}
                      data-ocid={`export-option-${key}`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white/60" />
                      )}
                    </button>
                  );
                })}

                {/* Divider */}
                <div
                  className="mx-3 my-1.5"
                  style={{ height: "1px", background: "oklch(0.22 0 0 / 0.6)" }}
                />

                {/* Export all pages (Pro locked) */}
                <button
                  type="button"
                  disabled
                  className="w-full flex items-center justify-between px-3 py-2 text-left cursor-not-allowed opacity-50"
                  style={{
                    fontFamily: "var(--font-editor)",
                    fontSize: "13px",
                    color: "oklch(0.55 0 0)",
                  }}
                  data-ocid="export-all-pages-btn"
                >
                  <span>Export All Pages</span>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.14 50), oklch(0.65 0.14 40))",
                      color: "white",
                    }}
                  >
                    PRO
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});
