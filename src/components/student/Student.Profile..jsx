import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Added missing import
import "./styles.css";

export default function StudentProfile() {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=20");
  const [about, setAbout] = useState(
    "Passionate full-stack developer with expertise in modern web technologies. Currently pursuing Computer Science with focus on AI and Machine Learning. Open-source contributor and tech community activist. Strong interest in educational technology and making learning accessible to everyone."
  );
  const [work, setWork] = useState([]);
  const [education, setEducation] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editId, setEditId] = useState("");
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  
  // Added missing state variables
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const w = localStorage.getItem("work");
    const e = localStorage.getItem("education");
    if (!w) {
      const sampleWork = [
        {
          id: "1",
          role: "Frontend Developer Intern",
          company: "TechSolutions Inc · Summer 2023",
          description:
            "Developed responsive web applications using React and Redux. Collaborated with UI/UX designers to implement modern interfaces. Participated in code reviews and agile development processes.",
          tags: "React, JavaScript, Redux, UI/UX",
        },
        {
          id: "2",
          role: "Freelance Web Developer",
          company: "Self-Employed · 2022-Present",
          description:
            "Built custom websites and web applications for small businesses. Focused on responsive design, performance optimization, and user experience.",
          tags: "HTML/CSS, JavaScript, WordPress, SEO",
        },
      ];
      localStorage.setItem("work", JSON.stringify(sampleWork));
      setWork(sampleWork);
    } else setWork(JSON.parse(w));

    if (!e) {
      const sampleEducation = [
        {
          id: "1",
          degree: "Bachelor of Computer Science",
          school: "University of Technology · 2022-2025",
          description:
            "GPA: 3.8/4.0 · Dean's List · Research Assistant. Focus on Artificial Intelligence and Web Technologies. Coursework includes Data Structures, Algorithms, Machine Learning, and Software Engineering.",
          tags: "Data Structures, Algorithms, AI, Web Development",
        },
        {
          id: "2",
          degree: "High School Diploma",
          school: "Science High School · 2018-2022",
          description:
            "Graduated with honors. Focus on Mathematics and Computer Science. Participated in national programming competitions.",
          tags: "Mathematics, Physics, Programming",
        },
      ];
      localStorage.setItem("education", JSON.stringify(sampleEducation));
      setEducation(sampleEducation);
    } else setEducation(JSON.parse(e));
  }, []);

  /* ---------- helpers ---------- */
  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const saveLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  /* ---------- modal helpers ---------- */
  const openModal = (type, id = "") => {
    setModalType(type);
    setEditId(id || Date.now().toString());
    if (type === "about") {
      setFormData({ field1: "About Me", field2: about, field3: "" });
    } else {
      const items = type === "work" ? work : education;
      const item = items.find((i) => i.id === id);
      if (item) {
        setFormData({
          field1: type === "work" ? item.role : item.degree,
          field2: item.description,
          field3: item.tags,
        });
      } else {
        setFormData({ field1: "", field2: "", field3: "" });
      }
    }
    setModal(true);
  };
  
  const closeModal = () => setModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (modalType === "about") {
        setAbout(formData.field2);
        showToast("About section updated!", "success");
      } else {
        const items = modalType === "work" ? [...work] : [...education];
        const existing = items.find((i) => i.id === editId);
        const newItem = {
          id: editId,
          description: formData.field2,
          tags: formData.field3,
          ...(modalType === "work"
            ? { role: formData.field1, company: "Institution Name" }
            : { degree: formData.field1, school: "Institution Name" }),
        };
        const idx = items.findIndex((i) => i.id === editId);
        if (idx >= 0) {
          items[idx] = newItem;
          showToast(
            `${modalType === "work" ? "Work" : "Education"} updated!`,
            "success"
          );
        } else {
          items.push(newItem);
          showToast(
            `${modalType === "work" ? "Work" : "Education"} added!`,
            "success"
          );
        }
        if (modalType === "work") {
          setWork(items);
          saveLocal("work", items);
        } else {
          setEducation(items);
          saveLocal("education", items);
        }
      }
      setSaving(false);
      closeModal();
    }, 1000);
  };

  const deleteItem = (type, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const items = type === "work" ? [...work] : [...education];
    const filtered = items.filter((i) => i.id !== id);
    if (type === "work") {
      setWork(filtered);
      saveLocal("work", filtered);
    } else {
      setEducation(filtered);
      saveLocal("education", filtered);
    }
    showToast("Item deleted!", "warning");
  };

  const saveProfile = () => {
    showToast("Profile saved successfully!", "success");
  };
  
  const exportPDF = () => {
    const data = {
      name: "Amina Hussaini",
      title: "Bachelor of Computer Science · 3rd Year",
      email: "amina@student.edu",
      phone: "+1 (555) 123-4567",
      location: "Kabul, Afghanistan",
      enrollment: "September 2022",
      about,
      work,
      education,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `amina-profile-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Profile exported as JSON!", "success");
  };

  // Added missing function
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /* ---------- render ---------- */
  return (
    <>
      {/* ======  MAIN CONTENT  ====== */}
      <main className="main-content">
        {/* ======  SIDEBAR  ====== */}
        <aside
          id="sidebar"
          className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
            sidebarOpen ? "open" : ""
          }`}
        >
          <div className="sidebar-header">
            <h2>{sidebarCollapsed ? "" : "E-Learn"}</h2>
          </div>
          <div className="menu-wrapper">
            <ul className="menu">
              <li>
                <Link to="/StudentDashboard" onClick={handleMenuClick}>
                  <i className="fas fa-tachometer-alt" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/All-Courses" onClick={handleMenuClick}>
                  <i className="fas fa-layer-group" />
                  <span>All Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/My-Course" onClick={handleMenuClick}>
                  <i className="fas fa-book" />
                  <span>My Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/Assignments" onClick={handleMenuClick}>
                  <i className="fas fa-tasks" />
                  <span>Assignments</span>
                </Link>
              </li>
              <li>
                <Link to="/Grades" onClick={handleMenuClick}>
                  <i className="fas fa-graduation-cap" />
                  <span>Grades</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/Certificates" onClick={handleMenuClick}>
                  <i className="fas fa-certificate" />
                  <span>Certificates</span>
                </Link>
              </li>
              <div className="menu-spacer" />
              <li>
                <Link to="/Setting" onClick={handleMenuClick}>
                  <i className="fas fa-cog" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/Login" onClick={handleMenuClick}>
                  <i className="fas fa-sign-out-alt" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Profile Main Content */}
        <main className="profile-main">
          {/* About Section */}
          <div className="section">
            <div className="section-header">
              <div className="section-title">
                <i className="fas fa-user-circle" /> About Me
              </div>
              <button
                className="edit-btn"
                onClick={() => openModal("about")}
                aria-label="Edit About"
              >
                <i className="fas fa-edit" />
              </button>
            </div>
            <div className="about-card">
              <div className="about-content">{about}</div>
              <div className="card-tags">
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Python",
                  "AI/ML",
                  "MongoDB",
                  "UI/UX Design",
                ].map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="section">
            <div className="section-header">
              <div className="section-title">
                <i className="fas fa-briefcase" /> Work Experience
              </div>
              <button
                className="edit-btn"
                onClick={() => openModal("work")}
                aria-label="Add Work"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
            <div className="cards-grid">
              {work.length === 0 ? (
                <div className="card">
                  <div className="card-content">
                    No work experience added yet. Click the "+" button to add
                    your first work experience.
                  </div>
                </div>
              ) : (
                work.map((job) => (
                  <div className="card" key={job.id}>
                    <div className="card-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => openModal("work", job.id)}
                        aria-label="Edit Work"
                      >
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => deleteItem("work", job.id)}
                        aria-label="Delete Work"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                    <div className="card-title">{job.role}</div>
                    <div className="card-subtitle">{job.company}</div>
                    <div className="card-content">{job.description}</div>
                    <div className="card-tags">
                      {job.tags.split(",").map((t) => (
                        <span className="tag" key={t}>
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Education */}
          <div className="section">
            <div className="section-header">
              <div className="section-title">
                <i className="fas fa-graduation-cap" /> Education
              </div>
              <button
                className="edit-btn"
                onClick={() => openModal("education")}
                aria-label="Add Education"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
            <div className="cards-grid">
              {education.length === 0 ? (
                <div className="card">
                  <div className="card-content">
                    No education added yet. Click the "+" button to add your
                    first education.
                  </div>
                </div>
              ) : (
                education.map((edu) => (
                  <div className="card" key={edu.id}>
                    <div className="card-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => openModal("education", edu.id)}
                        aria-label="Edit Education"
                      >
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => deleteItem("education", edu.id)}
                        aria-label="Delete Education"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                    <div className="card-title">{edu.degree}</div>
                    <div className="card-subtitle">{edu.school}</div>
                    <div className="card-content">{edu.description}</div>
                    <div className="card-tags">
                      {edu.tags.split(",").map((t) => (
                        <span className="tag" key={t}>
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
      </main>

      {/* ----  EDIT MODAL  ---- */}
      {modal && (
        <div className="modal" style={{ display: "flex" }} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === "about"
                  ? "Edit About Me"
                  : modalType === "work"
                  ? editId
                    ? "Edit Work Experience"
                    : "Add Work Experience"
                  : editId
                  ? "Edit Education"
                  : "Add Education"}
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <form id="editForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  {modalType === "work"
                    ? "Role"
                    : modalType === "education"
                    ? "Degree"
                    : "Title"}
                </label>
                <input
                  value={formData.field1}
                  onChange={(e) =>
                    setFormData({ ...formData, field1: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.field2}
                  onChange={(e) =>
                    setFormData({ ...formData, field2: e.target.value })
                  }
                  rows="4"
                />
              </div>
              {modalType !== "about" && (
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    value={formData.field3}
                    onChange={(e) =>
                      setFormData({ ...formData, field3: e.target.value })
                    }
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="spinner" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----  TOAST  ---- */}
      {toast.show && (
        <div
          className="toast"
          style={{
            background:
              toast.type === "success"
                ? "#4caf50"
                : toast.type === "warning"
                ? "#f59e0b"
                : "#ef4444",
          }}
        >
          <i
            className={`fas fa-${
              toast.type === "success"
                ? "check-circle"
                : toast.type === "warning"
                ? "exclamation-triangle"
                : "exclamation-circle"
            }`}
          />
          <span>{toast.msg}</span>
        </div>
      )}
    </>
  );
}