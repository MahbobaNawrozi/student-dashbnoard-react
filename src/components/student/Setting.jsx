import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ADD THIS IMPORT
import "./styles.css";
export default function Settings() {
  // FIXED: Use consistent state variable names
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [theme, setTheme] = useState("blue");
  const [mode, setMode] = useState("light");
  const [language, setLanguage] = useState("en");
  const [font, setFont] = useState("Poppins");
  const [emailNotif, setEmailNotif] = useState(true);
  const [courseNotif, setCourseNotif] = useState(true);
  const [assignmentNotif, setAssignmentNotif] = useState(true);
  const [gradeNotif, setGradeNotif] = useState(false);

  // FIXED: Added missing handleMenuClick function
  const handleMenuClick = () => {
    if (window.innerWidth <= 992) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const closer = (e) => {
      if (window.innerWidth <= 992) {
        if (
          !e.target.closest("#sidebar") &&
          !e.target.closest("#mobileMenuToggle")
        )
          setSidebarOpen(false);
      }
    };
    document.addEventListener("click", closer);
    return () => document.removeEventListener("click", closer);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 992) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "blue");
    setMode(localStorage.getItem("mode") || "light");
    setLanguage(localStorage.getItem("language") || "en");
    setFont(localStorage.getItem("font") || "Poppins");
    setEmailNotif(localStorage.getItem("emailNotif") !== "false");
    setCourseNotif(localStorage.getItem("courseNotif") !== "false");
    setAssignmentNotif(localStorage.getItem("assignmentNotif") !== "false");
    setGradeNotif(localStorage.getItem("gradeNotif") === "true");
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      getThemeColor(theme)
    );
    if (mode === "dark") document.body.classList.add("dark-mode");
    else if (mode === "light") document.body.classList.remove("dark-mode");
    else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        document.body.classList.add("dark-mode");
      else document.body.classList.remove("dark-mode");
    }
    document.body.style.fontFamily = font;
  }, [theme, mode, font]);

  const getThemeColor = (color) => {
    const colors = {
      blue: "#1a237e",
      green: "#10b981",
      purple: "#8b5cf6",
      orange: "#f59e0b",
      pink: "#ec4899",
      red: "#ef4444",
    };
    return colors[color] || colors.blue;
  };

  const langMap = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    jp: "Japanese",
    cn: "Chinese",
    ar: "Arabic",
  };

  const saveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
    localStorage.setItem("language", language);
    localStorage.setItem("font", font);
    localStorage.setItem("emailNotif", emailNotif);
    localStorage.setItem("courseNotif", courseNotif);
    localStorage.setItem("assignmentNotif", assignmentNotif);
    localStorage.setItem("gradeNotif", gradeNotif);

    const btn = document.getElementById("saveSettings");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Settings Saved!';
      btn.style.background = "#10b981";
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
      }, 2000);
    }
  };

  return (
    <>
      <button
        id="mobileMenuToggle"
        className="mobile-menu-btn d-lg-none"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
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
            <li>
              <Link to="/Certificates" onClick={handleMenuClick}>
                <i className="fas fa-certificate" />
                <span>Certificates</span>
              </Link>
            </li>
            <div className="menu-spacer" />
            <li className="active">
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
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div
              id="desktopMenuToggle"
              className="icon d-none d-lg-flex"
              onClick={() => setSidebarCollapsed((v) => !v)}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-bars" />
            </div>
            <div className="welcome">
              <h2>Settings</h2>
              <p className="d-none d-md-block">
                Customize your learning experience
              </p>
            </div>
          </div>

          <div className="user-area">
            <a href="#" className="icon position-relative">
              <i className="fas fa-bell" />
              <span className="badge">3</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope" />
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt" />
            </a>
            <a href="#">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
            </a>
          </div>
        </header>

        <div className="settings-wrapper">
          <div className="setting-card">
            <h3>
              <i className="fas fa-palette" /> Theme Color
            </h3>
            <div className="color-options">
              {["blue", "green", "purple", "orange", "pink", "red"].map((c) => (
                <div
                  key={c}
                  className={`color-circle ${c} ${theme === c ? "active" : ""}`}
                  onClick={() => setTheme(c)}
                />
              ))}
            </div>
          </div>

          <div className="setting-card">
            <h3>
              <i className="fas fa-moon" /> Display Mode
            </h3>
            <div className="mode-options">
              {["light", "dark", "auto"].map((m) => (
                <button
                  key={m}
                  className={`mode-btn ${mode === m ? "active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  <i
                    className={`fas fa-${
                      m === "light" ? "sun" : m === "dark" ? "moon" : "adjust"
                    }`}
                  />
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-card">
            <h3>
              <i className="fas fa-language" /> Language
            </h3>
            <select
              className="styled-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="jp">Japanese</option>
              <option value="cn">Chinese</option>
              <option value="ar">Arabic</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-font" /> Font Family
            </h3>
            <select
              className="styled-select"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="Poppins">Poppins (Default)</option>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-bell" /> Notifications
            </h3>
            {[
              {
                key: "emailNotif",
                label: "Email Notifications",
                val: emailNotif,
                set: setEmailNotif,
              },
              {
                key: "courseNotif",
                label: "Course Updates",
                val: courseNotif,
                set: setCourseNotif,
              },
              {
                key: "assignmentNotif",
                label: "Assignment Alerts",
                val: assignmentNotif,
                set: setAssignmentNotif,
              },
              {
                key: "gradeNotif",
                label: "Grade Updates",
                val: gradeNotif,
                set: setGradeNotif,
              },
            ].map((n) => (
              <div className="notif-item" key={n.key}>
                <span>{n.label}</span>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={n.val}
                    onChange={(e) => n.set(e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>
            ))}
          </div>

          {/* Profile Preview */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-user-circle" /> Profile Preview
            </h3>
            <div className="profile-preview">
              <img src="https://i.pravatar.cc/100?img=5" alt="User Avatar" />
              <div className="profile-info">
                <h4>Alice Johnson</h4>
                <p>Language: {langMap[language]}</p>
                <p>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
                <p>Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}</p>
              </div>
            </div>
          </div>

          {/* Save Section */}
          <div className="save-section">
            <button
              className="save-btn"
              id="saveSettings"
              onClick={saveSettings}
            >
              <i className="fas fa-save" /> Save All Settings
            </button>
            <p
              style={{
                marginTop: "15px",
                color: "var(--gray-text)",
                fontSize: "14px",
              }}
            >
              Your preferences will be applied across all devices
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
