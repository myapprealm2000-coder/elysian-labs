import { useAdCreatorStore } from "@/store/adCreatorStore";
import type { Layer } from "@/store/adCreatorStore";
import {
  Eye,
  EyeOff,
  GripVertical,
  ImageIcon,
  Layers,
  Lock,
  Square,
  Trash2,
  Type,
  Unlock,
} from "lucide-react";
import { AnimatePresence, Reorder, motion } from "motion/react";
import { type CSSProperties, type ComponentType, memo, useState } from "react";

const TYPE_COLORS: Record<string, string> = {
  text: "#2563EB",
  image: "#22C55E",
  shape: "#a78bfa",
  group: "#f97316",
};

const TYPE_ICONS: Record<
  string,
  ComponentType<{ className?: string; style?: CSSProperties }>
> = {
  text: Type,
  image: ImageIcon,
  shape: Square,
  group: Layers,
};

export function LayersTab() {
  const {
    layers,
    elements,
    selectedIds,
    selectElement,
    toggleLayerVisibility,
    toggleLayerLock,
    renameLayer,
    deleteElement,
    groupLayers,
  } = useAdCreatorStore();
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  function startRename(elementId: string, current: string) {
    setRenamingId(elementId);
    setRenameValue(current);
  }

  function commitRename(elementId: string) {
    if (renameValue.trim()) renameLayer(elementId, renameValue.trim());
    setRenamingId(null);
  }

  function getElementType(elementId: string) {
    return elements.find((e) => e.id === elementId)?.type ?? "shape";
  }

  return (
    <div className="flex flex-col gap-2 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {layers.length} layer{layers.length !== 1 ? "s" : ""}
        </p>
        {selectedIds.length >= 2 && (
          <button
            type="button"
            onClick={() => groupLayers(selectedIds)}
            className="text-[10px] text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 transition-colors"
          >
            Group
          </button>
        )}
      </div>

      {/* Layer list */}
      <div className="overflow-y-auto flex-1 pr-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <AnimatePresence initial={false}>
          {layers.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Layers className="w-8 h-8 text-muted-foreground/30" />
              <p className="text-xs text-muted-foreground">No layers yet</p>
              <p className="text-[10px] text-muted-foreground/60">
                Add elements to the canvas
              </p>
            </div>
          ) : (
            <Reorder.Group
              axis="y"
              values={layers}
              onReorder={() => {}}
              className="flex flex-col gap-1"
            >
              {layers.map((layer, idx) => (
                <LayerRow
                  key={layer.id}
                  layer={layer}
                  index={idx}
                  isSelected={selectedIds.includes(layer.elementId)}
                  isRenaming={renamingId === layer.elementId}
                  renameValue={renameValue}
                  elementType={getElementType(layer.elementId)}
                  onSelect={() => selectElement(layer.elementId)}
                  onVisibilityToggle={() =>
                    toggleLayerVisibility(layer.elementId)
                  }
                  onLockToggle={() => toggleLayerLock(layer.elementId)}
                  onStartRename={() => startRename(layer.elementId, layer.name)}
                  onRenameChange={setRenameValue}
                  onCommitRename={() => commitRename(layer.elementId)}
                  onDelete={() => deleteElement(layer.elementId)}
                />
              ))}
            </Reorder.Group>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface LayerRowProps {
  layer: Layer;
  index: number;
  isSelected: boolean;
  isRenaming: boolean;
  renameValue: string;
  elementType: string;
  onSelect: () => void;
  onVisibilityToggle: () => void;
  onLockToggle: () => void;
  onStartRename: () => void;
  onRenameChange: (v: string) => void;
  onCommitRename: () => void;
  onDelete: () => void;
}

const LayerRow = memo(function LayerRow({
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
  onDelete,
}: LayerRowProps) {
  const Icon = TYPE_ICONS[elementType] ?? Square;
  const color = TYPE_COLORS[elementType] ?? "#94a3b8";

  return (
    <Reorder.Item value={layer} id={layer.id} as="div">
      <motion.div
        layout
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ delay: index * 0.02 }}
        onClick={onSelect}
        data-ocid={`layer.item.${index + 1}`}
        className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
          isSelected
            ? "bg-blue-500/15 border border-blue-500/30"
            : "hover:bg-white/5 border border-transparent"
        }`}
      >
        {/* Drag handle */}
        <GripVertical className="w-3 h-3 text-muted-foreground/30 group-hover:text-muted-foreground shrink-0 cursor-grab" />

        {/* Visibility */}
        <button
          type="button"
          aria-label={layer.visible ? "Hide layer" : "Show layer"}
          onClick={(e) => {
            e.stopPropagation();
            onVisibilityToggle();
          }}
          className="w-5 h-5 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        >
          {layer.visible ? (
            <Eye className="w-3 h-3 text-foreground" />
          ) : (
            <EyeOff className="w-3 h-3 text-muted-foreground" />
          )}
        </button>

        {/* Lock */}
        <button
          type="button"
          aria-label={layer.locked ? "Unlock layer" : "Lock layer"}
          onClick={(e) => {
            e.stopPropagation();
            onLockToggle();
          }}
          className="w-5 h-5 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        >
          {layer.locked ? (
            <Lock className="w-3 h-3 text-amber-400" />
          ) : (
            <Unlock className="w-3 h-3 text-muted-foreground" />
          )}
        </button>

        {/* Type icon */}
        <Icon className="w-3 h-3 shrink-0" style={{ color }} />

        {/* Name */}
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <input
              ref={(el) => el?.focus()}
              value={renameValue}
              onChange={(e) => onRenameChange(e.target.value)}
              onBlur={onCommitRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") onCommitRename();
                if (e.key === "Escape") onCommitRename();
                e.stopPropagation();
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#0d1117] border border-blue-500/50 rounded px-1 py-0.5 text-[10px] text-foreground focus:outline-none"
            />
          ) : (
            <span
              className="text-[11px] truncate block"
              style={{ color: isSelected ? "#e2e8f0" : "#94a3b8" }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                onStartRename();
              }}
            >
              {layer.name}
            </span>
          )}
        </div>

        {/* Delete */}
        <button
          type="button"
          aria-label="Delete layer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-5 h-5 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 hover:text-red-400 text-muted-foreground transition-all"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </motion.div>
    </Reorder.Item>
  );
});
