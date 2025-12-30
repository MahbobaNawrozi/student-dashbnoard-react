import React, { useState, useEffect } from "react";

import "./styles.css";
const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeColor, setActiveColor] = useState("blue");
  const [activeMode, setActiveMode] = useState("light");
  const [language, setLanguage] = useState("en");
  const [font, setFont] = useState("Inter");
  const [emailNotif, setEmailNotif] = useState(true);
  const [courseNotif, setCourseNotif] = useState(false);
  const [deadlineNotif, setDeadlineNotif] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 992) {
        const sidebar = document.getElementById("sidebar");
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          !mobileMenuToggle?.contains(e.target)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Load preferences from localStorage
  useEffect(() => {
    loadPreferences();
  }, []);

  // Handle system color scheme changes
  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      const savedMode = localStorage.getItem("mode");
      if (savedMode === "auto") {
        if (e.matches) {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const loadPreferences = () => {
    const savedTheme = localStorage.getItem("theme") || "blue";
    setActiveColor(savedTheme);
    updatePrimaryColor(savedTheme);

    const savedMode = localStorage.getItem("mode") || "light";
    setActiveMode(savedMode);
    if (savedMode === "dark") {
      setIsDarkMode(true);
    } else if (savedMode === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }

    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang);

    const savedFont = localStorage.getItem("font") || "Inter";
    setFont(savedFont);
    document.body.style.fontFamily = savedFont;

    const savedEmailNotif = localStorage.getItem("emailNotif") === "true";
    const savedCourseNotif = localStorage.getItem("courseNotif") === "true";
    const savedDeadlineNotif = localStorage.getItem("deadlineNotif") === "true";

    setEmailNotif(savedEmailNotif !== false);
    setCourseNotif(savedCourseNotif);
    setDeadlineNotif(savedDeadlineNotif);
  };

  const updatePrimaryColor = (color) => {
    const root = document.documentElement;
    let primaryColor;

    switch (color) {
      case "green":
        primaryColor = "#43A047";
        break;
      case "purple":
        primaryColor = "#8E24AA";
        break;
      case "orange":
        primaryColor = "#FB8C00";
        break;
      case "pink":
        primaryColor = "#EC407A";
        break;
      default:
        primaryColor = "#1a237e";
    }

    root.style.setProperty("--primary-color", primaryColor);
  };

  const handleColorClick = (color) => {
    setActiveColor(color);
    updatePrimaryColor(color);
  };

  const handleModeClick = (mode) => {
    setActiveMode(mode);

    if (mode === "dark") {
      setIsDarkMode(true);
    } else if (mode === "light") {
      setIsDarkMode(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
    document.body.style.fontFamily = e.target.value;
  };

  const handleSaveSettings = () => {
    localStorage.setItem("theme", activeColor);
    localStorage.setItem("mode", activeMode);
    localStorage.setItem("language", language);
    localStorage.setItem("font", font);
    localStorage.setItem("emailNotif", emailNotif);
    localStorage.setItem("courseNotif", courseNotif);
    localStorage.setItem("deadlineNotif", deadlineNotif);
    localStorage.setItem("primaryColor", activeColor);

    alert(
      "✅ Settings Saved!\nYour preferences have been updated and will be applied across the platform."
    );
  };

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

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const getLanguageText = (lang) => {
    const languages = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      jp: "Japanese",
    };
    return languages[lang] || "English";
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        id="mobileMenuToggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <aside
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
            <li>
              <a href="teacher.dashboard.html">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
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
                <a href="all-courses.html">All Courses</a>
                <a href="myCourses.html">My Courses</a>
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
                <a href="all-students.html">All Students</a>
                <a href="student-details.html">Student Details</a>
              </div>
            </li>
            <li>
              <a href="assignment.html">
                <i className="fas fa-tasks"></i>
                <span>Assignments</span>
              </a>
            </li>
            <li>
              <a href="grades.html">
                <i className="fas fa-graduation-cap"></i>
                <span>Grades</span>
              </a>
            </li>
            <li>
              <a href="certificates.html">
                <i className="fas fa-certificate"></i>
                <span>Certificates</span>
              </a>
            </li>
            <div className="menu-spacer"></div>
            <li className="active">
              <a href="settings.html">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </a>
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
        {/* Topbar - WITH IMPORTANT ICONS */}
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
              <h2>Settings & Preferences</h2>
              <p className="d-none d-md-block">
                Customize your dashboard appearance and preferences
              </p>
            </div>
          </div>
          <div className="user-area">
            {/* IMPORTANT ICONS FOR SMALL SCREENS */}
            <a href="#" className="icon position-relative d-none d-sm-flex">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#" className="icon d-none d-md-flex">
              <i className="fas fa-calendar-alt"></i>
            </a>
            <a href="teacher.profile.html">
              <img src="https://i.pravatar.cc/100?img=8" alt="Teacher" />
            </a>
          </div>
        </header>

        {/* Settings Grid */}
        <section className="settings-wrapper">
          {/* Accent Color */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-palette"></i> Accent Color
            </h3>
            <div className="color-options">
              <div
                className={`color-circle blue ${
                  activeColor === "blue" ? "active" : ""
                }`}
                data-color="blue"
                onClick={() => handleColorClick("blue")}
              ></div>
              <div
                className={`color-circle green ${
                  activeColor === "green" ? "active" : ""
                }`}
                data-color="green"
                onClick={() => handleColorClick("green")}
              ></div>
              <div
                className={`color-circle purple ${
                  activeColor === "purple" ? "active" : ""
                }`}
                data-color="purple"
                onClick={() => handleColorClick("purple")}
              ></div>
              <div
                className={`color-circle orange ${
                  activeColor === "orange" ? "active" : ""
                }`}
                data-color="orange"
                onClick={() => handleColorClick("orange")}
              ></div>
              <div
                className={`color-circle pink ${
                  activeColor === "pink" ? "active" : ""
                }`}
                data-color="pink"
                onClick={() => handleColorClick("pink")}
              ></div>
            </div>
          </div>

          {/* Display Mode */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-moon"></i> Display Mode
            </h3>
            <div className="mode-options">
              <button
                className={`mode-btn ${activeMode === "light" ? "active" : ""}`}
                data-mode="light"
                onClick={() => handleModeClick("light")}
              >
                ☀️ Light
              </button>
              <button
                className={`mode-btn ${activeMode === "dark" ? "active" : ""}`}
                data-mode="dark"
                onClick={() => handleModeClick("dark")}
              >
                🌙 Dark
              </button>
              <button
                className={`mode-btn ${activeMode === "auto" ? "active" : ""}`}
                data-mode="auto"
                onClick={() => handleModeClick("auto")}
              >
                ⚙️ Auto
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-language"></i> Language
            </h3>
            <select
              id="languageSelect"
              className="styled-select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="jp">Japanese</option>
            </select>
          </div>

          {/* Font */}
          <div className="setting-card font-options">
            <h3>
              <i className="fas fa-font"></i> Font Style
            </h3>
            <select id="fontSelect" value={font} onChange={handleFontChange}>
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Roboto">Roboto</option>
              <option value="Lora">Lora</option>
              <option value="Nunito">Nunito</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-bell"></i> Notifications
            </h3>
            <div className="notif-item">
              Email Alerts
              <label className="toggle">
                <input
                  type="checkbox"
                  id="emailNotif"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="notif-item">
              New Course Releases
              <label className="toggle">
                <input
                  type="checkbox"
                  id="courseNotif"
                  checked={courseNotif}
                  onChange={(e) => setCourseNotif(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="notif-item">
              Assignment Deadlines
              <label className="toggle">
                <input
                  type="checkbox"
                  id="deadlineNotif"
                  checked={deadlineNotif}
                  onChange={(e) => setDeadlineNotif(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="setting-card">
            <h3>
              <i className="fas fa-user-circle"></i> Profile Preview
            </h3>
            <div className="profile-preview">
              <img src="https://i.pravatar.cc/100?img=8" alt="User" />
              <div>
                <h4 id="previewName">Mr. Smith</h4>
                <p id="previewLang">Language: {getLanguageText(language)}</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            className="save-btn"
            id="saveSettings"
            onClick={handleSaveSettings}
          >
            <i className="fas fa-save"></i> Save All Settings
          </button>
        </section>
      </main>
    </div>
  );
};

export default Settings;
