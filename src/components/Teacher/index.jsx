import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const engagementChartRef = useRef(null);
  const submissionChartRef = useRef(null);
  const engagementChartInstance = useRef(null);
  const submissionChartInstance = useRef(null);
  const sidebarRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);

  const [chartsReady, setChartsReady] = useState(false);
  const location = useLocation();

  // Dashboard data
  const assignmentData = [
    {
      name: "Essay on Shakespeare",
      course: "English Literature",
      due: "Oct 30, 2025",
      subs: "118/124",
      status: "Ongoing",
    },
    {
      name: "Math Quiz 5",
      course: "Algebra II",
      due: "Nov 3, 2025",
      subs: "90/124",
      status: "Pending",
    },
    {
      name: "Science Project",
      course: "Physics",
      due: "Nov 10, 2025",
      subs: "110/124",
      status: "Ongoing",
    },
    {
      name: "History Paper",
      course: "World History",
      due: "Oct 20, 2025",
      subs: "124/124",
      status: "Completed",
    },
    {
      name: "Lab Report",
      course: "Chemistry",
      due: "Nov 5, 2025",
      subs: "105/124",
      status: "Ongoing",
    },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "ongoing";
      case "pending":
        return "pending";
      case "completed":
        return "completed";
      default:
        return "";
    }
  };

  const calculateStats = () => {
    const coursesTaught = 4;
    const pendingAssignments = assignmentData.filter(
      (a) => a.status === "Pending"
    ).length;
    const studentsEnrolled = 124;

    const totalSubmissions = assignmentData.reduce((sum, a) => {
      const [submitted, total] = a.subs.split("/").map(Number);
      return sum + (submitted / total) * 100;
    }, 0);

    const avgClassGrade = Math.round(totalSubmissions / assignmentData.length);

    return {
      coursesTaught,
      pendingAssignments,
      studentsEnrolled,
      avgClassGrade,
    };
  };

  const { coursesTaught, pendingAssignments, studentsEnrolled, avgClassGrade } =
    calculateStats();

  // FIXED: Handle responsive behavior with proper chart resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarCollapsed(false);
      }

      // FIXED: Safer chart resize with proper null checks and timing
      if (chartsReady) {
        setTimeout(() => {
          try {
            if (engagementChartInstance.current && engagementChartRef.current) {
              engagementChartInstance.current.resize();
            }
            if (submissionChartInstance.current && submissionChartRef.current) {
              submissionChartInstance.current.resize();
            }
          } catch (error) {
            console.warn("Chart resize error:", error);
          }
        }, 100); // Small delay to ensure DOM stability
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
  }, [chartsReady]);

  // FIXED: Handle click outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebarElement = sidebarRef.current;
        const mobileMenuElement = mobileMenuToggleRef.current;

        if (
          sidebarElement &&
          !sidebarElement.contains(e.target) &&
          mobileMenuElement &&
          !mobileMenuElement.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // FIXED: Initialize charts with hover issue fixes and height control
  useEffect(() => {
    // Use a longer delay to ensure everything is properly mounted
    const initializeCharts = () => {
      setTimeout(() => {
        createCharts();
      }, 300);
    };

    const createCharts = () => {
      try {
        // Destroy existing charts if they exist
        if (engagementChartInstance.current) {
          engagementChartInstance.current.destroy();
          engagementChartInstance.current = null;
        }
        if (submissionChartInstance.current) {
          submissionChartInstance.current.destroy();
          submissionChartInstance.current = null;
        }

        if (!engagementChartRef.current || !submissionChartRef.current) {
          console.warn("Canvas elements not ready");
          return;
        }

        const getCssVar = (name) => {
          if (typeof document !== "undefined" && document.documentElement) {
            return getComputedStyle(document.documentElement).getPropertyValue(
              name
            );
          }
          return "";
        };

        // FIXED: Engagement Chart with proper hover configuration and height control
        const engagementCtx = engagementChartRef.current.getContext("2d");
        if (engagementCtx) {
          engagementChartInstance.current = new Chart(engagementCtx, {
            type: "bar",
            data: {
              labels: ["Math", "Science", "History", "English", "Chemistry"],
              datasets: [
                {
                  label: "Engagement (%)",
                  data: [85, 70, 78, 90, 82],
                  backgroundColor: [
                    getCssVar("--chart-green") || "#4CAF50",
                    getCssVar("--chart-blue") || "#2196F3",
                    getCssVar("--chart-yellow") || "#FFC107",
                    getCssVar("--chart-pink") || "#E91E63",
                    "#9C27B0",
                  ],
                  borderRadius: 6,
                  // FIXED: Add hover styling to prevent visual issues
                  hoverBackgroundColor: [
                    getCssVar("--chart-green-hover") || "#45a049",
                    getCssVar("--chart-blue-hover") || "#1976d2",
                    getCssVar("--chart-yellow-hover") || "#ffb300",
                    getCssVar("--chart-pink-hover") || "#d81b60",
                    "#8e24aa",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false, // CRITICAL: Allow custom height
              // FIXED: Configure interaction settings to prevent hover issues
              interaction: {
                mode: "nearest",
                intersect: false,
                axis: "x",
              },
              // FIXED: Configure hover settings
              hover: {
                mode: "nearest",
                intersect: false,
                animationDuration: 200, // Short animation to prevent flicker
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: true, // Keep tooltips enabled but configure properly
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  titleFont: { family: "'Poppins', sans-serif" },
                  bodyFont: { family: "'Poppins', sans-serif" },
                  // FIXED: Add position and interaction settings
                  position: "nearest",
                  intersect: false,
                  // FIXED: Add callbacks to handle tooltip rendering properly
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
                  // FIXED: Prevent scale animations that might interfere
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
              // FIXED: Configure animations to prevent hover issues
              animation: {
                duration: 1000,
                easing: "easeInOutQuart",
                // Prevent animation conflicts during hover
                onComplete: () => {
                  console.log("Chart animation completed");
                },
              },
            },
          });
        }

        // FIXED: Submission Chart with proper hover configuration and height control
        const submissionCtx = submissionChartRef.current.getContext("2d");
        if (submissionCtx) {
          submissionChartInstance.current = new Chart(submissionCtx, {
            type: "line",
            data: {
              labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
              datasets: [
                {
                  label: "Submission Rate (%)",
                  data: [78, 84, 89, 93, 91],
                  borderColor: getCssVar("--chart-green") || "#4CAF50",
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  tension: 0.3,
                  fill: true,
                  pointBackgroundColor: getCssVar("--chart-green") || "#4CAF50",
                  pointBorderColor: "#fff",
                  pointBorderWidth: 2,
                  pointRadius: 5,
                  // FIXED: Add hover styling for line chart
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor:
                    getCssVar("--chart-green") || "#4CAF50",
                  pointHoverRadius: 7,
                  pointHoverBorderWidth: 3,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false, // CRITICAL: Allow custom height
              // FIXED: Configure interaction settings
              interaction: {
                mode: "nearest",
                intersect: false,
                axis: "x",
              },
              // FIXED: Configure hover settings
              hover: {
                mode: "nearest",
                intersect: false,
                animationDuration: 200,
                // Prevent hover from causing issues
                onHover: (event, activeElements) => {
                  // Custom hover handler to prevent issues
                  if (activeElements && activeElements.length > 0) {
                    // Handle hover logic here if needed
                    console.log("Hovering over chart:", activeElements);
                  }
                },
              },
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: { family: "'Poppins', sans-serif" },
                  },
                },
                tooltip: {
                  enabled: true,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  titleFont: { family: "'Poppins', sans-serif" },
                  bodyFont: { family: "'Poppins', sans-serif" },
                  // FIXED: Configure tooltip to prevent issues
                  position: "nearest",
                  intersect: false,
                  // FIXED: Add callbacks for proper tooltip handling
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
              // FIXED: Configure animations to prevent hover issues
              animation: {
                duration: 1000,
                easing: "easeInOutQuart",
                onComplete: () => {
                  console.log("Line chart animation completed");
                },
              },
            },
          });
        }

        // Mark charts as ready
        setChartsReady(true);
      } catch (error) {
        console.error("Error creating charts:", error);
        setChartsReady(false);
      }
    };

    initializeCharts();

    // Cleanup function
    return () => {
      if (engagementChartInstance.current) {
        engagementChartInstance.current.destroy();
        engagementChartInstance.current = null;
      }
      if (submissionChartInstance.current) {
        submissionChartInstance.current.destroy();
        submissionChartInstance.current = null;
      }
      setChartsReady(false);
    };
  }, []);

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

  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button
        ref={mobileMenuToggleRef}
        className="mobile-menu-btn"
        id="mobileMenuToggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
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
            <li className={isActive("/") ? "active" : ""}>
              <Link to="/">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
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
                <Link to="/all-courses">All Courses</Link>
                <Link to="/myCourse">My Courses</Link>
              </div>
            </li>
            <li className="has-submenu">
              <a href="#" className="submenu-toggle" onClick={toggleSubmenu}>
                <i className="fas fa-user-graduate"></i>
                <span>Students</span>
                <i
                  className="fas fa-chevron-down"
                  style={{ marginLeft: "auto" }}
                ></i>
              </a>
              <div className="submenu">
                <Link to="/all-students">All Students</Link>
                <Link to="/student-details">Student Details</Link>
              </div>
            </li>
            <li className={isActive("/assignmment") ? "active" : ""}>
              <Link to="/assignmment">
                <i className="fas fa-tasks"></i>
                <span>Assignments</span>
              </Link>
            </li>
            <li className={isActive("/grades") ? "active" : ""}>
              <Link to="/grades">
                <i className="fas fa-graduation-cap"></i>
                <span>Grades</span>
              </Link>
            </li>
            <li className={isActive("/certificate") ? "active" : ""}>
              <Link to="/certificate">
                <i className="fas fa-certificate"></i>
                <span>Certificates</span>
              </Link>
            </li>
            <div className="menu-spacer"></div>
            <li className={isActive("/settings") ? "active" : ""}>
              <Link to="/settings">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div
              className="icon"
              id="desktopMenuToggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h2>
                Welcome, <span id="teacherName">Mr. Smith</span>
              </h2>
              <p className="d-none d-md-block">
                Teacher Dashboard - Overview & Analytics
              </p>
            </div>
          </div>
          <div className="user-area">
            <Link to="#" className="icon position-relative d-none d-sm-flex">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </Link>
            <Link to="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </Link>
            <Link to="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt"></i>
            </Link>
            <Link to="/teacher.profile">
              <img src="https://i.pravatar.cc/100?img=8 " alt="Teacher" />
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="cards">
          <div className="card">
            <h3>Courses Taught</h3>
            <p id="coursesTaught">{coursesTaught}</p>
          </div>
          <div className="card">
            <h3>Assignments Pending</h3>
            <p id="pendingAssignments">{pendingAssignments}</p>
          </div>
          <div className="card">
            <h3>Students Enrolled</h3>
            <p id="studentsEnrolled">{studentsEnrolled}</p>
          </div>
          <div className="card">
            <h3>Average Class Grade</h3>
            <p id="avgClassGrade">{avgClassGrade}%</p>
          </div>
        </section>

        <section className="charts">
          <div className="chart">
            <h4>Course Engagement</h4>
            <canvas ref={engagementChartRef} id="engagementChart"></canvas>
          </div>
          <div className="chart">
            <h4>Assignment Submission Rate</h4>
            <canvas ref={submissionChartRef} id="submissionChart"></canvas>
          </div>
        </section>

        <section className="assignments-section">
          <h3>Recent Assignments</h3>
          <div className="table-responsive">
            <table className="dashboard-table" id="assignmentTable">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Course</th>
                  <th>Due Date</th>
                  <th>Submissions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignmentData.map((assignment, index) => (
                  <tr key={index}>
                    <td data-label="Assignment">{assignment.name}</td>
                    <td data-label="Course">{assignment.course}</td>
                    <td data-label="Due Date">{assignment.due}</td>
                    <td data-label="Submissions">{assignment.subs}</td>
                    <td data-label="Status">
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

export default Dashboard;
