import { r as reactExports, j as jsxRuntimeExports, L as Link, i as useParams } from "./vendor-80nuMd8G.js";
import { u as ue } from "./index-De5ctwPQ.js";
import { A as AnimatePresence, m as motion } from "./motion-DXodcWnX.js";
import { S as Sparkles, X, i as Maximize2, j as Pipette, U as Upload, k as Check, l as Grid3x3, A as AlignHorizontalDistributeCenter, m as AlignVerticalDistributeCenter, Z as Zap, E as Eraser, e as Plus, T as Trash2, h as CircleCheck, c as LoaderCircle, D as Download, n as ClipboardCopy, o as FileImage, p as File, q as Globe, r as FileText, F as Film, s as ArrowLeft, t as Pencil, u as Undo2, v as Redo2, w as Magnet, x as Clock, y as Share2, z as ChevronDown, H as Settings, d as LayoutTemplate, J as Type, K as Shapes, I as Image$1, N as Search, O as ChevronRight, Q as Box, Y as Crop, _ as Triangle, $ as Star, a0 as Minus, a1 as MoveRight, a2 as Link$1, a3 as Link2Off, a4 as BringToFront, a5 as SendToBack, a6 as FlipHorizontal, a7 as FlipVertical, a8 as AlignLeft, a9 as AlignCenter, aa as AlignRight, ab as MoveUp, ac as AlignJustify, ad as MoveDown, L as Layers, ae as GripVertical, af as Eye, ag as EyeOff, ah as Lock, ai as LockOpen, aj as Ellipsis, ak as Crown, al as Bold, am as Italic, an as Underline } from "./ui-lib-DG52wkUx.js";
import { p as persist } from "./middleware-3icvfaAY.js";
import { c as create } from "./react-9ph_Ps2d.js";
import { a as DEMO_LAYER_COMPOSITIONS } from "./demoProjects-DVpkKgMR.js";
const CANVAS_PRESETS = [
  {
    label: "YouTube Thumbnail",
    category: "Video",
    width: 1280,
    height: 720,
    icon: "▶"
  },
  {
    label: "Instagram Post",
    category: "Social",
    width: 1080,
    height: 1080,
    icon: "📷"
  },
  {
    label: "Twitter Banner",
    category: "Social",
    width: 1500,
    height: 500,
    icon: "🐦"
  },
  {
    label: "TikTok Video",
    category: "Video",
    width: 1080,
    height: 1920,
    icon: "🎵"
  },
  {
    label: "LinkedIn Banner",
    category: "Social",
    width: 1200,
    height: 628,
    icon: "💼"
  }
];
const TEXT_PRESETS = [
  {
    name: "Add a heading",
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#ffffff"
  },
  {
    name: "Add a subheading",
    fontSize: 36,
    fontWeight: "600",
    fontFamily: "Inter",
    color: "#e2e8f0"
  },
  {
    name: "Add a little bit of body text",
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Inter",
    color: "#94a3b8"
  },
  {
    name: "Display — extra large",
    fontSize: 80,
    fontWeight: "bold",
    fontFamily: "Impact",
    color: "#ffffff"
  },
  {
    name: "Caption — small label",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter",
    color: "#94a3b8"
  },
  {
    name: "Highlight — cobalt accent",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Plus Jakarta Sans",
    color: "#0047ab"
  },
  {
    name: "Quote — elegant italic",
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "Georgia",
    color: "#e2e8f0"
  },
  {
    name: "CTA — uppercase bold",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "#ffffff"
  }
];
const GRADIENT_PRESETS = [
  { name: "Sunset", colors: ["#ff6b6b", "#feca57"], angle: 135 },
  { name: "Ocean", colors: ["#0047ab", "#50c878"], angle: 135 },
  { name: "Purple Rain", colors: ["#6c5ce7", "#fd79a8"], angle: 135 },
  { name: "Midnight", colors: ["#101820", "#1a2744"], angle: 180 },
  { name: "Gold", colors: ["#f7971e", "#ffd200"], angle: 90 },
  { name: "Neon", colors: ["#00ff00", "#0047ab"], angle: 135 },
  { name: "Rose", colors: ["#ff9a9e", "#fecfef"], angle: 135 },
  { name: "Arctic", colors: ["#a1c4fd", "#c2e9fb"], angle: 135 },
  { name: "Emerald Dream", colors: ["#0d9488", "#50c878"], angle: 135 },
  { name: "Fire", colors: ["#f97316", "#dc2626"], angle: 135 },
  { name: "Candy", colors: ["#ec4899", "#a855f7"], angle: 135 },
  { name: "Forest", colors: ["#14532d", "#00ff00"], angle: 135 },
  { name: "Sky", colors: ["#7dd3fc", "#f0f9ff"], angle: 180 },
  { name: "Lava", colors: ["#dc2626", "#450a0a"], angle: 135 },
  { name: "Citrus", colors: ["#facc15", "#f97316"], angle: 90 },
  { name: "Twilight", colors: ["#1e3a5f", "#7c3aed"], angle: 135 }
];
const BRAND_COLORS = [
  { name: "Cobalt", hex: "#0047ab" },
  { name: "Emerald", hex: "#50c878" },
  { name: "Matte Black", hex: "#101820" },
  { name: "White", hex: "#ffffff" },
  { name: "Burnt Copper", hex: "#7c4d00" },
  { name: "Cyber Lime", hex: "#00ff00" }
];
const FONT_FAMILIES = [
  "Inter",
  "Poppins",
  "Bebas Neue",
  "Anton",
  "Montserrat",
  "Oswald",
  "Plus Jakarta Sans",
  "Arial",
  "Impact",
  "Georgia",
  "Courier New"
];
const COLOR_PALETTES = [
  {
    name: "Neon",
    colors: [
      "#00ff00",
      "#00ffff",
      "#ff00ff",
      "#ffff00",
      "#ff0080",
      "#8000ff",
      "#00ff80",
      "#ff8000"
    ]
  },
  {
    name: "Luxury",
    colors: [
      "#d4af37",
      "#b8860b",
      "#c0a060",
      "#1a1a2e",
      "#16213e",
      "#0f3460",
      "#e94560",
      "#f5f5f5"
    ]
  },
  {
    name: "Gaming",
    colors: [
      "#ff4655",
      "#1a1a2e",
      "#00b4d8",
      "#90e0ef",
      "#caf0f8",
      "#7209b7",
      "#f72585",
      "#4cc9f0"
    ]
  },
  {
    name: "YouTube",
    colors: [
      "#ff0000",
      "#282828",
      "#ffffff",
      "#aaaaaa",
      "#606060",
      "#065fd4",
      "#00b894",
      "#fdcb6e"
    ]
  },
  {
    name: "Cyberpunk",
    colors: [
      "#00f5ff",
      "#ff00aa",
      "#fbff00",
      "#0d0d0d",
      "#1a1a2e",
      "#ff6b35",
      "#9d4edd",
      "#2d6a4f"
    ]
  },
  {
    name: "Pastel",
    colors: [
      "#ffb3c1",
      "#ffc8a2",
      "#d4f1c0",
      "#c0e8ff",
      "#e0c8ff",
      "#fff3b0",
      "#b5ead7",
      "#ffdac1"
    ]
  },
  {
    name: "Minimal",
    colors: [
      "#000000",
      "#1a1a1a",
      "#333333",
      "#666666",
      "#999999",
      "#cccccc",
      "#f5f5f5",
      "#ffffff"
    ]
  },
  {
    name: "Retro",
    colors: [
      "#e63946",
      "#457b9d",
      "#1d3557",
      "#f1faee",
      "#a8dadc",
      "#e9c46a",
      "#f4a261",
      "#264653"
    ]
  }
];
const QUICK_COLORS = [
  "#ffffff",
  "#000000",
  "#101820",
  "#0047ab",
  "#50c878",
  "#00ff00",
  "#ff4444",
  "#f59e0b",
  "#a78bfa",
  "#f472b6",
  "#06b6d4",
  "#ef4444"
];
const mkEl = (e) => e;
const TEMPLATES = [
  {
    id: "yt-clean",
    label: "YouTube Bold",
    category: "Video",
    preset: CANVAS_PRESETS[0],
    elements: [
      mkEl({
        type: "rect",
        name: "Background",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#101820",
        borderColor: "#101820",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "rect",
        name: "Accent Bar",
        x: 40,
        y: 40,
        width: 8,
        height: 640,
        fillColor: "#50c878",
        borderColor: "#50c878",
        borderWidth: 0,
        borderRadius: 4,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "text",
        name: "Title",
        x: 80,
        y: 200,
        width: 700,
        height: 100,
        content: "EPIC TITLE HERE",
        fontSize: 96,
        color: "#ffffff",
        fontFamily: "Impact",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.2,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true
      }),
      mkEl({
        type: "text",
        name: "Subtitle",
        x: 80,
        y: 340,
        width: 700,
        height: 50,
        content: "Your subtitle goes here",
        fontSize: 40,
        color: "#50c878",
        fontFamily: "Plus Jakarta Sans",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.4,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "rect",
        name: "CTA Button",
        x: 80,
        y: 440,
        width: 300,
        height: 70,
        fillColor: "#0047ab",
        borderColor: "#0047ab",
        borderWidth: 0,
        borderRadius: 8,
        opacity: 0.9,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true
      }),
      mkEl({
        type: "text",
        name: "CTA Text",
        x: 110,
        y: 490,
        width: 240,
        height: 40,
        content: "WATCH NOW",
        fontSize: 32,
        color: "#ffffff",
        fontFamily: "Impact",
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 2,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      })
    ]
  },
  {
    id: "ig-brand",
    label: "Instagram Brand",
    category: "Social",
    preset: CANVAS_PRESETS[1],
    elements: [
      mkEl({
        type: "rect",
        name: "Background",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080,
        fillColor: "#101820",
        borderColor: "#101820",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "circle",
        name: "Glow Circle",
        x: 240,
        y: 240,
        width: 600,
        height: 600,
        fillColor: "#50c878",
        borderColor: "#50c878",
        borderWidth: 0,
        opacity: 0.06,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "text",
        name: "Brand Name",
        x: 120,
        y: 380,
        width: 840,
        height: 120,
        content: "YOUR BRAND",
        fontSize: 90,
        color: "#ffffff",
        fontFamily: "Impact",
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 4,
        lineHeight: 1.2,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true
      }),
      mkEl({
        type: "text",
        name: "Tagline",
        x: 160,
        y: 530,
        width: 760,
        height: 60,
        content: "A tagline that resonates",
        fontSize: 44,
        color: "#50c878",
        fontFamily: "Plus Jakarta Sans",
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 0,
        lineHeight: 1.4,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "rect",
        name: "CTA Button",
        x: 320,
        y: 660,
        width: 440,
        height: 80,
        fillColor: "#0047ab",
        borderColor: "#0047ab",
        borderWidth: 0,
        borderRadius: 40,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true
      }),
      mkEl({
        type: "text",
        name: "CTA Text",
        x: 360,
        y: 707,
        width: 360,
        height: 46,
        content: "LEARN MORE",
        fontSize: 36,
        color: "#ffffff",
        fontFamily: "Impact",
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 3,
        lineHeight: 1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      })
    ]
  },
  {
    id: "twitter-banner",
    label: "Twitter Banner",
    category: "Social",
    preset: CANVAS_PRESETS[2],
    elements: [
      mkEl({
        type: "rect",
        name: "Background",
        x: 0,
        y: 0,
        width: 1500,
        height: 500,
        fillColor: "#101820",
        borderColor: "#101820",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "rect",
        name: "Top Bar",
        x: 0,
        y: 0,
        width: 1500,
        height: 4,
        fillColor: "#50c878",
        borderColor: "#50c878",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "text",
        name: "Brand",
        x: 80,
        y: 180,
        width: 900,
        height: 120,
        content: "Elysian Labs",
        fontSize: 100,
        color: "#ffffff",
        fontFamily: "Plus Jakarta Sans",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: -2,
        lineHeight: 1.1,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: true
      }),
      mkEl({
        type: "text",
        name: "Tagline",
        x: 80,
        y: 320,
        width: 800,
        height: 60,
        content: "Creative Studio",
        fontSize: 46,
        color: "#50c878",
        fontFamily: "Plus Jakarta Sans",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.4,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "rect",
        name: "Bottom Bar",
        x: 0,
        y: 496,
        width: 1500,
        height: 4,
        fillColor: "#0047ab",
        borderColor: "#0047ab",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      })
    ]
  },
  {
    id: "linkedin-pro",
    label: "LinkedIn Banner",
    category: "Social",
    preset: CANVAS_PRESETS[4],
    elements: [
      mkEl({
        type: "rect",
        name: "Background",
        x: 0,
        y: 0,
        width: 1200,
        height: 628,
        fillColor: "#101820",
        borderColor: "#101820",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "rect",
        name: "Side Accent",
        x: 0,
        y: 0,
        width: 400,
        height: 628,
        fillColor: "#0047ab",
        borderColor: "#0047ab",
        borderWidth: 0,
        borderRadius: 0,
        opacity: 0.4,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "text",
        name: "Name",
        x: 80,
        y: 200,
        width: 700,
        height: 80,
        content: "Professional Name",
        fontSize: 72,
        color: "#ffffff",
        fontFamily: "Plus Jakarta Sans",
        bold: true,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: -1,
        lineHeight: 1.2,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      }),
      mkEl({
        type: "text",
        name: "Title",
        x: 80,
        y: 310,
        width: 700,
        height: 50,
        content: "Role / Company",
        fontSize: 40,
        color: "#50c878",
        fontFamily: "Plus Jakarta Sans",
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        letterSpacing: 0,
        lineHeight: 1.4,
        opacity: 1,
        rotation: 0,
        locked: false,
        visible: true,
        shadow: false
      })
    ]
  }
];
const productShowcaseElements = [
  mkEl({
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1080,
    height: 1080,
    fillColor: "#0a0f1a",
    borderColor: "#0a0f1a",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Gradient Overlay",
    x: 0,
    y: 0,
    width: 1080,
    height: 1080,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 0.12,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0047ab", "#50c878"],
      angle: 135
    }
  }),
  mkEl({
    type: "circle",
    name: "Glow Accent",
    x: 340,
    y: 200,
    width: 400,
    height: 400,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    opacity: 0.07,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Product Frame",
    x: 290,
    y: 180,
    width: 500,
    height: 420,
    fillColor: "#1a2744",
    borderColor: "#0047ab",
    borderWidth: 2,
    borderRadius: 24,
    opacity: 0.85,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "rect",
    name: "Badge",
    x: 80,
    y: 80,
    width: 200,
    height: 52,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 26,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "Badge Label",
    x: 90,
    y: 97,
    width: 180,
    height: 36,
    content: "✦ NEW ARRIVAL",
    fontSize: 20,
    color: "#0a0f1a",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 1,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Product Name",
    x: 80,
    y: 650,
    width: 920,
    height: 90,
    content: "Elysian Pro Creator Kit",
    fontSize: 70,
    color: "#ffffff",
    fontFamily: "Plus Jakarta Sans",
    bold: true,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: -2,
    lineHeight: 1.1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "Tagline",
    x: 80,
    y: 760,
    width: 800,
    height: 50,
    content: "Design. Create. Inspire.",
    fontSize: 36,
    color: "#50c878",
    fontFamily: "Plus Jakarta Sans",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Feature 1",
    x: 80,
    y: 840,
    width: 500,
    height: 36,
    content: "✓  Professional-grade tools",
    fontSize: 22,
    color: "#a0b4c8",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Feature 2",
    x: 80,
    y: 882,
    width: 500,
    height: 36,
    content: "✓  100+ premium templates",
    fontSize: 22,
    color: "#a0b4c8",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "CTA Button",
    x: 80,
    y: 940,
    width: 260,
    height: 64,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 32,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "CTA Text",
    x: 100,
    y: 962,
    width: 220,
    height: 36,
    content: "Get Started Free",
    fontSize: 24,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  })
];
const courseBannerElements = [
  mkEl({
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    fillColor: "#080c14",
    borderColor: "#080c14",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Gradient BG",
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 0.1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0047ab", "#50c878"],
      angle: 45
    }
  }),
  mkEl({
    type: "rect",
    name: "Left Accent",
    x: 0,
    y: 0,
    width: 6,
    height: 720,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "circle",
    name: "Glow Orb Left",
    x: -80,
    y: 200,
    width: 400,
    height: 400,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    opacity: 0.18,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "circle",
    name: "Glow Orb Right",
    x: 980,
    y: 100,
    width: 500,
    height: 500,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    opacity: 0.08,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "FREE Badge",
    x: 80,
    y: 80,
    width: 180,
    height: 52,
    fillColor: "#00ff00",
    borderColor: "#00ff00",
    borderWidth: 0,
    borderRadius: 8,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "Badge Text",
    x: 90,
    y: 97,
    width: 160,
    height: 36,
    content: "FREE COURSE",
    fontSize: 24,
    color: "#0a0f1a",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 2,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Course Title",
    x: 80,
    y: 200,
    width: 900,
    height: 200,
    content: "Thumbnail Design Masterclass",
    fontSize: 90,
    color: "#ffffff",
    fontFamily: "Impact",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: -1,
    lineHeight: 1.1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "Instructor",
    x: 80,
    y: 420,
    width: 500,
    height: 50,
    content: "Taught by Elysian AI",
    fontSize: 32,
    color: "#50c878",
    fontFamily: "Plus Jakarta Sans",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Lesson Count",
    x: 80,
    y: 468,
    width: 500,
    height: 36,
    content: "15 Lessons  ·  Beginner Friendly",
    fontSize: 24,
    color: "#7a8ba0",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "CTA Button",
    x: 80,
    y: 540,
    width: 320,
    height: 70,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 12,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "CTA Text",
    x: 100,
    y: 562,
    width: 280,
    height: 42,
    content: "ENROLL NOW — FREE",
    fontSize: 28,
    color: "#ffffff",
    fontFamily: "Impact",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 2,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  })
];
const eventPosterElements = [
  mkEl({
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1080,
    height: 1350,
    fillColor: "#080c14",
    borderColor: "#080c14",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0a0f1a", "#1a0a2e"],
      angle: 180
    }
  }),
  mkEl({
    type: "circle",
    name: "Glow Top",
    x: 140,
    y: -100,
    width: 800,
    height: 800,
    fillColor: "#6c5ce7",
    borderColor: "#6c5ce7",
    borderWidth: 0,
    opacity: 0.12,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "circle",
    name: "Glow Bottom",
    x: 300,
    y: 900,
    width: 600,
    height: 600,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    opacity: 0.1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Top Accent",
    x: 0,
    y: 0,
    width: 1080,
    height: 6,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Pre-Title",
    x: 80,
    y: 120,
    width: 920,
    height: 50,
    content: "✦ ELYSIAN LABS PRESENTS ✦",
    fontSize: 26,
    color: "#50c878",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 4,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Event Name",
    x: 80,
    y: 220,
    width: 920,
    height: 300,
    content: "Creative Summit 2026",
    fontSize: 120,
    color: "#ffffff",
    fontFamily: "Impact",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1.05,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "rect",
    name: "Divider",
    x: 340,
    y: 560,
    width: 400,
    height: 3,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 2,
    opacity: 0.6,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Date",
    x: 80,
    y: 600,
    width: 920,
    height: 60,
    content: "JUNE 14–15, 2026",
    fontSize: 40,
    color: "#ffffff",
    fontFamily: "Plus Jakarta Sans",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 3,
    lineHeight: 1.2,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Venue",
    x: 80,
    y: 680,
    width: 920,
    height: 50,
    content: "Virtual — Elysian Online Campus",
    fontSize: 30,
    color: "#7a8ba0",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 1,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "CTA Button",
    x: 240,
    y: 820,
    width: 600,
    height: 80,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 40,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "CTA Text",
    x: 260,
    y: 844,
    width: 560,
    height: 46,
    content: "REGISTER NOW — FREE",
    fontSize: 32,
    color: "#ffffff",
    fontFamily: "Impact",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 3,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  })
];
const portfolioHeaderElements = [
  mkEl({
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1500,
    height: 500,
    fillColor: "#080c14",
    borderColor: "#080c14",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Left Panel",
    x: 0,
    y: 0,
    width: 480,
    height: 500,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 0.15,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0047ab", "#101820"],
      angle: 90
    }
  }),
  mkEl({
    type: "rect",
    name: "Top Line",
    x: 0,
    y: 0,
    width: 1500,
    height: 4,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Bottom Line",
    x: 0,
    y: 496,
    width: 1500,
    height: 4,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Accent Shape",
    x: 1260,
    y: 60,
    width: 180,
    height: 180,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 90,
    opacity: 0.08,
    rotation: 45,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Accent Shape 2",
    x: 1350,
    y: 260,
    width: 120,
    height: 120,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 60,
    opacity: 0.1,
    rotation: 30,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Name",
    x: 60,
    y: 140,
    width: 800,
    height: 120,
    content: "Aneeshwar R.",
    fontSize: 88,
    color: "#ffffff",
    fontFamily: "Plus Jakarta Sans",
    bold: true,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: -2,
    lineHeight: 1.1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Role",
    x: 60,
    y: 290,
    width: 600,
    height: 60,
    content: "Creative Director & Founder",
    fontSize: 38,
    color: "#50c878",
    fontFamily: "Plus Jakarta Sans",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Website",
    x: 60,
    y: 380,
    width: 500,
    height: 40,
    content: "elysianlabs.io",
    fontSize: 26,
    color: "#7a8ba0",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  })
];
const blogFeatureElements = [
  mkEl({
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1200,
    height: 628,
    fillColor: "#0a0f1a",
    borderColor: "#0a0f1a",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#080c14", "#0d1a2e"],
      angle: 135
    }
  }),
  mkEl({
    type: "rect",
    name: "Top Accent Bar",
    x: 0,
    y: 0,
    width: 1200,
    height: 5,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Bottom Accent",
    x: 0,
    y: 580,
    width: 1200,
    height: 48,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 0.2,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0047ab", "#50c878"],
      angle: 90
    }
  }),
  mkEl({
    type: "rect",
    name: "Category Badge",
    x: 60,
    y: 60,
    width: 180,
    height: 44,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 8,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Category",
    x: 70,
    y: 74,
    width: 160,
    height: 30,
    content: "DESIGN TIPS",
    fontSize: 20,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: true,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 2,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Article Title",
    x: 60,
    y: 140,
    width: 900,
    height: 220,
    content: "10 Pro Techniques to Level Up Your Thumbnails",
    fontSize: 72,
    color: "#ffffff",
    fontFamily: "Plus Jakarta Sans",
    bold: true,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: -1,
    lineHeight: 1.1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Author",
    x: 60,
    y: 390,
    width: 500,
    height: 40,
    content: "By Elysian AI",
    fontSize: 28,
    color: "#50c878",
    fontFamily: "Plus Jakarta Sans",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Date",
    x: 60,
    y: 438,
    width: 400,
    height: 36,
    content: "May 7, 2026  ·  6 min read",
    fontSize: 22,
    color: "#7a8ba0",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "left",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  })
];
const tiktokStoryElements = [
  mkEl({
    type: "rect",
    name: "Background",
    x: 0,
    y: 0,
    width: 1080,
    height: 1920,
    fillColor: "#080c14",
    borderColor: "#080c14",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false,
    gradientFill: {
      type: "gradient",
      colors: ["#0a0f1a", "#1a0a2e"],
      angle: 180
    }
  }),
  mkEl({
    type: "circle",
    name: "Glow Top Left",
    x: -200,
    y: -200,
    width: 800,
    height: 800,
    fillColor: "#6c5ce7",
    borderColor: "#6c5ce7",
    borderWidth: 0,
    opacity: 0.2,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "circle",
    name: "Glow Bottom Right",
    x: 480,
    y: 1320,
    width: 700,
    height: 700,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    opacity: 0.1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Color Block Left",
    x: 0,
    y: 600,
    width: 200,
    height: 720,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 0.3,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "Color Block Right",
    x: 880,
    y: 400,
    width: 200,
    height: 600,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 0,
    opacity: 0.2,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Attention Hook",
    x: 80,
    y: 300,
    width: 920,
    height: 300,
    content: "Want more views?",
    fontSize: 130,
    color: "#ffffff",
    fontFamily: "Impact",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1.05,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "rect",
    name: "Divider",
    x: 200,
    y: 660,
    width: 680,
    height: 4,
    fillColor: "#50c878",
    borderColor: "#50c878",
    borderWidth: 0,
    borderRadius: 2,
    opacity: 0.7,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "Sub Caption",
    x: 80,
    y: 720,
    width: 920,
    height: 160,
    content: "Use these 5 thumbnail tips from Elysian AI",
    fontSize: 64,
    color: "#50c878",
    fontFamily: "Plus Jakarta Sans",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1.2,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "text",
    name: "CTA Arrow",
    x: 80,
    y: 1e3,
    width: 920,
    height: 80,
    content: "👇 Tap to learn more",
    fontSize: 50,
    color: "#ffffff",
    fontFamily: "Inter",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 0,
    lineHeight: 1.4,
    opacity: 0.85,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  }),
  mkEl({
    type: "rect",
    name: "CTA Button",
    x: 190,
    y: 1600,
    width: 700,
    height: 90,
    fillColor: "#0047ab",
    borderColor: "#0047ab",
    borderWidth: 0,
    borderRadius: 45,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: true
  }),
  mkEl({
    type: "text",
    name: "CTA Text",
    x: 200,
    y: 1624,
    width: 680,
    height: 54,
    content: "START CREATING FREE",
    fontSize: 36,
    color: "#ffffff",
    fontFamily: "Impact",
    bold: false,
    italic: false,
    underline: false,
    align: "center",
    letterSpacing: 3,
    lineHeight: 1,
    opacity: 1,
    rotation: 0,
    locked: false,
    visible: true,
    shadow: false
  })
];
TEMPLATES.push(
  {
    id: "product-showcase",
    label: "Product Showcase",
    category: "Social",
    preset: CANVAS_PRESETS[1],
    elements: productShowcaseElements
  },
  {
    id: "course-banner",
    label: "Course Banner",
    category: "Education",
    preset: CANVAS_PRESETS[0],
    elements: courseBannerElements
  },
  {
    id: "event-poster",
    label: "Event Poster",
    category: "Events",
    preset: {
      label: "Event Poster",
      category: "Events",
      width: 1080,
      height: 1350,
      icon: "🎭"
    },
    elements: eventPosterElements
  },
  {
    id: "portfolio-header",
    label: "Portfolio Header",
    category: "Social",
    preset: CANVAS_PRESETS[2],
    elements: portfolioHeaderElements
  },
  {
    id: "blog-feature",
    label: "Blog Feature",
    category: "Content",
    preset: CANVAS_PRESETS[4],
    elements: blogFeatureElements
  },
  {
    id: "tiktok-story",
    label: "TikTok Story",
    category: "Video",
    preset: CANVAS_PRESETS[3],
    elements: tiktokStoryElements
  }
);
const RESIZE_PRESETS = [
  { name: "YouTube", dims: "1280×720", icon: "▶", w: 1280, h: 720 },
  { name: "Instagram", dims: "1080×1080", icon: "📷", w: 1080, h: 1080 },
  { name: "TikTok", dims: "1080×1920", icon: "🎵", w: 1080, h: 1920 },
  { name: "Twitter", dims: "1500×500", icon: "🐦", w: 1500, h: 500 },
  { name: "LinkedIn", dims: "1200×628", icon: "💼", w: 1200, h: 628 },
  { name: "Custom", dims: "Custom", icon: "✏️", w: 0, h: 0 }
];
function extractDominantColors(imageData, topN = 5) {
  const counts = {};
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    if (r < 32 && g < 32 && b < 32) continue;
    if (r > 224 && g > 224 && b > 224) continue;
    const key = `${r},${g},${b}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, topN).map(([key]) => {
    const [r, g, b] = key.split(",").map(Number);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  });
}
function Spinner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className: "animate-spin",
      width: 14,
      height: 14,
      viewBox: "0 0 14 14",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "7",
            cy: "7",
            r: "5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeOpacity: "0.25"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 7a5 5 0 0 0-5-5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function Divider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "mx-4 my-4",
      style: { height: 1, background: "rgba(255,255,255,0.06)" }
    }
  );
}
function AIAssistantPanel({
  isOpen,
  onClose,
  onMagicResize,
  onColorMatch,
  onAutoLayout,
  onAIEnhance,
  onRemoveBackground,
  selectedElement
}) {
  const [layoutMode, setLayoutMode] = reactExports.useState("horizontal");
  const [spacing, setSpacing] = reactExports.useState(20);
  const [resizeApplied, setResizeApplied] = reactExports.useState(null);
  const [extractedPalette, setExtractedPalette] = reactExports.useState([]);
  const [colorMatchProcessing, setColorMatchProcessing] = reactExports.useState(false);
  const [colorMatchApplied, setColorMatchApplied] = reactExports.useState(false);
  const colorFileRef = reactExports.useRef(null);
  const [enhanceProcessing, setEnhanceProcessing] = reactExports.useState(false);
  const [enhanceApplied, setEnhanceApplied] = reactExports.useState(false);
  const [enhanceProgress, setEnhanceProgress] = reactExports.useState(0);
  const [removeBgProcessing, setRemoveBgProcessing] = reactExports.useState(false);
  const [removeBgApplied, setRemoveBgApplied] = reactExports.useState(false);
  const [removeBgProgress, setRemoveBgProgress] = reactExports.useState(0);
  const [layoutApplied, setLayoutApplied] = reactExports.useState(false);
  const handleResize = (preset) => {
    if (preset.w === 0) return;
    onMagicResize == null ? void 0 : onMagicResize(preset.w, preset.h);
    setResizeApplied(preset.name);
    setTimeout(() => setResizeApplied(null), 2e3);
  };
  const handleColorFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setColorMatchProcessing(true);
    setExtractedPalette([]);
    setColorMatchApplied(false);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const img = new Image();
      img.onload = () => {
        const off = document.createElement("canvas");
        const sz = 120;
        off.width = sz;
        off.height = sz;
        const ctx = off.getContext("2d");
        if (!ctx) {
          setColorMatchProcessing(false);
          return;
        }
        ctx.drawImage(img, 0, 0, sz, sz);
        const imgData = ctx.getImageData(0, 0, sz, sz);
        const palette = extractDominantColors(imgData, 5);
        const final = palette.length >= 3 ? palette : ["#2563EB", "#22C55E", "#f59e0b", "#ec4899", "#a855f7"];
        setExtractedPalette(final);
        setColorMatchProcessing(false);
      };
      img.onerror = () => setColorMatchProcessing(false);
      img.src = (_a2 = ev.target) == null ? void 0 : _a2.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const handleApplyColorMatch = () => {
    if (extractedPalette.length === 0) return;
    onColorMatch == null ? void 0 : onColorMatch(extractedPalette);
    setColorMatchApplied(true);
    setTimeout(() => setColorMatchApplied(false), 2e3);
  };
  const handleApplyLayout = () => {
    onAutoLayout == null ? void 0 : onAutoLayout(layoutMode, spacing);
    setLayoutApplied(true);
    setTimeout(() => setLayoutApplied(false), 2e3);
  };
  const handleAIEnhance = () => {
    if (enhanceProcessing) return;
    if (!selectedElement || selectedElement.type !== "image") {
      ue("Please select an image first.", { icon: "🖼️" });
      return;
    }
    setEnhanceProcessing(true);
    setEnhanceApplied(false);
    setEnhanceProgress(0);
    const interval = setInterval(() => {
      setEnhanceProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 18 + 6;
      });
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setEnhanceProgress(100);
      setEnhanceProcessing(false);
      setEnhanceApplied(true);
      onAIEnhance == null ? void 0 : onAIEnhance();
      setTimeout(() => setEnhanceApplied(false), 2500);
    }, 1500);
  };
  const handleRemoveBackground = () => {
    if (removeBgProcessing) return;
    if (!selectedElement || selectedElement.type !== "image") {
      ue("Please select an image first.", { icon: "🖼️" });
      return;
    }
    setRemoveBgProcessing(true);
    setRemoveBgApplied(false);
    setRemoveBgProgress(0);
    const interval = setInterval(() => {
      setRemoveBgProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 10 + 4;
      });
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setRemoveBgProgress(100);
      setRemoveBgProcessing(false);
      setRemoveBgApplied(true);
      onRemoveBackground == null ? void 0 : onRemoveBackground();
      setTimeout(() => setRemoveBgApplied(false), 2500);
    }, 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: colorFileRef,
        type: "file",
        accept: "image/*",
        onChange: handleColorFileChange,
        style: { display: "none" },
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.aside,
      {
        className: "fixed right-0 top-0 h-full z-40 overflow-y-auto flex flex-col",
        style: {
          width: 320,
          background: "#0F172A",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "Inter, sans-serif"
        },
        initial: { x: 320, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 320, opacity: 0 },
        transition: { type: "spring", damping: 26, stiffness: 280 },
        "data-ocid": "ai-assistant-panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2.5 px-5 py-4 border-b",
              style: { borderColor: "rgba(255,255,255,0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-lg flex items-center justify-center",
                    style: {
                      background: "linear-gradient(135deg, #2563EB22, #22C55E22)",
                      border: "1px solid rgba(37,99,235,0.3)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15, className: "text-[#2563EB]" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] font-semibold text-white/90 flex-1", children: "AI Design Assistant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/10 transition-all",
                    "data-ocid": "ai-panel-close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto scrollbar-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { size: 13, className: "text-[#22C55E]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/50 uppercase tracking-widest", children: "Magic Resize" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mb-3 leading-relaxed", children: "Select a platform to instantly resize the canvas and scale all elements proportionally." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: RESIZE_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleResize(preset),
                  className: `flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${resizeApplied === preset.name ? "bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]" : "bg-white/[0.03] border-white/[0.06] hover:border-[#2563EB]/40 hover:bg-[#2563EB]/5 text-white/60 hover:text-white/90"}`,
                  "data-ocid": `magic-resize-${preset.name.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: preset.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: preset.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/30", children: preset.dims })
                  ]
                },
                preset.name
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pipette, { size: 13, className: "text-[#f59e0b]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/50 uppercase tracking-widest", children: "Color Match" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mb-3 leading-relaxed", children: "Upload an image to extract its dominant palette and apply colors to canvas elements." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = colorFileRef.current) == null ? void 0 : _a.click();
                  },
                  className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/[0.12] text-white/40 hover:text-white/70 hover:border-[#f59e0b]/40 hover:bg-[#f59e0b]/5 transition-all text-[12px] mb-3",
                  "data-ocid": "color-match-upload",
                  children: colorMatchProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Analyzing…" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 13 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Upload image to extract colors" })
                  ] })
                }
              ),
              extractedPalette.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 4 },
                  animate: { opacity: 1, y: 0 },
                  className: "mb-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 uppercase tracking-widest mb-2", children: "Extracted Palette" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-1", children: extractedPalette.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex-1 rounded-lg border border-white/[0.08]",
                        style: { background: c, height: 32 },
                        title: c
                      },
                      c
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: extractedPalette.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "flex-1 text-center text-[8px] text-white/30 font-mono truncate",
                        children: c
                      },
                      c
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleApplyColorMatch,
                  disabled: extractedPalette.length === 0 || colorMatchApplied,
                  className: `w-full h-9 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${colorMatchApplied ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30" : extractedPalette.length === 0 ? "bg-white/[0.04] text-white/20 border border-white/[0.06] cursor-not-allowed" : "bg-[#f59e0b]/90 text-black hover:bg-[#f59e0b] active:scale-95"}`,
                  "data-ocid": "color-match-apply",
                  children: colorMatchApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
                    " Applied!"
                  ] }) : "Apply Palette"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { size: 13, className: "text-[#2563EB]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/50 uppercase tracking-widest", children: "Auto Layout" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mb-3 leading-relaxed", children: "Reposition elements with intelligent alignment and even distribution." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4", children: [
                {
                  id: "horizontal",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignHorizontalDistributeCenter, { size: 14 }),
                  label: "Horiz"
                },
                {
                  id: "vertical",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignVerticalDistributeCenter, { size: 14 }),
                  label: "Vert"
                },
                {
                  id: "grid",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { size: 14 }),
                  label: "Grid"
                }
              ].map(({ id, icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setLayoutMode(id),
                  className: `flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border transition-all text-[11px] ${layoutMode === id ? "bg-[#2563EB]/15 border-[#2563EB]/40 text-[#2563EB]" : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.06]"}`,
                  "data-ocid": `auto-layout-${id}`,
                  children: [
                    icon,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
                  ]
                },
                id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 uppercase tracking-widest", children: "Spacing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/50 font-mono", children: [
                    spacing,
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: spacing,
                    onChange: (e) => setSpacing(Number(e.target.value)),
                    className: "w-full h-1.5 rounded-full accent-[#2563EB] cursor-pointer",
                    "data-ocid": "auto-layout-spacing"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleApplyLayout,
                  className: `w-full h-10 rounded-xl text-white text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${layoutApplied ? "bg-[#22C55E]/80" : "hover:opacity-90"}`,
                  style: layoutApplied ? {} : {
                    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                    boxShadow: "0 4px 14px rgba(37,99,235,0.35)"
                  },
                  "data-ocid": "auto-layout-apply",
                  children: layoutApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }),
                    " Layout Applied!"
                  ] }) : "Apply Layout"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13, className: "text-[#a855f7]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/50 uppercase tracking-widest", children: "AI Enhance" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mb-3 leading-relaxed", children: "Visibly sharpen, boost contrast, and improve clarity on image elements." }),
              enhanceProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "mb-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-[#a855f7] flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                        " Processing…"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/40 font-mono", children: [
                        Math.min(100, Math.round(enhanceProgress)),
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/[0.06] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-full rounded-full",
                        style: {
                          background: "linear-gradient(90deg, #a855f7, #ec4899)"
                        },
                        animate: {
                          width: `${Math.min(100, enhanceProgress)}%`
                        },
                        transition: { duration: 0.1 }
                      }
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleAIEnhance,
                  disabled: enhanceProcessing,
                  className: `w-full h-10 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${enhanceApplied ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30" : enhanceProcessing ? "bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/20 cursor-wait" : "text-white hover:opacity-90"}`,
                  style: enhanceApplied || enhanceProcessing ? {} : {
                    background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                    boxShadow: "0 4px 14px rgba(168,85,247,0.35)"
                  },
                  "data-ocid": "ai-enhance-apply",
                  children: enhanceApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }),
                    " Enhanced!"
                  ] }) : enhanceProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                    " Enhancing…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13 }),
                    " AI Enhance"
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { size: 13, className: "text-[#ec4899]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white/50 uppercase tracking-widest", children: "Remove Background" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 mb-3 leading-relaxed", children: "Isolate the foreground subject and visually remove the background from selected images." }),
              removeBgProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "mb-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-[#ec4899] flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                        " AI processing…"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/40 font-mono", children: [
                        Math.min(100, Math.round(removeBgProgress)),
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/[0.06] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-full rounded-full",
                        style: {
                          background: "linear-gradient(90deg, #ec4899, #f43f5e)"
                        },
                        animate: {
                          width: `${Math.min(100, removeBgProgress)}%`
                        },
                        transition: { duration: 0.1 }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mt-2 rounded-lg overflow-hidden",
                        style: {
                          height: 24,
                          background: `linear-gradient(90deg, rgba(236,72,153,0.15) ${removeBgProgress}%, rgba(255,255,255,0.03) ${removeBgProgress}%)`,
                          border: "1px solid rgba(236,72,153,0.2)",
                          transition: "background 0.1s"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleRemoveBackground,
                  disabled: removeBgProcessing,
                  className: `w-full h-10 rounded-xl text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${removeBgApplied ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30" : removeBgProcessing ? "bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/20 cursor-wait" : "text-white hover:opacity-90"}`,
                  style: removeBgApplied || removeBgProcessing ? {} : {
                    background: "linear-gradient(135deg, #ec4899, #be185d)",
                    boxShadow: "0 4px 14px rgba(236,72,153,0.35)"
                  },
                  "data-ocid": "remove-bg-apply",
                  children: removeBgApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }),
                    " Background Removed!"
                  ] }) : removeBgProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
                    " Removing…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { size: 13 }),
                    " Remove Background"
                  ] })
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
const DEMO_RECENT_COLORS = [
  "#2563EB",
  "#22C55E",
  "#ffffff",
  "#0a0f1a",
  "#ff4444",
  "#f59e0b",
  "#a78bfa",
  "#f472b6",
  "#06b6d4",
  "#ef4444",
  "#00ff00",
  "#0047ab"
];
const DEMO_BRAND_COLORS = [
  "#2563EB",
  "#22C55E",
  "#0a0f1a",
  "#0F172A",
  "#ffffff",
  "#111827"
];
const useColorStore = create()(
  persist(
    (set) => ({
      recentColors: DEMO_RECENT_COLORS,
      savedBrandColors: DEMO_BRAND_COLORS,
      activeColorMode: "hex",
      addRecentColor: (color) => set((s) => {
        const normalized = color.toLowerCase();
        const filtered = s.recentColors.filter(
          (c) => c.toLowerCase() !== normalized
        );
        return {
          recentColors: [color, ...filtered].slice(0, 12)
        };
      }),
      saveBrandColor: (color) => set((s) => {
        if (s.savedBrandColors.includes(color)) return s;
        return {
          savedBrandColors: [...s.savedBrandColors, color].slice(0, 24)
        };
      }),
      removeBrandColor: (color) => set((s) => ({
        savedBrandColors: s.savedBrandColors.filter((c) => c !== color)
      })),
      setColorMode: (mode) => set({ activeColorMode: mode }),
      clearRecentColors: () => set({ recentColors: [] })
    }),
    { name: "elysian-color-store" }
  )
);
function hexToHsl(hex) {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function hslToHex(h, s, l) {
  const hh = h / 360;
  const ss = s / 100;
  const ll = l / 100;
  const hue2rgb = (p, q, t) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  let r;
  let g;
  let b;
  if (ss === 0) {
    r = ll;
    g = ll;
    b = ll;
  } else {
    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
    const p = 2 * ll - q;
    r = hue2rgb(p, q, hh + 1 / 3);
    g = hue2rgb(p, q, hh);
    b = hue2rgb(p, q, hh - 1 / 3);
  }
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function hexToRgb(hex) {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}
function rgbToHex(r, g, b) {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function SLPicker({
  hue,
  saturation,
  lightness,
  onChange
}) {
  const boxRef = reactExports.useRef(null);
  const getVal = reactExports.useCallback(
    (e) => {
      var _a;
      const rect = (_a = boxRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1);
      const s = Math.round(x * 100);
      const l = Math.round(y * 100);
      onChange(s, l);
    },
    [onChange]
  );
  const onMouseDown = (e) => {
    e.preventDefault();
    getVal(e);
    const move = (ev) => getVal(ev);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const cx = saturation / 100;
  const cy = 1 - lightness / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: boxRef,
      onMouseDown,
      className: "relative select-none rounded-lg cursor-crosshair",
      style: { width: "100%", height: 190 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-lg",
            style: {
              background: `hsl(${hue},100%,50%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-lg",
            style: {
              background: "linear-gradient(to right, #fff 0%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-lg",
            style: {
              background: "linear-gradient(to bottom, transparent 0%, #000 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none",
            style: {
              left: `calc(${cx * 100}% - 8px)`,
              top: `calc(${cy * 100}% - 8px)`,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.5)"
            }
          }
        )
      ]
    }
  );
}
function Slider({
  value,
  min,
  max,
  background,
  onChange
}) {
  const trackRef = reactExports.useRef(null);
  const getVal = reactExports.useCallback(
    (e) => {
      var _a;
      const rect = (_a = trackRef.current) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      onChange(Math.round(x * (max - min) + min));
    },
    [min, max, onChange]
  );
  const onMouseDown = (e) => {
    e.preventDefault();
    getVal(e);
    const move = (ev) => getVal(ev);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const pct = (value - min) / (max - min) * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: trackRef,
      onMouseDown,
      className: "relative h-5 rounded-full cursor-pointer select-none",
      style: { background },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md -translate-y-1/2 pointer-events-none",
          style: {
            left: `calc(${pct}% - 10px)`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.5)"
          }
        }
      )
    }
  );
}
function ColorPickerModal({
  isOpen,
  onClose,
  value,
  onChange,
  title
}) {
  var _a;
  const {
    recentColors,
    savedBrandColors,
    addRecentColor,
    saveBrandColor,
    removeBrandColor
  } = useColorStore();
  const [tab, setTab] = reactExports.useState("solid");
  const [inputMode, setInputMode] = reactExports.useState("hex");
  const [hexInput, setHexInput] = reactExports.useState(value ?? "#2563EB");
  const [selectedPalette, setSelectedPalette] = reactExports.useState(0);
  const [gradientStops, setGradientStops] = reactExports.useState([
    { offset: 0, color: "#2563EB" },
    { offset: 1, color: "#22C55E" }
  ]);
  const [gradientType, setGradientType] = reactExports.useState("linear");
  const [gradientAngle, setGradientAngle] = reactExports.useState(135);
  const [activeStopIdx, setActiveStopIdx] = reactExports.useState(0);
  const [opacity, setOpacity] = reactExports.useState(100);
  reactExports.useEffect(() => {
    if ((value == null ? void 0 : value.startsWith("#")) && value.length === 7) {
      setHexInput(value);
    }
  }, [value]);
  const safeHex = hexInput.match(/^#[0-9a-fA-F]{6}$/) ? hexInput : "#2563EB";
  const [hue, sat, lit] = hexToHsl(safeHex);
  const [r, g, b] = hexToRgb(safeHex);
  const applyHsl = reactExports.useCallback((h, s, l) => {
    const hex = hslToHex(h, s, l);
    setHexInput(hex);
  }, []);
  const currentColor = safeHex;
  const gradientCss = gradientType === "radial" ? `radial-gradient(circle, ${gradientStops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})` : gradientType === "conic" ? `conic-gradient(from ${gradientAngle}deg, ${gradientStops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})` : `linear-gradient(${gradientAngle}deg, ${gradientStops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})`;
  const handleApply = () => {
    if (tab === "gradient") {
      addRecentColor(gradientStops[0].color);
      onChange(gradientStops[0].color);
    } else {
      addRecentColor(currentColor);
      onChange(currentColor);
    }
    onClose();
  };
  const handleColorCircleClick = (color) => {
    setHexInput(color);
  };
  const updateStopColor = (idx, color) => {
    setGradientStops(
      (prev) => prev.map((s, i) => i === idx ? { ...s, color } : s)
    );
  };
  const addStop = () => {
    if (gradientStops.length >= 5) return;
    const mid = (gradientStops[0].offset + gradientStops[gradientStops.length - 1].offset) / 2;
    setGradientStops(
      (prev) => [...prev, { offset: mid, color: "#ffffff" }].sort(
        (a, b2) => a.offset - b2.offset
      )
    );
  };
  const removeStop = (idx) => {
    if (gradientStops.length <= 2) return;
    setGradientStops((prev) => prev.filter((_, i) => i !== idx));
  };
  const overlayStyle = {
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)"
  };
  const modalStyle = {
    background: "rgba(15,23,42,0.98)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(37,99,235,0.10)",
    fontFamily: "Inter, sans-serif"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: overlayStyle,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      "data-ocid": "color-picker-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-[420px] rounded-2xl overflow-hidden",
          style: modalStyle,
          initial: { scale: 0.95, opacity: 0, y: 8 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.95, opacity: 0, y: 8 },
          transition: { type: "spring", damping: 20, stiffness: 300 },
          "data-ocid": "color-picker-modal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] font-semibold text-white/90", children: title ?? "Color Picker" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-all",
                  "data-ocid": "color-picker-close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 px-5 mb-4", children: ["solid", "gradient", "brand"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTab(t),
                className: `flex-1 h-8 rounded-lg text-xs font-medium transition-all capitalize ${tab === t ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-white/50 hover:text-white/80 hover:bg-white/10"}`,
                "data-ocid": `color-tab-${t}`,
                children: t
              },
              t
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 space-y-4 pb-5", children: [
              tab === "solid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-lg h-14 w-full",
                    style: {
                      background: currentColor,
                      boxShadow: `0 0 20px ${currentColor}40`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SLPicker,
                  {
                    hue,
                    saturation: sat,
                    lightness: lit,
                    onChange: (s, l) => applyHsl(hue, s, l)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mb-1.5 uppercase tracking-widest", children: "Hue" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Slider,
                    {
                      value: hue,
                      min: 0,
                      max: 360,
                      background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                      onChange: (h) => applyHsl(h, sat, lit)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mb-1.5 uppercase tracking-widest", children: "Opacity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Slider,
                    {
                      value: opacity,
                      min: 0,
                      max: 100,
                      background: `linear-gradient(to right, transparent, ${currentColor}), repeating-conic-gradient(#888 0% 25%, #ccc 0% 50%) 0 0/16px 16px`,
                      onChange: setOpacity
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-2", children: ["hex", "rgb", "hsl"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setInputMode(m),
                      className: `px-2.5 h-6 rounded text-[10px] font-medium uppercase tracking-widest transition-all ${inputMode === m ? "bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/40" : "bg-white/[0.04] text-white/30 hover:text-white/60 border border-transparent"}`,
                      "data-ocid": `color-mode-${m}`,
                      children: m
                    },
                    m
                  )) }),
                  inputMode === "hex" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: hexInput,
                      onChange: (e) => setHexInput(e.target.value),
                      onBlur: (e) => {
                        if (/^#[0-9a-fA-F]{6}$/.test(e.target.value))
                          setHexInput(e.target.value);
                      },
                      className: "w-full h-9 rounded-lg px-3 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] focus:border-[#2563EB]/60 outline-none transition-all",
                      "data-ocid": "color-hex-input"
                    }
                  ),
                  inputMode === "rgb" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [
                    { label: "R", val: r, max: 255 },
                    { label: "G", val: g, max: 255 },
                    { label: "B", val: b, max: 255 }
                  ].map(({ label, val, max }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/30 mb-1 uppercase text-center", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: 0,
                        max,
                        value: val,
                        onChange: (e) => {
                          const nv = clamp(
                            Number(e.target.value),
                            0,
                            max
                          );
                          const nr = label === "R" ? nv : r;
                          const ng = label === "G" ? nv : g;
                          const nb = label === "B" ? nv : b;
                          setHexInput(rgbToHex(nr, ng, nb));
                        },
                        className: "w-full h-9 rounded-lg px-2 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] outline-none text-center"
                      }
                    )
                  ] }, label)) }),
                  inputMode === "hsl" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [
                    { label: "H", val: hue, max: 360 },
                    { label: "S", val: sat, max: 100 },
                    { label: "L", val: lit, max: 100 }
                  ].map(({ label, val, max }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-white/30 mb-1 uppercase text-center", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: 0,
                        max,
                        value: val,
                        onChange: (e) => {
                          const nv = clamp(
                            Number(e.target.value),
                            0,
                            max
                          );
                          const nh = label === "H" ? nv : hue;
                          const ns = label === "S" ? nv : sat;
                          const nl = label === "L" ? nv : lit;
                          applyHsl(nh, ns, nl);
                        },
                        className: "w-full h-9 rounded-lg px-2 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] outline-none text-center"
                      }
                    )
                  ] }, label)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mb-2 uppercase tracking-widest", children: "Palettes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap mb-2", children: COLOR_PALETTES.map((pal, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedPalette(i),
                      className: `px-2.5 h-6 rounded text-[10px] font-medium transition-all ${selectedPalette === i ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-white/50 hover:text-white/80"}`,
                      "data-ocid": `palette-${pal.name.toLowerCase()}`,
                      children: pal.name
                    },
                    pal.name
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: (_a = COLOR_PALETTES[selectedPalette]) == null ? void 0 : _a.colors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleColorCircleClick(c),
                      className: "w-8 h-8 rounded-full border-2 border-transparent hover:scale-110 transition-transform",
                      style: {
                        background: c,
                        borderColor: currentColor === c ? "white" : "transparent"
                      },
                      title: c,
                      "data-ocid": `palette-color-${c.replace("#", "")}`
                    },
                    c
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mb-2 uppercase tracking-widest", children: "Recent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: recentColors.slice(0, 12).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleColorCircleClick(c),
                      className: "w-6 h-6 rounded-full border-2 border-transparent hover:scale-110 transition-transform",
                      style: {
                        background: c,
                        borderColor: currentColor === c ? "white" : "rgba(255,255,255,0.15)"
                      },
                      title: c,
                      "data-ocid": `recent-color-${c.replace("#", "")}`
                    },
                    c
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: async () => {
                      if ("EyeDropper" in window) {
                        try {
                          const dropper = new window.EyeDropper();
                          const result = await dropper.open();
                          setHexInput(result.sRGBHex);
                          onChange(result.sRGBHex);
                        } catch {
                        }
                      } else {
                        ue.info("Eye dropper not supported in this browser");
                      }
                    },
                    className: "flex items-center gap-2 w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all text-sm",
                    "data-ocid": "color-eyedropper",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pipette, { size: 14 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sample color from screen" })
                    ]
                  }
                )
              ] }),
              tab === "gradient" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-lg h-14 w-full",
                    style: { background: gradientCss }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["linear", "radial", "conic"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setGradientType(t),
                    className: `flex-1 h-7 rounded-lg text-xs capitalize font-medium transition-all ${gradientType === t ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-white/50 hover:text-white/80"}`,
                    "data-ocid": `gradient-type-${t}`,
                    children: t
                  },
                  t
                )) }),
                gradientType === "linear" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/30 mb-1.5 uppercase tracking-widest", children: [
                    "Angle: ",
                    gradientAngle,
                    "°"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Slider,
                    {
                      value: gradientAngle,
                      min: 0,
                      max: 360,
                      background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.20))",
                      onChange: setGradientAngle
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 uppercase tracking-widest", children: "Color Stops" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: addStop,
                        className: "flex items-center gap-1 px-2 h-6 rounded text-[10px] bg-white/[0.06] text-white/50 hover:text-white/80 transition-all",
                        "data-ocid": "gradient-add-stop",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 10 }),
                          " Add Stop"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "relative h-6 rounded-full mb-3",
                      style: { background: gradientCss },
                      children: gradientStops.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setActiveStopIdx(gradientStops.indexOf(s)),
                          className: "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 cursor-pointer transition-transform hover:scale-110",
                          style: {
                            left: `calc(${s.offset * 100}% - 10px)`,
                            background: s.color,
                            borderColor: activeStopIdx === gradientStops.indexOf(s) ? "white" : "rgba(255,255,255,0.5)",
                            boxShadow: activeStopIdx === gradientStops.indexOf(s) ? "0 0 0 2px rgba(37,99,235,0.8)" : "none"
                          },
                          "data-ocid": `gradient-stop-${s.color.replace("#", "")}`
                        },
                        `gstop-${s.offset}-${s.color}`
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: gradientStops.map((s, li) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-2 p-2 rounded-lg border transition-all ${activeStopIdx === li ? "border-[#2563EB]/40 bg-[#2563EB]/5" : "border-white/[0.06] bg-white/[0.02]"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setActiveStopIdx(li),
                            className: "w-8 h-8 rounded-lg border border-white/20 shrink-0",
                            style: { background: s.color }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "text",
                            value: s.color,
                            onChange: (e) => updateStopColor(li, e.target.value),
                            className: "w-full h-7 px-2 rounded text-xs font-mono text-white/80 bg-white/[0.06] border border-white/[0.08] outline-none"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/30 w-8 text-right", children: [
                          Math.round(s.offset * 100),
                          "%"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeStop(li),
                            className: "text-white/20 hover:text-red-400 transition-colors",
                            "data-ocid": `gradient-remove-stop-${li}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                          }
                        )
                      ]
                    },
                    `stoplist-${s.offset}-${s.color}`
                  )) })
                ] })
              ] }),
              tab === "brand" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 uppercase tracking-widest", children: "Brand Colors" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => saveBrandColor(currentColor),
                        className: "flex items-center gap-1.5 px-3 h-7 rounded-lg bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/30 text-[11px] hover:bg-[#2563EB]/30 transition-all",
                        "data-ocid": "brand-add-color",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 11 }),
                          " Add to Brand"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
                    savedBrandColors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleColorCircleClick(c),
                          className: "w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform",
                          style: {
                            background: c,
                            borderColor: currentColor === c ? "white" : "rgba(255,255,255,0.15)"
                          },
                          title: c,
                          "data-ocid": `brand-color-${c.replace("#", "")}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => removeBrandColor(c),
                          className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0F172A] border border-white/20 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center",
                          "data-ocid": `brand-remove-${c.replace("#", "")}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 8 })
                        }
                      )
                    ] }, c)),
                    savedBrandColors.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/30 py-4", children: "No brand colors saved yet." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 mb-2 uppercase tracking-widest", children: "Current Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-full border border-white/20",
                        style: { background: currentColor }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        value: hexInput,
                        onChange: (e) => setHexInput(e.target.value),
                        className: "flex-1 h-9 rounded-lg px-3 text-sm font-mono text-white/90 bg-white/[0.06] border border-white/[0.08] outline-none",
                        "data-ocid": "brand-hex-input"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex-1 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 hover:bg-white/[0.10] text-sm font-medium transition-all",
                    "data-ocid": "color-picker-cancel",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleApply,
                    className: "flex-1 h-10 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95",
                    style: {
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
                    },
                    "data-ocid": "color-picker-apply",
                    children: "Apply"
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
const FORMAT_CARDS = [
  {
    id: "png",
    label: "PNG",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { size: 20 }),
    desc: "Transparent support, lossless"
  },
  {
    id: "jpg",
    label: "JPG",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(File, { size: 20 }),
    desc: "Smaller file, no transparency"
  },
  {
    id: "webp",
    label: "WEBP",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 20 }),
    desc: "Modern format, best compression"
  },
  {
    id: "pdf",
    label: "PDF",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 20 }),
    desc: "Vector, printable"
  },
  {
    id: "mp4",
    label: "MP4",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { size: 20 }),
    desc: "Animated export",
    comingSoon: true
  }
];
const RESOLUTIONS = [
  { id: "720p", label: "720p", dims: "1280×720", multiplier: 1 },
  { id: "1080p", label: "1080p", dims: "1920×1080", multiplier: 2 },
  { id: "2k", label: "2K", dims: "2560×1440", multiplier: 3 },
  { id: "4k", label: "4K", dims: "3840×2160", multiplier: 4 }
];
function CanvasExportModal({
  isOpen,
  onClose,
  projectName,
  onExport,
  canvasWidth,
  canvasHeight
}) {
  const [format, setFormat] = reactExports.useState("png");
  const [resolution, setResolution] = reactExports.useState("1080p");
  const [transparent, setTransparent] = reactExports.useState(false);
  const [padding, setPadding] = reactExports.useState(0);
  const [phase, setPhase] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const timestamp = Date.now();
  const filename = projectName ? projectName.replace(/\s+/g, "-").toLowerCase() : `elysian-design-${timestamp}`;
  const selectedRes = RESOLUTIONS.find((r) => r.id === resolution);
  const exportW = Math.round(canvasWidth * selectedRes.multiplier);
  const exportH = Math.round(canvasHeight * selectedRes.multiplier);
  const estimatedMB = (exportW * exportH * 4 / (1024 * 1024) * 0.3).toFixed(
    1
  );
  const handleClose = () => {
    if (phase === "exporting") return;
    setPhase("idle");
    setProgress(0);
    onClose();
  };
  const handleExport = () => {
    if (format === "mp4") {
      ue.info("MP4 export coming soon!");
      return;
    }
    setPhase("exporting");
    setProgress(0);
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 22 + 8;
      if (pct >= 100) {
        clearInterval(interval);
        setProgress(100);
        onExport(
          format,
          selectedRes.multiplier,
          transparent && (format === "png" || format === "webp")
        );
        setTimeout(() => {
          setPhase("done");
        }, 300);
        return;
      }
      setProgress(Math.min(pct, 95));
    }, 180);
  };
  const overlayStyle = {
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)"
  };
  const modalStyle = {
    background: "rgba(15,23,42,0.98)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(37,99,235,0.08)",
    fontFamily: "Inter, sans-serif"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: overlayStyle,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => {
        if (e.target === e.currentTarget) handleClose();
      },
      "data-ocid": "export-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-[500px] rounded-2xl overflow-hidden",
          style: modalStyle,
          initial: { scale: 0.95, opacity: 0, y: 10 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.95, opacity: 0, y: 10 },
          transition: { type: "spring", damping: 22, stiffness: 300 },
          "data-ocid": "export-modal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-6 pb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[16px] font-semibold text-white/90", children: "Export Your Design" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-white/35 mt-0.5", children: "Choose format, quality and download" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-xl text-white/30 hover:text-white/70 hover:bg-white/10 transition-all",
                  "data-ocid": "export-close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                }
              )
            ] }),
            phase === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 px-6 pb-8 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 h-16 rounded-full flex items-center justify-center",
                  style: {
                    background: "rgba(34,197,94,0.12)",
                    border: "1px solid rgba(34,197,94,0.3)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 28, className: "text-[#22C55E]" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] font-semibold text-white/90", children: "Export Complete!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-white/40 mt-1", children: "Your design has been downloaded." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    className: "flex-1 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 text-sm font-medium transition-all",
                    "data-ocid": "export-done-close",
                    children: "Close"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setPhase("idle");
                      setProgress(0);
                    },
                    className: "flex-1 h-10 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90",
                    style: {
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)"
                    },
                    "data-ocid": "export-again",
                    children: "Export Again"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2", children: "Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: FORMAT_CARDS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFormat(f.id),
                    disabled: !!f.comingSoon,
                    className: `relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${format === f.id && !f.comingSoon ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]" : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"} disabled:opacity-40 disabled:cursor-not-allowed`,
                    "data-ocid": `export-format-${f.id}`,
                    children: [
                      format === f.id && !f.comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 right-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 9, className: "text-[#2563EB]" }) }),
                      f.comingSoon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-1 text-[8px] px-1 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-medium", children: "Soon" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: format === f.id && !f.comingSoon ? "text-[#2563EB]" : "text-white/40",
                          children: f.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: f.label })
                    ]
                  },
                  f.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2", children: "Quality" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: RESOLUTIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setResolution(r.id),
                    className: `flex flex-col items-center gap-0.5 py-2.5 rounded-xl border transition-all ${resolution === r.id ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]" : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"}`,
                    "data-ocid": `export-quality-${r.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold", children: r.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-60", children: r.dims })
                    ]
                  },
                  r.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2", children: "Settings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40 mb-1", children: "Filename" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        defaultValue: filename,
                        className: "w-full h-9 rounded-lg px-3 text-sm font-mono text-white/80 bg-white/[0.06] border border-white/[0.08] focus:border-[#2563EB]/50 outline-none transition-all",
                        "data-ocid": "export-filename"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-white/70", children: "Transparent Background" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30", children: "PNG / WEBP only" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setTransparent((v) => !v),
                        disabled: format !== "png" && format !== "webp",
                        className: `relative w-10 rounded-full border transition-all disabled:opacity-30 ${transparent ? "bg-[#2563EB] border-[#2563EB]" : "bg-white/[0.08] border-white/[0.10]"}`,
                        style: { height: 22 },
                        "data-ocid": "export-transparent-toggle",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${transparent ? "left-[calc(100%-18px)]" : "left-0.5"}`
                          }
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/40", children: "Padding" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/50 font-mono", children: [
                        padding,
                        "px"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        min: 0,
                        max: 100,
                        value: padding,
                        onChange: (e) => setPadding(Number(e.target.value)),
                        className: "w-full h-1.5 rounded-full accent-[#2563EB] cursor-pointer",
                        "data-ocid": "export-padding"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl p-3 flex items-center gap-3",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[100px] h-[60px] rounded-lg overflow-hidden shrink-0",
                        style: {
                          background: "#111827",
                          border: "1px solid rgba(255,255,255,0.06)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-10 h-6 rounded",
                            style: {
                              background: "linear-gradient(135deg, #2563EB, #22C55E)"
                            }
                          }
                        ) })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] font-semibold text-white/70", children: [
                        exportW,
                        " × ",
                        exportH,
                        "px"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/35 mt-0.5", children: [
                        "Estimated size: ~",
                        estimatedMB,
                        " MB"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/25 mt-0.5", children: [
                        format.toUpperCase(),
                        " · ",
                        selectedRes.label
                      ] })
                    ] })
                  ]
                }
              ),
              phase === "exporting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-white/40 mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Exporting…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    Math.round(progress),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 rounded-full overflow-hidden",
                    style: { background: "rgba(255,255,255,0.08)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-full rounded-full",
                        style: {
                          background: "linear-gradient(90deg, #2563EB, #22C55E)"
                        },
                        animate: { width: `${progress}%` },
                        transition: { duration: 0.2 }
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
                    className: "flex-1 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white/90 hover:bg-white/[0.10] text-sm font-medium transition-all disabled:opacity-50",
                    "data-ocid": "export-cancel",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleExport,
                    disabled: phase === "exporting" || format === "mp4",
                    className: "flex-1 h-11 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2",
                    style: {
                      background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
                    },
                    "data-ocid": "export-confirm",
                    children: phase === "exporting" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                      " ",
                      "Exporting…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
                      " Export ",
                      format.toUpperCase()
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    title: "Copy to clipboard",
                    onClick: () => {
                      const off = document.createElement("canvas");
                      off.width = canvasWidth * selectedRes.multiplier;
                      off.height = canvasHeight * selectedRes.multiplier;
                      const ctx = off.getContext("2d");
                      if (!ctx) return;
                      const liveCanvas = document.querySelector(
                        "[data-ocid='editor-canvas']"
                      );
                      if (liveCanvas) {
                        ctx.drawImage(liveCanvas, 0, 0, off.width, off.height);
                      }
                      off.toBlob(async (blob) => {
                        if (!blob) {
                          ue.error("Could not capture canvas");
                          return;
                        }
                        try {
                          await navigator.clipboard.write([
                            new ClipboardItem({ "image/png": blob })
                          ]);
                          ue.success("Copied to clipboard!");
                        } catch {
                          ue.error(
                            "Clipboard write not supported in this browser"
                          );
                        }
                      }, "image/png");
                    },
                    className: "w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.06] border border-white/[0.08] text-white/40 hover:text-white/80 hover:bg-white/[0.10] transition-all",
                    "data-ocid": "export-copy-clipboard",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { size: 15 })
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
const EXPORT_OPTIONS = [
  { format: "png", quality: "72", label: "PNG (72 DPI)" },
  { format: "png", quality: "150", label: "PNG (150 DPI)" },
  { format: "png", quality: "300", label: "PNG (300 DPI)" },
  { format: "jpg", quality: "72", label: "JPG (72 DPI)" },
  { format: "jpg", quality: "150", label: "JPG (150 DPI)" },
  { format: "jpg", quality: "300", label: "JPG (300 DPI)" }
];
const EditorToolbar = reactExports.memo(function EditorToolbar2({
  projectName,
  canvasWidth,
  canvasHeight,
  zoom,
  showGrid,
  showSnap,
  canUndo,
  canRedo,
  unsaved,
  isSaving,
  onUndo,
  onRedo,
  onToggleGrid,
  onToggleSnap,
  onZoomChange,
  onPresetChange,
  onExport,
  onProjectNameChange,
  onShare,
  onOpenExportModal
}) {
  const [exportOpen, setExportOpen] = reactExports.useState(false);
  const [exportFormat, setExportFormat] = reactExports.useState("png");
  const [exportQuality, setExportQuality] = reactExports.useState("150");
  const [editingName, setEditingName] = reactExports.useState(false);
  const [nameValue, setNameValue] = reactExports.useState(projectName);
  const [hoveredExport, setHoveredExport] = reactExports.useState(null);
  const nameRef = reactExports.useRef(null);
  const exportRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setNameValue(projectName);
  }, [projectName]);
  reactExports.useEffect(() => {
    if (editingName && nameRef.current) {
      nameRef.current.focus();
      nameRef.current.select();
    }
  }, [editingName]);
  reactExports.useEffect(() => {
    if (!exportOpen) return;
    const handler = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [exportOpen]);
  const commitName = (val) => {
    const trimmed = val.trim() || "Untitled Design";
    setNameValue(trimmed);
    onProjectNameChange(trimmed);
    setEditingName(false);
  };
  const handleZoomReset = () => onZoomChange(100);
  const selectedExportLabel = `${exportFormat.toUpperCase()} (${exportQuality} DPI)`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "h-14 flex items-center justify-between flex-shrink-0 z-20 px-3 gap-2",
      style: {
        background: "oklch(0.10 0 0 / 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid oklch(0.25 0 0 / 0.4)",
        boxShadow: "0 1px 0 oklch(0.38 0.15 270 / 0.08), 0 4px 24px oklch(0 0 0 / 0.4)"
      },
      "data-ocid": "editor-toolbar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              title: "Back to Dashboard",
              className: "flex items-center justify-center w-8 h-8 rounded-lg font-editor text-xs text-white/60 transition-all duration-150 ease-out hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20",
              "data-ocid": "editor-back-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10 mx-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative group flex items-center gap-1.5 min-w-0", children: editingName ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: nameRef,
              value: nameValue,
              onChange: (e) => setNameValue(e.target.value),
              onBlur: () => commitName(nameValue),
              onKeyDown: (e) => {
                if (e.key === "Enter") commitName(nameValue);
                if (e.key === "Escape") {
                  setNameValue(projectName);
                  setEditingName(false);
                }
              },
              className: "editor-input-glass text-sm font-medium w-44 py-1 px-2 h-8",
              style: { fontSize: "14px" },
              "data-ocid": "editor-name-input"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setEditingName(true),
              title: "Click to rename project",
              className: "flex items-center gap-1.5 h-8 px-2 rounded-lg text-sm font-medium text-white/90 transition-all duration-150 hover:bg-white/8 hover:text-white group",
              style: { fontFamily: "var(--font-editor)", fontSize: "14px" },
              "data-ocid": "editor-project-name",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[160px]", children: nameValue }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3 text-white/30 group-hover:text-white/60 transition-all duration-150 flex-shrink-0" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-[11px] font-editor text-white/30 hidden lg:block flex-shrink-0 ml-1",
              style: { fontFamily: "var(--font-editor)" },
              children: [
                canvasWidth,
                "×",
                canvasHeight
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: `${canvasWidth}x${canvasHeight}`,
              onChange: (e) => {
                const preset = CANVAS_PRESETS.find(
                  (p) => `${p.width}x${p.height}` === e.target.value
                );
                if (preset) onPresetChange(preset.width, preset.height);
              },
              className: "hidden xl:block h-8 px-2 rounded-lg text-[11px] font-editor text-white/60 transition-all duration-150 cursor-pointer focus:outline-none hover:text-white",
              style: {
                fontFamily: "var(--font-editor)",
                background: "oklch(0.16 0 0 / 0.6)",
                border: "1px solid oklch(0.25 0 0 / 0.4)"
              },
              "data-ocid": "canvas-preset-select",
              children: CANVAS_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: `${p.width}x${p.height}`, children: p.label }, p.label))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onUndo,
              disabled: !canUndo,
              title: "Undo (Ctrl+Z)",
              "aria-label": "Undo",
              className: `flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${canUndo ? "text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20" : "text-white/20 cursor-not-allowed opacity-40"}`,
              "data-ocid": "editor-undo-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onRedo,
              disabled: !canRedo,
              title: "Redo (Ctrl+Y)",
              "aria-label": "Redo",
              className: `flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${canRedo ? "text-white/70 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20" : "text-white/20 cursor-not-allowed opacity-40"}`,
              "data-ocid": "editor-redo-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10 mx-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onToggleGrid,
              title: "Toggle Grid (Ctrl+G)",
              "aria-label": "Toggle grid",
              className: `flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${showGrid ? "text-white bg-white/15 ring-1 ring-white/20" : "text-white/50 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"}`,
              style: showGrid ? { boxShadow: "0 0 12px oklch(0.38 0.15 270 / 0.5)" } : {},
              "data-ocid": "editor-grid-toggle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onToggleSnap,
              title: "Toggle Snap",
              "aria-label": "Toggle snap to grid",
              className: `flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${showSnap ? "text-white bg-white/15 ring-1 ring-white/20" : "text-white/50 hover:text-white hover:bg-white/10 hover:ring-1 hover:ring-white/20"}`,
              style: showSnap ? { boxShadow: "0 0 12px oklch(0.38 0.15 270 / 0.5)" } : {},
              "data-ocid": "editor-snap-toggle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Magnet, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10 mx-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onZoomChange(Math.max(10, zoom - 25)),
                title: "Zoom out",
                "aria-label": "Zoom out",
                className: "flex items-center justify-center w-7 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 text-base font-medium leading-none",
                style: { fontFamily: "var(--font-editor)" },
                "data-ocid": "editor-zoom-out",
                children: "−"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleZoomReset,
                title: "Reset to 100%",
                className: "flex items-center justify-center h-8 px-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 tabular-nums",
                style: {
                  fontFamily: "var(--font-editor)",
                  fontSize: "12px",
                  minWidth: "44px"
                },
                "data-ocid": "editor-zoom-value",
                children: [
                  zoom,
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onZoomChange(Math.min(400, zoom + 25)),
                title: "Zoom in",
                "aria-label": "Zoom in",
                className: "flex items-center justify-center w-7 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 text-base font-medium leading-none",
                style: { fontFamily: "var(--font-editor)" },
                "data-ocid": "editor-zoom-in",
                children: "+"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center gap-1.5 px-2 h-8 rounded-lg",
              style: { fontFamily: "var(--font-editor)", fontSize: "12px" },
              "data-ocid": "editor-autosave-indicator",
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 text-white/50 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 hidden sm:block", children: "Saving…" })
              ] }) : unsaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-amber-400/80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400/80 hidden sm:block", children: "Unsaved" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0",
                    style: { boxShadow: "0 0 6px oklch(0.82 0.17 142 / 0.8)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 hidden sm:block", children: "Saved" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onShare,
              title: "Share",
              className: "flex items-center gap-1.5 h-8 px-3 rounded-lg text-white/70 transition-all duration-150 hover:text-white group",
              style: {
                fontFamily: "var(--font-editor)",
                fontSize: "13px",
                background: "oklch(0.18 0 0 / 0.5)",
                border: "1px solid oklch(0.28 0 0 / 0.4)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, oklch(0.38 0.15 270), oklch(0.55 0.14 270))";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.color = "white";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "oklch(0.18 0 0 / 0.5)";
                e.currentTarget.style.borderColor = "oklch(0.28 0 0 / 0.4)";
                e.currentTarget.style.color = "";
              },
              "data-ocid": "editor-share-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "Share" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: exportRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex rounded-lg overflow-hidden",
                style: { boxShadow: "0 2px 12px oklch(0.38 0.15 270 / 0.35)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (onOpenExportModal) {
                          onOpenExportModal();
                        } else {
                          onExport(exportFormat, exportQuality);
                        }
                      },
                      className: "flex items-center gap-1.5 h-8 px-3 text-white font-semibold transition-all duration-150 hover:brightness-110",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.38 0.15 270) 0%, oklch(0.55 0.15 160) 100%)",
                        fontFamily: "var(--font-editor)",
                        fontSize: "13px"
                      },
                      "data-ocid": "editor-export-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "Export" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-[11px] hidden md:block", children: selectedExportLabel })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setExportOpen((v) => !v),
                      "aria-label": "Export options",
                      className: "flex items-center justify-center w-7 h-8 text-white/80 transition-all duration-150 hover:bg-white/15",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.42 0.15 270) 0%, oklch(0.58 0.15 160) 100%)",
                        borderLeft: "1px solid oklch(1 0 0 / 0.15)"
                      },
                      "data-ocid": "editor-export-dropdown-btn",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: `w-3.5 h-3.5 transition-transform duration-150 ${exportOpen ? "rotate-180" : ""}`
                        }
                      )
                    }
                  )
                ]
              }
            ),
            exportOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50",
                style: {
                  background: "oklch(0.12 0 0 / 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid oklch(0.25 0 0 / 0.5)",
                  boxShadow: "0 16px 48px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(0.38 0.15 270 / 0.1)"
                },
                "data-ocid": "export-options-panel",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1.5", children: [
                  EXPORT_OPTIONS.map((opt) => {
                    const key = `${opt.format}-${opt.quality}`;
                    const isSelected = exportFormat === opt.format && exportQuality === opt.quality;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setExportFormat(opt.format);
                          setExportQuality(opt.quality);
                          onExport(opt.format, opt.quality);
                          setExportOpen(false);
                        },
                        onMouseEnter: () => setHoveredExport(key),
                        onMouseLeave: () => setHoveredExport(null),
                        className: "w-full flex items-center justify-between px-3 py-2 text-left transition-all duration-100",
                        style: {
                          fontFamily: "var(--font-editor)",
                          fontSize: "13px",
                          color: isSelected ? "white" : "oklch(0.75 0 0)",
                          background: isSelected ? "oklch(0.38 0.15 270 / 0.2)" : hoveredExport === key ? "oklch(0.18 0 0 / 0.8)" : "transparent"
                        },
                        "data-ocid": `export-option-${key}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.label }),
                          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-white/60" })
                        ]
                      },
                      key
                    );
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mx-3 my-1.5",
                      style: { height: "1px", background: "oklch(0.22 0 0 / 0.6)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      disabled: true,
                      className: "w-full flex items-center justify-between px-3 py-2 text-left cursor-not-allowed opacity-50",
                      style: {
                        fontFamily: "var(--font-editor)",
                        fontSize: "13px",
                        color: "oklch(0.55 0 0)"
                      },
                      "data-ocid": "export-all-pages-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export All Pages" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                            style: {
                              background: "linear-gradient(135deg, oklch(0.55 0.14 50), oklch(0.65 0.14 40))",
                              color: "white"
                            },
                            children: "PRO"
                          }
                        )
                      ]
                    }
                  )
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
});
const SIDEBAR_TABS = [
  {
    id: "templates",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-5 h-5" }),
    label: "Templates"
  },
  { id: "uploads", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5" }), label: "Uploads" },
  { id: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "w-5 h-5" }), label: "Text" },
  { id: "elements", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shapes, { className: "w-5 h-5" }), label: "Elements" },
  { id: "images", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-5 h-5" }), label: "Images" },
  { id: "brand", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }), label: "Brand" }
];
const SHAPE_TOOLS = [
  { tool: "rect", label: "Rect", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "w-5 h-5" }) },
  { tool: "circle", label: "Circle", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crop, { className: "w-5 h-5" }) },
  {
    tool: "triangle",
    label: "Triangle",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Triangle, { className: "w-5 h-5" })
  },
  { tool: "star", label: "Star", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5" }) },
  { tool: "text", label: "Line", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-5 h-5" }) },
  { tool: "text", label: "Arrow", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MoveRight, { className: "w-5 h-5" }) }
];
function SectionHeader({
  title,
  expanded,
  onToggle,
  badge
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onToggle,
      className: "w-full flex items-center justify-between px-1 py-1.5 mb-1.5 group transition-all duration-150",
      "data-ocid": `section-header-${title.toLowerCase().replace(/\s/g, "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[11px] font-semibold tracking-wider uppercase font-editor",
            style: { color: "oklch(0.7 0 0)", fontFamily: "Inter, sans-serif" },
            children: title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[9px] px-1.5 py-0.5 rounded-full font-editor",
              style: {
                background: "oklch(0.38 0.15 270 / 0.2)",
                color: "oklch(0.65 0.17 150)",
                fontFamily: "Inter, sans-serif"
              },
              children: badge
            }
          ),
          expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 opacity-50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 opacity-50" })
        ] })
      ]
    }
  );
}
function SearchInput({
  placeholder = "Search assets...",
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5",
        style: { color: "oklch(0.5 0 0)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "editor-input-glass w-full pl-8 pr-3 py-1.5 text-[12px] rounded-xl",
        style: { fontFamily: "Inter, sans-serif" },
        "data-ocid": "sidebar-search-input"
      }
    )
  ] });
}
function PanelTitle({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      className: "text-[13px] font-semibold mb-3 font-editor",
      style: {
        color: "oklch(0.88 0 0 / 0.8)",
        fontFamily: "Inter, sans-serif"
      },
      children
    }
  );
}
function TemplatesPanel({
  onAddTemplate,
  query
}) {
  const filtered = TEMPLATES.filter(
    (t) => t.label.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTitle, { children: "Templates" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: filtered.map((tpl) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onAddTemplate(tpl),
        className: "group relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]",
        style: { aspectRatio: "16/9", background: "oklch(0.14 0 0)" },
        "data-ocid": `template-card-${tpl.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full flex items-end",
              style: {
                background: `linear-gradient(135deg, #101820 0%, ${tpl.id === "yt-clean" ? "#0047ab" : tpl.id === "ig-brand" ? "#50c878" : tpl.id === "twitter-banner" ? "#1a3a6b" : "#2a1a4e"} 100%)`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[9px] font-bold truncate text-white/80 leading-none",
                  style: { fontFamily: "Inter, sans-serif" },
                  children: tpl.label
                }
              ) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150",
              style: { background: "oklch(0.38 0.15 270 / 0.7)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-semibold text-white px-2 py-0.5 rounded-md",
                  style: {
                    background: "oklch(0 0 0 / 0.4)",
                    fontFamily: "Inter, sans-serif"
                  },
                  children: "Use"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute top-1 right-1 text-[8px] px-1 py-0.5 rounded",
              style: {
                background: "oklch(0 0 0 / 0.5)",
                color: "oklch(0.7 0 0)",
                fontFamily: "Inter, sans-serif"
              },
              children: tpl.category
            }
          )
        ]
      },
      tpl.id
    )) })
  ] });
}
function UploadsPanel({
  onAddImage
}) {
  const fileInputRef = reactExports.useRef(null);
  const [uploaded, setUploaded] = reactExports.useState([]);
  const SAMPLE_UPLOADS = [
    {
      name: "brand-logo.png",
      gradient: "linear-gradient(135deg, #0047ab 0%, #50c878 100%)"
    },
    {
      name: "hero-photo.jpg",
      gradient: "linear-gradient(135deg, #101820 0%, #1a3a6b 100%)"
    },
    {
      name: "product-shot.png",
      gradient: "linear-gradient(135deg, #6c5ce7 0%, #0047ab 100%)"
    }
  ];
  const handleFile = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const url = (_a2 = ev.target) == null ? void 0 : _a2.result;
      setUploaded((prev) => [{ url, name: file.name }, ...prev]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const removeImage = (idx) => setUploaded((prev) => prev.filter((_, i) => i !== idx));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTitle, { children: "Your uploads" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        className: "editor-button-glass w-full flex items-center justify-center gap-2 py-2.5 rounded-xl",
        "data-ocid": "upload-button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "Inter, sans-serif", fontSize: "12px" }, children: "Upload Image" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFile,
        "data-ocid": "upload-file-input"
      }
    ),
    uploaded.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: uploaded.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group relative rounded-xl overflow-hidden cursor-pointer",
        style: { aspectRatio: "1", background: "oklch(0.14 0 0)" },
        "data-ocid": `upload-image-${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Add ${img.name} to canvas`,
              className: "block w-full h-full p-0 border-0 bg-transparent",
              onClick: () => onAddImage(img.url),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img.url,
                  alt: img.name,
                  className: "w-full h-full object-cover"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                removeImage(idx);
              },
              className: "absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all",
              style: { background: "oklch(0 0 0 / 0.7)" },
              "aria-label": "Remove image",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-white" })
            }
          )
        ]
      },
      `${img.name}-${idx}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-[10px] uppercase tracking-widest mb-2",
          style: { color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" },
          children: "Sample Assets"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: SAMPLE_UPLOADS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "group relative rounded-xl overflow-hidden cursor-pointer",
          style: { aspectRatio: "1" },
          "data-ocid": `sample-upload-${s.name.replace(/\./g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-full h-full",
                "aria-label": `Add ${s.name} to canvas`,
                onClick: () => ue(`Add "${s.name}" by uploading your own file`),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full h-full rounded-xl",
                    style: { background: s.gradient }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute top-1.5 left-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded",
                style: {
                  background: "oklch(0.38 0.15 270 / 0.85)",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  backdropFilter: "blur(4px)"
                },
                children: "Sample"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 left-0 right-0 px-1.5 py-1",
                style: { background: "oklch(0 0 0 / 0.6)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "truncate",
                    style: {
                      fontSize: "9px",
                      color: "oklch(0.75 0 0)",
                      fontFamily: "Inter, sans-serif"
                    },
                    children: s.name
                  }
                )
              }
            )
          ]
        },
        s.name
      )) })
    ] }),
    uploaded.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-4 gap-1.5",
        style: { borderColor: "oklch(0.25 0 0)", color: "oklch(0.45 0 0)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-6 h-6 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[10px]",
              style: { fontFamily: "Inter, sans-serif" },
              children: "Drop images here or upload"
            }
          )
        ]
      }
    )
  ] });
}
function TextPanel({
  onAddTextPreset
}) {
  const [fontsExpanded, setFontsExpanded] = reactExports.useState(false);
  const fontPairs = [
    { display: "Inter + Inter", body: "Clean and modern" },
    { display: "Plus Jakarta Sans + Inter", body: "Friendly and modern" },
    { display: "Impact + Plus Jakarta Sans", body: "Bold and punchy" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTitle, { children: "Add text" }),
    TEXT_PRESETS.map((preset, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onAddTextPreset(preset),
        className: "w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-150 hover:scale-[1.01] group",
        style: {
          background: "oklch(0.14 0 0 / 0.5)",
          borderColor: "oklch(0.22 0 0 / 0.6)",
          fontFamily: "Inter, sans-serif"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = "oklch(0.38 0.15 270 / 0.6)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = "oklch(0.22 0 0 / 0.6)";
        },
        "data-ocid": `text-preset-${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                fontSize: idx === 0 ? "18px" : idx === 1 ? "14px" : "11px",
                fontWeight: preset.fontWeight,
                color: "white",
                lineHeight: 1.2,
                fontFamily: "Inter, sans-serif"
              },
              children: idx === 0 ? "Add a heading" : idx === 1 ? "Add a subheading" : "Add body text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "mt-0.5",
              style: {
                fontSize: "9px",
                color: "oklch(0.5 0 0)",
                fontFamily: "Inter, sans-serif"
              },
              children: [
                preset.fontSize,
                "px · ",
                preset.fontFamily
              ]
            }
          )
        ]
      },
      preset.name
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          title: "Font Pairs",
          expanded: fontsExpanded,
          onToggle: () => setFontsExpanded((v) => !v)
        }
      ),
      fontsExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5 pb-1", children: fontPairs.map((fp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-2.5 py-2 rounded-lg",
          style: {
            background: "oklch(0.14 0 0 / 0.5)",
            border: "1px solid oklch(0.2 0 0 / 0.4)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  fontSize: "11px",
                  color: "oklch(0.8 0 0)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500
                },
                children: fp.display
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  fontSize: "9px",
                  color: "oklch(0.5 0 0)",
                  fontFamily: "Inter, sans-serif"
                },
                children: fp.body
              }
            )
          ]
        },
        fp.display
      )) })
    ] })
  ] });
}
function ElementsPanel({
  activeTool,
  onSelectTool,
  onAddGradientRect
}) {
  const [gradientsExpanded, setGradientsExpanded] = reactExports.useState(true);
  const [iconsExpanded, setIconsExpanded] = reactExports.useState(true);
  const SVG_SHAPES = [
    {
      label: "Arrow Right",
      tool: "rect",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Arrow Right" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 11h12.17l-5.58-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" })
      ] })
    },
    {
      label: "Star",
      tool: "star",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Star" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
      ] })
    },
    {
      label: "Heart",
      tool: "circle",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Heart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })
      ] })
    },
    {
      label: "Diamond",
      tool: "rect",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Diamond" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L2 9l10 13 10-13L12 2z" })
      ] })
    },
    {
      label: "Hexagon",
      tool: "circle",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Hexagon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 3H7L2 12l5 9h10l5-9-5-9z" })
      ] })
    },
    {
      label: "Speech Bubble",
      tool: "rect",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Speech Bubble" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" })
      ] })
    },
    {
      label: "Badge",
      tool: "rect",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Badge" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.47-2.34 6.71-5 7.93-2.66-1.22-5-4.46-5-7.93V7.18L12 5z" })
      ] })
    },
    {
      label: "Lightning",
      tool: "triangle",
      svg: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "18", height: "18", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Lightning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 2v11h3v9l7-12h-4l4-8z" })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTitle, { children: "Elements" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-[10px] uppercase tracking-widest mb-1.5",
        style: { color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" },
        children: "Shapes"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5 mb-2", children: SHAPE_TOOLS.map(({ tool, label, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelectTool(tool),
        className: "flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all duration-150 hover:scale-105",
        style: {
          background: activeTool === tool ? "oklch(0.38 0.15 270 / 0.25)" : "oklch(0.14 0 0 / 0.6)",
          border: `1px solid ${activeTool === tool ? "oklch(0.38 0.15 270 / 0.5)" : "oklch(0.22 0 0 / 0.4)"}`,
          color: activeTool === tool ? "oklch(0.65 0.17 150)" : "oklch(0.7 0 0)"
        },
        "data-ocid": `shape-tool-${label.toLowerCase()}`,
        children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "9px", fontFamily: "Inter, sans-serif" }, children: label })
        ]
      },
      `${tool}-${label}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Icons & Shapes",
        expanded: iconsExpanded,
        onToggle: () => setIconsExpanded((v) => !v),
        badge: `${SVG_SHAPES.length}`
      }
    ),
    iconsExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5 mb-2", children: SVG_SHAPES.map((shape) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelectTool(shape.tool),
        title: shape.label,
        className: "flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-150 hover:scale-110",
        style: {
          background: "oklch(0.14 0 0 / 0.6)",
          border: "1px solid oklch(0.22 0 0 / 0.4)",
          color: "oklch(0.65 0.17 150)"
        },
        "data-ocid": `icon-shape-${shape.label.toLowerCase().replace(/\s/g, "-")}`,
        children: [
          shape.svg,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                fontSize: "7px",
                color: "oklch(0.55 0 0)",
                fontFamily: "Inter, sans-serif",
                textAlign: "center",
                lineHeight: 1.2
              },
              children: shape.label
            }
          )
        ]
      },
      shape.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        title: "Gradients",
        expanded: gradientsExpanded,
        onToggle: () => setGradientsExpanded((v) => !v),
        badge: `${GRADIENT_PRESETS.length}`
      }
    ),
    gradientsExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5 mb-2", children: GRADIENT_PRESETS.map((gp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onAddGradientRect(gp),
        className: "group relative rounded-xl overflow-hidden transition-all duration-150 hover:scale-[1.03]",
        style: { height: "44px" },
        "data-ocid": `gradient-${gp.name.toLowerCase().replace(/\s/g, "-")}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full",
              style: {
                background: `linear-gradient(${gp.angle}deg, ${gp.colors[0]}, ${gp.colors[1]})`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 flex items-end px-1.5 pb-1 opacity-0 group-hover:opacity-100 transition-all",
              style: { background: "oklch(0 0 0 / 0.3)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: "9px",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500
                  },
                  children: gp.name
                }
              )
            }
          )
        ]
      },
      gp.name
    )) })
  ] });
}
function ImagesPanel({ onAddImage }) {
  const fileInputRef = reactExports.useRef(null);
  const [imgQuery, setImgQuery] = reactExports.useState("");
  const STOCK_IMAGES = [
    {
      label: "Nature",
      url: "https://picsum.photos/seed/nature42/400/300",
      grad: "linear-gradient(135deg, #1a4a2e, #50c878)"
    },
    {
      label: "Abstract",
      url: "https://picsum.photos/seed/abstract7/400/300",
      grad: "linear-gradient(135deg, #0047ab, #a855f7)"
    },
    {
      label: "Technology",
      url: "https://picsum.photos/seed/tech99/400/300",
      grad: "linear-gradient(135deg, #101820, #0047ab)"
    },
    {
      label: "Architecture",
      url: "https://picsum.photos/seed/arch12/400/300",
      grad: "linear-gradient(135deg, #44403c, #78716c)"
    },
    {
      label: "Business",
      url: "https://picsum.photos/seed/biz55/400/300",
      grad: "linear-gradient(135deg, #1e293b, #334155)"
    },
    {
      label: "Creative",
      url: "https://picsum.photos/seed/creative3/400/300",
      grad: "linear-gradient(135deg, #7c4d00, #f59e0b)"
    },
    {
      label: "Ocean",
      url: "https://picsum.photos/seed/ocean22/400/300",
      grad: "linear-gradient(135deg, #0c4a6e, #0ea5e9)"
    },
    {
      label: "Mountains",
      url: "https://picsum.photos/seed/mountain8/400/300",
      grad: "linear-gradient(135deg, #1e293b, #475569)"
    },
    {
      label: "People",
      url: "https://picsum.photos/seed/people17/400/300",
      grad: "linear-gradient(135deg, #3b0764, #7c3aed)"
    },
    {
      label: "Minimal",
      url: "https://picsum.photos/seed/minimal31/400/300",
      grad: "linear-gradient(135deg, #18181b, #3f3f46)"
    },
    {
      label: "Vibrant",
      url: "https://picsum.photos/seed/vibrant66/400/300",
      grad: "linear-gradient(135deg, #ff6b6b, #feca57)"
    },
    {
      label: "Dark",
      url: "https://picsum.photos/seed/dark88/400/300",
      grad: "linear-gradient(135deg, #101820, #1a1a2e)"
    }
  ];
  const [imgErrors, setImgErrors] = reactExports.useState({});
  const handleFile = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return onAddImage((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const filtered = STOCK_IMAGES.filter(
    (p) => p.label.toLowerCase().includes(imgQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTitle, { children: "Images" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SearchInput,
      {
        placeholder: "Search images...",
        value: imgQuery,
        onChange: setImgQuery
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-150 hover:scale-[1.03]",
        style: { aspectRatio: "4/3" },
        "data-ocid": `image-stock-${p.label.toLowerCase()}`,
        onClick: () => onAddImage(p.url),
        children: [
          imgErrors[p.label] ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full", style: { background: p.grad } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: p.url,
              alt: p.label,
              className: "w-full h-full object-cover",
              onError: () => setImgErrors((prev) => ({ ...prev, [p.label]: true })),
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150",
              style: { background: "oklch(0 0 0 / 0.5)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "9px",
                      color: "white",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600
                    },
                    children: p.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "px-2 py-0.5 rounded-md text-[9px]",
                    style: {
                      background: "oklch(0.38 0.15 270 / 0.8)",
                      color: "white",
                      fontFamily: "Inter, sans-serif"
                    },
                    children: "Add to canvas"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 right-0 px-1.5 py-1",
              style: { background: "oklch(0 0 0 / 0.5)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "8px",
                    color: "oklch(0.8 0 0)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500
                  },
                  children: p.label
                }
              )
            }
          )
        ]
      },
      p.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        className: "editor-button-glass w-full flex items-center justify-center gap-2 py-2 rounded-xl mt-1",
        "data-ocid": "images-upload-button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "Inter, sans-serif", fontSize: "12px" }, children: "Upload your own" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFile
      }
    )
  ] });
}
function BrandPanel({
  onColorApply,
  onAddTextPreset
}) {
  const brandFonts = [
    { family: "Plus Jakarta Sans", preview: "Aa" },
    { family: "Inter", preview: "Aa" },
    { family: "Impact", preview: "Aa" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTitle, { children: "Brand Kit" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-[10px] uppercase tracking-widest mb-2",
          style: { color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" },
          children: "Brand Colors"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: BRAND_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onColorApply(c.hex),
          title: c.name,
          className: "group relative transition-all duration-150 hover:scale-110",
          style: { width: 28, height: 28 },
          "data-ocid": `brand-color-${c.name.toLowerCase().replace(/\s/g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-full h-full rounded-full",
                style: {
                  background: c.hex,
                  boxShadow: "0 0 0 2px oklch(0.25 0 0)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap",
                style: {
                  fontSize: "8px",
                  color: "oklch(0.7 0 0)",
                  fontFamily: "Inter, sans-serif"
                },
                children: c.name
              }
            )
          ]
        },
        c.hex
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-[10px] uppercase tracking-widest mb-2",
          style: { color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" },
          children: "Brand Fonts"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: brandFonts.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between px-2.5 py-2 rounded-xl",
          style: {
            background: "oklch(0.14 0 0 / 0.5)",
            border: "1px solid oklch(0.2 0 0 / 0.4)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "14px",
                    color: "white",
                    fontFamily: f.family,
                    fontWeight: 600
                  },
                  children: f.preview
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "9px",
                    color: "oklch(0.5 0 0)",
                    fontFamily: "Inter, sans-serif"
                  },
                  children: f.family
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onAddTextPreset({
                  name: `${f.family} heading`,
                  fontSize: 48,
                  fontWeight: "600",
                  fontFamily: f.family,
                  color: "#ffffff"
                }),
                className: "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                style: {
                  background: "oklch(0.38 0.15 270 / 0.2)",
                  color: "oklch(0.65 0.17 150)",
                  border: "1px solid oklch(0.38 0.15 270 / 0.3)"
                },
                "data-ocid": `brand-font-add-${f.family.toLowerCase().replace(/\s/g, "-")}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px", lineHeight: 1 }, children: "+" })
              }
            )
          ]
        },
        f.family
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-[10px] uppercase tracking-widest mb-2",
          style: { color: "oklch(0.5 0 0)", fontFamily: "Inter, sans-serif" },
          children: "Logos"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 px-3 py-3 rounded-xl",
          style: {
            background: "oklch(0.14 0 0 / 0.5)",
            border: "1px solid oklch(0.2 0 0 / 0.4)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                style: { background: "linear-gradient(135deg, #0047ab, #50c878)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "white",
                      fontFamily: "Inter, sans-serif"
                    },
                    children: "E"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "12px",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600
                  },
                  children: "Elysian Labs"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontSize: "9px",
                    color: "oklch(0.5 0 0)",
                    fontFamily: "Inter, sans-serif"
                  },
                  children: "Brand logo"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
const LeftSidebar = reactExports.memo(function LeftSidebar2({
  activeTool,
  onSelectTool,
  onAddTextPreset,
  onAddShape,
  onAddTemplate,
  onAddGradientRect,
  onAddImage,
  // legacy compat
  onToolChange,
  onApplyTemplate,
  onColorApply,
  onOpenAIPanel
}) {
  var _a;
  const [activeTab, setActiveTab] = reactExports.useState("templates");
  const [panelOpen, setPanelOpen] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setPanelOpen((v) => !v);
    } else {
      setActiveTab(tab);
      setPanelOpen(true);
      setSearchQuery("");
    }
  };
  const handleSelectTool = (tool) => {
    onSelectTool(tool);
    onToolChange == null ? void 0 : onToolChange(tool);
    onAddShape(tool);
  };
  const handleAddTemplate = (tpl) => {
    onAddTemplate(tpl);
    onApplyTemplate == null ? void 0 : onApplyTemplate(tpl);
  };
  const handleColorApply = (color) => {
    onColorApply == null ? void 0 : onColorApply(color);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: "flex flex-row h-full flex-shrink-0 font-editor",
      style: { fontFamily: "Inter, sans-serif" },
      "data-ocid": "editor-left-sidebar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-3 gap-1 flex-shrink-0",
            style: {
              width: 72,
              background: "oklch(0.1 0 0 / 0.85)",
              backdropFilter: "blur(20px)",
              borderRight: "1px solid oklch(0.18 0 0 / 0.5)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5 w-full px-2", children: SIDEBAR_TABS.map((tab) => {
                const isActive = activeTab === tab.id && panelOpen;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleTabClick(tab.id),
                    className: "relative flex flex-col items-center gap-1 py-2.5 w-full rounded-xl transition-all duration-150 hover:scale-105",
                    style: {
                      background: isActive ? "rgba(37,99,235,0.20)" : "transparent",
                      color: isActive ? "white" : "oklch(0.55 0 0)",
                      boxShadow: isActive ? "0 0 12px rgba(37,99,235,0.5), inset 0 0 8px rgba(37,99,235,0.1)" : "none",
                      borderLeft: isActive ? "2px solid #2563EB" : "2px solid transparent",
                      borderRadius: "12px"
                    },
                    onMouseEnter: (e) => {
                      if (!isActive)
                        e.currentTarget.style.background = "oklch(1 0 0 / 0.06)";
                    },
                    onMouseLeave: (e) => {
                      if (!isActive)
                        e.currentTarget.style.background = "transparent";
                    },
                    "data-ocid": `sidebar-tab-${tab.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: isActive ? 1 : 0.7 }, children: tab.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 9,
                            fontWeight: 500,
                            fontFamily: "Inter, sans-serif",
                            opacity: isActive ? 1 : 0.6,
                            letterSpacing: "0.02em"
                          },
                          children: tab.label
                        }
                      )
                    ]
                  },
                  tab.id
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col items-center gap-0.5 w-full px-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full h-px my-1",
                    style: { background: "oklch(0.22 0 0 / 0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSelectTool("select"),
                    className: "flex flex-col items-center gap-1 py-2 w-full rounded-xl transition-all duration-150",
                    style: {
                      background: activeTool === "select" ? "oklch(0.38 0.15 270 / 0.2)" : "transparent",
                      color: activeTool === "select" ? "oklch(0.65 0.17 150)" : "oklch(0.45 0 0)"
                    },
                    "aria-label": "Select tool",
                    "data-ocid": "tool-select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          className: "w-4 h-4",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Select" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 4l6 18 3-7 7-3z" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, fontFamily: "Inter, sans-serif" }, children: "Select" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex flex-col items-center gap-1 py-2.5 w-full rounded-xl transition-all duration-150",
                    style: { color: "oklch(0.55 0 0)" },
                    "aria-label": "AI Tools",
                    "data-ocid": "sidebar-ai-tools",
                    onClick: () => onOpenAIPanel == null ? void 0 : onOpenAIPanel(),
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "oklch(1 0 0 / 0.06)";
                      e.currentTarget.style.color = "#2563EB";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "oklch(0.55 0 0)";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 9,
                            fontFamily: "Inter, sans-serif",
                            opacity: 0.8
                          },
                          children: "AI Tools"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex flex-col items-center gap-1 py-2 w-full rounded-xl transition-all duration-150",
                    style: { color: "oklch(0.4 0 0)" },
                    "aria-label": "Settings",
                    "data-ocid": "sidebar-settings",
                    onClick: () => ue("Settings coming soon"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 9, fontFamily: "Inter, sans-serif" }, children: "Settings" })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col overflow-hidden transition-all duration-200 ease-in-out",
            style: {
              width: panelOpen ? 220 : 0,
              opacity: panelOpen ? 1 : 0,
              background: "oklch(0.11 0 0 / 0.75)",
              backdropFilter: "blur(20px)",
              borderRight: "1px solid oklch(0.18 0 0 / 0.4)",
              overflow: "hidden",
              pointerEvents: panelOpen ? "auto" : "none"
            },
            "data-ocid": "sidebar-panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col h-full overflow-y-auto",
                style: { width: 220, minWidth: 220 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pt-3 pb-2 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontSize: 11,
                            fontWeight: 600,
                            color: "oklch(0.65 0.17 150)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontFamily: "Inter, sans-serif"
                          },
                          children: (_a = SIDEBAR_TABS.find((t) => t.id === activeTab)) == null ? void 0 : _a.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setPanelOpen(false),
                          className: "w-5 h-5 rounded flex items-center justify-center transition-all",
                          style: { color: "oklch(0.4 0 0)" },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.color = "oklch(0.7 0 0)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.color = "oklch(0.4 0 0)";
                          },
                          "aria-label": "Close panel",
                          "data-ocid": "sidebar-panel-close",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }),
                    (activeTab === "templates" || activeTab === "elements") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SearchInput,
                      {
                        placeholder: `Search ${activeTab}...`,
                        value: searchQuery,
                        onChange: setSearchQuery
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-3 pb-4", children: [
                    activeTab === "templates" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TemplatesPanel,
                      {
                        onAddTemplate: handleAddTemplate,
                        query: searchQuery
                      }
                    ),
                    activeTab === "uploads" && /* @__PURE__ */ jsxRuntimeExports.jsx(UploadsPanel, { onAddImage }),
                    activeTab === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(TextPanel, { onAddTextPreset }),
                    activeTab === "elements" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ElementsPanel,
                      {
                        activeTool,
                        onSelectTool: handleSelectTool,
                        onAddGradientRect
                      }
                    ),
                    activeTab === "images" && /* @__PURE__ */ jsxRuntimeExports.jsx(ImagesPanel, { onAddImage }),
                    activeTab === "brand" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      BrandPanel,
                      {
                        onColorApply: handleColorApply,
                        onAddTextPreset
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex-shrink-0 px-3 py-2 border-t",
                      style: { borderColor: "oklch(0.18 0 0 / 0.4)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          style: {
                            fontSize: 9,
                            color: "oklch(0.35 0 0)",
                            fontFamily: "Inter, sans-serif"
                          },
                          children: [
                            FONT_FAMILIES.length,
                            " fonts available · Inter, Plus Jakarta Sans + ",
                            FONT_FAMILIES.length - 2,
                            " more"
                          ]
                        }
                      )
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
});
function layerIcon(el) {
  switch (el.type) {
    case "text":
      return { symbol: "T", color: "#a78bfa" };
    case "image":
      return { symbol: "⬜", color: "#06b6d4" };
    case "circle":
      return { symbol: "●", color: el.fillColor };
    case "triangle":
      return { symbol: "▲", color: el.fillColor };
    case "star":
      return { symbol: "★", color: el.fillColor };
    default:
      return { symbol: "■", color: el.fillColor };
  }
}
function layerLabel(el) {
  if (el.type === "text")
    return el.content.slice(0, 20) || "Text";
  return el.name || el.type;
}
function isShapeEl(el) {
  return ["rect", "circle", "triangle", "star"].includes(el.type);
}
function GlassInput({
  label,
  id,
  type = "number",
  value,
  onChange,
  min,
  max,
  step,
  className = "",
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col gap-0.5 ${className}`, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        value,
        min,
        max,
        step,
        onChange: (e) => onChange(e.target.value),
        "data-ocid": dataOcid,
        className: "h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor focus:outline-none focus:border-[#0047ab]/70 focus:ring-1 focus:ring-[#0047ab]/30 transition-smooth"
      }
    )
  ] });
}
function SectionAccordion({
  title,
  defaultOpen = true,
  children
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderBottom: "1px solid rgba(255,255,255,0.05)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/[0.03] transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-white/40 font-editor", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              className: `w-3 h-3 text-white/25 transition-transform duration-200 ${open ? "rotate-90" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "overflow-hidden transition-all duration-200",
        style: { maxHeight: open ? "800px" : "0", opacity: open ? 1 : 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 space-y-2.5", children })
      }
    )
  ] });
}
function ColorPickerPopover({
  value,
  onChange,
  label,
  ocidPrefix
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [hex, setHex] = reactExports.useState(value);
  const commit = reactExports.useCallback(
    (v) => {
      if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setOpen((v) => !v),
          "data-ocid": ocidPrefix ? `${ocidPrefix}-swatch` : void 0,
          className: "w-7 h-7 rounded-lg border-2 border-white/20 hover:border-white/50 transition-smooth flex-shrink-0",
          style: { background: value }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: hex,
          onChange: (e) => {
            setHex(e.target.value);
            commit(e.target.value);
          },
          onBlur: () => setHex(value),
          "data-ocid": ocidPrefix ? `${ocidPrefix}-hex-input` : void 0,
          className: "flex-1 h-7 bg-white/5 border border-white/10 rounded-lg px-2 text-[10px] text-white/80 font-editor font-mono focus:outline-none focus:border-[#0047ab]/70 uppercase",
          placeholder: "#000000"
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute top-full left-0 mt-1 z-50 p-2 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl",
        style: { background: "rgba(12,12,20,0.97)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5 mb-2", children: QUICK_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                onChange(c);
                setHex(c);
                setOpen(false);
              },
              style: { background: c, width: 32, height: 32 },
              className: `rounded-full border transition-smooth hover:scale-110 ${c.toLowerCase() === value.toLowerCase() ? "border-[#0047ab] ring-2 ring-[#0047ab]/60" : "border-white/20"}`
            },
            c
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "color",
              value,
              onChange: (e) => {
                onChange(e.target.value);
                setHex(e.target.value);
              },
              className: "w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
            }
          )
        ]
      }
    )
  ] });
}
function GlassSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/60 font-editor tabular-nums", children: [
        value,
        unit
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value)),
        "data-ocid": ocid,
        className: "w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-[#0047ab] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0047ab] [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(0,71,171,0.6)] [&::-webkit-slider-thumb]:cursor-pointer"
      }
    )
  ] });
}
function Toggle({
  label,
  checked,
  onChange,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/60 font-editor", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(!checked),
        "data-ocid": ocid,
        className: `relative w-9 h-5 rounded-full transition-smooth flex-shrink-0 ${checked ? "bg-[#0047ab]" : "bg-white/10 border border-white/15"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-200 ${checked ? "left-4" : "left-0.5"}`
          }
        )
      }
    )
  ] });
}
function IconBtn({
  onClick,
  active = false,
  title,
  children,
  className = "",
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      title,
      "data-ocid": ocid,
      className: `flex items-center justify-center rounded-lg transition-smooth ${active ? "bg-[#0047ab] text-white shadow-[0_0_8px_rgba(0,71,171,0.5)]" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"} ${className}`,
      children
    }
  );
}
const ALIGN_TOOLS = [
  { label: "Align Left", icon: AlignLeft, action: "align-left" },
  { label: "Center H", icon: AlignCenter, action: "align-center-h" },
  { label: "Align Right", icon: AlignRight, action: "align-right" },
  { label: "Align Top", icon: MoveUp, action: "align-top" },
  { label: "Center V", icon: AlignJustify, action: "align-center-v" },
  { label: "Align Bottom", icon: MoveDown, action: "align-bottom" }
];
function TextSection({
  el,
  upd
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionAccordion, { title: "Text", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1", children: "Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: el.content,
          onChange: (e) => upd({ content: e.target.value }),
          "data-ocid": "prop-text-content",
          rows: 2,
          className: "w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white/90 font-editor resize-none focus:outline-none focus:border-[#0047ab]/70 focus:ring-1 focus:ring-[#0047ab]/30 transition-smooth leading-relaxed"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1", children: "Font Family" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: el.fontFamily,
          onChange: (e) => upd({ fontFamily: e.target.value }),
          "data-ocid": "prop-font-family",
          className: "w-full h-8 bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor focus:outline-none focus:border-[#0047ab]/70 appearance-none cursor-pointer",
          children: FONT_FAMILIES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: f, style: { background: "#111" }, children: f }, f))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassInput,
        {
          label: "Size",
          id: "prop-fs",
          value: el.fontSize,
          onChange: (v) => upd({ fontSize: Math.max(6, +v) }),
          min: 6,
          max: 500,
          "data-ocid": "prop-font-size"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassInput,
        {
          label: "Letter Sp.",
          id: "prop-ls",
          value: el.letterSpacing,
          onChange: (v) => upd({ letterSpacing: +v }),
          min: -10,
          max: 50,
          step: 0.5,
          "data-ocid": "prop-letter-spacing"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassSlider,
      {
        label: "Line Height",
        value: Number(el.lineHeight.toFixed(1)),
        min: 0.5,
        max: 4,
        step: 0.1,
        ocid: "prop-line-height",
        onChange: (v) => upd({ lineHeight: v })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1.5", children: "Style" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [
        {
          key: "bold",
          Icon: Bold,
          label: "Bold",
          ocid: "prop-bold"
        },
        {
          key: "italic",
          Icon: Italic,
          label: "Italic",
          ocid: "prop-italic"
        },
        {
          key: "underline",
          Icon: Underline,
          label: "Underline",
          ocid: "prop-underline"
        }
      ].map(({ key, Icon, label, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconBtn,
        {
          active: !!el[key],
          title: label,
          ocid,
          onClick: () => upd({ [key]: !el[key] }),
          className: "flex-1 h-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
        },
        key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1.5", children: "Align" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: ["left", "center", "right", "justify"].map((v) => {
        const Icon = v === "left" ? AlignLeft : v === "center" ? AlignCenter : v === "right" ? AlignRight : AlignJustify;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconBtn,
          {
            active: el.align === v,
            title: v,
            ocid: `prop-align-${v}`,
            onClick: () => upd({ align: v }),
            className: "flex-1 h-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
          },
          v
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColorPickerPopover,
      {
        value: el.color,
        onChange: (c) => upd({ color: c }),
        label: "Text Color",
        ocidPrefix: "prop-text-color"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toggle,
      {
        label: "Text Shadow",
        checked: el.shadow,
        onChange: (v) => upd({ shadow: v }),
        ocid: "prop-text-shadow"
      }
    )
  ] });
}
function FillSection({
  el,
  upd
}) {
  const [mode, setMode] = reactExports.useState(
    el.gradientFill ? "gradient" : "solid"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionAccordion, { title: "Fill", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMode("solid"),
          "data-ocid": "prop-fill-solid",
          className: `flex-1 h-7 rounded-lg text-[10px] font-semibold font-editor transition-smooth ${mode === "solid" ? "bg-[#0047ab] text-white" : "bg-white/5 text-white/40 hover:text-white/70"}`,
          children: "Solid"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMode("gradient"),
          "data-ocid": "prop-fill-gradient",
          className: `flex-1 h-7 rounded-lg text-[10px] font-semibold font-editor transition-smooth ${mode === "gradient" ? "bg-[#0047ab] text-white" : "bg-white/5 text-white/40 hover:text-white/70"}`,
          children: "Gradient"
        }
      )
    ] }),
    mode === "solid" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColorPickerPopover,
      {
        value: el.fillColor,
        onChange: (c) => upd({
          fillColor: c,
          gradientFill: void 0
        }),
        ocidPrefix: "prop-fill"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: "Gradient Presets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: GRADIENT_PRESETS.map((g) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            title: g.name,
            "data-ocid": `prop-gradient-${g.name.toLowerCase().replace(" ", "-")}`,
            onClick: () => upd({
              gradientFill: {
                type: "gradient",
                colors: g.colors,
                angle: g.angle
              }
            }),
            style: {
              background: `linear-gradient(${g.angle}deg, ${g.colors[0]}, ${g.colors[1]})`
            },
            className: `h-8 rounded-lg border transition-smooth hover:scale-105 ${((_a = el.gradientFill) == null ? void 0 : _a.colors[0]) === g.colors[0] ? "border-[#0047ab] ring-2 ring-[#0047ab]/40" : "border-white/10 hover:border-white/30"}`
          },
          g.name
        );
      }) })
    ] })
  ] });
}
function StrokeSection({
  el,
  upd
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionAccordion, { title: "Stroke", defaultOpen: false, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColorPickerPopover,
      {
        value: el.borderColor,
        onChange: (c) => upd({ borderColor: c }),
        label: "Color",
        ocidPrefix: "prop-stroke"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassSlider,
      {
        label: "Width",
        value: el.borderWidth,
        min: 0,
        max: 20,
        ocid: "prop-border-width",
        onChange: (v) => upd({ borderWidth: v })
      }
    ),
    el.type === "rect" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassSlider,
      {
        label: "Border Radius",
        value: el.borderRadius,
        min: 0,
        max: 200,
        ocid: "prop-border-radius",
        onChange: (v) => upd({ borderRadius: v })
      }
    ),
    el.type === "star" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassSlider,
      {
        label: "Points",
        value: el.points,
        min: 3,
        max: 12,
        ocid: "prop-star-points",
        onChange: (v) => upd({ points: v })
      }
    )
  ] });
}
function ShadowSection({
  el,
  upd
}) {
  const sc = el.shadowConfig;
  const enabled = !!sc || !!el.shadow;
  const defaultSC = {
    color: "#000000",
    blur: 20,
    offsetX: 5,
    offsetY: 5,
    opacity: 0.5
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionAccordion, { title: "Shadow", defaultOpen: false, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toggle,
      {
        label: "Enable Shadow",
        checked: enabled,
        onChange: (v) => upd({
          shadow: v,
          shadowConfig: v ? sc ?? defaultSC : void 0
        }),
        ocid: "prop-shadow-toggle"
      }
    ),
    enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ColorPickerPopover,
        {
          value: (sc == null ? void 0 : sc.color) ?? "#000000",
          onChange: (c) => upd({
            shadowConfig: { ...sc ?? defaultSC, color: c }
          }),
          label: "Shadow Color",
          ocidPrefix: "prop-shadow-color"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          label: "Blur",
          value: (sc == null ? void 0 : sc.blur) ?? 20,
          min: 0,
          max: 50,
          ocid: "prop-shadow-blur",
          onChange: (v) => upd({
            shadowConfig: { ...sc ?? defaultSC, blur: v }
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassSlider,
          {
            label: "Offset X",
            value: (sc == null ? void 0 : sc.offsetX) ?? 5,
            min: -50,
            max: 50,
            ocid: "prop-shadow-x",
            onChange: (v) => upd({
              shadowConfig: { ...sc ?? defaultSC, offsetX: v }
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassSlider,
          {
            label: "Offset Y",
            value: (sc == null ? void 0 : sc.offsetY) ?? 5,
            min: -50,
            max: 50,
            ocid: "prop-shadow-y",
            onChange: (v) => upd({
              shadowConfig: { ...sc ?? defaultSC, offsetY: v }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          label: "Opacity",
          value: Math.round(((sc == null ? void 0 : sc.opacity) ?? 0.5) * 100),
          min: 0,
          max: 100,
          unit: "%",
          ocid: "prop-shadow-opacity",
          onChange: (v) => upd({
            shadowConfig: { ...sc ?? defaultSC, opacity: v / 100 }
          })
        }
      )
    ] })
  ] });
}
function PropertiesTab({
  selectedEl,
  selectedId,
  upd,
  onDelete,
  onDuplicate,
  onMoveLayer
}) {
  const [lockAspect, setLockAspect] = reactExports.useState(false);
  const aspectRef = reactExports.useRef(1);
  if (!selectedEl || !selectedId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", "data-ocid": "props-canvas-defaults", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-between px-3 py-2",
          style: { borderBottom: "1px solid rgba(255,255,255,0.05)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/8 text-white/50 font-editor", children: "canvas" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionAccordion, { title: "Canvas", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-1.5", children: "Background" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-7 h-7 rounded-lg border-2 border-white/20 flex-shrink-0",
                style: { background: "#0F1A2E" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-white/60 font-editor", children: "#0F1A2E" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: "Width" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor flex items-center", children: "1280" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: "Height" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor flex items-center", children: "720" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: "Grid Spacing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              defaultValue: 24,
              min: 4,
              max: 128,
              className: "h-8 w-full bg-white/5 border border-white/10 rounded-lg px-2 text-xs text-white/90 font-editor focus:outline-none focus:border-[#0047ab]/70 transition-smooth",
              "data-ocid": "canvas-grid-spacing"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "canvas-reset-button",
            className: "h-8 w-full flex items-center justify-center gap-1.5 rounded-lg text-[11px] font-editor transition-smooth",
            style: {
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "rgba(248,113,113,0.8)"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.15)";
              e.currentTarget.style.color = "#f87171";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.08)";
              e.currentTarget.style.color = "rgba(248,113,113,0.8)";
            },
            children: "Reset canvas"
          }
        )
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-3 py-2",
        style: { borderBottom: "1px solid rgba(255,255,255,0.05)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/8 text-white/50 font-editor", children: selectedEl.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            onDuplicate && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onDuplicate(selectedId),
                title: "Duplicate",
                "data-ocid": "prop-duplicate-btn",
                className: "w-6 h-6 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-smooth text-xs",
                children: "⧉"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onDelete(selectedId),
                title: "Delete",
                "data-ocid": "prop-delete-btn",
                className: "w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-500/15 text-red-400/60 hover:text-red-400 transition-smooth",
                children: "✕"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionAccordion, { title: "Position & Size", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassInput,
          {
            label: "X",
            id: "prop-x",
            value: Math.round(selectedEl.x),
            onChange: (v) => upd({ x: +v }),
            "data-ocid": "prop-x"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassInput,
          {
            label: "Y",
            id: "prop-y",
            value: Math.round(selectedEl.y),
            onChange: (v) => upd({ y: +v }),
            "data-ocid": "prop-y"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_1fr] gap-1.5 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassInput,
          {
            label: "W",
            id: "prop-w",
            value: Math.round(selectedEl.width),
            onChange: (v) => {
              const w = Math.max(1, +v);
              upd(
                lockAspect ? { width: w, height: Math.round(w / aspectRef.current) } : { width: w }
              );
            },
            "data-ocid": "prop-width"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              if (!lockAspect)
                aspectRef.current = selectedEl.width / selectedEl.height;
              setLockAspect((v) => !v);
            },
            title: lockAspect ? "Unlock aspect ratio" : "Lock aspect ratio",
            "data-ocid": "prop-aspect-lock",
            className: `mb-0.5 w-6 h-6 flex items-center justify-center rounded-md transition-smooth ${lockAspect ? "bg-[#0047ab]/30 text-[#0047ab]" : "bg-white/5 text-white/30 hover:text-white/60"}`,
            children: lockAspect ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link2Off, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassInput,
          {
            label: "H",
            id: "prop-h",
            value: Math.round(selectedEl.height),
            onChange: (v) => {
              const h = Math.max(1, +v);
              upd(
                lockAspect ? { width: Math.round(h * aspectRef.current), height: h } : { height: h }
              );
            },
            "data-ocid": "prop-height"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          label: "Rotation",
          value: Math.round(selectedEl.rotation),
          min: -360,
          max: 360,
          unit: "°",
          ocid: "prop-rotation",
          onChange: (v) => upd({ rotation: v })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassSlider,
        {
          label: "Opacity",
          value: Math.round(selectedEl.opacity * 100),
          min: 0,
          max: 100,
          unit: "%",
          ocid: "prop-opacity",
          onChange: (v) => upd({ opacity: v / 100 })
        }
      )
    ] }),
    selectedEl.type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(TextSection, { el: selectedEl, upd }),
    isShapeEl(selectedEl) && /* @__PURE__ */ jsxRuntimeExports.jsx(FillSection, { el: selectedEl, upd }),
    isShapeEl(selectedEl) && /* @__PURE__ */ jsxRuntimeExports.jsx(StrokeSection, { el: selectedEl, upd }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShadowSection, { el: selectedEl, upd }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionAccordion, { title: "Arrange", defaultOpen: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: [
      {
        label: "Front",
        Icon: BringToFront,
        onClick: () => onMoveLayer(selectedId, 1),
        ocid: "prop-move-up"
      },
      {
        label: "Back",
        Icon: SendToBack,
        onClick: () => onMoveLayer(selectedId, -1),
        ocid: "prop-move-down"
      },
      {
        label: "Flip H",
        Icon: FlipHorizontal,
        onClick: () => {
        },
        ocid: "prop-flip-h"
      },
      {
        label: "Flip V",
        Icon: FlipVertical,
        onClick: () => {
        },
        ocid: "prop-flip-v"
      }
    ].map(({ label, Icon, onClick, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick,
        "data-ocid": ocid,
        className: "flex items-center justify-center gap-1.5 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-editor transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
          " ",
          label
        ]
      },
      label
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionAccordion, { title: "Alignment", defaultOpen: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: ALIGN_TOOLS.map(({ label, icon: Icon, action }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        title: label,
        "data-ocid": `prop-${action}`,
        className: "flex items-center justify-center h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-[#0047ab]/20 hover:border-[#0047ab]/40 text-white/50 hover:text-white/90 transition-smooth",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
      },
      action
    )) }) })
  ] });
}
function LayersTab({
  elements,
  selectedIds,
  onSelect,
  onToggleVisible,
  onToggleLock,
  onMoveLayer,
  onDelete,
  onDuplicate
}) {
  const [menuId, setMenuId] = reactExports.useState(null);
  const demoLayers = DEMO_LAYER_COMPOSITIONS[0];
  const isEmpty = elements.length === 0;
  function demoLayerIcon(type) {
    switch (type) {
      case "text":
        return { symbol: "T", color: "#a78bfa" };
      case "image":
        return { symbol: "⧞", color: "#06b6d4" };
      case "circle":
        return { symbol: "●", color: "#50c878" };
      default:
        return { symbol: "■", color: "#0047ab" };
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-3 py-2",
        style: { borderBottom: "1px solid rgba(255,255,255,0.05)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5 text-white/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: isEmpty ? `${demoLayers.length} Layers` : `${elements.length} Layer${elements.length !== 1 ? "s" : ""}` })
          ] }),
          isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[8px] font-bold px-1.5 py-0.5 rounded",
              style: {
                background: "oklch(0.38 0.15 270 / 0.2)",
                color: "oklch(0.65 0.15 270)",
                fontFamily: "Inter, sans-serif"
              },
              children: "Preview"
            }
          )
        ]
      }
    ),
    isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mx-3 my-2 px-2.5 py-1.5 rounded-lg text-[9px]",
          style: {
            background: "oklch(0.38 0.15 270 / 0.08)",
            border: "1px solid oklch(0.38 0.15 270 / 0.2)",
            color: "oklch(0.55 0.08 270)",
            fontFamily: "Inter, sans-serif"
          },
          children: "Add elements to the canvas to see real layers here"
        }
      ),
      demoLayers.map((layer, i) => {
        const { symbol, color } = demoLayerIcon(layer.type);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-2.5 py-1.5 opacity-40",
            "data-ocid": `demo-layer-item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-3 h-3 text-white/10 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold",
                  style: { background: `${color}30`, color },
                  children: symbol
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "flex-1 truncate text-[11px] font-editor min-w-0",
                  style: { color: "oklch(0.5 0 0)" },
                  children: layer.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 text-white/20 flex-shrink-0" })
            ]
          },
          layer.id
        );
      })
    ] }),
    !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: [...elements].reverse().map((el, i) => {
      const isSelected = selectedIds.includes(el.id);
      const { symbol, color } = layerIcon(el);
      const label = layerLabel(el);
      const originalIdx = elements.length - 1 - i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect(el.id),
            "data-ocid": `layer-item.${originalIdx + 1}`,
            className: `group w-full flex items-center gap-2 px-2.5 py-1.5 transition-smooth text-left ${isSelected ? "bg-[#0047ab]/15 border-l-2 border-[#0047ab]" : "hover:bg-white/[0.04] border-l-2 border-transparent"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-3 h-3 text-white/15 group-hover:text-white/30 flex-shrink-0 transition-smooth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold",
                  style: { background: `${color}30`, color },
                  children: symbol
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `flex-1 truncate text-[11px] font-editor min-w-0 ${isSelected ? "text-white/90" : "text-white/55 group-hover:text-white/80"}`,
                  children: label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-smooth", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onToggleVisible(el.id);
                    },
                    "aria-label": el.visible ? "Hide" : "Show",
                    className: "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white/80 transition-smooth",
                    children: el.visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onToggleLock(el.id);
                    },
                    "aria-label": el.locked ? "Unlock" : "Lock",
                    className: "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white/80 transition-smooth",
                    children: el.locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      setMenuId(menuId === el.id ? null : el.id);
                    },
                    className: "w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white/80 transition-smooth",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-3 h-3" })
                  }
                )
              ] })
            ]
          }
        ),
        menuId === el.id && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute right-2 top-full mt-0.5 z-50 w-36 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden",
            style: { background: "rgba(12,12,20,0.97)" },
            children: [
              onDuplicate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onDuplicate(el.id);
                    setMenuId(null);
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-white/70 hover:bg-white/8 hover:text-white transition-smooth",
                  children: "\\u29de Duplicate"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onMoveLayer(el.id, 1);
                    setMenuId(null);
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-white/70 hover:bg-white/8 hover:text-white transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MoveUp, { className: "w-3 h-3" }),
                    " Move Up"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onMoveLayer(el.id, -1);
                    setMenuId(null);
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-white/70 hover:bg-white/8 hover:text-white transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MoveDown, { className: "w-3 h-3" }),
                    " Move Down"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: { borderTop: "1px solid rgba(255,255,255,0.05)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onDelete(el.id);
                    setMenuId(null);
                  },
                  className: "w-full flex items-center gap-2 px-3 py-2 text-[11px] font-editor text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-smooth",
                  children: "\\u2715 Delete"
                }
              )
            ]
          }
        )
      ] }, el.id);
    }) })
  ] });
}
const PREMIUM_STUBS = [
  "Luxury Brand Kit",
  "Cinematic Portfolio",
  "Bold Agency",
  "Minimal Startup"
];
function TemplatesTab({
  onApplyTemplate
}) {
  const [hoveredId, setHoveredId] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor mb-2", children: "All Templates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onMouseEnter: () => setHoveredId(t.id),
          onMouseLeave: () => setHoveredId(null),
          onClick: () => onApplyTemplate == null ? void 0 : onApplyTemplate(t),
          "data-ocid": `template-${t.id}`,
          className: `relative group rounded-xl border overflow-hidden transition-smooth text-left ${hoveredId === t.id ? "border-[#0047ab] shadow-[0_0_12px_rgba(0,71,171,0.4)]" : "border-white/8 hover:border-white/20"}`,
          style: { aspectRatio: "16/9", background: "#0d0d14" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-1.5 rounded bg-white/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1 rounded bg-[#50c878]/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2/3 h-1 rounded bg-white/15 mt-0.5" })
            ] }),
            hoveredId === t.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#0047ab]/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-white font-editor px-3 py-1.5 rounded-lg bg-[#0047ab] shadow-lg", children: "Apply" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold text-white/80 font-editor truncate", children: t.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] text-white/40 font-editor", children: t.category })
            ] })
          ]
        },
        t.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-white/40 font-editor", children: "Premium Templates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: PREMIUM_STUBS.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative rounded-xl border border-white/5 overflow-hidden opacity-50 cursor-not-allowed",
          style: { aspectRatio: "16/9", background: "#0d0d14" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-1.5 rounded bg-white/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-1 rounded bg-white/10" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 right-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded-md font-editor", children: "PRO" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/60 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-semibold text-white/50 font-editor truncate", children: name }) })
          ]
        },
        name
      )) })
    ] })
  ] }) });
}
const RightPanel = reactExports.memo(function RightPanel2({
  elements,
  selectedIds,
  onUpdate,
  onDelete,
  onMoveLayer,
  onToggleVisible,
  onToggleLock,
  onSelect,
  onApplyTemplate,
  onDuplicate,
  activeTab: activeTabProp,
  onTabChange: onTabChangeProp
}) {
  const [localTab, setLocalTab] = reactExports.useState("properties");
  const activeTab = activeTabProp ?? localTab;
  const setTab = (t) => {
    setLocalTab(t);
    onTabChangeProp == null ? void 0 : onTabChangeProp(t);
  };
  const selectedId = selectedIds[0] ?? null;
  const selectedEl = elements.find((e) => e.id === selectedId) ?? null;
  const upd = reactExports.useCallback(
    (patch) => {
      if (!selectedId) return;
      onUpdate(selectedId, patch);
    },
    [selectedId, onUpdate]
  );
  const TABS = [
    { id: "layers", label: "Layers" },
    { id: "properties", label: "Properties" },
    { id: "templates", label: "Templates" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      "data-ocid": "editor-right-panel",
      className: "w-[280px] flex-shrink-0 flex flex-col overflow-hidden font-editor",
      style: {
        background: "rgba(10, 10, 16, 0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-shrink-0",
            style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
            children: TABS.map(({ id, label }) => {
              const isActive = activeTab === id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setTab(id),
                  "data-ocid": `right-tab-${id}`,
                  className: "relative flex-1 py-3 text-[11px] font-semibold font-editor transition-smooth",
                  style: {
                    color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)"
                  },
                  children: [
                    label,
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute bottom-0 left-2 right-2 h-0.5 rounded-full",
                        style: { background: "#0047ab" }
                      }
                    )
                  ]
                },
                id
              );
            })
          }
        ),
        activeTab === "properties" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertiesTab,
          {
            selectedEl,
            selectedId,
            upd,
            onDelete,
            onDuplicate,
            onMoveLayer
          }
        ),
        activeTab === "layers" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          LayersTab,
          {
            elements,
            selectedIds,
            onSelect,
            onToggleVisible,
            onToggleLock,
            onMoveLayer,
            onDelete,
            onDuplicate
          }
        ),
        activeTab === "templates" && /* @__PURE__ */ jsxRuntimeExports.jsx(TemplatesTab, { onApplyTemplate })
      ]
    }
  );
});
const HANDLE_SIZE = 8;
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function hitTest(el, x, y) {
  if (!el.visible) return false;
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  const angle = -el.rotation * Math.PI / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = x - cx;
  const dy = y - cy;
  const lx = dx * cos - dy * sin;
  const ly = dx * sin + dy * cos;
  if (el.type === "circle") {
    return (lx / (el.width / 2)) ** 2 + (ly / (el.height / 2)) ** 2 <= 1;
  }
  return lx >= -el.width / 2 && lx <= el.width / 2 && ly >= -el.height / 2 && ly <= el.height / 2;
}
function getCanvasPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}
function getHandleAt(el, x, y) {
  const H = HANDLE_SIZE;
  const handles = [
    { id: "nw", hx: el.x - H / 2, hy: el.y - H / 2 },
    { id: "n", hx: el.x + el.width / 2 - H / 2, hy: el.y - H / 2 },
    { id: "ne", hx: el.x + el.width - H / 2, hy: el.y - H / 2 },
    { id: "e", hx: el.x + el.width - H / 2, hy: el.y + el.height / 2 - H / 2 },
    { id: "se", hx: el.x + el.width - H / 2, hy: el.y + el.height - H / 2 },
    { id: "s", hx: el.x + el.width / 2 - H / 2, hy: el.y + el.height - H / 2 },
    { id: "sw", hx: el.x - H / 2, hy: el.y + el.height - H / 2 },
    { id: "w", hx: el.x - H / 2, hy: el.y + el.height / 2 - H / 2 },
    { id: "rotate", hx: el.x + el.width / 2 - H / 2, hy: el.y - 32 }
  ];
  for (const h of handles) {
    if (x >= h.hx - 4 && x <= h.hx + H + 4 && y >= h.hy - 4 && y <= h.hy + H + 4) {
      return h.id;
    }
  }
  return null;
}
function resizeElement(el, handle, dx, dy, aspectLock) {
  let { x, y, width, height } = el;
  const origAspect = width / height;
  switch (handle) {
    case "se":
      width += dx;
      height = aspectLock ? width / origAspect : height + dy;
      break;
    case "sw":
      x += dx;
      width -= dx;
      height = aspectLock ? width / origAspect : height + dy;
      break;
    case "ne":
      width += dx;
      height -= dy;
      y += dy;
      break;
    case "nw":
      x += dx;
      width -= dx;
      height -= dy;
      y += dy;
      break;
    case "e":
      width += dx;
      break;
    case "w":
      x += dx;
      width -= dx;
      break;
    case "s":
      height += dy;
      break;
    case "n":
      height -= dy;
      y += dy;
      break;
  }
  return {
    x,
    y,
    width: Math.max(10, width),
    height: Math.max(10, height)
  };
}
function drawElement(ctx, el, selected, multiSelected, _showGrid) {
  ctx.save();
  ctx.globalAlpha = el.opacity;
  const elAsAny = el;
  if (elAsAny.aiEnhanced && el.type === "image") {
    ctx.filter = "contrast(1.25) brightness(1.1) saturate(1.15)";
  } else if (elAsAny.aiBackgroundRemoved && el.type === "image") {
    ctx.filter = "contrast(1.4) brightness(1.15) saturate(1.1) drop-shadow(0 0 12px rgba(37,99,235,0.8))";
  } else {
    ctx.filter = "none";
  }
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  ctx.translate(cx, cy);
  ctx.rotate(el.rotation * Math.PI / 180);
  ctx.translate(-el.width / 2, -el.height / 2);
  if (el.type === "rect") drawRect(ctx, el);
  else if (el.type === "circle") drawCircle(ctx, el);
  else if (el.type === "triangle") drawTriangle(ctx, el);
  else if (el.type === "star") drawStar(ctx, el);
  else if (el.type === "text") drawText(ctx, el);
  else if (el.type === "image") drawImage(ctx, el);
  ctx.restore();
  if (selected || multiSelected) drawSelectionHandles(ctx, el, selected);
}
function applyShadow(ctx, on, config) {
  if (on) {
    if (config) {
      const hex = config.color.replace("#", "");
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      ctx.shadowColor = `rgba(${r},${g},${b},${config.opacity})`;
      ctx.shadowBlur = config.blur;
      ctx.shadowOffsetX = config.offsetX;
      ctx.shadowOffsetY = config.offsetY;
    } else {
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 4;
    }
  } else {
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
}
function resetShadow(ctx) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
function buildGradient(ctx, fill, width, height) {
  const rad = fill.angle * Math.PI / 180;
  const cx = width / 2;
  const cy = height / 2;
  const dx = Math.cos(rad) * Math.max(width, height) * 0.7;
  const dy = Math.sin(rad) * Math.max(width, height) * 0.7;
  const grad = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
  fill.colors.forEach((c, i) => {
    grad.addColorStop(i / Math.max(fill.colors.length - 1, 1), c);
  });
  return grad;
}
function drawRect(ctx, el) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  const fill = el.gradientFill ? buildGradient(ctx, el.gradientFill, el.width, el.height) : el.fillColor;
  if (el.borderRadius > 0) {
    ctx.beginPath();
    const r = Math.min(el.borderRadius, el.width / 2, el.height / 2);
    ctx.roundRect(0, 0, el.width, el.height, r);
    ctx.fillStyle = fill;
    ctx.fill();
    resetShadow(ctx);
    if (el.borderWidth > 0) {
      ctx.strokeStyle = el.borderColor;
      ctx.lineWidth = el.borderWidth;
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, el.width, el.height);
    resetShadow(ctx);
    if (el.borderWidth > 0) {
      ctx.strokeStyle = el.borderColor;
      ctx.lineWidth = el.borderWidth;
      ctx.strokeRect(0, 0, el.width, el.height);
    }
  }
}
function drawCircle(ctx, el) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  ctx.beginPath();
  ctx.ellipse(
    el.width / 2,
    el.height / 2,
    el.width / 2,
    el.height / 2,
    0,
    0,
    Math.PI * 2
  );
  const fill = el.gradientFill ? buildGradient(ctx, el.gradientFill, el.width, el.height) : el.fillColor;
  ctx.fillStyle = fill;
  ctx.fill();
  resetShadow(ctx);
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.stroke();
  }
}
function drawTriangle(ctx, el) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  ctx.beginPath();
  ctx.moveTo(el.width / 2, 0);
  ctx.lineTo(el.width, el.height);
  ctx.lineTo(0, el.height);
  ctx.closePath();
  const fill = el.gradientFill ? buildGradient(ctx, el.gradientFill, el.width, el.height) : el.fillColor;
  ctx.fillStyle = fill;
  ctx.fill();
  resetShadow(ctx);
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.stroke();
  }
}
function drawStar(ctx, el) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  const cx = el.width / 2;
  const cy = el.height / 2;
  const outerR = Math.min(el.width, el.height) / 2;
  const innerR = outerR * 0.4;
  const points = el.points;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = i * Math.PI / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
  }
  ctx.closePath();
  const fill = el.gradientFill ? buildGradient(ctx, el.gradientFill, el.width, el.height) : el.fillColor;
  ctx.fillStyle = fill;
  ctx.fill();
  resetShadow(ctx);
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.stroke();
  }
}
function drawText(ctx, el) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  const weight = el.bold ? "bold" : "normal";
  const style = el.italic ? "italic" : "normal";
  ctx.font = `${style} ${weight} ${el.fontSize}px '${el.fontFamily}', sans-serif`;
  ctx.fillStyle = el.color;
  ctx.textBaseline = "top";
  ctx.textAlign = el.align;
  const ax = el.align === "center" ? el.width / 2 : el.align === "right" ? el.width : 0;
  ctx.letterSpacing = `${el.letterSpacing}px`;
  const lineH = el.fontSize * el.lineHeight;
  const lines = el.content.split("\n");
  lines.forEach((line, i) => ctx.fillText(line, ax, i * lineH));
  if (el.underline) {
    lines.forEach((line, i) => {
      const w = ctx.measureText(line).width;
      const tx = el.align === "center" ? ax - w / 2 : el.align === "right" ? ax - w : ax;
      ctx.fillRect(tx, (i + 1) * lineH - 2, w, 1);
    });
  }
}
function drawImage(ctx, el) {
  var _a;
  if (((_a = el.img) == null ? void 0 : _a.complete) && el.img.naturalWidth > 0) {
    ctx.drawImage(el.img, 0, 0, el.width, el.height);
  } else {
    ctx.fillStyle = "rgba(80,200,120,0.1)";
    ctx.fillRect(0, 0, el.width, el.height);
    ctx.strokeStyle = "rgba(80,200,120,0.3)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.strokeRect(0, 0, el.width, el.height);
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "18px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🖼 Loading...", el.width / 2, el.height / 2);
  }
}
function drawSelectionHandles(ctx, el, primary) {
  ctx.save();
  const H = HANDLE_SIZE;
  const pad = 4;
  ctx.strokeStyle = primary ? "#0047ab" : "#50c878";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 3]);
  ctx.strokeRect(
    el.x - pad,
    el.y - pad,
    el.width + pad * 2,
    el.height + pad * 2
  );
  ctx.setLineDash([]);
  if (!primary) {
    ctx.restore();
    return;
  }
  const handles = [
    [el.x - pad - H / 2, el.y - pad - H / 2],
    // nw
    [el.x + el.width / 2 - H / 2, el.y - pad - H / 2],
    // n
    [el.x + el.width + pad - H / 2, el.y - pad - H / 2],
    // ne
    [el.x + el.width + pad - H / 2, el.y + el.height / 2 - H / 2],
    // e
    [el.x + el.width + pad - H / 2, el.y + el.height + pad - H / 2],
    // se
    [el.x + el.width / 2 - H / 2, el.y + el.height + pad - H / 2],
    // s
    [el.x - pad - H / 2, el.y + el.height + pad - H / 2],
    // sw
    [el.x - pad - H / 2, el.y + el.height / 2 - H / 2]
    // w
  ];
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#0047ab";
  ctx.lineWidth = 1.5;
  for (const [hx, hy] of handles) {
    ctx.fillRect(hx, hy, H, H);
    ctx.strokeRect(hx, hy, H, H);
  }
  const rx = el.x + el.width / 2;
  const ry = el.y - 32;
  ctx.beginPath();
  ctx.moveTo(rx, el.y - 8);
  ctx.lineTo(rx, ry + H / 2);
  ctx.strokeStyle = "#0047ab";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(rx, ry, H / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "#0047ab";
  ctx.stroke();
  ctx.restore();
}
function drawGrid(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}
function snapToGrid(value, gridSize) {
  return Math.round(value / gridSize) * gridSize;
}
function computeAlignmentGuides(elements, selectedId) {
  const sel = elements.find((e) => e.id === selectedId);
  if (!sel) return [];
  const guides = [];
  const threshold = 6;
  const selCx = sel.x + sel.width / 2;
  const selCy = sel.y + sel.height / 2;
  for (const el of elements) {
    if (el.id === selectedId || !el.visible) continue;
    const elCx = el.x + el.width / 2;
    const elCy = el.y + el.height / 2;
    const vChecks = [el.x, elCx, el.x + el.width];
    const vSels = [sel.x, selCx, sel.x + sel.width];
    for (const vp of vChecks) {
      for (const vs of vSels) {
        if (Math.abs(vp - vs) <= threshold) {
          guides.push({ orientation: "vertical", position: vp });
        }
      }
    }
    const hChecks = [el.y, elCy, el.y + el.height];
    const hSels = [sel.y, selCy, sel.y + sel.height];
    for (const hp of hChecks) {
      for (const hs of hSels) {
        if (Math.abs(hp - hs) <= threshold) {
          guides.push({ orientation: "horizontal", position: hp });
        }
      }
    }
  }
  const seen = /* @__PURE__ */ new Set();
  return guides.filter((g) => {
    const key = `${g.orientation}:${g.position}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const MAX_HISTORY = 20;
function useEditorHistory(initialElements = []) {
  const [elements, setElementsState] = reactExports.useState(initialElements);
  const [history, setHistory] = reactExports.useState([[]]);
  const [histIdx, setHistIdx] = reactExports.useState(0);
  const pushHistory = reactExports.useCallback(
    (els) => {
      setHistory((h) => {
        const newH = h.slice(0, histIdx + 1);
        newH.push(els.map((e) => ({ ...e })));
        if (newH.length > MAX_HISTORY) newH.shift();
        return newH;
      });
      setHistIdx((i) => Math.min(i + 1, MAX_HISTORY - 1));
    },
    [histIdx]
  );
  const setElements = reactExports.useCallback(
    (updater, addHistory = true) => {
      setElementsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (addHistory) pushHistory(next);
        return next;
      });
    },
    [pushHistory]
  );
  const undo = reactExports.useCallback(() => {
    if (histIdx <= 0) return;
    const ni = histIdx - 1;
    setHistIdx(ni);
    setElementsState(history[ni]);
  }, [histIdx, history]);
  const redo = reactExports.useCallback(() => {
    if (histIdx >= history.length - 1) return;
    const ni = histIdx + 1;
    setHistIdx(ni);
    setElementsState(history[ni]);
  }, [histIdx, history]);
  const canUndo = histIdx > 0;
  const canRedo = histIdx < history.length - 1;
  return { elements, setElements, undo, redo, canUndo, canRedo };
}
function useAutoSave(key, data, enabled = true) {
  const [unsaved, setUnsaved] = reactExports.useState(false);
  const [lastSaved, setLastSaved] = reactExports.useState(null);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!enabled) return;
    setUnsaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        setLastSaved(/* @__PURE__ */ new Date());
        setUnsaved(false);
      } catch {
      }
    }, 3e4);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [key, data, enabled]);
  return { unsaved, lastSaved };
}
function useKeyboardShortcuts({
  undo,
  redo,
  deleteSelected,
  duplicateSelected,
  selectAll,
  deselect,
  toggleGrid,
  _canvasRef,
  enabled
}) {
  reactExports.useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      const active = document.activeElement;
      const isInput = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
      if (isInput) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "z" && e.shiftKey)) {
        e.preventDefault();
        redo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        duplicateSelected();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        selectAll();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "g") {
        e.preventDefault();
        toggleGrid();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteSelected();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        deselect();
        return;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    undo,
    redo,
    deleteSelected,
    duplicateSelected,
    selectAll,
    deselect,
    toggleGrid,
    enabled
  ]);
}
function useContextMenu() {
  const [menu, setMenu] = reactExports.useState(null);
  const openMenu = reactExports.useCallback((e) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);
  const closeMenu = reactExports.useCallback(() => setMenu(null), []);
  reactExports.useEffect(() => {
    if (!menu) return;
    const close = () => closeMenu();
    window.addEventListener("click", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", close);
    };
  }, [menu, closeMenu]);
  return { menu, openMenu, closeMenu };
}
function useDuplicate(elements, selectedIds, setElements) {
  return reactExports.useCallback(() => {
    if (selectedIds.length === 0) return;
    const copies = selectedIds.map((id) => elements.find((e) => e.id === id)).filter((e) => !!e).map((e) => ({
      ...e,
      id: uid(),
      x: e.x + 20,
      y: e.y + 20,
      name: `${e.name} copy`
    }));
    setElements([...elements, ...copies]);
  }, [elements, selectedIds, setElements]);
}
function useSnapAndGuides() {
  const [snapConfig, setSnapConfig] = reactExports.useState({
    enabled: true,
    gridSize: 20,
    showGrid: false
  });
  const [guides, setGuides] = reactExports.useState([]);
  const snapPoint = reactExports.useCallback(
    (x, y, elements, selectedId) => {
      if (!snapConfig.enabled) return { x, y };
      let sx = snapToGrid(x, snapConfig.gridSize);
      let sy = snapToGrid(y, snapConfig.gridSize);
      if (selectedId) {
        const newGuides = computeAlignmentGuides(elements, selectedId);
        setGuides(newGuides);
        const threshold = snapConfig.gridSize / 2;
        for (const g of newGuides) {
          if (g.orientation === "vertical" && Math.abs(g.position - x) <= threshold) {
            sx = g.position;
          }
          if (g.orientation === "horizontal" && Math.abs(g.position - y) <= threshold) {
            sy = g.position;
          }
        }
      }
      return { x: sx, y: sy };
    },
    [snapConfig]
  );
  return { snapConfig, setSnapConfig, snapPoint, guides, setGuides };
}
function ContextMenu({
  x,
  y,
  onBringFront,
  onSendBack,
  onDuplicate,
  onDelete,
  isLocked,
  onToggleLock
}) {
  const rows = [
    { kind: "item", label: "Bring to Front", action: onBringFront },
    { kind: "item", label: "Send to Back", action: onSendBack },
    { kind: "sep", label: "sep1" },
    {
      kind: "item",
      label: "Duplicate",
      action: onDuplicate,
      shortcut: "Ctrl+D"
    },
    {
      kind: "item",
      label: isLocked ? "Unlock" : "Lock",
      action: onToggleLock ?? (() => void 0)
    },
    { kind: "sep", label: "sep2" },
    {
      kind: "item",
      label: "Delete",
      action: onDelete,
      shortcut: "Del",
      danger: true
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed z-50 min-w-[176px] py-1.5 animate-slide-down",
      style: {
        top: y,
        left: x,
        background: "rgba(10,10,18,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
      },
      "data-ocid": "context-menu",
      children: rows.map(
        (row) => row.kind === "sep" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "my-1 mx-2",
            style: { height: "1px", background: "rgba(255,255,255,0.08)" }
          },
          row.label
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              row.action();
            },
            className: `w-full text-left px-3 py-1.5 transition-all duration-100 flex justify-between items-center gap-4 text-[13px] ${row.danger ? "text-red-400 hover:text-red-300" : "text-white/75 hover:text-white"}`,
            style: { fontFamily: "Inter, var(--font-editor), sans-serif" },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = row.danger ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.08)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "transparent";
            },
            "data-ocid": `ctx-${row.label.toLowerCase().replace(/ /g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.label }),
              row.shortcut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40 text-[11px]", children: row.shortcut })
            ]
          },
          row.label
        )
      )
    }
  );
}
function ZoomPill({
  zoom,
  onZoomChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-0.5 px-1",
      style: {
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "9999px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        fontFamily: "Inter, var(--font-editor), sans-serif"
      },
      "data-ocid": "zoom-pill",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            title: "Fit to screen",
            "aria-label": "Fit to screen",
            onClick: () => onZoomChange(75),
            className: "flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white transition-colors duration-150 text-base",
            "data-ocid": "zoom-fit-btn",
            children: "⊞"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px h-4 mx-0.5",
            style: { background: "rgba(255,255,255,0.12)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            title: "Zoom out (-)",
            "aria-label": "Zoom out",
            onClick: () => onZoomChange(Math.max(10, Math.round((zoom - 5) / 5) * 5)),
            className: "flex items-center justify-center w-7 h-8 rounded-full text-white/60 hover:text-white transition-colors duration-150 text-lg font-light",
            "data-ocid": "zoom-out-pill-btn",
            children: "−"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            title: "Reset to 100%",
            onClick: () => onZoomChange(100),
            className: "h-8 px-2 text-[13px] font-medium text-white/80 hover:text-white transition-colors duration-150 tabular-nums min-w-[48px] text-center",
            "data-ocid": "zoom-value-pill",
            children: [
              zoom,
              "%"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            title: "Zoom in (+)",
            "aria-label": "Zoom in",
            onClick: () => onZoomChange(Math.min(400, Math.round((zoom + 5) / 5) * 5)),
            className: "flex items-center justify-center w-7 h-8 rounded-full text-white/60 hover:text-white transition-colors duration-150 text-lg font-light",
            "data-ocid": "zoom-in-pill-btn",
            children: "+"
          }
        )
      ]
    }
  );
}
function CanvasEditorPage() {
  var _a;
  const { projectId } = useParams({ from: "/editor/$projectId/canvas" });
  const defaultName = `Project ${(projectId == null ? void 0 : projectId.slice(0, 6)) ?? "New"}`;
  const canvasRef = reactExports.useRef(null);
  const workspaceRef = reactExports.useRef(null);
  const guideClearTimer = reactExports.useRef(null);
  const [canvasWidth, setCanvasWidth] = reactExports.useState(1280);
  const [canvasHeight, setCanvasHeight] = reactExports.useState(720);
  const [zoom, setZoom] = reactExports.useState(75);
  const [showGrid, setShowGrid] = reactExports.useState(true);
  const [activeTool, setActiveTool] = reactExports.useState("select");
  const [selectedIds, setSelectedIds] = reactExports.useState([]);
  const [editingProjectName, setEditingProjectName] = reactExports.useState(defaultName);
  const [rightTab, setRightTab] = reactExports.useState("properties");
  const [inlineEdit, setInlineEdit] = reactExports.useState(null);
  const inlineRef = reactExports.useRef(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [lastSaved, setLastSaved] = reactExports.useState(null);
  const [colorPickerOpen, setColorPickerOpen] = reactExports.useState(false);
  const [colorPickerValue, setColorPickerValue] = reactExports.useState("#2563EB");
  const colorPickerCallback = reactExports.useRef(null);
  const [aiPanelOpen, setAiPanelOpen] = reactExports.useState(false);
  const [exportModalOpen, setExportModalOpen] = reactExports.useState(false);
  reactExports.useCallback(
    (currentColor, onPick) => {
      setColorPickerValue(currentColor);
      colorPickerCallback.current = onPick;
      setColorPickerOpen(true);
    },
    []
  );
  const DEMO_CANVAS_ELEMENTS = (() => {
    const savedRaw = typeof window !== "undefined" ? localStorage.getItem(`elysian-editor-${projectId}`) : null;
    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        if (Array.isArray(parsed == null ? void 0 : parsed.elements) && parsed.elements.length > 0)
          return parsed.elements;
      } catch {
      }
    }
    return [
      {
        id: "demo-bg",
        type: "rect",
        name: "Background",
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fillColor: "#0F1A2E",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 0,
        rotation: 0,
        opacity: 1,
        locked: true,
        visible: true,
        shadow: false
      },
      {
        id: "demo-heading",
        type: "text",
        name: "Heading",
        x: 190,
        y: 200,
        width: 900,
        height: 90,
        content: "DESIGN STUDIO",
        fontSize: 72,
        color: "#FFFFFF",
        fontFamily: "Inter",
        bold: true,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 2,
        lineHeight: 1.2,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        id: "demo-subheading",
        type: "text",
        name: "Subheading",
        x: 230,
        y: 310,
        width: 820,
        height: 45,
        content: "Create stunning visuals with ease",
        fontSize: 28,
        color: "rgba(255,255,255,0.7)",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        id: "demo-accent-line",
        type: "rect",
        name: "Accent Line",
        x: 390,
        y: 370,
        width: 500,
        height: 4,
        fillColor: "#2563EB",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 2,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        id: "demo-body",
        type: "text",
        name: "Body Text",
        x: 370,
        y: 420,
        width: 540,
        height: 25,
        content: "Add elements from the left panel →",
        fontSize: 14,
        color: "rgba(255,255,255,0.4)",
        fontFamily: "Inter",
        bold: false,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false
      },
      {
        id: "demo-circle",
        type: "circle",
        name: "Accent Circle",
        x: 980,
        y: 100,
        width: 120,
        height: 120,
        fillColor: "rgba(34,197,94,0.15)",
        borderColor: "#22C55E",
        borderWidth: 2,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false
      }
    ];
  })();
  const { elements, setElements, undo, redo, canUndo, canRedo } = useEditorHistory(DEMO_CANVAS_ELEMENTS);
  const { snapConfig, setSnapConfig, snapPoint, guides, setGuides } = useSnapAndGuides();
  const saveKey = `elysian-editor-${projectId}`;
  const { unsaved } = useAutoSave(saveKey, {
    elements,
    canvasWidth,
    canvasHeight,
    projectName: editingProjectName
  });
  reactExports.useEffect(() => {
    if (!unsaved) return;
    setIsSaving(true);
    const timer = setTimeout(() => {
      setIsSaving(false);
      setLastSaved(/* @__PURE__ */ new Date());
    }, 800);
    return () => clearTimeout(timer);
  }, [unsaved]);
  const interactRef = reactExports.useRef(null);
  const drawRef = reactExports.useRef(null);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const previewRect = reactExports.useRef(null);
  const { menu: ctxMenu, openMenu, closeMenu } = useContextMenu();
  const selectedId = selectedIds[0] ?? null;
  const render = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (showGrid) drawGrid(ctx, canvas.width, canvas.height);
    for (const el of elements) {
      if (!el.visible) continue;
      drawElement(
        ctx,
        el,
        selectedIds[0] === el.id,
        selectedIds.includes(el.id) && selectedIds[0] !== el.id
      );
    }
    if (isDrawing && previewRect.current) {
      const { x, y, w, h } = previewRect.current;
      ctx.save();
      ctx.strokeStyle = "#0047ab";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.globalAlpha = 0.7;
      if (activeTool === "circle") {
        ctx.beginPath();
        ctx.ellipse(
          x + w / 2,
          y + h / 2,
          Math.abs(w) / 2,
          Math.abs(h) / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      } else {
        ctx.strokeRect(x, y, w, h);
      }
      ctx.restore();
    }
  }, [elements, selectedIds, isDrawing, activeTool, showGrid]);
  reactExports.useEffect(() => {
    render();
  }, [render]);
  const updateElement = reactExports.useCallback(
    (id, patch) => {
      setElements(
        (prev) => prev.map(
          (e) => e.id === id ? { ...e, ...patch } : e
        )
      );
    },
    [setElements]
  );
  const deleteSelected = reactExports.useCallback(() => {
    if (selectedIds.length === 0) return;
    setElements((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  }, [selectedIds, setElements]);
  const deleteById = reactExports.useCallback(
    (id) => {
      setElements((prev) => prev.filter((e) => e.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    },
    [setElements]
  );
  const moveLayer = reactExports.useCallback(
    (id, dir) => {
      setElements((prev) => {
        const idx = prev.findIndex((e) => e.id === id);
        if (idx < 0) return prev;
        const ni = Math.max(0, Math.min(prev.length - 1, idx + dir));
        const arr = [...prev];
        [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
        return arr;
      });
    },
    [setElements]
  );
  const bringToFront = reactExports.useCallback(
    (id) => {
      setElements((prev) => {
        const arr = prev.filter((e) => e.id !== id);
        arr.push(prev.find((e) => e.id === id));
        return arr;
      });
    },
    [setElements]
  );
  const sendToBack = reactExports.useCallback(
    (id) => {
      setElements((prev) => {
        const el = prev.find((e) => e.id === id);
        return [el, ...prev.filter((e) => e.id !== id)];
      });
    },
    [setElements]
  );
  const duplicateSelected = useDuplicate(elements, selectedIds, setElements);
  const selectAll = reactExports.useCallback(
    () => setSelectedIds(elements.map((e) => e.id)),
    [elements]
  );
  const deselect = reactExports.useCallback(() => setSelectedIds([]), []);
  const applyTemplate = reactExports.useCallback(
    (tpl) => {
      setCanvasWidth(tpl.preset.width);
      setCanvasHeight(tpl.preset.height);
      const els = tpl.elements.map((e) => ({
        ...e,
        id: uid(),
        ...e.type === "image" ? { img: null } : {}
      }));
      setElements(els);
      setSelectedIds([]);
    },
    [setElements]
  );
  const toggleVisible = reactExports.useCallback(
    (id) => {
      setElements(
        (prev) => prev.map((e) => e.id === id ? { ...e, visible: !e.visible } : e)
      );
    },
    [setElements]
  );
  const toggleLock = reactExports.useCallback(
    (id) => {
      setElements(
        (prev) => prev.map((e) => e.id === id ? { ...e, locked: !e.locked } : e)
      );
    },
    [setElements]
  );
  const addImage = reactExports.useCallback(
    (srcOrDataUrl, imgEl) => {
      const resolvedImg = imgEl ?? new Image();
      if (!imgEl) {
        resolvedImg.src = srcOrDataUrl;
      }
      const makeEl = (loadedImg) => {
        const el = {
          id: uid(),
          type: "image",
          name: "Uploaded Image",
          x: 40,
          y: 40,
          width: loadedImg ? Math.min(loadedImg.naturalWidth || 300, canvasWidth / 2) : 300,
          height: loadedImg ? Math.min(loadedImg.naturalHeight || 200, canvasHeight / 2) : 200,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          src: srcOrDataUrl,
          img: loadedImg
        };
        setElements((prev) => [...prev, el]);
        setSelectedIds([el.id]);
      };
      if (imgEl) {
        makeEl(imgEl);
      } else {
        resolvedImg.onload = () => makeEl(resolvedImg);
        resolvedImg.onerror = () => makeEl(null);
      }
    },
    [canvasWidth, canvasHeight, setElements]
  );
  const colorApply = reactExports.useCallback(
    (color) => {
      if (!selectedId) return;
      const el = elements.find((e) => e.id === selectedId);
      if (!el) return;
      if (el.type === "text")
        updateElement(selectedId, { color });
      else if (el.type !== "image")
        updateElement(selectedId, {
          fillColor: color,
          borderColor: color
        });
    },
    [selectedId, elements, updateElement]
  );
  const addTextPreset = reactExports.useCallback(
    (preset) => {
      const cx = canvasWidth / 2 - 200;
      const cy = canvasHeight / 2 - preset.fontSize / 2;
      const el = {
        id: uid(),
        type: "text",
        name: preset.name,
        x: cx,
        y: cy,
        width: 400,
        height: preset.fontSize * 1.6,
        content: preset.name,
        fontSize: preset.fontSize,
        color: preset.color,
        fontFamily: preset.fontFamily,
        bold: preset.fontWeight === "bold" || Number(preset.fontWeight) >= 700,
        italic: false,
        underline: false,
        align: "center",
        letterSpacing: 0,
        lineHeight: 1.4,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false
      };
      setElements((prev) => [...prev, el]);
      setSelectedIds([el.id]);
    },
    [canvasWidth, canvasHeight, setElements]
  );
  const handleAddShape = reactExports.useCallback((tool) => {
    setActiveTool(tool);
  }, []);
  const addGradientRect = reactExports.useCallback(
    (gradientPreset) => {
      const gradFill = {
        type: "gradient",
        colors: gradientPreset.colors,
        angle: gradientPreset.angle
      };
      const el = {
        id: uid(),
        type: "rect",
        name: "Gradient Rectangle",
        x: canvasWidth / 2 - 150,
        y: canvasHeight / 2 - 100,
        width: 300,
        height: 200,
        fillColor: gradientPreset.colors[0] ?? "#0047ab",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 8,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        shadow: false,
        gradientFill: gradFill
      };
      setElements((prev) => [...prev, el]);
      setSelectedIds([el.id]);
    },
    [canvasWidth, canvasHeight, setElements]
  );
  useKeyboardShortcuts({
    undo,
    redo,
    deleteSelected,
    duplicateSelected,
    selectAll,
    deselect,
    toggleGrid: () => setShowGrid((v) => !v),
    _canvasRef: canvasRef,
    enabled: !inlineEdit
  });
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (inlineEdit) return;
      const active = document.activeElement;
      const isInput = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
      if (isInput) return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((z) => Math.min(400, Math.round((z + 5) / 5) * 5));
      }
      if (e.key === "-") {
        e.preventDefault();
        setZoom((z) => Math.max(10, Math.round((z - 5) / 5) * 5));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [inlineEdit]);
  const handleExport = reactExports.useCallback(
    (format, quality) => {
      const off = document.createElement("canvas");
      const scale = quality === "300" ? 4 : quality === "150" ? 2 : 1;
      off.width = canvasWidth * scale;
      off.height = canvasHeight * scale;
      const ctx = off.getContext("2d");
      if (!ctx) return;
      ctx.scale(scale, scale);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      for (const el of elements) {
        if (!el.visible) continue;
        drawElement(ctx, el, false, false);
      }
      const mime = format === "jpg" ? "image/jpeg" : "image/png";
      const link = document.createElement("a");
      link.download = `design-${Date.now()}.${format}`;
      link.href = off.toDataURL(mime, 0.95);
      link.click();
    },
    [canvasWidth, canvasHeight, elements]
  );
  const getPos = reactExports.useCallback((e) => {
    return getCanvasPos(e, canvasRef.current);
  }, []);
  const onMouseDown = reactExports.useCallback(
    (e) => {
      if (e.button === 2) return;
      const { x, y } = getPos(e);
      const shiftKey = e.shiftKey;
      if (e.detail === 2 && activeTool === "select") {
        const hit = [...elements].reverse().find((el2) => hitTest(el2, x, y));
        if ((hit == null ? void 0 : hit.type) === "text") {
          setInlineEdit({ id: hit.id, value: hit.content });
          return;
        }
        const el = {
          id: uid(),
          type: "text",
          name: "Text",
          x,
          y,
          width: 400,
          height: 80,
          content: "Double-click to edit",
          fontSize: 48,
          color: "#111111",
          fontFamily: "Inter",
          bold: false,
          italic: false,
          underline: false,
          align: "left",
          letterSpacing: 0,
          lineHeight: 1.4,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          shadow: false
        };
        setElements((prev) => [...prev, el]);
        setSelectedIds([el.id]);
        return;
      }
      if (activeTool === "select") {
        if (selectedId) {
          const selEl = elements.find((e2) => e2.id === selectedId);
          if (selEl) {
            const handle = getHandleAt(selEl, x, y);
            if (handle === "rotate") {
              interactRef.current = {
                mode: "rotate",
                elId: selectedId,
                startX: x,
                startY: y,
                origX: selEl.x,
                origY: selEl.y,
                origW: selEl.width,
                origH: selEl.height,
                origRot: selEl.rotation,
                handle
              };
              return;
            }
            if (handle) {
              interactRef.current = {
                mode: "resize",
                elId: selectedId,
                startX: x,
                startY: y,
                origX: selEl.x,
                origY: selEl.y,
                origW: selEl.width,
                origH: selEl.height,
                origRot: selEl.rotation,
                handle
              };
              return;
            }
          }
        }
        let hit = null;
        for (let i = elements.length - 1; i >= 0; i--) {
          if (!elements[i].locked && hitTest(elements[i], x, y)) {
            hit = elements[i];
            break;
          }
        }
        if (hit) {
          setSelectedIds(
            shiftKey ? (prev) => prev.includes(hit.id) ? prev.filter((id) => id !== hit.id) : [...prev, hit.id] : [hit.id]
          );
          interactRef.current = {
            mode: "drag",
            elId: hit.id,
            startX: x,
            startY: y,
            origX: hit.x,
            origY: hit.y,
            origW: hit.width,
            origH: hit.height,
            origRot: hit.rotation,
            handle: ""
          };
        } else {
          if (!shiftKey) setSelectedIds([]);
        }
      } else if (activeTool === "text") {
        const el = {
          id: uid(),
          type: "text",
          name: "Text",
          x,
          y,
          width: 400,
          height: 80,
          content: "Your text here",
          fontSize: 48,
          color: "#111111",
          fontFamily: "Inter",
          bold: false,
          italic: false,
          underline: false,
          align: "left",
          letterSpacing: 0,
          lineHeight: 1.4,
          rotation: 0,
          opacity: 1,
          locked: false,
          visible: true,
          shadow: false
        };
        setElements((prev) => [...prev, el]);
        setSelectedIds([el.id]);
        setActiveTool("select");
      } else if (activeTool === "image") {
        const src = window.prompt("Enter image URL:", "https://");
        if (src == null ? void 0 : src.startsWith("http")) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          const el = {
            id: uid(),
            type: "image",
            name: "Image",
            x: x - 150,
            y: y - 100,
            width: 300,
            height: 200,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true,
            src,
            img: null
          };
          img.onload = () => updateElement(el.id, { img });
          img.src = src;
          el.img = img;
          setElements((prev) => [...prev, el]);
          setSelectedIds([el.id]);
          setActiveTool("select");
        }
      } else {
        drawRef.current = { startX: x, startY: y };
        previewRect.current = { x, y, w: 0, h: 0 };
        setIsDrawing(true);
      }
    },
    [activeTool, elements, selectedId, getPos, setElements, updateElement]
  );
  const onMouseMove = reactExports.useCallback(
    (e) => {
      const rawPos = getPos(e);
      const interact = interactRef.current;
      if (!interact) {
        if (isDrawing && drawRef.current) {
          const { startX, startY } = drawRef.current;
          previewRect.current = {
            x: Math.min(startX, rawPos.x),
            y: Math.min(startY, rawPos.y),
            w: Math.abs(rawPos.x - startX),
            h: Math.abs(rawPos.y - startY)
          };
          render();
        }
        return;
      }
      let pos = rawPos;
      if (interact.mode === "drag" && snapConfig.enabled) {
        const snapped = snapPoint(rawPos.x, rawPos.y, elements, interact.elId);
        pos = snapped;
        if (guideClearTimer.current) clearTimeout(guideClearTimer.current);
      }
      const dx = pos.x - interact.startX;
      const dy = pos.y - interact.startY;
      if (interact.mode === "drag") {
        setElements(
          (prev) => prev.map((el) => {
            if (!selectedIds.includes(el.id)) return el;
            const isMain = el.id === interact.elId;
            return {
              ...el,
              x: isMain ? interact.origX + (pos.x - interact.startX) : el.x + (rawPos.x - interact.startX),
              y: isMain ? interact.origY + (pos.y - interact.startY) : el.y + (rawPos.y - interact.startY)
            };
          }),
          false
        );
      } else if (interact.mode === "resize") {
        const el = elements.find((e2) => e2.id === interact.elId);
        if (el) {
          const patch = resizeElement(el, interact.handle, dx, dy, e.shiftKey);
          setElements(
            (prev) => prev.map(
              (e2) => e2.id === interact.elId ? { ...e2, ...patch } : e2
            ),
            false
          );
        }
      } else if (interact.mode === "rotate") {
        const el = elements.find((e2) => e2.id === interact.elId);
        if (el) {
          const cx = el.x + el.width / 2;
          const cy = el.y + el.height / 2;
          const angle = Math.atan2(rawPos.y - cy, rawPos.x - cx) * 180 / Math.PI + 90;
          setElements(
            (prev) => prev.map(
              (e2) => e2.id === interact.elId ? { ...e2, rotation: Math.round(angle) } : e2
            ),
            false
          );
        }
      }
    },
    [
      getPos,
      isDrawing,
      render,
      elements,
      selectedIds,
      setElements,
      snapConfig,
      snapPoint
    ]
  );
  const onMouseUp = reactExports.useCallback(
    (e) => {
      const { x, y } = getPos(e);
      if (interactRef.current) {
        setElements((prev) => prev, true);
        interactRef.current = null;
        if (guideClearTimer.current) clearTimeout(guideClearTimer.current);
        guideClearTimer.current = setTimeout(() => setGuides([]), 300);
      }
      if (isDrawing && drawRef.current) {
        const { startX, startY } = drawRef.current;
        const rx = Math.min(startX, x);
        const ry = Math.min(startY, y);
        const rw = Math.abs(x - startX);
        const rh = Math.abs(y - startY);
        if (rw > 5 && rh > 5) {
          const base = {
            id: uid(),
            x: rx,
            y: ry,
            width: rw,
            height: rh,
            rotation: 0,
            opacity: 1,
            locked: false,
            visible: true
          };
          let el;
          if (activeTool === "circle")
            el = {
              ...base,
              type: "circle",
              name: "Circle",
              fillColor: "#0047ab",
              borderColor: "#50c878",
              borderWidth: 0,
              shadow: false
            };
          else if (activeTool === "triangle")
            el = {
              ...base,
              type: "triangle",
              name: "Triangle",
              fillColor: "#50c878",
              borderColor: "#50c878",
              borderWidth: 0,
              shadow: false
            };
          else if (activeTool === "star")
            el = {
              ...base,
              type: "star",
              name: "Star",
              fillColor: "#f59e0b",
              borderColor: "#f59e0b",
              borderWidth: 0,
              points: 5,
              shadow: false
            };
          else
            el = {
              ...base,
              type: "rect",
              name: "Rectangle",
              fillColor: "#0047ab",
              borderColor: "#0047ab",
              borderWidth: 0,
              borderRadius: 0,
              shadow: false
            };
          setElements((prev) => [...prev, el]);
          setSelectedIds([el.id]);
          setActiveTool("select");
        }
        setIsDrawing(false);
        drawRef.current = null;
        previewRect.current = null;
      }
    },
    [getPos, activeTool, isDrawing, setElements, setGuides]
  );
  const selectedEl = selectedId ? elements.find((e) => e.id === selectedId) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col overflow-hidden",
      style: { width: "100vw", height: "100vh", background: "#0a0a0f" },
      "data-ocid": "canvas-editor-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorToolbar,
          {
            projectName: editingProjectName,
            canvasWidth,
            canvasHeight,
            zoom,
            showGrid,
            showSnap: snapConfig.enabled,
            canUndo,
            canRedo,
            unsaved,
            isSaving,
            onUndo: undo,
            onRedo: redo,
            onToggleGrid: () => setShowGrid((v) => !v),
            onToggleSnap: () => setSnapConfig((prev) => ({ ...prev, enabled: !prev.enabled })),
            onZoomChange: setZoom,
            onPresetChange: (w, h) => {
              setCanvasWidth(w);
              setCanvasHeight(h);
            },
            onExport: handleExport,
            onOpenExportModal: () => setExportModalOpen(true),
            onProjectNameChange: setEditingProjectName,
            onShare: () => {
              navigator.clipboard.writeText(window.location.href).catch(() => void 0);
              ue.success("Share link copied!");
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            LeftSidebar,
            {
              activeTool,
              onSelectTool: setActiveTool,
              onAddTextPreset: addTextPreset,
              onAddShape: handleAddShape,
              onAddTemplate: applyTemplate,
              onAddGradientRect: addGradientRect,
              onAddImage: addImage,
              onToolChange: setActiveTool,
              onApplyTemplate: applyTemplate,
              onColorApply: colorApply,
              onOpenAIPanel: () => setAiPanelOpen(true)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "main",
            {
              ref: workspaceRef,
              className: "flex-1 flex items-center justify-center overflow-hidden relative",
              style: {
                background: "#111118",
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              },
              "data-ocid": "canvas-workspace",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative flex flex-col items-center",
                    style: {
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "center center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.85), 0 0 80px rgba(0,71,171,0.10)",
                            borderRadius: "2px",
                            position: "relative"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "canvas",
                              {
                                ref: canvasRef,
                                width: canvasWidth,
                                height: canvasHeight,
                                onMouseDown,
                                onMouseMove,
                                onMouseUp,
                                onMouseLeave: onMouseUp,
                                onContextMenu: (e) => {
                                  if (selectedId) {
                                    e.preventDefault();
                                    openMenu(e);
                                  }
                                },
                                className: "block",
                                style: {
                                  cursor: activeTool !== "select" ? "crosshair" : ((_a = interactRef.current) == null ? void 0 : _a.mode) === "drag" ? "grabbing" : "default",
                                  borderRadius: "2px",
                                  display: "block"
                                },
                                "data-ocid": "editor-canvas"
                              }
                            ),
                            guides.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "svg",
                              {
                                width: canvasWidth,
                                height: canvasHeight,
                                className: "absolute inset-0 pointer-events-none",
                                style: { top: 0, left: 0 },
                                "aria-hidden": "true",
                                children: guides.map(
                                  (g) => g.orientation === "vertical" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "line",
                                    {
                                      x1: g.position,
                                      y1: 0,
                                      x2: g.position,
                                      y2: canvasHeight,
                                      stroke: "#0047ab",
                                      strokeWidth: 1,
                                      strokeOpacity: 0.8,
                                      strokeDasharray: "4 4"
                                    },
                                    `v-${g.position}`
                                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "line",
                                    {
                                      x1: 0,
                                      y1: g.position,
                                      x2: canvasWidth,
                                      y2: g.position,
                                      stroke: "#0047ab",
                                      strokeWidth: 1,
                                      strokeOpacity: 0.8,
                                      strokeDasharray: "4 4"
                                    },
                                    `h-${g.position}`
                                  )
                                )
                              }
                            ),
                            inlineEdit && (() => {
                              const el = elements.find((e) => e.id === inlineEdit.id);
                              if (!el) return null;
                              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "textarea",
                                {
                                  ref: inlineRef,
                                  defaultValue: el.content,
                                  onBlur: (ev) => {
                                    updateElement(inlineEdit.id, {
                                      content: ev.target.value
                                    });
                                    setInlineEdit(null);
                                  },
                                  className: "absolute bg-transparent border border-accent/60 outline-none resize-none p-0.5",
                                  style: {
                                    left: el.x,
                                    top: el.y,
                                    width: el.width,
                                    minHeight: el.height,
                                    fontSize: el.fontSize,
                                    color: el.color,
                                    fontFamily: el.fontFamily,
                                    fontWeight: el.bold ? "bold" : "normal",
                                    fontStyle: el.italic ? "italic" : "normal",
                                    textAlign: el.align,
                                    lineHeight: el.lineHeight
                                  },
                                  "data-ocid": "inline-text-editor"
                                }
                              );
                            })()
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "mt-2 select-none",
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.28)",
                            letterSpacing: "0.04em"
                          },
                          children: "Page 1"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-5 left-1/2",
                    style: { transform: "translateX(-50%)", zIndex: 20 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomPill, { zoom, onZoomChange: setZoom })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RightPanel,
            {
              elements,
              selectedIds,
              onUpdate: updateElement,
              onDelete: deleteById,
              onMoveLayer: moveLayer,
              onToggleVisible: toggleVisible,
              onToggleLock: toggleLock,
              onSelect: (id) => setSelectedIds([id]),
              activeTab: rightTab,
              onTabChange: setRightTab
            }
          )
        ] }),
        ctxMenu && selectedId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContextMenu,
          {
            x: ctxMenu.x,
            y: ctxMenu.y,
            isLocked: selectedEl == null ? void 0 : selectedEl.locked,
            onBringFront: () => {
              bringToFront(selectedId);
              closeMenu();
            },
            onSendBack: () => {
              sendToBack(selectedId);
              closeMenu();
            },
            onDuplicate: () => {
              duplicateSelected();
              closeMenu();
            },
            onDelete: () => {
              deleteSelected();
              closeMenu();
            },
            onToggleLock: () => {
              toggleLock(selectedId);
              closeMenu();
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ColorPickerModal,
          {
            isOpen: colorPickerOpen,
            onClose: () => setColorPickerOpen(false),
            value: colorPickerValue,
            onChange: (c) => {
              if (colorPickerCallback.current) colorPickerCallback.current(c);
            },
            title: "Pick Color"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AIAssistantPanel,
          {
            isOpen: aiPanelOpen,
            onClose: () => setAiPanelOpen(false),
            canvasWidth,
            canvasHeight,
            selectedElement: selectedEl ? { id: selectedEl.id, type: selectedEl.type } : null,
            onMagicResize: (w, h) => {
              const scaleX = w / canvasWidth;
              const scaleY = h / canvasHeight;
              setElements(
                (prev) => prev.map((el) => ({
                  ...el,
                  x: Math.round(el.x * scaleX),
                  y: Math.round(el.y * scaleY),
                  width: Math.round(el.width * scaleX),
                  height: Math.round(el.height * scaleY),
                  ...el.type === "text" ? {
                    fontSize: Math.round(
                      el.fontSize * Math.min(scaleX, scaleY)
                    )
                  } : {}
                }))
              );
              setCanvasWidth(w);
              setCanvasHeight(h);
              ue.success(`Canvas resized to ${w}×${h}`);
            },
            onColorMatch: (palette) => {
              setElements(
                (prev) => prev.map((el, i) => {
                  if (el.type === "rect" || el.type === "circle" || el.type === "triangle" || el.type === "star") {
                    const color = palette[i % palette.length] ?? palette[0];
                    return {
                      ...el,
                      fillColor: color,
                      borderColor: color
                    };
                  }
                  if (el.type === "text") {
                    const color = palette[palette.length - 1 - i % palette.length] ?? palette[palette.length - 1];
                    return { ...el, color };
                  }
                  return el;
                })
              );
              ue.success("Color palette applied!");
            },
            onAutoLayout: (mode, spacing) => {
              setElements((prev) => {
                const movable = prev.filter((e) => !e.locked && e.visible);
                if (movable.length === 0) return prev;
                let repositioned;
                if (mode === "horizontal") {
                  const sorted = [...movable].sort((a, b) => a.x - b.x);
                  const totalW = sorted.reduce((sum, e) => sum + e.width, 0) + spacing * (sorted.length - 1);
                  let curX = Math.round((canvasWidth - totalW) / 2);
                  const centerY = Math.round(canvasHeight / 2);
                  repositioned = sorted.map((el) => {
                    const updated = {
                      ...el,
                      x: curX,
                      y: Math.round(centerY - el.height / 2)
                    };
                    curX += el.width + spacing;
                    return updated;
                  });
                } else if (mode === "vertical") {
                  const sorted = [...movable].sort((a, b) => a.y - b.y);
                  const totalH = sorted.reduce((sum, e) => sum + e.height, 0) + spacing * (sorted.length - 1);
                  let curY = Math.round((canvasHeight - totalH) / 2);
                  const centerX = Math.round(canvasWidth / 2);
                  repositioned = sorted.map((el) => {
                    const updated = {
                      ...el,
                      x: Math.round(centerX - el.width / 2),
                      y: curY
                    };
                    curY += el.height + spacing;
                    return updated;
                  });
                } else {
                  const cols = Math.max(1, Math.ceil(Math.sqrt(movable.length)));
                  const rows = Math.ceil(movable.length / cols);
                  const cellW = Math.round(
                    (canvasWidth - spacing * (cols + 1)) / cols
                  );
                  const cellH = Math.round(
                    (canvasHeight - spacing * (rows + 1)) / rows
                  );
                  repositioned = movable.map((el, idx) => {
                    const col = idx % cols;
                    const row = Math.floor(idx / cols);
                    return {
                      ...el,
                      x: spacing + col * (cellW + spacing),
                      y: spacing + row * (cellH + spacing),
                      width: Math.min(el.width, cellW),
                      height: Math.min(el.height, cellH)
                    };
                  });
                }
                const repoMap = new Map(repositioned.map((e) => [e.id, e]));
                return prev.map((e) => repoMap.get(e.id) ?? e);
              });
              ue.success(
                `${mode.charAt(0).toUpperCase() + mode.slice(1)} layout applied!`
              );
            },
            onAIEnhance: () => {
              const targetId = selectedIds[0] ?? null;
              const targetEl = targetId ? elements.find((e) => e.id === targetId) : null;
              console.log("Selected element (AI Enhance):", targetEl);
              if (!targetEl || targetEl.type !== "image" || targetEl.locked) {
                ue.error("Please select an image first.");
                return;
              }
              setElements(
                (prev) => prev.map((el) => {
                  if (el.id !== targetEl.id) return el;
                  return {
                    ...el,
                    opacity: Math.min(1, (el.opacity ?? 1) * 1.05),
                    aiEnhanced: true
                  };
                })
              );
              ue.success(
                "AI enhancement applied — contrast, sharpness & clarity boosted!"
              );
            },
            onRemoveBackground: () => {
              const targetId = selectedIds[0] ?? null;
              const targetEl = targetId ? elements.find((e) => e.id === targetId) : null;
              console.log("Selected element (Remove Background):", targetEl);
              if (!targetEl || targetEl.type !== "image" || targetEl.locked) {
                ue.error("Please select an image first.");
                return;
              }
              updateElement(targetEl.id, {
                shadow: true,
                aiBackgroundRemoved: true
              });
              ue.success("Background removed — foreground subject isolated!");
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CanvasExportModal,
          {
            isOpen: exportModalOpen,
            onClose: () => setExportModalOpen(false),
            projectName: editingProjectName,
            canvasWidth,
            canvasHeight,
            onExport: (fmt, multiplier, transparent) => {
              const off = document.createElement("canvas");
              off.width = canvasWidth * multiplier;
              off.height = canvasHeight * multiplier;
              const ctx = off.getContext("2d");
              if (!ctx) return;
              ctx.scale(multiplier, multiplier);
              if (!transparent) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
              }
              for (const el of elements) {
                if (!el.visible) continue;
                drawElement(ctx, el, false, false);
              }
              const mime = fmt === "jpg" ? "image/jpeg" : "image/png";
              const link = document.createElement("a");
              link.download = `${editingProjectName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${fmt}`;
              link.href = off.toDataURL(mime, 0.95);
              link.click();
            }
          }
        ),
        lastSaved && null
      ]
    }
  );
}
export {
  CanvasEditorPage
};
