import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorMode = "hex" | "rgb" | "hsl";

export interface GradientStop {
  offset: number; // 0–1
  color: string;
}

interface ColorState {
  recentColors: string[];
  savedBrandColors: string[];
  activeColorMode: ColorMode;
}

interface ColorActions {
  addRecentColor: (color: string) => void;
  saveBrandColor: (color: string) => void;
  removeBrandColor: (color: string) => void;
  setColorMode: (mode: ColorMode) => void;
  clearRecentColors: () => void;
}

type ColorStore = ColorState & ColorActions;

const DEMO_RECENT_COLORS: string[] = [
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
  "#0047ab",
];

const DEMO_BRAND_COLORS: string[] = [
  "#2563EB",
  "#22C55E",
  "#0a0f1a",
  "#0F172A",
  "#ffffff",
  "#111827",
];

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      recentColors: DEMO_RECENT_COLORS,
      savedBrandColors: DEMO_BRAND_COLORS,
      activeColorMode: "hex",

      addRecentColor: (color) =>
        set((s) => {
          const normalized = color.toLowerCase();
          const filtered = s.recentColors.filter(
            (c) => c.toLowerCase() !== normalized,
          );
          return {
            recentColors: [color, ...filtered].slice(0, 12),
          };
        }),

      saveBrandColor: (color) =>
        set((s) => {
          if (s.savedBrandColors.includes(color)) return s;
          return {
            savedBrandColors: [...s.savedBrandColors, color].slice(0, 24),
          };
        }),

      removeBrandColor: (color) =>
        set((s) => ({
          savedBrandColors: s.savedBrandColors.filter((c) => c !== color),
        })),

      setColorMode: (mode) => set({ activeColorMode: mode }),

      clearRecentColors: () => set({ recentColors: [] }),
    }),
    { name: "elysian-color-store" },
  ),
);
