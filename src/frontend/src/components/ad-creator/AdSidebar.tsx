import { useAdCreatorStore } from "@/store/adCreatorStore";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Hexagon,
  Image,
  Layers,
  LayoutTemplate,
  Music,
  Palette,
  Sparkles,
  Type,
  Upload,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentType } from "react";
import { AiToolsTab } from "./sidebar/AiToolsTab";
import { AppsTab } from "./sidebar/AppsTab";
import { AudioTab } from "./sidebar/AudioTab";
import { BrandHubTab } from "./sidebar/BrandHubTab";
import { ElementsTab } from "./sidebar/ElementsTab";
import { ImagesTab } from "./sidebar/ImagesTab";
import { LayersTab } from "./sidebar/LayersTab";
import { TemplatesTab } from "./sidebar/TemplatesTab";
import { TextTab } from "./sidebar/TextTab";
import { UploadsTab } from "./sidebar/UploadsTab";
import { VideosTab } from "./sidebar/VideosTab";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdSidebarProps {
  onOpenMagicDesign: () => void;
  onOpenAiCopywriter: () => void;
  onOpenAiImageGen: () => void;
  onOpenMagicResize: () => void;
  onOpenAutoLayout: () => void;
}

interface TabDef {
  id: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}

const TABS: TabDef[] = [
  { id: "templates", label: "Templates", Icon: LayoutTemplate },
  { id: "text", label: "Text", Icon: Type },
  { id: "elements", label: "Elements", Icon: Hexagon },
  { id: "uploads", label: "Uploads", Icon: Upload },
  { id: "images", label: "Images", Icon: Image },
  { id: "videos", label: "Videos", Icon: Video },
  { id: "audio", label: "Audio", Icon: Music },
  { id: "brand", label: "Brand Hub", Icon: Palette },
  { id: "ai", label: "AI Tools", Icon: Sparkles },
  { id: "apps", label: "Apps", Icon: Grid3X3 },
  { id: "layers", label: "Layers", Icon: Layers },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function AdSidebar({
  onOpenMagicDesign,
  onOpenAiCopywriter,
  onOpenAiImageGen,
  onOpenMagicResize,
  onOpenAutoLayout,
}: AdSidebarProps) {
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebar } =
    useAdCreatorStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 60 : 280 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="relative flex h-full shrink-0 overflow-hidden"
      style={{
        background: "rgba(17,24,39,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
      data-ocid="ad-sidebar"
    >
      {/* Icon Rail */}
      <div className="w-[60px] shrink-0 flex flex-col h-full border-r border-white/5">
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none py-2 gap-0.5">
          {TABS.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-label={tab.label}
                data-ocid={`sidebar.tab.${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (sidebarCollapsed) toggleSidebar();
                }}
                className="relative flex flex-col items-center justify-center gap-0.5 h-14 w-full transition-all group"
              >
                {/* Active glow ring */}
                {isActive && (
                  <motion.div
                    layoutId="tab-active-ring"
                    className="absolute inset-x-2 inset-y-1 rounded-xl"
                    style={{
                      background: "rgba(37,99,235,0.18)",
                      boxShadow: "0 0 12px rgba(37,99,235,0.35)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon
                  className={`relative w-[18px] h-[18px] transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span
                  className={`relative text-[8px] leading-none font-medium transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {tab.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Collapse toggle */}
        <button
          type="button"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-ocid="sidebar.collapse_button"
          onClick={toggleSidebar}
          className="h-10 w-full flex items-center justify-center border-t border-white/5 hover:bg-white/5 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Content Panel */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col flex-1 overflow-hidden"
            style={{ width: 220 }}
          >
            {/* Tab header */}
            <div className="px-4 pt-4 pb-3 border-b border-white/5">
              <h3 className="text-xs font-semibold text-foreground">
                {TABS.find((t) => t.id === activeTab)?.label ?? ""}
              </h3>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-hidden px-3 pt-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="h-full"
                >
                  {activeTab === "templates" && <TemplatesTab />}
                  {activeTab === "text" && <TextTab />}
                  {activeTab === "elements" && <ElementsTab />}
                  {activeTab === "uploads" && <UploadsTab />}
                  {activeTab === "images" && <ImagesTab />}
                  {activeTab === "videos" && <VideosTab />}
                  {activeTab === "audio" && <AudioTab />}
                  {activeTab === "brand" && <BrandHubTab />}
                  {activeTab === "ai" && (
                    <AiToolsTab
                      onOpenMagicDesign={onOpenMagicDesign}
                      onOpenAiCopywriter={onOpenAiCopywriter}
                      onOpenAiImageGen={onOpenAiImageGen}
                      onOpenMagicResize={onOpenMagicResize}
                      onOpenAutoLayout={onOpenAutoLayout}
                    />
                  )}
                  {activeTab === "apps" && <AppsTab />}
                  {activeTab === "layers" && <LayersTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
