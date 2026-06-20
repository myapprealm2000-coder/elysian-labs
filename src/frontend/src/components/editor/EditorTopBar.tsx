import { useVideoEditorStore } from "@/store/videoEditorStore";
import { type AspectRatio, SidebarSection } from "@/types/videoEditor";
import {
  Check,
  ChevronDown,
  Download,
  Loader2,
  Redo2,
  Save,
  Undo2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ASPECT_RATIOS: AspectRatio[] = ["16:9", "9:16", "1:1", "4:5", "21:9"];

interface EditorTopBarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onSave: () => void;
  onExport: () => void;
  hasSrc: boolean;
}

export function EditorTopBar({
  projectName,
  onProjectNameChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onSave,
  // onExport is handled internally via setExportModalOpen
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onExport: _onExport,
  hasSrc,
}: EditorTopBarProps) {
  const { autosaveStatus, aspectRatio, setAspectRatio, setExportModalOpen } =
    useVideoEditorStore();
  const [editingName, setEditingName] = useState(false);
  const [ratioOpen, setRatioOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingName) nameInputRef.current?.select();
  }, [editingName]);

  return (
    <header
      className="flex items-center gap-1.5 px-3 flex-shrink-0 border-b z-30 font-['Inter',sans-serif]"
      style={{
        height: 48,
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(7,11,20,0.98) 100%)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
      data-ocid="editor-topbar"
    >
      {/* Project Name */}
      <div className="flex items-center gap-2 min-w-0">
        {editingName ? (
          <input
            ref={nameInputRef}
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape")
                setEditingName(false);
            }}
            className="text-sm font-semibold text-white bg-white/10 border border-[#2563EB]/60 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#2563EB] w-48 transition-all"
            data-ocid="editor-topbar-name-input"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditingName(true)}
            className="text-sm font-semibold text-white/90 hover:text-white truncate max-w-[180px] hover:bg-white/5 px-2.5 py-1 rounded-lg transition-all cursor-text"
            title="Click to rename"
            data-ocid="editor-topbar-name"
          >
            {projectName}
          </button>
        )}

        {/* Autosave indicator */}
        <AnimatePresence mode="wait">
          {autosaveStatus === "saving" && (
            <motion.div
              key="saving"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 text-[11px] text-white/40"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 0.8,
                  ease: "linear",
                }}
              >
                <Loader2 className="w-3 h-3" />
              </motion.div>
              <span>Saving</span>
            </motion.div>
          )}
          {autosaveStatus === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 text-[11px] text-[#22C55E]"
            >
              <Check className="w-3 h-3" />
              <span>Saved</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="w-px h-5 mx-1"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 disabled:opacity-25 transition-all"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
          data-ocid="editor-topbar-undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/8 disabled:opacity-25 transition-all"
          title="Redo (Ctrl+Shift+Z)"
          aria-label="Redo"
          data-ocid="editor-topbar-redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div
        className="w-px h-5 mx-1"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Zoom */}
      <span className="text-[11px] font-mono text-white/40 w-10 text-center">
        {Math.round(zoom * 100)}%
      </span>

      <div
        className="w-px h-5 mx-1"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Aspect Ratio */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setRatioOpen((o) => !o)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/8 border border-white/8 hover:border-white/15 transition-all"
          data-ocid="editor-topbar-aspect-ratio"
        >
          {aspectRatio}
          <ChevronDown className="w-3 h-3" />
        </button>
        <AnimatePresence>
          {ratioOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full mt-1.5 left-0 rounded-xl border overflow-hidden z-50"
              style={{
                background: "rgba(15,23,42,0.98)",
                borderColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {ASPECT_RATIOS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setAspectRatio(r);
                    setRatioOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-[12px] font-medium transition-all"
                  style={{
                    color:
                      r === aspectRatio ? "#2563EB" : "rgba(255,255,255,0.75)",
                    background:
                      r === aspectRatio
                        ? "rgba(37,99,235,0.12)"
                        : "transparent",
                  }}
                >
                  {r}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1" />

      {/* Save */}
      <button
        type="button"
        onClick={onSave}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
        data-ocid="editor-topbar-save"
      >
        <Save className="w-3.5 h-3.5" />
        Save
      </button>

      {/* Export */}
      <button
        type="button"
        onClick={() => setExportModalOpen(true)}
        disabled={!hasSrc}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-bold text-white disabled:opacity-30 transition-all"
        style={{
          background: hasSrc
            ? "linear-gradient(135deg, #2563EB, #22C55E)"
            : "rgba(255,255,255,0.05)",
          boxShadow: hasSrc
            ? "0 0 16px rgba(37,99,235,0.35), 0 0 40px rgba(34,197,94,0.12)"
            : "none",
        }}
        data-ocid="editor-topbar-export"
      >
        <Download className="w-3.5 h-3.5" />
        Export
      </button>
    </header>
  );
}
