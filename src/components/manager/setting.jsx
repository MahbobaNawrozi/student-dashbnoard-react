import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ManagerSettings = () => {
  // Sidebar state - match GradesPage structure
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Settings state
  const [profileName, setProfileName] = useState("Manager Account");
  const [firstName, setFirstName] = useState("Manager");
  const [lastName, setLastName] = useState("Account");
  const [avatarText, setAvatarText] = useState("MA");
  const [avatarBackground, setAvatarBackground] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("#1a237e");
  const [customColor, setCustomColor] = useState("");
  const [language, setLanguage] = useState("en");
  const [rtlLayout, setRtlLayout] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 992) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

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

  // Menu items - updated with consistent naming
  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/heads" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    {
      icon: "fas fa-bullhorn",
      label: "Announcements",
      link: "/announcements",
    },
    {
      icon: "fas fa-certificate",
      label: "Certificates",
      link: "/certificates",
    },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "/analytics" },
    { icon: "fas fa-chart-line", label: "Reports", link: "/reports" },
    { icon: "fas fa-cog", label: "Settings", link: "/settings", active: true },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  // Settings functions
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
    const toastEl = document.createElement("div");
    toastEl.className = "toast-notification success";
    toastEl.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-check-circle"></i>
        <span>Settings saved successfully!</span>
      </div>
    `;

    document.body.appendChild(toastEl);

    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  };

  const resetSettings = () => {
    if (window.confirm("Reset all settings to default?")) {
      window.location.reload();
    }
  };

  const deleteAccount = () => {
    if (window.confirm("Delete your account? This cannot be undone.")) {
      const toastEl = document.createElement("div");
      toastEl.className = "toast-notification warning";
      toastEl.innerHTML = `
        <div class="toast-content">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Account deletion requested. Please contact support.</span>
        </div>
      `;

      document.body.appendChild(toastEl);

      setTimeout(() => {
        toastEl.remove();
      }, 3000);
    }
  };

  useEffect(() => {
    updateProfileName();
  }, [firstName, lastName]);

  return (
    <>
      <style>{`
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
          --light-bg: #f5f6fa;
          --dark-text: #1e293b;
          --gray-text: #64748b;
          --primary-color: #1a237e;
          --secondary-color: #38bdf8;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          background: var(--light-bg);
          color: var(--text);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-x: hidden;
          width: 100vw;
          max-width: 100%;
        }
        
        /* ========== MAIN CONTAINER ========== */
        .settings-page {
          min-height: 100vh;
          background: var(--light-bg);
          position: relative;
          width: 100vw;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        /* ========== MOBILE FIRST STYLES ========== */
        /* Main Content - Mobile First */
        .main-content {
          width: 100vw;
          max-width: 100%;
          min-height: 100vh;
          transition: all 0.3s;
          padding: 0.5rem;
          margin-left: 0;
          background: var(--light-bg);
          overflow-x: hidden;
          position: relative;
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
          max-width: 100%;
          box-sizing: border-box;
        }
        
        .topbar-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
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
          flex-shrink: 0;
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
          flex-shrink: 0;
        }
        
        .welcome {
          flex: 1;
          min-width: 0;
        }
        
        .welcome h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: var(--dark-text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        
        .welcome p {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 0.25rem 0 0 0;
          display: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        
        .user-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        
        .notification-badge {
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
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
          flex-shrink: 0;
        }

        /* Content Area - Mobile First */
        .content-area {
          width: 100%;
          padding: 0;
          background: transparent;
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Settings Sections - Mobile First */
        .settings-section {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 1rem;
          margin: 0 0 1.5rem 0;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
        }
        
        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0 0 1rem 0;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        
        /* Profile Section - Mobile First */
        .profile-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .avatar-container {
          position: relative;
          display: inline-block;
          align-self: center;
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
        
        .avatar-upload-btn {
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
          z-index: 2;
        }
        
        .profile-info {
          text-align: center;
        }
        
        .profile-info h3 {
          font-size: 1.25rem;
          color: var(--dark-text);
          margin-bottom: 0.5rem;
        }
        
        .profile-info p {
          color: var(--gray-text);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        
        /* Grid System - Mobile First */
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--dark-text);
          margin-bottom: 0.5rem;
        }
        
        .form-control, .form-select {
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          background: #fff;
          color: var(--text);
          max-width: 100%;
        }
        
        .form-control:focus, .form-select:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 100px;
        }
        
        /* Color Picker - Mobile First */
        .color-picker {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          margin: 0.5rem 0 1rem;
        }
        
        .color-option {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s;
          justify-self: center;
        }
        
        .color-option:hover {
          transform: scale(1.1);
        }
        
        .color-option.selected {
          border-color: var(--dark-text);
          transform: scale(1.1);
        }
        
        .theme-preview {
          padding: 1rem;
          border-radius: var(--radius);
          margin: 1rem 0;
          text-align: center;
          color: #fff;
          font-weight: 500;
          background: var(--selected-theme, var(--primary-color));
        }
        
        /* Toggle Switch - Mobile First */
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
        
        /* Radio and Checkbox Groups - Mobile First */
        .radio-group {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        
        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: normal;
          cursor: pointer;
        }
        
        /* Action Buttons - Mobile First */
        .actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        
        .btn {
          padding: 0.75rem 1rem;
          border-radius: var(--radius);
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.3s;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          width: 100%;
        }
        
        .btn-primary {
          background: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background: #151c65;
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #5a6268;
          transform: translateY(-2px);
        }
        
        .btn-danger {
          background: #ef4444;
          color: white;
        }
        
        .btn-danger:hover {
          background: #dc2626;
          transform: translateY(-2px);
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
          overflow: hidden;
        }
        
        .sidebar.open {
          transform: translateX(0);
        }
        
        .sidebar-header {
          padding: 1.25rem;
          background: var(--sidebar-head);
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .nav-links {
          list-style: none;
          padding: 1rem 0;
          margin: 0;
          flex-grow: 1;
          overflow-y: auto;
          overflow-x: hidden;
          height: calc(100vh - 70px);
        }
        
        .nav-links::-webkit-scrollbar {
          width: 4px;
        }
        
        .nav-links::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-links::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        .nav-links li {
          margin: 0.25rem 0.75rem;
        }
        
        .nav-links li a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: all 0.3s;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .nav-links li.active a,
        .nav-links li a:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
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

        /* Toast Notification - Same as GradesPage */
        .toast-notification {
          position: fixed;
          top: 1rem;
          right: 1rem;
          background: white;
          border-radius: var(--radius);
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1100;
          animation: slideIn 0.3s ease-out;
          max-width: 300px;
          border-left: 4px solid;
        }
        
        .toast-notification.success {
          border-left-color: #10b981;
        }
        
        .toast-notification.warning {
          border-left-color: #f59e0b;
        }
        
        .toast-notification.info {
          border-left-color: var(--primary-color);
        }
        
        .toast-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .toast-content i {
          font-size: 1.25rem;
        }
        
        .toast-content i.fa-check-circle {
          color: #10b981;
        }
        
        .toast-content i.fa-exclamation-triangle {
          color: #f59e0b;
        }
        
        .toast-content i.fa-info-circle {
          color: var(--primary-color);
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* ========== SMALL TABLET (≥576px) ========== */
        @media (min-width: 576px) {
          .main-content {
            padding: 0.75rem;
          }
          
          .welcome p {
            display: block;
          }
          
          .settings-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .profile-section {
            flex-direction: row;
            align-items: center;
            text-align: left;
          }
          
          .profile-info {
            text-align: left;
          }
          
          .color-picker {
            grid-template-columns: repeat(7, 1fr);
          }
          
          .actions {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .btn {
            width: auto;
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .settings-section {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 1.25rem;
          }
          
          .avatar {
            width: 120px;
            height: 120px;
            font-size: 3rem;
          }
          
          .profile-info h3 {
            font-size: 1.5rem;
          }
        }

        /* ========== DESKTOP (≥992px) ========== */
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
            max-width: calc(100vw - 250px);
            padding: 1rem 1.5rem;
          }
          
          .sidebar.collapsed ~ .main-content {
            margin-left: 70px;
            width: calc(100vw - 70px);
            max-width: calc(100vw - 70px);
          }
          
          .topbar {
            padding: 1rem 1.5rem;
            margin: 0 0 1.5rem 0;
          }
          
          .avatar-img {
            width: 40px;
            height: 40px;
            border: 3px solid #f8f9fa;
          }
          
          .welcome p {
            font-size: 0.9rem;
          }
        }

        /* ========== LARGE DESKTOP (≥1200px) ========== */
        @media (min-width: 1200px) {
          .main-content {
            padding: 1rem 2rem;
          }
          
          .content-area {
            max-width: 100%;
          }
          
          .settings-section {
            padding: 2rem;
          }
        }

        /* ========== EXTRA LARGE DESKTOP (≥1400px) ========== */
        @media (min-width: 1400px) {
          .main-content {
            padding: 1.5rem 3rem;
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
          
          .settings-section {
            padding: 0.75rem;
          }
          
          .section-title {
            font-size: 1rem;
            margin-bottom: 0.75rem;
          }
          
          .avatar {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }
          
          .avatar-upload-btn {
            width: 24px;
            height: 24px;
            font-size: 0.8rem;
          }
          
          .color-picker {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.25rem;
          }
          
          .color-option {
            width: 32px;
            height: 32px;
          }
        }

        /* ========== VERY SMALL MOBILE (≤350px) ========== */
        @media (max-width: 350px) {
          .topbar-header {
            gap: 0.5rem;
          }
          
          .topbar-header h2 {
            font-size: 1rem;
          }
          
          .avatar-img {
            width: 32px;
            height: 32px;
          }
          
          .profile-section {
            flex-direction: column;
            text-align: center;
          }
          
          .profile-info {
            text-align: center;
          }
          
          .settings-grid {
            grid-template-columns: 1fr;
          }
          
          .color-picker {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .actions {
            grid-template-columns: 1fr;
          }
          
          .btn {
            width: 100%;
          }
        }
        
        /* ========== FIX FOR ALL MOBILE DEVICES ========== */
        @media (max-width: 992px) {
          .main-content {
            width: 100vw !important;
            max-width: 100vw !important;
            margin-left: 0 !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          
          .content-area, .settings-section {
            width: 100% !important;
            max-width: 100% !important;
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
      `}</style>

      <div className="settings-page">
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
        >
          <div className="sidebar-header">
            <span>E-Learn</span>
          </div>
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.link} className={item.active ? "active" : ""}>
                <Link
                  to={item.link}
                  onClick={() =>
                    window.innerWidth <= 992 && setMobileOpen(false)
                  }
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="main-content">
          {/* Topbar */}
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

                <div className="welcome">
                  <h2 className="mb-0">
                    <span className="d-none d-sm-inline">Manager Settings</span>
                    <span className="d-inline d-sm-none">Settings</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Manage your profile, preferences and security settings.
                  </p>
                </div>
              </div>
              <div className="user-area">
                <div className="notification-badge position-relative">
                  <i className="fas fa-bell fs-5"></i>
                  <span className="badge-counter">3</span>
                </div>
                <i className="fas fa-calendar-alt d-none d-md-inline-block fs-5"></i>
                <i className="fas fa-envelope d-none d-md-inline-block fs-5"></i>
                <Link to="/managerProfile" className="d-inline-block">
                  <img
                    src="https://i.pravatar.cc/300?img=12"
                    alt="Manager Avatar"
                    className="avatar-img"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="content-area">
            {/* Profile Settings Section */}
            <div className="settings-section fade-in">
              <h3 className="section-title">Profile Settings</h3>

              <div className="profile-section">
                <div className="avatar-container">
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: avatarBackground,
                      backgroundSize: "cover",
                      backgroundColor: avatarBackground
                        ? "transparent"
                        : selectedTheme,
                    }}
                  >
                    {avatarText}
                  </div>
                  <button
                    className="avatar-upload-btn"
                    onClick={() =>
                      document.getElementById("profilePic").click()
                    }
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

              <div className="settings-grid">
                <div>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Display Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileName}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="+1 234 567 8900"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      defaultValue="Platform administrator managing the e-learning system and overseeing all operations."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue="New York, USA"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Colors Section */}
            <div className="settings-section fade-in">
              <h3 className="section-title">Theme Colors</h3>

              <div className="form-group">
                <label className="form-label">Choose Primary Color Theme</label>
                <div className="color-picker">
                  <div
                    className={`color-option ${
                      selectedTheme === "#1a237e" ? "selected" : ""
                    }`}
                    style={{ background: "#1a237e" }}
                    onClick={() => selectTheme("#1a237e")}
                  ></div>
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
                </div>
                <div
                  className="theme-preview"
                  style={{ backgroundColor: selectedTheme }}
                >
                  Preview of Selected Theme
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Custom Color (Hex)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="#1a237e"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  onBlur={applyCustomColor}
                />
              </div>
            </div>

            {/* Display & Language Section */}
            <div className="settings-section fade-in">
              <h3 className="section-title">Display & Language</h3>

              <div className="settings-grid">
                <div>
                  <div className="form-group">
                    <label className="form-label">Display Mode</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="displayMode"
                          value="light"
                          defaultChecked
                        />{" "}
                        Light
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="displayMode" value="dark" />{" "}
                        Dark
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="displayMode" value="auto" />{" "}
                        Auto
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select
                      className="form-select"
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="fa">فارسی (Persian)</option>
                      <option value="ar">العربية (Arabic)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">RTL Layout</label>
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
                    <label className="form-label">Font Size</label>
                    <select className="form-select">
                      <option value="small">Small</option>
                      <option value="medium" selected>
                        Medium
                      </option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Compact Mode</label>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reduce Animations</label>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings Section */}
            <div className="settings-section fade-in">
              <h3 className="section-title">Notification Settings</h3>

              <div className="settings-grid">
                <div>
                  <h4>Email Notifications</h4>
                  <div className="form-group">
                    <label className="form-label">New user registration</label>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Course enrollment alerts
                    </label>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Revenue reports</label>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4>In-App Notifications</h4>
                  <div className="form-group">
                    <label className="form-label">System alerts</label>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Maintenance reminders</label>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weekly summary</label>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notification Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="notifications@academyhub.com"
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="settings-section fade-in">
              <h3 className="section-title">Account Security</h3>

              <div className="settings-grid">
                <div>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label className="form-label">
                      Two-Factor Authentication
                    </label>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Login Notifications</label>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      defaultValue="30"
                      min="5"
                      max="1440"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="actions fade-in">
              <button className="btn btn-primary" onClick={saveSettings}>
                <i className="fas fa-save me-1"></i> Save Changes
              </button>
              <button className="btn btn-secondary" onClick={resetSettings}>
                <i className="fas fa-undo me-1"></i> Reset to Default
              </button>
              <button className="btn btn-danger" onClick={deleteAccount}>
                <i className="fas fa-trash me-1"></i> Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ManagerSettings;
