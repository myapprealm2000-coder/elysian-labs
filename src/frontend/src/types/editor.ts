// ─── Canvas Editor Types ─────────────────────────────────────────────────────

export type Tool =
  | "select"
  | "hand"
  | "text"
  | "rect"
  | "circle"
  | "triangle"
  | "star"
  | "image";

// ─── Gradient & Shadow ───────────────────────────────────────────────────────

export interface GradientFill {
  type: "gradient";
  colors: string[];
  angle: number;
}

export interface ShadowConfig {
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
}

// ─── Alignment / Snap ────────────────────────────────────────────────────────

export interface AlignmentGuide {
  orientation: "horizontal" | "vertical";
  position: number;
}

export interface SnapConfig {
  enabled: boolean;
  gridSize: number;
  showGrid: boolean;
}

export type ExportFormat = "png" | "jpg" | "webp" | "pdf" | "mp4";
export type ExportQuality = "72" | "150" | "300";

export interface BaseElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  name: string;
  gradientFill?: GradientFill;
  shadowConfig?: ShadowConfig;
}

export interface RectElement extends BaseElement {
  type: "rect";
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  shadow: boolean;
}

export interface CircleElement extends BaseElement {
  type: "circle";
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  shadow: boolean;
}

export interface TriangleElement extends BaseElement {
  type: "triangle";
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  shadow: boolean;
}

export interface StarElement extends BaseElement {
  type: "star";
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  points: number;
  shadow: boolean;
}

export interface TextShadow {
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
}

export interface GlowEffect {
  enabled: boolean;
  intensity: number;
  color: string;
  blur: number;
}

export interface StrokeOutline {
  width: number;
  color: string;
  opacity: number;
}

export interface BgHighlight {
  enabled: boolean;
  color: string;
  padding: number;
  borderRadius: number;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  fontSize: number;
  color: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: "left" | "center" | "right";
  letterSpacing: number;
  lineHeight: number;
  shadow: boolean;
  // Advanced text styling
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  gradientText?: boolean;
  gradientColors?: string[];
  textShadow?: TextShadow;
  glowEffect?: GlowEffect;
  strokeOutline?: StrokeOutline;
  bgHighlight?: BgHighlight;
  textBlur?: number;
  curvedText?: number;
  animationPreset?: string;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  img: HTMLImageElement | null;
  // Advanced image controls
  cropMode?: "fit" | "fill" | "stretch";
  maskType?: "none" | "circle" | "rounded" | "diamond";
  roundedCorners?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  hueRotation?: number;
  blur?: number;
  shadow?: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
  };
  glow?: {
    enabled: boolean;
    intensity: number;
    color: string;
    blur: number;
  };
  blendMode?: BlendMode;
  aiEnhanced?: boolean;
}

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export type CanvasElement =
  | RectElement
  | CircleElement
  | TriangleElement
  | StarElement
  | TextElement
  | ImageElement;

export type TemplateElement =
  | Omit<RectElement, "id">
  | Omit<CircleElement, "id">
  | Omit<TriangleElement, "id">
  | Omit<StarElement, "id">
  | Omit<TextElement, "id">
  | Omit<ImageElement, "id" | "img">;

export type ShapeElement =
  | RectElement
  | CircleElement
  | TriangleElement
  | StarElement;

export interface CanvasPreset {
  label: string;
  category: string;
  width: number;
  height: number;
  icon: string;
}

export interface Template {
  id: string;
  label: string;
  category: string;
  preset: CanvasPreset;
  elements: TemplateElement[];
  thumbnail?: string;
}

// ─── Layer System ─────────────────────────────────────────────────────────────

export interface Layer {
  id: string;
  name: string;
  elementId: string;
  visible: boolean;
  locked: boolean;
  type: CanvasElement["type"];
  children?: Layer[];
  isGroup?: boolean;
}

// ─── Color System ─────────────────────────────────────────────────────────────

export interface GradientStop {
  offset: number; // 0–1
  color: string;
}

export interface ColorPalette {
  name: string;
  colors: string[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface RecentProject {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: number;
  canvasSize: { width: number; height: number };
  category: string;
}

export interface WorkspacePreset {
  id: string;
  name: string;
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  gridEnabled: boolean;
  snapEnabled: boolean;
}

// ─── Editor State (Zustand) ────────────────────────────────────────────────────

export interface EditorState {
  elements: CanvasElement[];
  selectedIds: string[];
  activeLayerId: string | null;
  layers: Layer[];
  history: CanvasElement[][];
  historyIndex: number;
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  pan: { x: number; y: number };
  gridEnabled: boolean;
  snapEnabled: boolean;
  activeTool: Tool;
  activeSection: SidebarSection;
  activeRightTab: RightPanelTab;
  projectName: string;
  lastSaved: number | null;
  isDirty: boolean;
}

export type SidebarSection =
  | "templates"
  | "uploads"
  | "text"
  | "elements"
  | "images"
  | "backgrounds"
  | "brand"
  | "ai-tools"
  | "layers"
  | "settings";

export type RightPanelTab = "layers" | "properties" | "templates";

export interface ResizeHandle {
  cursor: string;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

export const HANDLE_SIZE = 8;
export const ROTATION_HANDLE_OFFSET = 24;

// ─── Text Preset ─────────────────────────────────────────────────────────────

export interface TextPreset {
  name: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
}

// ─── Gradient Preset ─────────────────────────────────────────────────────────

export interface GradientPreset {
  name: string;
  colors: string[];
  angle: number;
}

// ─── Shape Preset ────────────────────────────────────────────────────────────

export interface ShapePreset {
  label: string;
  type: "rect" | "circle" | "triangle" | "star";
  icon: string;
}
