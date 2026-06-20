import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useVideoEditorStore } from "@/store/videoEditorStore";
import { SidebarSection } from "@/types/videoEditor";
import {
  Captions,
  Film,
  Layers,
  LayoutTemplate,
  Music,
  Settings,
  Sliders,
  Smile,
  Sparkles,
  Star,
  Type,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { AIToolsPanelSection } from "./panels/AIToolsPanelSection";
import { AudioPanelSection } from "./panels/AudioPanelSection";
import { CaptionsPanel } from "./panels/CaptionsPanel";
import { ColorGradingSection } from "./panels/ColorGradingSection";
import { EffectsPanelSection } from "./panels/EffectsPanelSection";
import { GenericPanelSection } from "./panels/GenericPanelSection";
import { LayersPanelSection } from "./panels/LayersPanelSection";
import { MediaPanelSection } from "./panels/MediaPanelSection";
import TextPanelSection from "./panels/TextPanelSection";
import { TransitionsPanel } from "./panels/TransitionsPanel";
import { VideoControlsPanel } from "./panels/VideoControlsPanel";

const SECTION_ICONS: Record<SidebarSection, React.ElementType> = {
  [SidebarSection.Media]: Film,
  [SidebarSection.Audio]: Music,
  [SidebarSection.Text]: Type,
  [SidebarSection.Effects]: Sparkles,
  [SidebarSection.Transitions]: Layers,
  [SidebarSection.Stickers]: Smile,
  [SidebarSection.Filters]: Sliders,
  [SidebarSection.AITools]: Wand2,
  [SidebarSection.Captions]: Captions,
  [SidebarSection.Templates]: LayoutTemplate,
  [SidebarSection.BrandKit]: Star,
  [SidebarSection.Settings]: Layers,
};

const SECTION_LABELS: Record<SidebarSection, string> = {
  [SidebarSection.Media]: "Media",
  [SidebarSection.Audio]: "Audio",
  [SidebarSection.Text]: "Text",
  [SidebarSection.Effects]: "Effects",
  [SidebarSection.Transitions]: "Transitions",
  [SidebarSection.Stickers]: "Stickers",
  [SidebarSection.Filters]: "Color Grading",
  [SidebarSection.AITools]: "AI Tools",
  [SidebarSection.Captions]: "Captions",
  [SidebarSection.Templates]: "Templates",
  [SidebarSection.BrandKit]: "Brand Kit",
  [SidebarSection.Settings]: "Layers",
};

export function EditorRightPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const editor = useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();
  const { activeSidebarSection } = useVideoEditorStore();
  const Icon = SECTION_ICONS[activeSidebarSection];
  const label = SECTION_LABELS[activeSidebarSection];

  function renderContent() {
    switch (activeSidebarSection) {
      case SidebarSection.Media:
        return (
          <MediaPanelSection
            videoSrc={Object.values(store.videoClips)[0]?.src ?? null}
            onLoadFile={editor.addVideoFromFile}
          />
        );
      case SidebarSection.Audio:
        return <AudioPanelSection />;
      case SidebarSection.Text:
        return <TextPanelSection />;
      case SidebarSection.Effects:
        return <VideoControlsPanel />;
      case SidebarSection.Stickers:
        return <EffectsPanelSection section={activeSidebarSection} />;
      case SidebarSection.Transitions:
        return <TransitionsPanel />;
      case SidebarSection.Filters:
        return <ColorGradingSection />;
      case SidebarSection.AITools:
        return <AIToolsPanelSection />;
      case SidebarSection.Captions:
        return <CaptionsPanel />;
      case SidebarSection.Settings:
        return <LayersPanelSection />;
      default:
        return (
          <GenericPanelSection section={activeSidebarSection} label={label} />
        );
    }
  }

  return (
    <aside
      className="flex flex-col flex-shrink-0 border-l font-['Inter',sans-serif]"
      style={{
        width: 300,
        background: "#0F172A",
        borderColor: "rgba(255,255,255,0.05)",
      }}
      data-ocid="editor-right-panel"
    >
      {/* Panel header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 border-b flex-shrink-0"
        style={{
          borderColor: "rgba(255,255,255,0.05)",
          background: "rgba(7,11,20,0.4)",
        }}
      >
        <div
          className="w-6 h-6 flex items-center justify-center rounded-md"
          style={{
            background: "rgba(37,99,235,0.15)",
            color: "#2563EB",
          }}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-[12px] font-semibold text-white/80">{label}</span>
      </div>

      {/* Sliding content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSidebarSection}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
}
