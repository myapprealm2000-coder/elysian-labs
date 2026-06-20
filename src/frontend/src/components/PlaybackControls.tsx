import type { SpeedValue } from "@/hooks/useVideoEditor";
import {
  Pause,
  Play,
  Repeat,
  SkipBack,
  StepBack,
  StepForward,
  Volume2,
} from "lucide-react";

const SPEEDS: SpeedValue[] = [0.5, 0.75, 1, 1.25, 1.5, 2];

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  hasVideo: boolean;
  speed: SpeedValue;
  loop: boolean;
  volume: number;
  onTogglePlay: () => void;
  onRewind: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onSeek: (t: number) => void;
  onSetSpeed: (s: SpeedValue) => void;
  onSetLoop: (v: boolean) => void;
  onSetVolume: (v: number) => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00.00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `${m}:${s.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
}

export function PlaybackControls({
  isPlaying,
  currentTime,
  duration,
  hasVideo,
  speed,
  loop,
  volume,
  onTogglePlay,
  onRewind,
  onStepBack,
  onStepForward,
  onSeek,
  onSetSpeed,
  onSetLoop,
  onSetVolume,
}: PlaybackControlsProps) {
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div
      className="flex flex-col flex-shrink-0 border-t border-border"
      style={{ background: "oklch(0.10 0.005 240)" }}
      data-ocid="playback-controls"
    >
      {/* Seek scrubber */}
      <div className="relative px-3 pt-2.5 pb-1" data-ocid="playback-seek-bar">
        <div
          className="relative h-1.5 rounded-full overflow-visible group cursor-pointer"
          style={{ background: "oklch(0.18 0 0)" }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full pointer-events-none"
            style={{
              width: `${progress * 100}%`,
              background:
                "linear-gradient(90deg, oklch(0.38 0.15 270), oklch(0.65 0.17 150))",
            }}
          />
          <div
            className="absolute top-1/2 w-3 h-3 rounded-full border-2 border-white pointer-events-none"
            style={{
              left: `${progress * 100}%`,
              transform: "translateX(-50%) translateY(-50%)",
              background: "oklch(0.65 0.17 150)",
              boxShadow: "0 0 6px oklch(0.65 0.17 150 / 0.8)",
            }}
          />
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={0.01}
            value={currentTime}
            disabled={!hasVideo}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            aria-label="Seek"
            style={{ height: "100%" }}
            data-ocid="playback-seek-input"
          />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-2 px-3 py-1.5">
        {/* Time */}
        <div
          className="font-mono text-xs tabular-nums text-muted-foreground min-w-[118px]"
          data-ocid="playback-time"
        >
          <span className="text-foreground font-medium">
            {formatTime(currentTime)}
          </span>
          <span className="mx-1 opacity-30">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Transport */}
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <button
            type="button"
            onClick={onRewind}
            disabled={!hasVideo}
            className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-smooth"
            title="Rewind to start"
            aria-label="Rewind to start"
            data-ocid="playback-rewind"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onStepBack}
            disabled={!hasVideo}
            className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-smooth"
            title="Step back 1 frame"
            aria-label="Step back 1 frame"
            data-ocid="playback-step-back"
          >
            <StepBack className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            disabled={!hasVideo}
            className="w-10 h-10 flex items-center justify-center rounded-full disabled:opacity-30 transition-smooth shadow-lg"
            style={{
              background: hasVideo
                ? "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.5 0.17 150))"
                : "oklch(0.18 0 0)",
              boxShadow: hasVideo
                ? "0 0 14px oklch(0.38 0.15 270 / 0.5)"
                : "none",
            }}
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            aria-label={isPlaying ? "Pause" : "Play"}
            data-ocid="playback-toggle"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onStepForward}
            disabled={!hasVideo}
            className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 transition-smooth"
            title="Step forward 1 frame"
            aria-label="Step forward 1 frame"
            data-ocid="playback-step-forward"
          >
            <StepForward className="w-3.5 h-3.5" />
          </button>

          <select
            value={speed}
            onChange={(e) => onSetSpeed(Number(e.target.value) as SpeedValue)}
            disabled={!hasVideo}
            className="ml-1 h-7 px-1.5 rounded text-xs font-mono border border-border bg-muted text-foreground disabled:opacity-30 cursor-pointer focus:outline-none focus:border-accent"
            aria-label="Playback speed"
            data-ocid="playback-speed-select"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s}>
                {s}x
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onSetLoop(!loop)}
            disabled={!hasVideo}
            className={[
              "w-7 h-7 flex items-center justify-center rounded disabled:opacity-30 transition-smooth",
              loop
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            ].join(" ")}
            style={loop ? { background: "oklch(0.82 0.17 142 / 0.12)" } : {}}
            title={loop ? "Loop on" : "Loop off"}
            aria-label="Toggle loop"
            data-ocid="playback-loop-toggle"
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5 min-w-[110px] justify-end">
          <Volume2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={200}
            step={1}
            value={volume}
            onChange={(e) => onSetVolume(Number(e.target.value))}
            className="w-20 cursor-pointer"
            style={{ accentColor: "oklch(0.65 0.17 150)" }}
            aria-label="Volume"
            data-ocid="playback-volume-slider"
          />
          <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
}
