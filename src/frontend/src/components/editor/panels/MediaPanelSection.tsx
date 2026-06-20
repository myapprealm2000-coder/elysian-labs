import { Film, Upload } from "lucide-react";

interface MediaPanelSectionProps {
  videoSrc: string | null;
  onLoadFile: (file: File) => void;
}

export function MediaPanelSection({
  videoSrc,
  onLoadFile,
}: MediaPanelSectionProps) {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Upload */}
      <label
        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl cursor-pointer transition-all group"
        style={{
          border: "1.5px dashed rgba(37,99,235,0.3)",
          background: "rgba(37,99,235,0.04)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(37,99,235,0.5)";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(37,99,235,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(37,99,235,0.3)";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(37,99,235,0.04)";
        }}
      >
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl"
          style={{ background: "rgba(37,99,235,0.15)", color: "#2563EB" }}
        >
          <Upload className="w-5 h-5" />
        </div>
        <div className="text-center">
          <p className="text-[12px] font-semibold text-white/70">
            Upload Video
          </p>
          <p className="text-[10px] text-white/30 mt-0.5">
            MP4, MOV, WebM up to 2GB
          </p>
        </div>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onLoadFile(f);
          }}
          data-ocid="editor-media-upload"
        />
      </label>

      {videoSrc && (
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}
          >
            <Film className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white/80 truncate">
              Video loaded
            </p>
            <p className="text-[10px] text-white/30">Ready to edit</p>
          </div>
        </div>
      )}

      {/* Sample clips label */}
      <div className="pt-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25 mb-2">
          Stock footage
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Nature", "City", "Abstract", "Business"].map((name) => (
            <div
              key={name}
              className="aspect-video rounded-lg flex items-center justify-center text-[10px] font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
