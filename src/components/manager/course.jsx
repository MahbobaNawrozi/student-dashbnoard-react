import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [courses, setCourses] = useState([
    {
      title: "Algebra II",
      subject: "Mathematics",
      level: "Intermediate",
      type: "Self-Paced",
      instructor: "Mr. Smith",
      students: 120,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1509223197845-458d87318791",
    },
    {
      title: "Physics Fundamentals",
      subject: "Science",
      level: "Advanced",
      type: "Teacher-Led",
      instructor: "Dr. Wilson",
      students: 80,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1537432376769-00a2c5f0f9b4",
    },
    {
      title: "World History",
      subject: "History",
      level: "Beginner",
      type: "Teacher-Led",
      instructor: "Mrs. Brown",
      students: 95,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1549899593-ec9e4903c6f6",
    },
    {
      title: "English Literature",
      subject: "Language Arts",
      level: "Intermediate",
      type: "Self-Paced",
      instructor: "Mr. Green",
      students: 110,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    },
    {
      title: "Chemistry Basics",
      subject: "Science",
      level: "Beginner",
      type: "Teacher-Led",
      instructor: "Dr. Adams",
      students: 65,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1581091870627-3c88d9f1d6c3",
    },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [filtered, setFiltered] = useState(courses);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "Science",
    level: "Beginner",
    type: "Self-Paced",
    instructor: "",
    imgUrl: "",
    desc: "",
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

  useEffect(() => {
    const res = courses.filter(
      (c) =>
        (!search || c.title.toLowerCase().includes(search.toLowerCase())) &&
        (!category || c.subject === category) &&
        (!level || c.level === level) &&
        (!type || c.type === type)
    );
    setFiltered(res);
  }, [search, category, level, type, courses]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const saveCourse = () => {
    if (!form.title.trim() || !form.instructor.trim()) {
      alert("Title & Instructor are required.");
      return;
    }
    const newCourse = {
      ...form,
      students: 0,
      rating: 0,
      img:
        form.imgUrl.trim() ||
        "https://images.unsplash.com/photo-1509223197845-458d87318791",
    };
    setCourses((prev) => [...prev, newCourse]);
    closeModal();
    setForm({
      title: "",
      subject: "Science",
      level: "Beginner",
      type: "Self-Paced",
      instructor: "",
      imgUrl: "",
      desc: "",
    });
  };

  const total = courses.length;
  const selfPaced = courses.filter((c) => c.type === "Self-Paced");
  const teacherLed = courses.filter((c) => c.type === "Teacher-Led");

  const viewSelfPaced = () => setType("Self-Paced");
  const viewTeacherLed = () => setType("Teacher-Led");

  const handleMenuItemClick = (itemId) => {
    if (window.innerWidth <= 992) {
      setMobileOpen(false);
    }

    if (itemId === "logout") {
      console.log("Logging out...");
    }
  };

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses", active: true },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/heads" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    {
      icon: "fas fa-certificate",
      label: "Certificates",
      link: "/certificates",
    },
    { icon: "fas fa-bullhorn", label: "Announcements", link: "/announcements" },
    { icon: "fas fa-chart-pie", label: "Analytics", link: "/analytics" },
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
        .courses-page {
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

        /* Filter Bar - Mobile First */
        .filter-bar {
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
          width: 100%;
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
        
        .btn-primary {
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
          white-space: nowrap;
          box-sizing: border-box;
        }
        
        .btn-primary:hover {
          background: #151c65;
          transform: translateY(-2px);
        }

        /* Courses Grid - Mobile First */
        .courses-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 0 0 1.5rem 0;
          width: 100%;
        }
        
        .course-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.3s;
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
          box-sizing: border-box;
        }
        
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        
        .course-img {
          height: 160px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .card-body {
          padding: 1rem;
        }
        
        .card-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0 0 0.5rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .card-text {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          margin: 0 0 1rem 0;
        }
        
        .bg-info {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .bg-success {
          background: #d1fae5;
          color: #065f46;
        }
        
        .card-footer {
          padding: 1rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .btn-outline-primary {
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          background: transparent;
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
        }
        
        .btn-outline-primary:hover {
          background: var(--primary-color);
          color: white;
        }

        /* Insights Panel - Mobile First */
        .insights-panel {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
          box-sizing: border-box;
        }
        
        .insight-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: var(--radius);
          margin: 0 0 0.75rem 0;
        }
        
        .insight-item:last-child {
          margin: 0;
        }
        
        .insight-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .text-primary {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .text-info {
          background: #e0f2fe;
          color: #0369a1;
        }
        
        .text-success {
          background: #d1fae5;
          color: #059669;
        }
        
        .text-warning {
          background: #fef3c7;
          color: #d97706;
        }
        
        .text-danger {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .insight-info h6 {
          font-size: 0.85rem;
          color: var(--gray-text);
          margin: 0 0 0.25rem 0;
          font-weight: 500;
        }
        
        .insight-info span {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-text);
        }
        
        .btn-outline-info, .btn-outline-success {
          padding: 0.5rem 1rem;
          border-radius: var(--radius);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          margin: 0 0 0.5rem 0;
          border: 1px solid;
          background: transparent;
        }
        
        .btn-outline-info {
          border-color: #38bdf8;
          color: #38bdf8;
        }
        
        .btn-outline-info:hover {
          background: #38bdf8;
          color: white;
        }
        
        .btn-outline-success {
          border-color: #10b981;
          color: #10b981;
        }
        
        .btn-outline-success:hover {
          background: #10b981;
          color: white;
        }

        /* Modal - Mobile First */
        .modal-backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1050;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .modal-backdrop.show {
          display: flex;
        }
        
        .modal-content {
          background: white;
          border-radius: var(--radius);
          padding: 1rem;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 0 1rem 0;
        }
        
        .modal-header h2 {
          font-size: 1.25rem;
          color: var(--dark-text);
          margin: 0;
        }
        
        .btn-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: var(--gray-text);
        }
        
        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .form-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--dark-text);
          margin: 0 0 0.25rem 0;
          display: block;
        }
        
        .btn-secondary, .btn-primary {
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }
        
        .btn-secondary {
          background: #64748b;
          color: white;
        }
        
        .btn-secondary:hover {
          background: #475569;
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
          
          .welcome p {
            display: block;
          }
          
          .courses-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .btn-primary {
            width: auto;
            padding: 0.75rem 1.5rem;
          }
        }

        /* ========== TABLET (≥768px) ========== */
        @media (min-width: 768px) {
          .courses-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }
          
          .filter-grid {
            grid-template-columns: repeat(5, 1fr);
          }
          
          .modal-content {
            padding: 1.5rem;
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
          
          .content-area {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 1.5rem;
          }
          
          .courses-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ========== LARGE DESKTOP (≥1200px) ========== */
        @media (min-width: 1200px) {
          .main-content {
            padding: 1rem 2rem;
          }
          
          .content-area {
            grid-template-columns: 1fr 350px;
            gap: 2rem;
          }
          
          .courses-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .modal-content {
            max-width: 600px;
          }
        }

        /* ========== EXTRA LARGE DESKTOP (≥1400px) ========== */
        @media (min-width: 1400px) {
          .main-content {
            padding: 1.5rem 3rem;
          }
          
          .courses-grid {
            grid-template-columns: repeat(3, 1fr);
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
          
          .filter-bar {
            padding: 0.75rem;
          }
          
          .course-img {
            height: 140px;
          }
          
          .card-body {
            padding: 0.75rem;
          }
          
          .insights-panel {
            padding: 0.75rem;
          }
          
          .insight-item {
            padding: 0.5rem;
            gap: 0.75rem;
          }
          
          .insight-icon {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
          
          .insight-info h6 {
            font-size: 0.8rem;
          }
          
          .insight-info span {
            font-size: 1rem;
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
          
          .courses-grid {
            gap: 0.75rem;
          }
          
          .course-img {
            height: 120px;
          }
          
          .card-title {
            font-size: 0.9rem;
          }
          
          .card-text {
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
          
          .content-area {
            width: 100% !important;
            max-width: 100% !important;
            display: block !important;
          }
          
          .filter-bar, .insights-panel, .courses-grid {
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

      <div className="courses-page">
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
                    <span className="d-none d-sm-inline">All Courses</span>
                    <span className="d-inline d-sm-none">Courses</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Browse, filter and manage every course in the academy.
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
                <Link to="/profile" className="d-inline-block">
                  <img
                    src="https://i.pravatar.cc/300?img=12"
                    alt="Manager Avatar"
                    className="avatar-img"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <div className="filter-bar fade-in">
            <div className="filter-grid">
              <input
                type="text"
                className="form-control"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Subjects</option>
                <option>Science</option>
                <option>Mathematics</option>
                <option>History</option>
                <option>Language Arts</option>
              </select>
              <select
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                <option>Self-Paced</option>
                <option>Teacher-Led</option>
              </select>
              <button className="btn btn-primary" onClick={openModal}>
                <i className="fas fa-plus me-1"></i> Add Course
              </button>
            </div>
          </div>

          <div className="content-area">
            {/* Courses grid */}
            <div>
              <div className="courses-grid">
                {filtered.map((c, idx) => {
                  const typeClass =
                    c.type === "Self-Paced" ? "bg-info" : "bg-success";
                  const typeIcon =
                    c.type === "Self-Paced"
                      ? "fa-clock"
                      : "fa-chalkboard-teacher";
                  return (
                    <div className="course-card fade-in" key={idx}>
                      <div
                        className="course-img"
                        style={{ backgroundImage: `url('${c.img}')` }}
                      />
                      <div className="card-body">
                        <h3 className="card-title">{c.title}</h3>
                        <p className="card-text">
                          <i className="fas fa-book me-1"></i>
                          {c.subject} | {c.level}
                        </p>
                        <p className="card-text">
                          <i className="fas fa-user me-1"></i> {c.instructor}
                        </p>
                        <span className={`badge ${typeClass}`}>
                          <i className={`fas ${typeIcon} me-1`} /> {c.type}
                        </span>
                      </div>
                      <div className="card-footer">
                        <span className="text-muted">
                          <i className="fas fa-users me-1"></i> {c.students}
                        </span>
                        <span className="text-warning">
                          <i className="fas fa-star me-1"></i> {c.rating}
                        </span>
                      </div>
                      <div className="card-body">
                        <button className="btn-outline-primary">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights panel */}
            <div className="insights-panel fade-in">
              <h3 className="section-title">
                <i className="fas fa-lightbulb me-2"></i> Course Insights
              </h3>
              <div className="insights-list">
                <div className="insight-item">
                  <div className="insight-icon text-primary">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="insight-info">
                    <h6>Total Courses</h6>
                    <span>{total}</span>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon text-info">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="insight-info">
                    <h6>Self-Paced Courses</h6>
                    <span>{selfPaced.length}</span>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon text-success">
                    <i className="fas fa-chalkboard-teacher"></i>
                  </div>
                  <div className="insight-info">
                    <h6>Teacher-Led Courses</h6>
                    <span>{teacherLed.length}</span>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon text-warning">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="insight-info">
                    <h6>Students in Self-Paced</h6>
                    <span>{selfPaced.reduce((a, b) => a + b.students, 0)}</span>
                  </div>
                </div>
                <div className="insight-item">
                  <div className="insight-icon text-danger">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div className="insight-info">
                    <h6>Students in Teacher-Led</h6>
                    <span>
                      {teacherLed.reduce((a, b) => a + b.students, 0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn-outline-info" onClick={viewSelfPaced}>
                  View Self-Paced
                </button>
                <button
                  className="btn-outline-success"
                  onClick={viewTeacherLed}
                >
                  View Teacher-Led
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Add-course modal */}
        {modalOpen && (
          <div className="modal-backdrop show">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Course</h2>
                <button className="btn-close" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Subject</label>
                  <select
                    className="form-select"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  >
                    <option>Science</option>
                    <option>Mathematics</option>
                    <option>History</option>
                    <option>Language Arts</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Level</label>
                  <select
                    className="form-select"
                    value={form.level}
                    onChange={(e) =>
                      setForm({ ...form, level: e.target.value })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Course Type</label>
                  <select
                    className="form-select"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option>Self-Paced</option>
                    <option>Teacher-Led</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Instructor *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.instructor}
                    onChange={(e) =>
                      setForm({ ...form, instructor: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Optional - leave blank for default"
                    value={form.imgUrl}
                    onChange={(e) =>
                      setForm({ ...form, imgUrl: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  />
                </div>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={saveCourse}>
                    Save Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
