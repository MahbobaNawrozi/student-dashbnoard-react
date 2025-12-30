import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TeachersPage = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@academy.com",
      course: "Web Development",
      department: "IT",
      category: "Frontend",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@academy.com",
      course: "Graphic Design",
      department: "Design",
      category: "Visual",
      status: "Approved",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Carol Lee",
      email: "carol@academy.com",
      course: "UI/UX Design",
      department: "Design",
      category: "UX",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@academy.com",
      course: "Python Programming",
      department: "IT",
      category: "Backend",
      status: "Rejected",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma@academy.com",
      course: "Data Science",
      department: "IT",
      category: "Analytics",
      status: "Approved",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Frank Miller",
      email: "frank@academy.com",
      course: "Mobile Development",
      department: "IT",
      category: "Mobile",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
  ]);

  const [filters, setFilters] = useState({
    activeFilter: "All",
    searchQuery: "",
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

  const handleFilterChange = (filterId) => {
    setFilters((prev) => ({
      ...prev,
      activeFilter: filterId,
    }));
  };

  const handleApproveTeacher = (id) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === id ? { ...teacher, status: "Approved" } : teacher
      )
    );
    showToast("Teacher approved successfully!", "success");
  };

  const handleRejectTeacher = (id) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === id ? { ...teacher, status: "Rejected" } : teacher
      )
    );
    showToast("Teacher rejected.", "warning");
  };

  const showToast = (message, type = "info") => {
    // Create toast element
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

    // Remove after 3 seconds
    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    if (
      filters.activeFilter !== "All" &&
      teacher.status !== filters.activeFilter
    ) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        teacher.name.toLowerCase().includes(query) ||
        teacher.email.toLowerCase().includes(query) ||
        teacher.course.toLowerCase().includes(query) ||
        teacher.department.toLowerCase().includes(query) ||
        teacher.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const totalTeachers = teachers.length;
  const pendingApprovals = teachers.filter(
    (t) => t.status === "Pending"
  ).length;
  const activeTeachers = teachers.filter((t) => t.status === "Approved").length;

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/heads" },
    {
      icon: "fas fa-chalkboard-teacher",
      label: "Teachers",
      link: "/teachers",
      active: true,
    },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
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

  const filterButtons = [
    { id: "All", label: "All", variant: "primary" },
    { id: "Pending", label: "Pending", variant: "warning" },
    { id: "Approved", label: "Approved", variant: "success" },
    { id: "Rejected", label: "Rejected", variant: "danger" },
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
        .teachers-page {
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
        
        .search-bar {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0 0 1rem 0;
        }
        
        .search-input {
          position: relative;
          width: 100%;
        }
        
        .search-input i {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-text);
        }
        
        .search-input input {
          padding: 0.75rem 0.75rem 0.75rem 3rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          background: #fff;
          color: var(--text);
        }
        
        .search-input input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
        }
        
        .filter-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .filter-btn {
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          border: 1px solid;
          background: transparent;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          text-align: center;
        }
        
        .filter-btn.active {
          color: white;
        }
        
        .filter-btn-primary {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        
        .filter-btn-primary.active {
          background: var(--primary-color);
        }
        
        .filter-btn-warning {
          border-color: #f59e0b;
          color: #f59e0b;
        }
        
        .filter-btn-warning.active {
          background: #f59e0b;
        }
        
        .filter-btn-success {
          border-color: #10b981;
          color: #10b981;
        }
        
        .filter-btn-success.active {
          background: #10b981;
        }
        
        .filter-btn-danger {
          border-color: #ef4444;
          color: #ef4444;
        }
        
        .filter-btn-danger.active {
          background: #ef4444;
        }

        /* Teachers Table - Mobile First */
        .data-section {
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
          font-size: 16px;
          color: var(--dark-text);
          margin: 0 0 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .section-title i {
          color: var(--primary-color);
        }
        
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          width: 100%;
          max-width: 100%;
          -webkit-overflow-scrolling: touch;
          background: #fff;
          box-sizing: border-box;
        }
        
        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
          background: #fff;
        }
        
        .table th,
        .table td {
          padding: 0.75rem 0.5rem;
          text-align: left;
          font-size: 13px;
          background: #fff;
          box-sizing: border-box;
        }
        
        .table th {
          background: #f8fafc;
          font-weight: 600;
          color: var(--dark-text);
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
        }
        
        .table td {
          border-bottom: 1px solid #e2e8f0;
          color: var(--gray-text);
          vertical-align: middle;
        }
        
        .table tbody tr:hover {
          background-color: #f9fafb;
        }
        
        .table tbody tr:last-child td {
          border-bottom: none;
        }
        
        .teacher-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f8f9fa;
          margin-right: 0.5rem;
        }
        
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
        }
        
        .status-pending {
          background: #fef3c7;
          color: #d97706;
        }
        
        .status-approved {
          background: #d1fae5;
          color: #065f46;
        }
        
        .status-rejected {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 150px;
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
          border: none;
          width: 100%;
          box-sizing: border-box;
        }
        
        .action-btn-details {
          background: var(--primary-color);
          color: white;
        }
        
        .action-btn-details:hover {
          background: #151c65;
          transform: translateY(-2px);
        }
        
        .action-btn-approve {
          background: #10b981;
          color: white;
        }
        
        .action-btn-approve:hover {
          background: #059669;
          transform: translateY(-2px);
        }
        
        .action-btn-reject {
          background: #ef4444;
          color: white;
        }
        
        .action-btn-reject:hover {
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
            grid-template-columns: repeat(3, 1fr);
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
          
          .search-bar {
            flex-direction: row;
            align-items: center;
          }
          
          .search-input {
            flex: 1;
          }
          
          .filter-buttons {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .filter-btn {
            width: auto;
            min-width: 80px;
          }
          
          .table th,
          .table td {
            padding: 0.75rem;
            font-size: 14px;
          }
          
          .action-buttons {
            flex-direction: row;
            gap: 0.5rem;
          }
          
          .action-btn {
            width: auto;
            min-width: 80px;
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .kpi-grid {
            gap: 1.25rem;
          }
          
          .dashboard-card {
            padding: 1.25rem;
          }
          
          .data-section {
            padding: 1.25rem;
          }
          
          .section-title {
            font-size: 18px;
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
          
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 0 0 2rem 0;
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
          
          .kpi-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
          
          .content-area {
            max-width: 100%;
          }
          
          .data-section {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 20px;
            margin: 0 0 1.25rem;
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
          
          .data-section {
            padding: 0.75rem;
          }
          
          .section-title {
            font-size: 15px;
          }
          
          .table th,
          .table td {
            padding: 0.5rem 0.5rem;
            font-size: 12px;
          }
          
          /* Responsive table for mobile */
          .table {
            display: block;
            min-width: unset;
          }
          
          .table thead {
            display: none;
          }
          
          .table tbody, .table tr, .table td {
            display: block;
            width: 100%;
          }
          
          .table tr {
            margin-bottom: 1rem;
            border: 1px solid #e2e8f0;
            border-radius: var(--radius);
            padding: 0.75rem;
          }
          
          .table td {
            text-align: right;
            padding: 0.5rem;
            border-bottom: 1px solid #f1f5f9;
          }
          
          .table td:last-child {
            border-bottom: none;
            text-align: center;
          }
          
          .table td::before {
            content: attr(data-label);
            float: left;
            font-weight: 600;
            color: var(--dark-text);
            text-transform: uppercase;
            font-size: 11px;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .action-btn {
            width: 100%;
            margin-bottom: 0.25rem;
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
          
          .search-bar {
            flex-direction: column;
          }
          
          .filter-buttons {
            flex-direction: column;
          }
          
          .filter-btn {
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
          
          .content-area, .data-section, .table-container, .table {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .table-container {
            margin-left: -0.5rem;
            margin-right: -0.5rem;
            width: calc(100% + 1rem) !important;
            max-width: calc(100% + 1rem) !important;
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

      <div className="teachers-page">
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
                      Teacher Dashboard
                    </span>
                    <span className="d-inline d-sm-none">Teachers</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Browse, filter and manage every teacher in the academy.
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
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Teachers</h3>
                  <p className="card-value">{totalTeachers}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-hourglass-half"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Pending Approvals</h3>
                  <p className="card-value">{pendingApprovals}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Active Teachers</h3>
                  <p className="card-value">{activeTeachers}</p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="filter-section fade-in">
              <div className="search-bar">
                <div className="search-input">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search by Name, Email, Course, Dept, Category"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        searchQuery: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="filter-buttons">
                  {filterButtons.map((button) => (
                    <button
                      key={button.id}
                      className={`filter-btn filter-btn-${button.variant} ${
                        filters.activeFilter === button.id ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange(button.id)}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Teachers Table */}
            <div className="data-section fade-in">
              <h3 className="section-title">
                <i className="fas fa-users"></i>
                All Teachers
              </h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Department</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td data-label="Name">
                            <div className="d-flex align-items-center">
                              <img
                                src={teacher.avatar}
                                alt={teacher.name}
                                className="teacher-avatar"
                              />
                              {teacher.name}
                            </div>
                          </td>
                          <td data-label="Email">{teacher.email}</td>
                          <td data-label="Course">{teacher.course}</td>
                          <td data-label="Department">{teacher.department}</td>
                          <td data-label="Category">{teacher.category}</td>
                          <td data-label="Status">
                            <span
                              className={`status-badge status-${teacher.status.toLowerCase()}`}
                            >
                              {teacher.status}
                            </span>
                          </td>
                          <td data-label="Actions">
                            <div className="action-buttons">
                              <Link
                                to={`/teacher/${teacher.id}`}
                                className="action-btn action-btn-details"
                              >
                                <i className="fas fa-eye me-1"></i> Details
                              </Link>
                              {teacher.status === "Pending" && (
                                <>
                                  <button
                                    className="action-btn action-btn-approve"
                                    onClick={() =>
                                      handleApproveTeacher(teacher.id)
                                    }
                                  >
                                    <i className="fas fa-check me-1"></i>{" "}
                                    Approve
                                  </button>
                                  <button
                                    className="action-btn action-btn-reject"
                                    onClick={() =>
                                      handleRejectTeacher(teacher.id)
                                    }
                                  >
                                    <i className="fas fa-times me-1"></i> Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          <i
                            className="fas fa-search mb-2"
                            style={{ fontSize: "2rem", color: "#ccc" }}
                          ></i>
                          <p className="text-muted mb-0">
                            No teachers found matching your criteria.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeachersPage;
