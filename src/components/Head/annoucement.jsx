import { useState, useEffect } from "react";
import "./styles.css";

const STORAGE_KEY = "hodAnnouncements_v3";
const uuid = () => Math.random().toString(36).slice(2);

export default function Announcement() {
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

  const [db, setDb] = useState(
    () =>
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        teachers: [],
        students: [],
      }
  );
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }, [db]);

  const [activeTab, setActiveTab] = useState("teachers");
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const list = db[activeTab];
  const filtered = list.filter((it) => {
    const okSearch = it.text.toLowerCase().includes(search.toLowerCase());
    const okFilter =
      filter === "all" ||
      (filter === "unread" && !it.read) ||
      (filter === "read" && it.read);
    return okSearch && okFilter;
  });
  const selectedCount = list.filter((i) => i.selected).length;

  const post = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date();
    const item = {
      id: uuid(),
      text: text.trim(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      selected: false,
    };
    setDb((p) => ({ ...p, [activeTab]: [item, ...p[activeTab]] }));
    setText("");
  };

  const toggleSelect = (id) =>
    setDb((p) => ({
      ...p,
      [activeTab]: p[activeTab].map((i) =>
        i.id === id ? { ...i, selected: !i.selected } : i
      ),
    }));

  const markRead = () =>
    setDb((p) => ({
      ...p,
      [activeTab]: p[activeTab].map((i) =>
        i.selected ? { ...i, read: true, selected: false } : i
      ),
    }));

  const delSelected = () =>
    setDb((p) => ({
      ...p,
      [activeTab]: p[activeTab].filter((i) => !i.selected),
    }));

  const navLinks = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", to: "/index" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", to: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", to: "/students" },
    { icon: "fas fa-book", label: "Courses", to: "/courses" },
    {
      icon: "fas fa-bullhorn",
      label: "Announcement",
      to: "/annoucement",
      active: true,
    },
    { icon: "fas fa-chart-bar", label: "Reports", to: "/report" },
    { icon: "fas fa-cog", label: "Settings", to: "/setting" },
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
    
    /* Content Wrapper - Mobile First */
    .content-wrapper {
      width: 100%;
      padding: 0;
    }
    
    /* Card - Mobile First */
    .card {
      background: var(--card-bg);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1rem;
      margin: 0 0 1rem 0;
      border: none;
      width: 100%;
    }
    
    /* Search Bar - Mobile First */
    .search-bar {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0 0 1rem 0;
    }
    
    .search-bar input,
    .search-bar select {
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      color: var(--text);
    }
    
    .search-bar input:focus,
    .search-bar select:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
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
    
    .bulk-bar .read {
      background: #1e40af;
      color: white;
    }
    
    .bulk-bar .del {
      background: #dc2626;
      color: white;
    }
    
    /* Announcement Tabs - Mobile First */
    .ann-tabs {
      display: flex;
      gap: 0.5rem;
      margin: 0 0 1rem 0;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.75rem;
    }
    
    .ann-tabs button {
      padding: 0.75rem 1.5rem;
      border: none;
      background: #f1f5f9;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      flex: 1;
    }
    
    .ann-tabs button.active {
      background: var(--accent);
      color: white;
    }
    
    /* Announcement Form - Mobile First */
    .ann-form {
      margin: 0 0 1rem 0;
    }
    
    .ann-form textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 14px;
      resize: vertical;
      min-height: 100px;
      margin-bottom: 1rem;
      box-sizing: border-box;
      background: #fff;
      color: var(--text);
    }
    
    .ann-form textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
    }
    
    .ann-form button {
      width: 100%;
      padding: 0.75rem;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
    }
    
    /* Announcement List - Mobile First */
    .ann-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .ann-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }
    
    .ann-item:last-child {
      border-bottom: none;
    }
    
    .ann-item.unread {
      background: #f0f9ff;
    }
    
    .ann-item input[type="checkbox"] {
      margin-top: 0.25rem;
    }
    
    .ann-item strong {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 14px;
    }
    
    .ann-item div {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
    }
    
    .ann-item small {
      display: block;
      margin-top: 0.5rem;
      color: var(--text-light);
      font-size: 12px;
    }
    
    .ann-list .empty {
      text-align: center;
      padding: 2rem 1rem;
      color: var(--text-light);
    }
    
    .ann-list .empty i {
      font-size: 48px;
      margin-bottom: 1rem;
      color: #ccc;
    }
    
    /* Upcoming Events - Mobile First */
    .upcoming-events h3 {
      margin: 0 0 1rem 0;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .event-strip {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }
    
    .event-strip:last-child {
      border-bottom: none;
    }
    
    .event-date {
      background: var(--accent);
      color: white;
      padding: 0.5rem;
      border-radius: var(--radius);
      text-align: center;
      min-width: 60px;
    }
    
    .event-date div:first-child {
      font-size: 20px;
      font-weight: bold;
    }
    
    .event-date div:last-child {
      font-size: 12px;
      opacity: 0.9;
    }
    
    .event-title {
      flex: 1;
      font-weight: 500;
    }
    
    .event-time {
      background: #f1f5f9;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 14px;
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
      
      .search-bar {
        flex-direction: row;
        align-items: center;
      }
      
      .search-bar input {
        flex: 1;
      }
      
      .search-bar select {
        width: auto;
        min-width: 150px;
      }
      
      .bulk-bar {
        flex-direction: row;
        align-items: center;
        gap: 0.75rem;
      }
      
      .bulk-bar button {
        width: auto;
      }
      
      .ann-tabs button {
        flex: none;
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
      
      .card {
        padding: 1.5rem;
      }
      
      .ann-form textarea {
        font-size: 16px;
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
      
      .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
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
      
      .event-strip {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
      
      .event-date {
        align-self: flex-start;
      }
      
      .event-time {
        align-self: flex-start;
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
    }`;

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
                <span className="d-none d-sm-inline">Announcements</span>
                <span className="d-inline d-sm-none">Announcements</span>
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

        <div className="content-wrapper">
          <div className="card fade-in">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search announcements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="unread">Unread only</option>
                <option value="read">Read only</option>
              </select>
            </div>
            {selectedCount > 0 && (
              <div className="bulk-bar show">
                <span className="fw-medium">{selectedCount} selected</span>
                <button className="read" onClick={markRead}>
                  Mark read
                </button>
                <button className="del" onClick={delSelected}>
                  Delete selected
                </button>
              </div>
            )}
          </div>

          <div className="card fade-in">
            <div className="ann-tabs">
              <button
                className={activeTab === "teachers" ? "active" : ""}
                onClick={() => setActiveTab("teachers")}
              >
                Teachers
              </button>
              <button
                className={activeTab === "students" ? "active" : ""}
                onClick={() => setActiveTab("students")}
              >
                Students
              </button>
            </div>

            <form className="ann-form" onSubmit={post}>
              <textarea
                rows={3}
                placeholder="Write your announcement..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-paper-plane me-1"></i> Post Announcement
              </button>
            </form>

            <ul className="ann-list">
              {filtered.length === 0 ? (
                <li className="empty">
                  <i className="fas fa-inbox"></i>
                  <div>No announcements</div>
                </li>
              ) : (
                filtered.map((it) => (
                  <li
                    key={it.id}
                    className={`ann-item ${!it.read ? "unread" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={!!it.selected}
                      onChange={() => toggleSelect(it.id)}
                      className="form-check-input"
                    />
                    <div style={{ flex: 1 }}>
                      <strong>
                        {activeTab === "teachers" ? "Teacher" : "Student"}
                      </strong>
                      <div>{it.text}</div>
                      <small>
                        {it.date} {it.time}
                      </small>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <section className="upcoming-events card fade-in">
            <h3>
              <i className="fas fa-calendar-day"></i> Upcoming Department Events
            </h3>
            <div id="eventsStrip">
              <div className="event-strip">
                <div className="event-date">
                  <div>27</div>
                  <div>Jun</div>
                </div>
                <div className="event-title">Faculty Meeting</div>
                <div className="event-time">10:00 AM</div>
              </div>
              <div className="event-strip">
                <div className="event-date">
                  <div>02</div>
                  <div>Jul</div>
                </div>
                <div className="event-title">Project Review (Sem-3)</div>
                <div className="event-time">02:00 PM</div>
              </div>
              <div className="event-strip">
                <div className="event-date">
                  <div>07</div>
                  <div>Jul</div>
                </div>
                <div className="event-title">Workshop: AI/ML</div>
                <div className="event-time">09:30 AM</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
