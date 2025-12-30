import React, { useState } from "react";
import "./styles.css";

const AllCourses = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const courses = [
    {
      id: 1,
      title: "Mathematics Basics",
      level: "Basic",
      desc: "Core mathematical concepts including algebra and geometry.",
      students: 120,
      status: "Active",
      duration: "6h 20m",
      img: "https://images.unsplash.com/photo-1509223197845-458d87318791",
    },
    {
      id: 2,
      title: "English Literature",
      level: "Intermediate",
      desc: "Explore Shakespeare, Romantic poetry, and modern English literature.",
      students: 80,
      status: "Active",
      duration: "8h 10m",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    },
    {
      id: 3,
      title: "Modern Physics",
      level: "Advanced",
      desc: "Understand relativity, quantum theory, and nuclear physics.",
      students: 65,
      status: "Active",
      duration: "10h 30m",
      img: "https://images.unsplash.com/photo-1537432376769-00a2c5f0f9b4",
    },
    {
      id: 4,
      title: "Graphic Design",
      level: "Basic",
      desc: "Learn design principles, color theory, and typography.",
      students: 55,
      status: "Draft",
      duration: "5h 45m",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: 5,
      title: "Artificial Intelligence",
      level: "Special",
      desc: "Deep learning, neural networks, and real-world AI applications.",
      students: 40,
      status: "Active",
      duration: "12h 00m",
      img: "https://images.unsplash.com/photo-1581091215367-59ab6b4b6b35",
    },
    {
      id: 6,
      title: "World History",
      level: "Intermediate",
      desc: "A study of civilizations and world-changing events.",
      students: 90,
      status: "Archived",
      duration: "9h 15m",
      img: "https://images.unsplash.com/photo-1549899593-ec9e4903c6f6",
    },
  ];

  const categories = ["All", "Basic", "Intermediate", "Advanced", "Special"];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.level === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const viewDetails = (id) => {
    window.location.href = `course-details.html?id=${id}`;
  };

  return (
    <div>
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
        <div className="sidebar-header">
          <h2>E-Learn</h2>
        </div>
        <ul className="menu">
          <li>
            <a href="dashboard.html">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="active">
            <a href="#">
              <i className="fas fa-layer-group"></i>
              <span>All Courses</span>
            </a>
          </li>
          <li>
            <a href="myCourses.html">
              <i className="fas fa-book"></i>
              <span>My Courses</span>
            </a>
          </li>
          <li>
            <a href="settings.html">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <header className="topbar">
          <div
            className="menu-toggle"
            id="menuToggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="fas fa-bars"></i>
          </div>
          <h2>All Courses</h2>
          <div className="user-area">
            <div className="icon">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </div>
            <a href="teacher.profile.html">
              <img src="https://i.pravatar.cc/100?img=8" alt="Teacher" />
            </a>
          </div>
        </header>

        {/* CATEGORY TABS */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* COURSE GRID */}
        <section className="courses-grid" id="coursesGrid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <span className={`status ${course.status.toLowerCase()}`}>
                {course.status}
              </span>
              <img src={course.img} alt={course.title} />
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <div className="course-meta">
                  <span>
                    <i className="fas fa-user-graduate"></i> {course.students}
                  </span>
                  <span>
                    <i className="fas fa-clock"></i> {course.duration}
                  </span>
                </div>
                <button
                  className="view-btn"
                  onClick={() => viewDetails(course.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AllCourses;
