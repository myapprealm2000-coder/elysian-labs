import {
  Download,
  Keyboard,
  Layers,
  Monitor,
  RotateCcw,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ACCENT = "#2563EB";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const KEYBOARD_SHORTCUTS = [
  { key: "Space", action: "Play / Pause" },
  { key: "J", action: "Rewind 5s" },
  { key: "L", action: "Forward 5s" },
  { key: "K", action: "Pause" },
  { key: "Ctrl+Z", action: "Undo" },
  { key: "Ctrl+Y", action: "Redo" },
  { key: "Ctrl+S", action: "Save Project" },
  { key: "Ctrl+E", action: "Export" },
  { key: "Del", action: "Delete Selected" },
  { key: "Ctrl+D", action: "Duplicate" },
  { key: "Ctrl+C", action: "Copy" },
  { key: "Ctrl+V", action: "Paste" },
  { key: "I", action: "Mark In Point" },
  { key: "O", action: "Mark Out Point" },
  { key: "S", action: "Split Clip" },
  { key: "+/-", action: "Zoom Timeline" },
];

const THEMES = [
  { id: "dark", label: "Dark" },
  { id: "darker", label: "Darker" },
  { id: "oled", label: "OLED" },
];

const FORMATS = ["MP4", "MOV", "GIF", "PNG Sequence"];
const QUALITIES = ["720p", "1080p", "2K", "4K"];

function ToggleSetting({
  label,
  desc,
  value,
  onChange,
  ocid,
}: {
  label: string;
  desc?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-white">{label}</p>
        {desc && (
          <p className="text-[10px]" style={{ color: MUTED }}>
            {desc}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative rounded-full flex-shrink-0"
        style={{
          background: value ? ACCENT : "rgba(255,255,255,0.12)",
          width: 40,
          height: 22,
        }}
        data-ocid={ocid}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
          animate={{ left: value ? "calc(100% - 18px)" : "2px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}

export function SettingsPanel() {
  const [autoPlay, setAutoPlay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [defaultSpeed, setDefaultSpeed] = useState(1);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [magneticTimeline, setMagneticTimeline] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [waveform, setWaveform] = useState(true);
  const [hardwareAccel, setHardwareAccel] = useState(true);
  const [defaultFormat, setDefaultFormat] = useState("MP4");
  const [defaultQuality, setDefaultQuality] = useState("1080p");
  const [activeTheme, setActiveTheme] = useState("dark");

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      data-ocid="settings_panel"
    >
      {/* Playback */}
      <div
        className="p-3 rounded-xl flex flex-col gap-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Monitor className="w-4 h-4" style={{ color: ACCENT }} />
          <p className="text-xs font-bold text-white">Playback</p>
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-1.5">
            <span className="text-white">Default Speed</span>
            <span style={{ color: MUTED }}>{defaultSpeed}x</span>
          </div>
          <input
            type="range"
            min={0.25}
            max={4}
            step={0.25}
            value={defaultSpeed}
            onChange={(e) => setDefaultSpeed(Number(e.target.value))}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
            style={{ accentColor: ACCENT }}
            data-ocid="settings.default_speed_slider"
          />
          <div
            className="flex justify-between text-[9px] mt-1"
            style={{ color: MUTED }}
          >
            <span>0.25x</span>
            <span>4x</span>
          </div>
        </div>
        <ToggleSetting
          label="Auto-play"
          desc="Start playback when project loads"
          value={autoPlay}
          onChange={setAutoPlay}
          ocid="settings.autoplay_toggle"
        />
        <ToggleSetting
          label="Loop"
          desc="Loop playback continuously"
          value={loop}
          onChange={setLoop}
          ocid="settings.loop_toggle"
        />
      </div>

      {/* Timeline */}
      <div
        className="p-3 rounded-xl flex flex-col gap-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4" style={{ color: ACCENT }} />
          <p className="text-xs font-bold text-white">Timeline</p>
        </div>
        <ToggleSetting
          label="Snap to Grid"
          value={snapToGrid}
          onChange={setSnapToGrid}
          ocid="settings.snap_toggle"
        />
        <ToggleSetting
          label="Magnetic Timeline"
          desc="Clips snap together automatically"
          value={magneticTimeline}
          onChange={setMagneticTimeline}
          ocid="settings.magnetic_toggle"
        />
        <ToggleSetting
          label="Auto-scroll"
          desc="Follow playhead during playback"
          value={autoScroll}
          onChange={setAutoScroll}
          ocid="settings.autoscroll_toggle"
        />
        <ToggleSetting
          label="Waveform Display"
          desc="Show audio waveforms on clips"
          value={waveform}
          onChange={setWaveform}
          ocid="settings.waveform_toggle"
        />
      </div>

      {/* Export */}
      <div
        className="p-3 rounded-xl flex flex-col gap-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Download className="w-4 h-4" style={{ color: ACCENT }} />
          <p className="text-xs font-bold text-white">Export Defaults</p>
        </div>
        <div>
          <p className="text-[10px] mb-1.5" style={{ color: MUTED }}>
            Default Format
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {FORMATS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setDefaultFormat(f)}
                className="py-1.5 rounded-lg text-[10px] font-medium transition-all"
                style={{
                  background:
                    defaultFormat === f ? ACCENT : "rgba(255,255,255,0.06)",
                  color: defaultFormat === f ? "white" : MUTED,
                }}
                data-ocid={`settings.format.${f.toLowerCase().replace(/\s/g, "_")}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] mb-1.5" style={{ color: MUTED }}>
            Default Quality
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {QUALITIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setDefaultQuality(q)}
                className="py-1.5 rounded-lg text-[10px] font-medium transition-all"
                style={{
                  background:
                    defaultQuality === q ? ACCENT : "rgba(255,255,255,0.06)",
                  color: defaultQuality === q ? "white" : MUTED,
                }}
                data-ocid={`settings.quality.${q.toLowerCase()}`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <ToggleSetting
          label="Hardware Acceleration"
          desc="Use GPU for faster processing"
          value={hardwareAccel}
          onChange={setHardwareAccel}
          ocid="settings.hw_accel_toggle"
        />
      </div>

      {/* Theme */}
      <div
        className="p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sun className="w-4 h-4" style={{ color: ACCENT }} />
          <p className="text-xs font-bold text-white">Editor Theme</p>
        </div>
        <div className="flex gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTheme(t.id)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background:
                  activeTheme === t.id ? ACCENT : "rgba(255,255,255,0.06)",
                color: activeTheme === t.id ? "white" : MUTED,
                border: `1px solid ${activeTheme === t.id ? ACCENT : BORDER}`,
              }}
              data-ocid={`settings.theme.${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div
        className="p-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Keyboard className="w-4 h-4" style={{ color: ACCENT }} />
          <p className="text-xs font-bold text-white">Keyboard Shortcuts</p>
        </div>
        <div className="grid grid-cols-1 gap-1">
          {KEYBOARD_SHORTCUTS.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between py-1.5 border-b"
              style={{ borderColor: BORDER }}
            >
              <span className="text-[10px]" style={{ color: MUTED }}>
                {s.action}
              </span>
              <kbd
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: `1px solid ${BORDER}`,
                }}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110"
        style={{
          background: "rgba(239,68,68,0.15)",
          border: "1px solid rgba(239,68,68,0.3)",
          color: "#ef4444",
        }}
        data-ocid="settings.reset_button"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset to Defaults
      </button>
    </div>
  );
}
