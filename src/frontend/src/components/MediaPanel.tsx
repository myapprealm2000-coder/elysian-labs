import { PRESET_STYLES } from "@/hooks/useVideoEditor";
import type { PresetType, TextOverlay } from "@/hooks/useVideoEditor";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Music,
  Plus,
  Sparkles,
  Upload,
  Video,
  Zap,
} from "lucide-react";
import { useRef } from "react";

interface MediaPanelProps {
  videoSrc: string | null;
  audioSrc: string | null;
  duration: number;
  activeTab: "media" | "text" | "effects";
  textOverlays: TextOverlay[];
  selectedTextId: string | null;
  onLoadVideoFile: (file: File) => void;
  onLoadAudioFile: (file: File) => void;
  onAddText: () => void;
  onAddPreset: (preset: Exclude<PresetType, "custom">) => void;
  onSelectText: (id: string) => void;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const PRESET_CARDS = [
  {
    id: "youtube" as const,
    label: "YouTube",
    desc: "Bold Impact, black outline",
    preview: "SUBSCRIBE",
    previewStyle: {
      fontFamily: "Impact, sans-serif",
      fontSize: 16,
      fontWeight: 700,
      color: "#ffffff",
      textShadow:
        "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
    } as React.CSSProperties,
    gradient: "from-red-900/60 to-red-700/20",
    icon: Zap,
    iconColor: "#ff4444",
  },
  {
    id: "glow" as const,
    label: "Glow",
    desc: "Emerald, glowing halo",
    preview: "Elysian",
    previewStyle: {
      fontFamily: "Plus Jakarta Sans, sans-serif",
      fontSize: 15,
      fontWeight: 600,
      color: "#50c878",
      filter: "drop-shadow(0 0 6px #50c878) drop-shadow(0 0 14px #50c878)",
    } as React.CSSProperties,
    gradient: "from-emerald-900/60 to-emerald-700/20",
    icon: Sparkles,
    iconColor: "#50c878",
  },
  {
    id: "bold" as const,
    label: "Bold",
    desc: "Massive white Impact",
    preview: "BOLD",
    previewStyle: {
      fontFamily: "Impact, sans-serif",
      fontSize: 22,
      fontWeight: 900,
      color: "#ffffff",
      letterSpacing: 2,
    } as React.CSSProperties,
    gradient: "from-blue-900/60 to-blue-700/20",
    icon: AlignCenter,
    iconColor: "#0047ab",
  },
];

export function MediaPanel({
  videoSrc,
  audioSrc,
  duration,
  activeTab,
  textOverlays,
  selectedTextId,
  onLoadVideoFile,
  onLoadAudioFile,
  onAddText,
  onAddPreset,
  onSelectText,
}: MediaPanelProps) {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  if (activeTab === "text") {
    return (
      <div
        className="flex flex-col gap-3 p-3 overflow-y-auto h-full"
        data-ocid="text-panel"
      >
        {/* Add text button */}
        <button
          type="button"
          onClick={onAddText}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg font-semibold text-sm transition-smooth text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.5 0.17 150))",
            boxShadow: "0 0 12px oklch(0.38 0.15 270 / 0.3)",
          }}
          data-ocid="text-add-btn"
        >
          <Plus className="w-4 h-4" />
          Add Text Layer
        </button>

        {/* Preset styles */}
        <div className="border-t border-border pt-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Preset Styles
          </p>
          <div className="flex flex-col gap-2">
            {PRESET_CARDS.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onAddPreset(preset.id)}
                  className={`flex items-center gap-3 w-full p-2.5 rounded-xl border border-border bg-gradient-to-r ${preset.gradient} hover:border-white/20 transition-smooth text-left group`}
                  data-ocid={`text-preset-${preset.id}`}
                >
                  <div
                    className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    <span style={preset.previewStyle}>{preset.preview}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon
                        className="w-3 h-3 flex-shrink-0"
                        style={{ color: preset.iconColor }}
                      />
                      <span className="text-xs font-bold text-foreground">
                        {preset.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {preset.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text layer list */}
        {textOverlays.length > 0 && (
          <div className="border-t border-border pt-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Text Layers ({textOverlays.length})
            </p>
            <div className="flex flex-col gap-1">
              {textOverlays.map((t, i) => {
                const isSelected = selectedTextId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onSelectText(t.id)}
                    className="flex items-center gap-2 w-full p-2 rounded-lg border transition-smooth text-left"
                    style={{
                      borderColor: isSelected
                        ? "#0047ab"
                        : "oklch(0.2 0.004 240)",
                      background: isSelected
                        ? "oklch(0.38 0.15 270 / 0.12)"
                        : "oklch(0.13 0.005 240)",
                    }}
                    data-ocid={`text-layer-item.${i + 1}`}
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        background: isSelected
                          ? "#0047ab"
                          : "oklch(0.18 0.004 240)",
                        color: "white",
                      }}
                    >
                      T
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs text-foreground truncate"
                        style={{
                          fontFamily: t.fontFamily,
                          fontWeight: t.bold ? 700 : 400,
                          fontStyle: t.italic ? "italic" : "normal",
                        }}
                      >
                        {t.content || "(empty)"}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        {t.fontFamily} · {t.fontSize}px
                      </p>
                      <p
                        className="text-[9px] font-mono"
                        style={{ color: "oklch(0.65 0.15 300 / 0.9)" }}
                      >
                        {t.startTime.toFixed(1)}s – {t.endTime.toFixed(1)}s
                      </p>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: t.color }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Alignment quick-controls hint */}
        <div
          className="rounded-lg p-2.5 text-[10px] text-muted-foreground"
          style={{ background: "oklch(0.11 0.005 240)" }}
        >
          <p className="font-semibold text-foreground mb-1">Tips</p>
          <p>• Double-click text on canvas to edit inline</p>
          <p>• Drag text to reposition on canvas</p>
          <p>• Select text, then use Properties panel to style</p>
        </div>
      </div>
    );
  }

  // Media tab
  return (
    <div
      className="flex flex-col gap-3 p-3 overflow-y-auto h-full"
      data-ocid="media-panel"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Video
      </p>

      {videoSrc ? (
        <button
          onClick={() => videoInputRef.current?.click()}
          type="button"
          className="relative w-full rounded-lg overflow-hidden"
          data-ocid="media-video-thumb"
        >
          <video
            src={videoSrc}
            className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-smooth"
            muted
            preload="metadata"
          >
            <track kind="captions" />
          </video>
          <div
            className="absolute bottom-0 left-0 right-0 px-2 py-1 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(to top, oklch(0.05 0 0), transparent)",
            }}
          >
            <span className="text-[10px] text-foreground font-medium">
              Video Clip
            </span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{
                background: "oklch(0.38 0.15 270 / 0.8)",
                color: "white",
              }}
            >
              {fmt(duration)}
            </span>
          </div>
        </button>
      ) : (
        <label
          htmlFor="media-video-input"
          className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-accent/60 cursor-pointer transition-smooth text-center"
          data-ocid="media-video-dropzone"
        >
          <Video className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Drop video or click
          </span>
        </label>
      )}

      <button
        type="button"
        onClick={() => videoInputRef.current?.click()}
        className="flex items-center gap-2 w-full py-2 px-3 rounded-lg border border-dashed border-border hover:border-primary/60 hover:bg-primary/5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
        data-ocid="media-upload-video-btn"
      >
        <Upload className="w-3.5 h-3.5" />
        {videoSrc ? "Replace Video" : "Upload Video"}
      </button>

      <div className="border-t border-border pt-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
          Audio
        </p>

        {audioSrc ? (
          <div
            className="flex items-center gap-2 p-2.5 rounded-lg border border-border"
            style={{ background: "oklch(0.65 0.17 150 / 0.08)" }}
            data-ocid="media-audio-item"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(0.65 0.17 150 / 0.2)" }}
            >
              <Music className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                Audio Track
              </p>
              <p className="text-[10px] text-muted-foreground">Loaded</p>
            </div>
          </div>
        ) : (
          <label
            htmlFor="media-audio-input"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-accent/60 cursor-pointer transition-smooth text-center"
            data-ocid="media-audio-dropzone"
          >
            <Music className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Drop audio or click
            </span>
            <span className="text-[10px] text-muted-foreground">
              MP3, WAV, OGG
            </span>
          </label>
        )}

        <button
          type="button"
          onClick={() => audioInputRef.current?.click()}
          className="flex items-center gap-2 w-full mt-2 py-2 px-3 rounded-lg border border-dashed border-border hover:border-accent/60 hover:bg-accent/5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="media-upload-audio-btn"
        >
          <Upload className="w-3.5 h-3.5" />
          {audioSrc ? "Replace Audio" : "Upload Audio"}
        </button>
      </div>

      <input
        ref={videoInputRef}
        id="media-video-input"
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onLoadVideoFile(f);
        }}
        data-ocid="media-video-file-input"
      />
      <input
        ref={audioInputRef}
        id="media-audio-input"
        type="file"
        accept="audio/*"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onLoadAudioFile(f);
        }}
        data-ocid="media-audio-file-input"
      />
    </div>
  );
}
