import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpCircle,
  Film,
  ImageIcon,
  Mic,
  Scissors,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const AI_TOOLS = [
  {
    id: "captions",
    name: "AI Captions",
    description:
      "Auto-generate subtitles from any video with pinpoint timing and multiple language support.",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "thumbnail",
    name: "AI Thumbnail Generator",
    description:
      "Create click-worthy thumbnails instantly — just describe your idea and watch it come to life.",
    icon: ImageIcon,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "hook",
    name: "AI Hook Generator",
    description:
      "Generate viral opening hooks for your content that stop scrollers and boost watch time.",
    icon: TrendingUp,
    gradient: "from-pink-500 to-red-500",
  },
  {
    id: "bg-removal",
    name: "AI Background Removal",
    description:
      "Remove backgrounds with one click — no green screen, no manual masking required.",
    icon: Scissors,
    gradient: "from-green-500 to-emerald-400",
  },
  {
    id: "voiceover",
    name: "AI Voiceover",
    description:
      "Add professional AI narration to your videos in multiple voices, languages, and styles.",
    icon: Mic,
    gradient: "from-violet-500 to-purple-400",
  },
  {
    id: "script",
    name: "AI Script to Video",
    description:
      "Turn scripts into full video timelines — auto-select clips, captions, and music to match.",
    icon: Film,
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    id: "upscaling",
    name: "AI Upscaling",
    description:
      "Enhance video quality up to 4K using AI-powered detail reconstruction and noise reduction.",
    icon: ArrowUpCircle,
    gradient: "from-teal-500 to-cyan-400",
  },
];

function handleTryTool(name: string) {
  toast.info(`${name} — coming soon!`, {
    description:
      "This feature will be integrated directly into the Video Editor and Thumbnail Studio.",
    duration: 4000,
  });
}

export function AiToolsPage() {
  return (
    <div className="min-h-screen bg-background" data-ocid="ai_tools.page">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect mb-5 text-xs font-medium text-muted-foreground">
            <Zap size={12} className="text-primary" />
            Powered by Elysian AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            AI Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Supercharge your creative workflow with AI — from auto-captions to
            full video generation.
          </p>
        </motion.div>

        {/* Tool grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16"
          data-ocid="ai_tools.list"
        >
          {AI_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-panel rounded-xl p-5 border border-border hover:border-primary/40 group transition-smooth"
              data-ocid={`ai_tools.item.${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} shrink-0 shadow-glass-sm`}
                >
                  <tool.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {tool.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => handleTryTool(tool.name)}
                    data-ocid={`ai_tools.try_button.${i + 1}`}
                  >
                    Try It
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl glass-panel border border-primary/20 p-8 text-center"
          data-ocid="ai_tools.cta_section"
        >
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Access AI tools inside the editors
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            All AI features are being built directly into the Video Editor and
            Thumbnail Studio — no separate app needed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/video-editor">
              <Button
                className="gap-2 bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30"
                data-ocid="ai_tools.video_editor_button"
              >
                Open Video Editor
                <ArrowRight size={15} />
              </Button>
            </Link>
            <Link to="/thumbnail-studio">
              <Button
                variant="outline"
                className="gap-2 border-accent/40 text-accent hover:bg-accent/10"
                data-ocid="ai_tools.thumbnail_studio_button"
              >
                Open Thumbnail Studio
                <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AiToolsPage;
