import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Layout from "./components/Layout";
import { Auth, Portal } from "./pages/Auth";
import About from "./pages/About";
import {
  AcademicPerformance,
  ClassDetails,
  ClassFees,
  Notifications,
  OnlinePayment,
  PaymentHistory,
  Receipt,
  RegisteredClasses,
  Schedule,
  StudentAttendance,
  StudentDashboard,
  StudentProfile,
  StudentRank,
  StudentResults,
  TeacherDirectory,
  UploadSlip,
} from "./pages/Student";
import {
  Announcements,
  AssignedClasses,
  AttendanceManagement,
  MarksEntry,
  TeacherDashboard,
  TeacherPerformance,
  TeacherProfile,
  TeacherStudents,
} from "./pages/Teacher";
import {
  AssignTeachers,
  ManagePeople,
  RegisterPerson,
} from "./pages/AdminPeople";
import {
  AdminAttendance,
  ClassWizard,
  Enrollment,
  ManageClasses,
  Subjects,
} from "./pages/AdminClasses";
import {
  OverdueFees,
  PaymentReview,
  RecordPayment,
} from "./pages/AdminPayments";
import {
  AdminDashboard,
  ExaminationResults,
  FinancialInformation,
  Reports,
  SystemAnalytics,
} from "./pages/Admin";
import { roleInfo } from "./data/mock";
import { EmptyState, Button } from "./components/ui";

const screens = {
  student: {
    dashboard: <StudentDashboard />,
    "my-profile": <StudentProfile />,
    "registered-classes": <RegisteredClasses />,
    "class-schedule": <Schedule />,
    "teacher-information": <TeacherDirectory />,
    "class-fees": <ClassFees />,
    "online-payment": <OnlinePayment />,
    "upload-payment-slip": <UploadSlip />,
    "payment-history": <PaymentHistory />,
    attendance: <StudentAttendance />,
    "marks-results": <StudentResults />,
    rank: <StudentRank />,
    "academic-performance": <AcademicPerformance />,
    notifications: <Notifications />,
  },
  teacher: {
    dashboard: <TeacherDashboard />,
    "my-profile": <TeacherProfile />,
    "assigned-classes": <AssignedClasses />,
    students: <TeacherStudents />,
    "filter-students": <TeacherStudents filter />,
    "attendance-management": <AttendanceManagement />,
    "enter-marks": <MarksEntry />,
    "update-results": <MarksEntry update />,
    "student-performance": <TeacherPerformance />,
    "class-statistics": <TeacherPerformance statistics />,
    announcements: <Announcements />,
  },
  admin: {
    dashboard: <AdminDashboard />,
    "my-profile": <RegisterPerson profile kind="admin" />,
    "register-student": <RegisterPerson />,
    "register-teacher": <RegisterPerson kind="teacher" />,
    "register-administrator": <RegisterPerson kind="admin" />,
    "manage-users": <ManagePeople kind="users" />,
    "manage-students": <ManagePeople />,
    "manage-teachers": <ManagePeople kind="teachers" />,
    "manage-classes": <ManageClasses />,
    "assign-teachers": <AssignTeachers />,
    "student-enrollment": <Enrollment />,
    "manage-attendance": <AdminAttendance />,
    "manage-payments": <PaymentReview />,
    "verify-payment-slips": <PaymentReview mode="verify" />,
    "approve-reject-payments": <PaymentReview mode="approval" />,
    "manage-examination-results": <ExaminationResults />,
    "manage-announcements": <Announcements admin />,
    "financial-information": <FinancialInformation />,
    reports: <Reports />,
    "system-analytics": <SystemAnalytics />,
    "create-class": <ClassWizard />,
    "manage-class-schedule": <ClassWizard schedule />,
    subjects: <Subjects />,
    "configure-examination": <ClassWizard exam />,
    "record-payment": <RecordPayment />,
    "overdue-fees": <OverdueFees />,
  },
};
function Screen() {
  const { role, screen } = useParams();
  return (
    screens[role]?.[screen] || (
      <EmptyState title="Page not found">
        <Button to={`/${role}/dashboard`}>Back to dashboard</Button>
      </EmptyState>
    )
  );
}
function Shell() {
  const { role } = useParams();
  if (!roleInfo[role]) return <Navigate to="/" replace />;
  const current = sessionStorage.getItem("stsms-role");
  if (!current) return <Navigate to={`/${role}/login`} replace />;
  if (current !== role) return <Navigate to="/access-denied" replace />;
  return <Layout />;
}
function RolePage({ roles, children }) {
  const { role } = useParams();
  return roles.includes(role) ? (
    children
  ) : (
    <Navigate to="/access-denied" replace />
  );
}
function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Portal />} />
      <Route path="/about" element={<About />} />
      <Route path="/:role/login" element={<Auth key={location.pathname} />} />
      <Route
        path="/:role/forgot-password"
        element={<Auth key={location.pathname} recovery />}
      />
      <Route path="/session-expired" element={<Auth status="expired" />} />
      <Route path="/access-denied" element={<Auth status="denied" />} />
      <Route path="/:role" element={<Shell />}>
        <Route path=":screen" element={<Screen key={location.pathname} />} />
        <Route
          path="class-details/:id"
          element={
            <RolePage roles={["student"]}>
              <ClassDetails />
            </RolePage>
          }
        />
        <Route
          path="receipt/:id"
          element={
            <RolePage roles={["student", "admin"]}>
              <Receipt />
            </RolePage>
          }
        />
        <Route
          path="edit-student/:id"
          element={
            <RolePage roles={["admin"]}>
              <RegisterPerson edit />
            </RolePage>
          }
        />
        <Route
          path="edit-teacher/:id"
          element={
            <RolePage roles={["admin"]}>
              <RegisterPerson edit kind="teacher" />
            </RolePage>
          }
        />
        <Route
          path="edit-class/:id"
          element={
            <RolePage roles={["admin"]}>
              <ClassWizard edit />
            </RolePage>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AppRoutes />
    </BrowserRouter>
  );
}
