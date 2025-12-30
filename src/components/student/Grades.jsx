import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ADD THIS IMPORT
import "./styles.css";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function Grades() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const closer = (e) => {
      if (window.innerWidth <= 992) {
        if (
          !e.target.closest("#sidebar") &&
          !e.target.closest("#mobileMenuToggle")
        ) {
          setSidebarOpen(false);
        }
      }
    };
    document.addEventListener("click", closer);
    return () => document.removeEventListener("click", closer);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ADD THIS MISSING FUNCTION
  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  const gradeData = {
    labels: ["A (90-100%)", "B (80-89%)", "C (70-79%)", "D (Below 70%)"],
    datasets: [
      {
        data: [45, 35, 15, 5],
        backgroundColor: ["#4CAF50", "#FFB300", "#FF7043", "#E53935"],
      },
    ],
  };

  const gradeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          boxWidth: 12,
          font: { size: window.innerWidth < 480 ? 10 : 12 },
        },
      },
    },
    cutout: "60%",
  };

  const trendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Performance (%)",
        data: [80, 85, 87, 90, 92, 88],
        borderColor: "#1a237e",
        backgroundColor: "rgba(26, 35, 126, 0.1)",
        fill: true,
        tension: 0.3,
        borderWidth: 2,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: false,
        min: 70,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
      x: { grid: { display: false } },
    },
  };

  const exportGrades = () =>
    alert(
      "Exporting grades…\n\nThis would generate a PDF/CSV file with all your grades."
    );

  return (
    <>
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn d-lg-none"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
      </button>
      <aside
        id="sidebar"
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>{sidebarCollapsed ? "" : "E-Learn"}</h2>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li>
              <Link to="/StudentDashboard" onClick={handleMenuClick}>
                <i className="fas fa-tachometer-alt" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/All-Courses" onClick={handleMenuClick}>
                <i className="fas fa-layer-group" />
                <span>All Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/My-Course" onClick={handleMenuClick}>
                <i className="fas fa-book" />
                <span>My Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/Assignments" onClick={handleMenuClick}>
                <i className="fas fa-tasks" />
                <span>Assignments</span>
              </Link>
            </li>
            <li className="active">
              <Link to="/Grades" onClick={handleMenuClick}>
                <i className="fas fa-graduation-cap" />
                <span>Grades</span>
              </Link>
            </li>
            <li>
              <Link to="/Certificates" onClick={handleMenuClick}>
                <i className="fas fa-certificate" />
                <span>Certificates</span>
              </Link>
            </li>
            <div className="menu-spacer" />
            <li>
              <Link to="/Setting" onClick={handleMenuClick}>
                <i className="fas fa-cog" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/Login" onClick={handleMenuClick}>
                <i className="fas fa-sign-out-alt" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div
              id="desktopMenuToggle"
              className="icon d-none d-lg-flex"
              onClick={() => setSidebarCollapsed((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars" />
            </div>
            <div className="welcome">
              <h2>Grades Overview</h2>
              <p className="d-none d-md-block">
                Track your academic performance and grades
              </p>
            </div>
          </div>

          <div className="user-area">
            <a href="#" className="icon position-relative">
              <i className="fas fa-bell" />
              <span className="badge">2</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope" />
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt" />
            </a>
            <a href="#">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </a>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Average Grade</h3>
            <p>88%</p>
            <div className="stat-trend">+2% from last term</div>
          </div>
          <div className="stat-card">
            <h3>Highest Grade</h3>
            <p>97%</p>
            <div className="stat-trend">Introduction to Psychology</div>
          </div>
          <div className="stat-card">
            <h3>Lowest Grade</h3>
            <p>72%</p>
            <div className="stat-trend">Data Science 101</div>
          </div>
          <div className="stat-card">
            <h3>Completed Courses</h3>
            <p>8</p>
            <div className="stat-trend">3 in progress</div>
          </div>
        </div>
        <div className="charts-section">
          <div className="chart-card">
            <h3>Grade Distribution</h3>
            <div className="chart-container-wrapper">
              <Doughnut
                data={gradeData}
                options={gradeOptions}
                className="chart-container"
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Performance Trend</h3>
            <div className="chart-container-wrapper">
              <Line
                data={trendData}
                options={trendOptions}
                className="chart-container"
              />
            </div>
          </div>
        </div>

        <div className="grades-section">
          <div className="section-header">
            <h2>Course Grades</h2>
            <button className="btn btn-secondary" onClick={exportGrades}>
              <i className="fas fa-download" /> Export Grades
            </button>
          </div>

          <div className="table-responsive">
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Grade</th>
                  <th>Letter</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Introduction to Psychology</td>
                  <td>Dr. Smith</td>
                  <td>92%</td>
                  <td>
                    <span className="grade-badge grade-a">A</span>
                  </td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Business Communication</td>
                  <td>Prof. Davis</td>
                  <td>84%</td>
                  <td>
                    <span className="grade-badge grade-b">B</span>
                  </td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Data Science 101</td>
                  <td>Dr. Wilson</td>
                  <td>78%</td>
                  <td>
                    <span className="grade-badge grade-c">C</span>
                  </td>
                  <td>
                    <span className="status in-progress">In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td>Web Development</td>
                  <td>Ms. Taylor</td>
                  <td>90%</td>
                  <td>
                    <span className="grade-badge grade-a">A</span>
                  </td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Calculus I</td>
                  <td>Prof. Johnson</td>
                  <td>87%</td>
                  <td>
                    <span className="grade-badge grade-b">B+</span>
                  </td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Digital Marketing</td>
                  <td>Mr. Brown</td>
                  <td>81%</td>
                  <td>
                    <span className="grade-badge grade-b">B</span>
                  </td>
                  <td>
                    <span className="status in-progress">In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td>English Literature</td>
                  <td>Dr. Miller</td>
                  <td>95%</td>
                  <td>
                    <span className="grade-badge grade-a">A+</span>
                  </td>
                  <td>
                    <span className="status completed">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Chemistry Basics</td>
                  <td>Prof. Wilson</td>
                  <td>68%</td>
                  <td>
                    <span className="grade-badge grade-d">D</span>
                  </td>
                  <td>
                    <span className="status pending">Needs Review</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
