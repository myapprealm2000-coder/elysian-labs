import { useVideoEditorStore } from "@/store/videoEditorStore";
import { Check, ChevronRight, Loader2, Wand2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const AI_TOOLS = [
  {
    id: "captions",
    name: "Auto Captions",
    description: "Speech-to-text, 12+ languages",
    duration: 4000,
    color: "#2563EB",
  },
  {
    id: "background-removal",
    name: "Background Removal",
    description: "One-click AI cutout",
    duration: 3000,
    color: "#22C55E",
  },
  {
    id: "upscale",
    name: "AI Upscaler",
    description: "Enhance up to 4K quality",
    duration: 4000,
    color: "#a855f7",
  },
  {
    id: "hook-generator",
    name: "Hook Generator",
    description: "Viral opening captions",
    duration: 3000,
    color: "#f59e0b",
  },
  {
    id: "retouch",
    name: "AI Retouch",
    description: "Skin & face enhancement",
    duration: 3500,
    color: "#ec4899",
  },
  {
    id: "auto-reframe",
    name: "Auto Reframe",
    description: "Keep subject centered",
    duration: 2500,
    color: "#06b6d4",
  },
];

export function AIToolsPanelSection() {
  const { aiToolStates, startAITool, resetAITool } = useVideoEditorStore();

  return (
    <div className="p-4 flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">
        AI-Powered Tools
      </p>

      {AI_TOOLS.map((tool) => {
        const toolState = aiToolStates[tool.id];
        const isLoading = toolState?.loading ?? false;
        const isDone = toolState?.done ?? false;
        const status = isLoading ? "loading" : isDone ? "success" : "idle";
        // status will be 'idle' | 'loading' | 'success'
        const isError = false;
        const progress = toolState?.progress ?? 0;
        const result = toolState?.result;

        return (
          <div
            key={tool.id}
            className="rounded-xl p-3 transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${
                status === "success"
                  ? `${tool.color}40`
                  : status === "loading"
                    ? `${tool.color}25`
                    : "rgba(255,255,255,0.06)"
              }`,
            }}
          >
            <div className="flex items-start gap-2.5">
              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                style={{
                  background: `${tool.color}18`,
                  color: tool.color,
                }}
              >
                {status === "loading" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 0.9,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-4 h-4" />
                  </motion.div>
                ) : status === "success" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-white/85">
                  {tool.name}
                </p>
                <p className="text-[10px] text-white/35 mt-0.5">
                  {tool.description}
                </p>

                {/* Progress bar */}
                {/* Progress bar */}
                {status === "loading" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2"
                  >
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: tool.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                    <p
                      className="text-[10px] mt-1"
                      style={{ color: tool.color }}
                    >
                      Processing… {Math.round(progress)}%
                    </p>
                  </motion.div>
                )}

                {/* Success result */}
                {status === "success" && !!result && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-2 rounded-lg"
                    style={{
                      background: `${tool.color}10`,
                      border: `1px solid ${tool.color}25`,
                    }}
                  >
                    <p
                      className="text-[10px] font-medium"
                      style={{ color: tool.color }}
                    >
                      Done!
                    </p>
                    <p className="text-[9px] text-white/50 mt-0.5">{result}</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-2.5">
              {status === "idle" || isError ? (
                <button
                  type="button"
                  onClick={() => startAITool(tool.id, tool.duration)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-all"
                  style={{
                    background: `${tool.color}20`,
                    border: `1px solid ${tool.color}35`,
                    color: tool.color,
                  }}
                  data-ocid={`editor-ai-tool-${tool.id}`}
                >
                  <Wand2 className="w-3 h-3" />
                  Run
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : status === "success" ? (
                <button
                  type="button"
                  onClick={() => resetAITool(tool.id)}
                  className="flex-1 py-1.5 rounded-lg text-[10px] font-medium text-white/30 hover:text-white/60 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Reset
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
