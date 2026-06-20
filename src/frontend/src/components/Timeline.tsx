import { useVideoEditorStore } from "@/store/videoEditorStore";
import type {
  AudioClip,
  CaptionLayer,
  TextLayer,
  Track,
  TransitionType,
  VideoClip,
} from "@/types/videoEditor";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const LABEL_W = 180;
const BASE_PPS = 100; // pixels per second at zoom=1
const SNAP_PX = 20;
const MIN_CLIP_W = 20;
const TRANSITION_TYPES: TransitionType[] = [
  "fade",
  "dissolve",
  "zoom",
  "blur",
  "swipe",
  "flash",
  "rotate",
  "wipe",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function clipEffDuration(clip: VideoClip | AudioClip): number {
  return Math.max(0.1, clip.duration - clip.trimIn - clip.trimOut);
}

function textDuration(layer: TextLayer | CaptionLayer): number {
  return Math.max(0.1, layer.endTime - layer.startTime);
}

// ─── WaveformBars ─────────────────────────────────────────────────────────────

function WaveformBars({ data, count }: { data?: number[]; count: number }) {
  const bars = useMemo(() => {
    if (data && data.length > 0) {
      const step = data.length / count;
      return Array.from({ length: count }, (_, i) => {
        const idx = Math.floor(i * step);
        return Math.max(10, Math.min(90, (data[idx] ?? 0.5) * 90));
      });
    }
    return Array.from(
      { length: count },
      (_, i) =>
        20 +
        40 * Math.abs(Math.sin(i * 0.37 + 1.2)) +
        25 * Math.abs(Math.sin(i * 0.91 + 0.4)),
    );
  }, [data, count]);

  return (
    <div className="absolute inset-0 flex items-end gap-px overflow-hidden px-1 pointer-events-none">
      {bars.map((h, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: waveform bars positional
          key={i}
          className="flex-1 rounded-sm opacity-60"
          style={{ height: `${h}%`, background: "#22C55E" }}
        />
      ))}
    </div>
  );
}

// ─── Types ──────────────────────────────────────────────────────────────────

type CtxMenu = {
  x: number;
  y: number;
  clipId: string;
  clipType: "video" | "audio" | "text" | "caption";
} | null;

type DragState = {
  clipId: string;
  clipType: "video" | "audio" | "text" | "caption";
  startX: number;
  origStart: number;
} | null;

type ResizeState = {
  clipId: string;
  clipType: "video" | "audio";
  edge: "left" | "right";
  startX: number;
  origTrimIn: number;
  origTrimOut: number;
  origStart: number;
  clipDuration: number;
} | null;

type PlayheadDrag = { startX: number; origTime: number } | null;

type ClipItem =
  | { kind: "video"; data: VideoClip }
  | { kind: "audio"; data: AudioClip }
  | { kind: "text"; data: TextLayer }
  | { kind: "caption"; data: CaptionLayer };

// ─── Track Row Component ─────────────────────────────────────────────────────

interface TrackRowProps {
  track: Track;
  clips: ClipItem[];
  pps: number;
  currentTime: number;
  duration: number;
  selectedClipId: string | null;
  selectedTextId: string | null;
  selectedCaptionId: string | null;
  onClipMouseDown: (e: React.MouseEvent, item: ClipItem) => void;
  onLeftEdge: (e: React.MouseEvent, item: ClipItem) => void;
  onRightEdge: (e: React.MouseEvent, item: ClipItem) => void;
  onClipClick: (e: React.MouseEvent, item: ClipItem) => void;
  onClipContextMenu: (e: React.MouseEvent, item: ClipItem) => void;
  onTrackClick: (e: React.MouseEvent) => void;
  index: number;
}

function TrackRow({
  track,
  clips,
  pps,
  currentTime,
  duration,
  selectedClipId,
  selectedTextId,
  selectedCaptionId,
  onClipMouseDown,
  onLeftEdge,
  onRightEdge,
  onClipClick,
  onClipContextMenu,
  onTrackClick,
  index,
}: TrackRowProps) {
  const store = useVideoEditorStore();
  const trackH = track.type === "video" ? 56 : track.type === "audio" ? 48 : 40;
  const rowBg = index % 2 === 0 ? "#0F172A" : "#111827";

  function getItemGeometry(item: ClipItem) {
    if (item.kind === "video" || item.kind === "audio") {
      return {
        left: item.data.startTime * pps,
        width: Math.max(MIN_CLIP_W, clipEffDuration(item.data) * pps),
      };
    }
    return {
      left: item.data.startTime * pps,
      width: Math.max(MIN_CLIP_W, textDuration(item.data) * pps),
    };
  }

  function isSelected(item: ClipItem): boolean {
    if (item.kind === "video" || item.kind === "audio")
      return selectedClipId === item.data.id;
    if (item.kind === "text") return selectedTextId === item.data.id;
    return selectedCaptionId === item.data.id;
  }

  function gradient(item: ClipItem): string {
    if (item.kind === "video")
      return "linear-gradient(135deg, #1d4ed8, #2563EB)";
    if (item.kind === "audio")
      return "linear-gradient(135deg, #16a34a, #22C55E)";
    return "linear-gradient(135deg, #6d28d9, #8b5cf6)";
  }

  function selBorderColor(item: ClipItem): string {
    if (item.kind === "video") return "#3b82f6";
    if (item.kind === "audio") return "#4ade80";
    return "#a78bfa";
  }

  function selShadow(item: ClipItem): string {
    if (item.kind === "video") return "0 0 12px rgba(37,99,235,0.6)";
    if (item.kind === "audio") return "0 0 12px rgba(34,197,94,0.6)";
    return "0 0 12px rgba(139,92,246,0.6)";
  }

  function clipLabel(item: ClipItem): string {
    if (item.kind === "text" || item.kind === "caption")
      return item.data.content.slice(0, 28);
    return item.data.name;
  }

  function isHidden(item: ClipItem): boolean {
    return !!(item.data as { hidden?: boolean }).hidden;
  }
  function isLocked(item: ClipItem): boolean {
    return track.locked || !!(item.data as { locked?: boolean }).locked;
  }

  return (
    <div
      className="flex border-b border-white/5"
      style={{ height: trackH, background: rowBg }}
      data-ocid={`timeline.track.${index + 1}`}
    >
      {/* Label sidebar */}
      <div
        className="flex-shrink-0 flex items-center gap-1 px-2 border-r border-white/5"
        style={{ width: LABEL_W, background: "#0F172A" }}
      >
        <span className="text-[10px] font-semibold text-white/55 truncate flex-1 min-w-0">
          {track.name}
        </span>
        {/* Eye */}
        <button
          type="button"
          title={track.hidden ? "Show" : "Hide"}
          className={`transition-colors flex-shrink-0 ${track.hidden ? "text-white/25" : "text-white/40 hover:text-white/70"}`}
          onClick={() => store.updateTrack(track.id, { hidden: !track.hidden })}
          data-ocid={`timeline.track_hide.${index + 1}`}
        >
          <svg
            aria-label={track.hidden ? "Show track" : "Hide track"}
            role="img"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {track.hidden ? (
              <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </>
            ) : (
              <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </>
            )}
          </svg>
        </button>
        {/* Lock */}
        <button
          type="button"
          title={track.locked ? "Unlock" : "Lock"}
          className={`transition-colors flex-shrink-0 ${track.locked ? "text-yellow-400" : "text-white/40 hover:text-white/70"}`}
          onClick={() => store.updateTrack(track.id, { locked: !track.locked })}
          data-ocid={`timeline.track_lock.${index + 1}`}
        >
          <svg
            aria-label={track.locked ? "Unlock track" : "Lock track"}
            role="img"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {track.locked ? (
              <>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </>
            ) : (
              <>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </>
            )}
          </svg>
        </button>
        {/* Mute (audio only) */}
        {track.type === "audio" && (
          <button
            type="button"
            title={track.muted ? "Unmute" : "Mute"}
            className={`transition-colors flex-shrink-0 ${track.muted ? "text-red-400" : "text-white/40 hover:text-white/70"}`}
            onClick={() => store.updateTrack(track.id, { muted: !track.muted })}
            data-ocid={`timeline.track_mute.${index + 1}`}
          >
            <svg
              aria-label={track.muted ? "Unmute track" : "Mute track"}
              role="img"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {track.muted ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Clips area */}
      <div
        className="relative flex-1 overflow-hidden cursor-crosshair"
        onClick={onTrackClick}
        onKeyDown={(e) =>
          e.key === "Enter" && onTrackClick(e as unknown as React.MouseEvent)
        }
        aria-label={`${track.name} track`}
      >
        {clips.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] text-white/12">
              {track.type === "video"
                ? "Drop video"
                : track.type === "audio"
                  ? "Drop audio"
                  : "Add text"}
            </span>
          </div>
        )}

        {clips.map((item, ci) => {
          const { left, width } = getItemGeometry(item);
          const sel = isSelected(item);
          const locked = isLocked(item);
          const hidden = isHidden(item);

          return (
            <div
              key={item.data.id}
              className="absolute top-1 bottom-1 rounded-md overflow-hidden group/clip"
              style={{
                left,
                width,
                background: gradient(item),
                opacity: hidden ? 0.3 : 1,
                border: sel
                  ? `2px solid ${selBorderColor(item)}`
                  : "1px solid rgba(255,255,255,0.14)",
                boxShadow: sel ? selShadow(item) : "none",
                cursor: locked ? "not-allowed" : "grab",
                zIndex: sel ? 3 : 1,
              }}
              onMouseDown={(e) => {
                if (!locked) onClipMouseDown(e, item);
              }}
              onClick={(e) => onClipClick(e, item)}
              onContextMenu={(e) => onClipContextMenu(e, item)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                onClipClick(e as unknown as React.MouseEvent, item)
              }
              data-ocid={`timeline.clip.${ci + 1}`}
            >
              {item.kind === "audio" && (
                <WaveformBars
                  data={(item.data as AudioClip).waveformData}
                  count={Math.max(20, Math.round(width / 4))}
                />
              )}
              <span className="absolute top-0.5 left-2 right-2 z-10 text-[10px] font-semibold text-white/90 truncate pointer-events-none">
                {item.kind === "text" || item.kind === "caption" ? "T " : ""}
                {clipLabel(item)}
              </span>
              {width > 64 &&
                (item.kind === "video" || item.kind === "audio") && (
                  <span className="absolute bottom-0.5 right-2 z-10 text-[9px] font-mono text-white/45 pointer-events-none">
                    {fmtTime(
                      clipEffDuration(item.data as VideoClip | AudioClip),
                    )}
                  </span>
                )}
              {locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <svg
                    aria-label="Locked"
                    role="img"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="#facc15"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              )}
              {/* Left resize handle */}
              {!locked && (item.kind === "video" || item.kind === "audio") && (
                <div
                  className="absolute top-0 bottom-0 left-0 w-2 z-20 cursor-ew-resize opacity-0 group-hover/clip:opacity-100 transition-opacity flex items-center justify-center bg-black/20"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onLeftEdge(e, item);
                  }}
                  data-ocid={`timeline.clip_left_edge.${ci + 1}`}
                >
                  <div className="w-0.5 h-4 rounded-full bg-white/70" />
                </div>
              )}
              {/* Right resize handle */}
              {!locked && (item.kind === "video" || item.kind === "audio") && (
                <div
                  className="absolute top-0 bottom-0 right-0 w-2 z-20 cursor-ew-resize opacity-0 group-hover/clip:opacity-100 transition-opacity flex items-center justify-center bg-black/20"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onRightEdge(e, item);
                  }}
                  data-ocid={`timeline.clip_right_edge.${ci + 1}`}
                >
                  <div className="w-0.5 h-4 rounded-full bg-white/70" />
                </div>
              )}
            </div>
          );
        })}

        {/* Playhead line */}
        {duration > 0 && (
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none z-30"
            style={{
              left: currentTime * pps,
              background: "#f87171",
              boxShadow: "0 0 6px rgba(248,113,113,0.7)",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main Timeline ───────────────────────────────────────────────────────────────

export default function Timeline() {
  const store = useVideoEditorStore();
  const {
    trackOrder,
    tracks,
    videoClips,
    audioClips,
    textLayers,
    captionLayers,
    currentTime,
    duration,
    timelineZoom,
    isPlaying,
    selectedClipId,
    selectedTextId,
    selectedCaptionId,
  } = store;

  const rulerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ctxMenu, setCtxMenu] = useState<CtxMenu>(null);
  const [snapGuide, setSnapGuide] = useState<number | null>(null);
  const [showTransitionMenu, setShowTransitionMenu] = useState(false);

  const dragRef = useRef<DragState>(null);
  const resizeRef = useRef<ResizeState>(null);
  const playheadDragRef = useRef<PlayheadDrag>(null);

  const pps = BASE_PPS * timelineZoom;
  const effDur = Math.max(duration, 30);
  const totalW = effDur * pps;

  // ─ collect track clips ─────────────────────────────────────────────────────
  function getTrackClips(track: Track): ClipItem[] {
    if (track.type === "video") {
      return track.clips
        .map((id) => videoClips[id])
        .filter(Boolean)
        .map((c) => ({ kind: "video" as const, data: c }));
    }
    if (track.type === "audio") {
      return track.clips
        .map((id) => audioClips[id])
        .filter(Boolean)
        .map((c) => ({ kind: "audio" as const, data: c }));
    }
    const items: ClipItem[] = [];
    for (const id of track.clips) {
      if (textLayers[id]) items.push({ kind: "text", data: textLayers[id] });
      else if (captionLayers[id])
        items.push({ kind: "caption", data: captionLayers[id] });
    }
    return items;
  }

  // ─ snap ─────────────────────────────────────────────────────────────────
  const snapTime = useCallback(
    (t: number, excludeId: string): number => {
      const secSnap = Math.round(t);
      if (Math.abs(secSnap - t) * pps < SNAP_PX) return secSnap;
      for (const c of [
        ...Object.values(videoClips),
        ...Object.values(audioClips),
      ]) {
        if (c.id === excludeId) continue;
        if (Math.abs(c.startTime - t) * pps < SNAP_PX) return c.startTime;
        const end = c.startTime + clipEffDuration(c);
        if (Math.abs(end - t) * pps < SNAP_PX) return end;
      }
      return t;
    },
    [pps, videoClips, audioClips],
  );

  // ─ ruler click ──────────────────────────────────────────────────────────
  const handleRulerClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = rulerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scrollX = scrollRef.current?.scrollLeft ?? 0;
      const x = e.clientX - rect.left + scrollX;
      store.setCurrentTime(Math.max(0, Math.min(effDur, x / pps)));
    },
    [effDur, pps, store],
  );

  // ─ track click ───────────────────────────────────────────────────────────
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const scrollX = scrollRef.current?.scrollLeft ?? 0;
      const x = e.clientX - rect.left + scrollX;
      store.setCurrentTime(Math.max(0, Math.min(effDur, x / pps)));
    },
    [effDur, pps, store],
  );

  // ─ playhead drag ───────────────────────────────────────────────────────
  const handlePlayheadMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      playheadDragRef.current = { startX: e.clientX, origTime: currentTime };
      const onMove = (me: MouseEvent) => {
        const d = playheadDragRef.current;
        if (!d) return;
        store.setCurrentTime(
          Math.max(
            0,
            Math.min(effDur, d.origTime + (me.clientX - d.startX) / pps),
          ),
        );
      };
      const onUp = () => {
        playheadDragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [currentTime, effDur, pps, store],
  );

  // ─ clip drag ────────────────────────────────────────────────────────────
  const handleClipMouseDown = useCallback(
    (e: React.MouseEvent, item: ClipItem) => {
      e.stopPropagation();
      e.preventDefault();
      const origStart = item.data.startTime;
      dragRef.current = {
        clipId: item.data.id,
        clipType: item.kind as "video" | "audio" | "text" | "caption",
        startX: e.clientX,
        origStart,
      };
      const onMove = (me: MouseEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        let newStart = Math.max(
          0,
          drag.origStart + (me.clientX - drag.startX) / pps,
        );
        newStart = snapTime(newStart, drag.clipId);
        setSnapGuide(newStart);
        if (drag.clipType === "video")
          store.updateVideoClip(drag.clipId, { startTime: newStart });
        else if (drag.clipType === "audio")
          store.updateAudioClip(drag.clipId, { startTime: newStart });
        else if (drag.clipType === "text")
          store.updateTextLayer(drag.clipId, { startTime: newStart });
        else if (drag.clipType === "caption")
          store.updateCaptionLayer(drag.clipId, { startTime: newStart });
      };
      const onUp = () => {
        setSnapGuide(null);
        store.takeSnapshot();
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pps, store, snapTime],
  );

  // ─ left edge resize ─────────────────────────────────────────────────
  const handleLeftEdge = useCallback(
    (e: React.MouseEvent, item: ClipItem) => {
      e.stopPropagation();
      e.preventDefault();
      if (item.kind !== "video" && item.kind !== "audio") return;
      const clip = item.data as VideoClip | AudioClip;
      resizeRef.current = {
        clipId: clip.id,
        clipType: item.kind,
        edge: "left",
        startX: e.clientX,
        origTrimIn: clip.trimIn,
        origTrimOut: clip.trimOut,
        origStart: clip.startTime,
        clipDuration: clip.duration,
      };
      const onMove = (me: MouseEvent) => {
        const r = resizeRef.current;
        if (!r) return;
        const deltaSec = (me.clientX - r.startX) / pps;
        const newTrimIn = Math.max(
          0,
          Math.min(
            r.origTrimIn + deltaSec,
            r.clipDuration - r.origTrimOut - 0.1,
          ),
        );
        const newStart = Math.max(0, r.origStart + deltaSec);
        if (r.clipType === "video")
          store.updateVideoClip(r.clipId, {
            trimIn: newTrimIn,
            startTime: newStart,
          });
        else
          store.updateAudioClip(r.clipId, {
            trimIn: newTrimIn,
            startTime: newStart,
          });
      };
      const onUp = () => {
        store.takeSnapshot();
        resizeRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pps, store],
  );

  // ─ right edge resize ────────────────────────────────────────────────
  const handleRightEdge = useCallback(
    (e: React.MouseEvent, item: ClipItem) => {
      e.stopPropagation();
      e.preventDefault();
      if (item.kind !== "video" && item.kind !== "audio") return;
      const clip = item.data as VideoClip | AudioClip;
      resizeRef.current = {
        clipId: clip.id,
        clipType: item.kind,
        edge: "right",
        startX: e.clientX,
        origTrimIn: clip.trimIn,
        origTrimOut: clip.trimOut,
        origStart: clip.startTime,
        clipDuration: clip.duration,
      };
      const onMove = (me: MouseEvent) => {
        const r = resizeRef.current;
        if (!r) return;
        const deltaSec = (me.clientX - r.startX) / pps;
        const newTrimOut = Math.max(
          0,
          Math.min(
            r.origTrimOut - deltaSec,
            r.clipDuration - r.origTrimIn - 0.1,
          ),
        );
        if (r.clipType === "video")
          store.updateVideoClip(r.clipId, { trimOut: newTrimOut });
        else store.updateAudioClip(r.clipId, { trimOut: newTrimOut });
      };
      const onUp = () => {
        store.takeSnapshot();
        resizeRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pps, store],
  );

  // ─ clip click (select) ─────────────────────────────────────────────
  const handleClipClick = useCallback(
    (e: React.MouseEvent, item: ClipItem) => {
      e.stopPropagation();
      if (item.kind === "video" || item.kind === "audio") {
        store.setSelectedClipId(item.data.id);
        store.setSelectedTextId(null);
      } else if (item.kind === "text") {
        store.setSelectedTextId(item.data.id);
        store.setSelectedClipId(null);
      } else {
        store.setSelectedCaptionId(item.data.id);
        store.setSelectedClipId(null);
      }
    },
    [store],
  );

  // ─ context menu ───────────────────────────────────────────────────────
  const handleClipContextMenu = useCallback(
    (e: React.MouseEvent, item: ClipItem) => {
      e.preventDefault();
      setCtxMenu({
        x: e.clientX,
        y: e.clientY,
        clipId: item.data.id,
        clipType: item.kind as "video" | "audio" | "text" | "caption",
      });
    },
    [],
  );

  function ctxDelete(id: string, type: "video" | "audio" | "text" | "caption") {
    store.takeSnapshot();
    if (type === "video") store.removeVideoClip(id);
    else if (type === "audio") store.removeAudioClip(id);
    else if (type === "text") store.removeTextLayer(id);
    else store.removeCaptionLayer(id);
  }
  const ctxDuplicate = useCallback(
    (id: string, type: "video" | "audio" | "text" | "caption") => {
      store.takeSnapshot();
      if (type === "video") {
        const c = videoClips[id];
        if (c)
          store.addVideoClip({
            ...c,
            id: `vclip-${Date.now()}`,
            name: `${c.name} (copy)`,
            startTime: c.startTime + 0.5,
          });
      } else if (type === "audio") {
        const c = audioClips[id];
        if (c)
          store.addAudioClip({
            ...c,
            id: `aclip-${Date.now()}`,
            name: `${c.name} (copy)`,
            startTime: c.startTime + 0.5,
          });
      } else if (type === "text") {
        const l = textLayers[id];
        if (l)
          store.addTextLayer({
            ...l,
            id: `text-${Date.now()}`,
            position: { x: l.position.x + 2, y: l.position.y + 2 },
          });
      }
    },
    [store, videoClips, audioClips, textLayers],
  );
  const ctxSplit = useCallback(
    (id: string) => {
      const clip = videoClips[id];
      if (!clip) return;
      const sp = currentTime - clip.startTime;
      if (sp <= clip.trimIn || sp >= clip.duration - clip.trimOut) return;
      store.takeSnapshot();
      store.updateVideoClip(id, { trimOut: clip.duration - sp });
      store.addVideoClip({
        ...clip,
        id: `vclip-${Date.now()}`,
        name: `${clip.name} (2)`,
        startTime: currentTime,
        trimIn: sp,
        trimOut: 0,
      });
    },
    [store, videoClips, currentTime],
  );
  function ctxTransition(id: string, type: TransitionType) {
    store.updateVideoClip(id, {
      transition: { type, duration: 0.5, easing: "ease-in-out" },
    });
    setCtxMenu(null);
    setShowTransitionMenu(false);
  }

  // ─ add track ────────────────────────────────────────────────────────────
  function addTrack(type: "video" | "audio" | "text") {
    const id = `track-${type}-${Date.now()}`;
    const count =
      trackOrder.filter((tid) => tracks[tid]?.type === type).length + 2;
    store.addTrack({
      id,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
      locked: false,
      hidden: false,
      muted: false,
      height: type === "video" ? 56 : type === "audio" ? 48 : 40,
      clips: [],
    });
  }

  // ─ zoom ──────────────────────────────────────────────────────────────────
  const setZoom = useCallback(
    (z: number) => store.setTimelineZoom(Math.max(1, Math.min(8, z))),
    [store],
  );

  // Scroll-wheel zoom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fn = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        store.setTimelineZoom(
          Math.max(
            1,
            Math.min(8, timelineZoom + (e.deltaY > 0 ? -0.25 : 0.25)),
          ),
        );
      }
    };
    el.addEventListener("wheel", fn, { passive: false });
    return () => el.removeEventListener("wheel", fn);
  }, [timelineZoom, store]);

  // ─ keyboard shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        store.setIsPlaying(!isPlaying);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedClipId) {
          store.takeSnapshot();
          if (videoClips[selectedClipId]) store.removeVideoClip(selectedClipId);
          else if (audioClips[selectedClipId])
            store.removeAudioClip(selectedClipId);
        } else if (selectedTextId) {
          store.takeSnapshot();
          store.removeTextLayer(selectedTextId);
        }
      } else if (e.key === "d" || e.key === "D") {
        if (selectedClipId)
          ctxDuplicate(
            selectedClipId,
            videoClips[selectedClipId] ? "video" : "audio",
          );
      } else if (e.key === "q" || e.key === "Q") {
        if (selectedClipId) ctxSplit(selectedClipId);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        store.undo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.shiftKey && e.key === "Z"))
      ) {
        e.preventDefault();
        store.redo();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        store.setCurrentTime(Math.max(0, currentTime - 1 / 30));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        store.setCurrentTime(Math.min(effDur, currentTime + 1 / 30));
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPlaying,
    selectedClipId,
    selectedTextId,
    currentTime,
    effDur,
    store,
    videoClips,
    audioClips,
    ctxDuplicate,
    ctxSplit,
  ]);

  // ─ ruler ticks ─────────────────────────────────────────────────────────
  const ticks = useMemo(() => {
    const step = timelineZoom >= 4 ? 1 : timelineZoom >= 2 ? 2 : 5;
    const arr: { t: number; major: boolean }[] = [];
    for (let t = 0; t <= effDur; t += step)
      arr.push({ t, major: t % 10 === 0 });
    return arr;
  }, [effDur, timelineZoom]);

  const playheadX = currentTime * pps;

  return (
    <div
      className="flex flex-col h-full select-none text-xs"
      style={{
        background: "#070B14",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "Inter, sans-serif",
      }}
      data-ocid="timeline"
    >
      {/* Top toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0 border-b border-white/5"
        style={{ background: "#0F172A" }}
      >
        <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest">
          Timeline
        </span>
        <div className="flex-1" />
        <span className="font-mono text-[11px] text-white/50">
          {fmtTime(currentTime)} / {fmtTime(effDur)}
        </span>
        <div className="w-px h-3.5 bg-white/10" />
        <button
          type="button"
          onClick={() => setZoom(timelineZoom - 0.5)}
          className="text-white/40 hover:text-white/80 transition-colors w-5 h-5 flex items-center justify-center"
          data-ocid="timeline.zoom_out"
        >
          <svg
            aria-label="Zoom out"
            role="img"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M20 12H4" strokeLinecap="round" />
          </svg>
        </button>
        <input
          type="range"
          min={1}
          max={8}
          step={0.25}
          value={timelineZoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-20 accent-blue-500"
          aria-label="Timeline zoom"
          data-ocid="timeline.zoom_slider"
        />
        <button
          type="button"
          onClick={() => setZoom(timelineZoom + 0.5)}
          className="text-white/40 hover:text-white/80 transition-colors w-5 h-5 flex items-center justify-center"
          data-ocid="timeline.zoom_in"
        >
          <svg
            aria-label="Zoom in"
            role="img"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M12 4v16m8-8H4" strokeLinecap="round" />
          </svg>
        </button>
        <span className="font-mono text-[10px] text-white/35 w-8">
          {timelineZoom.toFixed(1)}x
        </span>
      </div>

      {/* Scrollable body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto relative"
        style={{ scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
      >
        <div style={{ minWidth: LABEL_W + totalW + 40, position: "relative" }}>
          {/* Sticky ruler row */}
          <div
            className="flex sticky top-0 z-20 border-b border-white/5"
            style={{ background: "#0a0f1e" }}
          >
            <div
              className="flex-shrink-0 border-r border-white/5"
              style={{ width: LABEL_W, background: "#0F172A" }}
            />
            <div
              ref={rulerRef}
              className="relative flex-1 h-7 cursor-pointer"
              style={{ minWidth: totalW }}
              onClick={handleRulerClick}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleRulerClick(e as unknown as React.MouseEvent)
              }
              aria-label="Seek timeline"
            >
              {ticks.map(({ t, major }) => (
                <div
                  key={t}
                  className="absolute top-0 flex flex-col items-start"
                  style={{ left: t * pps }}
                >
                  <div
                    style={{
                      width: 1,
                      height: major ? 14 : 7,
                      background: major
                        ? "rgba(255,255,255,0.28)"
                        : "rgba(255,255,255,0.10)",
                    }}
                  />
                  {major && (
                    <span
                      className="text-[9px] font-mono absolute top-4 -translate-x-1/2"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {fmtTime(t)}
                    </span>
                  )}
                  {!major && t % 1 === 0 && (
                    <span
                      className="text-[8px] font-mono absolute top-3 -translate-x-1/2"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      {fmtTime(t)}
                    </span>
                  )}
                </div>
              ))}

              {/* Playhead handle on ruler */}
              {duration > 0 && (
                <div
                  className="absolute top-0 z-10 cursor-ew-resize"
                  style={{ left: playheadX, transform: "translateX(-50%)" }}
                  onMouseDown={handlePlayheadMouseDown}
                  data-ocid="timeline.playhead_handle"
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "8px solid #f87171",
                      filter: "drop-shadow(0 0 4px rgba(248,113,113,0.9))",
                    }}
                  />
                  <div
                    style={{
                      width: 2,
                      height: 12,
                      background: "#f87171",
                      margin: "0 auto",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Track rows */}
          {trackOrder.map((tid, idx) => {
            const track = tracks[tid];
            if (!track) return null;
            return (
              <TrackRow
                key={tid}
                track={track}
                clips={getTrackClips(track)}
                pps={pps}
                currentTime={currentTime}
                duration={duration}
                selectedClipId={selectedClipId}
                selectedTextId={selectedTextId}
                selectedCaptionId={selectedCaptionId}
                onClipMouseDown={handleClipMouseDown}
                onLeftEdge={handleLeftEdge}
                onRightEdge={handleRightEdge}
                onClipClick={handleClipClick}
                onClipContextMenu={handleClipContextMenu}
                onTrackClick={handleTrackClick}
                index={idx}
              />
            );
          })}

          {/* Global playhead line spanning all tracks */}
          {duration > 0 && (
            <div
              className="absolute top-7 bottom-0 w-px pointer-events-none z-40"
              style={{
                left: LABEL_W + playheadX,
                background: "#f87171",
                boxShadow: "0 0 8px rgba(248,113,113,0.75)",
              }}
            />
          )}

          {/* Snap guide */}
          {snapGuide !== null && (
            <div
              className="absolute top-7 bottom-0 w-px pointer-events-none z-35"
              style={{
                left: LABEL_W + snapGuide * pps,
                background: "#fbbf24",
                boxShadow: "0 0 6px rgba(251,191,36,0.6)",
              }}
            />
          )}
        </div>

        {/* Add-track footer (sticky left, scrolls with content) */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 border-t border-white/5"
          style={{
            width: LABEL_W,
            background: "#0F172A",
            position: "sticky",
            left: 0,
          }}
        >
          <span className="text-[9px] text-white/25 uppercase tracking-wider">
            + Track
          </span>
          {(["video", "audio", "text"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 text-white/40 hover:text-white/75 hover:border-white/25 transition-all"
              onClick={() => addTrack(t)}
              data-ocid={`timeline.add_${t}_track`}
            >
              {t[0].toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Context menu */}
      {ctxMenu && (
        <>
          <div
            className="fixed inset-0 z-50"
            onClick={() => {
              setCtxMenu(null);
              setShowTransitionMenu(false);
            }}
            onKeyDown={() => setCtxMenu(null)}
            role="presentation"
          />
          <div
            className="fixed z-[60] rounded-lg border border-white/10 shadow-2xl py-1 min-w-[176px]"
            style={{ left: ctxMenu.x, top: ctxMenu.y, background: "#0F172A" }}
            data-ocid="timeline.context_menu"
          >
            <button
              type="button"
              className="w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => {
                ctxSplit(ctxMenu.clipId);
                setCtxMenu(null);
              }}
              data-ocid="timeline.ctx_split"
            >
              ✂ Split at Playhead
            </button>
            <button
              type="button"
              className="w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => {
                ctxDuplicate(ctxMenu.clipId, ctxMenu.clipType);
                setCtxMenu(null);
              }}
              data-ocid="timeline.ctx_duplicate"
            >
              ⧉ Duplicate
            </button>
            {ctxMenu.clipType === "video" && (
              <div className="relative">
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between"
                  onClick={() => setShowTransitionMenu((v) => !v)}
                  data-ocid="timeline.ctx_transition"
                >
                  <span>⟿ Transition</span>
                  <span className="text-white/25">▶</span>
                </button>
                {showTransitionMenu && (
                  <div
                    className="absolute left-full top-0 rounded-lg border border-white/10 shadow-2xl py-1 min-w-[140px]"
                    style={{ background: "#0F172A" }}
                  >
                    {TRANSITION_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className="w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors capitalize"
                        onClick={() => ctxTransition(ctxMenu.clipId, t)}
                        data-ocid={`timeline.ctx_transition_${t}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="h-px bg-white/5 my-1" />
            <button
              type="button"
              className="w-full text-left px-3 py-1.5 text-red-400 hover:bg-red-500/10 transition-colors"
              onClick={() => {
                ctxDelete(ctxMenu.clipId, ctxMenu.clipType);
                setCtxMenu(null);
              }}
              data-ocid="timeline.ctx_delete"
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
