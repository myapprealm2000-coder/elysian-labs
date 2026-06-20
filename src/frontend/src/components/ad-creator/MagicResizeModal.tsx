import { CANVAS_PRESETS, useAdCreatorStore } from "@/store/adCreatorStore";
import type { CanvasSize } from "@/store/adCreatorStore";
import {
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Maximize2,
  Monitor,
  Smartphone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type ScaleMethod = "fit" | "fill" | "keep";

const EXTENDED_PRESETS: (CanvasSize & {
  icon: React.ReactNode;
  ratio: string;
  color: string;
})[] = [
  {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    icon: <Instagram size={14} />,
    ratio: "1:1",
    color: "#e1306c",
  },
  {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    icon: <Instagram size={14} />,
    ratio: "9:16",
    color: "#e1306c",
  },
  {
    name: "TikTok",
    width: 1080,
    height: 1920,
    icon: <Smartphone size={14} />,
    ratio: "9:16",
    color: "#69c9d0",
  },
  {
    name: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    icon: <Youtube size={14} />,
    ratio: "16:9",
    color: "#ff0000",
  },
  {
    name: "Facebook Ad",
    width: 1200,
    height: 628,
    icon: <Facebook size={14} />,
    ratio: "1.91:1",
    color: "#1877f2",
  },
  {
    name: "LinkedIn",
    width: 1200,
    height: 627,
    icon: <Linkedin size={14} />,
    ratio: "1.91:1",
    color: "#0077b5",
  },
  {
    name: "Twitter/X Banner",
    width: 1500,
    height: 500,
    icon: <Twitter size={14} />,
    ratio: "3:1",
    color: "#1da1f2",
  },
  {
    name: "Pinterest",
    width: 1000,
    height: 1500,
    icon: <Monitor size={14} />,
    ratio: "2:3",
    color: "#bd081c",
  },
];

const SCALE_METHODS: { id: ScaleMethod; label: string; desc: string }[] = [
  {
    id: "fit",
    label: "Scale & Fit",
    desc: "Fit all elements inside new bounds",
  },
  {
    id: "fill",
    label: "Scale & Fill",
    desc: "Fill new bounds, may crop edges",
  },
  {
    id: "keep",
    label: "Keep Proportions",
    desc: "Elements keep original scale",
  },
];

function RatioDiagram({ w, h }: { w: number; h: number }) {
  const maxD = 28;
  const ratio = w / h;
  const dw = ratio >= 1 ? maxD : maxD * ratio;
  const dh = ratio < 1 ? maxD : maxD / ratio;
  return (
    <div className="flex items-center justify-center w-8 h-8">
      <div
        className="rounded-sm"
        style={{
          width: dw,
          height: dh,
          background: "oklch(0.38 0.15 270 / 0.4)",
          border: "1px solid oklch(0.38 0.15 270 / 0.7)",
        }}
      />
    </div>
  );
}

export function MagicResizeModal({ open, onClose }: Props) {
  const { canvasSize, setCanvasSize, elements, moveElement, resizeElement } =
    useAdCreatorStore();
  const [selected, setSelected] = useState<string>(canvasSize.name);
  const [scaleMethod, setScaleMethod] = useState<ScaleMethod>("fit");
  const [customW, setCustomW] = useState("800");
  const [customH, setCustomH] = useState("600");
  const [showCustom, setShowCustom] = useState(false);

  const selectedPreset =
    EXTENDED_PRESETS.find((p) => p.name === selected) ??
    (showCustom
      ? ({
          name: "Custom",
          width: Number.parseInt(customW) || 800,
          height: Number.parseInt(customH) || 600,
        } as CanvasSize)
      : null);

  function handleResize() {
    const newSize: CanvasSize = showCustom
      ? {
          name: "Custom",
          width: Number.parseInt(customW) || 800,
          height: Number.parseInt(customH) || 600,
        }
      : (selectedPreset as CanvasSize);
    if (!newSize) return;

    const oldW = canvasSize.width;
    const oldH = canvasSize.height;
    const newW = newSize.width;
    const newH = newSize.height;
    const scaleX = newW / oldW;
    const scaleY = newH / oldH;

    for (const el of elements) {
      if (scaleMethod === "fit" || scaleMethod === "fill") {
        const sx =
          scaleMethod === "fit"
            ? Math.min(scaleX, scaleY)
            : Math.max(scaleX, scaleY);
        moveElement(el.id, Math.round(el.x * sx), Math.round(el.y * sx));
        resizeElement(
          el.id,
          Math.round(el.width * sx),
          Math.round(el.height * sx),
        );
      } else {
        moveElement(
          el.id,
          Math.round(el.x * scaleX),
          Math.round(el.y * scaleY),
        );
      }
    }

    setCanvasSize(newSize);
    onClose();
  }

  const presetList = CANVAS_PRESETS;
  void presetList;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="magic-resize-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "oklch(0 0 0 / 0.75)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-ocid="magic_resize.dialog"
        >
          <motion.div
            className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-glass-lg"
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
                    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  }}
                >
                  <Maximize2 size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg font-editor">
                    Magic Resize
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-editor"
                  style={{
                    background: "oklch(0.38 0.15 270 / 0.2)",
                    color: "#93c5fd",
                    border: "1px solid oklch(0.38 0.15 270 / 0.3)",
                  }}
                >
                  {canvasSize.width} × {canvasSize.height}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-smooth"
                  data-ocid="magic_resize.close_button"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Format Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {EXTENDED_PRESETS.map((preset) => (
                  <motion.button
                    type="button"
                    key={preset.name}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelected(preset.name);
                      setShowCustom(false);
                    }}
                    className="relative flex items-center gap-3 p-3 rounded-xl transition-smooth text-left"
                    style={{
                      background:
                        selected === preset.name
                          ? "oklch(0.38 0.15 270 / 0.15)"
                          : "oklch(0.14 0 0 / 0.5)",
                      border:
                        selected === preset.name
                          ? "1px solid #2563eb"
                          : "1px solid oklch(0.22 0 0 / 0.4)",
                      boxShadow:
                        selected === preset.name
                          ? "0 0 12px #2563eb44"
                          : "none",
                    }}
                    data-ocid={`magic_resize.item.${EXTENDED_PRESETS.indexOf(preset) + 1}`}
                  >
                    <RatioDiagram w={preset.width} h={preset.height} />
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs font-semibold font-editor truncate">
                        {preset.name}
                      </p>
                      <p
                        className="font-editor"
                        style={{ fontSize: "10px", color: "oklch(0.5 0 0)" }}
                      >
                        {preset.width}×{preset.height}
                      </p>
                      <span
                        className="inline-block px-1.5 py-0.5 rounded font-editor"
                        style={{
                          background: "oklch(0.18 0 0)",
                          color: preset.color,
                          fontSize: "9px",
                        }}
                      >
                        {preset.ratio}
                      </span>
                    </div>
                    {selected === preset.name && (
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#2563eb" }}
                      >
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}

                {/* Custom */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowCustom(true);
                    setSelected("");
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl transition-smooth text-left"
                  style={{
                    background: showCustom
                      ? "oklch(0.38 0.15 270 / 0.15)"
                      : "oklch(0.14 0 0 / 0.5)",
                    border: showCustom
                      ? "1px solid #2563eb"
                      : "1px solid oklch(0.22 0 0 / 0.4)",
                  }}
                  data-ocid="magic_resize.item.9"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div
                      className="w-5 h-4 rounded-sm border-2"
                      style={{
                        borderColor: showCustom ? "#2563eb" : "oklch(0.4 0 0)",
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold font-editor">
                      Custom
                    </p>
                    <p
                      className="font-editor"
                      style={{ fontSize: "10px", color: "oklch(0.5 0 0)" }}
                    >
                      Set your own size
                    </p>
                  </div>
                </motion.button>
              </div>

              {/* Custom inputs */}
              <AnimatePresence>
                {showCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label
                          htmlFor="mresize_w"
                          className="block text-xs text-white/40 font-editor mb-1"
                        >
                          Width (px)
                        </label>
                        <input
                          id="mresize_w"
                          type="number"
                          className="w-full editor-input-glass"
                          value={customW}
                          onChange={(e) => setCustomW(e.target.value)}
                          data-ocid="magic_resize.input"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="mresize_h"
                          className="block text-xs text-white/40 font-editor mb-1"
                        >
                          Height (px)
                        </label>
                        <input
                          id="mresize_h"
                          type="number"
                          className="w-full editor-input-glass"
                          value={customH}
                          onChange={(e) => setCustomH(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scale method */}
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-editor mb-2">
                  Scale Method
                </p>
                <div className="flex gap-2">
                  {SCALE_METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setScaleMethod(m.id)}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-editor transition-smooth text-center"
                      style={
                        scaleMethod === m.id
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
                      data-ocid="magic_resize.toggle"
                    >
                      <div className="font-medium">{m.label}</div>
                      <div
                        className="mt-0.5 opacity-60"
                        style={{ fontSize: "10px" }}
                      >
                        {m.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleResize}
                disabled={!selected && !showCustom}
                className="w-full py-3.5 rounded-xl text-white font-semibold font-editor text-sm transition-smooth disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  boxShadow: "0 0 24px #2563eb55",
                }}
                data-ocid="magic_resize.confirm_button"
              >
                Resize Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
