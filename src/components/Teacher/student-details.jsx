import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./styles.css";

const StudentDetails = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChartsReady, setIsChartsReady] = useState(false);

  const gradeChartRef = useRef(null);
  const attendanceChartRef = useRef(null);
  const gradeChartInstance = useRef(null);
  const attendanceChartInstance = useRef(null);

  // Student data
  const studentData = {
    name: "Emma Watson",
    course: "Chemistry",
    email: "emma@example.com",
    studentId: "#STU-105",
    photo: "https://i.pravatar.cc/150?img=32",
    overallGrade: 95,
    attendance: 99,
    courseCount: 5,
    completedAssignments: 22,
  };

  const assignments = [
    {
      title: "Organic Lab Report",
      course: "Chemistry",
      date: "Oct 15, 2025",
      grade: 98,
      status: "Completed",
    },
    {
      title: "Chapter Quiz 4",
      course: "Mathematics",
      date: "Oct 22, 2025",
      grade: 90,
      status: "Completed",
    },
    {
      title: "Physics Project",
      course: "Physics",
      date: "Oct 30, 2025",
      grade: "—",
      status: "Pending",
    },
    {
      title: "Essay on Energy",
      course: "Science",
      date: "Nov 1, 2025",
      grade: "—",
      status: "Pending",
    },
    {
      title: "Lab Safety Assessment",
      course: "Chemistry",
      date: "Sep 30, 2025",
      grade: 100,
      status: "Completed",
    },
    {
      title: "Algebra Test",
      course: "Mathematics",
      date: "Sep 25, 2025",
      grade: 88,
      status: "Completed",
    },
  ];

  // Calculate dynamic stats
  const completedAssignments = assignments.filter(
    (a) => a.status === "Completed"
  ).length;
  const gradedAssignments = assignments.filter((a) => a.grade !== "—");
  const averageGrade =
    gradedAssignments.length > 0
      ? Math.round(
          gradedAssignments.reduce((sum, a) => sum + a.grade, 0) /
            gradedAssignments.length
        )
      : 0;

  // Handle responsive behavior - FIXED VERSION
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarCollapsed(false);
      }

      // FIXED: Only resize if charts exist and are ready
      if (isChartsReady) {
        setTimeout(() => {
          try {
            if (gradeChartInstance.current && gradeChartRef.current) {
              gradeChartInstance.current.resize();
            }
            if (attendanceChartInstance.current && attendanceChartRef.current) {
              attendanceChartInstance.current.resize();
            }
          } catch (error) {
            console.warn("Chart resize error:", error);
          }
        }, 100);
      }
    };

    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [isChartsReady]);

  // Handle click outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebar = document.getElementById("sidebar");
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          mobileMenuToggle &&
          !mobileMenuToggle.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Initialize charts - FIXED VERSION
  useEffect(() => {
    // Use a delay to ensure DOM is ready
    const initializeCharts = () => {
      setTimeout(() => {
        createCharts();
      }, 300);
    };

    const createCharts = () => {
      try {
        // Destroy existing charts if they exist
        if (gradeChartInstance.current) {
          gradeChartInstance.current.destroy();
          gradeChartInstance.current = null;
        }
        if (attendanceChartInstance.current) {
          attendanceChartInstance.current.destroy();
          attendanceChartInstance.current = null;
        }

        // Check if canvas elements exist
        if (!gradeChartRef.current || !attendanceChartRef.current) {
          console.warn("Canvas elements not ready");
          return;
        }

        // Grade Chart
        const gradeCtx = gradeChartRef.current.getContext("2d");
        if (gradeCtx) {
          gradeChartInstance.current = new Chart(gradeCtx, {
            type: "line",
            data: {
              labels: ["Term 1", "Term 2", "Term 3", "Term 4"],
              datasets: [
                {
                  label: "Grade (%)",
                  data: [87, 90, 93, 95],
                  borderColor: "#4CAF50",
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  tension: 0.3,
                  fill: true,
                  pointBackgroundColor: "#4CAF50",
                  pointBorderColor: "#fff",
                  pointBorderWidth: 2,
                  pointRadius: 5,
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "#4CAF50",
                  pointHoverRadius: 7,
                  pointHoverBorderWidth: 3,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "nearest",
                intersect: false,
                axis: "x",
              },
              hover: {
                mode: "nearest",
                intersect: false,
                animationDuration: 200,
              },
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: { family: "'Poppins', sans-serif" },
                  },
                },
                tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  titleFont: { family: "'Poppins', sans-serif" },
                  bodyFont: { family: "'Poppins', sans-serif" },
                  position: "nearest",
                  intersect: false,
                  callbacks: {
                    label: function (context) {
                      return `${context.dataset.label}: ${context.parsed.y}%`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    font: { family: "'Poppins', sans-serif" },
                  },
                  grid: {
                    display: true,
                    drawBorder: true,
                  },
                },
                x: {
                  ticks: {
                    font: { family: "'Poppins', sans-serif" },
                  },
                  grid: {
                    display: false,
                  },
                },
              },
              animation: {
                duration: 1000,
                easing: "easeInOutQuart",
                onComplete: () => {
                  console.log("Grade chart animation completed");
                },
              },
            },
          });
        }

        // Attendance Chart
        const attendanceCtx = attendanceChartRef.current.getContext("2d");
        if (attendanceCtx) {
          attendanceChartInstance.current = new Chart(attendanceCtx, {
            type: "bar",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [
                {
                  label: "Attendance (%)",
                  data: [97, 98, 99, 99, 98],
                  backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FFC107",
                    "#E91E63",
                    "#9C27B0",
                  ],
                  borderRadius: 6,
                  hoverBackgroundColor: [
                    "#45a049",
                    "#1976d2",
                    "#ffb300",
                    "#d81b60",
                    "#8e24aa",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: "nearest",
                intersect: false,
                axis: "x",
              },
              hover: {
                mode: "nearest",
                intersect: false,
                animationDuration: 200,
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  titleFont: { family: "'Poppins', sans-serif" },
                  bodyFont: { family: "'Poppins', sans-serif" },
                  position: "nearest",
                  intersect: false,
                  callbacks: {
                    label: function (context) {
                      return `${context.dataset.label}: ${context.parsed.y}%`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    font: { family: "'Poppins', sans-serif" },
                  },
                  grid: {
                    display: true,
                    drawBorder: true,
                  },
                },
                x: {
                  ticks: {
                    font: { family: "'Poppins', sans-serif" },
                  },
                  grid: {
                    display: false,
                  },
                },
              },
              animation: {
                duration: 1000,
                easing: "easeInOutQuart",
                onComplete: () => {
                  console.log("Attendance chart animation completed");
                },
              },
            },
          });
        }

        // Mark charts as ready
        setIsChartsReady(true);
      } catch (error) {
        console.error("Error creating charts:", error);
        setIsChartsReady(false);
      }
    };

    initializeCharts();

    // Cleanup function
    return () => {
      if (gradeChartInstance.current) {
        gradeChartInstance.current.destroy();
        gradeChartInstance.current = null;
      }
      if (attendanceChartInstance.current) {
        attendanceChartInstance.current.destroy();
        attendanceChartInstance.current = null;
      }
      setIsChartsReady(false);
    };
  }, []);

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  const handleEditClick = () => {
    alert(
      "Edit student details feature coming soon!\n\nYou'll be able to update:\n• Student name\n• Course enrollment\n• Contact information\n• Additional notes"
    );
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    const parent = e.currentTarget.parentElement;
    parent.classList.toggle("open");

    // Close other submenus
    document.querySelectorAll(".has-submenu").forEach((item) => {
      if (item !== parent) {
        item.classList.remove("open");
      }
    });
  };

  return (
    <div className="student-details-container">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        id="mobileMenuToggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
        id="sidebar"
      >
        <div className="sidebar-header">
          <h2>E-Learn</h2>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <li>
              <a href="/">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="has-submenu">
              <a href="#" className="submenu-toggle" onClick={toggleSubmenu}>
                <i className="fas fa-layer-group"></i>
                <span>Courses</span>
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "auto" }}
                ></i>
              </a>
              <div className="submenu">
                <a href="/all-courses">All Courses</a>
                <a href="/my-courses">My Courses</a>
              </div>
            </li>
            <li className="has-submenu active">
              <a href="#" className="submenu-toggle" onClick={toggleSubmenu}>
                <i className="fas fa-user-graduate"></i>
                <span>Students</span>
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "auto" }}
                ></i>
              </a>
              <div className="submenu">
                <a href="/all-students">All Students</a>
                <a href="/student-details">Student Details</a>
              </div>
            </li>
            <li>
              <a href="/assignments">
                <i className="fas fa-tasks"></i>
                <span>Assignments</span>
              </a>
            </li>
            <li>
              <a href="/grades">
                <i className="fas fa-graduation-cap"></i>
                <span>Grades</span>
              </a>
            </li>
            <li>
              <a href="/certificates">
                <i className="fas fa-certificate"></i>
                <span>Certificates</span>
              </a>
            </li>
            <div className="menu-spacer"></div>
            <li>
              <a href="/settings">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div
              className="icon menu-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h2>Student Details</h2>
              <p className="d-none d-md-block">
                View and manage student performance and information
              </p>
            </div>
          </div>
          <div className="user-area">
            <a href="#" className="icon position-relative d-none d-sm-flex">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt"></i>
            </a>
            <a href="/teacher-profile">
              <img src="https://i.pravatar.cc/100?img=8" alt="Teacher" />
            </a>
          </div>
        </header>

        {/* Profile Card */}
        <div className="student-profile-card">
          <img src={studentData.photo} alt="Student" />
          <div className="student-profile-info">
            <h2>{studentData.name}</h2>
            <p>
              Course: <strong>{studentData.course}</strong>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${studentData.email}`}>{studentData.email}</a>
            </p>
            <p>
              Student ID: <strong>{studentData.studentId}</strong>
            </p>
          </div>
          <div className="student-profile-actions">
            <button onClick={handleEditClick}>
              <i className="fas fa-edit"></i> Edit Details
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <section className="cards">
          <div className="card">
            <h3>Overall Grade</h3>
            <p>{averageGrade}%</p>
          </div>
          <div className="card">
            <h3>Attendance</h3>
            <p>{studentData.attendance}%</p>
          </div>
          <div className="card">
            <h3>Courses Enrolled</h3>
            <p>{studentData.courseCount}</p>
          </div>
          <div className="card">
            <h3>Completed Assignments</h3>
            <p>{completedAssignments}</p>
          </div>
        </section>

        {/* Charts */}
        <section className="charts">
          <div className="chart">
            <h4>Grade Performance</h4>
            <canvas ref={gradeChartRef} id="gradeChart"></canvas>
          </div>
          <div className="chart">
            <h4>Attendance Overview</h4>
            <canvas ref={attendanceChartRef} id="attendanceChart"></canvas>
          </div>
        </section>

        {/* Assignments Table */}
        <section className="assignments-section">
          <h3>Recent Assignments</h3>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, index) => (
                  <tr key={index}>
                    <td>{assignment.title}</td>
                    <td>{assignment.course}</td>
                    <td>{assignment.date}</td>
                    <td>{assignment.grade}</td>
                    <td>
                      <span
                        className={`status ${getStatusClass(
                          assignment.status
                        )}`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDetails;
