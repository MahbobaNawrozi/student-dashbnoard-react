import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ELearningDepartments = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [departments, setDepartments] = useState([
    {
      name: "Computer Science",
      head: "Dr. Alice Johnson",
      courses: 8,
      students: 220,
    },
    {
      name: "Business Administration",
      head: "Mr. Robert Green",
      courses: 5,
      students: 180,
    },
    { name: "Design", head: "Ms. Emma White", courses: 4, students: 120 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    head: "",
    courses: "",
    students: "",
  });

  const [summary, setSummary] = useState({
    totalDepts: 0,
    totalCourses: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    const totalDepts = departments.length;
    const totalCourses = departments.reduce(
      (sum, dept) => sum + dept.courses,
      0
    );
    const totalStudents = departments.reduce(
      (sum, dept) => sum + dept.students,
      0
    );

    setSummary({
      totalDepts,
      totalCourses,
      totalStudents,
    });
  }, [departments]);

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("dept", "").toLowerCase()]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.head.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newDept = {
      name: formData.name.trim(),
      head: formData.head.trim(),
      courses: parseInt(formData.courses) || 0,
      students: parseInt(formData.students) || 0,
    };

    if (editIndex !== null) {
      const updatedDepartments = [...departments];
      updatedDepartments[editIndex] = newDept;
      setDepartments(updatedDepartments);
    } else {
      setDepartments([...departments, newDept]);
    }

    setFormData({ name: "", head: "", courses: "", students: "" });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const dept = departments[index];
    setFormData({
      name: dept.name,
      head: dept.head,
      courses: dept.courses.toString(),
      students: dept.students.toString(),
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to remove this department?")) {
      const updatedDepartments = departments.filter((_, i) => i !== index);
      setDepartments(updatedDepartments);
    }
  };

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/dashboard" },
    {
      icon: "fas fa-layer-group",
      label: "Departments",
      link: "/departments",
      active: true,
    },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/head" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    { icon: "fas fa-certificate", label: "Certificates", link: "/certificate" },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "/analytic" },
    { icon: "fas fa-chart-line", label: "Reports", link: "/reports" },
    { icon: "fas fa-cog", label: "Settings", link: "/settings" },
    { icon: "fas fa-sign-out-alt", label: "Logout", link: "#" },
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
        .departments-page {
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

        /* Data Sections - Mobile First */
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .section-title i {
          color: var(--primary-color);
        }
        
        .button-bar {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 0 0 1rem 0;
          width: 100%;
        }
        
        .button-bar h3 {
          margin: 0;
          font-size: 18px;
          color: var(--dark-text);
        }
        
        .btn-primary {
          background: var(--primary-color);
          border: none;
          padding: 0.75rem 1rem;
          border-radius: var(--radius);
          color: white;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
          white-space: nowrap;
          box-sizing: border-box;
        }
        
        .btn-primary:hover {
          background: #151c65;
          transform: translateY(-2px);
        }

        /* Form Styles - Mobile First */
        .dept-form {
          background: #f8fafc;
          padding: 1rem;
          border-radius: var(--radius);
          margin: 0 0 1.5rem 0;
          border: 1px solid #e5e7eb;
          display: none;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          box-sizing: border-box;
        }
        
        .dept-form.show {
          display: flex;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }
        
        .form-control {
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
        
        .form-control:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
        }
        
        .form-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }
        
        .btn-success, .btn-secondary {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: var(--radius);
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          transition: all 0.3s;
          width: 100%;
          box-sizing: border-box;
        }
        
        .btn-success {
          background: #10b981;
          color: white;
        }
        
        .btn-success:hover {
          background: #059669;
        }
        
        .btn-secondary {
          background: #64748b;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #475569;
        }

        /* Table Styles - Mobile First */
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
        
        .text-center {
          text-align: center !important;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }
        
        .btn-sm {
          padding: 0.5rem 0.75rem;
          font-size: 12px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          width: 100%;
          justify-content: center;
          box-sizing: border-box;
          white-space: nowrap;
        }
        
        .btn-danger {
          background: #ef4444;
          color: white;
          border: none;
        }
        
        .btn-danger:hover {
          background: #dc2626;
          transform: translateY(-2px);
        }
        
        .btn-primary-sm {
          background: var(--primary-color);
          color: white;
          border: none;
        }
        
        .btn-primary-sm:hover {
          background: #151c65;
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
          
          .data-section {
            padding: 1.25rem;
          }
          
          .section-title {
            font-size: 18px;
          }
          
          .button-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          
          .btn-primary {
            width: auto;
            padding: 0.75rem 1.5rem;
          }
          
          .form-actions {
            flex-direction: row;
            gap: 0.75rem;
          }
          
          .btn-success, .btn-secondary {
            width: auto;
            min-width: 120px;
          }
          
          .action-buttons {
            flex-direction: row;
            gap: 0.5rem;
          }
          
          .btn-sm {
            width: auto;
            min-width: 80px;
          }
          
          .table th,
          .table td {
            padding: 0.75rem;
            font-size: 14px;
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
          
          .dept-form {
            padding: 1.5rem;
          }
          
          .form-group {
            flex-direction: row;
            gap: 1rem;
          }
          
          .form-group > * {
            flex: 1;
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
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

        /* ========== EXTRA LARGE DESKTOP (≥1400px) ========== */
        @media (min-width: 1400px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
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
          
          .btn-sm {
            padding: 0.4rem 0.8rem;
            font-size: 11px;
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
        }

        /* ========== VERY SMALL MOBILE (≤350px) ========== */
        @media (max-width: 350px) {
          .topbar-header {
            gap: 0.5rem;
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
          }
          
          .topbar-header h2 {
            font-size: 1rem;
          }
          
          .avatar-img {
            width: 32px;
            height: 32px;
          }
          
          .section-title {
            font-size: 14px;
          }
          
          .btn-primary {
            padding: 0.5rem 0.75rem;
            font-size: 13px;
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

      <div className="departments-page">
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
          <div className="sidebar-header">
            <span>E-Learn</span>
          </div>
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.link} className={item.active ? "active" : ""}>
                <a
                  href={item.link}
                  onClick={() =>
                    window.innerWidth <= 992 && setMobileOpen(false)
                  }
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </a>
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
                    <span className="d-none d-sm-inline">Departments</span>
                    <span className="d-inline d-sm-none">Departments</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Overview and management of every academy department.
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
                <a href="/managerProfile" className="d-inline-block">
                  <img
                    src="https://i.pravatar.cc/300?img=12"
                    alt="Manager Avatar"
                    className="avatar-img"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="content-area">
            {/* KPI Cards */}
            <div className="kpi-grid">
              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-layer-group"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Departments</h3>
                  <p className="card-value">{summary.totalDepts}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-book"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Courses</h3>
                  <p className="card-value">{summary.totalCourses}</p>
                </div>
              </div>

              <div className="dashboard-card fade-in">
                <div className="card-icon">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <div className="card-info">
                  <h3 className="card-label">Total Students</h3>
                  <p className="card-value">{summary.totalStudents}</p>
                </div>
              </div>
            </div>

            {/* Departments Section */}
            <div className="data-section fade-in">
              <div className="button-bar">
                <h3 className="section-title">
                  <i className="fas fa-building-columns"></i>
                  All Departments
                </h3>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowForm(!showForm)}
                >
                  <i className="fas fa-plus me-1"></i> Add Department
                </button>
              </div>

              {/* Department Form */}
              <form
                className={`dept-form ${showForm ? "show" : ""}`}
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="text"
                    id="deptName"
                    className="form-control"
                    placeholder="Department Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    id="deptHead"
                    className="form-control"
                    placeholder="Head of Department"
                    required
                    value={formData.head}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    id="deptCourses"
                    className="form-control"
                    placeholder="Courses"
                    required
                    value={formData.courses}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    id="deptStudents"
                    className="form-control"
                    placeholder="Students"
                    required
                    value={formData.students}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-check me-1"></i>
                    {editIndex !== null ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({
                        name: "",
                        head: "",
                        courses: "",
                        students: "",
                      });
                      setEditIndex(null);
                    }}
                  >
                    <i className="fas fa-times me-1"></i> Cancel
                  </button>
                </div>
              </form>

              {/* Departments Table */}
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Department Name</th>
                      <th scope="col">Head</th>
                      <th scope="col">Courses</th>
                      <th scope="col">Students</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, index) => (
                      <tr key={index}>
                        <td data-label="Department Name">{dept.name}</td>
                        <td data-label="Head">{dept.head}</td>
                        <td data-label="Courses">{dept.courses}</td>
                        <td data-label="Students">{dept.students}</td>
                        <td data-label="Action">
                          <div className="action-buttons">
                            <button
                              className="btn-primary-sm btn-sm me-1"
                              onClick={() => handleEdit(index)}
                            >
                              <i className="fas fa-edit me-1"></i> Edit
                            </button>
                            <button
                              className="btn-danger btn-sm"
                              onClick={() => handleDelete(index)}
                            >
                              <i className="fas fa-trash me-1"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default ELearningDepartments;
