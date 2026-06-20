import { useAdCreatorStore } from "@/store/adCreatorStore";
import { AlignCenter, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type LayoutMode = "horizontal" | "vertical" | "grid";
type Alignment = "start" | "center" | "end";

const LAYOUT_MODES: {
  id: LayoutMode;
  label: string;
  icon: React.ReactNode;
  desc: string;
}[] = [
  {
    id: "horizontal",
    label: "Horizontal",
    desc: "Elements in a row",
    icon: (
      <div className="flex items-center gap-1 justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-4 h-5 rounded"
            style={{ background: "#2563eb" }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "vertical",
    label: "Vertical",
    desc: "Elements in a column",
    icon: (
      <div className="flex flex-col items-center gap-1 justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-10 h-3 rounded"
            style={{ background: "#2563eb" }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "grid",
    label: "Grid",
    desc: "Elements in grid",
    icon: (
      <div className="grid grid-cols-2 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded"
            style={{ background: "#2563eb" }}
          />
        ))}
      </div>
    ),
  },
];

export function AutoLayoutModal({ open, onClose }: Props) {
  const { elements, selectedIds, moveElement } = useAdCreatorStore();
  const [mode, setMode] = useState<LayoutMode>("horizontal");
  const [spacing, setSpacing] = useState(20);
  const [padding, setPadding] = useState(16);
  const [alignment, setAlignment] = useState<Alignment>("center");
  const [gridCols, setGridCols] = useState(2);

  const selected = elements.filter((el) => selectedIds.includes(el.id));
  const hasEnough = selected.length >= 2;

  function applyLayout() {
    if (!hasEnough) return;

    const sorted = [...selected].sort((a, b) => a.x - b.x || a.y - b.y);

    if (mode === "horizontal") {
      let cx = padding;
      for (const el of sorted) {
        let y = el.y;
        if (alignment === "start") y = padding;
        else if (alignment === "center")
          y = sorted.reduce((acc, e) => acc + e.height, 0) / sorted.length / 2;
        else y = sorted[0].y + sorted[0].height - el.height;
        moveElement(el.id, cx, y);
        cx += el.width + spacing;
      }
    } else if (mode === "vertical") {
      let cy = padding;
      for (const el of sorted) {
        let x = el.x;
        if (alignment === "start") x = padding;
        else if (alignment === "center")
          x = Math.max(
            0,
            (sorted.reduce((acc, e) => Math.max(acc, e.x + e.width), 0) -
              el.width) /
              2,
          );
        else
          x =
            sorted.reduce((acc, e) => Math.max(acc, e.x + e.width), 0) -
            el.width;
        moveElement(el.id, x, cy);
        cy += el.height + spacing;
      }
    } else {
      // grid
      const cols = Math.max(1, gridCols);
      sorted.forEach((el, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const maxW = sorted.reduce((acc, e) => Math.max(acc, e.width), 0);
        const maxH = sorted.reduce((acc, e) => Math.max(acc, e.height), 0);
        moveElement(
          el.id,
          padding + col * (maxW + spacing),
          padding + row * (maxH + spacing),
        );
      });
    }
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="auto-layout-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "oklch(0 0 0 / 0.75)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-ocid="auto_layout.dialog"
        >
          <motion.div
            className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-glass-lg"
            style={{
              background: "oklch(0.11 0.006 240 / 0.97)",
              border: "1px solid oklch(0.25 0 0 / 0.4)",
            }}
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid oklch(0.2 0 0 / 0.4)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                  }}
                >
                  <AlignCenter size={16} className="text-white" />
                </div>
                <h2 className="text-white font-semibold text-lg font-editor">
                  Auto Layout
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth"
                data-ocid="auto_layout.close_button"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {!hasEnough ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-10"
                  data-ocid="auto_layout.empty_state"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "oklch(0.16 0 0)" }}
                  >
                    <AlignCenter size={24} className="text-white/30" />
                  </div>
                  <p className="text-white/60 font-editor text-sm text-center">
                    Select 2 or more elements on the canvas to use Auto Layout
                  </p>
                  <p className="text-white/30 font-editor text-xs text-center">
                    Currently selected: {selectedIds.length} element
                    {selectedIds.length !== 1 ? "s" : ""}
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-xs text-white/50 font-editor">
                    {selected.length} elements selected
                  </p>

                  {/* Layout Mode */}
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                      Layout Mode
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {LAYOUT_MODES.map((lm) => (
                        <motion.button
                          type="button"
                          key={lm.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setMode(lm.id)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl transition-smooth"
                          style={
                            mode === lm.id
                              ? {
                                  background: "oklch(0.38 0.15 270 / 0.2)",
                                  border: "1px solid #2563eb",
                                  boxShadow: "0 0 12px #2563eb44",
                                }
                              : {
                                  background: "oklch(0.14 0 0 / 0.5)",
                                  border: "1px solid oklch(0.22 0 0 / 0.4)",
                                }
                          }
                          data-ocid="auto_layout.radio"
                        >
                          <div className="h-10 flex items-center justify-center">
                            {lm.icon}
                          </div>
                          <div className="text-center">
                            <p className="text-white text-xs font-semibold font-editor">
                              {lm.label}
                            </p>
                            <p
                              className="font-editor text-white/40"
                              style={{ fontSize: "10px" }}
                            >
                              {lm.desc}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Grid columns (only for grid mode) */}
                  <AnimatePresence>
                    {mode === "grid" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="block text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                          Columns
                        </p>
                        <div className="flex gap-2">
                          {[2, 3, 4].map((n) => (
                            <button
                              type="button"
                              key={n}
                              onClick={() => setGridCols(n)}
                              className="w-10 h-10 rounded-lg text-sm font-semibold font-editor transition-smooth"
                              style={
                                gridCols === n
                                  ? { background: "#2563eb", color: "#fff" }
                                  : {
                                      background: "oklch(0.16 0 0)",
                                      color: "oklch(0.7 0 0)",
                                    }
                              }
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Spacing */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-white/40 uppercase tracking-widest font-editor">
                        Spacing
                      </p>
                      <span className="text-xs text-white/70 font-editor">
                        {spacing}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={spacing}
                      onChange={(e) =>
                        setSpacing(Number.parseInt(e.target.value))
                      }
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2563eb ${spacing}%, oklch(0.22 0 0) ${spacing}%)`,
                      }}
                      data-ocid="auto_layout.input"
                    />
                  </div>

                  {/* Padding */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-white/40 uppercase tracking-widest font-editor">
                        Group Padding
                      </p>
                      <span className="text-xs text-white/70 font-editor">
                        {padding}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={padding}
                      onChange={(e) =>
                        setPadding(Number.parseInt(e.target.value))
                      }
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2563eb ${(padding / 80) * 100}%, oklch(0.22 0 0) ${(padding / 80) * 100}%)`,
                      }}
                    />
                  </div>

                  {/* Alignment */}
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                      Cross-Axis Alignment
                    </p>
                    <div className="flex gap-2">
                      {(["start", "center", "end"] as Alignment[]).map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => setAlignment(a)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium font-editor capitalize transition-smooth"
                          style={
                            alignment === a
                              ? {
                                  background: "oklch(0.38 0.15 270 / 0.3)",
                                  color: "#93c5fd",
                                  border: "1px solid #2563eb",
                                }
                              : {
                                  background: "oklch(0.14 0 0 / 0.5)",
                                  color: "oklch(0.6 0 0)",
                                  border: "1px solid oklch(0.22 0 0 / 0.4)",
                                }
                          }
                          data-ocid="auto_layout.toggle"
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={applyLayout}
                    className="w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth"
                    style={{
                      background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                      boxShadow: "0 0 24px #0891b244",
                    }}
                    data-ocid="auto_layout.confirm_button"
                  >
                    Apply Layout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
