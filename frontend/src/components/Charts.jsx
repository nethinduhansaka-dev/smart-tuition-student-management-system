import { subjects } from "../data/mock";

export function ResultsChart({ values }) {
  return (
    <>
      <div className="chart-legend">
        {["Test 1", "Test 2", "Term Test"].map((label, i) => (
          <span key={label}>
            <i className={`chart-color-${i}`} />
            {label}
          </span>
        ))}
      </div>
      <div
        className="result-chart"
        role="img"
        aria-label={subjects
          .map((s, i) => `${s}: ${values[i].join(", ")}`)
          .join("; ")}
      >
        {subjects.map((subject, i) => (
          <div className="result-group" key={subject}>
            <div className="bars">
              {values[i].map((v, j) => (
                <div
                  key={j}
                  className={`chart-color-${j}`}
                  style={{ height: `${v * 1.9}px` }}
                  title={`${subject} ${v}`}
                />
              ))}
            </div>
            <strong>{subject}</strong>
            <small>{values[i].join(" · ")}</small>
          </div>
        ))}
      </div>
      <div className="compact-results">
        {subjects.map((s, i) => (
          <div key={s}>
            <strong>{s}</strong>
            <span>{values[i].join(" · ")}</span>
          </div>
        ))}
      </div>
    </>
  );
}
export function BarChart({
  values = [54, 69, 61, 82, 75, 96],
  labels = [],
  height = 180,
}) {
  return (
    <div
      className="bar-chart"
      style={{ height }}
      role="img"
      aria-label={values
        .map((v, i) => `${labels[i] || i + 1}: ${v}`)
        .join(", ")}
    >
      {values.map((v, i) => (
        <div key={i}>
          <span
            className={`chart-color-${i % 3}`}
            style={{ height: `${v}%` }}
            title={String(v)}
          />
          <small>{labels[i]}</small>
        </div>
      ))}
    </div>
  );
}
export function LineChart({
  values = [35, 42, 40, 55, 60, 70, 68, 83, 90],
  labels = [],
  area = false,
}) {
  const points = values
    .map((v, i) => `${20 + (i * 460) / (values.length - 1)},${180 - v * 1.5}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 500 220"
      role="img"
      aria-label={`Trend: ${values.join(", ")}`}
      className="line-chart"
    >
      {[30, 70, 110, 150, 190].map((y) => (
        <line key={y} x1="20" x2="480" y1={y} y2={y} stroke="var(--border)" />
      ))}
      {area && <polygon points={`20,190 ${points} 480,190`} fill="var(--accent-soft)" />}
      <polyline
        points={points}
        fill="none"
        stroke="var(--chart-line)"
        strokeWidth="2.5"
      />
      {labels.map((label, i) => (
        <text
          key={label}
          x={25 + (i * 450) / (labels.length - 1)}
          y="214"
          textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
          fontSize="11"
          fill="var(--muted)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
export function RadarChart() {
  return (
    <svg
      viewBox="0 0 360 245"
      className="radar-chart"
      role="img"
      aria-label="Subject performance: Mathematics 74%, Science 87%, History 70%, English 80%"
    >
      {[1, 0.75, 0.5, 0.25].map((scale) => (
        <polygon
          key={scale}
          points={`180,${120 - 90 * scale} ${180 + 100 * scale},120 180,${120 + 90 * scale} ${180 - 100 * scale},120`}
          fill="none"
          stroke="var(--border)"
        />
      ))}
      <polygon
        points="180,50 267,120 180,183 100,120"
        fill="var(--chart-area)"
        stroke="var(--chart-line)"
        strokeWidth="2"
      />
      {[
        ["Mathematics", 180, 17],
        ["Science", 315, 125],
        ["History", 180, 232],
        ["English", 43, 125],
      ].map(([s, x, y]) => (
        <text key={s} x={x} y={y} textAnchor="middle" fontSize="12" fill="var(--muted)">
          {s}
        </text>
      ))}
    </svg>
  );
}
