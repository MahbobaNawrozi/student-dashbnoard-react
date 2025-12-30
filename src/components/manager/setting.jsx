import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ManagerSettings = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileName, setProfileName] = useState("Manager Account");
  const [firstName, setFirstName] = useState("Manager");
  const [lastName, setLastName] = useState("Account");
  const [avatarText, setAvatarText] = useState("MA");
  const [avatarBackground, setAvatarBackground] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("#2563eb");
  const [customColor, setCustomColor] = useState("");
  const [language, setLanguage] = useState("en");
  const [rtlLayout, setRtlLayout] = useState(false);

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/dashboard" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/head" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    { icon: "fas fa-certificate", label: "Certificates", link: "/certificate" },
    { icon: "fas fa-chart-line", label: "Announcement", link: "/announcement" },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "/analytic" },
    { icon: "fas fa-chart-line", label: "Reports", link: "/reports" },
    { icon: "fas fa-cog", label: "Settings", link: "/settings" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  // --------------  SIDEBAR TOGGLE LOGIC --------------
  const toggleDesktopSidebar = () => setSidebarCollapsed((s) => !s);
  const toggleMobileSidebar = () => setSidebarOpen((s) => !s);

  const handleMenuItemClick = () => {
    if (window.innerWidth <= 992) setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebar = document.querySelector(".sidebar");
        const mobileBtn = document.querySelector(".mobile-menu-btn");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          mobileBtn &&
          !mobileBtn.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // --------------  SETTINGS FUNCTIONS --------------
  const updateProfilePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarBackground(`url(${e.target.result})`);
        setAvatarText("");
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileName = () => {
    const newName = `${firstName} ${lastName}`;
    setProfileName(newName);
    setAvatarText(`${firstName.charAt(0)}${lastName.charAt(0)}`);
  };

  const selectTheme = (color) => {
    setSelectedTheme(color);
    document.documentElement.style.setProperty("--primary-color", color);
  };

  const applyCustomColor = () => {
    if (/^#[0-9A-F]{6}$/i.test(customColor)) {
      setSelectedTheme(customColor);
      document.documentElement.style.setProperty(
        "--primary-color",
        customColor
      );
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    if (value === "fa" || value === "ar") {
      setRtlLayout(true);
      document.body.setAttribute("dir", "rtl");
    } else {
      setRtlLayout(false);
      document.body.setAttribute("dir", "ltr");
    }
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  const resetSettings = () => {
    if (confirm("Reset all settings to default?")) {
      window.location.reload();
    }
  };

  const deleteAccount = () => {
    if (confirm("Delete your account? This cannot be undone.")) {
      alert("Account deletion requested. Please contact support.");
    }
  };

  useEffect(() => {
    updateProfileName();
  }, [firstName, lastName]);

  // --------------  RENDER --------------
  return (
    <div className="manager-settings">
      {/* Mobile hamburger */}
      <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">E-Learn</div>
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.link}
              className={location.pathname === item.link ? "active" : ""}
            >
              <Link to={item.link} onClick={handleMenuItemClick}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className={`main-content ${sidebarCollapsed ? "collapsed" : ""}`}>
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="icon menu-toggle" onClick={toggleDesktopSidebar}>
              <i className="fas fa-bars"></i>
            </div>
            <div className="welcome">
              <h1 className="h5 mb-0 fw-bold">Manager Settings</h1>
              <p className="text-muted mb-0 small d-none d-md-block">
                Manage your profile, preferences and security settings.
              </p>
            </div>
          </div>

          <div className="user-area">
            <div className="icon position-relative">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </div>
            <div className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </div>
            <Link to="/settings" className="user-avatar-link">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Manager Avatar"
                className="user-avatar"
              />
            </Link>
          </div>
        </header>

        {/* Settings Content */}
        <div className="content-area">
          {/* Profile Settings */}
          <div className="data-section">
            <h2 className="section-title">Profile Settings</h2>
            <div className="profile-section">
              <div className="avatar-container">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: avatarBackground,
                    backgroundSize: "cover",
                    backgroundColor: avatarBackground
                      ? "transparent"
                      : "var(--primary-color)",
                  }}
                >
                  {avatarText}
                </div>
                <button
                  className="avatar-upload"
                  onClick={() => document.getElementById("profilePic").click()}
                >
                  📷
                </button>
                <input
                  type="file"
                  id="profilePic"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={updateProfilePic}
                />
              </div>
              <div className="profile-info">
                <h3>{profileName}</h3>
                <p>admin@academyhub.com</p>
                <p>Role: Platform Manager</p>
                <p>Member since: January 2023</p>
              </div>
            </div>

            <div className="grid">
              <div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="clean-input"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="clean-input"
                  />
                </div>
                <div className="form-group">
                  <label>Display Name</label>
                  <input
                    type="text"
                    value={profileName}
                    readOnly
                    className="clean-input"
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value="+1 234 567 8900"
                    className="clean-input"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    defaultValue="Platform administrator managing the e-learning system and overseeing all operations."
                    className="clean-textarea"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value="New York, USA"
                    className="clean-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Theme Colors */}
          <div className="data-section">
            <h2 className="section-title">Theme Colors</h2>
            <div className="form-group">
              <label>Choose Primary Color Theme</label>
              <div className="color-picker">
                <div
                  className={`color-option ${
                    selectedTheme === "#2563eb" ? "selected" : ""
                  }`}
                  style={{ background: "#2563eb" }}
                  onClick={() => selectTheme("#2563eb")}
                ></div>
                <div
                  className={`color-option ${
                    selectedTheme === "#dc2626" ? "selected" : ""
                  }`}
                  style={{ background: "#dc2626" }}
                  onClick={() => selectTheme("#dc2626")}
                ></div>
                <div
                  className={`color-option ${
                    selectedTheme === "#16a34a" ? "selected" : ""
                  }`}
                  style={{ background: "#16a34a" }}
                  onClick={() => selectTheme("#16a34a")}
                ></div>
                <div
                  className={`color-option ${
                    selectedTheme === "#f59e0b" ? "selected" : ""
                  }`}
                  style={{ background: "#f59e0b" }}
                  onClick={() => selectTheme("#f59e0b")}
                ></div>
                <div
                  className={`color-option ${
                    selectedTheme === "#8b5cf6" ? "selected" : ""
                  }`}
                  style={{ background: "#8b5cf6" }}
                  onClick={() => selectTheme("#8b5cf6")}
                ></div>
                <div
                  className={`color-option ${
                    selectedTheme === "#ec4899" ? "selected" : ""
                  }`}
                  style={{ background: "#ec4899" }}
                  onClick={() => selectTheme("#ec4899")}
                ></div>
                <div
                  className={`color-option ${
                    selectedTheme === "#06b6d4" ? "selected" : ""
                  }`}
                  style={{ background: "#06b6d4" }}
                  onClick={() => selectTheme("#06b6d4")}
                ></div>
              </div>
              <div
                className="theme-preview"
                style={{ background: selectedTheme }}
              >
                Preview of Selected Theme
              </div>
            </div>
            <div className="form-group">
              <label>Custom Color (Hex)</label>
              <input
                type="text"
                placeholder="#2563eb"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                onBlur={applyCustomColor}
                className="clean-input"
              />
            </div>
          </div>

          {/* Display & Language */}
          <div className="data-section">
            <h2 className="section-title">Display & Language</h2>
            <div className="grid">
              <div>
                <div className="form-group">
                  <label>Display Mode</label>
                  <div
                    style={{ display: "flex", gap: "20px", marginTop: "8px" }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "normal",
                      }}
                    >
                      <input
                        type="radio"
                        name="displayMode"
                        value="light"
                        defaultChecked
                      />{" "}
                      Light
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "normal",
                      }}
                    >
                      <input type="radio" name="displayMode" value="dark" />{" "}
                      Dark
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "normal",
                      }}
                    >
                      <input type="radio" name="displayMode" value="auto" />{" "}
                      Auto
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="clean-select"
                  >
                    <option value="en">English</option>
                    <option value="fa">فارسی (Persian)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>RTL Layout (for Persian)</label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={rtlLayout}
                      onChange={(e) => setRtlLayout(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Font Size</label>
                  <select className="clean-select">
                    <option value="small">Small</option>
                    <option value="medium" selected>
                      Medium
                    </option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Compact Mode</label>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="data-section">
            <h2 className="section-title">Notification Settings</h2>
            <div className="grid">
              <div>
                <h3>Email Notifications</h3>
                <div className="form-group">
                  <label>New user registration</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Course enrollment alerts</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Revenue reports</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div>
                <h3>In-App Notifications</h3>
                <div className="form-group">
                  <label>System alerts</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Maintenance reminders</label>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Weekly summary</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Notification Email</label>
              <input
                type="email"
                defaultValue="notifications@academyhub.com"
                className="clean-input"
              />
            </div>
          </div>

          {/* Account Security */}
          <div className="data-section">
            <h2 className="section-title">Account Security</h2>
            <div className="grid">
              <div>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" className="clean-input" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" className="clean-input" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" className="clean-input" />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Two-Factor Authentication</label>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Login Notifications</label>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Session Timeout (minutes)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    min="5"
                    max="1440"
                    className="clean-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button className="primary" onClick={saveSettings}>
              Save Changes
            </button>
            <button onClick={resetSettings}>Reset to Default</button>
            <button className="danger" onClick={deleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        /* ========== GLOBAL RESET & PREVENT HORIZONTAL SCROLL ========== */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
          width: 100vw;
        }

        body {
          font-family: "Poppins", sans-serif;
          background: #f4f7fb;
          color: #1e293b;
        }

        /* ========== ROOT VARIABLES ========== */
        :root {
          --primary-color: #1a237e;
          --secondary-color: #38bdf8;
          --light-bg: #f4f7fb;
          --dark-text: #1e293b;
          --gray-text: #64748b;
          --card-bg: #ffffff;
          --shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          --radius: 10px;
        }

        /* ========== SIDEBAR (FIXED WIDTH - NO SCROLL) ========== */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, var(--primary-color), #1a237e);
          color: #fff;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1030;
          transition: width 0.3s, transform 0.3s;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          overflow-x: hidden; /* Prevent horizontal scroll in sidebar */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sidebar::-webkit-scrollbar {
          display: none;
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 1.4rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 60px;
          transition: all 0.3s;
          white-space: nowrap;
          overflow: hidden;
        }

        .sidebar.collapsed .sidebar-header {
          font-size: 0;
          padding: 1.2rem 0;
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .menu li a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1.5rem;
          color: #e2e8f0;
          text-decoration: none;
          transition: all 0.3s;
          border-left: 4px solid transparent;
          white-space: nowrap;
          overflow: hidden;
        }

        .menu li a:hover,
        .menu li.active a {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: var(--secondary-color);
          color: #fff;
        }

        .sidebar.collapsed .menu li a {
          padding: 0.9rem;
          justify-content: center;
        }

        .sidebar.collapsed .menu li a span {
          display: none;
        }

        .main-content {
          margin-left: 260px;
          min-height: 100vh;
          transition: margin-left 0.3s;
          padding: 20px;
          width: calc(100vw - 260px);
          box-sizing: border-box;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .main-content::-webkit-scrollbar {
          display: none;
        }
        .sidebar.collapsed ~ .main-content {
          margin-left: 70px;
          width: calc(100vw - 70px);
        }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1040;
          background: var(--primary-color);
          color: #fff;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* ========== TOPBAR (FIXED WIDTH) ========== */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          min-height: 60px;
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          margin-bottom: 1.5rem;
          width: 100%;
          max-width: 100%; /* Prevent overflow */
          box-sizing: border-box;
          gap: 15px;
          overflow: hidden; /* Hide any overflow */
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .welcome {
          min-width: 0;
        }

        .welcome h1 {
          font-size: 1.4rem;
          color: var(--dark-text);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .welcome p {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 2px 0 0;
        }

        .icon {
          background: #eff6ff;
          color: var(--primary-color);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .icon:hover {
          background: var(--primary-color);
          color: #fff;
        }

        .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--primary-color);
          object-fit: cover;
          flex-shrink: 0;
        }

        /* ========== CONTENT SECTIONS (NO OVERFLOW) ========== */
        .content-area {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .data-section {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .section-title {
          font-size: 18px;
          color: var(--dark-text);
          margin: 0 0 15px;
          font-weight: 600;
        }

        /* ========== GRID SYSTEM (RESPONSIVE) ========== */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          max-width: 100%;
          box-sizing: border-box;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* ========== TABLE CONTAINER (HORIZONTAL SCROLL ONLY WHEN NEEDED) ========== */
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
          max-width: 100%;
          box-sizing: border-box;
        }

        .table th,
        .table td {
          padding: 12px 16px;
          text-align: left;
          font-size: 14px;
          white-space: nowrap;
        }

        .table th {
          background: #f8fafc;
          font-weight: 600;
          color: var(--dark-text);
          border-bottom: 2px solid #e2e8f0;
        }

        .table td {
          border-bottom: 1px solid #e2e8f0;
          color: var(--gray-text);
        }

        .table tbody tr:hover {
          background-color: #f9fafb;
        }

        .table tbody tr:last-child td {
          border-bottom: none;
        }

        .text-center {
          text-align: center !important;
        }

        /* ========== FORM ELEMENTS (CLEAN INPUTS) ========== */
        .form-group {
          margin-bottom: 15px;
          max-width: 100%;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .clean-input,
        .clean-textarea,
        .clean-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #ffffff !important;
          color: #1f2937 !important;
          box-sizing: border-box;
          max-width: 100%;
        }

        .clean-input:focus,
        .clean-textarea:focus,
        .clean-select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
        }

        .clean-textarea {
          resize: vertical;
          min-height: 80px;
        }

        /* ========== TOGGLE SWITCH ========== */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #d1d5db;
          transition: 0.3s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: #fff;
          transition: 0.3s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: var(--primary-color);
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        /* ========== BUTTONS ========== */
        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
          max-width: 100%;
        }

        button {
          padding: 8px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #fff;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        button.primary {
          background: var(--primary-color);
          color: #fff;
          border: none;
        }

        button.primary:hover {
          background: #1a237e;
        }

        button.danger {
          background: #ef4444;
          color: #fff;
          border: none;
        }

        /* ========== PROFILE SECTION ========== */
        .profile-section {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
          max-width: 100%;
        }

        .avatar-container {
          position: relative;
          display: inline-block;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: var(--primary-color);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .avatar:hover {
          opacity: 0.8;
        }

        .avatar-upload {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: #10b981;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
        }

        .profile-info h3 {
          margin-bottom: 5px;
        }

        .profile-info p {
          color: var(--gray-text);
          font-size: 0.9rem;
          margin-bottom: 3px;
        }

        /* ========== THEME COLORS ========== */
        .color-picker {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
          max-width: 100%;
        }

        .color-option {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s;
        }

        .color-option:hover {
          transform: scale(1.1);
        }

        .color-option.selected {
          border-color: var(--dark-text);
          transform: scale(1.1);
        }

        .theme-preview {
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          text-align: center;
          color: #fff;
          font-weight: 500;
        }

        /* ========== STATUS BADGES ========== */
        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
          margin: 2px;
        }

        .status-teacher {
          background: #d1fae5;
          color: #065f46;
        }

        .status-student {
          background: #dbeafe;
          color: #1e40af;
        }

        /* ========== EVENTS LIST ========== */
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .event-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .event-item:last-child {
          border-bottom: none;
        }

        .event-title {
          font-size: 14px;
          color: var(--dark-text);
          font-weight: 500;
        }

        .event-date {
          font-size: 13px;
          color: var(--primary-color);
          background: #eff6ff;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 500;
        }

        /* ========== DASHBOARD CARDS ========== */
        .dashboard-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--primary-color)
          );
          padding: 12px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .card-icon i {
          font-size: 24px;
          color: #fff;
        }

        .card-label {
          font-size: 14px;
          color: var(--gray-text);
          margin: 0 0 4px;
          font-weight: 500;
        }

        .card-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--dark-text);
          margin: 0;
          line-height: 1;
        }

        /* ========== RESPONSIVE DESIGN ========== */
        @media (max-width: 1199.98px) {
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (max-width: 991.98px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            margin-left: 0 !important;
            width: 100vw !important;
            padding: 15px;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .topbar {
            margin-top: 55px;
            padding: 1rem;
            gap: 10px;
          }
          .topbar-left {
            gap: 0.75rem;
          }
          .welcome h1 {
            font-size: 1.2rem;
          }
          .icon {
            width: 36px;
            height: 36px;
          }
          .user-avatar {
            width: 36px;
            height: 36px;
          }
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 15px;
          }
        }

        @media (max-width: 767.98px) {
          .main-content {
            padding: 12px;
          }
          .topbar {
            padding: 0.8rem;
            margin-top: 50px;
            min-height: 55px;
          }
          .welcome h1 {
            font-size: 1.1rem;
            max-width: 180px;
          }
          .icon {
            width: 34px;
            height: 34px;
          }
          .user-avatar {
            width: 34px;
            height: 34px;
          }
          .mobile-menu-btn {
            width: 36px;
            height: 36px;
            font-size: 16px;
            top: 12px;
            left: 12px;
          }
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }
          .dashboard-card {
            padding: 16px;
          }
          .card-icon {
            padding: 10px;
          }
          .card-icon i {
            font-size: 20px;
          }
          .card-value {
            font-size: 24px;
          }
          .data-section {
            padding: 16px;
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
          }
          .table th,
          .table td {
            padding: 10px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 575.98px) {
          .topbar {
            flex-wrap: wrap;
            padding: 0.75rem;
            margin-top: 50px;
            gap: 8px;
          }
          .topbar-left {
            width: 100%;
            justify-content: space-between;
          }
          .welcome {
            flex: 1;
            min-width: 0;
          }
          .welcome h1 {
            font-size: 1rem;
            max-width: 160px;
          }
          .welcome p {
            font-size: 0.75rem;
          }
          .user-area {
            width: 100%;
            justify-content: flex-end;
          }
          .mobile-menu-btn {
            width: 34px;
            height: 34px;
            font-size: 15px;
            top: 10px;
            left: 10px;
          }
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .dashboard-card {
            padding: 14px;
            gap: 8px;
          }
          .card-label {
            font-size: 12px;
          }
          .card-value {
            font-size: 20px;
          }
          .data-section {
            padding: 14px;
          }
          .section-title {
            font-size: 15px;
            margin-bottom: 12px;
          }
          .table th,
          .table td {
            padding: 8px 10px;
            font-size: 12px;
          }
          .status-badge {
            font-size: 11px;
            padding: 3px 8px;
          }
          .event-title {
            font-size: 13px;
          }
          .event-date {
            font-size: 12px;
            padding: 3px 8px;
          }
        }

        @media (max-width: 374.98px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
          .topbar {
            padding: 0.6rem;
          }
          .welcome h1 {
            font-size: 0.9rem;
            max-width: 120px;
          }
          .icon {
            width: 32px;
            height: 32px;
          }
          .user-avatar {
            width: 32px;
            height: 32px;
          }
          .mobile-menu-btn {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ManagerSettings;
