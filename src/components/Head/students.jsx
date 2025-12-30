/* components/Head/students.jsx */
import { useState, useEffect } from "react";
import "./styles.css";

export default function Students() {
  /* ---------- sidebar ---------- */
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const shouldCollapse = window.innerWidth <= 992;
      setCollapsed(shouldCollapse);
      if (window.innerWidth > 992) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  /* ---------- data ---------- */
  const [students] = useState([
    {
      name: "Alice Johnson",
      roll: "CSE101",
      year: "1st Year",
      email: "alice@dept.com",
      category: "AI",
      status: "pending",
    },
    {
      name: "Bob Smith",
      roll: "CSE102",
      year: "2nd Year",
      email: "bob@dept.com",
      category: "Cybersecurity",
      status: "pending",
    },
    {
      name: "Charlie Brown",
      roll: "CSE103",
      year: "1st Year",
      email: "charlie@dept.com",
      category: "Software Engineering",
      status: "active",
    },
    {
      name: "Diana Prince",
      roll: "CSE104",
      year: "3rd Year",
      email: "diana@dept.com",
      category: "Data Science",
      status: "active",
    },
    {
      name: "Ethan Hunt",
      roll: "CSE105",
      year: "2nd Year",
      email: "ethan@dept.com",
      category: "Networking",
      status: "pending",
    },
    {
      name: "Fiona Gallagher",
      roll: "CSE106",
      year: "4th Year",
      email: "fiona@dept.com",
      category: "AI",
      status: "active",
    },
    {
      name: "George Miller",
      roll: "CSE107",
      year: "1st Year",
      email: "george@dept.com",
      category: "Cybersecurity",
      status: "active",
    },
    {
      name: "Hannah Wilson",
      roll: "CSE108",
      year: "3rd Year",
      email: "hannah@dept.com",
      category: "Software Engineering",
      status: "pending",
    },
  ]);

  const [filtered, setFiltered] = useState(students);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(new Set());

  /* ---------- derived stats ---------- */
  const total = students.length;
  const pending = students.filter((s) => s.status === "pending").length;
  const active = students.filter((s) => s.status === "active").length;
  const atRisk = Math.floor(pending / 2);
  const highAchiever = Math.floor(active / 2);

  /* ---------- actions ---------- */
  const toggleSelect = (index) => {
    const s = new Set(selected);
    if (s.has(index)) s.delete(index);
    else s.add(index);
    setSelected(s);
  };

  const approveStudent = (index) => {
    const updated = [...filtered];
    updated[index].status = "active";
    setFiltered(updated);
    toast(`${updated[index].name} approved!`);
  };

  const bulkApprove = () => {
    const updated = filtered.map((s, i) =>
      selected.has(i) ? { ...s, status: "active" } : s
    );
    setFiltered(updated);
    toast(`${selected.size} students approved!`);
    setSelected(new Set());
  };

  const bulkMessage = () => {
    if (selected.size === 0) return;
    const names = Array.from(selected).map((i) => filtered[i].name);
    const msg = prompt(
      `Send message to ${selected.size} student(s):\n\n${names.join(", ")}`
    );
    if (msg) {
      toast(`Message sent to ${selected.size} student(s)!`);
      setSelected(new Set());
    }
  };

  const exportCSV = () => {
    let csv = "Name,Roll,Year,Email,Category,Status\n";
    students.forEach(
      (s) =>
        (csv += `${s.name},${s.roll},${s.year},${s.email},${s.category},${s.status}\n`)
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast("CSV exported!");
  };

  const viewDetail = (index) => {
    const s = filtered[index];
    document.getElementById("detailName").textContent = s.name;
    document.getElementById("detailRoll").textContent = s.roll;
    document.getElementById("detailYear").textContent = s.year;
    document.getElementById("detailEmail").textContent = s.email;
    document.getElementById("detailCategory").textContent = s.category;
    document.getElementById("detailStatus").textContent = s.status;
    document.getElementById("detailsModal").style.display = "flex";
  };

  const closeModal = () =>
    (document.getElementById("detailsModal").style.display = "none");

  /* ---------- filters ---------- */
  useEffect(() => {
    let list = students;
    if (category !== "All") list = list.filter((s) => s.category === category);
    if (search)
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.roll.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase()) ||
          s.year.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(list);
  }, [search, category, students]);

  /* ---------- styles ---------- */
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
    
    /* Content Container - Mobile First */
    .content-container {
      width: 100%;
      padding: 0;
    }
    
    /* Quick Stats - Mobile First */
    .quick-stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .stat-card {
      background: white;
      border-radius: var(--radius);
      padding: 1rem;
      box-shadow: var(--shadow);
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .stat-card i {
      font-size: 20px;
      color: var(--accent);
    }
    
    .stat-number {
      font-size: 20px;
      font-weight: bold;
      color: var(--text);
    }
    
    .stat-label {
      font-size: 13px;
      color: #666;
    }
    
    /* Search Container - Mobile First */
    .search-container {
      width: 100%;
      margin: 0 0 1rem 0;
    }
    
    #searchInput {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: var(--radius);
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    
    /* Bulk Bar - Mobile First */
    .bulk-bar {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: var(--radius);
      margin: 0 0 1rem 0;
      display: none;
      flex-direction: column;
      gap: 0.5rem;
      border: 1px solid #e9ecef;
      width: 100%;
    }
    
    .bulk-bar.show {
      display: flex;
    }
    
    .bulk-bar button {
      padding: 0.75rem;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      width: 100%;
    }
    
    .bulk-approve {
      background: #28a745;
      color: white;
    }
    
    .bulk-msg {
      background: #ffc107;
      color: #212529;
    }
    
    .bulk-export {
      background: var(--accent);
      color: white;
    }
    
    /* Category Bar - Mobile First */
    .category-bar {
      display: flex;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }
    
    .category-bar::-webkit-scrollbar {
      height: 4px;
    }
    
    .category-bar button {
      padding: 0.5rem 1rem;
      border: 1px solid #dee2e6;
      background: white;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    
    .category-bar button.active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }
    
    /* Students Grid - Mobile First */
    .students-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .student-card {
      background: white;
      border-radius: var(--radius);
      padding: 1rem;
      box-shadow: var(--shadow);
      border: 1px solid transparent;
    }
    
    .student-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .student-checkbox {
      transform: scale(1.2);
    }
    
    .student-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--text);
      margin: 0 0 0.25rem 0;
    }
    
    .student-roll {
      font-size: 13px;
      color: var(--text-light);
      margin: 0 0 1rem 0;
    }
    
    .student-details {
      margin: 1rem 0;
    }
    
    .student-detail {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .student-detail i {
      color: var(--accent);
      width: 16px;
    }
    
    .student-category {
      display: inline-block;
      padding: 0.5rem 0.75rem;
      background: #e3f2fd;
      color: var(--accent);
      border-radius: 15px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .student-status {
      padding: 0.5rem 0.75rem;
      border-radius: 15px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status-active {
      background: #d4edda;
      color: #155724;
    }
    
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    
    .student-footer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
    
    .student-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .action-btn {
      padding: 0.5rem;
      border: none;
      border-radius: var(--radius);
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
    }
    
    .action-btn:not(.approve-btn) {
      background: var(--accent);
      color: white;
    }
    
    .approve-btn {
      background: #28a745;
      color: white;
    }
    
    /* No Results - Mobile First */
    .no-results {
      text-align: center;
      padding: 2rem 1rem;
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      margin: 1rem 0;
    }
    
    /* Modal - Mobile First */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 1050;
      padding: 1rem;
    }
    
    .modal-content {
      background: white;
      padding: 1.5rem;
      border-radius: var(--radius);
      width: 100%;
      max-width: 400px;
    }
    
    /* Toast - Mobile First */
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1060;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s;
    }
    
    .toast.show {
      opacity: 1;
      transform: translateY(0);
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
      
      .quick-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin: 0 0 1.25rem 0;
      }
      
      .bulk-bar {
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
      }
      
      .bulk-bar button {
        width: auto;
      }
      
      .students-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      
      .student-actions {
        flex-direction: row;
        gap: 0.5rem;
      }
      
      .action-btn {
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
      
      .quick-stats {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin: 0 0 1.5rem 0;
      }
      
      .stat-card {
        padding: 1.25rem;
      }
      
      .stat-number {
        font-size: 24px;
      }
      
      .stat-label {
        font-size: 14px;
      }
      
      .students-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      
      .student-card {
        padding: 1.25rem;
      }
      
      .student-name {
        font-size: 18px;
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
      
      .students-grid {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
    }
  `;

  /* ---------- nav ---------- */
  const navLinks = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", to: "/index" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", to: "/teachers" },
    {
      icon: "fas fa-user-graduate",
      label: "Students",
      to: "/students",
      active: true,
    },
    { icon: "fas fa-book", label: "Courses", to: "/courses" },
    { icon: "fas fa-bullhorn", label: "Announcement", to: "/annoucement" },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report" },
    { icon: "fas fa-cog", label: "Settings", to: "/setting" },
  ];

  /* ---------- toast helper ---------- */
  const toast = (msg) => {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 50);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => document.body.removeChild(t), 300);
    }, 3000);
  };

  return (
    <>
      <style>{css}</style>

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Overlay for mobile sidebar */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "open" : ""
        }`}
        id="sidebar"
      >
        <div className="sidebar-header">Computer Dept Head</div>
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.to} className={l.active ? "active" : ""}>
              <a
                href={l.to}
                onClick={() => window.innerWidth <= 992 && setMobileOpen(false)}
              >
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

      {/* Main content */}
      <main className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <div
                className="menu-toggle d-none d-lg-flex"
                onClick={toggleSidebar}
              >
                <i className="fas fa-bars"></i>
              </div>
              <h2 className="mb-0 ms-2 ms-sm-3">
                <span className="d-none d-sm-inline">Student Management</span>
                <span className="d-inline d-sm-none">Students</span>
              </h2>
            </div>
            <div className="user-area">
              <div className="notification-badge position-relative">
                <i className="fas fa-bell fs-5"></i>
                <span className="badge-counter">3</span>
              </div>
              <i className="fas fa-calendar-alt d-none d-md-inline-block fs-5"></i>
              <i className="fas fa-envelope d-none d-md-inline-block fs-5"></i>
              <a href="/profile.head" className="d-inline-block">
                <img
                  src="https://i.pravatar.cc/300?img=12"
                  alt="User Avatar"
                  className="avatar-img"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="content-container">
          {/* Stats */}
          <section className="quick-stats">
            <div className="stat-card">
              <i className="fas fa-user-graduate"></i>
              <div>
                <div className="stat-number">{total}</div>
                <div className="stat-label">Total Students</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-clock"></i>
              <div>
                <div className="stat-number">{pending}</div>
                <div className="stat-label">Pending Approval</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-check-circle"></i>
              <div>
                <div className="stat-number">{active}</div>
                <div className="stat-label">Active Students</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-exclamation-triangle"></i>
              <div>
                <div className="stat-number">{atRisk}</div>
                <div className="stat-label">At-Risk Students</div>
              </div>
            </div>
          </section>

          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Search students by name, roll number, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Bulk bar */}
          <div className={`bulk-bar ${selected.size > 0 ? "show" : ""}`}>
            <span id="bulkCount">
              {selected.size} student{selected.size !== 1 ? "s" : ""} selected
            </span>
            <button className="bulk-approve" onClick={bulkApprove}>
              Approve Selected
            </button>
            <button className="bulk-msg" onClick={bulkMessage}>
              Send Message
            </button>
            <button className="bulk-export" onClick={exportCSV}>
              Export CSV
            </button>
          </div>

          {/* Category bar */}
          <div className="category-bar">
            {[
              "All",
              "AI",
              "Cybersecurity",
              "Software Engineering",
              "Data Science",
              "Networking",
            ].map((cat) => (
              <button
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat === "All" ? "All Students" : cat}
              </button>
            ))}
          </div>

          {/* Students grid */}
          <div id="studentsGrid" className="students-grid">
            {filtered.map((s, i) => (
              <div
                key={i}
                className={`student-card ${selected.has(i) ? "selected" : ""}`}
                data-index={i}
              >
                <div className="student-header">
                  <h3 className="student-name">{s.name}</h3>
                  <input
                    type="checkbox"
                    className="student-checkbox"
                    checked={selected.has(i)}
                    onChange={() => toggleSelect(i)}
                  />
                </div>
                <p className="student-roll">{s.roll}</p>
                <div className="student-details">
                  <div className="student-detail">
                    <i className="fas fa-graduation-cap"></i>
                    <span>{s.year}</span>
                  </div>
                  <div className="student-detail">
                    <i className="fas fa-envelope"></i>
                    <span>{s.email}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="student-category">{s.category}</span>
                  <span
                    className={`student-status ${
                      s.status === "active" ? "status-active" : "status-pending"
                    }`}
                  >
                    {s.status.toUpperCase()}
                  </span>
                </div>
                <div className="student-footer">
                  <div className="student-actions">
                    <button
                      className="action-btn"
                      onClick={() => viewDetail(i)}
                    >
                      View Details
                    </button>
                    {s.status === "pending" && (
                      <button
                        className="action-btn approve-btn"
                        onClick={() => approveStudent(i)}
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div id="noResults" className="no-results">
              <i className="fas fa-search"></i>
              <h3>No students found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Extra stats */}
          <section className="quick-stats">
            <div
              className="stat-card"
              onClick={() =>
                toast("Showing at-risk students (pending approval)")
              }
            >
              <i className="fas fa-exclamation-triangle"></i>
              <div>
                <div className="stat-number">{atRisk}</div>
                <div className="stat-label">At-Risk Students</div>
              </div>
            </div>
            <div
              className="stat-card"
              onClick={() => toast("Showing high achieving students")}
            >
              <i className="fas fa-star"></i>
              <div>
                <div className="stat-number">{highAchiever}</div>
                <div className="stat-label">High Achievers</div>
              </div>
            </div>
            <div
              className="stat-card"
              onClick={() => toast("Showing students pending approval")}
            >
              <i className="fas fa-clock"></i>
              <div>
                <div className="stat-number">{pending}</div>
                <div className="stat-label">Pending Approval</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-user-graduate"></i>
              <div>
                <div className="stat-number">{total}</div>
                <div className="stat-label">Total Students</div>
              </div>
            </div>
          </section>
        </div>

        {/* Modal */}
        <div className="modal" id="detailsModal">
          <div className="modal-content">
            <h3 className="mb-4">Student Details</h3>
            <div className="student-details">
              <p>
                <strong>Name:</strong> <span id="detailName"></span>
              </p>
              <p>
                <strong>Roll Number:</strong> <span id="detailRoll"></span>
              </p>
              <p>
                <strong>Year:</strong> <span id="detailYear"></span>
              </p>
              <p>
                <strong>Email:</strong> <span id="detailEmail"></span>
              </p>
              <p>
                <strong>Category:</strong> <span id="detailCategory"></span>
              </p>
              <p>
                <strong>Status:</strong> <span id="detailStatus"></span>
              </p>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
