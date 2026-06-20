import { r as reactExports, j as jsxRuntimeExports, i as useParams } from "./vendor-80nuMd8G.js";
import { u as useVideoEditorStore, a as useVideoEditor, E as EditorTopBar, b as EditorLeftSidebar, V as VideoMonitor, c as EditorRightPanel } from "./VideoMonitor-BFM2BvWg.js";
import { A as AnimatePresence, m as motion } from "./motion-DXodcWnX.js";
import { X, h as CircleCheck, Z as Zap, I as Image, F as Film, G as Gift, D as Download, c as LoaderCircle } from "./ui-lib-DG52wkUx.js";
import { c as useProject } from "./useProjects-Dt0JeNJy.js";
import { u as ue } from "./index-De5ctwPQ.js";
import "./react-9ph_Ps2d.js";
import "./backend-CD8jDaiY.js";
const LABEL_W = 180;
const BASE_PPS = 100;
const SNAP_PX = 20;
const MIN_CLIP_W = 20;
const TRANSITION_TYPES = [
  "fade",
  "dissolve",
  "zoom",
  "blur",
  "swipe",
  "flash",
  "rotate",
  "wipe"
];
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
function clipEffDuration(clip) {
  return Math.max(0.1, clip.duration - clip.trimIn - clip.trimOut);
}
function textDuration(layer) {
  return Math.max(0.1, layer.endTime - layer.startTime);
}
function WaveformBars({ data, count }) {
  const bars = reactExports.useMemo(() => {
    if (data && data.length > 0) {
      const step = data.length / count;
      return Array.from({ length: count }, (_, i) => {
        const idx = Math.floor(i * step);
        return Math.max(10, Math.min(90, (data[idx] ?? 0.5) * 90));
      });
    }
    return Array.from(
      { length: count },
      (_, i) => 20 + 40 * Math.abs(Math.sin(i * 0.37 + 1.2)) + 25 * Math.abs(Math.sin(i * 0.91 + 0.4))
    );
  }, [data, count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end gap-px overflow-hidden px-1 pointer-events-none", children: bars.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 rounded-sm opacity-60",
      style: { height: `${h}%`, background: "#22C55E" }
    },
    i
  )) });
}
function TrackRow({
  track,
  clips,
  pps,
  currentTime,
  duration,
  selectedClipId,
  selectedTextId,
  selectedCaptionId,
  onClipMouseDown,
  onLeftEdge,
  onRightEdge,
  onClipClick,
  onClipContextMenu,
  onTrackClick,
  index
}) {
  const store = useVideoEditorStore();
  const trackH = track.type === "video" ? 56 : track.type === "audio" ? 48 : 40;
  const rowBg = index % 2 === 0 ? "#0F172A" : "#111827";
  function getItemGeometry(item) {
    if (item.kind === "video" || item.kind === "audio") {
      return {
        left: item.data.startTime * pps,
        width: Math.max(MIN_CLIP_W, clipEffDuration(item.data) * pps)
      };
    }
    return {
      left: item.data.startTime * pps,
      width: Math.max(MIN_CLIP_W, textDuration(item.data) * pps)
    };
  }
  function isSelected(item) {
    if (item.kind === "video" || item.kind === "audio")
      return selectedClipId === item.data.id;
    if (item.kind === "text") return selectedTextId === item.data.id;
    return selectedCaptionId === item.data.id;
  }
  function gradient(item) {
    if (item.kind === "video")
      return "linear-gradient(135deg, #1d4ed8, #2563EB)";
    if (item.kind === "audio")
      return "linear-gradient(135deg, #16a34a, #22C55E)";
    return "linear-gradient(135deg, #6d28d9, #8b5cf6)";
  }
  function selBorderColor(item) {
    if (item.kind === "video") return "#3b82f6";
    if (item.kind === "audio") return "#4ade80";
    return "#a78bfa";
  }
  function selShadow(item) {
    if (item.kind === "video") return "0 0 12px rgba(37,99,235,0.6)";
    if (item.kind === "audio") return "0 0 12px rgba(34,197,94,0.6)";
    return "0 0 12px rgba(139,92,246,0.6)";
  }
  function clipLabel(item) {
    if (item.kind === "text" || item.kind === "caption")
      return item.data.content.slice(0, 28);
    return item.data.name;
  }
  function isHidden(item) {
    return !!item.data.hidden;
  }
  function isLocked(item) {
    return track.locked || !!item.data.locked;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex border-b border-white/5",
      style: { height: trackH, background: rowBg },
      "data-ocid": `timeline.track.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 flex items-center gap-1 px-2 border-r border-white/5",
            style: { width: LABEL_W, background: "#0F172A" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-white/55 truncate flex-1 min-w-0", children: track.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: track.hidden ? "Show" : "Hide",
                  className: `transition-colors flex-shrink-0 ${track.hidden ? "text-white/25" : "text-white/40 hover:text-white/70"}`,
                  onClick: () => store.updateTrack(track.id, { hidden: !track.hidden }),
                  "data-ocid": `timeline.track_hide.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      "aria-label": track.hidden ? "Show track" : "Hide track",
                      role: "img",
                      width: "11",
                      height: "11",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      children: track.hidden ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "3" })
                      ] })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: track.locked ? "Unlock" : "Lock",
                  className: `transition-colors flex-shrink-0 ${track.locked ? "text-yellow-400" : "text-white/40 hover:text-white/70"}`,
                  onClick: () => store.updateTrack(track.id, { locked: !track.locked }),
                  "data-ocid": `timeline.track_lock.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      "aria-label": track.locked ? "Unlock track" : "Lock track",
                      role: "img",
                      width: "11",
                      height: "11",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      children: track.locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })
                      ] })
                    }
                  )
                }
              ),
              track.type === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  title: track.muted ? "Unmute" : "Mute",
                  className: `transition-colors flex-shrink-0 ${track.muted ? "text-red-400" : "text-white/40 hover:text-white/70"}`,
                  onClick: () => store.updateTrack(track.id, { muted: !track.muted }),
                  "data-ocid": `timeline.track_mute.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      "aria-label": track.muted ? "Unmute track" : "Mute track",
                      role: "img",
                      width: "11",
                      height: "11",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      children: track.muted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" })
                      ] })
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex-1 overflow-hidden cursor-crosshair",
            onClick: onTrackClick,
            onKeyDown: (e) => e.key === "Enter" && onTrackClick(e),
            "aria-label": `${track.name} track`,
            children: [
              clips.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/12", children: track.type === "video" ? "Drop video" : track.type === "audio" ? "Drop audio" : "Add text" }) }),
              clips.map((item, ci) => {
                const { left, width } = getItemGeometry(item);
                const sel = isSelected(item);
                const locked = isLocked(item);
                const hidden = isHidden(item);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute top-1 bottom-1 rounded-md overflow-hidden group/clip",
                    style: {
                      left,
                      width,
                      background: gradient(item),
                      opacity: hidden ? 0.3 : 1,
                      border: sel ? `2px solid ${selBorderColor(item)}` : "1px solid rgba(255,255,255,0.14)",
                      boxShadow: sel ? selShadow(item) : "none",
                      cursor: locked ? "not-allowed" : "grab",
                      zIndex: sel ? 3 : 1
                    },
                    onMouseDown: (e) => {
                      if (!locked) onClipMouseDown(e, item);
                    },
                    onClick: (e) => onClipClick(e, item),
                    onContextMenu: (e) => onClipContextMenu(e, item),
                    onKeyDown: (e) => e.key === "Enter" && onClipClick(e, item),
                    "data-ocid": `timeline.clip.${ci + 1}`,
                    children: [
                      item.kind === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        WaveformBars,
                        {
                          data: item.data.waveformData,
                          count: Math.max(20, Math.round(width / 4))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-0.5 left-2 right-2 z-10 text-[10px] font-semibold text-white/90 truncate pointer-events-none", children: [
                        item.kind === "text" || item.kind === "caption" ? "T " : "",
                        clipLabel(item)
                      ] }),
                      width > 64 && (item.kind === "video" || item.kind === "audio") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0.5 right-2 z-10 text-[9px] font-mono text-white/45 pointer-events-none", children: fmtTime(
                        clipEffDuration(item.data)
                      ) }),
                      locked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          "aria-label": "Locked",
                          role: "img",
                          width: "10",
                          height: "10",
                          viewBox: "0 0 24 24",
                          fill: "#facc15",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" })
                        }
                      ) }),
                      !locked && (item.kind === "video" || item.kind === "audio") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute top-0 bottom-0 left-0 w-2 z-20 cursor-ew-resize opacity-0 group-hover/clip:opacity-100 transition-opacity flex items-center justify-center bg-black/20",
                          onMouseDown: (e) => {
                            e.stopPropagation();
                            onLeftEdge(e, item);
                          },
                          "data-ocid": `timeline.clip_left_edge.${ci + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 h-4 rounded-full bg-white/70" })
                        }
                      ),
                      !locked && (item.kind === "video" || item.kind === "audio") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute top-0 bottom-0 right-0 w-2 z-20 cursor-ew-resize opacity-0 group-hover/clip:opacity-100 transition-opacity flex items-center justify-center bg-black/20",
                          onMouseDown: (e) => {
                            e.stopPropagation();
                            onRightEdge(e, item);
                          },
                          "data-ocid": `timeline.clip_right_edge.${ci + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 h-4 rounded-full bg-white/70" })
                        }
                      )
                    ]
                  },
                  item.data.id
                );
              }),
              duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-0 bottom-0 w-px pointer-events-none z-30",
                  style: {
                    left: currentTime * pps,
                    background: "#f87171",
                    boxShadow: "0 0 6px rgba(248,113,113,0.7)"
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Timeline() {
  const store = useVideoEditorStore();
  const {
    trackOrder,
    tracks,
    videoClips,
    audioClips,
    textLayers,
    captionLayers,
    currentTime,
    duration,
    timelineZoom,
    isPlaying,
    selectedClipId,
    selectedTextId,
    selectedCaptionId
  } = store;
  const rulerRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const [ctxMenu, setCtxMenu] = reactExports.useState(null);
  const [snapGuide, setSnapGuide] = reactExports.useState(null);
  const [showTransitionMenu, setShowTransitionMenu] = reactExports.useState(false);
  const dragRef = reactExports.useRef(null);
  const resizeRef = reactExports.useRef(null);
  const playheadDragRef = reactExports.useRef(null);
  const pps = BASE_PPS * timelineZoom;
  const effDur = Math.max(duration, 30);
  const totalW = effDur * pps;
  function getTrackClips(track) {
    if (track.type === "video") {
      return track.clips.map((id) => videoClips[id]).filter(Boolean).map((c) => ({ kind: "video", data: c }));
    }
    if (track.type === "audio") {
      return track.clips.map((id) => audioClips[id]).filter(Boolean).map((c) => ({ kind: "audio", data: c }));
    }
    const items = [];
    for (const id of track.clips) {
      if (textLayers[id]) items.push({ kind: "text", data: textLayers[id] });
      else if (captionLayers[id])
        items.push({ kind: "caption", data: captionLayers[id] });
    }
    return items;
  }
  const snapTime = reactExports.useCallback(
    (t, excludeId) => {
      const secSnap = Math.round(t);
      if (Math.abs(secSnap - t) * pps < SNAP_PX) return secSnap;
      for (const c of [
        ...Object.values(videoClips),
        ...Object.values(audioClips)
      ]) {
        if (c.id === excludeId) continue;
        if (Math.abs(c.startTime - t) * pps < SNAP_PX) return c.startTime;
        const end = c.startTime + clipEffDuration(c);
        if (Math.abs(end - t) * pps < SNAP_PX) return end;
      }
      return t;
    },
    [pps, videoClips, audioClips]
  );
  const handleRulerClick = reactExports.useCallback(
    (e) => {
      var _a, _b;
      const rect = (_a = rulerRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      const scrollX = ((_b = scrollRef.current) == null ? void 0 : _b.scrollLeft) ?? 0;
      const x = e.clientX - rect.left + scrollX;
      store.setCurrentTime(Math.max(0, Math.min(effDur, x / pps)));
    },
    [effDur, pps, store]
  );
  const handleTrackClick = reactExports.useCallback(
    (e) => {
      var _a;
      const rect = e.currentTarget.getBoundingClientRect();
      const scrollX = ((_a = scrollRef.current) == null ? void 0 : _a.scrollLeft) ?? 0;
      const x = e.clientX - rect.left + scrollX;
      store.setCurrentTime(Math.max(0, Math.min(effDur, x / pps)));
    },
    [effDur, pps, store]
  );
  const handlePlayheadMouseDown = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      playheadDragRef.current = { startX: e.clientX, origTime: currentTime };
      const onMove = (me) => {
        const d = playheadDragRef.current;
        if (!d) return;
        store.setCurrentTime(
          Math.max(
            0,
            Math.min(effDur, d.origTime + (me.clientX - d.startX) / pps)
          )
        );
      };
      const onUp = () => {
        playheadDragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [currentTime, effDur, pps, store]
  );
  const handleClipMouseDown = reactExports.useCallback(
    (e, item) => {
      e.stopPropagation();
      e.preventDefault();
      const origStart = item.data.startTime;
      dragRef.current = {
        clipId: item.data.id,
        clipType: item.kind,
        startX: e.clientX,
        origStart
      };
      const onMove = (me) => {
        const drag = dragRef.current;
        if (!drag) return;
        let newStart = Math.max(
          0,
          drag.origStart + (me.clientX - drag.startX) / pps
        );
        newStart = snapTime(newStart, drag.clipId);
        setSnapGuide(newStart);
        if (drag.clipType === "video")
          store.updateVideoClip(drag.clipId, { startTime: newStart });
        else if (drag.clipType === "audio")
          store.updateAudioClip(drag.clipId, { startTime: newStart });
        else if (drag.clipType === "text")
          store.updateTextLayer(drag.clipId, { startTime: newStart });
        else if (drag.clipType === "caption")
          store.updateCaptionLayer(drag.clipId, { startTime: newStart });
      };
      const onUp = () => {
        setSnapGuide(null);
        store.takeSnapshot();
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pps, store, snapTime]
  );
  const handleLeftEdge = reactExports.useCallback(
    (e, item) => {
      e.stopPropagation();
      e.preventDefault();
      if (item.kind !== "video" && item.kind !== "audio") return;
      const clip = item.data;
      resizeRef.current = {
        clipId: clip.id,
        clipType: item.kind,
        edge: "left",
        startX: e.clientX,
        origTrimIn: clip.trimIn,
        origTrimOut: clip.trimOut,
        origStart: clip.startTime,
        clipDuration: clip.duration
      };
      const onMove = (me) => {
        const r = resizeRef.current;
        if (!r) return;
        const deltaSec = (me.clientX - r.startX) / pps;
        const newTrimIn = Math.max(
          0,
          Math.min(
            r.origTrimIn + deltaSec,
            r.clipDuration - r.origTrimOut - 0.1
          )
        );
        const newStart = Math.max(0, r.origStart + deltaSec);
        if (r.clipType === "video")
          store.updateVideoClip(r.clipId, {
            trimIn: newTrimIn,
            startTime: newStart
          });
        else
          store.updateAudioClip(r.clipId, {
            trimIn: newTrimIn,
            startTime: newStart
          });
      };
      const onUp = () => {
        store.takeSnapshot();
        resizeRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pps, store]
  );
  const handleRightEdge = reactExports.useCallback(
    (e, item) => {
      e.stopPropagation();
      e.preventDefault();
      if (item.kind !== "video" && item.kind !== "audio") return;
      const clip = item.data;
      resizeRef.current = {
        clipId: clip.id,
        clipType: item.kind,
        edge: "right",
        startX: e.clientX,
        origTrimIn: clip.trimIn,
        origTrimOut: clip.trimOut,
        origStart: clip.startTime,
        clipDuration: clip.duration
      };
      const onMove = (me) => {
        const r = resizeRef.current;
        if (!r) return;
        const deltaSec = (me.clientX - r.startX) / pps;
        const newTrimOut = Math.max(
          0,
          Math.min(
            r.origTrimOut - deltaSec,
            r.clipDuration - r.origTrimIn - 0.1
          )
        );
        if (r.clipType === "video")
          store.updateVideoClip(r.clipId, { trimOut: newTrimOut });
        else store.updateAudioClip(r.clipId, { trimOut: newTrimOut });
      };
      const onUp = () => {
        store.takeSnapshot();
        resizeRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pps, store]
  );
  const handleClipClick = reactExports.useCallback(
    (e, item) => {
      e.stopPropagation();
      if (item.kind === "video" || item.kind === "audio") {
        store.setSelectedClipId(item.data.id);
        store.setSelectedTextId(null);
      } else if (item.kind === "text") {
        store.setSelectedTextId(item.data.id);
        store.setSelectedClipId(null);
      } else {
        store.setSelectedCaptionId(item.data.id);
        store.setSelectedClipId(null);
      }
    },
    [store]
  );
  const handleClipContextMenu = reactExports.useCallback(
    (e, item) => {
      e.preventDefault();
      setCtxMenu({
        x: e.clientX,
        y: e.clientY,
        clipId: item.data.id,
        clipType: item.kind
      });
    },
    []
  );
  function ctxDelete(id, type) {
    store.takeSnapshot();
    if (type === "video") store.removeVideoClip(id);
    else if (type === "audio") store.removeAudioClip(id);
    else if (type === "text") store.removeTextLayer(id);
    else store.removeCaptionLayer(id);
  }
  const ctxDuplicate = reactExports.useCallback(
    (id, type) => {
      store.takeSnapshot();
      if (type === "video") {
        const c = videoClips[id];
        if (c)
          store.addVideoClip({
            ...c,
            id: `vclip-${Date.now()}`,
            name: `${c.name} (copy)`,
            startTime: c.startTime + 0.5
          });
      } else if (type === "audio") {
        const c = audioClips[id];
        if (c)
          store.addAudioClip({
            ...c,
            id: `aclip-${Date.now()}`,
            name: `${c.name} (copy)`,
            startTime: c.startTime + 0.5
          });
      } else if (type === "text") {
        const l = textLayers[id];
        if (l)
          store.addTextLayer({
            ...l,
            id: `text-${Date.now()}`,
            position: { x: l.position.x + 2, y: l.position.y + 2 }
          });
      }
    },
    [store, videoClips, audioClips, textLayers]
  );
  const ctxSplit = reactExports.useCallback(
    (id) => {
      const clip = videoClips[id];
      if (!clip) return;
      const sp = currentTime - clip.startTime;
      if (sp <= clip.trimIn || sp >= clip.duration - clip.trimOut) return;
      store.takeSnapshot();
      store.updateVideoClip(id, { trimOut: clip.duration - sp });
      store.addVideoClip({
        ...clip,
        id: `vclip-${Date.now()}`,
        name: `${clip.name} (2)`,
        startTime: currentTime,
        trimIn: sp,
        trimOut: 0
      });
    },
    [store, videoClips, currentTime]
  );
  function ctxTransition(id, type) {
    store.updateVideoClip(id, {
      transition: { type, duration: 0.5, easing: "ease-in-out" }
    });
    setCtxMenu(null);
    setShowTransitionMenu(false);
  }
  function addTrack(type) {
    const id = `track-${type}-${Date.now()}`;
    const count = trackOrder.filter((tid) => {
      var _a;
      return ((_a = tracks[tid]) == null ? void 0 : _a.type) === type;
    }).length + 2;
    store.addTrack({
      id,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`,
      locked: false,
      hidden: false,
      muted: false,
      height: type === "video" ? 56 : type === "audio" ? 48 : 40,
      clips: []
    });
  }
  const setZoom = reactExports.useCallback(
    (z) => store.setTimelineZoom(Math.max(1, Math.min(8, z))),
    [store]
  );
  reactExports.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fn = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        store.setTimelineZoom(
          Math.max(
            1,
            Math.min(8, timelineZoom + (e.deltaY > 0 ? -0.25 : 0.25))
          )
        );
      }
    };
    el.addEventListener("wheel", fn, { passive: false });
    return () => el.removeEventListener("wheel", fn);
  }, [timelineZoom, store]);
  reactExports.useEffect(() => {
    const fn = (e) => {
      var _a;
      const tag = (_a = e.target) == null ? void 0 : _a.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        store.setIsPlaying(!isPlaying);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedClipId) {
          store.takeSnapshot();
          if (videoClips[selectedClipId]) store.removeVideoClip(selectedClipId);
          else if (audioClips[selectedClipId])
            store.removeAudioClip(selectedClipId);
        } else if (selectedTextId) {
          store.takeSnapshot();
          store.removeTextLayer(selectedTextId);
        }
      } else if (e.key === "d" || e.key === "D") {
        if (selectedClipId)
          ctxDuplicate(
            selectedClipId,
            videoClips[selectedClipId] ? "video" : "audio"
          );
      } else if (e.key === "q" || e.key === "Q") {
        if (selectedClipId) ctxSplit(selectedClipId);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        store.undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.shiftKey && e.key === "Z")) {
        e.preventDefault();
        store.redo();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        store.setCurrentTime(Math.max(0, currentTime - 1 / 30));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        store.setCurrentTime(Math.min(effDur, currentTime + 1 / 30));
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [
    isPlaying,
    selectedClipId,
    selectedTextId,
    currentTime,
    effDur,
    store,
    videoClips,
    audioClips,
    ctxDuplicate,
    ctxSplit
  ]);
  const ticks = reactExports.useMemo(() => {
    const step = timelineZoom >= 4 ? 1 : timelineZoom >= 2 ? 2 : 5;
    const arr = [];
    for (let t = 0; t <= effDur; t += step)
      arr.push({ t, major: t % 10 === 0 });
    return arr;
  }, [effDur, timelineZoom]);
  const playheadX = currentTime * pps;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full select-none text-xs",
      style: {
        background: "#070B14",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "Inter, sans-serif"
      },
      "data-ocid": "timeline",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-1.5 flex-shrink-0 border-b border-white/5",
            style: { background: "#0F172A" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white/35 uppercase tracking-widest", children: "Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-white/50", children: [
                fmtTime(currentTime),
                " / ",
                fmtTime(effDur)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-3.5 bg-white/10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(timelineZoom - 0.5),
                  className: "text-white/40 hover:text-white/80 transition-colors w-5 h-5 flex items-center justify-center",
                  "data-ocid": "timeline.zoom_out",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      "aria-label": "Zoom out",
                      role: "img",
                      width: "10",
                      height: "10",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2.5,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 12H4", strokeLinecap: "round" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 1,
                  max: 8,
                  step: 0.25,
                  value: timelineZoom,
                  onChange: (e) => setZoom(Number(e.target.value)),
                  className: "w-20 accent-blue-500",
                  "aria-label": "Timeline zoom",
                  "data-ocid": "timeline.zoom_slider"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setZoom(timelineZoom + 0.5),
                  className: "text-white/40 hover:text-white/80 transition-colors w-5 h-5 flex items-center justify-center",
                  "data-ocid": "timeline.zoom_in",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      "aria-label": "Zoom in",
                      role: "img",
                      width: "10",
                      height: "10",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2.5,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 4v16m8-8H4", strokeLinecap: "round" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-white/35 w-8", children: [
                timelineZoom.toFixed(1),
                "x"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: scrollRef,
            className: "flex-1 overflow-auto relative",
            style: { scrollbarColor: "rgba(255,255,255,0.1) transparent" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minWidth: LABEL_W + totalW + 40, position: "relative" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex sticky top-0 z-20 border-b border-white/5",
                    style: { background: "#0a0f1e" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex-shrink-0 border-r border-white/5",
                          style: { width: LABEL_W, background: "#0F172A" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          ref: rulerRef,
                          className: "relative flex-1 h-7 cursor-pointer",
                          style: { minWidth: totalW },
                          onClick: handleRulerClick,
                          onKeyDown: (e) => e.key === "Enter" && handleRulerClick(e),
                          "aria-label": "Seek timeline",
                          children: [
                            ticks.map(({ t, major }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "absolute top-0 flex flex-col items-start",
                                style: { left: t * pps },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      style: {
                                        width: 1,
                                        height: major ? 14 : 7,
                                        background: major ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.10)"
                                      }
                                    }
                                  ),
                                  major && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "text-[9px] font-mono absolute top-4 -translate-x-1/2",
                                      style: { color: "rgba(255,255,255,0.4)" },
                                      children: fmtTime(t)
                                    }
                                  ),
                                  !major && t % 1 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "text-[8px] font-mono absolute top-3 -translate-x-1/2",
                                      style: { color: "rgba(255,255,255,0.2)" },
                                      children: fmtTime(t)
                                    }
                                  )
                                ]
                              },
                              t
                            )),
                            duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "absolute top-0 z-10 cursor-ew-resize",
                                style: { left: playheadX, transform: "translateX(-50%)" },
                                onMouseDown: handlePlayheadMouseDown,
                                "data-ocid": "timeline.playhead_handle",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      style: {
                                        width: 0,
                                        height: 0,
                                        borderLeft: "5px solid transparent",
                                        borderRight: "5px solid transparent",
                                        borderTop: "8px solid #f87171",
                                        filter: "drop-shadow(0 0 4px rgba(248,113,113,0.9))"
                                      }
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      style: {
                                        width: 2,
                                        height: 12,
                                        background: "#f87171",
                                        margin: "0 auto"
                                      }
                                    }
                                  )
                                ]
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                ),
                trackOrder.map((tid, idx) => {
                  const track = tracks[tid];
                  if (!track) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TrackRow,
                    {
                      track,
                      clips: getTrackClips(track),
                      pps,
                      currentTime,
                      duration,
                      selectedClipId,
                      selectedTextId,
                      selectedCaptionId,
                      onClipMouseDown: handleClipMouseDown,
                      onLeftEdge: handleLeftEdge,
                      onRightEdge: handleRightEdge,
                      onClipClick: handleClipClick,
                      onClipContextMenu: handleClipContextMenu,
                      onTrackClick: handleTrackClick,
                      index: idx
                    },
                    tid
                  );
                }),
                duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-7 bottom-0 w-px pointer-events-none z-40",
                    style: {
                      left: LABEL_W + playheadX,
                      background: "#f87171",
                      boxShadow: "0 0 8px rgba(248,113,113,0.75)"
                    }
                  }
                ),
                snapGuide !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-7 bottom-0 w-px pointer-events-none z-35",
                    style: {
                      left: LABEL_W + snapGuide * pps,
                      background: "#fbbf24",
                      boxShadow: "0 0 6px rgba(251,191,36,0.6)"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-3 py-1.5 border-t border-white/5",
                  style: {
                    width: LABEL_W,
                    background: "#0F172A",
                    position: "sticky",
                    left: 0
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/25 uppercase tracking-wider", children: "+ Track" }),
                    ["video", "audio", "text"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-[9px] px-1.5 py-0.5 rounded border border-white/10 text-white/40 hover:text-white/75 hover:border-white/25 transition-all",
                        onClick: () => addTrack(t),
                        "data-ocid": `timeline.add_${t}_track`,
                        children: t[0].toUpperCase()
                      },
                      t
                    ))
                  ]
                }
              )
            ]
          }
        ),
        ctxMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "fixed inset-0 z-50",
              onClick: () => {
                setCtxMenu(null);
                setShowTransitionMenu(false);
              },
              onKeyDown: () => setCtxMenu(null),
              role: "presentation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "fixed z-[60] rounded-lg border border-white/10 shadow-2xl py-1 min-w-[176px]",
              style: { left: ctxMenu.x, top: ctxMenu.y, background: "#0F172A" },
              "data-ocid": "timeline.context_menu",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors",
                    onClick: () => {
                      ctxSplit(ctxMenu.clipId);
                      setCtxMenu(null);
                    },
                    "data-ocid": "timeline.ctx_split",
                    children: "✂ Split at Playhead"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors",
                    onClick: () => {
                      ctxDuplicate(ctxMenu.clipId, ctxMenu.clipType);
                      setCtxMenu(null);
                    },
                    "data-ocid": "timeline.ctx_duplicate",
                    children: "⧉ Duplicate"
                  }
                ),
                ctxMenu.clipType === "video" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between",
                      onClick: () => setShowTransitionMenu((v) => !v),
                      "data-ocid": "timeline.ctx_transition",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⟿ Transition" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25", children: "▶" })
                      ]
                    }
                  ),
                  showTransitionMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute left-full top-0 rounded-lg border border-white/10 shadow-2xl py-1 min-w-[140px]",
                      style: { background: "#0F172A" },
                      children: TRANSITION_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-full text-left px-3 py-1.5 text-white/65 hover:bg-white/5 hover:text-white transition-colors capitalize",
                          onClick: () => ctxTransition(ctxMenu.clipId, t),
                          "data-ocid": `timeline.ctx_transition_${t}`,
                          children: t
                        },
                        t
                      ))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-white/5 my-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-full text-left px-3 py-1.5 text-red-400 hover:bg-red-500/10 transition-colors",
                    onClick: () => {
                      ctxDelete(ctxMenu.clipId, ctxMenu.clipType);
                      setCtxMenu(null);
                    },
                    "data-ocid": "timeline.ctx_delete",
                    children: "🗑 Delete"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
const QUALITY_OPTIONS = [
  { id: "720p", label: "Low", dims: "1280×720", sizeMult: 1 },
  { id: "1080p", label: "Medium", dims: "1920×1080", sizeMult: 2.25 },
  { id: "2K", label: "High", dims: "2560×1440", sizeMult: 4 },
  { id: "4K", label: "Ultra", dims: "3840×2160", sizeMult: 9 }
];
const FPS_OPTIONS = [24, 30, 60];
const FORMAT_CARDS = [
  {
    id: "png",
    label: "PNG Frame",
    desc: "Export current frame",
    icon: Image
  },
  {
    id: "mp4",
    label: "MP4 Video",
    desc: "Full video export",
    icon: Film,
    simulated: true
  },
  { id: "gif", label: "GIF", desc: "Animated GIF", icon: Gift, simulated: true }
];
function estimateSizeMB(format, quality, duration) {
  const q = QUALITY_OPTIONS.find((q2) => q2.id === quality);
  const base = q.sizeMult;
  if (format === "png") return (base * 2.4).toFixed(1);
  if (format === "gif") return (base * 3.2 * Math.max(duration, 1)).toFixed(1);
  return (base * 8.5 * Math.max(duration, 1)).toFixed(1);
}
function estimateTimeSec(format, quality, duration) {
  const q = QUALITY_OPTIONS.find((q2) => q2.id === quality);
  if (format === "png") return "< 1";
  const secs = Math.ceil(q.sizeMult * Math.max(duration, 1) * 0.8);
  return secs < 60 ? `~${secs}s` : `~${Math.ceil(secs / 60)}m`;
}
function VideoEditorExportModal() {
  const store = useVideoEditorStore();
  const videoRef = reactExports.useRef(null);
  const editor = useVideoEditor(videoRef);
  const [format, setFormat] = reactExports.useState("mp4");
  const [quality, setQuality] = reactExports.useState("1080p");
  const [fps, setFps] = reactExports.useState(30);
  const [localProgress, setLocalProgress] = reactExports.useState(0);
  const [phase, setPhase] = reactExports.useState("idle");
  const [exportedFormat, setExportedFormat] = reactExports.useState("mp4");
  const isOpen = store.exportModalOpen;
  const storeProgress = store.exportProgress;
  const duration = store.duration;
  reactExports.useEffect(() => {
    if (storeProgress === null) return;
    if (storeProgress === 0 && phase === "idle") return;
    setLocalProgress(storeProgress);
    if (storeProgress >= 100) {
      const t = setTimeout(() => setPhase("done"), 400);
      return () => clearTimeout(t);
    }
  }, [storeProgress, phase]);
  const handleClose = () => {
    if (phase === "exporting") return;
    setPhase("idle");
    setLocalProgress(0);
    store.setExportProgress(null);
    store.setExportModalOpen(false);
  };
  const handleExport = () => {
    setExportedFormat(format);
    if (format === "png") {
      editor.exportFrame();
      setPhase("done");
      return;
    }
    setPhase("exporting");
    setLocalProgress(0);
    editor.startMockExport(format, quality);
  };
  const handleReset = () => {
    setPhase("idle");
    setLocalProgress(0);
    store.setExportProgress(null);
  };
  const sizeMB = estimateSizeMB(format, quality, duration);
  const timeEst = estimateTimeSec(format, quality, duration);
  const timeRemaining = phase === "exporting" && localProgress > 0 ? estimateTimeSec(format, quality, duration * (1 - localProgress / 100)) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
      style: {
        background: "rgba(0,0,0,0.70)",
        backdropFilter: "blur(14px)"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => {
        if (e.target === e.currentTarget) handleClose();
      },
      "data-ocid": "video-export-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-[480px] rounded-2xl overflow-hidden font-['Inter',sans-serif]",
          style: {
            background: "rgba(15,23,42,0.98)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 60px rgba(37,99,235,0.08)"
          },
          initial: { scale: 0.94, opacity: 0, y: 14 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.94, opacity: 0, y: 14 },
          transition: { type: "spring", damping: 24, stiffness: 300 },
          "data-ocid": "video-export-modal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-6 pt-5 pb-4",
                style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-bold text-white/90", children: "Export Video" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mt-0.5", children: store.projectName || "Untitled Project" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClose,
                      className: "w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/70 hover:bg-white/10 transition-all",
                      "data-ocid": "video-export.close_button",
                      "aria-label": "Close export modal",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                    }
                  )
                ]
              }
            ),
            phase === "done" ? (
              // ── Success state
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex flex-col items-center gap-4 px-6 py-8",
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { type: "spring", damping: 20, stiffness: 280 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "w-16 h-16 rounded-full flex items-center justify-center",
                        style: {
                          background: "rgba(34,197,94,0.12)",
                          border: "2px solid rgba(34,197,94,0.4)",
                          boxShadow: "0 0 24px rgba(34,197,94,0.2)"
                        },
                        initial: { scale: 0 },
                        animate: { scale: 1 },
                        transition: {
                          type: "spring",
                          damping: 16,
                          stiffness: 260,
                          delay: 0.1
                        },
                        "data-ocid": "video-export.success_state",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 28, className: "text-[#22C55E]" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[16px] font-bold text-white/90", children: "Export Complete!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-white/40 mt-1", children: [
                        exportedFormat.toUpperCase(),
                        " · ",
                        quality,
                        " ·",
                        " ",
                        fps,
                        "fps"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/25 mt-0.5", children: [
                        "Estimated size: ~",
                        sizeMB,
                        " MB"
                      ] })
                    ] }),
                    exportedFormat !== "png" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px]",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.5)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "text-[#22C55E]" }),
                          "File saved to Downloads (simulated)"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleClose,
                          className: "flex-1 h-10 rounded-xl text-[13px] text-white/60 hover:text-white/90 transition-all",
                          style: {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.08)"
                          },
                          "data-ocid": "video-export.close_button",
                          children: "Close"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleReset,
                          className: "flex-1 h-10 rounded-xl text-[13px] text-white font-semibold transition-all hover:opacity-90",
                          style: {
                            background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                            boxShadow: "0 4px 16px rgba(37,99,235,0.35)"
                          },
                          "data-ocid": "video-export.export-again",
                          children: "Export Another"
                        }
                      )
                    ] })
                  ]
                }
              )
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 space-y-5 pt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2", children: "Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: FORMAT_CARDS.map((f) => {
                  const Icon = f.icon;
                  const active = format === f.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setFormat(f.id),
                      className: "flex flex-col items-center gap-2 py-4 rounded-xl transition-all hover:scale-[1.03]",
                      style: {
                        background: active ? "rgba(37,99,235,0.14)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${active ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`
                      },
                      "data-ocid": `video-export.format-${f.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Icon,
                          {
                            size: 20,
                            style: {
                              color: active ? "#2563EB" : "rgba(255,255,255,0.4)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-[11px] font-bold",
                              style: {
                                color: active ? "#2563EB" : "rgba(255,255,255,0.75)"
                              },
                              children: f.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/30 mt-0.5", children: f.desc }),
                          f.simulated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-[8px] px-1.5 py-0.5 rounded mt-1 inline-block",
                              style: {
                                background: "rgba(245,158,11,0.15)",
                                color: "#f59e0b"
                              },
                              children: "simulated"
                            }
                          )
                        ] })
                      ]
                    },
                    f.id
                  );
                }) })
              ] }),
              format !== "png" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2", children: "Quality" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: QUALITY_OPTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setQuality(q.id),
                    className: "flex flex-col items-center gap-0.5 py-2.5 rounded-xl transition-all",
                    style: {
                      background: quality === q.id ? "rgba(37,99,235,0.14)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${quality === q.id ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                      color: quality === q.id ? "#2563EB" : "rgba(255,255,255,0.55)"
                    },
                    "data-ocid": `video-export.quality-${q.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold", children: q.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-60", children: q.dims })
                    ]
                  },
                  q.id
                )) })
              ] }),
              format !== "png" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2", children: "Frame Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: FPS_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFps(f),
                    className: "flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all",
                    style: {
                      background: fps === f ? "rgba(37,99,235,0.14)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${fps === f ? "rgba(37,99,235,0.5)" : "rgba(255,255,255,0.07)"}`,
                      color: fps === f ? "#2563EB" : "rgba(255,255,255,0.55)"
                    },
                    "data-ocid": `video-export.fps-${f}`,
                    children: [
                      f,
                      " fps"
                    ]
                  },
                  f
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-3 py-2.5 rounded-xl",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/60", children: [
                        "~",
                        sizeMB,
                        " MB · ",
                        timeEst,
                        " render"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-white/25 mt-0.5", children: [
                        format.toUpperCase(),
                        " ·",
                        " ",
                        format !== "png" ? `${quality} · ${fps}fps` : "current frame"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Download,
                      {
                        size: 15,
                        style: { color: "rgba(255,255,255,0.2)" }
                      }
                    )
                  ]
                }
              ),
              phase === "exporting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "video-export.loading_state", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-white/40 mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 11, className: "animate-spin" }),
                    "Rendering… ",
                    localProgress,
                    "%"
                  ] }),
                  timeRemaining && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    timeRemaining,
                    " left"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2 rounded-full overflow-hidden",
                    style: { background: "rgba(255,255,255,0.07)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-full rounded-full",
                        style: {
                          background: "linear-gradient(90deg, #2563EB, #22C55E)"
                        },
                        animate: { width: `${localProgress}%` },
                        transition: { duration: 0.25 }
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    disabled: phase === "exporting",
                    className: "flex-1 h-11 rounded-xl text-[13px] text-white/60 hover:text-white/90 transition-all disabled:opacity-40",
                    style: {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    "data-ocid": "video-export.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleExport,
                    disabled: phase === "exporting",
                    className: "flex-2 flex-1 h-11 rounded-xl text-[13px] text-white font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2",
                    style: {
                      background: "linear-gradient(135deg, #2563EB, #22C55E)",
                      boxShadow: "0 4px 20px rgba(37,99,235,0.4)"
                    },
                    "data-ocid": "video-export.confirm_button",
                    children: phase === "exporting" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin" }),
                      " ",
                      "Exporting…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
                      " Export ",
                      format.toUpperCase()
                    ] })
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function EditorPage() {
  const { projectId } = useParams({ from: "/editor/$projectId" });
  const { data: project } = useProject(projectId);
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  useVideoEditor(videoRef, audioRef);
  const store = useVideoEditorStore();
  reactExports.useEffect(() => {
    if (projectId && projectId !== "default") {
      store.loadProject(projectId);
    }
  }, [projectId, store.loadProject]);
  reactExports.useEffect(() => {
    if ((project == null ? void 0 : project.name) && store.projectName === "Untitled Project") {
      store.setProjectName(project.name);
    }
  }, [project == null ? void 0 : project.name, store.projectName, store]);
  const displayName = store.projectName || (project == null ? void 0 : project.name) || "Untitled Project";
  const handleSave = () => {
    store.setAutosaveStatus("saving");
    store.saveProject();
    setTimeout(() => store.setAutosaveStatus("saved"), 400);
    setTimeout(() => store.setAutosaveStatus("idle"), 2500);
    ue.success("Project saved", { duration: 2e3 });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-screen overflow-hidden select-none font-['Inter',sans-serif]",
      style: { background: "#070B14" },
      "data-ocid": "editor-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorTopBar,
          {
            projectName: displayName,
            onProjectNameChange: store.setProjectName,
            onUndo: store.undo,
            onRedo: store.redo,
            canUndo: store.undoStack.length > 0,
            canRedo: store.redoStack.length > 0,
            zoom: store.timelineZoom,
            onSave: handleSave,
            onExport: () => store.setExportModalOpen(true),
            hasSrc: Object.keys(store.videoClips).length > 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditorLeftSidebar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VideoMonitor, { videoRef, audioRef }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-shrink-0",
                style: {
                  height: 220,
                  borderTop: "1px solid rgba(255,255,255,0.05)"
                },
                "data-ocid": "editor-timeline-panel",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditorRightPanel, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(VideoEditorExportModal, {})
      ]
    }
  );
}
export {
  EditorPage
};
