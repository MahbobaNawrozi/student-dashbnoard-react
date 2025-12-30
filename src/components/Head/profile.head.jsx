/* components/Head/teacher.profile.jsx */
import { useState, useEffect } from "react";

export default function TeacherProfile() {
  /* ---------- responsive sidebar ---------- */
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 992);
  useEffect(() => {
    const onResize = () => setCollapsed(window.innerWidth <= 992);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- data ---------- */
  const [avatar, setAvatar] = useState(
    "https://i.pinimg.com/736x/b6/fc/ea/b6fcea9f0fe03f2fa2b2c11fa7e35cbd.jpg "
  );

  /* ---------- handlers ---------- */
  const openEditModal = () => alert("Edit profile modal would open here");
  const editPersonalInfo = () =>
    alert("Edit personal information modal would open here");
  const editContactInfo = () =>
    alert("Edit contact information modal would open here");
  const editIdentificationInfo = () =>
    alert("Edit identification information modal would open here");

  const exportProfile = (e) => {
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    btn.disabled = true;
    setTimeout(() => {
      alert("Profile exported successfully!");
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1500);
  };

  const changeAvatar = () => {
    const newAvatar = prompt(
      "Enter new avatar URL:",
      "https://i.pravatar.cc/150?img=15 "
    );
    if (newAvatar && newAvatar.trim() !== "") setAvatar(newAvatar.trim());
  };

  /* ---------- keyboard shortcut ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        openEditModal();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const css = `
  
    :root {
      --primary: #1a237e;
      --primary-dark: #1a237e;
      --primary-light: #dbeafe;
      --secondary: #3a70ed;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --dark: #1e293b;
      --gray-dark: #475569;
      --gray: #64748b;
      --gray-light: #e2e8f0;
      --light: #f8fafc;
      --white: #ffffff;
      --card-radius: 12px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: var(--dark);
      min-height: 100vh;
      padding: 20px;
    }
    .main-content {
      padding: 20px;
      min-height: 100vh;
      max-width: 1200px;
      margin: 0 auto;
    }
    .profile-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 30px;
    }
    @media (max-width: 768px) {
      .profile-container {
        grid-template-columns: 1fr;
      }
    }
    .profile-sidebar {
      background: var(--white);
      border-radius: var(--card-radius);
      padding: 30px;
      box-shadow: var(--shadow);
      height: fit-content;
      position: sticky;
      top: 20px;
    }
    .profile-header {
      text-align: center;
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 2px solid var(--gray-light);
    }
    .profile-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid var(--primary-light);
      margin: 0 auto 20px;
      box-shadow: var(--shadow-lg);
      cursor: pointer;
      transition: var(--transition);
    }
    .profile-avatar:hover {
      transform: scale(1.05);
    }
    .profile-name {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 5px;
      color: var(--dark);
    }
    .profile-title {
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 15px;
      font-size: 16px;
    }
    .profile-bio {
      color: var(--gray);
      font-size: 14px;
      line-height: 1.6;
      margin-top: 15px;
    }
    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);
      font-size: 14px;
      justify-content: center;
      font-family: inherit;
      width: 100%;
      margin-top: 10px;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
    }
    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    .btn-outline {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
    }
    .btn-outline:hover {
      background: var(--primary);
      color: white;
    }
    .profile-main {
      background: var(--white);
      border-radius: var(--card-radius);
      padding: 30px;
      box-shadow: var(--shadow);
    }
    .section {
      margin-bottom: 30px;
    }
    .section:last-child {
      margin-bottom: 0;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid var(--gray-light);
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--dark);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-title i {
      color: var(--primary);
    }
    .edit-btn {
      background: var(--light);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
      color: var(--primary);
      border: none;
    }
    .edit-btn:hover {
      background: var(--primary);
      color: white;
      transform: rotate(90deg);
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    .info-item-card {
      background: var(--light);
      border-radius: 10px;
      padding: 20px;
      transition: var(--transition);
      border-left: 3px solid var(--primary);
    }
    .info-item-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow);
    }
    .info-label {
      font-size: 12px;
      color: var(--gray);
      margin-bottom: 8px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-weight: 600;
      font-size: 16px;
      color: var(--dark);
    }
    @media (max-width: 768px) {
      .main-content {
        padding: 15px;
      }
      .profile-avatar {
        width: 120px;
        height: 120px;
      }
      .profile-name {
        font-size: 20px;
      }
      .profile-title {
        font-size: 14px;
      }
      .section-title {
        font-size: 18px;
      }
      .info-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 576px) {
      .profile-name {
        font-size: 20px;
      }
    }
  `;
  return (
    <>
      <style>{css}</style>

      <main className="main-content">
        <div className="profile-container">
          {/* left card */}
          <aside className="profile-sidebar">
            <div className="profile-header">
              <img
                src={avatar}
                alt="Dr. Sara Khan"
                className="profile-avatar"
                onClick={changeAvatar}
              />
              <h2 className="profile-name">Dr. Sara Khan</h2>
              <p className="profile-title">
                Associate Professor · Computer Science
              </p>
              <p className="profile-bio">
                Dedicated educator with 12+ years of experience in computer
                science education. Specialized in algorithms, data structures,
                and database management systems.
              </p>
            </div>

            <button className="btn btn-primary" onClick={openEditModal}>
              <i className="fas fa-edit"></i> Edit Profile
            </button>
            <button className="btn btn-outline" onClick={exportProfile}>
              <i className="fas fa-download"></i> Export Profile
            </button>
          </aside>

          {/* right sections */}
          <main className="profile-main">
            {/* personal information */}
            <div className="section">
              <div className="section-header">
                <h3 className="section-title">
                  <i className="fas fa-user-circle"></i> Personal Information
                </h3>
                <button
                  className="edit-btn"
                  onClick={editPersonalInfo}
                  aria-label="Edit Personal Info"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="info-grid">
                <div className="info-item-card">
                  <div className="info-label">Full Name</div>
                  <div className="info-value">Dr. Sara Khan</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Date of Birth</div>
                  <div className="info-value">June 15, 1982</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Gender</div>
                  <div className="info-value">Female</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Nationality</div>
                  <div className="info-value">Afghan</div>
                </div>
              </div>
            </div>

            {/* contact information */}
            <div className="section">
              <div className="section-header">
                <h3 className="section-title">
                  <i className="fas fa-address-book"></i> Contact Information
                </h3>
                <button
                  className="edit-btn"
                  onClick={editContactInfo}
                  aria-label="Edit Contact Info"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="info-grid">
                <div className="info-item-card">
                  <div className="info-label">Email Address</div>
                  <div className="info-value">sara.khan@academy.edu</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">+93 700 123 456</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Address</div>
                  <div className="info-value">
                    123 University Street, Kabul, Afghanistan
                  </div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Emergency Contact</div>
                  <div className="info-value">+93 799 987 654 (Spouse)</div>
                </div>
              </div>
            </div>

            {/* identification information */}
            <div className="section">
              <div className="section-header">
                <h3 className="section-title">
                  <i className="fas fa-id-card"></i> Identification
                </h3>
                <button
                  className="edit-btn"
                  onClick={editIdentificationInfo}
                  aria-label="Edit Identification Info"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </div>
              <div className="info-grid">
                <div className="info-item-card">
                  <div className="info-label">Employee ID</div>
                  <div className="info-value">EMP-CS-1247</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">National ID</div>
                  <div className="info-value">1234567890</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Passport Number</div>
                  <div className="info-value">AB1234567</div>
                </div>
                <div className="info-item-card">
                  <div className="info-label">Join Date</div>
                  <div className="info-value">September 15, 2011</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}
