import ThemeToggle from "../components/ThemeToggle";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { roleInfo } from "../data/mock";
import { Badge, Button, Field, Icon, Logo, Notice } from "../components/ui";

export function Portal() {
  return (
    <main className="portal-frame">
      <ThemeToggle className="public-theme-toggle" />
      <div className="portal-inner">
        <header className="portal-heading">
          <Logo subtitle />
          <p>Ziyora Institute, Akuressa — Student Management Prototype</p>
          <Badge>Academic Year 2025 / 2026</Badge>
        </header>
        <p className="portal-prompt">Select Portal to Preview</p>
        <div className="portal-cards">
          {Object.entries(roleInfo).map(([role, info], i) => (
            <Link
              to={`/${role}/login`}
              key={role}
              className={`portal-card ${i === 0 ? "featured" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="portal-icon">
                  <Icon
                    name={["graduation", "clipboard", "sun"][i]}
                    size={24}
                  />
                </span>
                <span className="portal-arrow">
                  <Icon name="arrow" />
                </span>
              </div>
              <h1>{info.label} Portal</h1>
              <p>{info.description}</p>
              <Badge>{[14, 11, 19][i]} pages</Badge>
            </Link>
          ))}
        </div>
        <section className="portal-features">
          <h2>System Features</h2>
          <div>
            {[
              "User Authentication",
              "Class Management",
              "Fee Collection",
              "Payment Verification",
              "Attendance Tracking",
              "Marks & Grading",
              "Class Ranking",
              "Academic Analytics",
              "Announcement Board",
              "Report Generation",
              "Financial Dashboard",
              "System Monitoring",
            ].map((feature) => (
              <span key={feature}>
                <Icon name="circlecheck" size={17} />
                {feature}
              </span>
            ))}
          </div>
        </section>
        <footer>
          STSMS Prototype v1.0 — Ziyora Institute, Akuressa — 2026
        </footer>
      </div>
    </main>
  );
}
export function Auth({ recovery = false, status }) {
  const { role = "student" } = useParams();
  const info = roleInfo[role] || roleInfo.student;
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const title = status
    ? status === "expired"
      ? "You’ve been signed out"
      : "You don’t have permission"
    : recovery
      ? [
          "Forgot Password?",
          "Check your email",
          "Create a new password",
          "Password updated",
        ][step]
      : `${info.label} Login`;
  const label = status
    ? status === "expired"
      ? "Session Expired"
      : "Access Denied"
    : recovery
      ? "Account Recovery"
      : `${info.label} Portal`;
  function submit(e) {
    e.preventDefault();
    setError("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (recovery) {
      if (
        step === 2 &&
        (values.password.length < 8 || values.password !== values.confirm)
      ) {
        setError(
          "Use at least 8 characters and make sure both passwords match.",
        );
        return;
      }
      setStep(step + 1);
      return;
    }
    if (values.username !== role || values.password !== "demo1234") {
      setError(
        `Incorrect username or password. Demo login: ${role} / demo1234.`,
      );
      return;
    }
    sessionStorage.setItem("stsms-role", role);
    navigate(`/${role}/dashboard`);
  }
  return (
    <main className="auth-page">
      <ThemeToggle className="public-theme-toggle" />
      <div className="auth-mobile-brand">
        <Link to="/">
          <Logo subtitle />
        </Link>
      </div>
      <div className="auth-frame">
        <aside className="auth-panel">
          <Link to="/">
            <Logo subtitle />
          </Link>
          <div>
            <h2>{label}</h2>
            <p>
              {recovery
                ? "Reset your password in a few steps. We’ll email a secure link to your registered address."
                : status
                  ? "Please return to your portal to continue."
                  : info.description}
            </p>
          </div>
          <small>Academic Year 2025 / 2026</small>
        </aside>
        <section className="auth-form-panel">
          <Badge>{label}</Badge>
          <h1>{title}</h1>
          {!status && (
            <p className="auth-description">
              {recovery
                ? [
                    "We’ll email a reset link to your registered address.",
                    "Preview the password reset flow. No email has been sent in this frontend demo.",
                    "Choose a strong password that you haven’t used before.",
                    "Password reset preview complete. Demo credentials remain unchanged.",
                  ][step]
                : "Sign in with your username and password"}
            </p>
          )}
          <Notice kind="error">{error}</Notice>
          {status ? (
            <Button
              to={status === "expired" ? "/student/login" : "/"}
              icon="login"
            >
              {status === "expired" ? "Log In Again" : "Back to Portal Select"}
            </Button>
          ) : recovery && step === 1 ? (
            <Button onClick={() => setStep(2)} icon="login">
              Open Reset Link
            </Button>
          ) : recovery && step === 3 ? (
            <Button to={`/${role}/login`}>Back to Login</Button>
          ) : (
            <form onSubmit={submit}>
              {(!recovery || step === 0) && (
                <Field
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              )}{" "}
              {(!recovery || step === 2) && (
                <>
                  <div className="password-label">
                    <span>{recovery ? "New Password" : "Password"}</span>
                    {!recovery && (
                      <Link to={`/${role}/forgot-password`}>
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="password-input">
                    <Icon name="lock" />
                    <input
                      name="password"
                      aria-label={recovery ? "New Password" : "Password"}
                      type={show ? "text" : "password"}
                      required
                      minLength={recovery ? 8 : 1}
                      placeholder={
                        recovery ? "Enter new password" : "Enter your password"
                      }
                      autoComplete={
                        recovery ? "new-password" : "current-password"
                      }
                    />
                    <button
                      type="button"
                      aria-label={show ? "Hide password" : "Show password"}
                      onClick={() => setShow(!show)}
                    >
                      <Icon name={show ? "eyeoff" : "eye"} />
                    </button>
                  </div>
                  {recovery && (
                    <Field
                      className="mt-5"
                      name="confirm"
                      label="Confirm Password"
                      type="password"
                      minLength={8}
                      required
                      placeholder="Re-enter new password"
                      autoComplete="new-password"
                    />
                  )}
                </>
              )}
              <Button type="submit" icon="login" className="auth-submit">
                {recovery
                  ? step === 0
                    ? "Send Reset Link"
                    : "Reset Password"
                  : "Login"}
              </Button>
            </form>
          )}
          {recovery ? (
            <Link className="auth-back" to={`/${role}/login`}>
              ← Back to Login
            </Link>
          ) : (
            !status && (
              <>
                <Link className="mobile-forgot" to={`/${role}/forgot-password`}>
                  Forgot password?
                </Link>
                <p className="demo-login">Frontend demo · {role} / demo1234</p>
              </>
            )
          )}
        </section>
      </div>
      <div className="auth-mobile-footer">
        <p>Academic Year 2025 / 2026</p>
        {!recovery && (
          <div>
            {Object.entries(roleInfo)
              .filter(([key]) => key !== role)
              .map(([key, value]) => (
                <Link key={key} to={`/${key}/login`}>
                  {value.label} login
                </Link>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
