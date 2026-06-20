import type {
  GradientPreset,
  Template,
  TextPreset,
  Tool,
} from "@/types/editor";
import {
  AlignLeft,
  Box,
  ChevronDown,
  ChevronRight,
  Crop,
  Image as ImageIcon,
  LayoutTemplate,
  Minus,
  MoveRight,
  Palette,
  Search,
  Settings,
  Shapes,
  Sparkles,
  Star,
  Triangle,
  Type,
  Upload,
  X,
} from "lucide-react";
import { memo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  BRAND_COLORS,
  FONT_FAMILIES,
  GRADIENT_PRESETS,
  TEMPLATES,
  TEXT_PRESETS,
} from "./editorConstants";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LeftSidebarProps {
  activeTool: Tool;
  onSelectTool: (tool: Tool) => void;
  onAddTextPreset: (preset: TextPreset) => void;
  onAddShape: (tool: Tool) => void;
  onAddTemplate: (template: Template) => void;
  onAddGradientRect: (preset: GradientPreset) => void;
  onAddImage: (dataUrl: string) => void;
  // legacy compat
  onToolChange?: (tool: Tool) => void;
  onApplyTemplate?: (template: Template) => void;
  onColorApply?: (color: string) => void;
  onOpenAIPanel?: () => void;
}

// ─── Tab definitions ─────────────────────────────────────────────────────────

type SidebarTab =
  | "templates"
  | "uploads"
  | "text"
  | "elements"
  | "images"
  | "brand";

const SIDEBAR_TABS: {
  id: SidebarTab;
  icon: React.ReactNode;
  label: string;
}[] = [
  {
    id: "templates",
    icon: <LayoutTemplate className="w-5 h-5" />,
    label: "Templates",
  },
  { id: "uploads", icon: <Upload className="w-5 h-5" />, label: "Uploads" },
  { id: "text", icon: <Type className="w-5 h-5" />, label: "Text" },
  { id: "elements", icon: <Shapes className="w-5 h-5" />, label: "Elements" },
  { id: "images", icon: <ImageIcon className="w-5 h-5" />, label: "Images" },
  { id: "brand", icon: <Sparkles className="w-5 h-5" />, label: "Brand" },
];

// ─── Shape tool defs ─────────────────────────────────────────────────────────

const SHAPE_TOOLS: { tool: Tool; label: string; icon: React.ReactNode }[] = [
  { tool: "rect", label: "Rect", icon: <Box className="w-5 h-5" /> },
  { tool: "circle", label: "Circle", icon: <Crop className="w-5 h-5" /> },
  {
    tool: "triangle",
    label: "Triangle",
    icon: <Triangle className="w-5 h-5" />,
  },
  { tool: "star", label: "Star", icon: <Star className="w-5 h-5" /> },
  { tool: "text", label: "Line", icon: <Minus className="w-5 h-5" /> },
  { tool: "text", label: "Arrow", icon: <MoveRight className="w-5 h-5" /> },
];

// ─── Section expand/collapse helper ─────────────────────────────────────────

function SectionHeader({
  title,
  expanded,
  onToggle,
  badge,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-1 py-1.5 mb-1.5 group transition-all duration-150"
      data-ocid={`section-header-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <span
        className="text-[11px] font-semibold tracking-wider uppercase font-editor"
        style={{ color: "oklch(0.7 0 0)", fontFamily: "Inter, sans-serif" }}
      >
        {title}
      </span>
      <div className="flex items-center gap-1">
        {badge && (
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-editor"
            style={{
              background: "oklch(0.38 0.15 270 / 0.2)",
              color: "oklch(0.65 0.17 150)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {badge}
          </span>
        )}
        {expanded ? (
          <ChevronDown className="w-3 h-3 opacity-50" />
        ) : (
          <ChevronRight className="w-3 h-3 opacity-50" />
        )}
      </div>
    </button>
  );
}

// ─── Search input ────────────────────────────────────────────────────────────

function SearchInput({
  placeholder = "Search assets...",
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative mb-3">
      <Search
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
        style={{ color: "oklch(0.5 0 0)" }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="editor-input-glass w-full pl-8 pr-3 py-1.5 text-[12px] rounded-xl"
        style={{ fontFamily: "Inter, sans-serif" }}
        data-ocid="sidebar-search-input"
      />
    </div>
  );
}

// ─── Panel title ─────────────────────────────────────────────────────────────

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[13px] font-semibold mb-3 font-editor"
      style={{
        color: "oklch(0.88 0 0 / 0.8)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {children}
    </p>
  );
}

// ─── Templates Panel ─────────────────────────────────────────────────────────

function TemplatesPanel({
  onAddTemplate,
  query,
}: {
  onAddTemplate: (t: Template) => void;
  query: string;
}) {
  const filtered = TEMPLATES.filter(
    (t) =>
      t.label.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-1">
      <PanelTitle>Templates</PanelTitle>
      <div className="grid grid-cols-2 gap-2">
        {filtered.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => onAddTemplate(tpl)}
            className="group relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]"
            style={{ aspectRatio: "16/9", background: "oklch(0.14 0 0)" }}
            data-ocid={`template-card-${tpl.id}`}
          >
            {/* Gradient preview */}
            <div
              className="w-full h-full flex items-end"
              style={{
                background: `linear-gradient(135deg, #101820 0%, ${tpl.id === "yt-clean" ? "#0047ab" : tpl.id === "ig-brand" ? "#50c878" : tpl.id === "twitter-banner" ? "#1a3a6b" : "#2a1a4e"} 100%)`,
              }}
            >
              <div className="p-1.5 w-full">
                <p
                  className="text-[9px] font-bold truncate text-white/80 leading-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tpl.label}
                </p>
              </div>
            </div>
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150"
              style={{ background: "oklch(0.38 0.15 270 / 0.7)" }}
            >
              <span
                className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-md"
                style={{
                  background: "oklch(0 0 0 / 0.4)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Use
              </span>
            </div>
            <span
              className="absolute top-1 right-1 text-[8px] px-1 py-0.5 rounded"
              style={{
                background: "oklch(0 0 0 / 0.5)",
                color: "oklch(0.7 0 0)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {tpl.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Uploads Panel ───────────────────────────────────────────────────────────

function UploadsPanel({
  onAddImage,
}: {
  onAddImage: (dataUrl: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState<{ url: string; name: string }[]>([]);

  const SAMPLE_UPLOADS = [
    {
      name: "brand-logo.png",
      gradient: "linear-gradient(135deg, #0047ab 0%, #50c878 100%)",
    },
    {
      name: "hero-photo.jpg",
      gradient: "linear-gradient(135deg, #101820 0%, #1a3a6b 100%)",
    },
    {
      name: "product-shot.png",
      gradient: "linear-gradient(135deg, #6c5ce7 0%, #0047ab 100%)",
    },
  ];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setUploaded((prev) => [{ url, name: file.name }, ...prev]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeImage = (idx: number) =>
    setUploaded((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-3">
      <PanelTitle>Your uploads</PanelTitle>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="editor-button-glass w-full flex items-center justify-center gap-2 py-2.5 rounded-xl"
        data-ocid="upload-button"
      >
        <Upload className="w-4 h-4" />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>
          Upload Image
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        data-ocid="upload-file-input"
      />

      {/* Real uploaded files */}
      {uploaded.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {uploaded.map((img, idx) => (
            <div
              key={`${img.name}-${idx}`}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "1", background: "oklch(0.14 0 0)" }}
              data-ocid={`upload-image-${idx + 1}`}
            >
              <button
                type="button"
                tabIndex={0}
                aria-label={`Add ${img.name} to canvas`}
                className="block w-full h-full p-0 border-0 bg-transparent"
                onClick={() => onAddImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                style={{ background: "oklch(0 0 0 / 0.7)" }}
                aria-label="Remove image"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Sample pre-loaded assets */}
      <div>
        <p
          className="text-[10px] uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" }}
        >
          Sample Assets
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_UPLOADS.map((s) => (
            <div
              key={s.name}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "1" }}
              data-ocid={`sample-upload-${s.name.replace(/\./g, "-")}`}
            >
              <button
                type="button"
                className="w-full h-full"
                aria-label={`Add ${s.name} to canvas`}
                onClick={() =>
                  toast(`Add "${s.name}" by uploading your own file`)
                }
              >
                <div
                  className="w-full h-full rounded-xl"
                  style={{ background: s.gradient }}
                />
              </button>
              {/* Sample badge */}
              <span
                className="absolute top-1.5 left-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: "oklch(0.38 0.15 270 / 0.85)",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  backdropFilter: "blur(4px)",
                }}
              >
                Sample
              </span>
              {/* Filename label */}
              <div
                className="absolute bottom-0 left-0 right-0 px-1.5 py-1"
                style={{ background: "oklch(0 0 0 / 0.6)" }}
              >
                <p
                  className="truncate"
                  style={{
                    fontSize: "9px",
                    color: "oklch(0.75 0 0)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {s.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {uploaded.length === 0 && (
        <div
          className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-4 gap-1.5"
          style={{ borderColor: "oklch(0.25 0 0)", color: "oklch(0.45 0 0)" }}
        >
          <ImageIcon className="w-6 h-6 opacity-40" />
          <p
            className="text-[10px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Drop images here or upload
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Text Panel ───────────────────────────────────────────────────────────────

function TextPanel({
  onAddTextPreset,
}: {
  onAddTextPreset: (p: TextPreset) => void;
}) {
  const [fontsExpanded, setFontsExpanded] = useState(false);
  const fontPairs = [
    { display: "Inter + Inter", body: "Clean and modern" },
    { display: "Plus Jakarta Sans + Inter", body: "Friendly and modern" },
    { display: "Impact + Plus Jakarta Sans", body: "Bold and punchy" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <PanelTitle>Add text</PanelTitle>
      {TEXT_PRESETS.map((preset, idx) => (
        <button
          key={preset.name}
          type="button"
          onClick={() => onAddTextPreset(preset)}
          className="w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-150 hover:scale-[1.01] group"
          style={{
            background: "oklch(0.14 0 0 / 0.5)",
            borderColor: "oklch(0.22 0 0 / 0.6)",
            fontFamily: "Inter, sans-serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.38 0.15 270 / 0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "oklch(0.22 0 0 / 0.6)";
          }}
          data-ocid={`text-preset-${idx + 1}`}
        >
          <p
            style={{
              fontSize: idx === 0 ? "18px" : idx === 1 ? "14px" : "11px",
              fontWeight: preset.fontWeight,
              color: "white",
              lineHeight: 1.2,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {idx === 0
              ? "Add a heading"
              : idx === 1
                ? "Add a subheading"
                : "Add body text"}
          </p>
          <p
            className="mt-0.5"
            style={{
              fontSize: "9px",
              color: "oklch(0.5 0 0)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {preset.fontSize}px · {preset.fontFamily}
          </p>
        </button>
      ))}

      <div className="mt-1">
        <SectionHeader
          title="Font Pairs"
          expanded={fontsExpanded}
          onToggle={() => setFontsExpanded((v) => !v)}
        />
        {fontsExpanded && (
          <div className="flex flex-col gap-1.5 pb-1">
            {fontPairs.map((fp) => (
              <div
                key={fp.display}
                className="px-2.5 py-2 rounded-lg"
                style={{
                  background: "oklch(0.14 0 0 / 0.5)",
                  border: "1px solid oklch(0.2 0 0 / 0.4)",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: "oklch(0.8 0 0)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {fp.display}
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    color: "oklch(0.5 0 0)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {fp.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Elements Panel ───────────────────────────────────────────────────────────

function ElementsPanel({
  activeTool,
  onSelectTool,
  onAddGradientRect,
}: {
  activeTool: Tool;
  onSelectTool: (t: Tool) => void;
  onAddGradientRect: (p: GradientPreset) => void;
}) {
  const [gradientsExpanded, setGradientsExpanded] = useState(true);
  const [iconsExpanded, setIconsExpanded] = useState(true);

  // Inline SVG icon shapes — clicking adds a rect element with a descriptive label
  const SVG_SHAPES: { label: string; svg: React.ReactNode; tool: Tool }[] = [
    {
      label: "Arrow Right",
      tool: "rect" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Arrow Right</title>
          <path d="M4 11h12.17l-5.58-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" />
        </svg>
      ),
    },
    {
      label: "Star",
      tool: "star" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Star</title>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      label: "Heart",
      tool: "circle" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Heart</title>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
    {
      label: "Diamond",
      tool: "rect" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Diamond</title>
          <path d="M12 2L2 9l10 13 10-13L12 2z" />
        </svg>
      ),
    },
    {
      label: "Hexagon",
      tool: "circle" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Hexagon</title>
          <path d="M17 3H7L2 12l5 9h10l5-9-5-9z" />
        </svg>
      ),
    },
    {
      label: "Speech Bubble",
      tool: "rect" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Speech Bubble</title>
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
    {
      label: "Badge",
      tool: "rect" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Badge</title>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.47-2.34 6.71-5 7.93-2.66-1.22-5-4.46-5-7.93V7.18L12 5z" />
        </svg>
      ),
    },
    {
      label: "Lightning",
      tool: "triangle" as Tool,
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <title>Lightning</title>
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <PanelTitle>Elements</PanelTitle>

      {/* Shapes grid */}
      <p
        className="text-[10px] uppercase tracking-widest mb-1.5"
        style={{ color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" }}
      >
        Shapes
      </p>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {SHAPE_TOOLS.map(({ tool, label, icon }) => (
          <button
            key={`${tool}-${label}`}
            type="button"
            onClick={() => onSelectTool(tool)}
            className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all duration-150 hover:scale-105"
            style={{
              background:
                activeTool === tool
                  ? "oklch(0.38 0.15 270 / 0.25)"
                  : "oklch(0.14 0 0 / 0.6)",
              border: `1px solid ${
                activeTool === tool
                  ? "oklch(0.38 0.15 270 / 0.5)"
                  : "oklch(0.22 0 0 / 0.4)"
              }`,
              color:
                activeTool === tool ? "oklch(0.65 0.17 150)" : "oklch(0.7 0 0)",
            }}
            data-ocid={`shape-tool-${label.toLowerCase()}`}
          >
            {icon}
            <span style={{ fontSize: "9px", fontFamily: "Inter, sans-serif" }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Icon SVG shapes */}
      <SectionHeader
        title="Icons & Shapes"
        expanded={iconsExpanded}
        onToggle={() => setIconsExpanded((v) => !v)}
        badge={`${SVG_SHAPES.length}`}
      />
      {iconsExpanded && (
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {SVG_SHAPES.map((shape) => (
            <button
              key={shape.label}
              type="button"
              onClick={() => onSelectTool(shape.tool)}
              title={shape.label}
              className="flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-150 hover:scale-110"
              style={{
                background: "oklch(0.14 0 0 / 0.6)",
                border: "1px solid oklch(0.22 0 0 / 0.4)",
                color: "oklch(0.65 0.17 150)",
              }}
              data-ocid={`icon-shape-${shape.label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {shape.svg}
              <span
                style={{
                  fontSize: "7px",
                  color: "oklch(0.55 0 0)",
                  fontFamily: "Inter, sans-serif",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {shape.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Gradients section */}
      <SectionHeader
        title="Gradients"
        expanded={gradientsExpanded}
        onToggle={() => setGradientsExpanded((v) => !v)}
        badge={`${GRADIENT_PRESETS.length}`}
      />
      {gradientsExpanded && (
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {GRADIENT_PRESETS.map((gp) => (
            <button
              key={gp.name}
              type="button"
              onClick={() => onAddGradientRect(gp)}
              className="group relative rounded-xl overflow-hidden transition-all duration-150 hover:scale-[1.03]"
              style={{ height: "44px" }}
              data-ocid={`gradient-${gp.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `linear-gradient(${gp.angle}deg, ${gp.colors[0]}, ${gp.colors[1]})`,
                }}
              />
              <div
                className="absolute inset-0 flex items-end px-1.5 pb-1 opacity-0 group-hover:opacity-100 transition-all"
                style={{ background: "oklch(0 0 0 / 0.3)" }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {gp.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Images Panel ────────────────────────────────────────────────────────────

function ImagesPanel({ onAddImage }: { onAddImage: (url: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgQuery, setImgQuery] = useState("");

  // Real Picsum photos — always accessible, deterministic seeds
  const STOCK_IMAGES = [
    {
      label: "Nature",
      url: "https://picsum.photos/seed/nature42/400/300",
      grad: "linear-gradient(135deg, #1a4a2e, #50c878)",
    },
    {
      label: "Abstract",
      url: "https://picsum.photos/seed/abstract7/400/300",
      grad: "linear-gradient(135deg, #0047ab, #a855f7)",
    },
    {
      label: "Technology",
      url: "https://picsum.photos/seed/tech99/400/300",
      grad: "linear-gradient(135deg, #101820, #0047ab)",
    },
    {
      label: "Architecture",
      url: "https://picsum.photos/seed/arch12/400/300",
      grad: "linear-gradient(135deg, #44403c, #78716c)",
    },
    {
      label: "Business",
      url: "https://picsum.photos/seed/biz55/400/300",
      grad: "linear-gradient(135deg, #1e293b, #334155)",
    },
    {
      label: "Creative",
      url: "https://picsum.photos/seed/creative3/400/300",
      grad: "linear-gradient(135deg, #7c4d00, #f59e0b)",
    },
    {
      label: "Ocean",
      url: "https://picsum.photos/seed/ocean22/400/300",
      grad: "linear-gradient(135deg, #0c4a6e, #0ea5e9)",
    },
    {
      label: "Mountains",
      url: "https://picsum.photos/seed/mountain8/400/300",
      grad: "linear-gradient(135deg, #1e293b, #475569)",
    },
    {
      label: "People",
      url: "https://picsum.photos/seed/people17/400/300",
      grad: "linear-gradient(135deg, #3b0764, #7c3aed)",
    },
    {
      label: "Minimal",
      url: "https://picsum.photos/seed/minimal31/400/300",
      grad: "linear-gradient(135deg, #18181b, #3f3f46)",
    },
    {
      label: "Vibrant",
      url: "https://picsum.photos/seed/vibrant66/400/300",
      grad: "linear-gradient(135deg, #ff6b6b, #feca57)",
    },
    {
      label: "Dark",
      url: "https://picsum.photos/seed/dark88/400/300",
      grad: "linear-gradient(135deg, #101820, #1a1a2e)",
    },
  ];

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onAddImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const filtered = STOCK_IMAGES.filter((p) =>
    p.label.toLowerCase().includes(imgQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-2">
      <PanelTitle>Images</PanelTitle>
      <SearchInput
        placeholder="Search images..."
        value={imgQuery}
        onChange={setImgQuery}
      />

      <div className="grid grid-cols-2 gap-1.5">
        {filtered.map((p) => (
          <button
            type="button"
            key={p.label}
            className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-150 hover:scale-[1.03]"
            style={{ aspectRatio: "4/3" }}
            data-ocid={`image-stock-${p.label.toLowerCase()}`}
            onClick={() => onAddImage(p.url)}
          >
            {imgErrors[p.label] ? (
              <div className="w-full h-full" style={{ background: p.grad }} />
            ) : (
              <img
                src={p.url}
                alt={p.label}
                className="w-full h-full object-cover"
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [p.label]: true }))
                }
                loading="lazy"
              />
            )}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150"
              style={{ background: "oklch(0 0 0 / 0.5)" }}
            >
              <span
                style={{
                  fontSize: "9px",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                {p.label}
              </span>
              <span
                className="px-2 py-0.5 rounded-md text-[9px]"
                style={{
                  background: "oklch(0.38 0.15 270 / 0.8)",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Add to canvas
              </span>
            </div>
            {/* Label always visible at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 px-1.5 py-1"
              style={{ background: "oklch(0 0 0 / 0.5)" }}
            >
              <p
                style={{
                  fontSize: "8px",
                  color: "oklch(0.8 0 0)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                {p.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="editor-button-glass w-full flex items-center justify-center gap-2 py-2 rounded-xl mt-1"
        data-ocid="images-upload-button"
      >
        <Upload className="w-3.5 h-3.5" />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>
          Upload your own
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ─── Brand Panel ─────────────────────────────────────────────────────────────

function BrandPanel({
  onColorApply,
  onAddTextPreset,
}: {
  onColorApply: (c: string) => void;
  onAddTextPreset: (p: TextPreset) => void;
}) {
  const brandFonts: { family: string; preview: string }[] = [
    { family: "Plus Jakarta Sans", preview: "Aa" },
    { family: "Inter", preview: "Aa" },
    { family: "Impact", preview: "Aa" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <PanelTitle>Brand Kit</PanelTitle>

      {/* Colors */}
      <div>
        <p
          className="text-[10px] uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" }}
        >
          Brand Colors
        </p>
        <div className="flex flex-wrap gap-2">
          {BRAND_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => onColorApply(c.hex)}
              title={c.name}
              className="group relative transition-all duration-150 hover:scale-110"
              style={{ width: 28, height: 28 }}
              data-ocid={`brand-color-${c.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: c.hex,
                  boxShadow: "0 0 0 2px oklch(0.25 0 0)",
                }}
              />
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap"
                style={{
                  fontSize: "8px",
                  color: "oklch(0.7 0 0)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {c.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="mt-3">
        <p
          className="text-[10px] uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" }}
        >
          Brand Fonts
        </p>
        <div className="flex flex-col gap-1.5">
          {brandFonts.map((f) => (
            <div
              key={f.family}
              className="flex items-center justify-between px-2.5 py-2 rounded-xl"
              style={{
                background: "oklch(0.14 0 0 / 0.5)",
                border: "1px solid oklch(0.2 0 0 / 0.4)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "white",
                    fontFamily: f.family,
                    fontWeight: 600,
                  }}
                >
                  {f.preview}
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    color: "oklch(0.5 0 0)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {f.family}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onAddTextPreset({
                    name: `${f.family} heading`,
                    fontSize: 48,
                    fontWeight: "600",
                    fontFamily: f.family,
                    color: "#ffffff",
                  })
                }
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "oklch(0.38 0.15 270 / 0.2)",
                  color: "oklch(0.65 0.17 150)",
                  border: "1px solid oklch(0.38 0.15 270 / 0.3)",
                }}
                data-ocid={`brand-font-add-${f.family.toLowerCase().replace(/\s/g, "-")}`}
              >
                <span style={{ fontSize: "14px", lineHeight: 1 }}>+</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Logo placeholder */}
      <div className="mt-1">
        <p
          className="text-[10px] uppercase tracking-widest mb-2"
          style={{ color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" }}
        >
          Logos
        </p>
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl"
          style={{
            background: "oklch(0.14 0 0 / 0.5)",
            border: "1px solid oklch(0.2 0 0 / 0.4)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0047ab, #50c878)" }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              E
            </span>
          </div>
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "white",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              Elysian Labs
            </p>
            <p
              style={{
                fontSize: "9px",
                color: "oklch(0.5 0 0)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Brand logo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main LeftSidebar ─────────────────────────────────────────────────────────

export const LeftSidebar = memo(function LeftSidebar({
  activeTool,
  onSelectTool,
  onAddTextPreset,
  onAddShape,
  onAddTemplate,
  onAddGradientRect,
  onAddImage,
  // legacy compat
  onToolChange,
  onApplyTemplate,
  onColorApply,
  onOpenAIPanel,
}: LeftSidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("templates");
  const [panelOpen, setPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tab: SidebarTab) => {
    if (activeTab === tab) {
      setPanelOpen((v) => !v);
    } else {
      setActiveTab(tab);
      setPanelOpen(true);
      setSearchQuery("");
    }
  };

  const handleSelectTool = (tool: Tool) => {
    onSelectTool(tool);
    onToolChange?.(tool);
    onAddShape(tool);
  };

  const handleAddTemplate = (tpl: Template) => {
    onAddTemplate(tpl);
    onApplyTemplate?.(tpl);
  };

  const handleColorApply = (color: string) => {
    onColorApply?.(color);
  };

  return (
    <aside
      className="flex flex-row h-full flex-shrink-0 font-editor"
      style={{ fontFamily: "Inter, sans-serif" }}
      data-ocid="editor-left-sidebar"
    >
      {/* ── Icon rail (72px) ── */}
      <div
        className="flex flex-col items-center py-3 gap-1 flex-shrink-0"
        style={{
          width: 72,
          background: "oklch(0.1 0 0 / 0.85)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid oklch(0.18 0 0 / 0.5)",
        }}
      >
        {/* Tabs */}
        <div className="flex flex-col gap-0.5 w-full px-2">
          {SIDEBAR_TABS.map((tab) => {
            const isActive = activeTab === tab.id && panelOpen;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className="relative flex flex-col items-center gap-1 py-2.5 w-full rounded-xl transition-all duration-150 hover:scale-105"
                style={{
                  background: isActive ? "rgba(37,99,235,0.20)" : "transparent",
                  color: isActive ? "white" : "oklch(0.55 0 0)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(37,99,235,0.5), inset 0 0 8px rgba(37,99,235,0.1)"
                    : "none",
                  borderLeft: isActive
                    ? "2px solid #2563EB"
                    : "2px solid transparent",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "oklch(1 0 0 / 0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                }}
                data-ocid={`sidebar-tab-${tab.id}`}
              >
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{tab.icon}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 500,
                    fontFamily: "Inter, sans-serif",
                    opacity: isActive ? 1 : 0.6,
                    letterSpacing: "0.02em",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Separator + bottom tools */}
        <div className="mt-auto flex flex-col items-center gap-0.5 w-full px-2">
          <div
            className="w-full h-px my-1"
            style={{ background: "oklch(0.22 0 0 / 0.4)" }}
          />
          <button
            type="button"
            onClick={() => handleSelectTool("select")}
            className="flex flex-col items-center gap-1 py-2 w-full rounded-xl transition-all duration-150"
            style={{
              background:
                activeTool === "select"
                  ? "oklch(0.38 0.15 270 / 0.2)"
                  : "transparent",
              color:
                activeTool === "select"
                  ? "oklch(0.65 0.17 150)"
                  : "oklch(0.45 0 0)",
            }}
            aria-label="Select tool"
            data-ocid="tool-select"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <title>Select</title>
              <path d="M4 4l6 18 3-7 7-3z" />
            </svg>
            <span style={{ fontSize: 9, fontFamily: "Inter, sans-serif" }}>
              Select
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 py-2.5 w-full rounded-xl transition-all duration-150"
            style={{ color: "oklch(0.55 0 0)" }}
            aria-label="AI Tools"
            data-ocid="sidebar-ai-tools"
            onClick={() => onOpenAIPanel?.()}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(1 0 0 / 0.06)";
              (e.currentTarget as HTMLButtonElement).style.color = "#2563EB";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.55 0 0)";
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span
              style={{
                fontSize: 9,
                fontFamily: "Inter, sans-serif",
                opacity: 0.8,
              }}
            >
              AI Tools
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 py-2 w-full rounded-xl transition-all duration-150"
            style={{ color: "oklch(0.4 0 0)" }}
            aria-label="Settings"
            data-ocid="sidebar-settings"
            onClick={() => toast("Settings coming soon")}
          >
            <Settings className="w-4 h-4" />
            <span style={{ fontSize: 9, fontFamily: "Inter, sans-serif" }}>
              Settings
            </span>
          </button>
        </div>
      </div>

      {/* ── Expandable Panel (220px) ── */}
      <div
        className="flex flex-col overflow-hidden transition-all duration-200 ease-in-out"
        style={{
          width: panelOpen ? 220 : 0,
          opacity: panelOpen ? 1 : 0,
          background: "oklch(0.11 0 0 / 0.75)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid oklch(0.18 0 0 / 0.4)",
          overflow: "hidden",
          pointerEvents: panelOpen ? "auto" : "none",
        }}
        data-ocid="sidebar-panel"
      >
        <div
          className="flex flex-col h-full overflow-y-auto"
          style={{ width: 220, minWidth: 220 }}
        >
          {/* Panel header */}
          <div className="px-3 pt-3 pb-2 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "oklch(0.65 0.17 150)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {SIDEBAR_TABS.find((t) => t.id === activeTab)?.label}
              </span>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="w-5 h-5 rounded flex items-center justify-center transition-all"
                style={{ color: "oklch(0.4 0 0)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.7 0 0)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.4 0 0)";
                }}
                aria-label="Close panel"
                data-ocid="sidebar-panel-close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search */}
            {(activeTab === "templates" || activeTab === "elements") && (
              <SearchInput
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={setSearchQuery}
              />
            )}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto px-3 pb-4">
            {activeTab === "templates" && (
              <TemplatesPanel
                onAddTemplate={handleAddTemplate}
                query={searchQuery}
              />
            )}
            {activeTab === "uploads" && (
              <UploadsPanel onAddImage={onAddImage} />
            )}
            {activeTab === "text" && (
              <TextPanel onAddTextPreset={onAddTextPreset} />
            )}
            {activeTab === "elements" && (
              <ElementsPanel
                activeTool={activeTool}
                onSelectTool={handleSelectTool}
                onAddGradientRect={onAddGradientRect}
              />
            )}
            {activeTab === "images" && <ImagesPanel onAddImage={onAddImage} />}
            {activeTab === "brand" && (
              <BrandPanel
                onColorApply={handleColorApply}
                onAddTextPreset={onAddTextPreset}
              />
            )}
          </div>

          {/* Font library hint */}
          <div
            className="flex-shrink-0 px-3 py-2 border-t"
            style={{ borderColor: "oklch(0.18 0 0 / 0.4)" }}
          >
            <p
              style={{
                fontSize: 9,
                color: "oklch(0.35 0 0)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {FONT_FAMILIES.length} fonts available · Inter, Plus Jakarta Sans
              + {FONT_FAMILIES.length - 2} more
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
});
