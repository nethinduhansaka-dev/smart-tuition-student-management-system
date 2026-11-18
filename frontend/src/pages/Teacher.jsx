import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Card,
  DataTable,
  Field,
  InfoRows,
  Modal,
  Notice,
  PageTitle,
  Progress,
  SearchBox,
  StatePreview,
  Stats,
} from "../components/ui";
import { BarChart } from "../components/Charts";
import { subjects, teacherClasses } from "../data/mock";
import { updateData, useData } from "../data/store";
import { exportCSV, grade, match } from "../lib/utils";

export function TeacherDashboard() {
  return (
    <>
      <PageTitle
        title="Teacher Dashboard"
        subtitle="Welcome back, Mr. Ruwan Herath — Academic Year 2025/2026"
      />
      <Stats
        items={[
          {
            label: "Assigned Classes",
            value: "3",
            sub: "Current term",
            icon: "book",
            to: "/teacher/assigned-classes",
          },
          {
            label: "Total Students",
            value: "84",
            sub: "Across all classes",
            icon: "users",
            to: "/teacher/students",
          },
          {
            label: "Pending Marks",
            value: "6",
            sub: "Tests to mark",
            icon: "edit",
            to: "/teacher/enter-marks",
          },
          {
            label: "Avg Attendance",
            value: "87%",
            sub: "All classes",
            icon: "check",
            to: "/teacher/attendance-management",
          },
        ]}
      />
      <StatePreview>
        <Card className="mb-4">
          <div className="flex gap-5 items-center flex-wrap">
            <Avatar text="RH" />
            <div>
              <strong>Mr. Ruwan Herath</strong>
              <small className="block text-muted">ID: TCH-2021-0007</small>
            </div>
            <div className="text-xs leading-6">
              <p>Subject: Mathematics | Medium: Sinhala</p>
              <p>
                Classes: G11-MAT-SAT, G11-MAT-TUE, G11-MAT-THU | Experience: 5
                Years
              </p>
              <p>Email: ruwan@stsms.edu.lk | Phone: +94 71 111 1111</p>
            </div>
          </div>
        </Card>
        <div className="split-main">
          <div className="stack">
            <Card title="Assigned Classes">
              <DataTable
                headers={[
                  "Class",
                  "Subject",
                  "Students",
                  "Schedule",
                  "Room",
                  "Status",
                ]}
                rows={teacherClasses.map((c) => [
                  c.id,
                  c.subject,
                  c.students,
                  `${c.day.slice(0, 3)} ${c.time}`,
                  c.room,
                  <Badge>Active</Badge>,
                ])}
              />
            </Card>
            <Card title="Recent Student Activity">
              <DataTable
                headers={["Student", "Class", "Activity", "Date", "Status"]}
                rows={[
                  [
                    "Nethmi Silva",
                    "G11-MAT-SAT",
                    "Submitted Homework 5",
                    "Today",
                    <Badge>New</Badge>,
                  ],
                  [
                    "Tharindu Bandara",
                    "G11-MAT-SAT",
                    "Absent — Unexcused",
                    "Yesterday",
                    <Badge>Alert</Badge>,
                  ],
                  [
                    "Ashan Rathnayake",
                    "G11-MAT-TUE",
                    "Below 80% Attendance",
                    "This week",
                    <Badge>Warning</Badge>,
                  ],
                ]}
              />
            </Card>
          </div>
          <div className="stack">
            <Card title="Today’s Classes">
              <InfoRows
                rows={teacherClasses.map((c, i) => [
                  ["09:00–10:00", "10:00–12:00", "14:00–15:00"][i],
                  `${c.id} / ${c.room}`,
                ])}
              />
            </Card>
            <Card title="Announcements">
              <div className="notification-list">
                <div>
                  Term test result submission deadline: 28 Mar
                  <small>2 days ago</small>
                </div>
                <div>
                  Staff meeting: 25 Mar 2026 — 10am<small>3 days ago</small>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </StatePreview>
    </>
  );
}
export function TeacherProfile() {
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  function upload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Choose an image smaller than 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  }
  return (
    <>
      <PageTitle
        title="My Profile"
        subtitle="Your personal and professional details"
      />
      <Notice kind="error">{error}</Notice>
      <div className="grid-two">
        <Card title="Teacher Information">
          <div className="flex gap-4 items-center mb-5">
            {photo ? (
              <img
                src={photo}
                alt="Local profile preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <Avatar text="MR" large />
            )}
            <label className="button button-outline button-sm">
              Change Photo
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={upload}
              />
            </label>
          </div>
          <InfoRows
            rows={[
              ["Full Name", "Mr. Ruwan Herath"],
              ["Teacher ID", "TCH-2021-0007"],
              ["NIC Number", "821341234V"],
              ["Gender", "Male"],
              ["Nationality", "Sri Lankan"],
              ["Join Date", "January 2021"],
            ]}
          />
        </Card>
        <Card title="Professional Details">
          <InfoRows
            rows={[
              ["Medium", "Sinhala"],
              ["Specialisation", "Mathematics"],
              ["Qualification", "B.Sc Mathematics, PGDE"],
              ["Experience", "5 Years"],
              ["Email", "ruwan@stsms.edu.lk"],
              ["Phone", "+94 71 111 1111"],
              ["Office Room", "Hall A"],
            ]}
          />
        </Card>
      </div>
    </>
  );
}
export function AssignedClasses() {
  return (
    <>
      <PageTitle title="Assigned Classes" />
      <div className="grid-three">
        {teacherClasses.map((c) => (
          <Card key={c.id} title={c.id} action={<Badge>Active</Badge>}>
            <InfoRows
              rows={[
                ["SUBJECT", c.subject],
                ["STUDENTS", c.students],
                ["SCHEDULE", `${c.day.slice(0, 3)} ${c.time}`],
                ["ROOM", c.room],
              ]}
            />
            <div className="form-actions">
              <Button
                variant="outline"
                className="button-sm"
                to={`/teacher/students?class=${c.id}`}
              >
                Students
              </Button>
              <Button
                variant="outline"
                className="button-sm"
                to={`/teacher/attendance-management?class=${c.id}`}
              >
                Attendance
              </Button>
              <Button
                variant="outline"
                className="button-sm"
                to={`/teacher/enter-marks?class=${c.id}`}
              >
                Marks
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
export function TeacherStudents({ filter = false }) {
  const data = useData();
  const [query, setQuery] = useState("");
  const [criteria, setCriteria] = useState({});
  const [view, setView] = useState(null);
  const records = data.students.filter(
    (s) =>
      match(s, query) &&
      (!criteria.class || s.class === criteria.class) &&
      (!criteria.min || s.rank >= Number(criteria.min)) &&
      (!criteria.max || s.rank <= Number(criteria.max)) &&
      (!criteria.attendance || s.attendance >= Number(criteria.attendance)) &&
      (!criteria.status || s.status === criteria.status),
  );
  return (
    <>
      <PageTitle
        title={filter ? "Filter Students" : "Students"}
        subtitle={
          filter
            ? "Filter your students by class, rank, attendance and status"
            : "All students in your assigned classes"
        }
      />
      {filter ? (
        <Card title="Filter Criteria" className="mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCriteria(Object.fromEntries(new FormData(e.currentTarget)));
            }}
            onReset={() => setCriteria({})}
          >
            <div className="grid-three">
              <Field
                name="class"
                label="Class"
                options={teacherClasses.map((c) => c.id)}
              />
              <Field
                label="Rank (From)"
                name="min"
                type="number"
                min="1"
                placeholder="e.g. 1"
              />
              <Field
                label="Rank (To)"
                name="max"
                type="number"
                min="1"
                placeholder="e.g. 10"
              />
              <Field
                label="Attendance Above (%)"
                name="attendance"
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 80"
              />
              <Field
                label="Status"
                name="status"
                options={["Active", "Suspended"]}
              />
            </div>
            <div className="form-actions">
              <Button type="submit" icon="filter">
                Apply Filters
              </Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="toolbar">
          <Field
            label="Class"
            options={["All Classes", ...teacherClasses.map((c) => c.id)]}
            value={criteria.class || "All Classes"}
            onChange={(e) =>
              setCriteria({
                class: e.target.value === "All Classes" ? "" : e.target.value,
              })
            }
          />
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search students by name or ID..."
          />
        </div>
      )}
      <Card title={filter ? "Filtered Results" : undefined}>
        <DataTable
          pageSize={8}
          cardOnMobile
          headers={[
            "Student ID",
            "Name",
            "Class",
            "Attendance",
            "Status",
            "Action",
          ]}
          rows={records.map((s) => [
            s.id,
            s.name,
            s.class,
            `${s.attendance}%`,
            <Badge>{s.status}</Badge>,
            <Button variant="outline" onClick={() => setView(s)}>
              View
            </Button>,
          ])}
        />
      </Card>
      {view && (
        <Modal title={view.name} onClose={() => setView(null)}>
          <InfoRows
            rows={[
              ["Student ID", view.id],
              ["Class", view.class],
              ["Attendance", `${view.attendance}%`],
              ["Rank", `#${view.rank}`],
              ["Average Marks", `${view.average}%`],
              ["Status", view.status],
            ]}
          />
        </Modal>
      )}
    </>
  );
}
export function AttendanceManagement() {
  const data = useData();
  const [params] = useSearchParams();
  const [selectedClass, setClass] = useState(
    params.get("class") || "G11-MAT-SAT",
  );
  const [date, setDate] = useState("2026-03-24");
  const [marks, setMarks] = useState(
    Object.fromEntries(data.students.map((s) => [s.id, s.present])),
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  function load() {
    setMarks(
      data.attendance[`${selectedClass}:${date}`] ||
        Object.fromEntries(data.students.map((s) => [s.id, s.present])),
    );
    setOpen(true);
  }
  function save() {
    try {
      updateData((d) => ({
        ...d,
        attendance: { ...d.attendance, [`${selectedClass}:${date}`]: marks },
      }));
      setMessage(`Attendance saved locally for ${selectedClass} — ${date}.`);
      setError("");
      setOpen(false);
    } catch {
      setError(
        "Attendance was not saved. Check browser storage and try again.",
      );
    }
  }
  const counts = ["Present", "Absent", "Late"].map(
    (s) => `${Object.values(marks).filter((m) => m === s).length} ${s}`,
  );
  const controls = (
    <>
      <Field
        label="DATE"
        type="date"
        value={date}
        required
        onChange={(e) => setDate(e.target.value)}
      />
      <Field
        label="SELECT CLASS"
        options={teacherClasses.map((c) => c.id)}
        value={selectedClass}
        onChange={(e) => setClass(e.target.value)}
      />
    </>
  );
  const markAll = () =>
    setMarks(Object.fromEntries(data.students.map((s) => [s.id, "Present"])));
  return (
    <>
      <PageTitle
        title="Attendance Management"
        subtitle="Record and review class attendance"
      />
      <Notice>{message}</Notice>
      <Notice kind="error">{error}</Notice>
      <StatePreview>
        <div className="desktop-attendance stack">
          <div className="grid-two">
            <Card title="Mark Today’s Attendance">
              <div className="stack">
                {controls}
                <Button onClick={load} disabled={!date}>
                  Open Attendance Sheet
                </Button>
              </div>
            </Card>
            <Card title="Attendance Summary">
              {teacherClasses.map((c, i) => (
                <Progress
                  key={c.id}
                  label={c.id}
                  value={[88, 82, 91][i]}
                  color={i === 1 ? "#de9e31" : undefined}
                />
              ))}
            </Card>
          </div>
          <Card title="Attendance History">
            <DataTable
              headers={[
                "Date",
                "Class",
                "Total",
                "Present",
                "Absent",
                "Percentage",
              ]}
              rows={[
                "24 Mar 2026",
                "22 Mar 2026",
                "20 Mar 2026",
                "17 Mar 2026",
              ].map((date, i) => [
                date,
                teacherClasses[i % 3].id,
                28,
                [27, 27, 24, 21][i],
                [1, 3, 2, 7][i],
                <Badge>{[96, 90, 92, 75][i]}%</Badge>,
              ])}
            />
          </Card>
        </div>
        <div className="responsive-attendance">
          <Card title="Mark Today’s Attendance">
            <div className="form-grid">{controls}</div>
          </Card>
          <div className="stack">
            <div className="flex gap-3">
              {counts.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <Button variant="outline" onClick={markAll}>
              Mark all Present
            </Button>
            <Button className="hidden sm:inline-flex" onClick={save}>
              Save Attendance
            </Button>
          </div>
          <Card
            title={`Mark Attendance — ${selectedClass}`}
            className="attendance-list"
          >
            {data.students.map((s) => (
              <div key={s.id} className="attendance-mobile-row">
                <div>
                  <strong>{s.name}</strong>
                  <small>{s.id}</small>
                </div>
                <select
                  aria-label={`Attendance for ${s.name}`}
                  value={marks[s.id]}
                  onChange={(e) =>
                    setMarks({ ...marks, [s.id]: e.target.value })
                  }
                >
                  {["Present", "Absent", "Late"].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            ))}
          </Card>
          <Button className="sm:hidden" onClick={save}>
            Save Attendance
          </Button>
        </div>
      </StatePreview>
      {open && (
        <Modal
          wide
          title={`Mark Attendance — ${selectedClass} — ${date}`}
          onClose={() => setOpen(false)}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <Button variant="outline" className="button-sm" onClick={markAll}>
              Mark all Present
            </Button>
            <div className="flex gap-3">
              {counts.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
          </div>
          <DataTable
            headers={["#", "Student ID", "Name", "Status"]}
            rows={data.students.map((s, i) => [
              i + 1,
              s.id,
              s.name,
              <div className="attendance-options">
                {["Present", "Absent", "Late"].map((status) => (
                  <button
                    key={status}
                    aria-label={`${s.name}: ${status}`}
                    aria-pressed={marks[s.id] === status}
                    className={
                      marks[s.id] === status
                        ? `chosen ${status.toLowerCase()}`
                        : ""
                    }
                    onClick={() => setMarks({ ...marks, [s.id]: status })}
                  >
                    {status}
                  </button>
                ))}
              </div>,
            ])}
          />
          <div className="form-actions">
            <Button onClick={save}>Save Attendance</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
          <p className="receipt-note">
            Records are saved in this browser only.
          </p>
        </Modal>
      )}
    </>
  );
}
export function MarksEntry({ update = false, admin = false }) {
  const data = useData();
  const [query, setQuery] = useState("");
  const [params] = useSearchParams();
  const [classId, setClass] = useState(params.get("class") || "");
  const [assessment, setAssessment] = useState("");
  const [date, setDate] = useState("");
  const [marks, setMarks] = useState(
    Object.fromEntries(
      data.students.map((s, i) => [s.id, data.drafts[s.id] ?? 70 + i * 3]),
    ),
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(null);
  function save(publish) {
    if (!update && (!classId || !assessment || !date)) {
      setError("Select a class, assessment type and assessment date first.");
      return;
    }
    if (
      Object.values(marks).some(
        (m) => m === "" || !Number.isFinite(Number(m)) || m < 0 || m > 100,
      )
    ) {
      setError(
        "Some marks are outside the valid range (0–100). Please correct them before saving.",
      );
      return;
    }
    try {
      updateData((d) => ({
        ...d,
        drafts: { ...d.drafts, ...marks },
        published: publish
          ? {
              ...d.published,
              ...Object.fromEntries(
                data.students.map((s) => [
                  s.id,
                  [Number(marks[s.id]), s.marks[1], s.marks[2]],
                ]),
              ),
            }
          : d.published,
      }));
      setError("");
      setMessage(
        publish
          ? "Results published in this local demo. No server records changed."
          : "Draft saved locally. Draft marks are not visible in the student results preview.",
      );
    } catch {
      setError("Results were not saved. Check browser storage and try again.");
    }
  }
  const headers = [
    "Student",
    "Class",
    "Test 1",
    "Test 2",
    "Term Test",
    "Avg /100",
    "Grade",
    "Action",
  ];
  return (
    <>
      <PageTitle
        title={update ? "Update Results" : "Enter Marks"}
        subtitle={`${update ? "Only Teacher-published marks are visible to students." : "Marks: 0–100. Save Draft is private; Publish makes results visible."} 0–34 F · 35–54 S · 55–64 C · 65–74 B · 75–95 A · 96–100 A+`}
      />
      <Notice>{message}</Notice>
      <Notice kind="error">{error}</Notice>
      <StatePreview>
        {update ? (
          <>
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search student..."
            />
            <Card className="mt-4">
              <DataTable
                headers={headers}
                rows={data.students
                  .filter((s) => match(s, query))
                  .map((s) => {
                    const m = data.published[s.id] || s.marks;
                    const avg = Math.round(m.reduce((a, b) => a + b, 0) / 3);
                    return [
                      s.name,
                      s.class,
                      ...m,
                      avg,
                      <Badge>{grade(avg)}</Badge>,
                      <Button variant="outline" onClick={() => setEdit(s)}>
                        Edit
                      </Button>,
                    ];
                  })}
              />
            </Card>
          </>
        ) : (
          <div className="split-form">
            <Card title="Select Assessment">
              <div className="stack">
                <Field
                  label="Class"
                  options={teacherClasses.map((c) => c.id)}
                  value={classId}
                  onChange={(e) => setClass(e.target.value)}
                />
                <Field
                  label="Assessment Type"
                  options={["Test 1", "Test 2", "Term Test", "Model Paper"]}
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                />
                <Field label="Max Marks (fixed)" value="100" readOnly />
                <Field
                  label="Assessment Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (!classId || !assessment || !date)
                      setError(
                        "Select the assessment details before loading students.",
                      );
                    else {
                      setError("");
                      setMessage(
                        `Loaded ${data.students.length} local student records for ${classId}.`,
                      );
                    }
                  }}
                >
                  + Load Students
                </Button>
              </div>
            </Card>
            <Card title="Marks Entry">
              <DataTable
                headers={["#", "Student ID", "Name", "Marks (/100)", "Grade"]}
                rows={data.students
                  .slice(0, 5)
                  .map((s, i) => [
                    i + 1,
                    s.id,
                    s.name,
                    <input
                      aria-label={`Marks for ${s.name}`}
                      className="marks-input"
                      type="number"
                      min="0"
                      max="100"
                      value={marks[s.id]}
                      onChange={(e) =>
                        setMarks({ ...marks, [s.id]: e.target.value })
                      }
                    />,
                    grade(marks[s.id]),
                  ])}
              />
              <div className="form-actions">
                <Button icon="save" onClick={() => save(false)}>
                  Save Draft
                </Button>
                <Button
                  variant="outline"
                  icon="megaphone"
                  onClick={() => save(true)}
                >
                  Publish Results
                </Button>
              </div>
            </Card>
          </div>
        )}
      </StatePreview>
      {edit && (
        <Modal
          title={`Edit Results — ${edit.name}`}
          onClose={() => setEdit(null)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const v = Object.fromEntries(new FormData(e.currentTarget));
              const m = [Number(v.test1), Number(v.test2), Number(v.term)];
              try {
                updateData((d) => ({
                  ...d,
                  students: d.students.map((s) =>
                    s.id === edit.id ? { ...s, marks: m } : s,
                  ),
                  ...(admin
                    ? {}
                    : { published: { ...d.published, [edit.id]: m } }),
                }));
                setEdit(null);
                setMessage(
                  admin
                    ? "Draft changes saved locally. Only the assigned teacher can publish."
                    : "Results updated in the local demo.",
                );
              } catch {
                setError("Could not save results locally.");
              }
            }}
          >
            <div className="stack">
              {["Test 1", "Test 2", "Term Test"].map((label, i) => (
                <Field
                  key={label}
                  label={label}
                  name={["test1", "test2", "term"][i]}
                  type="number"
                  min="0"
                  max="100"
                  required
                  defaultValue={(data.published[edit.id] || edit.marks)[i]}
                />
              ))}
            </div>
            <div className="form-actions">
              <Button type="submit">Save Changes</Button>
              <Button variant="outline" onClick={() => setEdit(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
export function TeacherPerformance({ statistics = false }) {
  const data = useData();
  const [selected, setSelected] = useState("G11-MAT-SAT");
  const [subject, setSubject] = useState("Mathematics");
  return (
    <>
      <PageTitle
        title={statistics ? "Class Statistics" : "Student Performance"}
        subtitle={
          statistics
            ? "Grade distribution, attendance trend and assessment averages for your classes"
            : "Track rank, attendance and marks trend of the students in your classes"
        }
      />
      <div className="toolbar">
        <Field
          label="Class"
          options={teacherClasses.map((c) => c.id)}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Field
          label="Subject"
          options={subjects}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() =>
            exportCSV(
              "Student Performance",
              data.students.filter(
                (s) => s.class === selected && s.subject === subject,
              ),
            )
          }
        >
          Export Report
        </Button>
      </div>
      <Stats
        items={
          statistics
            ? [
                {
                  label: "Students",
                  value: "28",
                  sub: "Enrolled",
                  plain: true,
                },
                {
                  label: "Average Marks",
                  value: "79%",
                  sub: `Class ${selected}`,
                },
                { label: "Avg. Attendance", value: "87%", sub: "This term" },
                { label: "Highest Score", value: "96%", sub: "Term Test" },
              ]
            : [
                {
                  label: "Class Average Marks",
                  value: "79%",
                  sub: `${selected} · 8 students shown`,
                  plain: true,
                },
                { label: "Average Attendance", value: "87%", sub: "This term" },
                {
                  label: "At-risk Students",
                  value: "2",
                  sub: "Marks below 70%",
                },
              ]
        }
      />
      {statistics ? (
        <div className="stack">
          <div className="grid-two">
            <Card title="Grade Distribution">
              <p className="text-xs text-muted">Number of students per grade</p>
              <BarChart
                values={[81, 100, 54, 18, 0]}
                labels={["A/A+ (9)", "B (11)", "C (6)", "S (2)", "F (0)"]}
              />
            </Card>
            <Card title="Weekly Attendance (%)">
              <p className="text-xs text-muted">Average attendance per week</p>
              <BarChart
                values={[90, 88, 87, 87, 85, 85]}
                labels={["W1", "W2", "W3", "W4", "W5", "W6"]}
              />
            </Card>
          </div>
          <Card title="Assessment Averages">
            {["Test 1", "Test 2", "Term Test", "Homework"].map((label, i) => (
              <Progress key={label} label={label} value={[70, 76, 73, 81][i]} />
            ))}
          </Card>
        </div>
      ) : (
        <Card title={`Student Performance — ${selected}`}>
          <DataTable
            headers={[
              "Student",
              "Rank",
              "Attendance",
              "Avg. Marks",
              "Trend",
              "Status",
            ]}
            rows={data.students
              .filter((s) => s.class === selected && s.subject === subject)
              .map((s, i) => [
                <div>
                  {s.name}
                  <small className="block text-muted">{s.id}</small>
                </div>,
                s.rank,
                `${s.attendance}%`,
                `${s.average}%`,
                [
                  "↗ +4%",
                  "↗ +2%",
                  "— 0%",
                  "↗ +3%",
                  "↗ +2%",
                  "↘ −2%",
                  "↘ −4%",
                  "↘ −6%",
                ][i],
                <Badge>
                  {i < 2
                    ? "Excellent"
                    : i < 5
                      ? "Good"
                      : i === 5
                        ? "Average"
                        : "At risk"}
                </Badge>,
              ])}
            cardOnMobile
          />
        </Card>
      )}
    </>
  );
}
export function Announcements({ admin = false }) {
  const data = useData();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [removing, setRemoving] = useState(null);
  function save(e) {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget));
    if (v.expiry && v.expiry < v.date) {
      setError("Expiry date must be on or after the publish date.");
      return;
    }
    try {
      updateData((d) => ({
        ...d,
        announcements: editing
          ? d.announcements.map((a) =>
              a.id === editing.id ? { ...a, ...v } : a,
            )
          : [
              ...d.announcements,
              { ...v, id: `ANN-${Date.now()}`, status: "Active" },
            ],
      }));
      setMessage(
        "Announcement saved in the local demo. No notifications were sent.",
      );
      setError("");
      setEditing(null);
      e.target.reset();
    } catch {
      setError("The announcement could not be saved. Please try again.");
    }
  }
  return (
    <>
      <PageTitle title={admin ? "Manage Announcements" : "Announcements"} />
      <Notice>{message}</Notice>
      <Notice kind="error">{error}</Notice>
      <StatePreview>
        <div className={admin ? "stack" : "grid-two"}>
          <Card
            title={
              editing
                ? "Edit Announcement"
                : admin
                  ? "Create Announcement"
                  : "New Announcement"
            }
          >
            <form key={editing?.id || "new"} onSubmit={save}>
              <div className={admin ? "form-grid" : "stack"}>
                {admin && (
                  <>
                    <Field
                      label="Target Audience"
                      name="audience"
                      options={["All", "Students", "Teachers"]}
                      defaultValue={editing?.audience}
                      required
                    />
                    <Field
                      label="Priority"
                      name="priority"
                      options={["High", "Medium", "Low"]}
                      defaultValue={editing?.priority}
                      required
                    />
                  </>
                )}
                <Field
                  label="Title"
                  name="title"
                  placeholder="Announcement title"
                  defaultValue={editing?.title}
                  required
                />
                {!admin && (
                  <Field
                    label="Audience"
                    name="audience"
                    options={teacherClasses.map((c) => c.id)}
                    required
                  />
                )}
                <Field
                  label={admin ? "Content" : "Message"}
                  name="content"
                  as="textarea"
                  placeholder="Write the full announcement here..."
                  defaultValue={editing?.content}
                  required
                />
                {admin && (
                  <>
                    <Field
                      label="Publish Date"
                      name="date"
                      type="date"
                      defaultValue={editing?.date}
                      required
                    />
                    <Field
                      label="Expiry Date"
                      name="expiry"
                      type="date"
                      defaultValue={editing?.expiry}
                    />
                  </>
                )}
              </div>
              <div className="form-actions">
                <Button type="submit" icon="megaphone">
                  {admin ? "Publish Announcement" : "Publish"}
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setError("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Card>
          <Card title={admin ? "All Announcements" : "Recent Announcements"}>
            {admin ? (
              <DataTable
                headers={[
                  "#",
                  "Title",
                  "Audience",
                  "Priority",
                  "Published",
                  "Expires",
                  "Status",
                  "Action",
                ]}
                rows={data.announcements.map((a, i) => [
                  i + 1,
                  a.title,
                  a.audience,
                  <Badge>{a.priority}</Badge>,
                  a.date || "Local demo",
                  a.expiry || "—",
                  <Badge>{a.status}</Badge>,
                  <div className="table-actions">
                    <Button variant="outline" onClick={() => setEditing(a)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => setRemoving(a)}>
                      Delete
                    </Button>
                  </div>,
                ])}
              />
            ) : (
              <div className="notification-list">
                {data.announcements.map((a) => (
                  <div key={a.id}>
                    <strong>{a.title}</strong>
                    <small>{a.date}</small>
                    <p className="text-xs mt-2">{a.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </StatePreview>
      {removing && (
        <Modal title="Delete announcement?" onClose={() => setRemoving(null)}>
          <p>This removes “{removing.title}” from the local demo.</p>
          <div className="form-actions">
            <Button
              variant="danger"
              onClick={() => {
                try {
                  updateData((d) => ({
                    ...d,
                    announcements: d.announcements.filter(
                      (a) => a.id !== removing.id,
                    ),
                  }));
                  setRemoving(null);
                } catch {
                  setError("Could not remove the local announcement.");
                }
              }}
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => setRemoving(null)}>
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
