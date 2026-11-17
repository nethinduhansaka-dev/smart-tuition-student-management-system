import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "stsms-sidebar";
export const MIN_SIDEBAR_WIDTH = 210;
export const MAX_SIDEBAR_WIDTH = 380;

export function sidebarLimit(viewportWidth) {
  return Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, viewportWidth - 720));
}

export function readSidebarPreferences(storage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY));
    return {
      collapsed: value?.collapsed === true,
      width: typeof value?.width === "number" && Number.isFinite(value.width)
        ? Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, value.width))
        : null,
    };
  } catch {
    return { collapsed: false, width: null };
  }
}

export default function useSidebarPreferences(defaultWidth) {
  const [preferences, setPreferences] = useState(() => {
    try { return readSidebarPreferences(window.localStorage); }
    catch { return { collapsed: false, width: null }; }
  });
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [resizing, setResizing] = useState(false);
  const drag = useRef(null);
  const maxWidth = sidebarLimit(viewportWidth);
  const width = Math.min(preferences.width ?? defaultWidth, maxWidth);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Persist after a drag ends rather than writing storage on every pointer move.
  useEffect(() => {
    if (resizing) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); }
    catch { /* Storage may be unavailable; controls still work for this visit. */ }
  }, [preferences, resizing]);

  function setWidth(nextWidth) {
    setPreferences(current => ({
      ...current,
      width: Math.max(MIN_SIDEBAR_WIDTH, Math.min(maxWidth, nextWidth)),
    }));
  }

  const separatorProps = {
    role: "separator",
    tabIndex: 0,
    "aria-label": "Resize sidebar",
    "aria-orientation": "vertical",
    "aria-controls": "desktop-navigation",
    "aria-valuemin": MIN_SIDEBAR_WIDTH,
    "aria-valuemax": maxWidth,
    "aria-valuenow": Math.round(width),
    "aria-valuetext": `${Math.round(width)} pixels`,
    title: "Drag to resize, or use Left/Right arrows. Home/End select limits.",
    onPointerDown(event) {
      if (event.button !== 0 || !event.isPrimary) return;
      event.preventDefault();
      event.currentTarget.focus();
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.current = { pointerId: event.pointerId, x: event.clientX, width };
      setResizing(true);
    },
    onPointerMove(event) {
      if (drag.current?.pointerId !== event.pointerId) return;
      setWidth(drag.current.width + event.clientX - drag.current.x);
    },
    onPointerUp(event) {
      if (drag.current?.pointerId !== event.pointerId) return;
      drag.current = null;
      setResizing(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    onLostPointerCapture() { drag.current = null; setResizing(false); },
    onPointerCancel() { drag.current = null; setResizing(false); },
    onKeyDown(event) {
      const step = event.shiftKey ? 20 : 10;
      const nextWidth = { ArrowLeft: width - step, ArrowRight: width + step,
        Home: MIN_SIDEBAR_WIDTH, End: maxWidth }[event.key];
      if (nextWidth !== undefined) { event.preventDefault(); setWidth(nextWidth); }
    },
  };

  return {
    width, resizing, collapsed: preferences.collapsed, separatorProps,
    toggle: () => setPreferences(current => ({ ...current, collapsed: !current.collapsed })),
  };
}
