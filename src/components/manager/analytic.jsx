import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AnalyticsPage = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Use refs to store chart instances
  const enrolmentChartRef = useRef(null);
  const popularityChartRef = useRef(null);

  // Use refs for chart canvas elements
  const enrolmentChartCanvas = useRef(null);
  const popularityChartCanvas = useRef(null);

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

  // Initialize charts
  useEffect(() => {
    // Clean up existing charts
    if (enrolmentChartRef.current) {
      enrolmentChartRef.current.destroy();
      enrolmentChartRef.current = null;
    }
    if (popularityChartRef.current) {
      popularityChartRef.current.destroy();
      popularityChartRef.current = null;
    }

    // Create enrolment chart
    if (enrolmentChartCanvas.current) {
      const ctx = enrolmentChartCanvas.current.getContext("2d");
      enrolmentChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
          ],
          datasets: [
            {
              label: "New Enrolments",
              data: [120, 190, 150, 210, 240, 220, 250, 280, 320, 310, 340],
              borderColor: "#1a237e",
              backgroundColor: "rgba(26, 35, 126, 0.08)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    // Create popularity chart
    if (popularityChartCanvas.current) {
      const ctx = popularityChartCanvas.current.getContext("2d");
      popularityChartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "Computer Science",
            "Design",
            "Business",
            "Languages",
            "Mathematics",
          ],
          datasets: [
            {
              data: [38, 24, 18, 12, 8],
              backgroundColor: [
                "#1a237e",
                "#4caf50",
                "#ff9800",
                "#9c27b0",
                "#f44336",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                padding: 20,
                usePointStyle: true,
              },
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (enrolmentChartRef.current) {
        enrolmentChartRef.current.destroy();
        enrolmentChartRef.current = null;
      }
      if (popularityChartRef.current) {
        popularityChartRef.current.destroy();
        popularityChartRef.current = null;
      }
    };
  }, []);

  // KPI Cards
  const kpiCards = [
    {
      icon: "fas fa-user-graduate",
      title: "Avg. Course Completion",
      value: "87%",
      description: "Across all courses",
    },
    {
      icon: "fas fa-clock",
      title: "Avg. Study Time / Week",
      value: "4h 12m",
      description: "Per student",
    },
    {
      icon: "fas fa-star",
      title: "Overall Satisfaction",
      value: "4.8 / 5",
      description: "Based on 1,200 reviews",
    },
    {
      icon: "fas fa-chart-line",
      title: "Retention Rate",
      value: "92%",
      description: "Quarter over quarter",
    },
  ];

  // Top Students Data
  const topStudents = [
    { name: "Alice Nguyen", course: "Data Structures", grade: "98%" },
    { name: "Mike Johnson", course: "Marketing 101", grade: "96%" },
    { name: "Sara Ali", course: "Calculus II", grade: "95%" },
    { name: "John Smith", course: "Web Development", grade: "94%" },
    { name: "Emma Wilson", course: "UI/UX Design", grade: "93%" },
    { name: "David Kim", course: "Machine Learning", grade: "92%" },
    { name: "Lisa Brown", course: "Business Analytics", grade: "91%" },
    { name: "Robert Chen", course: "Mobile Development", grade: "90%" },
  ];

  const menuItems = [
    { icon: "fas fa-tachometer-alt", label: "Dashboard", link: "/" },
    { icon: "fas fa-layer-group", label: "Departments", link: "/departments" },
    { icon: "fas fa-book", label: "Courses", link: "/courses" },
    { icon: "fas fa-chalkboard-teacher", label: "Heads", link: "/head" },
    { icon: "fas fa-chalkboard-teacher", label: "Teachers", link: "/teachers" },
    { icon: "fas fa-user-graduate", label: "Students", link: "/students" },
    { icon: "fas fa-tasks", label: "Assignments", link: "/assignments" },
    { icon: "fas fa-graduation-cap", label: "Grades", link: "/grades" },
    { icon: "fas fa-bullhorn", label: "Announcements", link: "/announcements" },
    {
      icon: "fas fa-certificate",
      label: "Certificates",
      link: "/certificates",
    },
    {
      icon: "fas fa-chart-pie",
      label: "Analytics",
      link: "/analytic",
      active: true,
    },
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
        .analytics-page {
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
        
        .card-description {
          font-size: 0.75rem;
          color: var(--gray-text);
          margin: 0.25rem 0 0 0;
        }

        /* Charts Section - Mobile First */
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin: 0 0 1.5rem 0;
          width: 100%;
        }
        
        .chart-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
          box-sizing: border-box;
          padding: 1rem;
        }
        
        .chart-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0 0 1rem 0;
          text-align: center;
        }
        
        .chart-container {
          position: relative;
          height: 250px;
          width: 100%;
        }

        /* Table Section - Mobile First */
        .table-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          margin: 0 0 1.5rem 0;
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.05);
          padding: 1rem;
        }
        
        .table-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin: 0 0 1rem 0;
          text-align: center;
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
        
        .grade-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
          white-space: nowrap;
          background: linear-gradient(135deg, var(--primary-color), #1a237e);
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
          
          .charts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .chart-container {
            height: 280px;
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
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
          }
          
          .dashboard-card {
            padding: 1.25rem;
          }
          
          .chart-container {
            height: 300px;
          }
          
          .table th, .table td {
            padding: 1rem;
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
          
          .chart-container {
            height: 320px;
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
          
          .chart-container {
            height: 340px;
          }
        }

        /* ========== EXTRA LARGE DESKTOP (≥1400px) ========== */
        @media (min-width: 1400px) {
          .main-content {
            padding: 1.5rem 3rem;
          }
          
          .chart-container {
            height: 360px;
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
          
          .card-description {
            font-size: 0.7rem;
          }
          
          .chart-card, .table-card {
            padding: 0.75rem;
          }
          
          .chart-title, .table-title {
            font-size: 0.9rem;
            margin-bottom: 0.75rem;
          }
          
          .chart-container {
            height: 220px;
          }
          
          .table td {
            padding: 0.75rem;
            padding-left: 50%;
          }
          
          .table td:before {
            left: 0.75rem;
          }
          
          .grade-badge {
            font-size: 0.7rem;
            padding: 0.2rem 0.5rem;
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
          
          .card-label, .card-description {
            text-align: left;
          }
          
          .chart-container {
            height: 200px;
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
          
          .content-area, .charts-grid, .table-card {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .charts-grid {
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

      <div className="analytics-page">
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
                      Analytics Dashboard
                    </span>
                    <span className="d-inline d-sm-none">Analytics</span>
                  </h2>
                  <p className="text-muted mb-0 small d-none d-md-block">
                    Deep-dive metrics for <strong>Mr. Smith</strong> — all
                    numbers updated live.
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
              {kpiCards.map((card, index) => (
                <div className="dashboard-card fade-in" key={index}>
                  <div className="card-icon">
                    <i className={card.icon}></i>
                  </div>
                  <div className="card-info">
                    <h3 className="card-label">{card.title}</h3>
                    <p className="card-value">{card.value}</p>
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
              <div className="chart-card fade-in">
                <h3 className="chart-title">Monthly Enrolment Trend</h3>
                <div className="chart-container">
                  <canvas ref={enrolmentChartCanvas}></canvas>
                </div>
              </div>

              <div className="chart-card fade-in">
                <h3 className="chart-title">
                  Course Popularity (Current Semester)
                </h3>
                <div className="chart-container">
                  <canvas ref={popularityChartCanvas}></canvas>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="table-card fade-in">
              <h3 className="table-title">Top Performing Students</h3>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((student, index) => (
                      <tr key={index}>
                        <td data-label="Student">{student.name}</td>
                        <td data-label="Course">{student.course}</td>
                        <td data-label="Grade">
                          <span className="grade-badge">{student.grade}</span>
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

export default AnalyticsPage;
