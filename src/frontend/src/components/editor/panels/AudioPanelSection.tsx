import { useVideoEditorStore } from "@/store/videoEditorStore";
import type { AudioClip } from "@/types/videoEditor";
import {
  Music,
  Music2,
  Trash2,
  Upload,
  Volume,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Waveform ─────────────────────────────────────────────────────────────────

function WaveformBars({
  data,
  isPlaying,
}: {
  data?: number[];
  isPlaying: boolean;
}) {
  const bars = 40;
  const heights = Array.from({ length: bars }, (_, i) => {
    if (data && data[i] !== undefined) return data[i];
    // Sine wave pattern for visual interest
    return (
      0.3 +
      0.5 * Math.abs(Math.sin(i * 0.5)) +
      0.1 * Math.abs(Math.sin(i * 1.3))
    );
  });

  return (
    <div className="flex items-center gap-[1.5px] h-8">
      {heights.map((h, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: stable waveform bars
          key={i}
          className="flex-1 rounded-full"
          style={{
            height: `${Math.max(4, Math.min(100, h * 100))}%`,
            background:
              isPlaying && i % 3 === Math.floor(Date.now() / 120) % 3
                ? "#22C55E"
                : "linear-gradient(180deg, #22C55E 0%, #16a34a 100%)",
            opacity: 0.7 + h * 0.3,
            animation: isPlaying
              ? `waveOsc ${0.3 + (i % 5) * 0.08}s ease-in-out infinite alternate`
              : undefined,
          }}
        />
      ))}
    </div>
  );
}

// ─── Audio Clip Card ──────────────────────────────────────────────────────────

function AudioClipCard({
  clip,
  isPlaying,
  onUpdate,
  onRemove,
}: {
  clip: AudioClip;
  isPlaying: boolean;
  onUpdate: (updates: Partial<AudioClip>) => void;
  onRemove: () => void;
}) {
  const volPct = Math.round(clip.volume * 100);

  return (
    <div
      className="rounded-xl p-3 space-y-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      data-ocid={`audio.clip.${clip.id}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-white/80 truncate">
            {clip.name}
          </p>
          <p className="text-[10px] text-white/35 mt-0.5">
            {formatDuration(clip.duration)}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => onUpdate({ muted: !clip.muted })}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: clip.muted
                ? "rgba(239,68,68,0.15)"
                : "rgba(255,255,255,0.05)",
              border: clip.muted
                ? "1px solid rgba(239,68,68,0.3)"
                : "1px solid rgba(255,255,255,0.08)",
              color: clip.muted ? "#ef4444" : "rgba(255,255,255,0.4)",
            }}
            data-ocid={`audio.mute_button.${clip.id}`}
            aria-label={clip.muted ? "Unmute" : "Mute"}
          >
            {clip.muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.3)",
            }}
            aria-label="Delete clip"
            data-ocid={`audio.delete_button.${clip.id}`}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(239,68,68,0.15)";
              (e.currentTarget as HTMLElement).style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.3)";
            }}
          >
            <Trash2 size={11} />
          </button>
        </div>
      </div>

      {/* Waveform */}
      <WaveformBars data={clip.waveformData} isPlaying={isPlaying} />

      {/* Volume */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Volume size={9} className="text-white/30" />
            <span className="text-[10px] text-white/40 uppercase tracking-wide">
              Volume
            </span>
          </div>
          <span className="text-[10px] font-mono" style={{ color: "#22C55E" }}>
            {volPct}%
          </span>
        </div>
        <div
          className="relative h-[3px] rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${Math.min(100, (volPct / 200) * 100)}%`,
              background:
                "linear-gradient(90deg, rgba(34,197,94,0.4), #22C55E)",
            }}
          />
          <input
            type="range"
            min={0}
            max={200}
            value={volPct}
            onChange={(e) => onUpdate({ volume: Number(e.target.value) / 100 })}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            style={{ WebkitAppearance: "none" }}
            data-ocid={`audio.volume_input.${clip.id}`}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
            style={{
              left: `calc(${Math.min(100, (volPct / 200) * 100)}% - 6px)`,
              background: "radial-gradient(circle, #22C55E 40%, #14532d 100%)",
              boxShadow: "0 0 6px 2px rgba(34,197,94,0.4)",
            }}
          />
        </div>
      </div>

      {/* Fade In */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-wide">
            Fade In
          </span>
          <span className="text-[10px] font-mono text-white/40">
            {clip.fadeIn.toFixed(1)}s
          </span>
        </div>
        <div
          className="relative h-[3px] rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${clip.duration > 0 ? (clip.fadeIn / clip.duration) * 100 : 0}%`,
              background: "rgba(37,99,235,0.5)",
            }}
          />
          <input
            type="range"
            min={0}
            max={Math.max(0.1, clip.duration)}
            step={0.1}
            value={clip.fadeIn}
            onChange={(e) => onUpdate({ fadeIn: Number(e.target.value) })}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            style={{ WebkitAppearance: "none" }}
            data-ocid={`audio.fadein_input.${clip.id}`}
          />
        </div>
      </div>

      {/* Fade Out */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/40 uppercase tracking-wide">
            Fade Out
          </span>
          <span className="text-[10px] font-mono text-white/40">
            {clip.fadeOut.toFixed(1)}s
          </span>
        </div>
        <div
          className="relative h-[3px] rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${clip.duration > 0 ? (clip.fadeOut / clip.duration) * 100 : 0}%`,
              background: "rgba(37,99,235,0.5)",
            }}
          />
          <input
            type="range"
            min={0}
            max={Math.max(0.1, clip.duration)}
            step={0.1}
            value={clip.fadeOut}
            onChange={(e) => onUpdate({ fadeOut: Number(e.target.value) })}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            style={{ WebkitAppearance: "none" }}
            data-ocid={`audio.fadeout_input.${clip.id}`}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Music Library ────────────────────────────────────────────────────────────

const LIBRARY_TRACKS = [
  {
    name: "Cinematic Rise",
    duration: "2:34",
    genre: "Orchestral",
    category: "Cinematic",
  },
  {
    name: "Lo-Fi Chill Waves",
    duration: "3:12",
    genre: "Lo-Fi",
    category: "Lo-Fi",
  },
  {
    name: "Epic Drum Roll",
    duration: "1:58",
    genre: "Action",
    category: "Hip-Hop",
  },
  {
    name: "Neon City Nights",
    duration: "2:47",
    genre: "Electronic",
    category: "Pop",
  },
  {
    name: "Hip-Hop Groove",
    duration: "3:05",
    genre: "Hip-Hop",
    category: "Hip-Hop",
  },
  {
    name: "Ambient Glow",
    duration: "4:20",
    genre: "Ambient",
    category: "Lo-Fi",
  },
];

const LIBRARY_CATEGORIES = ["Trending", "Hip-Hop", "Pop", "Cinematic", "Lo-Fi"];

// ─── Main Component ───────────────────────────────────────────────────────────

export function AudioPanelSection() {
  const store = useVideoEditorStore();
  const audioClips = Object.values(store.audioClips);
  const isPlaying = store.isPlaying;
  const masterVolume = Math.round(store.volume * 100);

  const [activeCategory, setActiveCategory] = useState("Trending");
  const [isDragging, setIsDragging] = useState(false);
  const [addedTracks, setAddedTracks] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const src = URL.createObjectURL(file);
      const tempAudio = document.createElement("audio");
      tempAudio.preload = "metadata";
      tempAudio.src = src;
      tempAudio.onloadedmetadata = () => {
        const dur = tempAudio.duration || 0;
        const id = makeId("aclip");
        store.addAudioClip({
          id,
          type: "audio",
          trackId: "track-audio-1",
          src,
          name: file.name.replace(/\.[^.]+$/, ""),
          startTime: 0,
          duration: dur,
          trimIn: 0,
          trimOut: dur,
          volume: 1,
          muted: false,
          locked: false,
          hidden: false,
          fadeIn: 0,
          fadeOut: 0,
        });
      };
    },
    [store],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("audio/")) handleFile(file);
    },
    [handleFile],
  );

  const handleLibraryAdd = (name: string) => {
    setAddedTracks((prev) => new Set([...prev, name]));
    // Show reset after 2s
    setTimeout(() => {
      setAddedTracks((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }, 2000);
  };

  const filteredTracks =
    activeCategory === "Trending"
      ? LIBRARY_TRACKS
      : LIBRARY_TRACKS.filter((t) => t.category === activeCategory);

  return (
    <div className="p-4 space-y-4" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Master Volume */}
      <div
        className="rounded-xl p-3 space-y-2"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Master Volume
          </span>
          <span
            className="text-[10px] font-mono"
            style={{
              color: masterVolume > 0 ? "#22C55E" : "rgba(255,255,255,0.3)",
            }}
          >
            {masterVolume}%
          </span>
        </div>
        <div
          className="relative h-[3px] rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${masterVolume}%`,
              background:
                "linear-gradient(90deg, rgba(34,197,94,0.4), #22C55E)",
            }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={masterVolume}
            onChange={(e) => store.setVolume(Number(e.target.value) / 100)}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            style={{ WebkitAppearance: "none" }}
            data-ocid="audio.master_volume"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
            style={{
              left: `calc(${masterVolume}% - 6px)`,
              background: "radial-gradient(circle, #22C55E 40%, #14532d 100%)",
              boxShadow: "0 0 6px 2px rgba(34,197,94,0.4)",
            }}
          />
        </div>
      </div>

      {/* Upload zone */}
      <button
        type="button"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className="rounded-xl p-3 cursor-pointer transition-all w-full text-left"
        style={{
          border: isDragging
            ? "1.5px dashed #22C55E"
            : "1.5px dashed rgba(255,255,255,0.1)",
          background: isDragging
            ? "rgba(34,197,94,0.06)"
            : "rgba(255,255,255,0.02)",
        }}
        onClick={() => fileInputRef.current?.click()}
        aria-label="Upload audio file"
        data-ocid="audio.upload_dropzone"
      >
        <div className="flex items-center gap-2.5">
          <Upload
            className="w-4 h-4"
            style={{ color: isDragging ? "#22C55E" : "rgba(255,255,255,0.35)" }}
          />
          <div>
            <p
              className="text-[11px] font-medium"
              style={{
                color: isDragging ? "#22C55E" : "rgba(255,255,255,0.5)",
              }}
            >
              {isDragging ? "Drop audio here" : "Upload audio / music"}
            </p>
            <p className="text-[10px] text-white/25 mt-0.5">
              MP3, WAV, AAC, OGG
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
          data-ocid="audio.upload_input"
        />
      </button>

      {/* Audio clips */}
      {audioClips.length > 0 && (
        <div className="space-y-3">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30">
            Audio Tracks ({audioClips.length})
          </p>
          {audioClips.map((clip) => (
            <AudioClipCard
              key={clip.id}
              clip={clip}
              isPlaying={isPlaying}
              onUpdate={(updates) => store.updateAudioClip(clip.id, updates)}
              onRemove={() => store.removeAudioClip(clip.id)}
            />
          ))}
        </div>
      )}

      {/* Music Library */}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/30 mb-2">
          Music Library (Demo)
        </p>

        {/* Category tabs */}
        <div className="flex gap-1 mb-3 flex-wrap">
          {LIBRARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-2 py-1 rounded-lg text-[10px] font-medium transition-all"
              style={{
                background:
                  activeCategory === cat
                    ? "rgba(37,99,235,0.2)"
                    : "rgba(255,255,255,0.05)",
                border:
                  activeCategory === cat
                    ? "1px solid rgba(37,99,235,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                color:
                  activeCategory === cat ? "#2563EB" : "rgba(255,255,255,0.45)",
              }}
              data-ocid={`audio.category.${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Track list */}
        <div className="space-y-2">
          {filteredTracks.map((track, i) => {
            const added = addedTracks.has(track.name);
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                key={i}
                className="flex items-center gap-2.5 p-2.5 rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                data-ocid={`audio.library-track.${i + 1}`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(37,99,235,0.12)",
                    color: "#2563EB",
                  }}
                >
                  <Music className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white/75 truncate">
                    {track.name}
                  </p>
                  <p className="text-[10px] text-white/30">
                    {track.genre} · {track.duration}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleLibraryAdd(track.name)}
                  className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all"
                  style={{
                    background: added
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(37,99,235,0.15)",
                    border: added
                      ? "1px solid rgba(34,197,94,0.3)"
                      : "1px solid rgba(37,99,235,0.25)",
                    color: added ? "#22C55E" : "#2563EB",
                  }}
                  data-ocid={`audio.library-add.${i + 1}`}
                >
                  <Music2 size={10} />
                  {added ? "Added!" : "+ Add"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
