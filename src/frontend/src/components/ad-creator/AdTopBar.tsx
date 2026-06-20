import { CANVAS_PRESETS, useAdCreatorStore } from "@/store/adCreatorStore";
import {
  ChevronDown,
  ChevronLeft,
  Download,
  Expand,
  Redo2,
  Save,
  Share2,
  Sparkles,
  Undo2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Props ─────────────────────────────────────────────────────────────────────
export interface AdTopBarProps {
  onMagicDesign: () => void;
  onMagicResize: () => void;
  onExport: (format: string, quality: string) => void;
}

// ─── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.92 }}
      transition={{ duration: 0.12 }}
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div
        className="px-2 py-1 rounded-md text-[11px] text-white/80 whitespace-nowrap"
        style={{
          background: "rgba(15,23,42,0.97)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── Icon Button with Tooltip ─────────────────────────────────────────────────
function IconBtn({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  "data-ocid": ocid,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  "data-ocid"?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={disabled ? {} : { scale: 1.07 }}
        whileTap={disabled ? {} : { scale: 0.93 }}
        data-ocid={ocid}
        className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-white/10 text-white/70 hover:text-white"
        }`}
      >
        <Icon size={15} />
      </motion.button>
      <AnimatePresence>
        {hover && !disabled && <Tooltip label={label} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="w-px h-5 bg-white/10 mx-1" />;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function AdTopBar({
  onMagicDesign,
  onMagicResize,
  onExport,
}: AdTopBarProps) {
  const {
    projectTitle,
    setProjectTitle,
    undo,
    redo,
    history,
    historyIndex,
    isSaved,
    canvasSize,
    setCanvasSize,
  } = useAdCreatorStore();

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(projectTitle);
  const [resizeOpen, setResizeOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [shareConfirm, setShareConfirm] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Sync draft when store changes externally
  useEffect(() => {
    if (!editingTitle) setTitleDraft(projectTitle);
  }, [projectTitle, editingTitle]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resizeRef.current && !resizeRef.current.contains(e.target as Node))
        setResizeOpen(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node))
        setExportOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Keyboard shortcuts — Ctrl+Z/Y/S only; other shortcuts handled by AdCanvas/AdCreatorPage
  // NOTE: undo/redo are also handled in AdCanvas. Having them here is fine (idempotent).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
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
    // handleSave is defined inline and stable — undo/redo are Zustand actions (stable refs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undo, redo]);

  function commitTitle() {
    const trimmed = titleDraft.trim() || "Untitled Ad";
    setProjectTitle(trimmed);
    setTitleDraft(trimmed);
    setEditingTitle(false);
  }

  function handleSave() {
    // Mark saved in store by temporarily syncing (store tracks isSaved)
    useAdCreatorStore.setState({ isSaved: true });
    setSaveConfirm(true);
    toast.success("Project saved", { duration: 2000 });
    setTimeout(() => setSaveConfirm(false), 2200);
  }

  function handleShare() {
    const url = `${window.location.origin}/ad-creator?project=${encodeURIComponent(projectTitle)}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setShareConfirm(true);
    toast.success("Link copied!", { duration: 2500 });
    setTimeout(() => setShareConfirm(false), 2600);
  }

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const EXPORT_FORMATS = [
    { fmt: "PNG", desc: "Best for web" },
    { fmt: "JPG", desc: "Compressed" },
    { fmt: "SVG", desc: "Vector" },
    { fmt: "MP4", desc: "Video ads" },
    { fmt: "PDF", desc: "Print-ready" },
  ];
  const EXPORT_QUALITIES = ["720p", "1080p", "4K"];

  return (
    <div
      className="relative z-40 flex items-center h-14 px-3 gap-1"
      style={{
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.3)",
      }}
      data-ocid="ad_creator.topbar"
    >
      {/* ── LEFT ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Back */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.06, x: -1 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors"
          data-ocid="ad_creator.topbar.back_link"
        >
          <ChevronLeft size={16} />
        </motion.a>

        {/* Logo + label */}
        <div className="flex items-center gap-1.5 mr-1">
          <div
            className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#2563EB,#3b82f6)" }}
          >
            E
          </div>
          <span className="text-white/40 text-xs hidden sm:block">
            Ad Creator
          </span>
        </div>

        <span className="text-white/20 text-xs">/</span>

        {/* Editable project title */}
        <div className="flex items-center gap-1.5 min-w-0">
          {editingTitle ? (
            <motion.input
              ref={titleRef}
              autoFocus
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitTitle();
                if (e.key === "Escape") {
                  setTitleDraft(projectTitle);
                  setEditingTitle(false);
                }
              }}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              className="text-sm font-medium text-white bg-transparent outline-none rounded-md px-2 py-0.5 min-w-0 max-w-[180px]"
              style={{
                border: "1px solid rgba(37,99,235,0.5)",
                background: "rgba(37,99,235,0.08)",
              }}
              data-ocid="ad_creator.topbar.title_input"
            />
          ) : (
            <motion.button
              type="button"
              onClick={() => setEditingTitle(true)}
              whileHover={{ scale: 1.02 }}
              className="text-sm font-medium text-white/80 hover:text-white px-2 py-0.5 rounded-md hover:bg-white/8 transition-colors truncate max-w-[180px]"
              data-ocid="ad_creator.topbar.title_button"
            >
              {projectTitle}
            </motion.button>
          )}
          {!isSaved && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"
              title="Unsaved changes"
            />
          )}
        </div>
      </div>

      {/* ── CENTER ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1">
        {/* Undo / Redo */}
        <IconBtn
          icon={Undo2}
          label="Undo (Ctrl+Z)"
          onClick={undo}
          disabled={!canUndo}
          data-ocid="ad_creator.topbar.undo_button"
        />
        <IconBtn
          icon={Redo2}
          label="Redo (Ctrl+Y)"
          onClick={redo}
          disabled={!canRedo}
          data-ocid="ad_creator.topbar.redo_button"
        />

        <Divider />

        {/* Resize dropdown */}
        <div className="relative" ref={resizeRef}>
          <motion.button
            type="button"
            onClick={() => {
              setResizeOpen((o) => !o);
              setExportOpen(false);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            data-ocid="ad_creator.topbar.resize_button"
          >
            <Expand size={13} />
            <span className="hidden sm:block max-w-[90px] truncate">
              {canvasSize.name}
            </span>
            <ChevronDown
              size={11}
              className={`transition-transform ${resizeOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          <AnimatePresence>
            {resizeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 left-0 z-50 rounded-xl overflow-hidden w-60 shadow-2xl"
                style={{
                  background: "rgba(15,23,42,0.98)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
                data-ocid="ad_creator.topbar.resize_dropdown"
              >
                <div className="p-1.5">
                  {CANVAS_PRESETS.map((preset) => {
                    const ar = (preset.width / preset.height).toFixed(2);
                    const active = canvasSize.name === preset.name;
                    return (
                      <motion.button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          if (preset.name === "Custom") {
                            onMagicResize();
                          } else {
                            setCanvasSize(preset);
                            onMagicResize();
                          }
                          setResizeOpen(false);
                        }}
                        whileHover={{ x: 2 }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                          active
                            ? "bg-blue-600/20 text-blue-300"
                            : "text-white/70 hover:bg-white/8 hover:text-white"
                        }`}
                        data-ocid={`ad_creator.topbar.resize_option.${preset.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                      >
                        <div>
                          <p className="text-xs font-medium">{preset.name}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">
                            {preset.width} × {preset.height}
                          </p>
                        </div>
                        <div
                          className="rounded border border-white/20 bg-white/5 flex-shrink-0"
                          style={{
                            width: Math.round(28 * Math.min(1, Number(ar))),
                            height: Math.round(28 / Math.max(1, Number(ar))),
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Divider />

        {/* AI Generate */}
        <motion.button
          type="button"
          onClick={onMagicDesign}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold text-white relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(139,92,246,0.25))",
            border: "1px solid rgba(37,99,235,0.4)",
          }}
          data-ocid="ad_creator.topbar.ai_generate_button"
        >
          <motion.div
            className="absolute inset-0 rounded-lg"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(37,99,235,0)",
                "0 0 12px 2px rgba(37,99,235,0.35)",
                "0 0 0 0 rgba(37,99,235,0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <Sparkles size={13} className="text-blue-400" />
          <span>AI Generate</span>
        </motion.button>
      </div>

      {/* ── RIGHT ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 flex-1 justify-end">
        {/* Save */}
        <motion.button
          type="button"
          onClick={handleSave}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          data-ocid="ad_creator.topbar.save_button"
        >
          <Save size={13} />
          <AnimatePresence mode="wait">
            {saveConfirm ? (
              <motion.span
                key="saved"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-emerald-400"
              >
                Saved ✓
              </motion.span>
            ) : (
              <motion.span
                key="save"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                Save
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Export dropdown */}
        <div className="relative" ref={exportRef}>
          <motion.button
            type="button"
            onClick={() => {
              setExportOpen((o) => !o);
              setResizeOpen(false);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold text-white transition-colors"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)" }}
            data-ocid="ad_creator.topbar.export_button"
          >
            <Download size={13} />
            Export
            <ChevronDown
              size={11}
              className={`transition-transform ${exportOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          <AnimatePresence>
            {exportOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 right-0 z-50 rounded-xl overflow-hidden w-52 shadow-2xl"
                style={{
                  background: "rgba(15,23,42,0.98)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
                data-ocid="ad_creator.topbar.export_dropdown"
              >
                <div className="p-1.5">
                  <p className="px-3 py-1.5 text-[10px] text-white/30 uppercase tracking-wider">
                    Format
                  </p>
                  {EXPORT_FORMATS.map(({ fmt, desc }) => (
                    <div key={fmt} className="mb-0.5">
                      <p className="px-3 pt-1 text-[10px] text-white/50 font-medium">
                        {fmt} — {desc}
                      </p>
                      <div className="flex gap-1 px-3 pb-1">
                        {EXPORT_QUALITIES.map((q) => (
                          <motion.button
                            key={q}
                            type="button"
                            onClick={() => {
                              onExport(fmt, q);
                              setExportOpen(false);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 py-1 rounded-md text-[10px] font-medium text-white/60 hover:text-white hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/40 transition-all"
                            data-ocid={`ad_creator.topbar.export_option.${fmt.toLowerCase()}_${q.toLowerCase()}`}
                          >
                            {q}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Share */}
        <motion.button
          type="button"
          onClick={handleShare}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          data-ocid="ad_creator.topbar.share_button"
        >
          <AnimatePresence mode="wait">
            {shareConfirm ? (
              <motion.span
                key="copied"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
                className="text-[10px] text-emerald-400 font-medium"
              >
                ✓
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
              >
                <Share2 size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Avatar */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white cursor-pointer select-none flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}
            title="Elysian Labs"
            data-ocid="ad_creator.topbar.avatar"
          >
            EL
          </motion.div>
        </div>
      </div>
    </div>
  );
}
