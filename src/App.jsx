// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import StudentDashboard from "./components/student/StudentDashboard";
// import Certificates from "./components/student/Certificates";

// import AllCourses from "./components/student/All-Courses";
// import MyCourse from "./components/student/My-Course";
// import Assignments from "./components/student/Assignments";
// import Grades from "./components/student/Grades";
// import Setting from "./components/student/Setting";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/StudentDashboard" element={<StudentDashboard />} />
//         <Route path="/All-Courses" element={<AllCourses />} />
//         <Route path="/My-Course" element={<MyCourse />} />
//         <Route path="/Assignments" element={<Assignments />} />
//         <Route path="/Grades" element={<Grades />} />
//         <Route path="/Certificates" element={<Certificates />} />
//         <Route path="/Setting" element={<Setting />} />

//         {/* Add default/redirect route */}
//         <Route path="/" element={<StudentDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//teacher

// import AllCourses from "./components/Teacher/all-courses";
// import AllStudents from "./components/Teacher/all-students";
// import Assignment from "./components/Teacher/assignmment";
// import Certificate from "./components/Teacher/certificate";
// import Grade from "./components/Teacher/grades";
// import Index from "./components/Teacher/index";
// import myCourse from "./components/Teacher/myCourse";
// import Setting from "./components/Teacher/setting";
// import StudentDetails from "./components/Teacher/student-details";
// import TeacherProfile from "./components/Teacher/teacher.profile";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/all-courses" element={<AllCourses />} />
//         <Route path="/all-students" element={<AllStudents />} />
//         <Route path="/assignmment" element={<Assignment />} />
//         <Route path="/certificate" element={<Certificate />} />
//         <Route path="/grades" element={<Grade />} />
//         <Route path="/myCourse" element={<myCourse />} />
//         <Route path="/settings" element={<Setting />} />
//         <Route path="/student-details" element={<StudentDetails />} />
//         <Route path="/teacher.profile" element={<TeacherProfile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Annoucement from "./components/Head/annoucement";
// import Course from "./components/Head/courses";
// import Index from "./components/Head/index";
// import ProfileHead from "./components/Head/profile.head";
// import Report from "./components/Head/report";
// import Setting from "./components/Head/setting";
// import Student from "./components/Head/students";
// import Teacher from "./components/Head/teachers";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Index />} />
//       <Route path="/annoucement" element={<Annoucement />}></Route>
//       <Route path="/courses" element={<Course />}></Route>
//       <Route path="/index" element={<Index />}></Route>
//       <Route path="/profile.head" element={<ProfileHead />}></Route>
//       <Route path="/report" element={<Report />}></Route>
//       <Route path="/setting" element={<Setting />}></Route>
//       <Route path="/students" element={<Student />}></Route>
//       <Route path="/teachers" element={<Teacher />}></Route>
//     </Routes>
//   );
// }

// export default App;

//manager
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./components/manager/analytic"; // File is "analytic.jsx"
import Announcements from "./components/manager/annoucement"; // File is "annoucement.jsx" (note typo)
import Grades from "./components/manager/grades"; // File is "grades.jsx"
import Certificates from "./components/manager/certificate"; // File is "certificate.jsx"
import CourseManagement from "./components/manager/course";
import Assignments from "./components/manager/assignment";
import Reports from "./components/manager/reports";
import Departments from "./components/manager/department";
import HeadDashboard from "./components/manager/head";
import ManagerDashboard from "./components/manager/index";
import ManagerReports from "./components/manager/reports";
import ManagerSettings from "./components/manager/setting";
import StudentsPage from "./components/manager/student";
import TeachersPage from "./components/manager/teacher";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ManagerDashboard />} />
      <Route path="/dashboard" element={<ManagerDashboard />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/courses" element={<CourseManagement />} />
      <Route path="/head" element={<HeadDashboard />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/analytic" element={<Analytics />} />
      <Route path="/reports" element={<ManagerReports />} />
      <Route path="/settings" element={<ManagerSettings />} />

      {/* Optional: Redirect for backward compatibility */}
      <Route path="/announcement" element={<Announcements />} />
      <Route path="/certificate" element={<Certificates />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;
