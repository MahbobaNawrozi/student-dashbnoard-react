/* components/Head/report.jsx */
import { useState, useEffect, useRef } from "react";
import "./styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Report() {
  /* ---------- sidebar ---------- */
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth <= 992);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- nav ---------- */
  const navLinks = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", to: "/index" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", to: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", to: "/students" },
    { icon: "fas fa-book", label: "Courses", to: "/courses" },
    { icon: "fas fa-bullhorn", label: "Announcement", to: "/annoucement" },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report", active: true },
    { icon: "fas fa-cog", label: "Settings", to: "/setting" },
  ];

  /* ---------- charts ---------- */
  const [semester, setSemester] = useState("spring");
  const resultChartRef = useRef(null);
  const attChartRef = useRef(null);

  const resultData = {
    spring: [92, 85, 88, 90, 83],
    fall: [88, 80, 91, 85, 79],
  };

  const resultLabels = [
    "AI",
    "Cyber Sec",
    "Soft. Eng",
    "Data Sci",
    "Networking",
  ];
  const resultColors = ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc", "#ef5350"];

  const resultConfig = {
    labels: resultLabels,
    datasets: [
      {
        label: "Pass %",
        data: resultData[semester],
        backgroundColor: resultColors,
        borderRadius: 10,
      },
    ],
  };

  const resultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  const attData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance %",
        data: [89, 85, 87, 88],
        fill: true,
        backgroundColor: "rgba(66,165,245,0.15)",
        borderColor: "#42a5f5",
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const attOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: false, min: 70, max: 100 } },
  };

  /* ---------- recent reports ---------- */
  const recentReports = [
    {
      name: "Semester Results Spring",
      date: "2025-06-15",
      status: "completed",
    },
    {
      name: "Attendance Summary June",
      date: "2025-06-20",
      status: "completed",
    },
    { name: "Pending Items Report", date: "2025-06-22", status: "pending" },
  ];

  const pendingItems = [
    "12 course approvals awaiting action",
    "5 student registrations pending",
    "2 teacher leave requests",
  ];

  /* ---------- actions ---------- */
  const viewReport = (name) => alert(`Viewing: ${name}`);
  const downloadReport = (name) => alert(`Downloading: ${name}`);

  const downloadPDF = () => window.print();

  const css = `
    :root {
      --sidebar-bg: #1a237e;
      --sidebar-head: #1a237e;
      --accent: #1a237e;
      --text: #333;
      --text-light: #555;
      --border: #eee;
      --card-bg: #fff;
      --shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
      --radius: 8px;
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      background: #f5f6fa;
      color: var(--text);
      overflow-x: hidden;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      width: 100%;
    }
    
    /* ========== MOBILE FIRST STYLES ========== */
    /* Main Content - Mobile First */
    .main-content {
      width: 100%;
      min-height: 100vh;
      transition: all 0.3s;
      padding: 0.5rem;
    }
    
    /* Topbar - Mobile First */
    .topbar {
      background: #fff;
      box-shadow: var(--shadow);
      border-radius: var(--radius);
      padding: 0.75rem;
      margin: 0 0 1rem 0;
      position: sticky;
      top: 0.5rem;
      z-index: 1020;
      width: 100%;
    }
    
    .menu-toggle {
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text);
      padding: 0.5rem;
      border-radius: 8px;
    }
    
    .user-area {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .notification-badge {
      position: relative;
      cursor: pointer;
    }
    
    .badge-counter {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #e74c3c;
      color: white;
      font-size: 0.6rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .avatar-img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f8f9fa;
    }
    
    /* Overview Cards - Mobile First */
    .overview-cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .overview-card {
      background: white;
      padding: 1rem;
      border-radius: var(--radius);
      text-align: center;
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
      width: 100%;
    }
    
    .overview-card h4 {
      margin: 0;
      font-size: 13px;
      color: #555;
    }
    
    .overview-card p {
      font-size: 20px;
      font-weight: bold;
      margin: 5px 0 0 0;
      color: var(--accent);
    }
    
    /* Report Card - Mobile First */
    .report-card,
    .modern-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1rem;
      margin: 0 0 1rem 0;
      border: none;
      width: 100%;
    }
    
    .report-card h3 {
      margin: 0 0 1rem 0;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .report-card h3 i {
      color: var(--accent);
    }
    
    /* Chart Filter - Mobile First */
    .chart-filter {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .chart-filter label {
      font-weight: 500;
      color: var(--text-light);
    }
    
    .chart-filter select {
      padding: 0.5rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: white;
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    
    /* Chart Container - Mobile First */
    .chart-box {
      height: 250px;
      position: relative;
      margin-bottom: 1rem;
      width: 100%;
    }
    
    /* Export Buttons - Mobile First */
    .export-buttons {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
    
    .export-buttons button {
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 0.75rem;
      border-radius: var(--radius);
      font-size: 14px;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    /* Stats Text - Mobile First */
    .stats-text {
      font-size: 13px;
      color: #6b7280;
      margin-top: 1rem;
    }
    
    .stats-text span {
      display: block;
      margin-bottom: 0.5rem;
    }
    
    /* Modern Card - Mobile First */
    .modern-card h3 {
      font-size: 18px;
      font-weight: 600;
      color: #1a237e;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    /* Table - Mobile First */
    .table-responsive {
      overflow-x: auto;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }
    
    table {
      width: 100%;
      min-width: 500px;
      border-collapse: collapse;
    }
    
    thead {
      background: #f1f4ff;
    }
    
    th,
    td {
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: middle;
      font-size: 14px;
    }
    
    th {
      font-weight: 600;
      color: #333;
      white-space: nowrap;
    }
    
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }
    
    .completed {
      background: #16a34a;
      color: #fff;
    }
    
    .pending {
      background: #facc15;
      color: #000;
    }
    
    .action-btn {
      background: #1a237e;
      color: #fff;
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      margin-bottom: 0.5rem;
      width: 100%;
    }
    
    /* Pending List - Mobile First */
    .pending-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .pending-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
      font-weight: 500;
      font-size: 14px;
    }
    
    .pending-list li:last-child {
      border-bottom: none;
    }
    
    .dot {
      width: 8px;
      height: 8px;
      background: #1a237e;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 0.375rem;
    }
    
    /* Sidebar - Mobile First (hidden by default) */
    .sidebar {
      width: 280px;
      background: var(--sidebar-bg);
      color: #fff;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1030;
      transition: transform 0.3s;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .sidebar-header {
      padding: 1.5rem;
      background: var(--sidebar-head);
      text-align: center;
      font-size: 1.25rem;
      font-weight: 600;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-links {
      list-style: none;
      padding: 1rem 0;
      margin: 0;
      flex-grow: 1;
    }
    
    .nav-links li {
      margin: 0.25rem 0.75rem;
    }
    
    .nav-links li a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      transition: all 0.3s;
      border-radius: 8px;
      font-weight: 500;
    }
    
    .nav-links li.active a,
    .nav-links li a:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }
    
    .bottom-link {
      padding: 1rem;
      margin: 0;
      list-style: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .bottom-link li a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      transition: all 0.3s;
      border-radius: 8px;
      font-weight: 500;
    }
    
    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: flex;
      position: fixed;
      top: 0.75rem;
      left: 0.75rem;
      z-index: 1040;
      background: var(--accent);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: var(--radius);
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    /* Sidebar Overlay */
    .sidebar-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1029;
      backdrop-filter: blur(3px);
    }
    
    .sidebar-overlay.open {
      display: block;
    }
    
    /* ========== TABLET STYLES (576px and up) ========== */
    @media (min-width: 576px) {
      .main-content {
        padding: 0.75rem;
      }
      
      .overview-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
      }
      
      .chart-filter {
        flex-direction: row;
        align-items: center;
      }
      
      .chart-filter select {
        width: auto;
        min-width: 150px;
      }
      
      .export-buttons {
        flex-direction: row;
        gap: 0.75rem;
      }
      
      .export-buttons button {
        width: auto;
        flex: 1;
      }
      
      .stats-text span {
        display: inline-block;
        margin-right: 1rem;
        margin-bottom: 0;
      }
      
      .action-btn {
        width: auto;
        margin-right: 0.5rem;
        margin-bottom: 0;
      }
    }
    
    /* ========== DESKTOP STYLES (992px and up) ========== */
    @media (min-width: 992px) {
      .mobile-menu-btn {
        display: none;
      }
      
      .sidebar {
        transform: translateX(0);
        width: 250px;
      }
      
      .sidebar.collapsed {
        width: 70px;
      }
      
      .sidebar.collapsed .sidebar-header span {
        display: none;
      }
      
      .sidebar.collapsed .nav-links li a span {
        display: none;
      }
      
      .sidebar.collapsed .nav-links li a {
        justify-content: center;
        padding: 0.875rem;
      }
      
      .sidebar-overlay {
        display: none !important;
      }
      
      .main-content {
        margin-left: 250px;
        width: calc(100vw - 250px);
        padding: 1rem 1.5rem;
      }
      
      .sidebar.collapsed ~ .main-content {
        margin-left: 70px;
        width: calc(100vw - 70px);
      }
      
      .topbar {
        padding: 1rem 1.5rem;
        margin: 0 0 1.5rem 0;
      }
      
      .overview-cards {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin: 0 0 1.5rem 0;
      }
      
      .overview-card {
        padding: 1.25rem;
      }
      
      .overview-card h4 {
        font-size: 14px;
      }
      
      .overview-card p {
        font-size: 22px;
      }
      
      .report-card,
      .modern-card {
        padding: 1.5rem;
        margin: 0 0 1.5rem 0;
      }
      
      .report-card h3 {
        font-size: 20px;
      }
      
      .chart-box {
        height: 320px;
      }
      
      .modern-card h3 {
        font-size: 22px;
      }
      
      .avatar-img {
        width: 40px;
        height: 40px;
        border: 3px solid #f8f9fa;
      }
    }
    
    /* ========== LARGE DESKTOP (1200px and up) ========== */
    @media (min-width: 1200px) {
      .main-content {
        padding: 1rem 2rem;
      }
      
      .overview-cards {
        max-width: 1200px;
        margin: 0 auto 1.5rem auto;
      }
    }
    
    /* ========== EXTRA SMALL MOBILE (≤400px) ========== */
    @media (max-width: 400px) {
      .main-content {
        padding: 0.25rem;
      }
      
      .topbar {
        padding: 0.5rem;
        margin: 0 0 0.75rem 0;
      }
      
      .mobile-menu-btn {
        top: 0.5rem;
        left: 0.5rem;
        width: 36px;
        height: 36px;
      }
      
      .user-area i.fa-calendar-alt,
      .user-area i.fa-envelope {
        display: none !important;
      }
      
      .chart-box {
        height: 200px;
      }
    }
    
    /* Animation */
    .fade-in {
      animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Print Styles */
    @media print {
      .no-print {
        display: none !important;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>

      {/* mobile hamburger */}
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn"
        onClick={() => setCollapsed((c) => !c)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
        <div className="sidebar-header">Computer Dept Head</div>
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.to} className={l.active ? "active" : ""}>
              <a href={l.to}>
                <i className={l.icon}></i> <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="bottom-link">
          <li>
            <a href="#">
              <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* main content */}
      <main className="main-content">
        {/* topbar */}
        <div className="topbar">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="menu-toggle"
                onClick={() => setCollapsed((c) => !c)}
              >
                <i className="fas fa-bars"></i>
              </div>
              <h2 className="mb-0 ms-2 ms-sm-3">
                <span className="d-none d-sm-inline">Department Reports</span>
                <span className="d-inline d-sm-none">Reports</span>
              </h2>
            </div>
            <div className="user-area">
              <div className="position-relative d-inline-block me-2">
                <i className="fas fa-bell"></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem", padding: "2px 4px" }}
                >
                  3
                </span>
              </div>
              <i className="fas fa-calendar-alt d-none d-md-inline-block me-2"></i>
              <i className="fas fa-envelope d-none d-md-inline-block me-2"></i>
              <a href="/profile.head" className="d-inline-block">
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="User Avatar"
                  style={{ width: 32, height: 32 }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* overview cards */}
        <div className="overview-cards fade-in">
          <div className="overview-card">
            <h4>Total Students</h4>
            <p>320</p>
          </div>
          <div className="overview-card">
            <h4>Total Teachers</h4>
            <p>28</p>
          </div>
          <div className="overview-card">
            <h4>Total Courses</h4>
            <p>15</p>
          </div>
          <div className="overview-card">
            <h4>Pending Approvals</h4>
            <p>19</p>
          </div>
        </div>

        {/* semester results chart */}
        <div className="report-card fade-in">
          <h3>
            <i className="fas fa-graduation-cap"></i> Semester Results
          </h3>
          <div className="chart-filter">
            <label>Semester:</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="spring">Spring 2025</option>
              <option value="fall">Fall 2025</option>
            </select>
          </div>
          <div className="chart-box" style={{ height: 320 }}>
            <Bar data={resultConfig} options={resultOptions} />
          </div>
          <div className="export-buttons">
            <button onClick={downloadPDF}>
              <i className="fas fa-file-pdf"></i> PDF
            </button>
          </div>
        </div>

        {/* attendance trend chart */}
        <div className="report-card fade-in">
          <h3>
            <i className="fas fa-calendar-check"></i> Attendance Trend
          </h3>
          <div className="chart-box" style={{ height: 320 }}>
            <Line data={attData} options={attOptions} />
          </div>
          <div className="stats-text">
            <span>Week avg: 87%</span>
            <span>Low: Data Structures 74%</span>
            <span>High: Web Dev 96%</span>
          </div>
          <div className="export-buttons">
            <button onClick={() => window.print()}>
              <i className="fas fa-print"></i> Print
            </button>
          </div>
        </div>

        {/* recent reports table */}
        <div className="modern-card fade-in">
          <h3>
            <i className="fas fa-file-alt"></i> Recent Reports
          </h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.date}</td>
                    <td>
                      <span className={`status ${r.status}`}>{r.status}</span>
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => viewReport(r.name)}
                      >
                        View
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => downloadReport(r.name)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* pending items */}
        <div className="modern-card fade-in">
          <h3>
            <i className="fas fa-clock"></i> Pending Items
          </h3>
          <ul className="pending-list">
            {pendingItems.map((item, i) => (
              <li key={i}>
                <span className="dot"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
