import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentsPage = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      dept: "Computer Science",
      course: "Self-Paced",
      status: "active",
      email: "john@academy.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Jane Smith",
      dept: "Business",
      course: "Teacher-Led",
      status: "graduated",
      email: "jane@academy.com",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Alice Green",
      dept: "Computer Science",
      course: "Self-Paced",
      status: "pending",
      email: "alice@academy.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Bob White",
      dept: "Design",
      course: "Teacher-Led",
      status: "inactive",
      email: "bob@academy.com",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Michael Brown",
      dept: "Business",
      course: "Self-Paced",
      status: "active",
      email: "michael@academy.com",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Lucy Gray",
      dept: "Design",
      course: "Teacher-Led",
      status: "graduated",
      email: "lucy@academy.com",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: 7,
      name: "Sarah Johnson",
      dept: "Computer Science",
      course: "Teacher-Led",
      status: "active",
      email: "sarah@academy.com",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 8,
      name: "Tom Wilson",
      dept: "Business",
      course: "Self-Paced",
      status: "pending",
      email: "tom@academy.com",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  ]);

  const [filters, setFilters] = useState({
    activeTab: "all",
    status: "all",
    course: "all",
    search: "",
  });

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

  const handleTabChange = (tabId) => {
    setFilters((prev) => ({
      ...prev,
      activeTab: tabId,
    }));
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleViewStudent = (id) => {
    // In a real app, this would navigate to student detail page
    console.log(`Viewing student with ID: ${id}`);
    showToast(`Viewing details for student`, "info");
  };

  const handleApproveStudent = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: "active" } : student
      )
    );
    const studentName = students.find((s) => s.id === id)?.name || "Student";
    showToast(`${studentName} has been approved!`, "success");
  };

  const handleDeleteStudent = (id) => {
    const student = students.find((s) => s.id === id);
    if (
      student &&
      window.confirm(`Are you sure you want to delete ${student.name}?`)
    ) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`${student.name} has been deleted.`, "warning");
    }
  };

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

  const filteredStudents = students.filter((student) => {
    if (filters.activeTab === "pending" && student.status !== "pending")
      return false;
    if (
      filters.activeTab === "selfpaced" &&
      student.course.toLowerCase() !== "self-paced"
    )
      return false;
    if (
      filters.activeTab === "teacherled" &&
      student.course.toLowerCase() !== "teacher-led"
    )
      return false;

    if (filters.status !== "all" && student.status !== filters.status)
      return false;

    if (
      filters.course !== "all" &&
      student.course.toLowerCase().replace("-", "") !== filters.course
    )
      return false;

    if (
      filters.search &&
      !student.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !student.email.toLowerCase().includes(filters.search.toLowerCase()) &&
      !student.dept.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    return true;
  });

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const inactiveStudents = students.filter(
    (s) => s.status === "inactive"
  ).length;
  const graduatedStudents = students.filter(
    (s) => s.status === "graduated"
  ).length;
  const pendingStudents = students.filter((s) => s.status === "pending").length;

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/heads" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    {
      icon: "fas fa-user-graduate",
      label: "Students",
      link: "/students",
      active: true,
    },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    { icon: "fas fa-bullhorn", label: "Announcements", link: "/announcements" },
    {
      icon: "fas fa-certificate",
      label: "Certificates",
      link: "/certificates",
    },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "/analytics" },
    { icon: "fas fa-chart-line", label: "Reports", link: "/reports" },
    { icon: "fas fa-cog", label: "Settings", link: "/settings" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
  ];

  const tabs = [
    { id: "all", label: "All Students" },
    { id: "pending", label: "Pending" },
    { id: "selfpaced", label: "Self-Paced" },
    { id: "teacherled", label: "Teacher-Led" },
  ];

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
        .students-page {
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

        /* Tabs - Mobile First */
        .tabs-container {
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
        
        .tabs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .tab-btn {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: transparent;
          color: var(--gray-text);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          width: 100%;
        }
        
        .tab-btn.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        .tab-btn:hover:not(.active) {
          background: #f8fafc;
          border-color: var(--accent);
        }

        /* Filter Section - Mobile First */
        .filter-section {
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
        
        .filter-grid {
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
        
        .search-btn {
          background: var(--primary-color);
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius);
          color: white;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
        }
        
        .search-btn:hover {
          background: #151c65;
          transform: translateY(-2px);
        }

        /* Students Grid - Mobile First */
        .students-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 0 0 1.5rem 0;
          width: 100%;
        }
        
        .student-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s;
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
          box-sizing: border-box;
        }
        
        .student-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        .student-avatar {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }
        
        .student-content {
          padding: 1rem;
        }
        
        .student-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0 0 0.5rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .student-info {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .student-email {
          font-size: 0.8rem;
          color: var(--gray-text);
          margin: 0 0 1rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
          margin: 0 0 1rem 0;
        }
        
        .status-active {
          background: #d1fae5;
          color: #065f46;
        }
        
        .status-inactive {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .status-graduated {
          background: #fef3c7;
          color: #d97706;
        }
        
        .status-pending {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .student-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .action-btn {
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          border: 1px solid;
          background: transparent;
          width: 100%;
          box-sizing: border-box;
        }
        
        .view-btn {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        
        .view-btn:hover {
          background: var(--primary-color);
          color: white;
        }
        
        .approve-btn {
          border-color: #10b981;
          color: #10b981;
        }
        
        .approve-btn:hover {
          background: #10b981;
          color: white;
        }
        
        .delete-btn {
          border-color: #ef4444;
          color: #ef4444;
        }
        
        .delete-btn:hover {
          background: #ef4444;
          color: white;
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

        /* Toast Notification */
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
          
          .tabs {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .tab-btn {
            width: auto;
            min-width: 120px;
          }
          
          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .students-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .student-actions {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .action-btn {
            width: auto;
            flex: 1;
            min-width: 70px;
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 1.25rem;
          }
          
          .dashboard-card {
            padding: 1.25rem;
          }
          
          .filter-grid {
            grid-template-columns: repeat(5, 1fr);
          }
          
          .students-grid {
            grid-template-columns: repeat(2, 1fr);
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
          
          .students-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ========== LARGE DESKTOP (≥1200px) ========== */
        @media (min-width: 1200px) {
          .main-content {
            padding: 1rem 2rem;
          }
          
          .students-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .content-area {
            max-width: 100%;
          }
        }

        /* ========== EXTRA LARGE DESKTOP (≥1400px) ========== */
        @media (min-width: 1400px) {
          .main-content {
            padding: 1.5rem 3rem;
          }
          
          .students-grid {
            grid-template-columns: repeat(4, 1fr);
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
          
          .tabs-container {
            padding: 0.75rem;
          }
          
          .filter-section {
            padding: 0.75rem;
          }
          
          .student-avatar {
            height: 140px;
          }
          
          .student-content {
            padding: 0.75rem;
          }
          
          .student-name {
            font-size: 0.9rem;
          }
          
          .student-info {
            font-size: 0.8rem;
          }
          
          .student-email {
            font-size: 0.75rem;
          }
          
          .status-badge {
            font-size: 0.7rem;
          }
          
          .action-btn {
            padding: 0.4rem 0.6rem;
            font-size: 11px;
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
          
          .tab-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
          }
          
          .student-avatar {
            height: 120px;
          }
          
          .student-name {
            font-size: 0.85rem;
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
          
          .content-area, .tabs-container, .filter-section, .students-grid {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .students-grid {
            gap: 0.75rem;
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

      <div className="students-page">
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
                    <span className="d-none d-sm-inline">
                      Student Dashboard
                    </span>
                    <span className="d-inline d-sm-none">Students</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Browse, filter and manage every student in the academy.
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
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Students</h3>
                  <p className="card-value">{totalStudents}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Active</h3>
                  <p className="card-value">{activeStudents}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-user-times"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Inactive</h3>
                  <p className="card-value">{inactiveStudents}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Graduated</h3>
                  <p className="card-value">{graduatedStudents}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-hourglass-half"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Pending</h3>
                  <p className="card-value">{pendingStudents}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container fade-in">
              <div className="tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${
                      filters.activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="filter-section fade-in">
              <div className="filter-grid">
                <select
                  className="form-select"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="graduated">Graduated</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  className="form-select"
                  value={filters.course}
                  onChange={(e) => handleFilterChange("course", e.target.value)}
                >
                  <option value="all">All Courses</option>
                  <option value="selfpaced">Self-Paced</option>
                  <option value="teacherled">Teacher-Led</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, department..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                <button className="search-btn" onClick={() => {}}>
                  <i className="fas fa-search"></i> Search
                </button>
              </div>
            </div>

            {/* Students Grid */}
            <div className="students-grid">
              {filteredStudents.map((student) => (
                <div className="student-card fade-in" key={student.id}>
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="student-avatar"
                  />
                  <div className="student-content">
                    <h3 className="student-name">{student.name}</h3>
                    <p className="student-info">
                      <i className="fas fa-building me-1"></i>
                      {student.dept} | {student.course}
                    </p>
                    <p className="student-email">
                      <i className="fas fa-envelope me-1"></i>
                      {student.email}
                    </p>
                    <span className={`status-badge status-${student.status}`}>
                      {student.status.charAt(0).toUpperCase() +
                        student.status.slice(1)}
                    </span>
                    <div className="student-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewStudent(student.id)}
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                      {student.status === "pending" && (
                        <button
                          className="action-btn approve-btn"
                          onClick={() => handleApproveStudent(student.id)}
                        >
                          <i className="fas fa-check"></i> Approve
                        </button>
                      )}
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentsPage;
