import { useEffect, useId, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  BookOpen,
  Calendar,
  Contact,
  Banknote,
  CreditCard,
  Upload,
  History,
  ClipboardCheck,
  FileText,
  Trophy,
  TrendingUp,
  Bell,
  Filter,
  Pencil,
  ChartColumn,
  Megaphone,
  UserPlus,
  Briefcase,
  ShieldCheck,
  ArrowLeftRight,
  ClipboardList,
  FileCheck,
  CircleCheck,
  Award,
  Activity,
  Search,
  ArrowUpRight,
  LogOut,
  Menu,
  X,
  Sun,
  Eye,
  EyeOff,
  Lock,
  Save,
  Download,
  Printer,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  CircleAlert,
  Check,
  ArrowLeft,
  LogIn,
  Plus,
  Trash2,
} from "lucide-react";

const icons = {
  dashboard: LayoutDashboard,
  user: User,
  users: Users,
  book: BookOpen,
  calendar: Calendar,
  badge: Contact,
  money: Banknote,
  card: CreditCard,
  upload: Upload,
  history: History,
  check: ClipboardCheck,
  file: FileText,
  trophy: Trophy,
  trend: TrendingUp,
  bell: Bell,
  filter: Filter,
  edit: Pencil,
  chart: ChartColumn,
  megaphone: Megaphone,
  userplus: UserPlus,
  briefcase: Briefcase,
  shield: ShieldCheck,
  arrows: ArrowLeftRight,
  clipboard: ClipboardList,
  filecheck: FileCheck,
  circlecheck: CircleCheck,
  award: Award,
  activity: Activity,
  search: Search,
  arrow: ArrowUpRight,
  logout: LogOut,
  menu: Menu,
  close: X,
  sun: Sun,
  eye: Eye,
  eyeoff: EyeOff,
  lock: Lock,
  save: Save,
  download: Download,
  print: Printer,
  graduation: GraduationCap,
  mail: Mail,
  phone: Phone,
  pin: MapPin,
  alert: CircleAlert,
  tick: Check,
  back: ArrowLeft,
  login: LogIn,
  plus: Plus,
  trash: Trash2,
};
export function Icon({ name, size = 18, ...props }) {
  const Glyph = icons[name] || FileText;
  return <Glyph size={size} strokeWidth={1.65} aria-hidden="true" {...props} />;
}
export function Logo({ subtitle = false }) {
  return (
    <div className="logo">
      <span className="logo-mark">S</span>
      <div>
        <strong>STSMS</strong>
        {subtitle && <small>Smart Tuition Student Management System</small>}
      </div>
    </div>
  );
}
export function Avatar({ text, large = false }) {
  return (
    <span className={`avatar ${large ? "avatar-large" : ""}`}>{text}</span>
  );
}
export function Button({
  children,
  icon,
  variant = "primary",
  to,
  className = "",
  ...props
}) {
  const cls = `button button-${variant} ${className}`;
  return to ? (
    <Link className={cls} to={to} {...props}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </Link>
  ) : (
    <button type="button" className={cls} {...props}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}
export function Badge({ children, tone }) {
  const label = String(children).toLowerCase();
  const type =
    tone ||
    (/pending|draft|late|average|soon|medium/.test(label)
      ? "amber"
      : /reject|absent|overdue|suspend|risk|high|alert|inactive/.test(label)
        ? "red"
        : /expired/.test(label)
          ? "gray"
          : "green");
  return <span className={`status status-${type}`}>{children}</span>;
}
export function PageTitle({ title, subtitle, children }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
export function Card({ title, children, action, className = "" }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <div className="card-heading">
          <h2>{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
export function Stats({ items }) {
  return (
    <div
      className="stats-grid"
      style={{ "--columns": Math.min(items.length, 4) }}
    >
      {items.map((item, i) => (
        <div
          className={`stat ${i === 0 && !item.plain ? "stat-featured" : ""}`}
          key={item.label}
        >
          <div className="stat-title">
            {item.label}
            {item.to ? (
              <Link
                className="stat-arrow"
                aria-label={`View ${item.label}`}
                to={item.to}
              >
                <Icon name="arrow" size={16} />
              </Link>
            ) : (
              <span className="stat-arrow">
                <Icon name="arrow" size={16} />
              </span>
            )}
          </div>
          <div className="stat-body">
            <span className="stat-icon">
              <Icon name={item.icon || "chart"} size={23} />
            </span>
            <div>
              <strong className={item.danger ? "text-red-500" : ""}>
                {item.value}
              </strong>
              <small>{item.sub}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export function InfoRows({ rows }) {
  return (
    <dl className="info-rows">
      {rows.map(([label, value], index) => (
        <div key={typeof label === "string" ? label : index}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function Field({ label, options, as, className = "", error, ...props }) {
  const id = useId();
  return (
    <label className={`field ${className}`} htmlFor={id}>
      <span>{label}</span>
      {options ? (
        <select id={id} aria-invalid={!!error} {...props}>
          {!props.defaultValue && !props.value && (
            <option value="">-- Select --</option>
          )}
          {options.map((option) => (
            <option
              key={typeof option === "object" ? option.value : option}
              value={typeof option === "object" ? option.value : option}
            >
              {typeof option === "object" ? option.label : option}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea id={id} aria-invalid={!!error} {...props} />
      ) : (
        <input id={id} aria-invalid={!!error} {...props} />
      )}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
export function SearchBox({
  value,
  onChange,
  placeholder = "Search...",
  ...props
}) {
  return (
    <label className="search-box">
      <Icon name="search" />
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </label>
  );
}
export function Tabs({ items, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={value === item}
          className={value === item ? "selected" : ""}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
export function DataTable({
  headers,
  rows,
  pageSize = 0,
  label = "Records",
  cardOnMobile = false,
}) {
  const [page, setPage] = useState(1);
  const pages = pageSize ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1;
  const current = Math.min(page, pages);
  const visible = pageSize
    ? rows.slice((current - 1) * pageSize, current * pageSize)
    : rows;
  return (
    <>
      <div className={`table-wrap ${cardOnMobile ? "mobile-records" : ""}`}>
        <table aria-label={label}>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={row.id || i}>
                {(row.cells || row).map((cell, j) => (
                  <td key={j} data-label={headers[j]}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="empty-table">
            No matching records. Try another search or filter.
          </p>
        )}
      </div>
      {pageSize > 0 && (
        <div className="pagination">
          <span>
            Showing {rows.length ? (current - 1) * pageSize + 1 : 0}–
            {Math.min(current * pageSize, rows.length)} of {rows.length} records
          </span>
          <div>
            <button
              disabled={current === 1}
              aria-label="Previous page"
              onClick={() => setPage(current - 1)}
            >
              ‹
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                aria-current={current === i + 1 ? "page" : undefined}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={current === pages}
              aria-label="Next page"
              onClick={() => setPage(current + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export function Notice({ children, kind = "success" }) {
  return children ? (
    <div
      className={`notice notice-${kind}`}
      role={kind === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  ) : null;
}
export function EmptyState({
  title = "Nothing to show yet",
  text = "Your records will appear here when they are available.",
  onRefresh,
  children,
}) {
  return (
    <Card className="empty-state">
      <span className="empty-icon">
        <Icon name="bell" size={30} />
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
      {children || (
        <Button
          variant="outline"
          onClick={onRefresh || (() => window.location.reload())}
        >
          Refresh
        </Button>
      )}
    </Card>
  );
}
export function Modal({ title, children, onClose, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const previous = document.activeElement;
    el.showModal();
    return () => {
      el.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "modal-wide" : ""}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function StatePreview({ children, emptyTitle, emptyText }) {
  const [params, setParams] = useSearchParams();
  const state = params.get("state");
  if (state === "empty" || state === "denied")
    return (
      <EmptyState
        title={state === "denied" ? "Access denied" : emptyTitle}
        text={
          state === "denied"
            ? "You can only view your own records. Requests for another student’s information are not permitted."
            : emptyText
        }
        onRefresh={() => setParams({})}
      />
    );
  return (
    <>
      {state === "error" && (
        <Notice kind="error">
          Could not save changes. No changes were committed. This is a reference
          error-state preview.{" "}
          <button onClick={() => setParams({})}>Try again</button>
        </Notice>
      )}
      {children}
    </>
  );
}
export function Progress({ label, value, color }) {
  return (
    <div className="progress-row">
      <div>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="progress-track">
        <div style={{ width: `${Math.min(value, 100)}%`, background: color }} />
      </div>
    </div>
  );
}
