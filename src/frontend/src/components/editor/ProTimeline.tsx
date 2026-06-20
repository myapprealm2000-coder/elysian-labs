import type { Clip, TextOverlay } from "@/hooks/useVideoEditor";
import type { AspectRatio } from "@/types/videoEditor";
import {
  ChevronDown,
  Clover,
  Copy,
  Eye,
  EyeOff,
  GripVertical,
  Lock,
  Minus,
  Plus,
  RotateCcw,
  RotateCw,
  Scissors,
  Snowflake,
  Trash2,
  Zap,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ActiveTool = "select" | "split" | "trim";

interface TrackMeta {
  id: string;
  type: "video" | "audio" | "text";
  name: string;
  locked: boolean;
  visible: boolean;
  height: number;
}

interface ProTimelineProps {
  duration: number;
  currentTime: number;
  clips: Clip[];
  textOverlays: TextOverlay[];
  selectedId: string | null;
  zoom: number;
  aspectRatio: AspectRatio;
  onSeek: (t: number) => void;
  onZoom: (z: number) => void;
  onSelectClip: (id: string) => void;
  onSelectText: (id: string) => void;
  onUpdateClip: (id: string, patch: Partial<Clip>) => void;
  onRemoveClip: (id: string) => void;
  onDuplicateClip: (id: string) => void;
  onSplitClip: (id: string) => void;
  onUndo: () => void;
  onSetAspectRatio: (r: AspectRatio) => void;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.floor((s % 1) * 10);
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${ms}`;
}

function fmtShort(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}s`;
}

const ASPECT_OPTIONS: AspectRatio[] = ["16:9", "9:16", "1:1", "4:5", "21:9"];

const SPEED_PRESETS: { label: string; value: number }[] = [
  { label: "Montage", value: 2 },
  { label: "Hero", value: 1.5 },
  { label: "Bullet", value: 0.25 },
  { label: "Smooth Slow", value: 0.5 },
];

const SPEED_VALUES = [0.1, 0.25, 0.5, 1, 1.5, 2, 4];

// ─── Waveform Bars ─────────────────────────────────────────────────────────────

function WaveformBars({
  seed = 42,
  count = 28,
}: { seed?: number; count?: number }) {
  const bars = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < count; i++) {
      const h =
        18 +
        45 * Math.abs(Math.sin(i * 0.37 + seed * 0.1 + 1.2)) +
        25 * Math.abs(Math.sin(i * 0.91 + seed * 0.07 + 0.4));
      out.push(Math.min(92, h));
    }
    return out;
  }, [count, seed]);

  return (
    <div className="absolute inset-0 flex items-end gap-px overflow-hidden px-1 pb-0.5 pointer-events-none">
      {bars.map((h, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: stable positional bars
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: `${h}%`, background: "oklch(0.65 0.17 150 / 0.45)" }}
        />
      ))}
    </div>
  );
}

// ─── Tooltip ───────────────────────────────────────────────────────────────────

function Tooltip({ text, shortcut }: { text: string; shortcut?: string }) {
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
      style={{ whiteSpace: "nowrap" }}
    >
      <div
        className="rounded px-2 py-1 text-[10px] font-medium flex items-center gap-1.5"
        style={{
          background: "oklch(0.18 0.008 240)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 12px oklch(0 0 0 / 0.4)",
          color: "oklch(0.85 0 0)",
        }}
      >
        {text}
        {shortcut && (
          <span
            className="rounded px-1 text-[9px] font-bold"
            style={{
              background: "oklch(0.12 0.005 240)",
              color: "oklch(0.6 0 0)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {shortcut}
          </span>
        )}
      </div>
    </div>
  );
}

function ToolBtn({
  icon: Icon,
  tooltip,
  shortcut,
  active,
  danger,
  disabled,
  onClick,
  dataOcid,
}: {
  icon: React.ElementType;
  tooltip: string;
  shortcut?: string;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
  dataOcid?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.08 }}
        whileTap={{ scale: disabled ? 1 : 0.92 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-ocid={dataOcid}
        className="flex items-center justify-center rounded-md transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          width: 30,
          height: 30,
          background: active
            ? "oklch(0.38 0.18 250 / 0.25)"
            : hover && !disabled
              ? "oklch(0.18 0.006 240)"
              : "transparent",
          border: active
            ? "1px solid oklch(0.38 0.18 250 / 0.6)"
            : "1px solid transparent",
          boxShadow: active ? "0 0 8px oklch(0.38 0.18 250 / 0.4)" : "none",
          color: danger
            ? "oklch(0.65 0.2 25)"
            : active
              ? "oklch(0.7 0.2 250)"
              : "oklch(0.6 0 0)",
        }}
      >
        <Icon size={14} />
      </motion.button>
      {hover && <Tooltip text={tooltip} shortcut={shortcut} />}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function ProTimeline({
  duration,
  currentTime,
  clips,
  textOverlays,
  selectedId,
  zoom,
  aspectRatio,
  onSeek,
  onZoom,
  onSelectClip,
  onSelectText,
  onUpdateClip,
  onRemoveClip,
  onDuplicateClip,
  onSplitClip,
  onUndo,
  onSetAspectRatio,
}: ProTimelineProps) {
  const rulerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const [showAspectDropdown, setShowAspectDropdown] = useState(false);
  const [showSpeedPopover, setShowSpeedPopover] = useState(false);
  const [speedValue, setSpeedValue] = useState(1);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [loop, setLoop] = useState(false);
  const [tracks, setTracks] = useState<TrackMeta[]>([
    {
      id: "video",
      type: "video",
      name: "Video 1",
      locked: false,
      visible: true,
      height: 72,
    },
    {
      id: "audio",
      type: "audio",
      name: "Audio",
      locked: false,
      visible: true,
      height: 48,
    },
    {
      id: "text",
      type: "text",
      name: "Text",
      locked: false,
      visible: true,
      height: 40,
    },
  ]);

  const HEADER_W = 52;
  const effDur = Math.max(duration, 30);

  const pxPerSec = useMemo(() => {
    const rulerWidth = Math.max(
      600,
      (scrollRef.current?.clientWidth ?? 600) - HEADER_W,
    );
    return (rulerWidth / effDur) * zoom;
  }, [effDur, zoom]);

  const timeToPx = useCallback((t: number) => t * pxPerSec, [pxPerSec]);
  const pxToTime = useCallback(
    (px: number) => Math.max(0, Math.min(effDur, px / pxPerSec)),
    [effDur, pxPerSec],
  );

  // Ruler ticks
  const ticks = useMemo(() => {
    const interval = Math.max(0.5, effDur / (20 * zoom));
    const snappedInterval =
      interval < 1
        ? 0.5
        : interval < 2
          ? 1
          : interval < 5
            ? 2
            : interval < 10
              ? 5
              : 10;
    const result: number[] = [];
    for (let t = 0; t <= effDur + 0.01; t += snappedInterval) result.push(t);
    return result;
  }, [effDur, zoom]);

  const timeFromRulerX = useCallback(
    (clientX: number) => {
      const rect = rulerRef.current?.getBoundingClientRect();
      if (!rect) return 0;
      return pxToTime(clientX - rect.left);
    },
    [pxToTime],
  );

  const handleRulerClick = useCallback(
    (e: React.MouseEvent) => onSeek(timeFromRulerX(e.clientX)),
    [timeFromRulerX, onSeek],
  );

  // Playhead drag
  const startPlayheadDrag = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const onMove = (me: MouseEvent) => onSeek(timeFromRulerX(me.clientX));
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [timeFromRulerX, onSeek],
  );

  // Clip edge trim drag
  const startEdgeDrag = useCallback(
    (e: React.MouseEvent, clip: Clip, edge: "trimIn" | "trimOut") => {
      e.stopPropagation();
      const startX = e.clientX;
      const startVal = edge === "trimIn" ? clip.trimIn : clip.trimOut;
      const onMove = (me: MouseEvent) => {
        const delta = (me.clientX - startX) / pxPerSec;
        const nv = Math.max(0, Math.min(effDur, startVal + delta));
        if (edge === "trimIn")
          onUpdateClip(clip.id, { trimIn: Math.min(nv, clip.trimOut - 0.1) });
        else
          onUpdateClip(clip.id, { trimOut: Math.max(nv, clip.trimIn + 0.1) });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pxPerSec, effDur, onUpdateClip],
  );

  // Clip reposition drag
  const startClipDrag = useCallback(
    (e: React.MouseEvent, clip: Clip) => {
      if (activeTool === "split") return;
      e.stopPropagation();
      const startX = e.clientX;
      const origStart = clip.startTime;
      const origEnd = clip.endTime ?? clip.startTime + clip.duration;
      const dur = origEnd - origStart;
      const onMove = (me: MouseEvent) => {
        const delta = (me.clientX - startX) / pxPerSec;
        let newStart = Math.max(0, origStart + delta);
        if (snapEnabled) newStart = Math.round(newStart * 10) / 10;
        onUpdateClip(clip.id, { startTime: newStart, endTime: newStart + dur });
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [activeTool, pxPerSec, onUpdateClip, snapEnabled],
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent, clip: Clip | null) => {
      if (activeTool === "split" && clip) {
        onSplitClip(clip.id);
        return;
      }
      const t = timeFromRulerX(e.clientX);
      if (!clip) onSeek(t);
    },
    [activeTool, timeFromRulerX, onSeek, onSplitClip],
  );

  const handleRippleDelete = useCallback(() => {
    if (!selectedId) return;
    const clip = clips.find((c) => c.id === selectedId);
    if (!clip) return;
    const deletedDur =
      (clip.endTime ?? clip.startTime + clip.duration) - clip.startTime;
    onRemoveClip(clip.id);
    // Shift subsequent clips left using for...of
    const toShift = clips.filter(
      (c) => c.trackType === clip.trackType && c.startTime > clip.startTime,
    );
    for (const c of toShift) {
      onUpdateClip(c.id, {
        startTime: Math.max(0, c.startTime - deletedDur),
        endTime: Math.max(
          deletedDur,
          (c.endTime ?? c.startTime + c.duration) - deletedDur,
        ),
      });
    }
  }, [selectedId, clips, onRemoveClip, onUpdateClip]);

  const toggleTrackLock = (id: string) =>
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, locked: !t.locked } : t)),
    );

  const toggleTrackVisible = (id: string) =>
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: !t.visible } : t)),
    );

  const videoClips = clips.filter((c) => c.trackType === "video");
  const audioClips = clips.filter((c) => c.trackType === "audio");
  const hasSelectedClip = selectedId
    ? clips.some((c) => c.id === selectedId)
    : false;
  const playheadX = timeToPx(currentTime);
  const totalWidth = Math.max(800, timeToPx(effDur) + 40);

  return (
    <div
      className="flex flex-col select-none font-editor"
      style={{
        height: 268,
        background: "oklch(0.075 0.004 240)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "var(--font-editor, 'Inter', sans-serif)",
      }}
      data-ocid="pro-timeline"
    >
      {/* ── Toolbar ────────────────────────────────────────── */}
      <div
        className="flex items-center gap-1 px-3 flex-shrink-0"
        style={{
          height: 40,
          background: "oklch(0.095 0.005 240)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Tool group */}
        <div
          className="flex items-center gap-0.5 rounded-md p-0.5"
          style={{
            background: "oklch(0.115 0.005 240)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <ToolBtn
            icon={ZoomIn}
            tooltip="Select"
            shortcut="V"
            active={activeTool === "select"}
            onClick={() => setActiveTool("select")}
            dataOcid="timeline-tool-select"
          />
          <ToolBtn
            icon={Scissors}
            tooltip="Split/Razor"
            shortcut="S"
            active={activeTool === "split"}
            onClick={() =>
              setActiveTool(activeTool === "split" ? "select" : "split")
            }
            dataOcid="timeline-tool-split"
          />
        </div>

        <div
          className="w-px h-5 mx-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Undo/Redo */}
        <ToolBtn
          icon={RotateCcw}
          tooltip="Undo"
          shortcut="Ctrl+Z"
          onClick={onUndo}
          dataOcid="timeline-undo"
        />
        <ToolBtn
          icon={RotateCw}
          tooltip="Redo"
          shortcut="Ctrl+Y"
          onClick={() => {}}
          dataOcid="timeline-redo"
        />

        <div
          className="w-px h-5 mx-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Clip actions */}
        <ToolBtn
          icon={Trash2}
          tooltip="Ripple Delete"
          shortcut="Del"
          danger
          disabled={!hasSelectedClip}
          onClick={handleRippleDelete}
          dataOcid="timeline-ripple-delete"
        />
        <ToolBtn
          icon={Copy}
          tooltip="Duplicate Clip"
          shortcut="D"
          disabled={!hasSelectedClip}
          onClick={() => {
            if (selectedId) onDuplicateClip(selectedId);
          }}
          dataOcid="timeline-duplicate"
        />
        <ToolBtn
          icon={Snowflake}
          tooltip="Freeze Frame"
          disabled={!hasSelectedClip}
          onClick={() => {}}
          dataOcid="timeline-freeze"
        />
        <ToolBtn
          icon={RotateCcw}
          tooltip="Reverse Clip"
          disabled={!hasSelectedClip}
          onClick={() => {}}
          dataOcid="timeline-reverse"
        />

        {/* Speed popover */}
        <div className="relative">
          <ToolBtn
            icon={Zap}
            tooltip="Speed"
            active={speedValue !== 1}
            disabled={!hasSelectedClip}
            onClick={() => setShowSpeedPopover((v) => !v)}
            dataOcid="timeline-speed"
          />
          <AnimatePresence>
            {showSpeedPopover && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-52 rounded-xl p-3"
                style={{
                  background: "oklch(0.12 0.006 240)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px oklch(0 0 0 / 0.5)",
                }}
                data-ocid="timeline-speed-popover"
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "oklch(0.5 0 0)" }}
                >
                  Speed
                </p>
                <input
                  type="range"
                  min={0}
                  max={SPEED_VALUES.length - 1}
                  step={1}
                  value={
                    SPEED_VALUES.indexOf(speedValue) >= 0
                      ? SPEED_VALUES.indexOf(speedValue)
                      : 3
                  }
                  onChange={(e) =>
                    setSpeedValue(SPEED_VALUES[Number(e.target.value)])
                  }
                  className="w-full mb-1"
                  style={{ accentColor: "#2563EB" }}
                  data-ocid="timeline-speed-slider"
                />
                <p
                  className="text-center text-xs font-bold mb-3"
                  style={{ color: "oklch(0.7 0.18 250)" }}
                >
                  {speedValue}x
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {SPEED_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setSpeedValue(p.value)}
                      className="text-[10px] py-1 rounded font-semibold transition-all"
                      style={{
                        background:
                          speedValue === p.value
                            ? "oklch(0.38 0.18 250 / 0.25)"
                            : "oklch(0.15 0.005 240)",
                        border:
                          speedValue === p.value
                            ? "1px solid oklch(0.38 0.18 250 / 0.5)"
                            : "1px solid rgba(255,255,255,0.06)",
                        color:
                          speedValue === p.value
                            ? "oklch(0.7 0.2 250)"
                            : "oklch(0.6 0 0)",
                      }}
                      data-ocid={`timeline-speed-preset-${p.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ToolBtn
          icon={Clover}
          tooltip="Transition"
          onClick={() => {}}
          dataOcid="timeline-transition"
        />

        <div
          className="w-px h-5 mx-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Snap toggle */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSnapEnabled((v) => !v)}
          className="flex items-center gap-1 px-2 h-7 rounded text-[10px] font-semibold transition-all"
          style={{
            background: snapEnabled
              ? "oklch(0.38 0.18 250 / 0.2)"
              : "oklch(0.13 0.005 240)",
            border: snapEnabled
              ? "1px solid oklch(0.38 0.18 250 / 0.5)"
              : "1px solid rgba(255,255,255,0.06)",
            color: snapEnabled ? "oklch(0.7 0.18 250)" : "oklch(0.5 0 0)",
          }}
          data-ocid="timeline-snap-toggle"
        >
          <span className="text-[9px]">⊞</span> Snap
        </motion.button>

        <div className="flex-1" />

        {/* Zoom controls */}
        <div
          className="flex items-center gap-1 rounded-md px-2 py-1"
          style={{
            background: "oklch(0.115 0.005 240)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <button
            type="button"
            onClick={() => onZoom(Math.max(0.25, zoom - 0.25))}
            className="flex items-center justify-center w-5 h-5 rounded hover:bg-white/5 transition-colors"
            style={{ color: "oklch(0.55 0 0)" }}
            data-ocid="timeline-zoom-out"
          >
            <Minus size={11} />
          </button>
          <span
            className="text-[10px] font-bold w-10 text-center"
            style={{ color: "oklch(0.65 0 0)" }}
          >
            {zoom.toFixed(1)}x
          </span>
          <button
            type="button"
            onClick={() => onZoom(Math.min(8, zoom + 0.25))}
            className="flex items-center justify-center w-5 h-5 rounded hover:bg-white/5 transition-colors"
            style={{ color: "oklch(0.55 0 0)" }}
            data-ocid="timeline-zoom-in"
          >
            <Plus size={11} />
          </button>
        </div>

        {/* Aspect ratio */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAspectDropdown((v) => !v)}
            className="flex items-center gap-1 px-2.5 h-7 rounded-full text-[10px] font-bold transition-all hover:opacity-80"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.38 0.18 250 / 0.3), oklch(0.65 0.17 150 / 0.2))",
              border: "1px solid oklch(0.38 0.18 250 / 0.4)",
              color: "oklch(0.75 0.15 250)",
            }}
            data-ocid="timeline-aspect-ratio-button"
          >
            {aspectRatio}
            <ChevronDown size={10} />
          </button>
          <AnimatePresence>
            {showAspectDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-2 z-50 rounded-xl py-1 min-w-[110px]"
                style={{
                  background: "oklch(0.12 0.006 240)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px oklch(0 0 0 / 0.5)",
                }}
                data-ocid="timeline-aspect-dropdown"
              >
                {ASPECT_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      onSetAspectRatio(r);
                      setShowAspectDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold transition-all hover:bg-white/5"
                    style={{
                      color:
                        aspectRatio === r
                          ? "oklch(0.7 0.18 250)"
                          : "oklch(0.6 0 0)",
                    }}
                    data-ocid={`timeline-aspect-${r.replace(":", "-")}`}
                  >
                    {r === aspectRatio ? "✓ " : "   "}
                    {r}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Ruler + Tracks scrollable area ─────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden flex flex-col"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "oklch(0.2 0 0) transparent",
        }}
        onWheel={(e) => {
          if (e.ctrlKey) {
            e.preventDefault();
            onZoom(
              Math.max(0.25, Math.min(8, zoom + (e.deltaY < 0 ? 0.25 : -0.25))),
            );
          }
        }}
      >
        <div style={{ minWidth: totalWidth + HEADER_W, position: "relative" }}>
          {/* Ruler row */}
          <div
            className="flex items-stretch flex-shrink-0"
            style={{
              height: 24,
              background: "oklch(0.085 0.004 240)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* header spacer */}
            <div style={{ width: HEADER_W, flexShrink: 0 }} />
            {/* ruler */}
            <div
              ref={rulerRef}
              className="relative flex-1 cursor-pointer overflow-hidden"
              style={{ width: totalWidth }}
              onClick={handleRulerClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  handleRulerClick(e as unknown as React.MouseEvent);
              }}
              role="slider"
              aria-label="Seek ruler"
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={effDur}
              tabIndex={0}
            >
              {ticks.map((t) => (
                <div
                  key={t}
                  className="absolute top-0 bottom-0 flex flex-col items-center"
                  style={{ left: timeToPx(t) }}
                >
                  <div
                    className="w-px h-full"
                    style={{
                      background:
                        t % 5 === 0
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(255,255,255,0.05)",
                    }}
                  />
                  <span
                    className="absolute bottom-0.5 text-[9px] font-mono -translate-x-1/2"
                    style={{ color: "oklch(0.38 0 0)", whiteSpace: "nowrap" }}
                  >
                    {fmtShort(t)}
                  </span>
                </div>
              ))}

              {/* Playhead line in ruler */}
              <div
                className="absolute top-0 bottom-0 w-px z-20 pointer-events-none"
                style={{
                  left: playheadX,
                  background: "#ef4444",
                  boxShadow: "0 0 6px #ef4444cc",
                }}
              />

              {/* Playhead handle — draggable */}
              <motion.div
                className="absolute top-0 z-30 cursor-grab active:cursor-grabbing"
                style={{ left: playheadX, transform: "translateX(-50%)" }}
                onMouseDown={startPlayheadDrag}
                data-ocid="timeline-playhead-handle"
              >
                <div
                  className="flex flex-col items-center"
                  style={{ color: "#ef4444" }}
                >
                  {/* diamond handle */}
                  <div
                    className="w-2 h-2 rotate-45 mb-[-1px]"
                    style={{ background: "#ef4444" }}
                  />
                  <div
                    className="text-[9px] font-bold rounded px-1 -mt-1 whitespace-nowrap"
                    style={{
                      background: "#ef4444",
                      color: "white",
                      fontSize: 8,
                    }}
                  >
                    {fmt(currentTime)}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Track rows */}
          {tracks.map((track) => {
            const isVideo = track.type === "video";
            const isAudio = track.type === "audio";
            const isText = track.type === "text";

            const trackClips = isVideo ? videoClips : isAudio ? audioClips : [];
            const trackTextOverlays = isText ? textOverlays : [];

            const trackAccent = isVideo
              ? "oklch(0.45 0.2 250)"
              : isAudio
                ? "oklch(0.55 0.17 150)"
                : "oklch(0.65 0.18 70)";

            const trackBg = isVideo
              ? "oklch(0.38 0.18 250 / 0.06)"
              : isAudio
                ? "oklch(0.45 0.17 150 / 0.05)"
                : "oklch(0.55 0.15 70 / 0.05)";

            const clipGradient = isVideo
              ? "linear-gradient(135deg, oklch(0.28 0.18 260) 0%, oklch(0.35 0.2 280) 100%)"
              : isAudio
                ? "linear-gradient(135deg, oklch(0.22 0.12 155) 0%, oklch(0.28 0.15 170) 100%)"
                : "linear-gradient(135deg, oklch(0.35 0.14 65) 0%, oklch(0.42 0.18 75) 100%)";

            const allItems = [
              ...trackClips.map((c) => ({
                id: c.id,
                start: c.startTime,
                end: c.endTime,
                name: c.name,
                isClip: true,
                clip: c as Clip | null,
                text: null as TextOverlay | null,
              })),
              ...trackTextOverlays.map((t) => ({
                id: t.id,
                start: t.startTime,
                end: t.endTime,
                name: t.content.slice(0, 24),
                isClip: false,
                clip: null,
                text: t,
              })),
            ];

            return (
              <div
                key={track.id}
                className="flex border-b"
                style={{
                  height: track.height,
                  borderColor: "rgba(255,255,255,0.04)",
                  opacity: track.visible ? 1 : 0.35,
                }}
                data-ocid={`timeline-track-${track.type}`}
              >
                {/* Track header */}
                <div
                  className="flex-shrink-0 flex items-center gap-1 px-1 border-r"
                  style={{
                    width: HEADER_W,
                    background: "oklch(0.09 0.004 240)",
                    borderColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <GripVertical
                    size={10}
                    className="cursor-grab"
                    style={{ color: "oklch(0.3 0 0)" }}
                  />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span
                      className="text-[9px] font-bold truncate leading-tight"
                      style={{ color: trackAccent }}
                    >
                      {track.name}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => toggleTrackVisible(track.id)}
                        className="rounded hover:bg-white/5 transition-colors p-0.5"
                        aria-label={track.visible ? "Hide track" : "Show track"}
                        data-ocid={`timeline-track-visibility-${track.type}`}
                        style={{
                          color: track.visible
                            ? "oklch(0.55 0 0)"
                            : "oklch(0.35 0 0)",
                        }}
                      >
                        {track.visible ? <Eye size={9} /> : <EyeOff size={9} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleTrackLock(track.id)}
                        className="rounded hover:bg-white/5 transition-colors p-0.5"
                        aria-label={
                          track.locked ? "Unlock track" : "Lock track"
                        }
                        data-ocid={`timeline-track-lock-${track.type}`}
                        style={{
                          color: track.locked
                            ? "oklch(0.65 0.15 50)"
                            : "oklch(0.35 0 0)",
                        }}
                      >
                        <Lock size={9} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clip area */}
                <div
                  className="relative flex-1 overflow-hidden"
                  style={{
                    background: trackBg,
                    cursor: activeTool === "split" ? "crosshair" : "default",
                    width: totalWidth,
                  }}
                  onClick={(e) => handleTrackClick(e, null)}
                  onKeyDown={() => {}}
                  aria-label={`${track.name} track area`}
                >
                  {/* Empty state hint */}
                  {allItems.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-[9px]"
                        style={{ color: "oklch(0.28 0 0)" }}
                      >
                        {isVideo
                          ? "Drop video to begin"
                          : isAudio
                            ? "Add audio from sidebar"
                            : "Add text from sidebar"}
                      </span>
                    </div>
                  )}

                  {/* Clip blocks */}
                  {allItems.map((item, idx) => {
                    const isSelected = selectedId === item.id;
                    const clipW = Math.max(
                      4,
                      (item.end ?? 0) - timeToPx(item.start),
                    );

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        className="absolute top-1 bottom-1 rounded-lg group overflow-hidden"
                        style={{
                          left: timeToPx(item.start),
                          width: clipW,
                          background: clipGradient,
                          border: isSelected
                            ? `2px solid ${trackAccent}`
                            : "1px solid rgba(255,255,255,0.12)",
                          boxShadow: isSelected
                            ? `0 0 12px ${trackAccent}55, inset 0 1px 0 rgba(255,255,255,0.08)`
                            : "inset 0 1px 0 rgba(255,255,255,0.06)",
                          cursor:
                            activeTool === "split"
                              ? "crosshair"
                              : track.locked
                                ? "not-allowed"
                                : "grab",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activeTool === "split" && item.clip) {
                            onSplitClip(item.id);
                            return;
                          }
                          if (!track.locked) {
                            if (item.isClip) onSelectClip(item.id);
                            else onSelectText(item.id);
                          }
                        }}
                        onMouseDown={(e) => {
                          if (
                            !track.locked &&
                            item.clip &&
                            activeTool === "select"
                          ) {
                            startClipDrag(e, item.clip);
                          }
                        }}
                        data-ocid={`timeline-${track.type}-clip.${idx + 1}`}
                      >
                        {/* Waveform for audio */}
                        {isAudio && (
                          <WaveformBars
                            seed={idx * 7 + 3}
                            count={Math.max(8, Math.floor(clipW / 6))}
                          />
                        )}

                        {/* Clip label */}
                        {clipW > 28 && (
                          <span
                            className="absolute left-2 top-1 z-10 text-[9px] font-semibold truncate"
                            style={{
                              color: isAudio
                                ? "oklch(0.8 0.12 150)"
                                : isText
                                  ? "oklch(0.9 0.12 75)"
                                  : "oklch(0.8 0.12 260)",
                              maxWidth: clipW - 20,
                              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                            }}
                          >
                            {isText ? `T  ${item.name}` : item.name}
                          </span>
                        )}

                        {/* Duration badge */}
                        {clipW > 60 && (
                          <span
                            className="absolute right-1.5 bottom-0.5 text-[8px] font-mono opacity-60"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {((item.end ?? 0) - item.start).toFixed(1)}s
                          </span>
                        )}

                        {/* Trim handles */}
                        {item.clip && !track.locked && (
                          <>
                            <div
                              className="absolute top-0 bottom-0 left-0 w-3 cursor-ew-resize z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onMouseDown={(e) =>
                                item.clip &&
                                startEdgeDrag(e, item.clip, "trimIn")
                              }
                              data-ocid={`timeline-trimedge-in.${idx + 1}`}
                            >
                              <div
                                className="w-0.5 h-5 rounded-full"
                                style={{ background: "rgba(255,255,255,0.6)" }}
                              />
                            </div>
                            <div
                              className="absolute top-0 bottom-0 right-0 w-3 cursor-ew-resize z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onMouseDown={(e) =>
                                item.clip &&
                                startEdgeDrag(e, item.clip, "trimOut")
                              }
                              data-ocid={`timeline-trimedge-out.${idx + 1}`}
                            >
                              <div
                                className="w-0.5 h-5 rounded-full"
                                style={{ background: "rgba(255,255,255,0.6)" }}
                              />
                            </div>
                          </>
                        )}

                        {/* Selection glow overlay */}
                        {isSelected && (
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                          />
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Playhead in track */}
                  <div
                    className="absolute top-0 bottom-0 w-px z-30 pointer-events-none"
                    style={{
                      left: playheadX,
                      background: "#ef4444cc",
                    }}
                  />

                  {/* Split tool cursor line */}
                  {activeTool === "split" && (
                    <div
                      className="absolute top-0 bottom-0 w-px z-30 pointer-events-none"
                      style={{
                        left: playheadX,
                        background: "#ef4444",
                        boxShadow: "0 0 8px #ef4444",
                        opacity: 0.9,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-3 flex-shrink-0"
        style={{
          height: 28,
          background: "oklch(0.085 0.004 240)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span
          className="text-[10px] font-mono"
          style={{ color: "oklch(0.4 0 0)" }}
        >
          {fmt(currentTime)}
          <span style={{ color: "oklch(0.28 0 0)" }}> / {fmt(duration)}</span>
        </span>

        {/* Loop */}
        <button
          type="button"
          onClick={() => setLoop((v) => !v)}
          className="text-[10px] font-semibold px-2 h-5 rounded transition-all"
          style={{
            background: loop ? "oklch(0.38 0.18 250 / 0.2)" : "transparent",
            border: loop
              ? "1px solid oklch(0.38 0.18 250 / 0.4)"
              : "1px solid transparent",
            color: loop ? "oklch(0.7 0.18 250)" : "oklch(0.38 0 0)",
          }}
          data-ocid="timeline-loop-toggle"
        >
          ⟳ Loop
        </button>

        <div className="flex-1" />

        {/* Zoom slider */}
        <div className="flex items-center gap-1.5">
          <span className="text-[9px]" style={{ color: "oklch(0.35 0 0)" }}>
            Z
          </span>
          <input
            type="range"
            min={0.25}
            max={8}
            step={0.25}
            value={zoom}
            onChange={(e) => onZoom(Number(e.target.value))}
            className="w-24"
            style={{ accentColor: "#2563EB" }}
            aria-label="Timeline zoom"
            data-ocid="timeline-zoom-slider"
          />
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showAspectDropdown || showSpeedPopover) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowAspectDropdown(false);
            setShowSpeedPopover(false);
          }}
          onKeyDown={() => {}}
          role="presentation"
        />
      )}
    </div>
  );
}
