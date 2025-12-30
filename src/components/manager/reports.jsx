import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ManagerReports = () => {
  // Sidebar state - match GradesPage structure
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Reports data state
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "System Issue",
      category: "System",
      description: "Server downtime observed during peak hours.",
      priority: "High",
      date: "2025-11-03",
      status: "Reviewed",
      feedback: "Issue resolved, monitoring ongoing.",
    },
    {
      id: 2,
      title: "Student Complaint",
      category: "Student",
      description: "Complaint about online class scheduling.",
      priority: "Medium",
      date: "2025-11-02",
      status: "Pending",
      feedback: "",
    },
    {
      id: 3,
      title: "Teacher Request",
      category: "Teacher",
      description: "Request for additional teaching resources.",
      priority: "Low",
      date: "2025-11-01",
      status: "Reviewed",
      feedback: "Resources approved and allocated.",
    },
    {
      id: 4,
      title: "Website Bug",
      category: "System",
      description: "Login page not loading properly on mobile.",
      priority: "High",
      date: "2025-10-30",
      status: "Pending",
      feedback: "",
    },
  ]);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
  });

  // Summary calculations
  const totalReports = reports.length;
  const pendingFeedback = reports.filter((r) => r.status === "Pending").length;
  const reviewedReports = reports.filter((r) => r.status === "Reviewed").length;

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

  // Menu items - updated with Link components like GradesPage
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
    {
      icon: "fas fa-chart-line",
      label: "Reports",
      link: "/reports",
      active: true,
    },
    { icon: "fas fa-cog", label: "Settings", link: "/settings" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  // Form input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Show/hide form
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      // Reset form when hiding
      setFormData({
        title: "",
        category: "",
        priority: "",
        description: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.priority ||
      !formData.description
    ) {
      showToast("Please fill in all fields!", "warning");
      return;
    }

    const newReport = {
      id: reports.length > 0 ? Math.max(...reports.map((r) => r.id)) + 1 : 1,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      priority: formData.priority,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      feedback: "",
    };

    setReports([...reports, newReport]);
    setShowForm(false);
    setFormData({
      title: "",
      category: "",
      priority: "",
      description: "",
    });

    showToast("Report added successfully!", "success");
  };

  // Delete report
  const handleDeleteReport = (id) => {
    const report = reports.find((r) => r.id === id);
    if (
      report &&
      window.confirm(`Are you sure you want to delete "${report.title}"?`)
    ) {
      setReports(reports.filter((r) => r.id !== id));
      showToast(`Report "${report.title}" has been deleted.`, "warning");
    }
  };

  // Show toast notification - matches GradesPage style
  const showToast = (message, type = "info") => {
    const toastEl = document.createElement("div");
    toastEl.className = `toast-notification ${type}`;
    toastEl.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "warning"
            ? "exclamation-triangle"
            : "info-circle"
        }"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toastEl);

    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  };

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
        .reports-page {
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

        /* KPI Grid - Mobile First */
        .kpi-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin: 0 0 1.5rem 0;
          width: 100%;
          max-width: 100%;
        }
        
        .dashboard-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 1rem;
          box-shadow: var(--shadow);
          transition: transform 0.2s;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
          box-sizing: border-box;
        }
        
        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          background: linear-gradient(135deg, var(--primary-color), #1a237e);
          padding: 12px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }
        
        .card-icon i {
          font-size: 20px;
          color: #fff;
        }
        
        .card-label {
          font-size: 13px;
          color: var(--gray-text);
          margin: 0 0 4px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: center;
        }
        
        .card-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--dark-text);
          margin: 0;
          line-height: 1;
        }

        /* Reports Section - Mobile First */
        .reports-section {
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
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .section-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0;
        }
        
        /* Add Report Form - Mobile First */
        .add-report-form {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          border: 1px solid var(--border);
          display: none;
        }
        
        .add-report-form.show {
          display: block;
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
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
        
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--dark-text);
          margin-bottom: 0.5rem;
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 100px;
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
        
        .btn-success {
          background: #10b981;
          color: white;
        }
        
        .btn-success:hover {
          background: #0da271;
          transform: translateY(-2px);
        }
        
        .btn-sm {
          padding: 0.5rem 0.875rem;
          font-size: 13px;
        }

        /* Reports Table - Mobile First */
        .reports-table-container {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          margin: 0 0 1.5rem 0;
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .table thead {
          background: #f8f9fa;
        }
        
        .table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--dark-text);
          font-size: 0.85rem;
          border-bottom: 1px solid var(--border);
          display: none;
        }
        
        .table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border);
          display: block;
          text-align: right;
          position: relative;
          padding-left: 50%;
        }
        
        .table td:before {
          content: attr(data-label);
          position: absolute;
          left: 1rem;
          width: calc(50% - 2rem);
          padding-right: 0.5rem;
          text-align: left;
          font-weight: 600;
          color: var(--dark-text);
        }
        
        .table tr:last-child td {
          border-bottom: none;
        }
        
        .table tr {
          display: block;
          margin-bottom: 0.5rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.5rem;
          background: white;
        }
        
        .table tbody tr {
          margin-bottom: 0.5rem;
        }
        
        /* Status badges */
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }
        
        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }
        
        .status-badge.reviewed {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        /* Priority badges */
        .priority-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
        }
        
        .priority-badge.low {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .priority-badge.medium {
          background: #fff3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }
        
        .priority-badge.high {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        
        .action-btn {
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          justify-content: center;
          border: 1px solid;
          background: transparent;
          min-width: 60px;
        }
        
        .delete-btn {
          border-color: #ef4444;
          color: #ef4444;
        }
        
        .delete-btn:hover {
          background: #ef4444;
          color: white;
        }

        /* Category badges */
        .category-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-block;
          background: #e0e7ff;
          color: #3730a3;
          border: 1px solid #c7d2fe;
        }
        
        /* Feedback text */
        .feedback-text {
          color: var(--gray-text);
          font-size: 0.875rem;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .table td .feedback-text {
          white-space: nowrap;
          max-width: 100%;
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
          
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .welcome p {
            display: block;
          }
          
          .card-icon {
            width: 56px;
            height: 56px;
          }
          
          .card-icon i {
            font-size: 24px;
          }
          
          .card-label {
            font-size: 14px;
          }
          
          .card-value {
            font-size: 28px;
          }
          
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .table td {
            display: table-cell;
            text-align: left;
            padding-left: 1rem;
          }
          
          .table td:before {
            display: none;
          }
          
          .table th {
            display: table-cell;
          }
          
          .table tr {
            display: table-row;
            margin-bottom: 0;
            border: none;
            border-radius: 0;
            padding: 0;
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
          
          .dashboard-card {
            padding: 1.25rem;
          }
          
          .form-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .table th, .table td {
            padding: 1rem;
          }
          
          .section-header {
            flex-wrap: nowrap;
          }
          
          .section-header h3 {
            font-size: 1.25rem;
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
          
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
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
          
          .kpi-grid {
            gap: 0.5rem;
          }
          
          .dashboard-card {
            padding: 0.75rem;
            gap: 8px;
          }
          
          .card-icon {
            padding: 8px;
            width: 40px;
            height: 40px;
          }
          
          .card-icon i {
            font-size: 16px;
          }
          
          .card-value {
            font-size: 20px;
          }
          
          .card-label {
            font-size: 12px;
          }
          
          .reports-section {
            padding: 0.75rem;
          }
          
          .table td {
            padding: 0.75rem;
            padding-left: 50%;
          }
          
          .table td:before {
            left: 0.75rem;
          }
          
          .status-badge, .priority-badge, .category-badge {
            font-size: 0.7rem;
            padding: 0.2rem 0.5rem;
          }
          
          .action-btn {
            padding: 0.3rem 0.5rem;
            font-size: 11px;
            min-width: 50px;
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
          
          .dashboard-card {
            flex-direction: row;
            text-align: left;
            align-items: center;
            gap: 0.75rem;
          }
          
          .card-icon {
            flex-shrink: 0;
          }
          
          .card-info {
            flex: 1;
            min-width: 0;
          }
          
          .card-label {
            text-align: left;
          }
          
          .action-buttons {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .action-btn {
            width: 100%;
          }
          
          .section-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .section-header .btn {
            align-self: flex-end;
          }
          
          .table td {
            padding: 0.5rem;
            padding-left: 50%;
          }
          
          .table td:before {
            left: 0.5rem;
            font-size: 0.8rem;
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
          
          .content-area, .reports-section, .reports-table-container {
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

      <div className="reports-page">
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
                    <span className="d-none d-sm-inline">Manager Reports</span>
                    <span className="d-inline d-sm-none">Reports</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Track, raise and manage every academy report.
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
            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Reports</h3>
                  <p className="card-value">{totalReports}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Pending Feedback</h3>
                  <p className="card-value">{pendingFeedback}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Reviewed Reports</h3>
                  <p className="card-value">{reviewedReports}</p>
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="reports-section fade-in">
              <div className="section-header">
                <h3>All Reports</h3>
                <button
                  className={`btn btn-sm ${
                    showForm ? "btn-secondary" : "btn-primary"
                  }`}
                  onClick={toggleForm}
                >
                  <i
                    className={`fas fa-${showForm ? "times" : "plus"} me-1`}
                  ></i>
                  {showForm ? "Cancel" : "Add Report"}
                </button>
              </div>

              {/* Add Report Form */}
              <div className={`add-report-form ${showForm ? "show" : ""}`}>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div>
                      <label className="form-label">Report Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Report Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="System">System</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        id="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={new Date().toISOString().split("T")[0]}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Report Description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={toggleForm}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      <i className="fas fa-check me-1"></i> Save Report
                    </button>
                  </div>
                </form>
              </div>

              {/* Reports Table */}
              <div className="reports-table-container fade-in">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Admin Feedback</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td data-label="ID">{report.id}</td>
                        <td data-label="Title">
                          <strong>{report.title}</strong>
                        </td>
                        <td data-label="Category">
                          <span className="category-badge">
                            {report.category}
                          </span>
                        </td>
                        <td data-label="Description">{report.description}</td>
                        <td data-label="Priority">
                          <span
                            className={`priority-badge ${report.priority.toLowerCase()}`}
                          >
                            {report.priority}
                          </span>
                        </td>
                        <td data-label="Date">{report.date}</td>
                        <td data-label="Status">
                          <span
                            className={`status-badge ${report.status.toLowerCase()}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td data-label="Admin Feedback">
                          <div className="feedback-text">
                            {report.feedback || (
                              <span className="text-muted fst-italic">
                                Waiting for admin feedback...
                              </span>
                            )}
                          </div>
                        </td>
                        <td data-label="Actions">
                          <div className="action-buttons">
                            <button
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reports.length === 0 && (
                  <div className="text-center py-4 text-muted">
                    No reports found. Add your first report!
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ManagerReports;
