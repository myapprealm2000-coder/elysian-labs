import { Clock, Film, Music, Play, Plus, Upload, Video } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const PANEL_BG = "#0F172A";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#2563EB";
const GREEN = "#22C55E";

const SAMPLE_CLIPS = [
  {
    id: "c1",
    name: "City Timelapse",
    duration: "0:12",
    grad: "from-blue-900 to-cyan-800",
  },
  {
    id: "c2",
    name: "Forest Walk",
    duration: "0:08",
    grad: "from-green-900 to-emerald-700",
  },
  {
    id: "c3",
    name: "Studio Lights",
    duration: "0:15",
    grad: "from-purple-900 to-pink-800",
  },
  {
    id: "c4",
    name: "Ocean Waves",
    duration: "0:20",
    grad: "from-blue-800 to-teal-600",
  },
  {
    id: "c5",
    name: "Neon Street",
    duration: "0:10",
    grad: "from-pink-900 to-red-800",
  },
  {
    id: "c6",
    name: "Abstract FX",
    duration: "0:06",
    grad: "from-yellow-800 to-orange-700",
  },
];

interface MediaPanelProps {
  onAddClip?: (clipId: string) => void;
}

export function MediaPanel({ onAddClip }: MediaPanelProps) {
  const videoRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);
  const [uploadedClips, setUploadedClips] = useState<
    { name: string; dur: string; id: string }[]
  >([]);
  const [dragOver, setDragOver] = useState(false);

  const handleVideoFile = (file: File) => {
    const name = file.name.replace(/\.[^.]+$/, "");
    setUploadedClips((prev) => [
      ...prev,
      { name, dur: "0:00", id: `upload-${Date.now()}` },
    ]);
  };

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      style={{ background: PANEL_BG }}
      data-ocid="media_panel"
    >
      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file?.type.startsWith("video/")) handleVideoFile(file);
        }}
        className="relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all"
        style={{
          borderColor: dragOver ? ACCENT : BORDER,
          background: dragOver ? `${ACCENT}10` : "rgba(255,255,255,0.02)",
        }}
        onClick={() => videoRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") videoRef.current?.click();
        }}
        role="presentation"
        tabIndex={-1}
        data-ocid="media.dropzone"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${ACCENT}20` }}
        >
          <Film className="w-6 h-6" style={{ color: ACCENT }} />
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-white">
            Drop video or click to upload
          </p>
          <p
            className="text-[10px] mt-0.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            MP4, MOV, AVI, WebM
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium text-white"
          style={{ background: ACCENT }}
        >
          <Upload className="w-3.5 h-3.5" />
          Browse Files
        </div>
      </div>

      {/* Uploaded clips */}
      <AnimatePresence>
        {uploadedClips.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Uploaded Clips
            </p>
            <div className="grid grid-cols-2 gap-2">
              {uploadedClips.map((clip) => (
                <motion.button
                  key={clip.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => onAddClip?.(clip.id)}
                  className="relative rounded-lg overflow-hidden group"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${BORDER}`,
                  }}
                  data-ocid={`media.uploaded_clip.${clip.id}`}
                >
                  <div
                    className="w-full aspect-video flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #1e3a5f, #0f2a4a)",
                    }}
                  >
                    <Video
                      className="w-5 h-5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background: "rgba(0,0,0,0.5)" }}
                    >
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="p-1.5">
                    <p className="text-[10px] font-medium text-white truncate">
                      {clip.name}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-[9px] mt-0.5"
                      style={{ color: GREEN }}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      {clip.dur}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample clips */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Sample Clips
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_CLIPS.map((clip) => (
            <motion.button
              key={clip.id}
              type="button"
              whileHover={{ scale: 1.03 }}
              onClick={() => onAddClip?.(clip.id)}
              className="relative rounded-lg overflow-hidden group"
              style={{ border: `1px solid ${BORDER}` }}
              data-ocid={`media.sample_clip.${clip.id}`}
            >
              <div
                className={`w-full aspect-video bg-gradient-to-br ${clip.grad} flex items-center justify-center`}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-1.5" style={{ background: "rgba(0,0,0,0.6)" }}>
                <p className="text-[10px] font-medium text-white truncate">
                  {clip.name}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-[9px] mt-0.5"
                  style={{ color: GREEN }}
                >
                  <Clock className="w-2.5 h-2.5" />
                  {clip.duration}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Audio section */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Music Track
        </p>
        <button
          type="button"
          onClick={() => audioRef.current?.click()}
          className="flex items-center gap-3 w-full p-3 rounded-xl border-2 border-dashed transition-all hover:border-green-500/60 group"
          style={{ borderColor: BORDER, background: "rgba(255,255,255,0.02)" }}
          data-ocid="media.audio_upload_button"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:bg-green-500/20"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Music className="w-4 h-4" style={{ color: GREEN }} />
          </div>
          <div className="text-left">
            <p className="text-xs font-medium text-white">
              Add Background Music
            </p>
            <p
              className="text-[10px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              MP3, WAV, OGG
            </p>
          </div>
        </button>
      </div>

      <input
        ref={videoRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleVideoFile(f);
        }}
      />
      <input ref={audioRef} type="file" accept="audio/*" className="sr-only" />
    </div>
  );
}
