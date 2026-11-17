import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { Icon } from "./ui";

function tooltipPosition(target) {
  const bounds = target.getBoundingClientRect();
  const rail = target.closest(".desktop-sidebar").getBoundingClientRect();
  return {
    left: rail.right + 10,
    top: Math.max(8, Math.min(window.innerHeight - 48, bounds.top + bounds.height / 2 - 18)),
  };
}

export default function SidebarNavItem({ label, icon, to, onClick, compact = false }) {
  const tooltipId = useId();
  const [position, setPosition] = useState(null);
  const dismissTimer = useRef(null);
  const anchorRef = useRef(null);
  const visible = compact && position !== null;

  function cancelDismiss() { clearTimeout(dismissTimer.current); }
  function dismiss() { cancelDismiss(); setPosition(null); }
  function scheduleDismiss() {
    cancelDismiss();
    dismissTimer.current = setTimeout(() => setPosition(null), 120);
  }
  function show(event) {
    if (!compact) return;
    cancelDismiss();
    anchorRef.current = event.currentTarget;
    setPosition(tooltipPosition(event.currentTarget));
  }

  useEffect(() => () => clearTimeout(dismissTimer.current), []);
  useEffect(() => {
    if (!visible) return;
    const hide = () => setPosition(null);
    const onScroll = () => {
      const target = anchorRef.current;
      const bounds = target.getBoundingClientRect();
      const nav = target.closest("nav").getBoundingClientRect();
      if (document.activeElement === target && bounds.bottom > nav.top && bounds.top < nav.bottom) {
        setPosition(tooltipPosition(target));
      } else hide();
    };
    const onKeyDown = event => { if (event.key === "Escape") hide(); };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", hide);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", hide);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  const props = {
    className: `sidebar-nav-item${to ? "" : " logout"}`,
    "aria-label": label,
    "aria-describedby": visible ? tooltipId : undefined,
    title: compact ? undefined : label,
    onPointerEnter: show,
    onPointerLeave: event => {
      if (compact && event.currentTarget !== document.activeElement) scheduleDismiss();
    },
    onFocus: show,
    onBlur: scheduleDismiss,
    onClick: event => { dismiss(); onClick?.(event); },
  };
  const content = <><Icon name={icon} size={20} /><span className="sidebar-label">{label}</span></>;

  return (
    <>
      {to ? <NavLink to={to} {...props}>{content}</NavLink> : <button type="button" {...props}>{content}</button>}
      {visible && createPortal(
        <div id={tooltipId} role="tooltip" className="sidebar-tooltip" style={position}
          onPointerEnter={cancelDismiss} onPointerLeave={scheduleDismiss}>
          {label}
        </div>, document.body,
      )}
    </>
  );
}
