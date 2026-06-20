import type {
  Clip,
  FilterType,
  TransitionType,
  VideoEditorState,
} from "@/hooks/useVideoEditor";

interface EffectsPanelProps {
  state: VideoEditorState;
  onUpdateClip: (id: string, patch: Partial<Clip>) => void;
  onSetActiveEffectTab: (tab: "transitions" | "filters") => void;
}

const TRANSITIONS: { id: TransitionType; label: string; icon: string }[] = [
  { id: "none", label: "None", icon: "✕" },
  { id: "fade-in", label: "Fade In", icon: "▶" },
  { id: "fade-out", label: "Fade Out", icon: "◀" },
  { id: "dissolve", label: "Dissolve", icon: "◈" },
  { id: "slide-left", label: "Slide Left", icon: "←" },
  { id: "slide-right", label: "Slide Right", icon: "→" },
];

const FILTERS: { id: FilterType; label: string; style: React.CSSProperties }[] =
  [
    { id: "none", label: "None", style: {} },
    {
      id: "warm",
      label: "Warm",
      style: { filter: "sepia(0.3) saturate(1.4)" },
    },
    {
      id: "cool",
      label: "Cool",
      style: { filter: "hue-rotate(30deg) saturate(0.9)" },
    },
    {
      id: "vintage",
      label: "Vintage",
      style: { filter: "sepia(0.5) contrast(0.85)" },
    },
    { id: "bw", label: "B&W", style: { filter: "grayscale(1)" } },
    { id: "vivid", label: "Vivid", style: { filter: "saturate(1.8)" } },
  ];

function getTransitionId(clip: Clip | undefined): TransitionType {
  if (!clip) return "none";
  const t = clip.transition;
  if (!t) return "none";
  if (typeof t === "string") return t as TransitionType;
  return (t as { type: TransitionType }).type ?? "none";
}

export function EffectsPanel({
  state,
  onUpdateClip,
  onSetActiveEffectTab,
}: EffectsPanelProps) {
  const clips = state.clips ?? [];
  const selectedClip =
    state.selectedItem?.type === "clip"
      ? clips.find((c) => c.id === state.selectedItem!.id)
      : clips.find((c) => c.trackType === "video" || c.type === "video");

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      data-ocid="effects-panel"
    >
      <div
        className="flex border-b border-border flex-shrink-0"
        style={{ background: "oklch(0.10 0.004 240)" }}
      >
        {(["transitions", "filters"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onSetActiveEffectTab(tab)}
            className={[
              "flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-smooth",
              state.activeEffectTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
            data-ocid={`effects-tab-${tab}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {state.activeEffectTab === "transitions" ? (
          TRANSITIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                selectedClip &&
                onUpdateClip(selectedClip.id, {
                  transition: {
                    type: t.id,
                    duration: 0.5,
                    easing: "ease-in-out",
                  },
                })
              }
              disabled={!selectedClip}
              className={[
                "w-full flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-smooth disabled:opacity-40",
                getTransitionId(selectedClip) === t.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card/50 text-foreground hover:bg-muted",
              ].join(" ")}
              data-ocid={`transition-${t.id}`}
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background:
                    getTransitionId(selectedClip) === t.id
                      ? "oklch(0.82 0.17 142 / 0.2)"
                      : "oklch(0.15 0 0)",
                }}
              >
                {t.icon}
              </div>
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() =>
                  selectedClip &&
                  onUpdateClip(selectedClip.id, { filter: f.id })
                }
                disabled={!selectedClip}
                className={[
                  "flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-smooth disabled:opacity-40",
                  selectedClip?.filter === f.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card/50 hover:bg-muted",
                ].join(" ")}
                data-ocid={`filter-${f.id}`}
              >
                <div
                  className="w-full h-10 rounded overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.65 0.17 150))",
                    ...f.style,
                  }}
                />
                <span
                  className={`text-[10px] font-medium ${selectedClip?.filter === f.id ? "text-accent" : "text-muted-foreground"}`}
                >
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
