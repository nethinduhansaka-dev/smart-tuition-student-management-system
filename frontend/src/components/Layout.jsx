import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { navigation, roleInfo } from "../data/mock";
import { Avatar, Icon, Logo, Modal, Button, SearchBox } from "./ui";
import { PanelLeftClose, PanelLeftOpen, Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import useSidebarPreferences from "../hooks/useSidebarPreferences";
import SidebarNavItem from "./SidebarNavItem";

export default function Layout() {
  const { role } = useParams();
  const info = roleInfo[role];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const contentRef = useRef(null);
  const drawerRef = useRef(null);
  const previousPath = useRef(pathname);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [demo, setDemo] = useState(false);
  const sidebar = useSidebarPreferences(role === "admin" ? 252 : 249);

  // Reset only on page changes, leaving filters and other in-page state alone.
  useLayoutEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.scrollTop = 0;
      if (previousPath.current !== pathname) content.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (open && !drawer.open) drawer.showModal();
    if (!open && drawer.open) drawer.close();
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  if (!info) return null;
  function logout() {
    sessionStorage.removeItem("stsms-role");
    navigate(`/${role}/login`);
  }
  const renderNavigation = (compact = false) => (
    <>
      <div className="sidebar-logo">
        <Link to="/" aria-label="STSMS portal selector">
          <Logo />
        </Link>
        <button
          className="drawer-close icon-button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="sidebar-person">
        <Avatar text={info.initials} />
        <div className="sidebar-person-details" aria-hidden={compact}>
          <strong>{info.name}</strong>
          <small>{info.id}</small>
        </div>
      </div>
      <p className="menu-label" aria-hidden={compact}>Menu</p>
      <nav aria-label={`${info.label} navigation`}>
        {navigation[role].map(([slug, label, icon]) => (
          <div key={slug}>
            {slug === "notifications" && <p className="menu-label" aria-hidden={compact}>Help</p>}
            <SidebarNavItem to={`/${role}/${slug}`} label={label} icon={icon}
              compact={compact} onClick={() => setOpen(false)} />
          </div>
        ))}
        {role !== "student" && <p className="menu-label" aria-hidden={compact}>Help</p>}
        <SidebarNavItem label="Logout" icon="logout" compact={compact} onClick={logout} />
      </nav>
    </>
  );
  return (
    <div
      className={`app-shell w-full h-dvh flex overflow-hidden role-${role}${sidebar.collapsed ? " sidebar-collapsed" : ""}${sidebar.resizing ? " sidebar-resizing" : ""}`}
      style={{ "--sidebar-width": `${sidebar.width}px` }}
    >
      <aside id="desktop-navigation" className="desktop-sidebar shrink-0">
        <div className="sidebar-inner">{renderNavigation(sidebar.collapsed)}</div>
        <div className="sidebar-resize-handle" {...sidebar.separatorProps} />
      </aside>
      <div className="main-column flex-1 min-w-0 min-h-0 overflow-hidden">
        <header className="app-header">
          <button type="button" className="sidebar-toggle icon-button"
            aria-label={sidebar.collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={sidebar.collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!sidebar.collapsed} aria-controls="desktop-navigation" onClick={sidebar.toggle}>
            {sidebar.collapsed ? <PanelLeftOpen size={20} aria-hidden="true" /> : <PanelLeftClose size={20} aria-hidden="true" />}
          </button>
          <button
            className="mobile-menu icon-button"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <Link className="mobile-logo" to="/">
            <Logo />
          </Link>
          <div className="header-search">
            <SearchBox
              value={search}
              onChange={setSearch}
              placeholder="Search"
            />
            {search && (
              <div className="search-results">
                {navigation[role]
                  .filter(([, label]) =>
                    label.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map(([slug, label]) => (
                    <Link
                      key={slug}
                      to={`/${role}/${slug}`}
                      onClick={() => setSearch("")}
                    >
                      {label}
                    </Link>
                  ))}
                {!navigation[role].some(([, label]) =>
                  label.toLowerCase().includes(search.toLowerCase()),
                ) && <p>No matching pages</p>}
              </div>
            )}
          </div>
          <div className="header-actions">
            <Link
              className="icon-button desktop-action"
              aria-label="Notifications"
              to={`/${role}/${role === "student" ? "notifications" : role === "teacher" ? "announcements" : "manage-announcements"}`}
            >
              <Icon name="bell" />
            </Link>
            <ThemeToggle />
            <button
              className="icon-button desktop-action"
              aria-label="Demo information"
              onClick={() => setDemo(true)}
            >
              <Info size={18} aria-hidden="true" />
            </button>
            <Link className="profile-link" to={`/${role}/my-profile`}>
              <Avatar text={info.initials} />
              <strong>{info.name}</strong>
            </Link>
          </div>
        </header>
        <main
          id="main-content"
          ref={contentRef}
          className="page-content min-h-0 min-w-0 flex-1 overflow-y-auto"
          tabIndex={0}
          aria-label="Page content"
        >
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
      <dialog
        id="mobile-navigation"
        ref={drawerRef}
        className="navigation-dialog"
        aria-label="Mobile navigation"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="mobile-drawer">{renderNavigation()}</div>
      </dialog>
      {demo && (
        <Modal title="Frontend demo" onClose={() => setDemo(false)}>
          <p>
            All records and changes are stored in this browser only. Login is a
            demo; no server authentication, email, bank payment, or file upload
            service is connected.
          </p>
          <p className="mt-4">
            Use fictional information. This preview is not an institutional
            system of record.
          </p>
          <Button className="mt-5" onClick={() => setDemo(false)}>
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
}
