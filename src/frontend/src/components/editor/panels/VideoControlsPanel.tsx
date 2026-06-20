import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { AspectRatio } from "@/types/videoEditor";
import {
  CropIcon,
  FlipHorizontal,
  FlipVertical,
  RotateCcw,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const ASPECT_RATIOS: {
  id: AspectRatio;
  label: string;
  w: number;
  h: number;
}[] = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "9:16", label: "9:16", w: 9, h: 16 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "4:5", label: "4:5", w: 4, h: 5 },
  { id: "21:9", label: "21:9", w: 21, h: 9 },
];

const SPEED_PRESETS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const ROTATION_PRESETS = [0, 90, 180, 270];

// ─── Crop Modal ───────────────────────────────────────────────────────────────

interface CropModalProps {
  onApply: (cropX: number, cropY: number, cropW: number, cropH: number) => void;
  onCancel: () => void;
  initial: { cropX: number; cropY: number; cropW: number; cropH: number };
}

function CropModal({ onApply, onCancel, initial }: CropModalProps) {
  const [crop, setCrop] = useState(initial);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="crop-overlay"
    >
      <motion.div
        className="rounded-2xl overflow-hidden w-[420px]"
        style={{
          background: "#0F172A",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.7)",
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        data-ocid="crop-modal"
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: BORDER }}
        >
          <h3 className="text-[14px] font-semibold text-white/90">
            Crop Region
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Visual crop preview */}
        <div className="p-5">
          <div
            className="relative mx-auto rounded-lg overflow-hidden mb-5"
            style={{
              width: 280,
              height: 158,
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Dark overlay outside crop area */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.6)" }}
            />
            {/* Crop rectangle */}
            <motion.div
              className="absolute border-2 box-border"
              style={{
                left: `${crop.cropX}%`,
                top: `${crop.cropY}%`,
                width: `${crop.cropW}%`,
                height: `${crop.cropH}%`,
                borderColor: ACCENT,
                background: "rgba(37,99,235,0.08)",
              }}
              animate={{
                left: `${crop.cropX}%`,
                top: `${crop.cropY}%`,
                width: `${crop.cropW}%`,
                height: `${crop.cropH}%`,
              }}
              transition={{ duration: 0.15 }}
            >
              {/* Corner handles */}
              {["tl", "tr", "bl", "br"].map((h) => (
                <div
                  key={h}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 6px ${ACCENT}`,
                    ...(h === "tl" ? { top: -5, left: -5 } : {}),
                    ...(h === "tr" ? { top: -5, right: -5 } : {}),
                    ...(h === "bl" ? { bottom: -5, left: -5 } : {}),
                    ...(h === "br" ? { bottom: -5, right: -5 } : {}),
                  }}
                />
              ))}
            </motion.div>
            {/* Grid lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: 0.15 }}
            >
              <div
                className="absolute"
                style={{
                  left: "33.3%",
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: "white",
                }}
              />
              <div
                className="absolute"
                style={{
                  left: "66.6%",
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: "white",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: "33.3%",
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "white",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: "66.6%",
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "white",
                }}
              />
            </div>
          </div>

          {/* Crop controls */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(["cropX", "cropY", "cropW", "cropH"] as const).map((key) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">
                    {key === "cropX"
                      ? "X Offset"
                      : key === "cropY"
                        ? "Y Offset"
                        : key === "cropW"
                          ? "Width"
                          : "Height"}
                  </span>
                  <span className="text-[10px] font-mono text-white/50">
                    {crop[key]}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={key === "cropX" || key === "cropY" ? 50 : 20}
                  max-crop={key === "cropW" || key === "cropH" ? 100 : 50}
                  value={crop[key]}
                  onChange={(e) =>
                    setCrop((prev) => ({
                      ...prev,
                      [key]: Number(e.target.value),
                    }))
                  }
                  className="w-full h-1.5 rounded-full cursor-pointer"
                  style={{ accentColor: ACCENT }}
                  data-ocid={`crop-slider-${key}`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 h-9 rounded-xl text-sm text-white/60 transition-all hover:text-white/90"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${BORDER}`,
              }}
              data-ocid="crop-cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                onApply(crop.cropX, crop.cropY, crop.cropW, crop.cropH)
              }
              className="flex-1 h-9 rounded-xl text-sm text-white font-semibold transition-all hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #1d4ed8)`,
              }}
              data-ocid="crop-apply"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export function VideoControlsPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const editor = useVideoEditor(videoRef);
  const store = useVideoEditorStore();
  const { videoTransform, aspectRatio, playbackSpeed } = store;
  const [cropOpen, setCropOpen] = useState(false);

  const handleRotation = useCallback(
    (deg: number) => store.setVideoTransform({ rotation: deg }),
    [store],
  );

  const handleFlipH = useCallback(
    () => store.setVideoTransform({ flipH: !videoTransform.flipH }),
    [store, videoTransform.flipH],
  );

  const handleFlipV = useCallback(
    () => store.setVideoTransform({ flipV: !videoTransform.flipV }),
    [store, videoTransform.flipV],
  );

  const handleSpeed = useCallback((v: number) => editor.setSpeed(v), [editor]);

  const handleCropApply = useCallback(
    (cropX: number, cropY: number, cropW: number, cropH: number) => {
      store.setVideoTransform({ cropX, cropY, cropW, cropH });
      setCropOpen(false);
    },
    [store],
  );

  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: MUTED,
    marginBottom: 8,
  };

  const sectionStyle = {
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.02)",
    border: `1px solid ${BORDER}`,
    marginBottom: 10,
  };

  return (
    <div
      className="p-3 overflow-y-auto h-full font-['Inter',sans-serif]"
      style={{ scrollbarWidth: "none" }}
      data-ocid="video-controls-panel"
    >
      {/* Rotation */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Rotation</p>
        <div className="grid grid-cols-4 gap-1.5">
          {ROTATION_PRESETS.map((deg) => (
            <button
              key={deg}
              type="button"
              onClick={() => handleRotation(deg)}
              className="flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-semibold transition-all hover:scale-[1.04]"
              style={{
                background:
                  videoTransform.rotation === deg
                    ? "rgba(37,99,235,0.18)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${videoTransform.rotation === deg ? ACCENT : BORDER}`,
                color:
                  videoTransform.rotation === deg
                    ? ACCENT
                    : "rgba(255,255,255,0.65)",
              }}
              data-ocid={`vc.rotation.${deg}`}
            >
              <RotateCcw
                size={14}
                style={{
                  transform: `rotate(${deg}deg)`,
                  transition: "transform 0.25s",
                }}
              />
              {deg}°
            </button>
          ))}
        </div>
      </div>

      {/* Flip */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Flip</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleFlipH}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: videoTransform.flipH
                ? "rgba(37,99,235,0.18)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${videoTransform.flipH ? ACCENT : BORDER}`,
              color: videoTransform.flipH ? ACCENT : "rgba(255,255,255,0.65)",
            }}
            data-ocid="vc.flip-h"
          >
            <FlipHorizontal size={14} />
            Horizontal
          </button>
          <button
            type="button"
            onClick={handleFlipV}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: videoTransform.flipV
                ? "rgba(37,99,235,0.18)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${videoTransform.flipV ? ACCENT : BORDER}`,
              color: videoTransform.flipV ? ACCENT : "rgba(255,255,255,0.65)",
            }}
            data-ocid="vc.flip-v"
          >
            <FlipVertical size={14} />
            Vertical
          </button>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Aspect Ratio</p>
        <div className="grid grid-cols-5 gap-1.5">
          {ASPECT_RATIOS.map(({ id, label, w, h }) => {
            const active = aspectRatio === id;
            const maxSize = 28;
            const scale = Math.min(maxSize / w, maxSize / h);
            return (
              <button
                key={id}
                type="button"
                onClick={() => store.setAspectRatio(id)}
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-[9px] font-bold transition-all hover:scale-[1.04]"
                style={{
                  background: active
                    ? "rgba(37,99,235,0.18)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? ACCENT : BORDER}`,
                  color: active ? ACCENT : "rgba(255,255,255,0.55)",
                }}
                data-ocid={`vc.ratio.${id.replace(":", "-")}`}
              >
                <div
                  style={{
                    width: w * scale,
                    height: h * scale,
                    border: `1.5px solid ${active ? ACCENT : "rgba(255,255,255,0.3)"}`,
                    borderRadius: 2,
                    background: active
                      ? "rgba(37,99,235,0.15)"
                      : "rgba(255,255,255,0.05)",
                  }}
                />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Speed Control */}
      <div style={sectionStyle}>
        <div className="flex items-center justify-between mb-2">
          <p style={{ ...labelStyle, marginBottom: 0 }}>Playback Speed</p>
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "rgba(34,197,94,0.12)", color: GREEN }}
          >
            {playbackSpeed}x
          </span>
        </div>
        <input
          type="range"
          min={0.25}
          max={2}
          step={0.25}
          value={playbackSpeed}
          onChange={(e) => handleSpeed(Number(e.target.value))}
          className="w-full h-1.5 rounded-full cursor-pointer mb-3"
          style={{ accentColor: ACCENT }}
          data-ocid="vc.speed-slider"
        />
        <div className="grid grid-cols-6 gap-1">
          {SPEED_PRESETS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => handleSpeed(v)}
              className="py-1.5 rounded-lg text-[9px] font-bold transition-all hover:scale-105"
              style={{
                background:
                  playbackSpeed === v
                    ? "rgba(37,99,235,0.18)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${playbackSpeed === v ? ACCENT : BORDER}`,
                color: playbackSpeed === v ? ACCENT : "rgba(255,255,255,0.5)",
              }}
              data-ocid={`vc.speed-preset.${v}`}
            >
              {v}x
            </button>
          ))}
        </div>
      </div>

      {/* Crop Tool */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Crop</p>
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Region:{" "}
            <span className="font-mono text-white/50">
              {videoTransform.cropX},{videoTransform.cropY} /{" "}
              {videoTransform.cropW}×{videoTransform.cropH}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setCropOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-semibold transition-all hover:scale-[1.01] hover:brightness-110"
          style={{
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.3)",
            color: ACCENT,
          }}
          data-ocid="vc.enter-crop"
        >
          <CropIcon size={14} />
          Enter Crop Mode
        </button>
      </div>

      <AnimatePresence>
        {cropOpen && (
          <CropModal
            initial={videoTransform}
            onApply={handleCropApply}
            onCancel={() => setCropOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
