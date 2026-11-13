/**
 * LandingPage.jsx  (Issue #01 Landing Page Layout + Issue #02 Header/Branding)
 *
 * Single-file version containing:
 *   - LandingHeader : logo, title, subtitle, description, badge, section heading
 *   - LandingPage   : page shell (outer gray > white container > inner gray)
 *
 * Teammate components are NOT implemented here. Each has a marked slot with a
 * dashed placeholder so the page builds before their files are merged.
 *
 * ── Integration (when a teammate's file is merged) ────────────────────────
 *   1. Uncomment the matching import below.
 *   2. Delete the <SlotPlaceholder /> and uncomment the component line.
 *
 * Expected default exports (adjust paths if your repo differs):
 *   PortalSection  -> src/components/landing/PortalSection.jsx
 *   SystemFeatures -> src/components/landing/SystemFeatures.jsx
 *   LandingFooter  -> src/components/landing/LandingFooter.jsx
 * No props are passed by this page. If a component needs props, agree on
 * them in the GitHub issue and add them at its slot only.
 */

// ── TEAM INTEGRATION POINTS ───────────────────────────────────────────────
// import PortalSection from "../components/landing/PortalSection";
// import SystemFeatures from "../components/landing/SystemFeatures";
// import LandingFooter from "../components/landing/LandingFooter";

/**
 * LandingHeader (Issue #02)
 * Props (all optional; defaults match the wireframe text):
 * @param {string} [logoLetter="S"]
 * @param {string} [title="STSMS"]
 * @param {string} [subtitle="Smart Tuition Student Management System"]
 * @param {string} [description="Low-Fidelity Wireframe Prototype — Software Engineering University Project"]
 * @param {string} [academicYear="Academic Year 2025 / 2026"]
 * @param {string} [sectionHeading="Select Portal to Preview"]
 */
export const LandingHeader = ({
  logoLetter = "S",
  title = "STSMS",
  subtitle = "Smart Tuition Student Management System",
  description = "Low-Fidelity Wireframe Prototype — Software Engineering University Project",
  academicYear = "Academic Year 2025 / 2026",
  sectionHeading = "Select Portal to Preview",
}) => {
  return (
    <header className="flex flex-col items-center text-center">
      {/* Logo + title block */}
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f9e5f] to-[#14603a] shadow-sm sm:h-16 sm:w-16"
          aria-hidden="true"
        >
          <span className="text-2xl font-bold text-white sm:text-3xl">
            {logoLetter}
          </span>
        </div>

        <div className="text-left">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-neutral-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 max-w-2xl text-base text-neutral-500 sm:text-lg">
        {description}
      </p>

      {/* Academic year badge */}
      <span className="mt-4 inline-flex items-center rounded-full bg-[#e3f1e8] px-5 py-1.5 text-sm font-medium text-[#1a7a47] sm:text-base">
        {academicYear}
      </span>

      {/* Heading above the portal cards */}
      <h2 className="mt-12 text-base font-medium text-neutral-500 sm:text-lg">
        {sectionHeading}
      </h2>
    </header>
  );
};

/** Temporary stand-in until a teammate's component is imported. */
const SlotPlaceholder = ({ name }) => (
  <div
    className="flex min-h-[120px] items-center justify-center rounded-3xl border-2 border-dashed border-neutral-300 bg-white/60 px-4 text-center text-sm text-neutral-500"
    data-slot={name}
  >
    {`<${name} /> goes here`}
  </div>
);

/** LandingPage (Issue #01): parent component and page shell */
const LandingPage = () => {
  return (
    // Light gray outer background
    <div className="min-h-screen bg-[#ededed] px-3 py-6 sm:px-6 sm:py-12">
      {/* Large white rounded container (white ring around the inner area) */}
      <div className="mx-auto w-full max-w-[1100px] rounded-[2rem] bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:rounded-[2.5rem] sm:p-4">
        {/* Light gray inner content area */}
        <main className="rounded-[1.5rem] bg-[#f3f3f1] px-4 pb-10 pt-12 sm:rounded-[2rem] sm:px-8 sm:pb-12 sm:pt-16 lg:px-16">
          <LandingHeader />

          {/* Content column shared by all teammate sections */}
          <div className="mx-auto mt-10 w-full max-w-5xl space-y-8">
            {/* SLOT 1: portal cards (teammate) */}
            <section aria-label="Portals">
              {/* <PortalSection /> */}
              <SlotPlaceholder name="PortalSection" />
            </section>

            {/* SLOT 2: system features (teammate) */}
            <section aria-label="System features">
              {/* <SystemFeatures /> */}
              <SlotPlaceholder name="SystemFeatures" />
            </section>

            {/* SLOT 3: footer (teammate) */}
            <div className="pt-2">
              {/* <LandingFooter /> */}
              <SlotPlaceholder name="LandingFooter" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
