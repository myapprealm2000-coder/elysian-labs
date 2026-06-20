import { Sparkles, Type, Wand2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ACCENT = "#2563EB";
const GREEN = "#22C55E";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

const TEXT_TYPES = [
  {
    id: "heading",
    label: "Heading",
    preview: "Big Bold Title",
    style: { fontSize: 18, fontWeight: 900, color: "white" },
    desc: "Large display text",
  },
  {
    id: "subheading",
    label: "Subheading",
    preview: "Sub Heading",
    style: { fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)" },
    desc: "Section titles",
  },
  {
    id: "body",
    label: "Body Text",
    preview: "Paragraph text goes here",
    style: { fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.7)" },
    desc: "Regular content",
  },
  {
    id: "quote",
    label: "Quote",
    preview: '"Inspiring words..."',
    style: { fontSize: 12, fontStyle: "italic", color: "#a78bfa" },
    desc: "Blockquote style",
  },
  {
    id: "cta",
    label: "CTA Button",
    preview: "CLICK NOW",
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: "white",
      background: ACCENT,
      padding: "2px 10px",
      borderRadius: 6,
    },
    desc: "Call to action",
  },
  {
    id: "lower-third",
    label: "Lower Third",
    preview: "Name | Title",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "white",
      background: "rgba(37,99,235,0.8)",
      padding: "3px 8px",
    },
    desc: "Broadcast style",
  },
  {
    id: "title-card",
    label: "Title Card",
    preview: "TITLE CARD",
    style: {
      fontSize: 13,
      fontWeight: 900,
      letterSpacing: 3,
      color: "#fbbf24",
    },
    desc: "Cinematic titles",
  },
];

const ANIM_TEMPLATES = [
  { id: "neon", label: "Neon Pulse", grad: "from-cyan-900 to-blue-800" },
  { id: "fire", label: "Fire Text", grad: "from-red-900 to-orange-700" },
  { id: "gold", label: "Gold Luxury", grad: "from-yellow-900 to-amber-600" },
  { id: "matrix", label: "Matrix", grad: "from-green-900 to-emerald-600" },
  { id: "glitch", label: "Glitch FX", grad: "from-pink-900 to-purple-700" },
  { id: "minimal", label: "Clean Minimal", grad: "from-slate-800 to-gray-700" },
];

const ANIMATIONS = [
  { id: "bounce", label: "Bounce", emoji: "⬆️" },
  { id: "fade", label: "Fade In", emoji: "🌟" },
  { id: "slide", label: "Slide Up", emoji: "⬆️" },
  { id: "pop", label: "Pop", emoji: "💥" },
  { id: "typewriter", label: "Typewriter", emoji: "⌨️" },
  { id: "blur", label: "Blur Reveal", emoji: "🌀" },
];

const STICKERS = [
  "🔥",
  "⚡",
  "✨",
  "💫",
  "🎯",
  "🚀",
  "💎",
  "🏆",
  "❤️",
  "💯",
  "🎬",
  "📹",
  "🎵",
  "🎤",
  "🎸",
  "🥁",
  "😎",
  "🤩",
  "💪",
  "👑",
  "🌟",
  "⭐",
  "🎉",
  "🎊",
  "🌈",
  "☀️",
  "🌙",
  "⚡",
  "❄️",
  "🌊",
  "💥",
  "🎭",
];

export function TextPanel() {
  const [lyricsState, setLyricsState] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const [lyricsProgress, setLyricsProgress] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const [depth, setDepth] = useState(5);
  const [extrude, setExtrude] = useState(3);

  const handleAutoLyrics = () => {
    setLyricsState("loading");
    setLyricsProgress(0);
    const iv = setInterval(() => {
      setLyricsProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setLyricsState("done");
          toast.success("Lyrics synced to beat!");
          return 100;
        }
        return p + 4;
      });
    }, 120);
  };

  return (
    <div
      className="flex flex-col gap-4 p-3 overflow-y-auto h-full"
      data-ocid="text_panel"
    >
      {/* Text types */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Add Text
        </p>
        <div className="flex flex-col gap-1.5">
          {TEXT_TYPES.map((tt) => (
            <motion.button
              key={tt.id}
              type="button"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full p-2.5 rounded-xl text-left group transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${BORDER}`,
              }}
              data-ocid={`text.type_card.${tt.id}`}
            >
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span style={tt.style as React.CSSProperties}>
                  {tt.preview}
                </span>
              </div>
              <div className="w-16 text-right">
                <p className="text-[10px]" style={{ color: MUTED }}>
                  {tt.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Animated templates */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Animated Templates
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ANIM_TEMPLATES.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative h-16 rounded-xl overflow-hidden bg-gradient-to-br ${t.grad} flex items-end p-2`}
              data-ocid={`text.anim_template.${t.id}`}
            >
              <span className="text-[10px] font-semibold text-white">
                {t.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Text animations */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Animations
        </p>
        <div className="grid grid-cols-3 gap-2">
          {ANIMATIONS.map((a) => (
            <motion.button
              key={a.id}
              type="button"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${BORDER}`,
              }}
              data-ocid={`text.animation.${a.id}`}
            >
              <span className="text-lg">{a.emoji}</span>
              <span className="text-[10px] font-medium text-white">
                {a.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 3D Text */}
      <div
        className="rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="text-xs font-semibold text-white">3D Text</span>
          </div>
          <button
            type="button"
            onClick={() => setShow3D(!show3D)}
            className="w-9 h-5 rounded-full transition-all relative"
            style={{ background: show3D ? ACCENT : "rgba(255,255,255,0.12)" }}
            data-ocid="text.3d_toggle"
          >
            <motion.div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
              animate={{ left: show3D ? "calc(100% - 18px)" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
        <AnimatePresence>
          {show3D && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-2"
            >
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span style={{ color: MUTED }}>Depth</span>
                  <span style={{ color: MUTED }}>{depth}px</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{ accentColor: ACCENT }}
                  data-ocid="text.3d_depth_slider"
                />
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span style={{ color: MUTED }}>Extrude</span>
                  <span style={{ color: MUTED }}>{extrude}px</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={extrude}
                  onChange={(e) => setExtrude(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{ accentColor: ACCENT }}
                  data-ocid="text.3d_extrude_slider"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stickers */}
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: MUTED }}
        >
          Stickers
        </p>
        <div className="grid grid-cols-8 gap-1">
          {STICKERS.map((emoji, i) => (
            <motion.button
              // biome-ignore lint/suspicious/noArrayIndexKey: stable positional stickers
              key={i}
              type="button"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-base transition-all hover:bg-white/10"
              data-ocid={`text.sticker.${i + 1}`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Auto lyrics */}
      <div
        className="rounded-xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" style={{ color: GREEN }} />
          <span className="text-xs font-semibold text-white">Auto Lyrics</span>
        </div>
        <p className="text-[10px] mb-3" style={{ color: MUTED }}>
          Automatically sync lyrics to music beat
        </p>
        {lyricsState === "loading" && (
          <div className="mb-3">
            <div
              className="flex justify-between text-[10px] mb-1"
              style={{ color: MUTED }}
            >
              <span>Syncing lyrics...</span>
              <span>{lyricsProgress}%</span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: GREEN, width: `${lyricsProgress}%` }}
              />
            </div>
          </div>
        )}
        {lyricsState === "done" && (
          <div
            className="flex items-center gap-2 p-2 rounded-lg mb-3"
            style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}40` }}
          >
            <span className="text-sm">✅</span>
            <span className="text-[10px] font-medium" style={{ color: GREEN }}>
              Lyrics synced to beat!
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={handleAutoLyrics}
          disabled={lyricsState === "loading"}
          className="w-full py-2 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-2"
          style={{
            background: GREEN,
            opacity: lyricsState === "loading" ? 0.6 : 1,
          }}
          data-ocid="text.auto_lyrics_button"
        >
          <Wand2 className="w-3.5 h-3.5" />
          {lyricsState === "loading" ? "Syncing..." : "Auto Sync Lyrics"}
        </button>
      </div>
    </div>
  );
}
