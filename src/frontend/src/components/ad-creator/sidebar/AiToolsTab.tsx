import {
  AlignCenter,
  ArrowRight,
  ImagePlay,
  Maximize2,
  MessageSquare,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";

interface AiToolsTabProps {
  onOpenMagicDesign: () => void;
  onOpenAiCopywriter: () => void;
  onOpenAiImageGen: () => void;
  onOpenMagicResize: () => void;
  onOpenAutoLayout: () => void;
}

const TOOLS = [
  {
    key: "magic-design" as const,
    icon: Wand2,
    label: "Magic Design",
    desc: "Generate complete ad layouts from a prompt",
    color: "#2563EB",
    bg: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
  },
  {
    key: "copywriter" as const,
    icon: MessageSquare,
    label: "AI Copywriter",
    desc: "Generate headlines, CTAs, and ad copy",
    color: "#22C55E",
    bg: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    key: "image-gen" as const,
    icon: ImagePlay,
    label: "AI Image Gen",
    desc: "Create visuals from text prompts",
    color: "#a78bfa",
    bg: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/30",
  },
  {
    key: "magic-resize" as const,
    icon: Maximize2,
    label: "Magic Resize",
    desc: "Convert to any format instantly",
    color: "#f97316",
    bg: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30",
  },
  {
    key: "auto-layout" as const,
    icon: AlignCenter,
    label: "Auto Layout",
    desc: "AI-powered spacing and alignment",
    color: "#06b6d4",
    bg: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30",
  },
] as const;

export function AiToolsTab(props: AiToolsTabProps) {
  const handlers: Record<(typeof TOOLS)[number]["key"], () => void> = {
    "magic-design": props.onOpenMagicDesign,
    copywriter: props.onOpenAiCopywriter,
    "image-gen": props.onOpenAiImageGen,
    "magic-resize": props.onOpenMagicResize,
    "auto-layout": props.onOpenAutoLayout,
  };

  return (
    <div className="flex flex-col gap-2.5 overflow-y-auto h-full pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {TOOLS.map((tool, i) => {
        const Icon = tool.icon;
        return (
          <motion.button
            key={tool.key}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlers[tool.key]}
            data-ocid={`ai-tool.${tool.key}`}
            className={`w-full text-left p-3 rounded-xl bg-gradient-to-br ${tool.bg} border ${tool.border} hover:shadow-lg transition-all group`}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `${tool.color}20`,
                  border: `1px solid ${tool.color}40`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: tool.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground group-hover:text-white transition-colors">
                  {tool.label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
