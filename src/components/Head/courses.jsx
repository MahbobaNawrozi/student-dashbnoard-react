import { useState, useEffect } from "react";
import "./styles.css";

const STORAGE_KEY = "hodCourses";
const ACTIVITY_KEY = "activityLog";

const gradients = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #06beb6, #48b1bf)",
  "linear-gradient(135deg, #f7971e, #ffd200)",
  "linear-gradient(135deg, #ee0979, #ff6a00)",
  "linear-gradient(135deg, #11998e, #38ef7d)",
  "linear-gradient(135deg, #8360c3, #2ebf91)",
];

export default function Courses() {
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

  const [courses, setCourses] = useState(
    () =>
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        { title: "Algebra II", subject: "Math", students: 34, approved: true },
        {
          title: "Physics Fundamentals",
          subject: "Science",
          students: 28,
          approved: true,
        },
        {
          title: "Organic Chemistry",
          subject: "Chemistry",
          students: 22,
          approved: false,
        },
        {
          title: "English Literature",
          subject: "Arts",
          students: 30,
          approved: true,
        },
        {
          title: "Modern History",
          subject: "History",
          students: 18,
          approved: false,
        },
      ]
  );

  useEffect(
    () => localStorage.setItem(STORAGE_KEY, JSON.stringify(courses)),
    [courses]
  );

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    students: "",
    approved: "true",
  });

  const [search, setSearch] = useState("");
  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: courses.length,
    pending: courses.filter((c) => !c.approved).length,
    students: courses.reduce((s, c) => s + c.students, 0),
    teachers: 12,
  };

  const [activity, setActivity] = useState(
    () =>
      JSON.parse(localStorage.getItem(ACTIVITY_KEY)) || [
        {
          text: "Student Ali enrolled in Web Development.",
          time: "2 hours ago",
        },
        {
          text: "New course Graphic Design Basics created.",
          time: "5 hours ago",
        },
        { text: "Teacher Abdul updated Lesson 4.", time: "Yesterday" },
        { text: "Admin removed an inactive user.", time: "2 days ago" },
      ]
  );

  const logActivity = (text) => {
    const newLog = { text, time: new Date().toLocaleString() };
    setActivity((a) => [newLog, ...a].slice(0, 15));
    localStorage.setItem(
      ACTIVITY_KEY,
      JSON.stringify([newLog, ...activity].slice(0, 15))
    );
  };

  const openAdd = () => {
    setEditingIndex(null);
    setForm({ title: "", subject: "", students: "", approved: "true" });
    setShowModal(true);
  };

  const openEdit = (i) => {
    setEditingIndex(i);
    setForm({
      title: courses[i].title,
      subject: courses[i].subject,
      students: courses[i].students,
      approved: courses[i].approved ? "true" : "false",
    });
    setShowModal(true);
  };

  const saveCourse = () => {
    const newCourse = {
      title: form.title,
      subject: form.subject,
      students: parseInt(form.students) || 0,
      approved: form.approved === "true",
    };
    if (editingIndex !== null) {
      const updated = [...courses];
      updated[editingIndex] = newCourse;
      setCourses(updated);
      logActivity(`Edited course: "${newCourse.title}"`);
    } else {
      setCourses([...courses, newCourse]);
      logActivity(`Added new course: "${newCourse.title}"`);
    }
    setShowModal(false);
  };

  const approveCourse = (i) => {
    const updated = [...courses];
    updated[i].approved = true;
    setCourses(updated);
    logActivity(`Approved course: "${updated[i].title}"`);
  };

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
      margin-left: 0; /* Fixed: Explicitly set to 0 for mobile */
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
    
    .topbar-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .mobile-menu-toggle {
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text);
      padding: 0.5rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .desktop-menu-toggle {
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text);
      padding: 0.5rem;
      border-radius: 8px;
      display: none;
      align-items: center;
      justify-content: center;
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
    
    /* Search Add Bar - Mobile First */
    .search-add-bar {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .search-bar {
      display: flex;
      align-items: center;
      background: white;
      border-radius: var(--radius);
      padding: 0.75rem;
      border: 1px solid var(--border);
      width: 100%;
    }
    
    .search-bar i {
      color: var(--text-light);
      margin-right: 10px;
    }
    
    .search-bar input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      padding: 0;
    }
    
    #addCourseBtn {
      background: var(--accent);
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      width: 100%;
    }
    
    /* Stats - Mobile First */
    .stats-soft {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .stat-soft {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: var(--radius);
      padding: 1rem;
      text-align: center;
      box-shadow: var(--shadow);
    }
    
    .stat-number {
      display: block;
      font-size: 24px;
      font-weight: 600;
      color: #111827;
    }
    
    .stat-label {
      margin-top: 6px;
      font-size: 13px;
      color: #6b7280;
    }
    
    /* Filters - Mobile First */
    .filters-section {
      background: #fff;
      padding: 1rem;
      border-radius: var(--radius);
      margin: 0 0 1rem 0;
      box-shadow: var(--shadow);
      width: 100%;
    }
    
    .filters-section h3 {
      margin: 0 0 1rem 0;
      font-size: 18px;
    }
    
    .filters-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .filter-input {
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 14px;
      background: #fafafa;
      width: 100%;
      box-sizing: border-box;
    }
    
    /* Courses Grid - Mobile First */
    .courses-section {
      width: 100%;
      padding: 0;
    }
    
    .courses-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .course-card {
      background: #ffffff;
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      position: relative;
      width: 100%;
    }
    
    .pending-banner {
      position: absolute;
      top: 12px;
      left: 12px;
      background: #fff4cc;
      color: #9a6b00;
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 2;
    }
    
    .course-img {
      height: 120px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    
    .course-img::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.55));
    }
    
    .course-body {
      padding: 1rem;
    }
    
    .course-body h3 {
      font-size: 16px;
      margin-bottom: 6px;
      color: #1f2937;
    }
    
    .course-body p {
      font-size: 14px;
      color: #6b7280;
    }
    
    .course-footer {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
    }
    
    .students-count {
      font-size: 14px;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .edit-btn,
    .approve-btn {
      border: none;
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      font-size: 14px;
      cursor: pointer;
    }
    
    .edit-btn {
      background: #1e3a8a;
      color: #ffffff;
    }
    
    .approve-btn {
      background: #16a34a;
      color: #ffffff;
    }
    
    /* Activity - Mobile First */
    .activity-section {
      background: #fff;
      padding: 1rem;
      border-radius: var(--radius);
      margin: 0 0 1rem 0;
      box-shadow: var(--shadow);
      width: 100%;
    }
    
    .activity-section h3 {
      margin: 0 0 1rem 0;
      font-size: 18px;
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }
    
    .activity-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      background: var(--accent);
      border-radius: 50%;
      margin-top: 5px;
      flex-shrink: 0;
    }
    
    .activity-item p {
      flex: 1;
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }
    
    .time {
      font-size: 13px;
      color: var(--text-light);
      white-space: nowrap;
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
      background: #fff;
      padding: 1.5rem;
      border-radius: var(--radius);
      width: 100%;
      max-width: 400px;
    }
    
    .modal-content h3 {
      margin-bottom: 1rem;
      color: var(--accent);
    }
    
    .modal-content input,
    .modal-content select {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      font-size: 14px;
      box-sizing: border-box;
    }
    
    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .modal-buttons button {
      padding: 0.75rem 1rem;
      border-radius: var(--radius);
      border: none;
      cursor: pointer;
      font-weight: 500;
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
      
      .search-add-bar {
        flex-direction: row;
        align-items: center;
      }
      
      #addCourseBtn {
        width: auto;
        min-width: 120px;
      }
      
      .stats-soft {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
      }
      
      .filters-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
      }
      
      .courses-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      
      .activity-item {
        flex-direction: row;
        align-items: center;
      }
    }
    
    /* ========== DESKTOP STYLES (992px and up) ========== */
    @media (min-width: 992px) {
      .mobile-menu-toggle {
        display: none !important;
      }
      
      .desktop-menu-toggle {
        display: flex !important;
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
      
      .stats-soft {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin: 0 0 1.5rem 0;
      }
      
      .stat-soft {
        padding: 1.5rem;
      }
      
      .stat-number {
        font-size: 28px;
      }
      
      .stat-label {
        font-size: 14px;
      }
      
      .filters-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
      }
      
      .courses-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      
      .course-img {
        height: 140px;
      }
      
      .avatar-img {
        width: 40px;
        height: 40px;
        border: 3px solid #f8f9fa;
      }
      
      .search-bar {
        padding: 0.75rem 1rem;
      }
      
      .search-bar input {
        min-width: 200px;
      }
    }
    
    /* ========== LARGE DESKTOP (1200px and up) ========== */
    @media (min-width: 1200px) {
      .main-content {
        padding: 1rem 2rem;
      }
      
      .courses-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
      
      .user-area i.fa-calendar-alt,
      .user-area i.fa-envelope {
        display: none !important;
      }
      
      .activity-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .time {
        align-self: flex-end;
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

  /* ---------- nav ---------- */
  const navLinks = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", to: "/index" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", to: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", to: "/students" },
    { icon: "fas fa-book", label: "Courses", to: "/courses", active: true },
    { icon: "fas fa-bullhorn", label: "Announcement", to: "/annoucement" },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report" },
    { icon: "fas fa-cog", label: "Settings", to: "/setting" },
  ];

  return (
    <>
      <style>{css}</style>

      <div
        className={`sidebar-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

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

      <main className="main-content">
        <div className="topbar">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="topbar-header">
              <div
                className="mobile-menu-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <i className="fas fa-bars"></i>
              </div>

              <div
                className="desktop-menu-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <i className="fas fa-bars"></i>
              </div>

              <h2 className="mb-0">
                <span className="d-none d-sm-inline">Department Dashboard</span>
                <span className="d-inline d-sm-none">Dashboard</span>
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
                  alt="avatar"
                  className="avatar-img"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="search-add-bar fade-in">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button id="addCourseBtn" onClick={openAdd}>
            Add Course
          </button>
        </div>

        <section className="stats-soft fade-in">
          <div className="stat-soft">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Courses</span>
          </div>
          <div className="stat-soft">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending Approvals</span>
          </div>
          <div className="stat-soft">
            <span className="stat-number">{stats.students}</span>
            <span className="stat-label">Total Students</span>
          </div>
          <div className="stat-soft">
            <span className="stat-number">{stats.teachers}</span>
            <span className="stat-label">Total Teachers</span>
          </div>
        </section>

        <section className="filters-section fade-in">
          <h3>Filter Courses</h3>
          <div className="filters-grid">
            <input
              className="filter-input"
              placeholder="Search by course name..."
            />
            <select className="filter-input">
              <option value="">Duration</option>
              <option>1–2 months</option>
              <option>3–6 months</option>
              <option>6+ months</option>
            </select>
            <select className="filter-input">
              <option value="">Subject</option>
              <option>English Language</option>
              <option>Graphic Design</option>
              <option>Web Development</option>
              <option>Programming</option>
              <option>Business</option>
            </select>
            <select className="filter-input">
              <option value="">Category</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select className="filter-input">
              <option value="">Level</option>
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Professional</option>
            </select>
            <select className="filter-input">
              <option value="">Teacher</option>
              <option>Abdul</option>
              <option>Fatima</option>
              <option>Javed</option>
              <option>Sana</option>
            </select>
            <select className="filter-input">
              <option value="">Status</option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Draft</option>
            </select>
          </div>
        </section>

        <section className="courses-section fade-in">
          <div className="courses-grid">
            {filtered.map((c, i) => (
              <div className="course-card" key={i}>
                {!c.approved && (
                  <div className="pending-banner">
                    <i className="fas fa-clock"></i> Pending Approval
                  </div>
                )}
                <div
                  className="course-img"
                  style={{ background: gradients[i % gradients.length] }}
                />
                <div className="course-body">
                  <h3>{c.title}</h3>
                  <p>Subject: {c.subject}</p>
                </div>
                <div className="course-footer">
                  <span className="students-count">
                    <i className="fas fa-user-graduate"></i> {c.students}{" "}
                    students
                  </span>
                  {c.approved ? (
                    <button className="edit-btn" onClick={() => openEdit(i)}>
                      Edit
                    </button>
                  ) : (
                    <button
                      className="approve-btn"
                      onClick={() => approveCourse(i)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="activity-section fade-in">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activity.map((a, i) => (
              <div className="activity-item" key={i}>
                <span className="dot"></span>
                <p dangerouslySetInnerHTML={{ __html: a.text }} />
                <span className="time">{a.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h3>{editingIndex === null ? "Add Course" : "Edit Course"}</h3>
            <input
              placeholder="Course Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <input
              type="number"
              placeholder="Number of Students"
              value={form.students}
              onChange={(e) => setForm({ ...form, students: e.target.value })}
            />
            <select
              value={form.approved}
              onChange={(e) => setForm({ ...form, approved: e.target.value })}
            >
              <option value="true">Approved</option>
              <option value="false">Pending Approval</option>
            </select>
            <div className="modal-buttons">
              <button className="btn" onClick={saveCourse}>
                Save
              </button>
              <button
                className="btn"
                style={{ background: "#f44336" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
