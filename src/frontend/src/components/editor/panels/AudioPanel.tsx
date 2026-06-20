import {
  ChevronDown,
  ChevronUp,
  Mic,
  Music,
  Play,
  Radio,
  Search,
  Volume2,
  Wand2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const CATEGORIES = [
  "Trending",
  "Royalty-free",
  "Ambient",
  "Electronic",
  "Podcasts",
];
const TRACKS = [
  {
    id: "t1",
    name: "Neon Drift",
    bpm: 128,
    dur: "3:24",
    grad: "from-blue-800 to-cyan-700",
  },
  {
    id: "t2",
    name: "Cinematic Rise",
    bpm: 85,
    dur: "2:48",
    grad: "from-purple-900 to-pink-800",
  },
  {
    id: "t3",
    name: "Lo-fi Chill",
    bpm: 72,
    dur: "4:10",
    grad: "from-green-900 to-teal-700",
  },
  {
    id: "t4",
    name: "Epic Trailer",
    bpm: 140,
    dur: "1:55",
    grad: "from-red-900 to-orange-700",
  },
  {
    id: "t5",
    name: "Synthwave Rush",
    bpm: 110,
    dur: "3:02",
    grad: "from-indigo-900 to-blue-700",
  },
  {
    id: "t6",
    name: "Deep Focus",
    bpm: 60,
    dur: "5:30",
    grad: "from-slate-800 to-gray-700",
  },
  {
    id: "t7",
    name: "Upbeat Pop",
    bpm: 132,
    dur: "2:15",
    grad: "from-yellow-800 to-orange-600",
  },
  {
    id: "t8",
    name: "Dark Ambient",
    bpm: 48,
    dur: "6:00",
    grad: "from-gray-900 to-slate-800",
  },
];

const VOICE_EFFECTS = [
  { id: "robot", label: "Robot", icon: "🤖" },
  { id: "deep", label: "Deep", icon: "🔊" },
  { id: "chipmunk", label: "Chipmunk", icon: "🐿️" },
  { id: "radio", label: "Radio", icon: "📻" },
  { id: "echo", label: "Echo", icon: "🔁" },
  { id: "synth", label: "Synth", icon: "🎛️" },
];

const TTS_VOICES = ["Male", "Female", "Energetic", "Calm"];

function Accordion({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${BORDER}` }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left transition-all hover:bg-white/5"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: ACCENT }} />
          <span className="text-xs font-semibold text-white">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5" style={{ color: MUTED }} />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" style={{ color: MUTED }} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3" style={{ borderTop: `1px solid ${BORDER}` }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AudioPanel() {
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [noiseReduction, setNoiseReduction] = useState(50);
  const [activeVoice, setActiveVoice] = useState<string | null>(null);
  const [ttsText, setTtsText] = useState("");
  const [ttsVoice, setTtsVoice] = useState("Female");
  const [ttsProgress, setTtsProgress] = useState(0);
  const [ttsState, setTtsState] = useState<"idle" | "loading" | "done">("idle");
  const [beatState, setBeatState] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const handleBeatDetect = () => {
    setBeatState("loading");
    setTimeout(() => {
      setBeatState("done");
      toast.success("Beat markers added!");
    }, 3000);
  };

  const handleGenerateTTS = () => {
    if (!ttsText.trim()) return;
    setTtsState("loading");
    setTtsProgress(0);
    const iv = setInterval(() => {
      setTtsProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setTtsState("done");
          return 100;
        }
        return p + 5;
      });
    }, 150);
  };

  return (
    <div
      className="flex flex-col gap-3 p-3 overflow-y-auto h-full"
      data-ocid="audio_panel"
    >
      {/* Music Library */}
      <Accordion title="Music Library" icon={Music} defaultOpen>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${BORDER}`,
          }}
        >
          <Search
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: MUTED }}
          />
          <input
            placeholder="Search tracks..."
            className="flex-1 bg-transparent text-xs text-white placeholder-white/30 outline-none"
            data-ocid="audio.music_search_input"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium transition-all"
              style={{
                background:
                  activeCategory === cat ? ACCENT : "rgba(255,255,255,0.06)",
                color: activeCategory === cat ? "white" : MUTED,
              }}
              data-ocid={`audio.category_pill.${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {TRACKS.map((track) => (
            <motion.div
              key={track.id}
              whileHover={{ x: 2 }}
              className="flex items-center gap-2.5 p-2 rounded-lg group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${track.grad} flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {track.name}
                </p>
                <p className="text-[10px]" style={{ color: MUTED }}>
                  {track.bpm} BPM · {track.dur}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPlayingTrack(playingTrack === track.id ? null : track.id)
                }
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background:
                    playingTrack === track.id
                      ? ACCENT
                      : "rgba(255,255,255,0.08)",
                }}
                data-ocid={`audio.track_play.${track.id}`}
              >
                <Play className="w-3 h-3 text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      </Accordion>

      {/* Audio Tools */}
      <Accordion title="Audio Tools" icon={Volume2}>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium text-white transition-all hover:brightness-110"
            style={{ background: ACCENT }}
            data-ocid="audio.extract_audio_button"
          >
            <Zap className="w-3.5 h-3.5" />
            Extract Audio from Video
          </button>
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] font-medium text-white">
                Noise Reduction
              </span>
              <span className="text-[10px]" style={{ color: MUTED }}>
                {noiseReduction}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={noiseReduction}
              onChange={(e) => setNoiseReduction(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: ACCENT }}
              data-ocid="audio.noise_reduction_slider"
            />
          </div>
          <button
            type="button"
            onClick={handleBeatDetect}
            disabled={beatState === "loading"}
            className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium transition-all"
            style={{
              background:
                beatState === "done" ? `${GREEN}20` : "rgba(255,255,255,0.06)",
              border: `1px solid ${beatState === "done" ? GREEN : BORDER}`,
              color: beatState === "done" ? GREEN : "white",
            }}
            data-ocid="audio.beat_detection_button"
          >
            {beatState === "loading" ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Radio className="w-3.5 h-3.5" />
              </motion.div>
            ) : (
              <Radio className="w-3.5 h-3.5" />
            )}
            {beatState === "loading"
              ? "Detecting beats..."
              : beatState === "done"
                ? "✓ Beat markers added!"
                : "Beat Detection"}
          </button>
        </div>
      </Accordion>

      {/* Voice & Speech */}
      <Accordion title="Voice & Speech" icon={Mic}>
        <div className="flex flex-col gap-4">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: MUTED }}
            >
              Voice Effects
            </p>
            <div className="grid grid-cols-3 gap-2">
              {VOICE_EFFECTS.map((ve) => (
                <button
                  key={ve.id}
                  type="button"
                  onClick={() =>
                    setActiveVoice(activeVoice === ve.id ? null : ve.id)
                  }
                  className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl text-[10px] font-medium transition-all"
                  style={{
                    background:
                      activeVoice === ve.id
                        ? `${ACCENT}25`
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeVoice === ve.id ? ACCENT : BORDER}`,
                    color: activeVoice === ve.id ? "white" : MUTED,
                    boxShadow:
                      activeVoice === ve.id ? `0 0 12px ${ACCENT}40` : "none",
                  }}
                  data-ocid={`audio.voice_effect.${ve.id}`}
                >
                  <span className="text-base">{ve.icon}</span>
                  {ve.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: MUTED }}
            >
              Text to Speech
            </p>
            <textarea
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              placeholder="Type what you want to say..."
              className="w-full h-20 px-3 py-2 rounded-lg text-xs text-white placeholder-white/30 outline-none resize-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${BORDER}`,
              }}
              data-ocid="audio.tts_textarea"
            />
            <select
              value={ttsVoice}
              onChange={(e) => setTtsVoice(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg text-xs text-white outline-none appearance-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${BORDER}`,
              }}
              data-ocid="audio.tts_voice_select"
            >
              {TTS_VOICES.map((v) => (
                <option key={v} value={v} style={{ background: "#0f172a" }}>
                  {v} Voice
                </option>
              ))}
            </select>
            {ttsState === "loading" && (
              <div className="mt-2">
                <div
                  className="flex justify-between text-[10px] mb-1"
                  style={{ color: MUTED }}
                >
                  <span>Generating speech...</span>
                  <span>{ttsProgress}%</span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: ACCENT, width: `${ttsProgress}%` }}
                  />
                </div>
              </div>
            )}
            {ttsState === "done" && (
              <div className="mt-3">
                <p className="text-[10px] mb-1.5" style={{ color: MUTED }}>
                  Waveform Preview
                </p>
                <div className="flex items-end gap-0.5 h-10 px-2">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable positional waveform bars
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{ background: GREEN }}
                      animate={{
                        height: ["20%", `${Math.random() * 80 + 20}%`, "20%"],
                      }}
                      transition={{
                        duration: 0.8 + Math.random() * 0.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.03,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={handleGenerateTTS}
              disabled={!ttsText.trim() || ttsState === "loading"}
              className="w-full mt-2 py-2 rounded-lg text-xs font-semibold text-white transition-all flex items-center justify-center gap-2"
              style={{ background: ACCENT, opacity: !ttsText.trim() ? 0.5 : 1 }}
              data-ocid="audio.tts_generate_button"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Generate Speech
            </button>
          </div>
        </div>
      </Accordion>
    </div>
  );
}
