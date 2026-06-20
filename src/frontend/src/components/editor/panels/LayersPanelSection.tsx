import { useVideoEditorStore } from "@/store/videoEditorStore";
import type {
  AudioClip,
  CaptionLayer,
  TextLayer,
  VideoClip,
} from "@/types/videoEditor";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  Film,
  GripVertical,
  Lock,
  LockOpen,
  Music,
  Subtitles,
  Trash2,
  Type,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LayerKind = "video" | "audio" | "text" | "caption";

interface LayerItem {
  id: string;
  kind: LayerKind;
  name: string;
  startTime: number;
  hidden: boolean;
  locked: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const KIND_COLORS: Record<LayerKind, string> = {
  video: "#3b82f6",
  audio: "#22c55e",
  text: "#a78bfa",
  caption: "#f59e0b",
};

const KIND_BG: Record<LayerKind, string> = {
  video: "rgba(59,130,246,0.15)",
  audio: "rgba(34,197,94,0.15)",
  text: "rgba(167,139,250,0.15)",
  caption: "rgba(245,158,11,0.15)",
};

const KIND_LABELS: Record<LayerKind, string> = {
  video: "Video Layers",
  audio: "Audio Layers",
  text: "Text Layers",
  caption: "Captions",
};

const KIND_ORDER: LayerKind[] = ["video", "audio", "text", "caption"];

// ─── KindIcon ─────────────────────────────────────────────────────────────────

function KindIcon({ kind, size = 12 }: { kind: LayerKind; size?: number }) {
  const color = KIND_COLORS[kind];
  const style = { color, width: size, height: size };
  if (kind === "video") return <Film style={style} />;
  if (kind === "audio") return <Music style={style} />;
  if (kind === "text") return <Type style={style} />;
  return <Subtitles style={style} />;
}

// ─── Inline rename input ──────────────────────────────────────────────────────

interface InlineRenameProps {
  value: string;
  onCommit: (name: string) => void;
}

function InlineRename({ value, onCommit }: InlineRenameProps) {
  const [draft, setDraft] = useState(value);
  const commit = useCallback(
    () => onCommit(draft.trim() || value),
    [draft, value, onCommit],
  );
  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") onCommit(value);
        e.stopPropagation();
      }}
      className="flex-1 min-w-0 text-[11px] bg-transparent border-b outline-none text-white/90 py-px"
      style={{ borderColor: "rgba(37,99,235,0.6)" }}
    />
  );
}

// ─── LayerRow ─────────────────────────────────────────────────────────────────

interface LayerRowProps {
  layer: LayerItem;
  isSelected: boolean;
  isDragOver: boolean;
  onSelect: () => void;
  onToggleHide: () => void;
  onToggleLock: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
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
  onDrop,
}: LayerRowProps) {
  const [renaming, setRenaming] = useState(false);
  const [hovered, setHovered] = useState(false);
  const color = KIND_COLORS[layer.kind];

  const handleCommit = useCallback(
    (name: string) => {
      setRenaming(false);
      onRename(name);
    },
    [onRename],
  );

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer select-none transition-all"
      style={{
        background: isSelected
          ? `${KIND_BG[layer.kind]}`
          : hovered
            ? "rgba(255,255,255,0.04)"
            : "transparent",
        border: isSelected
          ? `1px solid ${color}60`
          : isDragOver
            ? "1px solid rgba(37,99,235,0.5)"
            : "1px solid transparent",
        boxShadow: isSelected ? `0 0 10px ${color}20` : "none",
        opacity: layer.hidden ? 0.4 : 1,
      }}
      data-ocid={`layers.row.${layer.id}`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4/5 rounded-r"
          style={{ background: color }}
        />
      )}

      {/* Drag handle */}
      <div className="text-white/20 hover:text-white/50 cursor-grab flex-shrink-0">
        <GripVertical className="w-3 h-3" />
      </div>

      {/* Kind icon */}
      <div
        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
        style={{ background: KIND_BG[layer.kind] }}
      >
        <KindIcon kind={layer.kind} size={11} />
      </div>

      {/* Name */}
      <button
        type="button"
        className="flex-1 min-w-0 text-left"
        onClick={onSelect}
      >
        {renaming ? (
          <InlineRename value={layer.name} onCommit={handleCommit} />
        ) : (
          <span
            className="block truncate text-[11px] font-medium cursor-text"
            style={{
              color: layer.hidden
                ? "rgba(255,255,255,0.35)"
                : "rgba(255,255,255,0.85)",
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setRenaming(true);
            }}
          >
            {layer.name}
          </span>
        )}
      </button>
      <div
        className="flex items-center gap-0.5 flex-shrink-0"
        style={{ opacity: hovered || isSelected ? 1 : 0 }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all"
          title="Duplicate"
          data-ocid={`layers.duplicate_button.${layer.id}`}
        >
          <Copy className="w-2.5 h-2.5 text-white/40 hover:text-white/70" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-500/20 transition-all"
          title="Delete"
          data-ocid={`layers.delete_button.${layer.id}`}
        >
          <Trash2 className="w-2.5 h-2.5 text-white/30 hover:text-red-400" />
        </button>
      </div>

      {/* Lock toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all flex-shrink-0"
        title={layer.locked ? "Unlock layer" : "Lock layer"}
        data-ocid={`layers.lock_button.${layer.id}`}
      >
        {layer.locked ? (
          <Lock className="w-3 h-3" style={{ color }} />
        ) : (
          <LockOpen className="w-3 h-3 text-white/25" />
        )}
      </button>

      {/* Eye toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleHide();
        }}
        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-all flex-shrink-0"
        title={layer.hidden ? "Show layer" : "Hide layer"}
        data-ocid={`layers.visibility_button.${layer.id}`}
      >
        {layer.hidden ? (
          <EyeOff className="w-3 h-3 text-white/25" />
        ) : (
          <Eye className="w-3 h-3 text-white/50" />
        )}
      </button>
    </div>
  );
}

// ─── Section Group ─────────────────────────────────────────────────────────────

interface LayerGroupProps {
  kind: LayerKind;
  layers: LayerItem[];
  collapsed: boolean;
  onToggleCollapse: () => void;
  children: React.ReactNode;
}

function LayerGroup({
  kind,
  layers,
  collapsed,
  onToggleCollapse,
  children,
}: LayerGroupProps) {
  const color = KIND_COLORS[kind];
  const label = KIND_LABELS[kind];
  const count = layers.length;

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={onToggleCollapse}
        className="w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/4 transition-all mb-1"
        data-ocid={`layers.section.${kind}`}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-white/25" />
        ) : (
          <ChevronDown className="w-3 h-3 text-white/25" />
        )}
        <KindIcon kind={kind} size={10} />
        <span
          className="text-[9px] font-semibold uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {label}
        </span>
        <div
          className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: `${color}20`, color }}
        >
          {count}
        </div>
      </button>
      {!collapsed && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

// ─── Main LayersPanelSection ───────────────────────────────────────────────────

export function LayersPanelSection() {
  const store = useVideoEditorStore();
  const dragIdRef = useRef<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Record<LayerKind, boolean>>({
    video: false,
    audio: false,
    text: false,
    caption: false,
  });

  // Build unified layer list per kind
  const byKind: Record<LayerKind, LayerItem[]> = {
    video: Object.values(store.videoClips)
      .sort((a, b) => a.startTime - b.startTime)
      .map((c: VideoClip) => ({
        id: c.id,
        kind: "video",
        name: c.name,
        startTime: c.startTime,
        hidden: c.hidden,
        locked: c.locked,
      })),
    audio: Object.values(store.audioClips)
      .sort((a, b) => a.startTime - b.startTime)
      .map((c: AudioClip) => ({
        id: c.id,
        kind: "audio",
        name: c.name,
        startTime: c.startTime,
        hidden: c.hidden,
        locked: c.locked,
      })),
    text: Object.values(store.textLayers)
      .sort((a, b) => a.startTime - b.startTime)
      .map((t: TextLayer) => ({
        id: t.id,
        kind: "text",
        name: t.content.slice(0, 20) || "Text Layer",
        startTime: t.startTime,
        hidden: t.hidden,
        locked: t.locked,
      })),
    caption: Object.values(store.captionLayers)
      .sort((a, b) => a.startTime - b.startTime)
      .map((c: CaptionLayer) => ({
        id: c.id,
        kind: "caption",
        name: c.content.slice(0, 20) || "Caption",
        startTime: c.startTime,
        hidden: false,
        locked: false,
      })),
  };

  const totalLayers = Object.values(byKind).reduce(
    (s, arr) => s + arr.length,
    0,
  );

  const isSelected = (id: string, kind: LayerKind) => {
    if (kind === "video" || kind === "audio")
      return store.selectedClipId === id;
    if (kind === "text") return store.selectedTextId === id;
    return store.selectedCaptionId === id;
  };

  const handleSelect = (id: string, kind: LayerKind) => {
    if (kind === "video" || kind === "audio") {
      store.setSelectedClipId(id);
    } else if (kind === "text") {
      store.setSelectedTextId(id);
    } else {
      store.setSelectedCaptionId(id);
    }
  };

  const handleToggleHide = (id: string, kind: LayerKind, current: boolean) => {
    if (kind === "video") store.updateVideoClip(id, { hidden: !current });
    else if (kind === "audio") store.updateAudioClip(id, { hidden: !current });
    else if (kind === "text") store.updateTextLayer(id, { hidden: !current });
  };

  const handleToggleLock = (id: string, kind: LayerKind, current: boolean) => {
    if (kind === "video") store.updateVideoClip(id, { locked: !current });
    else if (kind === "audio") store.updateAudioClip(id, { locked: !current });
    else if (kind === "text") store.updateTextLayer(id, { locked: !current });
  };

  const handleRename = (id: string, kind: LayerKind, name: string) => {
    if (kind === "video") store.updateVideoClip(id, { name });
    else if (kind === "audio") store.updateAudioClip(id, { name });
  };

  const handleDelete = (id: string, kind: LayerKind) => {
    if (kind === "video") store.removeVideoClip(id);
    else if (kind === "audio") store.removeAudioClip(id);
    else if (kind === "text") store.removeTextLayer(id);
    else store.removeCaptionLayer(id);
  };

  const handleDuplicate = (id: string, kind: LayerKind) => {
    const newId = `${id}-copy-${Date.now()}`;
    if (kind === "video") {
      const clip = store.videoClips[id];
      if (clip)
        store.addVideoClip({
          ...clip,
          id: newId,
          name: `${clip.name} (Copy)`,
          startTime: clip.startTime + 0.5,
        });
    } else if (kind === "audio") {
      const clip = store.audioClips[id];
      if (clip)
        store.addAudioClip({
          ...clip,
          id: newId,
          name: `${clip.name} (Copy)`,
          startTime: clip.startTime + 0.5,
        });
    } else if (kind === "text") {
      const layer = store.textLayers[id];
      if (layer)
        store.addTextLayer({
          ...layer,
          id: newId,
          position: {
            x: (layer.position?.x ?? 50) + 3,
            y: (layer.position?.y ?? 50) + 3,
          },
        });
    } else if (kind === "caption") {
      const layer = store.captionLayers[id];
      if (layer)
        store.addCaptionLayer({
          ...layer,
          id: newId,
          startTime: layer.startTime + 0.5,
        });
    }
  };

  const handleDragStart = (id: string) => (e: React.DragEvent) => {
    dragIdRef.current = id;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (id: string) => (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDrop = () => {
    setDragOverId(null);
    dragIdRef.current = null;
    // Visual reorder only – actual clip ordering is handled by startTime
  };

  const toggleCollapse = (kind: LayerKind) =>
    setCollapsed((prev) => ({ ...prev, [kind]: !prev[kind] }));

  return (
    <div
      className="flex flex-col h-full overflow-y-auto p-3"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.08) transparent",
        fontFamily: "Inter, sans-serif",
      }}
      data-ocid="layers_panel"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
          Layers
        </span>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(37,99,235,0.15)", color: "#3b82f6" }}
        >
          {totalLayers}
        </span>
      </div>

      {/* Empty state */}
      {totalLayers === 0 && (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-2 text-center py-10"
          data-ocid="layers.empty_state"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(37,99,235,0.08)",
              border: "1px dashed rgba(37,99,235,0.25)",
            }}
          >
            <Film
              className="w-5 h-5"
              style={{ color: "rgba(37,99,235,0.5)" }}
            />
          </div>
          <p className="text-[11px] text-white/30 leading-tight">
            No layers yet
            <br />
            <span className="text-[10px] text-white/20">
              Upload a video to get started
            </span>
          </p>
        </div>
      )}

      {/* Layer groups */}
      {KIND_ORDER.map((kind) => {
        const layers = byKind[kind];
        if (layers.length === 0) return null;
        return (
          <LayerGroup
            key={kind}
            kind={kind}
            layers={layers}
            collapsed={collapsed[kind]}
            onToggleCollapse={() => toggleCollapse(kind)}
          >
            {layers.map((layer) => (
              <LayerRow
                key={layer.id}
                layer={layer}
                isSelected={isSelected(layer.id, layer.kind)}
                isDragOver={dragOverId === layer.id}
                onSelect={() => handleSelect(layer.id, layer.kind)}
                onToggleHide={() =>
                  handleToggleHide(layer.id, layer.kind, layer.hidden)
                }
                onToggleLock={() =>
                  handleToggleLock(layer.id, layer.kind, layer.locked)
                }
                onRename={(name) => handleRename(layer.id, layer.kind, name)}
                onDelete={() => handleDelete(layer.id, layer.kind)}
                onDuplicate={() => handleDuplicate(layer.id, layer.kind)}
                onDragStart={handleDragStart(layer.id)}
                onDragOver={handleDragOver(layer.id)}
                onDrop={handleDrop}
              />
            ))}
          </LayerGroup>
        );
      })}
    </div>
  );
}
