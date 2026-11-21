import { useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Card,
  DataTable,
  EmptyState,
  Field,
  Icon,
  InfoRows,
  Notice,
  PageTitle,
  Progress,
  SearchBox,
  StatePreview,
  Stats,
  Tabs,
} from "../components/ui";
import { LineChart, RadarChart, ResultsChart } from "../components/Charts";
import {
  classes,
  dashboardResults,
  notices,
  results,
  subjects,
  teachers,
} from "../data/mock";
import { updateData, useData } from "../data/store";
import { dateLabel, exportPDF, initials, match, money } from "../lib/utils";

export function StudentDashboard() {
  return (
    <div className="dashboard">
      <PageTitle
        title="Welcome back, Kavindu!"
        subtitle="Track your classes, results and payments — Academic Year 2025/2026"
      />
      <StatePreview>
        <Stats
          items={[
            {
              label: "Attendance",
              value: "88%",
              sub: "This term",
              icon: "check",
              to: "/student/attendance",
            },
            {
              label: "Classes",
              value: "4",
              sub: "Enrolled",
              icon: "book",
              to: "/student/registered-classes",
            },
            {
              label: "Homework",
              value: "3",
              sub: "Pending",
              icon: "file",
              to: "/student/notifications",
            },
            {
              label: "Rank",
              value: "#5",
              sub: "In class G11-MAT-SAT",
              icon: "trophy",
              to: "/student/rank",
            },
          ]}
        />
        <div className="dashboard-grid">
          <Card
            title="Latest Results"
            className="results-card"
            action={<Badge tone="amber">Model paper pending</Badge>}
          >
            <ResultsChart values={dashboardResults} />
          </Card>
          <Card title="Payment Status" className="payment-card">
            <InfoRows
              rows={["Jan", "Feb", "Mar"].map((month, i) => [
                `${month} payment`,
                <Badge tone={i === 2 ? "red" : "green"}>
                  {i === 2 ? "Pending" : "Paid"}
                </Badge>,
              ])}
            />
            <hr className="my-3 border-gray-200" />
            <InfoRows
              rows={[
                ["Total fees", money(2400)],
                [
                  "Outstanding",
                  <span className="text-red-500">{money(600)}</span>,
                ],
                ["Average", <span className="text-green-700">78%</span>],
              ]}
            />
            <Button to="/student/upload-payment-slip" icon="card">
              Pay Now
            </Button>
          </Card>
          <Card
            title="Upcoming Class Schedule"
            className="schedule-card"
            action={
              <Button
                to="/student/class-schedule"
                variant="outline"
                className="button-sm"
              >
                View All ›
              </Button>
            }
          >
            <DataTable
              cardOnMobile
              headers={["Day", "Time", "Subject", "Teacher", "Room"]}
              rows={classes.map((c) => [
                c.day,
                c.time,
                <span className={`subject-chip ${c.subject.toLowerCase()}`}>
                  {c.subject === "Mathematics" ? "Maths" : c.subject}
                </span>,
                <span className="table-name">
                  <Avatar text={initials(c.teacher)} />
                  {c.teacher.split(" ").slice(0, 2).join(" ")}
                </span>,
                c.room,
              ])}
            />
          </Card>
          <Card title="Notifications" className="notifications-card">
            <div className="notification-list">
              {notices.map(([text, time]) => (
                <div key={text}>
                  <Link to="/student/notifications">{text}</Link>
                  <small>{time}</small>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </StatePreview>
    </div>
  );
}
export function StudentProfile() {
  const data = useData();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  function save(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    try {
      updateData((d) => ({ ...d, profile: values }));
      setNotice("Profile changes saved in this browser’s demo.");
      setError("");
    } catch {
      setError("Unable to save locally. Allow browser storage and try again.");
    }
  }
  return (
    <>
      <PageTitle
        title="My Profile"
        subtitle="View and update your personal information"
      />
      <Notice>{notice}</Notice>
      <Notice kind="error">{error}</Notice>
      <div className="stack">
        <div className="grid-two">
          <Card title="Personal Information">
            <Avatar text="KP" large />
            <div className="mt-4">
              <InfoRows
                rows={[
                  ["Full Name", "Kavindu Perera"],
                  ["Student ID", "STU-2025-0047"],
                  ["School", "200207156781"],
                  ["Date of Birth", "12 March 2002"],
                  ["Gender", "Male"],
                  ["Grade", "Grade 11"],
                  ["Medium", "Sinhala"],
                ]}
              />
            </div>
          </Card>
          <Card title="Contact & Academic Details">
            <InfoRows
              rows={[
                ["Email", "kavindu.perera@stsms.edu.lk"],
                ["Phone", data.profile.phone],
                ["Address", data.profile.address],
                ["Guardian Name", data.profile.guardian],
                ["Guardian Phone", data.profile.guardianPhone],
                ["Subject", "Mathematics"],
                ["Joined", "January 2025"],
                ["Class", "G11-MAT-SAT"],
                ["Status", <Badge>Active</Badge>],
              ]}
            />
          </Card>
        </div>
        <Card title="Update Profile">
          <form onSubmit={save}>
            <div className="form-grid">
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                pattern="[+0-9 ()-]{9,18}"
                defaultValue={data.profile.phone}
                required
              />
              <Field
                label="Address"
                name="address"
                defaultValue={data.profile.address}
                required
              />
              <Field
                label="Guardian Name"
                name="guardian"
                defaultValue={data.profile.guardian}
                required
              />
              <Field
                label="Guardian Phone"
                name="guardianPhone"
                type="tel"
                pattern="[+0-9 ()-]{9,18}"
                defaultValue={data.profile.guardianPhone}
                required
              />
            </div>
            <div className="form-actions">
              <Button type="submit" icon="save">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
export function RegisteredClasses() {
  const [query, setQuery] = useState("");
  const data = useData();
  return (
    <>
      <PageTitle
        title="Registered Classes"
        subtitle="Classes enrolled for current term"
      />
      <div className="mb-3">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search classes..."
        />
      </div>
      <Card>
        <DataTable
          headers={[
            "#",
            "Class Code",
            "Subject Name",
            "Teacher",
            "Schedule",
            "Room",
            "Status",
          ]}
          rows={data.classes
            .filter((c) => match(c, query))
            .map((c, i) => [
              i + 1,
              <Link
                className="hover:underline"
                to={`/student/class-details/${c.id}`}
              >
                {c.id}
              </Link>,
              c.subject,
              c.teacher,
              `${c.day.slice(0, 3)} ${c.time}`,
              c.room,
              <Badge>{c.status}</Badge>,
            ])}
          cardOnMobile
        />
      </Card>
    </>
  );
}
export function ClassDetails() {
  const { id } = useParams();
  const data = useData();
  const c = data.classes.find((c) => c.id === id);
  return c ? (
    <>
      <PageTitle title="Class Details" subtitle={`${c.id} · ${c.subject}`} />
      <Card>
        <InfoRows
          rows={[
            ["Class Code", c.id],
            ["Subject", c.subject],
            ["Teacher", c.teacher],
            ["Schedule", `${c.day}: ${c.time}`],
            ["Room", c.room],
            ["Status", <Badge>{c.status}</Badge>],
            ["Enrolled Students", c.students],
            ["My Attendance", "92%"],
            ["Monthly Fee", money(c.fee)],
          ]}
        />
      </Card>
    </>
  ) : (
    <EmptyState title="Class not found">
      <Button to="/student/registered-classes">Back to classes</Button>
    </EmptyState>
  );
}
export function Schedule() {
  const rows = [
    ["08:00–10:00", "Mathematics (Hall A)", "—", "—", "—", "English (Hall D)"],
    ["10:00–12:00", "—", "Science (Hall B)", "—", "—", "—"],
    ["12:00–14:00", ...Array(5).fill("— BREAK —")],
    ["14:00–16:00", "—", "—", "History (Hall C)", "—", "—"],
  ];
  return (
    <>
      <PageTitle
        title="Class Schedule"
        subtitle="Weekly timetable for current term"
      />
      <Card title="Weekly Timetable — Current Term" className="schedule-table">
        <DataTable
          headers={[
            "Time",
            "Saturday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ]}
          rows={rows.map((row) =>
            row.map((cell, i) =>
              i && !cell.startsWith("—") ? (
                <span
                  className={`subject-chip ${cell.split(" ")[0].toLowerCase()}`}
                >
                  {cell}
                </span>
              ) : (
                cell
              ),
            ),
          )}
        />
      </Card>
      <div className="form-actions">
        <Button variant="outline" icon="print" onClick={() => window.print()}>
          Print Schedule
        </Button>
        <Button
          icon="download"
          onClick={() =>
            exportPDF(
              "Class Schedule",
              classes.map(
                (c) =>
                  `${c.day} ${c.time} | ${c.subject} | ${c.teacher} | ${c.room}`,
              ),
            )
          }
        >
          Download PDF
        </Button>
      </div>
    </>
  );
}
export function TeacherDirectory() {
  return (
    <>
      <PageTitle
        title="Teacher Information"
        subtitle="Your teachers for the current term"
      />
      <div className="grid-two">
        {teachers.map((t) => (
          <Card key={t.id} title={t.subject}>
            <div className="flex items-center gap-4 my-5">
              <Avatar text={initials(t.name)} />
              <div>
                <strong>{t.name}</strong>
                <p className="text-xs text-muted mt-1">{t.subject}</p>
              </div>
            </div>
            <InfoRows
              rows={[
                [
                  <Icon name="mail" />,
                  <a href={`mailto:${t.email}`}>{t.email}</a>,
                ],
                [
                  <Icon name="phone" />,
                  <a href={`tel:${t.phone.replaceAll(" ", "")}`}>{t.phone}</a>,
                ],
                [<Icon name="pin" />, t.room],
              ]}
            />
          </Card>
        ))}
      </div>
    </>
  );
}
export function ClassFees() {
  return (
    <>
      <PageTitle
        title="Class Fees"
        subtitle="Track your class fees and payments — Academic Year 2025/2026"
      />
      <Stats
        items={[
          {
            label: "Total Fees",
            value: "Rs. 2,400",
            sub: "Full term",
            icon: "money",
          },
          {
            label: "Paid",
            value: "Rs. 1,800",
            sub: "75% settled",
            icon: "circlecheck",
          },
          {
            label: "Outstanding",
            value: "Rs. 600",
            sub: "Due: 15 Mar",
            icon: "history",
            danger: true,
          },
        ]}
      />
      <Card title="Fee Breakdown">
        <DataTable
          headers={["Fee Item", "Amount (Rs.)", "Due Date", "Status"]}
          rows={[
            "Tuition Fee — Jan",
            "Tuition Fee — Feb",
            "Tuition Fee — Mar",
            "Registration Fee",
            "Paper Fee",
          ].map((item, i) => [
            item,
            ["600.00", "600.00", "600.00", "200.00", "400.00"][i],
            [
              "15 Jan 2026",
              "15 Feb 2026",
              "15 Mar 2026",
              "01 Mar 2026",
              "15 Jan 2026",
            ][i],
            <Badge>{i === 2 ? "Pending" : "Paid"}</Badge>,
          ])}
        />
      </Card>
    </>
  );
}
export function StudentAttendance() {
  const [subject, setSubject] = useState("Mathematics");
  return (
    <>
      <PageTitle
        title="Attendance"
        subtitle="Track your attendance by subject — Academic Year 2025/2026"
      />
      <StatePreview emptyTitle="No attendance records yet">
        <div className="stats-grid" style={{ "--columns": 4 }}>
          {subjects.map((s, i) => (
            <button
              key={s}
              className={`stat text-left ${s === subject ? "stat-featured" : ""}`}
              onClick={() => setSubject(s)}
            >
              <div className="stat-title">{s}</div>
              <div className="stat-body">
                <strong>{[88, 92, 80, 96][i]}%</strong>
              </div>
              <small>This term</small>
            </button>
          ))}
        </div>
        <Card title={`Attendance Details — ${subject}`}>
          <DataTable
            headers={["Date", "Day", "Status", "Remarks"]}
            rows={[
              "03 Jan 2026",
              "10 Jan 2026",
              "17 Jan 2026",
              "24 Jan 2026",
              "31 Jan 2026",
            ].map((date, i) => [
              date,
              subject === "Mathematics"
                ? "Saturday"
                : classes[subjects.indexOf(subject)].day,
              <Badge>{i === 2 ? "Absent" : "Present"}</Badge>,
              i === 2 ? "MC Submitted" : "—",
            ])}
          />
        </Card>
      </StatePreview>
    </>
  );
}
export function StudentResults() {
  const [tab, setTab] = useState("Overview");
  const data = useData();
  const own = data.published["STU-2025-0047"];
  const values = results.map((r, i) => (i === 0 && own ? own : r));
  return (
    <>
      <PageTitle title="Marks & Results" />
      <StatePreview
        emptyTitle="No results published yet"
        emptyText="You will see your marks once your teacher publishes the results."
      >
        <Tabs items={["Overview", ...subjects]} value={tab} onChange={setTab} />
        {tab === "Overview" ? (
          <>
            <Card className="marks-overview-desktop">
              <DataTable
                headers={[
                  "Subject",
                  "Test 1",
                  "Test 2",
                  "Term Test",
                  "Model Paper",
                  "Average",
                  "Grade",
                ]}
                rows={subjects.map((s, i) => [s, ...values[i], "—", "—", "—"])}
              />
            </Card>
            <div className="marks-overview-mobile">
              {subjects.map((s, i) => (
                <Card key={s} title={s}>
                  <div className="marks-card-values">
                    {[
                      "Test 1",
                      "Test 2",
                      "Term Test",
                      "Model Paper",
                      "Average",
                      "Grade",
                    ].map((label, j) => (
                      <div key={label}>
                        <small>{label}</small>
                        <strong>{values[i][j] ?? "—"}</strong>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card title={`${tab} — Published Marks`} className="subject-detail">
            <InfoRows
              rows={["Test 1", "Test 2", "Term Test", "Model Paper"].map(
                (label, i) => [
                  label,
                  i < 3 ? (
                    `${values[subjects.indexOf(tab)][i]} / 100`
                  ) : (
                    <Badge>Pending</Badge>
                  ),
                ],
              )}
            />
          </Card>
        )}
      </StatePreview>
    </>
  );
}
export function StudentRank() {
  return (
    <>
      <PageTitle
        title="Rank"
        subtitle="Published marks only — Student IDs protect names"
      />
      <Stats
        items={[
          {
            label: "My Rank",
            value: "#5",
            sub: "G11-MAT-SAT (28 students)",
            icon: "trophy",
          },
          {
            label: "My Marks /100",
            value: "84.75",
            sub: "Current term",
            icon: "file",
          },
          {
            label: "Top Marks /100",
            value: "96.75",
            sub: "Class highest",
            icon: "award",
          },
        ]}
      />
      <Card title="Grade 11 Mathematics — Saturday Group">
        <DataTable
          headers={["Rank", "Student ID", "Marks /100"]}
          rows={["0001", "0012", "0022", "0037", "0047", "0009"].map(
            (id, i) => [
              `#${i + 1}`,
              <span className={i === 4 ? "font-bold text-green-700" : ""}>
                STU-2025-{id}
              </span>,
              [96.75, 93.75, 90.5, 87.75, 84.75, 81.75][i].toFixed(2),
            ],
          )}
        />
      </Card>
    </>
  );
}
export function AcademicPerformance() {
  return (
    <>
      <PageTitle title="Academic Performance" />
      <div className="stack">
        <div className="grid-two">
          <Card title="Average Marks Trend">
            <LineChart
              area
              values={[45, 60, 69, 84]}
              labels={["Test 1", "Test 2", "Term Test", "Model Paper"]}
            />
          </Card>
          <Card title="Subject Performance Radar">
            <RadarChart />
          </Card>
        </div>
        <Card title="Performance by Subject">
          {subjects.map((s, i) => (
            <Progress key={s} label={s} value={[74, 87, 70, 80][i]} />
          ))}
        </Card>
      </div>
    </>
  );
}
export function Notifications() {
  const [read, setRead] = useState(false);
  return (
    <>
      <PageTitle title="Notifications" />
      <StatePreview
        emptyTitle="You’re all caught up"
        emptyText="You have no new notices. New notices will appear here when posted."
      >
        {read ? (
          <EmptyState
            title="You’re all caught up"
            onRefresh={() => setRead(false)}
          />
        ) : (
          <Card
            title="All Notifications"
            action={
              <Button
                variant="ghost"
                className="button-sm"
                onClick={() => setRead(true)}
              >
                Mark all read
              </Button>
            }
          >
            <div className="notification-list">
              {[
                ["Payment verified — receipt ready", "Just now"],
                ...notices,
                [
                  "Attendance notice: History is at the 80% threshold",
                  "Yesterday",
                ],
                ["Results released: Test 2 Mathematics — 80/100", "2 days ago"],
              ].map(([text, time]) => (
                <div key={text}>
                  <p>{text}</p>
                  <small>{time}</small>
                </div>
              ))}
            </div>
          </Card>
        )}
      </StatePreview>
    </>
  );
}
export function PaymentHistory() {
  const [query, setQuery] = useState("");
  const data = useData();
  return (
    <>
      <PageTitle title="Payment History" />
      <StatePreview emptyTitle="No payments recorded yet">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search by reference / month..."
        />
        <Card className="mt-4">
          <DataTable
            headers={[
              "#",
              "Month",
              "Amount (Rs.)",
              "Payment Date",
              "Method",
              "Ref No.",
              "Status",
              "Action",
            ]}
            rows={data.payments
              .filter((p) => p.student === "STU-2025-0047" && match(p, query))
              .map((p, i) => [
                i + 1,
                p.month,
                p.amount.toFixed(2),
                p.status === "Pending" ? "—" : dateLabel(p.date),
                p.method,
                p.id,
                <Badge>{p.status}</Badge>,
                <Button
                  to={
                    p.status === "Verified" || p.status === "Saved"
                      ? `/student/receipt/${p.id}`
                      : "/student/upload-payment-slip"
                  }
                  variant="outline"
                >
                  {p.status === "Verified" || p.status === "Saved"
                    ? "Receipt"
                    : "Pay"}
                </Button>,
              ])}
            cardOnMobile
          />
        </Card>
      </StatePreview>
    </>
  );
}
export function UploadSlip() {
  const input = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  function choose(file) {
    setError("");
    setFile(null);
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large (5 MB max).");
      return;
    }
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setError("Unsupported file. Choose JPG, PNG or PDF.");
      return;
    }
    setFile(file);
  }
  function submit(e) {
    e.preventDefault();
    if (!file) {
      setError("Choose a payment slip before submitting.");
      return;
    }
    const v = Object.fromEntries(new FormData(e.currentTarget));
    try {
      updateData((d) => ({
        ...d,
        payments: [
          ...d.payments,
          {
            id: `DEMO-${Date.now()}`,
            student: "STU-2025-0047",
            name: "Kavindu Perera",
            month: v.month,
            amount: Number(v.amount),
            date: v.date,
            method: "Bank Transfer",
            reference: v.reference,
            bank: v.bank,
            fileName: file.name,
            status: "Pending",
            class: "G11-MAT-SAT",
          },
        ],
      }));
      setSaved(true);
    } catch {
      setError("Could not save the local slip record. No upload took place.");
    }
  }
  return (
    <>
      <PageTitle title="Upload Payment Slip" />
      {saved ? (
        <EmptyState
          title="Slip submitted — pending verification"
          text="Local demo record saved. The file has not been uploaded to a server."
        >
          <div className="stack">
            <Button to="/student/payment-history" variant="outline">
              View Payment History
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSaved(false);
                setFile(null);
              }}
            >
              Upload another slip
            </Button>
          </div>
        </EmptyState>
      ) : (
        <StatePreview>
          <Notice kind="error">{error}</Notice>
          <div className="stack">
            <Card title="Payment Slip Details">
              <form onSubmit={submit}>
                <div className="form-grid">
                  <Field
                    label="PAYMENT FOR (MONTH)"
                    name="month"
                    options={[
                      "January 2026",
                      "February 2026",
                      "March 2026",
                      "April 2026",
                    ]}
                    required
                  />
                  <Field
                    label="PAYMENT DATE"
                    name="date"
                    type="date"
                    required
                  />
                  <Field
                    label="BANK NAME"
                    name="bank"
                    placeholder="e.g. BOC, People’s Bank, Commercial Bank"
                    required
                  />
                  <Field
                    label="TRANSACTION REFERENCE NO."
                    name="reference"
                    placeholder="e.g. TXN-20260315-001"
                    required
                  />
                  <Field
                    label="AMOUNT PAID (Rs.)"
                    name="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="form-actions">
                  <Button type="submit">Submit Slip</Button>
                </div>
              </form>
            </Card>
            <Card title="Upload File">
              <input
                ref={input}
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                className="sr-only"
                aria-label="Payment slip file"
                onChange={(e) => choose(e.target.files[0])}
              />
              <button
                className="dropzone w-full"
                onClick={() => input.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  choose(e.dataTransfer.files[0]);
                }}
              >
                <Icon
                  name="upload"
                  size={28}
                  className="mx-auto mb-4 text-green-700"
                />
                {file
                  ? file.name
                  : "Drag & Drop payment slip here, or click to browse"}
                <small>Supported: JPG, PNG, PDF — Max 5MB</small>
              </button>
              <Button
                className="mt-3 button-sm"
                variant="outline"
                onClick={() => input.current.click()}
              >
                Browse File
              </Button>
            </Card>
          </div>
        </StatePreview>
      )}
    </>
  );
}
export function OnlinePayment() {
  return (
    <>
      <PageTitle title="Online Payment" />
      <Notice kind="warning">
        <strong>COMING SOON</strong> · Online card payment is not part of the
        current release. No payment gateway is connected.{" "}
        <Link className="underline" to="/student/upload-payment-slip">
          Upload Payment Slip →
        </Link>
      </Notice>
      <div className="split-main">
        <Card title="Outstanding Amount">
          <InfoRows
            rows={[
              ["Student ID", "STU-2025-0047"],
              ["For", "Tuition Fee — March 2026"],
              ["Amount", money(600)],
              ["Due Date", "15 March 2026"],
            ]}
          />
          <fieldset disabled className="form-grid mt-5">
            <Field label="PAYMENT METHOD" options={["Card"]} />
            <Field
              label="CARD / ACCOUNT NUMBER"
              placeholder="XXXX XXXX XXXX XXXX"
            />
            <Field label="CARDHOLDER NAME" placeholder="Full name on card" />
            <Field label="EXPIRY DATE" placeholder="MM / YY" />
            <Field label="CVV" placeholder="•••" />
          </fieldset>
          <div className="form-actions">
            <Button disabled>Pay Rs. 600.00</Button>
            <Button to="/student/upload-payment-slip" variant="outline">
              Upload Payment Slip
            </Button>
          </div>
        </Card>
        <Card title="Payment Summary">
          <div className="bar-chart" style={{ height: 170 }}>
            {["Jan", "Feb", "Mar"].map((m, i) => (
              <div key={m}>
                <span
                  style={{
                    height: "90%",
                    background: i === 2 ? "#ffedcf" : "#2e9058",
                  }}
                />
                <small>{m}</small>
              </div>
            ))}
          </div>
          <InfoRows
            rows={[
              ["Jan 2026", "Rs. 600.00 — Paid"],
              ["Feb 2026", "Rs. 600.00 — Paid"],
              ["Mar 2026", "Rs. 600.00 — Pending"],
            ]}
          />
        </Card>
      </div>
    </>
  );
}
export function Receipt() {
  const { id, role } = useParams();
  const data = useData();
  const [params] = useSearchParams();
  const [notice, setNotice] = useState("");
  const p = data.payments.find((p) => p.id === id);
  const unavailable =
    !p ||
    !["Verified", "Saved"].includes(p.status) ||
    params.get("state") === "unavailable";
  const back =
    role === "admin" ? "/admin/manage-payments" : "/student/payment-history";
  const lines = p
    ? [
        `Receipt: RCPT-${p.id}`,
        `Student: ${p.name} (${p.student})`,
        `Class: ${p.class}`,
        `Description: Tuition fee - ${p.month}`,
        `Date: ${dateLabel(p.date)}`,
        `Payment method: ${p.method}`,
        `Amount received: ${money(p.amount)}`,
      ]
    : [];
  return (
    <>
      <PageTitle
        title={role === "admin" ? "Digital Receipt" : "Payment Receipt"}
      />
      <Notice>{notice}</Notice>
      {unavailable ? (
        <EmptyState
          title="Receipt not available yet"
          text="A receipt is available only after a payment is verified."
        >
          <Button variant="outline" to={back}>
            Back to Payment History
          </Button>
        </EmptyState>
      ) : (
        <>
          <Card>
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-green-800">Ziyora Institute</h2>
                <small className="text-muted">
                  Akuressa, Matara, Sri Lanka
                </small>
              </div>
              <Badge>Paid</Badge>
            </div>
            <p className="text-sm mb-4">PAYMENT RECEIPT · RCPT-{p.id}</p>
            <div className="grid-two">
              <InfoRows
                rows={[
                  ["Student", p.name],
                  ["Class", p.class],
                  ["Payment Date", dateLabel(p.date)],
                ]}
              />
              <InfoRows
                rows={[
                  ["Student ID", p.student],
                  ["Reference", p.id],
                  ["Method", p.method],
                ]}
              />
            </div>
            <InfoRows
              rows={[
                ["Description", `Tuition Fee — ${p.month}`],
                ["Amount paid", money(p.amount)],
                ["Outstanding after payment", money(0)],
              ]}
            />
            <p className="text-xs text-muted mt-5">TOTAL RECEIVED</p>
            <p className="receipt-total">{money(p.amount)}</p>
            <p className="receipt-note">
              Local demonstration receipt. No money was transferred.
            </p>
          </Card>
          <div className="form-actions">
            <Button
              icon="download"
              onClick={() => {
                exportPDF(`Receipt-${p.id}`, lines);
                setNotice("Demo receipt downloaded to your device.");
              }}
            >
              Download PDF
            </Button>
            <Button
              variant="outline"
              icon="print"
              onClick={() => window.print()}
            >
              Print
            </Button>
            <Button variant="outline" to={back}>
              Back to Payment History
            </Button>
          </div>
        </>
      )}
    </>
  );
}
