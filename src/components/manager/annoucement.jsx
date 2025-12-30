import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AnnouncementsPage = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Announcements state
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to New Semester",
      content:
        "Classes start on 15 Jan 2025. Check your dashboards for timetables.",
      audience: "All",
      priority: "Normal",
      date: "2025-01-10",
      expiry: "2025-01-20",
      pinned: true,
    },
    {
      id: 2,
      title: "System Maintenance",
      content:
        "The platform will be offline tonight 02:00-04:00 AM for upgrades.",
      audience: "All",
      priority: "High",
      date: "2025-01-08",
      expiry: "2025-01-09",
      pinned: false,
    },
    {
      id: 3,
      title: "Teacher Training Workshop",
      content: "Mandatory workshop for all teaching staff on 20 Jan.",
      audience: "Teachers",
      priority: "Normal",
      date: "2025-01-05",
      expiry: "2025-01-19",
      pinned: false,
    },
    {
      id: 4,
      title: "Holiday Announcement",
      content: "College will be closed on 26th Jan for Republic Day.",
      audience: "All",
      priority: "Normal",
      date: "2025-01-15",
      expiry: "2025-01-26",
      pinned: true,
    },
    {
      id: 5,
      title: "Library Renovation",
      content: "Main library will be closed for renovation from Feb 1-10.",
      audience: "Students",
      priority: "High",
      date: "2025-01-12",
      expiry: "2025-01-31",
      pinned: false,
    },
    {
      id: 6,
      title: "Sports Day Preparations",
      content: "All students are invited to participate in sports trials.",
      audience: "Students",
      priority: "Normal",
      date: "2025-01-03",
      expiry: "2025-01-25",
      pinned: false,
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    audience: "all",
    status: "all",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    audience: "All",
    priority: "Normal",
    expiry: "",
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

  const today = () => new Date().toISOString().slice(0, 10);
  const isExpired = (expiryDate) => expiryDate && expiryDate < today();
  const isActive = (ann) => !isExpired(ann.expiry);

  // KPI counts
  const totalPosts = announcements.length;
  const activePosts = announcements.filter(isActive).length;
  const pinnedPosts = announcements.filter((a) => a.pinned).length;
  const expiredPosts = announcements.filter((a) => !isActive(a)).length;

  // Filtered announcements
  const filteredAnnouncements = announcements
    .filter((ann) => {
      if (filters.audience !== "all" && ann.audience !== filters.audience)
        return false;

      if (filters.status === "pinned" && !ann.pinned) return false;
      if (filters.status === "active" && !isActive(ann)) return false;
      if (filters.status === "expired" && isActive(ann)) return false;

      if (
        filters.search &&
        !ann.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !ann.content.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      return true;
    })
    .sort((a, b) => b.pinned - a.pinned || new Date(b.date) - new Date(a.date));

  const openModal = (id = null) => {
    if (id) {
      const ann = announcements.find((a) => a.id === id);
      setForm({
        title: ann.title,
        content: ann.content,
        audience: ann.audience,
        priority: ann.priority,
        expiry: ann.expiry || "",
      });
      setEditingId(id);
    } else {
      setForm({
        title: "",
        content: "",
        audience: "All",
        priority: "Normal",
        expiry: "",
      });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveAnnouncement = () => {
    if (!form.title.trim() || !form.content.trim()) {
      showToast("Title and content are required.", "warning");
      return;
    }

    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, ...form, expiry: form.expiry || null }
            : a
        )
      );
      showToast("Announcement updated successfully!", "success");
    } else {
      setAnnouncements((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          date: today(),
          expiry: form.expiry || null,
          pinned: false,
        },
      ]);
      showToast("Announcement created successfully!", "success");
    }
    closeModal();
  };

  const deleteAnnouncement = (id) => {
    const announcement = announcements.find((a) => a.id === id);
    if (
      announcement &&
      window.confirm(`Are you sure you want to delete "${announcement.title}"?`)
    ) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      showToast(`"${announcement.title}" has been deleted.`, "warning");
    }
  };

  const togglePin = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
    const ann = announcements.find((a) => a.id === id);
    showToast(
      `"${ann.title}" ${ann.pinned ? "unpinned" : "pinned"}.`,
      ann.pinned ? "info" : "success"
    );
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
      active: true,
    },
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

  const audiences = [...new Set(announcements.map((a) => a.audience))];

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
        .announcements-page {
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
        
        .search-btn, .new-announcement-btn {
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
        
        .search-btn:hover, .new-announcement-btn:hover {
          background: #151c65;
          transform: translateY(-2px);
        }

        /* Announcements Grid - Mobile First */
        .announcements-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 0 0 1.5rem 0;
          width: 100%;
        }
        
        .announcement-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s;
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
          box-sizing: border-box;
          padding: 1rem;
        }
        
        .announcement-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        .announcement-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        
        .announcement-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70%;
        }
        
        .announcement-badges {
          display: flex;
          gap: 0.25rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        
        .badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
        }
        
        .badge-pinned {
          background: #fef3c7;
          color: #d97706;
        }
        
        .badge-expired {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .badge-audience {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .badge-priority {
          padding: 0.25rem 0.75rem;
        }
        
        .badge-normal {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .badge-high {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .badge-urgent {
          background: #450a0a;
          color: #fff;
        }
        
        .announcement-info {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 0 0 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .announcement-content {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0 0 1rem 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .announcement-meta {
          font-size: 0.8rem;
          color: var(--gray-text);
          margin: 0 0 1rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .announcement-actions {
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
        
        .pin-btn {
          border-color: #f59e0b;
          color: #f59e0b;
        }
        
        .pin-btn:hover {
          background: #f59e0b;
          color: white;
        }
        
        .pin-btn.pinned {
          background: #f59e0b;
          color: white;
        }
        
        .edit-btn {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
        
        .edit-btn:hover {
          background: var(--primary-color);
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

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .modal-content {
          background: white;
          border-radius: var(--radius);
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
          padding: 1.5rem 1.5rem 0.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-body {
          padding: 1.5rem;
        }
        
        .modal-footer {
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: var(--gray-text);
          padding: 0.25rem;
          border-radius: 4px;
        }
        
        .modal-close:hover {
          background: #f8f9fa;
          color: var(--dark-text);
        }
        
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--dark-text);
          margin-bottom: 0.5rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.3s;
          font-size: 14px;
        }
        
        .btn-primary {
          background: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background: #151c65;
        }
        
        .btn-secondary {
          background: #6c757d;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #5a6268;
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
          
          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .announcements-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
          }
          
          .dashboard-card {
            padding: 1.25rem;
          }
          
          .filter-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .announcements-grid {
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
          
          .announcements-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ========== LARGE DESKTOP (≥1200px) ========== */
        @media (min-width: 1200px) {
          .main-content {
            padding: 1rem 2rem;
          }
          
          .announcements-grid {
            grid-template-columns: repeat(3, 1fr);
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
          
          .announcements-grid {
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
          
          .filter-section {
            padding: 0.75rem;
          }
          
          .announcement-card {
            padding: 0.75rem;
          }
          
          .announcement-title {
            font-size: 0.9rem;
          }
          
          .announcement-content {
            font-size: 0.85rem;
          }
          
          .announcement-info {
            font-size: 0.8rem;
          }
          
          .badge {
            font-size: 0.65rem;
            padding: 0.2rem 0.4rem;
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
          
          .announcement-badges {
            flex-direction: column;
            align-items: flex-end;
            gap: 0.125rem;
          }
          
          .announcement-actions {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .action-btn {
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
          
          .content-area, .filter-section, .announcements-grid {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .announcements-grid {
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

      <div className="announcements-page">
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
                      Announcements Dashboard
                    </span>
                    <span className="d-inline d-sm-none">Announcements</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Create, publish and manage academy-wide announcements.
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
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Posts</h3>
                  <p className="card-value">{totalPosts}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Active</h3>
                  <p className="card-value">{activePosts}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-thumbtack"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Pinned</h3>
                  <p className="card-value">{pinnedPosts}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Expired</h3>
                  <p className="card-value">{expiredPosts}</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="filter-section fade-in">
              <div className="filter-grid">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title or content..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
                <select
                  className="form-select"
                  value={filters.audience}
                  onChange={(e) =>
                    setFilters({ ...filters, audience: e.target.value })
                  }
                >
                  <option value="all">All Audiences</option>
                  {audiences.map((aud) => (
                    <option key={aud} value={aud}>
                      {aud}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pinned">Pinned</option>
                  <option value="expired">Expired</option>
                </select>
                <button
                  className="new-announcement-btn"
                  onClick={() => openModal()}
                >
                  <i className="fas fa-plus"></i> New Announcement
                </button>
              </div>
            </div>

            {/* Announcements Grid */}
            <div className="announcements-grid">
              {filteredAnnouncements.map((announcement) => (
                <div
                  className="announcement-card fade-in"
                  key={announcement.id}
                >
                  <div className="announcement-header">
                    <h3 className="announcement-title">{announcement.title}</h3>
                    <div className="announcement-badges">
                      {announcement.pinned && (
                        <span className="badge badge-pinned">Pinned</span>
                      )}
                      {!isActive(announcement) && (
                        <span className="badge badge-expired">Expired</span>
                      )}
                      <span
                        className={`badge badge-priority badge-${announcement.priority.toLowerCase()}`}
                      >
                        {announcement.priority}
                      </span>
                    </div>
                  </div>
                  <div className="announcement-info">
                    <span>
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {announcement.date}
                    </span>
                    <span className="badge badge-audience">
                      <i className="fas fa-users"></i> {announcement.audience}
                    </span>
                  </div>
                  <p className="announcement-content">{announcement.content}</p>
                  <div className="announcement-meta">
                    <span>
                      {announcement.expiry
                        ? `Expires: ${announcement.expiry}`
                        : "No expiry date"}
                    </span>
                  </div>
                  <div className="announcement-actions">
                    <button
                      className={`action-btn pin-btn ${
                        announcement.pinned ? "pinned" : ""
                      }`}
                      onClick={() => togglePin(announcement.id)}
                      title={announcement.pinned ? "Unpin" : "Pin"}
                    >
                      <i className="fas fa-thumbtack"></i>{" "}
                      {announcement.pinned ? "Unpin" : "Pin"}
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => openModal(announcement.id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => deleteAnnouncement(announcement.id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Modal */}
        {modalOpen && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="h4 mb-0">
                  {editingId ? "Edit Announcement" : "New Announcement"}
                </h2>
                <button
                  className="modal-close"
                  onClick={() => setModalOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Semester Start Date"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Content *</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Detailed message..."
                      value={form.content}
                      onChange={(e) =>
                        setForm({ ...form, content: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Audience</label>
                    <select
                      className="form-select"
                      value={form.audience}
                      onChange={(e) =>
                        setForm({ ...form, audience: e.target.value })
                      }
                    >
                      <option value="All">All Users</option>
                      <option value="Students">Students Only</option>
                      <option value="Teachers">Teachers Only</option>
                      <option value="Managers">Managers Only</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={form.priority}
                      onChange={(e) =>
                        setForm({ ...form, priority: e.target.value })
                      }
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Expiry Date (optional)</label>
                    <input
                      type="date"
                      className="form-control"
                      value={form.expiry}
                      onChange={(e) =>
                        setForm({ ...form, expiry: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveAnnouncement}>
                  {editingId ? "Update Announcement" : "Create Announcement"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnnouncementsPage;
