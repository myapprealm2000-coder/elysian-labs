import type {
  AlignmentGuide,
  CanvasElement,
  CircleElement,
  GradientFill,
  ImageElement,
  RectElement,
  ShadowConfig,
  StarElement,
  TextElement,
  TriangleElement,
} from "@/types/editor";
import { HANDLE_SIZE } from "@/types/editor";

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function hitTest(el: CanvasElement, x: number, y: number): boolean {
  if (!el.visible) return false;
  // Apply rotation inverse
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  const angle = (-el.rotation * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = x - cx;
  const dy = y - cy;
  const lx = dx * cos - dy * sin;
  const ly = dx * sin + dy * cos;
  if (el.type === "circle") {
    return (lx / (el.width / 2)) ** 2 + (ly / (el.height / 2)) ** 2 <= 1;
  }
  return (
    lx >= -el.width / 2 &&
    lx <= el.width / 2 &&
    ly >= -el.height / 2 &&
    ly <= el.height / 2
  );
}

export function getCanvasPos(
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height),
  };
}

export function getHandleAt(
  el: CanvasElement,
  x: number,
  y: number,
): string | null {
  const H = HANDLE_SIZE;
  const handles: { id: string; hx: number; hy: number }[] = [
    { id: "nw", hx: el.x - H / 2, hy: el.y - H / 2 },
    { id: "n", hx: el.x + el.width / 2 - H / 2, hy: el.y - H / 2 },
    { id: "ne", hx: el.x + el.width - H / 2, hy: el.y - H / 2 },
    { id: "e", hx: el.x + el.width - H / 2, hy: el.y + el.height / 2 - H / 2 },
    { id: "se", hx: el.x + el.width - H / 2, hy: el.y + el.height - H / 2 },
    { id: "s", hx: el.x + el.width / 2 - H / 2, hy: el.y + el.height - H / 2 },
    { id: "sw", hx: el.x - H / 2, hy: el.y + el.height - H / 2 },
    { id: "w", hx: el.x - H / 2, hy: el.y + el.height / 2 - H / 2 },
    { id: "rotate", hx: el.x + el.width / 2 - H / 2, hy: el.y - 32 },
  ];
  for (const h of handles) {
    if (
      x >= h.hx - 4 &&
      x <= h.hx + H + 4 &&
      y >= h.hy - 4 &&
      y <= h.hy + H + 4
    ) {
      return h.id;
    }
  }
  return null;
}

export function resizeElement(
  el: CanvasElement,
  handle: string,
  dx: number,
  dy: number,
  aspectLock: boolean,
): Partial<CanvasElement> {
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
    height: Math.max(10, height),
  };
}

export function drawElement(
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  selected: boolean,
  multiSelected: boolean,
  _showGrid: boolean,
): void {
  ctx.save();
  ctx.globalAlpha = el.opacity;

  // AI Enhance: apply sharpening/contrast boost filter
  const elAsAny = el as CanvasElement & {
    aiEnhanced?: boolean;
    aiBackgroundRemoved?: boolean;
  };
  if (elAsAny.aiEnhanced && el.type === "image") {
    ctx.filter = "contrast(1.25) brightness(1.1) saturate(1.15)";
  } else if (elAsAny.aiBackgroundRemoved && el.type === "image") {
    ctx.filter =
      "contrast(1.4) brightness(1.15) saturate(1.1) drop-shadow(0 0 12px rgba(37,99,235,0.8))";
  } else {
    ctx.filter = "none";
  }

  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  ctx.translate(cx, cy);
  ctx.rotate((el.rotation * Math.PI) / 180);
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

function applyShadow(
  ctx: CanvasRenderingContext2D,
  on: boolean,
  config?: ShadowConfig,
) {
  if (on) {
    if (config) {
      // Parse opacity into the shadow color
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

function resetShadow(ctx: CanvasRenderingContext2D) {
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function buildGradient(
  ctx: CanvasRenderingContext2D,
  fill: GradientFill,
  width: number,
  height: number,
): CanvasGradient {
  const rad = (fill.angle * Math.PI) / 180;
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

function drawRect(ctx: CanvasRenderingContext2D, el: RectElement) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  const fill = el.gradientFill
    ? buildGradient(ctx, el.gradientFill, el.width, el.height)
    : el.fillColor;
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

function drawCircle(ctx: CanvasRenderingContext2D, el: CircleElement) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  ctx.beginPath();
  ctx.ellipse(
    el.width / 2,
    el.height / 2,
    el.width / 2,
    el.height / 2,
    0,
    0,
    Math.PI * 2,
  );
  const fill = el.gradientFill
    ? buildGradient(ctx, el.gradientFill, el.width, el.height)
    : el.fillColor;
  ctx.fillStyle = fill;
  ctx.fill();
  resetShadow(ctx);
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.stroke();
  }
}

function drawTriangle(ctx: CanvasRenderingContext2D, el: TriangleElement) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  ctx.beginPath();
  ctx.moveTo(el.width / 2, 0);
  ctx.lineTo(el.width, el.height);
  ctx.lineTo(0, el.height);
  ctx.closePath();
  const fill = el.gradientFill
    ? buildGradient(ctx, el.gradientFill, el.width, el.height)
    : el.fillColor;
  ctx.fillStyle = fill;
  ctx.fill();
  resetShadow(ctx);
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.stroke();
  }
}

function drawStar(ctx: CanvasRenderingContext2D, el: StarElement) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  const cx = el.width / 2;
  const cy = el.height / 2;
  const outerR = Math.min(el.width, el.height) / 2;
  const innerR = outerR * 0.4;
  const points = el.points;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
  }
  ctx.closePath();
  const fill = el.gradientFill
    ? buildGradient(ctx, el.gradientFill, el.width, el.height)
    : el.fillColor;
  ctx.fillStyle = fill;
  ctx.fill();
  resetShadow(ctx);
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor;
    ctx.lineWidth = el.borderWidth;
    ctx.stroke();
  }
}

function drawText(ctx: CanvasRenderingContext2D, el: TextElement) {
  applyShadow(ctx, el.shadow, el.shadowConfig);
  const weight = el.bold ? "bold" : "normal";
  const style = el.italic ? "italic" : "normal";
  ctx.font = `${style} ${weight} ${el.fontSize}px '${el.fontFamily}', sans-serif`;
  ctx.fillStyle = el.color;
  ctx.textBaseline = "top";
  ctx.textAlign = el.align;
  const ax =
    el.align === "center" ? el.width / 2 : el.align === "right" ? el.width : 0;
  ctx.letterSpacing = `${el.letterSpacing}px`;
  const lineH = el.fontSize * el.lineHeight;
  const lines = el.content.split("\n");
  lines.forEach((line, i) => ctx.fillText(line, ax, i * lineH));
  if (el.underline) {
    lines.forEach((line, i) => {
      const w = ctx.measureText(line).width;
      const tx =
        el.align === "center" ? ax - w / 2 : el.align === "right" ? ax - w : ax;
      ctx.fillRect(tx, (i + 1) * lineH - 2, w, 1);
    });
  }
}

function drawImage(ctx: CanvasRenderingContext2D, el: ImageElement) {
  if (el.img?.complete && el.img.naturalWidth > 0) {
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

function drawSelectionHandles(
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  primary: boolean,
) {
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
    el.height + pad * 2,
  );
  ctx.setLineDash([]);

  if (!primary) {
    ctx.restore();
    return;
  }

  const handles = [
    [el.x - pad - H / 2, el.y - pad - H / 2], // nw
    [el.x + el.width / 2 - H / 2, el.y - pad - H / 2], // n
    [el.x + el.width + pad - H / 2, el.y - pad - H / 2], // ne
    [el.x + el.width + pad - H / 2, el.y + el.height / 2 - H / 2], // e
    [el.x + el.width + pad - H / 2, el.y + el.height + pad - H / 2], // se
    [el.x + el.width / 2 - H / 2, el.y + el.height + pad - H / 2], // s
    [el.x - pad - H / 2, el.y + el.height + pad - H / 2], // sw
    [el.x - pad - H / 2, el.y + el.height / 2 - H / 2], // w
  ];

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#0047ab";
  ctx.lineWidth = 1.5;
  for (const [hx, hy] of handles) {
    ctx.fillRect(hx, hy, H, H);
    ctx.strokeRect(hx, hy, H, H);
  }

  // Rotation handle
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

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
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

// ─── Snap & Alignment Guides ─────────────────────────────────────────────────

export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Compute alignment guides for the selected element against all others.
 * Returns guides for center-x, center-y, left, right, top, bottom alignment.
 */
export function computeAlignmentGuides(
  elements: CanvasElement[],
  selectedId: string,
): AlignmentGuide[] {
  const sel = elements.find((e) => e.id === selectedId);
  if (!sel) return [];

  const guides: AlignmentGuide[] = [];
  const threshold = 6; // snap distance in canvas pixels

  const selCx = sel.x + sel.width / 2;
  const selCy = sel.y + sel.height / 2;

  for (const el of elements) {
    if (el.id === selectedId || !el.visible) continue;

    const elCx = el.x + el.width / 2;
    const elCy = el.y + el.height / 2;

    // Vertical guides (x-axis positions)
    const vChecks: number[] = [el.x, elCx, el.x + el.width];
    const vSels: number[] = [sel.x, selCx, sel.x + sel.width];
    for (const vp of vChecks) {
      for (const vs of vSels) {
        if (Math.abs(vp - vs) <= threshold) {
          guides.push({ orientation: "vertical", position: vp });
        }
      }
    }

    // Horizontal guides (y-axis positions)
    const hChecks: number[] = [el.y, elCy, el.y + el.height];
    const hSels: number[] = [sel.y, selCy, sel.y + sel.height];
    for (const hp of hChecks) {
      for (const hs of hSels) {
        if (Math.abs(hp - hs) <= threshold) {
          guides.push({ orientation: "horizontal", position: hp });
        }
      }
    }
  }

  // Deduplicate guides by orientation + position
  const seen = new Set<string>();
  return guides.filter((g) => {
    const key = `${g.orientation}:${g.position}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Draw alignment guide lines onto the canvas (call after drawElement loop).
 */
export function drawAlignmentGuides(
  ctx: CanvasRenderingContext2D,
  guides: AlignmentGuide[],
  canvasWidth: number,
  canvasHeight: number,
) {
  if (guides.length === 0) return;
  ctx.save();
  ctx.strokeStyle = "#50c878";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  for (const g of guides) {
    ctx.beginPath();
    if (g.orientation === "vertical") {
      ctx.moveTo(g.position, 0);
      ctx.lineTo(g.position, canvasHeight);
    } else {
      ctx.moveTo(0, g.position);
      ctx.lineTo(canvasWidth, g.position);
    }
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.restore();
}
