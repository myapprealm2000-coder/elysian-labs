import { BarChart3, Film, Image, QrCode, Search, Smile } from "lucide-react";
import { motion } from "motion/react";

const APPS = [
  {
    icon: Image,
    name: "Unsplash Photos",
    desc: "Millions of free images",
    color: "#1a1a1a",
  },
  {
    icon: Smile,
    name: "Giphy",
    desc: "Animated GIF library",
    color: "#00ff88",
  },
  { icon: Film, name: "Pexels", desc: "Free stock videos", color: "#05a081" },
  {
    icon: Search,
    name: "Google Fonts",
    desc: "1,000+ web fonts",
    color: "#4285f4",
  },
  {
    icon: QrCode,
    name: "QR Generator",
    desc: "Create custom QR codes",
    color: "#6366f1",
  },
  {
    icon: BarChart3,
    name: "Chart Builder",
    desc: "Data visualizations",
    color: "#f59e0b",
  },
];

export function AppsTab() {
  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="text-center py-4">
        <p className="text-sm font-semibold text-foreground">
          App Integrations
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">
          Extend your creative toolkit
        </p>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {APPS.map((app, i) => {
          const Icon = app.icon;
          return (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all relative group cursor-default"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 opacity-60"
                style={{
                  background: `${app.color}20`,
                  border: `1px solid ${app.color}30`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: app.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground truncate">
                  {app.name}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  {app.desc}
                </p>
              </div>
              <span className="shrink-0 text-[9px] bg-white/10 text-muted-foreground px-2 py-0.5 rounded-full">
                Soon
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
