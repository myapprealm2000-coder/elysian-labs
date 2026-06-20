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
import { useState } from "react";

interface SectionConfig {
  id: SidebarSection;
  label: string;
  shortcut: string;
  Icon: React.ElementType;
}

const SECTIONS: SectionConfig[] = [
  { id: SidebarSection.Media, label: "Media", shortcut: "M", Icon: Film },
  { id: SidebarSection.Audio, label: "Audio", shortcut: "A", Icon: Music },
  { id: SidebarSection.Text, label: "Text", shortcut: "T", Icon: Type },
  {
    id: SidebarSection.Effects,
    label: "Effects",
    shortcut: "E",
    Icon: Sparkles,
  },
  {
    id: SidebarSection.Transitions,
    label: "Transitions",
    shortcut: "X",
    Icon: Layers,
  },
  {
    id: SidebarSection.Stickers,
    label: "Stickers",
    shortcut: "S",
    Icon: Smile,
  },
  {
    id: SidebarSection.Filters,
    label: "Filters",
    shortcut: "F",
    Icon: Sliders,
  },
  { id: SidebarSection.AITools, label: "AI Tools", shortcut: "I", Icon: Wand2 },
  {
    id: SidebarSection.Captions,
    label: "Captions",
    shortcut: "C",
    Icon: Captions,
  },
  {
    id: SidebarSection.Templates,
    label: "Templates",
    shortcut: "P",
    Icon: LayoutTemplate,
  },
  {
    id: SidebarSection.BrandKit,
    label: "Brand Kit",
    shortcut: "B",
    Icon: Star,
  },
  {
    id: SidebarSection.Settings,
    label: "Settings",
    shortcut: ",",
    Icon: Settings,
  },
];

export function EditorLeftSidebar() {
  const { activeSidebarSection, setActiveSidebarSection } =
    useVideoEditorStore();
  const [hoveredId, setHoveredId] = useState<SidebarSection | null>(null);

  return (
    <aside
      className="flex flex-col items-center flex-shrink-0 py-2 gap-0.5 font-['Inter',sans-serif]"
      style={{
        width: 56,
        background: "#0F172A",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
      data-ocid="editor-left-sidebar"
    >
      {SECTIONS.map(({ id, label, shortcut, Icon }) => {
        const isActive = activeSidebarSection === id;
        const isHovered = hoveredId === id;

        return (
          <div key={id} className="relative w-full flex justify-center">
            <motion.button
              type="button"
              onClick={() => setActiveSidebarSection(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-11 h-11 flex items-center justify-center rounded-xl transition-all relative"
              style={{
                background: isActive
                  ? "rgba(37,99,235,0.18)"
                  : isHovered
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                border: isActive
                  ? "1px solid rgba(37,99,235,0.45)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 0 14px rgba(37,99,235,0.3)" : "none",
                color: isActive
                  ? "#2563EB"
                  : isHovered
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.35)",
              }}
              data-ocid={`editor-sidebar-${id}`}
            >
              <Icon className="w-5 h-5" />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 pointer-events-none"
                >
                  <div
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg whitespace-nowrap"
                    style={{
                      background: "rgba(15,23,42,0.98)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    <span className="text-[12px] font-medium text-white">
                      {label}
                    </span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {shortcut}
                    </span>
                  </div>
                  {/* Arrow */}
                  <div
                    className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent"
                    style={{ borderRightColor: "rgba(15,23,42,0.98)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </aside>
  );
}
