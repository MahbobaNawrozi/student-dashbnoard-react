import { useState, useEffect } from "react";
import "./styles.css";

export default function Teachers() {
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

  const [teachers] = useState([
    {
      name: "Alice Johnson",
      email: "alice@academy.com",
      course: "Web Development",
      status: "Pending",
    },
    {
      name: "Bob Smith",
      email: "bob@academy.com",
      course: "Graphic Design",
      status: "Approved",
    },
    {
      name: "Carol Lee",
      email: "carol@academy.com",
      course: "UI/UX Design",
      status: "Pending",
    },
    {
      name: "David Kim",
      email: "david@academy.com",
      course: "Python Programming",
      status: "Rejected",
    },
    {
      name: "Emma Wilson",
      email: "emma@academy.com",
      course: "Data Science",
      status: "Approved",
    },
    {
      name: "Frank Miller",
      email: "frank@academy.com",
      course: "Machine Learning",
      status: "Pending",
    },
  ]);

  const [filtered, setFiltered] = useState(teachers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());

  const total = teachers.length;
  const pending = teachers.filter((t) => t.status === "Pending").length;
  const approved = teachers.filter((t) => t.status === "Approved").length;
  const rejected = teachers.filter((t) => t.status === "Rejected").length;
  const courses = [...new Set(teachers.map((t) => t.course))].length;

  const toggleSelect = (index) => {
    const s = new Set(selected);
    if (s.has(index)) s.delete(index);
    else s.add(index);
    setSelected(s);
  };

  const approveTeacher = (index) => {
    const updated = [...filtered];
    updated[index].status = "Approved";
    setFiltered(updated);
    toast(`${updated[index].name} approved!`);
  };

  const rejectTeacher = (index) => {
    const updated = [...filtered];
    updated[index].status = "Rejected";
    setFiltered(updated);
    toast(`${updated[index].name} rejected!`);
  };

  const bulkApprove = () => {
    const updated = filtered.map((t, i) =>
      selected.has(i) ? { ...t, status: "Approved" } : t
    );
    setFiltered(updated);
    toast(`${selected.size} teachers approved!`);
    setSelected(new Set());
  };

  const bulkReject = () => {
    const updated = filtered.map((t, i) =>
      selected.has(i) ? { ...t, status: "Rejected" } : t
    );
    setFiltered(updated);
    toast(`${selected.size} teachers rejected!`);
    setSelected(new Set());
  };

  const bulkMessage = () => {
    if (selected.size === 0) return;
    const names = Array.from(selected).map((i) => filtered[i].name);
    const msg = prompt(
      `Send message to ${selected.size} teacher(s):\n\n${names.join(", ")}`
    );
    if (msg) {
      toast(`Message sent to ${selected.size} teacher(s)!`);
      setSelected(new Set());
    }
  };

  const exportCSV = () => {
    let csv = "Name,Email,Course,Status\n";
    teachers.forEach(
      (t) => (csv += `${t.name},${t.email},${t.course},${t.status}\n`)
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teachers.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast("CSV exported!");
  };

  const viewProfile = (index) => {
    const t = filtered[index];
    document.getElementById("modalName").textContent = t.name;
    document.getElementById("modalEmail").textContent = t.email;
    document.getElementById("modalCourse").textContent = t.course;
    document.getElementById("modalStatus").textContent = t.status;
    document.getElementById("teacherModal").style.display = "flex";
  };

  const closeModal = () =>
    (document.getElementById("teacherModal").style.display = "none");

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

  useEffect(() => {
    let list = teachers;
    if (statusFilter !== "All")
      list = list.filter((t) => t.status === statusFilter);
    if (search)
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.email.toLowerCase().includes(search.toLowerCase()) ||
          t.course.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(list);
  }, [search, statusFilter, teachers]);

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
    /* Sidebar - Mobile (hidden by default) */
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
    
    /* Content Container - Mobile First */
    .content-container {
      width: 100%;
      padding: 0;
    }
    
    /* Cards - Mobile First */
    .cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0 0 0.75rem 0;
    }
    
    .card {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1rem;
      border: none;
      text-align: center;
    }
    
    .card i {
      font-size: 28px;
      color: var(--accent);
      margin-bottom: 10px;
    }
    
    .card h3 {
      font-size: 14px;
      color: #555;
      margin-bottom: 8px;
    }
    
    .card p {
      font-size: 20px;
      font-weight: 600;
      color: var(--accent);
      margin: 0;
    }
    
    /* Quick Stats - Mobile First */
    .quick-stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
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
    
    /* Search & Export - Mobile First */
    .search-export-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    #searchInput {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: var(--radius);
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    
    .export-btn {
      padding: 0.75rem;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      width: 100%;
      text-align: center;
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
    
    .bulk-reject {
      background: #dc3545;
      color: white;
    }
    
    .bulk-msg {
      background: #ffc107;
      color: #212529;
    }
    
    /* Filter Buttons - Mobile First */
    .filter-buttons {
      display: flex;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      width: 100%;
    }
    
    .filter-buttons button {
      padding: 0.5rem 1rem;
      border: 1px solid #dee2e6;
      background: white;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      white-space: nowrap;
    }
    
    .filter-buttons button.active {
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    }
    
    /* Teachers Grid - Mobile First */
    .teachers-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.75rem;
      margin: 0 0 1rem 0;
      width: 100%;
    }
    
    .teacher-card {
      background: white;
      border-radius: var(--radius);
      padding: 1rem;
      box-shadow: var(--shadow);
      border: 1px solid transparent;
    }
    
    .teacher-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .teacher-checkbox {
      transform: scale(1.2);
    }
    
    .teacher-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--text);
      margin: 0 0 0.25rem 0;
    }
    
    .teacher-email {
      font-size: 13px;
      color: var(--text-light);
      margin: 0;
    }
    
    .teacher-course {
      display: inline-block;
      padding: 0.5rem 0.75rem;
      background: #e3f2fd;
      color: var(--accent);
      border-radius: 15px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .teacher-status {
      padding: 0.5rem 0.75rem;
      border-radius: 15px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    
    .status-approved {
      background: #d4edda;
      color: #155724;
    }
    
    .status-rejected {
      background: #f8d7da;
      color: #721c24;
    }
    
    .teacher-footer {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
    
    .teacher-actions {
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
    
    .view-btn {
      background: var(--accent);
      color: white;
    }
    
    .approve-btn {
      background: #28a745;
      color: white;
    }
    
    .reject-btn {
      background: #dc3545;
      color: white;
    }
    
    /* Teachers Section - Mobile First */
    .teachers-section {
      background: #fff;
      padding: 1rem;
      border-radius: var(--radius);
      margin: 0 0 1rem 0;
      box-shadow: var(--shadow);
      width: 100%;
    }
    
    .teachers-section h3 {
      margin: 0 0 1rem 0;
      font-size: 18px;
    }
    
    /* Table Responsive */
    .table-responsive {
      overflow-x: auto;
      width: 100%;
      -webkit-overflow-scrolling: touch;
    }
    
    .teachers-table {
      width: 100%;
      min-width: 500px;
      border-collapse: collapse;
    }
    
    .teachers-table th,
    .teachers-table td {
      padding: 0.75rem;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }
    
    .teachers-table th {
      background-color: #f4f6fa;
      font-weight: 600;
    }
    
    /* No Results */
    .no-results {
      text-align: center;
      padding: 2rem 1rem;
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      margin: 1rem 0;
    }
    
    .no-results i {
      font-size: 36px;
      color: #ccc;
      margin-bottom: 1rem;
    }
    
    /* Modal */
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
      position: relative;
    }
    
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      background: none;
      border: none;
      line-height: 1;
    }
    
    /* Toast */
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
      
      .cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin: 0 0 1rem 0;
      }
      
      .quick-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin: 0 0 1.25rem 0;
      }
      
      .search-export-container {
        flex-direction: row;
        align-items: center;
      }
      
      #searchInput {
        flex: 1;
        min-width: 200px;
      }
      
      .export-btn {
        width: auto;
        min-width: 120px;
      }
      
      .bulk-bar {
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
      }
      
      .bulk-bar button {
        width: auto;
      }
      
      .teachers-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      
      .teacher-actions {
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
      
      .cards {
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin: 0 0 1.5rem 0;
      }
      
      .card i {
        font-size: 32px;
      }
      
      .card h3 {
        font-size: 16px;
      }
      
      .card p {
        font-size: 24px;
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
      
      .teachers-grid {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }
      
      .teacher-card {
        padding: 1.25rem;
      }
      
      .teacher-name {
        font-size: 18px;
      }
      
      .avatar-img {
        width: 40px;
        height: 40px;
        border: 3px solid #f8f9fa;
      }
      
      .teachers-section {
        padding: 1.5rem;
      }
      
      .teachers-section h3 {
        font-size: 20px;
      }
    }
    
    /* ========== LARGE DESKTOP (1200px and up) ========== */
    @media (min-width: 1200px) {
      .main-content {
        padding: 1rem 2rem;
      }
      
      .teachers-grid {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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

  const navLinks = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", to: "/index" },
    {
      icon: "fas fa-chalkboard-teacher",
      label: "Teachers",
      to: "/teachers",
      active: true,
    },
    { icon: "fas fa-user-graduate", label: "Students", to: "/students" },
    { icon: "fas fa-book", label: "Courses", to: "/courses" },
    { icon: "fas fa-bullhorn", label: "Announcement", to: "/annoucement" },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report" },
    { icon: "fas fa-cog", label: "Settings", to: "/setting" },
  ];

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
                <span className="d-none d-sm-inline">Teacher Management</span>
                <span className="d-inline d-sm-none">Teachers</span>
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
          {/* Stats cards */}
          <div className="cards">
            <div className="card">
              <i className="fas fa-chalkboard-teacher"></i>
              <h3>Total Teachers</h3>
              <p>{total}</p>
            </div>
            <div className="card">
              <i className="fas fa-hourglass-half"></i>
              <h3>Pending Approvals</h3>
              <p>{pending}</p>
            </div>
            <div className="card">
              <i className="fas fa-clock"></i>
              <h3>Last Login</h3>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>

          {/* Quick stats */}
          <section className="quick-stats">
            <div className="stat-card">
              <i className="fas fa-user-clock"></i>
              <div>
                <div className="stat-number">{pending}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-user-check"></i>
              <div>
                <div className="stat-number">{approved}</div>
                <div className="stat-label">Approved</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-user-times"></i>
              <div>
                <div className="stat-number">{rejected}</div>
                <div className="stat-label">Rejected</div>
              </div>
            </div>
            <div className="stat-card">
              <i className="fas fa-book"></i>
              <div>
                <div className="stat-number">{courses}</div>
                <div className="stat-label">Courses</div>
              </div>
            </div>
          </section>

          {/* Search & export */}
          <div className="search-export-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Search by name, email, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="export-btn" onClick={exportCSV}>
              <i className="fas fa-download"></i> Export CSV
            </button>
          </div>

          {/* Bulk actions bar */}
          <div className={`bulk-bar ${selected.size > 0 ? "show" : ""}`}>
            <span id="bulkCount">
              {selected.size} teacher{selected.size !== 1 ? "s" : ""} selected
            </span>
            <button className="bulk-approve" onClick={bulkApprove}>
              Approve Selected
            </button>
            <button className="bulk-reject" onClick={bulkReject}>
              Reject Selected
            </button>
            <button className="bulk-msg" onClick={bulkMessage}>
              Send Message
            </button>
          </div>

          {/* Filter buttons */}
          <div className="filter-buttons">
            {["All", "Pending", "Approved", "Rejected"].map((st) => (
              <button
                key={st}
                className={statusFilter === st ? "active" : ""}
                onClick={() => setStatusFilter(st)}
              >
                {st === "All" ? "All Teachers" : st}
              </button>
            ))}
          </div>

          {/* Teachers grid */}
          <div id="teachersGrid" className="teachers-grid">
            {filtered.map((t, i) => (
              <div
                key={i}
                className={`teacher-card ${selected.has(i) ? "selected" : ""}`}
                data-index={i}
              >
                <div className="teacher-header">
                  <div>
                    <h3 className="teacher-name">{t.name}</h3>
                    <p className="teacher-email">{t.email}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="teacher-checkbox"
                    checked={selected.has(i)}
                    onChange={() => toggleSelect(i)}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="teacher-course">{t.course}</span>
                  <span
                    className={`teacher-status status-${t.status.toLowerCase()}`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="teacher-footer">
                  <div className="teacher-actions">
                    <button
                      className="action-btn view-btn"
                      onClick={() => viewProfile(i)}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                    {t.status === "Pending" && (
                      <>
                        <button
                          className="action-btn approve-btn"
                          onClick={() => approveTeacher(i)}
                        >
                          <i className="fas fa-check"></i> Approve
                        </button>
                        <button
                          className="action-btn reject-btn"
                          onClick={() => rejectTeacher(i)}
                        >
                          <i className="fas fa-times"></i> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filtered.length === 0 && (
            <div id="noResults" className="no-results">
              <i className="fas fa-search"></i>
              <h3>No teachers found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Performance table */}
          <section className="teachers-section">
            <h3>
              <i className="fas fa-chart-line"></i> Teachers Performance
            </h3>
            <div className="table-responsive">
              <table className="teachers-table">
                <thead>
                  <tr>
                    <th>Teacher</th>
                    <th>Courses</th>
                    <th>Students</th>
                    <th>Performance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Abdul</td>
                    <td>5</td>
                    <td>120</td>
                    <td>⭐⭐⭐⭐</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>Sana</td>
                    <td>3</td>
                    <td>65</td>
                    <td>⭐⭐⭐</td>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td>Javed</td>
                    <td>4</td>
                    <td>200</td>
                    <td>⭐⭐⭐⭐⭐</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Modal */}
        <div className="modal" id="teacherModal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <h3 className="mb-4" id="modalName"></h3>
            <div className="teacher-details">
              <p>
                <strong>Email:</strong> <span id="modalEmail"></span>
              </p>
              <p>
                <strong>Course:</strong> <span id="modalCourse"></span>
              </p>
              <p>
                <strong>Status:</strong> <span id="modalStatus"></span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
