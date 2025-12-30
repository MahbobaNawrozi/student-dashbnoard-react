import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Certificates = () => {
  // FIXED: Renamed state variables to match sidebar class names
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // FIXED: Added sidebarOpen state (you were using 'open' but referencing 'sidebarOpen')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const yearlyChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const yearlyChartInstance = useRef(null);
  const categoryChartInstance = useRef(null);

  // FIXED: Added missing handleMenuClick function
  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  // FIXED: Simplified sidebar toggle handlers
  const toggleDesktopSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebar = document.getElementById("sidebar");
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");

        // Add null checks
        if (!sidebar || !mobileMenuToggle) return;

        if (
          !sidebar.contains(e.target) &&
          !mobileMenuToggle.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize charts
  useEffect(() => {
    // Import Chart.js dynamically to avoid SSR issues
    let Chart;
    import("chart.js/auto").then((module) => {
      Chart = module.default;

      // Check if refs exist
      if (!yearlyChartRef.current || !categoryChartRef.current) return;

      // Destroy existing charts
      if (yearlyChartInstance.current) {
        yearlyChartInstance.current.destroy();
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }

      // Yearly Chart
      const yearlyCtx = yearlyChartRef.current.getContext("2d");
      yearlyChartInstance.current = new Chart(yearlyCtx, {
        type: "bar",
        data: {
          labels: ["2020", "2021", "2022", "2023", "2024"],
          datasets: [
            {
              label: "Certificates Earned",
              data: [2, 3, 5, 7, 5],
              backgroundColor: "#1a237e",
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 45,
              },
            },
          },
        },
      });

      // Category Chart
      const categoryCtx = categoryChartRef.current.getContext("2d");
      categoryChartInstance.current = new Chart(categoryCtx, {
        type: "doughnut",
        data: {
          labels: ["Web Dev", "Data Science", "UI/UX", "Mobile", "Others"],
          datasets: [
            {
              data: [40, 25, 15, 10, 10],
              backgroundColor: [
                "#1a237e",
                "#42A5F5",
                "#4CAF50",
                "#FFB300",
                "#E53935",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                boxWidth: 12,
                font: {
                  size: window.innerWidth < 480 ? 10 : 12,
                },
              },
            },
          },
          cutout: "60%",
        },
      });

      // Handle responsive behavior on load
      if (window.innerWidth <= 992) {
        setSidebarCollapsed(false);
      }

      // Make charts responsive on window resize
      const handleChartResize = () => {
        setTimeout(() => {
          if (yearlyChartInstance.current) {
            yearlyChartInstance.current.resize();
          }
          if (categoryChartInstance.current) {
            categoryChartInstance.current.resize();
          }
        }, 250);
      };

      window.addEventListener("resize", handleChartResize);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleChartResize);
        if (yearlyChartInstance.current) {
          yearlyChartInstance.current.destroy();
        }
        if (categoryChartInstance.current) {
          categoryChartInstance.current.destroy();
        }
      };
    });

    return () => {
      // Cleanup on component unmount
      if (yearlyChartInstance.current) {
        yearlyChartInstance.current.destroy();
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }
    };
  }, []);

  // Certificate button handlers
  const handleViewCertificate = (certTitle) => {
    alert(
      `Opening certificate: ${certTitle}\n\nIn a real application, this would open a modal with the certificate details.`
    );
  };

  const handleDownloadCertificate = (certTitle) => {
    alert(
      `Downloading certificate: ${certTitle}\n\nThis would trigger a PDF download of the certificate.`
    );
  };

  const handleExportAll = () => {
    alert(
      "Exporting all certificates...\n\nThis would generate a ZIP file with all your certificates."
    );
  };

  const certificates = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "E-Learning Academy",
      icon: "fas fa-laptop-code",
      issued: "May 15, 2024",
      duration: "6 months",
      grade: "A+ (98%)",
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      issuer: "E-Learning Academy",
      icon: "fas fa-chart-line",
      issued: "March 22, 2024",
      duration: "4 months",
      grade: "A (92%)",
    },
    {
      id: 3,
      title: "UI/UX Design Mastery",
      issuer: "E-Learning Academy",
      icon: "fas fa-paint-brush",
      issued: "January 10, 2024",
      duration: "3 months",
      grade: "A+ (96%)",
    },
    {
      id: 4,
      title: "Mobile App Development",
      issuer: "E-Learning Academy",
      icon: "fas fa-mobile-alt",
      issued: "December 5, 2023",
      duration: "5 months",
      grade: "A (90%)",
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        id="mobileMenuToggle"
        onClick={toggleMobileSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      <aside
        id="sidebar"
        // FIXED: Changed to use correct state variables
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
            <li>
              <Link to="/Grades" onClick={handleMenuClick}>
                <i className="fas fa-graduation-cap" />
                <span>Grades</span>
              </Link>
            </li>
            <li className="active">
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
      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div
              className="icon d-none d-lg-flex"
              id="desktopMenuToggle"
              onClick={toggleDesktopSidebar}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h2>Certificates</h2>
              <p className="d-none d-md-block">
                View and manage your earned certificates
              </p>
            </div>
          </div>
          <div className="user-area">
            <Link to="#" className="icon position-relative">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </Link>
            <Link to="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </Link>
            <Link to="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt"></i>
            </Link>
            <Link to="#">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </Link>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Certificates</h3>
            <p>12</p>
            <div className="stat-trend">+2 this month</div>
          </div>
          <div className="stat-card">
            <h3>This Year</h3>
            <p>5</p>
            <div className="stat-trend">On track for 8+</div>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>3</p>
            <div className="stat-trend">85% average completion</div>
          </div>
          <div className="stat-card">
            <h3>Top Category</h3>
            <p style={{ fontSize: "22px" }}>Web Development</p>
            <div className="stat-trend">40% of all certificates</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h3>Certificates Earned by Year</h3>
            <div className="chart-container-wrapper">
              <canvas
                ref={yearlyChartRef}
                id="yearlyChart"
                className="chart-container"
              ></canvas>
            </div>
          </div>
          <div className="chart-card">
            <h3>Certificates by Category</h3>
            <div className="chart-container-wrapper">
              <canvas
                ref={categoryChartRef}
                id="categoryChart"
                className="chart-container"
              ></canvas>
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="certificates-section">
          <div className="section-header">
            <h2>Earned Certificates</h2>
            <button className="btn btn-secondary" onClick={handleExportAll}>
              <i className="fas fa-download"></i> Export All
            </button>
          </div>
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="certificate-card">
                <div className="certificate-header">
                  <div className="certificate-icon">
                    <i className={cert.icon}></i>
                  </div>
                  <h3 className="certificate-title">{cert.title}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                </div>
                <div className="certificate-body">
                  <div className="certificate-meta">
                    <div className="meta-item">
                      <i className="fas fa-calendar"></i>
                      <span>Issued: {cert.issued}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>Duration: {cert.duration}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-star"></i>
                      <span>Grade: {cert.grade}</span>
                    </div>
                  </div>
                  <div className="certificate-actions">
                    <button
                      className="btn btn-primary view-certificate"
                      onClick={() => handleViewCertificate(cert.title)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button
                      className="btn btn-secondary download-certificate"
                      onClick={() => handleDownloadCertificate(cert.title)}
                    >
                      <i className="fas fa-download"></i> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Certificates;
