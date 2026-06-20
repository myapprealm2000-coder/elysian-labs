import type { AlignmentGuide, CanvasElement, SnapConfig } from "@/types/editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { computeAlignmentGuides, snapToGrid, uid } from "./editorUtils";

const MAX_HISTORY = 20;

export function useEditorHistory(initialElements: CanvasElement[] = []) {
  const [elements, setElementsState] =
    useState<CanvasElement[]>(initialElements);
  const [history, setHistory] = useState<CanvasElement[][]>([[]]);
  const [histIdx, setHistIdx] = useState(0);

  const pushHistory = useCallback(
    (els: CanvasElement[]) => {
      setHistory((h) => {
        const newH = h.slice(0, histIdx + 1);
        newH.push(els.map((e) => ({ ...e })));
        if (newH.length > MAX_HISTORY) newH.shift();
        return newH;
      });
      setHistIdx((i) => Math.min(i + 1, MAX_HISTORY - 1));
    },
    [histIdx],
  );

  const setElements = useCallback(
    (
      updater: CanvasElement[] | ((prev: CanvasElement[]) => CanvasElement[]),
      addHistory = true,
    ) => {
      setElementsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (addHistory) pushHistory(next);
        return next;
      });
    },
    [pushHistory],
  );

  const undo = useCallback(() => {
    if (histIdx <= 0) return;
    const ni = histIdx - 1;
    setHistIdx(ni);
    setElementsState(history[ni]);
  }, [histIdx, history]);

  const redo = useCallback(() => {
    if (histIdx >= history.length - 1) return;
    const ni = histIdx + 1;
    setHistIdx(ni);
    setElementsState(history[ni]);
  }, [histIdx, history]);

  const canUndo = histIdx > 0;
  const canRedo = histIdx < history.length - 1;

  return { elements, setElements, undo, redo, canUndo, canRedo };
}

export function useAutoSave(
  key: string,
  data: object,
  enabled = true,
): { unsaved: boolean; lastSaved: Date | null } {
  const [unsaved, setUnsaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return;
    setUnsaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        setLastSaved(new Date());
        setUnsaved(false);
      } catch {
        /* quota exceeded */
      }
    }, 30000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [key, data, enabled]);

  return { unsaved, lastSaved };
}

export function useKeyboardShortcuts({
  undo,
  redo,
  deleteSelected,
  duplicateSelected,
  selectAll,
  deselect,
  toggleGrid,
  _canvasRef,
  enabled,
}: {
  undo: () => void;
  redo: () => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  selectAll: () => void;
  deselect: () => void;
  toggleGrid: () => void;
  _canvasRef: React.RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const isInput =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement;
      if (isInput) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
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
    enabled,
  ]);
}

export function useContextMenu() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const openMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeMenu = useCallback(() => setMenu(null), []);

  useEffect(() => {
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

export function useDuplicate(
  elements: CanvasElement[],
  selectedIds: string[],
  setElements: (els: CanvasElement[], addHistory?: boolean) => void,
) {
  return useCallback(() => {
    if (selectedIds.length === 0) return;
    const copies = selectedIds
      .map((id) => elements.find((e) => e.id === id))
      .filter((e): e is CanvasElement => !!e)
      .map((e) => ({
        ...e,
        id: uid(),
        x: e.x + 20,
        y: e.y + 20,
        name: `${e.name} copy`,
      }));
    setElements([...elements, ...copies]);
  }, [elements, selectedIds, setElements]);
}

// ─── Snap & Alignment Guides Hook ────────────────────────────────────────────

export interface SnapAndGuidesState {
  snapConfig: SnapConfig;
  setSnapConfig: React.Dispatch<React.SetStateAction<SnapConfig>>;
  /** Snap a point (and optionally derive guides against sibling elements) */
  snapPoint: (
    x: number,
    y: number,
    elements: CanvasElement[],
    selectedId: string | null,
  ) => { x: number; y: number };
  guides: AlignmentGuide[];
  setGuides: React.Dispatch<React.SetStateAction<AlignmentGuide[]>>;
}

export function useSnapAndGuides(): SnapAndGuidesState {
  const [snapConfig, setSnapConfig] = useState<SnapConfig>({
    enabled: true,
    gridSize: 20,
    showGrid: false,
  });
  const [guides, setGuides] = useState<AlignmentGuide[]>([]);

  const snapPoint = useCallback(
    (
      x: number,
      y: number,
      elements: CanvasElement[],
      selectedId: string | null,
    ): { x: number; y: number } => {
      if (!snapConfig.enabled) return { x, y };

      // Grid snap
      let sx = snapToGrid(x, snapConfig.gridSize);
      let sy = snapToGrid(y, snapConfig.gridSize);

      // Alignment guide snap — find closest guide position within threshold
      if (selectedId) {
        const newGuides = computeAlignmentGuides(elements, selectedId);
        setGuides(newGuides);

        const threshold = snapConfig.gridSize / 2;
        for (const g of newGuides) {
          if (
            g.orientation === "vertical" &&
            Math.abs(g.position - x) <= threshold
          ) {
            sx = g.position;
          }
          if (
            g.orientation === "horizontal" &&
            Math.abs(g.position - y) <= threshold
          ) {
            sy = g.position;
          }
        }
      }

      return { x: sx, y: sy };
    },
    [snapConfig],
  );

  return { snapConfig, setSnapConfig, snapPoint, guides, setGuides };
}
