import { SidebarSection } from "@/types/videoEditor";

const PLACEHOLDER_CONTENT: Record<string, string[]> = {
  [SidebarSection.Captions]: [
    "Upload a video and run Auto Captions from AI Tools to generate subtitles.",
    "Captions appear here and sync to the timeline automatically.",
  ],
  [SidebarSection.Templates]: [
    "YouTube Thumbnail",
    "TikTok Cover",
    "Instagram Post",
    "Gaming Montage",
    "Podcast Clip",
    "Cinematic Reel",
    "Viral Hook",
    "Course Intro",
  ],
  [SidebarSection.BrandKit]: [
    "Upload your logo, set brand colors, and save your font preferences.",
    "Brand assets auto-apply to new text layers.",
  ],
  [SidebarSection.Settings]: [
    "Auto-save: Every 30s",
    "Timeline snap: On",
    "Preview quality: 1080p",
    "Hardware acceleration: On",
  ],
};

export function GenericPanelSection({
  section,
  label,
}: {
  section: SidebarSection;
  label: string;
}) {
  const items = PLACEHOLDER_CONTENT[section] ?? [];

  if (section === SidebarSection.Templates) {
    return (
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25 mb-3">
          Templates
        </p>
        <div className="grid grid-cols-2 gap-2">
          {items.map((name) => (
            <button
              key={name}
              type="button"
              className="aspect-video flex items-center justify-center rounded-xl text-[10px] font-semibold text-center px-2 transition-all"
              style={{
                background: "rgba(37,99,235,0.06)",
                border: "1px solid rgba(37,99,235,0.15)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(37,99,235,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(37,99,235,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(37,99,235,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(37,99,235,0.15)";
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (section === SidebarSection.Settings) {
    return (
      <div className="p-4 flex flex-col gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">
          {label}
        </p>
        {items.map((item) => {
          const [key, value] = item.split(": ");
          return (
            <div
              key={item}
              className="flex items-center justify-between py-2 border-b"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <span className="text-[12px] text-white/60">{key}</span>
              {value && (
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    color: "#22C55E",
                  }}
                >
                  {value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">
        {label}
      </p>
      {items.map((item) => (
        <p key={item} className="text-[12px] text-white/45 leading-relaxed">
          {item}
        </p>
      ))}
    </div>
  );
}
