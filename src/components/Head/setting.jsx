import { useState, useEffect } from "react";
import "./styles.css";
export default function Settings() {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth <= 992);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [accName, setAccName] = useState("");
  const [accEmail, setAccEmail] = useState("");
  const [accPass, setAccPass] = useState("");
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");
  const [themeMode, setThemeMode] = useState("light");
  const [accentColor, setAccentColor] = useState("#3498db");
  const [accentText, setAccentText] = useState("Default Blue");
  const [compactSide, setCompactSide] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [forceReset, setForceReset] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [deptName, setDeptName] = useState("");
  const [deptEmail, setDeptEmail] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [autoTeacher, setAutoTeacher] = useState(false);
  const [autoStudent, setAutoStudent] = useState(false);
  const [autoCourse, setAutoCourse] = useState(false);
  const [autoMarks, setAutoMarks] = useState(false);

  useEffect(() => {
    setAccName(localStorage.getItem("accName") || "Department Head");
    setAccEmail(localStorage.getItem("accEmail") || "hod@computer.edu");
    setNotifPush(localStorage.getItem("notifPush") !== "false");
    setNotifEmail(localStorage.getItem("notifEmail") !== "false");
    setNotifSMS(localStorage.getItem("notifSMS") === "true");
    setQuietStart(localStorage.getItem("quietStart") || "22:00");
    setQuietEnd(localStorage.getItem("quietEnd") || "07:00");
    setThemeMode(localStorage.getItem("themeMode") || "light");
    setAccentColor(localStorage.getItem("accentColor") || "#3498db");
    setAccentText(localStorage.getItem("accentText") || "Default Blue");
    setCompactSide(localStorage.getItem("compactSide") === "true");
    setTwoFA(localStorage.getItem("twoFA") === "true");
    setForceReset(localStorage.getItem("forceReset") === "true");
    setSessionTimeout(localStorage.getItem("sessionTimeout") || "60");
    setLoginAlerts(localStorage.getItem("loginAlerts") !== "false");
    setDeptName(
      localStorage.getItem("deptName") || "Computer Science & Engineering"
    );
    setDeptEmail(localStorage.getItem("deptEmail") || "cse@university.edu");
    setHeaderColor(localStorage.getItem("headerColor") || "#2f4050");
    setAutoTeacher(localStorage.getItem("autoTeacher") === "true");
    setAutoStudent(localStorage.getItem("autoStudent") === "true");
    setAutoCourse(localStorage.getItem("autoCourse") === "true");
    setAutoMarks(localStorage.getItem("autoMarks") === "true");
  }, []);

  const saveAccount = () => {
    localStorage.setItem("accName", accName);
    localStorage.setItem("accEmail", accEmail);
    if (accPass) localStorage.setItem("accPass", accPass);
    alert("Account saved!");
  };
  const saveNotifications = () => {
    localStorage.setItem("notifPush", notifPush);
    localStorage.setItem("notifEmail", notifEmail);
    localStorage.setItem("notifSMS", notifSMS);
    localStorage.setItem("quietStart", quietStart);
    localStorage.setItem("quietEnd", quietEnd);
    alert("Notifications saved!");
  };
  const saveTheme = () => {
    localStorage.setItem("themeMode", themeMode);
    localStorage.setItem("accentColor", accentColor);
    localStorage.setItem("accentText", accentText);
    localStorage.setItem("compactSide", compactSide);
    applyTheme();
    alert("Theme saved!");
  };
  const saveSecurity = () => {
    localStorage.setItem("twoFA", twoFA);
    localStorage.setItem("forceReset", forceReset);
    localStorage.setItem("sessionTimeout", sessionTimeout);
    localStorage.setItem("loginAlerts", loginAlerts);
    alert("Security settings saved!");
  };
  const saveDeptProfile = () => {
    localStorage.setItem("deptName", deptName);
    localStorage.setItem("deptEmail", deptEmail);
    localStorage.setItem("headerColor", headerColor);
    alert("Department profile saved!");
  };
  const saveWorkflow = () => {
    localStorage.setItem("autoTeacher", autoTeacher);
    localStorage.setItem("autoStudent", autoStudent);
    localStorage.setItem("autoCourse", autoCourse);
    localStorage.setItem("autoMarks", autoMarks);
    alert("Workflow saved!");
  };

  const exportData = () => {
    const data = {
      teachers: JSON.parse(localStorage.getItem("teachers") || "[]"),
      students: JSON.parse(localStorage.getItem("students") || "[]"),
      courses: JSON.parse(localStorage.getItem("courses") || "[]"),
      announcements: JSON.parse(
        localStorage.getItem("hodAnnouncements") ||
          '{"teachers":[],"students":[]}'
      ),
      settings: Object.entries(localStorage).reduce((a, [k, v]) => {
        a[k] = v;
        return a;
      }, {}),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `department_backup_${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const purgeCache = () => {
    if (confirm("Clear all cached data (logo, theme, etc)?")) {
      caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
      alert("Cache purged");
    }
  };

  const resetSystem = () => {
    if (confirm("This will erase ALL stored data. Continue?")) {
      localStorage.clear();
      location.reload();
    }
  };

  const applyTheme = () => {
    if (themeMode === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    document.documentElement.style.setProperty("--accent", accentColor);
  };

  useEffect(() => {
    applyTheme();
  }, [themeMode, accentColor]);

  const navLinks = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", to: "/index" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", to: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", to: "/students" },
    { icon: "fas fa-book", label: "Courses", to: "/courses" },
    { icon: "fas fa-bullhorn", label: "Announcement", to: "/annoucement" },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report" },
    { icon: "fas fa-cog", label: "Settings", to: "/setting", active: true },
  ];

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
      --success: #16a34a;
      --warning: #facc15;
      --danger: #ef5350;
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
    
    /* Topbar - Mobile First (Matches Report Page) */
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
    
    /* Settings Grid - Mobile First */
    .settings-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin: 0;
      width: 100%;
    }
    
    .settings-card {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1rem;
      margin: 0 0 1rem 0;
      border: none;
      width: 100%;
    }
    
    .settings-card h3 {
      margin: 0 0 1rem 0;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .settings-card h3 i {
      color: var(--accent);
    }
    
    /* Form Elements - Mobile First */
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-light);
      font-size: 14px;
    }
    
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: white;
      font-size: 14px;
      box-sizing: border-box;
    }
    
    /* Toggle Switch - Mobile First */
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
    }
    
    .toggle-row label:first-child {
      font-weight: 500;
      color: var(--text);
      flex: 1;
      margin: 0;
      font-size: 14px;
    }
    
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
      flex-shrink: 0;
    }
    
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .toggle-switch .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    
    .toggle-switch .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    .toggle-switch input:checked + .slider {
      background: var(--accent);
    }
    
    .toggle-switch input:checked + .slider:before {
      transform: translateX(24px);
    }
    
    /* Color Picker - Mobile First */
    .color-picker {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .color-picker input[type="color"] {
      width: 48px;
      height: 48px;
      padding: 0;
      border: 2px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
    }
    
    .color-picker span {
      font-weight: 500;
      color: var(--text);
      background: rgba(26, 35, 126, 0.05);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 14px;
      min-width: 100px;
      text-align: center;
    }
    
    /* Quiet Hours - Mobile First */
    .quiet-hours {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .quiet-hours input[type="time"] {
      flex: 1;
      min-width: 120px;
      padding: 0.5rem;
    }
    
    /* Buttons - Mobile First */
    .btn-save {
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
      margin-top: 1rem;
      font-weight: 500;
    }
    
    /* System Zone - Mobile First */
    .system-zone {
      grid-column: 1 / -1;
      margin-top: 1rem;
      width: 100%;
    }
    
    .zone-container {
      background: var(--card-bg);
      border-radius: var(--radius);
      padding: 1rem;
      box-shadow: var(--shadow);
      border: 1px solid rgba(231, 76, 60, 0.1);
      width: 100%;
    }
    
    .zone-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    
    .zone-header h2 {
      color: var(--text);
      font-size: 18px;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .zone-header p {
      color: var(--text-light);
      font-size: 14px;
      line-height: 1.5;
      margin: 0 auto;
    }
    
    .zone-card {
      padding: 1rem;
      border-radius: var(--radius);
      margin-bottom: 1rem;
      width: 100%;
    }
    
    .safe-card {
      background: rgba(39, 174, 96, 0.05);
      border: 1px solid rgba(39, 174, 96, 0.2);
    }
    
    .danger-card {
      background: rgba(231, 76, 60, 0.05);
      border: 1px solid rgba(231, 76, 60, 0.2);
    }
    
    .card-info h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    
    .card-info p {
      color: var(--text-light);
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .action-btn {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: var(--radius);
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 1rem;
      width: 100%;
    }
    
    .backup-btn {
      background: var(--success);
      color: white;
    }
    
    .cache-btn {
      background: var(--warning);
      color: #000;
      margin-bottom: 0.5rem;
    }
    
    .reset-btn {
      background: var(--danger);
      color: white;
    }
    
    .danger-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
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
    
    /* File Upload - Mobile First */
    .file-upload {
      width: 100%;
      border: 1px dashed var(--border);
      padding: 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      background: #fafbfc;
      text-align: center;
      color: var(--text-light);
      font-weight: 500;
      font-size: 14px;
    }
    
    /* ========== TABLET STYLES (576px and up) ========== */
    @media (min-width: 576px) {
      .main-content {
        padding: 0.75rem;
      }
      
      .settings-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      
      .system-zone {
        grid-column: 1 / -1;
      }
      
      .zone-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      
      .card-info {
        flex: 1;
      }
      
      .action-btn {
        width: auto;
        min-width: 140px;
        margin-top: 0;
      }
      
      .danger-actions {
        flex-direction: row;
        gap: 0.75rem;
        width: auto;
      }
      
      .cache-btn {
        margin-bottom: 0;
        margin-right: 0;
      }
      
      .btn-save {
        width: auto;
        min-width: 140px;
      }
      
      .quiet-hours input[type="time"] {
        width: auto;
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
      
      .settings-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      
      .settings-card {
        padding: 1.5rem;
        margin: 0;
      }
      
      .settings-card h3 {
        font-size: 20px;
      }
      
      .zone-container {
        padding: 1.5rem;
      }
      
      .zone-header h2 {
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
      
      .settings-grid {
        max-width: 1200px;
        margin: 0 auto;
        grid-template-columns: repeat(3, 1fr);
      }
      
      .system-zone {
        max-width: 1200px;
        margin: 0 auto;
        margin-top: 1.5rem;
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
      
      .color-picker {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .color-picker span {
        width: 100%;
        text-align: center;
      }
      
      .quiet-hours {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .quiet-hours input[type="time"] {
        width: 100%;
        margin: 0.25rem 0;
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
  `;

  return (
    <>
      <style>{css}</style>

      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn"
        onClick={() => setCollapsed((c) => !c)}
      >
        <i className="fas fa-bars"></i>
      </button>

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
        {/* topbar - matches report page */}
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
                <span className="d-none d-sm-inline">Department Settings</span>
                <span className="d-inline d-sm-none">Settings</span>
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

        {/* settings grid */}
        <div className="settings-grid fade-in">
          {/* ---- ACCOUNT ---- */}
          <div className="settings-card">
            <h3>
              <i className="fas fa-user-circle"></i> Account
            </h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                id="accName"
                value={accName}
                onChange={(e) => setAccName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id="accEmail"
                value={accEmail}
                onChange={(e) => setAccEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                id="accPass"
                placeholder="Leave blank to keep current"
                value={accPass}
                onChange={(e) => setAccPass(e.target.value)}
              />
            </div>
            <button className="btn-save" onClick={saveAccount}>
              Save Account
            </button>
          </div>

          {/* ---- NOTIFICATIONS ---- */}
          <div className="settings-card">
            <h3>
              <i className="fas fa-bell"></i> Notifications
            </h3>
            <div className="toggle-row">
              <label>Push Notifications</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="notifPush"
                  checked={notifPush}
                  onChange={(e) => setNotifPush(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <label>Email Notifications</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="notifEmail"
                  checked={notifEmail}
                  onChange={(e) => setNotifEmail(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <label>SMS Alerts</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="notifSMS"
                  checked={notifSMS}
                  onChange={(e) => setNotifSMS(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group">
              <label>Quiet Hours</label>
              <div className="quiet-hours">
                <input
                  type="time"
                  id="quietStart"
                  value={quietStart}
                  onChange={(e) => setQuietStart(e.target.value)}
                />
                <span>to</span>
                <input
                  type="time"
                  id="quietEnd"
                  value={quietEnd}
                  onChange={(e) => setQuietEnd(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-save" onClick={saveNotifications}>
              Save Notifications
            </button>
          </div>

          {/* ---- THEME & APPEARANCE ---- */}
          <div className="settings-card">
            <h3>
              <i className="fas fa-palette"></i> Theme & Appearance
            </h3>
            <div className="form-group">
              <label>Theme Mode</label>
              <select
                className="form-control"
                id="themeMode"
                value={themeMode}
                onChange={(e) => setThemeMode(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="form-group">
              <label>Accent Colour</label>
              <div className="color-picker">
                <input
                  type="color"
                  id="accentColor"
                  value={accentColor}
                  onChange={(e) => {
                    setAccentColor(e.target.value);
                    setAccentText(e.target.value.toUpperCase());
                  }}
                />
                <span id="accentText">{accentText}</span>
              </div>
            </div>
            <div className="toggle-row">
              <label>Compact Sidebar</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="compactSide"
                  checked={compactSide}
                  onChange={(e) => setCompactSide(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <button className="btn-save" onClick={saveTheme}>
              Save Theme
            </button>
          </div>

          {/* ---- SECURITY ---- */}
          <div className="settings-card">
            <h3>
              <i className="fas fa-shield-alt"></i> Security
            </h3>
            <div className="toggle-row">
              <label>Two-Factor Authentication</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="twoFA"
                  checked={twoFA}
                  onChange={(e) => setTwoFA(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <label>Force password reset on first login</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="forceReset"
                  checked={forceReset}
                  onChange={(e) => setForceReset(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="form-group">
              <label>Session Timeout (minutes)</label>
              <input
                type="number"
                id="sessionTimeout"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
              />
            </div>
            <div className="toggle-row">
              <label>Login Alerts</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="loginAlerts"
                  checked={loginAlerts}
                  onChange={(e) => setLoginAlerts(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <button className="btn-save" onClick={saveSecurity}>
              Save Security
            </button>
          </div>

          {/* ---- DEPARTMENT PROFILE ---- */}
          <div className="settings-card">
            <h3>
              <i className="fas fa-building"></i> Department Profile
            </h3>
            <div className="form-group">
              <label>Department Name</label>
              <input
                type="text"
                id="deptName"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                id="deptEmail"
                value={deptEmail}
                onChange={(e) => setDeptEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Header Colour</label>
              <div className="color-picker">
                <input
                  type="color"
                  id="headerColor"
                  value={headerColor}
                  onChange={(e) => setHeaderColor(e.target.value)}
                />
                <span>Current header</span>
              </div>
            </div>
            <div className="form-group">
              <label>Department Logo</label>
              <div className="file-upload">
                <span>Click to upload logo</span>
                <input type="file" style={{ display: "none" }} />
              </div>
            </div>
            <button className="btn-save" onClick={saveDeptProfile}>
              Save Profile
            </button>
          </div>

          {/* ---- APPROVAL WORKFLOWS ---- */}
          <div className="settings-card">
            <h3>
              <i className="fas fa-tasks"></i> Approval Workflows
            </h3>
            <div className="toggle-row">
              <label>Auto-approve new teacher registrations</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="autoTeacher"
                  checked={autoTeacher}
                  onChange={(e) => setAutoTeacher(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <label>Auto-approve student submissions</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="autoStudent"
                  checked={autoStudent}
                  onChange={(e) => setAutoStudent(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <label>Auto-approve new course proposals</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="autoCourse"
                  checked={autoCourse}
                  onChange={(e) => setAutoCourse(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-row">
              <label>Auto-publish marks after deadline</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="autoMarks"
                  checked={autoMarks}
                  onChange={(e) => setAutoMarks(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <button className="btn-save" onClick={saveWorkflow}>
              Save Workflow
            </button>
          </div>
        </div>

        {/* ---- SYSTEM BACKUP & RECOVERY (Danger Zone) ---- */}
        <section className="system-zone fade-in">
          <div className="zone-container">
            <header className="zone-header">
              <h2>System Backup & Recovery</h2>
              <p>
                Manage your system data and perform maintenance or recovery
                actions. Destructive actions are clearly marked for safety.
              </p>
            </header>

            <div className="zone-card safe-card">
              <div className="card-info">
                <h3>Backup Data</h3>
                <p>
                  Download a full backup of all department data in JSON format.
                  Recommended before any system changes.
                </p>
              </div>
              <button className="action-btn backup-btn" onClick={exportData}>
                Export Backup
              </button>
            </div>

            <div className="zone-card danger-card">
              <div className="card-info">
                <h3>Danger Zone</h3>
                <p>
                  These actions are irreversible and may affect system
                  stability. Proceed with caution.
                </p>
              </div>
              <div className="danger-actions">
                <button className="action-btn cache-btn" onClick={purgeCache}>
                  Purge Cache
                </button>
                <button className="action-btn reset-btn" onClick={resetSystem}>
                  Reset System
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
