import { AdCanvasKeyedWrapper } from "@/components/ad-creator/AdCanvas";
import { AdErrorBoundary } from "@/components/ad-creator/AdErrorBoundary";
import { AdPropertiesPanel } from "@/components/ad-creator/AdPropertiesPanel";
import { AdSidebar } from "@/components/ad-creator/AdSidebar";
import { AdTopBar } from "@/components/ad-creator/AdTopBar";
import { AiCopywriterModal } from "@/components/ad-creator/AiCopywriterModal";
import { AiImageGenModal } from "@/components/ad-creator/AiImageGenModal";
import { AutoLayoutModal } from "@/components/ad-creator/AutoLayoutModal";
import { ExportModal } from "@/components/ad-creator/ExportModal";
import { MagicDesignModal } from "@/components/ad-creator/MagicDesignModal";
import { MagicResizeModal } from "@/components/ad-creator/MagicResizeModal";
import { useAdCreatorStore } from "@/store/adCreatorStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AdCreatorPage() {
  const undo = useAdCreatorStore((s) => s.undo);
  const redo = useAdCreatorStore((s) => s.redo);
  const deselectAll = useAdCreatorStore((s) => s.deselectAll);

  const [showMagicDesign, setShowMagicDesign] = useState(false);
  const [showMagicResize, setShowMagicResize] = useState(false);
  const [showAiCopywriter, setShowAiCopywriter] = useState(false);
  const [showAiImageGen, setShowAiImageGen] = useState(false);
  const [showAutoLayout, setShowAutoLayout] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exportFormat, setExportFormat] = useState("");
  const [exportQuality, setExportQuality] = useState("");
  const [isReady, setIsReady] = useState(false);

  // ── Loading guard: defer render by one tick so store is initialized ─────────
  useEffect(() => {
    const id = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(id);
  }, []);

  // ── Page title ───────────────────────────────────────────────────────────────
  useEffect(() => {
    document.title = "Ad Creator — Elysian Labs";
  }, []);

  // ── Keyboard shortcuts — STABLE deps only (no modal states) ─────────────────
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isInput =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable;

      // Ctrl+Z — undo
      if (e.ctrlKey && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        undo();
        return;
      }
      // Ctrl+Shift+Z / Ctrl+Y — redo
      if (
        (e.ctrlKey && e.shiftKey && e.key === "z") ||
        (e.ctrlKey && e.key === "y")
      ) {
        e.preventDefault();
        redo();
        return;
      }
      // Ctrl+A — select all
      if (e.ctrlKey && e.key === "a" && !isInput) {
        e.preventDefault();
        const store = useAdCreatorStore.getState();
        for (const el of store.elements) {
          store.selectElement(el.id, true);
        }
        return;
      }
      // Ctrl+S — save (noop, just prevent browser save)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return;
      }
      // Ctrl+E — open export
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        setShowExport(true);
        return;
      }
      // Delete / Backspace — delete selected (not in inputs)
      if ((e.key === "Delete" || e.key === "Backspace") && !isInput) {
        e.preventDefault();
        const store = useAdCreatorStore.getState();
        for (const id of store.selectedIds) {
          store.deleteElement(id);
        }
        return;
      }
      // Escape — read modal states directly from component state via getState trick
      // Use a ref-free approach: read current modal state through setters
      if (e.key === "Escape") {
        // Close any open modal by calling all setters to false.
        // This is safe even if they're already false.
        setShowMagicDesign((v) => {
          if (v) return false;
          deselectAll();
          return v;
        });
        setShowMagicResize((v) => (v ? false : v));
        setShowAiCopywriter((v) => (v ? false : v));
        setShowAiImageGen((v) => (v ? false : v));
        setShowAutoLayout((v) => (v ? false : v));
        setShowExport((v) => (v ? false : v));
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [undo, redo, deselectAll]);

  // ── Export callback from top bar ──────────────────────────────────────────────
  const handleExport = (format: string, quality: string) => {
    setExportFormat(format);
    setExportQuality(quality);
    setShowExport(true);
  };

  if (!isReady) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "#070B14" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500"
          style={{ animation: "spin 1s linear infinite" }}
        />
      </div>
    );
  }

  return (
    <AdErrorBoundary name="Ad Studio">
      <motion.div
        data-ocid="ad_creator.page"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col h-screen overflow-hidden"
        style={{ background: "#070B14" }}
      >
        {/* ── Top Bar ───────────────────────────────────────────────────── */}
        <AdErrorBoundary name="Top Bar">
          <AdTopBar
            onMagicDesign={() => setShowMagicDesign(true)}
            onMagicResize={() => setShowMagicResize(true)}
            onExport={handleExport}
          />
        </AdErrorBoundary>

        {/* ── Main workspace ────────────────────────────────────────────── */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left sidebar */}
          <AdErrorBoundary name="Sidebar">
            <AdSidebar
              onOpenMagicDesign={() => setShowMagicDesign(true)}
              onOpenAiCopywriter={() => setShowAiCopywriter(true)}
              onOpenAiImageGen={() => setShowAiImageGen(true)}
              onOpenMagicResize={() => setShowMagicResize(true)}
              onOpenAutoLayout={() => setShowAutoLayout(true)}
            />
          </AdErrorBoundary>

          {/* Center canvas — key on renderKey forces full remount when template is applied */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AdErrorBoundary name="Canvas">
              <AdCanvasKeyedWrapper />
            </AdErrorBoundary>
          </div>

          {/* Right properties panel */}
          <div
            className="hidden md:block w-80 shrink-0 overflow-y-auto"
            style={{
              background: "rgba(17,24,39,0.95)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <AdErrorBoundary name="Properties Panel">
              <AdPropertiesPanel />
            </AdErrorBoundary>
          </div>
        </div>

        {/* ── Modals ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {showMagicDesign && (
            <MagicDesignModal
              key="magic-design-modal"
              open={showMagicDesign}
              onClose={() => setShowMagicDesign(false)}
            />
          )}
          {showMagicResize && (
            <MagicResizeModal
              key="magic-resize-modal"
              open={showMagicResize}
              onClose={() => setShowMagicResize(false)}
            />
          )}
          {showAiCopywriter && (
            <AiCopywriterModal
              key="ai-copywriter-modal"
              open={showAiCopywriter}
              onClose={() => setShowAiCopywriter(false)}
            />
          )}
          {showAiImageGen && (
            <AiImageGenModal
              key="ai-image-gen-modal"
              open={showAiImageGen}
              onClose={() => setShowAiImageGen(false)}
            />
          )}
          {showAutoLayout && (
            <AutoLayoutModal
              key="auto-layout-modal"
              open={showAutoLayout}
              onClose={() => setShowAutoLayout(false)}
            />
          )}
          {showExport && (
            <ExportModal
              key="export-modal"
              onClose={() => setShowExport(false)}
              initialFormat={exportFormat || undefined}
              initialQuality={exportQuality || undefined}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AdErrorBoundary>
  );
}
