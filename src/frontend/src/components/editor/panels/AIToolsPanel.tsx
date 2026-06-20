import {
  ArrowUpCircle,
  ChevronDown,
  ChevronUp,
  Focus,
  Scissors,
  Sparkles,
  Video,
  Wand2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const CAPTION_SAMPLES = [
  { ts: "00:00:01 → 00:00:04", text: "Welcome to Elysian Labs" },
  { ts: "00:00:05 → 00:00:08", text: "Create stunning visuals" },
  { ts: "00:00:09 → 00:00:12", text: "With AI-powered tools" },
  { ts: "00:00:13 → 00:00:16", text: "Professional grade editing" },
  { ts: "00:00:17 → 00:00:21", text: "For everyone, for free" },
  { ts: "00:00:22 → 00:00:25", text: "Start your project today" },
  { ts: "00:00:26 → 00:00:29", text: "Elysian Labs — Create more" },
  { ts: "00:00:30 → 00:00:34", text: "Your creativity, unleashed" },
];

const HOOK_SUGGESTIONS = [
  { text: "You won't believe what happened next...", grade: "A+" },
  { text: "This one trick changed everything for me", grade: "A" },
  { text: "Stop scrolling — this is important", grade: "A" },
  { text: "Nobody talks about this, but you should know", grade: "B+" },
  { text: "I tried this for 30 days. Here's what happened", grade: "B" },
];

const SCRIPT_COLORS = [
  "#2563EB",
  "#7c3aed",
  "#059669",
  "#dc2626",
  "#d97706",
  "#0891b2",
];

const REFRAME_RATIOS = ["9:16", "16:9", "1:1"];
const PLATFORMS = ["TikTok", "YouTube", "Instagram", "Reels"];

type ToolState = "idle" | "loading" | "done";

function useSimulator(durationMs = 4000) {
  const [state, setState] = useState<ToolState>("idle");
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const run = (steps: string[], onDone?: () => void) => {
    setState("loading");
    setProgress(0);
    setStep(0);
    const totalSteps = steps.length;
    let currentStep = 0;
    let currentProgress = 0;
    const stepDuration = durationMs / totalSteps;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      const newStep = Math.floor((currentProgress / 100) * totalSteps);
      if (newStep !== currentStep && newStep < totalSteps) {
        currentStep = newStep;
        setStep(currentStep);
      }
      if (currentProgress >= 100) {
        clearInterval(interval);
        setState("done");
        onDone?.();
      }
    }, stepDuration / 50);
  };

  const reset = () => {
    setState("idle");
    setProgress(0);
    setStep(0);
  };
  return { state, progress, step, run, reset };
}

interface ToolCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  children: React.ReactNode;
  ocid: string;
}

function ToolCard({ icon: Icon, title, desc, children, ocid }: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${BORDER}` }}
      data-ocid={ocid}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-white/5 transition-all"
        style={{ background: "rgba(255,255,255,0.02)" }}
        data-ocid={`${ocid}.expand_button`}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${ACCENT}20` }}
        >
          <Icon className="w-4 h-4" style={{ color: ACCENT }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white">{title}</p>
          <p className="text-[10px]" style={{ color: MUTED }}>
            {desc}
          </p>
        </div>
        {expanded ? (
          <ChevronUp
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: MUTED }}
          />
        ) : (
          <ChevronDown
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: MUTED }}
          />
        )}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
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

function ProgressBar({
  progress,
  steps,
  currentStep,
}: { progress: number; steps: string[]; currentStep: number }) {
  return (
    <div className="mb-3">
      <div
        className="flex justify-between text-[10px] mb-1.5"
        style={{ color: MUTED }}
      >
        <span>{steps[currentStep] ?? steps[steps.length - 1]}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, ${GREEN})`,
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

function SuccessBadge({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-2 p-2.5 rounded-xl mb-3"
      style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}40` }}
    >
      <span className="text-sm">✅</span>
      <span className="text-xs font-semibold" style={{ color: GREEN }}>
        {text}
      </span>
    </motion.div>
  );
}

export function AIToolsPanel() {
  // Tool 1 — Auto Captions
  const captions = useSimulator(4000);
  const captionSteps = [
    "Analyzing audio...",
    "Transcribing speech...",
    "Syncing timestamps...",
    "Formatting...",
  ];

  // Tool 2 — Background Removal
  const bgRemoval = useSimulator(3000);
  const bgSteps = [
    "Detecting subject...",
    "Segmenting background...",
    "Refining edges...",
  ];

  // Tool 3 — Script to Video
  const s2v = useSimulator(5000);
  const s2vSteps = [
    "Understanding script...",
    "Selecting clips...",
    "Building timeline...",
    "Adding music...",
    "Finalizing...",
  ];
  const [scriptText, setScriptText] = useState("");

  // Tool 4 — Upscaler
  const upscaler = useSimulator(4000);
  const upscaleSteps = [
    "Analyzing pixels...",
    "Enhancing details...",
    "Upscaling to 4K...",
    "Quality pass...",
  ];
  const [inputRes, setInputRes] = useState("720p");

  // Tool 5 — Retouch
  const retouch = useSimulator(2000);
  const retouchSteps = ["Detecting face...", "Applying enhancements..."];
  const [skin, setSkin] = useState(60);
  const [teeth, setTeeth] = useState(40);
  const [face, setFace] = useState(50);

  // Tool 6 — Auto Reframe
  const reframe = useSimulator(3000);
  const reframeSteps = [
    "Detecting subject...",
    "Tracking motion...",
    "Calculating crop...",
  ];
  const [selectedRatio, setSelectedRatio] = useState("9:16");

  // Tool 7 — Hook Generator
  const hookGen = useSimulator(3000);
  const hookSteps = [
    "Analyzing topic...",
    "Generating hooks...",
    "Ranking by virality...",
  ];
  const [hookTopic, setHookTopic] = useState("");
  const [hookPlatform, setHookPlatform] = useState("TikTok");

  return (
    <div
      className="flex flex-col gap-2.5 p-3 overflow-y-auto h-full"
      data-ocid="ai_tools_panel"
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
        <p className="text-xs font-bold text-white">AI Tools</p>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded-full text-white font-semibold"
          style={{ background: `${ACCENT}80` }}
        >
          7 Tools
        </span>
      </div>

      {/* 1. Auto Captions */}
      <ToolCard
        icon={Scissors}
        title="Auto Captions"
        desc="AI speech-to-text subtitles"
        ocid="ai.captions"
      >
        {captions.state === "loading" && (
          <ProgressBar
            progress={captions.progress}
            steps={captionSteps}
            currentStep={captions.step}
          />
        )}
        {captions.state === "done" && (
          <>
            <SuccessBadge text="Captions generated — 97% accuracy" />
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {CAPTION_SAMPLES.map((cap, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable sample captions
                  key={i}
                  className="flex gap-2 p-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <span
                    className="text-[9px] font-mono flex-shrink-0 mt-0.5"
                    style={{ color: MUTED }}
                  >
                    {cap.ts}
                  </span>
                  <input
                    defaultValue={cap.text}
                    className="flex-1 text-[10px] text-white bg-transparent outline-none border-b border-transparent focus:border-blue-500"
                    data-ocid={`ai.captions.item.${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <button
          type="button"
          onClick={() =>
            captions.state === "done"
              ? captions.reset()
              : captions.run(captionSteps)
          }
          disabled={captions.state === "loading"}
          className="w-full py-2 rounded-lg text-xs font-semibold text-white mt-2"
          style={{
            background:
              captions.state === "done" ? "rgba(255,255,255,0.08)" : ACCENT,
          }}
          data-ocid="ai.captions.generate_button"
        >
          {captions.state === "loading"
            ? "Processing..."
            : captions.state === "done"
              ? "Regenerate"
              : "Generate Captions"}
        </button>
      </ToolCard>

      {/* 2. Background Removal */}
      <ToolCard
        icon={Wand2}
        title="Background Removal"
        desc="One-click AI subject cutout"
        ocid="ai.bg_removal"
      >
        {bgRemoval.state === "idle" && (
          <div
            className="p-4 rounded-xl border-2 border-dashed text-center cursor-pointer mb-3 hover:border-blue-500/60 transition-all"
            style={{ borderColor: BORDER }}
          >
            <p className="text-[10px]" style={{ color: MUTED }}>
              Drop image/clip or use current clip
            </p>
          </div>
        )}
        {bgRemoval.state === "loading" && (
          <div
            className="relative rounded-xl overflow-hidden h-24 mb-3 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1e3a5f, #0f2a4a)" }}
          >
            <motion.div
              className="absolute w-24 h-24 rounded-full border-2 opacity-60"
              style={{ borderColor: ACCENT }}
              animate={{ scale: [0.5, 1.5], opacity: [0.6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full border-2 opacity-60"
              style={{ borderColor: GREEN }}
              animate={{ scale: [0.5, 1.5], opacity: [0.6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
            <p className="text-xs text-white relative z-10">Analyzing...</p>
          </div>
        )}
        {bgRemoval.state === "done" && (
          <>
            <SuccessBadge text="Subject isolated successfully" />
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f, #0f2a4a)",
                }}
              >
                <p
                  className="text-[8px] text-center py-1"
                  style={{ color: MUTED }}
                >
                  Original
                </p>
                <div className="h-16 flex items-center justify-center">
                  <div
                    className="w-8 h-12 rounded"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                </div>
              </div>
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  background:
                    "repeating-conic-gradient(#333 0% 25%, #1a1a1a 0% 50%) 0 0 / 10px 10px",
                }}
              >
                <p
                  className="text-[8px] text-center py-1"
                  style={{ color: MUTED }}
                >
                  Cutout
                </p>
                <div className="h-16 flex items-center justify-center">
                  <div
                    className="w-8 h-12 rounded"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <button
          type="button"
          onClick={() =>
            bgRemoval.state === "done"
              ? bgRemoval.reset()
              : bgRemoval.run(bgSteps)
          }
          disabled={bgRemoval.state === "loading"}
          className="w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{
            background:
              bgRemoval.state === "done" ? "rgba(255,255,255,0.08)" : ACCENT,
          }}
          data-ocid="ai.bg_removal.enhance_button"
        >
          {bgRemoval.state === "loading"
            ? "Removing background..."
            : bgRemoval.state === "done"
              ? "Remove Again"
              : "Remove Background"}
        </button>
      </ToolCard>

      {/* 3. Script to Video */}
      <ToolCard
        icon={Video}
        title="AI Script to Video"
        desc="Generate timeline from text"
        ocid="ai.script_to_video"
      >
        <textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          placeholder="Describe your video or paste a script..."
          className="w-full h-20 px-3 py-2 rounded-lg text-xs text-white placeholder-white/30 outline-none resize-none mb-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${BORDER}`,
          }}
          data-ocid="ai.script_to_video.textarea"
        />
        {s2v.state === "loading" && (
          <ProgressBar
            progress={s2v.progress}
            steps={s2vSteps}
            currentStep={s2v.step}
          />
        )}
        {s2v.state === "done" && (
          <>
            <SuccessBadge text="Timeline generated! Click to apply." />
            <div
              className="flex gap-1 mb-3 overflow-hidden rounded-lg"
              style={{ height: 32 }}
            >
              {SCRIPT_COLORS.map((color, i) => (
                <motion.div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable color segments
                  key={i}
                  className="flex-1 rounded"
                  style={{ background: color }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.08 }}
                />
              ))}
            </div>
            <p className="text-[10px] mb-2" style={{ color: MUTED }}>
              6 clips · 45s estimated duration
            </p>
          </>
        )}
        <button
          type="button"
          onClick={() =>
            s2v.state === "done" ? s2v.reset() : s2v.run(s2vSteps)
          }
          disabled={
            s2v.state === "loading" ||
            (!scriptText.trim() && s2v.state === "idle")
          }
          className="w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{
            background: s2v.state === "done" ? GREEN : ACCENT,
            opacity: !scriptText.trim() && s2v.state === "idle" ? 0.5 : 1,
          }}
          data-ocid="ai.script_to_video.generate_button"
        >
          {s2v.state === "loading"
            ? "Generating..."
            : s2v.state === "done"
              ? "Apply to Timeline"
              : "Generate from Script"}
        </button>
      </ToolCard>

      {/* 4. AI Upscaler */}
      <ToolCard
        icon={ArrowUpCircle}
        title="AI Upscaler"
        desc="Enhance video to 4K"
        ocid="ai.upscaler"
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-1 p-2.5 rounded-xl text-center"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${BORDER}`,
            }}
          >
            <select
              value={inputRes}
              onChange={(e) => setInputRes(e.target.value)}
              className="bg-transparent text-xs text-white outline-none text-center w-full"
              data-ocid="ai.upscaler.input_res_select"
            >
              {["360p", "480p", "720p", "1080p"].map((r) => (
                <option key={r} value={r} style={{ background: "#0f172a" }}>
                  {r}
                </option>
              ))}
            </select>
            <p className="text-[9px] mt-1" style={{ color: MUTED }}>
              Input
            </p>
          </div>
          <div className="text-white text-sm">→</div>
          <div
            className="flex-1 p-2.5 rounded-xl text-center"
            style={{
              background: `${ACCENT}20`,
              border: `1px solid ${ACCENT}50`,
            }}
          >
            <p className="text-xs font-bold" style={{ color: ACCENT }}>
              4K
            </p>
            <p className="text-[9px] mt-1" style={{ color: MUTED }}>
              Output
            </p>
          </div>
        </div>
        {upscaler.state === "loading" && (
          <ProgressBar
            progress={upscaler.progress}
            steps={upscaleSteps}
            currentStep={upscaler.step}
          />
        )}
        {upscaler.state === "done" && (
          <SuccessBadge text="Enhanced to 4K — ready to export" />
        )}
        <button
          type="button"
          onClick={() =>
            upscaler.state === "done"
              ? upscaler.reset()
              : upscaler.run(upscaleSteps)
          }
          disabled={upscaler.state === "loading"}
          className="w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{
            background:
              upscaler.state === "done" ? "rgba(255,255,255,0.08)" : ACCENT,
          }}
          data-ocid="ai.upscaler.enhance_button"
        >
          {upscaler.state === "loading"
            ? "Enhancing..."
            : upscaler.state === "done"
              ? "Enhanced ✓"
              : "Enhance to 4K"}
        </button>
      </ToolCard>

      {/* 5. AI Retouch */}
      <ToolCard
        icon={Sparkles}
        title="AI Retouch"
        desc="Beauty enhancement tools"
        ocid="ai.retouch"
      >
        <div className="flex flex-col gap-3 mb-3">
          {[
            {
              label: "💆 Skin Smoothing",
              value: skin,
              set: setSkin,
              ocid: "ai.retouch.skin_slider",
            },
            {
              label: "🦷 Teeth Whitening",
              value: teeth,
              set: setTeeth,
              ocid: "ai.retouch.teeth_slider",
            },
            {
              label: "✨ Face Retouch",
              value: face,
              set: setFace,
              ocid: "ai.retouch.face_slider",
            },
          ].map(({ label, value, set, ocid }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-white">{label}</span>
                <span style={{ color: MUTED }}>{value}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: ACCENT }}
                data-ocid={ocid}
              />
            </div>
          ))}
        </div>
        {retouch.state === "loading" && (
          <ProgressBar
            progress={retouch.progress}
            steps={retouchSteps}
            currentStep={retouch.step}
          />
        )}
        {retouch.state === "done" && <SuccessBadge text="Retouch applied!" />}
        <button
          type="button"
          onClick={() =>
            retouch.state === "done"
              ? retouch.reset()
              : retouch.run(retouchSteps)
          }
          disabled={retouch.state === "loading"}
          className="w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{
            background:
              retouch.state === "done" ? "rgba(255,255,255,0.08)" : ACCENT,
          }}
          data-ocid="ai.retouch.apply_button"
        >
          {retouch.state === "loading"
            ? "Applying..."
            : retouch.state === "done"
              ? "Reapply"
              : "Apply Retouch"}
        </button>
      </ToolCard>

      {/* 6. Auto Reframe */}
      <ToolCard
        icon={Focus}
        title="Auto Reframe"
        desc="AI subject tracking & crop"
        ocid="ai.reframe"
      >
        <div className="flex gap-2 mb-3">
          {REFRAME_RATIOS.map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => setSelectedRatio(ratio)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background:
                  selectedRatio === ratio ? ACCENT : "rgba(255,255,255,0.06)",
                color: selectedRatio === ratio ? "white" : MUTED,
                border: `1px solid ${selectedRatio === ratio ? ACCENT : BORDER}`,
              }}
              data-ocid={`ai.reframe.ratio.${ratio.replace(":", "x")}`}
            >
              {ratio}
            </button>
          ))}
        </div>
        {reframe.state === "loading" && (
          <>
            <ProgressBar
              progress={reframe.progress}
              steps={reframeSteps}
              currentStep={reframe.step}
            />
            <div
              className="relative h-20 rounded-xl overflow-hidden mb-3"
              style={{
                background: "linear-gradient(135deg, #1e3a5f, #0f2a4a)",
              }}
            >
              <motion.div
                className="absolute border-2 rounded"
                style={{ borderColor: GREEN, width: "50%", height: "70%" }}
                animate={{
                  x: ["10%", "40%", "20%", "35%"],
                  y: ["5%", "15%", "10%", "5%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </>
        )}
        {reframe.state === "done" && (
          <SuccessBadge text="Subject tracked and reframed!" />
        )}
        <button
          type="button"
          onClick={() =>
            reframe.state === "done"
              ? reframe.reset()
              : reframe.run(reframeSteps)
          }
          disabled={reframe.state === "loading"}
          className="w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{
            background:
              reframe.state === "done" ? "rgba(255,255,255,0.08)" : ACCENT,
          }}
          data-ocid="ai.reframe.reframe_button"
        >
          {reframe.state === "loading"
            ? "Reframing..."
            : reframe.state === "done"
              ? "Reframe Again"
              : "Auto Reframe"}
        </button>
      </ToolCard>

      {/* 7. Hook Generator */}
      <ToolCard
        icon={Zap}
        title="AI Hook Generator"
        desc="Viral opening caption ideas"
        ocid="ai.hook_generator"
      >
        <input
          type="text"
          value={hookTopic}
          onChange={(e) => setHookTopic(e.target.value)}
          placeholder="What's your video about?"
          className="w-full px-3 py-2 rounded-lg text-xs text-white placeholder-white/30 outline-none mb-2"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${BORDER}`,
          }}
          data-ocid="ai.hook_generator.topic_input"
        />
        <div className="flex gap-1.5 flex-wrap mb-3">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setHookPlatform(p)}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium transition-all"
              style={{
                background:
                  hookPlatform === p ? ACCENT : "rgba(255,255,255,0.06)",
                color: hookPlatform === p ? "white" : MUTED,
              }}
              data-ocid={`ai.hook_generator.platform.${p.toLowerCase()}`}
            >
              {p}
            </button>
          ))}
        </div>
        {hookGen.state === "loading" && (
          <div className="flex items-center justify-center py-4 mb-3">
            <motion.div
              className="w-6 h-6 rounded-full border-2"
              style={{ borderColor: ACCENT, borderTopColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <span className="text-xs ml-2" style={{ color: MUTED }}>
              Generating hooks...
            </span>
          </div>
        )}
        {hookGen.state === "done" && (
          <div className="flex flex-col gap-2 mb-3">
            {HOOK_SUGGESTIONS.map((hook, i) => (
              <motion.button
                // biome-ignore lint/suspicious/noArrayIndexKey: stable hook suggestions
                key={i}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 p-2.5 rounded-xl text-left"
                style={{
                  background: `${ACCENT}12`,
                  border: `1px solid ${BORDER}`,
                }}
                data-ocid={`ai.hook_generator.suggestion.${i + 1}`}
              >
                <span
                  className="text-[9px] font-bold w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: i === 0 ? GREEN : ACCENT,
                    color: "white",
                  }}
                >
                  {hook.grade}
                </span>
                <span className="text-[10px] text-white leading-snug">
                  {hook.text}
                </span>
              </motion.button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() =>
            hookGen.state === "done" ? hookGen.reset() : hookGen.run(hookSteps)
          }
          disabled={
            hookGen.state === "loading" ||
            (!hookTopic.trim() && hookGen.state === "idle")
          }
          className="w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{
            background:
              hookGen.state === "done" ? "rgba(255,255,255,0.08)" : ACCENT,
            opacity: !hookTopic.trim() && hookGen.state === "idle" ? 0.5 : 1,
          }}
          data-ocid="ai.hook_generator.generate_button"
        >
          {hookGen.state === "loading"
            ? "Generating..."
            : hookGen.state === "done"
              ? "Generate More"
              : "Generate Hooks"}
        </button>
      </ToolCard>
    </div>
  );
}
